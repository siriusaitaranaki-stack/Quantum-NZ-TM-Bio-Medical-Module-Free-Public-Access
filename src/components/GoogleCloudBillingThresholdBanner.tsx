/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: GOOGLE CLOUD BILLING THRESHOLD BANNER ($10 USAGE VOLUNTARY DONATION PROMPT)
 * @BILLING_ACCOUNT_ID: 01B1F2-C6D3EF-37C0D2
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import React, { useState } from 'react';
import {
  Cloud,
  DollarSign,
  Heart,
  ShieldCheck,
  Info,
  X,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Zap,
  Copy,
  Check
} from 'lucide-react';
import { GOOGLE_CLOUD_BILLING_CONFIG } from '../data/patentData';
import { useAudioNarrator } from '../context/AudioNarratorContext';

interface GoogleCloudBillingThresholdBannerProps {
  onOpenDonationModal: () => void;
  onOpenBillingAuditModal: () => void;
}

export const GoogleCloudBillingThresholdBanner: React.FC<GoogleCloudBillingThresholdBannerProps> = ({
  onOpenDonationModal,
  onOpenBillingAuditModal
}) => {
  const { speak } = useAudioNarrator();
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const totalCost = GOOGLE_CLOUD_BILLING_CONFIG.currentMonthlyChargesUsd;
  const threshold = GOOGLE_CLOUD_BILLING_CONFIG.monthlyThresholdUsd;
  const isOverThreshold = totalCost >= threshold;

  if (isDismissed || !isOverThreshold) return null;

  const copyBillingId = () => {
    navigator.clipboard.writeText(GOOGLE_CLOUD_BILLING_CONFIG.billingAccountId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div
      onMouseEnter={() =>
        speak(
          `Google Cloud compute charges are currently ${totalCost.toFixed(2)} dollars on Billing Account ${GOOGLE_CLOUD_BILLING_CONFIG.billingAccountId}, which has passed the 10 dollar threshold. You may optionally consider a voluntary donation to support server costs. Donations are strictly voluntary and not mandatory; this software remains completely free forever for all humanity.`,
          { priority: 'hover' }
        )
      }
      className="bg-gradient-to-r from-blue-950/90 via-slate-900/95 to-indigo-950/90 border border-blue-500/40 rounded-xl p-3.5 sm:p-4 text-slate-100 shadow-xl shadow-blue-950/30 transition relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 relative z-10">
        {/* Left column: Icon & Billing Notice */}
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/40 text-cyan-300 shrink-0 mt-0.5">
            <Cloud className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>Google Cloud Billing Threshold Notice</span>
              </span>

              <span className="text-[10px] font-mono bg-blue-900/80 text-blue-200 border border-blue-400/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>Account:</span>
                <span className="font-bold text-cyan-300">{GOOGLE_CLOUD_BILLING_CONFIG.billingAccountId}</span>
                <button
                  onClick={copyBillingId}
                  className="hover:text-white transition cursor-pointer ml-0.5"
                  title="Copy GCP Billing Account ID"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </span>

              <span className="text-[10px] font-mono bg-amber-950/80 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                Charges: ${totalCost.toFixed(2)} USD (&gt; ${threshold.toFixed(2)})
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Google Cloud compute usage on billing account <strong className="text-cyan-300 font-mono">{GOOGLE_CLOUD_BILLING_CONFIG.billingAccountId}</strong> has reached <strong className="text-amber-300 font-mono">${totalCost.toFixed(2)} USD</strong>. If this open-science platform aids your research or medical practice, please consider an <span className="text-rose-300 font-semibold underline decoration-rose-400/50">optional donation</span> to offset server infrastructure costs.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>
                100% Voluntary & Non-Mandatory: The software remains completely free for all humanity in perpetuity.
              </span>
            </div>
          </div>
        </div>

        {/* Right column: Action Buttons & Dismiss */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <button
            onClick={onOpenBillingAuditModal}
            className="px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition cursor-pointer flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span>Audit Usage</span>
          </button>

          <button
            onClick={() => {
              onOpenDonationModal();
              speak(
                'Opening optional donation portal to support Google Cloud compute infrastructure. All donations are non-mandatory and voluntary.',
                { priority: 'high' }
              );
            }}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-md shadow-rose-950/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
            <span>Optional Donation</span>
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
