import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Swords, Clock, CheckCircle2, Shield } from 'lucide-react';
import { HeroInteractiveVisual } from './HeroInteractiveVisual';

export function Hero({ onStartQuest, onExploreScience, challengeData }) {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
      
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-violet/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-brand-lime/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Incoming Friend Challenge Alert Banner (if opened via referral link) */}
        {challengeData && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-brand-violet/20 via-brand-surface to-brand-lime/20 border border-brand-violet/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
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
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-lime">
              <span className="w-2 h-2 rounded-full bg-brand-lime animate-ping" />
              <span className="tracking-wider uppercase">THE METABOLIC HEALTH CHALLENGE</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-brand-text leading-[1.1]">
              Think you know <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime via-[#b8f553] to-brand-violet">
                metabolism?
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-brand-muted max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Five quick questions. Surprising science. One challenge worth sharing.
            </p>

            {/* Value chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-brand-muted pt-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-lime" />
                <span>~90 seconds</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-brand-violet" />
                <span>100% Free & Anonymous</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Evidence-Backed Sources</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onStartQuest}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-lime text-brand-bg font-display font-bold text-base hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime flex items-center justify-center gap-2.5"
              >
                <span>Start my quest</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreScience}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-brand-surface border border-white/10 text-brand-text font-display font-semibold text-base hover:bg-white/5 hover:border-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-brand-violet" />
                <span>Explore the science</span>
              </button>
            </div>

            {/* Micro pledge */}
            <p className="text-[12px] text-brand-muted/70 italic pt-1">
              General education grounded in peer-reviewed biology. No diagnosis. No signup required.
            </p>
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
