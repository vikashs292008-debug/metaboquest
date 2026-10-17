import React, { useState } from 'react';
import { History, X, Trophy, Flame, Calendar, Trash2, ArrowRight } from 'lucide-react';
import { getQuestHistory, clearQuestHistory } from '../utils/persistence';
import { sound } from '../utils/audio';

export function QuestHistoryModal({ isOpen, onClose, onLaunchQuest }) {
  const [history, setHistory] = useState(() => getQuestHistory());

  if (!isOpen) return null;

  const totalRuns = history.length;
  const bestScore = totalRuns > 0 ? Math.max(...history.map(h => h.score)) : 0;
  const avgScore = totalRuns > 0 ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / totalRuns) : 0;

  // Build a 28-day activity heatmap
  const days = Array.from({ length: 28 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const key = `${year}-${month}-${day}`;
    const count = history.filter(h => h.dateKey === key).length;
    return { date: key, count, dayNum: d.getDate() };
  });

  const handleClear = () => {
    sound.playSelect();
    if (window.confirm('Clear your local quest history on this device?')) {
      clearQuestHistory();
      setHistory([]);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-bg/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-title"
    >
      <div className="w-full max-w-xl my-6 p-6 sm:p-8 rounded-3xl bg-brand-surface border border-white/10 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 id="history-title" className="font-display font-bold text-lg text-brand-text">
                Your Quest History & Activity
              </h2>
              <p className="text-xs text-brand-muted">
                Tracked locally on this device • Zero cloud tracking
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

        {/* Top Summary Metric Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-brand-card border border-white/10 text-center">
            <span className="block text-[10px] uppercase font-bold text-brand-muted">Total Quests</span>
            <span className="font-mono font-extrabold text-xl text-brand-text">{totalRuns}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-brand-card border border-white/10 text-center">
            <span className="block text-[10px] uppercase font-bold text-brand-muted">Best Score</span>
            <span className="font-mono font-extrabold text-xl text-brand-lime">{bestScore} <span className="text-[10px] font-normal text-brand-muted">pts</span></span>
          </div>

          <div className="p-3.5 rounded-xl bg-brand-card border border-white/10 text-center">
            <span className="block text-[10px] uppercase font-bold text-brand-muted">Avg Score</span>
            <span className="font-mono font-extrabold text-xl text-brand-violet">{avgScore} <span className="text-[10px] font-normal text-brand-muted">pts</span></span>
          </div>
        </div>

        {/* 28-Day Activity Heatmap */}
        <div className="mb-6 p-4 rounded-2xl bg-brand-card/50 border border-white/5">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-brand-text uppercase tracking-wider text-[10px]">
              28-Day Consistency Grid
            </span>
            <span className="text-brand-muted text-[10px]">Recent activity</span>
          </div>
          
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((d, i) => {
              let bg = 'bg-white/5';
              if (d.count >= 3) bg = 'bg-brand-lime shadow-glow-lime';
              else if (d.count === 2) bg = 'bg-brand-lime/70';
              else if (d.count === 1) bg = 'bg-brand-lime/30 border border-brand-lime/40';

              return (
                <div 
                  key={i} 
                  className={`aspect-square rounded-md flex items-center justify-center text-[9px] font-mono transition-colors ${bg} ${d.count > 0 ? 'text-brand-bg font-bold' : 'text-brand-muted/40'}`}
                  title={`${d.date}: ${d.count} quest(s)`}
                >
                  {d.dayNum}
                </div>
              );
            })}
          </div>
        </div>

        {/* Attempts Log */}
        <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1">
          {history.length === 0 ? (
            <div className="text-center py-8 text-brand-muted text-xs">
              No quests recorded yet. Complete your first quest to start your journey!
            </div>
          ) : (
            history.map((record) => (
              <div
                key={record.id}
                className="p-3 rounded-xl bg-brand-card/80 border border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-brand-text">{record.archetypeTitle}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-mono bg-white/5 text-brand-muted">
                      {record.mode}
                    </span>
                  </div>
                  <span className="text-[10px] text-brand-muted">{record.date}</span>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-brand-lime text-sm">
                    {record.score} / {record.maxScore}
                  </span>
                  <span className="block text-[10px] text-brand-muted">{record.accuracyPercent}% accuracy</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-xs text-rose-400/80 hover:text-rose-300 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}

          <div className="ml-auto flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-brand-muted hover:text-brand-text"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onLaunchQuest();
              }}
              className="px-5 py-2 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-xs hover:bg-[#d4ff80] transition-all flex items-center gap-1.5"
            >
              <span>Play Quest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
