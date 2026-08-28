import React, { useState } from 'react';
import { GameState } from '../../types/game';
import { sound } from '../../lib/soundEngine';
import { GraduationCap, Clock, CheckCircle2, Award, BookOpen, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

interface TeacherDashboardProps {
  state: GameState;
  onClose: () => void;
  onResetProgress: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  state,
  onClose,
  onResetProgress,
}) => {
  // Simple parent gate: 7 x 6 = ?
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [gateAnswer, setGateAnswer] = useState('');
  const [gateError, setGateError] = useState(false);

  const handleVerifyGate = (e: React.FormEvent) => {
    e.preventDefault();
    if (gateAnswer.trim() === '42') {
      sound.playSuccess();
      setIsUnlocked(true);
      setGateError(false);
    } else {
      sound.playGentle();
      setGateError(true);
    }
  };

  const completedCount = Object.keys(state.completedMissions).length;
  const { topicMastery } = state.teacherAnalytics;

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col p-4 sm:p-6 bg-gradient-to-b from-slate-100 to-slate-200 select-none text-slate-800">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-3 mb-4">
        <div className="bg-white px-4 py-2.5 rounded-2xl shadow-md border-2 border-slate-300 flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-slate-700" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Dashboard Guru & Orang Tua
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Analisis pembelajaran IPAS & kepedulian lingkungan anak
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
          <span>Kembali ke Game</span>
        </button>
      </div>

      {!isUnlocked ? (
        // Parent Gate Challenge
        <div className="max-w-md mx-auto w-full my-auto card-game p-6 sm:p-8 bg-white border-2 border-slate-300 shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl mx-auto mb-3">
            🔒
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-1">
            Kunci Keamanan Orang Tua / Guru
          </h3>
          <p className="text-xs font-semibold text-slate-500 mb-4">
            Untuk membuka dashboard pembelajaran, silakan jawab soal matematika berikut:
          </p>

          <form onSubmit={handleVerifyGate} className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-lg font-black text-slate-800">
              7 × 6 = ?
            </div>
            <input
              type="text"
              value={gateAnswer}
              onChange={e => setGateAnswer(e.target.value)}
              placeholder="Jawaban..."
              className="w-full text-center text-xl font-black py-2.5 border-2 border-slate-300 rounded-xl outline-none focus:border-emerald-500"
              autoFocus
            />
            {gateError && (
              <p className="text-xs font-bold text-rose-600">
                Jawaban kurang tepat. Coba hitung lagi ya!
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow transition"
            >
              Buka Dashboard
            </button>
          </form>
        </div>
      ) : (
        // Unlocked Dashboard Content
        <div className="max-w-4xl mx-auto w-full space-y-4">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="card-game p-4 bg-white border border-slate-200 flex flex-col">
              <span className="text-xs font-bold text-slate-500">Nama Siswa</span>
              <span className="text-lg font-black text-slate-900 truncate mt-1">
                {state.player?.name || 'Anonim'}
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 mt-auto">
                Level {state.level} Guardian
              </span>
            </div>

            <div className="card-game p-4 bg-white border border-slate-200 flex flex-col">
              <span className="text-xs font-bold text-slate-500">Misi Diselesaikan</span>
              <span className="text-2xl font-black text-emerald-700 mt-1">
                {completedCount} / 5
              </span>
              <span className="text-[11px] font-semibold text-slate-500 mt-auto">
                {state.earthHealth}% Pulih
              </span>
            </div>

            <div className="card-game p-4 bg-white border border-slate-200 flex flex-col">
              <span className="text-xs font-bold text-slate-500">Lencana Diraih</span>
              <span className="text-2xl font-black text-purple-700 mt-1">
                {state.badges.length} / 6
              </span>
              <span className="text-[11px] font-semibold text-slate-500 mt-auto">Prestasi Satwa</span>
            </div>

            <div className="card-game p-4 bg-white border border-slate-200 flex flex-col">
              <span className="text-xs font-bold text-slate-500">Eco Points</span>
              <span className="text-2xl font-black text-amber-600 mt-1">
                {state.ecoPoints} 🌱
              </span>
              <span className="text-[11px] font-semibold text-slate-500 mt-auto">Diperoleh dari Aksi</span>
            </div>
          </div>

          {/* IPAS Topic Mastery Analytics */}
          <div className="card-game p-5 bg-white border border-slate-200 shadow-sm">
            <h3 className="font-black text-base text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Penguasaan Konsep IPAS & Lingkungan:</span>
            </h3>

            <div className="space-y-3">
              {Object.entries(topicMastery).map(([topic, score]) => {
                const stars = Math.min(5, Math.max(1, Math.round(score)));
                return (
                  <div key={topic} className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-extrabold text-slate-700 w-44">{topic}</span>
                    <div className="flex-1 max-w-xs h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(score / 5) * 100}%` }}
                      />
                    </div>
                    <div className="text-amber-500 font-bold text-sm tracking-wider">
                      {'⭐'.repeat(stars)}
                      <span className="text-slate-300">{'⭐'.repeat(5 - stars)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Constructive Pedagogical Recommendations */}
          <div className="card-game p-5 bg-emerald-50 border-2 border-emerald-300 text-slate-900 shadow-sm">
            <h3 className="font-black text-base text-emerald-950 mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Rekomendasi Pendampingan Belajar:</span>
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed mb-2">
              {completedCount < 3
                ? 'Anak menunjukkan antusiasme yang baik dalam membersihkan pantai dan laut. Disarankan mengajak anak menyelesaikan Misi Hutan Hijau dan Desa Sungai untuk memperkuat pemahaman tentang daur air dan rantai makanan.'
                : completedCount < 5
                ? 'Pemahaman anak terhadap habitat satwa sangat baik! Untuk topik pemilahan sampah di Kota Bersih, orang tua atau guru dapat mempraktikkan langsung pemisahan sampah organik dan anorganik di rumah atau sekolah.'
                : 'Luar biasa! Siswa telah menguasai seluruh konsep kurikulum IPAS tentang kelestarian lingkungan dengan skor penuh. Terus dampingi anak agar kepedulian ini diterapkan dalam kehidupan sehari-hari!'}
            </p>
          </div>

          {/* Reset progress button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin mengatur ulang data permainan dari awal untuk siswa baru?')) {
                  onResetProgress();
                }
              }}
              className="text-xs font-bold text-rose-600 hover:text-rose-800 underline p-1"
            >
              Reset Data Progress (Mulai Baru)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
