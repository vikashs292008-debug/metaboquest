import React, { useState, useRef } from 'react';
import { 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Archive, 
  Palette, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  Grid, 
  ExternalLink,
  MoveLeft,
  MoveRight,
  Eye,
  X
} from 'lucide-react';
import { 
  exportCarouselSlidePNG, 
  exportAllCarouselSlidesZIP,
  renderCarouselSlideCanvas 
} from '../../utils/canvasExport';

const ACCENT_PALETTES = [
  { name: 'Mint Emerald', color: '#10B981' },
  { name: 'Electric Cyan', color: '#00F2FE' },
  { name: 'Deep Amethyst', color: '#A78BFA' },
  { name: 'Lime Pulse', color: '#C6FF65' },
  { name: 'Solar Amber', color: '#F59E0B' }
];

export function CarouselStudio({
  slides = [],
  onUpdateSlide,
  onReorderSlides,
  researchSources = [],
  claimLedger = [],
  onExportSuccess
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [exportProgress, setExportProgress] = useState(null);
  const [showContactSheet, setShowContactSheet] = useState(false);

  const activeSlide = slides[currentSlideIndex] || slides[0] || {};

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleTextChange = (field, value) => {
    const updated = { ...activeSlide, [field]: value };
    onUpdateSlide(currentSlideIndex, updated);
  };

  const handleColorChange = (color) => {
    const updated = { ...activeSlide, accentColor: color };
    onUpdateSlide(currentSlideIndex, updated);
  };

  const handleMoveSlide = (direction) => {
    const newIdx = direction === 'left' ? currentSlideIndex - 1 : currentSlideIndex + 1;
    if (newIdx >= 0 && newIdx < slides.length) {
      onReorderSlides(currentSlideIndex, newIdx);
      setCurrentSlideIndex(newIdx);
    }
  };

  const handleExportSingle = async () => {
    const result = await exportCarouselSlidePNG(activeSlide, currentSlideIndex, slides.length);
    if (onExportSuccess) {
      onExportSuccess({
        filename: result.filename,
        type: 'carousel_slide',
        dimensions: '1080 × 1350 px'
      });
    }
  };

  const handleExportAllZip = async () => {
    setIsExportingZip(true);
    setExportProgress('Rendering 6 high-res slides...');
    try {
      const result = await exportAllCarouselSlidesZIP(slides, (current, total) => {
        setExportProgress(`Rendering slide ${current} of ${total}...`);
      });
      if (onExportSuccess) {
        onExportSuccess({
          filename: result.filename,
          type: 'carousel_zip',
          dimensions: '6 Slides (1080 × 1350 px each)'
        });
      }
    } catch (err) {
      console.error(err);
      alert('Export failed: ' + err.message);
    } finally {
      setIsExportingZip(false);
      setExportProgress(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Finished Deliverable 1
            </span>
            <span className="text-xs text-slate-400">
              1080 × 1350 px • Portrait 4:5 • 6 Coordinated Slides
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-1">
            Educational Carousel Studio
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Design and inspect the 6-slide Instagram-style educational carousel. Every slide features verified health citations, high readability, and clean cellular motifs.
          </p>
        </div>

        {/* Global Slide Exporters */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setShowContactSheet(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            <Grid className="w-3.5 h-3.5 text-cyan-400" />
            <span>Contact Sheet</span>
          </button>

          <button
            onClick={handleExportSingle}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/15 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Slide {currentSlideIndex + 1} PNG</span>
          </button>

          <button
            onClick={handleExportAllZip}
            disabled={isExportingZip}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-glow-lime"
          >
            <Archive className="w-4 h-4" />
            <span>{isExportingZip ? (exportProgress || 'Packaging...') : 'Download All 6 (ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Area: Preview Canvas + Live Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Live Slide Canvas Simulator (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          
          {/* Slide Navigator Controls Bar */}
          <div className="w-full max-w-[460px] flex items-center justify-between p-3 rounded-2xl bg-[#0E1526] border border-white/10 mb-4 text-xs">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 font-semibold hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-white text-sm">
                Slide {currentSlideIndex + 1} of {slides.length}
              </span>
              <span className="text-slate-400 text-[11px] font-mono">
                ({String(currentSlideIndex + 1).padStart(2, '0')}/06)
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={currentSlideIndex === slides.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 font-semibold hover:bg-slate-700 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 1080x1350 Aspect Ratio Simulator Container */}
          <div className="w-full max-w-[460px] aspect-[4/5] rounded-3xl bg-[#090D16] border-2 border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group select-none">
            
            {/* Ambient Accent Radial Glow */}
            <div 
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-25"
              style={{ backgroundColor: activeSlide.accentColor || '#10B981' }}
            />

            {/* Top Bar: Wordmark + Slide Counter */}
            <div className="flex items-center justify-between text-xs z-10">
              <div className="flex items-center gap-1.5">
                <span 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: activeSlide.accentColor || '#10B981' }}
                />
                <span className="font-display font-bold tracking-tight text-white">
                  METABO<span className="text-emerald-400">QUEST</span>
                </span>
              </div>
              <span 
                className="font-mono font-bold text-xs"
                style={{ color: activeSlide.accentColor || '#10B981' }}
              >
                {String(currentSlideIndex + 1).padStart(2, '0')} / 06
              </span>
            </div>

            {/* Middle Section: Tag, Headline, Subhead, and Visual Motif */}
            <div className="space-y-3.5 my-auto z-10">
              {/* Category Tag */}
              {activeSlide.tag && (
                <span 
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                  style={{ 
                    color: activeSlide.accentColor || '#10B981',
                    borderColor: `${activeSlide.accentColor || '#10B981'}40`,
                    backgroundColor: `${activeSlide.accentColor || '#10B981'}15`
                  }}
                >
                  {activeSlide.tag}
                </span>
              )}

              {/* Main Headline */}
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white leading-tight">
                {activeSlide.headline}
              </h2>

              {/* Subhead */}
              {activeSlide.subhead && (
                <p 
                  className="text-xs sm:text-sm font-medium"
                  style={{ color: activeSlide.accentColor || '#10B981' }}
                >
                  {activeSlide.subhead}
                </p>
              )}

              {/* Decorative Cellular Diagram Motif */}
              <div className="py-2 flex items-center justify-center gap-4">
                <div 
                  className="w-14 h-14 rounded-full border flex items-center justify-center text-[10px] font-bold text-white shadow-inner"
                  style={{ 
                    borderColor: activeSlide.accentColor || '#10B981',
                    backgroundColor: `${activeSlide.accentColor || '#10B981'}20`
                  }}
                >
                  ENERGY
                </div>
                <div className="w-8 border-t border-dashed border-white/30" />
                <div className="w-12 h-12 rounded-full border border-cyan-400/50 bg-cyan-400/20 flex items-center justify-center text-[9px] font-bold text-cyan-300">
                  SYSTEM
                </div>
                <div className="w-8 border-t border-dashed border-white/30" />
                <div className="w-10 h-10 rounded-full border border-violet-400/50 bg-violet-400/20 flex items-center justify-center text-[8px] font-bold text-violet-300">
                  REST
                </div>
              </div>

              {/* Narrative Body Copy */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeSlide.bodyText}
              </p>
            </div>

            {/* Bottom Footer: Verified Evidence Base & Disclaimer */}
            <div className="pt-3 border-t border-white/10 space-y-1 z-10 text-[10px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-semibold text-slate-400">Sources:</span>
                <span className="text-white">NIDDK • CDC • WHO • MedlinePlus</span>
              </div>
              <p className="text-slate-400 text-[9px]">
                Educational only. Consult a qualified clinician for personalized healthcare guidance.
              </p>
            </div>

          </div>

          {/* Slide Thumbnails Rail */}
          <div className="w-full max-w-[460px] flex items-center gap-2 mt-4 overflow-x-auto pb-2 custom-scrollbar">
            {slides.map((s, idx) => (
              <button
                key={s.id || idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-14 h-18 rounded-xl border p-1 text-center shrink-0 transition-all ${
                  idx === currentSlideIndex
                    ? 'border-emerald-400 bg-emerald-500/10 scale-105 shadow-sm'
                    : 'border-white/10 bg-slate-900/60 hover:border-white/25'
                }`}
              >
                <span className="text-[10px] font-bold block text-slate-300">
                  #{idx + 1}
                </span>
                <span className="text-[8px] text-slate-400 block truncate">
                  {s.tag || `Slide ${idx + 1}`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Live Slide Content & Styling Controls (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Card: Text Editing */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                Slide {currentSlideIndex + 1} Content Editor
              </span>

              {/* Move Slide Left/Right */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-400 text-[11px]">Reorder:</span>
                <button
                  onClick={() => handleMoveSlide('left')}
                  disabled={currentSlideIndex === 0}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                  title="Move Slide Earlier"
                >
                  <MoveLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMoveSlide('right')}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                  title="Move Slide Later"
                >
                  <MoveRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category Tag / Header Pill
                </label>
                <input
                  type="text"
                  value={activeSlide.tag || ''}
                  onChange={(e) => handleTextChange('tag', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Main Headline
                </label>
                <textarea
                  rows={2}
                  value={activeSlide.headline || ''}
                  onChange={(e) => handleTextChange('headline', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subheadline / Supporting Thesis
                </label>
                <input
                  type="text"
                  value={activeSlide.subhead || ''}
                  onChange={(e) => handleTextChange('subhead', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Explanatory Body Copy (Evidence Grounded)
                </label>
                <textarea
                  rows={4}
                  value={activeSlide.bodyText || ''}
                  onChange={(e) => handleTextChange('bodyText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Card: Accent Color Styling Palette */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Palette className="w-4 h-4" />
              Slide Accent Theme
            </span>

            <div className="flex flex-wrap items-center gap-3">
              {ACCENT_PALETTES.map((pal) => (
                <button
                  key={pal.name}
                  onClick={() => handleColorChange(pal.color)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    activeSlide.accentColor === pal.color
                      ? 'border-white/40 bg-slate-800 text-white shadow-sm ring-1 ring-white/20'
                      : 'border-white/10 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <span 
                    className="w-3.5 h-3.5 rounded-full" 
                    style={{ backgroundColor: pal.color }} 
                  />
                  <span>{pal.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Card: Evidence Mapping Info */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-5 space-y-3 text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-400 block text-[10px]">
              Assigned Claims & Sources for Slide {currentSlideIndex + 1}
            </span>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Claims:</span>
                <div className="flex flex-wrap gap-1">
                  {activeSlide.claimIds?.map(cid => (
                    <span key={cid} className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/30">
                      {cid}
                    </span>
                  )) || <span className="text-slate-400">CLM-001</span>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Sources:</span>
                <div className="flex flex-wrap gap-1">
                  {activeSlide.sourceIds?.map(sid => (
                    <span key={sid} className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/30">
                      {sid}
                    </span>
                  )) || <span className="text-slate-400">SRC-001</span>}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Contact Sheet Full Modal */}
      {showContactSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowContactSheet(false)} />
          <div className="relative w-full max-w-5xl rounded-3xl bg-[#0B0F19] border border-white/15 p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-display font-extrabold text-white text-xl">
                  6-Slide Carousel Contact Sheet
                </h3>
                <p className="text-xs text-slate-400">
                  Complete social feed swipe sequence review
                </p>
              </div>
              <button 
                onClick={() => setShowContactSheet(false)}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {slides.map((s, idx) => (
                <div 
                  key={s.id || idx}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setShowContactSheet(false);
                  }}
                  className="aspect-[4/5] rounded-2xl bg-[#090D16] border border-white/15 p-4 flex flex-col justify-between hover:border-emerald-400 cursor-pointer transition-all relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-300">#{idx + 1} {s.tag}</span>
                    <span className="font-mono text-emerald-400">0{idx + 1}/06</span>
                  </div>

                  <div className="space-y-1 my-auto">
                    <p className="font-display font-bold text-xs text-white leading-tight">
                      {s.headline}
                    </p>
                    <p className="text-[10px] text-slate-400 line-clamp-3">
                      {s.bodyText}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 text-[9px] text-slate-400">
                    Click to edit in studio
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
