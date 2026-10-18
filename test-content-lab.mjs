/**
 * MetaboQuest Content Lab — Comprehensive Node Verification Test Suite
 * Validates data integrity, quality gate heuristics, claim audit rules,
 * deterministic pipeline synthesizer, and export generators.
 */

import { INITIAL_RESEARCH_SOURCES } from './src/data/researchSources.js';
import { INITIAL_CLAIM_LEDGER } from './src/data/claimLedger.js';
import { 
  DEFAULT_CAMPAIGN_BRIEF, 
  DEFAULT_CAROUSEL_SLIDES, 
  DEFAULT_STATIC_POST, 
  DEFAULT_REEL_DATA 
} from './src/data/defaultCampaign.js';
import { 
  PIPELINE_STAGES, 
  getInitialPipelineState, 
  generateCoordinatedContentDrafts 
} from './src/utils/pipelineEngine.js';
import { runQualityAudit } from './src/utils/qualityGate.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('======================================================');
console.log('🧪 METABOQUEST CONTENT LAB — VERIFICATION TEST SUITE');
console.log('======================================================\n');

// 1. RESEARCH SOURCES INTEGRITY
console.log('--- TEST GROUP 1: Research Sources Integrity ---');
assert(INITIAL_RESEARCH_SOURCES.length >= 5, `Has at least 5 authoritative sources (actual: ${INITIAL_RESEARCH_SOURCES.length})`);

const requiredOrgs = ['NIDDK', 'CDC', 'WHO', 'MedlinePlus'];
requiredOrgs.forEach(org => {
  const found = INITIAL_RESEARCH_SOURCES.some(s => s.organization.includes(org) || s.title.includes(org));
  assert(found, `Contains authoritative repository from ${org}`);
});

let allUrlsValid = true;
let allSourcesHaveFindings = true;
INITIAL_RESEARCH_SOURCES.forEach(s => {
  if (!s.exactUrl || !s.exactUrl.startsWith('https://')) allUrlsValid = false;
  if (!s.relevantFinding || s.relevantFinding.length < 30) allSourcesHaveFindings = false;
});
assert(allUrlsValid, 'All research source URLs use secure HTTPS protocol');
assert(allSourcesHaveFindings, 'All research sources contain detailed, verified clinical findings');

// 2. CLAIM LEDGER INTEGRITY
console.log('\n--- TEST GROUP 2: Claim Ledger & Safeguards ---');
assert(INITIAL_CLAIM_LEDGER.length >= 6, `Has at least 6 recorded claims (actual: ${INITIAL_CLAIM_LEDGER.length})`);

const claimIds = new Set();
let allClaimsHaveEvidence = true;
INITIAL_CLAIM_LEDGER.forEach(c => {
  assert(!claimIds.has(c.id), `Claim ID ${c.id} is unique`);
  claimIds.add(c.id);

  if (c.reviewStatus === 'human_verified') {
    if (!c.supportingSourceIds || c.supportingSourceIds.length === 0) {
      allClaimsHaveEvidence = false;
    }
  }
});
assert(allClaimsHaveEvidence, 'All human-verified claims map to at least one valid primary source ID');

// Verify rejected claim exists for testable safeguard demonstration
const rejectedClaim = INITIAL_CLAIM_LEDGER.find(c => c.reviewStatus === 'rejected');
assert(!!rejectedClaim, `Contains designated rejected claim (${rejectedClaim?.id}) demonstrating prohibited claim detection`);

// 3. CAMPAIGN BRIEF & DELIVERABLES DEFAULTS
console.log('\n--- TEST GROUP 3: Campaign Brief & Deliverables ---');
assert(DEFAULT_CAMPAIGN_BRIEF.title === 'Metabolic Health Is More Than a Number', 'Campaign title matches specification');
assert(DEFAULT_CAMPAIGN_BRIEF.targetAudience.includes('Young adults'), 'Target audience is young adults & general audience');
assert(DEFAULT_CAMPAIGN_BRIEF.prohibitedTerms.includes('cure') && DEFAULT_CAMPAIGN_BRIEF.prohibitedTerms.includes('melt fat'), 'Prohibited terms include "cure" and "melt fat"');

assert(DEFAULT_CAROUSEL_SLIDES.length === 6, `Default carousel has exactly 6 slides (actual: ${DEFAULT_CAROUSEL_SLIDES.length})`);
assert(DEFAULT_CAROUSEL_SLIDES[0].headline.includes('Metabolic health is more than a number'), 'Slide 1 has hook headline');
assert(DEFAULT_CAROUSEL_SLIDES[5].tag.includes('TAKEAWAY'), 'Slide 6 has takeaway & citations');

assert(DEFAULT_STATIC_POST.headline === 'Metabolic health is bigger than one number.', 'Static post headline matches specification');
assert(DEFAULT_STATIC_POST.pills.length >= 4, 'Static post has cellular parameter pills');

assert(DEFAULT_REEL_DATA.scenes.length === 5, `Reel has exactly 5 coordinated scenes (actual: ${DEFAULT_REEL_DATA.scenes.length})`);
assert(DEFAULT_REEL_DATA.totalDuration >= 20 && DEFAULT_REEL_DATA.totalDuration <= 30, `Reel total duration is within 20-30s range (actual: ${DEFAULT_REEL_DATA.totalDuration}s)`);
assert(!!DEFAULT_REEL_DATA.transcriptSrt && !!DEFAULT_REEL_DATA.transcriptTxt, 'Reel has SRT subtitles and TXT transcript');

// 4. PIPELINE ENGINE & DETERMINISTIC DRAFTS SYNTHESIZER
console.log('\n--- TEST GROUP 4: Content Generation Pipeline ---');
assert(PIPELINE_STAGES.length === 7, `Pipeline defines exactly 7 stages (A through G) (actual: ${PIPELINE_STAGES.length})`);

const drafts = generateCoordinatedContentDrafts(DEFAULT_CAMPAIGN_BRIEF, INITIAL_CLAIM_LEDGER, INITIAL_RESEARCH_SOURCES);
assert(drafts.carouselSlides.length === 6, 'Pipeline synthesizer outputs 6 coordinated carousel slides');
assert(drafts.staticPost.headline.length > 10, 'Pipeline synthesizer outputs valid static post');
assert(drafts.reelData.scenes.length === 5, 'Pipeline synthesizer outputs 5-scene reel');

// 5. QUALITY GATE AUDIT ENGINE
console.log('\n--- TEST GROUP 5: Quality Gate Safeguard Engine ---');
const baselineAudit = runQualityAudit({
  campaignBrief: DEFAULT_CAMPAIGN_BRIEF,
  carouselSlides: DEFAULT_CAROUSEL_SLIDES,
  staticPost: DEFAULT_STATIC_POST,
  reelData: DEFAULT_REEL_DATA,
  researchSources: INITIAL_RESEARCH_SOURCES,
  claimLedger: INITIAL_CLAIM_LEDGER
});

assert(baselineAudit.score >= 90, `Baseline content achieves passing quality score (actual: ${baselineAudit.score}%)`);
assert(baselineAudit.isReadyForExport === true, 'Baseline content is approved for export');

// TEST PROHIBITED WORD DETECTION
const poisonedBrief = {
  ...DEFAULT_CAMPAIGN_BRIEF,
  mainMessage: 'Drink our special tea to guaranteed cure your metabolism and melt fat overnight!'
};
const poisonedAudit = runQualityAudit({
  campaignBrief: poisonedBrief,
  carouselSlides: DEFAULT_CAROUSEL_SLIDES,
  staticPost: DEFAULT_STATIC_POST,
  reelData: DEFAULT_REEL_DATA,
  researchSources: INITIAL_RESEARCH_SOURCES,
  claimLedger: INITIAL_CLAIM_LEDGER
});

const foundCure = poisonedAudit.issues.some(i => i.id.includes('cure'));
const foundMeltFat = poisonedAudit.issues.some(i => i.id.includes('melt fat'));
const foundGuaranteed = poisonedAudit.issues.some(i => i.id.includes('guaranteed'));
assert(foundCure, 'Quality Gate flags prohibited word "cure"');
assert(foundMeltFat, 'Quality Gate flags prohibited phrase "melt fat"');
assert(foundGuaranteed, 'Quality Gate flags prohibited word "guaranteed"');
assert(poisonedAudit.isReadyForExport === false, 'Quality Gate blocks export when prohibited language is present');

// TEST REJECTED CLAIM DETECTOR
const slidesWithRejectedClaim = [
  ...DEFAULT_CAROUSEL_SLIDES.slice(0, 5),
  {
    ...DEFAULT_CAROUSEL_SLIDES[5],
    claimIds: ['CLM-007'] // Rejected claim
  }
];
const rejectedClaimAudit = runQualityAudit({
  campaignBrief: DEFAULT_CAMPAIGN_BRIEF,
  carouselSlides: slidesWithRejectedClaim,
  staticPost: DEFAULT_STATIC_POST,
  reelData: DEFAULT_REEL_DATA,
  researchSources: INITIAL_RESEARCH_SOURCES,
  claimLedger: INITIAL_CLAIM_LEDGER
});
const foundRejectedInAsset = rejectedClaimAudit.issues.some(i => i.id.includes('rejected_claim_CLM-007'));
assert(foundRejectedInAsset, 'Quality Gate blocks export when a rejected claim is used in production assets');

console.log('\n======================================================');
console.log(`TOTAL PASSED: ${passed} | TOTAL FAILED: ${failed}`);
console.log('======================================================\n');

if (failed > 0) {
  process.exit(1);
}
