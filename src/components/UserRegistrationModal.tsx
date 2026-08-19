/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: USER PERSISTENT REGISTRY & REGISTRATION ON FIRST LOGIN
 * @FIRESTORE_COLLECTION: /users/{userId}
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Building2,
  Globe,
  ShieldCheck,
  Sparkles,
  Heart,
  CheckCircle2,
  AlertCircle,
  X,
  FileCheck,
  Radio,
  BookOpen
} from 'lucide-react';
import { useFirebase, UserProfile } from '../context/FirebaseContext';
import { useAudioNarrator } from '../context/AudioNarratorContext';

interface UserRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserRegistrationModal: React.FC<UserRegistrationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { user, userProfile, registerUserProfile, updateUserProfile, authError } = useFirebase();
  const { speak } = useAudioNarrator();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState<'researcher' | 'clinician' | 'student' | 'public_humanitarian' | 'admin'>('researcher');
  const [primaryResearchInterest, setPrimaryResearchInterest] = useState('Non-Small Cell Lung Cancer (EGFR T790M/C797S)');
  const [country, setCountry] = useState('New Zealand');
  const [openAccessPledgeAccepted, setOpenAccessPledgeAccepted] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(userProfile?.displayName || user.displayName || '');
      setEmail(userProfile?.email || user.email || '');
      if (userProfile?.organization) setOrganization(userProfile.organization);
      if (userProfile?.role) setRole(userProfile.role);
      if (userProfile?.primaryResearchInterest) setPrimaryResearchInterest(userProfile.primaryResearchInterest);
      if (userProfile?.country) setCountry(userProfile.country);
      if (userProfile?.openAccessPledgeAccepted !== undefined) {
        setOpenAccessPledgeAccepted(userProfile.openAccessPledgeAccepted);
      }
    }
  }, [user, userProfile]);

  useEffect(() => {
    if (isOpen) {
      speak(
        'Welcome to the Sovereign Biomedical Research Registry. Please verify your registration profile to enable persistent research dossiers and real-time community consensus audits.',
        { priority: 'high' }
      );
    }
  }, [isOpen, speak]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!openAccessPledgeAccepted) {
      speak('Please accept the Universal Open Access Covenant to complete registration.', {
        priority: 'high'
      });
      return;
    }

    setIsSaving(true);
    const providerId = (user?.providerData[0]?.providerId as any) || (user?.isAnonymous ? 'anonymous' : 'password');

    const profileData: Omit<UserProfile, 'userId' | 'createdAt' | 'registeredAt'> = {
      displayName: displayName.trim() || 'Sovereign Researcher',
      email: email.trim() || user?.email || '',
      photoURL: user?.photoURL || undefined,
      authProvider: providerId,
      organization: organization.trim() || 'Independent Biomedical Lab',
      role,
      primaryResearchInterest,
      country: country.trim() || 'Global',
      openAccessPledgeAccepted: true
    };

    let ok = false;
    if (userProfile) {
      ok = await updateUserProfile(profileData);
    } else {
      ok = await registerUserProfile(profileData);
    }

    setIsSaving(false);
    if (ok) {
      setSaveSuccess(true);
      speak(
        `Registration confirmed for ${displayName || 'Researcher'}. Your credentials are now sealed in the Firestore persistent registry.`,
        { priority: 'high' }
      );
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-xl w-full shadow-2xl relative text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border-b border-slate-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Researcher Persistent Registry & Profile</span>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  Firestore /users/{user?.uid ? user.uid.slice(0, 6) + '...' : 'auth'}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                First-time setup for persistent dossiers, simulations, and WIPO consensus audits
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Success Banner */}
          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Researcher profile successfully registered and sealed in Firestore!</span>
            </div>
          )}

          {/* Provider Badge */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="w-9 h-9 rounded-full border border-emerald-500/40 object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-300">
                  {(displayName || email || 'R')[0].toUpperCase()}
                </div>
              )}
              <div>
                <div className="font-bold text-white">{displayName || 'Anonymous Researcher'}</div>
                <div className="text-[11px] text-slate-400">{email || 'Authenticated User'}</div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-500/40">
                {user?.providerData[0]?.providerId === 'google.com'
                  ? 'Google Auth'
                  : user?.providerData[0]?.providerId === 'microsoft.com'
                  ? 'Microsoft Auth'
                  : user?.isAnonymous
                  ? 'Anonymous Guest'
                  : 'Email Auth'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Full Name / Moniker *
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Dr. Alexander Fleming"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@hospital.org"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Affiliated Organization */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Institution / Hospital / Lab *
              </label>
              <input
                type="text"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. Auckland Oncology Institute / Mayo Clinic"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Research Role */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Ecosystem Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="researcher">Biomedical Researcher / Scientist</option>
                <option value="clinician">Clinical Physician / Oncologist</option>
                <option value="student">Medical / Doctoral Student</option>
                <option value="public_humanitarian">Public Health & Humanitarian</option>
                <option value="admin">Lab Administrator / PI</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Primary Research Interest */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Primary Target Disease / Interest
              </label>
              <select
                value={primaryResearchInterest}
                onChange={(e) => setPrimaryResearchInterest(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Non-Small Cell Lung Cancer (EGFR T790M/C797S)">
                  Non-Small Cell Lung Cancer (EGFR T790M/C797S)
                </option>
                <option value="Glioblastoma Multiforme (MGMT / EGFRvIII)">
                  Glioblastoma Multiforme (MGMT / EGFRvIII)
                </option>
                <option value="Alzheimer's Disease (Amyloid-Beta / Tau)">
                  Alzheimer's Disease (Amyloid-Beta / Tau)
                </option>
                <option value="Pancreatic Ductal Adenocarcinoma (KRAS G12D)">
                  Pancreatic Ductal Adenocarcinoma (KRAS G12D)
                </option>
                <option value="Triple-Negative Breast Cancer (BRCA1 / PARP)">
                  Triple-Negative Breast Cancer (BRCA1 / PARP)
                </option>
                <option value="Parkinson's Disease (Alpha-Synuclein / LRRK2)">
                  Parkinson's Disease (Alpha-Synuclein / LRRK2)
                </option>
                <option value="Malaria (Plasmodium Falciparum DHFR)">
                  Malaria (Plasmodium Falciparum DHFR)
                </option>
                <option value="Universal Pan-Target Macromolecular Simulation">
                  Universal Pan-Target Macromolecular Simulation
                </option>
              </select>
            </div>

            {/* Country / Jurisdiction */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Country / Sovereign Territory
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. New Zealand, USA, UK, Switzerland, Japan"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Universal Open Access Covenant Agreement */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={openAccessPledgeAccepted}
                onChange={(e) => setOpenAccessPledgeAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-emerald-500 focus:ring-0 focus:outline-none cursor-pointer"
              />
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Affirm Universal Open Access Covenant (WIPO PCT/NZ2025/000001)</span>
                </span>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  I affirm that all cures, simulation datasets, and molecular coordinates accessed or generated under this registry are forever royalty-free, unmonopolized, and dedicated to the health and healing of all humanity.
                </p>
              </div>
            </label>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition cursor-pointer"
            >
              Skip for Now
            </button>

            <button
              type="submit"
              disabled={isSaving || !openAccessPledgeAccepted}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <FileCheck className="w-4 h-4" />
              <span>{isSaving ? 'Registering...' : 'Confirm & Save Registry Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
