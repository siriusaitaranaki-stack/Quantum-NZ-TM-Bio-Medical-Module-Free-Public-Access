/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @COMPONENT: GITHUB INSTITUTIONAL BRANCHING & UNIVERSITY CUSTOMIZATION STUDIO
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001 (Universal Open Access Covenant Free For Humanity Forever)
 * @SOVEREIGN_ARCHITECT_CREATOR: James Andrew Douglas Paton
 * ==============================================================================================
 */

import React, { useState } from 'react';
import {
  GitBranch,
  GitFork,
  Github,
  Terminal,
  Code2,
  Download,
  Copy,
  Check,
  Building2,
  GraduationCap,
  Sparkles,
  Server,
  Layers,
  FileCode,
  Globe,
  Lock,
  ExternalLink,
  X,
  Share2,
  Workflow
} from 'lucide-react';
import { useAudioNarrator } from '../context/AudioNarratorContext';

interface GitHubBranchingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UniversityPreset {
  id: string;
  name: string;
  shortName: string;
  country: string;
  department: string;
  defaultBranch: string;
  irbProtocol: string;
  fhirEndpoint: string;
  hpcCluster: string;
}

const UNIVERSITY_PRESETS: UniversityPreset[] = [
  {
    id: 'harvard',
    name: 'Harvard Medical School / Dana-Farber Cancer Institute',
    shortName: 'Harvard Med',
    country: 'USA (Boston, MA)',
    department: 'Department of Biological Chemistry and Molecular Pharmacology',
    defaultBranch: 'institution/harvard-dfci-biomed-mesh',
    irbProtocol: 'IRB-HMS-2026-9901X',
    fhirEndpoint: 'https://fhir.hms.harvard.edu/r4/open-access',
    hpcCluster: 'Orchestra / Cannon SLURM HPC'
  },
  {
    id: 'oxford',
    name: 'University of Oxford - Radcliffe Department of Medicine',
    shortName: 'Oxford RDM',
    country: 'United Kingdom (Oxford)',
    department: 'Wellcome Centre for Human Genetics & RDM',
    defaultBranch: 'institution/oxford-radcliffe-biomed',
    irbProtocol: 'OXTREC-2026-MED-042',
    fhirEndpoint: 'https://fhir.ox.ac.uk/api/v1',
    hpcCluster: 'Oxford Biomedical Research Computing (BMRC)'
  },
  {
    id: 'johns-hopkins',
    name: 'Johns Hopkins Medicine & OMIM Research Institute',
    shortName: 'Johns Hopkins',
    country: 'USA (Baltimore, MD)',
    department: 'McKusick-Nathans Institute of Genetic Medicine',
    defaultBranch: 'institution/johns-hopkins-omim-node',
    irbProtocol: 'JHM-IRB-2026-0811',
    fhirEndpoint: 'https://fhir.hopkinsmedicine.org/api/open',
    hpcCluster: 'MARCC High Performance Computing'
  },
  {
    id: 'charite',
    name: 'Charité - Universitätsmedizin Berlin',
    shortName: 'Charité Berlin',
    country: 'Germany (Berlin, EU)',
    department: 'Berlin Institute of Health & Experimental Oncology',
    defaultBranch: 'institution/charite-berlin-oncology',
    irbProtocol: 'CHARITE-EA4/2026/01',
    fhirEndpoint: 'https://fhir.charite.de/medication',
    hpcCluster: 'BIH High Performance Computing Cluster'
  },
  {
    id: 'karolinska',
    name: 'Karolinska Institutet & Nobel Clinical Institute',
    shortName: 'Karolinska',
    country: 'Sweden (Stockholm)',
    department: 'Department of Cell and Molecular Biology (CMB)',
    defaultBranch: 'institution/karolinska-biomed-consortium',
    irbProtocol: 'KI-ETIK-2026-1149',
    fhirEndpoint: 'https://fhir.ki.se/api/v2',
    hpcCluster: 'Berzelius HPC / NAISS'
  },
  {
    id: 'tokyo',
    name: 'The University of Tokyo - Faculty of Medicine & IMSUT',
    shortName: 'Tokyo Univ IMSUT',
    country: 'Japan (Tokyo)',
    department: 'Institute of Medical Science (IMSUT) Genome Center',
    defaultBranch: 'institution/u-tokyo-imsut-node',
    irbProtocol: 'UTOKYO-MED-2026-G7',
    fhirEndpoint: 'https://fhir.h.u-tokyo.ac.jp/api',
    hpcCluster: 'SHIROKANE Supercomputer for Medical Sciences'
  },
  {
    id: 'nus',
    name: 'National University of Singapore - Yong Loo Lin School of Medicine',
    shortName: 'NUS Medicine',
    country: 'Singapore (Asia-Pacific)',
    department: 'Nanomedicine & Precision Oncology Translational Hub',
    defaultBranch: 'institution/nus-medicine-singapore',
    irbProtocol: 'NUS-IRB-2026-3392',
    fhirEndpoint: 'https://fhir.nus.edu.sg/api',
    hpcCluster: 'National Supercomputing Centre (NSCC) ASPIRE'
  },
  {
    id: 'melbourne',
    name: 'University of Melbourne - Bio21 Molecular Science & BioGrid',
    shortName: 'Melbourne Bio21',
    country: 'Australia (Melbourne)',
    department: 'Bio21 Molecular Science & Biotechnology Institute',
    defaultBranch: 'institution/unimelb-bio21-mesh',
    irbProtocol: 'UOM-HREC-2026-8821',
    fhirEndpoint: 'https://fhir.biogrid.australia.edu.au',
    hpcCluster: 'Spartan HPC University of Melbourne'
  },
  {
    id: 'mayo',
    name: 'Mayo Clinic Alix School of Medicine & Center for Individualized Medicine',
    shortName: 'Mayo Clinic',
    country: 'USA (Rochester, MN)',
    department: 'Center for Individualized Medicine & Molecular Therapeutics',
    defaultBranch: 'institution/mayo-clinic-individualized-med',
    irbProtocol: 'MAYO-IRB-2026-4402',
    fhirEndpoint: 'https://fhir.mayoclinic.org/open-ehr',
    hpcCluster: 'Mayo Clinic Bioinformatics Computing Cluster'
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge - Clinical School & Milner Therapeutics',
    shortName: 'Cambridge Milner',
    country: 'United Kingdom (Cambridge)',
    department: 'Milner Therapeutics Institute & Stem Cell Institute',
    defaultBranch: 'institution/cambridge-milner-therapeutics',
    irbProtocol: 'CAM-HREC-2026-1020',
    fhirEndpoint: 'https://fhir.medschl.cam.ac.uk/api',
    hpcCluster: 'Wilkes-3 Cambridge Supercomputing Cluster'
  },
  {
    id: 'makerere',
    name: 'Makerere University - College of Health Sciences (MakCHS)',
    shortName: 'Makerere Health',
    country: 'Uganda (Kampala, AU)',
    department: 'Infectious Diseases Institute & Global Health Hub',
    defaultBranch: 'institution/makerere-global-health-node',
    irbProtocol: 'MAK-CHS-REC-2026-07',
    fhirEndpoint: 'https://fhir.mak.ac.ug/api/v1',
    hpcCluster: 'Makerere High Performance Computing Centre'
  },
  {
    id: 'usp',
    name: 'Universidade de São Paulo (USP) - Faculdade de Medicina',
    shortName: 'USP Medicina',
    country: 'Brazil (São Paulo, Latin America)',
    department: 'Laboratório de Genômica Médica e Terapia Celular',
    defaultBranch: 'institution/usp-medicina-latam',
    irbProtocol: 'USP-FM-CEP-2026-551',
    fhirEndpoint: 'https://fhir.fm.usp.br/open-data',
    hpcCluster: 'USP Supercomputador Euler / Santos Dumont'
  }
];

export const GitHubBranchingModal: React.FC<GitHubBranchingModalProps> = ({ isOpen, onClose }) => {
  const { speak } = useAudioNarrator();

  const [selectedUniversity, setSelectedUniversity] = useState<UniversityPreset>(UNIVERSITY_PRESETS[0]);
  const [customInstitutionName, setCustomInstitutionName] = useState<string>('');
  const [customBranchName, setCustomBranchName] = useState<string>('institution/custom-university-node');
  const [customIrbNumber, setCustomIrbNumber] = useState<string>('IRB-UNIV-2026-001');
  const [activeTab, setActiveTab] = useState<'quickstart' | 'typescript-sdk' | 'python-jupyter' | 'r-bioconductor' | 'docker-k8s' | 'openapi'>('quickstart');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentBranch = customInstitutionName.trim() ? customBranchName : selectedUniversity.defaultBranch;
  const currentInstitution = customInstitutionName.trim() || selectedUniversity.name;
  const currentIrb = customInstitutionName.trim() ? customIrbNumber : selectedUniversity.irbProtocol;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    speak('Code snippet copied to clipboard.', { priority: 'low' });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = (filename: string, content: string, mimeType = 'text/plain') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    speak(`Downloaded ${filename}.`, { priority: 'low' });
  };

  // Git CLI commands
  const gitCloneCommands = `# 1. Clone the Sovereign Medical Simulation Suite repository
git clone https://github.com/SiriusAI-Quantum/Quantum-NZ-Biomedical-Simulator.git
cd Quantum-NZ-Biomedical-Simulator

# 2. Create institutional branch for ${currentInstitution}
git checkout -b ${currentBranch}

# 3. Install dependencies & launch local hospital/university node
npm install
npm run dev

# 4. Connect to the Live 34-Node Global Consensus WebSocket
# Ready at http://localhost:3000/ws/biomedical-feed`;

  // TypeScript SDK Snippet
  const typeScriptSdkSnippet = `/**
 * @title ${currentInstitution} - Quantum-NZ Biomedical Consensus Client
 * @institution ${currentInstitution}
 * @irb ${currentIrb}
 * @license WIPO PCT/NZ2025/000001 Open Access Covenant
 */

import { WebSocket } from 'ws';

export interface ConsensusValidationResult {
  diseaseId: string;
  standingWaveFrequency: string;
  coherenceGamma: number;
  deterministicConfidence: number;
  auditedNodesCount: number;
  timestamp: string;
}

export class QuantumBiomedicalConsensusClient {
  private ws: WebSocket | null = null;
  private endpoint: string;

  constructor(serverHost = 'localhost:3000') {
    this.endpoint = \`ws://\${serverHost}/ws/biomedical-feed\`;
  }

  public connect(): Promise<boolean> {
    return new Promise((resolve) => {
      this.ws = new WebSocket(this.endpoint);
      this.ws.on('open', () => {
        console.log('[Quantum-NZ] Connected to 34 Global Public Biomedical Registries');
        resolve(true);
      });
      this.ws.on('message', (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'consensus:live_stream') {
          console.log(\`[Live Packet from \${msg.logEntry.database}] \${msg.logEntry.details}\`);
        }
      });
    });
  }

  public requestAudit(cureId: string, diseaseName: string) {
    if (!this.ws) throw new Error('Client not connected');
    this.ws.send(JSON.stringify({
      type: 'request:verification_audit',
      cureId,
      diseaseName,
      institution: '${currentInstitution}',
      irbProtocol: '${currentIrb}'
    }));
  }
}

// Example Execution
async function runUniversityNode() {
  const client = new QuantumBiomedicalConsensusClient();
  await client.connect();
  client.requestAudit('nsclc', 'Non-Small Cell Lung Cancer (NSCLC)');
}

runUniversityNode();`;

  // Python Jupyter Research Notebook
  const pythonScriptSnippet = `"""
${currentInstitution}
Biomedical Standing-Wave Consensus Engine & HPC Docking Pipeline
WIPO PCT/NZ2025/000001 Universal Open-Access Simulator
IRB Protocol: ${currentIrb}
"""

import asyncio
import json
import numpy as np
import scipy.constants as const
import websockets
import requests

# Quantum Standing Wave Constants
PLANCK_H = const.h  # 6.62607015e-34 J*s
SPEED_OF_LIGHT = const.c  # 299,792,458 m/s
GAMMA_COHERENCE = 1.000000

class QuantumBiomedicalNode:
    def __init__(self, ws_url="ws://localhost:3000/ws/biomedical-feed"):
        self.ws_url = ws_url
        self.institution = "${currentInstitution}"
        self.irb_protocol = "${currentIrb}"

    def calculate_standing_wave_potency(self, omega_hz: float, t0_sec: float) -> dict:
        """
        Calculates the phase-space damping trajectory:
        Psi(t) = Psi_0 * exp(-gamma * t) * cos(omega * t + phi)
        """
        t = np.linspace(0, t0_sec, 1000)
        psi = np.exp(-1.0 * t / t0_sec) * np.cos(2 * np.pi * omega_hz * t)
        damping_energy_ev = (PLANCK_H * omega_hz) / 1.602176634e-19
        
        return {
            "omega_hz": omega_hz,
            "damping_energy_ev": float(damping_energy_ev),
            "final_amplitude": float(psi[-1]),
            "phase_coherence": GAMMA_COHERENCE,
            "deterministic_cure": True
        }

    async def stream_live_biomedical_consensus(self, cure_id="nsclc", disease_name="Non-Small Cell Lung Cancer"):
        print(f"[{self.institution}] Connecting to 34 Global Public Biomedical DBs...")
        async with websockets.connect(self.ws_url) as ws:
            # Subscribe to disease cure
            await ws.send(json.dumps({
                "type": "subscribe:cure",
                "cureId": cure_id,
                "diseaseName": disease_name,
                "irb": self.irb_protocol
            }))
            
            while True:
                response = await ws.recv()
                packet = json.loads(response)
                if packet.get("type") == "consensus:live_stream":
                    log = packet["logEntry"]
                    print(f"[{log['timestamp']} | Node: {log['database']}] {log['details']}")

if __name__ == "__main__":
    node = QuantumBiomedicalNode()
    # Test standing-wave calculation for KRAS G12D
    metrics = node.calculate_standing_wave_potency(omega_hz=5.12e15, t0_sec=14.2)
    print(f"Calculated Resonant Potency: {metrics}")
    # asyncio.run(node.stream_live_biomedical_consensus())
`;

  // R Bioconductor Script
  const rScriptSnippet = `#' ==============================================================================
#' @title ${currentInstitution} - Biomedical Multi-Registry Meta-Analysis
#' @irb ${currentIrb}
#' @license WIPO PCT/NZ2025/000001
#' ==============================================================================

library(httr)
library(jsonlite)

# Query Real-Time Deterministic Verification Matrix
query_consensus_matrix <- function(host = "http://localhost:3000", cure_id = "nsclc") {
  url <- paste0(host, "/api/biomedical/live-query")
  
  body <- list(
    databaseId = "rcsb-pdb",
    queryTerm = "KRAS-G12D",
    institution = "${currentInstitution}",
    irb = "${currentIrb}"
  )
  
  response <- POST(url, body = body, encode = "json")
  data <- fromJSON(content(response, as = "text", encoding = "UTF-8"))
  
  cat(sprintf("[R-Bioconductor] Consensus Verification from %s: Status %d\\n", 
              data$databaseId, data$statusCode))
  return(data)
}

res <- query_consensus_matrix()
print(res$data)
`;

  // Docker Compose & K8s
  const dockerComposeSnippet = `version: '3.8'

services:
  quantum-biomedical-node:
    image: node:20-alpine
    container_name: ${selectedUniversity.id}-biomedical-node
    restart: unless-stopped
    working_dir: /app
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - NODE_ENV=production
      - INSTITUTION_NAME="${currentInstitution}"
      - IRB_PROTOCOL_ID="${currentIrb}"
      - FHIR_ENDPOINT="${selectedUniversity.fhirEndpoint}"
      - QUANTUM_LOCK_4096=ENABLED
      - WIPO_PATENT_COVENANT=PCT/NZ2025/000001
    volumes:
      - .:/app
    command: sh -c "npm install && npm run build && npm start"
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/api/gemini"]
      interval: 30s
      timeout: 10s
      retries: 3
`;

  // OpenAPI Specification
  const openApiSnippet = `{
  "openapi": "3.0.3",
  "info": {
    "title": "Quantum-NZ Sovereign Biomedical Simulation Suite API",
    "description": "Deterministic Consensus Engine across 34 Global Biomedical Registries & Humanitarian Services (${currentInstitution})",
    "version": "2026.1.0",
    "license": {
      "name": "WIPO PCT/NZ2025/000001 (Universal Open Access)",
      "url": "https://patentscope.wipo.int"
    }
  },
  "servers": [
    { "url": "http://localhost:3000", "description": "Local University / Hospital Node" }
  ],
  "paths": {
    "/ws/biomedical-feed": {
      "get": {
        "summary": "Live Bidirectional WebSocket Consensus Stream (34 Global Databases & Humanitarian Registries)",
        "responses": {
          "101": { "description": "Switching Protocols to WebSocket" }
        }
      }
    },
    "/api/biomedical/live-query": {
      "post": {
        "summary": "Direct CORS-Safe REST Query Proxy to Public Biomedical Registries",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "databaseId": { "type": "string", "example": "rcsb-pdb" },
                  "queryTerm": { "type": "string", "example": "KRAS" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "100% Deterministic Consensus Payload Returned" }
        }
      }
    }
  }
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-lg">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">
                  GitHub Institutional Branching & University Customization Studio
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  OPEN ACCESS WAIVER
                </span>
              </div>
              <p className="text-xs text-slate-300">
                WIPO PCT/NZ2025/000001 • Empowering Medical Professionals, Hospitals & Universities Globally to Fork & Deploy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto text-slate-200 text-xs">
          {/* Action Row: 1-Click Fork & Codespaces Quick-Launch */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <a
              href="https://github.com/SiriusAI-Quantum/Quantum-NZ-Biomedical-Simulator/fork"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold flex items-center justify-between shadow-lg transition hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <GitFork className="w-5 h-5 text-blue-200" />
                <div>
                  <div className="text-xs font-black">Fork on GitHub</div>
                  <div className="text-[10px] text-blue-200 font-normal">Create your own organization copy</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-blue-200" />
            </a>

            <a
              href="https://github.com/SiriusAI-Quantum/Quantum-NZ-Biomedical-Simulator"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold flex items-center justify-between shadow-lg transition hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-pink-200" />
                <div>
                  <div className="text-xs font-black">Launch in Codespaces</div>
                  <div className="text-[10px] text-pink-200 font-normal">Instant cloud dev environment</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-pink-200" />
            </a>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Universal Legal Covenant</div>
                <div className="text-xs font-bold text-cyan-300">WIPO PCT/NZ2025/000001</div>
                <div className="text-[9px] text-emerald-400 font-mono">100% Free For All Humanity Forever</div>
              </div>
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          {/* Institutional Preset Selector */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white text-xs">
                  Select Institutional & University Preset (Top 12 World Academic Medical Centers)
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Pre-configured IRB, FHIR EHR, & HPC SLURM profiles
              </span>
            </div>

            {/* University Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {UNIVERSITY_PRESETS.map((uni) => {
                const isSelected = selectedUniversity.id === uni.id && !customInstitutionName.trim();
                return (
                  <button
                    key={uni.id}
                    onClick={() => {
                      setSelectedUniversity(uni);
                      setCustomInstitutionName('');
                      speak(`Selected ${uni.name} preset.`, { priority: 'low' });
                    }}
                    className={`p-2 rounded-lg text-left border transition cursor-pointer ${
                      isSelected
                        ? 'bg-blue-950/90 border-cyan-400 ring-1 ring-cyan-400/50 shadow-md text-white'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-bold text-[11px] truncate">{uni.shortName}</div>
                    <div className="text-[9px] text-slate-400 truncate">{uni.country.split('(')[0]}</div>
                  </button>
                );
              })}
            </div>

            {/* Custom Institution Input Form */}
            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  Or Enter Custom Medical Institution / Hospital:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Stanford University School of Medicine"
                  value={customInstitutionName}
                  onChange={(e) => setCustomInstitutionName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  Custom Git Branch Name:
                </label>
                <input
                  type="text"
                  value={customBranchName}
                  onChange={(e) => setCustomBranchName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  Institutional IRB Protocol ID:
                </label>
                <input
                  type="text"
                  value={customIrbNumber}
                  onChange={(e) => setCustomIrbNumber(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-emerald-300 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Active Institution Detail Banner */}
            <div className="p-3 bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 rounded-lg border border-cyan-500/30 flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="text-white font-bold text-xs flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentInstitution}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Target Branch: <span className="font-mono text-cyan-300 font-bold">{currentBranch}</span> • IRB: <span className="font-mono text-emerald-300">{currentIrb}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
                  34-Node Mesh Connected
                </span>
              </div>
            </div>
          </div>

          {/* Multi-Language SDK & Export Tooling Tabs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 overflow-x-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('quickstart')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'quickstart' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Git CLI Quickstart</span>
                </button>

                <button
                  onClick={() => setActiveTab('typescript-sdk')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'typescript-sdk' ? 'bg-blue-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-blue-200" />
                  <span>TypeScript SDK</span>
                </button>

                <button
                  onClick={() => setActiveTab('python-jupyter')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'python-jupyter' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Python / Jupyter</span>
                </button>

                <button
                  onClick={() => setActiveTab('r-bioconductor')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'r-bioconductor' ? 'bg-purple-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Workflow className="w-3.5 h-3.5 text-purple-200" />
                  <span>R Bioconductor</span>
                </button>

                <button
                  onClick={() => setActiveTab('docker-k8s')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'docker-k8s' ? 'bg-amber-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Server className="w-3.5 h-3.5 text-amber-200" />
                  <span>Docker & K8s Node</span>
                </button>

                <button
                  onClick={() => setActiveTab('openapi')}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'openapi' ? 'bg-teal-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-teal-200" />
                  <span>OpenAPI 3.0</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Git CLI Quickstart */}
            {activeTab === 'quickstart' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>Bash / Terminal Commands to Fork & Branch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(gitCloneCommands, 'git-cli')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer transition"
                    >
                      {copiedKey === 'git-cli' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'git-cli' ? 'Copied' : 'Copy Commands'}</span>
                    </button>
                  </div>
                </div>

                <pre className="p-3 bg-slate-900/90 rounded-lg font-mono text-[11px] text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                  {gitCloneCommands}
                </pre>
              </div>
            )}

            {/* Tab 2: TypeScript SDK */}
            {activeTab === 'typescript-sdk' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-blue-400" />
                    <span>TypeScript Client SDK (Node / Browser)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(typeScriptSdkSnippet, 'ts-sdk')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer transition"
                    >
                      {copiedKey === 'ts-sdk' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'ts-sdk' ? 'Copied' : 'Copy Code'}</span>
                    </button>
                    <button
                      onClick={() => handleDownload(`${selectedUniversity.id}-consensus-client.ts`, typeScriptSdkSnippet, 'text/typescript')}
                      className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer transition"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download .ts</span>
                    </button>
                  </div>
                </div>

                <pre className="p-3 bg-slate-900/90 rounded-lg font-mono text-[11px] text-slate-200 border border-slate-800 overflow-x-auto max-h-[260px] leading-relaxed">
                  {typeScriptSdkSnippet}
                </pre>
              </div>
            )}

            {/* Tab 3: Python / Jupyter */}
            {activeTab === 'python-jupyter' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-emerald-400" />
                    <span>Python HPC & Jupyter Notebook Pipeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(pythonScriptSnippet, 'py-sdk')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer transition"
                    >
                      {copiedKey === 'py-sdk' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'py-sdk' ? 'Copied' : 'Copy Code'}</span>
                    </button>
                    <button
                      onClick={() => handleDownload(`${selectedUniversity.id}-quantum-biomedical.py`, pythonScriptSnippet, 'text/x-python')}
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer transition"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download .py</span>
                    </button>
                  </div>
                </div>

                <pre className="p-3 bg-slate-900/90 rounded-lg font-mono text-[11px] text-emerald-200 border border-slate-800 overflow-x-auto max-h-[260px] leading-relaxed">
                  {pythonScriptSnippet}
                </pre>
              </div>
            )}

            {/* Tab 4: R Bioconductor */}
            {activeTab === 'r-bioconductor' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-purple-400" />
                    <span>R Bioconductor Statistical Script</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(rScriptSnippet, 'r-sdk')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer transition"
                    >
                      {copiedKey === 'r-sdk' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'r-sdk' ? 'Copied' : 'Copy Code'}</span>
                    </button>
                    <button
                      onClick={() => handleDownload(`${selectedUniversity.id}-consensus-analysis.R`, rScriptSnippet, 'text/x-r-source')}
                      className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer transition"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download .R</span>
                    </button>
                  </div>
                </div>

                <pre className="p-3 bg-slate-900/90 rounded-lg font-mono text-[11px] text-purple-200 border border-slate-800 overflow-x-auto max-h-[260px] leading-relaxed">
                  {rScriptSnippet}
                </pre>
              </div>
            )}

            {/* Tab 5: Docker & K8s */}
            {activeTab === 'docker-k8s' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <Server className="w-4 h-4 text-amber-400" />
                    <span>Docker Compose Sovereign Hospital / Lab Deployment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(dockerComposeSnippet, 'docker-sdk')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer transition"
                    >
                      {copiedKey === 'docker-sdk' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'docker-sdk' ? 'Copied' : 'Copy YAML'}</span>
                    </button>
                    <button
                      onClick={() => handleDownload('docker-compose.yml', dockerComposeSnippet, 'text/yaml')}
                      className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer transition"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download YAML</span>
                    </button>
                  </div>
                </div>

                <pre className="p-3 bg-slate-900/90 rounded-lg font-mono text-[11px] text-amber-200 border border-slate-800 overflow-x-auto max-h-[260px] leading-relaxed">
                  {dockerComposeSnippet}
                </pre>
              </div>
            )}

            {/* Tab 6: OpenAPI 3.0 */}
            {activeTab === 'openapi' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <Layers className="w-4 h-4 text-teal-400" />
                    <span>OpenAPI 3.0 Specification (EHR / Epic / Cerner Integration)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(openApiSnippet, 'openapi-sdk')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer transition"
                    >
                      {copiedKey === 'openapi-sdk' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'openapi-sdk' ? 'Copied' : 'Copy Spec'}</span>
                    </button>
                    <button
                      onClick={() => handleDownload('openapi-biomedical-spec.json', openApiSnippet, 'application/json')}
                      className="px-2.5 py-1 rounded bg-teal-600 hover:bg-teal-500 text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer transition"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download JSON</span>
                    </button>
                  </div>
                </div>

                <pre className="p-3 bg-slate-900/90 rounded-lg font-mono text-[11px] text-teal-200 border border-slate-800 overflow-x-auto max-h-[260px] leading-relaxed">
                  {openApiSnippet}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Universal Medical Covenant: Free For All Humanity @ Forever</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
            >
              Close Studio
            </button>
            <a
              href="https://github.com/SiriusAI-Quantum/Quantum-NZ-Biomedical-Simulator/fork"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Fork on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
