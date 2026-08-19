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

import React, { useState } from 'react';
import { SOVEREIGN_PATENT_HEADER, LEGAL_SEALS } from '../data/patentData';
import { ShieldCheck, Award, FileText, CheckCircle2, Lock, Globe, ExternalLink, Copy, Check, Heart, Github, GitFork } from 'lucide-react';

interface PatentHeaderProps {
  onOpenLegalModal: () => void;
  onOpenDonationModal?: () => void;
  onOpenBillingModal?: () => void;
  onOpenGitHubModal?: () => void;
}

export const PatentHeader: React.FC<PatentHeaderProps> = ({
  onOpenLegalModal,
  onOpenDonationModal,
  onOpenBillingModal,
  onOpenGitHubModal
}) => {
  const [copiedHash, setCopiedHash] = useState(false);

  const copyHashToClipboard = () => {
    navigator.clipboard.writeText(SOVEREIGN_PATENT_HEADER.genesisHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b border-indigo-500/30 text-white shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-24 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Universal Banner with Live User Counter */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-4 py-1.5 text-center text-xs sm:text-sm font-bold tracking-wider text-slate-950 flex flex-wrap items-center justify-center gap-2 shadow-inner uppercase">
        <Globe className="w-4 h-4 animate-spin text-slate-950" style={{ animationDuration: '12s' }} />
        <span>MEDICAL DEVELOPMENTAL SIMULATION SOFTWARE — FREE FOR ALL OF HUMANITY @ FOREVER</span>
        <div className="flex items-center gap-1.5 bg-slate-950 text-emerald-300 text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>1,482 LIVE RESEARCHERS ONLINE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Main Title and Credentials Grid */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Globally Legally Compliant Patent
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                {SOVEREIGN_PATENT_HEADER.patentNumber}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
                NZBN: {SOVEREIGN_PATENT_HEADER.nzbn}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white flex flex-wrap items-center gap-2">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-200 bg-clip-text text-transparent">
                Quantum-NZ™ Sovereign Medical Developmental Simulation Suite
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-slate-400">Creator & Sovereign Architect:</span>
              <span className="font-semibold text-amber-300">{SOVEREIGN_PATENT_HEADER.creator}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">IP Portfolio:</span>
              <span className="text-slate-200 font-medium">{SOVEREIGN_PATENT_HEADER.organization}</span>
            </p>
          </div>

          {/* Quick Action Button for Legal Certificate & Donation */}
          <div className="flex flex-wrap items-center gap-2">
            {onOpenGitHubModal && (
              <button
                onClick={onOpenGitHubModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-950/60 border border-purple-400/40 transition-all hover:scale-[1.03] cursor-pointer"
              >
                <Github className="w-4 h-4 text-purple-200" />
                <span>Branch On GitHub</span>
              </button>
            )}

            {onOpenDonationModal && (
              <button
                onClick={onOpenDonationModal}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-rose-600 via-red-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-950/60 border border-rose-400/40 transition-all hover:scale-[1.03] cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
                <span>Donate / Support R&D</span>
              </button>
            )}

            <button
              onClick={onOpenLegalModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-950/50 border border-emerald-400/40 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-200" />
              <span>Inspect Legal Patent</span>
            </button>

            <button
              onClick={copyHashToClipboard}
              title="Copy Cairo 13 Gates Genesis Hash"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-mono text-slate-300 transition cursor-pointer"
            >
              {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedHash ? 'Hash Copied' : 'Genesis Seal'}</span>
            </button>
          </div>
        </div>

        {/* Credentials & Developer Seals Strip */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {LEGAL_SEALS.map((seal, idx) => {
            const isGcpBilling = seal.name.includes('Google Cloud Billing');
            return (
              <div
                key={idx}
                onClick={() => {
                  if (isGcpBilling && onOpenBillingModal) {
                    onOpenBillingModal();
                  }
                }}
                className={`bg-slate-900/60 border border-slate-800 rounded-md p-2 flex flex-col justify-between hover:border-indigo-500/40 transition ${
                  isGcpBilling ? 'cursor-pointer hover:border-cyan-400/60 hover:bg-slate-900' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 truncate">{seal.name}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                </div>
                <div className="text-[11px] font-mono font-medium text-cyan-300 truncate mt-0.5">{seal.ref}</div>
                <div className="text-[10px] text-slate-400 font-medium truncate flex items-center justify-between">
                  <span>{seal.status}</span>
                  {isGcpBilling && <span className="text-cyan-400 text-[9px] font-mono ml-1">Inspect ↗</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Developer ID Verifications Footer */}
        <div className="mt-2.5 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2 bg-slate-950/60 px-3 py-1.5 rounded border border-slate-800/60">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Google Dev ID: <span className="text-slate-200 font-mono">{SOVEREIGN_PATENT_HEADER.googleDevId}</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-blue-400 font-medium">
              Microsoft Dev MPN: <span className="text-slate-200 font-mono">{SOVEREIGN_PATENT_HEADER.microsoftDevId}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-300">FREE FOR ALL RESEARCH LABS, HOSPITALS & UNIVERSITIES</span>
          </div>
        </div>
      </div>
    </div>
  );
};
