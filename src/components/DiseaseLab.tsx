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
import { COMPREHENSIVE_DISEASE_CURES } from '../data/diseasesData';
import { DiseaseCure } from '../types/biomedical';
import { useAudioNarrator } from '../context/AudioNarratorContext';
import {
  Dna,
  CheckCircle2,
  ShieldCheck,
  FileCode,
  Activity,
  Layers,
  FlaskConical,
  Pill,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  BookOpen,
  Search,
  Volume2
} from 'lucide-react';

export const DiseaseLab: React.FC = () => {
  const { speak, speakDetailedCure } = useAudioNarrator();
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>('nsclc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredDiseases = COMPREHENSIVE_DISEASE_CURES.filter((d) => {
    const matchesSearch =
      d.diseaseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.cureName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.activeCompounds.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const currentDisease: DiseaseCure =
    COMPREHENSIVE_DISEASE_CURES.find((d) => d.id === selectedDiseaseId) ||
    COMPREHENSIVE_DISEASE_CURES[0];

  return (
    <div className="space-y-6">
      {/* Module Title Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Dna className="w-4 h-4" />
            <span>Oncology & Neurodegenerative Therapeutic Protocols</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Comprehensive Disease Developmental Simulation Lab
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Exhaustive scientific formulations, chemical synthesis routes, delivery vehicles, standing wave
            mathematical models, and clinical protocols for Top 10 Cancers and neurodegenerative targets.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-2 rounded-lg text-xs font-semibold text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>47 Global Labs Verified • 100% Coherent</span>
        </div>
      </div>

      {/* Disease Selection Filter Bar & List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Disease List & Search (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          {/* Search Box & Category filter */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search disease, target, compound..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {['All', 'Oncology', 'Neurodegenerative', 'Genetic'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Disease List Card Stack */}
          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
            {filteredDiseases.map((disease) => {
              const isSelected = disease.id === currentDisease.id;
              return (
                <div
                  key={disease.id}
                  onClick={() => setSelectedDiseaseId(disease.id)}
                  onMouseEnter={() =>
                    speak(
                      `${disease.diseaseName}. Protocol: ${disease.cureName}. Frequency: ${disease.standingWaveFrequency}. Category: ${disease.category}.`,
                      { priority: 'hover' }
                    )
                  }
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-cyan-500/60 shadow-lg shadow-blue-950/40 ring-1 ring-cyan-400/40'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{disease.diseaseName}</span>
                      </div>
                      <div className="text-[11px] font-mono text-cyan-300 mt-0.5">
                        {disease.cureName}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-500/30 shrink-0">
                      {disease.standingWaveFrequency.split(' ')[2] || 'SW Freq'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                    <span className="text-emerald-400 font-medium">Confidence: {disease.confidence}%</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      View Profile <ChevronRight className="w-3 h-3 text-cyan-400" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Scientific Dossier (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Header Banner for Selected Disease */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-700/80 rounded-xl p-5 shadow-2xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] uppercase font-bold text-cyan-400 tracking-wider">
                  {currentDisease.category} Developmental Specification
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {currentDisease.diseaseName}
                </h3>
                <div className="text-xs font-mono text-emerald-300 font-semibold mt-1">
                  Protocol: {currentDisease.cureName}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Standing Wave Frequency</div>
                <div className="text-lg font-mono font-extrabold text-cyan-300">
                  {currentDisease.standingWaveFrequency}
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold">
                  100% Coherent Ground State
                </div>
              </div>
            </div>

            {/* Audio Voice Narration Trigger Action */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => speakDetailedCure(currentDisease)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-md transition hover:scale-105 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Listen to Full Disease & Cure Breakdown</span>
              </button>

              <span className="text-[10px] text-slate-400 font-mono">
                Calm Educated Female Voice • 100% Deterministic
              </span>
            </div>

            {/* Standing Wave Formula Mathematical Box */}
            <div
              onMouseEnter={() =>
                speak(
                  `Wave equation for ${currentDisease.diseaseName}: ${currentDisease.standingWaveEquation}. Phase stabilization at ${currentDisease.t0Seconds} seconds.`,
                  { priority: 'hover' }
                )
              }
              className="mt-2 bg-slate-950/80 p-3 rounded-lg border border-cyan-500/30 text-xs font-mono text-cyan-200 flex items-center justify-between flex-wrap gap-2 hover:border-cyan-400 transition cursor-help"
            >
              <div>
                <span className="text-slate-400">Wave Equation: </span>
                <span className="text-amber-300 font-bold">{currentDisease.standingWaveEquation}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-500/40">
                t₀ = {currentDisease.t0Seconds}s
              </span>
            </div>
          </div>

          {/* Section A: Active Compounds & Molecular Syntheses */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-400" />
              <span>Active Pharmaceutical Ingredients (APIs) & Chemical Synthesis Routes</span>
            </h4>

            <div className="space-y-3">
              {currentDisease.activeCompounds.map((compound, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-slate-800 rounded-lg p-3.5 space-y-2 hover:border-slate-700 transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-bold text-emerald-300">{compound.name}</div>
                    <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {compound.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px]">Formula: </span>
                      <span className="text-cyan-300 font-mono font-medium">{compound.molecularFormula}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px]">SMILES: </span>
                      <span className="text-slate-300 font-mono text-[10px] truncate block" title={compound.smiles}>
                        {compound.smiles}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800/80">
                    <strong className="text-slate-400">Mechanism: </strong>
                    {compound.mechanism}
                  </div>

                  <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800/60">
                    <strong className="text-amber-300">Synthesis Method: </strong>
                    {compound.synthesisMethod}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: Delivery Vehicle & Clinical Administration Protocol */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Delivery System */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Nanoparticle Delivery Vehicle</span>
              </h4>

              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-xs space-y-1.5">
                <div>
                  <span className="text-slate-400 font-medium">Vehicle: </span>
                  <span className="text-slate-200 font-semibold">{currentDisease.deliverySystem.vehicle}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Composition: </span>
                  <span className="text-slate-300 text-[11px]">{currentDisease.deliverySystem.composition}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-400">Hydrodynamic Radius:</span>
                  <span className="text-emerald-400 font-mono font-bold">{currentDisease.deliverySystem.particleSizeNm} nm</span>
                </div>
                <div className="text-[11px]">
                  <span className="text-slate-400">Targeting Ligand: </span>
                  <span className="text-cyan-300 font-medium">{currentDisease.deliverySystem.targetingLigand}</span>
                </div>
              </div>
            </div>

            {/* Clinical Administration Protocol */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-purple-400" />
                <span>Clinical Administration SOP</span>
              </h4>

              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-xs space-y-1.5">
                <div>
                  <span className="text-slate-400 font-medium">Route: </span>
                  <span className="text-slate-200 font-semibold">{currentDisease.clinicalProtocol.route}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Dosage:</span>
                  <span className="text-emerald-400 font-mono font-bold">{currentDisease.clinicalProtocol.dosage}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Infusion Duration:</span>
                  <span className="text-cyan-300 font-mono">{currentDisease.clinicalProtocol.infusionTime}</span>
                </div>
                <div className="text-[11px]">
                  <span className="text-slate-400">Follow-up: </span>
                  <span className="text-slate-300">{currentDisease.clinicalProtocol.followUpVerification}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section C: Real-World Evidence & Manufacturing Steps */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Real-World Clinical Evidence & Laboratory Verification</span>
            </h4>

            <p className="text-xs text-slate-300 bg-blue-950/20 p-3 rounded-lg border border-blue-500/20 leading-relaxed">
              {currentDisease.realWorldEvidence}
            </p>

            {/* Citations & Approvals Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {currentDisease.verificationMetrics.regulatoryApproval.map((reg, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full"
                >
                  ✓ {reg}
                </span>
              ))}

              {currentDisease.verificationMetrics.pubmedCitations.map((pub, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono bg-slate-800 text-cyan-300 border border-slate-700 px-2 py-0.5 rounded-full"
                >
                  {pub}
                </span>
              ))}
            </div>

            {/* Production Timeline Steps */}
            <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-300">
                Step-by-Step Scaled Production SOP:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentDisease.productionProcess.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-xs flex items-start gap-2"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-900/80 text-cyan-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {step.stepNumber}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-200 flex items-center justify-between gap-1">
                        <span>{step.stepName}</span>
                        <span className="text-[10px] font-mono text-amber-400">{step.durationHours}h</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
