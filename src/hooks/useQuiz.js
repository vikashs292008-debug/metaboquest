import { useState, useEffect, useCallback, useRef } from 'react';
import { QUESTIONS_BANK } from '../data/questions';
import { calculateScorecard, TOTAL_QUESTIONS_PER_ROUND } from '../utils/scoring';
import { recordLocalMetric } from '../utils/persistence';

/**
 * Fisher-Yates array shuffle
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Selects 5 balanced questions from different topics when possible
 */
function selectQuestions() {
  const shuffled = shuffleArray(QUESTIONS_BANK);
  return shuffled.slice(0, TOTAL_QUESTIONS_PER_ROUND);
}

export function useQuiz(initialTimerEnabled = true) {
  const [questions, setQuestions] = useState(() => selectQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Timer state
  const [timerEnabled, setTimerEnabled] = useState(initialTimerEnabled);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  
  const timerRef = useRef(null);
  const currentQuestion = questions[currentIndex] || null;

  // Track quiz start
  useEffect(() => {
    recordLocalMetric('quizStarts');
  }, []);

  // Timer interval handling
  useEffect(() => {
    if (isTimerRunning && !isCompleted && timerEnabled) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isCompleted, timerEnabled]);

  /**
   * Selects an answer option
   */
  const handleSelectOption = useCallback((optionId) => {
    if (isAnswerLocked || isCompleted) return;
    setSelectedOptionId(optionId);
  }, [isAnswerLocked, isCompleted]);

  /**
   * Confirms the selected answer, locks selection, computes correctness, awards points
   */
  const handleConfirmAnswer = useCallback(() => {
    if (!selectedOptionId || isAnswerLocked || !currentQuestion) return;

    // Immediately lock to prevent double scoring or rapid clicks
    setIsAnswerLocked(true);
    const isCorrect = selectedOptionId === currentQuestion.correctAnswerId;

    const answerRecord = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      selectedOptionId,
      correctAnswerId: currentQuestion.correctAnswerId,
      isCorrect,
      topic: currentQuestion.topic,
      explanation: currentQuestion.explanation,
      source: currentQuestion.source
    };

    setAnswers(prev => [...prev, answerRecord]);
    setIsFeedbackVisible(true);
  }, [selectedOptionId, isAnswerLocked, currentQuestion]);

  /**
   * Advances to next question or finalizes quiz if on the 5th question
   */
  const handleNextQuestion = useCallback(() => {
    if (currentIndex + 1 < TOTAL_QUESTIONS_PER_ROUND) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerLocked(false);
      setIsFeedbackVisible(false);
    } else {
      // Completed all 5 questions
      setIsCompleted(true);
      setIsTimerRunning(false);
      setIsFeedbackVisible(false);
      recordLocalMetric('quizCompletions');
    }
  }, [currentIndex]);

  /**
   * Allows user to skip current question (treated as non-answered, 0 pts)
   */
  const handleSkipQuestion = useCallback(() => {
    if (isAnswerLocked || !currentQuestion) return;
    setIsAnswerLocked(true);

    const answerRecord = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      selectedOptionId: null,
      correctAnswerId: currentQuestion.correctAnswerId,
      isCorrect: false,
      topic: currentQuestion.topic,
      explanation: currentQuestion.explanation,
      source: currentQuestion.source,
      skipped: true
    };

    setAnswers(prev => [...prev, answerRecord]);
    setIsFeedbackVisible(true);
  }, [isAnswerLocked, currentQuestion]);

  /**
   * Cleanly restarts the quiz with fresh question order and zero state leaks
   */
  const handleRestartQuiz = useCallback(() => {
    setQuestions(selectQuestions());
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerLocked(false);
    setIsFeedbackVisible(false);
    setAnswers([]);
    setIsCompleted(false);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
    recordLocalMetric('quizStarts');
  }, []);

  /**
   * Toggles the timer mode without resetting quiz progress
   */
  const handleToggleTimer = useCallback(() => {
    setTimerEnabled(prev => !prev);
  }, []);

  // Compute final scorecard deterministically
  const scorecard = calculateScorecard(answers, elapsedSeconds, isCompleted);

  return {
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions: TOTAL_QUESTIONS_PER_ROUND,
    selectedOptionId,
    isAnswerLocked,
    isFeedbackVisible,
    answers,
    isCompleted,
    timerEnabled,
    elapsedSeconds,
    scorecard,
    selectOption: handleSelectOption,
    confirmAnswer: handleConfirmAnswer,
    nextQuestion: handleNextQuestion,
    skipQuestion: handleSkipQuestion,
    restartQuiz: handleRestartQuiz,
    toggleTimer: handleToggleTimer
  };
}
