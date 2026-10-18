import React from 'react';

export function Wordmark({ className = '', size = 'md', animated = true }) {
  const isLg = size === 'lg';
  const isSm = size === 'sm';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Cellular Orbit Graphic */}
      <div className="relative flex items-center justify-center">
        <svg 
          width={isLg ? "44" : isSm ? "28" : "36"} 
          height={isLg ? "44" : isSm ? "28" : "36"} 
          viewBox="0 0 44 44" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={animated ? "animate-pulse-slow" : ""}
        >
          {/* Outer Orbit */}
          <circle 
            cx="22" 
            cy="22" 
            r="19" 
            stroke="url(#orbit_grad)" 
            strokeWidth="2.5" 
            strokeDasharray="6 4"
            className="opacity-80"
          />
          {/* Inner Organ Node */}
          <circle 
            cx="22" 
            cy="22" 
            r="11" 
            fill="url(#core_grad)" 
          />
          {/* Satellite Fuel Node */}
          <circle 
            cx="34" 
            cy="14" 
            r="4.5" 
            fill="#00F2FE" 
          />
          <circle 
            cx="10" 
            cy="30" 
            r="3.5" 
            fill="#C6FF65" 
          />

          <defs>
            <linearGradient id="orbit_grad" x1="3" y1="3" x2="41" y2="41" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="0.5" stopColor="#00F2FE" />
              <stop offset="1" stopColor="#A78BFA" />
            </linearGradient>
            <linearGradient id="core_grad" x1="11" y1="11" x2="33" y2="33" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full pointer-events-none" />
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-display font-extrabold tracking-tight text-white ${isLg ? 'text-2xl' : isSm ? 'text-base' : 'text-xl'}`}>
            METABO<span className="text-emerald-400">QUEST</span>
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            LAB
          </span>
        </div>
        {!isSm && (
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
            Evidence Content Studio
          </span>
        )}
      </div>
    </div>
  );
}
