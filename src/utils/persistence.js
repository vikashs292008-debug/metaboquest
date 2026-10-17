/**
 * LocalStorage Persistence & Local Privacy Metrics
 * Safely accesses browser storage with defensive fallbacks.
 */

const STORAGE_KEYS = {
  METRICS: 'metaboquest_local_metrics',
  ACHIEVEMENTS: 'metaboquest_unlocked_achievements',
  DAILY: 'metaboquest_daily_state',
  SETTINGS: 'metaboquest_user_settings',
  HISTORY: 'metaboquest_score_history'
};

/**
 * Safe getItem wrapper
 */
export function getStoredItem(key, defaultValue) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return defaultValue;
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`LocalStorage read failed for key ${key}:`, e);
    return defaultValue;
  }
}

/**
 * Safe setItem wrapper
 */
export function setStoredItem(key, value) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`LocalStorage write failed for key ${key}:`, e);
  }
}

// Local event metrics tracking (on-device only, privacy-conscious)
export function getLocalMetrics() {
  return getStoredItem(STORAGE_KEYS.METRICS, {
    quizStarts: 0,
    quizCompletions: 0,
    shareClicks: 0,
    linkCopies: 0,
    ctaClicks: 0
  });
}

export function recordLocalMetric(metricName) {
  const current = getLocalMetrics();
  if (metricName in current) {
    current[metricName] += 1;
    setStoredItem(STORAGE_KEYS.METRICS, current);
  }
}

// Achievements persistence
export function getUnlockedAchievements() {
  return getStoredItem(STORAGE_KEYS.ACHIEVEMENTS, []);
}

export function saveUnlockedAchievement(achievementId) {
  const current = getUnlockedAchievements();
  if (!current.includes(achievementId)) {
    const updated = [...current, achievementId];
    setStoredItem(STORAGE_KEYS.ACHIEVEMENTS, updated);
    return true; // Newly unlocked
  }
  return false;
}

// Daily Quest state tracking
export function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDailyQuestState() {
  const today = getTodayDateString();
  const state = getStoredItem(STORAGE_KEYS.DAILY, {
    lastDate: '',
    completedToday: false,
    streak: 0,
    totalDailyCompleted: 0
  });

  // Check if date rolled over
  if (state.lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    
    // If completed yesterday, keep streak; otherwise reset streak to 0
    const maintainedStreak = state.lastDate === yesterdayStr ? state.streak : 0;
    
    return {
      lastDate: today,
      completedToday: false,
      streak: maintainedStreak,
      totalDailyCompleted: state.totalDailyCompleted || 0
    };
  }

  return state;
}

export function markDailyQuestCompleted() {
  const today = getTodayDateString();
  const current = getDailyQuestState();
  if (current.completedToday) return current;

  const updated = {
    lastDate: today,
    completedToday: true,
    streak: current.streak + 1,
    totalDailyCompleted: (current.totalDailyCompleted || 0) + 1
  };
  setStoredItem(STORAGE_KEYS.DAILY, updated);
  return updated;
}

// User settings (e.g., timer preference)
export function getUserSettings() {
  return getStoredItem(STORAGE_KEYS.SETTINGS, {
    timerEnabled: true,
    reducedMotion: false
  });
}

export function saveUserSettings(settings) {
  const current = getUserSettings();
  const updated = { ...current, ...settings };
  setStoredItem(STORAGE_KEYS.SETTINGS, updated);
  return updated;
}

// Quest attempt history (on-device only)
export function getQuestHistory() {
  return getStoredItem(STORAGE_KEYS.HISTORY, []);
}

export function recordQuestAttempt({ score, maxScore, accuracyPercent, archetypeTitle, mode = 'classic' }) {
  const history = getQuestHistory();
  const newRecord = {
    id: `quest_${Date.now()}`,
    timestamp: Date.now(),
    date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    dateKey: getTodayDateString(),
    score,
    maxScore,
    accuracyPercent,
    archetypeTitle,
    mode
  };
  const updated = [newRecord, ...history].slice(0, 30); // Keep last 30 runs
  setStoredItem(STORAGE_KEYS.HISTORY, updated);
  return updated;
}

export function clearQuestHistory() {
  setStoredItem(STORAGE_KEYS.HISTORY, []);
  return [];
}
