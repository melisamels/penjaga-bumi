import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Compass, Scissors, Sparkles, Wind, CheckCircle2 } from 'lucide-react';

interface GhostNetRescueStageProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const GhostNetRescueStage: React.FC<GhostNetRescueStageProps> = ({
  onComplete,
  onExit,
}) => {
  // 3 Net Knots to cut:
  // Knot 0: Simpul Kiri (Arus tenang)
  // Knot 1: Simpul Tengah (Arus kencang ke kanan)
  // Knot 2: Simpul Kanan (Arus pusaran)
  const [knotsCut, setKnotsCut] = useState<boolean[]>([false, false, false]);
  const [selectedDroneMode, setSelectedDroneMode] = useState<'kiri' | 'lurus' | 'kanan'>('lurus');

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Lumba-lumba terjerat jaring nelayan bekas! Sesuaikan arah navigasi drone pemotong jaring melawan arus laut untuk memotong simpulnya! 🐬✂️'
  );

  const allKnotsCut = knotsCut.every(Boolean);

  const handleCutKnot = (knotIndex: number) => {
    // Required drone navigation modes to counter currents:
    // Knot 0: 'kiri'
    // Knot 1: 'kanan' (counter strong left drift)
    // Knot 2: 'lurus'
    const correctModes: ('kiri' | 'lurus' | 'kanan')[] = ['kiri', 'kanan', 'lurus'];
    const requiredMode = correctModes[knotIndex];

    if (selectedDroneMode === requiredMode) {
      sound.playPop(550 + knotIndex * 40);
      const updated = [...knotsCut];
      updated[knotIndex] = true;
      setKnotsCut(updated);

      if (updated.every(Boolean)) {
        sound.playSuccess();
        setBumiEmotion('excited');
        setBumiSpeech('SEMPURNA! 🌟 Semua simpul jaring hantu berhasil dipotong! Lumba-lumba melompat gembira kembali bebas!');
        setTimeout(() => onComplete(3, 100), 2000);
      } else {
        setBumiEmotion('happy');
        setBumiSpeech(`Bagus! Simpul jaring ${knotIndex + 1} terputus! Navigasi dronemu berhasil mengimbangi arus! 🐬`);
      }
    } else {
      sound.playGentle();
      setBumiEmotion('thinking');
      setBumiSpeech(`Arus laut mendorong drone melenceng! Coba sesuaikan arah kemudi drone (Kiri / Lurus / Kanan) untuk simpul ini! 🤔`);
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 text-white">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-slate-900/85 backdrop-blur-md rounded-2xl border-2 border-cyan-400 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-cyan-300">
          <Scissors className="w-5 h-5 text-cyan-400" />
          <span>Level 3: Navigasi Arus & Jaring Hantu</span>
        </div>

        <div className="bg-cyan-950 border border-cyan-500 px-3 py-1 rounded-xl text-xs font-black text-cyan-200">
          Simpul Terpotong: {knotsCut.filter(Boolean).length} / 3
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-800 hover:bg-slate-700 text-slate-300"
        >
          Peta
        </button>
      </div>

      {/* Main Deep Sea Trench Arena */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-between">
        {/* Ocean Current Indicator */}
        <div className="bg-slate-900/70 p-3 rounded-2xl border border-cyan-500/40 flex items-center justify-between">
          <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>Pilih Arah Dorongan Drone Pemotong untuk Melawan Arus:</span>
          </span>

          <div className="flex gap-2">
            {(['kiri', 'lurus', 'kanan'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => {
                  sound.playPop(450);
                  setSelectedDroneMode(mode);
                }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase transition ${
                  selectedDroneMode === mode
                    ? 'bg-cyan-400 text-slate-950 shadow-lg scale-105 ring-2 ring-cyan-200'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {mode === 'kiri' ? '⬅️ Kemudi Kiri' : mode === 'kanan' ? 'Kemudi Kanan ➡️' : '⬆️ Kemudi Lurus'}
              </button>
            ))}
          </div>
        </div>

        {/* Trapped Dolphin & Net Knots */}
        <div className="relative flex-1 my-3 bg-indigo-950/40 rounded-3xl border-2 border-dashed border-indigo-700/60 p-6 flex flex-col items-center justify-center">
          {/* Trapped Dolphin Actor */}
          <div className="flex flex-col items-center mb-4">
            <div className="text-6xl sm:text-7xl animate-bob">
              {allKnotsCut ? '🐬✨' : '🐬🕸️'}
            </div>
            <span className="bg-slate-900/90 px-3 py-0.5 rounded-full text-xs font-black text-cyan-300 mt-2 border border-cyan-500">
              {allKnotsCut ? 'Lumba-lumba Bebas Berenang!' : 'Terjerat Jaring Nelayan Hanyut'}
            </span>
          </div>

          {/* 3 Interactive Net Knots */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
            {[
              { label: 'Simpul Kiri (Arus Ombak Kiri)', hint: 'Gunakan Kemudi Kiri' },
              { label: 'Simpul Tengah (Arus Hanyut Kuat)', hint: 'Gunakan Kemudi Kanan' },
              { label: 'Simpul Kanan (Arus Lurus Dalam)', hint: 'Gunakan Kemudi Lurus' },
            ].map((knot, idx) => {
              const isCut = knotsCut[idx];
              return (
                <button
                  key={idx}
                  onClick={() => handleCutKnot(idx)}
                  disabled={isCut}
                  className={`p-3.5 rounded-2xl border-2 flex flex-col items-center transition-all ${
                    isCut
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 cursor-default'
                      : 'bg-slate-800/90 border-cyan-400 text-cyan-100 hover:scale-103 cursor-pointer shadow-lg'
                  }`}
                >
                  <span className="text-3xl mb-1">{isCut ? '✂️ Terpotong' : '🕸️ Simpul ' + (idx + 1)}</span>
                  <span className="text-[11px] font-black text-center">{knot.label}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 font-bold">
                    {isCut ? 'Bebas ✅' : `Petunjuk: ${knot.hint}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900/95 backdrop-blur-md rounded-3xl border-3 border-cyan-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
          <BumiAvatar size={65} emotion={bumiEmotion} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full">
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
