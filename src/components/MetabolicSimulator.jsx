import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Moon, Clock, Flame, ShieldAlert, Sparkles, RefreshCw, Info } from 'lucide-react';
import { sound } from '../utils/audio';

const MEAL_TYPES = {
  REFINED: {
    id: 'REFINED',
    label: 'Refined Carbs & Sugars',
    desc: 'White bagel, sugary soda, french fries (low fiber, high glycemic load)',
    carbs: 75,
    fiber: 1,
    protein: 4,
    basePeak: 175,
    riseSpeed: 30,
    insulinMultiplier: 1.8
  },
  BALANCED: {
    id: 'BALANCED',
    label: 'Standard Mixed Plate',
    desc: 'Brown rice, grilled chicken breast, mixed salad with olive oil',
    carbs: 55,
    fiber: 6,
    protein: 30,
    basePeak: 135,
    riseSpeed: 45,
    insulinMultiplier: 1.2
  },
  OPTIMAL: {
    id: 'OPTIMAL',
    label: 'High-Fiber & Protein Matrix',
    desc: 'Wild salmon, lentils, broccoli, avocado, flaxseed (high viscous fiber)',
    carbs: 35,
    fiber: 14,
    protein: 38,
    basePeak: 115,
    riseSpeed: 60,
    insulinMultiplier: 0.8
  }
};

const MOVEMENT_TYPES = {
  SEDENTARY: {
    id: 'SEDENTARY',
    label: 'Sedentary (Desk/Couch)',
    desc: 'Remaining seated immediately following the meal',
    glut4Bonus: 0,
    peakDelta: 0,
    durationDelta: 0
  },
  WALK: {
    id: 'WALK',
    label: '15-Min Post-Meal Walk',
    desc: 'Gentle ambulation engaging quads, hamstrings, and calves',
    glut4Bonus: 35,
    peakDelta: -28,
    durationDelta: -30
  },
  SOLEUS: {
    id: 'SOLEUS',
    label: 'Soleus Calf Pumps / Squats',
    desc: 'Repeated slow-twitch oxidative muscle contractions',
    glut4Bonus: 45,
    peakDelta: -35,
    durationDelta: -40
  }
};

const SLEEP_STATUS = {
  RESTED: {
    id: 'RESTED',
    label: '8 Hours Restful Sleep',
    desc: 'Optimal baseline peripheral insulin sensitivity',
    resistanceFactor: 1.0
  },
  DEPRIVED: {
    id: 'DEPRIVED',
    label: '4 Hours Sleep Deprived',
    desc: 'Elevated daytime cortisol and ~25% acute peripheral insulin resistance',
    resistanceFactor: 1.35
  }
};

const TIMING_OPTIONS = {
  DAY: {
    id: 'DAY',
    label: '12:30 PM (Midday)',
    desc: 'Circadian insulin sensitivity is at its diurnal peak',
    circadianFactor: 1.0
  },
  NIGHT: {
    id: 'NIGHT',
    label: '10:30 PM (Late Night)',
    desc: 'Melatonin secretion downregulates pancreatic beta-cell insulin output',
    circadianFactor: 1.25
  }
};

export function MetabolicSimulator() {
  const [selectedMeal, setSelectedMeal] = useState(MEAL_TYPES.BALANCED);
  const [selectedMovement, setSelectedMovement] = useState(MOVEMENT_TYPES.WALK);
  const [selectedSleep, setSelectedSleep] = useState(SLEEP_STATUS.RESTED);
  const [selectedTiming, setSelectedTiming] = useState(TIMING_OPTIONS.DAY);

  // Compute curve points deterministically
  const simulation = useMemo(() => {
    const basePeak = selectedMeal.basePeak;
    const movementMod = selectedMovement.peakDelta;
    const sleepMod = selectedSleep.resistanceFactor;
    const timingMod = selectedTiming.circadianFactor;

    // Estimated Peak Glucose
    const estimatedPeak = Math.round(
      (basePeak + movementMod) * (1 + (sleepMod - 1) * 0.5) * (1 + (timingMod - 1) * 0.4)
    );

    const baselineGlucose = 85;
    const points = [];
    const totalMinutes = 240; // 4 hours
    const step = 10;

    // Peak time shifts earlier with refined carbs, flattened with movement/fiber
    const peakTime = Math.max(30, selectedMeal.riseSpeed + (selectedMovement.id !== 'SEDENTARY' ? -10 : 10));

    for (let t = 0; t <= totalMinutes; t += step) {
      let g = baselineGlucose;
      if (t <= peakTime) {
        // Upswing
        const progress = t / peakTime;
        g = baselineGlucose + (estimatedPeak - baselineGlucose) * Math.sin((progress * Math.PI) / 2);
      } else {
        // Downswing
        const recoveryProgress = (t - peakTime) / (totalMinutes - peakTime);
        const tail = Math.exp(-recoveryProgress * 2.5);
        g = baselineGlucose + (estimatedPeak - baselineGlucose) * tail;
      }
      points.push({ time: t, glucose: Math.round(g) });
    }

    // Time-in-target calculation (70 - 130 mg/dL)
    const inRangeCount = points.filter(p => p.glucose <= 130).length;
    const timeInRangePct = Math.round((inRangeCount / points.length) * 100);

    // Insulin burden score
    const rawInsulin = Math.round(
      selectedMeal.insulinMultiplier * selectedSleep.resistanceFactor * selectedTiming.circadianFactor * (selectedMovement.id === 'SEDENTARY' ? 1.4 : 0.8) * 10
    );

    return {
      points,
      estimatedPeak,
      timeInRangePct,
      insulinBurden: rawInsulin > 18 ? 'High' : rawInsulin > 12 ? 'Moderate' : 'Low',
      insulinColor: rawInsulin > 18 ? '#F87171' : rawInsulin > 12 ? '#FBBF24' : '#34D399',
      glut4Activation: selectedMovement.glut4Bonus + (selectedMeal.fiber > 10 ? 15 : 0)
    };
  }, [selectedMeal, selectedMovement, selectedSleep, selectedTiming]);

  // Convert points to SVG coordinates (width: 600, height: 200)
  const svgPath = useMemo(() => {
    const width = 600;
    const height = 180;
    const minG = 60;
    const maxG = 220;

    const coords = simulation.points.map(p => {
      const x = (p.time / 240) * width;
      const y = height - ((p.glucose - minG) / (maxG - minG)) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return `M ${coords.join(' L ')}`;
  }, [simulation]);

  const handleSelectOption = (setter, val) => {
    sound.playSelect();
    setter(val);
  };

  return (
    <section id="metabolic-simulator" className="py-20 relative overflow-hidden bg-brand-surface/30 border-y border-white/5">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-brand-lime/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-brand-violet/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-xs font-bold text-brand-lime uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>INTERACTIVE METABOLIC LABORATORY</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text">
            Simulate Your Metabolic Response
          </h2>

          <p className="text-sm sm:text-base text-brand-muted mt-3 leading-relaxed">
            Adjust the nutritional, movement, sleep, and circadian levers below. Watch in real time how skeletal muscle contraction and dietary fiber reshape your simulated postprandial glucose and insulin trajectory.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Control 1: Meal Composition */}
            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-text">
                <span className="flex items-center gap-1.5 text-brand-lime">
                  <Flame className="w-4 h-4" />
                  <span>1. Meal Nutritional Architecture</span>
                </span>
                <span className="text-brand-muted font-mono">{selectedMeal.carbs}g Carbs • {selectedMeal.fiber}g Fiber</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {Object.values(MEAL_TYPES).map(meal => (
                  <button
                    key={meal.id}
                    onClick={() => handleSelectOption(setSelectedMeal, meal)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedMeal.id === meal.id
                        ? 'bg-brand-lime/15 border-brand-lime text-brand-lime font-bold shadow-sm'
                        : 'bg-brand-card/60 border-white/5 text-brand-muted hover:border-white/20'
                    }`}
                  >
                    <p className="font-semibold text-brand-text mb-0.5">{meal.label}</p>
                    <p className="text-[10px] text-brand-muted/80 line-clamp-2">{meal.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Post-Meal Movement */}
            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-text">
                <span className="flex items-center gap-1.5 text-brand-violet">
                  <Activity className="w-4 h-4" />
                  <span>2. Physical Movement Trigger</span>
                </span>
                <span className="text-brand-lime font-mono text-[11px]">GLUT4: +{selectedMovement.glut4Bonus}%</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {Object.values(MOVEMENT_TYPES).map(mov => (
                  <button
                    key={mov.id}
                    onClick={() => handleSelectOption(setSelectedMovement, mov)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedMovement.id === mov.id
                        ? 'bg-brand-violet/20 border-brand-violet text-brand-violet font-bold shadow-sm'
                        : 'bg-brand-card/60 border-white/5 text-brand-muted hover:border-white/20'
                    }`}
                  >
                    <p className="font-semibold text-brand-text mb-0.5">{mov.label}</p>
                    <p className="text-[10px] text-brand-muted/80 line-clamp-2">{mov.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3 & 4: Sleep & Circadian Timing (2 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Sleep */}
              <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400">
                  <Moon className="w-4 h-4" />
                  <span>3. Sleep Quality</span>
                </span>
                <div className="space-y-2">
                  {Object.values(SLEEP_STATUS).map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleSelectOption(setSelectedSleep, s)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                        selectedSleep.id === s.id
                          ? 'bg-blue-500/15 border-blue-400 text-blue-300 font-bold'
                          : 'bg-brand-card/60 border-white/5 text-brand-muted hover:border-white/20'
                      }`}
                    >
                      <p className="font-semibold text-brand-text">{s.label}</p>
                      <p className="text-[10px] text-brand-muted/80">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timing */}
              <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Clock className="w-4 h-4" />
                  <span>4. Meal Clock Timing</span>
                </span>
                <div className="space-y-2">
                  {Object.values(TIMING_OPTIONS).map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleSelectOption(setSelectedTiming, t)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                        selectedTiming.id === t.id
                          ? 'bg-amber-500/15 border-amber-400 text-amber-300 font-bold'
                          : 'bg-brand-card/60 border-white/5 text-brand-muted hover:border-white/20'
                      }`}
                    >
                      <p className="font-semibold text-brand-text">{t.label}</p>
                      <p className="text-[10px] text-brand-muted/80">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Real-Time Dynamic Curve & Biometric Dashboard */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-white/15 shadow-2xl relative">
              
              {/* Header metrics row */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Simulated Postprandial Curve</span>
                  <h3 className="font-display font-bold text-lg text-brand-text">Blood Glucose & Kinetic Clearance</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-lime animate-ping" />
                  <span className="text-xs font-mono font-bold text-brand-lime">LIVE CALCULATION</span>
                </div>
              </div>

              {/* SVG Curve Plot */}
              <div className="relative w-full aspect-[3/1.4] bg-[#070A0F] rounded-2xl border border-white/10 p-4 overflow-hidden select-none">
                
                {/* Background Grid Lines */}
                <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 pointer-events-none opacity-20">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="border-b border-r border-white/20" />
                  ))}
                </div>

                {/* Target Range Highlight Band (70 - 120 mg/dL) */}
                <div 
                  className="absolute left-0 right-0 bg-emerald-500/10 border-y border-emerald-500/20 pointer-events-none"
                  style={{ bottom: '15%', height: '42%' }}
                >
                  <span className="absolute right-2 top-1 text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                    Optimal Euglycemic Target (70-120 mg/dL)
                  </span>
                </div>

                {/* SVG Curve Line */}
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 180" preserveAspectRatio="none">
                  {/* Subtle Gradient fill under curve */}
                  <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C6FF65" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#C6FF65" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <path
                    d={`${svgPath} L 600,180 L 0,180 Z`}
                    fill="url(#curveGradient)"
                  />

                  <motion.path
                    d={svgPath}
                    fill="none"
                    stroke="#C6FF65"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </svg>

                {/* X Axis Time Labels */}
                <div className="absolute bottom-1 left-4 right-4 flex justify-between text-[10px] font-mono text-brand-muted/70">
                  <span>0 min (Meal)</span>
                  <span>60 min</span>
                  <span>120 min</span>
                  <span>180 min</span>
                  <span>240 min (4h)</span>
                </div>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                
                <div className="p-3.5 rounded-xl bg-brand-surface border border-white/10 text-center">
                  <span className="block text-[10px] font-bold text-brand-muted uppercase">Peak Glucose</span>
                  <span className={`font-mono font-extrabold text-xl ${simulation.estimatedPeak > 150 ? 'text-rose-400' : 'text-brand-lime'}`}>
                    {simulation.estimatedPeak} <span className="text-[11px] font-normal text-brand-muted">mg/dL</span>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-brand-surface border border-white/10 text-center">
                  <span className="block text-[10px] font-bold text-brand-muted uppercase">Time In Target</span>
                  <span className="font-mono font-extrabold text-xl text-white">
                    {simulation.timeInRangePct}%
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-brand-surface border border-white/10 text-center">
                  <span className="block text-[10px] font-bold text-brand-muted uppercase">Insulin Burden</span>
                  <span className="font-mono font-extrabold text-xl" style={{ color: simulation.insulinColor }}>
                    {simulation.insulinBurden}
                  </span>
                </div>

              </div>

              {/* Dynamic Physiological Explanation */}
              <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-brand-text/90 leading-relaxed">
                <Info className="w-4 h-4 text-brand-lime flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-0.5">Cellular Mechanism In Action:</p>
                  <p className="text-brand-muted">
                    {selectedMovement.id !== 'SEDENTARY'
                      ? 'Contracting muscle fibers bypass impaired insulin cascades by translocating GLUT4 glucose transporters directly to cell membranes. This blunts the glycemic spike and reduces pancreatic beta-cell fatigue.'
                      : 'Without muscle contraction, clearance depends entirely on insulin receptor activation. High glycemic meals combined with sleep debt or late-night timing demand higher insulin output to dispose of the same glucose load.'}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
