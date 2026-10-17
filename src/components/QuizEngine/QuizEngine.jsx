import React from 'react';
import { ArrowLeft, Swords } from 'lucide-react';
import { QuizProgressBar } from './QuizProgressBar';
import { TimerDisplay } from './TimerDisplay';
import { QuestionCard } from './QuestionCard';

export function QuizEngine({
  quizState,
  challengeData,
  onExit
}) {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedOptionId,
    isAnswerLocked,
    isFeedbackVisible,
    timerEnabled,
    elapsedSeconds,
    scorecard,
    selectOption,
    confirmAnswer,
    nextQuestion,
    skipQuestion,
    toggleTimer
  } = quizState;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col justify-between">
      
      {/* Top Header Row */}
      <header className="space-y-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-text py-2 px-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Quest</span>
          </button>

          {/* If playing a friend challenge, show target ghost score */}
          {challengeData && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-xs font-semibold text-brand-violet">
              <Swords className="w-3.5 h-3.5" />
              <span>Target to beat: <strong className="text-white font-mono">{challengeData.targetScore} pts</strong></span>
            </div>
          )}

          {/* Timer Mode Toggle */}
          <TimerDisplay
            elapsedSeconds={elapsedSeconds}
            isTimerEnabled={timerEnabled}
            onToggleTimer={toggleTimer}
          />
        </div>

        {/* Progress Bar */}
        <QuizProgressBar
          currentStep={currentIndex + 1}
          totalSteps={totalQuestions}
          score={scorecard.totalPoints}
          maxScore={scorecard.maxScore}
        />
      </header>

      {/* Main Question Card Container */}
      <main className="flex-1 flex flex-col justify-center my-4">
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          selectedOptionId={selectedOptionId}
          isAnswerLocked={isAnswerLocked}
          isFeedbackVisible={isFeedbackVisible}
          onSelectOption={selectOption}
          onConfirmAnswer={confirmAnswer}
          onNextQuestion={nextQuestion}
          onSkipQuestion={skipQuestion}
        />
      </main>

      {/* Footer subtle tip */}
      <footer className="text-center pt-4 text-[11px] text-brand-muted/60">
        MetaboQuest • Evidence-informed biological science • No diagnosis inferred
      </footer>

    </div>
  );
}
