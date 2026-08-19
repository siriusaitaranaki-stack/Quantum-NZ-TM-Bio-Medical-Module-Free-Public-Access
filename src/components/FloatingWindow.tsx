/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @AUTHENTICATION_KEY_SPACE: 2^49152 BITS [IRREVERSIBLE CRYPTOGRAPHIC IMMUTABILITY]
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001 (Universal Open Access Covenant Free For Humanity Forever)
 * @CONTEXT: FIREFOX-STYLE SNAP-OUT DRAGGABLE & 8-WAY RESIZABLE FLOATING WINDOW
 * ==============================================================================================
 */

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import {
  Minus,
  Square,
  Copy,
  X,
  Pin,
  Move,
  Maximize2,
  Minimize2,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { WorkspaceTab, useTabWorkspace } from '../context/TabWorkspaceContext';
import { useAudioNarrator } from '../context/AudioNarratorContext';

interface FloatingWindowProps {
  tab: WorkspaceTab;
  children: ReactNode;
}

type ResizeDirection =
  | 'n'
  | 's'
  | 'e'
  | 'w'
  | 'ne'
  | 'nw'
  | 'se'
  | 'sw'
  | null;

export const FloatingWindow: React.FC<FloatingWindowProps> = ({ tab, children }) => {
  const {
    dockTab,
    closeTab,
    toggleMaximizeTab,
    toggleMinimizeTab,
    updateTabPosition,
    updateTabSize,
    bringToFront
  } = useTabWorkspace();

  const { speak } = useAudioNarrator();

  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [resizingDir, setResizingDir] = useState<ResizeDirection>(null);
  const [resizeStart, setResizeStart] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
    left: number;
    top: number;
  }>({ x: 0, y: 0, w: 0, h: 0, left: 0, top: 0 });

  // Handle Dragging
  const handleMouseDownHeader = (e: React.MouseEvent) => {
    if (tab.isMaximized) return;
    // Don't drag if clicking interactive elements inside header
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input')) {
      return;
    }
    bringToFront(tab.id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - tab.position.x,
      y: e.clientY - tab.position.y
    });
  };

  // Handle Resize Start
  const handleMouseDownResize = (e: React.MouseEvent, dir: ResizeDirection) => {
    e.stopPropagation();
    e.preventDefault();
    if (tab.isMaximized) return;
    bringToFront(tab.id);
    setResizingDir(dir);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      w: tab.size.width,
      h: tab.size.height,
      left: tab.position.x,
      top: tab.position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const nextX = Math.max(10, Math.min(window.innerWidth - 100, e.clientX - dragOffset.x));
        const nextY = Math.max(10, Math.min(window.innerHeight - 80, e.clientY - dragOffset.y));
        updateTabPosition(tab.id, { x: nextX, y: nextY });
      } else if (resizingDir) {
        const dx = e.clientX - resizeStart.x;
        const dy = e.clientY - resizeStart.y;

        let newW = resizeStart.w;
        let newH = resizeStart.h;
        let newX = resizeStart.left;
        let newY = resizeStart.top;

        const MIN_W = 380;
        const MIN_H = 260;

        // Horizontal resizing
        if (resizingDir.includes('e')) {
          newW = Math.max(MIN_W, resizeStart.w + dx);
        }
        if (resizingDir.includes('w')) {
          const potentialW = resizeStart.w - dx;
          if (potentialW >= MIN_W) {
            newW = potentialW;
            newX = resizeStart.left + dx;
          }
        }

        // Vertical resizing
        if (resizingDir.includes('s')) {
          newH = Math.max(MIN_H, resizeStart.h + dy);
        }
        if (resizingDir.includes('n')) {
          const potentialH = resizeStart.h - dy;
          if (potentialH >= MIN_H) {
            newH = potentialH;
            newY = resizeStart.top + dy;
          }
        }

        updateTabSize(tab.id, { width: newW, height: newH });
        updateTabPosition(tab.id, { x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
      if (resizingDir) setResizingDir(null);
    };

    if (isDragging || resizingDir) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    isDragging,
    resizingDir,
    dragOffset,
    resizeStart,
    tab.id,
    updateTabPosition,
    updateTabSize
  ]);

  if (tab.isMinimized) {
    return null; // Rendered in minimized dock bar
  }

  const windowStyle: React.CSSProperties = tab.isMaximized
    ? {
        position: 'fixed',
        top: '60px',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: 'calc(100vh - 60px)',
        zIndex: tab.zIndex
      }
    : {
        position: 'fixed',
        top: `${tab.position.y}px`,
        left: `${tab.position.x}px`,
        width: `${tab.size.width}px`,
        height: `${tab.size.height}px`,
        zIndex: tab.zIndex
      };

  return (
    <div
      ref={windowRef}
      style={windowStyle}
      onClick={() => bringToFront(tab.id)}
      className={`flex flex-col bg-slate-900 border-2 border-blue-500/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl transition-shadow ${
        isDragging ? 'opacity-90 ring-4 ring-cyan-500/40 cursor-grabbing' : 'hover:border-cyan-400'
      }`}
    >
      {/* Firefox-style Window Header Bar */}
      <div
        onMouseDown={handleMouseDownHeader}
        className="px-4 py-2.5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b border-blue-500/40 flex items-center justify-between gap-3 select-none cursor-grab active:cursor-grabbing shrink-0"
      >
        {/* Left: Window Icon, Title, & URL indicator */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 shrink-0">
            <Move className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate flex items-center gap-2">
              <span>{tab.title}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Detached Window
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate">{tab.url}</div>
          </div>
        </div>

        {/* Right: Window Controls (Dock, Minimize, Maximize, Close) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Dock back into Firefox Top Tab Bar */}
          <button
            onClick={() => {
              dockTab(tab.id);
              speak(`Docked ${tab.title} back into top tab strip.`, { priority: 'low' });
            }}
            title="Snap back into Top Tab Strip"
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer border border-slate-700"
          >
            <Pin className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Dock Tab</span>
          </button>

          {/* Minimize Window */}
          <button
            onClick={() => {
              toggleMinimizeTab(tab.id);
              speak(`Minimized ${tab.title}.`, { priority: 'low' });
            }}
            title="Minimize"
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={() => {
              toggleMaximizeTab(tab.id);
              speak(tab.isMaximized ? 'Restored window.' : 'Maximized window.', { priority: 'low' });
            }}
            title={tab.isMaximized ? 'Restore' : 'Maximize'}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            {tab.isMaximized ? (
              <Minimize2 className="w-3.5 h-3.5 text-blue-300" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-blue-300" />
            )}
          </button>

          {/* Close Window */}
          <button
            onClick={() => closeTab(tab.id)}
            title="Close"
            className="p-1.5 rounded-lg hover:bg-rose-600/80 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Window Body with Scrollable Child Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950">
        {children}
      </div>

      {/* 8-Direction Resizing Handles (Active only when not maximized) */}
      {!tab.isMaximized && (
        <>
          {/* Top edge */}
          <div
            onMouseDown={(e) => handleMouseDownResize(e, 'n')}
            className="absolute top-0 left-3 right-3 h-2 cursor-n-resize hover:bg-cyan-500/30 transition"
          />
          {/* Bottom edge */}
          <div
            onMouseDown={(e) => handleMouseDownResize(e, 's')}
            className="absolute bottom-0 left-3 right-3 h-2 cursor-s-resize hover:bg-cyan-500/30 transition"
          />
          {/* Left edge */}
          <div
            onMouseDown={(e) => handleMouseDownResize(e, 'w')}
            className="absolute top-3 bottom-3 left-0 w-2 cursor-w-resize hover:bg-cyan-500/30 transition"
          />
          {/* Right edge */}
          <div
            onMouseDown={(e) => handleMouseDownResize(e, 'e')}
            className="absolute top-3 bottom-3 right-0 w-2 cursor-e-resize hover:bg-cyan-500/30 transition"
          />
          {/* Top-Left corner */}
          <div
            onMouseDown={(e) => handleMouseDownResize(e, 'nw')}
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize hover:bg-cyan-400 transition rounded-tl-xl z-20"
          />
          {/* Top-Right corner */}
          <div
            onMouseDown={(e) => handleMouseDownResize(e, 'ne')}
            className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize hover:bg-cyan-400 transition rounded-tr-xl z-20"
          />
          {/* Bottom-Left corner */}
          <div
            onMouseDown={(e) => handleMouseDownResize(e, 'sw')}
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize hover:bg-cyan-400 transition rounded-bl-xl z-20"
          />
          {/* Bottom-Right corner */}
          <div
            onMouseDown={(e) => handleMouseDownResize(e, 'se')}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize hover:bg-cyan-400 transition rounded-br-xl z-20"
          />
        </>
      )}
    </div>
  );
};
