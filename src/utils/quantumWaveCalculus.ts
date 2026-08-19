export interface WavePoint {
  x: number;
  psiReal: number;
  psiImag: number;
  probabilityDensity: number;
  targetHealthy: number;
  entropyDeviation: number;
}

export function generateStandingWaveProfile(
  frequencyScale: number, // in 10^15 s^-1
  timeStep: number, // in milliseconds
  coherenceCoeff: number = 0.999999,
  samplePoints: number = 80
): WavePoint[] {
  const points: WavePoint[] = [];
  const omega = frequencyScale * 2 * Math.PI;
  const t = timeStep * 0.001; // convert to seconds

  for (let i = 0; i < samplePoints; i++) {
    const x = (i - samplePoints / 2) / (samplePoints / 10); // spatial coordinate r
    
    // Healthy Gaussian ground state
    const gaussianEnvelope = Math.exp(-(x * x) / 4.0);
    const healthyTarget = gaussianEnvelope * Math.cos(1.2 * x);

    // Standing wave oscillation with temporal phase evolution
    const phase = omega * t + x * 0.8;
    const psiR = gaussianEnvelope * Math.cos(phase) * coherenceCoeff;
    const psiI = gaussianEnvelope * Math.sin(phase) * (1 - coherenceCoeff + 0.1);
    
    const probDensity = psiR * psiR + psiI * psiI;
    const entropy = Math.abs(probDensity - healthyTarget * healthyTarget) * (1.0 - Math.min(1.0, t * 10));

    points.push({
      x: Number(x.toFixed(2)),
      psiReal: Number(psiR.toFixed(4)),
      psiImag: Number(psiI.toFixed(4)),
      probabilityDensity: Number(probDensity.toFixed(4)),
      targetHealthy: Number(healthyTarget.toFixed(4)),
      entropyDeviation: Number(entropy.toFixed(4))
    });
  }

  return points;
}

export function calculateHarmonicFrequencies(baseFreqE15: number) {
  return [
    { harmonic: 'Fundamental (ω₀)', freq: baseFreqE15.toFixed(2) + ' × 10¹⁵ s⁻¹', energy_eV: (baseFreqE15 * 4.1357).toFixed(2) + ' keV' },
    { harmonic: '2nd Resonance (2ω₀)', freq: (baseFreqE15 * 2).toFixed(2) + ' × 10¹⁵ s⁻¹', energy_eV: (baseFreqE15 * 2 * 4.1357).toFixed(2) + ' keV' },
    { harmonic: '3rd Cavity Mode (3ω₀)', freq: (baseFreqE15 * 3).toFixed(2) + ' × 10¹⁵ s⁻¹', energy_eV: (baseFreqE15 * 3 * 4.1357).toFixed(2) + ' keV' },
    { harmonic: 'Sub-Harmonic (0.5ω₀)', freq: (baseFreqE15 * 0.5).toFixed(2) + ' × 10¹⁵ s⁻¹', energy_eV: (baseFreqE15 * 0.5 * 4.1357).toFixed(2) + ' keV' }
  ];
}
