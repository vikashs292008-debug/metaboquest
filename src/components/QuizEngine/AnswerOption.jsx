import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export function AnswerOption({
  option,
  index,
  isSelected,
  isLocked,
  isCorrectOption,
  showResult,
  onSelect
}) {
  const letters = ['A', 'B', 'C', 'D'];
  const letter = letters[index] || option.id.toUpperCase();

  // Determine styling based on quiz lifecycle state
  let stateClasses = 'bg-brand-surface/70 border-white/10 text-brand-text hover:border-brand-lime/50 hover:bg-white/5';

  if (showResult) {
    if (isCorrectOption) {
      stateClasses = 'bg-emerald-500/15 border-emerald-500 text-emerald-200 shadow-md font-medium';
    } else if (isSelected && !isCorrectOption) {
      // Non-shaming amber highlight for the chosen option when incorrect
      stateClasses = 'bg-amber-500/15 border-amber-500/60 text-amber-200';
    } else {
      stateClasses = 'bg-brand-surface/30 border-white/5 text-brand-muted/60 opacity-60';
    }
  } else if (isSelected) {
    stateClasses = 'bg-brand-lime/15 border-brand-lime text-brand-lime font-medium shadow-glow-lime';
  }

  return (
    <button
      onClick={() => onSelect(option.id)}
      disabled={isLocked}
      role="radio"
      aria-checked={isSelected}
      className={`w-full p-4 sm:p-5 rounded-2xl border text-left text-sm sm:text-base transition-all duration-200 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime ${stateClasses} ${
        isLocked ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <span 
          className={`w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-xs uppercase flex-shrink-0 transition-colors ${
            isSelected 
              ? 'bg-brand-lime text-brand-bg font-extrabold' 
              : 'bg-white/5 border border-white/10 text-brand-muted'
          }`}
        >
          {letter}
        </span>
        <span className="leading-snug">{option.text}</span>
      </div>

      {showResult && (
        <div className="flex-shrink-0">
          {isCorrectOption && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="hidden sm:inline">Correct Answer</span>
            </div>
          )}
          {isSelected && !isCorrectOption && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Your Pick</span>
            </div>
          )}
        </div>
      )}
    </button>
  );
}
