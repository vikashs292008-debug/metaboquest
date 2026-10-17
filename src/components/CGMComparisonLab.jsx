import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Sparkles, Scale, Info, Check, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

const FOOD_PAIRS = [
  {
    id: 'oats',
    title: 'Instant Oats vs. Fiber-Protein Optimized Bowl',
    category: 'Nutritional Food Matrix',
    itemA: {
      name: 'Instant Quick Oats (Plain)',
      carbs: '48g',
      protein: '4g',
      fiber: '3g',
      peak: 162,
      variability: 'High',
      tag: 'Rapid Hydrolysis',
      curvePoints: [85, 125, 162, 140, 110, 88, 85]
    },
    itemB: {
      name: 'Rolled Oats + Greek Yogurt, Chia Seeds & Walnuts',
      carbs: '38g',
      protein: '22g',
      fiber: '11g',
      peak: 118,
      variability: 'Stable',
      tag: 'Viscous Gel Matrix',
      curvePoints: [85, 98, 118, 112, 102, 92, 85]
    },
    science: 'Adding healthy fats, dairy protein, and soluble fiber (chia seed mucilage) creates a physical barrier in the stomach, dramatically delaying gastric emptying and flattening postprandial glycemic excursions by over 40%.'
  },
  {
    id: 'rice',
    title: 'Fresh Hot White Rice vs. Cooled & Reheated Rice',
    category: 'Resistant Starch Biochemistry',
    itemA: {
      name: 'Freshly Steamed Jasmine Rice',
      carbs: '45g',
      protein: '4g',
      fiber: '0.6g',
      peak: 168,
      variability: 'High',
      tag: 'Rapidly Digestible Starch',
      curvePoints: [85, 130, 168, 145, 115, 90, 85]
    },
    itemB: {
      name: 'Cooled (24h) & Reheated Rice',
      carbs: '42g',
      protein: '4g',
      fiber: '3.2g RS',
      peak: 126,
      variability: 'Moderate',
      tag: 'Type 3 Resistant Starch',
      curvePoints: [85, 105, 126, 120, 108, 94, 85]
    },
    science: 'Cooling cooked starch causes amylose retrogradation, crystallizing starch molecules into Type 3 Resistant Starch (RS3). RS3 resists digestion in the upper GI tract and travels to the colon to feed butyrate-producing bacteria, lowering the glycemic index by up to 25-30%.'
  },
  {
    id: 'fruit',
    title: 'Whole Organic Apple vs. Filtered Apple Juice',
    category: 'Cellular Plant Matrix',
    itemA: {
      name: '12 oz Filtered Apple Juice',
      carbs: '39g',
      protein: '0g',
      fiber: '0.2g',
      peak: 158,
      variability: 'Sharp Spike & Dip',
      tag: 'Acellular Free Sugar',
      curvePoints: [85, 138, 158, 120, 78, 82, 85]
    },
    itemB: {
      name: '1 Whole Crisp Apple with Skin',
      carbs: '25g',
      protein: '0.5g',
      fiber: '4.5g',
      peak: 108,
      variability: 'Gentle Curve',
      tag: 'Intact Plant Cell Walls',
      curvePoints: [85, 96, 108, 105, 98, 90, 85]
    },
    science: 'Liquid juice bypasses mastication and delivers liquid fructose straight to the portal vein. Whole fruit encases sugars within intact cellulose cell walls and pectin fiber, ensuring slow enzymatic release and preventing rapid hepatic fat deposition.'
  }
];

export function CGMComparisonLab() {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const currentPair = FOOD_PAIRS[selectedPairIndex];

  const handleSelect = (idx) => {
    sound.playSelect();
    setSelectedPairIndex(idx);
  };

  // Convert points to SVG curve string
  const getSvgPath = (points) => {
    const width = 300;
    const height = 120;
    const minG = 70;
    const maxG = 180;

    const coords = points.map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((val - minG) / (maxG - minG)) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return `M ${coords.join(' L ')}`;
  };

  return (
    <section id="cgm-lab" className="py-20 relative overflow-hidden bg-brand-surface/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-xs font-bold text-brand-lime uppercase tracking-widest mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>CONTINUOUS GLUCOSE MONITOR (CGM) LAB</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text">
            Side-by-Side Food Matrix Comparison
          </h2>
          <p className="text-sm sm:text-base text-brand-muted mt-2">
            Discover why the structure and pairing of food matters just as much as carbohydrate quantity.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {FOOD_PAIRS.map((pair, idx) => (
            <button
              key={pair.id}
              onClick={() => handleSelect(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedPairIndex === idx
                  ? 'bg-brand-lime text-brand-bg shadow-glow-lime'
                  : 'bg-brand-surface border border-white/10 text-brand-muted hover:text-brand-text hover:border-white/20'
              }`}
            >
              {pair.title.split('vs.')[0].trim()}
            </button>
          ))}
        </div>

        {/* Comparison Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-8">
          
          {/* Card A: Unbuffered / Standard */}
          <div className="p-6 sm:p-8 rounded-3xl bg-brand-surface border border-rose-500/30 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Option A • {currentPair.itemA.tag}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-[10px] font-bold text-rose-300">
                  High Glycemic Impact
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-brand-text mb-4">
                {currentPair.itemA.name}
              </h3>

              {/* Macro chips */}
              <div className="flex items-center gap-3 text-xs font-mono text-brand-muted mb-6">
                <span>Carbs: <strong className="text-white">{currentPair.itemA.carbs}</strong></span>
                <span>•</span>
                <span>Fiber: <strong className="text-white">{currentPair.itemA.fiber}</strong></span>
                <span>•</span>
                <span>Protein: <strong className="text-white">{currentPair.itemA.protein}</strong></span>
              </div>

              {/* SVG Glycemic Curve */}
              <div className="relative aspect-[3/1.2] bg-[#070A0F] rounded-2xl border border-white/10 p-3 mb-6 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                  <path
                    d={getSvgPath(currentPair.itemA.curvePoints)}
                    fill="none"
                    stroke="#F87171"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-2 right-3 font-mono text-xs font-bold text-rose-400">
                  Peak: {currentPair.itemA.peak} mg/dL
                </div>
                <div className="absolute bottom-1 left-3 right-3 flex justify-between text-[9px] font-mono text-brand-muted/60">
                  <span>0 min</span>
                  <span>60 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200">
              Rapid gastric emptying causes a sharp glucose surge, followed by a compensatory insulin spike and potential reactive energy dip.
            </div>
          </div>

          {/* Card B: Buffered / Optimized */}
          <div className="p-6 sm:p-8 rounded-3xl bg-brand-surface border border-emerald-500/40 flex flex-col justify-between shadow-glow-lime">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Option B • {currentPair.itemB.tag}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-300">
                  Metabolically Buffered
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-brand-text mb-4">
                {currentPair.itemB.name}
              </h3>

              {/* Macro chips */}
              <div className="flex items-center gap-3 text-xs font-mono text-brand-muted mb-6">
                <span>Carbs: <strong className="text-white">{currentPair.itemB.carbs}</strong></span>
                <span>•</span>
                <span>Fiber: <strong className="text-brand-lime">{currentPair.itemB.fiber}</strong></span>
                <span>•</span>
                <span>Protein: <strong className="text-brand-lime">{currentPair.itemB.protein}</strong></span>
              </div>

              {/* SVG Glycemic Curve */}
              <div className="relative aspect-[3/1.2] bg-[#070A0F] rounded-2xl border border-white/10 p-3 mb-6 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                  <path
                    d={getSvgPath(currentPair.itemB.curvePoints)}
                    fill="none"
                    stroke="#34D399"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-2 right-3 font-mono text-xs font-bold text-emerald-400">
                  Peak: {currentPair.itemB.peak} mg/dL (-{currentPair.itemA.peak - currentPair.itemB.peak} mg/dL)
                </div>
                <div className="absolute bottom-1 left-3 right-3 flex justify-between text-[9px] font-mono text-brand-muted/60">
                  <span>0 min</span>
                  <span>60 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200">
              Viscous soluble fiber and protein slow down intestinal absorption. Circulating glucose rises gradually, sparing pancreatic demand.
            </div>
          </div>

        </div>

        {/* Scientific Mechanism Callout */}
        <div className="p-5 rounded-2xl glass-panel border border-brand-lime/30 flex items-start gap-3.5 text-xs sm:text-sm text-brand-text/90 leading-relaxed">
          <Sparkles className="w-5 h-5 text-brand-lime flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-white mb-0.5">Biochemical Matrix Science:</p>
            <p className="text-brand-muted">{currentPair.science}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
