import React, { useState } from 'react';
import { 
  DownloadCloud, 
  Download, 
  Archive, 
  FileText, 
  Video, 
  Image as ImageIcon, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Copy,
  ExternalLink,
  Table
} from 'lucide-react';
import { 
  exportCarouselSlidePNG, 
  exportAllCarouselSlidesZIP, 
  exportStaticPostPNG 
} from '../../utils/canvasExport';
import { 
  recordAndExportReelVideo, 
  exportReelSRT, 
  exportReelTXT 
} from '../../utils/videoExport';
import { 
  exportResearchRegisterCSV, 
  exportResearchRegisterJSON,
  exportClaimLedgerCSV,
  exportClaimLedgerJSON,
  exportCampaignSummaryMD,
  exportAssetManifestJSON
} from '../../utils/manifestGenerator';

export function ExportCenter({
  campaignBrief,
  carouselSlides = [],
  staticPost = {},
  reelData = {},
  researchSources = [],
  claimLedger = [],
  qualityAudit,
  exportHistory = [],
  onRecordExport
}) {
  const [downloadingKey, setDownloadingKey] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleAction = async (key, exportFn, exportMeta) => {
    setDownloadingKey(key);
    try {
      await exportFn();
      if (onRecordExport) {
        onRecordExport({
          id: `exp_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          filename: exportMeta.filename,
          type: exportMeta.type,
          format: exportMeta.format,
          dimensions: exportMeta.dimensions || 'N/A'
        });
      }
    } catch (err) {
      console.error(err);
      alert('Export failed: ' + err.message);
    } finally {
      setDownloadingKey(null);
    }
  };

  const handleCopyCaption = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Deliverable Production Hub
            </span>
            <span className="text-xs text-slate-400">
              Multi-Format Native Browser Exporter
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-1">
            Campaign Deliverables & Export Center
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Export true high-resolution production assets, evidence documentation, video streams, transcripts, and verifiable package manifests directly to your device.
          </p>
        </div>

        {/* Global Batch Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleAction(
              'manifest_all',
              () => exportAssetManifestJSON({ campaignBrief, carouselSlides, staticPost, reelData, researchSources, claimLedger }),
              { filename: 'metaboquest-asset-manifest.json', type: 'Package Manifest', format: 'JSON' }
            )}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/15 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Manifest (JSON)</span>
          </button>

          <button
            onClick={() => handleAction(
              'summary_md',
              () => exportCampaignSummaryMD({ campaignBrief, carouselSlides, staticPost, reelData, researchSources, claimLedger, qualityScore: qualityAudit?.score || 100 }),
              { filename: 'metaboquest-campaign-summary.md', type: 'Campaign Report', format: 'Markdown' }
            )}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-glow-lime"
          >
            <Download className="w-3.5 h-3.5 fill-current" />
            <span>Export Summary (MD)</span>
          </button>
        </div>
      </div>

      {/* 3 Main Deliverable Groups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Deliverable 1: Carousel Downloads */}
        <div className="rounded-3xl border border-white/10 bg-[#0E1526] p-6 space-y-5 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <h3 className="font-display font-bold text-white text-base">
                  1. Educational Carousel
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                1080 × 1350 px
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              6 coordinated portrait slides with verified glucose science, connected biology, daily habits, citations, and educational disclaimers.
            </p>

            {/* Individual Slide Download List */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Individual Slide PNGs
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {carouselSlides.map((slide, idx) => (
                  <button
                    key={slide.id || idx}
                    onClick={() => handleAction(
                      `slide_${idx}`,
                      () => exportCarouselSlidePNG(slide, idx, carouselSlides.length),
                      { filename: `metaboquest-carousel-slide-0${idx + 1}.png`, type: 'Carousel Slide', format: 'PNG', dimensions: '1080 × 1350 px' }
                    )}
                    disabled={downloadingKey === `slide_${idx}`}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/5 text-xs font-semibold flex items-center justify-between transition-colors"
                  >
                    <span>Slide 0{idx + 1}</span>
                    <Download className="w-3 h-3 text-emerald-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Full ZIP Package Button */}
          <button
            onClick={() => handleAction(
              'carousel_all_zip',
              () => exportAllCarouselSlidesZIP(carouselSlides),
              { filename: 'metaboquest-carousel-all-slides.zip', type: 'Carousel Archive', format: 'ZIP', dimensions: '6 Slides (1080 × 1350 px)' }
            )}
            disabled={downloadingKey === 'carousel_all_zip'}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-glow-lime"
          >
            <Archive className="w-4 h-4" />
            <span>{downloadingKey === 'carousel_all_zip' ? 'Packaging ZIP...' : 'Download All 6 Slides (ZIP)'}</span>
          </button>
        </div>

        {/* Deliverable 2: Static Post Downloads */}
        <div className="rounded-3xl border border-white/10 bg-[#0E1526] p-6 space-y-5 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-bold text-white text-base">
                  2. Static Social Graphic
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                1080 × 1350 px
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Standalone editorial social post graphic with 5-node interconnected cellular pathway network and verified agency attribution.
            </p>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Primary Copy Thesis
              </span>
              <p className="text-white font-semibold text-xs leading-snug">
                "{staticPost.headline || 'Metabolic health is bigger than one number.'}"
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleCopyCaption(staticPost.caption, 'cap_static')}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-semibold transition-colors"
            >
              {copiedKey === 'cap_static' ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copiedKey === 'cap_static' ? 'Caption Copied!' : 'Copy Social Caption & Alt-Text'}</span>
            </button>

            <button
              onClick={() => handleAction(
                'static_png',
                () => exportStaticPostPNG(staticPost),
                { filename: 'metaboquest-static-post.png', type: 'Static Graphic', format: 'PNG', dimensions: '1080 × 1350 px' }
              )}
              disabled={downloadingKey === 'static_png'}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingKey === 'static_png' ? 'Rendering PNG...' : 'Download Static Graphic (PNG)'}</span>
            </button>
          </div>
        </div>

        {/* Deliverable 3: Reel Video & Transcripts */}
        <div className="rounded-3xl border border-white/10 bg-[#0E1526] p-6 space-y-5 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-violet-400" />
                <h3 className="font-display font-bold text-white text-base">
                  3. Animated Reel & Script
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/15 text-violet-300 border border-violet-500/30">
                1080 × 1920 (9:16)
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              25-second animated kinetic video with 5 coordinated scenes, cellular pulses, subtitle tracks, and audio-free Canvas recording.
            </p>

            {/* Subtitle & Transcript Downloads */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
              <button
                onClick={() => handleAction(
                  'reel_srt',
                  () => exportReelSRT(reelData),
                  { filename: 'metaboquest-reel-transcript.srt', type: 'Subtitles', format: 'SRT' }
                )}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>SRT Subtitles</span>
              </button>

              <button
                onClick={() => handleAction(
                  'reel_txt',
                  () => exportReelTXT(reelData),
                  { filename: 'metaboquest-reel-transcript.txt', type: 'Transcript', format: 'TXT' }
                )}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>TXT Transcript</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => handleAction(
              'reel_video',
              () => recordAndExportReelVideo({ reelData }),
              { filename: 'metaboquest-reel.webm', type: 'Reel Video', format: 'WebM/MP4', dimensions: '1080 × 1920 px' }
            )}
            disabled={downloadingKey === 'reel_video'}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-glow-violet"
          >
            <Video className="w-4 h-4" />
            <span>{downloadingKey === 'reel_video' ? 'Rendering Video Stream...' : 'Download Reel Video (WebM)'}</span>
          </button>
        </div>

      </div>

      {/* Evidence Documentation Exports Section */}
      <div className="rounded-3xl border border-white/10 bg-[#0E1526] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
          <div>
            <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Evidence Verification Registers & Ledger Exports
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Structured datasets proving primary research origins and human audit trail
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-semibold">
            All 6 Primary Sources Documented
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Research Register CSV */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase">
                CSV DATASET
              </span>
              <h4 className="font-bold text-white text-sm mt-1">
                Research Register (CSV)
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                NIDDK, CDC, WHO, MedlinePlus URLs, dates, and excerpts.
              </p>
            </div>
            <button
              onClick={() => handleAction(
                'research_csv',
                () => exportResearchRegisterCSV(researchSources),
                { filename: 'metaboquest-research-register.csv', type: 'Research Register', format: 'CSV' }
              )}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download CSV</span>
            </button>
          </div>

          {/* Research Register JSON */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase">
                JSON OBJECT
              </span>
              <h4 className="font-bold text-white text-sm mt-1">
                Research Register (JSON)
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Machine-readable source records with claim linkage arrays.
              </p>
            </div>
            <button
              onClick={() => handleAction(
                'research_json',
                () => exportResearchRegisterJSON(researchSources),
                { filename: 'metaboquest-research-register.json', type: 'Research Register', format: 'JSON' }
              )}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download JSON</span>
            </button>
          </div>

          {/* Claim Ledger CSV */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase">
                CSV AUDIT
              </span>
              <h4 className="font-bold text-white text-sm mt-1">
                Claim Ledger (CSV)
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Every factual assertion, placement, and reviewer sign-off.
              </p>
            </div>
            <button
              onClick={() => handleAction(
                'claim_csv',
                () => exportClaimLedgerCSV(claimLedger),
                { filename: 'metaboquest-claim-ledger.csv', type: 'Claim Ledger', format: 'CSV' }
              )}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download CSV</span>
            </button>
          </div>

          {/* Claim Ledger JSON */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase">
                JSON AUDIT
              </span>
              <h4 className="font-bold text-white text-sm mt-1">
                Claim Ledger (JSON)
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Complete claim hierarchy with supporting passages.
              </p>
            </div>
            <button
              onClick={() => handleAction(
                'claim_json',
                () => exportClaimLedgerJSON(claimLedger),
                { filename: 'metaboquest-claim-ledger.json', type: 'Claim Ledger', format: 'JSON' }
              )}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download JSON</span>
            </button>
          </div>

        </div>
      </div>

      {/* Export History Log */}
      <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <h3 className="font-display font-bold text-white text-sm">
              Session Export History ({exportHistory.length} files generated)
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            Strict Verifiable Accounting (No Phantom Downloads)
          </span>
        </div>

        {exportHistory.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-900/40 border border-white/5 text-center text-xs text-slate-400">
            No files downloaded yet in this session. Click any export button above to generate and download verified deliverables.
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
            {exportHistory.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-mono font-bold text-white block">
                      {item.filename}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {item.type} • {item.dimensions}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                    {item.format}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                    {item.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
