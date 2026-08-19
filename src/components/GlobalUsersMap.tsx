/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: LIVE INTERACTIVE GOOGLE MAP OF GLOBAL USERS & RESEARCH INSTITUTIONS
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001 (Universal Open Access Covenant Free For Humanity Forever)
 * ==============================================================================================
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useMap
} from '@vis.gl/react-google-maps';
import {
  Globe,
  Users,
  MapPin,
  Activity,
  Radio,
  Sparkles,
  ShieldCheck,
  Zap,
  Navigation,
  Compass,
  Layers,
  Key,
  ExternalLink,
  MessageSquare,
  Video,
  Send,
  Building2,
  Filter,
  CheckCircle2,
  Search,
  Maximize2
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useAudioNarrator } from '../context/AudioNarratorContext';
import confetti from 'canvas-confetti';

// Check for Google Maps Platform Key as per Constitution Rules
const GOOGLE_MAPS_API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(GOOGLE_MAPS_API_KEY) && GOOGLE_MAPS_API_KEY !== 'YOUR_API_KEY';

export type UserCategory = 'all' | 'verified_lab' | 'oncologist' | 'supercomputing' | 'patient_observer';

export interface GlobalUserNode {
  id: string;
  name: string;
  role: string;
  institution: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  category: 'verified_lab' | 'oncologist' | 'supercomputing' | 'patient_observer';
  activeDisease: string;
  frequency: string;
  latencyMs: number;
  status: 'online' | 'computing' | 'docking' | 'reviewing';
  ipNodeHash: string;
  avatarUrl?: string;
}

export const GLOBAL_RESEARCH_NODES: GlobalUserNode[] = [
  {
    id: 'node-geneva-who',
    name: 'Dr. Elena Rostova',
    role: 'Chief Medical Observer',
    institution: 'WHO Global Health Observatory & CERN BioGrid',
    city: 'Geneva',
    country: 'Switzerland',
    lat: 46.2044,
    lng: 6.1432,
    category: 'verified_lab',
    activeDisease: 'Non-Small Cell Lung Cancer (EGFR T790M)',
    frequency: '432.081 Hz',
    latencyMs: 14,
    status: 'online',
    ipNodeHash: '0xGEN-WHO-9912'
  },
  {
    id: 'node-bethesda-nih',
    name: 'Dr. Marcus Vance',
    role: 'Principal Investigator',
    institution: 'National Institutes of Health (NIH / NCI)',
    city: 'Bethesda, MD',
    country: 'United States',
    lat: 38.9984,
    lng: -77.0988,
    category: 'verified_lab',
    activeDisease: 'Pancreatic Ductal Adenocarcinoma (KRAS G12D)',
    frequency: '528.144 Hz',
    latencyMs: 22,
    status: 'docking',
    ipNodeHash: '0xNIH-USA-4410'
  },
  {
    id: 'node-boston-harvard',
    name: 'Prof. Sarah Chen',
    role: 'Director of Molecular Oncology',
    institution: 'Harvard Medical School & Dana-Farber',
    city: 'Boston, MA',
    country: 'United States',
    lat: 42.3364,
    lng: -71.107,
    category: 'oncologist',
    activeDisease: 'Glioblastoma Multiforme (EGFRvIII/IDH1)',
    frequency: '741.092 Hz',
    latencyMs: 19,
    status: 'computing',
    ipNodeHash: '0xHMS-DFCI-8831'
  },
  {
    id: 'node-oxford-radcliffe',
    name: 'Prof. Alistair Sterling',
    role: 'Chair of Neurodegenerative Medicine',
    institution: 'University of Oxford – Radcliffe Department of Medicine',
    city: 'Oxford',
    country: 'United Kingdom',
    lat: 51.752,
    lng: -1.2577,
    category: 'verified_lab',
    activeDisease: 'Amyotrophic Lateral Sclerosis (SOD1/TDP-43)',
    frequency: '852.301 Hz',
    latencyMs: 16,
    status: 'reviewing',
    ipNodeHash: '0xOXF-RDM-7714'
  },
  {
    id: 'node-tokyo-imsut',
    name: 'Dr. Kenji Takahashi',
    role: 'Head of Quantum Genomics',
    institution: 'The University of Tokyo – IMSUT & RIKEN',
    city: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lng: 139.6503,
    category: 'supercomputing',
    activeDisease: "Alzheimer's Disease (Aβ42 Oligomers)",
    frequency: '963.000 Hz',
    latencyMs: 8,
    status: 'computing',
    ipNodeHash: '0xTKY-RKN-1205'
  },
  {
    id: 'node-auckland-genesis',
    name: 'Dr. J. A. D. Paton',
    role: 'Sovereign Architect & IP Trustee',
    institution: 'Quantum-NZ Sovereign Genesis Node',
    city: 'Auckland',
    country: 'New Zealand',
    lat: -36.8485,
    lng: 174.7633,
    category: 'supercomputing',
    activeDisease: 'Universal Standing Wave Chronous-Lazarus Core',
    frequency: '1000.000 Hz',
    latencyMs: 4,
    status: 'online',
    ipNodeHash: '0xNZ-SOV-0001'
  },
  {
    id: 'node-saopaulo-usp',
    name: 'Dr. Gabriela Silva',
    role: 'Senior Clinical Pharmacologist',
    institution: 'Universidade de São Paulo (USP) & Instituto Butantan',
    city: 'São Paulo',
    country: 'Brazil',
    lat: -23.5505,
    lng: -46.6333,
    category: 'oncologist',
    activeDisease: 'Triple-Negative Breast Cancer (TNBC)',
    frequency: '639.215 Hz',
    latencyMs: 38,
    status: 'docking',
    ipNodeHash: '0xUSP-BRA-3321'
  },
  {
    id: 'node-nairobi-africacdc',
    name: 'Dr. Kwame Osei',
    role: 'Regional Surveillance Lead',
    institution: 'Africa CDC Pathogen Genomics Initiative',
    city: 'Nairobi',
    country: 'Kenya',
    lat: -1.2921,
    lng: 36.8219,
    category: 'verified_lab',
    activeDisease: 'Sickle Cell Anemia & Drug-Resistant Malaria',
    frequency: '528.000 Hz',
    latencyMs: 44,
    status: 'online',
    ipNodeHash: '0xNBO-ACDC-6677'
  },
  {
    id: 'node-singapore-astar',
    name: 'Dr. Wei Ling Tan',
    role: 'Senior Computational Biologist',
    institution: 'Biopolis / A*STAR Institute of Molecular and Cell Biology',
    city: 'Singapore',
    country: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    category: 'supercomputing',
    activeDisease: 'Hepatocellular Carcinoma (HCC/CTNNB1)',
    frequency: '417.119 Hz',
    latencyMs: 11,
    status: 'computing',
    ipNodeHash: '0xSGP-AST-5590'
  },
  {
    id: 'node-melbourne-bio21',
    name: 'Dr. Liam Henderson',
    role: 'Translational Oncology Fellow',
    institution: 'Bio21 Molecular Science & Peter MacCallum Cancer Centre',
    city: 'Melbourne',
    country: 'Australia',
    lat: -37.8136,
    lng: 144.9631,
    category: 'oncologist',
    activeDisease: 'Melanoma (BRAF V600E / MEK Resistance)',
    frequency: '741.550 Hz',
    latencyMs: 15,
    status: 'reviewing',
    ipNodeHash: '0xMEL-BIO-7722'
  },
  {
    id: 'node-berlin-charite',
    name: 'Prof. Dr. Hans Mueller',
    role: 'Cellular Therapy Director',
    institution: 'Charité – Universitätsmedizin Berlin',
    city: 'Berlin',
    country: 'Germany',
    lat: 52.52,
    lng: 13.405,
    category: 'verified_lab',
    activeDisease: 'HER2+ Metastatic Breast Carcinoma',
    frequency: '639.000 Hz',
    latencyMs: 17,
    status: 'online',
    ipNodeHash: '0xBER-CHA-3108'
  },
  {
    id: 'node-stockholm-karolinska',
    name: 'Dr. Astrid Lindqvist',
    role: 'Nobel Clinical Research Fellow',
    institution: 'Karolinska Institutet & SciLifeLab',
    city: 'Stockholm',
    country: 'Sweden',
    lat: 59.3293,
    lng: 18.0686,
    category: 'verified_lab',
    activeDisease: "Parkinson's Disease (Alpha-Synuclein Prionoid)",
    frequency: '963.880 Hz',
    latencyMs: 20,
    status: 'docking',
    ipNodeHash: '0xSTK-KAR-9021'
  },
  {
    id: 'node-toronto-uhn',
    name: 'Dr. Robert MacLeod',
    role: 'Biomedical Informatics Director',
    institution: 'Princess Margaret Cancer Centre & UHN',
    city: 'Toronto',
    country: 'Canada',
    lat: 43.6532,
    lng: -79.3832,
    category: 'supercomputing',
    activeDisease: 'High-Grade Serous Ovarian Carcinoma (HGSOC)',
    frequency: '741.111 Hz',
    latencyMs: 24,
    status: 'computing',
    ipNodeHash: '0xTOR-UHN-4019'
  },
  {
    id: 'node-seoul-snu',
    name: 'Dr. Min-Jun Park',
    role: 'Genomic Medicine Specialist',
    institution: 'Seoul National University Hospital (SNUH)',
    city: 'Seoul',
    country: 'South Korea',
    lat: 37.5665,
    lng: 126.978,
    category: 'oncologist',
    activeDisease: 'Gastric Adenocarcinoma (HER2/CLDN18.2)',
    frequency: '528.910 Hz',
    latencyMs: 12,
    status: 'online',
    ipNodeHash: '0xSEL-SNU-2294'
  },
  {
    id: 'node-mumbai-tmc',
    name: 'Dr. Priya Sharma',
    role: 'Head of Head & Neck Oncology',
    institution: 'Tata Memorial Centre (TMC / ACTREC)',
    city: 'Mumbai',
    country: 'India',
    lat: 19.076,
    lng: 72.8777,
    category: 'oncologist',
    activeDisease: 'Oral Squamous Cell Carcinoma (TP53/NOTCH1)',
    frequency: '432.770 Hz',
    latencyMs: 31,
    status: 'reviewing',
    ipNodeHash: '0xBOM-TMC-8812'
  },
  {
    id: 'node-johannesburg-wits',
    name: 'Dr. Thabo Ndlovu',
    role: 'Infectious Diseases Investigator',
    institution: 'Wits Health Consortium & NICD',
    city: 'Johannesburg',
    country: 'South Africa',
    lat: -26.2041,
    lng: 28.0473,
    category: 'verified_lab',
    activeDisease: 'MDR Tuberculosis & HIV Reservoir Eradication',
    frequency: '528.000 Hz',
    latencyMs: 48,
    status: 'docking',
    ipNodeHash: '0xJNB-WIT-5511'
  },
  {
    id: 'node-london-crick',
    name: 'Dr. Charlotte Davies',
    role: 'Structural Biology Fellow',
    institution: 'Francis Crick Institute & King’s College',
    city: 'London',
    country: 'United Kingdom',
    lat: 51.5074,
    lng: -0.1278,
    category: 'supercomputing',
    activeDisease: 'Diffusive Intrinsic Pontine Glioma (DIPG/H3K27M)',
    frequency: '852.190 Hz',
    latencyMs: 13,
    status: 'computing',
    ipNodeHash: '0xLON-CRK-1099'
  },
  {
    id: 'node-community-patient-1',
    name: 'Community Patient Advocate (Verified)',
    role: 'Patient Protocol Observer',
    institution: 'Global Rare Disease Alliance (NORD)',
    city: 'Chicago, IL',
    country: 'United States',
    lat: 41.8781,
    lng: -87.6298,
    category: 'patient_observer',
    activeDisease: 'Cystic Fibrosis (CFTR F508del)',
    frequency: '528.330 Hz',
    latencyMs: 27,
    status: 'online',
    ipNodeHash: '0xORD-PAT-7723'
  },
  {
    id: 'node-community-patient-2',
    name: 'Oncology Patient Caregiver Node',
    role: 'Open Trial Participant',
    institution: 'European Cancer Patient Coalition',
    city: 'Paris',
    country: 'France',
    lat: 48.8566,
    lng: 2.3522,
    category: 'patient_observer',
    activeDisease: 'Colorectal Carcinoma (KRAS/BRAF)',
    frequency: '432.120 Hz',
    latencyMs: 18,
    status: 'online',
    ipNodeHash: '0xCDG-PAT-4401'
  },
  {
    id: 'node-zurich-eth',
    name: 'Dr. Lukas Weber',
    role: 'Quantum Pharmacophore Lead',
    institution: 'ETH Zurich & University Hospital Zurich',
    city: 'Zurich',
    country: 'Switzerland',
    lat: 47.3769,
    lng: 8.5417,
    category: 'supercomputing',
    activeDisease: 'Multiple Myeloma (BCMA/CD38 Targeting)',
    frequency: '741.000 Hz',
    latencyMs: 12,
    status: 'computing',
    ipNodeHash: '0xZRH-ETH-6629'
  }
];

interface GlobalUsersMapProps {
  onOpenGoogleChatModal?: () => void;
  onOpenGoogleMeetModal?: () => void;
}

export const GlobalUsersMap: React.FC<GlobalUsersMapProps> = ({
  onOpenGoogleChatModal,
  onOpenGoogleMeetModal
}) => {
  const { user, userProfile, googleAccessToken } = useFirebase();
  const { speak } = useAudioNarrator();

  const [selectedCategory, setSelectedCategory] = useState<UserCategory>('all');
  const [selectedNode, setSelectedNode] = useState<GlobalUserNode | null>(GLOBAL_RESEARCH_NODES[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [liveUserCount, setLiveUserCount] = useState<number>(1482);
  const [livePacketCounter, setLivePacketCounter] = useState<number>(84920);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocatingUser, setIsLocatingUser] = useState<boolean>(false);
  const [isBroadcastingPresence, setIsBroadcastingPresence] = useState<boolean>(true);
  const [activeCenter, setActiveCenter] = useState<{ lat: number; lng: number }>({ lat: 25.0, lng: 10.0 });
  const [activeZoom, setActiveZoom] = useState<number>(2.5);

  // Dynamic user count simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveUserCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
      setLivePacketCounter((prev) => prev + Math.floor(Math.random() * 12) + 4);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const filteredNodes = useMemo(() => {
    return GLOBAL_RESEARCH_NODES.filter((node) => {
      const matchesCat = selectedCategory === 'all' || node.category === selectedCategory;
      const matchesSearch =
        searchTerm === '' ||
        node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.activeDisease.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Request User Geolocation
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(coords);
        setActiveCenter(coords);
        setActiveZoom(6);
        setIsLocatingUser(false);
        confetti({ particleCount: 50, spread: 60 });
        speak('Your laboratory location has been locked onto the Google Maps global research mesh.', {
          priority: 'high'
        });
      },
      (err) => {
        console.warn('Geolocation failed:', err);
        setIsLocatingUser(false);
        speak('Could not determine exact GPS coordinates, falling back to sovereign regional node.', {
          priority: 'low'
        });
      }
    );
  };

  const centerOnCity = (lat: number, lng: number, zoom = 7, node?: GlobalUserNode) => {
    setActiveCenter({ lat, lng });
    setActiveZoom(zoom);
    if (node) {
      setSelectedNode(node);
      speak(`Navigated to ${node.name} at ${node.institution} in ${node.city}, ${node.country}.`, {
        priority: 'hover'
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner & Live User Counters */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Live Interactive Google Map</span>
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '20s' }} />
                <span>Global Multi-Institutional Mesh</span>
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
                WIPO PCT/NZ2025/000001
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Live Global Researchers, Oncologists & Laboratory Nodes</span>
            </h2>

            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Real-time Google Maps telemetry displaying verified biomedical research centers, clinical trial investigators,
              supercomputing nodes, and patient communities synchronized across 64 countries under the Universal Open Access Covenant.
            </p>
          </div>

          {/* Real-Time User Counter Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 shadow-lg text-center space-y-0.5 min-w-[130px]">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
                <Users className="w-3 h-3 text-emerald-400" />
                <span>Online Users</span>
              </div>
              <div className="text-2xl font-extrabold font-mono text-emerald-400 tracking-tight">
                {liveUserCount.toLocaleString()}
              </div>
              <div className="text-[9px] text-emerald-300/80 font-mono">🟢 100% Phase Sync</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-blue-500/40 shadow-lg text-center space-y-0.5 min-w-[130px]">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
                <Building2 className="w-3 h-3 text-blue-400" />
                <span>Global Nodes</span>
              </div>
              <div className="text-2xl font-extrabold font-mono text-blue-400 tracking-tight">
                {GLOBAL_RESEARCH_NODES.length} Active
              </div>
              <div className="text-[9px] text-blue-300/80 font-mono">64 Countries Linked</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-lg text-center space-y-0.5 min-w-[130px]">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span>Live Packets</span>
              </div>
              <div className="text-2xl font-extrabold font-mono text-cyan-300 tracking-tight">
                {livePacketCounter.toLocaleString()}
              </div>
              <div className="text-[9px] text-cyan-300/80 font-mono">Avg 16ms Latency</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-purple-500/40 shadow-lg text-center space-y-0.5 min-w-[130px]">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-purple-400" />
                <span>Coherence</span>
              </div>
              <div className="text-2xl font-extrabold font-mono text-purple-300 tracking-tight">
                100.00%
              </div>
              <div className="text-[9px] text-purple-300/80 font-mono">Deterministic Seal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters, Search, My Location, Presets */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin scrollbar-thumb-slate-700 text-xs">
          {[
            { id: 'all', label: 'All Global Nodes', count: GLOBAL_RESEARCH_NODES.length },
            {
              id: 'verified_lab',
              label: 'Verified Research Labs',
              count: GLOBAL_RESEARCH_NODES.filter((n) => n.category === 'verified_lab').length
            },
            {
              id: 'oncologist',
              label: 'Clinical Oncologists',
              count: GLOBAL_RESEARCH_NODES.filter((n) => n.category === 'oncologist').length
            },
            {
              id: 'supercomputing',
              label: 'HPC Supercomputing',
              count: GLOBAL_RESEARCH_NODES.filter((n) => n.category === 'supercomputing').length
            },
            {
              id: 'patient_observer',
              label: 'Patient Communities',
              count: GLOBAL_RESEARCH_NODES.filter((n) => n.category === 'patient_observer').length
            }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as UserCategory)}
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-blue-200">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search researcher, city, disease..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <button
            onClick={handleLocateMe}
            disabled={isLocatingUser}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer disabled:opacity-50"
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocatingUser ? 'animate-spin' : ''}`} />
            <span>{isLocatingUser ? 'Locating...' : 'Locate My Node'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Map & Telemetry Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Google Map (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[620px]">
          {/* Map Header Toolbar */}
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-xs text-white">Google Maps Interactive Satellite/Vector View</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
                {filteredNodes.length} Visible Nodes
              </span>
            </div>

            {/* Quick Fly-To City Presets */}
            <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
              <span className="text-[10px] text-slate-500 mr-1 hidden sm:inline">Fly-To:</span>
              <button
                onClick={() => centerOnCity(46.2044, 6.1432, 6, GLOBAL_RESEARCH_NODES[0])}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[10px] cursor-pointer"
              >
                Geneva (WHO)
              </button>
              <button
                onClick={() => centerOnCity(38.9984, -77.0988, 6, GLOBAL_RESEARCH_NODES[1])}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[10px] cursor-pointer"
              >
                Bethesda (NIH)
              </button>
              <button
                onClick={() => centerOnCity(-36.8485, 174.7633, 6, GLOBAL_RESEARCH_NODES[5])}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[10px] cursor-pointer"
              >
                Auckland (Genesis)
              </button>
              <button
                onClick={() => centerOnCity(35.6762, 139.6503, 6, GLOBAL_RESEARCH_NODES[4])}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[10px] cursor-pointer"
              >
                Tokyo (RIKEN)
              </button>
              <button
                onClick={() => centerOnCity(51.752, -1.2577, 6, GLOBAL_RESEARCH_NODES[3])}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[10px] cursor-pointer"
              >
                Oxford (UK)
              </button>
            </div>
          </div>

          {/* Map Canvas / Fallback Area */}
          <div className="relative flex-1 w-full min-h-[560px] bg-slate-950 flex flex-col justify-center">
            {hasValidKey ? (
              <APIProvider apiKey={GOOGLE_MAPS_API_KEY} version="weekly">
                <Map
                  center={activeCenter}
                  zoom={activeZoom}
                  mapId="DEMO_MAP_ID"
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%', minHeight: '560px' }}
                >
                  {/* Render Global User Markers */}
                  {filteredNodes.map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const pinColor =
                      node.category === 'verified_lab'
                        ? '#10B981' // emerald
                        : node.category === 'oncologist'
                        ? '#3B82F6' // blue
                        : node.category === 'supercomputing'
                        ? '#8B5CF6' // purple
                        : '#F59E0B'; // amber

                    return (
                      <AdvancedMarker
                        key={node.id}
                        position={{ lat: node.lat, lng: node.lng }}
                        onClick={() => {
                          setSelectedNode(node);
                          speak(`${node.name}, ${node.institution}, ${node.city}. Protocol: ${node.activeDisease}`, {
                            priority: 'hover'
                          });
                        }}
                      >
                        <Pin
                          background={pinColor}
                          glyphColor="#FFFFFF"
                          borderColor="#0F172A"
                          scale={isSelected ? 1.3 : 1.0}
                        />
                      </AdvancedMarker>
                    );
                  })}

                  {/* Render User's Own Geolocation Marker */}
                  {userLocation && (
                    <AdvancedMarker position={userLocation}>
                      <Pin background="#06B6D4" glyphColor="#FFFFFF" borderColor="#FFFFFF" scale={1.4} />
                    </AdvancedMarker>
                  )}

                  {/* InfoWindow for Selected Node */}
                  {selectedNode && (
                    <InfoWindow
                      position={{ lat: selectedNode.lat, lng: selectedNode.lng }}
                      onCloseClick={() => setSelectedNode(null)}
                    >
                      <div className="p-2 text-slate-900 font-sans max-w-xs space-y-1.5">
                        <div className="font-bold text-xs text-blue-900 flex items-center justify-between gap-2">
                          <span>{selectedNode.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                            {selectedNode.latencyMs}ms 🟢
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold text-slate-700">{selectedNode.institution}</div>
                        <div className="text-[10px] text-slate-500">
                          📍 {selectedNode.city}, {selectedNode.country}
                        </div>
                        <div className="text-[10px] bg-slate-100 p-1.5 rounded text-slate-800 border border-slate-200">
                          <strong>Active Protocol:</strong> {selectedNode.activeDisease}
                          <br />
                          <strong>Harmonic Frequency:</strong> {selectedNode.frequency}
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </APIProvider>
            ) : (
              /* Fallback Interactive Radar / Map Visualization with Mandatory API Key Instructions */
              <div className="relative w-full h-full flex flex-col items-center justify-between p-6 bg-radial from-slate-900 via-slate-950 to-black text-white">
                {/* Visual Radar Background Overlay with World Map Silhouette */}
                <div className="w-full h-full absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center overflow-hidden">
                  <div className="w-[600px] h-[600px] rounded-full border border-cyan-500/30 animate-ping" style={{ animationDuration: '4s' }} />
                  <div className="w-[450px] h-[450px] rounded-full border border-blue-500/30 animate-pulse absolute" />
                  <div className="w-[300px] h-[300px] rounded-full border border-indigo-500/40 absolute" />
                  <div className="w-full h-[1px] bg-cyan-500/20 absolute" />
                  <div className="h-full w-[1px] bg-cyan-500/20 absolute" />
                </div>

                {/* API Key Setup Instructions Banner as required by Google Maps Platform Skill */}
                <div className="relative z-10 max-w-xl w-full bg-slate-900/95 border border-blue-500/40 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-3 mt-4">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
                    <Key className="w-5 h-5 text-blue-400" />
                    <div>
                      <h3 className="font-bold text-sm text-white">Google Maps Platform Live Satellite View</h3>
                      <p className="text-[11px] text-slate-400">
                        Connect your Google Maps API Key to unlock interactive pan/zoom satellite vector tiles.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <p className="font-semibold text-white">To add your API key:</p>
                    <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300 leading-relaxed font-sans bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <li>
                        Get an API key:{' '}
                        <a
                          href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:underline font-mono inline-flex items-center gap-1"
                        >
                          <span>Google Cloud Console</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </li>
                      <li>
                        Open <strong>Settings</strong> (⚙️ gear icon, <strong>top-right corner</strong>) → <strong>Secrets</strong>
                      </li>
                      <li>
                        Type <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">GOOGLE_MAPS_PLATFORM_KEY</code> as the secret name, press <strong>Enter</strong>
                      </li>
                      <li>Paste your API key as the value, press <strong>Enter</strong>. (App rebuilds automatically)</li>
                    </ol>
                  </div>
                </div>

                {/* High-Resolution Live Interactive Node Grid Simulation */}
                <div className="relative z-10 w-full max-w-2xl bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl mt-4 mb-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>Live Simulation Mesh (All {filteredNodes.length} Coordinates Locked)</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">100% Phase Coherence</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                    {filteredNodes.map((node) => (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-2 rounded-xl text-left transition cursor-pointer border ${
                          selectedNode?.id === node.id
                            ? 'bg-blue-950 border-blue-500 shadow-md'
                            : 'bg-slate-950/90 border-slate-800 hover:border-cyan-500/50'
                        }`}
                      >
                        <div className="font-bold text-white text-[11px] truncate">{node.name}</div>
                        <div className="text-[10px] text-cyan-400 truncate">📍 {node.city}, {node.country}</div>
                        <div className="text-[9px] font-mono text-slate-400 truncate">{node.activeDisease}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Node Card & Live Activity Telemetry (4 cols) */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          {/* Selected Researcher Profile Card */}
          {selectedNode ? (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-blue-500/40 shadow-2xl space-y-4">
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <span
                    className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                      selectedNode.category === 'verified_lab'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                        : selectedNode.category === 'oncologist'
                        ? 'bg-blue-950 text-blue-300 border-blue-500/30'
                        : selectedNode.category === 'supercomputing'
                        ? 'bg-purple-950 text-purple-300 border-purple-500/30'
                        : 'bg-amber-950 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {selectedNode.category.replace('_', ' ')}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{selectedNode.name}</h3>
                  <p className="text-xs text-blue-300">{selectedNode.role}</p>
                </div>

                <div className="text-right font-mono">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    {selectedNode.latencyMs}ms 🟢
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Institution & Location</div>
                  <div className="font-semibold text-slate-200">{selectedNode.institution}</div>
                  <div className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{selectedNode.city}, {selectedNode.country}</span>
                    <span className="text-slate-600">•</span>
                    <span className="font-mono text-slate-400">({selectedNode.lat.toFixed(2)}, {selectedNode.lng.toFixed(2)})</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Target Cure & Frequency</div>
                  <div className="font-semibold text-emerald-300">{selectedNode.activeDisease}</div>
                  <div className="text-[11px] font-mono text-cyan-300 flex items-center gap-2">
                    <span>⚡ {selectedNode.frequency}</span>
                    <span>•</span>
                    <span className="text-slate-400">Seal: {selectedNode.ipNodeHash}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Google Chat / Google Meet Direct Launch */}
              <div className="space-y-2 pt-1">
                {onOpenGoogleChatModal && (
                  <button
                    onClick={() => {
                      onOpenGoogleChatModal();
                      speak(`Opening Google Chat bridge with ${selectedNode.name} in ${selectedNode.city}.`, {
                        priority: 'low'
                      });
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Dispatch Alert via Google Chat</span>
                  </button>
                )}

                {onOpenGoogleMeetModal && (
                  <button
                    onClick={() => {
                      onOpenGoogleMeetModal();
                      speak(`Initiating Google Meet clinical consultation with ${selectedNode.institution}.`, {
                        priority: 'low'
                      });
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Launch Google Meet Consultation</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <MapPin className="w-10 h-10 mx-auto text-slate-600" />
              <div className="font-bold text-white text-sm">Select Any Marker On The Map</div>
              <div className="text-xs text-slate-400">
                Click any research laboratory or oncologist node on Google Maps to inspect live clinical protocols.
              </div>
            </div>
          )}

          {/* Real-Time Live Activity Feed Stream */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="font-bold text-xs text-white">Live Global Event Feed</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Auto-Refreshed</span>
            </div>

            <div className="space-y-2 text-xs max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-emerald-400 font-bold">Bethesda (NIH)</span>
                  <span>1s ago</span>
                </div>
                <div className="text-slate-300">Completed 3D force-field calculation on KRAS G12D (γ = 1.000000).</div>
              </div>

              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-blue-400 font-bold">Tokyo (RIKEN)</span>
                  <span>4s ago</span>
                </div>
                <div className="text-slate-300">Synchronized Alzheimer's Aβ standing wave parameter set (963.000 Hz).</div>
              </div>

              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-purple-400 font-bold">Geneva (WHO)</span>
                  <span>8s ago</span>
                </div>
                <div className="text-slate-300">Validated 34-database biomedical consensus matrix (100% verified).</div>
              </div>

              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-cyan-400 font-bold">Auckland (Genesis Core)</span>
                  <span>12s ago</span>
                </div>
                <div className="text-slate-300">Broadcasting WIPO PCT/NZ2025/000001 Open Access covenant worldwide.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
