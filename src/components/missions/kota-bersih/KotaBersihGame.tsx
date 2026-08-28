import React, { useState, useEffect } from 'react';
import { CITY_TRASH_ITEMS, SorterItem, TrashCategory } from '../../../lib/missionData';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Sparkles, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

interface KotaBersihGameProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const KotaBersihGame: React.FC<KotaBersihGameProps> = ({ onComplete, onExit }) => {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedCount, setSortedCount] = useState(0);

  // Target count per level: Lvl 1 = 4 items, Lvl 2 = 7 items, Lvl 3 = 10 items
  const levelTargets = { 1: 4, 2: 7, 3: 10 };
  const currentTarget = levelTargets[level];

  const currentItem = CITY_TRASH_ITEMS[currentIndex % CITY_TRASH_ITEMS.length];

  const [bumiMessage, setBumiMessage] = useState(
    'Pilah sampah yang lewat di ban berjalan ke tempat sampah yang warnanya sesuai! 🟢🟡🔵'
  );
  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('happy');

  const handleSort = (chosenCategory: TrashCategory) => {
    if (chosenCategory === currentItem.category) {
      // Correct sorting!
      sound.playPop(520 + sortedCount * 25);
      const newSorted = sortedCount + 1;
      setSortedCount(newSorted);

      if (newSorted >= currentTarget) {
        if (level < 3) {
          // Level up!
          sound.playSuccess();
          const nextLvl = (level + 1) as 2 | 3;
          setLevel(nextLvl);
          setBumiEmotion('excited');
          setBumiMessage(`HEBAT! Level ${level} selesai! Sekarang lanjut ke Level ${nextLvl}! 🌟`);
          setCurrentIndex(c => c + 1);
        } else {
          // All levels finished!
          sound.playSuccess();
          setBumiEmotion('excited');
          setBumiMessage('LUAR BIASA! 🌟 Seluruh kota sudah bersih dan rapi berkat pemilahan sampah cerdasmu!');
          setTimeout(() => onComplete(3, 100), 1800);
        }
      } else {
        setBumiEmotion('happy');
        setBumiMessage(`Pilihan tepat! ${currentItem.name}: ${currentItem.hint}`);
        setCurrentIndex(c => c + 1);
      }
    } else {
      // Gentle hint without punitive error
      sound.playGentle();
      setBumiEmotion('thinking');
      setBumiMessage(`Hmm... coba kita pikirkan lagi. ${currentItem.name}: ${currentItem.hint}`);
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-purple-100 via-amber-50 to-emerald-100 text-slate-900">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-purple-400 shadow-lg mt-2">
        <div className="flex items-center gap-2 font-black text-sm text-purple-950">
          <Layers className="w-5 h-5 text-purple-600" />
          <span>Sort The Trash — Kota Bersih Cerdas</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-purple-100 border border-purple-300 px-3 py-1 rounded-xl text-xs font-black text-purple-900">
            Level {level} / 3
          </span>
          <span className="bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-xl text-xs font-black text-emerald-900">
            Dipilah: {sortedCount} / {currentTarget}
          </span>
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
        >
          Peta
        </button>
      </div>

      {/* Conveyor Belt & Item Stage */}
      <div className="relative z-20 flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col items-center justify-center">
        {/* Conveyor belt container */}
        <div className="w-full max-w-xl bg-slate-800 rounded-3xl p-6 border-4 border-slate-700 shadow-2xl flex flex-col items-center relative overflow-hidden">
          {/* Animated belt stripes */}
          <div className="w-full h-16 bg-slate-900 rounded-2xl border-2 border-slate-600 flex items-center justify-center relative shadow-inner overflow-hidden">
            <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(45deg,#fff,#fff_10px,transparent_10px,transparent_20px)] animate-pulse" />

            {/* Floating trash item on conveyor */}
            <div className="relative z-10 flex items-center gap-3 bg-white/95 px-5 py-2 rounded-2xl shadow-xl border-2 border-amber-400 animate-bounce-gentle">
              <span className="text-4xl">{currentItem.icon}</span>
              <div className="flex flex-col text-left">
                <span className="font-black text-slate-900 text-base">{currentItem.name}</span>
                <span className="text-[11px] font-bold text-slate-500">Pilih tempat sampah di bawah:</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Recycling Bins */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl mt-6">
          {/* Organik Bin */}
          <button
            onClick={() => handleSort('organik')}
            className="group p-4 rounded-3xl bg-emerald-500 hover:bg-emerald-600 text-white border-b-6 border-emerald-800 active:border-b-0 active:translate-y-1.5 shadow-xl flex flex-col items-center transition-all cursor-pointer"
          >
            <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform">
              🗑️
            </div>
            <span className="font-black text-sm sm:text-base mt-2 tracking-wide uppercase">
              🟢 ORGANIK
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-100 mt-0.5 text-center leading-tight">
              Sisa Buah & Daun
            </span>
          </button>

          {/* Anorganik Bin */}
          <button
            onClick={() => handleSort('anorganik')}
            className="group p-4 rounded-3xl bg-amber-400 hover:bg-amber-500 text-amber-950 border-b-6 border-amber-700 active:border-b-0 active:translate-y-1.5 shadow-xl flex flex-col items-center transition-all cursor-pointer"
          >
            <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform">
              🗑️
            </div>
            <span className="font-black text-sm sm:text-base mt-2 tracking-wide uppercase">
              🟡 ANORGANIK
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-amber-900 mt-0.5 text-center leading-tight">
              Plastik & Kaleng
            </span>
          </button>

          {/* Kertas Bin */}
          <button
            onClick={() => handleSort('kertas')}
            className="group p-4 rounded-3xl bg-sky-500 hover:bg-sky-600 text-white border-b-6 border-sky-800 active:border-b-0 active:translate-y-1.5 shadow-xl flex flex-col items-center transition-all cursor-pointer"
          >
            <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform">
              🗑️
            </div>
            <span className="font-black text-sm sm:text-base mt-2 tracking-wide uppercase">
              🔵 KERTAS
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-sky-100 mt-0.5 text-center leading-tight">
              Kardus & Buku
            </span>
          </button>
        </div>
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-purple-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
          <BumiAvatar size={65} emotion={bumiEmotion} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
              BUMI berkata:
            </span>
            <p className="text-sm sm:text-base font-extrabold text-slate-800 mt-1">
              {bumiMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
