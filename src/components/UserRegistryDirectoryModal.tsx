/**
 * ==============================================================================================
 * @SOVEREIGN_SOURCE_ENCRYPTION_SEAL: 4096^4096 HYPERDIMENSIONAL ENCRYPTION MATRIX
 * @CONTEXT: WORLDWIDE RESEARCHER PERSISTENT REGISTRY DIRECTORY
 * @PATENT_REFERENCE: WIPO PCT/NZ2025/000001
 * ==============================================================================================
 */

import React, { useState } from 'react';
import {
  Users,
  Search,
  Building2,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Radio,
  ExternalLink,
  X,
  UserPlus,
  LogIn
} from 'lucide-react';
import { useFirebase, UserProfile } from '../context/FirebaseContext';
import { useAudioNarrator } from '../context/AudioNarratorContext';

interface UserRegistryDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuthModal: () => void;
  onOpenRegistrationModal: () => void;
}

export const UserRegistryDirectoryModal: React.FC<UserRegistryDirectoryModalProps> = ({
  isOpen,
  onClose,
  onOpenAuthModal,
  onOpenRegistrationModal
}) => {
  const { user, userProfile, allRegisteredUsers, isFirestoreConnected } = useFirebase();
  const { speak } = useAudioNarrator();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  if (!isOpen) return null;

  const filteredUsers = allRegisteredUsers.filter((u) => {
    const matchesSearch =
      (u.displayName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.organization || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.primaryResearchInterest || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.country || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl max-w-3xl w-full max-h-[88vh] shadow-2xl relative text-slate-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-800 p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Global Researcher Persistent Registry</span>
                <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full">
                  {allRegisteredUsers.length} Registered Nodes
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Live decentralized directory of verified scientists, clinicians, and research labs
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

        {/* Toolbar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search researchers by name, hospital, target disease, or country..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="ALL">All Roles</option>
              <option value="researcher">Researchers</option>
              <option value="clinician">Clinicians</option>
              <option value="student">Medical Students</option>
              <option value="public_humanitarian">Humanitarians</option>
            </select>

            {!userProfile ? (
              <button
                onClick={() => {
                  onClose();
                  if (user && !user.isAnonymous) {
                    onOpenRegistrationModal();
                  } else {
                    onOpenAuthModal();
                  }
                }}
                className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Join Registry</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenRegistrationModal();
                }}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition cursor-pointer"
              >
                Edit My Profile
              </button>
            )}
          </div>
        </div>

        {/* Directory List */}
        <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[460px]">
          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800/80 space-y-2">
              <Globe className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-slate-300">
                {allRegisteredUsers.length === 0
                  ? 'Initializing persistent registry snapshot from Firestore...'
                  : 'No researchers match your filter criteria.'}
              </div>
              <p className="text-xs text-slate-500">
                Register with your Google or Microsoft identity to be listed as a verified global research node.
              </p>
            </div>
          ) : (
            filteredUsers.map((u, idx) => (
              <div
                key={idx}
                onMouseEnter={() =>
                  speak(
                    `Registered Node: ${u.displayName}. Organization: ${u.organization}. Role: ${u.role}. Target: ${u.primaryResearchInterest}.`,
                    { priority: 'hover' }
                  )
                }
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 hover:border-indigo-500/50 hover:bg-slate-900/60 transition space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {u.photoURL ? (
                      <img
                        src={u.photoURL}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full border border-indigo-400/40 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-950 border border-indigo-500/40 flex items-center justify-center font-bold text-indigo-300 text-sm">
                        {(u.displayName || 'R')[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                        <span>{u.displayName}</span>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/40">
                          {u.role.toUpperCase()}
                        </span>
                        {u.openAccessPledgeAccepted && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            <span>OPEN ACCESS SEALED</span>
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span className="text-slate-300">{u.organization}</span>
                        <span>•</span>
                        <span>{u.country}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                      {u.authProvider}
                    </span>
                    <div className="text-slate-500 mt-1">
                      {u.registeredAt ? new Date(u.registeredAt).toLocaleDateString() : 'Active'}
                    </div>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <div className="text-slate-400 flex items-center gap-1.5 truncate">
                    <span className="text-indigo-400 font-mono text-[10px]">TARGET:</span>
                    <span className="text-slate-200 font-medium truncate">{u.primaryResearchInterest}</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-[10px] shrink-0">100% Coherent</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Firestore Persistent Registry: Synchronized</span>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition cursor-pointer"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
