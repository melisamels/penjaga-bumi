import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AreaId } from '../../types/game';
import { AREAS, BADGES } from '../../lib/missionData';
import { sound } from '../../lib/soundEngine';
import { Star, MapPin, Award, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface MissionCelebrationProps {
  areaId: AreaId;
  stars: number;
  nextAreaUnlocked: AreaId | null;
  newBadges: string[];
  onBackToMap: () => void;
}

export const MissionCelebration: React.FC<MissionCelebrationProps> = ({
  areaId,
  stars,
  nextAreaUnlocked,
  newBadges,
  onBackToMap,
}) => {
  const currentArea = AREAS.find(a => a.id === areaId);
  const nextArea = AREAS.find(a => a.id === nextAreaUnlocked);
  const earnedBadge = BADGES.find(b => newBadges.includes(b.id) || b.areaRequired === areaId);

  useEffect(() => {
    // Play celebratory sound
    sound.playFanfare();

    // Trigger confetti fireworks
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#38bdf8', '#facc15', '#ec4899', '#a855f7'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 400);
    } catch {}
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto select-none">
      <div className="card-game w-full max-w-lg p-6 sm:p-8 relative border-4 border-amber-400 bg-gradient-to-b from-amber-50 via-white to-emerald-50 text-slate-900 shadow-2xl text-center my-8">
        {/* Celebration header */}
        <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-950 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-md mb-3 animate-bounce-gentle">
          <Sparkles className="w-4 h-4 text-amber-900" />
          <span>✨ MISI BERHASIL DITUNTASKAN! ✨</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-1">
          {currentArea?.name} Telah Diselamatkan! 🎉
        </h2>

        <p className="text-sm font-bold text-slate-600 mb-4">
          Hebat sekali, Guardian! Berkat bantuanmu, alam di wilayah ini kembali asri dan satwa hidup tenang!
        </p>

        {/* Stars rating */}
        <div className="flex justify-center items-center gap-2 mb-5">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`p-2 rounded-full transform transition-transform ${
                s <= stars ? 'scale-110 animate-bounce' : 'opacity-40'
              }`}
              style={{ animationDelay: `${s * 200}ms` }}
            >
              <Star
                className={`w-10 h-10 ${
                  s <= stars
                    ? 'fill-amber-400 text-amber-500 drop-shadow-md'
                    : 'text-slate-300'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Before / After Transformation visual summary */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 bg-white/90 p-3 rounded-2xl border border-slate-200 shadow-inner mb-5">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-2.5 flex flex-col items-center">
            <span className="text-[10px] font-black uppercase text-rose-700 mb-1">Kondisi Awal (Kotor)</span>
            <div className="text-3xl opacity-80 filter grayscale-[40%]">🗑️🌫️🥺</div>
            <span className="text-[11px] font-bold text-slate-600 mt-1">Sampah berceceran</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 flex flex-col items-center">
            <span className="text-[10px] font-black uppercase text-emerald-700 mb-1">Kondisi Sekarang (Asri)</span>
            <div className="text-3xl animate-bounce-gentle">✨🐢🌊🌿</div>
            <span className="text-[11px] font-bold text-emerald-800 mt-1">Bersih & Satwa Ceria</span>
          </div>
        </div>

        {/* Rewards pill */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-emerald-100 border border-emerald-300 rounded-2xl p-2.5 flex items-center justify-center gap-2 text-emerald-950 font-black text-sm">
            <span className="text-xl">🌱</span>
            <span>+100 Eco Points</span>
          </div>
          <div className="bg-amber-100 border border-amber-300 rounded-2xl p-2.5 flex items-center justify-center gap-2 text-amber-950 font-black text-sm">
            <span className="text-xl">🌟</span>
            <span>+200 XP</span>
          </div>
        </div>

        {/* New Badge Unlocked */}
        {earnedBadge && (
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 border-2 border-purple-300 rounded-2xl p-3.5 mb-5 flex items-center gap-3 text-left shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center text-2xl shadow-md shrink-0">
              {earnedBadge.icon}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-purple-700 tracking-wider">Lencana Baru Diraih!</span>
              <h4 className="font-black text-slate-900 text-sm sm:text-base leading-tight">
                {earnedBadge.title}
              </h4>
              <p className="text-xs text-slate-600 font-semibold line-clamp-1">
                {earnedBadge.description}
              </p>
            </div>
          </div>
        )}

        {/* Next Area Unlock notification */}
        {nextArea && (
          <div className="bg-sky-100 border border-sky-300 rounded-2xl p-2.5 mb-5 text-sky-950 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 animate-pulse">
            <span>🔓</span>
            <span>WILAYAH BARU TERBUKA: {nextArea.name.toUpperCase()}!</span>
          </div>
        )}

        {/* Return to map button */}
        <button
          onClick={() => {
            sound.playPop();
            onBackToMap();
          }}
          className="btn-green w-full py-3.5 sm:py-4 text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl"
        >
          <MapPin className="w-5 h-5" />
          <span>KEMBALI KE PETA DUNIA</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
