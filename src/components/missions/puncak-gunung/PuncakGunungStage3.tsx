import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Trees, Shield, Sparkles, CheckCircle2, Eye } from 'lucide-react';

interface PuncakGunungStage3Props {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const PuncakGunungStage3: React.FC<PuncakGunungStage3Props> = ({
  onComplete,
  onExit,
}) => {
  // 3 sanctuary elements:
  // 0: Pohon Cemara Sarang Elang
  // 1: Kamera Pengawas Jagawana Anti-Pemburu
  // 2: Konservasi Padang Edelweiss Hutan Awan
  const [sanctuaryElements, setSanctuaryElements] = useState<boolean[]>([false, false, false]);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Hutan awan adalah rumah terakhir Elang Jawa langka! Bangun suaka perlindungan puncak dengan pohon cemara sarang dan pos jagawana! 🦅🌲'
  );

  const allCompleted = sanctuaryElements.every(Boolean);

  const handleActivateElement = (idx: number) => {
    sound.playPop(540 + idx * 40);
    const updated = [...sanctuaryElements];
    updated[idx] = true;
    setSanctuaryElements(updated);

    if (updated.every(Boolean)) {
      sound.playFanfare();
      setBumiEmotion('excited');
      setBumiSpeech('SEMPURNA! 🌟 Elang Jawa mengepakkan sayapnya megah terbang di atas awan! Habitat predator puncak kini aman dari ancaman pemburu!');
      setTimeout(() => onComplete(3, 100), 2200);
    } else {
      setBumiEmotion('happy');
      setBumiSpeech('Satu elemen suaka berhasil dibangun! Ekosistem hutan awan semakin terlindungi!');
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-indigo-900 via-sky-700 to-emerald-900 text-white">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-slate-900/85 backdrop-blur-md rounded-2xl border-2 border-amber-400 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-300">
          <Shield className="w-5 h-5 text-amber-400" />
          <span>Level 3: Suaka Hutan Awan & Elang Jawa</span>
        </div>

        <div className="bg-amber-950 border border-amber-500 px-3 py-1 rounded-xl text-xs font-black text-amber-200">
          Suaka: {sanctuaryElements.filter(Boolean).length} / 3 Aktif
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-800 hover:bg-slate-700 text-slate-300"
        >
          Peta
        </button>
      </div>

      {/* Main Cloud Forest Arena */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-around">
        {/* Sky View with Majestic Eagle */}
        <div className="relative bg-sky-950/60 p-5 rounded-3xl border-2 border-indigo-500/50 flex flex-col items-center">
          <div className="text-6xl sm:text-7xl animate-bob">
            {allCompleted ? '🦅✨' : '🦅🌲'}
          </div>
          <span className="bg-slate-900/90 px-3 py-1 rounded-full text-xs font-black text-amber-300 mt-2 border border-amber-500">
            {allCompleted ? 'Elang Jawa Terbang Bebas di Hutan Awan!' : 'Elang Jawa (Garuda Langka Pegunungan)'}
          </span>
          <div className="flex gap-4 text-xs font-bold text-slate-400 mt-2">
            <span>☁️ Ketinggian: 2.500 mdpl</span>
            <span>🌫️ Suhu Sejuk Berkabut</span>
          </div>
        </div>

        {/* 3 Sanctuary Interactive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-3">
          {[
            {
              title: 'Pohon Cemara Gunung',
              desc: 'Tempat bertengger kokoh dan pondasi sarang telur elang.',
              icon: '🌲',
            },
            {
              title: 'Kamera Pengawas Jagawana',
              desc: 'Menjaga wilayah suaka 24 jam dari perangkap pemburu liar.',
              icon: '📷',
            },
            {
              title: 'Padang Edelweiss & Lumut',
              desc: 'Menjaga siklus embun dan serangga makanan burung kecil.',
              icon: '🌸',
            },
          ].map((card, idx) => {
            const isDone = sanctuaryElements[idx];

            return (
              <button
                key={idx}
                disabled={isDone}
                onClick={() => handleActivateElement(idx)}
                className={`card-game p-4 flex flex-col justify-between border-2 transition-all text-left ${
                  isDone
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 cursor-default'
                    : 'bg-slate-900/80 border-amber-400 text-slate-200 hover:scale-102 cursor-pointer shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{card.icon}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isDone ? 'bg-emerald-800 text-emerald-200' : 'bg-amber-900 text-amber-200'}`}>
                    {isDone ? '✅ Berfungsi' : 'Siapkan'}
                  </span>
                </div>

                <div className="my-2">
                  <h4 className="font-black text-xs sm:text-sm text-white">{card.title}</h4>
                  <p className="text-[11px] text-slate-400 font-bold">{card.desc}</p>
                </div>

                <div className={`p-2 rounded-xl text-center text-xs font-black ${isDone ? 'bg-emerald-900/60 text-emerald-300' : 'bg-amber-400 text-amber-950'}`}>
                  {isDone ? 'Terlindungi Aman' : '+ Aktifkan Perlindungan'}
                </div>
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
