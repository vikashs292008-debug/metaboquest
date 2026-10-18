import React, { useState } from 'react';
import { Share2, Download, Copy, Check, Swords, User, Sparkles } from 'lucide-react';
import { generateChallengeUrl, shareQuestResult, downloadResultImage } from '../../utils/sharing';
import { recordLocalMetric } from '../../utils/persistence';

export function SharePanel({ 
  scorecard, 
  challengeData, 
  cardRef, 
  onOpenInviteModal, 
  displayName,
  onUpdateDisplayName,
  showToast 
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const challengeUrl = generateChallengeUrl(scorecard.totalPoints, scorecard.archetype.title, displayName);

  // Download high-res genuine PNG
  const handleDownloadImage = async () => {
    setIsDownloading(true);
    recordLocalMetric('shareClicks');

    try {
      const filename = `metaboquest-${scorecard.archetype.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      const fallbackData = {
        score: scorecard.totalPoints,
        maxScore: scorecard.maxScore || 500,
        correctCount: scorecard.correctCount,
        totalQuestions: scorecard.totalQuestions || 5,
        archetypeTitle: scorecard.archetype.title,
        archetypeTagline: scorecard.archetype.tagline,
        playerName: displayName,
        strengthTopic: scorecard.personalization?.strengthTopic,
        takeaway: scorecard.personalization?.relevantFact
      };

      const success = await downloadResultImage(cardRef.current, filename, fallbackData);
      
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
            title: 'Image Export Notice',
            message: 'You can copy your challenge link directly to share with friends!'
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Quick Copy Link
  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
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

  // Native Web Share
  const handleNativeShare = async () => {
    recordLocalMetric('shareClicks');
    const res = await shareQuestResult({
      score: scorecard.totalPoints,
      archetypeTitle: scorecard.archetype.title,
      shareUrl: challengeUrl,
      displayName
    });
    if (showToast) {
      showToast({
        type: res.success ? 'success' : 'info',
        message: res.message
      });
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-white/10 space-y-6">
      
      {/* Optional Display Name Input */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="text-center sm:text-left">
          <label htmlFor="explorer-name" className="block text-xs font-bold uppercase tracking-wider text-brand-lime mb-0.5">
            Card Customization (Optional)
          </label>
          <p className="text-xs text-brand-muted">
            Add your nickname or handle to appear on your downloadable result card.
          </p>
        </div>

        <div className="w-full sm:w-auto relative">
          <input
            id="explorer-name"
            type="text"
            placeholder="Your name or handle"
            value={displayName}
            onChange={(e) => onUpdateDisplayName && onUpdateDisplayName(e.target.value)}
            maxLength={24}
            className="w-full sm:w-60 px-3.5 py-2 rounded-xl bg-brand-surface border border-white/15 text-xs text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-lime"
          />
        </div>
      </div>

      {/* Main Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Download Genuine PNG */}
        <button
          onClick={handleDownloadImage}
          disabled={isDownloading}
          className="p-4 rounded-2xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? 'Generating PNG...' : 'Download My Result Card'}</span>
        </button>

        {/* Challenge a friend modal */}
        <button
          onClick={onOpenInviteModal}
          className="p-4 rounded-2xl bg-brand-violet text-brand-bg font-display font-bold text-sm hover:bg-[#bca6fb] active:scale-95 transition-all shadow-glow-violet flex items-center justify-center gap-2"
        >
          <Swords className="w-4 h-4" />
          <span>Challenge a Friend</span>
        </button>

        {/* Native Web Share or Copy Link */}
        <button
          onClick={handleNativeShare}
          className="p-4 rounded-2xl bg-brand-surface border border-white/15 hover:border-white/30 text-brand-text font-display font-semibold text-sm hover:bg-white/5 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4 text-brand-lime" />
          <span>Share Quest Link</span>
        </button>
      </div>

      {/* Copy link fallback bar */}
      <div className="p-3.5 rounded-xl bg-brand-surface/80 border border-white/10 flex items-center justify-between gap-3 text-xs">
        <div className="truncate text-brand-muted font-mono">
          {challengeUrl}
        </div>
        <button
          onClick={handleCopyLink}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-brand-text font-semibold flex items-center gap-1.5 flex-shrink-0 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

    </div>
  );
}
