import React, { useState } from 'react';
import { AVATARS } from '../../lib/missionData';
import { KidAvatar } from '../common/KidAvatar';
import { BumiAvatar } from '../common/BumiAvatar';
import { sound } from '../../lib/soundEngine';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProfileCreationProps {
  onComplete: (name: string, avatarId: string) => void;
}

export const ProfileCreation: React.FC<ProfileCreationProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [selectedAvatarId, setSelectedAvatarId] = useState(AVATARS[0].id);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSelectAvatar = (id: string) => {
    sound.playPop(480);
    setSelectedAvatarId(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      sound.playGentle();
      setErrorMsg('Tulis nama panggilanmu dulu ya, Guardian! 😊');
      return;
    }
    if (cleanName.length > 15) {
      sound.playGentle();
      setErrorMsg('Nama panggilan maksimal 15 huruf ya!');
      return;
    }
    sound.playSuccess();
    onComplete(cleanName, selectedAvatarId);
  };

  const selectedAvatar = AVATARS.find(a => a.id === selectedAvatarId) || AVATARS[0];

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center p-4 bg-gradient-to-b from-sky-400 via-teal-300 to-emerald-400">
      <div className="card-game w-full max-w-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl border-4 border-white">
        {/* Top badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-black px-3 py-1 rounded-full border border-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Kartu Anggota Earth Guardian
          </span>
          <span className="text-xs font-bold text-slate-500">🔒 Aman & Tanpa Akun</span>
        </div>

        {/* Header with BUMI */}
        <div className="flex items-center gap-4 mb-6">
          <div className="shrink-0">
            <BumiAvatar size={80} emotion="happy" isFloating />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Selamat Datang, Calon Guardian! 🌟
            </h2>
            <p className="text-sm font-bold text-slate-600">
              Sebelum mulai berpetualang, ayo buat profil pelindung bumimu!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name input */}
          <div>
            <label className="block text-sm sm:text-base font-black text-slate-800 mb-2">
              Siapa nama Penjaga Bumi kita? ✨
            </label>
            <input
              type="text"
              value={name}
              onChange={e => {
                setName(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Contoh: Budi, Siti, Maya..."
              maxLength={15}
              className="w-full text-lg sm:text-xl font-black text-slate-900 bg-emerald-50/70 border-3 border-emerald-300 focus:border-emerald-500 rounded-2xl px-4 py-3 outline-none transition shadow-inner placeholder:text-slate-400"
              autoFocus
            />
            {errorMsg && (
              <p className="text-rose-600 text-xs sm:text-sm font-bold mt-1.5 animate-bounce-gentle">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Avatar selector */}
          <div>
            <label className="block text-sm sm:text-base font-black text-slate-800 mb-2">
              Pilih Karakter Pelindungmu:
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {AVATARS.map(avatar => {
                const isSelected = avatar.id === selectedAvatarId;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => handleSelectAvatar(avatar.id)}
                    className={`flex flex-col items-center p-2 rounded-2xl transition-all ${
                      isSelected
                        ? 'bg-emerald-200 border-3 border-emerald-600 shadow-md scale-105 ring-2 ring-emerald-400'
                        : 'bg-slate-100 hover:bg-slate-200 border-2 border-transparent hover:scale-100 opacity-80'
                    }`}
                  >
                    <KidAvatar avatarId={avatar.id} size={56} />
                    <span className="text-xs font-black text-slate-800 mt-1.5 truncate max-w-full">
                      {avatar.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected avatar bio */}
            <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 flex items-center gap-2">
              <span className="text-base">🎒</span>
              <span className="text-xs font-bold text-emerald-900">
                <span className="font-black">{selectedAvatar.name}:</span> {selectedAvatar.description} ({selectedAvatar.accessory})
              </span>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn-green w-full py-3.5 sm:py-4 text-lg sm:text-xl flex items-center justify-center gap-2 shadow-xl"
          >
            <span>SIAP MENJADI PENJAGA BUMI!</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};
