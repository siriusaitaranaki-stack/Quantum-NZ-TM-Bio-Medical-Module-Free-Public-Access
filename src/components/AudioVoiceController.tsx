/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @VOICE_CONTROLLER: CALM SCIENTIFIC FEMALE NARRATOR & SUBTITLE DISPLAY
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import React, { useState } from 'react';
import { useAudioNarrator } from '../context/AudioNarratorContext';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Settings,
  Square,
  ChevronUp,
  ChevronDown,
  Captions,
  Radio,
  Sliders,
  Play,
  RotateCcw
} from 'lucide-react';

export const AudioVoiceController: React.FC = () => {
  const {
    isEnabled,
    toggleEnabled,
    isSpeaking,
    currentSpeechText,
    subtitlesEnabled,
    setSubtitlesEnabled,
    voiceVolume,
    setVoiceVolume,
    voiceRate,
    setVoiceRate,
    voicePitch,
    setVoicePitch,
    availableVoices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    stopSpeaking,
    speak
  } = useAudioNarrator();

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const testVoiceSample = () => {
    speak(
      'Welcome to the Quantum-NZ Sovereign Medical Simulation Suite. Mouse over any disease target, molecular formula, or standing wave equation to hear an in-depth scientific explanation in real time.',
      { priority: 'high', cancelPrevious: true }
    );
  };

  return (
    <>
      {/* Floating Audio Controller Bar (Bottom Right) */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 text-xs font-sans">
        
        {/* Expanded Settings Panel */}
        {isSettingsOpen && (
          <div className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-4 shadow-2xl shadow-cyan-950/60 w-80 space-y-3.5 text-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-slate-100 uppercase tracking-wider text-[11px]">
                  Voice Engine Parameters
                </span>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Voice Model Selection */}
            <div className="space-y-1">
              <label className="block text-[10px] text-slate-400 font-semibold uppercase">
                Narrator Voice Profile
              </label>
              <select
                value={selectedVoiceURI}
                onChange={(e) => setSelectedVoiceURI(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-medium focus:outline-none focus:border-cyan-500 truncate"
              >
                {availableVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Speed / Rate Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Speech Cadence (Rate)</span>
                <span className="font-mono text-cyan-300 font-bold">{voiceRate.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.3"
                step="0.05"
                value={voiceRate}
                onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Pitch Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Tone & Pitch</span>
                <span className="font-mono text-cyan-300 font-bold">{voicePitch.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.3"
                step="0.05"
                value={voicePitch}
                onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Volume Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Narration Volume</span>
                <span className="font-mono text-cyan-300 font-bold">{Math.round(voiceVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={voiceVolume}
                onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Subtitles Toggle */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-[11px] text-slate-300 flex items-center gap-1.5">
                <Captions className="w-3.5 h-3.5 text-slate-400" />
                Live Screen Subtitles
              </span>
              <button
                onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                  subtitlesEnabled
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {subtitlesEnabled ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>

            {/* Test Sample Button */}
            <button
              onClick={testVoiceSample}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-semibold transition border border-slate-700 cursor-pointer"
            >
              <Play className="w-3 h-3" />
              <span>Test Audio Sample</span>
            </button>
          </div>
        )}

        {/* Compact Floating Audio Dock */}
        <div className="flex items-center gap-2 bg-slate-900/95 backdrop-blur-md border border-slate-700 hover:border-cyan-500/50 p-1.5 pl-3 rounded-2xl shadow-xl shadow-slate-950/80 transition-all">
          
          {/* Audio Indicator & Waveform */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleEnabled}
              title={isEnabled ? 'Mute Audio Narration' : 'Enable Calm Educated Female Voice'}
              className={`p-2 rounded-xl transition cursor-pointer ${
                isEnabled
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <div className="flex flex-col cursor-pointer" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[11px] text-white">
                  {isEnabled ? 'Voice Assistant' : 'Audio Muted'}
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-semibold uppercase">
                  Calm Female
                </span>
              </div>
              <span className="text-[10px] text-slate-400">
                {isSpeaking ? 'Reading Hover Text...' : isEnabled ? 'Hover over cures to hear' : 'Click to enable voice'}
              </span>
            </div>
          </div>

          {/* Animated Waveform Indicator */}
          {isEnabled && isSpeaking && (
            <div className="flex items-center gap-0.5 px-2">
              <span className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-5 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="w-1 h-4 bg-cyan-200 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
            </div>
          )}

          {/* Stop / Silence button */}
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              title="Stop Current Speech"
              className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/40 transition cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-red-300" />
            </button>
          )}

          {/* Settings Trigger */}
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            title="Audio Voice Settings"
            className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtitles Bar (Appears at bottom center when speaking) */}
      {isEnabled && subtitlesEnabled && isSpeaking && currentSpeechText && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[90%] pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 rounded-2xl px-5 py-2.5 shadow-2xl text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
                SiriusVoice AI • Calm Educated Female Narration
              </span>
            </div>
            <p className="text-xs text-slate-100 font-medium leading-relaxed">
              &ldquo;{currentSpeechText}&rdquo;
            </p>
          </div>
        </div>
      )}
    </>
  );
};
