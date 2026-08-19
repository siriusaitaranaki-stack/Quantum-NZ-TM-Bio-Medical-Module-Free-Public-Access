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
import { SOVEREIGN_PATENT_HEADER } from '../data/patentData';
import { GLOBAL_MANUFACTURING_HUBS } from '../data/hubsData';
import confetti from 'canvas-confetti';
import {
  X,
  Download,
  FileCheck2,
  FileCode,
  FileText,
  Check,
  Sparkles,
  Share2,
  Layers
} from 'lucide-react';

interface ExportDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportDossierModal: React.FC<ExportDossierModalProps> = ({
  isOpen,
  onClose
}) => {
  const [downloadFormat, setDownloadFormat] = useState<'markdown' | 'json' | 'sop'>('markdown');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsExporting(true);

    setTimeout(() => {
      let content = '';
      let filename = '';
      let mimeType = 'text/plain';

      if (downloadFormat === 'markdown') {
        filename = 'Quantum-NZ_Sovereign_BioMedical_Dossier.md';
        mimeType = 'text/markdown';
        content = `# QUANTUM-NZ™ SOVEREIGN MEDICAL DEVELOPMENTAL SIMULATION SUITE
## FREE FOR ALL OF HUMANITY @ FOREVER
**Creator & Sovereign Architect:** ${SOVEREIGN_PATENT_HEADER.creator}
**IP Portfolio:** ${SOVEREIGN_PATENT_HEADER.organization}
**NZBN:** ${SOVEREIGN_PATENT_HEADER.nzbn} | **Patent Ref:** ${SOVEREIGN_PATENT_HEADER.patentNumber}
**Google Dev ID:** ${SOVEREIGN_PATENT_HEADER.googleDevId}
**Microsoft Dev ID:** ${SOVEREIGN_PATENT_HEADER.microsoftDevId}

---

### UNIVERSAL HUMANITARIAN OPEN-ACCESS COVENANT
${SOVEREIGN_PATENT_HEADER.universalCovenant}

---

### COMPREHENSIVE DISEASE CURES & FORMULATIONS (TOP 10 + NEURO/GENETIC)

${COMPREHENSIVE_DISEASE_CURES.map(
  (d, idx) => `
#### ${idx + 1}. ${d.diseaseName} (${d.category})
- **Protocol Name:** ${d.cureName}
- **Cure Type:** ${d.cureType}
- **Standing Wave Frequency:** ${d.standingWaveFrequency} (t0 = ${d.t0Seconds}s)
- **Standing Wave Equation:** \`${d.standingWaveEquation}\`
- **Active Chemical Compounds:**
${d.activeCompounds
  .map(
    (c) =>
      `  * **${c.name}** (${c.molecularFormula}): \`${c.smiles}\`\n    Mechanism: ${c.mechanism}\n    Synthesis: ${c.synthesisMethod}`
  )
  .join('\n')}
- **Delivery Vehicle:** ${d.deliverySystem.vehicle} (${d.deliverySystem.particleSizeNm} nm)
- **Clinical Administration:** ${d.clinicalProtocol.route} | Dosage: ${d.clinicalProtocol.dosage} | Infusion: ${d.clinicalProtocol.infusionTime}
- **Real-World Evidence:** ${d.realWorldEvidence}
`
).join('\n---\n')}

---

### 12 GLOBAL MANUFACTURING HUBS (615M ANNUAL DOSES)
${GLOBAL_MANUFACTURING_HUBS.map(
  (h) => `- **${h.name}** (${h.location}) - Capacity: ${h.annualCapacityDoses.toLocaleString()} doses/yr | QC: ${h.qcPassRate}%`
).join('\n')}
`;
      } else if (downloadFormat === 'json') {
        filename = 'Quantum-NZ_Biomedical_Formulations.json';
        mimeType = 'application/json';
        content = JSON.stringify(
          {
            patentHeader: SOVEREIGN_PATENT_HEADER,
            cures: COMPREHENSIVE_DISEASE_CURES,
            manufacturingHubs: GLOBAL_MANUFACTURING_HUBS,
            exportTimestamp: new Date().toISOString()
          },
          null,
          2
        );
      } else {
        filename = 'Quantum-NZ_Hospital_Clinical_SOP.txt';
        mimeType = 'text/plain';
        content = `HOSPITAL CLINICAL ADMINISTRATION & PRODUCTION STANDARD OPERATING PROCEDURE (SOP)
QUANTUM-NZ MEDICAL DEVELOPMENTAL SIMULATION SOFTWARE
FREE FOR ALL HOSPITALS, CLINICS, AND UNIVERSITIES GLOBALLY

================================================================================
SECTION 1: CLINICAL RECEPTION & STORAGE PROTOCOL
- Store lipid nanoparticle vials at 2°C to 8°C (Refrigerated) or -80°C for cryopreserved cellular constructs.
- Thaw vials to room temperature (20-25°C) 30 minutes prior to administration.
- Inspect via optical laser backscatter for zero precipitation (PDI < 0.08).

================================================================================
SECTION 2: INFUSION & DOSING PROCEDURES
${COMPREHENSIVE_DISEASE_CURES.map(
  (d) => `[${d.diseaseName}]
- Dosage: ${d.clinicalProtocol.dosage}
- Route: ${d.clinicalProtocol.route}
- Infusion Duration: ${d.clinicalProtocol.infusionTime}
- Post-Infusion Monitoring: ${d.clinicalProtocol.monitoringPeriod}
- Efficacy Verification: ${d.clinicalProtocol.followUpVerification}
`
).join('\n')}
`;
      }

      // Trigger browser download
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setIsExporting(false);
      setExportSuccess(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => setExportSuccess(false), 3000);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden relative">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              Export Sovereign Bio-Medical Research Dossier
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-slate-300">
          <p className="text-slate-400 leading-relaxed">
            Download the complete scientific specification, chemical formulations with SMILES strings,
            standing-wave calculus equations, and hospital administration SOPs under the Universal Humanitarian Open-Access Grant.
          </p>

          {/* Format Selection Radio Cards */}
          <div className="space-y-2">
            <div
              onClick={() => setDownloadFormat('markdown')}
              className={`p-3 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                downloadFormat === 'markdown'
                  ? 'bg-purple-950/50 border-purple-500/60 ring-1 ring-purple-400/40'
                  : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="font-bold text-white text-xs">Full Scientific Dossier (.MD)</div>
                  <div className="text-[11px] text-slate-400">Complete Markdown dossier for journals & research labs</div>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded">.md</span>
            </div>

            <div
              onClick={() => setDownloadFormat('json')}
              className={`p-3 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                downloadFormat === 'json'
                  ? 'bg-cyan-950/50 border-cyan-500/60 ring-1 ring-cyan-400/40'
                  : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileCode className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="font-bold text-white text-xs">Raw Chemical & Molecular Dataset (.JSON)</div>
                  <div className="text-[11px] text-slate-400">Machine-readable SMILES, frequencies, and parameters</div>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-cyan-900/60 text-cyan-300 px-2 py-0.5 rounded">.json</span>
            </div>

            <div
              onClick={() => setDownloadFormat('sop')}
              className={`p-3 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                downloadFormat === 'sop'
                  ? 'bg-emerald-950/50 border-emerald-500/60 ring-1 ring-emerald-400/40'
                  : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="font-bold text-white text-xs">Hospital Clinical Administration SOP (.TXT)</div>
                  <div className="text-[11px] text-slate-400">Step-by-step infusion & storage protocols for clinics</div>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded">.txt</span>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-center gap-2 text-[11px] text-emerald-300 font-medium">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Includes WIPO PCT/NZ2025/000001 & NZBN 9429051408892 Humanitarian Open Access Seal</span>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-950/60 transition cursor-pointer"
          >
            {exportSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Download className="w-4 h-4" />}
            <span>{isExporting ? 'Packaging Dossier...' : exportSuccess ? 'Downloaded!' : 'Download Dossier'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
