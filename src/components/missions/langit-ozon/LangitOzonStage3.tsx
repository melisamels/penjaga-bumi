import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Crown, Sparkles, Shield, CheckCircle2 } from 'lucide-react';

interface LangitOzonStage3Props {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const LangitOzonStage3: React.FC<LangitOzonStage3Props> = ({
  onComplete,
  onExit,
}) => {
  // 5 Global Biosphere Pillars to align for the final Ozone Shield
  const [pillarsActive, setPillarsActive] = useState<boolean[]>([false, false, false, false, false]);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Inilah Ujian Tertinggi Maha Guardian! Satukan 5 pilar biosfer bumi untuk membangkitkan Kubah Ozon Pelindung Semesta! 👑🌍✨'
  );

  const allPillarsActive = pillarsActive.every(Boolean);

  const handleActivatePillar = (idx: number) => {
    sound.playPop(520 + idx * 50);
    const updated = [...pillarsActive];
    updated[idx] = true;
    setPillarsActive(updated);

    if (updated.every(Boolean)) {
      sound.playFanfare();
      setBumiEmotion('excited');
      setBumiSpeech('SEMPURNA! 👑 KELULUSAN MAHA GUARDIAN SEJATI! Kubah Ozon pelindung bumi bersinar keemasan dan seluruh biosfer harmonis 100%!');
      setTimeout(() => onComplete(3, 100), 2500);
    } else {
      setBumiEmotion('happy');
      setBumiSpeech(`Pilar harmoni ${idx + 1} beresonansi memancarkan energi pemulihan bumi! 🌟`);
    }
  };

  const pillarDefinitions = [
    { name: 'Pilar Samudra Biru', icon: '🌊', desc: 'Terumbu karang & satwa laut lestari' },
    { name: 'Pilar Hutan Hujan', icon: '🌳', desc: 'Pohon rimbun & koridor satwa aman' },
    { name: 'Pilar Urat Nadi Air', icon: '💧', desc: 'Sungai jernih & hulu mata air murni' },
    { name: 'Pilar Kota Sirkular', icon: '🏙️', desc: 'Ekonomi hijau tanpa limbah di TPA' },
    { name: 'Pilar Puncak Mahameru', icon: '🏔️', desc: 'Tebing kokoh & suaka elang jawa' },
  ];

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-purple-950 via-indigo-900 to-sky-950 text-white">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-slate-900/85 backdrop-blur-md rounded-2xl border-2 border-amber-400 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-300">
          <Crown className="w-5 h-5 text-amber-400" />
          <span>Level 3: Harmoni Kubah Ozon Sejati (Grand Trial)</span>
        </div>

        <div className="bg-amber-950 border border-amber-500 px-3 py-1 rounded-xl text-xs font-black text-amber-200">
          Pilar Harmoni: {pillarsActive.filter(Boolean).length} / 5
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-800 hover:bg-slate-700 text-slate-300"
        >
          Peta
        </button>
      </div>

      {/* Main Ozone Shield Canvas */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-around">
        {/* Glowing Planet Earth with Golden Ozone Dome */}
        <div className="flex flex-col items-center">
          <div className={`text-7xl sm:text-8xl transition-all duration-700 ${allPillarsActive ? 'scale-115 animate-bounce-gentle drop-shadow-[0_0_50px_rgba(251,191,36,0.9)]' : 'animate-pulse'}`}>
            🌍
          </div>
          <span className="bg-amber-400 text-amber-950 font-black text-xs px-3 py-1 rounded-full shadow-lg mt-2 flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            <span>{allPillarsActive ? 'Kubah Ozon Emas Bumi Sempurna 100%!' : 'Satukan 5 Pilar Harmoni Bumi'}</span>
          </span>
        </div>

        {/* 5 Pillars Align Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-3">
          {pillarDefinitions.map((p, idx) => {
            const isActive = pillarsActive[idx];

            return (
              <button
                key={idx}
                disabled={isActive}
                onClick={() => handleActivatePillar(idx)}
                className={`card-game p-3 flex flex-col justify-between border-2 transition-all text-center ${
                  isActive
                    ? 'bg-amber-950/80 border-amber-400 text-amber-200 ring-2 ring-amber-300 shadow-xl cursor-default'
                    : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:scale-103 hover:border-amber-400 cursor-pointer'
                }`}
              >
                <div className="text-3xl mb-1">{p.icon}</div>
                <h5 className="font-black text-xs text-white leading-tight">{p.name}</h5>
                <p className="text-[10px] text-slate-400 font-semibold my-1">{p.desc}</p>
                <span className={`text-[10px] font-black py-1 rounded-lg ${isActive ? 'bg-amber-400 text-amber-950' : 'bg-slate-800 text-slate-400'}`}>
                  {isActive ? '✨ Resonansi' : '+ Hubungkan'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900/95 backdrop-blur-md rounded-3xl border-3 border-amber-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
          <BumiAvatar size={65} emotion={bumiEmotion} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-amber-400 bg-amber-950 px-2 py-0.5 rounded-full">
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
