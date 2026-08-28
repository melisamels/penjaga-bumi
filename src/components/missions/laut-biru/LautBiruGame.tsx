import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { ArrowLeft, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface LautBiruGameProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

interface OceanEntity {
  id: number;
  x: number; // 10% to 90%
  y: number; // 0% down to 100%
  isTrash: boolean;
  name: string;
  icon: string;
  speed: number;
}

export const LautBiruGame: React.FC<LautBiruGameProps> = ({ onComplete, onExit }) => {
  // Player submarine robot X position (percent from left: 10% to 90%)
  const [robotX, setRobotX] = useState(50);
  const [trashCleaned, setTrashCleaned] = useState(0);
  const targetTrash = 8;
  const [oceanEntities, setOceanEntities] = useState<OceanEntity[]>([]);
  const [bumiSpeech, setBumiSpeech] = useState(
    'Kendalikan Robot Pembersih Laut ke kiri dan kanan! Tangkap sampah dan lindungi satwa laut! 🤖🌊'
  );
  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('happy');
  const [isCompleted, setIsCompleted] = useState(false);

  const oceanClarity = Math.min(100, Math.round((trashCleaned / targetTrash) * 100));

  // Spawn floating ocean items
  useEffect(() => {
    if (isCompleted) return;

    const interval = setInterval(() => {
      const isTrash = Math.random() > 0.4;
      const trashPool = [
        { name: 'Botol Plastik', icon: '🥤' },
        { name: 'Kantong Plastik', icon: '🛍️' },
        { name: 'Kemasan Minuman', icon: '🧃' },
        { name: 'Kaleng Minuman', icon: '🥫' },
      ];
      const faunaPool = [
        { name: 'Ikan Nemo', icon: '🐠' },
        { name: 'Bintang Laut', icon: '⭐' },
        { name: 'Penyu Laut', icon: '🐢' },
        { name: 'Lumba-lumba', icon: '🐬' },
      ];

      const item = isTrash
        ? trashPool[Math.floor(Math.random() * trashPool.length)]
        : faunaPool[Math.floor(Math.random() * faunaPool.length)];

      const newEntity: OceanEntity = {
        id: Date.now() + Math.random(),
        x: Math.floor(Math.random() * 75) + 12,
        y: 0,
        isTrash,
        name: item.name,
        icon: item.icon,
        speed: 1.2 + Math.random() * 0.8,
      };

      setOceanEntities(prev => [...prev.slice(-8), newEntity]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isCompleted]);

  // Fall downward loop & collision check with submarine
  useEffect(() => {
    if (isCompleted) return;

    const loop = setInterval(() => {
      setOceanEntities(prev => {
        const nextList: OceanEntity[] = [];
        for (const ent of prev) {
          const nextY = ent.y + ent.speed;
          // Check collision with submarine near the bottom (y ~ 75% to 85%)
          if (nextY >= 72 && nextY <= 84 && Math.abs(ent.x - robotX) < 14) {
            // Collision triggered
            if (ent.isTrash) {
              sound.playPop(580);
              setTrashCleaned(c => {
                const updated = c + 1;
                if (updated >= targetTrash) {
                  sound.playSuccess();
                  setIsCompleted(true);
                  setBumiEmotion('excited');
                  setBumiSpeech('LUAR BIASA! 🌟 Laut Biru kembali jernih dan terumbu karang bernapas lega!');
                  setTimeout(() => onComplete(3, 100), 1600);
                } else {
                  setBumiEmotion('happy');
                  setBumiSpeech(`Bagus! ${ent.name} berhasil diserap oleh robot! 🌊`);
                }
                return updated;
              });
            } else {
              sound.playGentle();
              setBumiEmotion('caring');
              setBumiSpeech(`Ups! Itu ${ent.name}, makhluk laut sahabat kita. Kita biarkan dia berenang bebas ya! 🐠`);
            }
            continue; // caught, do not keep falling
          }

          if (nextY < 95) {
            nextList.push({ ...ent, y: nextY });
          }
        }
        return nextList;
      });
    }, 50);

    return () => clearInterval(loop);
  }, [robotX, isCompleted, targetTrash, onComplete]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setRobotX(x => Math.max(12, x - 7));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setRobotX(x => Math.min(88, x + 7));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-sky-600 via-blue-700 to-indigo-900 text-white">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-md rounded-2xl border-2 border-sky-400 shadow-xl mt-2">
        <div className="flex-1 max-w-md">
          <div className="flex items-center justify-between text-xs sm:text-sm font-black mb-1">
            <span className="text-sky-300 flex items-center gap-1">
              <span>🌊</span> Kejernihan Laut Biru:
            </span>
            <span className="text-emerald-400 font-extrabold">{oceanClarity}%</span>
          </div>
          <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden border border-sky-400">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(5, oceanClarity)}%` }}
            />
          </div>
        </div>

        <div className="bg-sky-950 border border-sky-500 px-3 py-1.5 rounded-xl font-black text-xs text-sky-200">
          Sampah Terjaring: {trashCleaned} / {targetTrash}
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-800 hover:bg-slate-700 text-slate-300"
        >
          Peta
        </button>
      </div>

      {/* Main Ocean Stage */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] sm:min-h-[460px] overflow-hidden">
        {/* Animated Sunlight rays & corals on sea floor */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end justify-around text-4xl sm:text-5xl opacity-85 pointer-events-none">
          <span className="animate-bob">🪸</span>
          <span className="animate-pulse">🌿</span>
          <span className="animate-bob">🪸</span>
          <span className="animate-float">🐚</span>
          <span className="animate-bob">🪸</span>
        </div>

        {/* Falling Floating Entities */}
        {oceanEntities.map(item => (
          <div
            key={item.id}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-transform ${
              item.isTrash
                ? 'bg-rose-500/80 border-2 border-rose-300 animate-spin-slow'
                : 'bg-emerald-500/80 border-2 border-emerald-300 animate-wiggle'
            }`}
          >
            {item.icon}
          </div>
        ))}

        {/* Player Submarine Robot Cleaner */}
        <div
          style={{ left: `${robotX}%`, top: '78%' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30 transition-all duration-75"
        >
          <div className="relative group">
            {/* Cute Submarine Robot SVG */}
            <div className="text-5xl sm:text-6xl drop-shadow-xl animate-bob">
              🤖🫧
            </div>
            <div className="absolute -bottom-2 inset-x-0 h-2 bg-sky-300/40 rounded-full blur-[2px]" />
          </div>
          <span className="bg-sky-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full mt-1 shadow">
            Vacuum Laut
          </span>
        </div>
      </div>

      {/* Onscreen touch arrows for mobile & tablet controls */}
      <div className="relative z-30 max-w-5xl mx-auto w-full px-4 flex items-center justify-between gap-4 py-2">
        <button
          onClick={() => {
            sound.playPop(450);
            setRobotX(x => Math.max(12, x - 10));
          }}
          className="btn-blue flex-1 py-3 text-lg font-black flex items-center justify-center gap-2 bg-sky-600 active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>GESER KIRI</span>
        </button>
        <button
          onClick={() => {
            sound.playPop(450);
            setRobotX(x => Math.min(88, x + 10));
          }}
          className="btn-blue flex-1 py-3 text-lg font-black flex items-center justify-center gap-2 bg-sky-600 active:scale-95"
        >
          <span>GESER KANAN</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl border-3 border-sky-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
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
