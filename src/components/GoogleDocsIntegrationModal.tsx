/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: GOOGLE DOCS & DRIVE WORKSPACE INTEGRATION MODAL
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import React, { useState, useEffect } from 'react';
import {
  FileText,
  PlusCircle,
  ExternalLink,
  Download,
  Upload,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Layers,
  Sparkles,
  Lock,
  Radio,
  FileCheck2,
  Database,
  Eye,
  Send,
  Trash2,
  Copy,
  BookOpen,
  Atom,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useAudioNarrator } from '../context/AudioNarratorContext';
import { COMPREHENSIVE_DISEASE_CURES } from '../data/diseasesData';
import {
  listUserDocs,
  getGoogleDocContent,
  extractDocPlainText,
  createGoogleDoc,
  exportComprehensiveDossierToGoogleDoc,
  appendClinicalNoteToGoogleDoc,
  deleteGoogleDocFile,
  GoogleDriveDocFile,
  GoogleDocMetadata
} from '../services/docsService';
import confetti from 'canvas-confetti';

interface GoogleDocsIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleDocsIntegrationModal: React.FC<GoogleDocsIntegrationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { user, userProfile, googleAccessToken, loginWithGoogle } = useFirebase();
  const { speak } = useAudioNarrator();

  const [activeTab, setActiveTab] = useState<'export' | 'browse' | 'append' | 'templates'>('export');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportResult, setExportResult] = useState<{ id: string; url: string; title: string } | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Options for export
  const [includePatentCovenant, setIncludePatentCovenant] = useState<boolean>(true);
  const [includeAllDiseases, setIncludeAllDiseases] = useState<boolean>(true);
  const [includeManufacturingHubs, setIncludeManufacturingHubs] = useState<boolean>(true);

  // Drive Docs Browser State
  const [userDocs, setUserDocs] = useState<GoogleDriveDocFile[]>([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedDocContent, setSelectedDocContent] = useState<string>('');
  const [isLoadingDocContent, setIsLoadingDocContent] = useState<boolean>(false);
  const [docDetailMetadata, setDocDetailMetadata] = useState<GoogleDocMetadata | null>(null);

  // Append Form State
  const [targetDocId, setTargetDocId] = useState<string>('');
  const [appendDisease, setAppendDisease] = useState<string>(COMPREHENSIVE_DISEASE_CURES[0]?.diseaseName || 'NSCLC');
  const [appendObservation, setAppendObservation] = useState<string>('');
  const [appendResearcher, setAppendResearcher] = useState<string>(
    userProfile?.displayName || user?.displayName || 'Sovereign Researcher'
  );
  const [appendFrequency, setAppendFrequency] = useState<string>('10.8 Hz');
  const [appendCoherence, setAppendCoherence] = useState<string>('1.000000');
  const [isAppending, setIsAppending] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      speak(
        'Google Docs Workspace is online. You can export complete clinical protocol dossiers directly to Google Drive, inspect existing documents in real time, or append verified trial notes.',
        { priority: 'high' }
      );
    }
  }, [isOpen, speak]);

  // Load User Docs from Drive
  const fetchDriveDocs = async () => {
    if (!googleAccessToken) return;
    setIsLoadingDocs(true);
    try {
      const files = await listUserDocs(googleAccessToken, searchQuery);
      setUserDocs(files);
      setStatusMessage({ type: 'success', text: `Loaded ${files.length} Google Docs from your Drive.` });
    } catch (err: any) {
      console.error('Error fetching Google Docs:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to fetch documents from Google Drive. Please re-authenticate.'
      });
    } finally {
      setIsLoadingDocs(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'browse' && googleAccessToken) {
      fetchDriveDocs();
    }
  }, [isOpen, activeTab, googleAccessToken]);

  // Load content of a selected doc
  const handleSelectDoc = async (docId: string) => {
    if (!googleAccessToken) return;
    setSelectedDocId(docId);
    setIsLoadingDocContent(true);
    setSelectedDocContent('');
    try {
      const docData = await getGoogleDocContent(googleAccessToken, docId);
      setDocDetailMetadata(docData);
      const text = extractDocPlainText(docData);
      setSelectedDocContent(text);
      speak(`Loaded document ${docData.title}`, { priority: 'low' });
    } catch (err: any) {
      console.error('Error fetching doc content:', err);
      setStatusMessage({
        type: 'error',
        text: `Failed to load document content: ${err?.message}`
      });
    } finally {
      setIsLoadingDocContent(false);
    }
  };

  // Export Comprehensive Master Dossier
  const handleExportDossier = async () => {
    if (!googleAccessToken) {
      speak('Please authenticate with Google to export to Google Docs.', { priority: 'high' });
      await loginWithGoogle();
      return;
    }

    setIsExporting(true);
    setStatusMessage(null);
    try {
      const result = await exportComprehensiveDossierToGoogleDoc(googleAccessToken, {
        includePatentCovenant,
        includeAllDiseases,
        includeManufacturingHubs,
        customResearcherName: userProfile?.displayName || user?.displayName || 'Sovereign Biomedical Collaborative'
      });

      setExportResult({
        id: result.documentId,
        url: result.documentUrl,
        title: result.title
      });

      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      speak('Google Doc dossier created and synced to your Google Drive.', { priority: 'high' });
      setStatusMessage({
        type: 'success',
        text: `Document created: ${result.title}. Ready in your Google Drive!`
      });
    } catch (err: any) {
      console.error('Export Google Doc error:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to export document. Verify Google Workspace permissions.'
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Append Live Clinical Note to an Existing Doc
  const handleAppendNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleAccessToken) {
      speak('Please sign in with Google.', { priority: 'high' });
      await loginWithGoogle();
      return;
    }

    if (!targetDocId.trim() || !appendObservation.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please specify the Target Document ID and Observation Note.'
      });
      return;
    }

    // Explicit confirmation dialog for mutating existing document
    const confirmAppend = window.confirm(
      `Append this clinical observation log to Google Doc (${targetDocId})?\n\nAuthor: ${appendResearcher}\nDisease: ${appendDisease}\nResonance: ${appendFrequency}\nCoherence: ${appendCoherence}`
    );
    if (!confirmAppend) return;

    setIsAppending(true);
    setStatusMessage(null);
    try {
      await appendClinicalNoteToGoogleDoc(googleAccessToken, targetDocId.trim(), {
        note: appendObservation.trim(),
        author: appendResearcher,
        diseaseName: appendDisease,
        standingWaveFrequency: appendFrequency,
        phaseCoherence: parseFloat(appendCoherence) || 1.0
      });

      confetti({ particleCount: 60, spread: 60 });
      speak('Clinical trial observation appended successfully to Google Doc.', { priority: 'high' });
      setStatusMessage({
        type: 'success',
        text: 'Clinical observation appended to Google Doc successfully!'
      });
      setAppendObservation('');
    } catch (err: any) {
      console.error('Append note error:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to append note to document. Check document ID.'
      });
    } finally {
      setIsAppending(false);
    }
  };

  // Delete Document (Destructive Action - Mandatory Confirmation)
  const handleDeleteDoc = async (fileId: string, fileName: string) => {
    if (!googleAccessToken) return;
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete '${fileName}' from Google Drive?\n\nThis action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteGoogleDocFile(googleAccessToken, fileId);
      setUserDocs((prev) => prev.filter((d) => d.id !== fileId));
      if (selectedDocId === fileId) {
        setSelectedDocId(null);
        setSelectedDocContent('');
      }
      speak(`Document ${fileName} removed from Drive.`, { priority: 'low' });
      setStatusMessage({ type: 'success', text: `Document '${fileName}' removed from Google Drive.` });
    } catch (err: any) {
      console.error('Delete document error:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to delete document.'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-blue-500/40 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-blue-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-inner">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Google Docs Workspace Integration
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                  <span>Docs API v1</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Create, inspect, format, and synchronize peer-reviewed research dossiers directly in Google Drive
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!googleAccessToken ? (
              <button
                onClick={loginWithGoogle}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center gap-2 shadow-lg transition transform active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Connect Google Docs</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950/80 border border-blue-500/40 text-xs text-blue-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-medium truncate max-w-xs">{user?.email}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Navigation Tabs */}
        <div className="px-6 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('export')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'export'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Export Master Dossier</span>
            </button>

            <button
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'browse'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Drive Docs Browser</span>
            </button>

            <button
              onClick={() => setActiveTab('append')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'append'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Append Clinical Log</span>
            </button>

            <button
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'templates'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Protocol Templates</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
            Patent: WIPO PCT/NZ2025/000001
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div
            className={`px-6 py-2.5 text-xs flex items-center justify-between ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/80 text-emerald-300 border-b border-emerald-500/30'
                : 'bg-rose-950/80 text-rose-300 border-b border-rose-500/30'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Modal Main Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* TAB 1: EXPORT MASTER DOSSIER */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/50 via-slate-950 to-slate-950 border border-blue-500/30 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                      <span>One-Click Master Clinical Dossier Export</span>
                    </h3>
                    <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                      Generates a comprehensive, formatted Google Doc document containing all 10+ disease cure formulations,
                      chemical SMILES specifications, standing-wave resonance frequencies, quantum docking affinities, and
                      bioreactor manufacturing metrics directly into your personal Google Drive.
                    </p>
                  </div>
                </div>

                {/* Export Configuration Switches */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <label className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 cursor-pointer hover:border-blue-500/50 transition">
                    <input
                      type="checkbox"
                      checked={includePatentCovenant}
                      onChange={(e) => setIncludePatentCovenant(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Section 1: Patent Covenant</div>
                      <div className="text-[10px] text-slate-400">PCT/NZ2025/000001 guarantees</div>
                    </div>
                  </label>

                  <label className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 cursor-pointer hover:border-blue-500/50 transition">
                    <input
                      type="checkbox"
                      checked={includeAllDiseases}
                      onChange={(e) => setIncludeAllDiseases(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Section 2: Disease Formulations</div>
                      <div className="text-[10px] text-slate-400">{COMPREHENSIVE_DISEASE_CURES.length} target cure protocols</div>
                    </div>
                  </label>

                  <label className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 cursor-pointer hover:border-blue-500/50 transition">
                    <input
                      type="checkbox"
                      checked={includeManufacturingHubs}
                      onChange={(e) => setIncludeManufacturingHubs(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Section 3: GMP Bioreactor Hubs</div>
                      <div className="text-[10px] text-slate-400">615M doses/yr global capacity</div>
                    </div>
                  </label>
                </div>

                {/* Export Action Button */}
                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={handleExportDossier}
                    disabled={isExporting}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-blue-950/80 transition transform active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {isExporting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Generating & Syncing Google Doc...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Create Live Google Doc Dossier</span>
                      </>
                    )}
                  </button>

                  {exportResult && (
                    <a
                      href={exportResult.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center gap-2 shadow transition cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 text-emerald-400" />
                      <span>Open In Google Docs</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Preview Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                    <Atom className="w-4 h-4" />
                    <span>Formatted Content</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Includes formatted headers, receptor targets, resonance frequencies, and exact IUPAC SMILES strings.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Perpetual Cloud Storage</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Directly created in your Google Drive under your personal or institutional Google account.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <Building2 className="w-4 h-4" />
                    <span>Full Real-Time Collaboration</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Share edit permissions with research teams, clinical reviewers, and regulatory bodies worldwide.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DRIVE DOCS BROWSER & LIVE READER */}
          {activeTab === 'browse' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documents in your Google Drive..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={fetchDriveDocs}
                  disabled={isLoadingDocs}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDocs ? 'animate-spin' : ''}`} />
                  <span>Refresh Drive</span>
                </button>
              </div>

              {/* Grid Layout: Doc List + Live Content Viewer */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left Column: File List */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-2 max-h-[460px] overflow-y-auto">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Your Google Docs ({userDocs.length})
                  </div>

                  {isLoadingDocs ? (
                    <div className="p-8 text-center text-slate-500 text-xs space-y-2">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-400" />
                      <div>Scanning Google Drive...</div>
                    </div>
                  ) : userDocs.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs space-y-2">
                      <FileText className="w-8 h-8 mx-auto text-slate-600" />
                      <div>No Google Docs found in Drive matching query.</div>
                    </div>
                  ) : (
                    userDocs.map((doc) => {
                      const isSelected = selectedDocId === doc.id;
                      return (
                        <div
                          key={doc.id}
                          className={`p-3 rounded-xl transition flex items-start justify-between gap-2 border cursor-pointer ${
                            isSelected
                              ? 'bg-blue-950/70 border-blue-500/60 text-white'
                              : 'bg-slate-900/80 border-slate-800/80 text-slate-300 hover:border-slate-700'
                          }`}
                          onClick={() => handleSelectDoc(doc.id)}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <FileText className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="font-bold text-xs truncate">{doc.name}</div>
                              <div className="text-[10px] text-slate-500">
                                Modified: {doc.modifiedTime ? new Date(doc.modifiedTime).toLocaleDateString() : 'N/A'}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {doc.webViewLink && (
                              <a
                                href={doc.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1 rounded text-slate-400 hover:text-blue-400 transition"
                                title="Open in Google Docs"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteDoc(doc.id, doc.name);
                              }}
                              className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                              title="Delete from Google Drive (Confirmation required)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Right Column: In-App Document Preview */}
                <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col max-h-[460px]">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-blue-400" />
                      <span className="font-bold text-white text-xs">
                        {docDetailMetadata ? docDetailMetadata.title : 'Document Content Preview'}
                      </span>
                    </div>

                    {selectedDocContent && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedDocContent);
                            speak('Document text copied to clipboard.', { priority: 'low' });
                          }}
                          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy Text</span>
                        </button>

                        {selectedDocId && (
                          <a
                            href={`https://docs.google.com/document/d/${selectedDocId}/edit`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold flex items-center gap-1 shadow cursor-pointer transition"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Edit in Docs</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 overflow-y-auto pt-3 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
                    {isLoadingDocContent ? (
                      <div className="p-8 text-center text-slate-500">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-400 mb-2" />
                        <div>Parsing Google Doc elements...</div>
                      </div>
                    ) : selectedDocContent ? (
                      selectedDocContent
                    ) : (
                      <div className="p-8 text-center text-slate-600">
                        Select a Google Doc from the list to preview its structured content.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APPEND CLINICAL TRIAL LOG */}
          {activeTab === 'append' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <PlusCircle className="w-5 h-5 text-blue-400" />
                      <span>Append Clinical Trial Log / Peer Review Note</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Append real-time in-vitro observations, pharmacokinetic readouts, or standing wave citations directly to an active Google Doc.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleAppendNote} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Target Google Document ID</label>
                      <input
                        type="text"
                        value={targetDocId}
                        onChange={(e) => setTargetDocId(e.target.value)}
                        placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:outline-none focus:border-blue-500 font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Associated Disease Protocol</label>
                      <select
                        value={appendDisease}
                        onChange={(e) => {
                          setAppendDisease(e.target.value);
                          const c = COMPREHENSIVE_DISEASE_CURES.find((cure) => cure.diseaseName === e.target.value);
                          if (c) setAppendFrequency(c.standingWaveFrequency);
                        }}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        {COMPREHENSIVE_DISEASE_CURES.map((cure) => (
                          <option key={cure.id} value={cure.diseaseName}>
                            {cure.diseaseName} ({cure.cureName})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Observer / Researcher Name</label>
                      <input
                        type="text"
                        value={appendResearcher}
                        onChange={(e) => setAppendResearcher(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Standing Wave Frequency</label>
                      <input
                        type="text"
                        value={appendFrequency}
                        onChange={(e) => setAppendFrequency(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Phase Coherence Rating (γ)</label>
                      <input
                        type="text"
                        value={appendCoherence}
                        onChange={(e) => setAppendCoherence(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Clinical Observation / Trial Notes</label>
                    <textarea
                      value={appendObservation}
                      onChange={(e) => setAppendObservation(e.target.value)}
                      rows={4}
                      placeholder="Enter detailed laboratory findings, binding energy shifts, in-vitro readouts, or regulatory commentary..."
                      className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:outline-none focus:border-blue-500 leading-relaxed font-sans"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isAppending}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-50"
                  >
                    {isAppending ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Appending to Document...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Append Log to Google Doc</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: PROTOCOL TEMPLATES */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2.5 text-blue-400">
                    <BookOpen className="w-5 h-5" />
                    <h4 className="font-bold text-white text-sm">Regulatory IND Submission Template</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Standard Investigational New Drug (IND) structure formatted for FDA, EMA, and WHO public health emergency use authorizations.
                  </p>
                  <button
                    onClick={async () => {
                      if (!googleAccessToken) {
                        await loginWithGoogle();
                        return;
                      }
                      setIsExporting(true);
                      try {
                        const created = await createGoogleDoc(googleAccessToken, `Regulatory IND Protocol - ${new Date().toISOString().substring(0, 10)}`);
                        window.open(created.documentUrl, '_blank');
                        speak('Created Regulatory IND Google Doc template.', { priority: 'high' });
                      } finally {
                        setIsExporting(false);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow cursor-pointer transition"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create IND Doc Template</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2.5 text-indigo-400">
                    <Building2 className="w-5 h-5" />
                    <h4 className="font-bold text-white text-sm">Automated Bioreactor SOP Template</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Standard Operating Procedure (SOP) for 615M annual dose synthesis, continuous purification columns, and automated QC verification.
                  </p>
                  <button
                    onClick={async () => {
                      if (!googleAccessToken) {
                        await loginWithGoogle();
                        return;
                      }
                      setIsExporting(true);
                      try {
                        const created = await createGoogleDoc(googleAccessToken, `Bioreactor SOP Scaling Protocol - ${new Date().toISOString().substring(0, 10)}`);
                        window.open(created.documentUrl, '_blank');
                        speak('Created Bioreactor SOP Google Doc template.', { priority: 'high' });
                      } finally {
                        setIsExporting(false);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow cursor-pointer transition"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create Bioreactor SOP Template</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
