import React from 'react';
import { GameScreen, GameState } from '../../types/game';
import { KidAvatar } from './KidAvatar';
import { sound } from '../../lib/soundEngine';
import { getLevelInfo } from '../../lib/gameState';
import { Volume2, VolumeX, MapPin, Home, Award, BookOpen, Bot, GraduationCap } from 'lucide-react';

interface NavbarProps {
  state: GameState;
  currentScreen: GameScreen;
  onNavigate: (screen: GameScreen) => void;
  onToggleSound: () => void;
  onOpenTeacher: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  state,
  currentScreen,
  onNavigate,
  onToggleSound,
  onOpenTeacher,
}) => {
  const levelInfo = getLevelInfo(state.xp);

  const handleNavClick = (screen: GameScreen) => {
    sound.playPop();
    onNavigate(screen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/90 backdrop-blur-md border-b-2 border-emerald-600/40 text-white px-3 py-2 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Player Profile & Level */}
        <div className="flex items-center gap-2 sm:gap-3">
          {state.player && (
            <div
              onClick={() => handleNavClick('world-map')}
              className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition"
              title="Ke Peta Dunia"
            >
              <KidAvatar avatarId={state.player.avatarId} size={42} />
              <div className="flex flex-col">
                <span className="font-extrabold text-sm sm:text-base leading-tight text-emerald-300">
                  {state.player.name}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span className="bg-emerald-800 text-emerald-200 px-1.5 py-0.5 rounded-full font-bold text-[10px]">
                    Lv.{levelInfo.level}
                  </span>
                  <span className="hidden md:inline font-semibold">{levelInfo.title}</span>
                </div>
              </div>
            </div>
          )}

          {/* Earth Health Status Bar */}
          <div
            className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-2xl border border-slate-700 shadow-inner"
            title="Kesehatan Bumi Global"
          >
            <span className="text-base animate-pulse">🌍</span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Bumi</span>
              <span className="text-xs font-black text-emerald-400 leading-tight">
                {state.earthHealth}%
              </span>
            </div>
          </div>

          {/* Eco Points Pill */}
          <div
            className="flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-600/50 px-2.5 py-1 rounded-2xl text-emerald-300 font-extrabold text-xs shadow-sm"
            title="Eco Points kamu untuk mempercantik markas"
          >
            <span className="text-base animate-bounce-gentle">🌱</span>
            <span>{state.ecoPoints}</span>
          </div>
        </div>

        {/* Center / Right: Quick Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => handleNavClick('world-map')}
            className={`px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
              currentScreen === 'world-map'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Peta</span>
          </button>

          <button
            onClick={() => handleNavClick('base')}
            className={`px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
              currentScreen === 'base'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Markas</span>
          </button>

          <button
            onClick={() => handleNavClick('license')}
            className={`px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
              currentScreen === 'license'
                ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300'
            }`}
            title="Lihat Piagam Lisensi Bertingkat"
          >
            <span>📜</span>
            <span className="hidden md:inline">Lisensi</span>
          </button>

          <button
            onClick={() => handleNavClick('badges')}
            className={`px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
              currentScreen === 'badges'
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prestasi</span>
          </button>

          <button
            onClick={() => handleNavClick('knowledge')}
            className={`px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
              currentScreen === 'knowledge'
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Buku</span>
          </button>

          <button
            onClick={() => handleNavClick('ai-chat')}
            className={`px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
              currentScreen === 'ai-chat'
                ? 'bg-teal-500 text-white shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 text-teal-300'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tanya BUMI</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title={state.settings.soundEnabled ? 'Suara Aktif (Klik untuk Matikan)' : 'Suara Mati (Klik untuk Nyalakan)'}
            aria-label="Toggle Sound"
          >
            {state.settings.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-rose-400" />
            )}
          </button>

          {/* Teacher Mode Button (Discreet) */}
          <button
            onClick={onOpenTeacher}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-amber-300 transition"
            title="Mode Guru & Orang Tua"
            aria-label="Mode Guru"
          >
            <GraduationCap className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </header>
  );
};
