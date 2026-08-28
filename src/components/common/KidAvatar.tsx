import React from 'react';
import { AVATARS } from '../../lib/missionData';

interface KidAvatarProps {
  avatarId: string;
  size?: number;
  className?: string;
}

export const KidAvatar: React.FC<KidAvatarProps> = ({
  avatarId,
  size = 80,
  className = '',
}) => {
  const avatar = AVATARS.find(a => a.id === avatarId) || AVATARS[0];

  return (
    <div
      className={`relative inline-block rounded-full overflow-hidden shadow-md border-2 border-white/80 bg-gradient-to-b from-sky-100 to-emerald-100 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background glow */}
        <circle cx="50" cy="50" r="48" fill="#e0f2fe" />

        {/* Shoulders / Shirt */}
        <path
          d="M20 95 C20 74, 34 68, 50 68 C66 68, 80 74, 80 95 Z"
          fill={avatar.shirtColor}
        />
        {/* Collar */}
        <path d="M42 68 L50 76 L58 68 Z" fill="#ffffff" opacity="0.9" />

        {/* Neck */}
        <rect x="44" y="58" width="12" height="14" rx="4" fill={avatar.skinTone} />

        {/* Head */}
        <ellipse cx="50" cy="46" rx="22" ry="24" fill={avatar.skinTone} />

        {/* Hair back / volume */}
        {avatar.id === 'avatar-2' && (
          // Siti - Hijab / Sleek hood style
          <path
            d="M26 46 C26 26, 74 26, 74 46 C74 65, 70 76, 50 76 C30 76, 26 65, 26 46 Z"
            fill="#0ea5e9"
          />
        )}
        {avatar.id === 'avatar-4' && (
          // Maya - Long hair pigtails
          <>
            <ellipse cx="26" cy="54" rx="7" ry="14" fill={avatar.hairColor} />
            <ellipse cx="74" cy="54" rx="7" ry="14" fill={avatar.hairColor} />
            <circle cx="26" cy="45" r="4" fill="#ec4899" />
            <circle cx="74" cy="45" r="4" fill="#ec4899" />
          </>
        )}

        {/* Hair main */}
        {avatar.id !== 'avatar-2' && (
          <path
            d="M27 42 C27 24, 73 24, 73 42 C73 34, 60 27, 50 27 C38 27, 27 34, 27 42 Z"
            fill={avatar.hairColor}
          />
        )}

        {/* Hair front bangs */}
        {avatar.id === 'avatar-1' && (
          // Budi - cap/hat or short spikes
          <>
            <path d="M30 36 C40 28, 60 28, 70 36 C64 32, 36 32, 30 36 Z" fill={avatar.hairColor} />
            {/* Adventurer cap */}
            <path d="M26 34 C26 22, 74 22, 74 34 L82 35 C82 35, 78 30, 72 26 C62 20, 38 20, 28 26 Z" fill="#eab308" />
            <rect x="24" y="32" width="52" height="4" rx="2" fill="#ca8a04" />
          </>
        )}

        {avatar.id === 'avatar-3' && (
          // Alex - curly mop
          <circle cx="50" cy="30" r="15" fill={avatar.hairColor} />
        )}

        {avatar.id === 'avatar-5' && (
          // Wayan - headband
          <>
            <path d="M28 38 C35 30, 65 30, 72 38 Z" fill={avatar.hairColor} />
            <rect x="27" y="34" width="46" height="6" rx="2" fill="#ef4444" />
            <circle cx="50" cy="37" r="3" fill="#facc15" />
          </>
        )}

        {avatar.id === 'avatar-6' && (
          // Alif - neat short hair
          <path d="M30 36 C36 29, 64 29, 70 36 C62 33, 38 33, 30 36 Z" fill={avatar.hairColor} />
        )}

        {/* Ears */}
        {avatar.id !== 'avatar-2' && (
          <>
            <circle cx="28" cy="48" r="4.5" fill={avatar.skinTone} />
            <circle cx="72" cy="48" r="4.5" fill={avatar.skinTone} />
          </>
        )}

        {/* Eyebrows */}
        <path d="M38 41 Q43 38 46 41" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <path d="M54 41 Q57 38 62 41" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

        {/* Eyes */}
        <ellipse cx="42" cy="46" rx="3.5" ry="4" fill="#0f172a" />
        <ellipse cx="58" cy="46" rx="3.5" ry="4" fill="#0f172a" />
        <circle cx="41" cy="44.5" r="1.2" fill="#ffffff" />
        <circle cx="57" cy="44.5" r="1.2" fill="#ffffff" />

        {/* Glasses for Siti */}
        {avatar.id === 'avatar-2' && (
          <>
            <rect x="36" y="42" width="12" height="9" rx="3" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
            <rect x="52" y="42" width="12" height="9" rx="3" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
            <line x1="48" y1="46" x2="52" y2="46" stroke="#f59e0b" strokeWidth="1.8" />
          </>
        )}

        {/* Cheeks blush */}
        <circle cx="36" cy="51" r="3" fill="#f43f5e" opacity="0.4" />
        <circle cx="64" cy="51" r="3" fill="#f43f5e" opacity="0.4" />

        {/* Nose */}
        <path d="M49 48 Q50 51 51 51" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Cheerful Smile */}
        <path d="M44 54 Q50 61 56 54" stroke="#e11d48" strokeWidth="2.2" strokeLinecap="round" fill="#ffffff" />
      </svg>
    </div>
  );
};
