import React, { useState } from 'react';
import { Share2, Download, Copy, Check, Swords, Trophy, Sparkles } from 'lucide-react';
import { generateChallengeUrl, shareQuestResult, downloadResultImage } from '../../utils/sharing';
import { recordLocalMetric } from '../../utils/persistence';

export function SharePanel({ 
  scorecard, 
  challengeData, 
  cardRef, 
  onOpenInviteModal, 
  showToast 
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const challengeUrl = generateChallengeUrl(scorecard.totalPoints, scorecard.archetype.title);

  // Download high-res PNG
  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    recordLocalMetric('shareClicks');

    try {
      const success = await downloadResultImage(cardRef.current, `metaboquest-${scorecard.archetype.title.toLowerCase().replace(/\s+/g, '-')}.png`);
      if (success) {
        if (showToast) {
          showToast({
            type: 'success',
            title: 'Image Downloaded!',
            message: 'Your high-res quest scorecard PNG is ready to share.'
          });
        }
      } else {
        if (showToast) {
          showToast({
            type: 'info',
            message: 'Image export fallback: You can copy your challenge link directly!'
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Quick Copy
  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(challengeUrl);
      } else {
        const ta = document.createElement('textarea');
        ta.value = challengeUrl;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      recordLocalMetric('linkCopies');
      if (showToast) {
        showToast({
          type: 'success',
          title: 'Link Copied!',
          message: 'Friend challenge link copied to clipboard.'
        });
      }
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  // Native share
  const handleNativeShare = async () => {
    recordLocalMetric('shareClicks');
    const res = await shareQuestResult({
      score: scorecard.totalPoints,
      archetypeTitle: scorecard.archetype.title,
      shareUrl: challengeUrl
    });
    if (showToast) {
      showToast({
        type: res.success ? 'success' : 'info',
        message: res.message
      });
    }
  };

  // Friend comparison banner (if this run was a friend challenge)
  const renderComparison = () => {
    if (!challengeData) return null;

    const diff = scorecard.totalPoints - challengeData.targetScore;
    let badgeText = '';
    let badgeClass = '';

    if (diff > 0) {
      badgeText = `Victory! You beat ${challengeData.friendName} by ${diff} points!`;
      badgeClass = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';
    } else if (diff === 0) {
      badgeText = `An exact tie with ${challengeData.friendName}! Both scored ${scorecard.totalPoints} pts!`;
      badgeClass = 'bg-amber-500/15 border-amber-500/40 text-amber-300';
    } else {
      badgeText = `${challengeData.friendName} still holds the lead by ${Math.abs(diff)} pts. Challenge them again or challenge another friend!`;
      badgeClass = 'bg-brand-violet/15 border-brand-violet/40 text-brand-violet';
    }

    return (
      <div className={`p-4 rounded-2xl border mb-6 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 ${badgeClass}`}>
        <Swords className="w-4 h-4 flex-shrink-0" />
        <span>{badgeText}</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderComparison()}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Copy link */}
        <button
          onClick={handleCopyLink}
          className="p-3.5 rounded-xl bg-brand-surface border border-white/10 hover:border-white/20 text-brand-text font-display font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/5"
        >
          {copied ? <Check className="w-4 h-4 text-brand-lime" /> : <Copy className="w-4 h-4 text-brand-muted" />}
          <span>{copied ? 'Link Copied!' : 'Copy Challenge Link'}</span>
        </button>

        {/* Download PNG */}
        <button
          onClick={handleDownloadImage}
          disabled={isDownloading}
          className="p-3.5 rounded-xl bg-brand-surface border border-white/10 hover:border-white/20 text-brand-text font-display font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/5 disabled:opacity-50"
        >
          <Download className="w-4 h-4 text-brand-lime" />
          <span>{isDownloading ? 'Generating PNG...' : 'Download Card PNG'}</span>
        </button>

        {/* Challenge Friend / Native Share */}
        <button
          onClick={onOpenInviteModal}
          className="p-3.5 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-xs sm:text-sm hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime flex items-center justify-center gap-2"
        >
          <Swords className="w-4 h-4" />
          <span>Challenge a Friend</span>
        </button>
      </div>
    </div>
  );
}
