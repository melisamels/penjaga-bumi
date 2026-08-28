import React, { useState } from 'react';
import { BASE_ITEMS } from '../../lib/missionData';
import { GameState, BaseItem } from '../../types/game';
import { sound } from '../../lib/soundEngine';
import { BumiAvatar } from '../common/BumiAvatar';
import { Home, Sparkles, CheckCircle2, ShoppingBag, PlusCircle } from 'lucide-react';

interface GuardianBaseProps {
  state: GameState;
  onUpdateState: (updater: (prev: GameState) => GameState) => void;
  onBackToMap: () => void;
}

export const GuardianBase: React.FC<GuardianBaseProps> = ({
  state,
  onUpdateState,
  onBackToMap,
}) => {
  const [feedback, setFeedback] = useState('Selamat datang di Markas Penjaga Bumi! Gunakan Eco Points untuk merawat markasmu! 🏡🌿');

  const handleBuyDecoration = (item: BaseItem) => {
    if (state.baseDecorations.includes(item.id)) {
      sound.playGentle();
      setFeedback(`${item.name} sudah terpasang rapi di markasmu!`);
      return;
    }

    if (state.ecoPoints < item.cost) {
      sound.playGentle();
      setFeedback(`Eco Points belum cukup! Kumpulkan lagi poin dengan menyelesaikan misi lingkungan ya! 🌱`);
      return;
    }

    // Purchase item with Eco Points
    sound.playSuccess();
    onUpdateState(prev => ({
      ...prev,
      ecoPoints: prev.ecoPoints - item.cost,
      baseDecorations: [...prev.baseDecorations, item.id],
    }));
    setFeedback(`Hore! ${item.name} berhasil ditambahkan ke markas! Markasmu semakin indah dan sejuk! ✨`);
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col p-4 sm:p-6 bg-gradient-to-b from-amber-100 via-emerald-100 to-sky-100 select-none">
      {/* Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between gap-3 mb-4">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border-2 border-amber-400 flex items-center gap-3">
          <Home className="w-6 h-6 text-amber-600" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Markas Suaka Penjaga Bumi
            </h2>
            <p className="text-xs font-bold text-slate-600">
              Rawat suaka alammu sendiri tanpa biaya uang asli!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 text-white font-black text-xs sm:text-sm px-3.5 py-2 rounded-2xl shadow-md flex items-center gap-1.5">
            <span>🌱</span>
            <span>{state.ecoPoints} Eco Points</span>
          </div>
          <button
            onClick={onBackToMap}
            className="px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-white transition"
          >
            Peta
          </button>
        </div>
      </div>

      {/* Main Sanctuary Garden Visual Area */}
      <div className="relative max-w-5xl mx-auto w-full flex-1 card-game p-6 border-4 border-white shadow-2xl bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-100 flex flex-col justify-between overflow-hidden min-h-[400px]">
        {/* Animated base elements placed by player */}
        <div className="relative w-full flex-1 flex flex-wrap items-center justify-around gap-6 p-4">
          {/* Default Base Tent / Headquarters */}
          <div className="flex flex-col items-center animate-bob">
            <span className="text-7xl">🏡</span>
            <span className="bg-white/90 px-2.5 py-0.5 rounded-full text-xs font-black text-slate-800 shadow mt-1">
              Pusat Komando
            </span>
          </div>

          {/* Purchased base decorations */}
          {BASE_ITEMS.map(item => {
            const isPlaced = state.baseDecorations.includes(item.id);
            if (!isPlaced) return null;
            return (
              <div key={item.id} className="flex flex-col items-center animate-bounce-gentle">
                <span className="text-6xl drop-shadow-md">{item.icon}</span>
                <span className="bg-white/90 px-2 py-0.5 rounded-full text-[11px] font-black text-emerald-900 shadow mt-1">
                  {item.name}
                </span>
              </div>
            );
          })}

          {state.baseDecorations.length === 0 && (
            <div className="bg-white/80 p-4 rounded-3xl border-2 border-dashed border-emerald-400 text-center max-w-sm">
              <span className="text-3xl">🌱</span>
              <h4 className="font-black text-slate-800 text-sm mt-1">Lahan Markas Masih Lapang</h4>
              <p className="text-xs font-bold text-slate-600 mt-0.5">
                Beli pohon, kolam ikan, atau panel surya dari katalog di bawah menggunakan Eco Points kamu!
              </p>
            </div>
          )}
        </div>

        {/* BUMI speech feedback bar */}
        <div className="bg-white/95 rounded-2xl p-3 border-2 border-amber-300 shadow-md flex items-center gap-3 mb-4">
          <BumiAvatar size={50} emotion="happy" isFloating={false} />
          <p className="text-xs sm:text-sm font-extrabold text-slate-800">
            {feedback}
          </p>
        </div>

        {/* Catalog of Base Items */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="w-4 h-4 text-emerald-700" />
            <h3 className="font-black text-sm text-slate-900 uppercase tracking-wide">
              Katalog Suaka (Tukar dengan Eco Points):
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
            {BASE_ITEMS.map(item => {
              const isOwned = state.baseDecorations.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`p-2.5 rounded-2xl border-2 flex flex-col justify-between transition-all ${
                    isOwned
                      ? 'bg-emerald-50 border-emerald-400 opacity-90'
                      : state.ecoPoints >= item.cost
                      ? 'bg-white hover:border-amber-400 shadow-sm hover:shadow-md'
                      : 'bg-slate-50 border-slate-200 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{item.icon}</span>
                    {isOwned ? (
                      <span className="text-emerald-700 font-black text-[10px] flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Ada
                      </span>
                    ) : (
                      <span className="text-amber-800 font-black text-xs flex items-center gap-0.5">
                        <span>🌱</span>
                        <span>{item.cost}</span>
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-black text-slate-900 truncate" title={item.name}>
                    {item.name}
                  </span>

                  <button
                    onClick={() => handleBuyDecoration(item)}
                    disabled={isOwned}
                    className={`mt-2 w-full py-1 rounded-xl text-[11px] font-black transition ${
                      isOwned
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : state.ecoPoints >= item.cost
                        ? 'btn-yellow py-1 text-amber-950 shadow'
                        : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isOwned ? 'Terpasang' : 'Beli & Pasang'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
