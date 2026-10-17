import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rotate3D, AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

const MYTHS = [
  {
    id: 'myth_calories',
    category: 'Thermodynamics & Energy',
    myth: '“A calorie is just a calorie. 2,000 calories of cookies has the exact same metabolic impact as 2,000 calories of whole salmon and broccoli.”',
    mythWhy: 'Assumes the human body operates like a static bomb calorimeter rather than a complex endocrine system.',
    fact: 'The Thermic Effect of Food (TEF), gut microbiome fermentation into SCFAs, and hormonal satiety signaling (GLP-1 and PYY) differ dramatically between whole protein/fiber foods and ultra-processed refined carbohydrates.',
    evidence: 'Cell Metabolism & American Journal of Clinical Nutrition'
  },
  {
    id: 'myth_fasting_glucose',
    category: 'Biomarkers & Detection',
    myth: '“My fasting blood glucose is 92 mg/dL, so I am 100% metabolically healthy.”',
    mythWhy: 'Fasting glucose is often the very last marker to rise during the progression of metabolic dysfunction.',
    fact: 'The pancreas can compensate for underlying insulin resistance for 10–15 years by producing 3x to 5x more fasting insulin to keep glucose in normal ranges. Evaluating fasting insulin, HbA1c, and the Triglyceride/HDL ratio provides earlier clinical context.',
    evidence: 'Diabetes Care (American Diabetes Association) / Kraft Clinical Studies'
  },
  {
    id: 'myth_fruit_sugar',
    category: 'Nutrition & Fiber',
    myth: '“Whole fruit has sugar, so eating an apple spikes blood sugar the same way as drinking a soda.”',
    mythWhy: 'Equates isolated industrial free sugars with intrinsic sugars encased in plant cellular architecture.',
    fact: 'Whole fruit contains intact cellular walls, water, polyphenols, and soluble fiber (pectin). This physical food matrix slows gastric transit and carbohydrate absorption, eliciting a blunted glycemic curve compared to liquid fructose.',
    evidence: 'British Medical Journal (BMJ) & Harvard T.H. Chan School of Public Health'
  },
  {
    id: 'myth_cardio_only',
    category: 'Exercise Physiology',
    myth: '“Long steady-state cardio is the only exercise that benefits metabolic health and burns fat.”',
    mythWhy: 'Overlooks the critical endocrine and metabolic role of skeletal muscle tissue.',
    fact: 'Skeletal muscle is your body’s primary glucose sink (~80% of post-meal glucose disposal). Resistance training increases myofibrillar mass and insulin receptor density, expanding your glucose storage reservoir for decades.',
    evidence: 'Journal of Applied Physiology & Lancet Diabetes & Endocrinology'
  },
  {
    id: 'myth_breakfast_skip',
    category: 'Circadian Biology',
    myth: '“If you skip breakfast, your body enters starvation mode and your metabolism instantly shuts down.”',
    mythWhy: 'Confuses adaptive thermogenesis from prolonged chronic starvation with short-term intermittent fasting.',
    fact: 'Short-term morning fasting shifts fuel utilization toward fatty acid oxidation and stimulates cellular autophagy (AMPK activation). Individual meal timing should align with personal circadian rhythms, activity schedules, and satiety.',
    evidence: 'Endocrine Reviews & Nature Reviews Endocrinology'
  }
];

export function MetabolicMythBusters() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const current = MYTHS[currentIndex];

  const handleFlip = () => {
    sound.playSelect();
    setIsFlipped(prev => !prev);
  };

  const handleNext = () => {
    sound.playSelect();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % MYTHS.length);
  };

  const handlePrev = () => {
    sound.playSelect();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + MYTHS.length) % MYTHS.length);
  };

  return (
    <section id="mythbusters-section" className="py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-xs font-bold text-brand-violet uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE SCIENCE CARDS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text">
            Metabolic Myth vs. Medical Fact
          </h2>
          <p className="text-sm text-brand-muted mt-2">
            Click the card to flip between widespread health misconceptions and verified endocrinology facts.
          </p>
        </div>

        {/* 3D Flip Card Container */}
        <div className="max-w-2xl mx-auto perspective-1000">
          <motion.div
            onClick={handleFlip}
            className="w-full min-h-[360px] sm:min-h-[320px] rounded-3xl p-8 sm:p-10 cursor-pointer select-none transition-all duration-500 shadow-2xl relative flex flex-col justify-between border"
            style={{
              backgroundColor: isFlipped ? '#0d1d17' : '#18131e',
              borderColor: isFlipped ? 'rgba(52, 211, 153, 0.4)' : 'rgba(244, 63, 94, 0.35)',
              boxShadow: isFlipped ? '0 0 35px -5px rgba(52, 211, 153, 0.2)' : '0 0 35px -5px rgba(244, 63, 94, 0.15)'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Top Badge & Flip indicator */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                {current.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-white">
                <Rotate3D className="w-4 h-4 text-brand-lime" />
                <span>Click to Flip</span>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="my-6">
              {!isFlipped ? (
                /* MYTH SIDE */
                <motion.div
                  key="myth"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>The Common Myth</span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-rose-100 leading-snug">
                    {current.myth}
                  </h3>
                  <p className="text-xs text-rose-200/70 italic">
                    Why people believe it: {current.mythWhy}
                  </p>
                </motion.div>
              ) : (
                /* FACT SIDE */
                <motion.div
                  key="fact"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>The Verified Fact</span>
                  </div>
                  <h3 className="font-display font-medium text-base sm:text-lg text-emerald-100 leading-relaxed">
                    {current.fact}
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono pt-1">
                    Clinical Reference: {current.evidence}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Bottom Card Navigation */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-brand-muted">
              <span>Card {currentIndex + 1} of {MYTHS.length}</span>
              <span className="text-brand-lime font-medium">Tap to see {isFlipped ? 'the myth' : 'the science'}</span>
            </div>
          </motion.div>

          {/* Carousel Next/Prev Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl bg-brand-surface border border-white/10 hover:border-white/20 text-brand-muted hover:text-brand-text transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Myth</span>
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {MYTHS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sound.playSelect();
                    setIsFlipped(false);
                    setCurrentIndex(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentIndex === i ? 'bg-brand-lime w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to card ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-xl bg-brand-surface border border-white/10 hover:border-white/20 text-brand-muted hover:text-brand-text transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <span>Next Myth</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
