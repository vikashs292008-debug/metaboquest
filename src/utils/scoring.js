/**
 * MetaboQuest Scoring & Personalization Engine
 * 
 * Simple, transparent knowledge-based scoring:
 * - 100 points for each correct answer
 * - Maximum score: 500 (5 questions * 100)
 * - Three playful learning labels (Curious Explorer, Knowledge Builder, Metabolic Health Enthusiast)
 * - Strictly educational; measures quiz performance only with zero medical inferences.
 */

export const POINTS_PER_CORRECT = 100;
export const TOTAL_QUESTIONS_PER_ROUND = 5;
export const MAX_SCORE = TOTAL_QUESTIONS_PER_ROUND * POINTS_PER_CORRECT; // 500

export const ARCHETYPES = [
  {
    id: 'enthusiast',
    minScore: 500,
    title: 'Metabolic Health Enthusiast',
    badge: '⚡',
    color: '#C6FF65',
    tagline: 'Comprehensive mastery of cellular energy pathways',
    description: 'Flawless quest! You demonstrated exceptional literacy across circadian biology, glucose dynamics, and evidence-informed health principles.',
    educationalTip: 'Challenge yourself further by exploring advanced lipid particle ratios and how clinicians evaluate metabolic flexibility.'
  },
  {
    id: 'builder',
    minScore: 300,
    title: 'Knowledge Builder',
    badge: '🌱',
    color: '#34D399',
    tagline: 'Strong foundation in evidence-based metabolic biology',
    description: 'Great grasp of core metabolic mechanisms! You clearly understand how sleep, muscle contraction, and nutrition connect to support daily energy.',
    educationalTip: 'A few nuanced biological mechanisms await your exploration—such as how nighttime circadian clocks regulate insulin secretion.'
  },
  {
    id: 'explorer',
    minScore: 0,
    title: 'Curious Explorer',
    badge: '🧭',
    color: '#A78BFA',
    tagline: 'Embarking on the metabolic discovery journey',
    description: 'Every great explorer begins with curiosity. You are discovering key biological realities that cut through common wellness myths!',
    educationalTip: 'Metabolism is not just a bathroom scale number—it is the living biochemical energy network powering every cell in your body.'
  }
];

/**
 * Calculates deterministic quiz results and personalized learning recommendations.
 * 
 * @param {Array<{questionId: string, selectedOptionId: string, isCorrect: boolean, topic: string, questionText: string, explanation: string, sourceTitle?: string, sourceUrl?: string}>} answers
 * @param {number} durationSeconds
 * @param {boolean} isCompleted
 * @param {number} totalQuestionsTarget
 * @returns {Object} Complete scorecard
 */
export function calculateScorecard(
  answers = [], 
  durationSeconds = 0, 
  isCompleted = true, 
  totalQuestionsTarget = TOTAL_QUESTIONS_PER_ROUND
) {
  const answeredCount = answers.length;
  const correctCount = answers.filter(a => a.isCorrect).length;
  const incorrectCount = answeredCount - correctCount;
  const totalPoints = correctCount * POINTS_PER_CORRECT;
  const accuracyPercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  // Group performance by topic
  const topicBreakdown = {};
  answers.forEach(a => {
    const topic = a.topic || 'Metabolic Science';
    if (!topicBreakdown[topic]) {
      topicBreakdown[topic] = { total: 0, correct: 0 };
    }
    topicBreakdown[topic].total += 1;
    if (a.isCorrect) {
      topicBreakdown[topic].correct += 1;
    }
  });

  // Archetype selection matching the 3 friendly result labels
  let archetype;
  if (totalPoints >= 500) {
    archetype = ARCHETYPES[0]; // Metabolic Health Enthusiast
  } else if (totalPoints >= 300) {
    archetype = ARCHETYPES[1]; // Knowledge Builder
  } else {
    archetype = ARCHETYPES[2]; // Curious Explorer
  }

  // Personalization based on user's answer history
  // 1. Identify a topic they answered correctly
  const correctAnswers = answers.filter(a => a.isCorrect);
  const missedAnswers = answers.filter(a => !a.isCorrect);

  const strengthTopic = correctAnswers.length > 0 
    ? correctAnswers[0].topic 
    : 'Metabolic Curiosity';

  // 2. Suggest one topic they could explore further
  let topicToExplore = 'How Clinicians Use Context & Measurements';
  let relevantFact = 'Metabolic health involves multiple interacting markers (blood sugar, lipids, blood pressure) rather than any single measurement like scale weight alone.';

  if (missedAnswers.length > 0) {
    topicToExplore = missedAnswers[0].topic;
    relevantFact = missedAnswers[0].explanation || relevantFact;
  } else if (correctAnswers.length > 0) {
    // If all correct, pick an advanced topic to deepen learning
    topicToExplore = 'Vascular & Circadian Dynamics';
    relevantFact = 'Combining resistance training with post-meal ambulation engages non-insulin GLUT4 transporters, taking up to 80% of circulating glucose into skeletal muscle.';
  }

  return {
    totalPoints,
    maxScore: MAX_SCORE,
    correctCount,
    incorrectCount,
    totalQuestions: totalQuestionsTarget,
    durationSeconds,
    isCompleted,
    accuracyPercent,
    archetype,
    topicBreakdown,
    personalization: {
      strengthTopic,
      topicToExplore,
      relevantFact,
      recommendation: 'Replay another quest! With our 16-question evidence bank, each playthrough selects fresh topics to broaden your metabolic literacy.'
    },
    educationalNotice: 'This score measures quiz performance and concept familiarity only. It does not measure or infer your personal health status, disease risk, or clinical requirements.'
  };
}
