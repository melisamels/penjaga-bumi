import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { ShieldCheck, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface CoralFoodChainStageProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const CoralFoodChainStage: React.FC<CoralFoodChainStageProps> = ({
  onComplete,
  onExit,
}) => {
  // 3 harmful crown-of-thorns starfish to neutralize with giant triton snails
  const [starfishNeutralized, setStarfishNeutralized] = useState<boolean[]>([false, false, false]);
  // 3 baby coral fragments planted
  const [coralsPlanted, setCoralsPlanted] = useState<boolean[]>([false, false, false]);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Hama bintang laut berduri memakan terumbu karang! Lepaskan Siput Triton sahabat karang dan tanam bibit karang baru! 🐚🪸'
  );

  const allNeutralized = starfishNeutralized.every(Boolean);
  const allCoralsPlanted = coralsPlanted.every(Boolean);
  const isHealthy = allNeutralized && allCoralsPlanted;

  const handleNeutralizeStarfish = (idx: number) => {
    sound.playPop(500 + idx * 40);
    const updated = [...starfishNeutralized];
    updated[idx] = true;
    setStarfishNeutralized(updated);

    if (updated.every(Boolean)) {
      sound.playSuccess();
      setBumiEmotion('happy');
      setBumiSpeech('Siput Triton berhasil mengendalikan hama bintang laut secara alami! Karang tidak digerogoti lagi! 🐚✨');
    } else {
      setBumiSpeech('Satu siput triton dilepaskan! Rantai makanan mulai seimbang kembali!');
    }
  };

  const handlePlantCoral = (idx: number) => {
    sound.playWaterSplash();
    const updated = [...coralsPlanted];
    updated[idx] = true;
    setCoralsPlanted(updated);

    if (updated.every(Boolean) && allNeutralized) {
      sound.playSuccess();
      setBumiEmotion('excited');
      setBumiSpeech('LUAR BIASA! 🌟 Terumbu karang mekar warna-warni dan ikan-ikan kecil kembali memiliki rumah yang aman!');
      setTimeout(() => onComplete(3, 100), 2000);
    } else if (updated.every(Boolean)) {
      sound.playPop(580);
      setBumiSpeech('Bibit karang baru sudah tertanam di batu karang! Pastikan semua hama bintang laut sudah dikendalikan!');
    } else {
      sound.playPop(540);
      setBumiSpeech('Satu fragmen karang bercabang berhasil ditanam di dasar laut!');
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-sky-600 via-blue-700 to-teal-900 text-white">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-slate-900/85 backdrop-blur-md rounded-2xl border-2 border-sky-400 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-sky-300">
          <span>🪸</span>
          <span>Level 2: Rantai Makanan Terumbu Karang</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-black">
          <span className={`px-2.5 py-1 rounded-xl border ${allNeutralized ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-600 text-amber-300'}`}>
            Siput Triton: {starfishNeutralized.filter(Boolean).length}/3 Lepas
          </span>
          <span className={`px-2.5 py-1 rounded-xl border ${allCoralsPlanted ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-600 text-amber-300'}`}>
            Fragmen Karang: {coralsPlanted.filter(Boolean).length}/3 Tumbuh
          </span>
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-800 hover:bg-slate-700 text-slate-300"
        >
          Peta
        </button>
      </div>

      {/* Main Coral Reef Stage */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-around">
        {/* Top: Crown-of-Thorns Outbreak section */}
        <div className="bg-slate-900/60 p-4 rounded-3xl border border-sky-500/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Hama Bintang Laut Pemakan Karang (Klik untuk Lepaskan Siput Triton 🐚):</span>
            </span>
            <span className="text-[11px] font-bold text-slate-300">Rantai Makanan Alami</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {starfishNeutralized.map((neutralized, idx) => (
              <button
                key={idx}
                onClick={() => handleNeutralizeStarfish(idx)}
                disabled={neutralized}
                className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  neutralized
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 cursor-default'
                    : 'bg-rose-950/80 border-rose-400 text-rose-200 hover:scale-103 animate-pulse cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{neutralized ? '🐚' : '⭐💥'}</span>
                  <div className="text-left">
                    <span className="text-xs font-black block">
                      {neutralized ? 'Siput Triton Berjaga' : `Bintang Laut Hama ${idx + 1}`}
                    </span>
                    <span className="text-[10px] opacity-80">
                      {neutralized ? 'Karang terlindungi' : 'Memakan polip karang'}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-black">{neutralized ? '✅' : 'Lepaskan 🐚'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom: Coral Gardening / Rehabilitation plots */}
        <div className="bg-slate-900/60 p-4 rounded-3xl border border-sky-500/40 mt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
              <span>🌱</span>
              <span>Rehabilitasi Karang Bercabang (Klik untuk Tanam Bibit Karang):</span>
            </span>
            <span className="text-[11px] font-bold text-slate-300">Transplantasi Karang</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {coralsPlanted.map((planted, idx) => (
              <button
                key={idx}
                onClick={() => handlePlantCoral(idx)}
                disabled={planted}
                className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  planted
                    ? 'bg-sky-950/80 border-sky-400 text-sky-200 cursor-default'
                    : 'bg-slate-800/90 border-dashed border-sky-400 text-slate-300 hover:border-solid hover:scale-103 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-3xl animate-bob">{planted ? '🪸' : '🪨'}</span>
                  <div className="text-left">
                    <span className="text-xs font-black block">
                      {planted ? 'Karang Tumbuh Subur' : `Substrat Karang ${idx + 1}`}
                    </span>
                    <span className="text-[10px] opacity-80">
                      {planted ? 'Tempat bermain ikan' : 'Siap ditanami bibit'}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-black">{planted ? '🌸 Sehat' : '+ Tanam'}</span>
              </button>
            ))}
          </div>
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
