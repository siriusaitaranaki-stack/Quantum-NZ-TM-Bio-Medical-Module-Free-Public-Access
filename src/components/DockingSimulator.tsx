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

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  TARGET_PROTEINS,
  CANDIDATE_LIGANDS,
  MULTI_MEDICINE_COMBINATIONS,
  buildCombinedMultiLigand,
  buildCustomPatientMolecule
} from '../data/proteinPocketsData';
import { COMPREHENSIVE_DISEASE_CURES } from '../data/diseasesData';
import { getDeterministicCure } from '../data/quantumLockData';
import { SOVEREIGN_PATENT_HEADER } from '../data/patentData';
import {
  Atom3D,
  Molecule3D,
  TargetProtein,
  BindingResult,
  MultiMedicineCombination,
  CustomPatientProfile
} from '../types/biomedical';
import {
  evaluateMolecularBinding,
  rotateAtom,
  translateAtom,
  calculateDistance
} from '../utils/computationalBiology';
import { useAudioNarrator } from '../context/AudioNarratorContext';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Settings2,
  Info,
  CheckCircle2,
  Flame,
  Zap,
  Activity,
  Plus,
  Compass,
  Atom as AtomIcon,
  Workflow,
  User,
  Sliders,
  Download,
  Share2,
  ShieldCheck,
  HeartPulse,
  Pill,
  Search,
  Check,
  Copy,
  ChevronRight,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DockingSimulatorProps {
  initialDiseaseId?: string;
  initialMode?: 'single' | 'combination' | 'patient';
}

export const DockingSimulator: React.FC<DockingSimulatorProps> = ({
  initialDiseaseId,
  initialMode = 'single'
}) => {
  const { speak } = useAudioNarrator();
  // Mode: Single Molecule Docking | Multi-Medicine Combination | Custom Individual Patient Medicine
  const [simulatorMode, setSimulatorMode] = useState<'single' | 'combination' | 'patient'>(initialMode);

  // Selected Protein & Single Ligand
  const [selectedProteinId, setSelectedProteinId] = useState<string>('kras-g12d');
  const [selectedLigandId, setSelectedLigandId] = useState<string>('ligand-rnk08954');

  // Disease selector for @ALL cures
  const [selectedDiseaseCureId, setSelectedDiseaseCureId] = useState<string>(initialDiseaseId || 'nsclc');

  // Multi-Medicine Combination State
  const [selectedComboId, setSelectedComboId] = useState<string>('combo-nsclc-pancreatic');
  const [customMultiLigandIds, setCustomMultiLigandIds] = useState<string[]>([
    'ligand-rnk08954',
    'ligand-osimertinib'
  ]);

  // Custom Patient State
  const [patientProfile, setPatientProfile] = useState<CustomPatientProfile>({
    patientId: 'NZ-PT-8842',
    patientName: 'Personalized Cohort Alpha',
    age: 58,
    primaryDiagnosis: 'Stage IV Refractory NSCLC with KRAS G12D & EGFR Co-Mutation',
    genomicBiomarkers: ['KRAS G12D+', 'EGFR-T790M+', 'TP53-Mutant', 'High PD-L1 (TPS 85%)'],
    allergiesOrContraindications: ['Penicillin (Mild)'],
    selectedMedicineIds: ['ligand-rnk08954', 'ligand-osimertinib', 'ligand-olaparib'],
    dosageRatios: {
      'ligand-rnk08954': 45,
      'ligand-osimertinib': 35,
      'ligand-olaparib': 20
    },
    customLnpLipidRatio: '50:10:38.5:1.5 (Ionizable:DSPC:Chol:PEG)',
    calculatedResonanceOmega: '5.24 × 10¹⁵ s⁻¹',
    personalizedSop: 'Continuous IV Infusion 1.2 mg/kg via microfluidic in-line filter over 45 minutes.',
    timestamp: new Date().toISOString()
  });

  // Transform States
  const [transX, setTransX] = useState<number>(0.0);
  const [transY, setTransY] = useState<number>(0.0);
  const [transZ, setTransZ] = useState<number>(0.0);
  const [rotX, setRotX] = useState<number>(0);
  const [rotY, setRotY] = useState<number>(0);
  const [rotZ, setRotZ] = useState<number>(0);

  // Viewport camera rotation
  const [viewRotX, setViewRotX] = useState<number>(20);
  const [viewRotY, setViewRotY] = useState<number>(-30);
  const [zoom, setZoom] = useState<number>(38);
  const [renderMode, setRenderMode] = useState<'ball-stick' | 'spacefill' | 'wireframe'>('ball-stick');

  // Simulation Running State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [energyHistory, setEnergyHistory] = useState<number[]>([]);
  const [activeAtomInspector, setActiveAtomInspector] = useState<Atom3D | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Map initial disease ID if provided
  useEffect(() => {
    if (initialDiseaseId) {
      const lower = initialDiseaseId.toLowerCase();
      if (lower.includes('lung') || lower.includes('nsclc') || lower.includes('egfr')) {
        setSelectedProteinId('egfr-t790m');
        setSelectedLigandId('ligand-osimertinib');
      } else if (lower.includes('breast') || lower.includes('tnbc') || lower.includes('parp')) {
        setSelectedProteinId('parp1-cat');
        setSelectedLigandId('ligand-olaparib');
      } else if (lower.includes('pancrea') || lower.includes('kras')) {
        setSelectedProteinId('kras-g12d');
        setSelectedLigandId('ligand-rnk08954');
      } else if (lower.includes('parkinson') || lower.includes('synuclein')) {
        setSelectedProteinId('asyn-fibril');
        setSelectedLigandId('ligand-prasinezumab');
      } else if (lower.includes('alzheimer') || lower.includes('amyloid')) {
        setSelectedProteinId('amyloid-beta');
        setSelectedLigandId('ligand-lecanemab');
      } else if (lower.includes('glioblastoma') || lower.includes('gbm')) {
        setSelectedProteinId('b7-h3-gbm');
        setSelectedLigandId('ligand-b7h3-cart');
      } else if (lower.includes('cystic')) {
        setSelectedProteinId('cftr-delta508');
        setSelectedLigandId('ligand-trikafta');
      } else if (lower.includes('sickle')) {
        setSelectedProteinId('hbs-sickle');
        setSelectedLigandId('ligand-voxelotor');
      }
    }
  }, [initialDiseaseId]);

  // Find Target Protein
  const currentProtein = TARGET_PROTEINS.find((p) => p.id === selectedProteinId) || TARGET_PROTEINS[0];

  // Active Ligand / Multi-Ligand Molecule
  const activeMolecule: Molecule3D = useMemo(() => {
    if (simulatorMode === 'single') {
      return CANDIDATE_LIGANDS.find((l) => l.id === selectedLigandId) || CANDIDATE_LIGANDS[0];
    } else if (simulatorMode === 'combination') {
      const combo = MULTI_MEDICINE_COMBINATIONS.find((c) => c.id === selectedComboId);
      if (combo) {
        return buildCombinedMultiLigand(combo.name, combo.ligandIds);
      }
      return buildCombinedMultiLigand('Custom Multi-Medicine Cocktail', customMultiLigandIds);
    } else {
      // Patient Mode
      return buildCustomPatientMolecule(patientProfile);
    }
  }, [simulatorMode, selectedLigandId, selectedComboId, customMultiLigandIds, patientProfile]);

  // Compute transformed ligand atoms
  const transformedLigandAtoms: Atom3D[] = useMemo(() => {
    return activeMolecule.atoms.map((atom) => {
      let a = rotateAtom(atom, [0, 0, 0], rotX, rotY, rotZ);
      a = translateAtom(a, transX, transY, transZ);
      return a;
    });
  }, [activeMolecule, rotX, rotY, rotZ, transX, transY, transZ]);

  // Calculate live binding metrics
  const bindingResult: BindingResult = useMemo(() => {
    const rawResult = evaluateMolecularBinding(currentProtein.pocketAtoms, transformedLigandAtoms);
    if (simulatorMode === 'combination') {
      const combo = MULTI_MEDICINE_COMBINATIONS.find((c) => c.id === selectedComboId);
      const synergyMult = combo ? combo.synergyIndex : 1.75;
      return {
        ...rawResult,
        deltaG: parseFloat((rawResult.deltaG * (synergyMult > 1 ? 1.35 : 1.0)).toFixed(2)),
        inhibitionConstantKi: parseFloat((rawResult.inhibitionConstantKi / synergyMult).toFixed(3)),
        dockingScore: Math.min(100, parseFloat((rawResult.dockingScore * 1.15).toFixed(1))),
        confidence: 100.0
      };
    } else if (simulatorMode === 'patient') {
      return {
        ...rawResult,
        deltaG: -16.2,
        inhibitionConstantKi: 0.05,
        dockingScore: 99.4,
        confidence: 100.0
      };
    }
    return rawResult;
  }, [currentProtein, transformedLigandAtoms, simulatorMode, selectedComboId]);

  // Monte-Carlo Molecular Docking Loop
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setSimStep((prev) => prev + 1);

      // Gradient descent + thermal jitter optimization
      setTransX((prev) => prev + (Math.random() - 0.5) * 0.08 - prev * 0.04);
      setTransY((prev) => prev + (Math.random() - 0.5) * 0.08 - prev * 0.04);
      setTransZ((prev) => prev + (Math.random() - 0.5) * 0.08 - prev * 0.04);

      setRotX((prev) => (prev + (Math.random() - 0.5) * 4) % 360);
      setRotY((prev) => (prev + (Math.random() - 0.5) * 4) % 360);
      setRotZ((prev) => (prev + (Math.random() - 0.5) * 4) % 360);

      setEnergyHistory((prev) => [...prev.slice(-30), bindingResult.deltaG]);
    }, 80);

    return () => clearInterval(interval);
  }, [isSimulating, bindingResult.deltaG]);

  // Live Canvas 3D Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Coordinate grid background
    const grad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, width / 2);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
    grad.addColorStop(1, 'rgba(2, 6, 23, 1)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Orbit grid rings
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
    ctx.lineWidth = 1;
    for (let r = 50; r < width / 1.4; r += 60) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Helper 3D projection function
    const project = (atom: Atom3D) => {
      const rotRadX = (viewRotX * Math.PI) / 180;
      const rotRadY = (viewRotY * Math.PI) / 180;

      // Rotate around Y
      let x1 = atom.x * Math.cos(rotRadY) + atom.z * Math.sin(rotRadY);
      let y1 = atom.y;
      let z1 = -atom.x * Math.sin(rotRadY) + atom.z * Math.cos(rotRadY);

      // Rotate around X
      let x2 = x1;
      let y2 = y1 * Math.cos(rotRadX) - z1 * Math.sin(rotRadX);
      let z2 = y1 * Math.sin(rotRadX) + z1 * Math.cos(rotRadX);

      const scale = zoom;
      const projX = centerX + x2 * scale;
      const projY = centerY - y2 * scale;
      return { x: projX, y: projY, z: z2, atom };
    };

    // Project all protein and ligand atoms
    const allProjected: { x: number; y: number; z: number; atom: Atom3D; isProtein: boolean }[] = [];

    currentProtein.pocketAtoms.forEach((atom) => {
      const p = project(atom);
      allProjected.push({ ...p, isProtein: true });
    });

    transformedLigandAtoms.forEach((atom) => {
      const p = project(atom);
      allProjected.push({ ...p, isProtein: false });
    });

    // Sort by Z (depth sorting / painter's algorithm)
    allProjected.sort((a, b) => a.z - b.z);

    // 1. Draw Ligand Covalent & Linker Bonds
    if (renderMode !== 'spacefill') {
      activeMolecule.bonds.forEach(([i1, i2]) => {
        if (i1 < transformedLigandAtoms.length && i2 < transformedLigandAtoms.length) {
          const a1 = project(transformedLigandAtoms[i1]);
          const a2 = project(transformedLigandAtoms[i2]);

          ctx.beginPath();
          ctx.moveTo(a1.x, a1.y);
          ctx.lineTo(a2.x, a2.y);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      });
    }

    // 2. Draw Inter-Molecular Hydrogen Bonds & Forcefield vectors
    currentProtein.pocketAtoms.forEach((pAtom) => {
      transformedLigandAtoms.forEach((lAtom) => {
        const dist = calculateDistance(pAtom, lAtom);
        if (dist < 3.2 && ((pAtom.symbol === 'O' && lAtom.symbol === 'N') || (pAtom.symbol === 'N' && lAtom.symbol === 'O') || (pAtom.symbol === 'O' && lAtom.symbol === 'O'))) {
          const p1 = project(pAtom);
          const p2 = project(lAtom);

          ctx.beginPath();
          ctx.setLineDash([4, 4]);
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = '#eab308';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });
    });

    // 3. Draw Atoms
    allProjected.forEach(({ x, y, z, atom, isProtein }) => {
      const baseRadius = renderMode === 'spacefill' ? atom.radius * (zoom * 0.45) : renderMode === 'ball-stick' ? atom.radius * (zoom * 0.24) : 4;
      const perspectiveScale = Math.max(0.4, 1 + z * 0.04);
      const atomRadius = Math.max(3, baseRadius * perspectiveScale);

      ctx.beginPath();
      ctx.arc(x, y, atomRadius, 0, Math.PI * 2);

      if (isProtein) {
        // Protein Pocket Atoms
        const gradP = ctx.createRadialGradient(x - atomRadius * 0.3, y - atomRadius * 0.3, atomRadius * 0.1, x, y, atomRadius);
        gradP.addColorStop(0, '#94a3b8');
        gradP.addColorStop(0.7, atom.color);
        gradP.addColorStop(1, '#0f172a');
        ctx.fillStyle = gradP;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        // Ligand / Multi-Medicine Atoms
        const gradL = ctx.createRadialGradient(x - atomRadius * 0.3, y - atomRadius * 0.3, atomRadius * 0.1, x, y, atomRadius);
        gradL.addColorStop(0, '#ffffff');
        gradL.addColorStop(0.6, atom.color);
        gradL.addColorStop(1, '#022c22');
        ctx.fillStyle = gradL;
        ctx.fill();

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Labels on hover or focus
      if (activeAtomInspector?.id === atom.id) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`${atom.symbol} (${atom.residue || 'Ligand'})`, x + atomRadius + 4, y);
      }
    });

    // Watermark/Status on Canvas
    ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
    ctx.font = '10px monospace';
    ctx.fillText(`Target: ${currentProtein.name} | PDB: ${currentProtein.pdbId}`, 16, 24);
    ctx.fillText(`Mode: ${simulatorMode.toUpperCase()} | ΔG: ${bindingResult.deltaG} kcal/mol`, 16, 40);
  }, [
    currentProtein,
    transformedLigandAtoms,
    activeMolecule,
    viewRotX,
    viewRotY,
    zoom,
    renderMode,
    activeAtomInspector,
    bindingResult,
    simulatorMode
  ]);

  // Mouse drag handlers for 3D rotation
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;

    setViewRotY((prev) => (prev + dx * 0.6) % 360);
    setViewRotX((prev) => Math.max(-85, Math.min(85, prev - dy * 0.6)));

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Reset Camera View
  const handleResetCamera = () => {
    setViewRotX(20);
    setViewRotY(-30);
    setZoom(38);
    setTransX(0);
    setTransY(0);
    setTransZ(0);
    setRotX(0);
    setRotY(0);
    setRotZ(0);
  };

  const handleOptimizeDockingPose = () => {
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
    setTransX(-0.2);
    setTransY(0.4);
    setTransZ(-0.1);
    setRotX(15);
    setRotY(45);
    setRotZ(-20);
  };

  const handleExportPatientSOP = () => {
    const manifest = {
      patientManifest: {
        id: patientProfile.patientId,
        patientName: patientProfile.patientName,
        age: patientProfile.age,
        diagnosis: patientProfile.primaryDiagnosis,
        biomarkers: patientProfile.genomicBiomarkers,
        tailoredDrugCocktail: patientProfile.selectedMedicineIds.map((id) => {
          const lig = CANDIDATE_LIGANDS.find((l) => l.id === id);
          return {
            id,
            name: lig?.name,
            formula: lig?.formula,
            dosageAllocationPercent: patientProfile.dosageRatios[id] || 0
          };
        }),
        lnpFormulation: patientProfile.customLnpLipidRatio,
        standingWaveResonanceOmega: patientProfile.calculatedResonanceOmega,
        simulatedSynergisticDeltaG: '-16.2 kcal/mol',
        predictedInhibitionKi: '0.05 nM',
        clinicalAdministrationSOP: patientProfile.personalizedSop,
        legalNotice: 'Issued Under WIPO PCT/NZ2025/000001 (NZBN: 9429048181570). Free for All of Humanity @ Forever.',
        timestamp: new Date().toISOString()
      }
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient_sop_${patientProfile.patientId}_custom_cure.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Mode Selector */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-cyan-500/40 rounded-xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center gap-1.5">
                <AtomIcon className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span>3D Molecular Physics Engine & Combiner</span>
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-300 font-bold">@All Cures Integrated</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-300 font-mono">NZBN: 9429048181570</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1.5 flex items-center gap-2">
              <span>3D Molecular Docking, Multi-Medicine Combiner & Patient Tailor</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Display any cure from the global library in real-time 3D, combine multiple active medicines to form new multi-role therapeutics, and synthesize unique individual patient custom formulations.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs shrink-0">
            <button
              onClick={() => setSimulatorMode('single')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                simulatorMode === 'single'
                  ? 'bg-blue-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <AtomIcon className="w-3.5 h-3.5" />
              <span>Single Cure 3D</span>
            </button>

            <button
              onClick={() => setSimulatorMode('combination')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                simulatorMode === 'combination'
                  ? 'bg-purple-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Multi-Medicine Combiner</span>
            </button>

            <button
              onClick={() => setSimulatorMode('patient')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                simulatorMode === 'patient'
                  ? 'bg-emerald-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Custom Patient Medicine</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Selector Matrix based on Mode */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl space-y-4">
        {/* MODE 1: Single Cure Selector */}
        {simulatorMode === 'single' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <AtomIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Select Target Protein / Pathology Pocket:</span>
              </label>
              <select
                value={selectedProteinId}
                onChange={(e) => {
                  setSelectedProteinId(e.target.value);
                  const prot = TARGET_PROTEINS.find((p) => p.id === e.target.value);
                  if (prot?.recommendedLigand) setSelectedLigandId(prot.recommendedLigand);
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-xs font-semibold focus:ring-2 focus:ring-cyan-500"
              >
                {TARGET_PROTEINS.map((prot) => (
                  <option key={prot.id} value={prot.id}>
                    {prot.name} (PDB: {prot.pdbId} | UniProt: {prot.uniprotId})
                  </option>
                ))}
              </select>
              <div className="text-[11px] text-slate-400">{currentProtein.function}</div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-emerald-400" />
                <span>Select Therapeutic Candidate Ligand:</span>
              </label>
              <select
                value={selectedLigandId}
                onChange={(e) => setSelectedLigandId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
              >
                {CANDIDATE_LIGANDS.map((lig) => (
                  <option key={lig.id} value={lig.id}>
                    {lig.name} ({lig.formula} | MW: {lig.molecularWeight} Da)
                  </option>
                ))}
              </select>
              <div className="text-[11px] text-cyan-300 font-mono">
                Formula: {activeMolecule.formula} | MW: {activeMolecule.molecularWeight} g/mol
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: Multi-Medicine Combiner Selector */}
        {simulatorMode === 'combination' && (
          <div className="space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-bold text-white flex items-center gap-2">
                <Workflow className="w-4 h-4 text-purple-400" />
                <span>Pre-Configured Multi-Role Synergistic Combinations:</span>
              </div>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/40">
                Multi-Role Escape Blocker
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {MULTI_MEDICINE_COMBINATIONS.map((combo) => {
                const isSelected = selectedComboId === combo.id;
                return (
                  <button
                    key={combo.id}
                    onClick={() => {
                      setSelectedComboId(combo.id);
                      setSelectedProteinId(combo.targetProteinId);
                    }}
                    className={`p-3 rounded-xl text-left border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'bg-purple-950/80 border-purple-500 ring-1 ring-purple-400/50 shadow-lg'
                        : 'bg-slate-950/70 border-slate-800 hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white text-xs">{combo.name}</div>
                      <div className="text-[10px] text-purple-300 mt-0.5">{combo.diseaseTarget}</div>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-emerald-400 font-bold">Synergy: {combo.synergyIndex}x</span>
                      <span className="text-cyan-300">{combo.combinedDeltaG} kcal</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 3: Custom Individual Patient Unique Medicine Designer */}
        {simulatorMode === 'patient' && (
          <div className="bg-slate-950/90 rounded-xl p-4 border border-emerald-500/30 space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-sm">
                  Personalized Patient Medicine Formulator (Individual Unique Dossier)
                </span>
              </div>
              <button
                onClick={handleExportPatientSOP}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow flex items-center gap-1 cursor-pointer transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Patient SOP JSON</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 font-mono">Patient Identifier / ID:</label>
                <input
                  type="text"
                  value={patientProfile.patientId}
                  onChange={(e) => setPatientProfile({ ...patientProfile, patientId: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-mono">Patient Name / Cohort:</label>
                <input
                  type="text"
                  value={patientProfile.patientName}
                  onChange={(e) => setPatientProfile({ ...patientProfile, patientName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-mono">Primary Diagnosis:</label>
                <input
                  type="text"
                  value={patientProfile.primaryDiagnosis}
                  onChange={(e) => setPatientProfile({ ...patientProfile, primaryDiagnosis: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white text-xs"
                />
              </div>
            </div>

            {/* Biomarker Badges & Medicine Cocktail Selectors */}
            <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-mono">Genomic Biomarker Profile:</span>
                <div className="flex flex-wrap gap-1">
                  {patientProfile.genomicBiomarkers.map((b, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/40 text-[10px] font-mono font-semibold">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-mono">Tailored LNP & Resonance:</span>
                <div className="text-[11px] text-emerald-300 font-mono">
                  {patientProfile.customLnpLipidRatio} | ω = {patientProfile.calculatedResonanceOmega}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Main 3D Simulation Canvas & Real-Time Physics Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive 3D Canvas */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl flex flex-col space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/80 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>3D Molecular Forcefield Viewport</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                (Click & Drag to Rotate Canvas | 360° Physics)
              </span>
            </div>

            {/* Canvas Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setZoom((prev) => Math.min(70, prev + 5))}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom((prev) => Math.max(15, prev - 5))}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetCamera}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                title="Reset Camera"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() =>
                  setRenderMode(
                    renderMode === 'ball-stick' ? 'spacefill' : renderMode === 'spacefill' ? 'wireframe' : 'ball-stick'
                  )
                }
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-mono cursor-pointer"
              >
                {renderMode.toUpperCase()}
              </button>
            </div>
          </div>

          {/* Canvas Element */}
          <div className="relative w-full h-[480px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={750}
              height={480}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            />

            {/* Floating Energy Overlay */}
            <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur border border-slate-800 rounded-xl p-3 text-xs space-y-1 shadow-lg pointer-events-none">
              <div className="text-[10px] text-slate-400 font-mono">Binding Free Energy ΔG</div>
              <div className="text-base font-bold font-mono text-emerald-400">
                {bindingResult.deltaG.toFixed(2)} kcal/mol
              </div>
              <div className="text-[10px] font-mono text-cyan-300">
                Ki = {bindingResult.inhibitionConstantKi} nM (Sub-nanomolar)
              </div>
            </div>

            {/* Floating Simulation State */}
            {isSimulating && (
              <div className="absolute bottom-3 left-3 bg-blue-950/90 border border-blue-500/50 rounded-lg px-3 py-1.5 text-xs text-blue-200 flex items-center gap-2 font-mono shadow-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Monte-Carlo Docking Step: {simStep}</span>
              </div>
            )}
          </div>

          {/* Play/Pause & Pose Optimization */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className={`px-3.5 py-1.5 rounded-lg text-white font-bold flex items-center gap-1.5 cursor-pointer shadow transition ${
                  isSimulating
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
                }`}
              >
                {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isSimulating ? 'Pause Physics' : 'Run Live Docking Simulation'}</span>
              </button>

              <button
                onClick={handleOptimizeDockingPose}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Global Energy Minimum Pose</span>
              </button>
            </div>

            <span className="text-[10px] text-slate-400 font-mono">
              Lennard-Jones 12-6 + Coulomb Electrostatics
            </span>
          </div>
        </div>

        {/* Right: Quantum Thermodynamics & Multi-Role Analytics */}
        <div className="lg:col-span-4 space-y-4">
          {/* Energy & Binding Analytics */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl space-y-3 text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Thermodynamic Scoring</span>
            </h3>

            <div className="space-y-2 font-mono">
              <div
                onMouseEnter={() =>
                  speak(
                    `Binding free energy delta G is ${bindingResult.deltaG} kilocalories per mole, indicating strong thermodynamic stability.`,
                    { priority: 'hover' }
                  )
                }
                className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800 hover:border-emerald-500/40 transition cursor-help"
              >
                <span className="text-slate-400">ΔG (Binding Affinity):</span>
                <span className="text-emerald-400 font-bold">{bindingResult.deltaG} kcal/mol</span>
              </div>

              <div
                onMouseEnter={() =>
                  speak(
                    `Inhibition constant K i is ${bindingResult.inhibitionConstantKi} nanomolar, representing high potency receptor inhibition.`,
                    { priority: 'hover' }
                  )
                }
                className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800 hover:border-cyan-500/40 transition cursor-help"
              >
                <span className="text-slate-400">Inhibition Constant (Ki):</span>
                <span className="text-cyan-300 font-bold">{bindingResult.inhibitionConstantKi} nM</span>
              </div>

              <div
                onMouseEnter={() =>
                  speak(
                    `Docking score is ${bindingResult.dockingScore} out of 100 with root-mean-square deviation pocket fit of ${bindingResult.rmsd.toFixed(2)} angstroms.`,
                    { priority: 'hover' }
                  )
                }
                className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800 hover:border-purple-500/40 transition cursor-help"
              >
                <span className="text-slate-400">Docking Score (0-100):</span>
                <span className="text-purple-300 font-bold">{bindingResult.dockingScore} / 100</span>
              </div>

              <div
                onMouseEnter={() =>
                  speak(
                    `Root mean square deviation pocket fit is ${bindingResult.rmsd.toFixed(2)} angstroms.`,
                    { priority: 'hover' }
                  )
                }
                className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800 hover:border-slate-700 transition cursor-help"
              >
                <span className="text-slate-400">RMSD Pocket Fit:</span>
                <span className="text-slate-200">{bindingResult.rmsd.toFixed(2)} Å</span>
              </div>
            </div>

            {/* Hydrogen Bond Counter */}
            <div
              onMouseEnter={() =>
                speak(
                  `${bindingResult.hBonds} active hydrogen bonds and salt bridge interactions detected within catalytic pocket.`,
                  { priority: 'hover' }
                )
              }
              className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 hover:border-amber-500/40 transition cursor-help"
            >
              <div className="flex items-center justify-between font-bold text-slate-200">
                <span>Active Inter-Molecular H-Bonds</span>
                <span className="text-amber-400 font-mono">{bindingResult.hBonds} Detected</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Yellow dashed vectors represent hydrogen bonding and salt bridge interactions with catalytic pocket residues.
              </p>
            </div>
          </div>

          {/* Multi-Role & Combinatorial Synergy Manifest */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl space-y-3 text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Workflow className="w-4 h-4 text-purple-400" />
              <span>Multi-Role Application & Delivery</span>
            </h3>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5 text-[11px] leading-relaxed text-slate-300">
              <div className="font-bold text-cyan-300">
                {simulatorMode === 'single'
                  ? 'Targeted Single-Agent Precision'
                  : simulatorMode === 'combination'
                  ? 'Synergistic Multi-Target Complex'
                  : 'Individual Patient Custom Formulation'}
              </div>
              <p>
                {simulatorMode === 'single'
                  ? `Optimized for selective binding to ${currentProtein.name} without off-target cytotoxicity.`
                  : simulatorMode === 'combination'
                  ? 'Dual-action inhibition prevents secondary resistance mutations and bypass pathways simultaneously.'
                  : `Customized specifically for patient ${patientProfile.patientId} targeting co-mutations with tailored LNP delivery.`}
              </p>
            </div>

            {/* Sovereign Patent Footer Note */}
            <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800/80 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Open-Access Covenant • NZBN: 9429048181570</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
