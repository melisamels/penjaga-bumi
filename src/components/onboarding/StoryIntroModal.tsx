import React, { useState } from 'react';
import { BumiAvatar } from '../common/BumiAvatar';
import { sound } from '../../lib/soundEngine';
import { AlertCircle, Rocket, Sparkles, HeartCrack } from 'lucide-react';

interface StoryIntroModalProps {
  playerName: string;
  onStartMission: () => void;
}

export const StoryIntroModal: React.FC<StoryIntroModalProps> = ({
  playerName,
  onStartMission,
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  const handleNext = () => {
    sound.playPop(560);
    setStep(2);
  };

  const handleStart = () => {
    sound.playSuccess();
    onStartMission();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="card-game w-full max-w-lg p-6 sm:p-8 relative border-4 border-emerald-400 bg-gradient-to-b from-white to-emerald-50 text-slate-900 shadow-2xl">
        {step === 1 ? (
          <div className="flex flex-col items-center text-center space-y-4">
            <BumiAvatar size={120} emotion="happy" isFloating />

            <div className="bg-emerald-100/80 text-emerald-900 text-xs font-black px-3 py-1 rounded-full border border-emerald-300">
              🌟 PESAN RESMI EARTH GUARDIAN
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Halo, Guardian {playerName}! 🤖✨
            </h2>

            <p className="text-base sm:text-lg font-bold text-slate-700 leading-relaxed">
              Aku <span className="text-emerald-700 font-extrabold">BUMI</span>, robot sahabat lingkunganmu! Aku senang sekali kamu bergabung menjadi anggota Penjaga Bumi.
            </p>

            {/* Earth health warning card */}
            <div className="w-full bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 sm:p-4 flex items-center gap-3 text-left">
              <div className="text-3xl animate-bounce-gentle shrink-0">🌍💔</div>
              <div>
                <span className="text-xs font-black text-rose-600 uppercase flex items-center gap-1">
                  <HeartCrack className="w-3.5 h-3.5" /> Kesehatan Bumi Sedang Kritis (20%)
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-700">
                  Bumi kita sedang menghadapi banyak masalah sampah dan lingkungan. Kita harus segera bertindak!
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="btn-green w-full py-3.5 text-lg flex items-center justify-center gap-2 shadow-lg"
            >
              <span>APA YANG HARUS KITA LAKUKAN?</span>
              <span>👉</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <BumiAvatar size={110} emotion="worried" isFloating />
              <div className="absolute -top-2 -right-2 bg-rose-500 text-white font-black text-xs px-2 py-1 rounded-full animate-bounce shadow-md flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> DARURAT!
              </div>
            </div>

            {/* Emergency alert banner */}
            <div className="bg-rose-500 text-white text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 animate-pulse">
              <span>🚨 PANGGILAN DARURAT MASUK! 🚨</span>
            </div>

            <div className="bg-sky-50 border-2 border-sky-300 rounded-3xl p-4 w-full shadow-inner flex items-center gap-4 text-left">
              <div className="text-4xl shrink-0 animate-wiggle">🐢</div>
              <div>
                <h4 className="font-black text-slate-900 text-base sm:text-lg">
                  Wilayah 1: Pantai Penyu
                </h4>
                <p className="text-xs sm:text-sm font-bold text-slate-700 leading-snug">
                  “Tolong aku, Guardian! Pantai penuh sampah plastik dan kaleng. Aku tidak bisa membuat sarang untuk bertelur...”
                </p>
              </div>
            </div>

            <p className="text-sm font-bold text-emerald-800">
              Apakah kamu siap meluncur untuk misi pertamamu?
            </p>

            <button
              onClick={handleStart}
              className="btn-green w-full py-4 text-xl flex items-center justify-center gap-2 shadow-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            >
              <Rocket className="w-6 h-6 animate-bounce-gentle" />
              <span>LUNCURKAN MISI PANTAI! 🚀</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
