import React from 'react';
import { motion } from 'framer-motion';

export function QuizProgressBar({ currentStep, totalSteps, score, maxScore }) {
  const progressPercent = Math.min(100, Math.round(((currentStep) / totalSteps) * 100));

  return (
    <div className="w-full space-y-2 select-none" role="progressbar" aria-valuenow={progressPercent} aria-valuemin="0" aria-valuemax="100">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-brand-muted">
          Question <span className="text-brand-lime font-mono">{currentStep}</span> of <span className="font-mono">{totalSteps}</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-brand-muted">Current Score:</span>
          <span className="font-mono text-brand-lime font-bold">{score} pts</span>
        </div>
      </div>

      <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden relative">
        <motion.div 
          className="h-full bg-gradient-to-r from-brand-lime via-[#b5f34d] to-brand-violet rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
