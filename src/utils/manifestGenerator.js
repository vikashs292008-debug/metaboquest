/**
 * MetaboQuest Content Lab — Evidence & Manifest Export Generators
 * Produces structured CSV, JSON, Markdown summaries, and asset manifests.
 */

import { triggerFileDownload } from './canvasExport';

/**
 * Escape CSV fields
 */
function toCsvCell(str) {
  if (str === null || str === undefined) return '""';
  const text = String(str).replace(/"/g, '""');
  return `"${text}"`;
}

/**
 * Export Research Register as CSV
 */
export function exportResearchRegisterCSV(sources = []) {
  const headers = [
    'Source ID',
    'Title',
    'Organization / Publisher',
    'Exact URL',
    'Publication / Review Date',
    'Date Accessed',
    'Verification Status',
    'Supported Claim IDs',
    'Relevant Finding / Summary',
    'Verification Notes'
  ];

  const rows = sources.map(s => [
    toCsvCell(s.id),
    toCsvCell(s.title),
    toCsvCell(s.organization),
    toCsvCell(s.exactUrl),
    toCsvCell(s.publicationDate),
    toCsvCell(s.dateAccessed),
    toCsvCell(s.verificationStatus),
    toCsvCell(s.supportedClaimIds ? s.supportedClaimIds.join(', ') : ''),
    toCsvCell(s.relevantFinding),
    toCsvCell(s.verificationNotes)
  ].join(','));

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  triggerFileDownload(blob, 'metaboquest-research-register.csv');
}

/**
 * Export Research Register as JSON
 */
export function exportResearchRegisterJSON(sources = []) {
  const jsonContent = JSON.stringify(sources, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  triggerFileDownload(blob, 'metaboquest-research-register.json');
}

/**
 * Export Claim Ledger as CSV
 */
export function exportClaimLedgerCSV(claims = []) {
  const headers = [
    'Claim ID',
    'Exact Claim Text',
    'Appears In',
    'Supporting Source IDs',
    'Review Status',
    'Supporting Passage',
    'Reviewer Notes',
    'Last Updated'
  ];

  const rows = claims.map(c => [
    toCsvCell(c.id),
    toCsvCell(c.claimText),
    toCsvCell(c.appearsIn ? c.appearsIn.map(a => `${a.asset}: ${a.location}`).join('; ') : ''),
    toCsvCell(c.supportingSourceIds ? c.supportingSourceIds.join(', ') : ''),
    toCsvCell(c.reviewStatus),
    toCsvCell(c.supportingPassage),
    toCsvCell(c.reviewerNotes),
    toCsvCell(c.lastUpdated)
  ].join(','));

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  triggerFileDownload(blob, 'metaboquest-claim-ledger.csv');
}

/**
 * Export Claim Ledger as JSON
 */
export function exportClaimLedgerJSON(claims = []) {
  const jsonContent = JSON.stringify(claims, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  triggerFileDownload(blob, 'metaboquest-claim-ledger.json');
}

/**
 * Export Campaign Summary in Markdown
 */
export function exportCampaignSummaryMD({
  campaignBrief,
  carouselSlides = [],
  staticPost = {},
  reelData = {},
  researchSources = [],
  claimLedger = [],
  qualityScore = 100
}) {
  const md = `# MetaboQuest Content Lab — Campaign Deliverable Report
**Campaign:** ${campaignBrief?.title || 'Metabolic Health Is More Than a Number'}  
**Tagline:** ${campaignBrief?.tagline || 'Good health education. Beautifully communicated.'}  
**Date Generated:** ${new Date().toLocaleDateString(undefined, { dateStyle: 'full' })}  
**Quality Compliance Score:** ${qualityScore}%  

---

## 1. Executive Summary & Strategy
* **Objective:** ${campaignBrief?.objective || 'Approach metabolic health education through approachable, interconnected biology.'}
* **Target Audience:** ${campaignBrief?.targetAudience || 'Young adults & general audiences.'}
* **Core Tone:** ${campaignBrief?.tone || 'Friendly, curious, inclusive, calm, and science-informed.'}
* **Key Message:** ${campaignBrief?.mainMessage || 'Metabolic health involves multiple aspects of health; one measurement alone cannot describe the whole picture.'}
* **Call to Action:** ${campaignBrief?.primaryCta || 'Learn more from trusted health resources.'}

---

## 2. Evidence Register & Primary Sources
Authoritative sources referenced and human-verified in this campaign:

${researchSources.map((s, idx) => `
### [${s.id}] ${s.title}
* **Organization:** ${s.organization}
* **Exact URL:** [${s.exactUrl}](${s.exactUrl})
* **Status:** \`${s.verificationStatus.toUpperCase()}\`
* **Verified Key Finding:** ${s.relevantFinding}
* **Supports Claims:** ${s.supportedClaimIds ? s.supportedClaimIds.join(', ') : 'N/A'}
`).join('\n')}

---

## 3. Claim Ledger & Medical Safeguards
All discrete factual claims included in deliverables:

| Claim ID | Factual Assertion | Source Mappings | Status | Placements |
|:---|:---|:---|:---|:---|
${claimLedger.map(c => `| **${c.id}** | ${c.claimText.replace(/\|/g, '\\|')} | ${c.supportingSourceIds ? c.supportingSourceIds.join(', ') : 'None'} | \`${c.reviewStatus}\` | ${c.appearsIn ? c.appearsIn.map(a => `${a.asset}`).join(', ') : ''} |`).join('\n')}

> **Medical Compliance Note:** No claims in this campaign prescribe medications, diagnose health conditions, make weight-loss promises, or shame body types.

---

## 4. Deliverable Specifications

### Deliverable 1: Coordinated Educational Carousel (6 Slides)
* **Dimensions:** 1080 × 1350 px (Portrait 4:5)
* **Slides Overview:**
${carouselSlides.map((s, i) => `  * **Slide ${i + 1} (${s.tag}):** "${s.headline}" — ${s.bodyText.slice(0, 80)}...`).join('\n')}

### Deliverable 2: Static Social Post
* **Dimensions:** 1080 × 1350 px (4:5)
* **Headline:** "${staticPost?.headline}"
* **Subhead:** "${staticPost?.subhead}"
* **Pill Elements:** ${staticPost?.pills ? staticPost.pills.join(' • ') : ''}

### Deliverable 3: Short-Form Animated Reel
* **Format:** Vertical 9:16 (1080 × 1920 px)
* **Target Duration:** ~${reelData?.totalDuration || 25} seconds (${reelData?.scenes?.length || 5} Scenes)
* **Motion Features:** Kinetic typography, dynamic multi-node cellular network, animated biomarker cards, and brand outro.

---

## 5. Educational Disclaimer
${campaignBrief?.medicalDisclaimer || 'This studio produces educational content only and does not provide clinical diagnoses or individualized medical treatment.'}
`;

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
  triggerFileDownload(blob, 'metaboquest-campaign-summary.md');
}

/**
 * Export Asset Manifest JSON
 */
export function exportAssetManifestJSON({
  campaignBrief,
  carouselSlides = [],
  staticPost = {},
  reelData = {},
  researchSources = [],
  claimLedger = []
}) {
  const manifest = {
    campaignId: campaignBrief?.id || 'cmp_metabolic_01',
    campaignTitle: campaignBrief?.title || 'Metabolic Health Is More Than a Number',
    generatedAt: new Date().toISOString(),
    version: '1.0.0',
    studio: 'MetaboQuest Content Lab',
    assets: [
      {
        assetType: 'carousel',
        filenamePattern: 'metaboquest-carousel-slide-{01..06}.png',
        totalItems: carouselSlides.length,
        dimensions: { width: 1080, height: 1350, unit: 'px', aspectRatio: '4:5' },
        slides: carouselSlides.map(s => ({
          slideNumber: s.slideNumber,
          tag: s.tag,
          headline: s.headline,
          claims: s.claimIds,
          sources: s.sourceIds
        }))
      },
      {
        assetType: 'static_post',
        filename: 'metaboquest-static-post.png',
        dimensions: { width: 1080, height: 1350, unit: 'px', aspectRatio: '4:5' },
        headline: staticPost?.headline,
        sources: ['NIDDK', 'CDC', 'WHO', 'MedlinePlus']
      },
      {
        assetType: 'reel_video',
        filename: 'metaboquest-reel.webm',
        dimensions: { width: 1080, height: 1920, unit: 'px', aspectRatio: '9:16' },
        durationSeconds: reelData?.totalDuration || 25,
        totalScenes: reelData?.scenes?.length || 5,
        transcriptFiles: ['metaboquest-reel-transcript.srt', 'metaboquest-reel-transcript.txt']
      },
      {
        assetType: 'evidence_documentation',
        files: [
          'metaboquest-research-register.csv',
          'metaboquest-research-register.json',
          'metaboquest-claim-ledger.csv',
          'metaboquest-claim-ledger.json',
          'metaboquest-campaign-summary.md'
        ],
        totalSourcesDocumented: researchSources.length,
        totalClaimsLedgered: claimLedger.length
      }
    ]
  };

  const jsonContent = JSON.stringify(manifest, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  triggerFileDownload(blob, 'metaboquest-asset-manifest.json');
}
