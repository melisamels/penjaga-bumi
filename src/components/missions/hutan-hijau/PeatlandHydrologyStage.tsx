import React, { useState } from 'react';
import { sound } from '../../../lib/soundEngine';
import { BumiAvatar } from '../../common/BumiAvatar';
import { Droplet, Flame, Sparkles, CheckCircle2, Sliders } from 'lucide-react';

interface PeatlandHydrologyStageProps {
  onComplete: (stars: number, score: number) => void;
  onExit: () => void;
}

export const PeatlandHydrologyStage: React.FC<PeatlandHydrologyStageProps> = ({
  onComplete,
  onExit,
}) => {
  // 3 Canal Gates (Hulu, Tengah, Hilir)
  // Closed = retains water (+moisture), Open = drains water (-moisture)
  const [gatesClosed, setGatesClosed] = useState<boolean[]>([false, false, false]);

  const [bumiEmotion, setBumiEmotion] = useState<'happy' | 'thinking' | 'excited' | 'caring'>('thinking');
  const [bumiSpeech, setBumiSpeech] = useState(
    'Lahan gambut rawan kebakaran jika mengering! Tutup sekat kanal air di posisi yang tepat agar tanah gambut tetap lembap dan sejuk! 🔥💧'
  );

  // Moisture formula based on canal gates:
  // Base dry = 25%
  // Gate Hulu closed = +25%
  // Gate Tengah closed = +30%
  // Gate Hilir closed = +25%
  // Target ideal moisture: 75% to 85% (Hulu + Tengah closed, or Tengah + Hilir closed)
  const currentMoisture =
    25 +
    (gatesClosed[0] ? 25 : 0) +
    (gatesClosed[1] ? 30 : 0) +
    (gatesClosed[2] ? 25 : 0);

  const isMoistureIdeal = currentMoisture >= 75 && currentMoisture <= 85;

  const handleToggleGate = (gateIdx: number) => {
    sound.playPop(480 + gateIdx * 40);
    const updated = [...gatesClosed];
    updated[gateIdx] = !updated[gateIdx];
    setGatesClosed(updated);

    const nextMoisture =
      25 +
      (updated[0] ? 25 : 0) +
      (updated[1] ? 30 : 0) +
      (updated[2] ? 25 : 0);

    if (nextMoisture >= 75 && nextMoisture <= 85) {
      sound.playSuccess();
      setBumiEmotion('excited');
      setBumiSpeech('SANGAT TEPAT! 🌟 Muka air tanah gambut berada di zona ideal! Tanah gambut tetap basah alami dan bebas ancaman api!');
    } else if (nextMoisture > 85) {
      setBumiEmotion('thinking');
      setBumiSpeech('Muka air terlalu tinggi dan mulai meluap menggenangi jalan setapak! Coba buka salah satu sekat kanal! 💧');
    } else {
      setBumiEmotion('caring');
      setBumiSpeech('Tanah masih agak kering di beberapa sektor gambut. Tutup sekat kanal berikutnya untuk menahan air! 🌱');
    }
  };

  const handleValidateHydrology = () => {
    if (isMoistureIdeal) {
      sound.playSuccess();
      setBumiEmotion('excited');
      setBumiSpeech('SEMPURNA! 🌟 Ekosistem lahan basah gambut berhasil distabilkan! Pohon-pohon dan satwa hutan terselamatkan dari kebakaran!');
      setTimeout(() => onComplete(3, 100), 2000);
    } else {
      sound.playGentle();
      setBumiEmotion('thinking');
      setBumiSpeech('Target kelembapan gambut harus berada di Zona Hijau Ideal (75% - 85%)! Sesuaikan saklar sekat kanal ya! 🧠');
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-60px)] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-amber-100 via-emerald-100 to-teal-200 text-slate-900">
      {/* Top HUD */}
      <div className="relative z-30 p-3 max-w-5xl mx-auto w-full flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-amber-500 shadow-xl mt-2">
        <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-950">
          <Sliders className="w-5 h-5 text-amber-600" />
          <span>Level 3: Tata Air & Sekat Kanal Gambut</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-amber-50 border border-amber-300 px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5">
            <Droplet className="w-3.5 h-3.5 text-sky-600" />
            <span>Kelembapan Gambut: {currentMoisture}%</span>
          </div>
        </div>

        <button
          onClick={onExit}
          className="px-3 py-1.5 rounded-xl font-black text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
        >
          Peta
        </button>
      </div>

      {/* Main Peatland Hydrology Canvas */}
      <div className="relative z-20 flex-1 max-w-5xl mx-auto w-full min-h-[380px] p-4 flex flex-col justify-between">
        {/* Moisture Level Indicator Meter */}
        <div className="bg-white/80 p-3.5 rounded-3xl border border-amber-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-xs font-black text-slate-800">Tingkat Kebasahan Tanah Gambut:</span>
            <p className="text-[11px] text-slate-500 font-bold">Zona Aman: 75% - 85% (Mencegah Karhutla Bawah Tanah)</p>
          </div>

          <div className="w-full sm:w-72">
            <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-0.5">
              <span className="text-rose-600 font-black">25% (Kering/Rentan)</span>
              <span className="text-emerald-700 font-black">80% (Zona Ideal)</span>
              <span className="text-sky-700 font-black">105% (Meluap)</span>
            </div>
            <div className="h-4 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isMoistureIdeal
                    ? 'bg-emerald-500 shadow-[0_0_12px_rgba(34,197,94,0.7)]'
                    : currentMoisture > 85
                    ? 'bg-sky-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, currentMoisture)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3 Canal Gates Layout */}
        <div className="my-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Sekat 1: Hulu Hutan Lindung', desc: 'Menahan rembesan air mata air utama' },
            { name: 'Sekat 2: Kanal Tengah Gambut', desc: 'Membasahi kubah gambut terdalam' },
            { name: 'Sekat 3: Hilir Saluran Desa', desc: 'Mengatur limpasan air ke sungai' },
          ].map((gate, idx) => {
            const isClosed = gatesClosed[idx];

            return (
              <div
                key={idx}
                className={`card-game p-5 flex flex-col justify-between border-3 transition-all ${
                  isClosed
                    ? 'bg-teal-50 border-teal-500 shadow-md ring-2 ring-teal-300'
                    : 'bg-amber-50/80 border-amber-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{isClosed ? '🪵🛡️' : '🌊💨'}</span>
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                      isClosed ? 'bg-teal-200 text-teal-900' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isClosed ? 'Pintu Ditutup (Tahan Air)' : 'Pintu Terbuka (Air Hanyut)'}
                  </span>
                </div>

                <h4 className="font-black text-sm text-slate-900 mt-2">{gate.name}</h4>
                <p className="text-xs text-slate-600 font-bold mb-3">{gate.desc}</p>

                <button
                  onClick={() => handleToggleGate(idx)}
                  className={`w-full py-2.5 rounded-2xl font-black text-xs transition cursor-pointer ${
                    isClosed
                      ? 'bg-teal-600 hover:bg-teal-700 text-white'
                      : 'btn-yellow py-2 text-amber-950 shadow'
                  }`}
                >
                  {isClosed ? 'Buka Pintu Sekat 🔓' : 'Tutup Pintu Sekat 🔒'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Action Button: Validate Hydrology Balance */}
        <div className="flex justify-center mt-2">
          <button
            onClick={handleValidateHydrology}
            className={`px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 shadow-xl transition-all ${
              isMoistureIdeal
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-bounce ring-4 ring-emerald-300 cursor-pointer'
                : 'bg-slate-800 hover:bg-slate-700 text-white cursor-pointer'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>KUNCI STABILITAS AIR GAMBUT! 💧</span>
          </button>
        </div>
      </div>

      {/* Bottom BUMI Coach Box */}
      <div className="relative z-30 p-3 sm:p-4 max-w-5xl mx-auto w-full">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-amber-400 p-3 sm:p-4 shadow-xl flex items-center gap-3">
          <BumiAvatar size={65} emotion={bumiEmotion} isFloating={false} />
          <div>
            <span className="text-xs font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
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
