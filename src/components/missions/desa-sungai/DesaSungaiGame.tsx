import React, { useState } from 'react';
import { RIVER_CLUES, RiverClue } from '../../../lib/missionData';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Search, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface DesaSungaiGameProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const DesaSungaiGame: React.FC<DesaSungaiGameProps> = ({ onComplete, onExit }) => {
  const [clues, setClues] = useState<RiverClue[]>(RIVER_CLUES);
  const [investigatedIds, setInvestigatedIds] = useState<string[]>([]);
  const [selectedClue, setSelectedClue] = useState<RiverClue | null>(null);
  const [showSolutionQuiz, setShowSolutionQuiz] = useState(false);
  const [bumiMessage, setBumiMessage] = useState(
    'Ayo selidiki tepi sungai desa! Klik objek mencurigakan untuk mencari tahu penyebab air menjadi kotor! 🔍💧'
  );
  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');

  const allCluesInvestigated = investigatedIds.length === RIVER_CLUES.length;

  const handleClueClick = (clue: RiverClue) => {
    sound.playPop(540);
    setSelectedClue(clue);

    if (!investigatedIds.includes(clue.id)) {
      const updated = [...investigatedIds, clue.id];
      setInvestigatedIds(updated);
      if (clue.isPollutant) {
        setBumiEmotion('caring');
        setBumiMessage(`Petunjuk ditemukan! ${clue.description}`);
      } else {
        setBumiEmotion('happy');
        setBumiMessage(`Wah, teratai ini justru sahabat sungai! ${clue.description}`);
      }

      if (updated.length === RIVER_CLUES.length) {
        setTimeout(() => {
          setShowSolutionQuiz(true);
          setBumiEmotion('excited');
          setBumiMessage('Semua petunjuk sudah terkumpul! Menurutmu, tindakan apa yang paling tepat untuk menyelamatkan sungai? 🌟');
        }, 1200);
      }
    }
  };

  const handleSelectSolution = (choice: 'A' | 'B' | 'C') => {
    if (choice === 'B') {
      sound.playSuccess();
      setBumiEmotion('excited');
      setBumiMessage('Pilihan yang sangat bijak! 🌟 Menyediakan tempat sampah dan saringan membuat air sungai tetap jernih dan bebas sampah!');
      setTimeout(() => onComplete(3, 100), 2000);
    } else if (choice === 'A') {
      sound.playGentle();
      setBumiEmotion('caring');
      setBumiMessage('Hmm... membuang sampah ke sungai justru akan menyumbat air dan membuat ikan sakit. Coba pilihan lain ya! 🤔');
    } else {
      sound.playGentle();
      setBumiEmotion('thinking');
      setBumiMessage('Menutupi sungai membuat satwa dan tanaman air kehilangan sinar matahari. Ada pilihan yang lebih baik! 🌱');
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-teal-100 via-sky-100 to-cyan-200 text-slate-900">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-cyan-400 shadow-lg mt-2">
        <div className="flex items-center gap-2 font-black text-sm text-cyan-950">
          <Search className="w-5 h-5 text-cyan-600" />
          <span>Misi Detektif: Penyelidikan Sungai Desa</span>
        </div>

        <div className="bg-cyan-100 border border-cyan-300 px-3 py-1 rounded-xl text-xs font-black text-cyan-900">
          Petunjuk Ditemukan: {investigatedIds.length} / {RIVER_CLUES.length}
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
        >
          Peta
        </button>
      </div>

      {/* River Canvas with Clues */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col items-center justify-center">
        {/* Visual River Graphic */}
        <div className="relative w-full max-w-3xl h-64 sm:h-80 card-game overflow-hidden border-4 border-white shadow-xl bg-gradient-to-b from-emerald-200 via-sky-300 to-teal-300">
          {/* Animated river flow */}
          <div className="absolute inset-x-0 top-1/4 bottom-1/4 bg-sky-400/70 -skew-y-3 transform" />
          <div className="absolute inset-x-0 top-1/3 bottom-1/3 bg-cyan-300/60 skew-y-2 transform animate-pulse" />

          {/* Interactive Clue Pins on River Bank */}
          {clues.map(clue => {
            const isFound = investigatedIds.includes(clue.id);
            return (
              <button
                key={clue.id}
                onClick={() => handleClueClick(clue)}
                style={{ left: `${clue.x}%`, top: `${clue.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-all"
              >
                <div
                  className={`p-3 rounded-2xl flex items-center justify-center text-4xl shadow-xl transition-all ${
                    isFound
                      ? 'bg-white/95 border-3 border-emerald-500 ring-2 ring-emerald-300 scale-100'
                      : 'bg-amber-100 border-3 border-amber-500 animate-bounce-gentle scale-110'
                  }`}
                >
                  <span>{clue.icon}</span>
                </div>
                <div className="mt-1 bg-slate-900/85 text-white text-[11px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap shadow">
                  {clue.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Decision Solution Modal */}
        {showSolutionQuiz && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
            <div className="card-game w-full max-w-lg p-6 relative border-4 border-cyan-400 bg-gradient-to-b from-white to-cyan-50 shadow-2xl text-slate-900">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💡</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Waktunya Menentukan Solusi Desa!
                </h3>
              </div>

              <p className="text-sm font-bold text-slate-700 mb-4">
                Berdasarkan hasil penyelidikanmu terhadap sampah dan saluran limbah, apa tindakan terbaik yang harus dilakukan warga desa?
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => handleSelectSolution('A')}
                  className="w-full text-left p-3.5 rounded-2xl bg-white hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-400 transition font-bold text-sm text-slate-800 shadow-sm"
                >
                  A. Biarkan saja dan terus buang sampah ke sungai
                </button>

                <button
                  onClick={() => handleSelectSolution('B')}
                  className="w-full text-left p-3.5 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-500 transition font-bold text-sm text-slate-900 shadow-sm flex items-center justify-between"
                >
                  <span>B. Sediakan tempat sampah terpilah & pasang saringan ramah lingkungan</span>
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                </button>

                <button
                  onClick={() => handleSelectSolution('C')}
                  className="w-full text-left p-3.5 rounded-2xl bg-white hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-400 transition font-bold text-sm text-slate-800 shadow-sm"
                >
                  C. Tutupi sungai dengan semen beton agar airnya tidak kelihatan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-cyan-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
          <BumiAvatar size={65} emotion={bumiEmotion} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-full">
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
