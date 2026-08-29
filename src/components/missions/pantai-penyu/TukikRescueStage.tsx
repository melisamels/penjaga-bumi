import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Moon, Lightbulb, LightbulbOff, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface TukikRescueStageProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const TukikRescueStage: React.FC<TukikRescueStageProps> = ({ onComplete, onExit }) => {
  // State for obstacles: 3 artificial lights to turn off, 2 holes to fill
  const [lightsOff, setLightsOff] = useState<boolean[]>([false, false, false]);
  const [holesFilled, setHolesFilled] = useState<boolean[]>([false, false]);
  const [moonGuideActive, setMoonGuideActive] = useState<boolean>(false);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Malam telah tiba! Tukik-tukik bingung karena lampu sorot buatan di darat. Matikan lampu dan ratakan lubang pasir agar mereka aman menuju laut! 🐢🌙'
  );

  const allLightsOff = lightsOff.every(Boolean);
  const allHolesFilled = holesFilled.every(Boolean);
  const isMissionSuccess = allLightsOff && allHolesFilled && moonGuideActive;

  const handleToggleLight = (index: number) => {
    sound.playPop(480 + index * 40);
    const updated = [...lightsOff];
    updated[index] = !updated[index];
    setLightsOff(updated);

    if (updated.every(Boolean)) {
      sound.playSuccess();
      setBumiEmotion('excited');
      setBumiSpeech('Hebat! Semua lampu sorot buatan sudah mati. Sinar bulan sekarang tampak paling terang di atas laut! 🌕');
    } else {
      setBumiSpeech('Bagus! Satu lampu silau berhasil dimatikan. Tukik mulai tidak silau lagi! 💡');
    }
  };

  const handleFillHole = (index: number) => {
    sound.playPop(520);
    const updated = [...holesFilled];
    updated[index] = true;
    setHolesFilled(updated);

    if (updated.every(Boolean)) {
      sound.playSuccess();
      setBumiEmotion('happy');
      setBumiSpeech('Semua lubang pasir sudah diratakan! Jalur tukik sekarang mulus tanpa jebakan! 🏖️');
    } else {
      setBumiSpeech('Satu lubang pasir berhasil ditutup dengan pasir halus! 👍');
    }
  };

  const handleActivateMoonGuide = () => {
    if (!allLightsOff || !allHolesFilled) {
      sound.playGentle();
      setBumiEmotion('caring');
      setBumiSpeech('Pastikan semua lampu dimatikan dan lubang pasir diratakan dulu ya sebelum memandu tukik! 🐢');
      return;
    }

    sound.playSuccess();
    setMoonGuideActive(true);
    setBumiEmotion('excited');
    setBumiSpeech('HORE! 🌟 Pantulan sinar bulan di laut membimbing anak-anak penyu berenang menuju samudra!');
    setTimeout(() => {
      onComplete(3, 100);
    }, 2000);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-indigo-950 via-slate-900 to-amber-950 text-white">
      {/* Night Sky with Glowing Moon */}
      <div className="absolute top-4 right-10 flex flex-col items-center pointer-events-none">
        <div className="w-20 h-20 rounded-full bg-amber-100 shadow-[0_0_50px_rgba(254,243,199,0.8)] flex items-center justify-center text-4xl animate-pulse">
          🌕
        </div>
        <span className="text-[11px] font-black text-amber-200 mt-1">Sinar Bulan Alami</span>
      </div>

      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-slate-900/85 backdrop-blur-md rounded-2xl border-2 border-indigo-400 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-indigo-300">
          <span>🐢</span>
          <span>Level 2: Penyelamatan Tukik & Cahaya Bulan</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-black">
          <span className={`px-2.5 py-1 rounded-xl border ${allLightsOff ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-600 text-amber-300'}`}>
            Lampu: {lightsOff.filter(Boolean).length}/3 Mati
          </span>
          <span className={`px-2.5 py-1 rounded-xl border ${allHolesFilled ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-600 text-amber-300'}`}>
            Lubang: {holesFilled.filter(Boolean).length}/2 Rata
          </span>
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-800 hover:bg-slate-700 text-slate-300"
        >
          Peta
        </button>
      </div>

      {/* Main Night Beach Stage */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-between">
        {/* Top: City & Hotel Artificial Lights on Beachfront */}
        <div className="w-full flex items-center justify-around bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
          <div className="text-xs font-black text-slate-400 flex items-center gap-1">
            <span>🏨</span>
            <span>Deretan Lampu Sorot Pantai (Klik untuk Matikan):</span>
          </div>

          <div className="flex gap-3 sm:gap-6">
            {lightsOff.map((isOff, idx) => (
              <button
                key={idx}
                onClick={() => handleToggleLight(idx)}
                className={`p-2.5 sm:p-3 rounded-2xl flex items-center gap-2 font-black text-xs transition-all ${
                  isOff
                    ? 'bg-slate-800 text-slate-400 border border-slate-700'
                    : 'bg-amber-400 text-amber-950 shadow-[0_0_25px_rgba(251,191,36,0.9)] animate-pulse'
                }`}
              >
                {isOff ? <LightbulbOff className="w-5 h-5" /> : <Lightbulb className="w-5 h-5 fill-amber-300" />}
                <span className="hidden sm:inline">{isOff ? 'Mati (Aman)' : `Lampu ${idx + 1} (Silau)`}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sand Area with Baby Turtles (Tukik) & Trapping Holes */}
        <div className="relative flex-1 my-4 flex items-center justify-around bg-amber-900/20 rounded-3xl border-2 border-amber-900/40 p-4">
          {/* Baby Turtles Crawling */}
          <div className="flex flex-col items-center">
            <div className="flex gap-2 text-3xl animate-bounce-gentle">
              <span>🐢</span>
              <span>🐢</span>
              <span>🐢</span>
            </div>
            <span className="bg-slate-950/80 px-2.5 py-0.5 rounded-full text-[11px] font-black text-emerald-400 border border-emerald-600 mt-1">
              Rombongan Tukik
            </span>
          </div>

          {/* Sand Holes (Obstacles) */}
          <div className="flex flex-col gap-4">
            {holesFilled.map((filled, idx) => (
              <button
                key={idx}
                onClick={() => handleFillHole(idx)}
                disabled={filled}
                className={`p-3 rounded-2xl border-2 flex items-center gap-2 transition-all ${
                  filled
                    ? 'bg-amber-800/40 border-amber-600 text-amber-200 cursor-default'
                    : 'bg-amber-950/90 border-rose-500 text-rose-300 animate-wiggle hover:scale-105'
                }`}
              >
                <span className="text-2xl">{filled ? '🏖️' : '🕳️'}</span>
                <span className="text-xs font-black">
                  {filled ? 'Pasir Rata (Aman)' : `Tutup Lubang Pasir ${idx + 1}`}
                </span>
              </button>
            ))}
          </div>

          {/* Ocean Water Edge & Moon Reflection */}
          <div className="flex flex-col items-center">
            <div className="text-5xl animate-bob">🌊</div>
            <button
              onClick={handleActivateMoonGuide}
              disabled={!allLightsOff || !allHolesFilled || moonGuideActive}
              className={`mt-2 px-4 py-2.5 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg transition ${
                moonGuideActive
                  ? 'bg-emerald-500 text-white'
                  : allLightsOff && allHolesFilled
                  ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 animate-bounce'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>{moonGuideActive ? 'Tukik Sampai di Laut! ✨' : 'Buka Jalur Sinar Bulan 🌕'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900/95 backdrop-blur-md rounded-3xl border-3 border-indigo-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
          <BumiAvatar size={65} emotion={bumiEmotion} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full">
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
