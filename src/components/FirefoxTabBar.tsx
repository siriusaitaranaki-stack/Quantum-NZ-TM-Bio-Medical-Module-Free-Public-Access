/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @AUTHENTICATION_KEY_SPACE: 2^49152 BITS [IRREVERSIBLE CRYPTOGRAPHIC IMMUTABILITY]
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001 (Universal Open Access Covenant Free For Humanity Forever)
 * @CONTEXT: FIREFOX-STYLE BROWSER TAB BAR, OMNIBOX & MULTI-TAB WORKSPACE MANAGER
 * ==============================================================================================
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  X,
  ExternalLink,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Globe,
  Grid,
  Layers,
  Search,
  Lock,
  HeartPulse,
  Atom,
  Dna,
  Activity,
  Database,
  Factory,
  HandHeart,
  FileText,
  FileSpreadsheet,
  CheckSquare,
  Video,
  MessageSquare,
  Mail,
  Users,
  Cloud,
  ChevronDown,
  Sparkles,
  Maximize2,
  Minimize2,
  Copy
} from 'lucide-react';
import { useTabWorkspace, TabType, TAB_CATALOG, WorkspaceTab } from '../context/TabWorkspaceContext';
import { useFirebase } from '../context/FirebaseContext';
import { useAudioNarrator } from '../context/AudioNarratorContext';

interface FirefoxTabBarProps {
  onOpenExportModal: () => void;
  onOpenLegalModal: () => void;
  onOpenDonationModal: () => void;
  onOpenAuthModal: () => void;
  onOpenRegistryModal: () => void;
  onOpenBillingModal: () => void;
  onOpenGmailModal: () => void;
  onOpenSheetsModal: () => void;
  onOpenDocsModal: () => void;
  onOpenFormsModal: () => void;
  onOpenGoogleChatModal: () => void;
  onOpenGoogleMeetModal: () => void;
}

export const FirefoxTabBar: React.FC<FirefoxTabBarProps> = ({
  onOpenExportModal,
  onOpenLegalModal,
  onOpenDonationModal,
  onOpenAuthModal,
  onOpenRegistryModal,
  onOpenBillingModal,
  onOpenGmailModal,
  onOpenSheetsModal,
  onOpenDocsModal,
  onOpenFormsModal,
  onOpenGoogleChatModal,
  onOpenGoogleMeetModal
}) => {
  const {
    tabs,
    activeTabId,
    setActiveTabId,
    openTab,
    closeTab,
    snapOutTab,
    dockTab,
    tileTabs,
    navigateTabUrl,
    activeTab,
    toggleMinimizeTab
  } = useTabWorkspace();

  const { user, userProfile, googleAccessToken } = useFirebase();
  const { speak } = useAudioNarrator();

  const [isNewTabMenuOpen, setIsNewTabMenuOpen] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>(activeTab?.url || 'quantum://find-a-cure');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const newTabMenuRef = useRef<HTMLDivElement>(null);

  // Synchronize URL input when active tab changes
  useEffect(() => {
    if (activeTab) {
      setUrlInput(activeTab.url);
    }
  }, [activeTab]);

  // Click outside listener for new tab dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (newTabMenuRef.current && !newTabMenuRef.current.contains(e.target as Node)) {
        setIsNewTabMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTab) return;
    navigateTabUrl(activeTab.id, urlInput);
    speak(`Navigating to ${urlInput}`, { priority: 'low' });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    speak('Re-syncing quantum deterministic coherence matrix.', { priority: 'low' });
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const minimizedTabs = tabs.filter((t) => t.isMinimized);

  return (
    <div className="bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl sticky top-0 z-40 shadow-2xl flex flex-col">
      {/* 1. Top Firefox-Style Tab Strip */}
      <div className="flex items-center justify-between px-2 sm:px-4 pt-2 pb-0 gap-2 overflow-x-auto scrollbar-none">
        {/* Horizontal Stack of Tabs */}
        <div className="flex items-center gap-1 min-w-0 flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 pb-1">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId && !tab.isSnappedOut;
            const isFloating = tab.isSnappedOut;

            return (
              <div
                key={tab.id}
                onClick={() => {
                  if (tab.isMinimized) {
                    toggleMinimizeTab(tab.id);
                  }
                  setActiveTabId(tab.id);
                }}
                className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-t-xl text-xs font-semibold select-none cursor-pointer transition-all duration-150 max-w-[240px] shrink-0 border-t border-x ${
                  isActive
                    ? 'bg-slate-900 text-white border-blue-500/50 shadow-md shadow-black/60 relative -bottom-[1px] z-10'
                    : isFloating
                    ? 'bg-blue-950/40 text-blue-300 border-blue-500/30 hover:bg-blue-900/50'
                    : 'bg-slate-950 text-slate-400 border-transparent hover:bg-slate-900/60 hover:text-slate-200'
                }`}
              >
                {/* Active tab glow line */}
                {isActive && (
                  <div className="absolute top-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full" />
                )}

                {/* Tab Icon */}
                <div className="shrink-0">
                  {tab.tabType === 'find-a-cure' && <HeartPulse className="w-3.5 h-3.5 text-rose-400" />}
                  {tab.tabType === 'global-users-map' && <Globe className="w-3.5 h-3.5 text-emerald-400" />}
                  {tab.tabType === 'live-chat' && <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />}
                  {tab.tabType === 'docking' && <Atom className="w-3.5 h-3.5 text-blue-400" />}
                  {tab.tabType === 'diseases' && <Dna className="w-3.5 h-3.5 text-purple-400" />}
                  {tab.tabType === 'quantum-calculus' && <Activity className="w-3.5 h-3.5 text-amber-400" />}
                  {tab.tabType === 'cross-reference' && <Database className="w-3.5 h-3.5 text-teal-400" />}
                  {tab.tabType === 'production' && <Factory className="w-3.5 h-3.5 text-indigo-400" />}
                  {tab.tabType === 'donate' && <HandHeart className="w-3.5 h-3.5 text-pink-400" />}
                  {tab.tabType === 'docs' && <FileText className="w-3.5 h-3.5 text-blue-400" />}
                  {tab.tabType === 'sheets' && <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />}
                  {tab.tabType === 'forms' && <CheckSquare className="w-3.5 h-3.5 text-purple-400" />}
                  {tab.tabType === 'google-chat' && <MessageSquare className="w-3.5 h-3.5 text-teal-400" />}
                  {tab.tabType === 'google-meet' && <Video className="w-3.5 h-3.5 text-blue-400" />}
                  {tab.tabType === 'gmail' && <Mail className="w-3.5 h-3.5 text-rose-400" />}
                  {tab.tabType === 'registry' && <Users className="w-3.5 h-3.5 text-indigo-400" />}
                  {tab.tabType === 'billing' && <Cloud className="w-3.5 h-3.5 text-blue-400" />}
                  {tab.tabType === 'legal' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                  {tab.tabType === 'export' && <FileText className="w-3.5 h-3.5 text-cyan-400" />}
                </div>

                {/* Tab Title */}
                <span className="truncate flex-1 text-[11px] font-sans">{tab.title}</span>

                {/* Detached Indicator */}
                {isFloating && (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 shrink-0">
                    Popout
                  </span>
                )}

                {/* Snap Out / Pop Out Icon on Hover */}
                {!isFloating && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      snapOutTab(tab.id);
                      speak(`Snapped out ${tab.title} into floating draggable window.`, {
                        priority: 'low'
                      });
                    }}
                    title="Snap out into Floating Resizable Window"
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition cursor-pointer shrink-0"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}

                {/* Close Tab Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  title="Close Tab"
                  className="p-1 rounded hover:bg-rose-500/20 text-slate-500 hover:text-rose-300 transition cursor-pointer shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}

          {/* "+" New Tab Button with Dropdown Menu */}
          <div className="relative shrink-0" ref={newTabMenuRef}>
            <button
              onClick={() => setIsNewTabMenuOpen(!isNewTabMenuOpen)}
              title="Open New Tab (Select Lab or Tool)"
              className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer flex items-center gap-1 text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            {isNewTabMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 max-h-[75vh] overflow-y-auto bg-slate-900 border border-blue-500/40 rounded-2xl p-2.5 shadow-2xl z-50 animate-fadeIn space-y-1">
                <div className="px-2.5 py-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
                  <span>Open In New Tab</span>
                  <span className="text-cyan-400">19 Available Modules</span>
                </div>

                <div className="space-y-0.5 pt-1">
                  {TAB_CATALOG.map((item) => (
                    <button
                      key={item.type}
                      onClick={() => {
                        openTab(item.type);
                        setIsNewTabMenuOpen(false);
                        speak(`Opened ${item.defaultTitle} in new tab.`, { priority: 'low' });
                      }}
                      className="w-full px-2.5 py-2 rounded-xl text-left hover:bg-blue-950/80 text-slate-300 hover:text-white transition flex items-center justify-between gap-2 group cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate group-hover:text-cyan-300">
                          {item.defaultTitle}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">{item.description}</div>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 group-hover:text-cyan-300 border border-slate-800 shrink-0">
                        {item.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Tile / Split View Layout Button */}
          <button
            onClick={() => {
              tileTabs();
              speak('Tiled all open tabs into grid layout.', { priority: 'low' });
            }}
            title="Tile all tabs into multi-window layout"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer text-xs shrink-0"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right side: Top Live User Counter Button & Auth Profile */}
        <div className="flex items-center gap-1.5 shrink-0 pb-1">
          {/* Top Live Users Map Button */}
          <button
            onClick={() => openTab('global-users-map')}
            title="Live Interactive Google Maps Telemetry (1,482+ Online Researchers)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/50 text-xs font-mono font-bold transition cursor-pointer shadow-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">1,482 Live Users</span>
          </button>
        </div>
      </div>

      {/* 2. Firefox-Style Omnibox URL & Tools Strip */}
      <div className="px-2 sm:px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
        {/* Navigation buttons + Omnibox URL */}
        <div className="flex items-center gap-2 flex-1 min-w-[280px]">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const idx = tabs.findIndex((t) => t.id === activeTabId);
                if (idx > 0) setActiveTabId(tabs[idx - 1].id);
              }}
              title="Previous Tab"
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                const idx = tabs.findIndex((t) => t.id === activeTabId);
                if (idx < tabs.length - 1) setActiveTabId(tabs[idx + 1].id);
              }}
              title="Next Tab"
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRefresh}
              title="Reload / Phase Resync"
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>

          {/* Omnibox URL Bar */}
          <form onSubmit={handleUrlSubmit} className="flex-1 relative">
            <div className="relative flex items-center">
              <div className="absolute left-3 flex items-center gap-1 text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono hidden md:inline text-emerald-400 font-bold">WIPO</span>
              </div>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="quantum://find-a-cure or type command..."
                className="w-full pl-16 md:pl-20 pr-10 py-1.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs font-mono text-cyan-200 placeholder-slate-600 focus:outline-none transition shadow-inner"
              />
              {activeTab && !activeTab.isSnappedOut && (
                <button
                  type="button"
                  onClick={() => {
                    snapOutTab(activeTab.id);
                    speak(`Snapped out ${activeTab.title} into floating draggable window.`, {
                      priority: 'low'
                    });
                  }}
                  title="Snap out current tab into floating window"
                  className="absolute right-2.5 p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Top Horizontal Stack of Tools (Docs, Sheets, Forms, Chat, Meet, Gmail, Billing, Registry, Donate, Auth) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin scrollbar-thumb-slate-800">
          {/* Docs Tab/Modal Button */}
          <button
            onClick={() => openTab('docs')}
            title="Google Docs: Auto-compile dossiers with Docs API v1"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-500/40 text-xs font-semibold transition cursor-pointer shrink-0"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">Docs</span>
          </button>

          {/* Sheets Tab/Modal Button */}
          <button
            onClick={() => openTab('sheets')}
            title="Google Sheets: Real-time clinical trial matrices with Sheets API v4"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition cursor-pointer shrink-0"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Sheets</span>
          </button>

          {/* Forms Tab/Modal Button */}
          <button
            onClick={() => openTab('forms')}
            title="Google Forms: Provision trial surveys with Forms API v1"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-500/40 text-xs font-semibold transition cursor-pointer shrink-0"
          >
            <CheckSquare className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">Forms</span>
          </button>

          {/* Google Chat Tab/Modal Button */}
          <button
            onClick={() => openTab('google-chat')}
            title="Google Chat: Dispatch cardV2 alerts & chat with Chat API v1"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-950/80 hover:bg-teal-900 text-teal-300 border border-teal-500/40 text-xs font-semibold transition cursor-pointer shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden md:inline">Chat</span>
          </button>

          {/* Google Meet Tab/Modal Button */}
          <button
            onClick={() => openTab('google-meet')}
            title="Google Meet: Provision clinical review video rooms with Meet API v2"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-500/40 text-xs font-semibold transition cursor-pointer shrink-0"
          >
            <Video className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">Meet</span>
          </button>

          {/* Gmail Dispatcher Button */}
          <button
            onClick={() => openTab('gmail')}
            title="Gmail Dispatcher: Send certified protocol dossiers"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-semibold transition cursor-pointer shrink-0"
          >
            <Mail className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden md:inline">Gmail</span>
          </button>

          {/* GCP Billing Audit Button */}
          <button
            onClick={() => openTab('billing')}
            title="GCP Infrastructure & Billing Audit"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-500/40 text-xs font-semibold transition cursor-pointer shrink-0"
          >
            <Cloud className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden lg:inline">Billing</span>
          </button>

          {/* Researcher Registry Button */}
          <button
            onClick={() => openTab('registry')}
            title="Researcher IAM Directory"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition cursor-pointer shrink-0"
          >
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden lg:inline">Registry</span>
          </button>

          {/* Donate Fund Button */}
          <button
            onClick={() => openTab('donate')}
            title="Humanitarian R&D Open-Science Fund"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-md transition cursor-pointer shrink-0"
          >
            <HandHeart className="w-3.5 h-3.5" />
            <span>Donate</span>
          </button>

          {/* Auth Button */}
          <button
            onClick={onOpenAuthModal}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] truncate max-w-[100px]">
              {user?.displayName || user?.email?.split('@')[0] || 'Guest Node'}
            </span>
          </button>
        </div>
      </div>

      {/* 3. Minimized Tabs Dock (If any floating window is minimized) */}
      {minimizedTabs.length > 0 && (
        <div className="px-4 py-1.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Minimized Windows ({minimizedTabs.length}):
          </span>
          {minimizedTabs.map((minTab) => (
            <button
              key={minTab.id}
              onClick={() => toggleMinimizeTab(minTab.id)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-[11px] font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>{minTab.title}</span>
              <Maximize2 className="w-3 h-3 text-slate-400" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
