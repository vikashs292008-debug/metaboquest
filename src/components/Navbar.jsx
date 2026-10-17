import React, { useState } from 'react';
import { Sparkles, Trophy, Menu, X, ArrowRight, Activity } from 'lucide-react';

export function Navbar({ onStartQuest, onOpenAchievements, unlockedCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-brand-bg/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Wordmark & Animated Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded-lg p-1"
          aria-label="MetaboQuest Home"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-lime/20 to-brand-violet/20 border border-brand-lime/40 flex items-center justify-center group-hover:border-brand-lime transition-all">
            <Activity className="w-5 h-5 text-brand-lime transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand-lime animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-tight text-brand-text flex items-center gap-1">
              Metabo<span className="text-brand-lime">Quest</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase text-brand-muted -mt-1 font-semibold">
              90-Sec Challenge
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted" aria-label="Main Navigation">
          <button 
            onClick={() => scrollTo('how-it-works')}
            className="hover:text-brand-lime transition-colors"
          >
            How it works
          </button>
          <button 
            onClick={() => scrollTo('preview-section')}
            className="hover:text-brand-lime transition-colors"
          >
            Preview
          </button>
          <button 
            onClick={() => scrollTo('daily-quest-section')}
            className="hover:text-brand-lime transition-colors flex items-center gap-1.5"
          >
            <span>Daily Quest</span>
            <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold bg-brand-lime/10 text-brand-lime rounded-full border border-brand-lime/30">
              New
            </span>
          </button>
          <button 
            onClick={() => scrollTo('learning-library')}
            className="hover:text-brand-lime transition-colors"
          >
            Science Library
          </button>
        </nav>

        {/* Right actions: Achievements button & Primary CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenAchievements}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-brand-surface hover:bg-white/5 hover:border-white/20 text-xs font-semibold text-brand-text transition-all"
            title="View unlocked badges"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Badges</span>
            {unlockedCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-brand-lime text-brand-bg text-[11px] font-bold flex items-center justify-center">
                {unlockedCount}
              </span>
            )}
          </button>

          <button
            onClick={onStartQuest}
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime"
          >
            <span>Start your quest</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenAchievements}
            aria-label="View badges"
            className="p-2 rounded-lg border border-white/10 bg-brand-surface text-amber-400"
          >
            <Trophy className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-lg text-brand-muted hover:text-brand-text hover:bg-white/5"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-brand-surface/98 backdrop-blur-xl px-4 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-brand-text">
            <button 
              onClick={() => scrollTo('how-it-works')}
              className="text-left py-1 text-brand-muted hover:text-brand-lime"
            >
              How it works
            </button>
            <button 
              onClick={() => scrollTo('preview-section')}
              className="text-left py-1 text-brand-muted hover:text-brand-lime"
            >
              Interactive Preview
            </button>
            <button 
              onClick={() => scrollTo('daily-quest-section')}
              className="text-left py-1 text-brand-muted hover:text-brand-lime flex items-center justify-between"
            >
              <span>Daily Quest</span>
              <span className="px-2 py-0.5 text-xs font-bold bg-brand-lime/10 text-brand-lime rounded-full">
                Active
              </span>
            </button>
            <button 
              onClick={() => scrollTo('learning-library')}
              className="text-left py-1 text-brand-muted hover:text-brand-lime"
            >
              Science Library
            </button>
          </nav>

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartQuest();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-base shadow-glow-lime"
            >
              <span>Start your quest</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
