/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: GOOGLE FORMS WORKSPACE INTEGRATION MODAL
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  PlusCircle,
  ExternalLink,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Layers,
  Sparkles,
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
  ShieldCheck,
  CheckSquare,
  HelpCircle,
  Users
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useAudioNarrator } from '../context/AudioNarratorContext';
import { COMPREHENSIVE_DISEASE_CURES } from '../data/diseasesData';
import {
  listUserForms,
  getGoogleForm,
  getGoogleFormResponses,
  createClinicalTrialIntakeForm,
  createGoogleForm,
  GoogleDriveFormFile,
  GoogleFormMetadata,
  GoogleFormResponse
} from '../services/formsService';
import confetti from 'canvas-confetti';

interface GoogleFormsIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleFormsIntegrationModal: React.FC<GoogleFormsIntegrationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { user, userProfile, googleAccessToken, loginWithGoogle } = useFirebase();
  const { speak } = useAudioNarrator();

  const [activeTab, setActiveTab] = useState<'generate' | 'browse' | 'responses' | 'custom'>('generate');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Quick Clinical Form Generator State
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>(COMPREHENSIVE_DISEASE_CURES[0]?.id || 'nsclc');
  const [institutionName, setInstitutionName] = useState<string>('Universal Biomedical Collaborative');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedFormResult, setGeneratedFormResult] = useState<{
    formId: string;
    responderUri: string;
    editUri: string;
    title: string;
  } | null>(null);

  // Forms Browser State
  const [userForms, setUserForms] = useState<GoogleDriveFormFile[]>([]);
  const [isLoadingForms, setIsLoadingForms] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [selectedFormData, setSelectedFormData] = useState<GoogleFormMetadata | null>(null);
  const [isLoadingFormData, setIsLoadingFormData] = useState<boolean>(false);

  // Responses Inspector State
  const [inspectFormId, setInspectFormId] = useState<string>('');
  const [formResponses, setFormResponses] = useState<GoogleFormResponse[]>([]);
  const [isLoadingResponses, setIsLoadingResponses] = useState<boolean>(false);

  // Custom Form Creator State
  const [customTitle, setCustomTitle] = useState<string>('');
  const [isCreatingCustom, setIsCreatingCustom] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      speak(
        'Google Forms Workspace is online. You can generate clinical trial intake questionnaires, inspect patient survey responses, or browse existing Google Forms.',
        { priority: 'high' }
      );
    }
  }, [isOpen, speak]);

  const fetchDriveForms = async () => {
    if (!googleAccessToken) return;
    setIsLoadingForms(true);
    try {
      const files = await listUserForms(googleAccessToken, searchQuery);
      setUserForms(files);
      setStatusMessage({ type: 'success', text: `Loaded ${files.length} Google Forms from your Drive.` });
    } catch (err: any) {
      console.error('Error fetching Google Forms:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to fetch forms from Google Drive. Please re-authenticate.'
      });
    } finally {
      setIsLoadingForms(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'browse' && googleAccessToken) {
      fetchDriveForms();
    }
  }, [isOpen, activeTab, googleAccessToken]);

  const handleSelectForm = async (formId: string) => {
    if (!googleAccessToken) return;
    setSelectedFormId(formId);
    setIsLoadingFormData(true);
    try {
      const data = await getGoogleForm(googleAccessToken, formId);
      setSelectedFormData(data);
      speak(`Loaded form ${data.info?.title}`, { priority: 'low' });
    } catch (err: any) {
      console.error('Error fetching form data:', err);
      setStatusMessage({ type: 'error', text: `Failed to load form schema: ${err?.message}` });
    } finally {
      setIsLoadingFormData(false);
    }
  };

  const handleGenerateClinicalForm = async () => {
    if (!googleAccessToken) {
      speak('Please authenticate with Google to generate a Google Form.', { priority: 'high' });
      await loginWithGoogle();
      return;
    }

    const disease = COMPREHENSIVE_DISEASE_CURES.find((d) => d.id === selectedDiseaseId) || COMPREHENSIVE_DISEASE_CURES[0];
    setIsGenerating(true);
    setStatusMessage(null);

    try {
      const result = await createClinicalTrialIntakeForm(googleAccessToken, {
        diseaseName: disease.diseaseName,
        cureName: disease.cureName,
        standingWaveFrequency: disease.standingWaveFrequency,
        institution: institutionName
      });

      setGeneratedFormResult(result);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      speak('Google Form clinical trial intake generated and deployed.', { priority: 'high' });
      setStatusMessage({
        type: 'success',
        text: `Clinical trial intake form created: "${result.title}". Ready for live respondents!`
      });
    } catch (err: any) {
      console.error('Error generating Google Form:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to create Google Form.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFetchResponses = async (formIdToUse?: string) => {
    const targetId = formIdToUse || inspectFormId;
    if (!googleAccessToken) {
      await loginWithGoogle();
      return;
    }
    if (!targetId.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid Google Form ID.' });
      return;
    }

    setIsLoadingResponses(true);
    setStatusMessage(null);
    try {
      const responses = await getGoogleFormResponses(googleAccessToken, targetId.trim());
      setFormResponses(responses);
      speak(`Loaded ${responses.length} responses from Google Form.`, { priority: 'low' });
      setStatusMessage({
        type: 'success',
        text: `Successfully retrieved ${responses.length} response submission(s).`
      });
    } catch (err: any) {
      console.error('Error fetching responses:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to fetch form responses.'
      });
    } finally {
      setIsLoadingResponses(false);
    }
  };

  const handleCreateCustomForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleAccessToken) {
      await loginWithGoogle();
      return;
    }
    if (!customTitle.trim()) return;

    setIsCreatingCustom(true);
    setStatusMessage(null);
    try {
      const created = await createGoogleForm(googleAccessToken, customTitle.trim());
      confetti({ particleCount: 60, spread: 50 });
      speak(`Custom form created: ${created.info?.title}`, { priority: 'high' });
      setStatusMessage({
        type: 'success',
        text: `Custom form "${created.info?.title}" created successfully in Drive!`
      });
      setCustomTitle('');
    } catch (err: any) {
      console.error('Custom form creation error:', err);
      setStatusMessage({ type: 'error', text: err?.message || 'Failed to create custom form.' });
    } finally {
      setIsCreatingCustom(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-purple-500/40 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-b border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/40 shadow-inner">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Google Forms Workspace Integration
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                  <span>Forms API v1</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Deploy clinical trial questionnaires, collect real-world patient responses, and inspect peer review submissions
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
                <span>Connect Google Forms</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-xs text-purple-200">
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

        {/* Navigation Tabs */}
        <div className="px-6 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'generate'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Clinical Intake Generator</span>
            </button>

            <button
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'browse'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Drive Forms Browser</span>
            </button>

            <button
              onClick={() => setActiveTab('responses')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'responses'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Responses Inspector</span>
            </button>

            <button
              onClick={() => setActiveTab('custom')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Custom Form Builder</span>
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

        {/* Main Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* TAB 1: CLINICAL INTAKE GENERATOR */}
          {activeTab === 'generate' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/50 via-slate-950 to-slate-950 border border-purple-500/30 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span>One-Click Clinical Trial & Field Observation Form Generator</span>
                  </h3>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed mt-1">
                    Instantly provision a Google Form pre-configured with clinical trial metrics, phase selection,
                    phase coherence scale ratings (γ = 1.000000), adverse effect tracking, and Geneva Convention public health certifications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Select Target Disease Cure</label>
                    <select
                      value={selectedDiseaseId}
                      onChange={(e) => setSelectedDiseaseId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      {COMPREHENSIVE_DISEASE_CURES.map((cure) => (
                        <option key={cure.id} value={cure.id}>
                          {cure.diseaseName} — {cure.cureName} ({cure.standingWaveFrequency})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Lead Research Institution</label>
                    <input
                      type="text"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      placeholder="e.g. Sovereign Biomedical Research Collaborative"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleGenerateClinicalForm}
                    disabled={isGenerating}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-purple-950/80 transition transform active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Provisioning Google Form...</span>
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-4 h-4" />
                        <span>Generate & Deploy Google Form</span>
                      </>
                    )}
                  </button>

                  {generatedFormResult && (
                    <div className="flex items-center gap-2">
                      <a
                        href={generatedFormResult.responderUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center gap-2 shadow transition cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4 text-emerald-400" />
                        <span>Open Live Form (Respondent URL)</span>
                      </a>

                      <a
                        href={generatedFormResult.editUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/50 text-purple-300 font-bold text-xs flex items-center gap-2 shadow transition cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4 text-purple-400" />
                        <span>Edit Form in Google Forms</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Pre-configured Form Schema Info */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-purple-400" />
                  <span>Pre-Configured Clinical Question Fields Included:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                    <div className="font-bold text-white">1. Clinician & Affiliation</div>
                    <div className="text-[11px] text-slate-400">Short text (Required)</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                    <div className="font-bold text-white">2. Trial Phase / Batch ID</div>
                    <div className="text-[11px] text-slate-400">Radio Choice: Preclinical to Phase 3</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                    <div className="font-bold text-white">3. Quantum Phase Coherence (γ)</div>
                    <div className="text-[11px] text-slate-400">Scale Rating 1 to 5 (1.000000)</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                    <div className="font-bold text-white">4. Therapeutic Efficacy %</div>
                    <div className="text-[11px] text-slate-400">Measured clearance percentage</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                    <div className="font-bold text-white">5. Pharmacokinetics & Notes</div>
                    <div className="text-[11px] text-slate-400">Paragraph long text</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                    <div className="font-bold text-white">6. Open Science Covenant</div>
                    <div className="text-[11px] text-slate-400">Mandatory verification checkbox</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FORMS BROWSER */}
          {activeTab === 'browse' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search forms in your Google Drive..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button
                  onClick={fetchDriveForms}
                  disabled={isLoadingForms}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingForms ? 'animate-spin' : ''}`} />
                  <span>Refresh Drive</span>
                </button>
              </div>

              {/* Layout: List + Detail */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-2 max-h-[460px] overflow-y-auto">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    Your Google Forms ({userForms.length})
                  </div>

                  {isLoadingForms ? (
                    <div className="p-8 text-center text-slate-500 text-xs space-y-2">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-400" />
                      <div>Scanning Google Drive for Forms...</div>
                    </div>
                  ) : userForms.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs space-y-2">
                      <CheckSquare className="w-8 h-8 mx-auto text-slate-600" />
                      <div>No Google Forms found in Drive.</div>
                    </div>
                  ) : (
                    userForms.map((form) => {
                      const isSelected = selectedFormId === form.id;
                      return (
                        <div
                          key={form.id}
                          className={`p-3 rounded-xl transition flex items-start justify-between gap-2 border cursor-pointer ${
                            isSelected
                              ? 'bg-purple-950/70 border-purple-500/60 text-white'
                              : 'bg-slate-900/80 border-slate-800/80 text-slate-300 hover:border-slate-700'
                          }`}
                          onClick={() => handleSelectForm(form.id)}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <CheckSquare className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="font-bold text-xs truncate">{form.name}</div>
                              <div className="text-[10px] text-slate-500">
                                Modified: {form.modifiedTime ? new Date(form.modifiedTime).toLocaleDateString() : 'N/A'}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <a
                              href={`https://docs.google.com/forms/d/${form.id}/edit`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 rounded text-slate-400 hover:text-purple-400 transition"
                              title="Edit in Google Forms"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col max-h-[460px] overflow-y-auto">
                  {isLoadingFormData ? (
                    <div className="p-8 text-center text-slate-500">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-400 mb-2" />
                      <div>Loading Form Schema...</div>
                    </div>
                  ) : selectedFormData ? (
                    <div className="space-y-4">
                      <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                        <div>
                          <h4 className="font-bold text-white text-sm">{selectedFormData.info?.title}</h4>
                          <p className="text-xs text-slate-400 mt-1 whitespace-pre-wrap">
                            {selectedFormData.info?.description || 'No description provided.'}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {selectedFormData.responderUri && (
                            <a
                              href={selectedFormData.responderUri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold flex items-center gap-1 shadow cursor-pointer transition"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>View Live</span>
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Form Items & Questions ({selectedFormData.items?.length || 0})
                        </div>

                        {(selectedFormData.items || []).map((item, idx) => (
                          <div key={item.itemId || idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                            <div className="font-bold text-xs text-white">
                              {idx + 1}. {item.title || 'Untitled Item'}
                            </div>
                            {item.description && <div className="text-[11px] text-slate-400">{item.description}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-600">
                      Select a Google Form from the list to preview its items and questions.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RESPONSES INSPECTOR */}
          {activeTab === 'responses' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex-1 min-w-[260px]">
                    <label className="text-xs font-bold text-slate-300 block mb-1">Target Form ID</label>
                    <input
                      type="text"
                      value={inspectFormId}
                      onChange={(e) => setInspectFormId(e.target.value)}
                      placeholder="e.g. 1FAIpQLSe-xxxxxx or Form ID from Drive"
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>

                  <div className="self-end">
                    <button
                      onClick={() => handleFetchResponses()}
                      disabled={isLoadingResponses}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow cursor-pointer transition disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingResponses ? 'animate-spin' : ''}`} />
                      <span>Fetch Live Responses</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Submissions Table / Cards */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300">
                  Submissions Retrieved ({formResponses.length})
                </div>

                {isLoadingResponses ? (
                  <div className="p-8 text-center text-slate-500">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-400 mb-2" />
                    <div>Querying Forms Responses API...</div>
                  </div>
                ) : formResponses.length === 0 ? (
                  <div className="p-8 text-center text-slate-600 bg-slate-950 border border-slate-800 rounded-2xl">
                    No submissions found or Form ID not yet queried.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {formResponses.map((r, idx) => (
                      <div key={r.responseId || idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                          <span className="font-bold text-purple-400">Submission #{idx + 1}</span>
                          <span className="text-slate-500 font-mono text-[11px]">
                            {new Date(r.lastSubmittedTime || r.createTime).toLocaleString()}
                          </span>
                        </div>

                        {r.respondentEmail && (
                          <div className="text-xs text-slate-300">
                            <span className="text-slate-500">Respondent: </span>
                            {r.respondentEmail}
                          </div>
                        )}

                        <div className="space-y-1.5 pt-1">
                          {Object.entries(r.answers || {}).map(([qId, ans]) => (
                            <div key={qId} className="text-xs bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/60">
                              <span className="text-purple-300 font-semibold block text-[11px] mb-0.5">Question ID: {qId}</span>
                              <span className="text-slate-200">
                                {(ans as any)?.textAnswers?.answers?.map((a: any) => a.value).join(', ') || 'No answer'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOM FORM BUILDER */}
          {activeTab === 'custom' && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-purple-400" />
                  <span>Create Custom Research Form</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Provision a blank Google Form directly in your Google Drive with a custom title.
                </p>
              </div>

              <form onSubmit={handleCreateCustomForm} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Document & Form Title</label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="e.g. Humanitarian Field Evaluation Survey - Phase 2"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isCreatingCustom}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow cursor-pointer transition disabled:opacity-50"
                >
                  {isCreatingCustom ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Creating Form...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Create Form in Google Drive</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
