import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Building2, Bus, Sun, Trees, CloudRain, Sparkles, CheckCircle2 } from 'lucide-react';

interface EcoCityPlannerStageProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

interface EcoInfrastructure {
  id: string;
  name: string;
  targetSectorIdx: number;
  icon: string;
  benefit: string;
}

export const EcoCityPlannerStage: React.FC<EcoCityPlannerStageProps> = ({
  onComplete,
  onExit,
}) => {
  const infrastructures: EcoInfrastructure[] = [
    {
      id: 'infra-bus',
      name: 'Koridor Bus Listrik Kota',
      targetSectorIdx: 0, // Transport Sector
      icon: '🚌⚡',
      benefit: 'Kurangi asap knalpot jalan raya',
    },
    {
      id: 'infra-atap',
      name: 'Atap Hijau Gedung (Green Roof)',
      targetSectorIdx: 1, // Commercial Office Sector
      icon: '🏢🌿',
      benefit: 'Turunkan panas gedung & buat oksigen',
    },
    {
      id: 'infra-rain',
      name: 'Taman Resapan Hujan (Rain Garden)',
      targetSectorIdx: 2, // Residential Sector
      icon: '🌧️🌸',
      benefit: 'Cegah banjir & serap air hujan ke tanah',
    },
    {
      id: 'infra-solar',
      name: 'Pembangkit Surya Atap (Solar Power)',
      targetSectorIdx: 3, // Energy Sector
      icon: '🌞🔋',
      benefit: 'Listrik bersih tanpa asap polusi',
    },
  ];

  // 4 city sectors
  const [placedInfra, setPlacedInfra] = useState<(EcoInfrastructure | null)[]>([null, null, null, null]);
  const [selectedInfra, setSelectedInfra] = useState<EcoInfrastructure | null>(null);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Kamu adalah Arsitek Kota Hijau! Tempatkan 4 infrastruktur ramah lingkungan di sektor kota yang paling tepat untuk menurunkan polusi! 🏙️🌱'
  );

  const placedCount = placedInfra.filter(Boolean).length;
  // Pollution index decreases as green infra is placed: 85% -> 60% -> 40% -> 25% -> 10%
  const currentPollution = Math.max(10, 85 - placedCount * 19);

  const handlePlaceInfra = (sectorIdx: number) => {
    if (!selectedInfra) {
      sound.playGentle();
      setBumiSpeech('Pilih kartu teknologi hijau di bawah terlebih dahulu ya! 🏙️');
      return;
    }

    if (selectedInfra.targetSectorIdx === sectorIdx) {
      sound.playSuccess();
      const updated = [...placedInfra];
      updated[sectorIdx] = selectedInfra;
      setPlacedInfra(updated);
      setSelectedInfra(null);

      if (updated.every(Boolean)) {
        sound.playSuccess();
        setBumiEmotion('excited');
        setBumiSpeech('LUAR BIASA! 🌟 Kota Bersih kini resmi menjadi Smart Eco-City! Udara segar, energi bersih, dan warga hidup bahagia!');
        setTimeout(() => onComplete(3, 100), 2200);
      } else {
        setBumiEmotion('happy');
        setBumiSpeech(`Sempurna! ${selectedInfra.name} terpasang di zonanya! Polusi kota menurun drastis!`);
      }
    } else {
      sound.playGentle();
      setBumiEmotion('thinking');
      setBumiSpeech(`Teknologi ${selectedInfra.name} kurang cocok untuk sektor ini. Coba pasang di sektor kota yang relevan! 🤔`);
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-sky-200 via-teal-100 to-amber-100 text-slate-900">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-purple-500 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-purple-950">
          <Building2 className="w-5 h-5 text-purple-600" />
          <span>Level 3: Arsitek Kota Hijau Cerdas</span>
        </div>

        {/* Pollution Meter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 hidden sm:inline">Indeks Polusi:</span>
          <span className={`px-3 py-1 rounded-xl text-xs font-black border ${currentPollution <= 20 ? 'bg-emerald-100 border-emerald-400 text-emerald-950' : 'bg-rose-100 border-rose-400 text-rose-950'}`}>
            🌫️ Polusi: {currentPollution}% {currentPollution <= 20 ? '(Sangat Bersih)' : '(Tinggi)'}
          </span>
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
        >
          Peta
        </button>
      </div>

      {/* Main City Grid Stage */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-between">
        {/* City Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 my-auto">
          {[
            { name: 'Sektor 1: Jalur Transportasi', issue: 'Macet & Asap Bensin', icon: '🛣️' },
            { name: 'Sektor 2: Gedung Perkantoran', issue: 'Gedung Kaca Panas', icon: '🏢' },
            { name: 'Sektor 3: Permukiman Warga', issue: 'Saluran Rawan Banjir', icon: '🏘️' },
            { name: 'Sektor 4: Sumber Energi Kota', issue: 'Polusi Asap Batu Bara', icon: '🏭' },
          ].map((sector, idx) => {
            const placed = placedInfra[idx];

            return (
              <div
                key={idx}
                onClick={() => handlePlaceInfra(idx)}
                className={`card-game p-4 flex flex-col justify-between border-2 transition-all cursor-pointer ${
                  placed
                    ? 'bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                    : 'bg-white/85 border-dashed border-amber-300 hover:border-purple-400 hover:scale-102'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{placed ? placed.icon : sector.icon}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${placed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {placed ? '🌱 Eco' : '⚠️ ' + sector.issue}
                  </span>
                </div>

                <div className="my-2">
                  <h4 className="font-black text-xs sm:text-sm text-slate-900">{sector.name}</h4>
                  <p className="text-[11px] text-slate-500 font-bold">{placed ? placed.benefit : 'Klik untuk tempatkan solusi'}</p>
                </div>

                <div className="bg-white rounded-xl p-2 text-center border border-slate-200 text-xs font-black text-purple-900">
                  {placed ? `✅ ${placed.name}` : '+ Pasang Solusi'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Infrastructure Palette */}
        <div className="mt-2">
          <div className="text-xs font-black text-slate-700 mb-1.5 flex items-center gap-1">
            <span>⚡</span>
            <span>Teknologi Kota Ramah Lingkungan (Klik Kartu Lalu Klik Sektor Kota):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {infrastructures.map(infra => {
              const isUsed = placedInfra.some(p => p?.id === infra.id);
              const isSelected = selectedInfra?.id === infra.id;

              return (
                <button
                  key={infra.id}
                  disabled={isUsed}
                  onClick={() => {
                    sound.playPop();
                    setSelectedInfra(infra);
                  }}
                  className={`p-2.5 rounded-2xl border-2 flex items-center gap-2.5 transition text-left ${
                    isUsed
                      ? 'bg-slate-100 border-slate-300 opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'bg-purple-100 border-purple-600 shadow-md scale-102 ring-2 ring-purple-400'
                      : 'bg-white border-slate-200 hover:border-purple-400 hover:bg-purple-50 cursor-pointer shadow-sm'
                  }`}
                >
                  <span className="text-2xl">{infra.icon}</span>
                  <div>
                    <h5 className="text-xs font-black text-slate-900 truncate">{infra.name}</h5>
                    <p className="text-[10px] text-slate-500 font-bold truncate">{infra.benefit}</p>
                  </div>
                </button>
              );
            })}
          </div>
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
