import React, { useState } from 'react';
import { KNOWLEDGE_CARDS } from '../../lib/missionData';
import { GameState, KnowledgeCard } from '../../types/game';
import { sound } from '../../lib/soundEngine';
import { BookOpen, Sparkles, Lock, ArrowLeft } from 'lucide-react';

interface KnowledgeBookProps {
  state: GameState;
  onClose: () => void;
}

export const KnowledgeBook: React.FC<KnowledgeBookProps> = ({ state, onClose }) => {
  const [selectedCard, setSelectedCard] = useState<KnowledgeCard | null>(null);

  const handleCardClick = (card: KnowledgeCard) => {
    const isUnlocked = state.knowledgeCards.includes(card.id) || card.unlocked;
    if (!isUnlocked) {
      sound.playGentle();
      return;
    }
    sound.playPop(580);
    setSelectedCard(card);
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col p-4 sm:p-6 bg-gradient-to-b from-sky-100 via-teal-50 to-emerald-50 select-none">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-3 mb-4">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border-2 border-sky-400 flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-sky-600" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Buku Pengetahuan Alam IPAS
            </h2>
            <p className="text-xs font-bold text-slate-600">
              Kumpulan kartu fakta seru tentang bumi dan satwa kita!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-white transition shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {KNOWLEDGE_CARDS.map(card => {
          const isUnlocked = state.knowledgeCards.includes(card.id) || card.unlocked;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`card-game p-5 flex flex-col items-center text-center cursor-pointer transition-all ${
                isUnlocked
                  ? 'border-2 border-sky-300 bg-white hover:border-sky-500 hover:shadow-xl hover:scale-102'
                  : 'border border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-3 ${
                  isUnlocked ? 'bg-sky-100' : 'bg-slate-300 text-slate-500'
                }`}
              >
                {isUnlocked ? card.icon : <Lock className="w-6 h-6" />}
              </div>

              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full mb-1">
                Kategori: {card.category}
              </span>

              <h3 className="font-black text-slate-900 text-base sm:text-lg mb-1">
                {card.title}
              </h3>

              <p className="text-xs font-bold text-slate-600 line-clamp-2 mb-3">
                {isUnlocked ? card.summary : 'Selesaikan misi terkait untuk membuka kartu ini!'}
              </p>

              {isUnlocked && (
                <span className="text-[11px] font-black text-sky-600 hover:underline mt-auto">
                  Baca Fakta Seru ✨
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Card Detail Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="card-game w-full max-w-md p-6 relative border-4 border-sky-400 bg-gradient-to-b from-white to-sky-50 shadow-2xl text-slate-900">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 font-black text-xl w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">{selectedCard.icon}</span>
              <div>
                <span className="text-xs font-black uppercase text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  {selectedCard.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {selectedCard.title}
                </h3>
              </div>
            </div>

            <p className="text-sm font-bold text-slate-700 mb-4 bg-white/80 p-3 rounded-2xl border border-slate-200 leading-relaxed">
              {selectedCard.summary}
            </p>

            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3.5 mb-5 flex items-start gap-2.5">
              <span className="text-2xl shrink-0">💡</span>
              <div>
                <span className="text-xs font-black text-amber-900 uppercase">Tahukah Kamu?</span>
                <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 leading-snug">
                  {selectedCard.funFact}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCard(null)}
              className="btn-blue w-full py-3 text-sm font-black"
            >
              Selesai Membaca! 👍
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
