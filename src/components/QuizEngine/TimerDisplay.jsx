import React from 'react';
import { Clock, Coffee } from 'lucide-react';

export function TimerDisplay({ elapsedSeconds, isTimerEnabled, onToggleTimer }) {
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggleTimer}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-xs font-mono transition-all text-brand-muted hover:text-brand-text"
        title={isTimerEnabled ? 'Switch to relaxed mode' : 'Switch to timed mode'}
        aria-label={isTimerEnabled ? 'Timer enabled. Click for relaxed mode' : 'Relaxed mode. Click for timer'}
      >
        {isTimerEnabled ? (
          <>
            <Clock className="w-3.5 h-3.5 text-brand-lime animate-pulse" />
            <span className="text-brand-lime font-bold">{formatTime(elapsedSeconds)}</span>
            <span className="text-[10px] text-brand-muted/70">/ 90s goal</span>
          </>
        ) : (
          <>
            <Coffee className="w-3.5 h-3.5 text-brand-violet" />
            <span className="text-brand-violet font-semibold">Relaxed Mode</span>
          </>
        )}
      </button>
    </div>
  );
}
