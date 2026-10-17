import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

const AUDIT_QUESTIONS = [
  {
    id: 'sleep',
    label: 'Nocturnal Sleep Duration',
    desc: 'Average nightly sleep window over the past month',
    options: [
      { text: '< 6 hours / irregular', points: 10, insight: 'Chronic partial sleep debt elevates daytime cortisol and reduces peripheral insulin sensitivity by up to 25%.' },
      { text: '6–7 hours', points: 20, insight: 'Moderate rest; aiming for closer to 7–8 hours supports slow-wave growth hormone recovery.' },
      { text: '7–9 hours consistent', points: 30, insight: 'Optimal restorative slow-wave architecture for nocturnal endocrine recalibration.' }
    ]
  },
  {
    id: 'movement',
    label: 'Post-Meal Physical Movement',
    desc: 'Frequency of light movement (10-15 min walk or calf raises) within 45 mins of meals',
    options: [
      { text: 'Rarely / mostly seated', points: 5, insight: 'Sedentary postprandial state relies entirely on insulin receptor activation without non-insulin GLUT4 assistance.' },
      { text: '1–2 times per week', points: 15, insight: 'Good start; establishing daily post-meal ambulation significantly blunts glucose peaks.' },
      { text: 'Most days (5+ times/week)', points: 25, insight: 'Leverages muscular contraction to soak up up to 80% of circulating blood glucose with reduced pancreatic strain.' }
    ]
  },
  {
    id: 'fiber',
    label: 'Dietary Fiber Density',
    desc: 'Intake of whole legumes, vegetables, berries, oats, seeds, and fermented foods',
    options: [
      { text: 'Low (< 10g per day)', points: 5, insight: 'Low dietary fiber leaves gut microbiota underfed and speeds carbohydrate gastric emptying.' },
      { text: 'Moderate (15–25g per day)', points: 15, insight: 'Approaching recommended dietary guidelines; increasing soluble sources enhances short-chain fatty acid release.' },
      { text: 'High (30g+ diverse plant fibers)', points: 25, insight: 'Feeds colonocytes, expands microbial diversity, and stimulates natural GLP-1 & PYY secretion.' }
    ]
  },
  {
    id: 'evening_timing',
    label: 'Evening Meal Cutoff Window',
    desc: 'Typical time gap between your final meal/snack and falling asleep',
    options: [
      { text: '< 1 hour before sleep', points: 5, insight: 'Conficts with nocturnal melatonin secretion, which naturally suppresses beta-cell insulin output.' },
      { text: '1–2 hours before sleep', points: 10, insight: 'Adequate, but a slightly longer digestive buffer allows basal metabolic cooldown.' },
      { text: '2.5–3+ hours before sleep', points: 20, insight: 'Optimal alignment with human circadian biology, minimizing nighttime glycemic elevation.' }
    ]
  }
];

export function MetabolicScoreAudit({ onStartQuest }) {
  const [selections, setSelections] = useState({
    sleep: null,
    movement: null,
    fiber: null,
    evening_timing: null
  });

  const isComplete = Object.values(selections).every(v => v !== null);

  const totalScore = Object.entries(selections).reduce((acc, [key, optIdx]) => {
    if (optIdx === null) return acc;
    const q = AUDIT_QUESTIONS.find(item => item.id === key);
    return acc + (q?.options[optIdx]?.points || 0);
  }, 0);

  const handleSelect = (qId, idx) => {
    sound.playSelect();
    setSelections(prev => ({ ...prev, [qId]: idx }));
  };

  const handleReset = () => {
    sound.playSelect();
    setSelections({
      sleep: null,
      movement: null,
      fiber: null,
      evening_timing: null
    });
  };

  let tier = 'Developing';
  let tierColor = '#FBBF24';
  if (totalScore >= 80) {
    tier = 'Optimal Resilience';
    tierColor = '#C6FF65';
  } else if (totalScore >= 55) {
    tier = 'Solid Baseline';
    tierColor = '#38BDF8';
  }

  return (
    <section id="metabolic-audit" className="py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-xs font-bold text-brand-lime uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DAILY HABIT BENCHMARK</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text">
            Metabolic Habit Resilience Index
          </h2>
          <p className="text-sm text-brand-muted mt-2">
            A 60-second lifestyle audit evaluating your daily habits against clinical metabolic targets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Questions Column */}
          <div className="lg:col-span-7 space-y-5">
            {AUDIT_QUESTIONS.map((q) => (
              <div key={q.id} className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
                <div>
                  <h3 className="font-display font-bold text-sm text-brand-text">
                    {q.label}
                  </h3>
                  <p className="text-[11px] text-brand-muted">{q.desc}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {q.options.map((opt, idx) => {
                    const isSelected = selections[q.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(q.id, idx)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-brand-lime/15 border-brand-lime text-brand-lime font-bold shadow-sm'
                            : 'bg-brand-card/60 border-white/5 text-brand-muted hover:border-white/20'
                        }`}
                      >
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Results Score Gauge Column */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-white/15 shadow-2xl space-y-6 text-center">
              
              <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                {/* SVG Progress Ring */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke={tierColor}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * totalScore) / 100}
                    strokeLinecap="round"
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono font-extrabold text-3xl text-brand-text">
                    {totalScore}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-brand-muted">
                    Out of 100
                  </span>
                </div>
              </div>

              <div>
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border mb-1"
                  style={{
                    backgroundColor: `${tierColor}15`,
                    borderColor: `${tierColor}40`,
                    color: tierColor
                  }}
                >
                  {isComplete ? tier : 'Select Your Habits'}
                </span>
                <p className="text-xs text-brand-muted mt-2">
                  {isComplete 
                    ? 'Your daily habit score reflects lifestyle levers that directly influence cellular energy transitions.'
                    : 'Answer all 4 lifestyle factors to calculate your habit resilience index.'}
                </p>
              </div>

              {isComplete && (
                <div className="space-y-3 pt-2">
                  <button
                    onClick={onStartQuest}
                    className="w-full py-3 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-sm hover:bg-[#d4ff80] active:scale-95 transition-all shadow-glow-lime flex items-center justify-center gap-2"
                  >
                    <span>Test Your Metabolic IQ</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-1.5 text-xs text-brand-muted hover:text-brand-text mx-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset audit</span>
                  </button>
                </div>
              )}

              <p className="text-[10px] text-brand-muted/70 italic border-t border-white/5 pt-3">
                Lifestyle habits scoring is educational and non-diagnostic.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
