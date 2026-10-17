import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb, ArrowRight, BookOpen } from 'lucide-react';
import { POINTS_PER_CORRECT } from '../../utils/scoring';

export function FeedbackPanel({ 
  isCorrect, 
  explanation, 
  source, 
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
          ? 'bg-emerald-950/20 border-emerald-500/40' 
          : 'bg-rose-950/20 border-rose-500/40'
      }`}
      role="region"
      aria-live="polite"
      aria-label="Answer explanation"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10 mb-3">
        <div className="flex items-center gap-2.5">
          {isCorrect ? (
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
          )}

          <div>
            <span className={`text-sm font-bold uppercase tracking-wide ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isCorrect ? 'Correct Answer' : 'Incorrect'}
            </span>
            <span className="text-xs text-brand-muted ml-2">
              {isCorrect ? `+${POINTS_PER_CORRECT} points earned` : '+0 points'}
            </span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime flex items-center justify-center gap-2"
        >
          <span>{isLastQuestion ? 'See My Results' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Scientific explanation */}
      <div className="space-y-2 text-xs sm:text-sm text-brand-text/90 leading-relaxed">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-brand-lime flex-shrink-0 mt-0.5" />
          <p>{explanation}</p>
        </div>

        {source && (
          <div className="pt-2 text-[11px] text-brand-muted italic flex items-center gap-1.5 border-t border-white/5">
            <BookOpen className="w-3.5 h-3.5 text-brand-violet flex-shrink-0" />
            <span>Clinical Source: {source}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
