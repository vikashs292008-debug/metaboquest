import React, { useState } from 'react';
import { Swords, X, Copy, Check, Share2, Sparkles } from 'lucide-react';
import { generateChallengeUrl, shareQuestResult } from '../utils/sharing';
import { recordLocalMetric } from '../utils/persistence';

export function ChallengeInviteModal({ isOpen, onClose, score = 500, archetype = 'Metabolic Explorer', showToast }) {
  const [nickname, setNickname] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const challengeUrl = generateChallengeUrl(score, archetype, nickname);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(challengeUrl);
      } else {
        const input = document.createElement('input');
        input.value = challengeUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      recordLocalMetric('linkCopies');
      if (showToast) {
        showToast({
          type: 'success',
          title: 'Link Copied!',
          message: 'Share this link with a friend to challenge their metabolic knowledge.'
        });
      }
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNativeShare = async () => {
    recordLocalMetric('shareClicks');
    const res = await shareQuestResult({
      score,
      archetypeTitle: archetype,
      shareUrl: challengeUrl
    });
    if (showToast) {
      showToast({
        type: res.success ? 'success' : 'info',
        message: res.message
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-bg/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="challenge-invite-title"
    >
      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-brand-surface border border-brand-violet/30 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center text-brand-violet">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <h2 id="challenge-invite-title" className="font-display font-bold text-lg text-brand-text">
                Challenge a Friend
              </h2>
              <p className="text-xs text-brand-muted">
                See if they can beat your {score} pts!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-brand-muted hover:text-brand-text hover:bg-white/5"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Custom nickname input */}
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="challenger-name" className="block text-xs font-semibold text-brand-text mb-1">
              Your Name or Nickname (Optional)
            </label>
            <input
              id="challenger-name"
              type="text"
              maxLength={30}
              placeholder="e.g. Alex"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-brand-card border border-white/10 text-brand-text placeholder-brand-muted/50 text-sm focus:border-brand-lime focus:outline-none"
            />
          </div>

          {/* Generated Link Display */}
          <div>
            <label className="block text-xs font-semibold text-brand-text mb-1">
              Custom Challenge URL
            </label>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-brand-card border border-white/10 text-xs font-mono text-brand-muted overflow-hidden">
              <span className="truncate flex-1 select-all">{challengeUrl}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleCopy}
            className="w-full py-3 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy Challenge Link'}</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="w-full py-3 rounded-xl bg-brand-surface border border-white/15 text-brand-text font-display font-semibold text-sm hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4 text-brand-violet" />
            <span>Share via Apps</span>
          </button>
        </div>

      </div>
    </div>
  );
}
