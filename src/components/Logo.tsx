export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Ornate envelope top / shield shape */}
      <path
        d="M100 8 C80 8, 45 18, 32 35 C25 44, 22 52, 22 60 L22 155 C22 160, 26 164, 31 164 L169 164 C174 164, 178 160, 178 155 L178 60 C178 52, 175 44, 168 35 C155 18, 120 8, 100 8Z"
        stroke="#283618"
        strokeWidth="3"
        fill="none"
      />

      {/* Envelope flap - V shape */}
      <path
        d="M22 60 L100 115 L178 60"
        stroke="#283618"
        strokeWidth="2.5"
        fill="none"
      />

      {/* Inner envelope fold lines */}
      <path
        d="M32 35 L100 95 L168 35"
        stroke="#283618"
        strokeWidth="1.5"
        opacity="0.3"
        fill="none"
      />

      {/* Couple silhouette - Groom (left) */}
      <g transform="translate(68, 75)">
        {/* Head */}
        <circle cx="14" cy="10" r="8" fill="#283618" />
        {/* Hair detail */}
        <path d="M6 7 Q14 2 22 7" stroke="#283618" strokeWidth="2" fill="#283618" />
        {/* Body / suit */}
        <path
          d="M6 18 Q14 16 22 18 L24 42 Q14 44 4 42 Z"
          fill="#283618"
        />
        {/* Suit lapel detail */}
        <path d="M14 18 L11 30 L14 28 L17 30 Z" fill="#FEFDFB" opacity="0.3" />
        {/* Arm reaching toward bride */}
        <path
          d="M22 22 Q28 26 30 32"
          stroke="#283618"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Couple silhouette - Bride (right) */}
      <g transform="translate(92, 73)">
        {/* Head */}
        <circle cx="10" cy="10" r="7.5" fill="#283618" />
        {/* Hair / veil */}
        <path
          d="M3 8 Q10 3 17 8 Q20 6 22 10 Q20 14 17 12 Q10 16 3 12 Q1 10 3 8Z"
          fill="#283618"
        />
        {/* Dress / body */}
        <path
          d="M4 17 Q10 15 16 17 L20 42 Q10 46 0 42 Z"
          fill="#283618"
        />
        {/* Veil trailing */}
        <path
          d="M17 8 Q22 12 24 20 Q22 22 20 18"
          stroke="#283618"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Arm reaching toward groom */}
        <path
          d="M4 21 Q-2 25 -4 30"
          stroke="#283618"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Bouquet between them */}
      <g transform="translate(88, 108)">
        <circle cx="6" cy="3" r="3.5" fill="#8FA073" />
        <circle cx="10" cy="1" r="3" fill="#8FA073" />
        <circle cx="3" cy="1" r="3" fill="#8FA073" />
        <circle cx="6.5" cy="6" r="2.5" fill="#6B824D" />
        <circle cx="2" cy="5" r="2" fill="#A8C090" />
        <path d="M6 7 L6 14" stroke="#6B824D" strokeWidth="1.5" />
        <path d="M4 7 L3 13" stroke="#6B824D" strokeWidth="1" />
        <path d="M8 7 L9 13" stroke="#6B824D" strokeWidth="1" />
      </g>

      {/* Heart seal at bottom of envelope */}
      <g transform="translate(100, 178)">
        <circle cx="0" cy="0" r="16" fill="#283618" />
        <path
          d="M0 8 C0 8 -8 3 -8 -2 C-8 -5.5 -5.5 -7.5 -3 -6.5 C-1.5 -6 0 -4 0 -4 C0 -4 1.5 -6 3 -6.5 C5.5 -7.5 8 -5.5 8 -2 C8 3 0 8 0 8Z"
          fill="#FEFDFB"
        />
      </g>
    </svg>
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span
        className="text-4xl sm:text-5xl font-bold tracking-tight text-olive-800"
        style={{ fontFamily: "\"Playfair Display\", Georgia, serif", fontStyle: "italic" }}
      >
        Imbitasyon
      </span>
      <div className="flex items-center gap-2 mt-1">
        <div className="h-px w-8 bg-olive-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
        <div className="w-1 h-1 rounded-full bg-olive-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
        <div className="h-px w-8 bg-olive-400" />
      </div>
    </div>
  );
}
