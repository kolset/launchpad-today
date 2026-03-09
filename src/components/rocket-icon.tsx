"use client";

export function RocketIcon({
  size = 24,
  className = "",
  flame = false,
}: {
  size?: number;
  className?: string;
  flame?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
    >
      {/* Rocket body */}
      <path
        d="M32 4C32 4 20 20 20 40C20 44 24 48 32 48C40 48 44 44 44 40C44 20 32 4 32 4Z"
        fill="url(#rocketGrad)"
        stroke="#00F0FF"
        strokeWidth="1.5"
      />
      {/* Window */}
      <circle cx="32" cy="24" r="5" fill="#0A0A0F" stroke="#00F0FF" strokeWidth="1" />
      <circle cx="32" cy="24" r="3" fill="#00F0FF" opacity="0.3" />
      {/* Fins */}
      <path d="M20 38L12 48L20 44Z" fill="#FF2D78" stroke="#FF2D78" strokeWidth="0.5" />
      <path d="M44 38L52 48L44 44Z" fill="#FF2D78" stroke="#FF2D78" strokeWidth="0.5" />
      {/* Flame */}
      {flame && (
        <g className="animate-flame" style={{ transformOrigin: "32px 48px" }}>
          <path d="M28 48L32 62L36 48Z" fill="#FFE600" opacity="0.9" />
          <path d="M30 48L32 58L34 48Z" fill="#FF6B2B" opacity="0.8" />
          <path d="M31 48L32 54L33 48Z" fill="#fff" opacity="0.6" />
        </g>
      )}
      <defs>
        <linearGradient id="rocketGrad" x1="32" y1="4" x2="32" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#aaaaaa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SmallRocket({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1C8 1 5 5 5 10C5 11 6 12 8 12C10 12 11 11 11 10C11 5 8 1 8 1Z" fill="#fff" />
      <path d="M5 9.5L3 12L5 11Z" fill="#FF2D78" />
      <path d="M11 9.5L13 12L11 11Z" fill="#FF2D78" />
      <path d="M7 12L8 15.5L9 12Z" fill="#FFE600" className="animate-flame" style={{ transformOrigin: "8px 12px" }} />
    </svg>
  );
}
