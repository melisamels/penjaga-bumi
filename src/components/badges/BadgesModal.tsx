import React from 'react';
import { BADGES } from '../../lib/missionData';
import { GameState } from '../../types/game';
import { sound } from '../../lib/soundEngine';
import { Award, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';

interface BadgesModalProps {
  state: GameState;
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ state, onClose }) => {
  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col p-4 sm:p-6 bg-gradient-to-b from-purple-100 via-pink-50 to-amber-50 select-none">
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-3 mb-4">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border-2 border-purple-400 flex items-center gap-3">
          <Award className="w-6 h-6 text-purple-600" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Prestasi & Lencana Guardian
            </h2>
            <p className="text-xs font-bold text-slate-600">
              Koleksi medali penghargaan atas jasamu menyelamatkan bumi!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-white transition shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>
      </div>

      {/* Badges Grid */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {BADGES.map(badge => {
          const isUnlocked = state.badges.includes(badge.id);

          return (
            <div
              key={badge.id}
              className={`card-game p-5 flex flex-col items-center text-center transition-all ${
                isUnlocked
                  ? 'border-3 border-amber-400 bg-gradient-to-b from-amber-50 to-white shadow-xl hover:scale-102'
                  : 'border-2 border-slate-200 bg-slate-50/70 opacity-60'
              }`}
            >
              {/* Badge Icon */}
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-3 shadow-md ${
                  isUnlocked
                    ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 ring-4 ring-amber-200 animate-bob'
                    : 'bg-slate-300 text-slate-500'
                }`}
              >
                {isUnlocked ? badge.icon : <Lock className="w-8 h-8 text-slate-500" />}
              </div>

              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  {badge.title}
                </h3>
                {isUnlocked && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              </div>

              <p className="text-xs font-bold text-slate-600 mb-3 leading-relaxed">
                {badge.description}
              </p>

              <span
                className={`mt-auto text-[11px] font-black px-3 py-1 rounded-full ${
                  isUnlocked
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isUnlocked ? '✨ SUDAH DIDAPATKAN' : '🔒 TERKUNCI'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
