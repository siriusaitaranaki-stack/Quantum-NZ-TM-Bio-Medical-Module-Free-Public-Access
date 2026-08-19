/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: GOOGLE CHAT WORKSPACE INTEGRATION MODAL
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  PlusCircle,
  ExternalLink,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Radio,
  Send,
  Atom,
  Sparkles,
  Users,
  Building2,
  ShieldCheck,
  Zap,
  Bot
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useAudioNarrator } from '../context/AudioNarratorContext';
import { COMPREHENSIVE_DISEASE_CURES } from '../data/diseasesData';
import {
  listGoogleChatSpaces,
  createGoogleChatSpace,
  listGoogleChatMessages,
  sendGoogleChatMessage,
  sendClinicalAlertCardToGoogleChat,
  GoogleChatSpace,
  GoogleChatMessage
} from '../services/googleChatService';
import confetti from 'canvas-confetti';

interface GoogleChatIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleChatIntegrationModal: React.FC<GoogleChatIntegrationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { user, userProfile, googleAccessToken, loginWithGoogle } = useFirebase();
  const { speak } = useAudioNarrator();

  const [activeTab, setActiveTab] = useState<'broadcast' | 'spaces' | 'create'>('broadcast');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Spaces State
  const [spaces, setSpaces] = useState<GoogleChatSpace[]>([]);
  const [isLoadingSpaces, setIsLoadingSpaces] = useState<boolean>(false);
  const [selectedSpaceName, setSelectedSpaceName] = useState<string>('');

  // Space Messages State
  const [messages, setMessages] = useState<GoogleChatMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  // Protocol Broadcast State
  const [broadcastDiseaseId, setBroadcastDiseaseId] = useState<string>(COMPREHENSIVE_DISEASE_CURES[0]?.id || 'nsclc');
  const [broadcastCustomNote, setBroadcastCustomNote] = useState<string>(
    'Deterministic Phase Coherence γ = 1.000000 achieved. Master formulations ready for open international peer review and automated bioreactor scaling.'
  );
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);

  // Space Creation State
  const [newSpaceName, setNewSpaceName] = useState<string>('🔬 Sovereign Biomedical Collaborative');
  const [newSpaceDescription, setNewSpaceDescription] = useState<string>(
    'Real-time global clinical collaboration, 10+ target cures, and bioreactor scaling discussions.'
  );
  const [isCreatingSpace, setIsCreatingSpace] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      speak(
        'Google Chat Workspace is connected. You can broadcast clinical trial breakthrough cards to spaces, create research channels, or chat in real time.',
        { priority: 'high' }
      );
    }
  }, [isOpen, speak]);

  const fetchSpaces = async () => {
    if (!googleAccessToken) return;
    setIsLoadingSpaces(true);
    try {
      const data = await listGoogleChatSpaces(googleAccessToken);
      setSpaces(data);
      if (data.length > 0 && !selectedSpaceName) {
        setSelectedSpaceName(data[0].name);
      }
      setStatusMessage({ type: 'success', text: `Loaded ${data.length} Google Chat space(s).` });
    } catch (err: any) {
      console.error('Error fetching Chat spaces:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to load Google Chat spaces. Verify Google Workspace permissions.'
      });
    } finally {
      setIsLoadingSpaces(false);
    }
  };

  useEffect(() => {
    if (isOpen && googleAccessToken) {
      fetchSpaces();
    }
  }, [isOpen, googleAccessToken]);

  const fetchMessagesForSpace = async (spaceName: string) => {
    if (!googleAccessToken || !spaceName) return;
    setIsLoadingMessages(true);
    try {
      const msgs = await listGoogleChatMessages(googleAccessToken, spaceName);
      setMessages(msgs);
    } catch (err: any) {
      console.error('Error fetching messages:', err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (selectedSpaceName && googleAccessToken && activeTab === 'spaces') {
      fetchMessagesForSpace(selectedSpaceName);
    }
  }, [selectedSpaceName, activeTab, googleAccessToken]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleAccessToken || !selectedSpaceName || !inputMessage.trim()) return;

    setIsSendingMessage(true);
    try {
      await sendGoogleChatMessage(googleAccessToken, selectedSpaceName, inputMessage.trim());
      setInputMessage('');
      await fetchMessagesForSpace(selectedSpaceName);
      speak('Message posted to Google Chat.', { priority: 'low' });
    } catch (err: any) {
      console.error('Error sending message:', err);
      setStatusMessage({ type: 'error', text: err?.message || 'Failed to post message to Google Chat.' });
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleBroadcastAlertCard = async () => {
    if (!googleAccessToken) {
      speak('Please authenticate with Google to broadcast to Google Chat.', { priority: 'high' });
      await loginWithGoogle();
      return;
    }

    if (!selectedSpaceName) {
      setStatusMessage({ type: 'error', text: 'Please select or create a Google Chat Space first.' });
      return;
    }

    const disease = COMPREHENSIVE_DISEASE_CURES.find((d) => d.id === broadcastDiseaseId) || COMPREHENSIVE_DISEASE_CURES[0];
    setIsBroadcasting(true);
    setStatusMessage(null);

    try {
      await sendClinicalAlertCardToGoogleChat(googleAccessToken, selectedSpaceName, {
        diseaseName: disease.diseaseName,
        cureName: disease.cureName,
        standingWaveFrequency: disease.standingWaveFrequency,
        confidence: disease.confidence || 100,
        authorName: userProfile?.displayName || user?.displayName || 'Sovereign Researcher',
        notes: broadcastCustomNote
      });

      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      speak(`Broadcasting breakthrough alert for ${disease.diseaseName} to Google Chat.`, { priority: 'high' });
      setStatusMessage({
        type: 'success',
        text: `Breakthrough notification card for ${disease.diseaseName} published to Google Chat space!`
      });
    } catch (err: any) {
      console.error('Broadcast error:', err);
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to post Card to Google Chat space.'
      });
    } finally {
      setIsBroadcasting(false);
    }
  };

  const handleCreateSpace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleAccessToken) {
      await loginWithGoogle();
      return;
    }
    if (!newSpaceName.trim()) return;

    setIsCreatingSpace(true);
    setStatusMessage(null);
    try {
      const created = await createGoogleChatSpace(googleAccessToken, newSpaceName.trim(), newSpaceDescription.trim());
      setSpaces((prev) => [created, ...prev]);
      setSelectedSpaceName(created.name);
      confetti({ particleCount: 70, spread: 60 });
      speak(`Created Google Chat space ${created.displayName || newSpaceName}`, { priority: 'high' });
      setStatusMessage({
        type: 'success',
        text: `Google Chat Space "${created.displayName || newSpaceName}" created successfully!`
      });
      setActiveTab('spaces');
    } catch (err: any) {
      console.error('Create space error:', err);
      setStatusMessage({ type: 'error', text: err?.message || 'Failed to create Google Chat space.' });
    } finally {
      setIsCreatingSpace(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-inner">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Google Chat Workspace Integration
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                  <span>Chat API v1</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Broadcast breakthrough clinical protocols, send CardV2 notifications, and collaborate in Google Chat Spaces
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
                <span>Connect Google Chat</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-200">
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
              onClick={() => setActiveTab('broadcast')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'broadcast'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Broadcast CardV2 Alert</span>
            </button>

            <button
              onClick={() => setActiveTab('spaces')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'spaces'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Spaces & Live Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'create'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Space</span>
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
          {/* TAB 1: BROADCAST CARD ALERT */}
          {activeTab === 'broadcast' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/50 via-slate-950 to-slate-950 border border-emerald-500/30 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <span>Broadcast Clinical Breakthrough CardV2 to Google Chat</span>
                  </h3>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed mt-1">
                    Posts an interactive CardV2 alert directly into your Google Chat space with target cure specifications,
                    quantum resonance frequencies, and deterministic confidence metrics.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Target Google Chat Space</label>
                    <select
                      value={selectedSpaceName}
                      onChange={(e) => setSelectedSpaceName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {spaces.length === 0 ? (
                        <option value="">No spaces found (Create one in 'Create Space')</option>
                      ) : (
                        spaces.map((s) => (
                          <option key={s.name} value={s.name}>
                            {s.displayName || s.name} ({s.spaceType || 'SPACE'})
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Target Disease Cure Protocol</label>
                    <select
                      value={broadcastDiseaseId}
                      onChange={(e) => setBroadcastDiseaseId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {COMPREHENSIVE_DISEASE_CURES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.diseaseName} — {c.cureName} ({c.standingWaveFrequency})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Custom Collaborative Research Message</label>
                  <textarea
                    value={broadcastCustomNote}
                    onChange={(e) => setBroadcastCustomNote(e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
                  />
                </div>

                <button
                  onClick={handleBroadcastAlertCard}
                  disabled={isBroadcasting || !selectedSpaceName}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-emerald-950/80 transition transform active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isBroadcasting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Broadcasting Card to Space...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Broadcast CardV2 Notification</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SPACES & LIVE CHAT */}
          {activeTab === 'spaces' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Column: Spaces List */}
              <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-2 max-h-[460px] overflow-y-auto">
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Google Chat Spaces ({spaces.length})
                  </div>
                  <button
                    onClick={fetchSpaces}
                    disabled={isLoadingSpaces}
                    className="text-slate-400 hover:text-white text-xs cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSpaces ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {isLoadingSpaces ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-400 mb-2" />
                    <div>Loading Spaces...</div>
                  </div>
                ) : spaces.length === 0 ? (
                  <div className="p-8 text-center text-slate-600 text-xs">
                    No Google Chat spaces found. Create one to begin.
                  </div>
                ) : (
                  spaces.map((s) => {
                    const isSelected = selectedSpaceName === s.name;
                    return (
                      <div
                        key={s.name}
                        onClick={() => setSelectedSpaceName(s.name)}
                        className={`p-3 rounded-xl transition cursor-pointer border ${
                          isSelected
                            ? 'bg-emerald-950/70 border-emerald-500/60 text-white'
                            : 'bg-slate-900/80 border-slate-800/80 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-bold text-xs truncate">{s.displayName || s.name}</div>
                        <div className="text-[10px] text-slate-500 capitalize">{s.spaceType || 'SPACE'}</div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Right Column: Space Messages & Post Input */}
              <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col max-h-[460px]">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <span className="font-bold text-white">
                    {spaces.find((s) => s.name === selectedSpaceName)?.displayName || 'Select a Space'}
                  </span>
                  {selectedSpaceName && (
                    <button
                      onClick={() => fetchMessagesForSpace(selectedSpaceName)}
                      className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${isLoadingMessages ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                  )}
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto space-y-3 py-3">
                  {isLoadingMessages ? (
                    <div className="p-8 text-center text-slate-500">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-emerald-400 mb-2" />
                      <div>Loading Messages...</div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="p-8 text-center text-slate-600 text-xs">
                      No messages in this space yet. Say hello or post a breakthrough alert!
                    </div>
                  ) : (
                    messages.map((m, idx) => (
                      <div key={m.name || idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-emerald-400">{m.sender?.displayName || 'Chat Member'}</span>
                          <span className="text-slate-500 text-[10px]">
                            {m.createTime ? new Date(m.createTime).toLocaleTimeString() : ''}
                          </span>
                        </div>
                        {m.text && <p className="text-xs text-slate-200 leading-relaxed">{m.text}</p>}
                      </div>
                    ))
                  )}
                </div>

                {/* Post Message Input Form */}
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Post a message to this Google Chat space..."
                    className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
                    disabled={!selectedSpaceName || isSendingMessage}
                  />
                  <button
                    type="submit"
                    disabled={!selectedSpaceName || !inputMessage.trim() || isSendingMessage}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow transition cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: CREATE SPACE */}
          {activeTab === 'create' && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-emerald-400" />
                  <span>Create New Collaborative Google Chat Space</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Provision a dedicated Google Chat Space for your team, clinical trial monitors, and global research partners.
                </p>
              </div>

              <form onSubmit={handleCreateSpace} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Space Display Name</label>
                  <input
                    type="text"
                    value={newSpaceName}
                    onChange={(e) => setNewSpaceName(e.target.value)}
                    placeholder="e.g. Sirius Biomedical Open Science Room"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Space Description & Guidelines</label>
                  <textarea
                    value={newSpaceDescription}
                    onChange={(e) => setNewSpaceDescription(e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isCreatingSpace}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow cursor-pointer transition disabled:opacity-50"
                >
                  {isCreatingSpace ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Creating Space...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Create Google Chat Space</span>
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
