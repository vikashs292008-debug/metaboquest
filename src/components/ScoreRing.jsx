import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ScoreRing({ 
  score = 0, 
  maxScore = 500, 
  size = 200, 
  strokeWidth = 14,
  archetypeColor = '#C6FF65'
}) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Animated counter
  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 20; // ms
    const totalSteps = duration / stepTime;
    const increment = score / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="relative flex flex-col items-center justify-center select-none" style={{ width: size, height: size }}>
      
      {/* Background Glow */}
      <div 
        className="absolute inset-0 rounded-full blur-2xl opacity-30 pointer-events-none"
        style={{ backgroundColor: archetypeColor }}
      />

      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Animated Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={archetypeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Inner Information Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">
          Knowledge Score
        </span>
        
        <div className="flex items-baseline gap-1 my-0.5">
          <span className="font-mono font-extrabold text-4xl sm:text-5xl tracking-tight text-white">
            {animatedScore}
          </span>
          <span className="text-xs text-brand-muted font-mono">
            /{maxScore}
          </span>
        </div>

        <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-brand-lime">
          <span>{Math.round(percentage)}% Accuracy</span>
        </div>
      </div>

    </div>
  );
}
