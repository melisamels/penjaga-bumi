import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { RefreshCw, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface CircularEconomyStageProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

interface WastePair {
  id: string;
  wasteName: string;
  wasteIcon: string;
  productName: string;
  productIcon: string;
  fact: string;
}

export const CircularEconomyStage: React.FC<CircularEconomyStageProps> = ({
  onComplete,
  onExit,
}) => {
  const pairs: WastePair[] = [
    {
      id: 'circ-1',
      wasteName: 'Botol Plastik PET',
      wasteIcon: '🥤',
      productName: 'Baju Kaos Olahraga Sintetis',
      productIcon: '👕',
      fact: 'Dibutuhkan sekitar 12 botol plastik daur ulang untuk membuat sehelai baju kaos ramah lingkungan!',
    },
    {
      id: 'circ-2',
      wasteName: 'Sisa Kulit Pisang & Makanan',
      wasteIcon: '🍌',
      productName: 'Kompos Tanaman & Gas Memasak Biogas',
      productIcon: '⚡',
      fact: 'Bakteri pengurai mengubah sisa sayur menjadi pupuk subur dan gas alami pengganti elpiji!',
    },
    {
      id: 'circ-3',
      wasteName: 'Kardus & Kertas Bekas',
      wasteIcon: '📦',
      productName: 'Buku Tulis & Kotak Paket Daur Ulang',
      productIcon: '📚',
      fact: 'Mendaur ulang 1 ton kertas menyelamatkan 17 pohon hutan agar tidak ditebang!',
    },
    {
      id: 'circ-4',
      wasteName: 'Minyak Jelantah Dapur',
      wasteIcon: '🛢️',
      productName: 'Biodiesel Bersih Bahan Bakar Bus',
      productIcon: '🚌',
      fact: 'Minyak goreng bekas disaring dan diolah menjadi bahan bakar biodiesel yang tidak mencemari selokan!',
    },
  ];

  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [selectedWaste, setSelectedWaste] = useState<WastePair | null>(null);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Di pabrik ekonomi sirkular, sampah diubah jadi produk berguna! Cocokkan sampah dengan barang barunya! ♻️✨'
  );

  const handleSelectWaste = (pair: WastePair) => {
    if (matchedIds.includes(pair.id)) return;
    sound.playPop(520);
    setSelectedWaste(pair);
    setBumiSpeech(`Kira-kira ${pair.wasteName} bisa didaur ulang menjadi apa ya? Pilih produk di sebelah kanan!`);
  };

  const handleSelectProduct = (productPair: WastePair) => {
    if (!selectedWaste) {
      sound.playGentle();
      setBumiSpeech('Pilih jenis sampah di sebelah kiri terlebih dahulu ya! 🗑️');
      return;
    }

    if (selectedWaste.id === productPair.id) {
      sound.playSuccess();
      const updated = [...matchedIds, selectedWaste.id];
      setMatchedIds(updated);
      setBumiEmotion('excited');
      setBumiSpeech(`TEPAT SEKALI! 🌟 ${selectedWaste.fact}`);
      setSelectedWaste(null);

      if (updated.length === pairs.length) {
        sound.playSuccess();
        setTimeout(() => onComplete(3, 100), 2200);
      }
    } else {
      sound.playGentle();
      setBumiEmotion('thinking');
      setBumiSpeech('Bukan itu produk olahannya! Coba pikirkan sifat bahan baku sampah tersebut ya! 🤔');
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-purple-100 via-amber-50 to-emerald-100 text-slate-900">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-purple-500 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-purple-950">
          <RefreshCw className="w-5 h-5 text-purple-600" />
          <span>Level 2: Pabrik Ekonomi Sirkular Kota</span>
        </div>

        <div className="bg-purple-100 border border-purple-400 px-3 py-1 rounded-xl text-xs font-black text-purple-950">
          Produk Tercipta: {matchedIds.length} / {pairs.length}
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
        >
          Peta
        </button>
      </div>

      {/* Main Matching Stage */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col sm:flex-row items-center justify-around gap-6">
        {/* Left Column: Waste materials */}
        <div className="w-full sm:w-1/2 space-y-2.5">
          <div className="text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
            <span>🗑️</span>
            <span>1. Pilih Sampah Daur Ulang:</span>
          </div>

          {pairs.map(p => {
            const isMatched = matchedIds.includes(p.id);
            const isSelected = selectedWaste?.id === p.id;

            return (
              <button
                key={p.id}
                disabled={isMatched}
                onClick={() => handleSelectWaste(p)}
                className={`w-full card-game p-3.5 flex items-center justify-between border-2 transition-all ${
                  isMatched
                    ? 'opacity-40 grayscale-[60%] border-slate-300 bg-slate-100 cursor-default'
                    : isSelected
                    ? 'border-purple-600 bg-purple-100 scale-102 shadow-md ring-2 ring-purple-400'
                    : 'border-slate-200 hover:border-purple-400 hover:bg-purple-50 cursor-pointer shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{p.wasteIcon}</span>
                  <span className="font-black text-xs sm:text-sm text-slate-900">{p.wasteName}</span>
                </div>
                {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {isSelected && <ArrowRight className="w-5 h-5 text-purple-600 animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Right Column: Transformed Products */}
        <div className="w-full sm:w-1/2 space-y-2.5">
          <div className="text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
            <span>✨</span>
            <span>2. Cocokkan dengan Produk Jadi:</span>
          </div>

          {/* Shuffled or reversed products */}
          {[pairs[1], pairs[3], pairs[0], pairs[2]].map(p => {
            const isMatched = matchedIds.includes(p.id);

            return (
              <button
                key={p.id}
                disabled={isMatched}
                onClick={() => handleSelectProduct(p)}
                className={`w-full card-game p-3.5 flex items-center justify-between border-2 transition-all ${
                  isMatched
                    ? 'opacity-40 grayscale-[60%] border-slate-300 bg-slate-100 cursor-default'
                    : 'border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer shadow-sm hover:scale-102'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{p.productIcon}</span>
                  <div className="text-left">
                    <span className="font-black text-xs sm:text-sm text-slate-900 block">{p.productName}</span>
                    <span className="text-[10px] text-slate-500 font-bold">Produk Ramah Lingkungan</span>
                  </div>
                </div>
                <span className={`text-xs font-black px-2.5 py-1 rounded-xl ${isMatched ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}`}>
                  {isMatched ? 'Daur Ulang Sukses' : 'Pilih Produk'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-purple-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
          <BumiAvatar size={65} emotion={bumiEmotion} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
              BUMI berkata:
            </span>
            <p className="text-sm sm:text-base font-extrabold text-slate-800 mt-1">
              {bumiSpeech}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
