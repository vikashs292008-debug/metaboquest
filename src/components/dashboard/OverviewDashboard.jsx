import React from 'react';
import { 
  Play, 
  Layers, 
  Image as ImageIcon, 
  Video, 
  BookOpen, 
  ShieldCheck, 
  Workflow, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  DownloadCloud, 
  AlertCircle,
  FileCheck,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { PIPELINE_STAGES } from '../../utils/pipelineEngine';

export function OverviewDashboard({
  campaignBrief,
  carouselSlides = [],
  staticPost = {},
  reelData = {},
  researchSources = [],
  claimLedger = [],
  pipelineState,
  qualityAudit,
  exportedAssetsCount = 0,
  onNavigate,
  onRunPipeline,
  onOpenDemoMode
}) {
  const verifiedSourcesCount = researchSources.filter(s => s.verificationStatus === 'verified').length;
  const verifiedClaimsCount = claimLedger.filter(c => c.reviewStatus === 'human_verified').length;
  const isPipelineComplete = pipelineState?.stageStatuses?.stage_f === 'completed';

  const workflowSteps = [
    { id: 'research', label: '1. Research', desc: `${verifiedSourcesCount} Verified`, view: 'research', status: 'completed' },
    { id: 'claims', label: '2. Claim Review', desc: `${verifiedClaimsCount} Claims Signed`, view: 'claims', status: 'completed' },
    { id: 'drafts', label: '3. Content Drafts', desc: '3 Assets Synced', view: 'pipeline', status: 'completed' },
    { id: 'design', label: '4. Visual Design', desc: 'Midnight Mint', view: 'carousel', status: 'completed' },
    { id: 'quality', label: '5. Quality Gate', desc: `${qualityAudit?.score || 100}% Passed`, view: 'quality', status: qualityAudit?.isReadyForExport ? 'completed' : 'needs_review' },
    { id: 'export', label: '6. Deliverables', desc: exportedAssetsCount > 0 ? `${exportedAssetsCount} Exported` : 'Ready', view: 'exports', status: exportedAssetsCount > 0 ? 'completed' : 'pending' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Studio Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0D1527] via-[#0A0F1D] to-[#070A12] p-6 sm:p-8 shadow-2xl">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Active Production
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-300 bg-slate-800/80 border border-white/10">
                Target: Young Adults & General Audience
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/25">
                Multi-Asset Campaign
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              {campaignBrief?.title || 'Metabolic Health Is More Than a Number'}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {campaignBrief?.tagline || 'Good health education. Beautifully communicated.'} — An evidence-grounded creative campaign designed to teach interconnected cellular biology without stigma or reductionism.
            </p>
          </div>

          {/* Prominent Quick Actions */}
          <div className="flex flex-wrap sm:flex-nowrap lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('carousel')}
              className="flex-1 lg:w-48 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-glow-lime"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Continue Campaign</span>
            </button>

            <button
              onClick={onRunPipeline}
              className="flex-1 lg:w-48 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/15 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <Workflow className="w-4 h-4 text-cyan-400" />
              <span>Run Pipeline</span>
            </button>

            <button
              onClick={() => onNavigate('preview')}
              className="flex-1 lg:w-48 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-200 border border-violet-500/30 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Preview All</span>
            </button>
          </div>
        </div>

        {/* Interactive Production Workflow Tracker */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Workflow className="w-3.5 h-3.5 text-cyan-400" />
              Production Stage Highway (Click to navigate)
            </span>
            <span className="text-xs font-medium text-emerald-400">
              {qualityAudit?.isReadyForExport ? '✓ Gate Approved for Export' : '⚠ Human Review Required'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {workflowSteps.map((step) => {
              const isDone = step.status === 'completed';
              const isNeedsReview = step.status === 'needs_review';

              return (
                <button
                  key={step.id}
                  onClick={() => onNavigate(step.view)}
                  className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                    isDone 
                      ? 'bg-slate-900/70 border-emerald-500/30 hover:border-emerald-500/60'
                      : isNeedsReview
                      ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-500/70'
                      : 'bg-slate-900/40 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                      {step.label}
                    </span>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : isNeedsReview ? (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </div>
                  <span className={`text-[11px] block truncate ${
                    isDone ? 'text-emerald-400/90' : isNeedsReview ? 'text-amber-400' : 'text-slate-400'
                  }`}>
                    {step.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4 Quantitative Application Status Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Sources Counter */}
        <div 
          onClick={() => onNavigate('research')}
          className="p-5 rounded-2xl bg-[#0F172A]/80 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Research Sources
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-extrabold text-white">
              {researchSources.length}
            </span>
            <span className="text-xs font-medium text-emerald-400">
              {verifiedSourcesCount} Verified
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            NIDDK, CDC, WHO, MedlinePlus repositories
          </p>
        </div>

        {/* Claims Counter */}
        <div 
          onClick={() => onNavigate('claims')}
          className="p-5 rounded-2xl bg-[#0F172A]/80 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Claim Ledger
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-extrabold text-white">
              {claimLedger.length}
            </span>
            <span className="text-xs font-medium text-emerald-400">
              {verifiedClaimsCount} Approved
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Human verified statements & 1 rejected check
          </p>
        </div>

        {/* Quality Audit Score */}
        <div 
          onClick={() => onNavigate('quality')}
          className="p-5 rounded-2xl bg-[#0F172A]/80 border border-white/10 hover:border-violet-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Quality Gate
            </span>
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-extrabold text-white">
              {qualityAudit?.score || 100}%
            </span>
            <span className="text-xs font-medium text-emerald-400">
              Clean Tone
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            {qualityAudit?.summary?.passed || 0} checks passed • 0 prohibited words
          </p>
        </div>

        {/* Exported Assets */}
        <div 
          onClick={() => onNavigate('exports')}
          className="p-5 rounded-2xl bg-[#0F172A]/80 border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Deliverables
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <DownloadCloud className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-extrabold text-white">
              3 / 3
            </span>
            <span className="text-xs font-medium text-emerald-400">
              Ready
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Carousel (6 slides), Static (4:5), Reel (9:16)
          </p>
        </div>

      </div>

      {/* 3 Coordinated Deliverable Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Campaign Deliverables Studio
          </h2>
          <span className="text-xs text-slate-400">
            All 3 assets share unified claims, citations, and Midnight Mint aesthetic
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Deliverable 1: 6-Slide Carousel */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300">
                  Deliverable 1
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  1080 × 1350 px (4:5)
                </span>
              </div>

              {/* Visual Thumbnail Simulator */}
              <div className="aspect-[4/5] rounded-xl bg-slate-900 border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>METABOQUEST</span>
                  <span className="text-emerald-400 font-bold">01 / 06</span>
                </div>
                <div className="space-y-1.5 my-auto">
                  <div className="w-12 h-1 rounded bg-emerald-400" />
                  <p className="font-display font-bold text-sm text-white leading-tight">
                    {carouselSlides[0]?.headline || 'Metabolic health is more than a number.'}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-3">
                    {carouselSlides[0]?.bodyText}
                  </p>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-slate-400">
                  <span>NIDDK • CDC • WHO</span>
                  <span>Swipe ➔</span>
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-white text-base">
                  Educational Carousel (6 Slides)
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Complete narrative hook, cellular glucose fuel, multi-biomarker mosaic, daily habits, and citations.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-emerald-400">
                ✓ 6 Slides Ready
              </span>
              <button
                onClick={() => onNavigate('carousel')}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-200 group-hover:text-emerald-300 transition-colors"
              >
                <span>Open Studio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Deliverable 2: Static Social Post */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-all group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300">
                  Deliverable 2
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  1080 × 1350 px (4:5)
                </span>
              </div>

              {/* Visual Thumbnail Simulator */}
              <div className="aspect-[4/5] rounded-xl bg-slate-900 border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>METABOQUEST</span>
                  <span className="text-cyan-400 font-bold">SINGLE POST</span>
                </div>
                <div className="space-y-2 my-auto text-center">
                  <div className="w-16 h-16 rounded-full border border-cyan-400/40 bg-cyan-400/10 mx-auto flex items-center justify-center text-cyan-300 font-bold text-xs shadow-inner">
                    NETWORK
                  </div>
                  <p className="font-display font-bold text-sm text-white leading-tight">
                    {staticPost.headline || 'Metabolic health is bigger than one number.'}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Glucose • Lipids • Blood Pressure • Sleep
                  </p>
                </div>
                <div className="pt-2 border-t border-white/5 text-[9px] text-slate-400 text-center">
                  Verified Evidence Base: NIDDK, CDC & WHO
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-white text-base">
                  Static Editorial Social Post
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  High-impact single graphic with interconnected cellular node motif, safe zones, and social caption.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-cyan-400">
                ✓ Ready for PNG Export
              </span>
              <button
                onClick={() => onNavigate('static_post')}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors"
              >
                <span>Open Studio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Deliverable 3: Short-Form Reel */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-5 flex flex-col justify-between hover:border-violet-500/40 transition-all group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300">
                  Deliverable 3
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  1080 × 1920 px (9:16)
                </span>
              </div>

              {/* Visual Thumbnail Simulator */}
              <div className="aspect-[4/5] rounded-xl bg-slate-900 border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-violet-500/30 transition-colors">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    ANIMATED REEL
                  </span>
                  <span className="text-violet-400 font-bold">{reelData?.totalDuration || 25}s</span>
                </div>
                <div className="space-y-2 my-auto text-center">
                  <div className="w-12 h-12 rounded-full border border-violet-400/40 bg-violet-500/10 mx-auto flex items-center justify-center text-violet-300 font-bold text-xs animate-pulse-slow">
                    ▶
                  </div>
                  <p className="font-display font-bold text-xs text-white leading-tight">
                    {reelData?.scenes?.[0]?.onScreenText || 'Think metabolic health is just about weight?'}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    5 Scenes • Kinetic Typography • Canvas Stream
                  </p>
                </div>
                <div className="pt-2 border-t border-white/5 text-[9px] text-slate-400 text-center">
                  Real WebM/MP4 Recording & SRT Subtitles
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-white text-base">
                  Short-Form Animated Reel
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  5-scene dynamic kinetic typography, moving cellular particles, scrub slider, and MediaRecorder export.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-violet-400">
                ✓ Animated Canvas Ready
              </span>
              <button
                onClick={() => onNavigate('reel')}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-200 group-hover:text-violet-300 transition-colors"
              >
                <span>Open Studio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Recent Pipeline Activity Stream */}
      <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <h3 className="font-display font-bold text-white text-sm">
              Live Pipeline Run Log
            </h3>
          </div>
          <button
            onClick={() => onNavigate('pipeline')}
            className="text-xs text-emerald-400 hover:underline"
          >
            View Full Pipeline Details ➔
          </button>
        </div>

        <div className="space-y-2.5">
          {pipelineState?.runLogs?.slice(-4).reverse().map((log) => (
            <div 
              key={log.id}
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs"
            >
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                log.type === 'success' ? 'bg-emerald-400' : 'bg-cyan-400'
              }`} />
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{log.stageName}</span>
                  <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                </div>
                <p className="text-slate-300 text-[11px]">{log.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
