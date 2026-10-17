import React from 'react';
import { Hero } from '../components/Hero';
import { FeatureHighlights } from '../components/FeatureHighlights';
import { MetabolicSimulator } from '../components/MetabolicSimulator';
import { CGMComparisonLab } from '../components/CGMComparisonLab';
import { ChallengePreview } from '../components/ChallengePreview';
import { MetabolicMythBusters } from '../components/MetabolicMythBusters';
import { HowItWorks } from '../components/HowItWorks';
import { MetabolicScoreAudit } from '../components/MetabolicScoreAudit';
import { MetabolicActionPlan } from '../components/MetabolicActionPlan';
import { DailyQuest } from '../components/DailyQuest';
import { LearningLibrary } from '../components/LearningLibrary';
import { SteerClubConversion } from '../components/SteerClubConversion';
import { HealthDisclaimer } from '../components/HealthDisclaimer';
import { Footer } from '../components/Footer';

export function HomePage({
  onStartQuest,
  onOpenModes,
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

      {/* Flagship Interactive Metabolic Simulator */}
      <MetabolicSimulator />

      {/* Side-by-Side CGM Food Matrix Lab */}
      <CGMComparisonLab />

      <ChallengePreview 
        onStartFullQuest={onStartQuest}
      />

      {/* Interactive Myth vs Fact Flip Cards */}
      <MetabolicMythBusters />

      <HowItWorks />

      {/* 60-Second Habit Resilience Audit */}
      <MetabolicScoreAudit 
        onStartQuest={onStartQuest}
      />

      {/* 7-Day Metabolic Reset & Protocol Guide */}
      <MetabolicActionPlan 
        showToast={showToast}
      />

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
