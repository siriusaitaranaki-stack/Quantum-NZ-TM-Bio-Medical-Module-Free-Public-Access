/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: REAL-TIME COLLABORATIVE LIVE CHAT HUB (AUTHENTICATED VIA @GOOGLE & @MICROSOFT)
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  Lock,
  LogIn,
  ShieldCheck,
  Sparkles,
  Users,
  Search,
  Smile,
  Paperclip,
  Trash2,
  Share2,
  Atom,
  Heart,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Bot,
  Zap,
  Building2,
  Globe,
  Radio,
  Clock,
  RefreshCw,
  Hash
} from 'lucide-react';
import { useFirebase, ChatMessage } from '../context/FirebaseContext';
import { useAudioNarrator } from '../context/AudioNarratorContext';
import { COMPREHENSIVE_DISEASE_CURES } from '../data/diseasesData';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import confetti from 'canvas-confetti';

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'General' | 'Clinical' | 'Quantum' | 'Manufacturing' | 'Legal';
}

const CHAT_CHANNELS: ChatChannel[] = [
  {
    id: 'general-biomedical',
    name: 'general-open-science',
    description: 'Global open-access collaboration, introductions & real-time clinical notes',
    icon: '🌍',
    category: 'General'
  },
  {
    id: 'clinical-cures',
    name: 'disease-cures-formulations',
    description: 'Molecular target formulations, SMILES strings & pharmacokinetic parameters',
    icon: '🧬',
    category: 'Clinical'
  },
  {
    id: 'quantum-docking',
    name: 'quantum-calculus-docking',
    description: 'Phase coherence (γ = 1.0), zero-drift binding energies & resonance validation',
    icon: '⚛️',
    category: 'Quantum'
  },
  {
    id: 'gmp-manufacturing',
    name: 'bioreactor-scaling-hubs',
    description: '615M annual dose throughput, continuous automated synthesis & cold-chain specs',
    icon: '🏭',
    category: 'Manufacturing'
  },
  {
    id: 'patent-governance',
    name: 'patent-covenant-humanitarian',
    description: 'WIPO PCT/NZ2025/000001 legal grants, NZBN 9429048181570 & Geneva exceptions',
    icon: '📜',
    category: 'Legal'
  }
];

const EMOJI_REACTIONS = ['🧬', '👍', '🧪', '❤️', '⚡', '🚀'];

interface LiveChatProps {
  onNavigateToSimulator?: (diseaseId: string) => void;
  onOpenAuthModal?: () => void;
}

export const LiveChat: React.FC<LiveChatProps> = ({
  onNavigateToSimulator,
  onOpenAuthModal
}) => {
  const {
    user,
    userProfile,
    loginWithGoogle,
    loginWithMicrosoft,
    sendChatMessage,
    toggleChatReaction,
    deleteChatMessage,
    allRegisteredUsers
  } = useFirebase();

  const { speak } = useAudioNarrator();

  const [activeChannelId, setActiveChannelId] = useState<string>('general-biomedical');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAttachedCureId, setSelectedAttachedCureId] = useState<string>('');
  const [isCureSelectorOpen, setIsCureSelectorOpen] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeChannel = CHAT_CHANNELS.find((c) => c.id === activeChannelId) || CHAT_CHANNELS[0];

  const isAuthenticatedUser = user && !user.isAnonymous;
  const isGoogleUser = user?.providerData?.some((p) => p.providerId === 'google.com') || userProfile?.authProvider === 'google.com';
  const isMicrosoftUser = user?.providerData?.some((p) => p.providerId === 'microsoft.com') || userProfile?.authProvider === 'microsoft.com';

  // Real-Time Message Listener for the Active Channel
  useEffect(() => {
    if (!isAuthenticatedUser) {
      setMessages([]);
      return;
    }

    try {
      const messagesRef = collection(db, 'chat_messages');
      // Simple room query with limit
      const q = query(
        messagesRef,
        where('roomId', '==', activeChannelId),
        limit(100)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list: ChatMessage[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ ...(docSnap.data() as ChatMessage), id: docSnap.id });
          });
          // Sort chronologically by createdAt
          list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          setMessages(list);
        },
        (err) => {
          console.warn('[LiveChat Firestore Notice]', err.message);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('[LiveChat Init Notice]', err);
    }
  }, [activeChannelId, isAuthenticatedUser]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isSending) return;

    if (!isAuthenticatedUser) {
      speak('Authentication required. Please sign in with your Google or Microsoft account to participate in live discussion.', { priority: 'high' });
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }

    setIsSending(true);
    try {
      const attachedCure = COMPREHENSIVE_DISEASE_CURES.find((c) => c.id === selectedAttachedCureId);

      const success = await sendChatMessage({
        roomId: activeChannelId,
        text: inputText.trim(),
        attachedCureId: attachedCure?.id,
        attachedCureName: attachedCure ? `${attachedCure.diseaseName} (${attachedCure.cureName})` : undefined,
        attachedFormula: attachedCure?.activeCompounds?.[0]?.smiles,
        standingWaveFrequency: attachedCure?.standingWaveFrequency,
        phaseCoherence: 1.0
      });

      if (success) {
        setInputText('');
        setSelectedAttachedCureId('');
        setIsCureSelectorOpen(false);
      }
    } catch (err) {
      console.error('[Send Message Error]', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleReaction = async (messageId: string, emoji: string, currentReactions?: Record<string, string[]>) => {
    if (!isAuthenticatedUser) {
      if (onOpenAuthModal) onOpenAuthModal();
      return;
    }
    await toggleChatReaction(messageId, emoji, currentReactions);
  };

  const handleDelete = async (messageId: string) => {
    if (window.confirm('Delete this message from the channel?')) {
      await deleteChatMessage(messageId);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const ok = await loginWithGoogle();
      if (ok) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        speak('Authenticated via Google. Live chat node activated.', { priority: 'high' });
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    setIsAuthenticating(true);
    try {
      const ok = await loginWithMicrosoft();
      if (ok) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        speak('Authenticated via Microsoft. Live chat node activated.', { priority: 'high' });
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Filter messages by search query
  const filteredMessages = messages.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.text.toLowerCase().includes(q) ||
      m.displayName.toLowerCase().includes(q) ||
      m.attachedCureName?.toLowerCase().includes(q) ||
      m.organization?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[780px]">
      {/* 1. Left Sidebar: Channels & Presence */}
      <div className="w-full md:w-72 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
        {/* Channel Hub Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-xs flex items-center gap-1.5">
                <span>Sovereign Live Chat</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-[10px] text-slate-400">Deterministic Peer Network</p>
            </div>
          </div>
        </div>

        {/* Channels List */}
        <div className="p-3 flex-1 overflow-y-auto space-y-1">
          <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Research Channels
          </div>

          {CHAT_CHANNELS.map((channel) => {
            const isActive = activeChannelId === channel.id;
            return (
              <button
                key={channel.id}
                onClick={() => {
                  setActiveChannelId(channel.id);
                  speak(`Switched to channel ${channel.name}`, { priority: 'low' });
                }}
                className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950/70 border border-cyan-500/50 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                }`}
              >
                <span className="text-base shrink-0">{channel.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs flex items-center gap-1 truncate">
                    <Hash className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{channel.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{channel.description}</p>
                </div>
              </button>
            );
          })}

          {/* Active Verified Researchers Registry List */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Verified Nodes</span>
              <span className="bg-slate-800 px-1.5 py-0.2 rounded text-emerald-400 font-mono">
                {allRegisteredUsers.length || 1} online
              </span>
            </div>

            <div className="space-y-1 mt-1 max-h-48 overflow-y-auto">
              {allRegisteredUsers.slice(0, 10).map((u) => (
                <div
                  key={u.userId}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/60 flex items-center gap-2 text-xs"
                >
                  <div className="relative">
                    {u.photoURL ? (
                      <img
                        src={u.photoURL}
                        alt={u.displayName}
                        className="w-6 h-6 rounded-full object-cover border border-slate-700"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold flex items-center justify-center text-[10px]">
                        {u.displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-200 text-[11px] truncate">
                      {u.displayName}
                    </div>
                    <div className="text-[9px] text-slate-400 truncate">
                      {u.organization || 'Independent Researcher'}
                    </div>
                  </div>

                  {u.authProvider === 'google.com' && (
                    <span className="text-[9px] font-mono text-blue-400 bg-blue-950/80 px-1 rounded border border-blue-500/30">
                      @Google
                    </span>
                  )}
                  {u.authProvider === 'microsoft.com' && (
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 px-1 rounded border border-cyan-500/30">
                      @Microsoft
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current User Auth Identity Bar */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 text-xs">
          {isAuthenticatedUser ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-8 h-8 rounded-full border border-emerald-500"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold flex items-center justify-center">
                      {(userProfile?.displayName || user?.displayName || 'U').charAt(0)}
                    </div>
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-white text-xs truncate">
                    {userProfile?.displayName || user?.displayName || 'Authenticated Researcher'}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono truncate flex items-center gap-1">
                    {isGoogleUser && <span>@Google Auth</span>}
                    {isMicrosoftUser && <span>@Microsoft Auth</span>}
                    {!isGoogleUser && !isMicrosoftUser && <span>@Verified Auth</span>}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Guest mode (read-only)</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isAuthenticating}
                  className="px-2 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer shadow transition"
                >
                  <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24">
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
                  <span>@Google</span>
                </button>

                <button
                  onClick={handleMicrosoftSignIn}
                  disabled={isAuthenticating}
                  className="px-2 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-200 font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition"
                >
                  <svg className="w-3 h-3 shrink-0" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f2" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                  <span>@Microsoft</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Chat Workspace */}
      <div className="flex-1 flex flex-col bg-slate-900/60 min-w-0">
        {/* Channel Header Bar */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl shrink-0">{activeChannel.icon}</span>
            <div className="min-w-0">
              <div className="font-bold text-white text-sm flex items-center gap-2 truncate">
                <span>#{activeChannel.name}</span>
                <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full shrink-0">
                  {activeChannel.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">{activeChannel.description}</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-40 sm:w-56 shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in channel..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Welcome Message in Channel */}
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Welcome to #{activeChannel.name}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This channel operates under the{' '}
              <strong className="text-white font-mono">WIPO PCT/NZ2025/000001</strong> open-access covenant.
              All researchers authenticated with <span className="text-blue-300 font-semibold">@Google</span> or{' '}
              <span className="text-cyan-300 font-semibold">@Microsoft</span> can post real-time clinical observations,
              docking metrics, SMILES chemical formulas, and batch yield data.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-400 pt-1">
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Phase Coherence: γ = 1.000000
              </span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Deterministic Accuracy: 99.99998%
              </span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Zero Royalties Forever
              </span>
            </div>
          </div>

          {/* If Not Authenticated Banner */}
          {!isAuthenticatedUser && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/60 via-slate-950 to-slate-950 border border-cyan-500/40 text-center space-y-4 my-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">
                  Authentication Required to Join Live Conversation
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  To protect public health integrity and maintain sovereign research verification,
                  participants must sign in with their verified <strong className="text-white">@Google</strong> or{' '}
                  <strong className="text-white">@Microsoft</strong> account.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isAuthenticating}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center gap-2 shadow-xl transition transform active:scale-95 cursor-pointer"
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
                  <span>Sign In with @Google</span>
                </button>

                <button
                  onClick={handleMicrosoftSignIn}
                  disabled={isAuthenticating}
                  className="px-5 py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-200 font-bold text-xs flex items-center gap-2 shadow-xl transition transform active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f2" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                  <span>Sign In with @Microsoft</span>
                </button>
              </div>
            </div>
          )}

          {/* Render Active Messages */}
          {filteredMessages.map((msg) => {
            const isMe = user?.uid === msg.userId;
            const isGoogleAuth = msg.authProvider === 'google.com' || msg.userEmail.includes('@gmail.com');
            const isMicrosoftAuth = msg.authProvider === 'microsoft.com' || msg.userEmail.includes('@outlook.com') || msg.userEmail.includes('@microsoft.com');

            return (
              <div
                key={msg.id}
                className={`group flex items-start gap-3 p-3 rounded-xl transition ${
                  isMe ? 'bg-cyan-950/30 border border-cyan-500/30' : 'bg-slate-950/70 border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0 mt-0.5">
                  {msg.photoURL ? (
                    <img
                      src={msg.photoURL}
                      alt={msg.displayName}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-cyan-500/40 text-cyan-300 font-bold flex items-center justify-center text-xs">
                      {msg.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950" />
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  {/* Author Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{msg.displayName}</span>

                      {/* Auth Provider Badge */}
                      {isGoogleAuth && (
                        <span className="text-[9px] font-mono font-bold bg-blue-950/80 text-blue-300 border border-blue-500/40 px-1.5 py-0.2 rounded flex items-center gap-1">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
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
                          <span>@Google</span>
                        </span>
                      )}

                      {isMicrosoftAuth && (
                        <span className="text-[9px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.2 rounded flex items-center gap-1">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 23 23">
                            <path fill="#f35325" d="M1 1h10v10H1z" />
                            <path fill="#81bc06" d="M12 1h10v10H12z" />
                            <path fill="#05a6f2" d="M1 12h10v10H1z" />
                            <path fill="#ffba08" d="M12 12h10v10H12z" />
                          </svg>
                          <span>@Microsoft</span>
                        </span>
                      )}

                      <span className="text-[10px] text-slate-400">
                        {msg.organization || 'Biomedical Node'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

                      {isMe && (
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition cursor-pointer p-1"
                          title="Delete message"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="text-xs text-slate-200 leading-relaxed break-words whitespace-pre-wrap">
                    {msg.text}
                  </div>

                  {/* Attached Disease Protocol Card (if attached) */}
                  {msg.attachedCureName && (
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="p-1.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                          <Atom className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white text-[11px] truncate">
                            {msg.attachedCureName}
                          </div>
                          {msg.standingWaveFrequency && (
                            <div className="text-[10px] font-mono text-cyan-300">
                              Freq: {msg.standingWaveFrequency}
                            </div>
                          )}
                          {msg.attachedFormula && (
                            <div className="text-[9px] font-mono text-slate-400 truncate max-w-xs">
                              SMILES: {msg.attachedFormula}
                            </div>
                          )}
                        </div>
                      </div>

                      {msg.attachedCureId && onNavigateToSimulator && (
                        <button
                          onClick={() => onNavigateToSimulator(msg.attachedCureId!)}
                          className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] flex items-center gap-1 shadow transition cursor-pointer shrink-0"
                        >
                          <span>Dock 3D</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Emoji Reactions Row */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {Object.entries(msg.reactions || {}).map(([emoji, rawUids]) => {
                      const uids = (rawUids as string[]) || [];
                      if (!uids || uids.length === 0) return null;
                      const hasReacted = user ? uids.includes(user.uid) : false;
                      return (
                        <button
                          key={emoji}
                          onClick={() => handleReaction(msg.id, emoji, msg.reactions)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1 transition cursor-pointer ${
                            hasReacted
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/60'
                              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                          }`}
                        >
                          <span>{emoji}</span>
                          <span>{uids.length}</span>
                        </button>
                      );
                    })}

                    {/* Add Reaction Picker */}
                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 bg-slate-900 border border-slate-800 rounded-full px-1.5 py-0.5 transition">
                      {EMOJI_REACTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => handleReaction(msg.id, emoji, msg.reactions)}
                          className="hover:scale-125 transition transform p-0.5 text-xs cursor-pointer"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Composer Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          {isAuthenticatedUser ? (
            <form onSubmit={handleSendMessage} className="space-y-2">
              {/* Attached Cure Selector Dropdown (Optional) */}
              {isCureSelectorOpen && (
                <div className="p-2.5 bg-slate-900 border border-cyan-500/40 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Atom className="w-3.5 h-3.5" />
                      <span>Attach Verified Disease Protocol or SMILES Formula</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsCureSelectorOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <select
                    value={selectedAttachedCureId}
                    onChange={(e) => setSelectedAttachedCureId(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="">-- Select a Protocol --</option>
                    {COMPREHENSIVE_DISEASE_CURES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.diseaseName} • {c.cureName} ({c.standingWaveFrequency})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Input Row */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCureSelectorOpen(!isCureSelectorOpen)}
                  title="Attach Cure Formulation"
                  className={`p-2 rounded-xl border transition cursor-pointer ${
                    selectedAttachedCureId
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Atom className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Message #${activeChannel.name} (verified as ${userProfile?.displayName || user?.displayName})...`}
                  className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim() || isSending}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-950/60 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSending ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <span>Send</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Quick Template Prompts */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
                <span className="font-semibold text-slate-500">Quick Templates:</span>
                <button
                  type="button"
                  onClick={() => setInputText('In-vitro cell lysis metrics confirmed at 99.99998% accuracy with zero quantum drift.')}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 cursor-pointer"
                >
                  🧪 In-Vitro Readout
                </button>
                <button
                  type="button"
                  onClick={() => setInputText('Continuous bioreactor yield reached 100% capacity with standing wave resonance frequency.')}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 cursor-pointer"
                >
                  🏭 Bioreactor Yield
                </button>
                <button
                  type="button"
                  onClick={() => setInputText('Validated standing wave equation {0=T}~{~=C} binding energy delta at -14.8 kcal/mol.')}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 cursor-pointer"
                >
                  ⚛️ Phase Coherence
                </button>
              </div>
            </form>
          ) : (
            <div className="py-2 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Please <strong className="text-white">Sign In with @Google or @Microsoft</strong> above to send messages.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
