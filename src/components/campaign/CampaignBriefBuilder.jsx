import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Palette, 
  Users, 
  Target, 
  MessageSquare,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { DEFAULT_CAMPAIGN_BRIEF } from '../../data/defaultCampaign';

export function CampaignBriefBuilder({
  campaignBrief,
  onUpdateBrief,
  onGenerateDrafts,
  onNavigate
}) {
  const [formData, setFormData] = useState({ ...campaignBrief });
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdateBrief(updated);
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset brief to standard evidence-based defaults?')) {
      setFormData({ ...DEFAULT_CAMPAIGN_BRIEF });
      onUpdateBrief({ ...DEFAULT_CAMPAIGN_BRIEF });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Campaign Strategy & Directive
            </span>
            {showSavedFeedback && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-1">
            Campaign Brief Builder
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Configure the strategic foundation, educational objective, audience safeguards, and prohibited terms before generating coordinated social assets.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Brief</span>
          </button>

          <button
            onClick={() => {
              onGenerateDrafts();
              onNavigate('pipeline');
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-glow-lime"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Generate Coordinated Drafts</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form Fields (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Campaign Identity */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <FileText className="w-4 h-4" />
              <span>1. Campaign Identity</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Campaign Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Studio Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Main Educational Message
                </label>
                <textarea
                  rows={2}
                  value={formData.mainMessage}
                  onChange={(e) => handleChange('mainMessage', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Objectives & Audience */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Target className="w-4 h-4" />
              <span>2. Strategic Objectives & Audience</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Campaign Objective
                </label>
                <textarea
                  rows={2}
                  value={formData.objective}
                  onChange={(e) => handleChange('objective', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => handleChange('targetAudience', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Editorial Tone
                  </label>
                  <input
                    type="text"
                    value={formData.tone}
                    onChange={(e) => handleChange('tone', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Primary Call to Action (CTA)
                </label>
                <input
                  type="text"
                  value={formData.primaryCta}
                  onChange={(e) => handleChange('primaryCta', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Visual Direction & Channels */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-400">
              <Palette className="w-4 h-4" />
              <span>3. Visual Direction & Target Channels</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Visual Direction Directive
                </label>
                <input
                  type="text"
                  value={formData.visualDirection}
                  onChange={(e) => handleChange('visualDirection', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Social Channels
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.platforms.map((plat, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-white/10"
                    >
                      {plat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Prohibited Language Safeguard & Medical Disclaimers */}
          <div className="rounded-2xl border border-amber-500/20 bg-[#16131F] p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <ShieldAlert className="w-4 h-4" />
              <span>4. Medical Safeguards & Prohibited Claims Filter</span>
            </div>

            <p className="text-xs text-slate-400">
              The Quality Gate automatically scans all assets against these prohibited terms to prevent pseudoscience, body shaming, and unsupported medical claims:
            </p>

            <div className="flex flex-wrap gap-1.5">
              {formData.prohibitedTerms.map((term, i) => (
                <span 
                  key={i}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-red-950/40 text-red-300 border border-red-500/30"
                >
                  ✕ {term}
                </span>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mandatory Educational Disclaimer
              </label>
              <textarea
                rows={2}
                value={formData.medicalDisclaimer}
                onChange={(e) => handleChange('medicalDisclaimer', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Live Campaign Brief Preview (1 Col) */}
        <div className="space-y-5">
          <div className="sticky top-20 rounded-2xl border border-white/10 bg-[#0F172A] p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Live Brief Preview
              </span>
              <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                ACTIVE STATE
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">CAMPAIGN TITLE:</span>
                <span className="text-sm font-display font-bold text-white block mt-0.5">
                  {formData.title}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">MAIN THESIS:</span>
                <p className="text-slate-200 mt-0.5 leading-relaxed">
                  {formData.mainMessage}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">PRIMARY CTA:</span>
                <span className="text-emerald-300 font-semibold block mt-0.5">
                  "{formData.primaryCta}"
                </span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">COLOR THEME:</span>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#10B981] border border-white/20" title="Mint" />
                  <div className="w-5 h-5 rounded-full bg-[#00F2FE] border border-white/20" title="Teal" />
                  <div className="w-5 h-5 rounded-full bg-[#C6FF65] border border-white/20" title="Lime" />
                  <div className="w-5 h-5 rounded-full bg-[#A78BFA] border border-white/20" title="Violet" />
                  <span className="text-[11px] text-slate-300 font-semibold ml-1">Midnight Mint</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <span className="text-slate-400 block font-medium mb-1">COORDINATED DELIVERABLES:</span>
                <ul className="space-y-1 text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>6-Slide Educational Carousel (1080×1350)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Single Editorial Social Post (1080×1350)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <span>Short-Form Animated Reel (9:16 Video)</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => {
                onGenerateDrafts();
                onNavigate('pipeline');
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-glow-lime"
            >
              <span>Synthesize Drafts Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
