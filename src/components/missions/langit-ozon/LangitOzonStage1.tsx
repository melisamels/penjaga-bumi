import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Wind, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

interface LangitOzonStage1Props {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const LangitOzonStage1: React.FC<LangitOzonStage1Props> = ({
  onComplete,
  onExit,
}) => {
  // 3 high-altitude wind turbines to activate
  const [turbinesActive, setTurbinesActive] = useState<boolean[]>([false, false, false]);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Angin langit berembus sangat kencang! Putar dan aktifkan 3 kincir turbin angin untuk mematikan pembangkit listrik berasap hitam! 💨⚡'
  );

  const allActive = turbinesActive.every(Boolean);

  const handleActivateTurbine = (idx: number) => {
    sound.playPop(520 + idx * 50);
    const updated = [...turbinesActive];
    updated[idx] = true;
    setTurbinesActive(updated);

    if (updated.every(Boolean)) {
      sound.playSuccess();
      setBumiEmotion('excited');
      setBumiSpeech('LUAR BIASA! 🌟 Ketiga turbin angin berputar kencang! Seluruh listrik pulau kini 100% energi angin murni tanpa asap polusi!');
      setTimeout(() => onComplete(3, 100), 2200);
    } else {
      setBumiEmotion('happy');
      setBumiSpeech(`Turbin ${idx + 1} mulai berputar memanen energi angin! Satu cerobong asap batu bara berhasil dimatikan! 🍃`);
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-sky-500 via-indigo-600 to-slate-900 text-white">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-slate-900/85 backdrop-blur-md rounded-2xl border-2 border-sky-400 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-sky-300">
          <Wind className="w-5 h-5 text-sky-400 animate-spin-slow" />
          <span>Level 1: Kincir Turbin Angin Langit Bersih</span>
        </div>

        <div className="bg-sky-950 border border-sky-500 px-3 py-1 rounded-xl text-xs font-black text-sky-200">
          Turbin Aktif: {turbinesActive.filter(Boolean).length} / 3
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-800 hover:bg-slate-700 text-slate-300"
        >
          Peta
        </button>
      </div>

      {/* Main High Altitude Arena */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-around">
        {/* Floating Clouds Visual */}
        <div className="flex justify-between px-6 pointer-events-none opacity-80">
          <span className="text-4xl animate-float-slow">☁️</span>
          <span className="text-5xl animate-float">🌬️</span>
          <span className="text-4xl animate-float-slow">☁️</span>
        </div>

        {/* 3 Wind Turbines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Turbin Angin Tebing Barat', power: 'Memasok Listrik Wilayah Pesisir & Laut' },
            { name: 'Turbin Angin Dataran Tinggi', power: 'Memasok Listrik Hutan & Desa Sungai' },
            { name: 'Turbin Angin Puncak Langit', power: 'Memasok Listrik Kereta Cepat & Kota Hijau' },
          ].map((turbine, idx) => {
            const isActive = turbinesActive[idx];

            return (
              <div
                key={idx}
                className={`card-game p-5 flex flex-col justify-between border-3 transition-all ${
                  isActive
                    ? 'bg-sky-950/80 border-sky-400 shadow-xl ring-2 ring-sky-300'
                    : 'bg-slate-900/80 border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-4xl ${isActive ? 'animate-spin-slow' : 'opacity-60'}`}>
                    🌀
                  </span>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${isActive ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    {isActive ? '⚡ Menghasilkan Energi' : '⏸️ Diam'}
                  </span>
                </div>

                <div className="my-3">
                  <h4 className="font-black text-xs sm:text-sm text-white">{turbine.name}</h4>
                  <p className="text-[11px] text-sky-200/80 font-bold">{turbine.power}</p>
                </div>

                <button
                  disabled={isActive}
                  onClick={() => handleActivateTurbine(idx)}
                  className={`w-full py-2.5 rounded-xl font-black text-xs transition cursor-pointer ${
                    isActive
                      ? 'bg-sky-600/50 text-sky-200 cursor-default'
                      : 'bg-sky-400 hover:bg-sky-300 text-slate-950 shadow-md animate-pulse'
                  }`}
                >
                  {isActive ? '✅ Berputar Penuh' : 'Putar Turbin Angin! 💨'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900/95 backdrop-blur-md rounded-3xl border-3 border-sky-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
          <BumiAvatar size={65} emotion={bumiEmotion} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-sky-400 bg-sky-950 px-2 py-0.5 rounded-full">
              BUMI berkata:
            </span>
            <p className="text-sm sm:text-base font-extrabold text-white mt-1">
              {bumiSpeech}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
