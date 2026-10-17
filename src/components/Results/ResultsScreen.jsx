import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RotateCcw, BookOpen, Heart, Sparkles, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { ResultCard } from './ResultCard';
import { ArchetypeBadge } from './ArchetypeBadge';
import { SharePanel } from './SharePanel';
import { STEER_CLUB_URL } from '../../utils/sharing';
import { recordLocalMetric } from '../../utils/persistence';

export function ResultsScreen({
  scorecard,
  challengeData,
  onReplay,
  onExploreLibrary,
  onOpenInviteModal,
  showToast
}) {
  const cardRef = useRef(null);
  const [activeTab, setActiveTab] = useState('card'); // 'card' or 'breakdown'

  // Trigger celebration confetti if score is high (400+)
  useEffect(() => {
    if (scorecard.totalPoints >= 400) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#C6FF65', '#A78BFA', '#38BDF8', '#F59E0B']
        });
      } catch (e) {
        // Safe fail
      }
    }
  }, [scorecard.totalPoints]);

  const handleCtaClick = () => {
    recordLocalMetric('ctaClicks');
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      
      {/* Top Completion Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-xs font-bold text-brand-lime uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>QUEST COMPLETE</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brand-text">
          Your Metabolic Profile
        </h1>

        <p className="text-sm sm:text-base text-brand-muted max-w-md mx-auto">
          Here is how your metabolic health literacy stacks up, along with tailored biological takeaways.
        </p>

        <div className="pt-2">
          <ArchetypeBadge archetype={scorecard.archetype} />
        </div>
      </motion.div>

      {/* Main Visual Result Card for Social Sharing */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
      >
        <ResultCard
          ref={cardRef}
          scorecard={scorecard}
          challengeTarget={challengeData?.targetScore}
        />
      </motion.div>

      {/* Share Actions Engine */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <SharePanel
          scorecard={scorecard}
          challengeData={challengeData}
          cardRef={cardRef}
          onOpenInviteModal={onOpenInviteModal}
          showToast={showToast}
        />
      </motion.div>

      {/* Tailored Educational Takeaway & Topic Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-white/10 space-y-6">
        
        {/* Tailored Insight */}
        <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-brand-lime/30 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-lime" />
            <h3 className="font-display font-bold text-sm text-brand-lime uppercase tracking-wider">
              Personalized Knowledge Takeaway
            </h3>
          </div>
          <p className="text-sm text-brand-text/90 leading-relaxed">
            {scorecard.tailoredInsight}
          </p>
        </div>

        {/* Topic Breakdown Badges */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-3">
            Topic Performance Breakdown
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(scorecard.topicBreakdown).map(([topic, stats]) => (
              <div 
                key={topic} 
                className="p-3 rounded-xl bg-brand-surface border border-white/5 flex items-center justify-between text-xs"
              >
                <span className="text-brand-text font-medium truncate max-w-[200px]">{topic}</span>
                <span className="font-mono font-bold text-brand-lime">
                  {stats.correct} / {stats.total} Correct
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps: Replay & Explore Science */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onReplay}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-surface border border-white/15 hover:border-white/30 text-brand-text font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/5"
          >
            <RotateCcw className="w-4 h-4 text-brand-lime" />
            <span>Play Fresh 5 Questions</span>
          </button>

          <button
            onClick={onExploreLibrary}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-surface border border-white/15 hover:border-white/30 text-brand-text font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/5"
          >
            <BookOpen className="w-4 h-4 text-brand-violet" />
            <span>Explore Science Library</span>
          </button>
        </div>

      </div>

      {/* Steer Club Next Step Conversion Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-surface to-brand-card border border-brand-lime/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-brand-lime tracking-wider">
            <Heart className="w-3.5 h-3.5" />
            <span>Steer Club Partner Resources</span>
          </span>
          <h3 className="font-display font-bold text-xl text-brand-text">
            Ready to explore your next metabolic health step?
          </h3>
          <p className="text-xs text-brand-muted max-w-lg leading-relaxed">
            MetaboQuest is an educational quest. For verified guidance and personalized metabolic health care pathways, explore Steer Club.
          </p>
        </div>

        <a
          href={STEER_CLUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCtaClick}
          className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <span>Explore Steer Club</span>
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}
