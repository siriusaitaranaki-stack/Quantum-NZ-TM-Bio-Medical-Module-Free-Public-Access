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
import { GLOBAL_MANUFACTURING_HUBS } from '../data/hubsData';
import { ManufacturingHub } from '../types/biomedical';
import {
  Factory,
  CheckCircle2,
  Truck,
  Thermometer,
  ShieldCheck,
  Globe,
  Sliders,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  PackageCheck
} from 'lucide-react';

export const ProductionScaler: React.FC = () => {
  const [selectedHubId, setSelectedHubId] = useState<string>('hub-oceania');
  const [targetAnnualDoses, setTargetAnnualDoses] = useState<number>(615000000);
  const [batchSize, setBatchSize] = useState<number>(50000);
  const [isSimulatingBatch, setIsSimulatingBatch] = useState<boolean>(false);
  const [batchProgress, setBatchProgress] = useState<number>(0);
  const [completedBatches, setCompletedBatches] = useState<number>(1420);

  const currentHub: ManufacturingHub =
    GLOBAL_MANUFACTURING_HUBS.find((h) => h.id === selectedHubId) ||
    GLOBAL_MANUFACTURING_HUBS[0];

  const totalCalculatedCapacity = GLOBAL_MANUFACTURING_HUBS.reduce(
    (acc, h) => acc + h.annualCapacityDoses,
    0
  );

  const handleSimulateBatchProduction = () => {
    setIsSimulatingBatch(true);
    setBatchProgress(0);

    const interval = setInterval(() => {
      setBatchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulatingBatch(false);
          setCompletedBatches((c) => c + 1);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Factory className="w-4 h-4" />
            <span>Planetary-Scale GMP Manufacturing Network</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            12 Global Sovereign Manufacturing Hubs & Supply Chain Scaler
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Optimized planetary deployment pipeline designed to supply all 37,200+ hospitals and 12,700+
            universities worldwide with zero commercial restriction under the Humanitarian Covenant.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-2 rounded-lg text-xs font-semibold text-emerald-300">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>615,000,000 Annual Doses Capacity</span>
        </div>
      </div>

      {/* Capacity & Global Logistics Overview Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="text-xs text-slate-400">Total Global Hubs</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">12 Facilities</div>
          <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">All 6 Continents Linked</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="text-xs text-slate-400">Total Annual Doses</div>
          <div className="text-2xl font-extrabold text-cyan-300 font-mono mt-1">
            {(totalCalculatedCapacity / 1e6).toFixed(0)}M Doses
          </div>
          <div className="text-[10px] text-cyan-400 font-semibold mt-0.5">Scalable to 1 Billion</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="text-xs text-slate-400">Hospitals Connected</div>
          <div className="text-2xl font-extrabold text-indigo-300 font-mono mt-1">37,200+</div>
          <div className="text-[10px] text-indigo-400 font-semibold mt-0.5">&lt;48h Delivery Window</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
          <div className="text-xs text-slate-400">QC Pass Rate</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">100.0%</div>
          <div className="text-[10px] text-emerald-300 font-semibold mt-0.5">Automated HPLC / DLS QA</div>
        </div>
      </div>

      {/* Main Grid: Hub Selector Matrix & Live Batch Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 12 Hubs Interactive Matrix (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Sovereign Regional Facilities Matrix</span>
            </h3>
            <span className="text-[10px] font-mono text-cyan-300">12 Active Nodes</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
            {GLOBAL_MANUFACTURING_HUBS.map((hub) => {
              const isSelected = hub.id === currentHub.id;
              return (
                <div
                  key={hub.id}
                  onClick={() => setSelectedHubId(hub.id)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-br from-emerald-950/70 to-slate-900 border-emerald-500/60 shadow-lg ring-1 ring-emerald-400/30'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>{hub.name}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/30">
                        {hub.region}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{hub.location}</div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-800">
                    <span className="font-mono text-cyan-300 font-semibold">
                      {(hub.annualCapacityDoses / 1e6).toFixed(0)}M doses/yr
                    </span>
                    <span className="text-emerald-400 font-medium">QC: {hub.qcPassRate}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Hub Details & Live Batch Simulator (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Selected Hub Deep Dive Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                  Facility Selected
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                  {currentHub.name}
                </h4>
                <div className="text-xs text-slate-400">{currentHub.location}</div>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-900/40 text-cyan-300 border border-blue-500/30">
                {currentHub.status}
              </span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Annual Production Quota:</span>
                <span className="text-emerald-400 font-mono font-bold">
                  {currentHub.annualCapacityDoses.toLocaleString()} Doses
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Cold Chain Thermal Range:</span>
                <span className="text-cyan-300 font-mono flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                  {currentHub.coldChainTemp}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Regional Production Scope:</span>
                <span className="text-slate-200 font-semibold">{currentHub.cancersProduced.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Interactive Batch Run Simulator */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950/60 border border-emerald-500/30 rounded-xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4 text-emerald-400" />
                <span>Simulate Automated GMP Batch Run</span>
              </span>
              <span className="text-[10px] font-mono text-slate-300">
                Total Runs: {completedBatches}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Batch Size (Single Run)</span>
                <span className="font-mono text-emerald-400 font-bold">{batchSize.toLocaleString()} Vials</span>
              </div>
              <input
                type="range"
                min="10000"
                max="250000"
                step="10000"
                value={batchSize}
                onChange={(e) => setBatchSize(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Batch Progress Bar */}
            {isSimulatingBatch && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-emerald-300 font-mono">
                  <span>Microfluidic Synthesis & Lyophilization...</span>
                  <span>{batchProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    style={{ width: `${batchProgress}%` }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-200"
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleSimulateBatchProduction}
              disabled={isSimulatingBatch}
              className={`w-full py-2.5 rounded-lg font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
                isSimulatingBatch
                  ? 'bg-slate-800 text-slate-400'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-950/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSimulatingBatch ? 'Executing Microfluidic Run...' : `Dispatch ${batchSize.toLocaleString()} Dose Batch`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
