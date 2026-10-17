import React from 'react';
import { Gamepad2, GraduationCap, Share2 } from 'lucide-react';

const FEATURES = [
  {
    icon: Gamepad2,
    tag: 'PLAY',
    title: 'Gamified Micro-Quests',
    description: 'Bite-sized, high-yield challenges designed to test intuition and reveal the hidden mechanics of human energy.',
    color: '#C6FF65',
    accentClass: 'text-brand-lime border-brand-lime/30 bg-brand-lime/10'
  },
  {
    icon: GraduationCap,
    tag: 'LEARN',
    title: 'Verified Medical Science',
    description: 'Every answer is backed by clinical studies and guidelines from the NIH, CDC, ADA, and leading peer-reviewed journals.',
    color: '#A78BFA',
    accentClass: 'text-brand-violet border-brand-violet/30 bg-brand-violet/10'
  },
  {
    icon: Share2,
    tag: 'SHARE',
    title: 'Head-to-Head Challenges',
    description: 'Generate high-res share cards, challenge friends via custom invite links, and compare metabolic knowledge archetypes.',
    color: '#60A5FA',
    accentClass: 'text-blue-400 border-blue-400/30 bg-blue-400/10'
  }
];

export function FeatureHighlights() {
  return (
    <section className="py-12 border-y border-white/5 bg-brand-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.tag}
                className="group relative p-6 rounded-2xl glass-panel border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feat.accentClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold tracking-widest border uppercase ${feat.accentClass}`}>
                    {feat.tag}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-brand-text mb-2 group-hover:text-white transition-colors">
                  {feat.title}
                </h3>

                <p className="text-sm text-brand-muted leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
