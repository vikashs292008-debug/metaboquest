import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { POINTS_PER_CORRECT } from '../../utils/scoring';

export function FeedbackPanel({ 
  isCorrect, 
  explanation, 
  sourceTitle,
  sourceUrl,
  isLastQuestion, 
  onNext 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-5 sm:p-6 rounded-2xl border ${
        isCorrect 
          ? 'bg-emerald-950/30 border-emerald-500/40' 
          : 'bg-amber-950/20 border-amber-500/30'
      }`}
      role="region"
      aria-live="polite"
      aria-label="Answer explanation"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10 mb-3">
        <div className="flex items-center gap-3">
          {isCorrect ? (
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold uppercase tracking-wider ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isCorrect ? 'Spot On!' : 'Good Opportunity to Learn Something New'}
              </span>
            </div>
            <span className="text-xs text-brand-muted">
              {isCorrect ? `+${POINTS_PER_CORRECT} points earned` : '+0 points · Discovery unlocked'}
            </span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <span>{isLastQuestion ? 'View My Results' : 'Continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Scientific explanation */}
      <div className="space-y-3 text-xs sm:text-sm text-brand-text/90 leading-relaxed">
        <p className="leading-relaxed">
          {explanation}
        </p>

        {/* Authoritative clinical source link */}
        {(sourceTitle || sourceUrl) && (
          <div className="pt-2 text-[11px] text-brand-muted flex flex-wrap items-center gap-1.5 border-t border-white/5">
            <BookOpen className="w-3.5 h-3.5 text-brand-lime flex-shrink-0" />
            <span className="font-semibold text-slate-300">Verified Evidence:</span>
            {sourceUrl ? (
              <a 
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-lime hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>{sourceTitle || 'View Source Guideline'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="text-brand-muted">{sourceTitle}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
