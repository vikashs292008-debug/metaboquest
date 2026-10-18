import React, { forwardRef } from 'react';
import { Activity, Trophy, Clock, CheckCircle2, Zap, Sparkles, BookOpen } from 'lucide-react';
import { ScoreRing } from '../ScoreRing';

export const ResultCard = forwardRef(function ResultCard(
  { scorecard, challengeTarget = null, displayName = '' },
  ref
) {
  const { 
    totalPoints, 
    maxScore = 500, 
    correctCount, 
    totalQuestions = 5, 
    durationSeconds = 0, 
    archetype,
    personalization 
  } = scorecard;

  return (
    <div
      ref={ref}
      id="metaboquest-export-card"
      className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-[#0B0F19] border border-white/15 shadow-2xl relative overflow-hidden select-none"
      style={{
        backgroundImage: 'radial-gradient(circle at 10% 10%, rgba(198, 255, 101, 0.12) 0%, transparent 45%), radial-gradient(circle at 90% 90%, rgba(167, 139, 250, 0.15) 0%, transparent 45%)'
      }}
    >
      {/* Decorative top accent gradient */}
      <div 
        className="absolute top-0 left-0 right-0 h-2"
        style={{
          background: `linear-gradient(90deg, #C6FF65 0%, ${archetype.color} 50%, #A78BFA 100%)`
        }}
      />

      {/* Brand Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#C6FF65]/20 border border-[#C6FF65]/40 flex items-center justify-center">
            <Activity className="w-4 h-4 text-[#C6FF65]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base tracking-tight text-white flex items-center gap-1">
              Metabo<span className="text-[#C6FF65]">Quest</span>
            </span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
              Metabolic Health Challenge
            </span>
          </div>
        </div>

        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C6FF65] border border-[#C6FF65]/30 px-2.5 py-1 rounded-full bg-[#C6FF65]/10">
          Quest Certificate
        </span>
      </div>

      {/* Optional Explorer Display Name */}
      {displayName && (
        <div className="mb-4 text-center">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quest Explorer:
          </span>
          <p className="font-display font-bold text-lg text-white">
            {displayName}
          </p>
        </div>
      )}

      {/* Circular Score Ring Visualization */}
      <div className="flex justify-center my-4">
        <ScoreRing 
          score={totalPoints} 
          maxScore={maxScore} 
          size={180} 
          strokeWidth={12}
          archetypeColor={archetype.color}
        />
      </div>

      {/* Playful Learning Badge Showcase */}
      <div className="text-center my-4 space-y-1.5">
        <div className="text-3xl sm:text-4xl mb-1">
          {archetype.badge}
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Learning Badge
        </p>
        <h3 
          className="font-display font-extrabold text-2xl tracking-tight"
          style={{ color: archetype.color }}
        >
          {archetype.title}
        </h3>
        <p className="text-xs text-slate-300 italic max-w-xs mx-auto">
          "{archetype.tagline}"
        </p>
      </div>

      {/* Key Metric Highlights Grid */}
      <div className="my-5 p-3.5 rounded-2xl bg-[#111827] border border-white/10 grid grid-cols-3 gap-2 text-center">
        <div>
          <span className="block text-[10px] font-semibold text-slate-400 uppercase">Points</span>
          <span className="font-mono font-extrabold text-base sm:text-lg text-[#C6FF65]">
            {totalPoints} <span className="text-xs text-slate-400 font-normal">/ {maxScore}</span>
          </span>
        </div>

        <div className="border-x border-white/10">
          <span className="block text-[10px] font-semibold text-slate-400 uppercase">Correct</span>
          <span className="font-mono font-extrabold text-base sm:text-lg text-white">
            {correctCount} / {totalQuestions}
          </span>
        </div>

        <div>
          <span className="block text-[10px] font-semibold text-slate-400 uppercase">Time</span>
          <span className="font-mono font-extrabold text-base sm:text-lg text-[#A78BFA]">
            {durationSeconds}s
          </span>
        </div>
      </div>

      {/* Short Educational Takeaway */}
      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-left space-y-1">
        <div className="flex items-center gap-1.5 text-[#C6FF65] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Takeaway</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {personalization?.relevantFact || 'Metabolic health is the adaptable energy network across all your organs, not merely the number on a scale.'}
        </p>
      </div>

      {/* Card Footer with Verified URL & Privacy */}
      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <span>Play free at: <strong className="text-white">metaboquest.app</strong></span>
        <span className="text-[10px] text-slate-500 font-mono">No medical diagnosis</span>
      </div>
    </div>
  );
});
