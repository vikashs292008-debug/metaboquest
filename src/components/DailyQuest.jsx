import React, { useState } from 'react';
import { Calendar, Flame, CheckCircle2, XCircle, ArrowRight, Sparkles, Clock, HelpCircle } from 'lucide-react';
import { QUESTIONS_BANK } from '../data/questions';
import { getDailyQuestState, markDailyQuestCompleted } from '../utils/persistence';

/**
 * Deterministically picks today's question using current date hash
 */
function getTodayQuestion() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const questionIndex = dayOfYear % QUESTIONS_BANK.length;
  return QUESTIONS_BANK[questionIndex] || QUESTIONS_BANK[0];
}

export function DailyQuest({ onUnlockAchievement, showToast }) {
  const [dailyState, setDailyState] = useState(() => getDailyQuestState());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const question = getTodayQuestion();
  const isCorrect = selectedOptionId === question.correctAnswerId;

  const handleOpenDaily = () => {
    setIsModalOpen(true);
  };

  const handleSelect = (id) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(id);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId) return;
    setIsAnswerSubmitted(true);
    
    // Mark completed in LocalStorage
    const newState = markDailyQuestCompleted();
    setDailyState(newState);

    if (onUnlockAchievement) {
      onUnlockAchievement('daily_explorer');
    }

    if (showToast) {
      showToast({
        type: 'achievement',
        title: 'Daily Quest Complete!',
        message: `Streak is now ${newState.streak} days on this device!`
      });
    }
  };

  return (
    <section id="daily-quest-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-10 rounded-3xl glass-panel-elevated border border-brand-lime/20 relative overflow-hidden shadow-2xl">
          
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-xs font-bold text-brand-lime uppercase">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Daily Quest</span>
                </span>
                
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{dailyState.streak} Day Device Streak</span>
                </span>

                <span className="text-xs text-brand-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>30 seconds</span>
                </span>
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-text">
                Today’s Metabolic Discovery
              </h2>

              <p className="text-sm text-brand-muted max-w-xl">
                One new scientific focus every 24 hours. Keep your curiosity sharp and track your streak locally on this device.
              </p>

              <div className="flex items-center gap-4 text-xs font-semibold text-brand-muted">
                <span>Topic: <span className="text-brand-lime">{question.topic}</span></span>
                <span>•</span>
                <span>Reward: <span className="text-brand-lime">+100 Pts & Badge Progress</span></span>
              </div>
            </div>

            {/* Right Action */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              {dailyState.completedToday ? (
                <div className="w-full sm:w-auto p-4 rounded-2xl bg-brand-surface border border-emerald-500/30 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs uppercase font-bold text-emerald-400">Completed for today</p>
                    <p className="text-xs text-brand-muted">Come back tomorrow for the next quest!</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleOpenDaily}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime flex items-center justify-center gap-2"
                >
                  <span>Start Today’s Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Daily Quest Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-bg/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="daily-quest-title"
        >
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-brand-surface border border-white/10 shadow-2xl relative">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <span className="text-xs font-bold text-brand-lime uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Today’s Question • {question.topic}</span>
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-brand-muted hover:text-brand-text p-1"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <h3 id="daily-quest-title" className="font-display font-semibold text-lg text-brand-text mb-5 leading-snug">
              {question.question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-2.5 mb-6">
              {question.options.map(opt => {
                const isSelected = selectedOptionId === opt.id;
                const isOptCorrect = opt.id === question.correctAnswerId;

                let optClass = 'border-white/10 bg-brand-card hover:border-white/20 text-brand-text';
                if (isAnswerSubmitted) {
                  if (isOptCorrect) {
                    optClass = 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-medium';
                  } else if (isSelected && !isOptCorrect) {
                    optClass = 'border-rose-500 bg-rose-500/15 text-rose-300';
                  } else {
                    optClass = 'border-white/5 opacity-40 bg-brand-card text-brand-muted';
                  }
                } else if (isSelected) {
                  optClass = 'border-brand-lime bg-brand-lime/10 text-brand-lime font-medium';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optClass}`}
                  >
                    <span>{opt.text}</span>
                    {isAnswerSubmitted && isOptCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isOptCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom State */}
            {!isAnswerSubmitted ? (
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-brand-muted hover:text-brand-text"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOptionId}
                  className="px-6 py-2.5 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-xs sm:text-sm hover:bg-[#d4ff80] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Confirm Answer
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-3 border-t border-white/10">
                <div className={`p-4 rounded-xl border text-xs leading-relaxed ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-brand-surface border-white/10'}`}>
                  <p className="font-bold text-brand-text mb-1">
                    {isCorrect ? 'Correct! Well done.' : 'Good attempt! Here is the science:'}
                  </p>
                  <p className="text-brand-muted">{question.explanation}</p>
                  <p className="text-[11px] text-brand-muted/70 italic mt-2">
                    Source: {question.source}
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-brand-text font-display font-semibold text-xs transition-colors"
                >
                  Close & Keep Exploring
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
