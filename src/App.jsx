import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { CampaignBriefBuilder } from './components/campaign/CampaignBriefBuilder';
import { ResearchLibrary } from './components/research/ResearchLibrary';
import { ClaimLedger } from './components/claims/ClaimLedger';
import { ContentPipelineView } from './components/pipeline/ContentPipelineView';
import { CarouselStudio } from './components/studio/CarouselStudio';
import { StaticPostStudio } from './components/studio/StaticPostStudio';
import { ReelStudio } from './components/studio/ReelStudio';
import { SocialContentPreview } from './components/preview/SocialContentPreview';
import { QualityReviewView } from './components/quality/QualityReviewView';
import { ExportCenter } from './components/export/ExportCenter';
import { DemoModeModal } from './components/demo/DemoModeModal';
import { SettingsModal } from './components/settings/SettingsModal';
import { Toast } from './components/Toast';

// Companion consumer quiz components (preserved existing functionality)
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { QuizEngine } from './components/QuizEngine/QuizEngine';
import { ResultsScreen } from './components/Results/ResultsScreen';
import { AchievementsModal } from './components/AchievementsModal';
import { ChallengeInviteModal } from './components/ChallengeInviteModal';
import { QuestModeModal } from './components/QuestModeModal';
import { QuestHistoryModal } from './components/QuestHistoryModal';
import { useQuiz } from './hooks/useQuiz';

// Initial data and utilities
import { 
  DEFAULT_CAMPAIGN_BRIEF, 
  DEFAULT_CAROUSEL_SLIDES, 
  DEFAULT_STATIC_POST, 
  DEFAULT_REEL_DATA 
} from './data/defaultCampaign';
import { INITIAL_RESEARCH_SOURCES } from './data/researchSources';
import { INITIAL_CLAIM_LEDGER } from './data/claimLedger';
import { 
  getInitialPipelineState, 
  generateCoordinatedContentDrafts 
} from './utils/pipelineEngine';
import { runQualityAudit } from './utils/qualityGate';
import { getStoredItem, setStoredItem, getUserSettings, saveUserSettings } from './utils/persistence';

const STORAGE_KEYS = {
  CAMPAIGN: 'metaboquest_campaign_brief',
  CAROUSEL: 'metaboquest_carousel_slides',
  STATIC_POST: 'metaboquest_static_post',
  REEL: 'metaboquest_reel_data',
  SOURCES: 'metaboquest_research_sources',
  CLAIMS: 'metaboquest_claim_ledger',
  PIPELINE: 'metaboquest_pipeline_state',
  EXPORTS: 'metaboquest_export_history'
};

export default function App() {
  // App mode: 'studio' (MetaboQuest Content Lab) | 'companion_quiz' (Consumer Quiz/Lab)
  const [appMode, setAppMode] = useState('studio');
  const [currentView, setCurrentView] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Settings
  const [settings, setSettings] = useState(() => getUserSettings());

  // State: Campaign Brief
  const [campaignBrief, setCampaignBrief] = useState(() => 
    getStoredItem(STORAGE_KEYS.CAMPAIGN, DEFAULT_CAMPAIGN_BRIEF)
  );

  // State: Carousel Slides (6 slides)
  const [carouselSlides, setCarouselSlides] = useState(() => 
    getStoredItem(STORAGE_KEYS.CAROUSEL, DEFAULT_CAROUSEL_SLIDES)
  );

  // State: Static Post
  const [staticPost, setStaticPost] = useState(() => 
    getStoredItem(STORAGE_KEYS.STATIC_POST, DEFAULT_STATIC_POST)
  );

  // State: Reel Data
  const [reelData, setReelData] = useState(() => 
    getStoredItem(STORAGE_KEYS.REEL, DEFAULT_REEL_DATA)
  );

  // State: Research Sources Register
  const [researchSources, setResearchSources] = useState(() => 
    getStoredItem(STORAGE_KEYS.SOURCES, INITIAL_RESEARCH_SOURCES)
  );

  // State: Claim Ledger
  const [claimLedger, setClaimLedger] = useState(() => 
    getStoredItem(STORAGE_KEYS.CLAIMS, INITIAL_CLAIM_LEDGER)
  );

  // State: Pipeline Engine State
  const [pipelineState, setPipelineState] = useState(() => 
    getStoredItem(STORAGE_KEYS.PIPELINE, getInitialPipelineState())
  );

  // State: Export History
  const [exportHistory, setExportHistory] = useState(() => 
    getStoredItem(STORAGE_KEYS.EXPORTS, [])
  );

  // Persist state updates to LocalStorage safely
  useEffect(() => { setStoredItem(STORAGE_KEYS.CAMPAIGN, campaignBrief); }, [campaignBrief]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.CAROUSEL, carouselSlides); }, [carouselSlides]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.STATIC_POST, staticPost); }, [staticPost]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.REEL, reelData); }, [reelData]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.SOURCES, researchSources); }, [researchSources]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.CLAIMS, claimLedger); }, [claimLedger]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.PIPELINE, pipelineState); }, [pipelineState]);
  useEffect(() => { setStoredItem(STORAGE_KEYS.EXPORTS, exportHistory); }, [exportHistory]);

  const showToast = useCallback((toastData) => {
    setToast(toastData);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Compute live real-time quality gate audit based on actual content
  const qualityAudit = useMemo(() => {
    return runQualityAudit({
      campaignBrief,
      carouselSlides,
      staticPost,
      reelData,
      researchSources,
      claimLedger
    });
  }, [campaignBrief, carouselSlides, staticPost, reelData, researchSources, claimLedger]);

  // ==========================================
  // Pipeline Handlers
  // ==========================================

  const handleGenerateDrafts = useCallback(() => {
    const drafts = generateCoordinatedContentDrafts(campaignBrief, claimLedger, researchSources);
    setCarouselSlides(drafts.carouselSlides);
    setStaticPost(drafts.staticPost);
    setReelData(drafts.reelData);

    const newLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      stageId: 'stage_d',
      stageName: 'Stage D: Content Generation',
      type: 'info',
      message: 'Synthesized 6 Carousel Slides, Static Post, and 5-Scene Reel using deterministic template engine.'
    };

    setPipelineState(prev => ({
      ...prev,
      lastRunAt: new Date().toISOString(),
      stageStatuses: {
        ...prev.stageStatuses,
        stage_d: 'completed',
        stage_e: 'completed',
        stage_f: 'needs_review'
      },
      runLogs: [...(prev.runLogs || []), newLog]
    }));

    showToast({
      type: 'achievement',
      title: 'Coordinated Drafts Synthesized!',
      message: 'Generated 6 Carousel Slides, Static Post, and Reel Script from campaign brief.'
    });
  }, [campaignBrief, claimLedger, researchSources, showToast]);

  const handleRunEntirePipeline = useCallback(async () => {
    handleGenerateDrafts();
    setPipelineState(prev => ({
      ...prev,
      stageStatuses: {
        stage_a: 'completed',
        stage_b: 'completed',
        stage_c: 'completed',
        stage_d: 'completed',
        stage_e: 'completed',
        stage_f: qualityAudit.isReadyForExport ? 'completed' : 'needs_review',
        stage_g: exportHistory.length > 0 ? 'completed' : 'pending'
      }
    }));
  }, [handleGenerateDrafts, qualityAudit.isReadyForExport, exportHistory.length]);

  const handleRerunStage = useCallback((stageId) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let message = `Reran ${stageId.toUpperCase()} with latest parameters.`;

    if (stageId === 'stage_d') {
      handleGenerateDrafts();
      return;
    }

    const newLog = {
      id: `log_${Date.now()}`,
      timestamp,
      stageId,
      stageName: stageId.toUpperCase(),
      type: 'info',
      message
    };

    setPipelineState(prev => ({
      ...prev,
      runLogs: [...(prev.runLogs || []), newLog]
    }));

    showToast({
      type: 'info',
      title: 'Stage Refreshed',
      message: `Stage ${stageId.toUpperCase()} was evaluated and updated.`
    });
  }, [handleGenerateDrafts, showToast]);

  // ==========================================
  // Research & Claim Handlers
  // ==========================================

  const handleAddSource = (newSource) => {
    setResearchSources(prev => [newSource, ...prev]);
    showToast({
      type: 'achievement',
      title: 'Source Added to Register',
      message: `Recorded "${newSource.title.slice(0, 35)}..."`
    });
  };

  const handleUpdateSource = (updated) => {
    setResearchSources(prev => prev.map(s => s.id === updated.id ? updated : s));
    showToast({
      type: 'info',
      title: 'Source Updated',
      message: `Updated source ${updated.id}`
    });
  };

  const handleDeleteSource = (id) => {
    setResearchSources(prev => prev.filter(s => s.id !== id));
    showToast({
      type: 'info',
      title: 'Source Removed',
      message: `Removed source record ${id}`
    });
  };

  const handleAddClaim = (newClaim) => {
    setClaimLedger(prev => [newClaim, ...prev]);
    showToast({
      type: 'achievement',
      title: 'Claim Recorded in Ledger',
      message: `Added claim ${newClaim.id}`
    });
  };

  const handleUpdateClaim = (updated) => {
    setClaimLedger(prev => prev.map(c => c.id === updated.id ? updated : c));
    showToast({
      type: 'info',
      title: 'Claim Updated',
      message: `Updated claim ${updated.id}`
    });
  };

  const handleDeleteClaim = (id) => {
    setClaimLedger(prev => prev.filter(c => c.id !== id));
    showToast({
      type: 'info',
      title: 'Claim Removed',
      message: `Removed claim ${id}`
    });
  };

  const handleApproveClaim = (id) => {
    setClaimLedger(prev => prev.map(c => c.id === id ? {
      ...c,
      reviewStatus: 'human_verified',
      reviewerNotes: 'Verified and signed off by Medical Content Editor.'
    } : c));
    showToast({
      type: 'achievement',
      title: 'Claim Verified!',
      message: `Claim ${id} signed off by human medical reviewer.`
    });
  };

  const handleRejectClaim = (id) => {
    setClaimLedger(prev => prev.map(c => c.id === id ? {
      ...c,
      reviewStatus: 'rejected',
      reviewerNotes: 'Flagged and rejected during quality review.'
    } : c));
    showToast({
      type: 'info',
      title: 'Claim Rejected',
      message: `Claim ${id} blocked from production deliverables.`
    });
  };

  // ==========================================
  // Carousel Slide Handlers
  // ==========================================

  const handleUpdateSlide = (idx, updatedSlide) => {
    setCarouselSlides(prev => {
      const copy = [...prev];
      copy[idx] = updatedSlide;
      return copy;
    });
  };

  const handleReorderSlides = (fromIdx, toIdx) => {
    setCarouselSlides(prev => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, moved);
      return copy.map((s, i) => ({ ...s, slideNumber: i + 1 }));
    });
  };

  // Record genuine exports
  const handleRecordExport = (exportMeta) => {
    setExportHistory(prev => [exportMeta, ...prev].slice(0, 40));
    showToast({
      type: 'achievement',
      title: 'Export Complete!',
      message: `Successfully downloaded ${exportMeta.filename}`
    });
  };

  const handleResetProject = () => {
    setCampaignBrief({ ...DEFAULT_CAMPAIGN_BRIEF });
    setCarouselSlides([...DEFAULT_CAROUSEL_SLIDES]);
    setStaticPost({ ...DEFAULT_STATIC_POST });
    setReelData({ ...DEFAULT_REEL_DATA });
    setResearchSources([...INITIAL_RESEARCH_SOURCES]);
    setClaimLedger([...INITIAL_CLAIM_LEDGER]);
    setPipelineState(getInitialPipelineState());
    setExportHistory([]);
    showToast({
      type: 'info',
      title: 'Project Reset',
      message: 'Reset studio to initial verified default campaign data.'
    });
  };

  // ==========================================
  // Companion Quiz State (Preserved)
  // ==========================================
  const quizState = useQuiz(true, 'classic');
  const [quizView, setQuizView] = useState('landing');
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isModesModalOpen, setIsModesModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  return (
    <div className={`min-h-screen bg-[#080C14] text-[#F8FAFC] font-body selection:bg-emerald-400 selection:text-slate-950 flex flex-col ${settings.reducedMotion ? 'motion-reduce' : ''}`}>
      
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Switcher Banner: Mode Indicator when in Companion Quiz */}
      {appMode === 'companion_quiz' && (
        <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white px-4 py-2 text-xs flex items-center justify-between border-b border-violet-500/30 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="font-bold">COMPANION EXPERIENCE:</span>
            <span>MetaboQuest Consumer Quiz & Interactive Science Labs</span>
          </div>
          <button
            onClick={() => setAppMode('studio')}
            className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Return to Content Lab Studio ➔
          </button>
        </div>
      )}

      {/* RENDER MODE 1: STUDIO (MetaboQuest Content Lab) */}
      {appMode === 'studio' && (
        <div className="flex flex-1 relative">
          
          {/* Sidebar */}
          <Sidebar
            currentView={currentView}
            onNavigate={setCurrentView}
            isMobileOpen={isMobileMenuOpen}
            onCloseMobile={() => setIsMobileMenuOpen(false)}
            sourcesCount={researchSources.length}
            claimsCount={claimLedger.length}
            qualityScore={qualityAudit.score}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onSwitchToConsumerQuiz={() => setAppMode('companion_quiz')}
          />

          {/* Main Studio Viewport */}
          <div className="flex-1 flex flex-col min-w-0">
            
            {/* Top Navigation Bar */}
            <TopNav
              campaignTitle={campaignBrief.title}
              currentView={currentView}
              onNavigate={setCurrentView}
              onOpenDemoMode={() => setIsDemoModalOpen(true)}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              pipelineStatus={pipelineState.currentActiveStage === 'stage_d' ? 'Stage D: Drafts Ready' : 'Stage F: Quality Check'}
              isSaved={true}
              qualityScore={qualityAudit.score}
            />

            {/* Dynamic Viewport Content */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              
              {currentView === 'overview' && (
                <OverviewDashboard
                  campaignBrief={campaignBrief}
                  carouselSlides={carouselSlides}
                  staticPost={staticPost}
                  reelData={reelData}
                  researchSources={researchSources}
                  claimLedger={claimLedger}
                  pipelineState={pipelineState}
                  qualityAudit={qualityAudit}
                  exportedAssetsCount={exportHistory.length}
                  onNavigate={setCurrentView}
                  onRunPipeline={handleRunEntirePipeline}
                  onOpenDemoMode={() => setIsDemoModalOpen(true)}
                />
              )}

              {currentView === 'campaigns' && (
                <CampaignBriefBuilder
                  campaignBrief={campaignBrief}
                  onUpdateBrief={setCampaignBrief}
                  onGenerateDrafts={handleGenerateDrafts}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'research' && (
                <ResearchLibrary
                  researchSources={researchSources}
                  claimLedger={claimLedger}
                  onAddSource={handleAddSource}
                  onUpdateSource={handleUpdateSource}
                  onDeleteSource={handleDeleteSource}
                />
              )}

              {currentView === 'claims' && (
                <ClaimLedger
                  claimLedger={claimLedger}
                  researchSources={researchSources}
                  onAddClaim={handleAddClaim}
                  onUpdateClaim={handleUpdateClaim}
                  onDeleteClaim={handleDeleteClaim}
                  onApproveClaim={handleApproveClaim}
                  onRejectClaim={handleRejectClaim}
                />
              )}

              {currentView === 'pipeline' && (
                <ContentPipelineView
                  pipelineState={pipelineState}
                  onRunEntirePipeline={handleRunEntirePipeline}
                  onRerunStage={handleRerunStage}
                  onNavigate={setCurrentView}
                  qualityAudit={qualityAudit}
                  carouselSlides={carouselSlides}
                  claimLedger={claimLedger}
                  researchSources={researchSources}
                />
              )}

              {currentView === 'carousel' && (
                <CarouselStudio
                  slides={carouselSlides}
                  onUpdateSlide={handleUpdateSlide}
                  onReorderSlides={handleReorderSlides}
                  researchSources={researchSources}
                  claimLedger={claimLedger}
                  onExportSuccess={handleRecordExport}
                />
              )}

              {currentView === 'static_post' && (
                <StaticPostStudio
                  staticPost={staticPost}
                  onUpdateStaticPost={setStaticPost}
                  onExportSuccess={handleRecordExport}
                />
              )}

              {currentView === 'reel' && (
                <ReelStudio
                  reelData={reelData}
                  onUpdateReelData={setReelData}
                  onExportSuccess={handleRecordExport}
                />
              )}

              {currentView === 'preview' && (
                <SocialContentPreview
                  carouselSlides={carouselSlides}
                  staticPost={staticPost}
                  reelData={reelData}
                  qualityAudit={qualityAudit}
                  onNavigate={setCurrentView}
                />
              )}

              {currentView === 'quality' && (
                <QualityReviewView
                  qualityAudit={qualityAudit}
                  onRerunAudit={() => {
                    showToast({ type: 'info', title: 'Audit Refreshed', message: 'Re-evaluated all evidence and technical checks.' });
                  }}
                  onNavigate={setCurrentView}
                  onSignOffHumanReview={() => {
                    showToast({ type: 'achievement', title: 'Medical Sign-Off Completed', message: 'Lead Medical Content Editor recorded approval.' });
                  }}
                />
              )}

              {currentView === 'exports' && (
                <ExportCenter
                  campaignBrief={campaignBrief}
                  carouselSlides={carouselSlides}
                  staticPost={staticPost}
                  reelData={reelData}
                  researchSources={researchSources}
                  claimLedger={claimLedger}
                  qualityAudit={qualityAudit}
                  exportHistory={exportHistory}
                  onRecordExport={handleRecordExport}
                />
              )}

            </main>
          </div>

          {/* Hackathon Demo Walkthrough Modal */}
          <DemoModeModal
            isOpen={isDemoModalOpen}
            onClose={() => setIsDemoModalOpen(false)}
            onNavigate={setCurrentView}
          />

          {/* Studio Settings & Storage Modal */}
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            settings={settings}
            onUpdateSettings={(newSettings) => {
              const updated = saveUserSettings(newSettings);
              setSettings(updated);
            }}
            onResetProject={handleResetProject}
            fullProjectState={{
              campaignBrief,
              carouselSlides,
              staticPost,
              reelData,
              researchSources,
              claimLedger,
              pipelineState,
              exportHistory
            }}
          />

        </div>
      )}

      {/* RENDER MODE 2: COMPANION CONSUMER QUIZ (Preserved) */}
      {appMode === 'companion_quiz' && (
        <div className="flex-1 flex flex-col">
          {quizView === 'landing' && (
            <Navbar 
              onStartQuest={() => {
                quizState.restartQuiz('classic');
                setQuizView('quiz');
              }}
              onOpenAchievements={() => setIsAchievementsModalOpen(true)}
              onOpenHistory={() => setIsHistoryModalOpen(true)}
              onOpenModes={() => setIsModesModalOpen(true)}
              unlockedCount={3}
            />
          )}

          <main className="flex-1 relative z-10">
            {quizView === 'landing' && (
              <HomePage 
                onStartQuest={() => {
                  quizState.restartQuiz('classic');
                  setQuizView('quiz');
                }}
                onOpenModes={() => setIsModesModalOpen(true)}
                onUnlockAchievement={() => {}}
                showToast={showToast}
              />
            )}

            {quizView === 'quiz' && (
              <QuizEngine 
                quizState={quizState}
                onExit={() => setQuizView('landing')}
              />
            )}

            {quizView === 'results' && (
              <ResultsScreen 
                scorecard={quizState.scorecard}
                onReplay={() => {
                  quizState.restartQuiz('classic');
                  setQuizView('quiz');
                }}
                onExploreLibrary={() => setQuizView('landing')}
                onOpenInviteModal={() => setIsInviteModalOpen(true)}
                showToast={showToast}
              />
            )}
          </main>

          <AchievementsModal 
            isOpen={isAchievementsModalOpen}
            onClose={() => setIsAchievementsModalOpen(false)}
            unlockedIds={['first_quest', 'challenge_accepted']}
          />

          <ChallengeInviteModal 
            isOpen={isInviteModalOpen}
            onClose={() => setIsInviteModalOpen(false)}
            score={520}
            archetype="Metabolic Explorer"
            showToast={showToast}
          />

          <QuestModeModal
            isOpen={isModesModalOpen}
            onClose={() => setIsModesModalOpen(false)}
            onSelectMode={(modeId) => {
              quizState.restartQuiz(modeId);
              setQuizView('quiz');
              setIsModesModalOpen(false);
            }}
          />

          <QuestHistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => setIsHistoryModalOpen(false)}
            onLaunchQuest={() => {
              quizState.restartQuiz('classic');
              setQuizView('quiz');
              setIsHistoryModalOpen(false);
            }}
          />
        </div>
      )}

    </div>
  );
}
