import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Droplet, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface PuncakGunungStage2Props {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

interface MountainTrash {
  id: string;
  name: string;
  icon: string;
  cleaned: boolean;
}

export const PuncakGunungStage2: React.FC<PuncakGunungStage2Props> = ({
  onComplete,
  onExit,
}) => {
  const [trashList, setTrashList] = useState<MountainTrash[]>([
    { id: 'tr-1', name: 'Botol Minuman Plastik', icon: '🥤', cleaned: false },
    { id: 'tr-2', name: 'Kaleng Gas Portabel Bekas', icon: '🛢️', cleaned: false },
    { id: 'tr-3', name: 'Bungkus Plastik Makanan', icon: '🥡', cleaned: false },
    { id: 'tr-4', name: 'Sisa Tisu Basah Sintetis', icon: '🧻', cleaned: false },
  ]);

  const [signsPlaced, setSignsPlaced] = useState<boolean[]>([false, false]);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Danau kawah adalah hulu mata air seluruh pulau! Angkat sampah pendaki dan pasang papan peringatan agar air hulu tetap murni! 💧🏔️'
  );

  const allTrashCleaned = trashList.every(t => t.cleaned);
  const allSignsPlaced = signsPlaced.every(Boolean);

  const handleCleanTrash = (id: string) => {
    sound.playPop(520);
    const updated = trashList.map(t => (t.id === id ? { ...t, cleaned: true } : t));
    setTrashList(updated);

    if (updated.every(t => t.cleaned)) {
      sound.playSuccess();
      setBumiEmotion('happy');
      setBumiSpeech('Semua sampah di danau kawah berhasil diangkat ke dalam ransel penjaga! Sekarang pasang papan edukasi! 🎒');
    } else {
      setBumiSpeech('Satu sampah berhasil dibersihkan dari bibir danau hulu! 👍');
    }
  };

  const handlePlaceSign = (idx: number) => {
    sound.playPop(580);
    const updated = [...signsPlaced];
    updated[idx] = true;
    setSignsPlaced(updated);

    if (updated.every(Boolean) && allTrashCleaned) {
      sound.playSuccess();
      setBumiEmotion('excited');
      setBumiSpeech('SEMPURNA! 🌟 Hulu mata air kini bersih murni bagai kristal! Air segar mengalir menyuburkan seluruh sungai di daratan bawah!');
      setTimeout(() => onComplete(3, 100), 2200);
    } else {
      setBumiSpeech('Papan edukasi tertancap kokoh! Pendaki lain akan ingat untuk menjaga kebersihan hulu!');
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-sky-400 via-teal-200 to-emerald-800 text-slate-900">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-cyan-500 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-cyan-950">
          <Droplet className="w-5 h-5 text-cyan-600" />
          <span>Level 2: Patroli Bersih Hulu Mata Air Kawah</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-black">
          <span className={`px-2.5 py-1 rounded-xl border ${allTrashCleaned ? 'bg-emerald-100 border-emerald-400 text-emerald-950' : 'bg-amber-100 border-amber-400 text-amber-950'}`}>
            Sampah: {trashList.filter(t => t.cleaned).length} / 4 Bersih
          </span>
          <span className={`px-2.5 py-1 rounded-xl border ${allSignsPlaced ? 'bg-emerald-100 border-emerald-400 text-emerald-950' : 'bg-amber-100 border-amber-400 text-amber-950'}`}>
            Papan: {signsPlaced.filter(Boolean).length} / 2 Pasang
          </span>
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
        >
          Peta
        </button>
      </div>

      {/* Main Crater Lake Arena */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-around">
        {/* Crater Lake Visual */}
        <div className="bg-white/80 rounded-3xl p-4 border-2 border-cyan-300 flex flex-col items-center">
          <div className="flex items-center gap-2 text-xs font-black text-cyan-900 mb-2">
            <span>🏞️ Danau Kawah Hulu Mata Air Abadi</span>
          </div>

          <div className="w-full max-w-2xl bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-400 h-28 rounded-3xl border-4 border-white shadow-inner flex items-center justify-around p-2">
            <span className="text-3xl animate-bob">💧</span>
            <span className="text-4xl animate-bounce-gentle">✨🏔️✨</span>
            <span className="text-3xl animate-bob">💧</span>
          </div>
        </div>

        {/* Trash Pickup Grid */}
        <div className="space-y-2">
          <div className="text-xs font-black text-slate-700 flex items-center gap-1">
            <span>🎒</span>
            <span>1. Pungut Sampah Pendaki di Bibir Danau (Klik untuk Ambil):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {trashList.map(t => (
              <button
                key={t.id}
                disabled={t.cleaned}
                onClick={() => handleCleanTrash(t.id)}
                className={`card-game p-3 flex items-center justify-between border-2 transition-all ${
                  t.cleaned
                    ? 'bg-emerald-50 border-emerald-400 opacity-60 cursor-default'
                    : 'bg-white border-rose-300 hover:border-emerald-500 hover:scale-102 cursor-pointer shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{t.cleaned ? '✅' : t.icon}</span>
                  <span className="font-black text-xs text-slate-900 truncate">{t.name}</span>
                </div>
                <span className="text-[10px] font-black text-slate-600">{t.cleaned ? 'Ransel' : 'Ambil'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Conservation Signs */}
        <div className="space-y-2">
          <div className="text-xs font-black text-slate-700 flex items-center gap-1">
            <span>🪧</span>
            <span>2. Pasang Papan Konservasi Hulu:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Papan 1: "Bawa Turun Sampahmu Demi Air Bersih!"', 'Papan 2: "Hulu Abadi: Dilarang Membuang Sabun & Kimia"'].map(
              (label, idx) => {
                const placed = signsPlaced[idx];

                return (
                  <button
                    key={idx}
                    disabled={placed}
                    onClick={() => handlePlaceSign(idx)}
                    className={`card-game p-3.5 flex items-center justify-between border-2 transition-all ${
                      placed
                        ? 'bg-emerald-50 border-emerald-500 shadow-sm cursor-default'
                        : 'bg-amber-50/90 border-amber-400 hover:border-emerald-500 hover:scale-101 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{placed ? '🪧✅' : '🪵⛏️'}</span>
                      <span className="font-black text-xs sm:text-sm text-slate-900">{label}</span>
                    </div>
                    <span className={`text-xs font-black px-2.5 py-1 rounded-xl ${placed ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-400 text-amber-950'}`}>
                      {placed ? 'Terpasang' : '+ Tancapkan'}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-cyan-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
          <BumiAvatar size={65} emotion={bumiEmotion} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-full">
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
