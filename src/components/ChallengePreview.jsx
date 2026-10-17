import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { PREVIEW_QUESTION } from '../data/questions';

export function ChallengePreview({ onStartFullQuest }) {
  const [selectedId, setSelectedId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCorrect = selectedId === PREVIEW_QUESTION.correctAnswerId;

  const handleSelect = (id) => {
    if (isSubmitted) return;
    setSelectedId(id);
  };

  const handleCheck = () => {
    if (!selectedId) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedId(null);
    setIsSubmitted(false);
  };

  return (
    <section id="preview-section" className="py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-xs font-semibold text-brand-violet mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE PREVIEW</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-text">
            Try a 15-Second Sample Question
          </h2>
          <p className="text-sm text-brand-muted mt-2 max-w-lg mx-auto">
            Test the experience right here. This sample lets you preview question dynamics before launching the full 5-question quest.
          </p>
        </div>

        {/* Question Card Box */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-white/10 shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <span className="text-xs font-semibold text-brand-lime uppercase tracking-wider">
              Topic: {PREVIEW_QUESTION.topic}
            </span>
            <span className="text-xs text-brand-muted font-medium bg-white/5 px-2.5 py-1 rounded-full">
              Demo Question
            </span>
          </div>

          <h3 className="font-display font-semibold text-lg sm:text-xl text-brand-text mb-6 leading-snug">
            {PREVIEW_QUESTION.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {PREVIEW_QUESTION.options.map((opt) => {
              const isSelected = selectedId === opt.id;
              const isOptionCorrect = opt.id === PREVIEW_QUESTION.correctAnswerId;
              
              let optionStyles = 'border-white/10 bg-brand-surface/60 hover:border-white/25 text-brand-text';
              if (isSubmitted) {
                if (isOptionCorrect) {
                  optionStyles = 'border-emerald-500/60 bg-emerald-500/15 text-emerald-300 font-medium';
                } else if (isSelected && !isOptionCorrect) {
                  optionStyles = 'border-rose-500/60 bg-rose-500/15 text-rose-300';
                } else {
                  optionStyles = 'border-white/5 opacity-50 bg-brand-surface/30 text-brand-muted';
                }
              } else if (isSelected) {
                optionStyles = 'border-brand-lime bg-brand-lime/10 text-brand-lime font-medium';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  disabled={isSubmitted}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between gap-3 ${optionStyles}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold uppercase flex-shrink-0">
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>

                  {isSubmitted && isOptionCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isOptionCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          {!isSubmitted ? (
            <div className="flex justify-end">
              <button
                onClick={handleCheck}
                disabled={!selectedId}
                className="px-6 py-2.5 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-white/10 space-y-4"
              >
                <div className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Lightbulb className="w-4 h-4 text-brand-lime" />
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-text">
                      {isCorrect ? 'Correct! Here is the science:' : 'Not quite. Here is the science:'}
                    </span>
                  </div>
                  <p className="text-sm text-brand-text/90 leading-relaxed">
                    {PREVIEW_QUESTION.explanation}
                  </p>
                  <p className="text-xs text-brand-muted mt-2 pt-2 border-t border-white/5 italic">
                    Source: {PREVIEW_QUESTION.source}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-text transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try sample again</span>
                  </button>

                  <button
                    onClick={onStartFullQuest}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime flex items-center justify-center gap-2"
                  >
                    <span>Launch Full 5-Question Quest</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

        </div>

      </div>
    </section>
  );
}
