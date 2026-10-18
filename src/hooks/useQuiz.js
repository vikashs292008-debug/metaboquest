import { useState, useEffect, useCallback, useRef } from 'react';
import { QUESTIONS_BANK, TOPICS } from '../data/questions';
import { calculateScorecard, TOTAL_QUESTIONS_PER_ROUND } from '../utils/scoring';
import { recordLocalMetric } from '../utils/persistence';
import { sound } from '../utils/audio';

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
 * Selects 5 balanced questions with varied topics for the standard round.
 */
function selectBalancedQuestions(count = 5) {
  const allShuffled = shuffleArray(QUESTIONS_BANK);
  const selected = [];
  const usedTopics = new Set();

  // First pass: pick questions with unique topics
  for (const q of allShuffled) {
    if (!usedTopics.has(q.topic)) {
      selected.push(q);
      usedTopics.add(q.topic);
      if (selected.length >= count) break;
    }
  }

  // Second pass: if we still need more questions, fill in remaining
  if (selected.length < count) {
    for (const q of allShuffled) {
      if (!selected.some(item => item.id === q.id)) {
        selected.push(q);
        if (selected.length >= count) break;
      }
    }
  }

  return selected;
}

/**
 * Selects questions based on chosen mode
 * @param {'classic' | 'gauntlet' | 'sleep' | 'movement' | 'glucose' | 'lipids'} mode
 */
function selectQuestionsByMode(mode = 'classic') {
  if (mode === 'gauntlet') {
    return shuffleArray(QUESTIONS_BANK).slice(0, 10);
  }

  if (mode === 'sleep') {
    const filtered = QUESTIONS_BANK.filter(q => q.topic === TOPICS.SLEEP_MOVEMENT);
    return shuffleArray(filtered).slice(0, Math.min(5, filtered.length));
  }

  if (mode === 'glucose') {
    const filtered = QUESTIONS_BANK.filter(q => q.topic === TOPICS.GLUCOSE_ENERGY);
    return shuffleArray(filtered).slice(0, Math.min(5, filtered.length));
  }

  if (mode === 'lipids') {
    const filtered = QUESTIONS_BANK.filter(q => q.topic === TOPICS.LIPIDS || q.topic === TOPICS.BLOOD_PRESSURE);
    return shuffleArray(filtered).slice(0, Math.min(5, filtered.length));
  }

  // Default 'classic' mode: 5 balanced questions
  return selectBalancedQuestions(TOTAL_QUESTIONS_PER_ROUND);
}

export function useQuiz(initialTimerEnabled = true, initialMode = 'classic') {
  const [questMode, setQuestMode] = useState(initialMode);
  const [questions, setQuestions] = useState(() => selectQuestionsByMode(initialMode));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showMilestoneToast, setShowMilestoneToast] = useState(false);
  
  // Timer state
  const [timerEnabled, setTimerEnabled] = useState(initialTimerEnabled);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  
  const timerRef = useRef(null);
  const totalQuestionsInRound = questions.length;
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
   * Selects an answer option with subtle audio
   */
  const handleSelectOption = useCallback((optionId) => {
    if (isAnswerLocked || isCompleted) return;
    sound.playSelect();
    setSelectedOptionId(optionId);
  }, [isAnswerLocked, isCompleted]);

  /**
   * Toggles educational hint
   */
  const handleToggleHint = useCallback(() => {
    sound.playSelect();
    setIsHintVisible(prev => !prev);
  }, []);

  /**
   * Confirms the selected answer, locks selection, computes correctness, awards points, plays audio
   */
  const handleConfirmAnswer = useCallback(() => {
    if (!selectedOptionId || isAnswerLocked || !currentQuestion) return;

    // Immediately lock to prevent double scoring or rapid clicks
    setIsAnswerLocked(true);
    const isCorrect = selectedOptionId === currentQuestion.correctAnswerId;

    if (isCorrect) {
      sound.playSuccess();
    } else {
      sound.playError();
    }

    const answerRecord = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      selectedOptionId,
      correctAnswerId: currentQuestion.correctAnswerId,
      isCorrect,
      topic: currentQuestion.topic,
      explanation: currentQuestion.explanation,
      hint: currentQuestion.hint,
      sourceTitle: currentQuestion.sourceTitle,
      sourceUrl: currentQuestion.sourceUrl
    };

    setAnswers(prev => [...prev, answerRecord]);
    setIsFeedbackVisible(true);

    // Subtle milestone animation after completing Question 3 (index 2)
    if (currentIndex === 2) {
      setShowMilestoneToast(true);
      setTimeout(() => setShowMilestoneToast(false), 3500);
    }
  }, [selectedOptionId, isAnswerLocked, currentQuestion, currentIndex]);

  /**
   * Advances to next question or finalizes quiz if on the last question
   */
  const handleNextQuestion = useCallback(() => {
    sound.playSelect();
    if (currentIndex + 1 < totalQuestionsInRound) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerLocked(false);
      setIsFeedbackVisible(false);
      setIsHintVisible(false);
    } else {
      // Completed all questions in the round
      sound.playComplete();
      setIsCompleted(true);
      setIsTimerRunning(false);
      setIsFeedbackVisible(false);
      recordLocalMetric('quizCompletions');
    }
  }, [currentIndex, totalQuestionsInRound]);

  /**
   * Allows user to skip current question (treated as non-answered, 0 pts)
   */
  const handleSkipQuestion = useCallback(() => {
    if (isAnswerLocked || !currentQuestion) return;
    sound.playSelect();
    setIsAnswerLocked(true);

    const answerRecord = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      selectedOptionId: null,
      correctAnswerId: currentQuestion.correctAnswerId,
      isCorrect: false,
      topic: currentQuestion.topic,
      explanation: currentQuestion.explanation,
      hint: currentQuestion.hint,
      sourceTitle: currentQuestion.sourceTitle,
      sourceUrl: currentQuestion.sourceUrl,
      skipped: true
    };

    setAnswers(prev => [...prev, answerRecord]);
    setIsFeedbackVisible(true);

    if (currentIndex === 2) {
      setShowMilestoneToast(true);
      setTimeout(() => setShowMilestoneToast(false), 3500);
    }
  }, [isAnswerLocked, currentQuestion, currentIndex]);

  /**
   * Cleanly restarts the quiz with fresh question order and chosen mode
   */
  const handleRestartQuiz = useCallback((newMode = questMode) => {
    setQuestMode(newMode);
    const freshQuestions = selectQuestionsByMode(newMode);
    setQuestions(freshQuestions);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerLocked(false);
    setIsFeedbackVisible(false);
    setIsHintVisible(false);
    setShowMilestoneToast(false);
    setAnswers([]);
    setIsCompleted(false);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
    recordLocalMetric('quizStarts');
  }, [questMode]);

  /**
   * Toggles the timer mode without resetting quiz progress
   */
  const handleToggleTimer = useCallback(() => {
    sound.playSelect();
    setTimerEnabled(prev => !prev);
  }, []);

  // Compute final scorecard deterministically
  const scorecard = calculateScorecard(answers, elapsedSeconds, isCompleted, totalQuestionsInRound);

  return {
    questMode,
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions: totalQuestionsInRound,
    selectedOptionId,
    isAnswerLocked,
    isFeedbackVisible,
    isHintVisible,
    showMilestoneToast,
    answers,
    isCompleted,
    timerEnabled,
    elapsedSeconds,
    scorecard,
    selectOption: handleSelectOption,
    toggleHint: handleToggleHint,
    confirmAnswer: handleConfirmAnswer,
    nextQuestion: handleNextQuestion,
    skipQuestion: handleSkipQuestion,
    restartQuiz: handleRestartQuiz,
    toggleTimer: handleToggleTimer
  };
}
