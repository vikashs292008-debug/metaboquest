import React from 'react';
import { Hero } from '../components/Hero';
import { FeatureHighlights } from '../components/FeatureHighlights';
import { ChallengePreview } from '../components/ChallengePreview';
import { HowItWorks } from '../components/HowItWorks';
import { DailyQuest } from '../components/DailyQuest';
import { LearningLibrary } from '../components/LearningLibrary';
import { SteerClubConversion } from '../components/SteerClubConversion';
import { HealthDisclaimer } from '../components/HealthDisclaimer';
import { Footer } from '../components/Footer';

export function HomePage({
  onStartQuest,
  challengeData,
  onUnlockAchievement,
  showToast
}) {
  const scrollToLearning = () => {
    const el = document.getElementById('learning-library');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReadArticle = () => {
    if (onUnlockAchievement) {
      onUnlockAchievement('curious_mind');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Hero 
        onStartQuest={onStartQuest}
        onExploreScience={scrollToLearning}
        challengeData={challengeData}
      />

      <FeatureHighlights />

      <ChallengePreview 
        onStartFullQuest={onStartQuest}
      />

      <HowItWorks />

      <DailyQuest 
        onUnlockAchievement={onUnlockAchievement}
        showToast={showToast}
      />

      <LearningLibrary 
        onReadArticle={handleReadArticle}
      />

      <SteerClubConversion />

      <HealthDisclaimer />

      <Footer onStartQuest={onStartQuest} />
    </div>
  );
}
