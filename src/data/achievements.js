/**
 * MetaboQuest Achievements Definition
 * Evaluated transparently on client device and persisted in LocalStorage.
 */

export const ACHIEVEMENTS = [
  {
    id: 'first_quest',
    title: 'First Quest',
    description: 'Complete your first 5-question metabolic health challenge.',
    icon: 'Sparkles',
    rarity: 'Common',
    color: '#C6FF65',
    check: ({ completedQuests }) => completedQuests >= 1
  },
  {
    id: 'perfect_five',
    title: 'Perfect Five',
    description: 'Achieve a 5 out of 5 score with maximum accuracy.',
    icon: 'Flame',
    rarity: 'Rare',
    color: '#F59E0B',
    check: ({ currentScore, maxScore }) => currentScore === maxScore
  },
  {
    id: 'curious_mind',
    title: 'Curious Mind',
    description: 'Explore and read articles inside the Metabolic Science Library.',
    icon: 'BookOpen',
    rarity: 'Common',
    color: '#60A5FA',
    check: ({ exploredLibrary }) => Boolean(exploredLibrary)
  },
  {
    id: 'challenge_accepted',
    title: 'Challenge Accepted',
    description: 'Play a head-to-head quest from a friend\'s shared invite link.',
    icon: 'Swords',
    rarity: 'Special',
    color: '#A78BFA',
    check: ({ isChallengeRun }) => Boolean(isChallengeRun)
  },
  {
    id: 'daily_explorer',
    title: 'Daily Explorer',
    description: 'Complete the featured Daily Quest question.',
    icon: 'CalendarCheck',
    rarity: 'Daily',
    color: '#34D399',
    check: ({ completedDaily }) => Boolean(completedDaily)
  },
  {
    id: 'mindful_scholar',
    title: 'Deep Thinker',
    description: 'Carefully read all question scientific explanations during a quest.',
    icon: 'Brain',
    rarity: 'Uncommon',
    color: '#EC4899',
    check: ({ readAllExplanations }) => Boolean(readAllExplanations)
  }
];
