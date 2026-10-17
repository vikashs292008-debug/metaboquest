import React from 'react';
import { ExternalLink, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { STEER_CLUB_URL } from '../utils/sharing';
import { recordLocalMetric } from '../utils/persistence';

export function SteerClubConversion() {
  const handleCtaClick = () => {
    recordLocalMetric('ctaClicks');
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-brand-bg via-brand-surface/60 to-brand-bg">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-lime/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-elevated border border-white/10 shadow-2xl text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-xs font-bold text-brand-lime uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5" />
            <span>PARTNER PATHWAYS</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text max-w-2xl mx-auto">
            Ready to explore your next step?
          </h2>

          <p className="text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
            Explore evidence-informed metabolic health resources and learn about the options available through Steer Club.
          </p>

          {/* Clarity & Boundaries Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-white/10 max-w-2xl mx-auto text-left flex items-start gap-3 text-xs text-brand-muted">
            <ShieldCheck className="w-5 h-5 text-brand-violet flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-brand-text">Transparent Clinical Care Standards</p>
              <p>
                MetaboQuest is an educational tool. A quiz score never determines medication eligibility, diagnosis, or clinical appropriateness. All clinical programs and treatment decisions require individualized physician evaluation.
              </p>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="pt-2">
            <a
              href={STEER_CLUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-brand-lime text-brand-bg font-display font-bold text-base hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime group"
            >
              <span>Explore Steer Club Resources</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <p className="text-[11px] text-brand-muted/70 italic">
            Destination URL is configurable via <code className="text-brand-lime">STEER_CLUB_URL</code> constant.
          </p>

        </div>

      </div>
    </section>
  );
}
