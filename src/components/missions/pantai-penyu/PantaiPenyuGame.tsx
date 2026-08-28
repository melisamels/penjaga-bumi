import React, { useState } from 'react';
import { BEACH_ITEMS, BeachItem } from '../../../lib/missionData';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Sparkles, Trash2, Heart, RefreshCw, CheckCircle2, ChevronRight } from 'lucide-react';

interface PantaiPenyuGameProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const PantaiPenyuGame: React.FC<PantaiPenyuGameProps> = ({
  onComplete,
  onExit,
}) => {
  // Intro dialog state: 0 = Bumi alert, 1 = Turtle plead, 2 = Gameplay active
  const [introStep, setIntroStep] = useState<0 | 1 | 2>(0);

  // Items remaining in the scene
  const [items, setItems] = useState<BeachItem[]>(BEACH_ITEMS);
  const [collectedTrashIds, setCollectedTrashIds] = useState<string[]>([]);
  const [trashBagCount, setTrashBagCount] = useState(0);

  // BUMI speech bubble state
  const [bumiMessage, setBumiMessage] = useState<string>(
    'Sentuh atau klik sampah yang tidak seharusnya ada di pantai ya! 🏖️'
  );
  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('happy');

  // Total trash in this mission
  const totalTrashCount = BEACH_ITEMS.filter(i => i.isTrash).length;
  const currentCleanedTrash = collectedTrashIds.length;
  const beachHealthPercent = Math.round((currentCleanedTrash / totalTrashCount) * 100);

  const handleItemClick = (item: BeachItem) => {
    if (item.isTrash) {
      // Correct! Trash picked up
      sound.playPop(520 + collectedTrashIds.length * 30);
      setCollectedTrashIds(prev => [...prev, item.id]);
      setTrashBagCount(prev => prev + 1);

      const newCleaned = currentCleanedTrash + 1;
      if (newCleaned === totalTrashCount) {
        // Mission finished!
        sound.playSuccess();
        setBumiEmotion('excited');
        setBumiMessage('YES! 🌟 Pantainya sudah super bersih! Lihat, mama penyu sudah bisa bertelur!');
        setTimeout(() => {
          onComplete(3, 100);
        }, 1800);
      } else if (newCleaned === 3) {
        setBumiEmotion('excited');
        setBumiMessage('Hebat! Pantainya mulai bersih dan air lautnya semakin jernih! 🌊✨');
      } else {
        setBumiEmotion('happy');
        setBumiMessage(`Bagus sekali! ${item.name} berhasil kita amankan di tas daur ulang! 🌟`);
      }
    } else {
      // Natural item clicked - supportive, educational guidance!
      sound.playGentle();
      setBumiEmotion('thinking');
      setBumiMessage(item.dialogWhenClickedWrong || 'Benda ini alami dari alam, kita biarkan di pantai ya!');
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none">
      {/* Dynamic Background Environment based on Health Percent (BEFORE -> ACTION -> AFTER) */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          beachHealthPercent < 30
            ? 'bg-gradient-to-b from-slate-400 via-sky-300 to-amber-200' // Gloomy murky
            : beachHealthPercent < 70
            ? 'bg-gradient-to-b from-sky-400 via-teal-200 to-amber-100' // Clearing up
            : 'bg-gradient-to-b from-sky-400 via-cyan-200 to-amber-100' // Sparkling pristine tropical
        }`}
      >
        {/* Animated Sky Elements */}
        {beachHealthPercent >= 50 && (
          <div className="absolute top-6 right-10 w-20 h-20 rounded-full bg-amber-300 blur-sm animate-pulse-glow" />
        )}
        <div className="absolute top-10 left-12 text-3xl animate-float-slow opacity-80 pointer-events-none">☁️</div>
        {beachHealthPercent >= 70 && (
          <>
            <div className="absolute top-16 right-1/3 text-2xl animate-float opacity-90 pointer-events-none">🕊️</div>
            <div className="absolute top-24 left-1/4 text-xl animate-wiggle opacity-85 pointer-events-none">🕊️</div>
          </>
        )}

        {/* Dynamic Ocean Layer */}
        <div
          className={`absolute top-[28%] left-0 right-0 h-[32%] transition-all duration-1000 ${
            beachHealthPercent < 30
              ? 'bg-gradient-to-b from-teal-800/80 to-emerald-700/80' // Murky greenish brown
              : beachHealthPercent < 70
              ? 'bg-gradient-to-b from-cyan-600 to-teal-500' // Turning clear
              : 'bg-gradient-to-b from-sky-500 to-cyan-400' // Crystal blue
          }`}
        >
          {/* Animated Gentle Waves */}
          <svg className="w-full h-12 absolute -top-4 left-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C150,60 350,-40 500,20 C650,80 900,-20 1200,10 L1200,120 L0,120 Z"
              fill="currentColor"
              className={beachHealthPercent < 50 ? 'text-teal-800/80' : 'text-sky-500'}
            />
          </svg>

          {/* Fish / marine life appearing at high health */}
          {beachHealthPercent >= 50 && (
            <div className="absolute bottom-4 left-1/4 text-2xl animate-bob">🐟</div>
          )}
          {beachHealthPercent >= 75 && (
            <div className="absolute bottom-6 right-1/3 text-2xl animate-bounce-gentle">🐠</div>
          )}
        </div>

        {/* Dynamic Sand Beach Layer */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[46%] transition-colors duration-1000 ${
            beachHealthPercent < 30
              ? 'bg-gradient-to-b from-amber-200/90 to-amber-300' // Dirty stained sand
              : 'bg-gradient-to-b from-amber-100 to-amber-200' // Bright clean golden sand
          }`}
        >
          {/* Sand texture dots */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#b45309_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Beach flora / coconut palms at high health */}
          {beachHealthPercent >= 50 && (
            <div className="absolute top-2 left-4 text-4xl animate-bob pointer-events-none">🌴</div>
          )}
          {beachHealthPercent >= 75 && (
            <div className="absolute top-4 right-8 text-4xl animate-float-slow pointer-events-none">🌴</div>
          )}
        </div>
      </div>

      {/* Top HUD: Beach Health Progress Bar & Trash Bag Counter */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-white/85 backdrop-blur-md rounded-2xl border-2 border-emerald-400 shadow-lg mt-2">
        {/* Beach Health meter */}
        <div className="flex-1 max-w-md">
          <div className="flex items-center justify-between text-xs sm:text-sm font-black text-slate-800 mb-1">
            <span className="flex items-center gap-1.5">
              <span>🌱</span>
              <span>Kebersihan Pantai Penyu:</span>
            </span>
            <span className="text-emerald-700 font-extrabold">{beachHealthPercent}%</span>
          </div>
          <div className="w-full h-4 sm:h-5 bg-slate-200 rounded-full overflow-hidden border-2 border-emerald-500 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-green-500 rounded-full transition-all duration-500 flex items-center justify-end pr-1.5"
              style={{ width: `${Math.max(5, beachHealthPercent)}%` }}
            >
              <span className="text-[10px] text-white font-black drop-shadow">✨</span>
            </div>
          </div>
        </div>

        {/* Trash collection counter */}
        <div className="flex items-center gap-2 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-2xl shadow-sm">
          <Trash2 className="w-5 h-5 text-emerald-700" />
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-black uppercase text-emerald-800">Tas Sampah</span>
            <span className="text-sm font-black text-emerald-950">
              {currentCleanedTrash} / {totalTrashCount}
            </span>
          </div>
        </div>

        {/* Exit to Map button */}
        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
        >
          Peta
        </button>
      </div>

      {/* Interactive Gameplay Arena */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[360px] sm:min-h-[460px]">
        {/* Mama Turtle Actor */}
        <div className="absolute top-[48%] left-[8%] sm:left-[12%] -translate-y-1/2 flex flex-col items-center pointer-events-none transition-all duration-1000">
          <div className="text-6xl sm:text-7xl animate-bounce-gentle">
            {beachHealthPercent === 100 ? '🐢' : beachHealthPercent >= 50 ? '🐢' : '🐢'}
          </div>
          <div className="bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-black text-slate-800 shadow-md border border-amber-300 mt-1 flex items-center gap-1">
            {beachHealthPercent === 100 ? (
              <span className="text-emerald-700">Mama Penyu Gembira! 🥚🥚</span>
            ) : beachHealthPercent >= 50 ? (
              <span className="text-amber-700">Mama Penyu Mulai Tenang</span>
            ) : (
              <span className="text-rose-600">Mama Penyu Sedih 😢</span>
            )}
          </div>

          {/* Turtle Eggs appear at 100% */}
          {beachHealthPercent === 100 && (
            <div className="mt-2 bg-amber-100/90 border border-amber-400 px-2.5 py-0.5 rounded-xl text-xs font-bold text-amber-950 animate-bounce">
              🪺 Sarang Telur Selamat!
            </div>
          )}
        </div>

        {/* Interactive Beach Items (Trash and Natural objects) */}
        {introStep === 2 &&
          items.map(item => {
            const isCollected = collectedTrashIds.includes(item.id);
            if (isCollected) return null; // removed from beach

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-transform active:scale-90 hover:scale-125"
                title={item.name}
              >
                {/* Visual Item Card */}
                <div
                  className={`p-2 rounded-2xl shadow-md border-2 transition-all flex items-center justify-center ${
                    item.isTrash
                      ? 'bg-white/90 border-rose-300 hover:border-emerald-500 hover:bg-emerald-50 animate-bob'
                      : 'bg-amber-50/85 border-amber-300 hover:border-amber-400'
                  }`}
                  style={{ width: item.size + 14, height: item.size + 14 }}
                >
                  <span className="text-3xl sm:text-4xl">{item.icon}</span>
                </div>

                {/* Subtitle tag on hover or tap */}
                <span className="hidden group-hover:block absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap shadow-lg z-30">
                  {item.name}
                </span>
              </button>
            );
          })}
      </div>

      {/* Bottom BUMI AI Coach Dialogue Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-emerald-400 p-3 sm:p-4 shadow-xl flex items-center gap-3 sm:gap-4">
          <div
            className="shrink-0 cursor-pointer"
            onClick={() => sound.playPop(700)}
            title="BUMI si Robot Sahabat"
          >
            <BumiAvatar size={70} emotion={bumiEmotion} isFloating={false} />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                BUMI berkata:
              </span>
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                (Asisten Penjaga Bumi)
              </span>
            </div>
            <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug">
              {bumiMessage}
            </p>
          </div>
        </div>
      </div>

      {/* Intro Cutscene Dialog Modal if just started */}
      {introStep < 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="card-game w-full max-w-lg p-6 relative border-4 border-sky-400 bg-gradient-to-b from-white to-sky-50 shadow-2xl text-slate-900">
            {introStep === 0 ? (
              <div className="flex flex-col items-center text-center space-y-4">
                <BumiAvatar size={100} emotion="worried" isFloating />
                <div className="bg-rose-100 text-rose-800 font-black text-xs px-3 py-1 rounded-full border border-rose-300">
                  🚨 PESAN DARI PANTAI PENYU
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Guardian! Kita Menerima Pesan Darurat!
                </h3>
                <p className="text-base font-bold text-slate-700">
                  Lihat, ada seekor penyu laut yang sedang kebingungan di tepi pantai! Ayo kita dengarkan apa yang terjadi.
                </p>
                <button
                  onClick={() => {
                    sound.playPop();
                    setIntroStep(1);
                  }}
                  className="btn-blue w-full py-3.5 text-lg flex items-center justify-center gap-2"
                >
                  <span>DENGARKAN PENYU</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="text-7xl animate-bounce-gentle">🐢</div>
                <div className="bg-amber-100 text-amber-900 font-black text-xs px-3 py-1 rounded-full border border-amber-300">
                  MAMA PENYU BERKATA:
                </div>
                <blockquote className="text-lg font-black text-slate-800 italic bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
                  “Tolong aku, Guardian... Aku ingin sekali bertelur di pasir hangat, tetapi pantai ini penuh sampah plastik dan kaleng tajam...”
                </blockquote>
                <p className="text-sm font-bold text-emerald-800">
                  Instruksi: Bantu bersihkan benda yang tidak seharusnya berada di pantai!
                </p>
                <button
                  onClick={() => {
                    sound.playSuccess();
                    setIntroStep(2);
                  }}
                  className="btn-green w-full py-4 text-xl flex items-center justify-center gap-2 shadow-xl"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>MULAI BERSIHKAN PANTAI! 🏖️</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
