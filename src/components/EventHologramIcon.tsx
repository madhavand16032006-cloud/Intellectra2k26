import React from 'react';

interface EventHologramIconProps {
  eventId: string;
  className?: string;
}

export const EventHologramIcon: React.FC<EventHologramIconProps> = ({ eventId, className = 'w-48 h-40' }) => {
  const gradientId = `holo-grad-${eventId}`;
  const ringGradId = `ring-grad-${eventId}`;
  const starGradId = `star-grad-${eventId}`;
  const glowFilterId = `glow-${eventId}`;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Soft Aura Light */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.25) 0%, rgba(168, 85, 247, 0.2) 45%, transparent 75%)'
        }}
      />

      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_0_16px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform duration-500 ease-out"
      >
        <defs>
          {/* Main stroke gradient from cyan to electric blue to purple */}
          <linearGradient id={gradientId} x1="30" y1="20" x2="170" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="45%" stopColor="#38BDF8" />
            <stop offset="85%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>

          {/* Orbit ring gradient */}
          <linearGradient id={ringGradId} x1="20" y1="80" x2="180" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>

          {/* Sparkle Star Gradient */}
          <linearGradient id={starGradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E0F7FF" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>

          {/* Soft Filter Glow */}
          <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ========================================================= */}
        {/* BACK HALF OF 3D ORBIT RING (Behind the main object)       */}
        {/* ========================================================= */}
        <path
          d="M 32 82 C 34 68, 70 54, 115 54 C 158 54, 184 68, 180 82"
          stroke={`url(#${ringGradId})`}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.6"
          filter={`url(#${glowFilterId})`}
        />

        {/* ========================================================= */}
        {/* CENTRAL HOLOGRAM ICON (Custom per event)                  */}
        {/* ========================================================= */}

        {/* 1. PAPER PRESENTATION - Exact Match to Screenshot */}
        {eventId === 'paper-presentation' && (
          <g filter={`url(#${glowFilterId})`}>
            {/* Document Body */}
            <path
              d="M 75 32 L 115 32 L 132 49 L 132 122 C 132 127 127 132 122 132 L 75 132 C 70 132 65 127 65 122 L 65 42 C 65 37 70 32 75 32 Z"
              stroke={`url(#${gradientId})`}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Folded Corner */}
            <path
              d="M 115 32 L 115 49 L 132 49"
              stroke={`url(#${gradientId})`}
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Text lines inside document */}
            <line x1="80" y1="62" x2="117" y2="62" stroke={`url(#${gradientId})`} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="80" y1="80" x2="117" y2="80" stroke={`url(#${gradientId})`} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="80" y1="98" x2="104" y2="98" stroke={`url(#${gradientId})`} strokeWidth="4.5" strokeLinecap="round" />
          </g>
        )}

        {/* 2. PROMPT STACK - AI Terminal & Prompt Engine */}
        {eventId === 'prompt-stack' && (
          <g filter={`url(#${glowFilterId})`}>
            {/* Terminal Window Box */}
            <rect
              x="62"
              y="38"
              width="76"
              height="88"
              rx="12"
              stroke={`url(#${gradientId})`}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Header divider */}
            <line x1="62" y1="58" x2="138" y2="58" stroke={`url(#${gradientId})`} strokeWidth="3" strokeLinecap="round" />
            {/* Window control dots */}
            <circle cx="74" cy="48" r="2.5" fill="#00F0FF" />
            <circle cx="83" cy="48" r="2.5" fill="#38BDF8" />
            <circle cx="92" cy="48" r="2.5" fill="#A855F7" />
            {/* Prompt arrow and cursor */}
            <path
              d="M 76 76 L 86 86 L 76 96"
              stroke={`url(#${gradientId})`}
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line x1="94" y1="96" x2="118" y2="96" stroke={`url(#${gradientId})`} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="76" y1="110" x2="124" y2="110" stroke={`url(#${gradientId})`} strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
          </g>
        )}

        {/* 3. INFOGRAPHIX - UI/UX Wireframe & Design Vector */}
        {eventId === 'infographix-uiux' && (
          <g filter={`url(#${glowFilterId})`}>
            {/* Phone/Canvas Frame */}
            <rect
              x="66"
              y="34"
              width="68"
              height="94"
              rx="12"
              stroke={`url(#${gradientId})`}
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Header notch / bar */}
            <line x1="88" y1="44" x2="112" y2="44" stroke={`url(#${gradientId})`} strokeWidth="3" strokeLinecap="round" />
            {/* Wireframe Hero Card */}
            <rect x="76" y="54" width="48" height="24" rx="5" stroke={`url(#${gradientId})`} strokeWidth="3.5" />
            {/* Vector pen node diamond */}
            <path d="M 100 60 L 105 66 L 100 72 L 95 66 Z" fill="#00F0FF" opacity="0.8" />
            {/* Two column grid blocks */}
            <rect x="76" y="86" width="22" height="26" rx="4" stroke={`url(#${gradientId})`} strokeWidth="3.5" />
            <rect x="102" y="86" width="22" height="26" rx="4" stroke={`url(#${gradientId})`} strokeWidth="3.5" />
          </g>
        )}

        {/* 4. BOOYAH BATTLE - Tactical Gaming Controller & Crosshair */}
        {eventId === 'booyah-battle' && (
          <g filter={`url(#${glowFilterId})`}>
            {/* Game Controller Body */}
            <path
              d="M 64 64 C 54 86 52 114 68 124 C 76 130 88 122 96 108 L 104 108 C 112 122 124 130 132 124 C 148 114 146 86 136 64 C 130 52 116 50 100 52 C 84 50 70 52 64 64 Z"
              stroke={`url(#${gradientId})`}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* D-Pad cross */}
            <path d="M 77 74 L 77 88 M 70 81 L 84 81" stroke={`url(#${gradientId})`} strokeWidth="4" strokeLinecap="round" />
            {/* Action buttons */}
            <circle cx="123" cy="76" r="3" fill="#00F0FF" />
            <circle cx="115" cy="84" r="3" fill="#A855F7" />
            {/* Center tactical power node */}
            <circle cx="100" cy="74" r="4" stroke={`url(#${gradientId})`} strokeWidth="2.5" />
          </g>
        )}

        {/* 5. NEUROLINK - Brain Neural Network & Synaptic Impulses */}
        {eventId === 'neurolink' && (
          <g filter={`url(#${glowFilterId})`}>
            {/* Left Brain Hemisphere */}
            <path
              d="M 98 42 C 82 42, 64 54, 64 74 C 64 88, 70 98, 76 108 C 82 118, 92 122, 98 124"
              stroke={`url(#${gradientId})`}
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Right Brain Hemisphere */}
            <path
              d="M 102 42 C 118 42, 136 54, 136 74 C 136 88, 130 98, 124 108 C 118 118, 108 122, 102 124"
              stroke={`url(#${gradientId})`}
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Central Neural Impulse Stem */}
            <line x1="100" y1="46" x2="100" y2="120" stroke={`url(#${gradientId})`} strokeWidth="3.5" strokeDasharray="4 4" strokeLinecap="round" />
            {/* Synaptic nodes & bridges */}
            <circle cx="82" cy="66" r="3.5" fill="#00F0FF" />
            <circle cx="118" cy="66" r="3.5" fill="#A855F7" />
            <circle cx="84" cy="94" r="3.5" fill="#38BDF8" />
            <circle cx="116" cy="94" r="3.5" fill="#C084FC" />
            <line x1="82" y1="66" x2="100" y2="78" stroke={`url(#${gradientId})`} strokeWidth="2.5" opacity="0.8" />
            <line x1="118" y1="66" x2="100" y2="78" stroke={`url(#${gradientId})`} strokeWidth="2.5" opacity="0.8" />
            <line x1="84" y1="94" x2="100" y2="78" stroke={`url(#${gradientId})`} strokeWidth="2.5" opacity="0.8" />
            <line x1="116" y1="94" x2="100" y2="78" stroke={`url(#${gradientId})`} strokeWidth="2.5" opacity="0.8" />
            <circle cx="100" cy="78" r="4.5" fill="#00F0FF" />
          </g>
        )}

        {/* 6. CHECKMATE CLASH - Chess King Crown Piece & Strategy Grid */}
        {eventId === 'checkmate-clash' && (
          <g filter={`url(#${glowFilterId})`}>
            {/* King Cross Top */}
            <path d="M 100 32 L 100 44 M 94 38 L 106 38" stroke={`url(#${gradientId})`} strokeWidth="4.5" strokeLinecap="round" />
            {/* Crown Head */}
            <path
              d="M 80 54 L 88 74 L 100 62 L 112 74 L 120 54 C 112 80 88 80 80 54 Z"
              stroke={`url(#${gradientId})`}
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            {/* Body column */}
            <path
              d="M 88 80 L 86 108 L 114 108 L 112 80"
              stroke={`url(#${gradientId})`}
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Stepped Pedestal Base */}
            <rect x="74" y="112" width="52" height="12" rx="4" stroke={`url(#${gradientId})`} strokeWidth="4.5" />
            <line x1="68" y1="128" x2="132" y2="128" stroke={`url(#${gradientId})`} strokeWidth="4.5" strokeLinecap="round" />
          </g>
        )}

        {/* 7. AUCTION ARENA - Gavel & Bidding Hammer Pedestal */}
        {eventId === 'auction-arena' && (
          <g filter={`url(#${glowFilterId})`}>
            {/* Gavel Head (Tilted 30deg) */}
            <g transform="rotate(-25 95 65)">
              <rect x="72" y="44" width="46" height="26" rx="5" stroke={`url(#${gradientId})`} strokeWidth="5" />
              {/* Handle */}
              <line x1="95" y1="70" x2="95" y2="124" stroke={`url(#${gradientId})`} strokeWidth="5" strokeLinecap="round" />
              <circle cx="95" cy="124" r="3.5" fill="#00F0FF" />
            </g>
            {/* Sound Pedestal Block */}
            <rect x="68" y="118" width="64" height="14" rx="4" stroke={`url(#${gradientId})`} strokeWidth="4.5" />
            {/* Energy Impact Waves */}
            <path d="M 52 114 C 54 110, 60 106, 68 106" stroke={`url(#${gradientId})`} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            <path d="M 148 114 C 146 110, 140 106, 132 106" stroke={`url(#${gradientId})`} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          </g>
        )}

        {/* ========================================================= */}
        {/* FRONT HALF OF 3D ORBIT RING (Crosses in front with glow)  */}
        {/* ========================================================= */}
        <path
          d="M 180 82 C 176 102, 136 120, 85 120 C 42 120, 24 102, 32 82"
          stroke={`url(#${ringGradId})`}
          strokeWidth="5.5"
          strokeLinecap="round"
          filter={`url(#${glowFilterId})`}
        />

        {/* ========================================================= */}
        {/* 4-POINT SPARKLE STAR (Top Right Quadrant)                 */}
        {/* ========================================================= */}
        <path
          d="M 152 24 C 152 34, 142 34, 142 34 C 142 34, 152 34, 152 44 C 152 34, 162 34, 162 34 C 162 34, 152 34, 152 24 Z"
          fill={`url(#${starGradId})`}
          className="animate-pulse"
        />
        {/* Tiny ambient sparkle */}
        <circle cx="166" cy="46" r="1.5" fill="#00F0FF" opacity="0.7" />
      </svg>
    </div>
  );
};
