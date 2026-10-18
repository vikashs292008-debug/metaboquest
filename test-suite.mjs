import { calculateScorecard, MAX_SCORE, POINTS_PER_CORRECT, ARCHETYPES } from './src/utils/scoring.js';
import { sanitizeString } from './src/utils/sharing.js';
import { QUESTIONS_BANK, PREVIEW_QUESTION } from './src/data/questions.js';
import { ACHIEVEMENTS } from './src/data/achievements.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('--- METABOQUEST VERIFICATION TEST SUITE ---');

// TEST 1: Question bank integrity
assert(QUESTIONS_BANK.length >= 12, `Question bank has at least 12 questions (actual: ${QUESTIONS_BANK.length})`);

const ids = new Set();
let allQuestionsValid = true;
QUESTIONS_BANK.forEach(q => {
  if (ids.has(q.id)) {
    console.error(`Duplicate question ID: ${q.id}`);
    allQuestionsValid = false;
  }
  ids.add(q.id);

  if (!q.question || !q.options || q.options.length !== 4) {
    allQuestionsValid = false;
  }
  const hasValidCorrectAnswer = q.options.some(opt => opt.id === q.correctAnswerId);
  if (!hasValidCorrectAnswer) {
    console.error(`Question ${q.id} has invalid correctAnswerId ${q.correctAnswerId}`);
    allQuestionsValid = false;
  }
  if (!q.explanation || (!q.source && !q.sourceTitle)) {
    allQuestionsValid = false;
  }
});
assert(allQuestionsValid, 'All questions in the bank have 4 options, valid correct answer, explanation, and source');

// TEST 2: Scoring calculations - Perfect Score (5/5)
const perfectAnswers = [
  { questionId: 'q1', isCorrect: true, topic: 'Nutrition' },
  { questionId: 'q2', isCorrect: true, topic: 'Movement' },
  { questionId: 'q3', isCorrect: true, topic: 'Sleep' },
  { questionId: 'q4', isCorrect: true, topic: 'Movement' },
  { questionId: 'q5', isCorrect: true, topic: 'General' },
];
const perfectResult = calculateScorecard(perfectAnswers, 75, true);
assert(perfectResult.totalPoints === 500, `Perfect score equals 500 pts (actual: ${perfectResult.totalPoints})`);
assert(perfectResult.accuracyPercent === 100, `Perfect score accuracy is 100%`);
assert(perfectResult.archetype.title === 'Metabolic Health Enthusiast', `Archetype is Metabolic Health Enthusiast`);

// TEST 3: Scoring calculations - Partial Score (3/5)
const partialAnswers = [
  { questionId: 'q1', isCorrect: true, topic: 'Nutrition' },
  { questionId: 'q2', isCorrect: false, topic: 'Movement' },
  { questionId: 'q3', isCorrect: true, topic: 'Sleep' },
  { questionId: 'q4', isCorrect: false, topic: 'Movement' },
  { questionId: 'q5', isCorrect: true, topic: 'General' },
];
const partialResult = calculateScorecard(partialAnswers, 85, true);
assert(partialResult.totalPoints === 300, `3 correct equals 300 pts (actual: ${partialResult.totalPoints})`);
assert(partialResult.correctCount === 3 && partialResult.incorrectCount === 2, `Correct/incorrect counts are accurate`);
assert(partialResult.archetype.title === 'Knowledge Builder', `Archetype is Knowledge Builder (actual: ${partialResult.archetype.title})`);

// TEST 4: Scoring calculations - Zero Correct (0/5)
const zeroAnswers = [
  { questionId: 'q1', isCorrect: false, topic: 'Nutrition' },
  { questionId: 'q2', isCorrect: false, topic: 'Movement' },
  { questionId: 'q3', isCorrect: false, topic: 'Sleep' },
  { questionId: 'q4', isCorrect: false, topic: 'Movement' },
  { questionId: 'q5', isCorrect: false, topic: 'General' },
];
const zeroResult = calculateScorecard(zeroAnswers, 95, true);
assert(zeroResult.totalPoints === 0, `0 correct equals 0 pts (actual: ${zeroResult.totalPoints})`);
assert(zeroResult.archetype.title === 'Curious Explorer', `Archetype is Curious Explorer`);

// TEST 5: Input sanitization & defensive string validation
const maliciousInput = '<script>alert("hack")</script>';
const sanitized = sanitizeString(maliciousInput);
assert(!sanitized.includes('<') && !sanitized.includes('>'), `HTML tags stripped from sanitized input (actual: "${sanitized}")`);

const longInput = 'A'.repeat(100);
const sanitizedLong = sanitizeString(longInput);
assert(sanitizedLong.length <= 50, `String length strictly capped to 50 chars`);

// TEST 6: Achievements definitions
assert(ACHIEVEMENTS.length >= 5, `At least 5 achievements defined (actual: ${ACHIEVEMENTS.length})`);
const allHaveRequiredProps = ACHIEVEMENTS.every(a => a.id && a.title && a.description && typeof a.check === 'function');
assert(allHaveRequiredProps, 'All achievements have id, title, description, and check function');

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
