import React from 'react';
import { BumiAvatar } from '../common/BumiAvatar';
import { sound } from '../../lib/soundEngine';
import { GameScreen } from '../../types/game';
import { Play, Award, BookOpen, Home, Settings2, Sparkles, HelpCircle } from 'lucide-react';

interface SplashScreenProps {
  hasPlayer: boolean;
  onStart: () => void;
  onNavigate: (screen: GameScreen) => void;
  onOpenSettings: () => void;
  onOpenDaily: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  hasPlayer,
  onStart,
  onNavigate,
  onOpenSettings,
  onOpenDaily,
}) => {
  const handlePlayClick = () => {
    sound.playSuccess();
    onStart();
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden bg-gradient-to-b from-sky-400 via-teal-300 to-emerald-400">
      {/* Decorative animated clouds & birds */}
      <div className="absolute top-8 left-[-10%] w-48 h-16 bg-white/70 rounded-full blur-[1px] animate-float-slow pointer-events-none" />
      <div className="absolute top-24 right-[-5%] w-64 h-20 bg-white/60 rounded-full blur-[1px] animate-float pointer-events-none" />
      <div className="absolute top-12 left-1/3 text-2xl animate-wiggle opacity-80 pointer-events-none">🕊️</div>
      <div className="absolute top-28 right-1/4 text-xl animate-float-slow opacity-75 pointer-events-none">🕊️</div>

      {/* Floating nature leaf badges */}
      <div className="absolute bottom-16 left-6 text-3xl animate-bob opacity-90 pointer-events-none">🌿</div>
      <div className="absolute bottom-28 right-8 text-3xl animate-bounce-gentle opacity-90 pointer-events-none">🐬</div>
      <div className="absolute bottom-12 right-1/3 text-2xl animate-float opacity-80 pointer-events-none">🐢</div>

      {/* Daily mission floating button */}
      <div className="w-full flex justify-end max-w-4xl z-10">
        <button
          onClick={() => {
            sound.playPop();
            onOpenDaily();
          }}
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black px-4 py-2 rounded-2xl shadow-lg border-2 border-amber-600/60 active:scale-95 transition"
        >
          <Sparkles className="w-5 h-5 text-amber-700 animate-spin" />
          <span>Misi Hari Ini! 🌟</span>
        </button>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col items-center text-center z-10 my-auto max-w-2xl">
        {/* Animated BUMI Robot */}
        <div className="mb-3 transform hover:scale-105 transition cursor-pointer" onClick={() => sound.playPop(650)}>
          <BumiAvatar size={150} emotion="happy" isFloating />
        </div>

        {/* Logo Title */}
        <div className="inline-block bg-white/85 backdrop-blur-md px-6 py-2 rounded-full border-2 border-white shadow-md mb-3">
          <span className="text-xs sm:text-sm font-extrabold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5 justify-center">
            <span>🛡️</span> Organisasi Rahasia Pelindung Alam <span>🛡️</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 drop-shadow-md tracking-tight mb-2">
          🌍 PENJAGA BUMI AI
        </h1>

        <p className="text-lg sm:text-2xl font-extrabold text-emerald-900 drop-shadow-sm mb-6 max-w-lg">
          “Selamatkan Bumi, Satu Misi Sekaligus!”
        </p>

        {/* Main Big Play Button */}
        <button
          onClick={handlePlayClick}
          className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-xl sm:text-2xl px-8 sm:px-12 py-4 sm:py-5 rounded-3xl shadow-2xl border-b-8 border-emerald-800 hover:border-emerald-900 active:border-b-0 active:translate-y-2 transition-all transform hover:scale-105"
        >
          <Play className="w-7 h-7 fill-white group-hover:scale-110 transition" />
          <span>{hasPlayer ? 'LANJUTKAN PETUALANGAN' : 'MULAI PETUALANGAN'}</span>
          <span className="absolute -top-3 -right-3 text-2xl animate-bounce">✨</span>
        </button>

        <p className="mt-3 text-xs sm:text-sm font-bold text-slate-800/80 bg-white/50 px-3 py-1 rounded-full">
          🎮 Game Edukasi Lingkungan Interaktif untuk Kelas 3 SD
        </p>
      </div>

      {/* Secondary Bottom Navigation Cards */}
      <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 z-10 mt-6">
        <button
          onClick={() => {
            sound.playPop();
            onNavigate('base');
          }}
          className="card-game p-3 flex flex-col items-center justify-center gap-1.5 hover:bg-white transition active:scale-95 group text-slate-800"
        >
          <div className="p-2 rounded-2xl bg-amber-100 group-hover:bg-amber-200 transition text-amber-700">
            <Home className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm">🎒 Markas Saya</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            onNavigate('badges');
          }}
          className="card-game p-3 flex flex-col items-center justify-center gap-1.5 hover:bg-white transition active:scale-95 group text-slate-800"
        >
          <div className="p-2 rounded-2xl bg-purple-100 group-hover:bg-purple-200 transition text-purple-700">
            <Award className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm">🏆 Prestasi</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            onNavigate('knowledge');
          }}
          className="card-game p-3 flex flex-col items-center justify-center gap-1.5 hover:bg-white transition active:scale-95 group text-slate-800"
        >
          <div className="p-2 rounded-2xl bg-sky-100 group-hover:bg-sky-200 transition text-sky-700">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm">📖 Ensiklopedia</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            onOpenSettings();
          }}
          className="card-game p-3 flex flex-col items-center justify-center gap-1.5 hover:bg-white transition active:scale-95 group text-slate-800"
        >
          <div className="p-2 rounded-2xl bg-slate-100 group-hover:bg-slate-200 transition text-slate-700">
            <Settings2 className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xs sm:text-sm">⚙️ Pengaturan</span>
        </button>
      </div>
    </div>
  );
};
