/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: FIREBASE AUTHENTICATION (GOOGLE + MICROSOFT + EMAIL) & PERSISTENT REGISTRY
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  User,
  signInAnonymously,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  limit,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db, testFirestoreConnection } from '../firebase/config';

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  authProvider: 'google.com' | 'microsoft.com' | 'password' | 'anonymous';
  organization: string;
  role: 'researcher' | 'clinician' | 'student' | 'public_humanitarian' | 'admin';
  primaryResearchInterest: string;
  country: string;
  openAccessPledgeAccepted: boolean;
  registeredAt: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SavedDossier {
  id: string;
  userId: string;
  cureId: string;
  diseaseName: string;
  dossierTitle: string;
  dataHash: string;
  coherenceRate: number;
  notes?: string;
  createdAt: string;
}

export interface CommunityAuditRecord {
  id: string;
  userId: string;
  cureId: string;
  datasetAcronym: string;
  verificationHash: string;
  consensusAffirmed: boolean;
  latencyMs: number;
  notes?: string;
  timestamp: string;
}

export interface VoluntaryPledgeRecord {
  id: string;
  userId: string;
  donorName: string;
  amountUsd: number;
  billingAccountId: string;
  purpose: string;
  isMandatory: boolean;
  createdAt: string;
}

interface FirebaseContextType {
  user: User | null;
  userProfile: UserProfile | null;
  needsRegistration: boolean;
  isLoadingAuth: boolean;
  isFirestoreConnected: boolean;
  authError: string | null;
  clearAuthError: () => void;
  savedDossiers: SavedDossier[];
  communityAudits: CommunityAuditRecord[];
  voluntaryPledges: VoluntaryPledgeRecord[];
  allRegisteredUsers: UserProfile[];
  loginWithGoogle: () => Promise<boolean>;
  loginWithMicrosoft: () => Promise<boolean>;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<boolean>;
  loginAsGuest: () => Promise<boolean>;
  logout: () => Promise<void>;
  registerUserProfile: (profile: Omit<UserProfile, 'userId' | 'createdAt' | 'registeredAt'>) => Promise<boolean>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<boolean>;
  saveDossier: (dossier: Omit<SavedDossier, 'userId' | 'createdAt'>) => Promise<boolean>;
  submitCommunityAudit: (audit: Omit<CommunityAuditRecord, 'userId' | 'timestamp'>) => Promise<boolean>;
  submitVoluntaryPledge: (pledge: Omit<VoluntaryPledgeRecord, 'userId' | 'createdAt'>) => Promise<boolean>;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [needsRegistration, setNeedsRegistration] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [isFirestoreConnected, setIsFirestoreConnected] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [savedDossiers, setSavedDossiers] = useState<SavedDossier[]>([]);
  const [communityAudits, setCommunityAudits] = useState<CommunityAuditRecord[]>([]);
  const [voluntaryPledges, setVoluntaryPledges] = useState<VoluntaryPledgeRecord[]>([]);
  const [allRegisteredUsers, setAllRegisteredUsers] = useState<UserProfile[]>([]);

  const clearAuthError = () => setAuthError(null);

  // 1. Check user profile in Firestore
  const fetchUserProfile = useCallback(async (firebaseUser: User) => {
    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data() as UserProfile;
        setUserProfile(data);
        setNeedsRegistration(false);
      } else {
        // If logged in via Google/Microsoft/Email but no profile yet -> prompt registration!
        setUserProfile(null);
        if (!firebaseUser.isAnonymous) {
          setNeedsRegistration(true);
        } else {
          setNeedsRegistration(false);
        }
      }
    } catch (err: any) {
      console.warn('[Firestore] Error fetching user profile:', err.message);
      // Fallback in case of permissions or connectivity
      if (!firebaseUser.isAnonymous) {
        setNeedsRegistration(true);
      }
    }
  }, []);

  // 2. Initialize Auth State
  useEffect(() => {
    testFirestoreConnection().then((connected) => {
      setIsFirestoreConnected(connected);
    });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser);
      } else {
        setUserProfile(null);
        setNeedsRegistration(false);
      }
      setIsLoadingAuth(false);
    });

    return () => unsubscribe();
  }, [fetchUserProfile]);

  // 3. Sync All Registered Users (Global Registry Directory)
  useEffect(() => {
    if (!user) return;
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, limit(50));
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          const list: UserProfile[] = [];
          snapshot.forEach((d) => {
            list.push(d.data() as UserProfile);
          });
          setAllRegisteredUsers(list);
        },
        (err) => {
          console.warn('[Firestore] Users list sync notice:', err.message);
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn('[Firestore] Users list init notice:', e);
    }
  }, [user]);

  // 4. Sync Community Audits
  useEffect(() => {
    try {
      const auditsRef = collection(db, 'consensus_audits');
      const q = query(auditsRef, limit(30));
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          const list: CommunityAuditRecord[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ ...(docSnap.data() as CommunityAuditRecord), id: docSnap.id });
          });
          if (list.length > 0) setCommunityAudits(list);
        },
        (err) => {
          console.warn('[Firestore] Audits snapshot notice:', err.message);
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn('[Firestore] Audits init notice:', e);
    }
  }, []);

  // 5. Sync User Saved Dossiers
  useEffect(() => {
    if (!user) return;
    try {
      const dossiersRef = collection(db, 'dossiers');
      const unsub = onSnapshot(
        dossiersRef,
        (snapshot) => {
          const list: SavedDossier[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data() as SavedDossier;
            if (data.userId === user.uid) {
              list.push({ ...data, id: docSnap.id });
            }
          });
          setSavedDossiers(list);
        },
        (err) => {
          console.warn('[Firestore] Dossiers snapshot notice:', err.message);
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn('[Firestore] Dossiers init notice:', e);
    }
  }, [user]);

  // Auth Methods
  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      clearAuthError();
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      provider.setCustomParameters({ prompt: 'select_account' });
      const cred = await signInWithPopup(auth, provider);
      await fetchUserProfile(cred.user);
      return true;
    } catch (err: any) {
      console.error('[Google Auth Error]', err);
      setAuthError(err.message || 'Google Authentication failed');
      return false;
    }
  };

  const loginWithMicrosoft = async (): Promise<boolean> => {
    try {
      clearAuthError();
      const provider = new OAuthProvider('microsoft.com');
      provider.addScope('User.Read');
      provider.setCustomParameters({ prompt: 'login' });
      const cred = await signInWithPopup(auth, provider);
      await fetchUserProfile(cred.user);
      return true;
    } catch (err: any) {
      console.error('[Microsoft Auth Error]', err);
      setAuthError(err.message || 'Microsoft Authentication failed');
      return false;
    }
  };

  const loginWithEmail = async (email: string, pass: string): Promise<boolean> => {
    try {
      clearAuthError();
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      await fetchUserProfile(cred.user);
      return true;
    } catch (err: any) {
      console.error('[Email Auth Error]', err);
      setAuthError(err.message || 'Email login failed');
      return false;
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string): Promise<boolean> => {
    try {
      clearAuthError();
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      await fetchUserProfile(cred.user);
      return true;
    } catch (err: any) {
      console.error('[Registration Error]', err);
      setAuthError(err.message || 'Registration failed');
      return false;
    }
  };

  const loginAsGuest = async (): Promise<boolean> => {
    try {
      clearAuthError();
      await signInAnonymously(auth);
      return true;
    } catch (err: any) {
      console.error('[Guest Login Error]', err);
      setAuthError(err.message || 'Guest sign-in failed');
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setNeedsRegistration(false);
    } catch (err: any) {
      console.error('[Logout Error]', err);
    }
  };

  // Persistent Registration Action
  const registerUserProfile = async (
    profileData: Omit<UserProfile, 'userId' | 'createdAt' | 'registeredAt'>
  ): Promise<boolean> => {
    if (!user) return false;
    try {
      const now = new Date().toISOString();
      const newProfile: UserProfile = {
        ...profileData,
        userId: user.uid,
        email: profileData.email || user.email || 'researcher@sovereign-open-access.org',
        displayName: profileData.displayName || user.displayName || 'Sovereign Biomedical Researcher',
        photoURL: profileData.photoURL || user.photoURL || undefined,
        authProvider:
          profileData.authProvider ||
          (user.providerData[0]?.providerId as any) ||
          (user.isAnonymous ? 'anonymous' : 'password'),
        registeredAt: now,
        createdAt: now,
        updatedAt: now
      };

      await setDoc(doc(db, 'users', user.uid), newProfile);
      setUserProfile(newProfile);
      setNeedsRegistration(false);
      return true;
    } catch (err: any) {
      console.error('[Firestore] User registration write error:', err);
      setAuthError(err.message || 'Failed to save persistent user profile');
      return false;
    }
  };

  const updateUserProfile = async (partial: Partial<UserProfile>): Promise<boolean> => {
    if (!user || !userProfile) return false;
    try {
      const updated: UserProfile = {
        ...userProfile,
        ...partial,
        userId: user.uid,
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', user.uid), updated, { merge: true });
      setUserProfile(updated);
      return true;
    } catch (err: any) {
      console.error('[Firestore] User profile update error:', err);
      return false;
    }
  };

  // Saved Dossiers
  const saveDossier = useCallback(
    async (dossier: Omit<SavedDossier, 'userId' | 'createdAt'>): Promise<boolean> => {
      if (!user) return false;
      try {
        const fullDossier: SavedDossier = {
          ...dossier,
          userId: user.uid,
          createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'dossiers', dossier.id), fullDossier);
        return true;
      } catch (err) {
        console.error('[Firestore] Save dossier error:', err);
        return false;
      }
    },
    [user]
  );

  // Consensus Audits
  const submitCommunityAudit = useCallback(
    async (audit: Omit<CommunityAuditRecord, 'userId' | 'timestamp'>): Promise<boolean> => {
      if (!user) return false;
      try {
        const record: CommunityAuditRecord = {
          ...audit,
          userId: user.uid,
          timestamp: new Date().toISOString()
        };
        await setDoc(doc(db, 'consensus_audits', audit.id), record);
        return true;
      } catch (err) {
        console.error('[Firestore] Submit audit error:', err);
        return false;
      }
    },
    [user]
  );

  // Voluntary Pledges
  const submitVoluntaryPledge = useCallback(
    async (pledge: Omit<VoluntaryPledgeRecord, 'userId' | 'createdAt'>): Promise<boolean> => {
      if (!user) return false;
      try {
        const record: VoluntaryPledgeRecord = {
          ...pledge,
          userId: user.uid,
          createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'voluntary_pledges', pledge.id), record);
        setVoluntaryPledges((prev) => [record, ...prev]);
        return true;
      } catch (err) {
        console.error('[Firestore] Submit pledge error:', err);
        return false;
      }
    },
    [user]
  );

  return (
    <FirebaseContext.Provider
      value={{
        user,
        userProfile,
        needsRegistration,
        isLoadingAuth,
        isFirestoreConnected,
        authError,
        clearAuthError,
        savedDossiers,
        communityAudits,
        voluntaryPledges,
        allRegisteredUsers,
        loginWithGoogle,
        loginWithMicrosoft,
        loginWithEmail,
        registerWithEmail,
        loginAsGuest,
        logout,
        registerUserProfile,
        updateUserProfile,
        saveDossier,
        submitCommunityAudit,
        submitVoluntaryPledge
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
