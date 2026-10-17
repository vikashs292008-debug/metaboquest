import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Toast } from './components/Toast';
import { AchievementsModal } from './components/AchievementsModal';
import { ChallengeInviteModal } from './components/ChallengeInviteModal';
import { QuestModeModal } from './components/QuestModeModal';
import { QuestHistoryModal } from './components/QuestHistoryModal';
import { HomePage } from './pages/HomePage';
import { QuizEngine } from './components/QuizEngine/QuizEngine';
import { ResultsScreen } from './components/Results/ResultsScreen';
import { useQuiz } from './hooks/useQuiz';
import { parseChallengeParams } from './utils/sharing';
import { getUnlockedAchievements, saveUnlockedAchievement, recordQuestAttempt } from './utils/persistence';
import { ACHIEVEMENTS } from './data/achievements';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'quiz' | 'results'
  const [challengeData, setChallengeData] = useState(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => getUnlockedAchievements());
  
  // Modals state
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isModesModalOpen, setIsModesModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  
  const [toast, setToast] = useState(null);

  const quizState = useQuiz(true, 'classic');

  // Show auto-dismissing toast
  const showToast = useCallback((toastData) => {
    setToast(toastData);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Unlocks achievement and notifies user
  const unlockAchievement = useCallback((achievementId) => {
    const isNew = saveUnlockedAchievement(achievementId);
    if (isNew) {
      setUnlockedAchievements(getUnlockedAchievements());
      const ach = ACHIEVEMENTS.find(a => a.id === achievementId);
      if (ach) {
        showToast({
          type: 'achievement',
          title: `Badge Unlocked: ${ach.title}!`,
          message: ach.description
        });
      }
    }
  }, [showToast]);

  // Parse URL on mount for incoming friend challenges
  useEffect(() => {
    const params = parseChallengeParams();
    if (params) {
      setChallengeData(params);
      unlockAchievement('challenge_accepted');
      showToast({
        type: 'info',
        title: 'Friend Challenge Accepted!',
        message: `${params.friendName} challenged you to beat ${params.targetScore} pts!`
      });
    }
  }, [unlockAchievement, showToast]);

  // Monitor quiz completion to transition to Results, record history, and award achievements
  useEffect(() => {
    if (quizState.isCompleted && view === 'quiz') {
      setView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Save to local device history
      recordQuestAttempt({
        score: quizState.scorecard.totalPoints,
        maxScore: quizState.scorecard.maxScore,
        accuracyPercent: quizState.scorecard.accuracyPercent,
        archetypeTitle: quizState.scorecard.archetype.title,
        mode: quizState.questMode
      });

      // Award first quest badge
      unlockAchievement('first_quest');

      // Award perfect score badge if max possible score achieved
      if (quizState.scorecard.totalPoints >= quizState.scorecard.maxScore) {
        unlockAchievement('perfect_five');
      }
    }
  }, [quizState.isCompleted, quizState.scorecard, quizState.questMode, view, unlockAchievement]);

  // Handlers
  const handleStartQuest = (mode = 'classic') => {
    quizState.restartQuiz(mode);
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMode = (modeId) => {
    handleStartQuest(modeId);
  };

  const handleExitToHome = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayQuest = () => {
    quizState.restartQuiz(quizState.questMode);
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreLibraryFromResults = () => {
    setView('landing');
    setTimeout(() => {
      const el = document.getElementById('learning-library');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col font-body selection:bg-brand-lime selection:text-brand-bg relative">
      
      {/* Background ambient grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Toast Alert Region */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Main App Bar (shown on landing page) */}
      {view === 'landing' && (
        <Navbar 
          onStartQuest={() => handleStartQuest('classic')}
          onOpenAchievements={() => setIsAchievementsModalOpen(true)}
          onOpenHistory={() => setIsHistoryModalOpen(true)}
          onOpenModes={() => setIsModesModalOpen(true)}
          unlockedCount={unlockedAchievements.length}
        />
      )}

      {/* App Views */}
      <main className="flex-1 relative z-10">
        {view === 'landing' && (
          <HomePage 
            onStartQuest={() => handleStartQuest('classic')}
            onOpenModes={() => setIsModesModalOpen(true)}
            challengeData={challengeData}
            onUnlockAchievement={unlockAchievement}
            showToast={showToast}
          />
        )}

        {view === 'quiz' && (
          <QuizEngine 
            quizState={quizState}
            challengeData={challengeData}
            onExit={handleExitToHome}
          />
        )}

        {view === 'results' && (
          <ResultsScreen 
            scorecard={quizState.scorecard}
            challengeData={challengeData}
            onReplay={handleReplayQuest}
            onExploreLibrary={handleExploreLibraryFromResults}
            onOpenInviteModal={() => setIsInviteModalOpen(true)}
            showToast={showToast}
          />
        )}
      </main>

      {/* Achievements Modal */}
      <AchievementsModal 
        isOpen={isAchievementsModalOpen}
        onClose={() => setIsAchievementsModalOpen(false)}
        unlockedIds={unlockedAchievements}
      />

      {/* Challenge Invite Modal */}
      <ChallengeInviteModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        score={quizState.scorecard?.totalPoints || 500}
        archetype={quizState.scorecard?.archetype?.title || 'Metabolic Explorer'}
        showToast={showToast}
      />

      {/* Quest Modes Selector Modal */}
      <QuestModeModal
        isOpen={isModesModalOpen}
        onClose={() => setIsModesModalOpen(false)}
        onSelectMode={handleSelectMode}
      />

      {/* Quest History & Activity Modal */}
      <QuestHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        onLaunchQuest={() => handleStartQuest('classic')}
      />

    </div>
  );
}
