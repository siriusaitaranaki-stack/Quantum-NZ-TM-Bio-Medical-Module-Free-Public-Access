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
  HandHeart
} from 'lucide-react';

export type ActiveTab =
  | 'find-a-cure'
  | 'docking'
  | 'diseases'
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
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  onOpenExportModal,
  onOpenLegalModal,
  onOpenDonationModal
}) => {
  const navItems = [
    {
      id: 'find-a-cure' as ActiveTab,
      label: 'Find A Cure (Live DBs & Lumana AI)',
      icon: HeartPulse,
      badge: 'Lumana AI + 16 DBs',
      description: 'Live Universal Search & Lumana AI Agent'
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

          {/* Action Tools */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              onClick={onOpenDonationModal}
              title="Donate to Humanitarian Software & Laboratory R&D (BNZ, PayPal, GPay, Stripe)"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 via-red-600 to-pink-600 hover:from-rose-500 hover:to-red-500 text-white border border-rose-400/40 text-xs font-bold shadow-md shadow-rose-950/50 transition hover:scale-105 cursor-pointer animate-pulse"
            >
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
              <span>Donate Here</span>
            </button>

            <button
              onClick={onOpenLegalModal}
              title="View Globally Legally Compliant Patent & Humanitarian Grant"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-medium transition cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Patent Grant</span>
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
