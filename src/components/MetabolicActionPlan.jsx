import React, { useState } from 'react';
import { Calendar, CheckCircle2, Printer, Copy, Sparkles, BookOpen, Clock, ShieldCheck, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

const PROTOCOL_DAYS = [
  {
    day: 'Day 1',
    focus: 'Circadian Light & Meal Timing',
    action: 'Get 10–15 minutes of natural morning sunlight within 60 minutes of waking. Establish a strict 3-hour cutoff between your evening meal and bedtime.',
    why: 'Morning photons set the suprachiasmatic nucleus master clock, synchronizing peripheral organ clocks and improving nighttime insulin sensitivity.'
  },
  {
    day: 'Day 2',
    focus: 'Postprandial Ambulation (Post-Meal Walks)',
    action: 'Commit to a 10–15 minute gentle walk within 30 minutes after your largest meal of the day.',
    why: 'Mechanical skeletal muscle contraction stimulates GLUT4 translocation to the cell surface completely independent of insulin, lowering glucose peaks by up to 25%.'
  },
  {
    day: 'Day 3',
    focus: 'Soluble Viscous Fiber Matrix',
    action: 'Add at least 8–10g of viscous soluble fiber (chia seeds, ground flaxseed, or legumes) before or alongside starch-rich foods.',
    why: 'Forms an intra-gastric gel that slows nutrient breakdown, feeds distal microbiome species, and triggers endogenous GLP-1 and PYY satiety hormones.'
  },
  {
    day: 'Day 4',
    focus: 'Soleus Muscle Contractions & Resistance',
    action: 'Perform 20 seated calf raises (soleus pumps) during prolonged desk work, and complete a 20-minute bodyweight resistance routine.',
    why: 'The soleus muscle contains slow oxidative fibers that utilize circulating glucose and triglycerides with minimal glycogen depletion.'
  },
  {
    day: 'Day 5',
    focus: 'Slow-Wave Sleep Architecture',
    action: 'Keep bedroom temperature cool (65–68°F / 18–20°C), eliminate screen blue light 90 minutes before bed, and target 7.5–8.5 hours of sleep.',
    why: 'Slow-wave sleep calms the sympathetic nervous system and suppresses nocturnal cortisol spikes, preserving peripheral insulin sensitivity.'
  },
  {
    day: 'Day 6',
    focus: 'Microbiome Fermentation Diversity',
    action: 'Incorporate 1–2 servings of fermented foods (kefir, plain probiotic yogurt, kimchi, or sauerkraut) into your diet.',
    why: 'Stanford School of Medicine clinical trials demonstrated that high fermented food intake steadily expands gut microbiome diversity and lowers 19 inflammatory cytokines.'
  },
  {
    day: 'Day 7',
    focus: 'Biomarker Review & Physician Alignment',
    action: 'Review your routine lab work with a healthcare professional, looking specifically at fasting insulin, Triglyceride-to-HDL ratio, and HbA1c.',
    why: 'A high Triglyceride/HDL ratio (> 3.0) and elevated fasting insulin detect metabolic dysregulation years before fasting blood glucose rises.'
  }
];

export function MetabolicActionPlan({ showToast }) {
  const [completedDays, setCompletedDays] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  const toggleDay = (dayIndex) => {
    sound.playSelect();
    setCompletedDays(prev => 
      prev.includes(dayIndex) ? prev.filter(i => i !== dayIndex) : [...prev, dayIndex]
    );
  };

  const handleCopy = async () => {
    sound.playSelect();
    const text = PROTOCOL_DAYS.map(d => `${d.day}: ${d.focus}\nAction: ${d.action}\nWhy: ${d.why}\n`).join('\n');
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`7-DAY METABOLIC RESET PROTOCOL\n\n${text}`);
      }
      setIsCopied(true);
      if (showToast) {
        showToast({
          type: 'success',
          title: 'Protocol Copied!',
          message: '7-day action protocol copied to your clipboard.'
        });
      }
      setTimeout(() => setIsCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePrint = () => {
    sound.playSelect();
    window.print();
  };

  return (
    <section id="action-plan" className="py-20 relative overflow-hidden bg-brand-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-xs font-bold text-brand-violet uppercase tracking-widest mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>PRACTICAL PRODUCTIVITY TOOL</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text">
              7-Day Metabolic Reset Protocol
            </h2>
            <p className="text-sm text-brand-muted mt-2 max-w-xl">
              An evidence-based daily progression designed to implement circadian, dietary, and exercise physiology principles into your routine.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-brand-surface border border-white/10 hover:border-white/20 text-brand-text text-xs font-semibold flex items-center gap-1.5 transition-all hover:bg-white/5"
            >
              <Copy className="w-3.5 h-3.5 text-brand-muted" />
              <span>{isCopied ? 'Copied!' : 'Copy Protocol'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-brand-surface border border-white/10 hover:border-white/20 text-brand-text text-xs font-semibold flex items-center gap-1.5 transition-all hover:bg-white/5"
            >
              <Printer className="w-3.5 h-3.5 text-brand-lime" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* 7-Day Checklist Cards */}
        <div className="space-y-4 mb-10">
          {PROTOCOL_DAYS.map((item, idx) => {
            const isDone = completedDays.includes(idx);
            return (
              <div
                key={item.day}
                onClick={() => toggleDay(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer select-none flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDone 
                    ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm' 
                    : 'bg-brand-surface/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div 
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors mt-0.5 sm:mt-0 ${
                      isDone 
                        ? 'bg-emerald-500 border-emerald-400 text-brand-bg font-bold' 
                        : 'border-white/20 bg-brand-card text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-brand-lime">{item.day}</span>
                      <span className="text-white/20">•</span>
                      <h3 className={`font-display font-bold text-base transition-colors ${isDone ? 'text-emerald-300 line-through' : 'text-brand-text'}`}>
                        {item.focus}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-brand-text/90 leading-relaxed mb-1">
                      {item.action}
                    </p>
                    <p className="text-[11px] text-brand-muted italic">
                      Why it matters: {item.why}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 self-end sm:self-center">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${isDone ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-white/5 border-white/10 text-brand-muted'}`}>
                    {isDone ? 'Completed' : 'Click to complete'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress summary banner */}
        <div className="p-4 rounded-2xl bg-brand-surface border border-brand-lime/20 flex items-center justify-between text-xs text-brand-muted">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-lime" />
            <span>Progress: <strong className="text-white font-mono">{completedDays.length} of 7 days</strong> completed</span>
          </div>
          <span className="text-[11px] text-brand-muted/70 italic">Protocol resets locally on your device</span>
        </div>

      </div>
    </section>
  );
}
