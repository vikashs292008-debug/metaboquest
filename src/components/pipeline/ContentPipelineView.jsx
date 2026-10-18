import React, { useState } from 'react';
import { 
  Workflow, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Layers, 
  Image as ImageIcon, 
  Video, 
  DownloadCloud,
  Check,
  RefreshCw
} from 'lucide-react';
import { PIPELINE_STAGES } from '../../utils/pipelineEngine';

export function ContentPipelineView({
  pipelineState,
  onRunEntirePipeline,
  onRerunStage,
  onNavigate,
  qualityAudit,
  carouselSlides = [],
  claimLedger = [],
  researchSources = []
}) {
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [activeStageDetail, setActiveStageDetail] = useState('stage_d');

  const handleRunAll = async () => {
    setIsRunningAll(true);
    await onRunEntirePipeline();
    setIsRunningAll(false);
  };

  const getStageStatus = (stageId) => {
    return pipelineState?.stageStatuses?.[stageId] || 'pending';
  };

  const getTargetViewForStage = (stageId) => {
    switch (stageId) {
      case 'stage_a': return 'research';
      case 'stage_b':
      case 'stage_c': return 'claims';
      case 'stage_d': return 'campaigns';
      case 'stage_e': return 'carousel';
      case 'stage_f': return 'quality';
      case 'stage_g': return 'exports';
      default: return 'overview';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Deterministic Content Engine
            </span>
            <span className="text-xs text-slate-400">
              7 Structured Stages with Mandatory Human Review Gates
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-1">
            Content Generation & Verification Pipeline
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            A repeatable production pipeline connecting authoritative clinical research, discrete factual claim ledgers, synchronized multi-format drafts, and medical compliance sign-offs.
          </p>
        </div>

        {/* Global Pipeline Runner */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRunAll}
            disabled={isRunningAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-glow-lime"
          >
            {isRunningAll ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run Entire Pipeline</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Stage Stepper + Stage Details & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: 7 Pipeline Stages (7 Cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pipeline Stages (A through G)
            </span>
            <span className="text-xs text-slate-400">
              Select any stage to inspect or rerun
            </span>
          </div>

          {PIPELINE_STAGES.map((stage) => {
            const status = getStageStatus(stage.id);
            const isCompleted = status === 'completed';
            const isNeedsReview = status === 'needs_review';
            const isSelected = activeStageDetail === stage.id;

            return (
              <div
                key={stage.id}
                onClick={() => setActiveStageDetail(stage.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#121B30] border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                    : isCompleted
                    ? 'bg-[#0E1526] border-white/10 hover:border-white/25'
                    : isNeedsReview
                    ? 'bg-amber-950/20 border-amber-500/30'
                    : 'bg-[#0B0F19] border-white/5 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  
                  {/* Stage Code & Name */}
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : isNeedsReview
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {stage.code}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-white text-sm">
                          {stage.name}
                        </h3>
                        {stage.requiresHumanReview && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                            Human Gate
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-medium">
                        {stage.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    ) : isNeedsReview ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                        <AlertCircle className="w-3 h-3" />
                        <span>Needs Review</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 px-2 py-0.5 rounded-full bg-slate-800">
                        <Clock className="w-3 h-3" />
                        <span>Pending</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 pl-11 flex items-center justify-between text-xs">
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {stage.description}
                  </p>
                  <span className="text-emerald-400 text-[11px] font-semibold shrink-0 ml-2">
                    Inspect ➔
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Stage Detail & Actions + Live Logs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Stage Detail Card */}
          {(() => {
            const currentStage = PIPELINE_STAGES.find(s => s.id === activeStageDetail) || PIPELINE_STAGES[3];
            const targetView = getTargetViewForStage(currentStage.id);

            return (
              <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-6 space-y-5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-xs">
                      {currentStage.code}
                    </span>
                    <h3 className="font-display font-bold text-white text-base">
                      Stage {currentStage.code}: {currentStage.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => onRerunStage(currentStage.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
                    title="Rerun this stage only"
                  >
                    <RotateCcw className="w-3 h-3 text-cyan-400" />
                    <span>Rerun Stage</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block">OBJECTIVE & METHOD:</span>
                    <p className="text-slate-200 mt-1 leading-relaxed">
                      {currentStage.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Medical Compliance Requirement
                    </span>
                    <p className="text-slate-300 text-[11px]">
                      {currentStage.requiresHumanReview
                        ? 'Mandatory Human Gate: This stage requires sign-off from a qualified editor or clinician. Automated algorithms flag heuristics, but human review establishes veracity.'
                        : 'Deterministic Template Engine: Executes rule-based synchronization across Carousel, Static Post, and Reel Script without external opaque API calls.'}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block">CORRESPONDING WORKSPACE:</span>
                    <button
                      onClick={() => onNavigate(targetView)}
                      className="mt-1.5 w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all text-xs font-semibold group"
                    >
                      <span className="capitalize">Open {targetView.replace('_', ' ')} Studio</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Live Run Log Box */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pipeline Execution History
              </span>
              <span className="text-[10px] text-slate-400">
                Timestamped Runs
              </span>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
              {pipelineState?.runLogs?.map((log) => (
                <div 
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{log.stageName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{log.message}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
