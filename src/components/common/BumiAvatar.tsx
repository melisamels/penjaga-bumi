import React from 'react';

interface BumiAvatarProps {
  size?: number;
  emotion?: 'happy' | 'thinking' | 'excited' | 'caring' | 'celebrating' | 'worried';
  className?: string;
  isFloating?: boolean;
}

export const BumiAvatar: React.FC<BumiAvatarProps> = ({
  size = 120,
  emotion = 'happy',
  className = '',
  isFloating = true,
}) => {
  return (
    <div
      className={`inline-block relative select-none ${isFloating ? 'animate-float' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          <linearGradient id="bumiBody" x1="40" y1="30" x2="160" y2="170" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.7" stopColor="#e0f2fe" />
            <stop offset="1" stopColor="#bae6fd" />
          </linearGradient>
          <linearGradient id="earthBelly" x1="70" y1="110" x2="130" y2="160" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="0.6" stopColor="#22c55e" />
            <stop offset="1" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="100" y1="10" x2="130" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4ade80" />
            <stop offset="1" stopColor="#16a34a" />
          </linearGradient>
          <filter id="eyeGlow" x="0" y="0" width="200" height="200" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Head Antenna / Sprout Leaf */}
        <path
          d="M100 45 C100 25, 115 15, 130 18 C135 30, 125 45, 100 45 Z"
          fill="url(#leafGrad)"
          stroke="#15803d"
          strokeWidth="2.5"
          className="origin-bottom transform transition-transform hover:rotate-12"
        />
        <path
          d="M100 45 C98 32, 85 24, 75 28 C74 40, 85 45, 100 45 Z"
          fill="#86efac"
          stroke="#15803d"
          strokeWidth="2"
        />
        <circle cx="100" cy="46" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />

        {/* Little Floating Robot Ears / Headphone Rings */}
        <circle cx="34" cy="98" r="14" fill="#22c55e" stroke="#16a34a" strokeWidth="3" />
        <circle cx="34" cy="98" r="7" fill="#fef08a" />
        <circle cx="166" cy="98" r="14" fill="#22c55e" stroke="#16a34a" strokeWidth="3" />
        <circle cx="166" cy="98" r="7" fill="#fef08a" />

        {/* Main Round Body */}
        <circle
          cx="100"
          cy="105"
          r="66"
          fill="url(#bumiBody)"
          stroke="#0284c7"
          strokeWidth="4"
        />

        {/* Face Screen Visor */}
        <rect
          x="56"
          y="68"
          width="88"
          height="52"
          rx="26"
          fill="#0f172a"
          stroke="#38bdf8"
          strokeWidth="3"
        />

        {/* Eyes based on emotion */}
        {emotion === 'happy' && (
          <g filter="url(#eyeGlow)">
            {/* Happy curved eyes ^^ */}
            <path d="M72 96 Q80 84 88 96" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M112 96 Q120 84 128 96" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Cute blush dots */}
            <circle cx="68" cy="104" r="4" fill="#f43f5e" opacity="0.7" />
            <circle cx="132" cy="104" r="4" fill="#f43f5e" opacity="0.7" />
          </g>
        )}

        {emotion === 'excited' && (
          <g filter="url(#eyeGlow)">
            {/* Starry big eyes */}
            <ellipse cx="80" cy="92" rx="7" ry="10" fill="#facc15" />
            <ellipse cx="120" cy="92" rx="7" ry="10" fill="#facc15" />
            <circle cx="78" cy="88" r="3" fill="#ffffff" />
            <circle cx="118" cy="88" r="3" fill="#ffffff" />
            {/* Open happy smile */}
            <path d="M94 102 Q100 108 106 102" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}

        {emotion === 'thinking' && (
          <g filter="url(#eyeGlow)">
            {/* Thinking one arched, one wide */}
            <circle cx="78" cy="92" r="7" fill="#38bdf8" />
            <line x1="113" y1="92" x2="127" y2="90" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
            {/* Small tilted mouth */}
            <path d="M95 104 Q102 101 106 104" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}

        {emotion === 'caring' && (
          <g filter="url(#eyeGlow)">
            <ellipse cx="80" cy="94" rx="6" ry="8" fill="#4ade80" />
            <ellipse cx="120" cy="94" rx="6" ry="8" fill="#4ade80" />
            <circle cx="78" cy="90" r="2.5" fill="#ffffff" />
            <circle cx="118" cy="90" r="2.5" fill="#ffffff" />
            <path d="M96 103 Q100 107 104 103" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}

        {emotion === 'worried' && (
          <g filter="url(#eyeGlow)">
            {/* Sad/concerned curved eyes */}
            <path d="M72 90 Q80 100 88 90" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M112 90 Q120 100 128 90" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" fill="none" />
            <ellipse cx="100" cy="106" rx="4" ry="3" fill="#38bdf8" />
          </g>
        )}

        {emotion === 'celebrating' && (
          <g filter="url(#eyeGlow)">
            {/* Joyful sparkles */}
            <path d="M72 94 Q80 82 88 94" stroke="#facc15" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M112 94 Q120 82 128 94" stroke="#facc15" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="100" cy="104" r="5" fill="#f43f5e" />
          </g>
        )}

        {/* Belly Mini Earth Badge */}
        <circle cx="100" cy="142" r="18" fill="url(#earthBelly)" stroke="#ffffff" strokeWidth="2.5" />
        {/* Continents on mini earth */}
        <path
          d="M93 134 C97 130, 105 133, 107 137 C109 142, 102 147, 95 145 C91 141, 91 137, 93 134 Z"
          fill="#15803d"
        />
        <circle cx="109" cy="148" r="3" fill="#15803d" />

        {/* Small floating hands */}
        <ellipse cx="44" cy="136" rx="9" ry="7" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
        <ellipse cx="156" cy="136" rx="9" ry="7" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
      </svg>
    </div>
  );
};
