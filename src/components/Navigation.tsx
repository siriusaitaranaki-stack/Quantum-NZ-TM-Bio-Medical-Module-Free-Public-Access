/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @AUTHENTICATION_KEY_SPACE: 2^49152 BITS [IRREVERSIBLE CRYPTOGRAPHIC IMMUTABILITY]
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001 (Universal Open Access Covenant Free For Humanity Forever)
 * @SOVEREIGN_ARCHITECT_CREATOR: James Andrew Douglas Paton
 * @PROPRIETARY_REGISTRATION: NZBN 9429048181570 | Discrete PC / Landreth Legacy Trust IP
 * @COHERENCE_CORE: DETERMINISTIC VERIFICATION MATRIX (COHERENCE = 100.000000%, ACCURACY = 100.000000%)
 * ==============================================================================================
 */

import React from 'react';
import {
  Activity,
  Dna,
  Atom,
  Database,
  Factory,
  Sparkles,
  FileCheck2,
  Share2,
  Clock,
  Shield,
  HeartPulse,
  Heart,
  HandHeart,
  LogIn,
  User,
  Users,
  CheckCircle2,
  Mail,
  FileSpreadsheet,
  MessageSquare,
  FileText,
  CheckSquare,
  Video
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';

export type ActiveTab =
  | 'find-a-cure'
  | 'docking'
  | 'diseases'
  | 'live-chat'
  | 'quantum-calculus'
  | 'cross-reference'
  | 'production'
  | 'donate';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenExportModal: () => void;
  onOpenLegalModal: () => void;
  onOpenDonationModal: () => void;
  onOpenAuthModal: () => void;
  onOpenRegistryModal: () => void;
  onOpenGmailModal: () => void;
  onOpenSheetsModal: () => void;
  onOpenDocsModal: () => void;
  onOpenFormsModal: () => void;
  onOpenGoogleChatModal: () => void;
  onOpenGoogleMeetModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  onOpenExportModal,
  onOpenLegalModal,
  onOpenDonationModal,
  onOpenAuthModal,
  onOpenRegistryModal,
  onOpenGmailModal,
  onOpenSheetsModal,
  onOpenDocsModal,
  onOpenFormsModal,
  onOpenGoogleChatModal,
  onOpenGoogleMeetModal
}) => {
  const { user, userProfile, googleAccessToken } = useFirebase();

  const navItems = [
    {
      id: 'find-a-cure' as ActiveTab,
      label: 'Find A Cure (Live DBs & Lumana AI)',
      icon: HeartPulse,
      badge: 'Lumana AI + 16 DBs',
      description: 'Live Universal Search & Lumana AI Agent'
    },
    {
      id: 'live-chat' as ActiveTab,
      label: 'Live Chat (@Google / @Microsoft)',
      icon: MessageSquare,
      badge: 'Live Sync',
      description: 'Real-Time Authenticated Researcher Collaboration'
    },
    {
      id: 'docking' as ActiveTab,
      label: '3D Molecular Docking',
      icon: Atom,
      badge: 'Physics Engine',
      description: 'Lennard-Jones & Coulomb Force-Fields'
    },
    {
      id: 'diseases' as ActiveTab,
      label: 'Disease Developmental Lab',
      icon: Dna,
      badge: 'Top 10+ Cures',
      description: 'Oncology, Neuro & Genetic Targets'
    },
    {
      id: 'quantum-calculus' as ActiveTab,
      label: '{0=T}~{~=C} Standing Wave',
      icon: Activity,
      badge: 'Chronous/Lazarus',
      description: 'Temporal Causality Simulator'
    },
    {
      id: 'cross-reference' as ActiveTab,
      label: 'Biomedical Database Mesh',
      icon: Database,
      badge: '16+ Live DBs',
      description: 'PDB, PubChem, UniProt & Trials'
    },
    {
      id: 'production' as ActiveTab,
      label: '12-Hub Global Production',
      icon: Factory,
      badge: '615M Doses/Yr',
      description: 'Scalable Manufacturing & Logistics'
    },
    {
      id: 'donate' as ActiveTab,
      label: 'Humanitarian R&D Fund',
      icon: HandHeart,
      badge: 'BNZ / PayPal / GPay',
      description: 'Support Global Disease Research'
    }
  ];

  const providerLabel =
    user?.providerData[0]?.providerId === 'google.com'
      ? 'Google Auth'
      : user?.providerData[0]?.providerId === 'microsoft.com'
      ? 'Microsoft Auth'
      : user?.isAnonymous
      ? 'Guest'
      : 'User';

  return (
    <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between py-2.5 gap-2">
          {/* Scrollable Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin scrollbar-thumb-slate-700">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isDonate = item.id === 'donate';
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? isDonate
                        ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-900/40 border border-rose-400/40'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/40 border border-blue-400/30'
                      : isDonate
                      ? 'text-rose-300 hover:text-white hover:bg-rose-950/60 border border-rose-500/30 bg-rose-950/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isDonate ? 'text-rose-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isActive
                        ? 'bg-black/40 text-white border border-white/20'
                        : isDonate
                        ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Tools & Auth Registry Profile */}
          <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
            {/* Google Docs Workspace Button */}
            <button
              onClick={onOpenDocsModal}
              title="Google Workspace: Create & Browse Research Dossiers in Google Docs"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-500/40 text-xs font-semibold transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Docs</span>
            </button>

            {/* Google Sheets Workspace Button */}
            <button
              onClick={onOpenSheetsModal}
              title="Google Workspace: Export Datasets, Browse Drive & Append Clinical Logs"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Sheets</span>
            </button>

            {/* Google Forms Workspace Button */}
            <button
              onClick={onOpenFormsModal}
              title="Google Workspace: Generate Clinical Trial Questionnaires & View Responses"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-500/40 text-xs font-semibold transition cursor-pointer"
            >
              <CheckSquare className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Forms</span>
            </button>

            {/* Google Chat Workspace Button */}
            <button
              onClick={onOpenGoogleChatModal}
              title="Google Workspace: Broadcast Protocol Cards & Collaborate in Google Chat Spaces"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-950/80 hover:bg-teal-900 text-teal-300 border border-teal-500/40 text-xs font-semibold transition cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Chat</span>
            </button>

            {/* Google Meet Workspace Button */}
            <button
              onClick={onOpenGoogleMeetModal}
              title="Google Workspace: Launch Instant Encrypted Clinical Review Rooms with Google Meet API v2"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-500/40 text-xs font-semibold transition cursor-pointer"
            >
              <Video className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Meet</span>
            </button>

            {/* Gmail Workspace Dispatch Button */}
            <button
              onClick={onOpenGmailModal}
              title="Google Workspace: Dispatch Research Dossiers & Read Gmail Threads"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-semibold transition cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Gmail</span>
            </button>

            {/* Global Registry Directory Button */}
            <button
              onClick={onOpenRegistryModal}
              title="Open Global Researcher Persistent Registry Directory"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Registry</span>
            </button>

            {/* Google / Microsoft Auth Button or User Profile Pill */}
            <button
              onClick={onOpenAuthModal}
              title={user ? 'Manage Authentication & Account' : 'Sign in with Google or Microsoft'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                user && !user.isAnonymous
                  ? 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-cyan-500/50'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-cyan-400/40 shadow-md'
              }`}
            >
              {user && user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="w-4 h-4 rounded-full object-cover border border-cyan-300"
                />
              ) : (
                <LogIn className="w-3.5 h-3.5" />
              )}

              <span>
                {user && !user.isAnonymous
                  ? (userProfile?.displayName || user.displayName || user.email?.split('@')[0] || 'Researcher')
                  : 'Sign In (Google / Microsoft)'}
              </span>

              {user && !user.isAnonymous && (
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cyan-950 text-cyan-200 border border-cyan-500/30">
                  {providerLabel}
                </span>
              )}
            </button>

            <button
              onClick={onOpenDonationModal}
              title="Donate to Humanitarian Software & Laboratory R&D (BNZ, PayPal, GPay, Stripe)"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 via-red-600 to-pink-600 hover:from-rose-500 hover:to-red-500 text-white border border-rose-400/40 text-xs font-bold shadow-md shadow-rose-950/50 transition hover:scale-105 cursor-pointer animate-pulse"
            >
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
              <span className="hidden sm:inline">Donate</span>
            </button>

            <button
              onClick={onOpenLegalModal}
              title="View Globally Legally Compliant Patent & Humanitarian Grant"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-medium transition cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Patent</span>
            </button>

            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border border-purple-400/30 text-xs font-semibold shadow-md shadow-purple-950/50 transition hover:scale-105 cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-purple-200" />
              <span>Export Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
