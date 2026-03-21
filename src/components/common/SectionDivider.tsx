import React from 'react';

interface SectionDividerProps {
  label?: string;
  /** Tighter, less “strip” — use after Introduction / dark sections */
  compact?: boolean;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ label, compact }) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center px-6 overflow-hidden ${
        compact ? 'py-8 md:py-12' : 'py-10 md:py-14'
      }`}
    >
      {/* Warm bridge — matches #120e0c / hero stack (no cool blue band) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: compact ? 'blur(12px)' : 'blur(18px)',
          WebkitBackdropFilter: compact ? 'blur(12px)' : 'blur(18px)',
          background: compact
            ? 'linear-gradient(180deg, rgba(18,12,10,0.92) 0%, rgba(26,18,14,0.45) 22%, rgba(28,20,16,0.35) 50%, rgba(26,18,14,0.45) 78%, rgba(18,12,10,0.92) 100%)'
            : 'linear-gradient(180deg, rgba(16,11,9,0.88) 0%, rgba(30,20,16,0.4) 25%, rgba(32,22,18,0.32) 50%, rgba(30,20,16,0.4) 75%, rgba(16,11,9,0.88) 100%)',
        }}
        aria-hidden
      />
      {/* Horizontal glow line */}
      <div className="relative z-10 flex items-center w-full max-w-5xl mx-auto gap-5">
        <div
          className="flex-1 h-px"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(251,191,36,0.5), rgba(251,191,36,0.15))',
          }}
        />
        {/* Center ornament */}
        <div className="flex items-center gap-3 flex-shrink-0 opacity-90">
          <span style={{ color: 'rgba(251,191,36,0.4)', fontSize: '0.55rem' }}>✦</span>
          <span style={{ color: 'rgba(251,191,36,0.6)', fontSize: '0.9rem' }}>◈</span>
          <span style={{ color: 'rgba(251,191,36,0.4)', fontSize: '0.55rem' }}>✦</span>
        </div>
        <div
          className="flex-1 h-px"
          style={{
            background:
              'linear-gradient(to left, transparent, rgba(251,191,36,0.5), rgba(251,191,36,0.15))',
          }}
        />
      </div>

      {/* Optional label */}
      {label && (
        <p
          className="relative z-10 mt-3 font-cinzel text-sm uppercase tracking-[0.45em]"
          style={{ color: 'rgba(251,191,36,0.28)' }}
        >
          {label}
        </p>
      )}
    </div>
  );
};

export default SectionDivider;
