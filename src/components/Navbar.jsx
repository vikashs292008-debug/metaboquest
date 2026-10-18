import React, { useState } from 'react';
import { Sparkles, Trophy, Menu, X, ArrowRight, Activity, Volume2, VolumeX, History, Zap, Sliders, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

export function Navbar({ 
  onStartQuest, 
  onOpenAchievements, 
  onOpenHistory, 
  onOpenModes,
  onOpenAbout,
  unlockedCount = 0 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(() => sound.isSoundEnabled());

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundActive(newState);
  };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-brand-bg/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Wordmark & Animated Cellular/Orbit Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded-lg p-1"
          aria-label="MetaboQuest Home"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-lime/20 via-teal-500/20 to-brand-violet/20 border border-brand-lime/40 flex items-center justify-center group-hover:border-brand-lime transition-all">
            <Activity className="w-5 h-5 text-brand-lime transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand-lime animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-tight text-brand-text flex items-center gap-1">
              Metabo<span className="text-brand-lime">Quest</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase text-brand-muted -mt-1 font-semibold">
              Metabolic Health
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-brand-muted" aria-label="Main Navigation">
          <button 
            onClick={() => scrollTo('learning-library')}
            className="hover:text-brand-lime transition-colors"
          >
            Explore the Science
          </button>
          <button 
            onClick={() => scrollTo('metabolic-simulator')}
            className="hover:text-brand-lime transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-brand-lime" />
            <span>Simulator</span>
          </button>
          <button 
            onClick={() => scrollTo('cgm-lab')}
            className="hover:text-brand-lime transition-colors"
          >
            CGM Lab
          </button>
          <button 
            onClick={() => scrollTo('mythbusters-section')}
            className="hover:text-brand-lime transition-colors"
          >
            Myth vs Fact
          </button>
          <button 
            onClick={onOpenAbout}
            className="hover:text-brand-lime transition-colors flex items-center gap-1"
          >
            <Shield className="w-3.5 h-3.5 text-brand-violet" />
            <span>About & Privacy</span>
          </button>
        </nav>

        {/* Right utility buttons: Sound, History, Badges, Modes, Play CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Sound Toggle (defaults to off) */}
          <button
            onClick={handleToggleSound}
            aria-label={soundActive ? 'Mute sound effects' : 'Enable sound effects'}
            className="p-2 rounded-lg border border-white/10 bg-brand-surface hover:bg-white/5 text-brand-muted hover:text-brand-text transition-colors"
            title={soundActive ? 'Mute sound effects' : 'Enable sound effects (Web Audio)'}
          >
            {soundActive ? <Volume2 className="w-4 h-4 text-brand-lime" /> : <VolumeX className="w-4 h-4 text-brand-muted" />}
          </button>

          {/* History */}
          <button
            onClick={onOpenHistory}
            className="p-2 rounded-lg border border-white/10 bg-brand-surface hover:bg-white/5 text-brand-muted hover:text-brand-text transition-colors"
            title="Quest Activity & History"
            aria-label="View history"
          >
            <History className="w-4 h-4 text-blue-400" />
          </button>

          {/* Badges */}
          <button
            onClick={onOpenAchievements}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-brand-surface hover:bg-white/5 text-xs font-semibold text-brand-text transition-all"
            title="View unlocked badges"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Badges</span>
            {unlockedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-brand-lime text-brand-bg text-[10px] font-bold flex items-center justify-center">
                {unlockedCount}
              </span>
            )}
          </button>

          {/* Modes Button */}
          <button
            onClick={onOpenModes}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-violet/40 bg-brand-violet/10 hover:bg-brand-violet/20 text-xs font-semibold text-brand-violet transition-all"
            title="Choose Quest Mode"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Modes</span>
          </button>

          {/* Primary Play CTA */}
          <button
            onClick={onStartQuest}
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime"
          >
            <span>Start Quest</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-1.5">
          <button
            onClick={handleToggleSound}
            aria-label="Toggle sound"
            className="p-2 rounded-lg border border-white/10 bg-brand-surface text-brand-muted"
          >
            {soundActive ? <Volume2 className="w-4 h-4 text-brand-lime" /> : <VolumeX className="w-4 h-4" />}
          </button>
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
        <div className="lg:hidden border-b border-white/10 bg-brand-surface/98 backdrop-blur-xl px-4 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-brand-text">
            <button 
              onClick={() => scrollTo('learning-library')}
              className="text-left py-1 text-brand-muted hover:text-brand-lime"
            >
              Explore the Science
            </button>
            <button 
              onClick={() => scrollTo('metabolic-simulator')}
              className="text-left py-1 text-brand-muted hover:text-brand-lime flex items-center gap-2"
            >
              <Sliders className="w-4 h-4 text-brand-lime" />
              <span>Lab Simulator</span>
            </button>
            <button 
              onClick={() => scrollTo('mythbusters-section')}
              className="text-left py-1 text-brand-muted hover:text-brand-lime"
            >
              Myth vs Fact Cards
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
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout && onOpenAbout();
              }}
              className="text-left py-1 text-brand-muted hover:text-brand-lime flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-brand-violet" />
              <span>About & Privacy</span>
            </button>
          </nav>

          <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHistory();
              }}
              className="py-2.5 rounded-xl bg-brand-card border border-white/10 text-brand-text text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <History className="w-4 h-4 text-blue-400" />
              <span>History</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModes();
              }}
              className="py-2.5 rounded-xl bg-brand-card border border-brand-violet/30 text-brand-violet text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Zap className="w-4 h-4" />
              <span>Quest Modes</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartQuest();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-base shadow-glow-lime"
            >
              <span>Start Quest</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
