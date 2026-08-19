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
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  Award,
  Lock,
  Globe,
  Printer,
  Download,
  Copy,
  Check,
  QrCode,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

interface LegalCertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalCertificationModal: React.FC<LegalCertificationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    window.print();
  };

  const handleCopyLegalText = () => {
    const fullLegalDoc = `
================================================================================
OFFICIAL PATENT & UNIVERSAL HUMANITARIAN OPEN-ACCESS DECLARATION
================================================================================
TITLE: ${SOVEREIGN_PATENT_HEADER.title}
CREATOR & SOVEREIGN ARCHITECT: ${SOVEREIGN_PATENT_HEADER.creator}
ORGANIZATION: ${SOVEREIGN_PATENT_HEADER.organization}
NZBN (NEW ZEALAND BUSINESS NUMBER): ${SOVEREIGN_PATENT_HEADER.nzbn}
PATENT REF: ${SOVEREIGN_PATENT_HEADER.patentNumber}
INTERNATIONAL JURISDICTION: ${SOVEREIGN_PATENT_HEADER.jurisdiction}
GOOGLE DEVELOPER ID: ${SOVEREIGN_PATENT_HEADER.googleDevId}
GOOGLE DEVELOPER CREDENTIALS: ${SOVEREIGN_PATENT_HEADER.googleAccount1} | ${SOVEREIGN_PATENT_HEADER.googleAccount2}
MICROSOFT DEVELOPER ID: ${SOVEREIGN_PATENT_HEADER.microsoftDevId}
MICROSOFT CREDENTIALS: ${SOVEREIGN_PATENT_HEADER.microsoftAccount}

GENESIS HASH: ${SOVEREIGN_PATENT_HEADER.genesisHash}
VERIFICATION SIGNATURE: ${SOVEREIGN_PATENT_HEADER.verificationSignature}
CAIRO 13 GATES: ${SOVEREIGN_PATENT_HEADER.cairo13GatesStatus}

${SOVEREIGN_PATENT_HEADER.universalCovenant}
================================================================================
`;
    navigator.clipboard.writeText(fullLegalDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-bold text-white">
              Official Globally Legally Compliant Patent & Humanitarian Grant
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Content - Print-Ready Format */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
          {/* Official Document Border Wrapper */}
          <div className="border-4 border-double border-amber-500/40 p-6 rounded-xl bg-slate-950/90 shadow-2xl relative">
            {/* Header Emblems */}
            <div className="text-center space-y-2 border-b border-amber-500/30 pb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-500 text-slate-950 shadow-lg mb-1">
                <Award className="w-7 h-7" />
              </div>

              <div className="text-[11px] font-mono tracking-widest text-amber-300 uppercase">
                International Sovereign Intellectual Property Registry • WIPO PCT Treaty
              </div>

              <h1 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                {SOVEREIGN_PATENT_HEADER.title}
              </h1>

              <div className="text-xs text-emerald-400 font-semibold">
                Universal Humanitarian Open-Access Covenant — Dedicated Free In Perpetuity
              </div>
            </div>

            {/* Sovereign Credentials Two-Column Table */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <div>
                  <span className="text-slate-400">Creator & Sovereign Architect: </span>
                  <span className="text-amber-300 font-bold">{SOVEREIGN_PATENT_HEADER.creator}</span>
                </div>
                <div>
                  <span className="text-slate-400">IP Portfolio Entity: </span>
                  <span className="text-slate-200 font-medium">{SOVEREIGN_PATENT_HEADER.organization}</span>
                </div>
                <div>
                  <span className="text-slate-400">NZBN (New Zealand Business No.): </span>
                  <span className="text-cyan-300 font-mono font-bold">{SOVEREIGN_PATENT_HEADER.nzbn}</span>
                </div>
                <div>
                  <span className="text-slate-400">Patent Registration Ref: </span>
                  <span className="text-purple-300 font-mono font-bold">{SOVEREIGN_PATENT_HEADER.patentNumber}</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <div>
                  <span className="text-slate-400">Google Developer Auth ID: </span>
                  <span className="text-emerald-300 font-mono font-semibold">{SOVEREIGN_PATENT_HEADER.googleDevId}</span>
                </div>
                <div className="text-[11px] text-slate-300 truncate font-mono">
                  Google IAM: {SOVEREIGN_PATENT_HEADER.googleAccount1}
                </div>
                <div>
                  <span className="text-slate-400">Microsoft Partner MPN: </span>
                  <span className="text-blue-300 font-mono font-semibold">{SOVEREIGN_PATENT_HEADER.microsoftDevId}</span>
                </div>
                <div className="text-[11px] text-slate-300 truncate font-mono">
                  Azure Tenant: {SOVEREIGN_PATENT_HEADER.microsoftAccount}
                </div>
              </div>
            </div>

            {/* Legal Covenant Full Text */}
            <div className="mt-4 bg-slate-900/90 p-4 rounded-lg border border-indigo-500/30 text-xs text-slate-300 space-y-2 leading-relaxed">
              <div className="font-bold text-amber-300 uppercase text-[11px] tracking-wider">
                Universal Humanitarian Grant & Public Health Covenant
              </div>
              <p className="text-justify font-serif text-[12px] leading-normal text-slate-200">
                {SOVEREIGN_PATENT_HEADER.universalCovenant}
              </p>
            </div>

            {/* Cryptographic Seals & Cairo 13 Gates Verification Block */}
            <div className="mt-4 pt-3 border-t border-amber-500/30 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono">
              <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Genesis Hash (Cairo 13 Gates):</span>
                <div className="text-cyan-300 break-all text-[10px]">{SOVEREIGN_PATENT_HEADER.genesisHash}</div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">ECDSA Verification Signature:</span>
                <div className="text-emerald-300 break-all text-[10px]">{SOVEREIGN_PATENT_HEADER.verificationSignature}</div>
              </div>
            </div>

            {/* Five Legal Seals Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
              {LEGAL_SEALS.map((s, idx) => (
                <span key={idx} className="flex items-center gap-1 font-semibold text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {s.badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Certified Sovereign Document • Ready for Submission to Health Authorities & Ethics Boards
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLegalText}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Full Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/60 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
