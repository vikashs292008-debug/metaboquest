import React, { forwardRef } from 'react';
import { Activity, Trophy, Clock, CheckCircle2, Zap } from 'lucide-react';

export const ResultCard = forwardRef(function ResultCard(
  { scorecard, challengeTarget = null },
  ref
) {
  const { totalPoints, maxScore, correctCount, totalQuestions, durationSeconds, archetype } = scorecard;

  return (
    <div
      ref={ref}
      id="metaboquest-export-card"
      className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-[#0B0F17] border border-white/15 shadow-2xl relative overflow-hidden select-none"
      style={{
        backgroundImage: 'radial-gradient(circle at 10% 10%, rgba(198, 255, 101, 0.12) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(167, 139, 250, 0.15) 0%, transparent 45%)'
      }}
    >
      {/* Decorative top accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{
          background: `linear-gradient(90deg, #C6FF65 0%, ${archetype.color} 50%, #A78BFA 100%)`
        }}
      />

      {/* Brand Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#C6FF65]/20 border border-[#C6FF65]/40 flex items-center justify-center">
            <Activity className="w-4 h-4 text-[#C6FF65]" />
          </div>
          <span className="font-display font-extrabold text-base tracking-tight text-white">
            Metabo<span className="text-[#C6FF65]">Quest</span>
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-white/10 px-2.5 py-1 rounded-full bg-white/5">
          Quest Certificate
        </span>
      </div>

      {/* Archetype Showcase */}
      <div className="text-center my-4 space-y-2">
        <div className="text-4xl sm:text-5xl mb-1 animate-bounce">
          {archetype.badge}
        </div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#A7B2C4]">
          Metabolic Knowledge Archetype
        </p>
        <h3 
          className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight"
          style={{ color: archetype.color }}
        >
          {archetype.title}
        </h3>
        <p className="text-xs text-slate-300 italic max-w-xs mx-auto">
          "{archetype.tagline}"
        </p>
      </div>

      {/* Score Grid */}
      <div className="my-6 p-4 rounded-2xl bg-[#111827] border border-white/10 grid grid-cols-3 gap-2 text-center">
        <div>
          <span className="block text-[10px] font-semibold text-slate-400 uppercase">Knowledge Score</span>
          <span className="font-mono font-extrabold text-lg sm:text-xl text-[#C6FF65]">
            {totalPoints} <span className="text-xs text-slate-400 font-normal">/ {maxScore}</span>
          </span>
        </div>

        <div className="border-x border-white/10">
          <span className="block text-[10px] font-semibold text-slate-400 uppercase">Accuracy</span>
          <span className="font-mono font-extrabold text-lg sm:text-xl text-white">
            {correctCount} / {totalQuestions}
          </span>
        </div>

        <div>
          <span className="block text-[10px] font-semibold text-slate-400 uppercase">Elapsed</span>
          <span className="font-mono font-extrabold text-lg sm:text-xl text-[#A78BFA]">
            {durationSeconds}s
          </span>
        </div>
      </div>

      {/* Viral Challenge Prompt */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#A78BFA]/20 to-[#C6FF65]/15 border border-[#A78BFA]/30 text-center">
        <p className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#C6FF65]" />
          <span>Think you know metabolism? Can you beat my score?</span>
        </p>
      </div>

      {/* Card Footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <span>Play free at: <strong className="text-white">metaboquest.app</strong></span>
        <span className="text-[10px] text-slate-500 font-mono">No diagnosis inferred</span>
      </div>
    </div>
  );
});
