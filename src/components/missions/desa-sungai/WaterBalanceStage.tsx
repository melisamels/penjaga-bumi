import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Scale, Droplet, Sparkles, CheckCircle2 } from 'lucide-react';

interface WaterBalanceStageProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const WaterBalanceStage: React.FC<WaterBalanceStageProps> = ({
  onComplete,
  onExit,
}) => {
  // Total available fresh water = 100 units
  // Initial distribution: Sawah 50, Kolam 40, Konservasi 10 (Imbalanced! River is dying)
  const [sawahWater, setSawahWater] = useState(50);
  const [kolamWater, setKolamWater] = useState(40);
  const [konservasiWater, setKonservasiWater] = useState(10);

  const totalUsed = sawahWater + kolamWater + konservasiWater;

  // Ideal criteria:
  // Sawah: 30 to 40
  // Kolam: 25 to 35
  // Konservasi: 30 to 40
  const isSawahBalanced = sawahWater >= 30 && sawahWater <= 40;
  const isKolamBalanced = kolamWater >= 25 && kolamWater <= 35;
  const isKonservasiBalanced = konservasiWater >= 30 && konservasiWater <= 40;
  const isAllBalanced = isSawahBalanced && isKolamBalanced && isKonservasiBalanced && totalUsed === 100;

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Mata air desa terbatas 100 unit! Bagi debit air secara seimbang agar sawah padi subur, ikan kolam hidup, dan sungai satwa tidak mengering! 🌾🐟🌿'
  );

  const adjustWater = (sector: 'sawah' | 'kolam' | 'konservasi', delta: number) => {
    sound.playPop(520);

    if (sector === 'sawah') {
      const next = Math.max(10, Math.min(70, sawahWater + delta));
      setSawahWater(next);
    } else if (sector === 'kolam') {
      const next = Math.max(10, Math.min(60, kolamWater + delta));
      setKolamWater(next);
    } else {
      const next = Math.max(10, Math.min(60, konservasiWater + delta));
      setKonservasiWater(next);
    }
  };

  const handleValidateBalance = () => {
    if (totalUsed !== 100) {
      sound.playGentle();
      setBumiEmotion('thinking');
      setBumiSpeech(`Total penggunaan air harus tepat 100 unit mata air (saat ini ${totalUsed} unit)! 💧`);
      return;
    }

    if (isAllBalanced) {
      sound.playSuccess();
      setBumiEmotion('excited');
      setBumiSpeech('SEMPURNA! 🌟 Neraca air desa sangat adil! Petani senang, warga panen ikan, dan sungai konservasi mengalir asri!');
      setTimeout(() => onComplete(3, 100), 2200);
    } else {
      sound.playGentle();
      setBumiEmotion('caring');
      if (!isKonservasiBalanced) {
        setBumiSpeech('Sungai konservasi masih kekurangan air! Hewan liar dan ikan sungai membutuhkan minimal 30 unit air! 🌿');
      } else if (!isSawahBalanced) {
        setBumiSpeech('Sawah padi membutuhkan antara 30 - 40 unit air agar bulir padi tumbuh lebat! 🌾');
      } else {
        setBumiSpeech('Kolam ikan warga membutuhkan antara 25 - 35 unit air agar sirkulasi oksigen tetap sehat! 🐟');
      }
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-teal-100 via-sky-100 to-emerald-200 text-slate-900">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-teal-500 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-teal-950">
          <Scale className="w-5 h-5 text-teal-600" />
          <span>Level 3: Neraca Air Desa Berkelanjutan</span>
        </div>

        <div className={`px-3 py-1 rounded-xl text-xs font-black border ${totalUsed === 100 ? 'bg-emerald-100 border-emerald-400 text-emerald-950' : 'bg-rose-100 border-rose-400 text-rose-950'}`}>
          Total Debit: {totalUsed} / 100 Unit
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
        >
          Peta
        </button>
      </div>

      {/* Main 3 Sectors Allocator */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-auto">
          {/* Sector 1: Sawah Padi */}
          <div
            className={`card-game p-5 flex flex-col justify-between border-3 transition-all ${
              isSawahBalanced
                ? 'bg-amber-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                : 'bg-white/80 border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl">🌾</span>
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${isSawahBalanced ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'}`}>
                {isSawahBalanced ? 'Subur & Cukup' : sawahWater > 40 ? 'Kelebihan Air' : 'Kurang Air'}
              </span>
            </div>

            <div className="my-2">
              <h4 className="font-black text-sm text-slate-900">Sawah Padi Organik</h4>
              <p className="text-[11px] text-slate-500 font-bold">Kebutuhan Ideal: 30 - 40 Unit</p>
              <div className="text-2xl font-black text-amber-700 mt-1">{sawahWater} Unit</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => adjustWater('sawah', -5)}
                className="flex-1 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-800"
              >
                - 5 Unit
              </button>
              <button
                onClick={() => adjustWater('sawah', 5)}
                className="flex-1 py-1.5 rounded-xl font-black text-xs bg-amber-400 hover:bg-amber-500 text-amber-950 font-black"
              >
                + 5 Unit
              </button>
            </div>
          </div>

          {/* Sector 2: Kolam Ikan */}
          <div
            className={`card-game p-5 flex flex-col justify-between border-3 transition-all ${
              isKolamBalanced
                ? 'bg-sky-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                : 'bg-white/80 border-sky-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl">🐟</span>
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${isKolamBalanced ? 'bg-emerald-100 text-emerald-900' : 'bg-sky-100 text-sky-900'}`}>
                {isKolamBalanced ? 'Oksigen Sehat' : kolamWater > 35 ? 'Kelebihan Air' : 'Kurang Air'}
              </span>
            </div>

            <div className="my-2">
              <h4 className="font-black text-sm text-slate-900">Kolam Ikan Warga</h4>
              <p className="text-[11px] text-slate-500 font-bold">Kebutuhan Ideal: 25 - 35 Unit</p>
              <div className="text-2xl font-black text-sky-700 mt-1">{kolamWater} Unit</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => adjustWater('kolam', -5)}
                className="flex-1 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-800"
              >
                - 5 Unit
              </button>
              <button
                onClick={() => adjustWater('kolam', 5)}
                className="flex-1 py-1.5 rounded-xl font-black text-xs bg-sky-400 hover:bg-sky-500 text-slate-950 font-black"
              >
                + 5 Unit
              </button>
            </div>
          </div>

          {/* Sector 3: Konservasi Sungai Alami */}
          <div
            className={`card-game p-5 flex flex-col justify-between border-3 transition-all ${
              isKonservasiBalanced
                ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                : 'bg-white/80 border-rose-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl">🌿</span>
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${isKonservasiBalanced ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'}`}>
                {isKonservasiBalanced ? 'Aliran Asri Hidup' : 'Sungai Terancam Kering!'}
              </span>
            </div>

            <div className="my-2">
              <h4 className="font-black text-sm text-slate-900">Sungai Konservasi Satwa</h4>
              <p className="text-[11px] text-slate-500 font-bold">Kebutuhan Ideal: 30 - 40 Unit</p>
              <div className="text-2xl font-black text-emerald-700 mt-1">{konservasiWater} Unit</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => adjustWater('konservasi', -5)}
                className="flex-1 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-800"
              >
                - 5 Unit
              </button>
              <button
                onClick={() => adjustWater('konservasi', 5)}
                className="flex-1 py-1.5 rounded-xl font-black text-xs bg-emerald-500 hover:bg-emerald-600 text-white font-black"
              >
                + 5 Unit
              </button>
            </div>
          </div>
        </div>

        {/* Action Button: Check Systems Balance */}
        <div className="flex justify-center mt-3">
          <button
            onClick={handleValidateBalance}
            className={`px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 shadow-xl transition-all ${
              isAllBalanced
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-bounce ring-4 ring-emerald-300 cursor-pointer'
                : 'bg-teal-600 hover:bg-teal-700 text-white cursor-pointer'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>KUNCI KESEIMBANGAN ALIRAN AIR! ⚖️💧</span>
          </button>
        </div>
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-teal-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
          <BumiAvatar size={65} emotion={bumiEmotion} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
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
