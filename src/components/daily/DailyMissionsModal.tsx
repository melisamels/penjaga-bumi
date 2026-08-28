import React from 'react';
import { DailyMission, GameState } from '../../types/game';
import { sound } from '../../lib/soundEngine';
import { Sparkles, CheckCircle2, Gift, ArrowLeft } from 'lucide-react';

interface DailyMissionsModalProps {
  state: GameState;
  onClaim: (missionId: string) => void;
  onClose: () => void;
}

export const DailyMissionsModal: React.FC<DailyMissionsModalProps> = ({
  state,
  onClaim,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn select-none">
      <div className="card-game w-full max-w-lg p-6 relative border-4 border-amber-400 bg-gradient-to-b from-amber-50 to-white shadow-2xl text-slate-900">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 font-black text-xl w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl shadow-md">
            🌟
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Misi Harian Penjaga Bumi
            </h3>
            <p className="text-xs font-bold text-slate-600">
              Selesaikan tantangan harian untuk hadiah Eco Points & XP ekstra!
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {state.dailyMissions.map(m => {
            const isCompleted = m.completed || m.current >= m.target;

            return (
              <div
                key={m.id}
                className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <h4 className="font-extrabold text-sm text-slate-900">{m.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-black text-emerald-700">
                      +{m.rewardPoints} Eco Points 🌱
                    </span>
                    <span className="text-[11px] font-black text-amber-700">
                      +{m.rewardXp} XP 🌟
                    </span>
                  </div>
                </div>

                <div>
                  {m.claimed ? (
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Diklaim
                    </span>
                  ) : isCompleted ? (
                    <button
                      onClick={() => onClaim(m.id)}
                      className="btn-yellow px-3 py-1.5 text-xs font-black flex items-center gap-1 shadow-md animate-bounce"
                    >
                      <Gift className="w-4 h-4" />
                      <span>Klaim Hadiah</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-xl">
                      Sedang Aktif
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="btn-green w-full py-3 text-sm font-black"
        >
          Tutup & Lanjutkan Petualangan! 🚀
        </button>
      </div>
    </div>
  );
};
