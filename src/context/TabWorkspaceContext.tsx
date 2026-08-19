/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @AUTHENTICATION_KEY_SPACE: 2^49152 BITS [IRREVERSIBLE CRYPTOGRAPHIC IMMUTABILITY]
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001 (Universal Open Access Covenant Free For Humanity Forever)
 * @CONTEXT: FIREFOX-STYLE MULTI-TAB & DRAGGABLE/RESIZABLE FLOATING WINDOW WORKSPACE CONTEXT
 * ==============================================================================================
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  HeartPulse,
  Globe,
  MessageSquare,
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
  Mail,
  Users,
  Cloud,
  ShieldCheck,
  Share2,
  FileCheck2,
  LucideIcon
} from 'lucide-react';

export type TabType =
  | 'find-a-cure'
  | 'global-users-map'
  | 'live-chat'
  | 'docking'
  | 'diseases'
  | 'quantum-calculus'
  | 'cross-reference'
  | 'production'
  | 'donate'
  | 'docs'
  | 'sheets'
  | 'forms'
  | 'google-chat'
  | 'google-meet'
  | 'gmail'
  | 'registry'
  | 'billing'
  | 'legal'
  | 'export';

export interface WorkspaceTab {
  id: string;
  tabType: TabType;
  title: string;
  url: string;
  iconName: string;
  isSnappedOut: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  params?: Record<string, any>;
}

export interface TabTypeMetadata {
  type: TabType;
  defaultTitle: string;
  defaultUrl: string;
  iconName: string;
  badge: string;
  category: 'core' | 'workspace' | 'governance';
  description: string;
}

export const TAB_CATALOG: TabTypeMetadata[] = [
  {
    type: 'find-a-cure',
    defaultTitle: 'Find A Cure — Lumana AI',
    defaultUrl: 'quantum://find-a-cure',
    iconName: 'HeartPulse',
    badge: 'Lumana AI + 16 DBs',
    category: 'core',
    description: 'Live Universal Search & Lumana AI Autonomous Drug Discovery Agent'
  },
  {
    type: 'global-users-map',
    defaultTitle: 'Live Global Users Map (@Google Maps)',
    defaultUrl: 'quantum://global-users-map',
    iconName: 'Globe',
    badge: 'Live Google Map',
    category: 'core',
    description: 'Real-Time Global Multi-Institutional Telemetry & Verified Clinical Nodes'
  },
  {
    type: 'live-chat',
    defaultTitle: 'Live Chat (@Google / @Microsoft)',
    defaultUrl: 'quantum://live-chat',
    iconName: 'MessageSquare',
    badge: 'Live Sync',
    category: 'core',
    description: 'Real-Time Authenticated Researcher & Oncologist Collaboration'
  },
  {
    type: 'docking',
    defaultTitle: '3D Molecular Docking Simulator',
    defaultUrl: 'quantum://docking',
    iconName: 'Atom',
    badge: 'Physics Engine',
    category: 'core',
    description: 'Lennard-Jones & Coulomb Force-Fields with Target Ligand Binding'
  },
  {
    type: 'diseases',
    defaultTitle: 'Disease Developmental Lab',
    defaultUrl: 'quantum://diseases',
    iconName: 'Dna',
    badge: 'Top 10+ Cures',
    category: 'core',
    description: 'Oncology, Neurodegenerative & Genetic Target Database'
  },
  {
    type: 'quantum-calculus',
    defaultTitle: '{0=T}~{~=C} Standing Wave Lab',
    defaultUrl: 'quantum://quantum-calculus',
    iconName: 'Activity',
    badge: 'Chronous/Lazarus',
    category: 'core',
    description: 'Temporal Causality Simulator & Phase Coherence Harmonic Engine'
  },
  {
    type: 'cross-reference',
    defaultTitle: 'Biomedical Database Mesh',
    defaultUrl: 'quantum://cross-reference',
    iconName: 'Database',
    badge: '34 Live DBs',
    category: 'core',
    description: 'PDB, PubChem, UniProt, ClinicalTrials.gov, WHO GHO & Literature'
  },
  {
    type: 'production',
    defaultTitle: '12-Hub Global Production',
    defaultUrl: 'quantum://production',
    iconName: 'Factory',
    badge: '615M Doses/Yr',
    category: 'core',
    description: 'Scalable Automated Bioreactor Manufacturing & Supply Chain Logistics'
  },
  {
    type: 'donate',
    defaultTitle: 'Humanitarian R&D Fund',
    defaultUrl: 'quantum://donate',
    iconName: 'HandHeart',
    badge: 'BNZ / PayPal / GPay',
    category: 'governance',
    description: 'Support Universal Open-Science Medical Developmental Research'
  },
  {
    type: 'docs',
    defaultTitle: 'Google Docs Dossier Studio',
    defaultUrl: 'quantum://workspace/google-docs',
    iconName: 'FileText',
    badge: 'Docs API v1',
    category: 'workspace',
    description: 'Auto-compile clinical research dossiers directly into Google Docs'
  },
  {
    type: 'sheets',
    defaultTitle: 'Google Sheets Clinical Matrix',
    defaultUrl: 'quantum://workspace/google-sheets',
    iconName: 'FileSpreadsheet',
    badge: 'Sheets API v4',
    category: 'workspace',
    description: 'Export trial matrices, compute drug docking scores & append telemetry'
  },
  {
    type: 'forms',
    defaultTitle: 'Google Forms Clinical Trial Builder',
    defaultUrl: 'quantum://workspace/google-forms',
    iconName: 'CheckSquare',
    badge: 'Forms API v1',
    category: 'workspace',
    description: 'Provision patient questionnaires & monitor multi-center trial responses'
  },
  {
    type: 'google-chat',
    defaultTitle: 'Google Chat Collaborative Spaces',
    defaultUrl: 'quantum://workspace/google-chat',
    iconName: 'MessageSquare',
    badge: 'Chat API v1',
    category: 'workspace',
    description: 'Broadcast cardV2 alerts and coordinate with hospital research teams'
  },
  {
    type: 'google-meet',
    defaultTitle: 'Google Meet Virtual Consultation',
    defaultUrl: 'quantum://workspace/google-meet',
    iconName: 'Video',
    badge: 'Meet API v2',
    category: 'workspace',
    description: 'Provision encrypted video conferences and bridge with Google Chat'
  },
  {
    type: 'gmail',
    defaultTitle: 'Gmail Institutional Dispatcher',
    defaultUrl: 'quantum://workspace/gmail',
    iconName: 'Mail',
    badge: 'Gmail API v1',
    category: 'workspace',
    description: 'Send signed protocol certifications to hospital IRBs & health ministries'
  },
  {
    type: 'registry',
    defaultTitle: 'Global Researcher IAM Registry',
    defaultUrl: 'quantum://registry',
    iconName: 'Users',
    badge: 'Verified Nodes',
    category: 'governance',
    description: 'Directory of verified multi-institutional researchers & hospital nodes'
  },
  {
    type: 'billing',
    defaultTitle: 'Google Cloud Billing & Infrastructure Audit',
    defaultUrl: 'quantum://gcp-billing',
    iconName: 'Cloud',
    badge: 'Account 01B1F2',
    category: 'governance',
    description: 'Transparent real-time GCP billing telemetry & developer grant records'
  },
  {
    type: 'legal',
    defaultTitle: 'WIPO Patent Legal Certification',
    defaultUrl: 'quantum://wipo-patent-covenant',
    iconName: 'ShieldCheck',
    badge: 'PCT/NZ2025/000001',
    category: 'governance',
    description: 'Universal Open Access Covenant — Free for all humanity forever'
  },
  {
    type: 'export',
    defaultTitle: 'Export Sovereign Medical Dossier',
    defaultUrl: 'quantum://export-dossier',
    iconName: 'FileCheck2',
    badge: 'PDF / JSON / LaTeX',
    category: 'governance',
    description: 'Export verifiable multi-omics dossiers & clinical trial submissions'
  }
];

interface TabWorkspaceContextType {
  tabs: WorkspaceTab[];
  activeTabId: string;
  topZIndex: number;
  openTab: (tabType: TabType, params?: Record<string, any>, asFloating?: boolean) => string;
  closeTab: (tabId: string) => void;
  setActiveTabId: (tabId: string) => void;
  snapOutTab: (tabId: string) => void;
  dockTab: (tabId: string) => void;
  toggleMaximizeTab: (tabId: string) => void;
  toggleMinimizeTab: (tabId: string) => void;
  updateTabPosition: (tabId: string, position: { x: number; y: number }) => void;
  updateTabSize: (tabId: string, size: { width: number; height: number }) => void;
  bringToFront: (tabId: string) => void;
  navigateTabUrl: (tabId: string, newUrl: string) => void;
  duplicateTab: (tabId: string) => void;
  tileTabs: () => void;
  closeOtherTabs: (tabId: string) => void;
  closeAllTabs: () => void;
  activeTab: WorkspaceTab | undefined;
}

const TabWorkspaceContext = createContext<TabWorkspaceContextType | undefined>(undefined);

export const TabWorkspaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initial default tabs like a full-featured browser workspace
  const [tabs, setTabs] = useState<WorkspaceTab[]>([
    {
      id: 'tab-find-a-cure',
      tabType: 'find-a-cure',
      title: 'Find A Cure — Lumana AI',
      url: 'quantum://find-a-cure',
      iconName: 'HeartPulse',
      isSnappedOut: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 40, y: 80 },
      size: { width: 960, height: 680 },
      zIndex: 10
    },
    {
      id: 'tab-global-users-map',
      tabType: 'global-users-map',
      title: 'Live Global Users Map (@Google Maps)',
      url: 'quantum://global-users-map',
      iconName: 'Globe',
      isSnappedOut: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 80, y: 120 },
      size: { width: 1040, height: 720 },
      zIndex: 11
    },
    {
      id: 'tab-docking-simulator',
      tabType: 'docking',
      title: '3D Molecular Docking Simulator',
      url: 'quantum://docking',
      iconName: 'Atom',
      isSnappedOut: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 120, y: 160 },
      size: { width: 1000, height: 700 },
      zIndex: 12
    },
    {
      id: 'tab-live-chat',
      tabType: 'live-chat',
      title: 'Live Chat (@Google / @Microsoft)',
      url: 'quantum://live-chat',
      iconName: 'MessageSquare',
      isSnappedOut: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 160, y: 200 },
      size: { width: 920, height: 660 },
      zIndex: 13
    }
  ]);

  const [activeTabId, setActiveTabId] = useState<string>('tab-find-a-cure');
  const [topZIndex, setTopZIndex] = useState<number>(30);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const bringToFront = useCallback(
    (tabId: string) => {
      setTopZIndex((prev) => {
        const nextZ = prev + 1;
        setTabs((curr) =>
          curr.map((t) => (t.id === tabId ? { ...t, zIndex: nextZ } : t))
        );
        return nextZ;
      });
      setActiveTabId(tabId);
    },
    []
  );

  const openTab = useCallback(
    (tabType: TabType, params?: Record<string, any>, asFloating: boolean = false): string => {
      const catalogItem = TAB_CATALOG.find((c) => c.type === tabType) || TAB_CATALOG[0];
      const newId = `tab-${tabType}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;
      
      const newTab: WorkspaceTab = {
        id: newId,
        tabType,
        title: catalogItem.defaultTitle,
        url: catalogItem.defaultUrl,
        iconName: catalogItem.iconName,
        isSnappedOut: asFloating,
        isMinimized: false,
        isMaximized: false,
        position: {
          x: 40 + (tabs.length % 6) * 35,
          y: 80 + (tabs.length % 6) * 30
        },
        size: { width: 1020, height: 720 },
        zIndex: topZIndex + 1,
        params
      };

      setTopZIndex((prev) => prev + 1);
      setTabs((prev) => [...prev, newTab]);
      setActiveTabId(newId);
      return newId;
    },
    [tabs.length, topZIndex]
  );

  const closeTab = useCallback(
    (tabId: string) => {
      setTabs((prev) => {
        const remaining = prev.filter((t) => t.id !== tabId);
        if (remaining.length === 0) {
          // Keep at least one tab open
          const defaultTab: WorkspaceTab = {
            id: 'tab-find-a-cure',
            tabType: 'find-a-cure',
            title: 'Find A Cure — Lumana AI',
            url: 'quantum://find-a-cure',
            iconName: 'HeartPulse',
            isSnappedOut: false,
            isMinimized: false,
            isMaximized: false,
            position: { x: 40, y: 80 },
            size: { width: 960, height: 680 },
            zIndex: 10
          };
          setActiveTabId(defaultTab.id);
          return [defaultTab];
        }
        if (activeTabId === tabId) {
          const nextActive = remaining[remaining.length - 1];
          setActiveTabId(nextActive.id);
        }
        return remaining;
      });
    },
    [activeTabId]
  );

  const snapOutTab = useCallback((tabId: string) => {
    setTabs((prev) =>
      prev.map((t) =>
        t.id === tabId
          ? {
              ...t,
              isSnappedOut: true,
              isMinimized: false,
              isMaximized: false
            }
          : t
      )
    );
    bringToFront(tabId);
  }, [bringToFront]);

  const dockTab = useCallback((tabId: string) => {
    setTabs((prev) =>
      prev.map((t) =>
        t.id === tabId
          ? {
              ...t,
              isSnappedOut: false,
              isMinimized: false,
              isMaximized: false
            }
          : t
      )
    );
    setActiveTabId(tabId);
  }, []);

  const toggleMaximizeTab = useCallback((tabId: string) => {
    setTabs((prev) =>
      prev.map((t) =>
        t.id === tabId ? { ...t, isMaximized: !t.isMaximized, isMinimized: false } : t
      )
    );
    bringToFront(tabId);
  }, [bringToFront]);

  const toggleMinimizeTab = useCallback((tabId: string) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === tabId ? { ...t, isMinimized: !t.isMinimized } : t))
    );
  }, []);

  const updateTabPosition = useCallback(
    (tabId: string, position: { x: number; y: number }) => {
      setTabs((prev) =>
        prev.map((t) => (t.id === tabId ? { ...t, position } : t))
      );
    },
    []
  );

  const updateTabSize = useCallback(
    (tabId: string, size: { width: number; height: number }) => {
      setTabs((prev) =>
        prev.map((t) => (t.id === tabId ? { ...t, size } : t))
      );
    },
    []
  );

  const navigateTabUrl = useCallback((tabId: string, newUrl: string) => {
    // Try to resolve matching tab type from url
    const matched = TAB_CATALOG.find(
      (c) => c.defaultUrl.toLowerCase() === newUrl.toLowerCase() || newUrl.includes(c.type)
    );
    if (matched) {
      setTabs((prev) =>
        prev.map((t) =>
          t.id === tabId
            ? {
                ...t,
                tabType: matched.type,
                title: matched.defaultTitle,
                url: matched.defaultUrl,
                iconName: matched.iconName
              }
            : t
        )
      );
    } else {
      setTabs((prev) =>
        prev.map((t) => (t.id === tabId ? { ...t, url: newUrl } : t))
      );
    }
  }, []);

  const duplicateTab = useCallback(
    (tabId: string) => {
      const source = tabs.find((t) => t.id === tabId);
      if (source) {
        openTab(source.tabType, source.params, source.isSnappedOut);
      }
    },
    [tabs, openTab]
  );

  const tileTabs = useCallback(() => {
    // Snap out all tabs and arrange in a grid
    setTabs((prev) => {
      const count = prev.length;
      const cols = count > 2 ? 2 : count;
      const rows = Math.ceil(count / cols);
      const width = Math.floor((window.innerWidth - 80) / cols);
      const height = Math.floor((window.innerHeight - 200) / rows);

      return prev.map((t, index) => {
        const c = index % cols;
        const r = Math.floor(index / cols);
        return {
          ...t,
          isSnappedOut: true,
          isMinimized: false,
          isMaximized: false,
          position: { x: 30 + c * (width + 15), y: 120 + r * (height + 15) },
          size: { width: Math.max(width, 420), height: Math.max(height, 380) },
          zIndex: 10 + index
        };
      });
    });
  }, []);

  const closeOtherTabs = useCallback((tabId: string) => {
    setTabs((prev) => prev.filter((t) => t.id === tabId));
    setActiveTabId(tabId);
  }, []);

  const closeAllTabs = useCallback(() => {
    const defaultTab: WorkspaceTab = {
      id: 'tab-find-a-cure',
      tabType: 'find-a-cure',
      title: 'Find A Cure — Lumana AI',
      url: 'quantum://find-a-cure',
      iconName: 'HeartPulse',
      isSnappedOut: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 40, y: 80 },
      size: { width: 960, height: 680 },
      zIndex: 10
    };
    setTabs([defaultTab]);
    setActiveTabId(defaultTab.id);
  }, []);

  return (
    <TabWorkspaceContext.Provider
      value={{
        tabs,
        activeTabId,
        topZIndex,
        openTab,
        closeTab,
        setActiveTabId,
        snapOutTab,
        dockTab,
        toggleMaximizeTab,
        toggleMinimizeTab,
        updateTabPosition,
        updateTabSize,
        bringToFront,
        navigateTabUrl,
        duplicateTab,
        tileTabs,
        closeOtherTabs,
        closeAllTabs,
        activeTab
      }}
    >
      {children}
    </TabWorkspaceContext.Provider>
  );
};

export const useTabWorkspace = (): TabWorkspaceContextType => {
  const context = useContext(TabWorkspaceContext);
  if (!context) {
    throw new Error('useTabWorkspace must be used within a TabWorkspaceProvider');
  }
  return context;
};
