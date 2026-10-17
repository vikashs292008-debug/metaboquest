import React from 'react';
import { Sparkles, Moon, Activity, Flame, Shield, X, ArrowRight, Zap, Trophy } from 'lucide-react';
import { sound } from '../utils/audio';

const MODES = [
  {
    id: 'classic',
    title: 'Classic 90-Sec Quest',
    badge: 'Popular',
    questionsCount: 5,
    maxPoints: 600,
    timeEst: '~90 sec',
    description: 'The signature balanced 5-question circuit across sleep, movement, fiber, and glucose science.',
    icon: Sparkles,
    color: '#C6FF65'
  },
  {
    id: 'gauntlet',
    title: 'Metabolic Gauntlet',
    badge: 'Mastery',
    questionsCount: 10,
    maxPoints: 1100,
    timeEst: '~3 min',
    description: 'An intense 10-question deep dive for advanced learners, biohackers, and healthcare enthusiasts.',
    icon: Trophy,
    color: '#A78BFA'
  },
  {
    id: 'sleep',
    title: 'Sleep & Circadian Biology',
    badge: 'Topic Sprint',
    questionsCount: 5,
    maxPoints: 600,
    timeEst: '~90 sec',
    description: 'Focus exclusively on nocturnal insulin sensitivity, melatonin signaling, and restorative sleep cycles.',
    icon: Moon,
    color: '#38BDF8'
  },
  {
    id: 'movement',
    title: 'Movement & Muscle Power',
    badge: 'Topic Sprint',
    questionsCount: 5,
    maxPoints: 600,
    timeEst: '~90 sec',
    description: 'Explore skeletal muscle GLUT4 glucose uptake, post-meal walks, and soleus oxidative physiology.',
    icon: Activity,
    color: '#34D399'
  },
  {
    id: 'nutrition',
    title: 'Fiber, Microbiome & Gut',
    badge: 'Topic Sprint',
    questionsCount: 5,
    maxPoints: 600,
    timeEst: '~90 sec',
    description: 'Master short-chain fatty acids, gut barrier integrity, and natural GLP-1 / PYY secretion mechanics.',
    icon: Flame,
    color: '#F59E0B'
  },
  {
    id: 'biomarkers',
    title: 'Biomarkers & Lipids',
    badge: 'Topic Sprint',
    questionsCount: 5,
    maxPoints: 600,
    timeEst: '~90 sec',
    description: 'Decode Triglyceride-to-HDL ratios, fasting insulin dynamics, and endothelial vasodilation.',
    icon: Shield,
    color: '#EC4899'
  }
];

export function QuestModeModal({ isOpen, onClose, onSelectMode }) {
  if (!isOpen) return null;

  const handleSelect = (modeId) => {
    sound.playSelect();
    onSelectMode(modeId);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-bg/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quest-mode-title"
    >
      <div className="w-full max-w-2xl my-6 p-6 sm:p-8 rounded-3xl bg-brand-surface border border-white/10 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-lime/10 border border-brand-lime/30 flex items-center justify-center text-brand-lime">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 id="quest-mode-title" className="font-display font-bold text-lg text-brand-text">
                Select Your Quest Mode
              </h2>
              <p className="text-xs text-brand-muted">
                Choose a general quest or target specific metabolic pathways
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

        {/* Modes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[65vh] overflow-y-auto pr-1">
          {MODES.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => handleSelect(mode.id)}
                className="group p-5 rounded-2xl bg-brand-card/70 border border-white/10 hover:border-white/25 text-left transition-all hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{ 
                        backgroundColor: `${mode.color}15`,
                        borderColor: `${mode.color}40`,
                        color: mode.color
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span 
                      className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: `${mode.color}10`,
                        borderColor: `${mode.color}30`,
                        color: mode.color
                      }}
                    >
                      {mode.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-brand-text mb-1 group-hover:text-white transition-colors">
                    {mode.title}
                  </h3>

                  <p className="text-xs text-brand-muted leading-relaxed line-clamp-2 mb-4">
                    {mode.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-brand-muted">
                  <span className="font-mono">{mode.questionsCount} Questions • {mode.timeEst}</span>
                  <span className="flex items-center gap-1 font-bold text-brand-lime group-hover:translate-x-0.5 transition-transform">
                    <span>Play</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
