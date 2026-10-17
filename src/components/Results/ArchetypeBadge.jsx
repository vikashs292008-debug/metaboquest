import React from 'react';

export function ArchetypeBadge({ archetype }) {
  if (!archetype) return null;

  return (
    <div 
      className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border backdrop-blur-md shadow-lg"
      style={{
        backgroundColor: `${archetype.color}15`,
        borderColor: `${archetype.color}50`
      }}
    >
      <span className="text-xl">{archetype.badge}</span>
      <div className="flex flex-col text-left">
        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-muted">
          Knowledge Archetype
        </span>
        <span 
          className="font-display font-extrabold text-sm sm:text-base leading-tight"
          style={{ color: archetype.color }}
        >
          {archetype.title}
        </span>
      </div>
    </div>
  );
}
