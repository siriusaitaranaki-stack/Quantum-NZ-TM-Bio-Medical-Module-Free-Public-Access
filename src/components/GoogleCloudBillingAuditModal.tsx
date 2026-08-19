/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: GOOGLE CLOUD BILLING AUDIT & VOLUNTARY HUMANITARIAN DONATION TELEMETRY
 * @BILLING_ACCOUNT_ID: 01B1F2-C6D3EF-37C0D2
 * @DEVELOPER_IAM_IDENTITY: siriusaitaranaki@gmail.com
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import React, { useState } from 'react';
import {
  Cloud,
  DollarSign,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Info,
  Server,
  Cpu,
  Database,
  Radio,
  X,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { GOOGLE_CLOUD_BILLING_CONFIG, SOVEREIGN_PATENT_HEADER } from '../data/patentData';
import { useAudioNarrator } from '../context/AudioNarratorContext';

interface GoogleCloudBillingAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDonationModal: () => void;
}

export const GoogleCloudBillingAuditModal: React.FC<GoogleCloudBillingAuditModalProps> = ({
  isOpen,
  onClose,
  onOpenDonationModal
}) => {
  const { speak } = useAudioNarrator();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const totalCost = GOOGLE_CLOUD_BILLING_CONFIG.currentMonthlyChargesUsd;
  const threshold = GOOGLE_CLOUD_BILLING_CONFIG.monthlyThresholdUsd;
  const isExceeded = totalCost > threshold;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-100 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 border-b border-slate-800 p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Google Cloud Billing Account Telemetry</span>
                <span className="text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded-full">
                  01B1F2-C6D3EF-37C0D2
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Primary Humanitarian Cloud Infrastructure • Linked to {GOOGLE_CLOUD_BILLING_CONFIG.ownerEmail}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Status & Threshold Card */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs text-slate-400 font-mono uppercase">Billing Account ID</div>
                <div className="text-xl font-extrabold text-cyan-300 font-mono flex items-center gap-2">
                  <span>{GOOGLE_CLOUD_BILLING_CONFIG.billingAccountId}</span>
                  <button
                    onClick={() => handleCopy(GOOGLE_CLOUD_BILLING_CONFIG.billingAccountId, 'billingId')}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    title="Copy Billing Account ID"
                  >
                    {copiedKey === 'billingId' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400 font-mono uppercase">Monthly Budget Threshold</div>
                <div className="text-sm font-bold text-amber-300 font-mono">
                  ${threshold.toFixed(2)} USD / Month
                </div>
              </div>
            </div>

            {/* Progress Gauge */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Current Monthly Cloud Usage:</span>
                <span className={`font-bold ${isExceeded ? 'text-amber-400' : 'text-emerald-400'}`}>
                  ${totalCost.toFixed(2)} USD ({((totalCost / threshold) * 100).toFixed(1)}% of threshold)
                </span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isExceeded
                      ? 'bg-gradient-to-r from-cyan-500 via-emerald-400 to-amber-400'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (totalCost / threshold) * 100)}%` }}
                />
              </div>
            </div>

            {/* Threshold Notice & Voluntary Donation Rule */}
            <div className="p-3.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-300 font-bold">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Voluntary Donation Request Protocol (&gt; $10.00 USD)</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                When monthly Google Cloud compute and simulation inference exceeds <strong>$10.00 USD</strong>, the system displays a voluntary request for donations to offset server costs.
              </p>
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  CRITICAL: Donations are 100% voluntary and NEVER mandatory. The software remains completely free, unrestricted, and open for all humanity forever under Patent PCT/NZ2025/000001.
                </span>
              </div>
            </div>
          </div>

          {/* Compute Usage Breakdown Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Google Cloud Service Cost Breakdown</span>
              <span className="text-[10px] font-mono text-cyan-400 font-normal">Audit: Live Sync</span>
            </h3>

            <div className="space-y-2">
              {GOOGLE_CLOUD_BILLING_CONFIG.computeCostBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 flex items-center justify-between text-xs hover:border-slate-700 transition"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white flex items-center gap-2">
                      {idx === 0 && <Server className="w-3.5 h-3.5 text-cyan-400" />}
                      {idx === 1 && <Cpu className="w-3.5 h-3.5 text-purple-400" />}
                      {idx === 2 && <Database className="w-3.5 h-3.5 text-emerald-400" />}
                      {idx === 3 && <Radio className="w-3.5 h-3.5 text-blue-400" />}
                      <span>{item.service}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.description}</p>
                  </div>
                  <div className="font-mono font-bold text-slate-200 text-sm shrink-0 pl-3">
                    ${item.costUsd.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Developer IAM Credentials */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 text-xs space-y-2">
            <div className="text-[11px] text-slate-400 font-mono uppercase font-bold">
              Authorized GCP Developer IAM Profile
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400">Primary IAM Email: </span>
                <span className="font-mono text-cyan-300 font-semibold">{GOOGLE_CLOUD_BILLING_CONFIG.ownerEmail}</span>
              </div>
              <div>
                <span className="text-slate-400">GCP Project: </span>
                <span className="font-mono text-slate-200">{GOOGLE_CLOUD_BILLING_CONFIG.projectId}</span>
              </div>
              <div>
                <span className="text-slate-400">Sovereign Creator: </span>
                <span className="text-amber-300 font-medium">{SOVEREIGN_PATENT_HEADER.creator}</span>
              </div>
              <div>
                <span className="text-slate-400">New Zealand Entity: </span>
                <span className="font-mono text-slate-200">NZBN {SOVEREIGN_PATENT_HEADER.nzbn}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 bg-slate-900/95 border-t border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 font-mono">
            Charges &gt; $10: Voluntary Support Optional
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
            >
              Close Telemetry
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenDonationModal();
                speak(
                  'Opening humanitarian donation options to optionally support Google Cloud compute costs. Remember that all software remains completely free forever.',
                  { priority: 'high' }
                );
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-950/50 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
              <span>Optional Donation Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
