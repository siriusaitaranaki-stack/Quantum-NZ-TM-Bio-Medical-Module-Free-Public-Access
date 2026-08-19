/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @VOICE_SYSTEM: CALM EDUCATED FEMALE NARRATOR & SCIENTIFIC SCREEN READER
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001 (Universal Open Access Covenant)
 * ==============================================================================================
 */

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { DiseaseCure } from '../types/biomedical';

interface AudioNarratorContextType {
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
  toggleEnabled: () => void;
  isSpeaking: boolean;
  currentSpeechText: string;
  subtitlesEnabled: boolean;
  setSubtitlesEnabled: (enabled: boolean) => void;
  voiceVolume: number;
  setVoiceVolume: (volume: number) => void;
  voiceRate: number;
  setVoiceRate: (rate: number) => void;
  voicePitch: number;
  setVoicePitch: (pitch: number) => void;
  availableVoices: SpeechSynthesisVoice[];
  selectedVoiceURI: string;
  setSelectedVoiceURI: (uri: string) => void;
  speak: (text: string, options?: { priority?: 'high' | 'normal' | 'hover'; cancelPrevious?: boolean }) => void;
  speakDetailedCure: (cure: DiseaseCure) => void;
  stopSpeaking: () => void;
}

const AudioNarratorContext = createContext<AudioNarratorContextType | null>(null);

export const AudioNarratorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentSpeechText, setCurrentSpeechText] = useState<string>('');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState<boolean>(true);
  const [voiceVolume, setVoiceVolume] = useState<number>(0.9);
  const [voiceRate, setVoiceRate] = useState<number>(0.95); // Slightly slower for clear, educated cadence
  const [voicePitch, setVoicePitch] = useState<number>(1.05); // Natural gentle tone
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');

  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSpokenTextRef = useRef<string>('');
  const synthRef = useRef<SpeechSynthesis | null>(typeof window !== 'undefined' ? window.speechSynthesis : null);

  // Load available speech synthesis voices and find best calm educated female voice
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);

        // Find preferred educated female voice
        const preferredFemaleVoices = voices.filter((v) => {
          const name = v.name.toLowerCase();
          const lang = v.lang.toLowerCase();
          return (
            (name.includes('female') ||
              name.includes('samantha') ||
              name.includes('victoria') ||
              name.includes('karen') ||
              name.includes('zira') ||
              name.includes('natural') ||
              name.includes('sonia') ||
              name.includes('libby') ||
              name.includes('jenny') ||
              name.includes('aria') ||
              name.includes('moira') ||
              name.includes('fiona') ||
              name.includes('google uk english female') ||
              name.includes('google us english')) &&
            lang.startsWith('en')
          );
        });

        if (preferredFemaleVoices.length > 0) {
          // Prefer natural / high quality online voice if present
          const naturalVoice = preferredFemaleVoices.find(
            (v) => v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Google')
          );
          setSelectedVoiceURI((naturalVoice || preferredFemaleVoices[0]).voiceURI);
        } else {
          // Default fallback English voice
          const enVoice = voices.find((v) => v.lang.startsWith('en')) || voices[0];
          if (enVoice) setSelectedVoiceURI(enVoice.voiceURI);
        }
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const stopSpeaking = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
    setCurrentSpeechText('');
  }, []);

  const speak = useCallback(
    (text: string, options: { priority?: 'high' | 'normal' | 'hover'; cancelPrevious?: boolean } = {}) => {
      if (!isEnabled || !synthRef.current || !text || text.trim() === '') return;

      const { priority = 'normal', cancelPrevious = true } = options;

      // Filter out raw markdown symbols and code tags for crystal-clear natural speech
      const cleanText = text
        .replace(/[*_~`#|]/g, '')
        .replace(/\$\$.*?\$\$/g, 'mathematical standing wave operator')
        .replace(/\$.*?\$/g, '')
        .replace(/https?:\/\/[^\s]+/g, '')
        .replace(/Ψ/g, 'Psi')
        .replace(/ω/g, 'omega')
        .replace(/ΔG/g, 'delta G binding energy')
        .replace(/t₀/g, 't zero')
        .replace(/Θ/g, 'theta')
        .replace(/\s+/g, ' ')
        .trim();

      // Avoid repeating exact same hover phrase instantly
      if (priority === 'hover' && lastSpokenTextRef.current === cleanText && isSpeaking) {
        return;
      }

      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }

      const executeSpeech = () => {
        if (cancelPrevious) {
          synthRef.current?.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.volume = voiceVolume;
        utterance.rate = voiceRate;
        utterance.pitch = voicePitch;

        if (availableVoices.length > 0) {
          const matchedVoice = availableVoices.find((v) => v.voiceURI === selectedVoiceURI);
          if (matchedVoice) {
            utterance.voice = matchedVoice;
          }
        }

        utterance.onstart = () => {
          setIsSpeaking(true);
          setCurrentSpeechText(cleanText);
          lastSpokenTextRef.current = cleanText;
        };

        utterance.onend = () => {
          setIsSpeaking(false);
          setCurrentSpeechText('');
        };

        utterance.onerror = () => {
          setIsSpeaking(false);
          setCurrentSpeechText('');
        };

        synthRef.current?.speak(utterance);
      };

      // Debounce hover events by 180ms to provide a smooth, calm browsing experience
      if (priority === 'hover') {
        hoverTimerRef.current = setTimeout(executeSpeech, 180);
      } else {
        executeSpeech();
      }
    },
    [isEnabled, voiceVolume, voiceRate, voicePitch, availableVoices, selectedVoiceURI, isSpeaking]
  );

  const speakDetailedCure = useCallback(
    (cure: DiseaseCure) => {
      if (!isEnabled) return;

      const compoundsSummary = cure.activeCompounds
        .map((c, idx) => `Compound ${idx + 1}: ${c.name}, ${c.mechanism}`)
        .join('. ');

      const narrative = `Protocol for ${cure.diseaseName}: ${cure.cureName}. ` +
        `This protocol operates under standing wave harmonic frequency omega equals ${cure.standingWaveFrequency.replace(/[\^×]/g, ' times 10 to the ')}, achieving 100 percent deterministic quantum coherence. ` +
        `Active biochemical formulations include: ${compoundsSummary}. ` +
        `Formulated inside a ${cure.deliverySystem?.vehicle || 'targeted lipid nanoparticle'} with a particle diameter of ${cure.deliverySystem?.particleSizeNm || '40'} nanometers. ` +
        `Administered via ${cure.clinicalProtocol?.dosage || 'standard clinical protocol'} with an infusion time of ${cure.clinicalProtocol?.infusionTime || '45 minutes'}. ` +
        `Released royalty-free under the Universal Humanitarian Covenant.`;

      speak(narrative, { priority: 'high', cancelPrevious: true });
    },
    [isEnabled, speak]
  );

  const toggleEnabled = () => {
    if (isEnabled) {
      stopSpeaking();
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
      speak('Voice narration activated in calm educated female tone.', { priority: 'high' });
    }
  };

  return (
    <AudioNarratorContext.Provider
      value={{
        isEnabled,
        setIsEnabled,
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
        speak,
        speakDetailedCure,
        stopSpeaking
      }}
    >
      {children}
    </AudioNarratorContext.Provider>
  );
};

export const useAudioNarrator = () => {
  const context = useContext(AudioNarratorContext);
  if (!context) {
    throw new Error('useAudioNarrator must be used within an AudioNarratorProvider');
  }
  return context;
};
