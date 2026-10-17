import React, { useState } from 'react';
import { ShieldCheck, Calculator, ArrowRight, HeartPulse, Info, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

const BIOMARKERS = [
  {
    name: 'Triglyceride-to-HDL Ratio',
    optimal: '< 1.5 (in mg/dL)',
    borderline: '1.5 – 3.0',
    elevated: '> 3.0',
    why: 'Strong surrogate marker of hepatic insulin resistance, small dense atherogenic LDL particle predominance, and vascular inflammation.',
    source: 'Circulation (American Heart Association Journal)'
  },
  {
    name: 'Fasting Serum Insulin',
    optimal: '2.0 – 6.0 uIU/mL',
    borderline: '6.1 – 10.0 uIU/mL',
    elevated: '> 10.0 uIU/mL',
    why: 'The pancreas often secretes 3x to 5x higher fasting insulin to keep blood sugar normal for 10-15 years before glucose ever rises.',
    source: 'Kraft Pathologic Patterns / Diabetes Care'
  },
  {
    name: 'Fasting Plasma Glucose',
    optimal: '72 – 90 mg/dL',
    borderline: '91 – 99 mg/dL',
    elevated: '≥ 100 mg/dL',
    why: 'Measures basal glucose output from the liver after an 8–12 hour overnight fast.',
    source: 'American Diabetes Association (ADA)'
  },
  {
    name: 'Glycated Hemoglobin (HbA1c)',
    optimal: '< 5.4%',
    borderline: '5.5% – 5.6%',
    elevated: '≥ 5.7% (Prediabetes)',
    why: 'Measures the percentage of hemoglobin coated in glucose, reflecting average glycation over the 90–120 day lifespan of red blood cells.',
    source: 'National Institutes of Health (NIH)'
  },
  {
    name: 'High-Sensitivity CRP (hs-CRP)',
    optimal: '< 0.8 mg/L',
    borderline: '0.8 – 2.0 mg/L',
    elevated: '> 3.0 mg/L',
    why: 'Acute-phase hepatic reactant indicating systemic vascular and endothelial low-grade inflammation.',
    source: 'Centers for Disease Control & Prevention (CDC)'
  }
];

export function BiomarkerLabGuide() {
  const [triglycerides, setTriglycerides] = useState(120);
  const [hdl, setHdl] = useState(55);

  const ratio = (triglycerides / (hdl || 1)).toFixed(2);
  const ratioNum = parseFloat(ratio);

  let ratioColor = '#34D399'; // Emerald
  let ratioTier = 'Optimal Metabolic Sensitivity (< 1.5)';
  if (ratioNum >= 3.0) {
    ratioColor = '#F87171'; // Rose
    ratioTier = 'Elevated Surrogate Risk (> 3.0)';
  } else if (ratioNum >= 1.5) {
    ratioColor = '#FBBF24'; // Amber
    ratioTier = 'Moderate / Borderline (1.5 – 3.0)';
  }

  const handleSliderChange = (setter, val) => {
    sound.playSelect();
    setter(val);
  };

  return (
    <section id="biomarker-guide" className="py-20 relative overflow-hidden bg-brand-surface/30 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-xs font-bold text-brand-lime uppercase tracking-widest mb-3">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>CLINICAL REFERENCE TOOL</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text">
            Biomarker Decoders & TG/HDL Calculator
          </h2>
          <p className="text-sm sm:text-base text-brand-muted mt-2">
            Calculate your Triglyceride-to-HDL ratio live and understand what your routine lab markers actually mean.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive TG/HDL Ratio Calculator */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel-elevated border border-brand-lime/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-lime flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                <span>Live Ratio Calculator</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-brand-muted font-mono">mg/dL units</span>
            </div>

            {/* Triglycerides Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-brand-text">
                <span>Fasting Triglycerides</span>
                <span className="font-mono text-brand-lime font-bold">{triglycerides} mg/dL</span>
              </div>
              <input
                type="range"
                min="40"
                max="300"
                step="5"
                value={triglycerides}
                onChange={(e) => handleSliderChange(setTriglycerides, Number(e.target.value))}
                className="w-full accent-[#C6FF65] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-brand-muted">
                <span>40 (Low)</span>
                <span>150 (Borderline)</span>
                <span>300 (High)</span>
              </div>
            </div>

            {/* HDL Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-brand-text">
                <span>Fasting HDL Cholesterol</span>
                <span className="font-mono text-brand-violet font-bold">{hdl} mg/dL</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="2"
                value={hdl}
                onChange={(e) => handleSliderChange(setHdl, Number(e.target.value))}
                className="w-full accent-[#A78BFA] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-brand-muted">
                <span>20 (Low)</span>
                <span>50 (Target)</span>
                <span>100 (Optimal)</span>
              </div>
            </div>

            {/* Calculated Ratio Display Box */}
            <div className="p-4 rounded-2xl bg-brand-surface border border-white/10 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">
                Triglyceride / HDL Ratio
              </span>
              <div className="font-mono font-extrabold text-3xl" style={{ color: ratioColor }}>
                {ratio}
              </div>
              <span 
                className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border mt-1"
                style={{
                  backgroundColor: `${ratioColor}15`,
                  borderColor: `${ratioColor}40`,
                  color: ratioColor
                }}
              >
                {ratioTier}
              </span>
            </div>

            <p className="text-[11px] text-brand-muted/80 leading-relaxed italic border-t border-white/5 pt-3">
              Surrogate indicator for insulin resistance. Ratios above 3.0 correlate with higher predominance of small dense LDL particles. Always interpret laboratory tests with a qualified physician.
            </p>
          </div>

          {/* Right Column: Biomarkers Reference Cards */}
          <div className="lg:col-span-7 space-y-3">
            {BIOMARKERS.map((bio, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-display font-bold text-base text-brand-text">
                    {bio.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-emerald-400 font-semibold">{bio.optimal}</span>
                    <span className="text-white/20">|</span>
                    <span className="text-rose-400/80">{bio.elevated}</span>
                  </div>
                </div>

                <p className="text-xs text-brand-muted leading-relaxed">
                  {bio.why}
                </p>

                <p className="text-[10px] text-brand-muted/70 italic pt-1 border-t border-white/5">
                  Authority: {bio.source}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
