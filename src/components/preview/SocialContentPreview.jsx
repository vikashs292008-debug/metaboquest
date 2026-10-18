import React, { useState } from 'react';
import { 
  Eye, 
  Layers, 
  Image as ImageIcon, 
  Video, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export function SocialContentPreview({
  carouselSlides = [],
  staticPost = {},
  reelData = {},
  qualityAudit,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'carousel' | 'static_post' | 'reel'
  const [carouselPreviewIndex, setCarouselPreviewIndex] = useState(0);
  const [copiedCaption, setCopiedCaption] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedCaption(key);
    setTimeout(() => setCopiedCaption(null), 2000);
  };

  const activeSlide = carouselSlides[carouselPreviewIndex] || carouselSlides[0] || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Cross-Platform Review
            </span>
            <span className="text-xs text-slate-400">
              Coordinated Campaign Multi-Asset Preview
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-1">
            Social Content Preview Workspace
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Review the 6-slide carousel, static editorial post, and 9:16 short-form reel side by side. Verify message consistency, safe zones, captions, and source attribution before export.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/10 shrink-0">
          {[
            { id: 'all', label: 'All 3 Assets' },
            { id: 'carousel', label: 'Carousel (6)' },
            { id: 'static_post', label: 'Static Post' },
            { id: 'reel', label: 'Reel (9:16)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Asset 1: Carousel Preview */}
        {(activeTab === 'all' || activeTab === 'carousel') && (
          <div className="rounded-3xl border border-white/10 bg-[#0E1526] p-6 space-y-5 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-display font-bold text-white text-base">
                    Educational Carousel
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  4:5 Ratio
                </span>
              </div>

              {/* Feed Phone Card Simulator */}
              <div className="aspect-[4/5] rounded-2xl bg-[#090D16] border border-white/15 p-5 flex flex-col justify-between relative overflow-hidden select-none">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-white">METABOQUEST</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    0{carouselPreviewIndex + 1} / 06
                  </span>
                </div>

                <div className="space-y-2 my-auto">
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">
                    {activeSlide.tag}
                  </span>
                  <h4 className="font-display font-extrabold text-sm sm:text-base text-white leading-tight">
                    {activeSlide.headline}
                  </h4>
                  {activeSlide.subhead && (
                    <p className="text-[11px] font-medium text-emerald-300">
                      {activeSlide.subhead}
                    </p>
                  )}
                  <p className="text-[11px] text-slate-300 line-clamp-4 leading-relaxed">
                    {activeSlide.bodyText}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-400">
                  <span>NIDDK • CDC • WHO</span>
                  <span>Swipe to slide 0{carouselPreviewIndex + 1}</span>
                </div>
              </div>

              {/* Carousel Slide Navigator in Preview */}
              <div className="flex items-center justify-between text-xs px-1">
                <button
                  onClick={() => setCarouselPreviewIndex(Math.max(0, carouselPreviewIndex - 1))}
                  disabled={carouselPreviewIndex === 0}
                  className="flex items-center gap-1 text-slate-400 hover:text-white disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>
                <span className="text-[11px] font-medium text-slate-300">
                  Slide {carouselPreviewIndex + 1} of 6
                </span>
                <button
                  onClick={() => setCarouselPreviewIndex(Math.min(carouselSlides.length - 1, carouselPreviewIndex + 1))}
                  disabled={carouselPreviewIndex === carouselSlides.length - 1}
                  className="flex items-center gap-1 text-slate-400 hover:text-white disabled:opacity-30"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Caption Snippet */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Carousel Caption
                  </span>
                  <button
                    onClick={() => handleCopy(carouselSlides[0]?.bodyText, 'carousel_cap')}
                    className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    {copiedCaption === 'carousel_cap' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCaption === 'carousel_cap' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  "Metabolic health is more than a single measurement. Swipe through to discover how energy, glucose, and daily habits work together..."
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('carousel')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors mt-2"
            >
              <span>Open in Carousel Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Asset 2: Static Post Preview */}
        {(activeTab === 'all' || activeTab === 'static_post') && (
          <div className="rounded-3xl border border-white/10 bg-[#0E1526] p-6 space-y-5 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-display font-bold text-white text-base">
                    Static Social Graphic
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  4:5 Feed
                </span>
              </div>

              {/* Graphic Simulator */}
              <div className="aspect-[4/5] rounded-2xl bg-[#070B14] border border-white/15 p-5 flex flex-col justify-between relative overflow-hidden select-none">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-white">METABOQUEST</span>
                  <span className="text-cyan-400 font-bold">EDITORIAL</span>
                </div>

                <div className="space-y-2.5 my-auto text-center">
                  <div className="w-12 h-12 rounded-full border border-cyan-400/40 bg-cyan-400/10 mx-auto flex items-center justify-center text-cyan-300 font-bold text-[10px]">
                    NETWORK
                  </div>
                  <h4 className="font-display font-extrabold text-sm sm:text-base text-white leading-tight">
                    {staticPost.headline || 'Metabolic health is bigger than one number.'}
                  </h4>
                  <p className="text-[11px] font-medium text-emerald-300">
                    {staticPost.subhead}
                  </p>
                  <p className="text-[10px] text-slate-400 line-clamp-3">
                    {staticPost.bodyText}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 text-[9px] text-slate-400 text-center">
                  Evidence-based review: NIDDK • CDC • WHO
                </div>
              </div>

              {/* Caption Box */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Post Caption
                  </span>
                  <button
                    onClick={() => handleCopy(staticPost.caption, 'static_cap')}
                    className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    {copiedCaption === 'static_cap' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCaption === 'static_cap' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {staticPost.caption}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('static_post')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors mt-2"
            >
              <span>Open in Static Post Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Asset 3: Short-Form Reel Preview */}
        {(activeTab === 'all' || activeTab === 'reel') && (
          <div className="rounded-3xl border border-white/10 bg-[#0E1526] p-6 space-y-5 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-violet-400" />
                  <h3 className="font-display font-bold text-white text-base">
                    Short-Form Reel
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/15 text-violet-300 border border-violet-500/30">
                  9:16 Video
                </span>
              </div>

              {/* Reel Vertical Simulator */}
              <div className="aspect-[4/5] rounded-2xl bg-[#05080F] border border-white/15 p-5 flex flex-col justify-between relative overflow-hidden select-none">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    REEL PREVIEW
                  </span>
                  <span className="text-violet-400 font-mono font-bold">
                    {reelData?.totalDuration || 25}s
                  </span>
                </div>

                <div className="space-y-2.5 my-auto text-center">
                  <div className="w-12 h-12 rounded-full border border-violet-400/50 bg-violet-500/20 mx-auto flex items-center justify-center text-violet-300 font-bold text-sm shadow-inner animate-pulse-slow">
                    ▶
                  </div>
                  <h4 className="font-display font-extrabold text-sm text-white leading-tight">
                    {reelData?.scenes?.[0]?.onScreenText || 'Think metabolic health is just about weight?'}
                  </h4>
                  <p className="text-[11px] text-violet-300 font-medium">
                    {reelData?.scenes?.[0]?.subText || 'There is a much bigger picture.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 text-[9px] text-slate-400 text-center">
                  5 Scenes • Animated Canvas Capture Stream
                </div>
              </div>

              {/* Reel Caption */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Reel Caption
                  </span>
                  <button
                    onClick={() => handleCopy(reelData.caption, 'reel_cap')}
                    className="text-[10px] text-violet-400 hover:underline flex items-center gap-1"
                  >
                    {copiedCaption === 'reel_cap' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCaption === 'reel_cap' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {reelData.caption}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('reel')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors mt-2"
            >
              <span>Open in Reel Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
