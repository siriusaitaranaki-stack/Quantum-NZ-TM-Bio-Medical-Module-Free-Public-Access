/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @AUTHENTICATION_KEY_SPACE: 2^49152 BITS [IRREVERSIBLE CRYPTOGRAPHIC IMMUTABILITY]
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001 (Universal Open Access Covenant Free For Humanity Forever)
 * @CONTEXT: TAB CONTENT RENDERER FOR MULTI-TAB & DETACHED FLOATING WINDOW ARCHITECTURE
 * ==============================================================================================
 */

import React from 'react';
import { WorkspaceTab, useTabWorkspace } from '../context/TabWorkspaceContext';
import { FindACureLive } from './FindACureLive';
import { GlobalUsersMap } from './GlobalUsersMap';
import { DockingSimulator } from './DockingSimulator';
import { DiseaseLab } from './DiseaseLab';
import { QuantumCalculusLab } from './QuantumCalculusLab';
import { CrossReferenceEngine } from './CrossReferenceEngine';
import { ProductionScaler } from './ProductionScaler';
import { HumanitarianDonationLab } from './HumanitarianDonationLab';
import { LiveChat } from './LiveChat';
import {
  FileText,
  FileSpreadsheet,
  CheckSquare,
  Video,
  MessageSquare,
  Mail,
  Users,
  Cloud,
  ShieldCheck,
  Globe,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';

interface TabContentRendererProps {
  tab: WorkspaceTab;
  onNavigateTo3DSimulator?: (diseaseId?: string, isMultiCombo?: boolean) => void;
  onOpenExportModal?: () => void;
  onOpenLegalModal?: () => void;
  onOpenDonationModal?: () => void;
  onOpenAuthModal?: () => void;
  onOpenRegistryModal?: () => void;
  onOpenBillingModal?: () => void;
  onOpenGmailModal?: () => void;
  onOpenSheetsModal?: () => void;
  onOpenDocsModal?: () => void;
  onOpenFormsModal?: () => void;
  onOpenGoogleChatModal?: () => void;
  onOpenGoogleMeetModal?: () => void;
}

export const TabContentRenderer: React.FC<TabContentRendererProps> = ({
  tab,
  onNavigateTo3DSimulator,
  onOpenExportModal,
  onOpenLegalModal,
  onOpenDonationModal,
  onOpenAuthModal,
  onOpenRegistryModal,
  onOpenBillingModal,
  onOpenGmailModal,
  onOpenSheetsModal,
  onOpenDocsModal,
  onOpenFormsModal,
  onOpenGoogleChatModal,
  onOpenGoogleMeetModal
}) => {
  const { openTab } = useTabWorkspace();
  const { user, allRegisteredUsers } = useFirebase();

  switch (tab.tabType) {
    case 'find-a-cure':
      return (
        <FindACureLive
          onNavigateTo3DSimulator={(diseaseId, isMulti) => {
            if (onNavigateTo3DSimulator) {
              onNavigateTo3DSimulator(diseaseId, isMulti);
            } else {
              openTab('docking', { diseaseId, isMulti });
            }
          }}
        />
      );

    case 'global-users-map':
      return (
        <GlobalUsersMap
          onOpenGoogleChatModal={onOpenGoogleChatModal}
          onOpenGoogleMeetModal={onOpenGoogleMeetModal}
        />
      );

    case 'live-chat':
      return (
        <LiveChat
          onNavigateToSimulator={(diseaseId) => {
            if (onNavigateTo3DSimulator) {
              onNavigateTo3DSimulator(diseaseId);
            } else {
              openTab('docking', { diseaseId });
            }
          }}
          onOpenAuthModal={onOpenAuthModal || (() => {})}
        />
      );

    case 'docking':
      return (
        <DockingSimulator
          initialDiseaseId={tab.params?.diseaseId || 'nsclc'}
          initialMode={tab.params?.isMulti ? 'combination' : 'single'}
        />
      );

    case 'diseases':
      return <DiseaseLab />;

    case 'quantum-calculus':
      return <QuantumCalculusLab />;

    case 'cross-reference':
      return <CrossReferenceEngine />;

    case 'production':
      return <ProductionScaler />;

    case 'donate':
      return <HumanitarianDonationLab />;

    // Embedded Workspace Quick Panels
    case 'docs':
      return (
        <div className="p-6 rounded-3xl bg-slate-900 border border-blue-500/40 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/40">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Google Docs Dossier Studio (Docs API v1)</h2>
                <p className="text-xs text-slate-400">
                  Compile comprehensive multi-omics medical reports directly into Google Docs
                </p>
              </div>
            </div>
            {onOpenDocsModal && (
              <button
                onClick={onOpenDocsModal}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Full Docs Studio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Generate and browse certified research dossiers with standing wave harmonic calibration parameters
            and open-access patent references (WIPO PCT/NZ2025/000001).
          </p>
        </div>
      );

    case 'sheets':
      return (
        <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/40 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Google Sheets Clinical Matrix (Sheets API v4)</h2>
                <p className="text-xs text-slate-400">
                  Export datasets, synchronize clinical logs, and compute docking matrix formulas
                </p>
              </div>
            </div>
            {onOpenSheetsModal && (
              <button
                onClick={onOpenSheetsModal}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Full Sheets Matrix</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Create structured Google Sheets workbooks containing deterministic quantum standing wave parameters,
            molecular dynamics metrics, and multi-center clinical validation data.
          </p>
        </div>
      );

    case 'forms':
      return (
        <div className="p-6 rounded-3xl bg-slate-900 border border-purple-500/40 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Google Forms Clinical Trial Builder (Forms API v1)</h2>
                <p className="text-xs text-slate-400">
                  Provision structured patient response questionnaires and monitor live submissions
                </p>
              </div>
            </div>
            {onOpenFormsModal && (
              <button
                onClick={onOpenFormsModal}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Full Forms Builder</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      );

    case 'google-chat':
      return (
        <div className="p-6 rounded-3xl bg-slate-900 border border-teal-500/40 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/40">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Google Chat Collaborative Spaces (Chat API v1)</h2>
                <p className="text-xs text-slate-400">
                  Broadcast cardV2 notifications and coordinate with global oncology teams
                </p>
              </div>
            </div>
            {onOpenGoogleChatModal && (
              <button
                onClick={onOpenGoogleChatModal}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Google Chat Spaces</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      );

    case 'google-meet':
      return (
        <div className="p-6 rounded-3xl bg-slate-900 border border-blue-500/40 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/40">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Google Meet Multi-Center Review (Meet API v2)</h2>
                <p className="text-xs text-slate-400">
                  Launch instant encrypted video consultations and bridge invitations to Google Chat
                </p>
              </div>
            </div>
            {onOpenGoogleMeetModal && (
              <button
                onClick={onOpenGoogleMeetModal}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Google Meet Room</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      );

    case 'gmail':
      return (
        <div className="p-6 rounded-3xl bg-slate-900 border border-rose-500/40 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Gmail Institutional Dispatcher (Gmail API v1)</h2>
                <p className="text-xs text-slate-400">
                  Dispatch cryptographically signed medical dossiers to hospitals and regulatory bodies
                </p>
              </div>
            </div>
            {onOpenGmailModal && (
              <button
                onClick={onOpenGmailModal}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open Gmail Dispatcher</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      );

    case 'registry':
      return (
        <div className="p-6 rounded-3xl bg-slate-900 border border-indigo-500/40 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Global Researcher IAM Registry Directory</h2>
                <p className="text-xs text-slate-400">
                  {allRegisteredUsers.length} Verified International Oncology & Bio-Medical Nodes
                </p>
              </div>
            </div>
            {onOpenRegistryModal && (
              <button
                onClick={onOpenRegistryModal}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open Verified Directory</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      );

    case 'billing':
      return (
        <div className="p-6 rounded-3xl bg-slate-900 border border-blue-500/40 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/40">
                <Cloud className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Google Cloud Infrastructure & Billing Audit</h2>
                <p className="text-xs text-slate-400">
                  Account: 01B1F2-C6D3EF-37C0D2 • Developer Grant Tier Real-Time Audit
                </p>
              </div>
            </div>
            {onOpenBillingModal && (
              <button
                onClick={onOpenBillingModal}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open GCP Audit Modal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      );

    case 'legal':
      return (
        <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/40 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">WIPO Patent Legal Certification</h2>
                <p className="text-xs text-slate-400">
                  WIPO PCT/NZ2025/000001 • Universal Open Access Covenant Free For Humanity Forever
                </p>
              </div>
            </div>
            {onOpenLegalModal && (
              <button
                onClick={onOpenLegalModal}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Full Covenant</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      );

    case 'export':
      return (
        <div className="p-6 rounded-3xl bg-slate-900 border border-cyan-500/40 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Export Sovereign Medical Dossier</h2>
                <p className="text-xs text-slate-400">
                  Export complete data matrices in PDF, JSON, LaTeX, and CSV formats
                </p>
              </div>
            </div>
            {onOpenExportModal && (
              <button
                onClick={onOpenExportModal}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Export Studio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      );

    default:
      return <FindACureLive onNavigateTo3DSimulator={onNavigateTo3DSimulator} />;
  }
};
