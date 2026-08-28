import React, { useState } from 'react';
import { HABITAT_PAIRS, HabitatPair } from '../../../lib/missionData';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Sparkles, Droplets, CheckCircle2, Trees } from 'lucide-react';

interface HutanHijauGameProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const HutanHijauGame: React.FC<HutanHijauGameProps> = ({ onComplete, onExit }) => {
  // Phase 1: Replanting seeds & watering (3 trees)
  // Phase 2: "Siapa tinggal di mana?" matching animals to their homes
  const [phase, setPhase] = useState<1 | 2>(1);

  // Phase 1 state
  const [plantedTrees, setPlantedTrees] = useState<number[]>([0, 0, 0]); // 0=unplanted, 1=seed, 2=sprout, 3=big tree
  const [activeTool, setActiveTool] = useState<'seed' | 'water'>('seed');

  // Phase 2 state: animal habitat matching
  const [matchedAnimals, setMatchedAnimals] = useState<string[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<HabitatPair | null>(null);

  const [bumiMessage, setBumiMessage] = useState(
    'Banyak pohon yang ditebang! Ayo tanam bibit baru dan sirami sampai tumbuh rindang! 🌱💧'
  );
  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('happy');

  // Tree planting interaction
  const handlePlotClick = (index: number) => {
    const currentStage = plantedTrees[index];
    if (activeTool === 'seed' && currentStage === 0) {
      sound.playPop(480);
      const updated = [...plantedTrees];
      updated[index] = 1; // seed planted
      setPlantedTrees(updated);
      setActiveTool('water');
      setBumiEmotion('happy');
      setBumiMessage('Bagus! Bibit sudah ditanam di tanah subur. Sekarang sirami dengan air bersih! 💧');
    } else if (activeTool === 'water' && currentStage === 1) {
      sound.playWaterSplash();
      const updated = [...plantedTrees];
      updated[index] = 3; // grown tree!
      setPlantedTrees(updated);
      setActiveTool('seed');

      // Check if all 3 trees are fully grown
      if (updated.every(s => s === 3)) {
        sound.playSuccess();
        setBumiEmotion('excited');
        setBumiMessage('Pohon-pohon sudah tumbuh rindang! Sekarang ayo kembalikan hewan-hewan ke rumahnya! 🐦🐿️');
        setTimeout(() => setPhase(2), 1600);
      } else {
        sound.playPop(620);
        setBumiEmotion('happy');
        setBumiMessage('Hore! Pohonnya tumbuh besar dan sejuk! Ayo tanam di tanah berikutnya!');
      }
    } else {
      sound.playGentle();
      if (activeTool === 'seed' && currentStage > 0) {
        setBumiMessage('Tanah ini sudah ada pohonnya! Pilih tanah yang masih kosong ya! 🌱');
      } else if (activeTool === 'water' && currentStage === 0) {
        setBumiMessage('Tanam bibit pohonnya dulu sebelum disiram ya! 🌱');
      }
    }
  };

  // Phase 2: Animal selection & habitat matching
  const handleSelectAnimal = (animal: HabitatPair) => {
    if (matchedAnimals.includes(animal.animalId)) return;
    sound.playPop(520);
    setSelectedAnimal(animal);
    setBumiEmotion('thinking');
    setBumiMessage(`Di manakah rumah alami untuk si ${animal.animalName}?`);
  };

  const handleHabitatTargetClick = (habitatId: string) => {
    if (!selectedAnimal) {
      sound.playGentle();
      setBumiMessage('Pilih hewan yang ingin kamu bantu dulu ya! 🐾');
      return;
    }

    if (selectedAnimal.targetHabitatId === habitatId) {
      // Matched successfully!
      sound.playSuccess();
      const updated = [...matchedAnimals, selectedAnimal.animalId];
      setMatchedAnimals(updated);
      setBumiEmotion('excited');
      setBumiMessage(`TEPAT SEKALI! 🌟 ${selectedAnimal.funFact}`);
      setSelectedAnimal(null);

      if (updated.length === HABITAT_PAIRS.length) {
        sound.playSuccess();
        setTimeout(() => onComplete(3, 100), 2000);
      }
    } else {
      // Friendly, supportive reminder
      sound.playGentle();
      setBumiEmotion('caring');
      setBumiMessage(`Hmm... ${selectedAnimal.animalName} sepertinya lebih nyaman di tempat lain. Coba pikirkan lagi rumah aslinya! 🤔`);
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-emerald-100 via-teal-100 to-amber-100 text-slate-900">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-emerald-400 shadow-lg mt-2">
        <div className="flex items-center gap-2 font-black text-sm text-emerald-950">
          <Trees className="w-5 h-5 text-emerald-600" />
          <span>{phase === 1 ? 'Langkah 1: Menanam Pohon Rindang' : 'Langkah 2: Siapa Tinggal Di Mana?'}</span>
        </div>

        <div className="bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-xl text-xs font-black text-emerald-900">
          {phase === 1
            ? `Pohon Tumbuh: ${plantedTrees.filter(s => s === 3).length} / 3`
            : `Satwa Kembali: ${matchedAnimals.length} / ${HABITAT_PAIRS.length}`}
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
        >
          Peta
        </button>
      </div>

      {/* Main Gameplay Screen */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full p-4 flex flex-col items-center justify-center">
        {phase === 1 ? (
          // PHASE 1: Replanting interactive garden
          <div className="w-full flex flex-col items-center space-y-6">
            {/* Tool Selection (Bibit vs Air) */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  sound.playPop();
                  setActiveTool('seed');
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-base transition-all ${
                  activeTool === 'seed'
                    ? 'bg-emerald-500 text-white shadow-xl scale-105 ring-4 ring-emerald-300'
                    : 'bg-white text-slate-700 shadow-md opacity-80'
                }`}
              >
                <span className="text-2xl">🌱</span>
                <span>Alat Bibit Pohon</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  setActiveTool('water');
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-base transition-all ${
                  activeTool === 'water'
                    ? 'bg-sky-500 text-white shadow-xl scale-105 ring-4 ring-sky-300'
                    : 'bg-white text-slate-700 shadow-md opacity-80'
                }`}
              >
                <Droplets className="w-6 h-6 text-white" />
                <span>Siraman Air Segar</span>
              </button>
            </div>

            {/* 3 Garden Planting Plots */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
              {[0, 1, 2].map(idx => {
                const stage = plantedTrees[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => handlePlotClick(idx)}
                    className="card-game p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 group min-h-[220px]"
                  >
                    <div className="text-6xl sm:text-7xl transition-transform group-hover:scale-110">
                      {stage === 0 ? '🕳️' : stage === 1 ? '🌱' : '🌳'}
                    </div>

                    <div className="text-center">
                      <span className="text-xs font-black uppercase text-emerald-800">
                        {stage === 0 ? 'Lahan Kosong' : stage === 1 ? 'Bibit Tertanam' : 'Pohon Rindang Sehat!'}
                      </span>
                      <p className="text-[11px] font-bold text-slate-500">
                        {stage === 0
                          ? 'Klik dengan bibit 🌱'
                          : stage === 1
                          ? 'Klik dengan air 💧'
                          : 'Pohon siap jadi rumah satwa! ✨'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // PHASE 2: "Siapa tinggal di mana?" matching game
          <div className="w-full flex flex-col items-center space-y-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 text-center">
              🐾 Tarik atau Cocokkan Satwa ke Rumah Alaminya!
            </h3>

            {/* Animal Selection Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
              {HABITAT_PAIRS.map(item => {
                const isMatched = matchedAnimals.includes(item.animalId);
                const isSelected = selectedAnimal?.animalId === item.animalId;
                return (
                  <button
                    key={item.animalId}
                    disabled={isMatched}
                    onClick={() => handleSelectAnimal(item)}
                    className={`card-game p-3 flex flex-col items-center transition-all ${
                      isMatched
                        ? 'opacity-40 grayscale-[70%] border-slate-300 cursor-default'
                        : isSelected
                        ? 'border-4 border-amber-500 bg-amber-100 scale-105 shadow-xl'
                        : 'hover:scale-105 cursor-pointer bg-white'
                    }`}
                  >
                    <span className="text-4xl sm:text-5xl animate-bounce-gentle">{item.animalIcon}</span>
                    <span className="text-xs font-black text-slate-900 mt-2 text-center">
                      {item.animalName}
                    </span>
                    {isMatched && (
                      <span className="text-[10px] font-black text-emerald-700 flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3 h-3" /> Selamat!
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Habitats Destinations */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
              {[
                { id: 'hab-pohon', name: 'Dahan Pohon Rimbun', icon: '🌳' },
                { id: 'hab-sungai', name: 'Aliran Sungai Jernih', icon: '💧' },
                { id: 'hab-bunga', name: 'Kelopak Bunga Mekar', icon: '🌼' },
                { id: 'hab-lubang-pohon', name: 'Lubang Batang Pohon', icon: '🪵' },
              ].map(hab => (
                <button
                  key={hab.id}
                  onClick={() => handleHabitatTargetClick(hab.id)}
                  className="card-game p-4 flex flex-col items-center justify-center gap-1.5 hover:border-emerald-500 hover:bg-emerald-50 transition cursor-pointer active:scale-95 border-2 border-emerald-300"
                >
                  <span className="text-4xl">{hab.icon}</span>
                  <span className="text-xs font-black text-emerald-950 text-center leading-tight">
                    {hab.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">Pilih Rumah Ini</span>
                </button>
              ))}
            </div>
          </div>
        )}
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
              {bumiMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
