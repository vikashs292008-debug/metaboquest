import React from 'react';
import { 
  Sparkles, 
  Eye, 
  Download, 
  Menu, 
  Settings, 
  CheckCircle2, 
  Layers, 
  HelpCircle,
  Activity
} from 'lucide-react';
import { Wordmark } from '../common/Wordmark';

export function TopNav({
  campaignTitle,
  currentView,
  onNavigate,
  onOpenDemoMode,
  onOpenSettings,
  onToggleMobileMenu,
  pipelineStatus = 'Stage D: Drafts Ready',
  isSaved = true,
  qualityScore = 100
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090D16]/90 backdrop-blur-md px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu Toggle + Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg bg-slate-800/60 text-slate-300 hover:text-white border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="md:hidden">
            <Wordmark size="sm" />
          </div>

          {/* Desktop Campaign Indicator */}
          <div className="hidden lg:flex items-center gap-3 pl-2 border-l border-white/10">
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Active Campaign
              </span>
              <span className="text-sm font-semibold text-white tracking-tight truncate max-w-[280px]">
                {campaignTitle || 'Metabolic Health Is More Than a Number'}
              </span>
            </div>

            {/* Storage status indicator */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-medium text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Saved locally</span>
            </div>
          </div>
        </div>

        {/* Center: Pipeline & Quality Status Pills */}
        <div className="hidden md:flex items-center gap-2">
          <button 
            onClick={() => onNavigate('pipeline')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs font-medium text-slate-300 hover:border-emerald-500/50 hover:text-white transition-all shadow-sm"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>{pipelineStatus}</span>
          </button>

          <button 
            onClick={() => onNavigate('quality')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gate: {qualityScore}% Verified</span>
          </button>
        </div>

        {/* Right: Actions (Demo Mode, Preview All, Export, Settings) */}
        <div className="flex items-center gap-2">
          {/* Hackathon Demo Mode Pill */}
          <button
            onClick={onOpenDemoMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/30 to-purple-600/30 border border-violet-500/40 text-violet-200 text-xs font-semibold hover:from-violet-600/50 hover:to-purple-600/50 hover:border-violet-400 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
            <span className="hidden sm:inline">Presentation Demo</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* Preview All Assets */}
          <button
            onClick={() => onNavigate('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              currentView === 'preview'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-900/80 text-slate-300 border-white/10 hover:border-white/25 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Preview All</span>
          </button>

          {/* Export Campaign Button */}
          <button
            onClick={() => onNavigate('exports')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all shadow-glow-lime"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Assets</span>
            <span className="sm:hidden">Export</span>
          </button>

          {/* Settings Modal Button */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg bg-slate-900/80 text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
