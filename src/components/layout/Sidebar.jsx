import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Workflow, 
  Layers, 
  Image as ImageIcon, 
  Video, 
  ShieldCheck, 
  DownloadCloud, 
  Settings, 
  Gamepad2, 
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Wordmark } from '../common/Wordmark';

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
  { id: 'campaigns', label: 'Campaign Brief', icon: FileText, badge: null },
  { id: 'research', label: 'Research Library', icon: BookOpen, badgeKey: 'sourcesCount' },
  { id: 'claims', label: 'Claim Ledger', icon: ShieldCheck, badgeKey: 'claimsCount' },
  { id: 'pipeline', label: 'Content Pipeline', icon: Workflow, badgeKey: 'pipelineStep' },
  { id: 'carousel', label: 'Carousel Studio', icon: Layers, badge: '6 Slides' },
  { id: 'static_post', label: 'Static Post Studio', icon: ImageIcon, badge: '1080x1350' },
  { id: 'reel', label: 'Reel Studio', icon: Video, badge: '9:16 Video' },
  { id: 'quality', label: 'Quality Review', icon: ShieldCheck, badgeKey: 'qualityScore' },
  { id: 'exports', label: 'Exports Hub', icon: DownloadCloud, badge: null }
];

export function Sidebar({
  currentView,
  onNavigate,
  isMobileOpen,
  onCloseMobile,
  sourcesCount = 6,
  claimsCount = 7,
  qualityScore = 100,
  onOpenSettings,
  onSwitchToConsumerQuiz
}) {
  const getBadgeValue = (item) => {
    if (item.badge) return item.badge;
    if (item.badgeKey === 'sourcesCount') return `${sourcesCount}`;
    if (item.badgeKey === 'claimsCount') return `${claimsCount}`;
    if (item.badgeKey === 'qualityScore') return `${qualityScore}%`;
    return null;
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#080C14] border-r border-white/10 w-64 select-none">
      
      {/* Studio Header & Wordmark */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Wordmark size="md" />
        {isMobileOpen && (
          <button 
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/50"
            aria-label="Close Navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Studio Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Studio Workspaces
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          const badgeVal = getBadgeValue(item);

          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {badgeVal && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-emerald-500/25 text-emerald-200' 
                    : item.id === 'quality' && qualityScore < 90
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {badgeVal}
                </span>
              )}
            </button>
          );
        })}

        {/* Separator */}
        <div className="pt-4 pb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Companion Tools
        </div>

        {/* Companion Interactive Quiz link (preserves existing code!) */}
        <button
          onClick={() => {
            if (onSwitchToConsumerQuiz) onSwitchToConsumerQuiz();
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <Gamepad2 className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col text-left">
              <span>Interactive Quiz & Lab</span>
              <span className="text-[10px] text-slate-400 font-normal">Consumer companion</span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>

      {/* Footer User & Environment Info */}
      <div className="p-3 border-t border-white/10 bg-[#060910] space-y-2">
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400">Audience Setting</span>
            <span className="text-xs font-semibold text-slate-200">Young Adults & General</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-glow-lime" />
        </div>

        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Studio Settings & Storage</span>
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block shrink-0 sticky top-0 h-screen z-30">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 max-w-[280px] z-10 animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
