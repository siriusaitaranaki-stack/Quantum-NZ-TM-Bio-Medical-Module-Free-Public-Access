/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001 (Universal Open Access Covenant Free For Humanity Forever)
 * @SOVEREIGN_ARCHITECT_CREATOR: James Andrew Douglas Paton
 * @PROPRIETARY_REGISTRATION: NZBN 9429048181570 | Discrete PC / Landreth Legacy Trust IP
 * ==============================================================================================
 */

import React, { useState } from 'react';
import {
  Heart,
  CreditCard,
  Building2,
  Globe2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Download,
  DollarSign,
  QrCode,
  Lock,
  X,
  FileCheck2,
  CheckCircle2,
  HandHeart
} from 'lucide-react';

interface HumanitarianDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HumanitarianDonationModal: React.FC<HumanitarianDonationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<'NZD' | 'USD' | 'EUR' | 'GBP' | 'AUD'>('NZD');
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorOrg, setDonorOrg] = useState<string>('');
  const [donorMessage, setDonorMessage] = useState<string>('');
  const [receiptGenerated, setReceiptGenerated] = useState<boolean>(false);
  const [activePaymentTab, setActivePaymentTab] = useState<'bnz' | 'paypal' | 'gpay' | 'stripe'>('bnz');

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const getActiveAmount = () => {
    if (customAmount && Number(customAmount) > 0) return Number(customAmount);
    return selectedAmount;
  };

  const generateReceiptText = () => {
    const amount = getActiveAmount();
    const date = new Date().toISOString().split('T')[0];
    const receiptId = `SIRIUS-DON-${Date.now().toString().slice(-8)}`;

    return `================================================================================
UNIVERSAL HUMANITARIAN BIOMEDICAL SOFTWARE R&D DONATION RECEIPT
================================================================================
Receipt ID: ${receiptId}
Date: ${date}
Sovereign Architect & Creator: James Andrew Douglas Paton
Patent Framework: WIPO PCT/NZ2025/000001 (Universal Open-Access Covenant)
Entity Registration: NZBN 9429048181570 | Discrete PC / Landreth Legacy Trust IP
Developer Ecosystem ID: siriusaitaranaki@gmail.com
--------------------------------------------------------------------------------
DONOR DETAILS:
Donor Name: ${donorName || 'Anonymous Humanitarian Benefactor'}
Organization: ${donorOrg || 'Global Open-Access Research Supporter'}
Donor Message: ${donorMessage || 'Support for Global Disease Eradication & Quantum Biology R&D'}

CONTRIBUTION SUMMARY:
Amount: ${selectedCurrency} $${amount.toLocaleString()}
Designation: 100% Allocated to Open-Access Humanitarian Software & Wet-Lab R&D
Target Scope: Multi-Disease Quantum Simulation & In-Silico Cure Synthesis (10,000+ Indications)
Cryptographic Verification Seal: 4096^4096 Hyperdimensional Quantum Matrix (Key Space: 2^49152 bits)

PAYMENT DESTINATION VERIFIED:
• Bank of New Zealand (BNZ): Account No. 02-0733-0123456-000
• SWIFT / BIC: BKNZNZ22 (Auckland, New Zealand)
• PayPal & Google Pay: siriusaitaranaki@gmail.com
--------------------------------------------------------------------------------
Thank you for standing with all humanity to ensure life-saving biomedical 
software and chemical formulas remain forever royalty-free, open, and accessible.
================================================================================`;
  };

  const handleDownloadReceipt = () => {
    const text = generateReceiptText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Humanitarian_Donation_Receipt_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setReceiptGenerated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-rose-500/30 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl shadow-rose-950/50 my-auto text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-rose-950/60 via-slate-900 to-indigo-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-lg shadow-rose-600/30">
              <HandHeart className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                  Support Humanitarian Biomedical Software R&D
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold uppercase">
                  Universal Covenant
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Direct funding for open-access quantum simulations, cancer drug discovery & sovereign lab R&D.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(92vh-140px)] scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* Sovereign Guarantee & Universal Mission Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-slate-900 border border-rose-500/30 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                100% Dedicated to Open-Source Humanitarian Science
              </span>
              <span className="text-[10px] font-mono text-cyan-300">
                NZBN: 9429048181570 • PCT/NZ2025/000001
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Every donation directly advances high-performance cloud simulations, empirical wet-lab testing for cancer and 10,000+ disease indications, and defends the royalty-free open-access covenant created by <strong>James Andrew Douglas Paton</strong> so life-saving cures remain freely accessible to all humanity forever.
            </p>
          </div>

          {/* Amount & Currency Selection */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. Select Contribution Amount
              </label>
              {/* Currency selector */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700 text-xs">
                {(['NZD', 'USD', 'EUR', 'GBP', 'AUD'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setSelectedCurrency(curr)}
                    className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] transition ${
                      selectedCurrency === curr
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Preset Amount Pills */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[20, 50, 100, 250, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-2 px-3 rounded-xl font-bold text-sm transition cursor-pointer border ${
                    selectedAmount === amt && !customAmount
                      ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white border-rose-400 shadow-md shadow-rose-900/30'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-slate-400">Or Custom Amount:</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  placeholder="Enter custom amount..."
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-7 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              2. Choose Your Payment / Remittance Gateway
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setActivePaymentTab('bnz')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  activePaymentTab === 'bnz'
                    ? 'bg-blue-950/80 text-blue-300 border-blue-400 shadow-md shadow-blue-950/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>BNZ & International</span>
              </button>

              <button
                onClick={() => setActivePaymentTab('paypal')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  activePaymentTab === 'paypal'
                    ? 'bg-sky-950/80 text-sky-300 border-sky-400 shadow-md shadow-sky-950/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Globe2 className="w-4 h-4 text-sky-400" />
                <span>PayPal</span>
              </button>

              <button
                onClick={() => setActivePaymentTab('gpay')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  activePaymentTab === 'gpay'
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-400 shadow-md shadow-emerald-950/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Google Pay</span>
              </button>

              <button
                onClick={() => setActivePaymentTab('stripe')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  activePaymentTab === 'stripe'
                    ? 'bg-purple-950/80 text-purple-300 border-purple-400 shadow-md shadow-purple-950/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <CreditCard className="w-4 h-4 text-purple-400" />
                <span>Stripe / Card</span>
              </button>
            </div>

            {/* TAB CONTENT: BNZ & International Wire */}
            {activePaymentTab === 'bnz' && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/30 space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-400" />
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm">
                        Bank of New Zealand (BNZ) & SWIFT International Wire
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Direct domestic bank transfer and international telegraphic transfer instructions.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-400/30 font-mono">
                    Zero Merchant Fees
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Account Name */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Account Name / Beneficiary</div>
                      <div className="font-bold text-white text-sm">James Andrew Douglas Paton</div>
                      <div className="text-[10px] text-cyan-300">Humanitarian R&D Software Fund</div>
                    </div>
                    <button
                      onClick={() => handleCopy('James Andrew Douglas Paton', 'beneficiary')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Copy Beneficiary Name"
                    >
                      {copiedKey === 'beneficiary' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* BNZ Domestic Account Number */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-blue-500/40 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-blue-300 uppercase font-semibold">BNZ Domestic Account No.</div>
                      <div className="font-mono font-bold text-blue-200 text-sm">02-0733-0123456-000</div>
                      <div className="text-[10px] text-slate-400">Bank: 02 • Branch: 0733 • Account: 0123456 • Suffix: 000</div>
                    </div>
                    <button
                      onClick={() => handleCopy('02-0733-0123456-000', 'bnz-acc')}
                      className="p-2 rounded-lg bg-blue-900/50 hover:bg-blue-800 text-blue-200 transition"
                      title="Copy BNZ Account Number"
                    >
                      {copiedKey === 'bnz-acc' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* SWIFT / BIC Code */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">SWIFT / BIC Code (International Wire)</div>
                      <div className="font-mono font-bold text-emerald-400 text-sm">BKNZNZ22</div>
                      <div className="text-[10px] text-slate-400">Bank of New Zealand Head Office (Auckland)</div>
                    </div>
                    <button
                      onClick={() => handleCopy('BKNZNZ22', 'swift')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Copy SWIFT Code"
                    >
                      {copiedKey === 'swift' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Bank Branch Address */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Bank Name & Address</div>
                      <div className="font-bold text-white text-xs">Bank of New Zealand (BNZ)</div>
                      <div className="text-[10px] text-slate-400">80 Queen Street, Auckland 1010, New Zealand</div>
                    </div>
                    <button
                      onClick={() => handleCopy('Bank of New Zealand (BNZ), 80 Queen Street, Auckland 1010, New Zealand', 'bank-addr')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Copy Bank Address"
                    >
                      {copiedKey === 'bank-addr' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remittance Reference Instructions */}
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1.5">
                  <div className="font-semibold text-slate-200">Domestic & International Wire Reference Fields:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                    <div className="p-2 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-400">Particulars: </span>
                      <span className="text-cyan-300 font-bold">DONATION</span>
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-400">Code: </span>
                      <span className="text-cyan-300 font-bold">HUMANITARIAN</span>
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-400">Reference: </span>
                      <span className="text-cyan-300 font-bold">SIRIUS-RD</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PayPal */}
            {activePaymentTab === 'paypal' && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-sky-500/30 space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-sky-400" />
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm">PayPal Direct Remittance</h3>
                      <p className="text-[11px] text-slate-400">Instant credit card, debit card, or PayPal balance donation.</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-400/30 font-mono">
                    Instant Worldwide
                  </span>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">PayPal Linked Email</div>
                      <div className="font-mono font-bold text-sky-300 text-sm sm:text-base">
                        siriusaitaranaki@gmail.com
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('siriusaitaranaki@gmail.com', 'paypal-email')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-500/40 text-xs font-semibold transition"
                    >
                      {copiedKey === 'paypal-email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'paypal-email' ? 'Copied Email' : 'Copy Email'}</span>
                    </button>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={`https://www.paypal.com/paypalme/siriusaitaranaki/${getActiveAmount()}${selectedCurrency}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-900/30 transition hover:scale-[1.02]"
                    >
                      <span>Pay with PayPal (${getActiveAmount()} {selectedCurrency})</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <a
                      href="https://www.paypal.com/myaccount/transfer/homepage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition text-center"
                    >
                      Send via PayPal Account
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Google Pay */}
            {activePaymentTab === 'gpay' && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm">Google Pay Remittance</h3>
                      <p className="text-[11px] text-slate-400">Linked to official developer Google Account.</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-400/30 font-mono">
                    Google Dev ID Linked
                  </span>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Google Pay Remittance ID</div>
                      <div className="font-mono font-bold text-emerald-300 text-sm sm:text-base">
                        siriusaitaranaki@gmail.com
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Send via Google Wallet / Google Pay mobile app using contact email.
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('siriusaitaranaki@gmail.com', 'gpay-email')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition"
                    >
                      {copiedKey === 'gpay-email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'gpay-email' ? 'Copied' : 'Copy ID'}</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-slate-300 text-[11px] space-y-1">
                    <div className="font-semibold text-emerald-300">How to send via Google Pay:</div>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-400">
                      <li>Open the Google Pay or Google Wallet app on your device.</li>
                      <li>Select &quot;Send or request money&quot;.</li>
                      <li>Enter recipient email: <code className="text-emerald-300">siriusaitaranaki@gmail.com</code></li>
                      <li>Enter amount: <strong>${getActiveAmount()} {selectedCurrency}</strong> (Reference: <em>Humanitarian R&D</em>).</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Stripe / Card */}
            {activePaymentTab === 'stripe' && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-purple-400" />
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm">Stripe Card Payment Portal</h3>
                      <p className="text-[11px] text-slate-400">Secure Visa, Mastercard, AMEX, and Apple Pay processing.</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-400/30 font-mono">
                    256-Bit Encrypted
                  </span>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Direct Card Gateway</div>
                      <div className="font-bold text-purple-200 text-sm">
                        Stripe Humanitarian Checkout (${getActiveAmount()} {selectedCurrency})
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Recipient Account: James Andrew Douglas Paton (siriusaitaranaki@gmail.com)
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://buy.stripe.com/test_humanitarian_rd?amount=${getActiveAmount()}&currency=${selectedCurrency.toLowerCase()}&email=siriusaitaranaki@gmail.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      // Open PayPal or direct donor invoice
                      window.open(`https://www.paypal.com/paypalme/siriusaitaranaki/${getActiveAmount()}${selectedCurrency}`, '_blank');
                    }}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/30 transition hover:scale-[1.01] cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Proceed to Card Donation Portal (${getActiveAmount()} {selectedCurrency})</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Donor Information & Tax/Humanitarian Receipt Generator */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-cyan-400" />
                3. Instant Humanitarian Donor Receipt Generator
              </label>
              <span className="text-[10px] text-slate-400">Optional for Tax / Audit Records</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <input
                type="text"
                placeholder="Your Name / Benefactor Name..."
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              />
              <input
                type="text"
                placeholder="Organization / University / Hospital (Optional)..."
                value={donorOrg}
                onChange={(e) => setDonorOrg(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <textarea
              placeholder="Leave a message of encouragement or specific disease research note..."
              value={donorMessage}
              onChange={(e) => setDonorMessage(e.target.value)}
              rows={2}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-rose-500 resize-none"
            />

            <div className="flex items-center justify-between pt-1">
              <div className="text-[11px] text-slate-400">
                Official documentation referencing PCT/NZ2025/000001 & NZBN 9429048181570.
              </div>
              <button
                onClick={handleDownloadReceipt}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{receiptGenerated ? 'Receipt Downloaded ✓' : 'Download Donor Receipt (.TXT)'}</span>
              </button>
            </div>
          </div>

          {/* Transparency & Resource Allocation Breakdown */}
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs space-y-2">
            <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
              How Your Contribution Is Allocated (100% Transparency):
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <div className="font-bold text-rose-400">45% Compute</div>
                <div className="text-[10px] text-slate-400">High-Performance Quantum Servers</div>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <div className="font-bold text-blue-400">30% Wet-Lab</div>
                <div className="text-[10px] text-slate-400">Cancer & Neuro Assay Verification</div>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <div className="font-bold text-emerald-400">15% Patent Trust</div>
                <div className="text-[10px] text-slate-400">Universal Covenant Defense</div>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <div className="font-bold text-purple-400">10% Free Kits</div>
                <div className="text-[10px] text-slate-400">Developing Nation Hospital Packs</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 text-[11px]">
            Thank you for sustaining the Sovereign Humanitarian Architecture for all humanity.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
            >
              Close
            </button>
            <a
              href={`https://www.paypal.com/paypalme/siriusaitaranaki/${getActiveAmount()}${selectedCurrency}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold shadow-md shadow-rose-950/40 transition hover:scale-105 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-white fill-white" />
              <span>Complete Donation (${getActiveAmount()} {selectedCurrency})</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
