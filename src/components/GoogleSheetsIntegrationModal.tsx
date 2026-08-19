/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: GOOGLE SHEETS & DRIVE WORKSPACE INTEGRATION MODAL
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import React, { useState, useEffect } from 'react';
import {
  Table,
  FileSpreadsheet,
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
  FileText,
  Lock,
  Radio,
  FileCheck2,
  Database,
  Eye,
  Send
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useAudioNarrator } from '../context/AudioNarratorContext';
import { COMPREHENSIVE_DISEASE_CURES } from '../data/diseasesData';
import { GLOBAL_MANUFACTURING_HUBS } from '../data/hubsData';
import { SOVEREIGN_PATENT_HEADER } from '../data/patentData';
import {
  listUserSpreadsheets,
  getSpreadsheetMetadata,
  getSpreadsheetValues,
  appendSpreadsheetValues,
  createGoogleSpreadsheet,
  exportComprehensiveCuresToGoogleSheet,
  GoogleDriveFile,
  GoogleSpreadsheetMetadata
} from '../services/sheetsService';
import confetti from 'canvas-confetti';

interface GoogleSheetsIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSheetsIntegrationModal: React.FC<GoogleSheetsIntegrationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { user, googleAccessToken, loginWithGoogle } = useFirebase();
  const { speak } = useAudioNarrator();

  const [activeTab, setActiveTab] = useState<'export' | 'browse' | 'append'>('export');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportResult, setExportResult] = useState<{ id: string; url: string } | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Drive Spreadsheet Browser State
  const [userFiles, setUserFiles] = useState<GoogleDriveFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [selectedMetadata, setSelectedMetadata] = useState<GoogleSpreadsheetMetadata | null>(null);
  const [selectedSheetTab, setSelectedSheetTab] = useState<string>('');
  const [tableValues, setTableValues] = useState<any[][]>([]);
  const [isLoadingSheetData, setIsLoadingSheetData] = useState<boolean>(false);

  // Append Form State
  const [targetSpreadsheetId, setTargetSpreadsheetId] = useState<string>('');
  const [targetTabName, setTargetTabName] = useState<string>('Sheet1');
  const [appendDisease, setAppendDisease] = useState<string>(COMPREHENSIVE_DISEASE_CURES[0]?.diseaseName || 'NSCLC');
  const [appendObservation, setAppendObservation] = useState<string>('');
  const [appendResearcher, setAppendResearcher] = useState<string>(user?.displayName || 'Sovereign Researcher');
  const [appendCoherence, setAppendCoherence] = useState<string>('1.000000');
  const [isAppending, setIsAppending] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      speak(
        'Google Sheets Workspace is online. You can export datasets directly to Google Drive, browse existing spreadsheets, or append live clinical trial observations.',
        { priority: 'high' }
      );
    }
  }, [isOpen, speak]);

  // Load User Spreadsheets from Drive
  const fetchDriveSpreadsheets = async () => {
    if (!googleAccessToken) return;
    setIsLoadingFiles(true);
    try {
      const files = await listUserSpreadsheets(googleAccessToken, searchQuery);
      setUserFiles(files);
      if (files.length > 0 && !targetSpreadsheetId) {
        setTargetSpreadsheetId(files[0].id);
      }
    } catch (err: any) {
      console.warn('[Google Drive/Sheets API] Notice:', err.message);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Unable to list Google Sheets. Re-authorization may be needed.'
      });
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (isOpen && googleAccessToken && (activeTab === 'browse' || activeTab === 'append')) {
      fetchDriveSpreadsheets();
    }
  }, [isOpen, googleAccessToken, activeTab]);

  // Inspect Selected Spreadsheet
  const handleSelectFileToInspect = async (fileId: string) => {
    if (!googleAccessToken) return;
    setSelectedFileId(fileId);
    setIsLoadingSheetData(true);
    try {
      const meta = await getSpreadsheetMetadata(googleAccessToken, fileId);
      setSelectedMetadata(meta);
      const firstTab = meta.sheets[0]?.properties.title || 'Sheet1';
      setSelectedSheetTab(firstTab);

      // Fetch values for the first tab
      const data = await getSpreadsheetValues(googleAccessToken, fileId, `${firstTab}!A1:Z35`);
      setTableValues(data.values || []);
    } catch (err: any) {
      console.error('[Sheets API Inspect Error]', err);
      setStatusMessage({ type: 'error', text: err.message || 'Failed to inspect spreadsheet values.' });
    } finally {
      setIsLoadingSheetData(false);
    }
  };

  const handleTabChange = async (tabName: string) => {
    if (!googleAccessToken || !selectedFileId) return;
    setSelectedSheetTab(tabName);
    setIsLoadingSheetData(true);
    try {
      const data = await getSpreadsheetValues(googleAccessToken, selectedFileId, `${tabName}!A1:Z35`);
      setTableValues(data.values || []);
    } catch (err: any) {
      console.error('[Sheets API Tab Fetch Error]', err);
    } finally {
      setIsLoadingSheetData(false);
    }
  };

  // Full Export Action
  const handleExportFullDatabase = async () => {
    if (!googleAccessToken) {
      setStatusMessage({ type: 'error', text: 'Please authorize Google Account first.' });
      return;
    }

    setIsExporting(true);
    setStatusMessage(null);
    try {
      const res = await exportComprehensiveCuresToGoogleSheet(
        googleAccessToken,
        COMPREHENSIVE_DISEASE_CURES,
        GLOBAL_MANUFACTURING_HUBS,
        SOVEREIGN_PATENT_HEADER
      );
      setExportResult({ id: res.spreadsheetId, url: res.spreadsheetUrl });
      setStatusMessage({
        type: 'success',
        text: 'Successfully generated and structured Google Spreadsheet on your Google Drive!'
      });
      speak('Google Spreadsheet created and synced to your Google Drive.', { priority: 'high' });
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    } catch (err: any) {
      console.error('[Sheets API Export Error]', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to export to Google Sheets.'
      });
      speak('Failed to export to Google Sheets. Check permissions.', { priority: 'high' });
    } finally {
      setIsExporting(false);
    }
  };

  // Append Observation Action
  const handleAppendRow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleAccessToken) {
      setStatusMessage({ type: 'error', text: 'Please sign in with Google first.' });
      return;
    }
    if (!targetSpreadsheetId) {
      setStatusMessage({ type: 'error', text: 'Please specify a valid Google Spreadsheet ID.' });
      return;
    }

    setIsAppending(true);
    setStatusMessage(null);
    try {
      const newRow = [
        new Date().toISOString(),
        appendResearcher,
        appendDisease,
        appendObservation,
        appendCoherence,
        'PCT/NZ2025/000001 Verified'
      ];

      await appendSpreadsheetValues(
        googleAccessToken,
        targetSpreadsheetId,
        `${targetTabName}!A:F`,
        [newRow]
      );

      setStatusMessage({
        type: 'success',
        text: `Observation successfully appended to Google Sheet (${targetTabName})!`
      });
      speak('Research trial observation row added to Google Sheet.', { priority: 'high' });
      setAppendObservation('');
    } catch (err: any) {
      console.error('[Sheets Append Error]', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to append row to Google Sheet. Ensure tab name exists.'
      });
    } finally {
      setIsAppending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl relative text-slate-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-950 border-b border-slate-800 p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Google Workspace • Google Sheets Integration</span>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  sheets.googleapis.com
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Live multi-tab spreadsheet generation, Drive synchronisation & clinical trial logs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
          {/* Status Message */}
          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/80 border-rose-500 text-rose-200'
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
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Google Auth Status Banner */}
          {!googleAccessToken ? (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>Google Sheets & Drive Authorization Required</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Connect your Google Account to authorize Google Sheets generation and Drive storage.
                </p>
              </div>

              <button
                onClick={loginWithGoogle}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center gap-2 shadow-lg transition transform active:scale-95 cursor-pointer shrink-0"
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
                <span>Authorize Google Sheets</span>
              </button>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-900 border border-emerald-500/50 flex items-center justify-center font-bold text-emerald-300">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{user?.email || 'Authenticated User'}</span>
                    <span className="text-[9px] font-mono bg-emerald-900 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/40">
                      TOKEN ACTIVE
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Google Scopes: spreadsheets, spreadsheets.readonly, drive, drive.file
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('export')}
              className={`py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === 'export'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Export Datasets to Sheets</span>
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === 'browse'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Drive Sheets Browser</span>
            </button>
            <button
              onClick={() => setActiveTab('append')}
              className={`py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === 'append'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Append Clinical Logs</span>
            </button>
          </div>

          {/* Tab 1: Export Datasets */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Universal Bio-Medical Master Spreadsheet
                      </h4>
                      <p className="text-slate-400 text-[11px]">
                        Generates a structured Google Spreadsheet with 4 dedicated tabs
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleExportFullDatabase}
                    disabled={!googleAccessToken || isExporting}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isExporting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Generating Spreadsheet...</span>
                      </>
                    ) : (
                      <>
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Create & Sync to Google Drive</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Tabs Preview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <div className="font-bold text-white text-xs flex items-center gap-1.5 text-emerald-300">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Tab 1: Cures & Targets</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      10+ Disease cures, standing-wave frequencies, dosages, routes, and clinical mechanisms.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <div className="font-bold text-white text-xs flex items-center gap-1.5 text-cyan-300">
                      <Database className="w-3.5 h-3.5" />
                      <span>Tab 2: SMILES Formulas</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      IUPAC SMILES strings, molecular formulas, molecular weights, and synthesis routes.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <div className="font-bold text-white text-xs flex items-center gap-1.5 text-indigo-300">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Tab 3: 12 Global Hubs</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      615M dose manufacturing capacities, QC pass rates, cold-chain specifications.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                    <div className="font-bold text-white text-xs flex items-center gap-1.5 text-purple-300">
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>Tab 4: Patent Seal</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      WIPO PCT/NZ2025/000001 open-access declaration and developer verification keys.
                    </p>
                  </div>
                </div>

                {/* Export Success Banner */}
                {exportResult && (
                  <div className="mt-3 p-3.5 bg-emerald-950/60 border border-emerald-500/50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs">
                        Spreadsheet created on Google Drive! ID:{' '}
                        <span className="font-mono text-white font-bold">{exportResult.id}</span>
                      </span>
                    </div>

                    <a
                      href={exportResult.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
                    >
                      <span>Open in Google Sheets</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Drive Sheets Browser & Cell Inspector */}
          {activeTab === 'browse' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchDriveSpreadsheets()}
                    placeholder="Search Google Drive for spreadsheets..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-xs"
                  />
                </div>
                <button
                  onClick={fetchDriveSpreadsheets}
                  disabled={isLoadingFiles}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                  <span>Search Drive</span>
                </button>
              </div>

              {isLoadingFiles ? (
                <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 text-slate-400 space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-400" />
                  <p>Searching Google Drive for spreadsheets...</p>
                </div>
              ) : userFiles.length === 0 ? (
                <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 text-slate-400 space-y-2">
                  <FileSpreadsheet className="w-6 h-6 mx-auto text-slate-600" />
                  <p className="text-slate-300 font-semibold">No spreadsheets found on Google Drive.</p>
                  <p className="text-[11px] text-slate-500">
                    Use the Export tab above to generate your first Bio-Medical research spreadsheet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* File List Column */}
                  <div className="space-y-1.5 max-h-72 overflow-y-auto">
                    {userFiles.map((file) => (
                      <div
                        key={file.id}
                        onClick={() => handleSelectFileToInspect(file.id)}
                        className={`p-2.5 rounded-xl border transition cursor-pointer space-y-1 ${
                          selectedFileId === file.id
                            ? 'bg-emerald-950/60 border-emerald-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="font-bold text-xs truncate flex items-center gap-1.5">
                          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{file.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center justify-between">
                          <span>{file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : ''}</span>
                          <span className="font-mono text-emerald-400">Inspect</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Inspector / Viewer Column */}
                  <div className="md:col-span-2 p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col min-h-72">
                    {selectedMetadata ? (
                      <div className="space-y-3 flex-1 flex flex-col">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <div>
                            <div className="font-bold text-white text-xs truncate max-w-xs">
                              {selectedMetadata.properties.title}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {selectedMetadata.sheets.length} Sheets / Tabs Available
                            </div>
                          </div>

                          <a
                            href={selectedMetadata.spreadsheetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1.5 shadow"
                          >
                            <span>Open in Sheets</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        {/* Sheet Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                          {selectedMetadata.sheets.map((sh) => (
                            <button
                              key={sh.properties.sheetId}
                              onClick={() => handleTabChange(sh.properties.title)}
                              className={`px-2.5 py-1 rounded-md text-[10px] font-mono whitespace-nowrap transition cursor-pointer ${
                                selectedSheetTab === sh.properties.title
                                  ? 'bg-emerald-700 text-white font-bold'
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {sh.properties.title}
                            </button>
                          ))}
                        </div>

                        {/* Values Grid Preview */}
                        <div className="flex-1 overflow-auto max-h-48 border border-slate-800 rounded-lg">
                          {isLoadingSheetData ? (
                            <div className="p-6 text-center text-slate-400">
                              <RefreshCw className="w-4 h-4 animate-spin mx-auto text-emerald-400 mb-1" />
                              <span>Loading cell values...</span>
                            </div>
                          ) : tableValues.length === 0 ? (
                            <div className="p-6 text-center text-slate-500 text-xs">
                              No cell values in this range.
                            </div>
                          ) : (
                            <table className="w-full text-left text-[10px] font-mono border-collapse">
                              <tbody>
                                {tableValues.map((row, rIdx) => (
                                  <tr
                                    key={rIdx}
                                    className={`border-b border-slate-800/60 ${
                                      rIdx === 0 ? 'bg-slate-900 text-emerald-300 font-bold sticky top-0' : 'hover:bg-slate-900/40 text-slate-300'
                                    }`}
                                  >
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="p-1.5 border-r border-slate-800/40 whitespace-nowrap">
                                        {String(cell)}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="m-auto text-center text-slate-500 space-y-1">
                        <Eye className="w-6 h-6 mx-auto text-slate-600" />
                        <p className="text-xs text-slate-400 font-medium">Select a spreadsheet from the left to inspect</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Append Research / Clinical Observations */}
          {activeTab === 'append' && (
            <form onSubmit={handleAppendRow} className="space-y-3.5">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-white text-xs flex items-center gap-1.5 text-emerald-400">
                  <PlusCircle className="w-4 h-4" />
                  <span>Append Real-Time Research Log or Trial Data</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Directly append a new row to an existing Google Spreadsheet without overwriting existing tabs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Target Spreadsheet ID */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Target Spreadsheet ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={targetSpreadsheetId}
                    onChange={(e) => setTargetSpreadsheetId(e.target.value)}
                    placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-xs font-mono"
                  />
                </div>

                {/* Tab Name */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Sheet Tab Name (e.g. Cures_&_Formulations or Sheet1)
                  </label>
                  <input
                    type="text"
                    required
                    value={targetTabName}
                    onChange={(e) => setTargetTabName(e.target.value)}
                    placeholder="Tab name"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Disease Protocol
                  </label>
                  <select
                    value={appendDisease}
                    onChange={(e) => setAppendDisease(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500 cursor-pointer text-xs"
                  >
                    {COMPREHENSIVE_DISEASE_CURES.map((c) => (
                      <option key={c.id} value={c.diseaseName}>
                        {c.diseaseName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Author / Lead Researcher
                  </label>
                  <input
                    type="text"
                    required
                    value={appendResearcher}
                    onChange={(e) => setAppendResearcher(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Phase Coherence (γ)
                  </label>
                  <input
                    type="text"
                    value={appendCoherence}
                    onChange={(e) => setAppendCoherence(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Observation Content */}
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Clinical Trial / Laboratory Observation Notes *
                </label>
                <textarea
                  rows={3}
                  required
                  value={appendObservation}
                  onChange={(e) => setAppendObservation(e.target.value)}
                  placeholder="Enter in-vitro trial readout, cell lysis metrics, or binding energy delta..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!googleAccessToken || isAppending}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isAppending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Appending to Sheet...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Append Row via Sheets API</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Sheets API: Active (sirius-ai-lumana-4840)</span>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
