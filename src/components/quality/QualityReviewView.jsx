import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  ArrowRight, 
  AlertCircle,
  FileText,
  Layers,
  Search,
  ExternalLink,
  Check
} from 'lucide-react';

export function QualityReviewView({
  qualityAudit,
  onRerunAudit,
  onNavigate,
  onSignOffHumanReview
}) {
  const [filterSeverity, setFilterSeverity] = useState('all'); // 'all' | 'error' | 'warning' | 'review_required'
  const [isSignedOff, setIsSignedOff] = useState(false);

  const { score = 100, isReadyForExport = true, issues = [], passedChecks = [], summary = {} } = qualityAudit || {};

  const handleSignOff = () => {
    setIsSignedOff(true);
    if (onSignOffHumanReview) onSignOffHumanReview();
  };

  const filteredIssues = issues.filter(issue => {
    if (filterSeverity === 'all') return true;
    return issue.severity === filterSeverity;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Evidence & Compliance Gate
            </span>
            <span className="text-xs text-slate-400">
              Deterministic Audits & Mandatory Medical Review
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-1">
            Quality Gate & Safeguard Audit
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Inspect automated heuristic scans, prohibited language filters, citation mappings, and human medical verification status before releasing campaign deliverables.
          </p>
        </div>

        {/* Action Button: Rerun Audit */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onRerunAudit}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Re-Run Quality Gate</span>
          </button>

          {!isSignedOff && (
            <button
              onClick={handleSignOff}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-glow-lime"
            >
              <Check className="w-4 h-4" />
              <span>Medical Sign-Off</span>
            </button>
          )}
        </div>
      </div>

      {/* Score Banner & Safeguard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Overall Score */}
        <div className="p-5 rounded-2xl bg-[#0E1526] border border-white/10 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Overall Compliance Score
          </span>
          <div className="my-3 flex items-baseline gap-2">
            <span className="text-4xl font-display font-black text-white">
              {score}%
            </span>
            <span className={`text-xs font-bold ${score >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {score >= 90 ? 'PASSED' : 'ACTION REQUIRED'}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            {summary.passed || 0} checks passed out of {summary.total || 0} rules
          </span>
        </div>

        {/* Blocking Errors */}
        <div className="p-5 rounded-2xl bg-[#0E1526] border border-white/10 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Blocking Errors
          </span>
          <div className="my-3 flex items-baseline gap-2">
            <span className={`text-4xl font-display font-black ${summary.errors > 0 ? 'text-red-400' : 'text-white'}`}>
              {summary.errors || 0}
            </span>
            <span className="text-xs text-slate-400">
              Must fix before export
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            {summary.errors === 0 ? '✓ Zero blocking violations' : 'Fix required in editor'}
          </span>
        </div>

        {/* Human Review Gate */}
        <div className="p-5 rounded-2xl bg-[#0E1526] border border-white/10 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Human Review Required
          </span>
          <div className="my-3 flex items-baseline gap-2">
            <span className={`text-4xl font-display font-black ${summary.reviewRequired > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {summary.reviewRequired || 0}
            </span>
            <span className="text-xs text-slate-400">
              Claims to verify
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            {summary.reviewRequired === 0 ? '✓ All active claims signed off' : 'Clinical check needed'}
          </span>
        </div>

        {/* Quality Status */}
        <div className="p-5 rounded-2xl bg-[#0E1526] border border-white/10 flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Export Approval Status
          </span>
          <div className="my-3 flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isReadyForExport ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
            <span className="text-lg font-display font-bold text-white">
              {isReadyForExport ? 'Approved for Export' : 'Blocked'}
            </span>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">
            {isReadyForExport ? 'Safe for multi-asset export' : 'Resolve blocking issues first'}
          </span>
        </div>

      </div>

      {/* Heuristic Transparency Notice */}
      <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-cyan-300">
            Medical Verification Transparency Notice
          </p>
          <p className="text-slate-300 leading-relaxed">
            Automated keyword filters and layout heuristics verify syntax, dimensions, text length, and known prohibited phrases (e.g., "cure", "miracle", "melt fat"). However, software cannot establish scientific validity on its own. Human review by a medical content editor is mandatory before final release.
          </p>
        </div>
      </div>

      {/* Issues & Warnings List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-bold text-white tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Audit Findings & Action Items ({issues.length})</span>
          </h2>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: 'All' },
              { id: 'error', label: `Errors (${summary.errors || 0})` },
              { id: 'warning', label: `Warnings (${summary.warnings || 0})` },
              { id: 'review_required', label: `Human Gates (${summary.reviewRequired || 0})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterSeverity(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filterSeverity === tab.id
                    ? 'bg-slate-800 text-white border border-white/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredIssues.length === 0 ? (
          <div className="p-6 rounded-2xl bg-[#0E1526] border border-emerald-500/30 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="font-display font-bold text-white text-base">
              No Issues Found in this Category
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              All tested content complies with evidence-based rules and formatting requirements.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredIssues.map((issue) => {
              const isErr = issue.severity === 'error';
              const isWarn = issue.severity === 'warning';
              const isReview = issue.severity === 'review_required';

              return (
                <div
                  key={issue.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    isErr 
                      ? 'bg-red-950/20 border-red-500/30'
                      : isWarn
                      ? 'bg-amber-950/20 border-amber-500/30'
                      : 'bg-violet-950/20 border-violet-500/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {isErr ? (
                        <XCircle className="w-5 h-5 text-red-400" />
                      ) : isWarn ? (
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-violet-400" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded ${
                          isErr 
                            ? 'bg-red-500/20 text-red-300' 
                            : isWarn 
                            ? 'bg-amber-500/20 text-amber-300' 
                            : 'bg-violet-500/20 text-violet-300'
                        }`}>
                          {issue.category} • {issue.severity.replace('_', ' ')}
                        </span>
                        <h4 className="font-display font-bold text-white text-sm">
                          {issue.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {issue.description}
                      </p>
                    </div>
                  </div>

                  {issue.targetView && (
                    <button
                      onClick={() => onNavigate(issue.targetView)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/30 text-xs font-semibold text-slate-200 hover:text-white shrink-0 self-start sm:self-auto transition-colors"
                    >
                      <span>Fix in {issue.targetView.replace('_', ' ')}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Passed Checks Accordion / List */}
      <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="font-display font-bold text-white text-sm">
              Verified Compliance Standards ({passedChecks.length})
            </h3>
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold">
            All Technical & Evidence Baselines Passed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {passedChecks.map((check) => (
            <div 
              key={check.id}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-slate-300"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{check.title}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
