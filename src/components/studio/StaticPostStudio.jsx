import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Download, 
  Copy, 
  Check, 
  Sliders, 
  AlertTriangle, 
  Eye, 
  Sparkles, 
  Share2,
  ShieldCheck,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { exportStaticPostPNG } from '../../utils/canvasExport';

const LAYOUT_STYLES = [
  { id: 'network-editorial', label: 'Interconnected Network', desc: '5-node cellular diagram' },
  { id: 'bold-minimal', label: 'Bold Editorial', desc: 'Clean high-contrast typography' },
  { id: 'card-cluster', label: 'Biomarker Mosaic', desc: 'Segmented parameter cards' }
];

export function StaticPostStudio({
  staticPost = {},
  onUpdateStaticPost,
  onExportSuccess
}) {
  const [formData, setFormData] = useState({ ...staticPost });
  const [isExporting, setIsExporting] = useState(false);
  const [showSafeMargins, setShowSafeMargins] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedAlt, setCopiedAlt] = useState(false);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdateStaticPost(updated);
  };

  const handleExportPNG = async () => {
    setIsExporting(true);
    try {
      const result = await exportStaticPostPNG(formData);
      if (onExportSuccess) {
        onExportSuccess({
          filename: result.filename,
          type: 'static_post',
          dimensions: '1080 × 1350 px'
        });
      }
    } catch (err) {
      console.error(err);
      alert('Export failed: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(formData.caption || '');
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleCopyAltText = () => {
    navigator.clipboard.writeText(formData.altText || '');
    setCopiedAlt(true);
    setTimeout(() => setCopiedAlt(false), 2000);
  };

  // Text overflow detector
  const headlineLen = formData.headline?.length || 0;
  const isHeadlineLong = headlineLen > 80;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Finished Deliverable 2
            </span>
            <span className="text-xs text-slate-400">
              1080 × 1350 px • Portrait Feed Graphic • High Resolution
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-1">
            Static Social Post Studio
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            A standalone high-impact editorial graphic communicating the interconnected nature of metabolic health. Exports true designed canvas artwork at 1080×1350 resolution.
          </p>
        </div>

        {/* Global Action: Safe margins toggle & Export PNG */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowSafeMargins(!showSafeMargins)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
              showSafeMargins
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-900 text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            Safe Margins {showSafeMargins ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={handleExportPNG}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Rendering 1080×1350...' : 'Export High-Res PNG'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Graphic Simulator (6 cols) + Editor Controls (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Graphic Canvas Simulator (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          
          <div className="w-full max-w-[460px] aspect-[4/5] rounded-3xl bg-[#070B14] border-2 border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group select-none">
            
            {/* Ambient Radial Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            {/* Safe Margin Guide Overlay */}
            {showSafeMargins && (
              <div className="absolute inset-4 rounded-2xl border border-dashed border-cyan-400/50 pointer-events-none z-20 flex items-start justify-between p-2 text-[9px] font-mono text-cyan-400">
                <span>FEED SAFE ZONE (4:5)</span>
                <span>1080 × 1350</span>
              </div>
            )}

            {/* Header: MetaboQuest Branding */}
            <div className="flex items-center justify-between text-xs z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-glow-cyan" />
                <span className="font-display font-bold tracking-tight text-white">
                  METABO<span className="text-cyan-400">QUEST</span>
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                EVIDENCE SERIES
              </span>
            </div>

            {/* Middle Section: Tag, Headline, Interconnected Nodes Diagram, Copy */}
            <div className="space-y-4 my-auto z-10">
              
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                METABOLIC LITERACY
              </span>

              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white leading-tight">
                {formData.headline}
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-emerald-300">
                {formData.subhead}
              </p>

              {/* Interconnected Cellular Nodes Diagram */}
              <div className="py-3 relative flex items-center justify-center">
                <div className="relative w-72 h-36">
                  {/* Connecting dashed lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 288 144">
                    <line x1="50" y1="40" x2="144" y2="20" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" strokeWidth="1.5" />
                    <line x1="144" y1="20" x2="238" y2="40" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" strokeWidth="1.5" />
                    <line x1="50" y1="40" x2="90" y2="110" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" strokeWidth="1.5" />
                    <line x1="238" y1="40" x2="198" y2="110" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" strokeWidth="1.5" />
                    <line x1="90" y1="110" x2="198" y2="110" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" strokeWidth="1.5" />
                  </svg>

                  {/* Node 1: Glucose */}
                  <div className="absolute left-6 top-4 w-14 h-14 rounded-full border border-emerald-400 bg-emerald-500/20 flex flex-col items-center justify-center text-center">
                    <span className="text-[9px] font-bold text-white">GLUCOSE</span>
                    <span className="text-[7px] text-emerald-300">Fuel</span>
                  </div>

                  {/* Node 2: Lipids */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-16 rounded-full border border-cyan-400 bg-cyan-500/20 flex flex-col items-center justify-center text-center">
                    <span className="text-[9px] font-bold text-white">LIPIDS</span>
                    <span className="text-[7px] text-cyan-300">HDL/Trigs</span>
                  </div>

                  {/* Node 3: BP */}
                  <div className="absolute right-6 top-4 w-14 h-14 rounded-full border border-violet-400 bg-violet-500/20 flex flex-col items-center justify-center text-center">
                    <span className="text-[9px] font-bold text-white">PRESSURE</span>
                    <span className="text-[7px] text-violet-300">Vessels</span>
                  </div>

                  {/* Node 4: Sleep */}
                  <div className="absolute left-16 bottom-2 w-12 h-12 rounded-full border border-amber-400 bg-amber-500/20 flex flex-col items-center justify-center text-center">
                    <span className="text-[8px] font-bold text-white">SLEEP</span>
                    <span className="text-[7px] text-amber-300">Rest</span>
                  </div>

                  {/* Node 5: Movement */}
                  <div className="absolute right-16 bottom-2 w-12 h-12 rounded-full border border-lime-400 bg-lime-500/20 flex flex-col items-center justify-center text-center">
                    <span className="text-[8px] font-bold text-white">HABITS</span>
                    <span className="text-[7px] text-lime-300">Rhythm</span>
                  </div>
                </div>
              </div>

              {/* Explanatory Body Copy */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {formData.bodyText}
              </p>
            </div>

            {/* Footer: CTA & Verified Sources */}
            <div className="pt-3 border-t border-white/10 space-y-1.5 z-10 text-[10px]">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-bold text-emerald-400">{formData.ctaText}</span>
                <span className="text-slate-400">NIDDK • CDC • WHO</span>
              </div>
              <p className="text-slate-400 text-[9px] line-clamp-1">
                {formData.disclaimer}
              </p>
            </div>

          </div>

          <div className="mt-3 text-center text-xs text-slate-400">
            Preview scaled to fit screen • Exports at full <span className="text-white font-mono font-semibold">1080 × 1350 px</span>
          </div>
        </div>

        {/* Right: Graphic Controls & Social Copy (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Card: Text Editing */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              Graphic Copy Controls
            </span>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Main Headline
                  </label>
                  <span className={`text-[10px] font-mono ${isHeadlineLong ? 'text-amber-400' : 'text-slate-400'}`}>
                    {headlineLen} / 80 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.headline || ''}
                  onChange={(e) => handleChange('headline', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500 font-semibold"
                />
                {isHeadlineLong && (
                  <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Headline may wrap onto 3+ lines on small screens.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Supporting Editorial Copy
                </label>
                <input
                  type="text"
                  value={formData.subhead || ''}
                  onChange={(e) => handleChange('subhead', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Narrative Body Copy
                </label>
                <textarea
                  rows={3}
                  value={formData.bodyText || ''}
                  onChange={(e) => handleChange('bodyText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Call to Action (CTA)
                </label>
                <input
                  type="text"
                  value={formData.ctaText || ''}
                  onChange={(e) => handleChange('ctaText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Card: Social Caption & Accessible Alt-Text */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Share2 className="w-4 h-4" />
              Social Feed Caption & Accessibility
            </span>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Instagram / LinkedIn Feed Caption
                  </label>
                  <button
                    onClick={handleCopyCaption}
                    className="flex items-center gap-1 text-[11px] text-emerald-400 hover:underline"
                  >
                    {copiedCaption ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCaption ? 'Copied!' : 'Copy Caption'}</span>
                  </button>
                </div>
                <textarea
                  rows={5}
                  value={formData.caption || ''}
                  onChange={(e) => handleChange('caption', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 font-sans leading-relaxed"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Accessible Image Alt-Text
                  </label>
                  <button
                    onClick={handleCopyAltText}
                    className="flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
                  >
                    {copiedAlt ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedAlt ? 'Copied!' : 'Copy Alt-Text'}</span>
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={formData.altText || ''}
                  onChange={(e) => handleChange('altText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
