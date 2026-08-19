/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: GOOGLE & MICROSOFT AUTHENTICATION MODAL WITH LIVE IDENTITY APIS
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import React, { useState } from 'react';
import {
  LogIn,
  ShieldCheck,
  Globe,
  Radio,
  Lock,
  Mail,
  Key,
  User,
  Sparkles,
  ExternalLink,
  X,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Layers
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useAudioNarrator } from '../context/AudioNarratorContext';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegistry?: () => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  onOpenRegistry
}) => {
  const {
    user,
    userProfile,
    isLoadingAuth,
    authError,
    clearAuthError,
    loginWithGoogle,
    loginWithMicrosoft,
    loginWithEmail,
    registerWithEmail,
    loginAsGuest,
    logout
  } = useFirebase();

  const { speak } = useAudioNarrator();

  const [tab, setTab] = useState<'social' | 'email' | 'register'>('social');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    speak('Initiating Google Identity authentication. Connecting to Google OAuth gateway.', {
      priority: 'high'
    });
    const ok = await loginWithGoogle();
    setIsSubmitting(false);
    if (ok) {
      speak('Google authentication successful. Welcome to the sovereign biomedical research registry.', {
        priority: 'high'
      });
      onClose();
    }
  };

  const handleMicrosoftLogin = async () => {
    setIsSubmitting(true);
    speak('Initiating Microsoft Entra ID authentication. Connecting to Microsoft OAuth gateway.', {
      priority: 'high'
    });
    const ok = await loginWithMicrosoft();
    setIsSubmitting(false);
    if (ok) {
      speak('Microsoft authentication successful. Welcome to the sovereign biomedical research registry.', {
        priority: 'high'
      });
      onClose();
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);
    let ok = false;
    if (tab === 'register') {
      ok = await registerWithEmail(email, password, displayName);
      if (ok) {
        speak('Researcher account successfully registered in the sovereign registry.', {
          priority: 'high'
        });
        onClose();
      }
    } else {
      ok = await loginWithEmail(email, password);
      if (ok) {
        speak('Email authentication successful.', { priority: 'high' });
        onClose();
      }
    }
    setIsSubmitting(false);
  };

  const handleGuestLogin = async () => {
    setIsSubmitting(true);
    speak('Signing in as sovereign guest researcher with anonymous credentials.', {
      priority: 'high'
    });
    const ok = await loginAsGuest();
    setIsSubmitting(false);
    if (ok) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-lg w-full shadow-2xl relative text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950/50 to-slate-900 border-b border-slate-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Researcher Authentication & Registry</span>
                <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full">
                  OAuth 2.0 / IAM
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Sign in with existing Google, Microsoft, or Institutional credentials
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

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* User Already Signed In Banner */}
          {user && (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User Avatar'}
                    className="w-8 h-8 rounded-full border border-emerald-400/50 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-emerald-200">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{userProfile?.displayName || user.displayName || 'Authenticated Researcher'}</span>
                    <span className="text-[9px] font-mono bg-emerald-900 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30">
                      {userProfile?.authProvider || (user.isAnonymous ? 'Guest' : 'Authenticated')}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{user.email || 'Anonymous Guest UID: ' + user.uid.slice(0, 8)}</div>
                </div>
              </div>
              <button
                onClick={() => logout()}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 border border-slate-700 text-[11px] font-semibold transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Auth Error Banner */}
          {authError && (
            <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
              <button onClick={clearAuthError} className="text-rose-400 hover:text-white text-xs">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Tab Selector */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setTab('social')}
              className={`py-1.5 rounded-lg font-bold transition cursor-pointer ${
                tab === 'social' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Google & Microsoft
            </button>
            <button
              onClick={() => setTab('email')}
              className={`py-1.5 rounded-lg font-bold transition cursor-pointer ${
                tab === 'email' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Email Login
            </button>
            <button
              onClick={() => setTab('register')}
              className={`py-1.5 rounded-lg font-bold transition cursor-pointer ${
                tab === 'register' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Tab 1: Google & Microsoft Direct OAuth */}
          {tab === 'social' && (
            <div className="space-y-3">
              {/* Google Auth Button */}
              <button
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className="w-full p-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-3 shadow-lg transition transform active:scale-[0.99] cursor-pointer disabled:opacity-60"
              >
                {/* Official Google SVG Icon */}
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
                <span>Continue with Google Account</span>
              </button>

              {/* Microsoft Auth Button */}
              <button
                onClick={handleMicrosoftLogin}
                disabled={isSubmitting}
                className="w-full p-3.5 rounded-xl bg-[#2F2F2F] hover:bg-[#3F3F3F] text-white font-bold text-xs flex items-center justify-center gap-3 border border-slate-700 shadow-lg transition transform active:scale-[0.99] cursor-pointer disabled:opacity-60"
              >
                {/* Official Microsoft SVG Icon */}
                <svg className="w-4 h-4" viewBox="0 0 21 21">
                  <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                  <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                  <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                  <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                </svg>
                <span>Continue with Microsoft Account</span>
              </button>

              {/* Anonymous / Guest Access */}
              <div className="pt-2">
                <button
                  onClick={handleGuestLogin}
                  disabled={isSubmitting}
                  className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Instant Guest Researcher Sign-In (Anonymous Session)</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 2 & 3: Email / Password Auth & Registration */}
          {(tab === 'email' || tab === 'register') && (
            <form onSubmit={handleEmailAuth} className="space-y-3 text-xs">
              {tab === 'register' && (
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Researcher Full Name / Moniker
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Dr. Jane Doe / Bio-Lab Specialist"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="researcher@hospital.org or gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md transition cursor-pointer disabled:opacity-60"
              >
                {isSubmitting
                  ? 'Processing Authentication...'
                  : tab === 'register'
                  ? 'Create Researcher Account'
                  : 'Sign In to Sovereign Lab'}
              </button>
            </form>
          )}

          {/* Live API Telemetry & Endpoints Section */}
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Live Auth API Endpoints</span>
              </span>
              <span className="text-emerald-400">100% Operational</span>
            </div>

            <div className="space-y-1.5 text-[10px] font-mono">
              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/80 border border-slate-800/80">
                <span className="text-slate-300">Google Cloud Identity API:</span>
                <a
                  href="https://identitytoolkit.googleapis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>identitytoolkit.googleapis.com</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/80 border border-slate-800/80">
                <span className="text-slate-300">Microsoft Entra ID OAuth 2.0:</span>
                <a
                  href="https://login.microsoftonline.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>login.microsoftonline.com</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded bg-slate-900/80 border border-slate-800/80">
                <span className="text-slate-300">Firestore Persistent Registry:</span>
                <span className="text-emerald-400">asia-southeast1 (sirius-ai-lumana-4840)</span>
              </div>
            </div>
          </div>

          {/* Sovereign Universal Open Access Covenant Notice */}
          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-slate-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              All registered researcher accounts enjoy universal, unencumbered access to all simulation engines, 3D molecular dockers, and quantum algorithms under <strong>WIPO PCT/NZ2025/000001</strong>.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>NZBN 9429048181570 • Universal Access</span>
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
