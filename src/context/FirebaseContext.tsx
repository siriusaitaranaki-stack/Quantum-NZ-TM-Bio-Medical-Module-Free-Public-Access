/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: FIREBASE AUTHENTICATION (GOOGLE + MICROSOFT + EMAIL) & PERSISTENT REGISTRY & GMAIL OAUTH
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
  updateDoc,
  deleteDoc,
  query,
  limit,
  onSnapshot
} from 'firebase/firestore';
import { auth, db, testFirestoreConnection } from '../firebase/config';

export const GMAIL_SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.labels',
  'https://www.googleapis.com/auth/gmail.metadata',
  'https://www.googleapis.com/auth/gmail.addons.current.action.compose',
  'https://www.googleapis.com/auth/gmail.addons.current.message.action',
  'https://www.googleapis.com/auth/gmail.addons.current.message.metadata',
  'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
  'https://www.googleapis.com/auth/gmail.insert',
  'https://www.googleapis.com/auth/gmail.settings.basic',
  'https://www.googleapis.com/auth/gmail.settings.sharing'
];

export const GOOGLE_WORKSPACE_SCOPES = [
  ...GMAIL_SCOPES,
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/spreadsheets.readonly'
];

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

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  userEmail: string;
  displayName: string;
  photoURL?: string;
  authProvider?: string;
  role?: string;
  organization?: string;
  text: string;
  attachedCureId?: string;
  attachedCureName?: string;
  attachedFormula?: string;
  standingWaveFrequency?: string;
  phaseCoherence?: number;
  reactions?: Record<string, string[]>;
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
  googleAccessToken: string | null;
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
  sendChatMessage: (message: {
    roomId: string;
    text: string;
    attachedCureId?: string;
    attachedCureName?: string;
    attachedFormula?: string;
    standingWaveFrequency?: string;
    phaseCoherence?: number;
  }) => Promise<boolean>;
  toggleChatReaction: (messageId: string, emoji: string, currentReactions?: Record<string, string[]>) => Promise<boolean>;
  deleteChatMessage: (messageId: string) => Promise<boolean>;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [needsRegistration, setNeedsRegistration] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [isFirestoreConnected, setIsFirestoreConnected] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);

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
        setUserProfile(null);
        if (!firebaseUser.isAnonymous) {
          setNeedsRegistration(true);
        } else {
          setNeedsRegistration(false);
        }
      }
    } catch (err: any) {
      console.warn('[Firestore] Error fetching user profile:', err.message);
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
        setGoogleAccessToken(null);
      }
      setIsLoadingAuth(false);
    });

    return () => unsubscribe();
  }, [fetchUserProfile]);

  // 3. Sync All Registered Users
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
      // Add Google Workspace (Gmail, Sheets, Drive) scopes
      GOOGLE_WORKSPACE_SCOPES.forEach((scope) => {
        provider.addScope(scope);
      });
      provider.setCustomParameters({ prompt: 'select_account' });
      const cred = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(cred);
      if (credential?.accessToken) {
        setGoogleAccessToken(credential.accessToken);
      }
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
      setGoogleAccessToken(null);
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

  // Live Chat System
  const sendChatMessage = useCallback(
    async (message: {
      roomId: string;
      text: string;
      attachedCureId?: string;
      attachedCureName?: string;
      attachedFormula?: string;
      standingWaveFrequency?: string;
      phaseCoherence?: number;
    }): Promise<boolean> => {
      if (!user) return false;
      try {
        const msgId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
        const record: ChatMessage = {
          id: msgId,
          roomId: message.roomId,
          userId: user.uid,
          userEmail: user.email || (user.isAnonymous ? 'guest@openaccess.int' : 'researcher@sovereign.int'),
          displayName: userProfile?.displayName || user.displayName || (user.isAnonymous ? 'Guest Observer' : 'Verified Researcher'),
          photoURL: userProfile?.photoURL || user.photoURL || undefined,
          authProvider: userProfile?.authProvider || (user.providerData[0]?.providerId || (user.isAnonymous ? 'anonymous' : 'password')),
          role: userProfile?.role || 'researcher',
          organization: userProfile?.organization || 'Global Biomedical Collaborative',
          text: message.text.trim(),
          attachedCureId: message.attachedCureId || undefined,
          attachedCureName: message.attachedCureName || undefined,
          attachedFormula: message.attachedFormula || undefined,
          standingWaveFrequency: message.standingWaveFrequency || undefined,
          phaseCoherence: message.phaseCoherence ?? 1.0,
          reactions: {},
          createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'chat_messages', msgId), record);
        return true;
      } catch (err) {
        console.error('[Firestore] Send chat message error:', err);
        return false;
      }
    },
    [user, userProfile]
  );

  const toggleChatReaction = useCallback(
    async (messageId: string, emoji: string, currentReactions: Record<string, string[]> = {}): Promise<boolean> => {
      if (!user) return false;
      try {
        const existingUsers = currentReactions[emoji] || [];
        const hasReacted = existingUsers.includes(user.uid);
        const updatedUsers = hasReacted
          ? existingUsers.filter((uid) => uid !== user.uid)
          : [...existingUsers, user.uid];

        const updatedReactions = { ...currentReactions, [emoji]: updatedUsers };
        if (updatedUsers.length === 0) {
          delete updatedReactions[emoji];
        }

        await updateDoc(doc(db, 'chat_messages', messageId), {
          reactions: updatedReactions
        });
        return true;
      } catch (err) {
        console.error('[Firestore] Toggle reaction error:', err);
        return false;
      }
    },
    [user]
  );

  const deleteChatMessage = useCallback(
    async (messageId: string): Promise<boolean> => {
      if (!user) return false;
      try {
        await deleteDoc(doc(db, 'chat_messages', messageId));
        return true;
      } catch (err) {
        console.error('[Firestore] Delete message error:', err);
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
        googleAccessToken,
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
        submitVoluntaryPledge,
        sendChatMessage,
        toggleChatReaction,
        deleteChatMessage
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
