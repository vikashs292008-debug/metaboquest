import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Swords, Clock, CheckCircle2, Shield, Sparkles, HelpCircle } from 'lucide-react';
import { HeroInteractiveVisual } from './HeroInteractiveVisual';

export function Hero({ onStartQuest, onExploreScience, challengeData }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      
      {/* Background ambient radial glow layers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-violet/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-brand-lime/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Incoming Friend Challenge Alert Banner (if opened via referral link) */}
        {challengeData && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-brand-violet/25 via-brand-surface to-brand-lime/20 border border-brand-violet/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-violet/30 border border-brand-violet/50 flex items-center justify-center flex-shrink-0">
                <Swords className="w-5 h-5 text-brand-violet" />
              </div>
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-brand-violet">
                  Friend Challenge Invitation
                </p>
                <p className="text-sm font-medium text-brand-text">
                  <span className="font-bold text-brand-lime">{challengeData.friendName}</span> scored{' '}
                  <span className="font-mono font-bold text-brand-lime">{challengeData.targetScore} pts</span> as a{' '}
                  <span className="font-semibold text-brand-text">{challengeData.archetype}</span>! Can you beat their score?
                </p>
              </div>
            </div>

            <button
              onClick={onStartQuest}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Accept Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline & Interactive Teaser */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-xs font-semibold text-brand-lime">
                <span className="w-2 h-2 rounded-full bg-brand-lime animate-ping" />
                <span className="tracking-wide">Understand your body. One small discovery at a time.</span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-brand-muted">
                <HelpCircle className="w-3.5 h-3.5 text-brand-violet" />
                <span>How much do you know about metabolic health?</span>
              </div>
            </div>

            {/* Core Hero Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-brand-text leading-[1.1]">
              Metabolic health is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime via-[#b8f553] to-brand-violet">
                more than a number.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-brand-muted max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Take a quick interactive quest to discover how different systems in your body work together.
            </p>

            {/* Required Value Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-brand-muted pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-semibold">
                <Clock className="w-3.5 h-3.5 text-brand-lime" />
                <span>5 questions · About 90 seconds · No sign-up</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-brand-violet" />
                <span>No account required · Stays on this device</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Evidence-Backed Sources</span>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartQuest}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-lime text-brand-bg font-display font-bold text-base hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime flex items-center justify-center gap-2.5 group"
              >
                <span>Start my quest</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreScience}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-brand-surface border border-white/10 text-brand-text font-display font-semibold text-base hover:bg-white/5 hover:border-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-brand-violet" />
                <span>Explore the science</span>
              </button>
            </div>

            {/* Educational Disclaimer Badge */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-brand-muted/80">
              <Sparkles className="w-3.5 h-3.5 text-brand-lime flex-shrink-0" />
              <span>Educational content, not medical advice. No diagnosis inferred.</span>
            </div>

          </div>

          {/* Right Column: Interactive Constellation Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroInteractiveVisual onStartQuest={onStartQuest} />
          </div>

        </div>

      </div>
    </section>
  );
}
