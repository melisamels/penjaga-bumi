import React, { useState } from 'react';
import { AreaId, GameState, StageDifficulty } from '../../types/game';
import { AREAS, AREA_STAGES, GUARDIAN_TIERS, AreaDetail } from '../../lib/missionData';
import { sound } from '../../lib/soundEngine';
import { isStageUnlocked } from '../../lib/gameState';
import { Lock, Star, CheckCircle2, Play, Sparkles, AlertCircle, Brain, Lightbulb, Compass, Award, Layers } from 'lucide-react';

interface WorldMapProps {
  state: GameState;
  onSelectStage: (areaId: AreaId, stageNumber: number) => void;
  onOpenLicense?: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ state, onSelectStage, onOpenLicense }) => {
  const [selectedArea, setSelectedArea] = useState<AreaDetail | null>(null);
  const [selectedElevationTier, setSelectedElevationTier] = useState<number | 'all'>('all');

  const currentTierInfo = GUARDIAN_TIERS.find(t => t.tierLevel === state.guardianTier) || GUARDIAN_TIERS[0];

  const handlePinClick = (area: AreaDetail) => {
    const isUnlocked = state.unlockedAreas.includes(area.id);
    if (!isUnlocked) {
      sound.playGentle();
      return;
    }
    sound.playPop(550);
    setSelectedArea(area);
  };

  const handleStartStage = (areaId: AreaId, stageNumber: number) => {
    sound.playSuccess();
    onSelectStage(areaId, stageNumber);
  };

  // Node positions on the 7-region tiered adventure map
  const NODE_COORDINATES: Record<AreaId, { x: number; y: number; tierLevel: number; elevation: string }> = {
    'pantai-penyu': { x: 18, y: 76, tierLevel: 1, elevation: '0 mdpl' },
    'laut-biru': { x: 38, y: 84, tierLevel: 1, elevation: '-50 mdpl' },
    'hutan-hijau': { x: 46, y: 52, tierLevel: 2, elevation: '400 mdpl' },
    'desa-sungai': { x: 68, y: 62, tierLevel: 2, elevation: '250 mdpl' },
    'kota-bersih': { x: 82, y: 40, tierLevel: 3, elevation: '100 mdpl' },
    'puncak-gunung': { x: 30, y: 24, tierLevel: 4, elevation: '2.500 mdpl' },
    'langit-ozon': { x: 72, y: 16, tierLevel: 5, elevation: '10.000 mdpl' },
  };

  const stagesForSelected = selectedArea ? AREA_STAGES[selectedArea.id] || [] : [];

  const getDifficultyBadge = (diff: StageDifficulty) => {
    if (diff === 'mudah') {
      return (
        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
          <span>🌱</span> Level 1 • Observasi
        </span>
      );
    } else if (diff === 'menengah') {
      return (
        <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-700" /> Level 2 • Sebab-Akibat
        </span>
      );
    } else {
      return (
        <span className="bg-purple-100 text-purple-900 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
          <Brain className="w-3 h-3 text-purple-700" /> Level 3 • Berpikir Kritis
        </span>
      );
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col p-4 sm:p-6 bg-gradient-to-b from-sky-300 via-emerald-200 to-amber-100 overflow-hidden select-none">
      {/* Top Banner */}
      <div className="max-w-5xl mx-auto w-full flex flex-wrap items-center justify-between gap-3 mb-3 z-10">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border-2 border-emerald-400/60 flex items-center gap-3">
          <div className="text-2xl animate-spin-slow">🗺️</div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
              Peta Ekspedisi Bertingkat
            </h2>
            <p className="text-xs font-bold text-slate-600">
              7 Wilayah Biosfer Vertikal: Palung Laut ➡️ Puncak Gunung ➡️ Kubah Ozon
            </p>
          </div>
        </div>

        {/* Guardian Tier & Earth Health */}
        <div className="flex items-center gap-2">
          {onOpenLicense && (
            <button
              onClick={() => {
                sound.playPop();
                onOpenLicense();
              }}
              className="bg-amber-400 hover:bg-amber-300 text-amber-950 px-3.5 py-2 rounded-2xl font-black text-xs shadow-md flex items-center gap-1.5 transition active:scale-95"
            >
              <Award className="w-4 h-4" />
              <span>{currentTierInfo.badgeIcon} {currentTierInfo.title}</span>
            </button>
          )}

          <div className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border-2 border-sky-400/60 flex items-center gap-2.5">
            <span className="text-2xl animate-pulse">🌍</span>
            <div>
              <div className="flex items-center justify-between text-xs font-black text-slate-700">
                <span>Kesehatan</span>
                <span className="text-emerald-600 font-extrabold ml-2">{state.earthHealth}%</span>
              </div>
              <div className="w-24 sm:w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300 mt-0.5">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-700"
                  style={{ width: `${state.earthHealth}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elevation Tier Filter Tabs */}
      <div className="max-w-5xl mx-auto w-full flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 z-10 scrollbar-none text-xs font-black">
        <button
          onClick={() => {
            sound.playPop(420);
            setSelectedElevationTier('all');
          }}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
            selectedElevationTier === 'all'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white/80 text-slate-700 hover:bg-white'
          }`}
        >
          Semua Tingkat (7 Wilayah)
        </button>

        {[
          { tier: 1, name: 'Tier 1: Laut & Pantai (0m)', icon: '🌊' },
          { tier: 2, name: 'Tier 2: Hutan & Sungai (400m)', icon: '🌳' },
          { tier: 3, name: 'Tier 3: Kota Sirkular (100m)', icon: '🏙️' },
          { tier: 4, name: 'Tier 4: Puncak Mahameru (2.500m)', icon: '🏔️' },
          { tier: 5, name: 'Tier 5: Langit Ozon (10.000m)', icon: '🌤️' },
        ].map(item => (
          <button
            key={item.tier}
            onClick={() => {
              sound.playPop(450 + item.tier * 20);
              setSelectedElevationTier(item.tier);
            }}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition flex items-center gap-1 ${
              selectedElevationTier === item.tier
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white/80 text-slate-700 hover:bg-white'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Main Adventure Map Canvas Area */}
      <div className="relative max-w-5xl mx-auto w-full flex-1 min-h-[500px] card-game overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-tr from-sky-400 via-teal-300 to-amber-200">
        {/* SVG Decorative Map Background Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,150 Q120,130 240,150 T480,150 T720,150 T960,150 T1200,150" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
          <path d="M0,280 Q100,260 200,280 T400,280 T600,280 T800,280 T1000,280" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
          <path d="M0,420 Q140,400 280,420 T560,420 T840,420 T1120,420" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />

          {/* Island Landmasses */}
          <ellipse cx="28%" cy="78%" rx="24%" ry="18%" fill="#fef08a" opacity="0.85" />
          <ellipse cx="50%" cy="54%" rx="22%" ry="20%" fill="#86efac" opacity="0.85" />
          <ellipse cx="78%" cy="50%" rx="22%" ry="32%" fill="#fed7aa" opacity="0.85" />
          {/* High Mountain Silhouette */}
          <polygon points="200,220 320,80 440,220" fill="#fde68a" opacity="0.6" />
          {/* Cloud Layer Sky */}
          <ellipse cx="70%" cy="16%" rx="20%" ry="12%" fill="#bae6fd" opacity="0.75" />

          {/* Ascending elevation dashed path line */}
          <path
            d={`M 18% 76% Q 28% 86% 38% 84% T 46% 52% T 68% 62% T 82% 40% T 30% 24% T 72% 16%`}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="5"
            strokeDasharray="10,10"
            className="animate-pulse"
          />
        </svg>

        {/* Small floating decorations */}
        <div className="absolute top-8 left-8 text-2xl animate-float-slow opacity-80 pointer-events-none">🦅</div>
        <div className="absolute top-16 right-12 text-3xl animate-float opacity-75 pointer-events-none">☁️</div>
        <div className="absolute bottom-6 right-1/3 text-2xl animate-bounce-gentle opacity-80 pointer-events-none">🐬</div>

        {/* Area Pins */}
        {AREAS.map(area => {
          const isUnlocked = state.unlockedAreas.includes(area.id);
          const completion = state.completedMissions[area.id];
          const isCompleted = !!completion;
          const pos = NODE_COORDINATES[area.id];
          const isCurrentTarget = !isCompleted && isUnlocked;

          // Filter by elevation tier if selected
          const isFaded = selectedElevationTier !== 'all' && pos.tierLevel !== selectedElevationTier;

          // Count completed stages in this area
          const stagesCompletedInArea = [1, 2, 3].filter(
            lvl => !!state.completedStages?.[`${area.id}-${lvl}`]
          ).length;

          return (
            <div
              key={area.id}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${
                isFaded ? 'opacity-30 scale-90' : 'opacity-100'
              }`}
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

                {/* Stages progress pill */}
                {isUnlocked && (
                  <div className="bg-white/95 px-2 py-0.5 rounded-full border border-amber-300 shadow-md -mt-2.5 z-10 text-[10px] font-black text-amber-900">
                    Level {stagesCompletedInArea}/3
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
                  <span className="text-[9px] text-slate-500 font-bold hidden sm:inline">({pos.elevation})</span>
                </div>
              </button>
            </div>
          );
        })}

        {/* Selected Area Chapter Stage Selection Modal */}
        {selectedArea && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
            <div className="card-game w-full max-w-lg p-5 sm:p-6 relative border-4 border-amber-400 bg-gradient-to-b from-white via-amber-50 to-emerald-50 shadow-2xl text-slate-900 my-auto">
              <button
                onClick={() => setSelectedArea(null)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 font-black text-xl w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>

              {/* Area Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-sm">
                  {selectedArea.icon}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    {selectedArea.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {selectedArea.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-bold text-slate-700 mb-3 bg-white/80 p-2.5 rounded-2xl border border-amber-200">
                Pilih level tantangan berpikir untuk menyelamatkan wilayah ini:
              </p>

              {/* 3 Progressive Stages List */}
              <div className="space-y-2.5 mb-4">
                {stagesForSelected.map(stage => {
                  const unlocked = isStageUnlocked(state, selectedArea.id, stage.stageNumber);
                  const stageData = state.completedStages?.[`${selectedArea.id}-${stage.stageNumber}`];
                  const isDone = !!stageData;

                  return (
                    <div
                      key={stage.id}
                      className={`p-3 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                        isDone
                          ? 'bg-emerald-50/90 border-emerald-400 shadow-sm'
                          : unlocked
                          ? 'bg-white border-amber-400 shadow-md ring-1 ring-amber-300'
                          : 'bg-slate-100 border-slate-300 opacity-65'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 flex-1">
                        <span className="text-2xl sm:text-3xl shrink-0 mt-0.5">{stage.icon}</span>
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                            {getDifficultyBadge(stage.difficulty)}
                            {isDone && (
                              <span className="text-amber-500 font-bold text-xs flex items-center gap-0.5">
                                {'⭐'.repeat(stageData.stars)}
                              </span>
                            )}
                          </div>
                          <h4 className="font-black text-xs sm:text-sm text-slate-900 leading-tight">
                            {stage.title}
                          </h4>
                          <p className="text-[11px] text-slate-600 font-bold leading-snug line-clamp-1">
                            {stage.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex justify-end">
                        {unlocked ? (
                          <button
                            onClick={() => handleStartStage(selectedArea.id, stage.stageNumber)}
                            className="btn-green px-4 py-2 text-xs font-black flex items-center gap-1 shadow-sm"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>{isDone ? 'Main Ulang' : 'Main Sekarang'}</span>
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-black text-slate-500 bg-slate-200 px-3 py-1.5 rounded-xl">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Terkunci</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setSelectedArea(null)}
                className="w-full py-2.5 rounded-2xl font-black text-xs bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Kembali ke Peta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
