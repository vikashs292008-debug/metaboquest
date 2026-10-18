import React from 'react';
import { Activity, ArrowRight, Shield, Heart, ExternalLink } from 'lucide-react';
import { STEER_CLUB_URL } from '../utils/sharing';

export function Footer({ onStartQuest, onOpenAbout }) {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-brand-bg text-brand-muted">
      
      {/* Final Pre-Footer Call to Action */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text">
          Understand your body. One small discovery at a time.
        </h2>
        <p className="text-base text-brand-muted max-w-md mx-auto">
          Take the 90-second challenge. Learn something new. Pass it on.
        </p>
        <div>
          <button
            onClick={onStartQuest}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-lime text-brand-bg font-display font-bold text-base hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime group"
          >
            <span>Start My Quest</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Main Footer links and credentials */}
      <div className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-lime/20 border border-brand-lime/40 flex items-center justify-center">
                <Activity className="w-4 h-4 text-brand-lime" />
              </div>
              <span className="font-display font-bold text-lg text-brand-text">
                Metabo<span className="text-brand-lime">Quest</span>
              </span>
            </div>
            <p className="text-xs text-brand-muted max-w-sm leading-relaxed">
              An engaging, 90-second gamified metabolic health education experience engineered for the Steer Club Hackathon. Grounded in peer-reviewed endocrinology, cardiology, and circadian biology.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-brand-muted">
              <Shield className="w-3.5 h-3.5 text-brand-lime" />
              <span>Privacy First • On-Device Local Storage Only • Zero Tracking Pixels</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('how-it-works')} className="hover:text-brand-lime transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('preview-section')} className="hover:text-brand-lime transition-colors">
                  Sample Preview
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('daily-quest-section')} className="hover:text-brand-lime transition-colors">
                  Daily Quest
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('learning-library')} className="hover:text-brand-lime transition-colors">
                  Science Library
                </button>
              </li>
              <li>
                <button onClick={onOpenAbout} className="hover:text-brand-lime transition-colors font-semibold text-white">
                  About & Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Partner & Project Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text mb-3">
              Steer Club Resources
            </h4>
            <ul className="space-y-2 text-xs">
              {STEER_CLUB_URL ? (
                <li>
                  <a 
                    href={STEER_CLUB_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-brand-lime transition-colors inline-flex items-center gap-1 text-brand-lime font-semibold"
                  >
                    <span>Official Steer Club</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ) : (
                <li>
                  <span className="text-brand-muted/70">Steer Club URL Configurable</span>
                </li>
              )}
              <li>
                <button onClick={onOpenAbout} className="text-brand-muted hover:text-white transition-colors">
                  Device Storage & Reset
                </button>
              </li>
              <li>
                <span className="text-brand-muted/70">Production Release v1.0.0</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright and Accessibility */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted/60 gap-4">
          <p>© {currentYear} MetaboQuest. Educational public health platform.</p>
          <p className="flex items-center gap-1">
            Built with <span>React, Tailwind CSS, Lucide Icons & Framer Motion</span>
          </p>
        </div>
      </div>

    </footer>
  );
}
