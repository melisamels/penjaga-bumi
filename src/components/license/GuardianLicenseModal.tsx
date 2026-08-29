import React, { useState } from 'react';
import { GameState } from '../../types/game';
import { GUARDIAN_TIERS, AVATARS } from '../../lib/missionData';
import { sound } from '../../lib/soundEngine';
import { Award, Star, CheckCircle2, Lock, Sparkles, Printer, X } from 'lucide-react';

interface GuardianLicenseModalProps {
  state: GameState;
  onClose: () => void;
}

export const GuardianLicenseModal: React.FC<GuardianLicenseModalProps> = ({
  state,
  onClose,
}) => {
  const completedCount = Object.keys(state.completedStages || {}).length;
  const currentTierInfo = GUARDIAN_TIERS.find(t => t.tierLevel === state.guardianTier) || GUARDIAN_TIERS[0];
  const playerAvatar = AVATARS.find(a => a.id === state.player?.avatarId) || AVATARS[0];

  const handlePrint = () => {
    sound.playPop();
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto select-none">
      <div className="card-game w-full max-w-2xl p-5 sm:p-8 relative border-4 border-amber-400 bg-gradient-to-b from-amber-50 via-white to-sky-50 shadow-2xl text-slate-900 my-6">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-black text-xl w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl shadow-md">
            📜
          </div>
          <div>
            <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Sistem Pangkat Bertingkat
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Lisensi Resmi Penjaga Bumi
            </h3>
          </div>
        </div>

        {/* Tier Progression Steps Bar */}
        <div className="bg-white/90 p-3 rounded-2xl border border-amber-200 mb-5">
          <div className="flex items-center justify-between text-xs font-black text-slate-700 mb-2">
            <span>Jenjang Pangkat Guardian:</span>
            <span className="text-amber-700 font-extrabold">{completedCount} Level Diselesaikan</span>
          </div>

          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {GUARDIAN_TIERS.map(tier => {
              const isAchieved = state.guardianTier >= tier.tierLevel;
              const isCurrent = state.guardianTier === tier.tierLevel;

              return (
                <div
                  key={tier.tierLevel}
                  className={`p-1.5 sm:p-2 rounded-xl text-center border transition-all ${
                    isCurrent
                      ? 'bg-amber-100 border-amber-500 shadow-sm ring-2 ring-amber-300'
                      : isAchieved
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 opacity-50'
                  }`}
                >
                  <div className="text-xl sm:text-2xl">{tier.badgeIcon}</div>
                  <span className="text-[9px] sm:text-[10px] font-black block truncate mt-0.5">
                    Tingkat {tier.tierLevel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Printable Certificate Diploma */}
        <div
          id="guardian-certificate"
          className="p-6 sm:p-8 rounded-3xl border-4 border-amber-500 bg-gradient-to-b from-amber-100/50 via-white to-amber-50/60 shadow-xl relative overflow-hidden text-center"
        >
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-9xl">
            🌍
          </div>

          {/* Ribbon */}
          <div className="inline-flex items-center gap-1.5 bg-amber-500 text-amber-950 font-black text-[11px] sm:text-xs px-4 py-1 rounded-full shadow-md mb-2 uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>ORGANISASI RAHASIA EARTH GUARDIAN</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1 font-serif">
            PIAGAM LISENSI PENJAGA BUMI
          </h2>

          <p className="text-xs text-slate-600 font-semibold mb-4">
            Diberikan dengan kehormatan tertinggi atas kepedulian dan aksi nyata menyelamatkan alam kepada:
          </p>

          {/* Child Name Callout */}
          <div className="bg-amber-100/90 py-2.5 px-6 rounded-2xl border-2 border-amber-300 inline-block shadow-inner mb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-amber-950 font-serif tracking-wide">
              {state.player?.name || 'Guardian Cilik'}
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 mb-4">
            <span className="text-xs font-bold text-slate-500">Ditetapkan Secara Sah Sebagai:</span>
            <div className="flex items-center gap-2 text-base sm:text-xl font-black text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-2xl border border-emerald-300">
              <span>{currentTierInfo.badgeIcon}</span>
              <span>{currentTierInfo.title}</span>
            </div>
            <p className="text-xs text-slate-600 font-bold max-w-md mt-1">
              {currentTierInfo.description}
            </p>
          </div>

          {/* Certificate Footer: BUMI Digital Seal & Signature */}
          <div className="flex items-center justify-between border-t-2 border-amber-200 pt-4 mt-2 text-left">
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl shadow-md">
                🤖
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Pemberi Lisensi:</span>
                <span className="text-xs font-black text-slate-800">BUMI AI Assistant</span>
              </div>
            </div>

            {/* Gold Seal Badge */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-400 border-2 border-white shadow-md flex items-center justify-center text-2xl animate-spin-slow">
                ⭐
              </div>
              <span className="text-[9px] font-black text-amber-900 mt-0.5 uppercase">Cap Sah Guardian</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 rounded-2xl font-black text-xs sm:text-sm bg-slate-200 hover:bg-slate-300 text-slate-800 flex items-center justify-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Piagam / Simpan</span>
          </button>

          <button
            onClick={onClose}
            className="btn-green flex-1 py-3 text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-lg"
          >
            <span>TUTUP & LANJUT PETUALANGAN</span>
          </button>
        </div>
      </div>
    </div>
  );
};
