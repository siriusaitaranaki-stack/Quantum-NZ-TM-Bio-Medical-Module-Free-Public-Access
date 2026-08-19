/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: GOOGLE MEET WORKSPACE INTEGRATION MODAL (API v2)
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import React, { useState, useEffect } from 'react';
import {
  Video,
  PlusCircle,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Users,
  ShieldCheck,
  X,
  Radio,
  Calendar,
  Sparkles,
  Zap,
  Building2,
  Share2,
  Clock,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Atom
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useAudioNarrator } from '../context/AudioNarratorContext';
import { COMPREHENSIVE_DISEASE_CURES } from '../data/diseasesData';
import {
  createGoogleMeetSpace,
  listConferenceRecords,
  GoogleMeetSpace,
  GoogleMeetConferenceRecord,
  MedicalConsultationMeetingRequest
} from '../services/meetService';
import {
  listGoogleChatSpaces,
  sendGoogleChatMessage,
  GoogleChatSpace
} from '../services/googleChatService';
import confetti from 'canvas-confetti';

interface GoogleMeetIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleMeetIntegrationModal: React.FC<GoogleMeetIntegrationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { user, userProfile, googleAccessToken, loginWithGoogle } = useFirebase();
  const { speak } = useAudioNarrator();

  const [activeTab, setActiveTab] = useState<'create' | 'active' | 'chat-share' | 'records'>('create');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states for creating a new Google Meet space
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>(COMPREHENSIVE_DISEASE_CURES[0]?.id || 'nsclc');
  const [consultationType, setConsultationType] = useState<MedicalConsultationMeetingRequest['consultationType']>('emergency_oncology');
  const [customTopic, setCustomTopic] = useState<string>('Multidisciplinary Oncology & Quantum Standing Wave Resonance Review');
  const [accessType, setAccessType] = useState<'OPEN' | 'TRUSTED' | 'RESTRICTED'>('OPEN');
  const [isCreatingSpace, setIsCreatingSpace] = useState<boolean>(false);

  // Active / Last created space
  const [activeSpace, setActiveSpace] = useState<GoogleMeetSpace | null>(null);
  const [recentSpaces, setRecentSpaces] = useState<GoogleMeetSpace[]>([]);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedInvite, setCopiedInvite] = useState<boolean>(false);

  // Google Chat Share Bridge states
  const [chatSpaces, setChatSpaces] = useState<GoogleChatSpace[]>([]);
  const [selectedChatSpaceName, setSelectedChatSpaceName] = useState<string>('');
  const [isLoadingChatSpaces, setIsLoadingChatSpaces] = useState<boolean>(false);
  const [isSharingToChat, setIsSharingToChat] = useState<boolean>(false);
  const [chatShareNote, setChatShareNote] = useState<string>(
    'Urgent clinical review room established. Standing wave harmonic parameters attached for immediate peer-review.'
  );

  // Conference records state
  const [conferenceRecords, setConferenceRecords] = useState<GoogleMeetConferenceRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState<boolean>(false);

  const selectedDisease = COMPREHENSIVE_DISEASE_CURES.find((d) => d.id === selectedDiseaseId) || COMPREHENSIVE_DISEASE_CURES[0];

  useEffect(() => {
    if (isOpen) {
      speak(
        'Google Meet Workspace Integration is ready. You can launch real-time multi-institutional clinical reviews, copy secure conference links, or bridge invitations directly to Google Chat.',
        { priority: 'high' }
      );
    }
  }, [isOpen, speak]);

  // Load chat spaces for the bridge tab
  const fetchChatSpacesForBridge = async () => {
    if (!googleAccessToken) return;
    setIsLoadingChatSpaces(true);
    try {
      const data = await listGoogleChatSpaces(googleAccessToken);
      setChatSpaces(data);
      if (data.length > 0 && !selectedChatSpaceName) {
        setSelectedChatSpaceName(data[0].name);
      }
    } catch (e) {
      console.warn('Could not fetch chat spaces for bridge:', e);
    } finally {
      setIsLoadingChatSpaces(false);
    }
  };

  useEffect(() => {
    if (isOpen && googleAccessToken && activeTab === 'chat-share') {
      fetchChatSpacesForBridge();
    }
  }, [isOpen, googleAccessToken, activeTab]);

  const handleCreateMeetSpace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleAccessToken) {
      speak('Please authenticate with Google to create a Google Meet conference.', { priority: 'high' });
      await loginWithGoogle();
      return;
    }

    setIsCreatingSpace(true);
    setStatusMessage(null);

    try {
      const space = await createGoogleMeetSpace(googleAccessToken, {
        accessType: accessType,
        entryPointAccess: 'ALL'
      });

      setActiveSpace(space);
      setRecentSpaces((prev) => [space, ...prev]);
      setActiveTab('active');
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      speak(`Google Meet conference space generated successfully. Meeting code is ${space.meetingCode}.`, {
        priority: 'high'
      });
      setStatusMessage({
        type: 'success',
        text: `Google Meet space created: ${space.meetingUri || space.name}`
      });
    } catch (err: any) {
      console.error('Error creating Google Meet space:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to create Google Meet space. Please check Google Workspace permissions.'
      });
    } finally {
      setIsCreatingSpace(false);
    }
  };

  const generateFullInvitationText = () => {
    if (!activeSpace) return '';
    return `🔬 [Sirius Quantum-NZ™ Biomedical Consultation]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 TOPIC: ${customTopic}
🧬 TARGET CURE: ${selectedDisease.diseaseName} (${selectedDisease.cureName})
⚡ RESONANCE FREQUENCY: ${selectedDisease.standingWaveFrequency}
🎯 CONFIDENCE METRIC: ${selectedDisease.confidence || 100}% Deterministic Phase Coherence
🏛️ HOST: ${userProfile?.displayName || user?.displayName || 'Sovereign Researcher'} (${userProfile?.organization || 'Open Science Hub'})
📜 PATENT COVENANT: WIPO PCT/NZ2025/000001 (Universal Open Access)

🔗 GOOGLE MEET LINK:
${activeSpace.meetingUri}

Meeting Code: ${activeSpace.meetingCode}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
  };

  const handleCopyLink = () => {
    if (!activeSpace) return;
    navigator.clipboard.writeText(activeSpace.meetingUri);
    setCopiedLink(true);
    speak('Google Meet URL copied to clipboard.', { priority: 'low' });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyFullInvite = () => {
    const invite = generateFullInvitationText();
    navigator.clipboard.writeText(invite);
    setCopiedInvite(true);
    speak('Complete medical consultation briefing and Google Meet invitation copied.', { priority: 'low' });
    setTimeout(() => setCopiedInvite(false), 2500);
  };

  const handleShareToGoogleChat = async () => {
    if (!googleAccessToken || !activeSpace || !selectedChatSpaceName) return;
    setIsSharingToChat(true);
    setStatusMessage(null);

    const messageText = `📹 *Google Meet Clinical Consultation Room Established*\n\n` +
      `*Topic:* ${customTopic}\n` +
      `*Target Disease:* ${selectedDisease.diseaseName} (${selectedDisease.cureName})\n` +
      `*Resonance Frequency:* \`${selectedDisease.standingWaveFrequency}\` (Phase Coherence $\\gamma = 1.0$)\n` +
      `*Host:* ${userProfile?.displayName || user?.displayName || 'Sovereign Researcher'}\n` +
      `*Notes:* ${chatShareNote}\n\n` +
      `👉 *Join Google Meet:* ${activeSpace.meetingUri}\n` +
      `*Meeting Code:* \`${activeSpace.meetingCode}\``;

    try {
      await sendGoogleChatMessage(googleAccessToken, selectedChatSpaceName, messageText);
      confetti({ particleCount: 75, spread: 60 });
      speak('Google Meet link and clinical briefing successfully posted to Google Chat space.', { priority: 'high' });
      setStatusMessage({
        type: 'success',
        text: 'Successfully shared Google Meet conference link to Google Chat space!'
      });
    } catch (err: any) {
      console.error('Error sharing to Chat:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to share to Google Chat space.'
      });
    } finally {
      setIsSharingToChat(false);
    }
  };

  const handleFetchConferenceRecords = async () => {
    if (!googleAccessToken) return;
    setIsLoadingRecords(true);
    try {
      const records = await listConferenceRecords(googleAccessToken);
      setConferenceRecords(records);
      speak(`Loaded ${records.length} Google Meet conference records.`, { priority: 'low' });
    } catch (e) {
      console.warn('Conference records error:', e);
    } finally {
      setIsLoadingRecords(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-blue-500/40 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-blue-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-inner">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Google Meet Workspace Integration
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 text-blue-400 animate-pulse" />
                  <span>Meet REST API v2</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Launch instant encrypted clinical case reviews, multidisciplinary oncology boards, and bridge to Google Chat
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
                <span>Connect Google Meet</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950/80 border border-blue-500/40 text-xs text-blue-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
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
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'create'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Launch New Meeting</span>
            </button>

            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'active'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Active Conference ({activeSpace ? '1 Ready' : 'None'})</span>
            </button>

            <button
              onClick={() => setActiveTab('chat-share')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'chat-share'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bridge to Google Chat</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('records');
                if (googleAccessToken) handleFetchConferenceRecords();
              }}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'records'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Conference Records</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
            Patent: WIPO PCT/NZ2025/000001
          </div>
        </div>

        {/* Status Message */}
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

        {/* Main Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* TAB 1: CREATE NEW GOOGLE MEET SPACE */}
          {activeTab === 'create' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/50 via-slate-950 to-slate-950 border border-blue-500/30 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span>Create Multi-Center Clinical Review Space via Google Meet API v2</span>
                  </h3>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed mt-1">
                    Instantly provisions an authenticated Google Meet room configured for high-bandwidth bio-harmonic case review,
                    target cure protocol analysis, and international clinical trial sync.
                  </p>
                </div>

                <form onSubmit={handleCreateMeetSpace} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Target Disease / Protocol</label>
                      <select
                        value={selectedDiseaseId}
                        onChange={(e) => setSelectedDiseaseId(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        {COMPREHENSIVE_DISEASE_CURES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.diseaseName} — {c.cureName} ({c.standingWaveFrequency})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Consultation Focus</label>
                      <select
                        value={consultationType}
                        onChange={(e) => setConsultationType(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option value="emergency_oncology">🚨 Emergency Oncology / Critical Pathology Review</option>
                        <option value="peer_review">🔬 Open-Access International Peer Review</option>
                        <option value="bioreactor_scaling">🏭 Automated Bioreactor Scaling & Production</option>
                        <option value="ethics_irb">⚖️ IRB Ethics & Humanitarian Access Protocol</option>
                        <option value="multi_center_trial">🌐 Multi-Center Clinical Trial Launch</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Meeting Topic & Clinical Agenda</label>
                    <input
                      type="text"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      placeholder="e.g. Multidisciplinary Case Review: KRAS G12D Resonance Calibration"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Access Control Mode</label>
                      <select
                        value={accessType}
                        onChange={(e) => setAccessType(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option value="OPEN">Open Access (Anyone with link can request join)</option>
                        <option value="TRUSTED">Trusted (Organization & invited researchers only)</option>
                        <option value="RESTRICTED">Restricted (Explicit host admission required)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Host Organization / Node</label>
                      <input
                        type="text"
                        disabled
                        value={`${userProfile?.organization || 'Global Open Science Collaborative'} • ${userProfile?.displayName || user?.displayName || 'Sovereign Researcher'}`}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isCreatingSpace}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-blue-950/80 transition transform active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      {isCreatingSpace ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Provisioning Google Meet Room...</span>
                        </>
                      ) : (
                        <>
                          <Video className="w-4 h-4" />
                          <span>Generate Google Meet Room</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVE CONFERENCE DASHBOARD */}
          {activeTab === 'active' && (
            <div className="space-y-6">
              {!activeSpace ? (
                <div className="p-12 text-center bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                  <Video className="w-12 h-12 mx-auto text-slate-600" />
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">No Active Google Meet Room</h3>
                    <p className="text-xs text-slate-400">
                      Generate a new Google Meet conference space in the 'Launch New Meeting' tab to see live room links and controls.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-2 transition cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create Meeting Now</span>
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/60 via-slate-950 to-slate-950 border border-blue-500/40 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{customTopic}</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          Active & Ready
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Target Protocol: <strong className="text-white">{selectedDisease.diseaseName}</strong> ({selectedDisease.cureName})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={activeSpace.meetingUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition cursor-pointer"
                      >
                        <Video className="w-4 h-4" />
                        <span>Join Google Meet Now</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Room Key Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <div className="text-[10px] font-mono text-slate-400">Meeting URI</div>
                      <div className="text-xs font-bold text-blue-300 truncate">{activeSpace.meetingUri}</div>
                      <button
                        onClick={handleCopyLink}
                        className="mt-1 text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedLink ? 'Copied!' : 'Copy URL'}</span>
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <div className="text-[10px] font-mono text-slate-400">Meeting Code</div>
                      <div className="text-xs font-mono font-bold text-emerald-400">{activeSpace.meetingCode}</div>
                      <div className="text-[10px] text-slate-500">Passcode-free direct access</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <div className="text-[10px] font-mono text-slate-400">Harmonic Frequency</div>
                      <div className="text-xs font-mono font-bold text-cyan-300">{selectedDisease.standingWaveFrequency}</div>
                      <div className="text-[10px] text-slate-500">100% Phase Coherence</div>
                    </div>
                  </div>

                  {/* Complete Invitation Preview */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300">Complete Medical Consultation Briefing & Invitation</label>
                      <button
                        onClick={handleCopyFullInvite}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        {copiedInvite ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedInvite ? 'Copied Briefing!' : 'Copy Full Invitation'}</span>
                      </button>
                    </div>
                    <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-48">
                      {generateFullInvitationText()}
                    </pre>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('chat-share')}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Bridge This Meet Link to Google Chat</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('create')}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Create Another Room</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BRIDGE TO GOOGLE CHAT */}
          {activeTab === 'chat-share' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/30 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <span>Bridge Google Meet to Google Chat Workspace Space</span>
                  </h3>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed mt-1">
                    Directly posts the active Google Meet conference URL and target protocol briefing into any of your team's Google Chat Spaces.
                  </p>
                </div>

                {!activeSpace ? (
                  <div className="p-4 bg-amber-950/50 border border-amber-500/30 rounded-xl text-xs text-amber-300 space-y-2">
                    <div className="font-bold">No Active Meeting Space</div>
                    <div>Please launch a Google Meet space in the first tab first before sharing to Google Chat.</div>
                    <button
                      onClick={() => setActiveTab('create')}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold cursor-pointer"
                    >
                      Go to Create Meeting
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300">Target Google Chat Space</label>
                        <button
                          onClick={fetchChatSpacesForBridge}
                          disabled={isLoadingChatSpaces}
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className={`w-3 h-3 ${isLoadingChatSpaces ? 'animate-spin' : ''}`} />
                          <span>Refresh Spaces</span>
                        </button>
                      </div>
                      <select
                        value={selectedChatSpaceName}
                        onChange={(e) => setSelectedChatSpaceName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        {chatSpaces.length === 0 ? (
                          <option value="">No Google Chat spaces found</option>
                        ) : (
                          chatSpaces.map((s) => (
                            <option key={s.name} value={s.name}>
                              {s.displayName || s.name} ({s.spaceType || 'SPACE'})
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Accompanying Chat Message</label>
                      <textarea
                        value={chatShareNote}
                        onChange={(e) => setChatShareNote(e.target.value)}
                        rows={3}
                        className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
                      />
                    </div>

                    <button
                      onClick={handleShareToGoogleChat}
                      disabled={isSharingToChat || !selectedChatSpaceName}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition cursor-pointer disabled:opacity-50"
                    >
                      {isSharingToChat ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Posting to Google Chat Space...</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4" />
                          <span>Post Meet Invitation to Google Chat</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CONFERENCE RECORDS */}
          {activeTab === 'records' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Google Meet Conference Records</h3>
                  <p className="text-xs text-slate-400">
                    Past multi-center consultation logs and session metadata retrieved via Meet REST API.
                  </p>
                </div>
                <button
                  onClick={handleFetchConferenceRecords}
                  disabled={isLoadingRecords}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRecords ? 'animate-spin' : ''}`} />
                  <span>Refresh Records</span>
                </button>
              </div>

              {isLoadingRecords ? (
                <div className="p-12 text-center bg-slate-950 rounded-2xl border border-slate-800">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-400 mb-2" />
                  <div className="text-xs text-slate-400">Querying Conference Records...</div>
                </div>
              ) : conferenceRecords.length === 0 ? (
                <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-500 space-y-1">
                  <div>No completed conference records found for this user account.</div>
                  <div className="text-[11px] text-slate-600">
                    Active spaces and sessions will appear here once meeting participants conclude.
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-h-[380px] overflow-y-auto">
                  {conferenceRecords.map((r, idx) => (
                    <div key={r.name || idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{r.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {r.startTime ? `Started: ${new Date(r.startTime).toLocaleString()}` : 'Session logged'}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
                        {r.space || 'Conference'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
