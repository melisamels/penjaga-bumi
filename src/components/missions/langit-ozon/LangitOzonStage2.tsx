import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Cloud, Sparkles, CheckCircle2, Sliders } from 'lucide-react';

interface LangitOzonStage2Props {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const LangitOzonStage2: React.FC<LangitOzonStage2Props> = ({
  onComplete,
  onExit,
}) => {
  const [modulesActive, setModulesActive] = useState<boolean[]>([false, false, false]);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Asap polusi membuat udara langit kotor (AQI 180)! Aktifkan 3 modul penjerap karbon untuk membersihkan napas bumi! ☁️✨'
  );

  const activeCount = modulesActive.filter(Boolean).length;
  // AQI drops: 180 -> 120 -> 60 -> 15 (Very healthy)
  const currentAqi = Math.max(15, 180 - activeCount * 55);

  const handleActivateModule = (idx: number) => {
    sound.playPop(500 + idx * 40);
    const updated = [...modulesActive];
    updated[idx] = true;
    setModulesActive(updated);

    if (updated.every(Boolean)) {
      sound.playSuccess();
      setBumiEmotion('excited');
      setBumiSpeech('LUAR BIASA! 🌟 Indeks Kualitas Udara (AQI) mencapai angka 15 (Sangat Murni & Segar)! Seluruh makhluk hidup kini bernapas lega!');
      setTimeout(() => onComplete(3, 100), 2200);
    } else {
      setBumiEmotion('happy');
      setBumiSpeech(`Modul ${idx + 1} aktif! Partikel jelaga terserap dan udara semakin segar!`);
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-sky-400 via-teal-300 to-indigo-900 text-white">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-slate-900/85 backdrop-blur-md rounded-2xl border-2 border-teal-400 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-teal-300">
          <Cloud className="w-5 h-5 text-teal-400" />
          <span>Level 2: Pabrik Penjerap Karbon Atmosfer</span>
        </div>

        {/* AQI Meter */}
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-xl text-xs font-black border ${currentAqi <= 50 ? 'bg-emerald-950 border-emerald-400 text-emerald-300' : 'bg-rose-950 border-rose-400 text-rose-300'}`}>
            Indeks Udara (AQI): {currentAqi} {currentAqi <= 50 ? '🌿 Sehat' : '⚠️ Tercemar'}
          </span>
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-800 hover:bg-slate-700 text-slate-300"
        >
          Peta
        </button>
      </div>

      {/* Main Atmospheric Cleaner Arena */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-around">
        {/* Sky Color Simulation based on AQI */}
        <div className="bg-slate-900/70 p-4 rounded-3xl border border-teal-500/40 text-center">
          <span className="text-xs font-black text-teal-300 block mb-1">Kondisi Udara Lapisan Atmosfer:</span>
          <div className="text-4xl animate-bounce-gentle">
            {currentAqi <= 50 ? '🌤️🌈✨' : '🌫️🏭😷'}
          </div>
          <span className="text-xs font-bold text-slate-300 mt-1 inline-block">
            {currentAqi <= 50 ? 'Langit Bersih Kebiruan & Cahaya Surya Sehat' : 'Kabut Asap Karbon Menghalangi Sinar Matahari'}
          </span>
        </div>

        {/* 3 Air Filtration Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
          {[
            {
              title: 'Filter Elektrostatik Jelaga',
              role: 'Menangkap debu mikropartikel PM2.5',
              icon: '⚡',
            },
            {
              title: 'Reaktor Penjerap Karbon CO2',
              role: 'Mengikat gas rumah kaca penyebab pemanasan',
              icon: '🧪',
            },
            {
              title: 'Generator Ion Oksigen Alami',
              role: 'Melepaskan napas segar kaya oksigen ke biosfer',
              icon: '💨',
            },
          ].map((mod, idx) => {
            const isActive = modulesActive[idx];

            return (
              <div
                key={idx}
                className={`card-game p-4 flex flex-col justify-between border-2 transition-all ${
                  isActive
                    ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-md'
                    : 'bg-slate-900/80 border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{mod.icon}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-800 text-emerald-200' : 'bg-slate-800 text-slate-400'}`}>
                    {isActive ? '✅ Bekerja' : 'Menunggu'}
                  </span>
                </div>

                <div className="my-2">
                  <h4 className="font-black text-xs sm:text-sm text-white">{mod.title}</h4>
                  <p className="text-[11px] text-slate-400 font-bold">{mod.role}</p>
                </div>

                <button
                  disabled={isActive}
                  onClick={() => handleActivateModule(idx)}
                  className={`w-full py-2.5 rounded-xl font-black text-xs transition cursor-pointer ${
                    isActive
                      ? 'bg-emerald-900/60 text-emerald-300 cursor-default'
                      : 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-md'
                  }`}
                >
                  {isActive ? 'Aktif Bekerja' : 'Nyalakan Modul ⚡'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900/95 backdrop-blur-md rounded-3xl border-3 border-teal-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
          <BumiAvatar size={65} emotion={bumiEmotion} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-teal-400 bg-teal-950 px-2 py-0.5 rounded-full">
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
