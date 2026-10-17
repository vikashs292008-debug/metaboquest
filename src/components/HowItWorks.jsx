import React from 'react';
import { Target, Award, Users, ChevronRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: Target,
    title: 'Answer 5 Questions',
    description: 'Bite-sized questions covering sleep, movement, fiber, and blood glucose. Takes approximately 90 seconds.',
    accent: '#C6FF65'
  },
  {
    step: '02',
    icon: Award,
    title: 'Discover What You Know',
    description: 'Receive your personalized Knowledge Archetype, transparent score breakdown, and tailored biological insights.',
    accent: '#A78BFA'
  },
  {
    step: '03',
    icon: Users,
    title: 'Challenge a Friend',
    description: 'Generate your custom challenge link and PNG result card to see if your friends can beat your score.',
    accent: '#60A5FA'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-brand-surface/20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-brand-lime uppercase tracking-widest mb-2">
            SIMPLE, FAST, ENGAGING
          </p>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-text">
            How MetaboQuest Works
          </h2>
          <p className="text-sm text-brand-muted mt-2 max-w-md mx-auto">
            From first question to friend challenge in under two minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.step}
                className="relative p-6 rounded-2xl glass-panel border border-white/10 flex flex-col items-start"
              >
                <div className="flex items-center justify-between w-full mb-5">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center border"
                    style={{ 
                      borderColor: `${step.accent}40`,
                      backgroundColor: `${step.accent}15`
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.accent }} />
                  </div>
                  <span className="font-mono font-extrabold text-2xl text-white/20">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-brand-text mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-brand-muted leading-relaxed">
                  {step.description}
                </p>

                {/* Progressive Arrow Indicator on desktop */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-brand-bg rounded-full p-1 border border-white/10 text-white/40">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
