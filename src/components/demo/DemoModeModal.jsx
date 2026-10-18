import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Target, 
  BookOpen, 
  ShieldCheck, 
  Workflow, 
  Layers, 
  Image as ImageIcon, 
  Video, 
  DownloadCloud,
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';

const DEMO_STEPS = [
  {
    step: 1,
    title: 'The Challenge & The Solution',
    category: 'Executive Pitch',
    icon: Sparkles,
    content: {
      problem: 'Accurate metabolic health education is critically needed, yet young adults are flooded with viral pseudoscience, rapid "detox" hacks, and guilt-driven numbers. Creators struggle to balance rigorous evidence with eye-catching design.',
      solution: 'MetaboQuest Content Lab is a turnkey creative studio that bridges authoritative public health research with high-end motion design and multi-format social content creation.',
      differentiator: 'Traceable claim ledger and mandatory human medical review gates—every single graphic and video statement is linked to an exact NIH, CDC, or WHO citation.',
      impact: 'Enables creators and health institutions to produce beautiful, respectful, evidence-based educational campaigns in minutes.'
    }
  },
  {
    step: 2,
    title: 'Campaign Directive & Strategy',
    category: 'Strategy',
    icon: Target,
    targetView: 'campaigns',
    highlight: 'Metabolic health involves multiple interconnected biological systems; one number alone cannot describe the whole picture.',
    details: 'The studio operates from an editable structured brief defining audience safeguards, positive non-judgmental tone, and strict prohibited terms (e.g., "cure", "melt fat", "overnight fix").'
  },
  {
    step: 3,
    title: 'Documented Primary Sources',
    category: 'Evidence',
    icon: BookOpen,
    targetView: 'research',
    highlight: '6 Authoritative Sources Documented from NIH, CDC, WHO & MedlinePlus',
    details: 'No fabricated citations or opaque hallucinated URLs. Every record includes exact government URLs, publication dates, and specific cellular findings.'
  },
  {
    step: 4,
    title: 'Claim Ledger & Verification Ledger',
    category: 'Safeguards',
    icon: ShieldCheck,
    targetView: 'claims',
    highlight: 'Discrete Factual Assertions with Mandatory Human Sign-Off',
    details: 'Having a source URL is not proof of support. The ledger maps each factual assertion to its exact scene/slide location and enforces human verification. Unsupported claims are flagged and rejected.'
  },
  {
    step: 5,
    title: 'Repeatable Content Pipeline',
    category: 'Automation',
    icon: Workflow,
    targetView: 'pipeline',
    highlight: '7 Structured Stages (Stages A through G) with Execution History',
    details: 'A deterministic template engine produces coordinated drafts across all three formats, with live timestamps, error recovery, and stage rerun capabilities.'
  },
  {
    step: 6,
    title: 'Deliverable 1: 6-Slide Educational Carousel',
    category: 'Design & Motion',
    icon: Layers,
    targetView: 'carousel',
    highlight: '1080 × 1350 px Instagram Carousel with Instant ZIP Export',
    details: 'Features a compelling hook, cellular glucose biology, multi-biomarker mosaic, daily habits, and clear medical disclaimers rendered directly on Canvas.'
  },
  {
    step: 7,
    title: 'Deliverable 2: Static Social Post',
    category: 'Design',
    icon: ImageIcon,
    targetView: 'static_post',
    highlight: '1080 × 1350 px Standalone Editorial Artwork',
    details: 'Interconnected cellular pathway network, Instagram safe-margin guides, text overflow alerts, accessible alt-text, and high-res PNG download.'
  },
  {
    step: 8,
    title: 'Deliverable 3: Animated Reel Studio',
    category: 'Motion & Video',
    icon: Video,
    targetView: 'reel',
    highlight: 'Real Moving Canvas Preview & Native WebM Video Export',
    details: 'A genuine moving 9:16 vertical canvas with kinetic typography, scrubbable timecode slider, on-screen subtitles within safe zones, and SRT/TXT transcript exports.'
  },
  {
    step: 9,
    title: 'Quality Review & Deliverable Export Hub',
    category: 'Compliance & Export',
    icon: DownloadCloud,
    targetView: 'exports',
    highlight: 'Automated Heuristic Scans + Verifiable Multi-Asset Exports',
    details: 'No phantom downloads. Download PNGs, ZIP archives, WebM video files, CSV registers, JSON ledgers, and Markdown reports directly to your machine.'
  }
];

export function DemoModeModal({ isOpen, onClose, onNavigate }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const current = DEMO_STEPS[currentStepIndex];
  const Icon = current.icon;

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleJumpToWorkspace = () => {
    if (current.targetView) {
      onNavigate(current.targetView);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0B0F19] border border-white/20 p-6 sm:p-8 shadow-2xl z-10 space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-300">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 block">
                Hackathon Presentation Mode • Step {current.step} of {DEMO_STEPS.length}
              </span>
              <h2 className="font-display font-extrabold text-white text-lg sm:text-xl">
                {current.title}
              </h2>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {current.content ? (
          /* Step 1: The Executive Pitch */
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-red-400 text-[10px] block">
                The Problem
              </span>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                {current.content.problem}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-emerald-400 text-[10px] block">
                The Solution
              </span>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                {current.content.solution}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
                <span className="font-bold uppercase tracking-wider text-cyan-400 text-[10px] block">
                  The Key Differentiator
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {current.content.differentiator}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-violet-950/20 border border-violet-500/30 space-y-1">
                <span className="font-bold uppercase tracking-wider text-violet-400 text-[10px] block">
                  Real-World Impact
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {current.content.impact}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Steps 2-9: Studio walkthrough steps */
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>{current.category}</span>
              </div>
              
              <h3 className="font-display font-bold text-white text-base sm:text-lg">
                {current.highlight}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {current.details}
              </p>
            </div>

            {current.targetView && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                <span className="text-xs text-emerald-300 font-medium">
                  Inspect this feature live in the application:
                </span>
                <button
                  onClick={handleJumpToWorkspace}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Open {current.targetView.replace('_', ' ')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bottom Navigation & Stepper */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-white/10 disabled:opacity-30 text-xs font-semibold text-slate-300 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Stepper Dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {DEMO_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setCurrentStepIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-6 bg-violet-400'
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
                title={s.title}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === DEMO_STEPS.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-30 text-xs font-bold text-white transition-colors"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
