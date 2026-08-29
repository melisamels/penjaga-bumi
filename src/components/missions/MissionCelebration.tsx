import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AreaId } from '../../types/game';
import { AREAS, BADGES, GUARDIAN_TIERS } from '../../lib/missionData';
import { sound } from '../../lib/soundEngine';
import { Star, MapPin, Award, ArrowRight, Sparkles, CheckCircle2, Play } from 'lucide-react';

interface MissionCelebrationProps {
  areaId: AreaId;
  stageNumber?: number;
  stars: number;
  nextStageUnlocked?: number | null;
  nextAreaUnlocked: AreaId | null;
  newBadges: string[];
  newTierUnlocked?: number | null;
  onBackToMap: () => void;
  onNextStage?: () => void;
}

export const MissionCelebration: React.FC<MissionCelebrationProps> = ({
  areaId,
  stageNumber = 1,
  stars,
  nextStageUnlocked,
  nextAreaUnlocked,
  newBadges,
  newTierUnlocked,
  onBackToMap,
  onNextStage,
}) => {
  const currentArea = AREAS.find(a => a.id === areaId);
  const nextArea = AREAS.find(a => a.id === nextAreaUnlocked);
  const earnedBadge = BADGES.find(b => newBadges.includes(b.id) || (stageNumber === 3 && b.areaRequired === areaId));
  const newTierInfo = GUARDIAN_TIERS.find(t => t.tierLevel === newTierUnlocked);

  useEffect(() => {
    sound.playFanfare();

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#38bdf8', '#facc15', '#ec4899', '#a855f7'],
      });
      setTimeout(() => {
        confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
      }, 400);
    } catch {}
  }, []);

  const xpEarned = stageNumber === 1 ? 120 : stageNumber === 2 ? 180 : 250;
  const pointsEarned = stageNumber === 1 ? 60 : stageNumber === 2 ? 90 : 120;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto select-none">
      <div className="card-game w-full max-w-lg p-6 sm:p-8 relative border-4 border-amber-400 bg-gradient-to-b from-amber-50 via-white to-emerald-50 text-slate-900 shadow-2xl text-center my-8">
        {/* Celebration header */}
        <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-950 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-md mb-3 animate-bounce-gentle">
          <Sparkles className="w-4 h-4 text-amber-900" />
          <span>✨ TANTANGAN LEVEL BERHASIL! ✨</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
          {currentArea?.name} — Level {stageNumber} Selesai! 🎉
        </h2>

        <p className="text-xs sm:text-sm font-bold text-slate-600 mb-4">
          Luar biasa, Guardian! Pemikiran dan aksimu membuat lingkungan ini semakin pulih dan lestari!
        </p>

        {/* Stars rating */}
        <div className="flex justify-center items-center gap-2 mb-4">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`p-2 rounded-full transform transition-transform ${
                s <= stars ? 'scale-110 animate-bounce' : 'opacity-40'
              }`}
              style={{ animationDelay: `${s * 200}ms` }}
            >
              <Star
                className={`w-9 h-9 ${
                  s <= stars ? 'fill-amber-400 text-amber-500 drop-shadow-md' : 'text-slate-300'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Rewards pill */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-emerald-100 border border-emerald-300 rounded-2xl p-2.5 flex items-center justify-center gap-2 text-emerald-950 font-black text-xs sm:text-sm">
            <span className="text-lg">🌱</span>
            <span>+{pointsEarned} Eco Points</span>
          </div>
          <div className="bg-amber-100 border border-amber-300 rounded-2xl p-2.5 flex items-center justify-center gap-2 text-amber-950 font-black text-xs sm:text-sm">
            <span className="text-lg">🌟</span>
            <span>+{xpEarned} XP</span>
          </div>
        </div>

        {/* New Badge Unlocked */}
        {earnedBadge && (
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 border-2 border-purple-300 rounded-2xl p-3 mb-4 flex items-center gap-3 text-left shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
              {earnedBadge.icon}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-purple-700 tracking-wider">Lencana Baru Diraih!</span>
              <h4 className="font-black text-slate-900 text-xs sm:text-sm leading-tight">
                {earnedBadge.title}
              </h4>
              <p className="text-[11px] text-slate-600 font-semibold line-clamp-1">
                {earnedBadge.description}
              </p>
            </div>
          </div>
        )}

        {/* Next Stage / Next Area Notification */}
        {newTierInfo && (
          <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-amber-950 border-2 border-amber-500 rounded-2xl p-3 mb-4 shadow-lg animate-bounce">
            <div className="text-2xl mb-0.5">{newTierInfo.badgeIcon}</div>
            <span className="text-[10px] font-black uppercase tracking-wider block">🎉 NAIK TINGKAT PANGKAT GUARDIAN! 🎉</span>
            <h3 className="font-black text-base">{newTierInfo.title}</h3>
            <p className="text-[11px] font-bold mt-0.5">{newTierInfo.subtitle}</p>
          </div>
        )}

        {nextStageUnlocked ? (
          <div className="bg-amber-100 border border-amber-400 rounded-2xl p-2.5 mb-4 text-amber-950 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 animate-pulse">
            <span>🔓</span>
            <span>LEVEL {nextStageUnlocked} TERBUKA: TANTANGAN LEBIH SERU!</span>
          </div>
        ) : nextArea ? (
          <div className="bg-sky-100 border border-sky-300 rounded-2xl p-2.5 mb-4 text-sky-950 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 animate-pulse">
            <span>🔓</span>
            <span>CHAPTER BARU TERBUKA: {nextArea.name.toUpperCase()}!</span>
          </div>
        ) : null}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => {
              sound.playPop();
              onBackToMap();
            }}
            className="flex-1 py-3 rounded-2xl font-black text-xs sm:text-sm bg-slate-200 hover:bg-slate-300 text-slate-800 flex items-center justify-center gap-1.5 transition"
          >
            <MapPin className="w-4 h-4" />
            <span>Ke Peta Dunia</span>
          </button>

          {nextStageUnlocked && onNextStage && (
            <button
              onClick={() => {
                sound.playSuccess();
                onNextStage();
              }}
              className="btn-green flex-1 py-3 text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-lg"
            >
              <span>LANJUT LEVEL {nextStageUnlocked}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
