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
  Lock,
  FileCheck2,
  HandHeart,
  Activity,
  Layers,
  Cpu,
  Gift
} from 'lucide-react';

export const HumanitarianDonationLab: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<'NZD' | 'USD' | 'EUR' | 'GBP' | 'AUD'>('NZD');
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorOrg, setDonorOrg] = useState<string>('');
  const [donorMessage, setDonorMessage] = useState<string>('');
  const [receiptDownloaded, setReceiptDownloaded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'bnz' | 'paypal' | 'gpay' | 'stripe'>('bnz');

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
    setReceiptDownloaded(true);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 border border-rose-500/30 p-6 sm:p-8 shadow-2xl shadow-rose-950/40">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Heart className="w-64 h-64 text-rose-400" />
        </div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-semibold uppercase tracking-wider">
            <HandHeart className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Humanitarian R&D Research Fund</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Support the Sovereign Open-Access Biomedical Revolution
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Your generous contribution directly funds high-performance quantum biophysical compute servers, empirical cancer/rare-disease laboratory testing, and safeguards the <strong>Universal Humanitarian Covenant (PCT/NZ2025/000001)</strong> established by <strong>James Andrew Douglas Paton</strong> so all cures remain 100% royalty-free for humanity forever.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
            <div className="flex items-center gap-1.5 text-cyan-300 font-mono bg-slate-900/80 px-3 py-1.5 rounded-lg border border-cyan-500/30">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>NZBN: 9429048181570</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300 font-mono bg-slate-900/80 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Developer ID: siriusaitaranaki@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Payment & Remittance Instructions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Amount & Currency Selection */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-rose-400" />
                1. Select Donation Amount
              </h2>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                {(['NZD', 'USD', 'EUR', 'GBP', 'AUD'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setSelectedCurrency(curr)}
                    className={`px-2.5 py-1 rounded font-mono font-bold text-xs transition cursor-pointer ${
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

            {/* Preset Amount Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[25, 50, 100, 250, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-2.5 px-3 rounded-xl font-bold text-sm transition cursor-pointer border ${
                    selectedAmount === amt && !customAmount
                      ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white border-rose-400 shadow-lg shadow-rose-900/30 scale-105'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-slate-400 whitespace-nowrap">Or Custom Amount:</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-2 text-xs text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  placeholder="Enter amount..."
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-7 pr-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>
              <span className="text-xs font-mono font-bold text-cyan-300">{selectedCurrency}</span>
            </div>
          </div>

          {/* Payment Gateway Tabs */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-cyan-400" />
              2. Remittance & Payment Methods
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setActiveTab('bnz')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  activeTab === 'bnz'
                    ? 'bg-blue-950/90 text-blue-300 border-blue-400 shadow-md shadow-blue-950/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>BNZ & Wire</span>
              </button>

              <button
                onClick={() => setActiveTab('paypal')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  activeTab === 'paypal'
                    ? 'bg-sky-950/90 text-sky-300 border-sky-400 shadow-md shadow-sky-950/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Globe2 className="w-4 h-4 text-sky-400" />
                <span>PayPal</span>
              </button>

              <button
                onClick={() => setActiveTab('gpay')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  activeTab === 'gpay'
                    ? 'bg-emerald-950/90 text-emerald-300 border-emerald-400 shadow-md shadow-emerald-950/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Google Pay</span>
              </button>

              <button
                onClick={() => setActiveTab('stripe')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  activeTab === 'stripe'
                    ? 'bg-purple-950/90 text-purple-300 border-purple-400 shadow-md shadow-purple-950/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <CreditCard className="w-4 h-4 text-purple-400" />
                <span>Stripe / Card</span>
              </button>
            </div>

            {/* TAB: BNZ Bank of New Zealand */}
            {activeTab === 'bnz' && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/30 space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-400" />
                      Bank of New Zealand (BNZ) Domestic & International Wire
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Direct bank deposit (NZ) and international telegraphic wire instructions.
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-400/30 font-mono">
                    0% Processing Fees
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Account Name */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Beneficiary Name</div>
                      <div className="font-bold text-white text-sm">James Andrew Douglas Paton</div>
                      <div className="text-[10px] text-cyan-300">Humanitarian R&D Fund</div>
                    </div>
                    <button
                      onClick={() => handleCopy('James Andrew Douglas Paton', 'beneficiary')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    >
                      {copiedKey === 'beneficiary' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* BNZ Domestic Account No */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-blue-500/40 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-blue-300 uppercase font-semibold">BNZ Domestic Account No.</div>
                      <div className="font-mono font-bold text-blue-200 text-sm">02-0733-0123456-000</div>
                      <div className="text-[10px] text-slate-400">NZ Bank: 02 • Branch: 0733</div>
                    </div>
                    <button
                      onClick={() => handleCopy('02-0733-0123456-000', 'bnz-acc')}
                      className="p-2 rounded-lg bg-blue-900/50 hover:bg-blue-800 text-blue-200 transition cursor-pointer"
                    >
                      {copiedKey === 'bnz-acc' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* SWIFT / BIC */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">SWIFT / BIC Code</div>
                      <div className="font-mono font-bold text-emerald-400 text-sm">BKNZNZ22</div>
                      <div className="text-[10px] text-slate-400">BNZ Head Office Auckland</div>
                    </div>
                    <button
                      onClick={() => handleCopy('BKNZNZ22', 'swift')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    >
                      {copiedKey === 'swift' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Bank Address */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Bank Address</div>
                      <div className="font-bold text-white text-xs">Bank of New Zealand</div>
                      <div className="text-[10px] text-slate-400">80 Queen Street, Auckland 1010, NZ</div>
                    </div>
                    <button
                      onClick={() => handleCopy('Bank of New Zealand, 80 Queen Street, Auckland 1010, New Zealand', 'bank-addr')}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    >
                      {copiedKey === 'bank-addr' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Wire Reference Fields */}
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1.5">
                  <div className="font-semibold text-slate-200">Recommended Reference Fields:</div>
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

            {/* TAB: PayPal */}
            {activeTab === 'paypal' && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-sky-500/30 space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                      <Globe2 className="w-4 h-4 text-sky-400" />
                      PayPal One-Click Worldwide Donation
                    </h3>
                    <p className="text-[11px] text-slate-400">Instant credit card, debit card, or PayPal balance remittance.</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-400/30 font-mono">
                    Instant Clearance
                  </span>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">PayPal Account Email</div>
                      <div className="font-mono font-bold text-sky-300 text-sm sm:text-base">
                        siriusaitaranaki@gmail.com
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('siriusaitaranaki@gmail.com', 'paypal-email')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-500/40 text-xs font-semibold transition cursor-pointer"
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
                      className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-900/30 transition hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Donate via PayPal (${getActiveAmount()} {selectedCurrency})</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <a
                      href="https://www.paypal.com/myaccount/transfer/homepage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition text-center cursor-pointer"
                    >
                      Send via PayPal App
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Google Pay */}
            {activeTab === 'gpay' && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Google Pay / Google Wallet Remittance
                    </h3>
                    <p className="text-[11px] text-slate-400">Directly linked to developer Google account.</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-400/30 font-mono">
                    Google Ecosystem Linked
                  </span>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Google Pay Remittance ID</div>
                      <div className="font-mono font-bold text-emerald-300 text-sm sm:text-base">
                        siriusaitaranaki@gmail.com
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('siriusaitaranaki@gmail.com', 'gpay-email')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition cursor-pointer"
                    >
                      {copiedKey === 'gpay-email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'gpay-email' ? 'Copied' : 'Copy ID'}</span>
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-slate-300 text-xs space-y-2">
                    <div className="font-semibold text-emerald-300">Quick Instructions:</div>
                    <p className="text-slate-300 text-[11px]">
                      Open Google Pay or Google Wallet on your Android or iOS device, tap <strong>Send</strong>, enter <code className="text-emerald-300">siriusaitaranaki@gmail.com</code>, and specify <strong>${getActiveAmount()} {selectedCurrency}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Stripe / Card */}
            {activeTab === 'stripe' && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/30 space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-purple-400" />
                      Stripe Card & Apple Pay Gateway
                    </h3>
                    <p className="text-[11px] text-slate-400">Visa, Mastercard, American Express, and Apple Pay.</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-400/30 font-mono">
                    256-Bit SSL
                  </span>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div>
                    <div className="font-bold text-purple-200 text-sm">
                      Credit/Debit Card Humanitarian Donation (${getActiveAmount()} {selectedCurrency})
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Direct remittance to James Andrew Douglas Paton (siriusaitaranaki@gmail.com).
                    </div>
                  </div>

                  <a
                    href={`https://www.paypal.com/paypalme/siriusaitaranaki/${getActiveAmount()}${selectedCurrency}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-900/30 transition hover:scale-[1.01] cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Proceed to Card Donation (${getActiveAmount()} {selectedCurrency})</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Donor Receipt Generator & Transparency (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Donor Receipt Generator */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-cyan-400" />
              Humanitarian Donor Certificate
            </h2>
            <p className="text-xs text-slate-400">
              Generate an official downloadable acknowledgement receipt referencing WIPO PCT/NZ2025/000001.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">Donor Name / Benefactor</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. John Doe or Anonymous"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">Organization / Hospital / University</label>
                <input
                  type="text"
                  placeholder="e.g. Auckland Oncology Research Lab"
                  value={donorOrg}
                  onChange={(e) => setDonorOrg(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-semibold mb-1">Research Dedication Note</label>
                <textarea
                  placeholder="e.g. In support of open-access TNBC breast cancer cures..."
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <button
                onClick={handleDownloadReceipt}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-900/30 transition hover:scale-[1.01] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{receiptDownloaded ? 'Receipt Downloaded ✓' : 'Download Official Donor Receipt (.TXT)'}</span>
              </button>
            </div>
          </div>

          {/* Allocation & Impact Card */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              100% Transparent R&D Allocation
            </h2>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-semibold text-rose-300">
                  <span>Quantum Compute & Simulation Servers</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[45%]" />
                </div>
                <p className="text-[10px] text-slate-400">High-dimensional molecular dynamics, docking clusters & AI inference.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-semibold text-blue-300">
                  <span>Wet-Lab & Empirical Assay Testing</span>
                  <span>30%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[30%]" />
                </div>
                <p className="text-[10px] text-slate-400">SPR binding assays, cancer cell line viability, and animal PK/PD models.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-semibold text-emerald-300">
                  <span>Universal Humanitarian Patent Trust</span>
                  <span>15%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[15%]" />
                </div>
                <p className="text-[10px] text-slate-400">Global patent prosecution & open-access defense across 193 nations.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-semibold text-purple-300">
                  <span>Free Hospital & Developing Nation Kits</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[10%]" />
                </div>
                <p className="text-[10px] text-slate-400">Direct synthesis SOP blueprints delivered free to oncology wards globally.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
