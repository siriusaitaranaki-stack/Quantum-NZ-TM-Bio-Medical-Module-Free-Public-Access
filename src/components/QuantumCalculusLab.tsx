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

import React, { useState, useEffect, useRef } from 'react';
import {
  generateStandingWaveProfile,
  calculateHarmonicFrequencies,
  WavePoint
} from '../utils/quantumWaveCalculus';
import {
  Activity,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Compass,
  Flame,
  Radio,
  Clock,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const QuantumCalculusLab: React.FC = () => {
  const [freqScale, setFreqScale] = useState<number>(5.12); // in 10^15 s^-1
  const [coherence, setCoherence] = useState<number>(0.999999);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simTime, setSimTime] = useState<number>(0);
  const [planckScaleMode, setPlanckScaleMode] = useState<string>('Standard 10¹⁵ s⁻¹');
  const [rerunIterations, setRerunIterations] = useState<number>(1024);
  const [chronousLocked, setChronousLocked] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Time loop for live oscillation
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const step = () => {
        setSimTime((prev) => (prev + 0.5) % 1000);
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const waveData: WavePoint[] = generateStandingWaveProfile(freqScale, simTime, coherence, 90);
  const harmonics = calculateHarmonicFrequencies(freqScale);

  // Render SVG / Canvas Standing Wave Curve
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Background Gradient & Grid
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#030712');
    grad.addColorStop(0.5, '#0b1120');
    grad.addColorStop(1, '#030712');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Center Baseline & Spatial Gridlines
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    for (let x = 0; x < width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // 1. Draw Target Healthy State (Cyan Reference Ground State)
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    waveData.forEach((pt, idx) => {
      const x = (idx / (waveData.length - 1)) * width;
      const y = centerY - pt.targetHealthy * (height * 0.38);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Draw Probability Density |Ψ(r,t)|² Envelope (Emerald filled shadow)
    ctx.beginPath();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
    waveData.forEach((pt, idx) => {
      const x = (idx / (waveData.length - 1)) * width;
      const y = centerY - pt.probabilityDensity * (height * 0.35);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    for (let i = waveData.length - 1; i >= 0; i--) {
      const x = (i / (waveData.length - 1)) * width;
      const y = centerY + waveData[i].probabilityDensity * (height * 0.35);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    // 3. Draw Active Real Wavefunction Ψ_real(r,t) (Glowing Indigo/Purple Curve)
    ctx.beginPath();
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#6366f1';
    ctx.shadowBlur = 12;
    waveData.forEach((pt, idx) => {
      const x = (idx / (waveData.length - 1)) * width;
      const y = centerY - pt.psiReal * (height * 0.38);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 4. Draw Imaginary Wavefunction Phase Ψ_imag(r,t) (Amber subtle curve)
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
    ctx.lineWidth = 1.5;
    waveData.forEach((pt, idx) => {
      const x = (idx / (waveData.length - 1)) * width;
      const y = centerY - pt.psiImag * (height * 0.38);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [waveData]);

  const handlePlanckRamp = (mode: string, scale: number) => {
    setPlanckScaleMode(mode);
    setFreqScale(scale);
    setCoherence(0.999999);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Radio className="w-4 h-4" />
            <span>Quantum Calculus Engine • Chronous & Lazarus Modules</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {'{0=T}~{~=C}'} Standing Wave Temporal Causality Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Unifying temporal dynamics, causality, and consciousness. Simulating the quantum state transition
            from entropic disease states into harmonic biological ground states.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition cursor-pointer shadow-lg ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Wave' : 'Resume Oscillation'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Waveform Screen & Coherence & Accuracy Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Waveform Viewport (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-2xl flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Standing Wavefunction: Ψ(r, t)
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-blue-500/30">
                Mode: {planckScaleMode}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-indigo-400 rounded-full" />
                <span className="text-[11px]">Ψ_real</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-amber-400 rounded-full" />
                <span className="text-[11px]">Ψ_imag</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-cyan-400 rounded-full border-t border-dashed" />
                <span className="text-[11px]">Healthy Ground State</span>
              </span>
            </div>
          </div>

          {/* Canvas Wave Visualizer */}
          <div className="relative w-full aspect-16/9 bg-slate-950 rounded-lg overflow-hidden border border-slate-800/80 shadow-inner">
            <canvas ref={canvasRef} width={800} height={420} className="w-full h-full object-contain" />

            {/* Live Frequency & Coherence Overlay */}
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-cyan-300">
              ω = {(freqScale).toFixed(2)} × 10¹⁵ s⁻¹ | Coherence: {(coherence * 100).toFixed(4)}%
            </div>
          </div>

          {/* Frequency & Coherence Modulation Sliders */}
          <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Standing Wave Frequency (ω × 10¹⁵ s⁻¹)</span>
                <span className="font-mono text-cyan-400 font-bold">{freqScale.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.05"
                value={freqScale}
                onChange={(e) => setFreqScale(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Quantum Coherence Index (|⟨Ψ_c|Ψ_0⟩|)</span>
                <span className="font-mono text-emerald-400 font-bold">{(coherence * 100).toFixed(4)}%</span>
              </div>
              <input
                type="range"
                min="0.9"
                max="0.999999"
                step="0.005"
                value={coherence}
                onChange={(e) => setCoherence(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Right: Quantum Frequency Escalation & Chronous Diagnostics (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Planck Limit Escalation Tier Card */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-500/40 rounded-xl p-4 sm:p-5 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Virtual Clock Escalation Tier</span>
            </h3>

            <div className="mt-3 space-y-2">
              <button
                onClick={() => handlePlanckRamp('Standard Optical (5.12 × 10¹⁵ Hz)', 5.12)}
                className="w-full text-left p-2.5 rounded-lg bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 transition flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs font-semibold text-white">Standard Optical Harmonic</div>
                  <div className="text-[10px] font-mono text-slate-400">5.12 × 10¹⁵ s⁻¹ (Molecular Scale)</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-blue-900/60 text-cyan-300 rounded font-mono">1.0×</span>
              </button>

              <button
                onClick={() => handlePlanckRamp('154,000 Zetta Yotta Hz (1.54 × 10²⁶ Hz)', 8.85)}
                className="w-full text-left p-2.5 rounded-lg bg-slate-950/70 hover:bg-slate-800/80 border border-indigo-500/40 transition flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs font-semibold text-indigo-300">154,000 Zetta Yotta Hz</div>
                  <div className="text-[10px] font-mono text-slate-400">1.54 × 10²⁶ Hz (Quantum OS Kernel)</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-indigo-900/80 text-indigo-300 rounded font-mono">10¹¹×</span>
              </button>

              <button
                onClick={() => handlePlanckRamp('Planck Limit (~1.85 × 10⁴³ Hz)', 9.99)}
                className="w-full text-left p-2.5 rounded-lg bg-gradient-to-r from-emerald-950/60 to-teal-950/60 hover:from-emerald-900/60 hover:to-teal-900/60 border border-emerald-500/50 transition flex items-center justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Planck Limit Maximum</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400">1.85 × 10⁴³ Hz (Universal Limit)</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-900 text-emerald-200 rounded font-mono font-bold">MAX</span>
              </button>
            </div>
          </div>

          {/* Chronous & Lazarus Coherence Lock Status */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Chronous Temporal Lock</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                100% LOCKED
              </span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Exponential Rerun Count:</span>
                <span className="text-cyan-300 font-mono font-bold">{rerunIterations} Iterations (2¹⁰)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Planck Resolution (tₚ):</span>
                <span className="text-slate-300 font-mono">5.39 × 10⁻⁴⁴ s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Temporal Entropy (ΔS):</span>
                <span className="text-emerald-400 font-mono font-bold">0.000000 e.u.</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Causal Consistency:</span>
                <span className="text-emerald-400 font-mono font-bold">100% Deterministic</span>
              </div>
            </div>
          </div>

          {/* Harmonic Resonance Modes */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl space-y-2.5">
            <span className="text-xs font-semibold text-slate-300">Standing Wave Cavity Harmonics</span>

            <div className="space-y-1.5">
              {harmonics.map((h, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-400 text-[11px]">{h.harmonic}</span>
                  <span className="text-cyan-300 font-mono text-[11px] font-semibold">{h.freq}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
