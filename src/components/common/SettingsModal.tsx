import React from 'react';
import { GameState } from '../../types/game';
import { sound } from '../../lib/soundEngine';
import { Settings2, Volume2, VolumeX, RotateCcw, HelpCircle, ShieldAlert, Sparkles } from 'lucide-react';

interface SettingsModalProps {
  state: GameState;
  onToggleSound: () => void;
  onOpenDecisionGame: () => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  state,
  onToggleSound,
  onOpenDecisionGame,
  onResetProgress,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn select-none">
      <div className="card-game w-full max-w-md p-6 relative border-4 border-slate-300 bg-white shadow-2xl text-slate-900">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 font-black text-xl w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
            ⚙️
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">Pengaturan Game</h3>
            <p className="text-xs font-semibold text-slate-500">
              Penjaga Bumi AI versi 1.0 (Ramah Anak)
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          {/* Sound toggle item */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {state.settings.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-rose-500" />
              )}
              <div>
                <h4 className="font-extrabold text-sm text-slate-800">Efek Suara Lembut</h4>
                <p className="text-[11px] font-semibold text-slate-500">Suara tombol & celeberasi</p>
              </div>
            </div>
            <button
              onClick={onToggleSound}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                state.settings.soundEnabled
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-300 text-slate-700'
              }`}
            >
              {state.settings.soundEnabled ? 'NYALA' : 'MATI'}
            </button>
          </div>

          {/* AI Decision Scenario button */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤔</span>
              <div>
                <h4 className="font-extrabold text-sm text-amber-950">Skenario Keputusan</h4>
                <p className="text-[11px] font-semibold text-amber-800">Latihan memecahkan masalah alam</p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenDecisionGame();
              }}
              className="btn-yellow px-3 py-1.5 text-xs font-black"
            >
              Mainkan
            </button>
          </div>

          {/* Reset progress */}
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-rose-600" />
              <div>
                <h4 className="font-extrabold text-sm text-rose-950">Mulai Petualangan Baru</h4>
                <p className="text-[11px] font-semibold text-rose-700">Atur ulang data profil</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (confirm('Mulai petualangan baru dari awal?')) {
                  onResetProgress();
                  onClose();
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs"
            >
              Reset
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow"
        >
          Selesai
        </button>
      </div>
    </div>
  );
};
