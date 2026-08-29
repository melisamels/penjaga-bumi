import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Shield, Waves, Sparkles, CheckCircle2, Trees } from 'lucide-react';

interface MangroveDefenseStageProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const MangroveDefenseStage: React.FC<MangroveDefenseStageProps> = ({
  onComplete,
  onExit,
}) => {
  // 3 coastal zones with different wave force:
  // Zone 0: Barat (Wave force: 1 tree needed)
  // Zone 1: Tengah (Wave force: 2 trees needed - strongest storm)
  // Zone 2: Timur (Wave force: 1 tree needed)
  const requiredTrees = [1, 2, 1];
  const [plantedInZones, setPlantedInZones] = useState<number[]>([0, 0, 0]);
  const [seedInventory, setSeedInventory] = useState<number>(4);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Gelombang pasang mengikis pasir sarang penyu! Tanam 4 bibit mangrove di zona yang tepat untuk meredam ombak badai! 🌱🌊'
  );

  const isZoneProtected = (idx: number) => plantedInZones[idx] >= requiredTrees[idx];
  const allZonesProtected = requiredTrees.every((req, idx) => plantedInZones[idx] >= req);

  const handlePlantMangrove = (zoneIdx: number) => {
    if (seedInventory <= 0) {
      sound.playGentle();
      setBumiEmotion('thinking');
      setBumiSpeech('Semua bibit mangrove sudah tertanam! Periksa apakah benteng ombaknya sudah seimbang! 🌱');
      return;
    }

    sound.playPop(520);
    const updated = [...plantedInZones];
    updated[zoneIdx] += 1;
    setPlantedInZones(updated);
    setSeedInventory(prev => prev - 1);

    if (updated[zoneIdx] >= requiredTrees[zoneIdx]) {
      sound.playSuccess();
      setBumiEmotion('happy');
      setBumiSpeech(`Bagus sekali! Zona ini sekarang terlindungi dari hempasan ombak berkat akar tunjang mangrove! 🛡️`);
    } else {
      setBumiSpeech('Satu mangrove tertanam. Zona ini masih membutuhkan perlindungan tambahan karena ombaknya besar!');
    }
  };

  const handleResetPlot = () => {
    sound.playPop(420);
    setPlantedInZones([0, 0, 0]);
    setSeedInventory(4);
    setBumiSpeech('Bibit mangrove ditarik kembali. Ayo rencanakan formasi penahan ombak yang paling pas! 🧠');
  };

  const handleTestWaveDefense = () => {
    if (allZonesProtected) {
      sound.playSuccess();
      setBumiEmotion('excited');
      setBumiSpeech('LUAR BIASA! 🌟 Benteng mangrove sukses memecah energi gelombang badai! Sarang penyu dan pasir pantai selamat!');
      setTimeout(() => onComplete(3, 100), 2000);
    } else {
      sound.playGentle();
      setBumiEmotion('caring');
      setBumiSpeech('Ombak masih menembus zona yang kurang pohon mangrove! Coba seimbangkan penanaman bibitnya ya! 🤔');
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-sky-400 via-teal-200 to-amber-200 text-slate-900">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-emerald-500 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-emerald-950">
          <Shield className="w-5 h-5 text-emerald-600" />
          <span>Level 3: Benteng Mangrove Penahan Ombak</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-100 border border-emerald-400 px-3 py-1 rounded-xl text-xs font-black text-emerald-950">
            Bibit Tersedia: {seedInventory} 🌱
          </span>
          <button
            onClick={handleResetPlot}
            className="px-2.5 py-1 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
          >
            Ulang
          </button>
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
        >
          Peta
        </button>
      </div>

      {/* Main Coastal Waves & Zones */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-between">
        {/* Ocean waves simulator top */}
        <div className="flex items-center justify-between text-xs font-black text-slate-700 bg-white/70 p-2.5 rounded-2xl border border-sky-300 mb-2">
          <span className="flex items-center gap-1.5">
            <Waves className="w-4 h-4 text-sky-600 animate-pulse" />
            <span>Arah Gelombang Badai Laut (Klik Zona Pasir untuk Menanam Mangrove):</span>
          </span>
          <span className="text-emerald-700 font-extrabold">Formasi Pelindung Alami</span>
        </div>

        {/* 3 Coastal Zones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
          {['Zona Barat (Arus Sedang)', 'Zona Tengah (Arus Sangat Kuat)', 'Zona Timur (Arus Sedang)'].map(
            (label, idx) => {
              const req = requiredTrees[idx];
              const count = plantedInZones[idx];
              const safe = count >= req;

              return (
                <div
                  key={idx}
                  onClick={() => handlePlantMangrove(idx)}
                  className={`card-game p-4 flex flex-col justify-between border-3 transition-all cursor-pointer group ${
                    safe
                      ? 'bg-emerald-50/90 border-emerald-500 shadow-lg ring-2 ring-emerald-300'
                      : 'bg-white/85 border-amber-300 hover:border-emerald-400 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800">{label}</span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        safe ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {safe ? '🛡️ Aman' : '🌊 Rawan Abrasi'}
                    </span>
                  </div>

                  {/* Wave energy visualization */}
                  <div className="my-2 bg-sky-100 rounded-xl p-2 text-center flex items-center justify-center gap-1">
                    <span className="text-sm font-bold text-sky-800">
                      Kekuatan Ombak: {'🌊'.repeat(req)}
                    </span>
                  </div>

                  {/* Planted Mangroves in Zone */}
                  <div className="flex items-center justify-center gap-2 min-h-[70px] bg-amber-50 rounded-2xl border border-amber-200 p-2">
                    {count === 0 ? (
                      <span className="text-xs font-bold text-slate-400 italic">
                        Belum ada mangrove tertanam
                      </span>
                    ) : (
                      Array.from({ length: count }).map((_, treeIdx) => (
                        <div key={treeIdx} className="flex flex-col items-center animate-bounce-gentle">
                          <span className="text-4xl">🌱</span>
                          <span className="text-[10px] font-black text-emerald-800">Bakau</span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-2 text-center text-xs font-bold text-slate-600">
                    Kebutuhan: {count} / {req} Pohon
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Action Button: Test Wave Defense */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleTestWaveDefense}
            className={`px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 shadow-xl transition-all ${
              allZonesProtected
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-bounce ring-4 ring-emerald-300 cursor-pointer'
                : 'bg-amber-400 hover:bg-amber-500 text-amber-950 cursor-pointer'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span>UJI KETAHANAN BENTENG OMBAK! 🌊</span>
          </button>
        </div>
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-emerald-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
          <BumiAvatar size={65} emotion={bumiEmotion} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
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
