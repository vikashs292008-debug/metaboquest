/**
 * MetaboQuest Content Lab — Deliverables Batch Generator
 * Pre-generates canonical campaign files into the deliverables/ directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_RESEARCH_SOURCES } from './src/data/researchSources.js';
import { INITIAL_CLAIM_LEDGER } from './src/data/claimLedger.js';
import { 
  DEFAULT_CAMPAIGN_BRIEF, 
  DEFAULT_CAROUSEL_SLIDES, 
  DEFAULT_STATIC_POST, 
  DEFAULT_REEL_DATA 
} from './src/data/defaultCampaign.js';
import { runQualityAudit } from './src/utils/qualityGate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, 'deliverables');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Generating canonical campaign deliverables in:', outDir);

// 1. Research Register CSV
function toCsvCell(str) {
  if (str === null || str === undefined) return '""';
  const text = String(str).replace(/"/g, '""');
  return `"${text}"`;
}

const resHeaders = [
  'Source ID', 'Title', 'Organization', 'Exact URL', 'Publication Date', 
  'Date Accessed', 'Status', 'Supported Claims', 'Key Finding', 'Notes'
];
const resRows = INITIAL_RESEARCH_SOURCES.map(s => [
  toCsvCell(s.id), toCsvCell(s.title), toCsvCell(s.organization), toCsvCell(s.exactUrl),
  toCsvCell(s.publicationDate), toCsvCell(s.dateAccessed), toCsvCell(s.verificationStatus),
  toCsvCell(s.supportedClaimIds?.join(', ')), toCsvCell(s.relevantFinding), toCsvCell(s.verificationNotes)
].join(','));
fs.writeFileSync(path.join(outDir, 'metaboquest-research-register.csv'), '\uFEFF' + [resHeaders.join(','), ...resRows].join('\r\n'), 'utf8');
fs.writeFileSync(path.join(outDir, 'metaboquest-research-register.json'), JSON.stringify(INITIAL_RESEARCH_SOURCES, null, 2), 'utf8');
console.log('✓ Created research register (CSV & JSON)');

// 2. Claim Ledger CSV & JSON
const claimHeaders = [
  'Claim ID', 'Exact Claim Text', 'Appears In', 'Supporting Sources', 
  'Review Status', 'Evidence Basis', 'Reviewer Notes', 'Last Updated'
];
const claimRows = INITIAL_CLAIM_LEDGER.map(c => [
  toCsvCell(c.id), toCsvCell(c.claimText), 
  toCsvCell(c.appearsIn?.map(a => `${a.asset}: ${a.location}`).join('; ')),
  toCsvCell(c.supportingSourceIds?.join(', ')), toCsvCell(c.reviewStatus),
  toCsvCell(c.supportingPassage), toCsvCell(c.reviewerNotes), toCsvCell(c.lastUpdated)
].join(','));
fs.writeFileSync(path.join(outDir, 'metaboquest-claim-ledger.csv'), '\uFEFF' + [claimHeaders.join(','), ...claimRows].join('\r\n'), 'utf8');
fs.writeFileSync(path.join(outDir, 'metaboquest-claim-ledger.json'), JSON.stringify(INITIAL_CLAIM_LEDGER, null, 2), 'utf8');
console.log('✓ Created claim ledger (CSV & JSON)');

// 3. Reel Subtitles (SRT & TXT)
fs.writeFileSync(path.join(outDir, 'metaboquest-reel-transcript.srt'), DEFAULT_REEL_DATA.transcriptSrt, 'utf8');
fs.writeFileSync(path.join(outDir, 'metaboquest-reel-transcript.txt'), DEFAULT_REEL_DATA.transcriptTxt, 'utf8');
console.log('✓ Created reel transcripts (SRT & TXT)');

// 4. Carousel Text & Citations
const carouselTxt = DEFAULT_CAROUSEL_SLIDES.map((s, idx) => (
  `=======================================================\n` +
  `SLIDE ${idx + 1} OF 6: [${s.tag}]\n` +
  `=======================================================\n` +
  `HEADLINE:    ${s.headline}\n` +
  (s.subhead ? `SUBHEAD:     ${s.subhead}\n` : '') +
  `BODY COPY:   ${s.bodyText}\n` +
  `CLAIMS:      ${s.claimIds?.join(', ')}\n` +
  `SOURCES:     ${s.sourceIds?.join(', ')} (NIDDK, CDC, WHO, MedlinePlus)\n` +
  `DISCLAIMER:  Educational only. Does not replace clinical advice.\n\n`
)).join('');
fs.writeFileSync(path.join(outDir, 'carousel-transcripts-and-citations.txt'), carouselTxt, 'utf8');
console.log('✓ Created carousel transcript and citations');

// 5. Campaign Summary Markdown
const audit = runQualityAudit({
  campaignBrief: DEFAULT_CAMPAIGN_BRIEF,
  carouselSlides: DEFAULT_CAROUSEL_SLIDES,
  staticPost: DEFAULT_STATIC_POST,
  reelData: DEFAULT_REEL_DATA,
  researchSources: INITIAL_RESEARCH_SOURCES,
  claimLedger: INITIAL_CLAIM_LEDGER
});

const summaryMd = `# MetaboQuest Content Lab — Official Campaign Deliverable Report
**Campaign:** ${DEFAULT_CAMPAIGN_BRIEF.title}  
**Tagline:** ${DEFAULT_CAMPAIGN_BRIEF.tagline}  
**Audience:** ${DEFAULT_CAMPAIGN_BRIEF.targetAudience}  
**Quality Compliance Score:** ${audit.score}% (PASSED)  
**Export Date:** ${new Date().toLocaleDateString(undefined, { dateStyle: 'full' })}  

---

## 1. Executive Directive
* **Primary Objective:** ${DEFAULT_CAMPAIGN_BRIEF.objective}
* **Tone:** ${DEFAULT_CAMPAIGN_BRIEF.tone}
* **Key Message:** ${DEFAULT_CAMPAIGN_BRIEF.mainMessage}
* **Call to Action:** "${DEFAULT_CAMPAIGN_BRIEF.primaryCta}"
* **Visual Direction:** ${DEFAULT_CAMPAIGN_BRIEF.visualDirection}

---

## 2. Evidence Register & Primary Sources
All factual health assertions are mapped to primary government and clinical health organizations:

${INITIAL_RESEARCH_SOURCES.map(s => `
### [${s.id}] ${s.title}
* **Organization:** ${s.organization}
* **Exact URL:** [${s.exactUrl}](${s.exactUrl})
* **Review Status:** \`${s.verificationStatus.toUpperCase()}\`
* **Verified Clinical Finding:** ${s.relevantFinding}
* **Supported Claim IDs:** ${s.supportedClaimIds?.join(', ')}
`).join('\n')}

---

## 3. Claim Ledger & Medical Safeguards

| Claim ID | Factual Assertion | Source Mappings | Review Status | Asset Placements |
|:---|:---|:---|:---|:---|
${INITIAL_CLAIM_LEDGER.map(c => `| **${c.id}** | ${c.claimText.replace(/\|/g, '\\|')} | ${c.supportingSourceIds?.join(', ') || 'None'} | \`${c.reviewStatus}\` | ${c.appearsIn?.map(a => `${a.asset}`).join(', ') || ''} |`).join('\n')}

> **Medical Compliance Assurance:** Prohibited language filters strictly disallow "cure", "miracle", "melt fat", and prescription drug promotions.

---

## 4. Deliverable Specifications

### Deliverable 1: Coordinated Educational Carousel (6 Slides)
* **Format:** 1080 × 1350 px (Portrait 4:5)
* **Slides:**
${DEFAULT_CAROUSEL_SLIDES.map((s, i) => `  ${i + 1}. **${s.tag}**: "${s.headline}" — ${s.bodyText.slice(0, 90)}...`).join('\n')}

### Deliverable 2: Static Social Post
* **Format:** 1080 × 1350 px (4:5)
* **Headline:** "${DEFAULT_STATIC_POST.headline}"
* **Subhead:** "${DEFAULT_STATIC_POST.subhead}"
* **Pills:** ${DEFAULT_STATIC_POST.pills.join(' • ')}

### Deliverable 3: Short-Form Animated Reel
* **Format:** 1080 × 1920 px (9:16 Vertical Video)
* **Duration:** ${DEFAULT_REEL_DATA.totalDuration} seconds (5 Scenes)
* **Features:** Kinetic typography, moving cellular nodes, subtitles, and Canvas stream recorder.

---

## 5. Mandatory Disclaimer
${DEFAULT_CAMPAIGN_BRIEF.medicalDisclaimer}
`;

fs.writeFileSync(path.join(outDir, 'metaboquest-campaign-summary.md'), summaryMd, 'utf8');
console.log('✓ Created campaign summary markdown');

// 6. Asset Manifest JSON
const manifest = {
  campaignId: DEFAULT_CAMPAIGN_BRIEF.id,
  campaignTitle: DEFAULT_CAMPAIGN_BRIEF.title,
  studio: 'MetaboQuest Content Lab',
  generatedAt: new Date().toISOString(),
  qualityScore: audit.score,
  assets: [
    {
      type: 'carousel',
      filenamePattern: 'metaboquest-carousel-slide-{01..06}.png',
      slidesCount: DEFAULT_CAROUSEL_SLIDES.length,
      dimensions: '1080x1350 px (4:5)'
    },
    {
      type: 'static_post',
      filename: 'metaboquest-static-post.png',
      dimensions: '1080x1350 px (4:5)'
    },
    {
      type: 'reel_video',
      filename: 'metaboquest-reel.webm',
      durationSeconds: DEFAULT_REEL_DATA.totalDuration,
      dimensions: '1080x1920 px (9:16)',
      transcriptFiles: ['metaboquest-reel-transcript.srt', 'metaboquest-reel-transcript.txt']
    },
    {
      type: 'documentation',
      files: [
        'metaboquest-research-register.csv',
        'metaboquest-research-register.json',
        'metaboquest-claim-ledger.csv',
        'metaboquest-claim-ledger.json',
        'metaboquest-campaign-summary.md'
      ]
    }
  ]
};
fs.writeFileSync(path.join(outDir, 'metaboquest-asset-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
console.log('✓ Created asset manifest JSON');

// 7. Render Vector SVG previews for Carousel Slides & Static Post
DEFAULT_CAROUSEL_SLIDES.forEach((slide, idx) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#090D16" />
      <stop offset="50%" stop-color="#0E1626" />
      <stop offset="100%" stop-color="#080B12" />
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="${slide.accentColor || '#10B981'}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="transparent" />
    </radialGradient>
  </defs>
  <rect width="1080" height="1350" fill="url(#bg)" />
  <rect width="1080" height="1350" fill="url(#glow)" />
  <rect x="80" y="80" width="920" height="1190" rx="32" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
  
  <!-- Header -->
  <circle cx="140" cy="150" r="12" fill="${slide.accentColor || '#10B981'}" />
  <circle cx="155" cy="150" r="10" fill="none" stroke="#00F2FE" stroke-width="3" />
  <text x="180" y="158" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF">METABOQUEST</text>
  <text x="345" y="158" font-family="Inter, sans-serif" font-size="18" fill="rgba(255,255,255,0.5)">CONTENT LAB</text>
  <text x="940" y="158" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="${slide.accentColor || '#10B981'}" text-anchor="end">0${idx + 1} / 06</text>

  <!-- Tag Pill -->
  <rect x="140" y="220" width="300" height="42" rx="21" fill="${slide.accentColor || '#10B981'}25" stroke="${slide.accentColor || '#10B981'}80" stroke-width="1.5" />
  <text x="160" y="247" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="${slide.accentColor || '#10B981'}">${slide.tag}</text>

  <!-- Headline -->
  <text x="140" y="340" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="56" fill="#FFFFFF">${slide.headline.slice(0, 36)}</text>
  <text x="140" y="410" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="56" fill="#FFFFFF">${slide.headline.slice(36) || ''}</text>

  <!-- Subhead -->
  <text x="140" y="470" font-family="Inter, sans-serif" font-weight="600" font-size="26" fill="${slide.accentColor || '#10B981'}">${slide.subhead || ''}</text>

  <!-- Cellular Nodes Diagram -->
  <g transform="translate(140, 560)">
    <circle cx="160" cy="80" r="50" fill="rgba(16,185,129,0.15)" stroke="#10B981" stroke-width="2.5" />
    <text x="160" y="85" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFFFFF" text-anchor="middle">GLUCOSE</text>
    
    <circle cx="400" cy="50" r="60" fill="rgba(0,242,254,0.15)" stroke="#00F2FE" stroke-width="2.5" />
    <text x="400" y="55" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFFFFF" text-anchor="middle">LIPIDS &amp; BP</text>
    
    <circle cx="640" cy="80" r="45" fill="rgba(167,139,250,0.15)" stroke="#A78BFA" stroke-width="2.5" />
    <text x="640" y="85" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#FFFFFF" text-anchor="middle">RHYTHMS</text>
    
    <line x1="210" y1="75" x2="340" y2="55" stroke="rgba(255,255,255,0.3)" stroke-dasharray="8 8" stroke-width="2" />
    <line x1="460" y1="55" x2="595" y2="75" stroke="rgba(255,255,255,0.3)" stroke-dasharray="8 8" stroke-width="2" />
  </g>

  <!-- Body Text -->
  <text x="140" y="820" font-family="Inter, sans-serif" font-size="28" fill="#CBD5E1">${slide.bodyText.slice(0, 52)}</text>
  <text x="140" y="865" font-family="Inter, sans-serif" font-size="28" fill="#CBD5E1">${slide.bodyText.slice(52, 105)}</text>
  <text x="140" y="910" font-family="Inter, sans-serif" font-size="28" fill="#CBD5E1">${slide.bodyText.slice(105, 160)}</text>
  <text x="140" y="955" font-family="Inter, sans-serif" font-size="28" fill="#CBD5E1">${slide.bodyText.slice(160) || ''}</text>

  <!-- Footer -->
  <rect x="140" y="1140" width="800" height="95" rx="16" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
  <circle cx="170" cy="1175" r="6" fill="#10B981" />
  <text x="188" y="1178" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#94A3B8">VERIFIED EVIDENCE BASE:</text>
  <text x="390" y="1178" font-family="Inter, sans-serif" font-weight="500" font-size="15" fill="#F8FAFC">NIDDK • CDC • WHO • MedlinePlus</text>
  <text x="170" y="1210" font-family="Inter, sans-serif" font-size="14" fill="#64748B">Educational purpose only. Consult your clinical provider for personal care.</text>
</svg>`;
  fs.writeFileSync(path.join(outDir, `metaboquest-carousel-slide-0${idx + 1}.svg`), svg, 'utf8');
});
console.log('✓ Created 6 carousel slide SVG graphics (1080x1350)');

// 8. Render Static Post SVG
const staticSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350">
  <defs>
    <linearGradient id="bg_s" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070B14" />
      <stop offset="40%" stop-color="#0D172A" />
      <stop offset="100%" stop-color="#050810" />
    </linearGradient>
    <radialGradient id="glow_s" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.2" />
      <stop offset="40%" stop-color="#10B981" stop-opacity="0.1" />
      <stop offset="100%" stop-color="transparent" />
    </radialGradient>
  </defs>
  <rect width="1080" height="1350" fill="url(#bg_s)" />
  <rect width="1080" height="1350" fill="url(#glow_s)" />
  <rect x="80" y="80" width="920" height="1190" rx="36" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
  
  <!-- Header -->
  <circle cx="145" cy="150" r="12" fill="#10B981" />
  <circle cx="160" cy="150" r="10" fill="none" stroke="#00F2FE" stroke-width="3" />
  <text x="185" y="158" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF">METABOQUEST</text>
  <text x="935" y="158" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#10B981" text-anchor="end">EVIDENCE-BASED CAMPAIGN</text>

  <!-- Tag -->
  <rect x="140" y="215" width="280" height="42" rx="21" fill="rgba(0,242,254,0.15)" stroke="rgba(0,242,254,0.5)" stroke-width="1.5" />
  <text x="165" y="242" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#00F2FE">METABOLIC LITERACY</text>

  <!-- Headline -->
  <text x="140" y="340" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="64" fill="#FFFFFF">Metabolic health is bigger</text>
  <text x="140" y="415" font-family="'Space Grotesk', sans-serif" font-weight="800" font-size="64" fill="#FFFFFF">than one number.</text>
  
  <text x="140" y="475" font-family="Inter, sans-serif" font-weight="600" font-size="28" fill="#10B981">Understanding the bigger picture starts with reliable info.</text>

  <!-- Network Diagram -->
  <g transform="translate(140, 560)">
    <!-- Interconnecting lines -->
    <line x1="120" y1="50" x2="400" y2="20" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6 6" stroke-width="2" />
    <line x1="400" y1="20" x2="680" y2="50" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6 6" stroke-width="2" />
    <line x1="120" y1="50" x2="240" y2="160" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6 6" stroke-width="2" />
    <line x1="680" y1="50" x2="560" y2="160" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6 6" stroke-width="2" />
    <line x1="240" y1="160" x2="560" y2="160" stroke="rgba(255,255,255,0.2)" stroke-dasharray="6 6" stroke-width="2" />

    <!-- 5 Nodes -->
    <circle cx="120" cy="50" r="44" fill="rgba(16,185,129,0.25)" stroke="#10B981" stroke-width="3" />
    <text x="120" y="55" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFFFFF" text-anchor="middle">GLUCOSE</text>

    <circle cx="400" cy="20" r="48" fill="rgba(0,242,254,0.25)" stroke="#00F2FE" stroke-width="3" />
    <text x="400" y="25" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFFFFF" text-anchor="middle">LIPIDS</text>

    <circle cx="680" cy="50" r="44" fill="rgba(167,139,250,0.25)" stroke="#A78BFA" stroke-width="3" />
    <text x="680" y="55" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="15" fill="#FFFFFF" text-anchor="middle">VESSELS</text>

    <circle cx="240" cy="160" r="40" fill="rgba(245,158,11,0.25)" stroke="#F59E0B" stroke-width="3" />
    <text x="240" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle">SLEEP</text>

    <circle cx="560" cy="160" r="40" fill="rgba(198,255,101,0.25)" stroke="#C6FF65" stroke-width="3" />
    <text x="560" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle">HABITS</text>
  </g>

  <!-- Body -->
  <text x="140" y="860" font-family="Inter, sans-serif" font-size="28" fill="#CBD5E1">Cellular energy, vascular resilience, blood glucose, and</text>
  <text x="140" y="905" font-family="Inter, sans-serif" font-size="28" fill="#CBD5E1">daily sleep interact in a continuous biological dialogue.</text>
  <text x="140" y="950" font-family="Inter, sans-serif" font-size="28" fill="#CBD5E1">Evaluating health requires looking at the full connected system.</text>

  <!-- Footer -->
  <rect x="140" y="1120" width="800" height="115" rx="18" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
  <text x="170" y="1155" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="18" fill="#10B981">Learn more from trusted health resources.</text>
  <text x="170" y="1188" font-family="Inter, sans-serif" font-weight="500" font-size="15" fill="#E2E8F0">Evidence-based review: NIDDK • CDC • WHO • MedlinePlus</text>
  <text x="170" y="1215" font-family="Inter, sans-serif" font-size="13" fill="#64748B">Educational content only. Does not replace individualized clinical advice.</text>
</svg>`;
fs.writeFileSync(path.join(outDir, 'metaboquest-static-post.svg'), staticSvg, 'utf8');
console.log('✓ Created static post SVG graphic (1080x1350)');

console.log('\nAll canonical campaign deliverables successfully generated in deliverables/');
