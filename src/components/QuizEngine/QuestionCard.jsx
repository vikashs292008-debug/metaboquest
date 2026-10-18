import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnswerOption } from './AnswerOption';
import { FeedbackPanel } from './FeedbackPanel';
import { SkipForward, HelpCircle, Sparkles, ChevronDown } from 'lucide-react';

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  isAnswerLocked,
  isFeedbackVisible,
  isHintVisible,
  showMilestoneToast,
  onSelectOption,
  onToggleHint,
  onConfirmAnswer,
  onNextQuestion,
  onSkipQuestion
}) {
  if (!question) return null;

  const isLast = currentIndex === totalQuestions - 1;
  const isOptionSelected = Boolean(selectedOptionId);

  return (
    <div className="relative">
      
      {/* Subtle Milestone Banner after Question 3 */}
      <AnimatePresence>
        {showMilestoneToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-brand-lime/20 via-brand-violet/20 to-brand-lime/20 border border-brand-lime/40 backdrop-blur-md flex items-center justify-center gap-2.5 shadow-lg text-center"
          >
            <Sparkles className="w-4 h-4 text-brand-lime animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-xs sm:text-sm font-bold text-white">
              Halfway Milestone! 3 of 5 questions completed — outstanding curiosity!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="p-6 sm:p-10 rounded-3xl glass-panel-elevated border border-white/10 shadow-2xl relative"
      >
        {/* Category & Step Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-xs font-bold text-brand-lime uppercase tracking-wider">
              {question.topic}
            </span>
            <span className="text-xs text-brand-muted font-medium bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
              {question.difficulty}
            </span>
          </div>

          <span className="text-xs font-mono font-semibold text-brand-muted">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>

        {/* Main Question Text */}
        <h2 className="font-display font-bold text-xl sm:text-2xl text-brand-text mb-6 leading-snug">
          {question.question}
        </h2>

        {/* Optional Hint Toggle ("Not sure? Give me a hint") */}
        {question.hint && !isFeedbackVisible && (
          <div className="mb-6">
            <button
              onClick={onToggleHint}
              type="button"
              className="inline-flex items-center gap-2 text-xs font-medium text-brand-lime hover:text-white transition-colors py-1.5 px-3 rounded-lg bg-brand-lime/10 border border-brand-lime/20 hover:bg-brand-lime/20"
              aria-expanded={isHintVisible}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{isHintVisible ? 'Hide hint' : 'Not sure? Give me a hint'}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isHintVisible ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isHintVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2.5 p-3.5 rounded-xl bg-white/5 border border-brand-lime/30 text-xs text-slate-300 leading-relaxed overflow-hidden"
                >
                  <span className="font-semibold text-brand-lime">Learning Clue: </span>
                  {question.hint}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3 mb-6" role="radiogroup" aria-label="Question options">
          {question.options.map((opt, idx) => (
            <AnswerOption
              key={opt.id}
              option={opt}
              index={idx}
              isSelected={selectedOptionId === opt.id}
              isLocked={isAnswerLocked}
              isCorrectOption={opt.id === question.correctAnswerId}
              showResult={isFeedbackVisible}
              onSelect={onSelectOption}
            />
          ))}
        </div>

        {/* Action Controls prior to submission */}
        {!isFeedbackVisible && (
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onSkipQuestion}
              disabled={isAnswerLocked}
              className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-text transition-colors py-2 px-3 rounded-lg hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
              aria-label="Skip question"
            >
              <SkipForward className="w-4 h-4" />
              <span>Skip Question</span>
            </button>

            <button
              onClick={onConfirmAnswer}
              disabled={!isOptionSelected || isAnswerLocked}
              className="px-7 py-3 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all shadow-glow-lime focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
            >
              Confirm Answer
            </button>
          </div>
        )}

        {/* Supportive Feedback panel after confirming */}
        {isFeedbackVisible && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <FeedbackPanel
              isCorrect={selectedOptionId === question.correctAnswerId}
              explanation={question.explanation}
              sourceTitle={question.sourceTitle}
              sourceUrl={question.sourceUrl}
              isLastQuestion={isLast}
              onNext={onNextQuestion}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
