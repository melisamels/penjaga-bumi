import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Mountain, Sprout, CheckCircle2, ShieldCheck } from 'lucide-react';

interface PuncakGunungStage1Props {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const PuncakGunungStage1: React.FC<PuncakGunungStage1Props> = ({
  onComplete,
  onExit,
}) => {
  // 4 slope terrace contour lines to reinforce with deep-rooted vetiver grass
  const [plantedTerraces, setPlantedTerraces] = useState<boolean[]>([false, false, false, false]);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Tebing pegunungan curam rawan longsor saat hujan deras! Tanam rumput akar wangi (vetiver) di 4 sabuk lereng untuk mengunci tanah! 🏔️🌾'
  );

  const allPlanted = plantedTerraces.every(Boolean);

  const handlePlantTerrace = (idx: number) => {
    sound.playPop(520 + idx * 40);
    const updated = [...plantedTerraces];
    updated[idx] = true;
    setPlantedTerraces(updated);

    if (updated.every(Boolean)) {
      sound.playSuccess();
      setBumiEmotion('excited');
      setBumiSpeech('LUAR BIASA! 🌟 Akar wangi menembus 3 meter ke dalam tanah tebing! Lereng gunung kini kokoh dan aman dari bahaya longsor!');
      setTimeout(() => onComplete(3, 100), 2200);
    } else {
      setBumiEmotion('happy');
      setBumiSpeech(`Sabuk lereng ${idx + 1} berhasil diperkuat dengan barisan akar wangi! Lanjutkan ke lereng lainnya! 👍`);
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-sky-400 via-amber-200 to-emerald-700 text-slate-900">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-amber-500 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-950">
          <Mountain className="w-5 h-5 text-amber-600" />
          <span>Level 1: Terasering Lereng Curam & Akar Wangi</span>
        </div>

        <div className="bg-amber-100 border border-amber-400 px-3 py-1 rounded-xl text-xs font-black text-amber-950">
          Sabuk Lereng: {plantedTerraces.filter(Boolean).length} / 4 Kokoh
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
        >
          Peta
        </button>
      </div>

      {/* Main Mountain Slope Canvas */}
      <div className="relative z-20 flex-1 max-w-4xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-between">
        {/* Mountain Silhouette Header */}
        <div className="text-center mb-2">
          <span className="text-4xl animate-bounce-gentle">🏔️</span>
          <h3 className="font-black text-sm text-slate-800">Lereng Curam Gunung Mahameru</h3>
          <p className="text-xs text-slate-600 font-bold">Klik sabuk lereng untuk menanam barisan rumput vetiver berakar jaring</p>
        </div>

        {/* 4 Slope Terraces */}
        <div className="space-y-3 my-auto">
          {[
            { label: 'Terasering Lereng Puncak (Zona Hulu)', risk: 'Rawan Erosi Angin & Hujan' },
            { label: 'Terasering Lereng Tengah (Zona Curam 45°)', risk: 'Rawan Guguran Batuan' },
            { label: 'Terasering Lereng Bawah (Penyangga Desa)', risk: 'Pondasi Tanah Terpenting' },
            { label: 'Sabuk Saluran Limpasan Air Hujan', risk: 'Pengarah Aliran Air Aman' },
          ].map((terrace, idx) => {
            const isPlanted = plantedTerraces[idx];

            return (
              <button
                key={idx}
                disabled={isPlanted}
                onClick={() => handlePlantTerrace(idx)}
                className={`w-full p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  isPlanted
                    ? 'bg-emerald-50 border-emerald-500 shadow-md ring-1 ring-emerald-300 cursor-default'
                    : 'bg-white/85 border-amber-400 hover:border-emerald-500 hover:scale-101 cursor-pointer shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{isPlanted ? '🌾✨' : '⛏️🪨'}</span>
                  <div className="text-left">
                    <span className="font-black text-xs sm:text-sm text-slate-900 block">
                      {terrace.label}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">
                      {isPlanted ? 'Terikat Kuat oleh Akar Wangi 3 Meter' : `Bahaya: ${terrace.risk}`}
                    </span>
                  </div>
                </div>

                <span className={`text-xs font-black px-3 py-1.5 rounded-xl ${isPlanted ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-400 text-amber-950'}`}>
                  {isPlanted ? '✅ Kokoh' : '+ Tanam Vetiver'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-amber-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
          <BumiAvatar size={65} emotion={bumiEmotion} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              BUMI berkata:
            </span>
            <p className="text-sm sm:text-base font-extrabold text-slate-800 mt-1">
              {bumiSpeech}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
