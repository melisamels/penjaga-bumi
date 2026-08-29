import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { GitBranch, Trees, Sparkles, CheckCircle2 } from 'lucide-react';

interface CanopyBridgeStageProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

interface BridgeItem {
  id: string;
  name: string;
  targetAnimal: string;
  icon: string;
  description: string;
}

export const CanopyBridgeStage: React.FC<CanopyBridgeStageProps> = ({
  onComplete,
  onExit,
}) => {
  // 3 bridges to build across the highway gap:
  // Slot 0: Orangutan (needs Strong Root Bridge)
  // Slot 1: Tupai (needs Bamboo Walkway)
  // Slot 2: Rangkong & Serangga (needs Flowering Vine Canopy)
  const [placedBridges, setPlacedBridges] = useState<(string | null)[]>([null, null, null]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Jalan raya membelah hutan dan memutus jalur satwa! Pasang jembatan kanopi pohon yang tepat agar orangutan, tupai, dan rangkong bisa melintas aman! 🐒🌳'
  );

  const bridgeOptions: BridgeItem[] = [
    {
      id: 'bridge-akar',
      name: 'Anyaman Dahan & Akar Gantung',
      targetAnimal: 'Orangutan (Kuat & Fleksibel)',
      icon: '🌿',
      description: 'Menahan beban satwa besar seperti orangutan.',
    },
    {
      id: 'bridge-bambu',
      name: 'Titian Batang Bambu Hutan',
      targetAnimal: 'Tupai & Bajing (Lincah & Ringan)',
      icon: '🪵',
      description: 'Permukaan licin stabil untuk pelari cepat.',
    },
    {
      id: 'bridge-sulur',
      name: 'Jalur Sulur Tanaman Berbunga',
      targetAnimal: 'Burung Rangkong & Lebah',
      icon: '🌸',
      description: 'Penuh nektar dan tempat bertengger burung.',
    },
  ];

  const handlePlaceBridge = (slotIdx: number) => {
    if (!selectedTool) {
      sound.playGentle();
      setBumiSpeech('Pilih jenis jembatan alami di bawah terlebih dahulu ya! 🌿');
      return;
    }

    // Required slot match:
    // Slot 0: 'bridge-akar'
    // Slot 1: 'bridge-bambu'
    // Slot 2: 'bridge-sulur'
    const correctIds = ['bridge-akar', 'bridge-bambu', 'bridge-sulur'];
    if (selectedTool === correctIds[slotIdx]) {
      sound.playPop(520 + slotIdx * 50);
      const updated = [...placedBridges];
      updated[slotIdx] = selectedTool;
      setPlacedBridges(updated);
      setSelectedTool(null);

      if (updated.every(Boolean)) {
        sound.playSuccess();
        setBumiEmotion('excited');
        setBumiSpeech('LUAR BIASA! 🌟 Seluruh koridor kanopi satwa telah terhubung! Orangutan dan burung kini melintas dengan tenang di atas jalan!');
        setTimeout(() => onComplete(3, 100), 2000);
      } else {
        setBumiEmotion('happy');
        setBumiSpeech('Pilihan tepat! Jembatan kanopi ini sangat cocok untuk satwa di jalur tersebut!');
      }
    } else {
      sound.playGentle();
      setBumiEmotion('thinking');
      setBumiSpeech('Hmm... jembatan itu kurang pas dengan bobot dan kebiasaan satwa di titik ini. Coba jembatan lainnya! 🤔');
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-emerald-200 via-teal-100 to-amber-100 text-slate-900">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-emerald-500 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-emerald-950">
          <GitBranch className="w-5 h-5 text-emerald-600" />
          <span>Level 2: Koridor Hijau Kanopi Satwa</span>
        </div>

        <div className="bg-emerald-100 border border-emerald-400 px-3 py-1 rounded-xl text-xs font-black text-emerald-950">
          Jembatan Terpasang: {placedBridges.filter(Boolean).length} / 3
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
        >
          Peta
        </button>
      </div>

      {/* Main Highway Canopy Gap Stage */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-between">
        {/* Top Canopy Highway Visual */}
        <div className="relative flex-1 bg-white/70 rounded-3xl border-2 border-emerald-300 p-4 flex flex-col justify-between">
          {/* Canopy Trees & Gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-auto">
            {[
              { title: 'Jalur 1: Khusus Orangutan', weight: 'Satwa Berbobot Berat (Perlu Akar Kokoh)', icon: '🦧' },
              { title: 'Jalur 2: Khusus Tupai & Bajing', weight: 'Satwa Cepat (Perlu Titian Rata)', icon: '🐿️' },
              { title: 'Jalur 3: Khusus Burung Rangkong', weight: 'Satwa Terbang (Perlu Tanaman Berbunga)', icon: '🦜' },
            ].map((slot, idx) => {
              const placedId = placedBridges[idx];
              const placedInfo = bridgeOptions.find(b => b.id === placedId);

              return (
                <div
                  key={idx}
                  onClick={() => handlePlaceBridge(idx)}
                  className={`card-game p-4 flex flex-col justify-between border-2 transition-all cursor-pointer ${
                    placedInfo
                      ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                      : 'bg-amber-50/90 border-dashed border-amber-400 hover:border-emerald-500 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{slot.icon}</span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        placedInfo ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                      }`}
                    >
                      {placedInfo ? '✅ Terhubung' : '❌ Terputus'}
                    </span>
                  </div>

                  <h4 className="font-black text-xs sm:text-sm text-slate-900 mt-2">{slot.title}</h4>
                  <p className="text-[11px] text-slate-500 font-bold mb-2">{slot.weight}</p>

                  <div className="bg-white rounded-xl p-2 text-center border border-slate-200 min-h-[50px] flex items-center justify-center">
                    {placedInfo ? (
                      <span className="font-black text-xs text-emerald-800 flex items-center gap-1">
                        <span>{placedInfo.icon}</span>
                        <span>{placedInfo.name}</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-700">Klik untuk pasang jembatan</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Road below illustration */}
          <div className="w-full bg-slate-700 h-8 rounded-xl flex items-center justify-around text-xs text-amber-300 font-bold px-4 mt-2">
            <span>🛣️ Jalan Raya Bawah (Kendaraan Melintas) 🚗 🚙 🚚</span>
          </div>
        </div>

        {/* Bridge Tools Inventory */}
        <div className="mt-3">
          <div className="text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
            <span>🎒</span>
            <span>Pilih Jenis Jembatan Alami untuk Dipasang:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bridgeOptions.map(bridge => {
              const isSelected = selectedTool === bridge.id;
              const isUsed = placedBridges.includes(bridge.id);

              return (
                <button
                  key={bridge.id}
                  disabled={isUsed}
                  onClick={() => {
                    sound.playPop();
                    setSelectedTool(bridge.id);
                  }}
                  className={`p-3 rounded-2xl border-2 flex items-center gap-3 transition text-left ${
                    isUsed
                      ? 'bg-slate-100 border-slate-300 opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'bg-emerald-100 border-emerald-600 scale-103 shadow-md ring-2 ring-emerald-400'
                      : 'bg-white border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer shadow-sm'
                  }`}
                >
                  <span className="text-3xl">{bridge.icon}</span>
                  <div>
                    <h5 className="text-xs font-black text-slate-900">{bridge.name}</h5>
                    <p className="text-[10px] text-slate-500 font-bold">{bridge.targetAnimal}</p>
                  </div>
                </button>
              );
            })}
          </div>
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
