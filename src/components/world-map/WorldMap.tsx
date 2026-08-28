import React, { useState } from 'react';
import { AreaId, GameState } from '../../types/game';
import { AREAS, AreaDetail } from '../../lib/missionData';
import { sound } from '../../lib/soundEngine';
import { BumiAvatar } from '../common/BumiAvatar';
import { Lock, Star, CheckCircle2, Play, Sparkles, AlertCircle } from 'lucide-react';

interface WorldMapProps {
  state: GameState;
  onSelectArea: (areaId: AreaId) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ state, onSelectArea }) => {
  const [selectedArea, setSelectedArea] = useState<AreaDetail | null>(null);

  const handlePinClick = (area: AreaDetail) => {
    const isUnlocked = state.unlockedAreas.includes(area.id);
    if (!isUnlocked) {
      sound.playGentle();
      return;
    }
    sound.playPop(550);
    setSelectedArea(area);
  };

  const handleStartMission = (areaId: AreaId) => {
    sound.playSuccess();
    onSelectArea(areaId);
  };

  // Node positions on the adventure map (percentage X and Y)
  const NODE_COORDINATES: Record<AreaId, { x: number; y: number }> = {
    'pantai-penyu': { x: 20, y: 70 },
    'laut-biru': { x: 42, y: 78 },
    'hutan-hijau': { x: 50, y: 35 },
    'desa-sungai': { x: 74, y: 55 },
    'kota-bersih': { x: 82, y: 22 },
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col p-4 sm:p-6 bg-gradient-to-b from-sky-300 via-emerald-200 to-amber-100 overflow-hidden select-none">
      {/* Top Banner */}
      <div className="max-w-5xl mx-auto w-full flex flex-wrap items-center justify-between gap-3 mb-4 z-10">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border-2 border-emerald-400/60 flex items-center gap-3">
          <div className="text-2xl animate-spin-slow">🗺️</div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
              Peta Ekspedisi Penjaga Bumi
            </h2>
            <p className="text-xs font-bold text-slate-600">
              Pilih wilayah untuk memulai misi penyelamatan!
            </p>
          </div>
        </div>

        {/* Global Earth Health Progress */}
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border-2 border-sky-400/60 flex items-center gap-3">
          <div className="text-2xl animate-pulse">🌍</div>
          <div>
            <div className="flex items-center justify-between text-xs font-black text-slate-700">
              <span>Kesehatan Bumi</span>
              <span className="text-emerald-600 font-extrabold">{state.earthHealth}%</span>
            </div>
            <div className="w-32 sm:w-44 h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300 mt-1">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-700"
                style={{ width: `${state.earthHealth}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Adventure Map Canvas Area */}
      <div className="relative max-w-5xl mx-auto w-full flex-1 min-h-[500px] card-game overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-tr from-sky-400 via-teal-300 to-amber-200">
        {/* SVG Decorative Map Background Layer: Islands, Waves, Trees */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle Ocean Waves */}
          <path d="M0,150 Q120,130 240,150 T480,150 T720,150 T960,150 T1200,150" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
          <path d="M0,280 Q100,260 200,280 T400,280 T600,280 T800,280 T1000,280" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
          <path d="M0,420 Q140,400 280,420 T560,420 T840,420 T1120,420" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />

          {/* Island Landmasses */}
          {/* Island 1: Beach & Ocean */}
          <ellipse cx="28%" cy="75%" rx="24%" ry="18%" fill="#fef08a" opacity="0.85" />
          <ellipse cx="28%" cy="75%" rx="20%" ry="14%" fill="#bef264" opacity="0.6" />

          {/* Island 2: Deep Forest */}
          <ellipse cx="52%" cy="38%" rx="22%" ry="22%" fill="#86efac" opacity="0.85" />
          <ellipse cx="52%" cy="38%" rx="17%" ry="17%" fill="#4ade80" opacity="0.5" />

          {/* Island 3: River & City */}
          <ellipse cx="78%" cy="45%" rx="22%" ry="36%" fill="#fed7aa" opacity="0.85" />
          <ellipse cx="78%" cy="45%" rx="18%" ry="30%" fill="#bae6fd" opacity="0.6" />

          {/* Connecting dashed path line */}
          <path
            d={`M 20% 70% Q 30% 82% 42% 78% T 50% 35% T 74% 55% T 82% 22%`}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="5"
            strokeDasharray="10,10"
            className="animate-pulse"
          />
        </svg>

        {/* Small floating decorations */}
        <div className="absolute top-10 left-8 text-2xl animate-float-slow opacity-80 pointer-events-none">☁️</div>
        <div className="absolute top-20 right-12 text-3xl animate-float opacity-75 pointer-events-none">☁️</div>
        <div className="absolute bottom-8 right-1/4 text-2xl animate-bounce-gentle opacity-80 pointer-events-none">⛵</div>

        {/* Area Pins */}
        {AREAS.map((area, idx) => {
          const isUnlocked = state.unlockedAreas.includes(area.id);
          const completion = state.completedMissions[area.id];
          const isCompleted = !!completion;
          const pos = NODE_COORDINATES[area.id];
          const isCurrentTarget = !isCompleted && isUnlocked;

          return (
            <div
              key={area.id}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => handlePinClick(area)}
                disabled={!isUnlocked}
                className={`group relative flex flex-col items-center focus:outline-none transition-all duration-300 ${
                  isUnlocked
                    ? 'hover:scale-110 cursor-pointer active:scale-95'
                    : 'opacity-65 cursor-not-allowed grayscale-[40%]'
                }`}
              >
                {/* Ping animation on currently active mission */}
                {isCurrentTarget && (
                  <span className="absolute -inset-2 rounded-full bg-amber-400 opacity-75 animate-ping pointer-events-none" />
                )}

                {/* Node circle */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl border-4 shadow-xl transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 border-white text-white ring-4 ring-emerald-300'
                      : isUnlocked
                      ? 'bg-amber-400 border-white text-slate-900 ring-4 ring-amber-300 animate-bounce-gentle'
                      : 'bg-slate-700 border-slate-500 text-slate-400'
                  }`}
                >
                  {isCompleted ? '⭐' : isUnlocked ? area.icon : <Lock className="w-6 h-6 text-slate-300" />}
                </div>

                {/* Stars container for completed missions */}
                {isCompleted && completion && (
                  <div className="flex items-center gap-0.5 bg-white/95 px-2 py-0.5 rounded-full border border-amber-300 shadow-md -mt-2.5 z-10">
                    {[1, 2, 3].map(s => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= completion.stars ? 'fill-amber-400 text-amber-500' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Area Title Tag */}
                <div
                  className={`mt-1.5 px-2.5 py-1 rounded-xl text-xs font-black shadow-md border flex items-center gap-1 whitespace-nowrap ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                      : isUnlocked
                      ? 'bg-white text-slate-900 border-amber-400'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700'
                  }`}
                >
                  <span>{area.icon}</span>
                  <span>{area.name}</span>
                </div>
              </button>
            </div>
          );
        })}

        {/* Selected Area Detail Popover Modal */}
        {selectedArea && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
            <div className="card-game w-full max-w-md p-6 relative border-4 border-amber-400 bg-gradient-to-b from-white to-amber-50 shadow-2xl text-slate-900">
              <button
                onClick={() => setSelectedArea(null)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 font-black text-xl w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-sm">
                  {selectedArea.icon}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    {selectedArea.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {selectedArea.name}
                  </h3>
                </div>
              </div>

              <div className="bg-white/80 rounded-2xl p-3.5 border border-amber-200 mb-4 space-y-2">
                <p className="text-sm font-bold text-slate-700">
                  {selectedArea.tagline}
                </p>
                <div className="text-xs text-rose-700 font-extrabold flex items-center gap-1.5 bg-rose-50 p-2 rounded-xl border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Masalah: {selectedArea.problem}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-4 px-1">
                <span>Hadiah Misi:</span>
                <span className="text-emerald-700 font-black">+100 Eco Points 🌱 & +200 XP 🌟</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedArea(null)}
                  className="w-1/3 py-3 rounded-2xl font-black text-sm bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Nanti Dulu
                </button>
                <button
                  onClick={() => handleStartMission(selectedArea.id)}
                  className="btn-green flex-1 py-3 text-base flex items-center justify-center gap-2 shadow-lg"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>MULAI MISI INI!</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
