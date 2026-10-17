/**
 * Centralized Scoring & Archetype Utility
 * Deterministic, single source of truth for scoring across the entire app.
 */

export const POINTS_PER_CORRECT = 100;
export const COMPLETION_BONUS = 100;
export const TOTAL_QUESTIONS_PER_ROUND = 5;
export const MAX_SCORE = (TOTAL_QUESTIONS_PER_ROUND * POINTS_PER_CORRECT) + COMPLETION_BONUS; // 600

export const ARCHETYPES = [
  {
    minScore: 600,
    title: 'Metabolic Scholar',
    badge: '🏆',
    color: '#C6FF65',
    tagline: 'Master of cellular energy & metabolic pathways',
    description: 'You demonstrated comprehensive mastery across circadian biology, muscle physiology, and nutrition science.'
  },
  {
    minScore: 500,
    title: 'Metabolic Explorer',
    badge: '⚡',
    color: '#A78BFA',
    tagline: 'Deep understanding of metabolic balance',
    description: 'Outstanding grasp of metabolic health principles! You understand the critical connections between sleep, muscle, and glucose.'
  },
  {
    minScore: 400,
    title: 'Science Seeker',
    badge: '🔬',
    color: '#60A5FA',
    tagline: 'Strong foundation in evidence-based health',
    description: 'Great intuition for how the human body processes energy. A few nuanced biological mechanisms await your discovery!'
  },
  {
    minScore: 300,
    title: 'Knowledge Builder',
    badge: '🌱',
    color: '#34D399',
    tagline: 'Actively building metabolic literacy',
    description: 'You are uncovering key metabolic realities that challenge common health myths. Every insight empowers better daily choices.'
  },
  {
    minScore: 0,
    title: 'Wellness Curious',
    badge: '✨',
    color: '#FBBF24',
    tagline: 'Embarking on the metabolic learning journey',
    description: 'Welcome to metabolic science! Health media often spreads oversimplified myths; you now have clear, science-backed facts to build upon.'
  }
];

/**
 * Calculates deterministic quiz results.
 * @param {Array<{questionId: string, selectedOptionId: string, isCorrect: boolean, topic: string}>} answers
 * @param {number} durationSeconds
 * @param {boolean} isCompleted
 * @returns {Object} Full scorecard
 */
export function calculateScorecard(answers, durationSeconds = 0, isCompleted = true, totalQuestionsTarget = TOTAL_QUESTIONS_PER_ROUND) {
  const answeredCount = answers.length;
  const correctCount = answers.filter(a => a.isCorrect).length;
  const incorrectCount = answeredCount - correctCount;

  const maxPossibleScore = (totalQuestionsTarget * POINTS_PER_CORRECT) + COMPLETION_BONUS;

  // Points calculation
  const rawPoints = correctCount * POINTS_PER_CORRECT;
  const completionBonusAwarded = isCompleted && answeredCount >= totalQuestionsTarget ? COMPLETION_BONUS : 0;
  const totalPoints = rawPoints + completionBonusAwarded;

  const accuracyPercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  // Topic breakdown
  const topicBreakdown = {};
  answers.forEach(a => {
    if (!topicBreakdown[a.topic]) {
      topicBreakdown[a.topic] = { total: 0, correct: 0 };
    }
    topicBreakdown[a.topic].total += 1;
    if (a.isCorrect) {
      topicBreakdown[a.topic].correct += 1;
    }
  });

  // Archetype determination based on accuracy tier
  let archetype;
  if (accuracyPercent === 100) {
    archetype = ARCHETYPES[0]; // Metabolic Scholar
  } else if (accuracyPercent >= 80) {
    archetype = ARCHETYPES[1]; // Metabolic Explorer
  } else if (accuracyPercent >= 60) {
    archetype = ARCHETYPES[2]; // Science Seeker
  } else if (accuracyPercent >= 40) {
    archetype = ARCHETYPES[3]; // Knowledge Builder
  } else {
    archetype = ARCHETYPES[4]; // Wellness Curious
  }

  // Specific educational insight based on missed topics
  const missedAnswers = answers.filter(a => !a.isCorrect);
  let tailoredInsight = 'Remarkable performance! You demonstrated a complete command of metabolic science fundamentals.';
  
  if (missedAnswers.length > 0) {
    const firstMissed = missedAnswers[0];
    if (firstMissed.topic && firstMissed.topic.includes('Sleep')) {
      tailoredInsight = 'Insight to explore: Sleep architecture directly impacts your hormones. Even one night of restricted rest temporarily decreases insulin sensitivity by up to 20-30%.';
    } else if (firstMissed.topic && firstMissed.topic.includes('Movement')) {
      tailoredInsight = 'Insight to explore: Skeletal muscle acts as your body\'s primary glucose sink, taking in up to 80% of post-meal blood sugar through movement.';
    } else if (firstMissed.topic && firstMissed.topic.includes('Nutrition')) {
      tailoredInsight = 'Insight to explore: Soluble dietary fiber feeds beneficial gut microbes that naturally trigger satiety hormones (GLP-1 and PYY) while moderating glucose spikes.';
    } else if (firstMissed.topic && (firstMissed.topic.includes('Lipids') || firstMissed.topic.includes('Biomarkers'))) {
      tailoredInsight = 'Insight to explore: A high Triglyceride-to-HDL ratio often signals underlying insulin resistance more accurately than total cholesterol alone.';
    } else {
      tailoredInsight = 'Insight to explore: Metabolic health is about cellular energy efficiency and adaptability across organs, rather than scale weight alone.';
    }
  }

  return {
    totalPoints,
    maxScore: maxPossibleScore,
    correctCount,
    incorrectCount,
    totalQuestions: totalQuestionsTarget,
    durationSeconds,
    isCompleted,
    completionBonusAwarded,
    accuracyPercent,
    archetype,
    topicBreakdown,
    tailoredInsight
  };
}
