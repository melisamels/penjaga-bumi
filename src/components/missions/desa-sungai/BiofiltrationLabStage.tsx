import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Beaker, Droplets, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

interface BiofiltrationLabStageProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

interface FilterMaterial {
  id: string;
  name: string;
  layerTarget: number; // 1 = top, 2 = mid-top, 3 = mid-bottom, 4 = bottom
  icon: string;
  role: string;
}

export const BiofiltrationLabStage: React.FC<BiofiltrationLabStageProps> = ({
  onComplete,
  onExit,
}) => {
  const materials: FilterMaterial[] = [
    { id: 'mat-kerikil', name: 'Batu Kerikil Kasar', layerTarget: 1, icon: '🪨', role: 'Saring ranting & kotoran besar' },
    { id: 'mat-pasir', name: 'Pasir Silika Bersih', layerTarget: 2, icon: '🏖️', role: 'Saring partikel lumpur halus' },
    { id: 'mat-arang', name: 'Arang Karbon Aktif', layerTarget: 3, icon: '🪵', role: 'Serap bau & zat kimia beracun' },
    { id: 'mat-vetiver', name: 'Akar Alami & Ijuk', layerTarget: 4, icon: '🌿', role: 'Saringan halus air jernih' },
  ];

  // 4 slots in the biofilter column (index 0 is top layer 1, index 3 is bottom layer 4)
  const [tubeLayers, setTubeLayers] = useState<(FilterMaterial | null)[]>([null, null, null, null]);
  const [isWaterFlowing, setIsWaterFlowing] = useState(false);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Air sungai keruh dan berbau! Susun 4 lapisan filter alami dari bahan yang paling kasar di atas hingga paling halus di bawah! 🧪💧'
  );

  const handleSelectMaterial = (material: FilterMaterial) => {
    // Find first empty slot
    const emptyIdx = tubeLayers.findIndex(slot => slot === null);
    if (emptyIdx === -1) {
      sound.playGentle();
      setBumiSpeech('Tabung filter sudah penuh! Klik tombol Uji Aliran Air atau Atur Ulang! 🧪');
      return;
    }

    sound.playPop(520 + emptyIdx * 40);
    const updated = [...tubeLayers];
    updated[emptyIdx] = material;
    setTubeLayers(updated);

    if (updated.every(Boolean)) {
      sound.playSuccess();
      setBumiEmotion('happy');
      setBumiSpeech('Semua lapisan filter telah terpasang! Sekarang klik "UJI ALIRAN AIR SUNGAI" untuk melihat hasilnya! ✨');
    } else {
      setBumiSpeech(`Lapisan ${emptyIdx + 1} terisi ${material.name}. Lanjutkan ke lapisan berikutnya!`);
    }
  };

  const handleResetTube = () => {
    sound.playPop(420);
    setTubeLayers([null, null, null, null]);
    setIsWaterFlowing(false);
    setBumiSpeech('Tabung filter dikosongkan. Ingat: kotoran paling kasar disaring pertama di bagian paling atas! 🧠');
  };

  const handleTestFilter = () => {
    if (tubeLayers.some(l => l === null)) {
      sound.playGentle();
      setBumiSpeech('Isi lengkap ke-4 lapisan tabung filter terlebih dahulu ya! 💧');
      return;
    }

    // Check if the layers match the correct logical sequence: 1 -> 2 -> 3 -> 4
    const isOrderCorrect =
      tubeLayers[0]?.layerTarget === 1 &&
      tubeLayers[1]?.layerTarget === 2 &&
      tubeLayers[2]?.layerTarget === 3 &&
      tubeLayers[3]?.layerTarget === 4;

    setIsWaterFlowing(true);

    if (isOrderCorrect) {
      sound.playWaterSplash();
      setBumiEmotion('excited');
      setBumiSpeech('LUAR BIASA! 🌟 Air sungai keruh berhasil tersaring sempurna menjadi air jernih berkilau tanpa bau dan racun!');
      setTimeout(() => onComplete(3, 100), 2200);
    } else {
      sound.playGentle();
      setBumiEmotion('caring');
      setBumiSpeech('Air masih agak keruh karena susunan filternya terbalik! Bahan paling kasar (kerikil) harus berada di paling atas! 🤔');
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-cyan-100 via-teal-100 to-sky-200 text-slate-900">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-cyan-500 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-cyan-950">
          <Beaker className="w-5 h-5 text-cyan-600" />
          <span>Level 2: Laboratorium Biofiltrasi Alami</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetTube}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Atur Ulang</span>
          </button>
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
        >
          Peta
        </button>
      </div>

      {/* Main Filter Column Arena */}
      <div className="relative z-20 flex-1 max-w-4xl mx-auto w-full min-h-[380px] p-4 flex flex-col sm:flex-row items-center justify-around gap-6">
        {/* Left: Biofilter Tube Column */}
        <div className="w-full sm:w-80 bg-white/90 rounded-3xl p-5 border-4 border-cyan-400 shadow-2xl flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 mb-2">
            <span>💧 Air Keruh Masuk (Atas)</span>
          </div>

          {/* 4 Layer Slots in Tube */}
          <div className="w-full space-y-2 border-x-4 border-slate-300 px-3 py-2 bg-slate-50 rounded-2xl min-h-[220px] flex flex-col justify-between">
            {[0, 1, 2, 3].map(slotIdx => {
              const layer = tubeLayers[slotIdx];

              return (
                <div
                  key={slotIdx}
                  className={`p-2.5 rounded-xl border-2 flex items-center justify-between transition-all ${
                    layer
                      ? 'bg-cyan-50 border-cyan-400 text-cyan-950 font-black shadow-sm'
                      : 'bg-white border-dashed border-slate-300 text-slate-400 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{layer ? layer.icon : '⚪'}</span>
                    <div className="text-left">
                      <span className="text-xs font-black block">
                        {layer ? layer.name : `Lapisan ${slotIdx + 1} (Kosong)`}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {layer ? layer.role : 'Pilih bahan di samping'}
                      </span>
                    </div>
                  </div>
                  {layer && <CheckCircle2 className="w-4 h-4 text-cyan-600" />}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 mt-2">
            <span>✨ Tetesan Air Jernih (Bawah)</span>
          </div>

          <button
            onClick={handleTestFilter}
            className="btn-green w-full py-3 mt-3 text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-md"
          >
            <Droplets className="w-4 h-4" />
            <span>UJI ALIRAN AIR SUNGAI! 🌊</span>
          </button>
        </div>

        {/* Right: Available Materials Palette */}
        <div className="w-full sm:w-96 flex flex-col space-y-2.5">
          <div className="text-xs font-black text-slate-800 flex items-center gap-1">
            <span>🧪</span>
            <span>Bahan Filter Alami (Klik Berurutan untuk Memasukkan ke Tabung):</span>
          </div>

          {materials.map(mat => {
            const isUsed = tubeLayers.some(l => l?.id === mat.id);

            return (
              <button
                key={mat.id}
                disabled={isUsed}
                onClick={() => handleSelectMaterial(mat)}
                className={`card-game p-3 flex items-center justify-between transition-all text-left ${
                  isUsed
                    ? 'opacity-40 grayscale-[60%] border-slate-300 cursor-not-allowed bg-slate-100'
                    : 'hover:scale-102 hover:border-cyan-500 hover:bg-cyan-50/70 cursor-pointer bg-white border-2 border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{mat.icon}</span>
                  <div>
                    <h5 className="font-black text-xs sm:text-sm text-slate-900">{mat.name}</h5>
                    <p className="text-[11px] text-slate-600 font-bold">{mat.role}</p>
                  </div>
                </div>

                <span className={`text-xs font-black px-2.5 py-1 rounded-xl ${isUsed ? 'bg-slate-200 text-slate-600' : 'bg-cyan-100 text-cyan-800'}`}>
                  {isUsed ? 'Terpasang' : '+ Pilih'}
                </span>
              </button>
            );
          })}
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
