import React from 'react';
import { Trophy, X, Sparkles, Flame, BookOpen, Swords, CalendarCheck, Brain, Lock, CheckCircle2 } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/achievements';

const ICON_MAP = {
  Sparkles,
  Flame,
  BookOpen,
  Swords,
  CalendarCheck,
  Brain
};

export function AchievementsModal({ isOpen, onClose, unlockedIds = [] }) {
  if (!isOpen) return null;

  const unlockedCount = unlockedIds.length;
  const totalCount = ACHIEVEMENTS.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-bg/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievements-title"
    >
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-brand-surface border border-white/10 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 id="achievements-title" className="font-display font-bold text-lg text-brand-text">
                Metabolic Badges
              </h2>
              <p className="text-xs text-brand-muted">
                {unlockedCount} of {totalCount} Unlocked ({progressPercent}%)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-white/5"
            aria-label="Close badges modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-white/5 mb-6 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-brand-lime to-brand-violet transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Badges List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {ACHIEVEMENTS.map(ach => {
            const isUnlocked = unlockedIds.includes(ach.id);
            const Icon = ICON_MAP[ach.icon] || Trophy;

            return (
              <div 
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked 
                    ? 'bg-brand-card/80 border-white/15' 
                    : 'bg-brand-card/30 border-white/5 opacity-60'
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border"
                  style={{
                    backgroundColor: isUnlocked ? `${ach.color}15` : 'rgba(255,255,255,0.03)',
                    borderColor: isUnlocked ? `${ach.color}40` : 'rgba(255,255,255,0.08)'
                  }}
                >
                  {isUnlocked ? (
                    <Icon className="w-6 h-6" style={{ color: ach.color }} />
                  ) : (
                    <Lock className="w-5 h-5 text-brand-muted" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-semibold text-sm text-brand-text flex items-center gap-2">
                      <span>{ach.title}</span>
                      {isUnlocked && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-brand-muted border border-white/5">
                      {ach.rarity}
                    </span>
                  </div>

                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-5 mt-5 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-brand-surface border border-white/15 text-brand-text font-display font-semibold text-xs hover:bg-white/5 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
