import React from 'react';
import { motion } from 'framer-motion';
import { AnswerOption } from './AnswerOption';
import { FeedbackPanel } from './FeedbackPanel';
import { SkipForward } from 'lucide-react';

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  isAnswerLocked,
  isFeedbackVisible,
  onSelectOption,
  onConfirmAnswer,
  onNextQuestion,
  onSkipQuestion
}) {
  if (!question) return null;

  const isLast = currentIndex === totalQuestions - 1;
  const isOptionSelected = Boolean(selectedOptionId);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 sm:p-10 rounded-3xl glass-panel-elevated border border-white/10 shadow-2xl relative"
    >
      {/* Category header */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10 mb-6">
        <span className="px-3 py-1 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-xs font-bold text-brand-lime uppercase tracking-wider">
          {question.topic}
        </span>
        <span className="text-xs text-brand-muted font-medium bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
          {question.difficulty}
        </span>
      </div>

      {/* Main Question Text */}
      <h2 className="font-display font-bold text-xl sm:text-2xl text-brand-text mb-8 leading-snug">
        {question.question}
      </h2>

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

      {/* Controls row before confirming answer */}
      {!isFeedbackVisible && (
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onSkipQuestion}
            disabled={isAnswerLocked}
            className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-text transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
            aria-label="Skip question"
          >
            <SkipForward className="w-4 h-4" />
            <span>Skip Question</span>
          </button>

          <button
            onClick={onConfirmAnswer}
            disabled={!isOptionSelected || isAnswerLocked}
            className="px-7 py-3 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all shadow-glow-lime"
          >
            Confirm Answer
          </button>
        </div>
      )}

      {/* Feedback panel after confirming answer */}
      {isFeedbackVisible && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <FeedbackPanel
            isCorrect={selectedOptionId === question.correctAnswerId}
            explanation={question.explanation}
            source={question.source}
            isLastQuestion={isLast}
            onNext={onNextQuestion}
          />
        </div>
      )}
    </motion.div>
  );
}
