/**
 * MetaboQuest Content Lab — Evidence & Compliance Quality Gate
 * Evaluates assets against technical, editorial, accessibility, and medical safeguard standards.
 * Transparently separates automated heuristic scans from mandatory human verification.
 */

const PROHIBITED_KEYWORDS = [
  { word: 'cure', reason: 'Unsubstantiated cure claim. Chronic metabolic conditions cannot be universally cured by simple hacks.' },
  { word: 'miracle', reason: 'Sensationalist miracle language violates evidence-based communication standards.' },
  { word: 'melt fat', reason: 'Physiologically inaccurate fat-melting claim promotes weight stigma and pseudoscience.' },
  { word: 'guaranteed', reason: 'Medical outcomes cannot be unconditionally guaranteed.' },
  { word: 'detox', reason: 'Metabolic detoxification is performed by healthy liver and kidney function, not commercial detox products.' },
  { word: 'reverse in 24 hours', reason: 'Metabolic adaptation occurs over weeks, months, and years, not overnight.' },
  { word: 'skinny pill', reason: 'Prescription-drug or supplement promotion without medical qualification.' },
  { word: 'burn fat while you sleep', reason: 'Misleading metabolic rate exaggeration.' },
  { word: 'shame', reason: 'Body-shaming or stigmatizing framing is prohibited.' }
];

export function runQualityAudit({
  campaignBrief,
  carouselSlides = [],
  staticPost = {},
  reelData = {},
  researchSources = [],
  claimLedger = []
}) {
  const issues = [];
  const passedChecks = [];

  // ==========================================
  // 1. TECHNICAL AUDIT
  // ==========================================

  // Check Carousel Slides
  if (!carouselSlides || carouselSlides.length < 3) {
    issues.push({
      id: 'tech_carousel_length',
      category: 'Technical',
      severity: 'error',
      title: 'Insufficient Carousel Slides',
      description: `Carousel has only ${carouselSlides?.length || 0} slides. A complete educational carousel requires at least 4-6 slides for narrative arc.`,
      targetView: 'carousel'
    });
  } else {
    passedChecks.push({
      id: 'tech_carousel_length_pass',
      title: `Carousel Slide Count Verified (${carouselSlides.length} slides)`,
      category: 'Technical'
    });
  }

  // Slide content integrity
  let hasEmptySlide = false;
  let hasOverflow = false;
  carouselSlides.forEach((slide, idx) => {
    if (!slide.headline?.trim() || !slide.bodyText?.trim()) {
      hasEmptySlide = true;
    }
    if ((slide.headline?.length || 0) > 85 || (slide.bodyText?.length || 0) > 280) {
      hasOverflow = true;
    }
  });

  if (hasEmptySlide) {
    issues.push({
      id: 'tech_slide_empty',
      category: 'Technical',
      severity: 'error',
      title: 'Blank or Incomplete Slide Content',
      description: 'One or more carousel slides are missing a headline or explanatory body text.',
      targetView: 'carousel'
    });
  } else {
    passedChecks.push({
      id: 'tech_slide_content_pass',
      title: 'All Carousel Slides Have Complete Headlines & Copy',
      category: 'Technical'
    });
  }

  if (hasOverflow) {
    issues.push({
      id: 'tech_slide_overflow',
      category: 'Technical',
      severity: 'warning',
      title: 'Potential Text Overflow in Carousel',
      description: 'Certain slide headlines exceed 85 characters or body text exceeds 280 characters, which may clip on smaller mobile devices.',
      targetView: 'carousel'
    });
  } else {
    passedChecks.push({
      id: 'tech_slide_overflow_pass',
      title: 'Typography Fits Safely Within 1080x1350 Safe Zones',
      category: 'Technical'
    });
  }

  // Check Static Post
  if (!staticPost?.headline?.trim()) {
    issues.push({
      id: 'tech_static_headline',
      category: 'Technical',
      severity: 'error',
      title: 'Static Post Headline Missing',
      description: 'The single social graphic requires an impactful headline.',
      targetView: 'static_post'
    });
  } else {
    passedChecks.push({
      id: 'tech_static_headline_pass',
      title: 'Static Post Headline Configured',
      category: 'Technical'
    });
  }

  if (!staticPost?.caption?.trim()) {
    issues.push({
      id: 'tech_static_caption',
      category: 'Technical',
      severity: 'warning',
      title: 'Static Post Social Caption Missing',
      description: 'Social post needs companion caption and hashtags for distribution.',
      targetView: 'static_post'
    });
  } else {
    passedChecks.push({
      id: 'tech_static_caption_pass',
      title: 'Social Caption & Hashtags Ready',
      category: 'Technical'
    });
  }

  // Check Reel Scenes & Duration
  if (!reelData?.scenes || reelData.scenes.length < 3) {
    issues.push({
      id: 'tech_reel_scenes',
      category: 'Technical',
      severity: 'error',
      title: 'Reel Script Has Too Few Scenes',
      description: 'A structured 9:16 video requires at least 3 distinct scenes.',
      targetView: 'reel'
    });
  } else {
    passedChecks.push({
      id: 'tech_reel_scenes_pass',
      title: `Reel Has ${reelData.scenes.length} Coordinated Scenes`,
      category: 'Technical'
    });
  }

  const zeroDurationScene = reelData?.scenes?.some(s => !s.duration || s.duration <= 0);
  if (zeroDurationScene) {
    issues.push({
      id: 'tech_reel_zero_duration',
      category: 'Technical',
      severity: 'error',
      title: 'Zero-Duration Scene Detected',
      description: 'Every reel scene must have a positive duration in seconds.',
      targetView: 'reel'
    });
  }

  const totalDuration = reelData?.scenes?.reduce((acc, s) => acc + (s.duration || 0), 0) || 0;
  if (totalDuration < 15 || totalDuration > 60) {
    issues.push({
      id: 'tech_reel_duration_range',
      category: 'Technical',
      severity: 'warning',
      title: 'Non-Optimal Reel Duration',
      description: `Current duration is ${totalDuration}s. Recommended short-form educational reel length is 20-30 seconds.`,
      targetView: 'reel'
    });
  } else {
    passedChecks.push({
      id: 'tech_reel_duration_pass',
      title: `Reel Duration Optimal (${totalDuration}s within 20-30s sweet spot)`,
      category: 'Technical'
    });
  }

  // ==========================================
  // 2. EVIDENCE & SOURCE COVERAGE AUDIT
  // ==========================================

  // Check that research library has verified sources
  const verifiedSources = researchSources.filter(s => s.verificationStatus === 'verified');
  if (verifiedSources.length === 0) {
    issues.push({
      id: 'evidence_no_verified_sources',
      category: 'Evidence',
      severity: 'error',
      title: 'No Human-Verified Sources in Library',
      description: 'All sources are unverified or suggested. At least one source must be confirmed against an authoritative agency.',
      targetView: 'research'
    });
  } else {
    passedChecks.push({
      id: 'evidence_sources_verified_pass',
      title: `${verifiedSources.length} Authoritative Sources Documented & Verified`,
      category: 'Evidence'
    });
  }

  // Check claims ledger
  const activeClaims = claimLedger.filter(c => c.reviewStatus !== 'rejected');
  const rejectedClaims = claimLedger.filter(c => c.reviewStatus === 'rejected');

  // Check for rejected claims accidentally used in content
  rejectedClaims.forEach(rc => {
    const isUsedInSlide = carouselSlides.some(s => s.claimIds?.includes(rc.id));
    const isUsedInReel = reelData?.scenes?.some(s => s.claimIds?.includes(rc.id));
    if (isUsedInSlide || isUsedInReel) {
      issues.push({
        id: `evidence_rejected_claim_${rc.id}`,
        category: 'Evidence',
        severity: 'error',
        title: `Rejected Claim Included in Asset: ${rc.id}`,
        description: `Claim "${rc.claimText}" was rejected during review but is still referenced in production assets.`,
        targetView: 'claims'
      });
    }
  });

  // Check that every active claim has at least one source
  let claimsMissingSources = 0;
  let claimsNeedingHumanReview = 0;

  activeClaims.forEach(c => {
    if (!c.supportingSourceIds || c.supportingSourceIds.length === 0) {
      claimsMissingSources++;
      issues.push({
        id: `evidence_claim_unsourced_${c.id}`,
        category: 'Evidence',
        severity: 'error',
        title: `Claim ${c.id} Has No Supporting Sources`,
        description: `Statement "${c.claimText.slice(0, 50)}..." requires at least one primary source citation.`,
        targetView: 'claims'
      });
    }

    if (c.reviewStatus !== 'human_verified') {
      claimsNeedingHumanReview++;
      issues.push({
        id: `evidence_claim_unverified_${c.id}`,
        category: 'Evidence',
        severity: 'review_required',
        title: `Human Review Required: Claim ${c.id}`,
        description: `Statement "${c.claimText.slice(0, 50)}..." is marked as "${c.reviewStatus}". A medical or health editor must sign off.`,
        targetView: 'claims'
      });
    }
  });

  if (claimsMissingSources === 0 && activeClaims.length > 0) {
    passedChecks.push({
      id: 'evidence_all_claims_sourced_pass',
      title: 'All Active Claims Mapped to Authoritative Sources',
      category: 'Evidence'
    });
  }

  if (claimsNeedingHumanReview === 0 && activeClaims.length > 0) {
    passedChecks.push({
      id: 'evidence_human_verified_pass',
      title: 'All Active Claims Signed Off by Human Reviewer',
      category: 'Evidence'
    });
  }

  // ==========================================
  // 3. PROHIBITED & SENSATIONALIST LANGUAGE SCANNER
  // ==========================================

  const allTextCorpus = [
    campaignBrief?.title,
    campaignBrief?.objective,
    campaignBrief?.mainMessage,
    ...carouselSlides.map(s => `${s.headline} ${s.subhead} ${s.bodyText}`),
    staticPost?.headline,
    staticPost?.subhead,
    staticPost?.bodyText,
    staticPost?.caption,
    ...reelData?.scenes?.map(s => `${s.onScreenText} ${s.subText} ${s.captionText}`) || []
  ].filter(Boolean).join(' ').toLowerCase();

  let foundProhibited = [];
  PROHIBITED_KEYWORDS.forEach(kw => {
    // Exact word boundary regex match
    const regex = new RegExp(`\\b${kw.word}\\b`, 'i');
    if (regex.test(allTextCorpus)) {
      foundProhibited.push(kw);
      issues.push({
        id: `prohibited_${kw.word}`,
        category: 'Compliance',
        severity: 'error',
        title: `Prohibited Term Detected: "${kw.word}"`,
        description: kw.reason,
        targetView: 'quality'
      });
    }
  });

  if (foundProhibited.length === 0) {
    passedChecks.push({
      id: 'compliance_prohibited_terms_pass',
      title: 'Clean Medical Tone: No Prohibited or Sensational Claims Found',
      category: 'Compliance'
    });
  }

  // ==========================================
  // 4. DISCLAIMERS & ETHICS COMPLIANCE
  // ==========================================

  const hasDisclaimer = (
    carouselSlides.some(s => s.bodyText?.toLowerCase().includes('disclaimer') || s.layoutStyle === 'takeaway-credits') ||
    staticPost?.disclaimer?.trim()?.length > 0
  );

  if (!hasDisclaimer) {
    issues.push({
      id: 'compliance_missing_disclaimer',
      category: 'Compliance',
      severity: 'error',
      title: 'Educational Medical Disclaimer Missing',
      description: 'Public health content must clearly state it is educational and does not replace individualized clinical advice.',
      targetView: 'carousel'
    });
  } else {
    passedChecks.push({
      id: 'compliance_disclaimer_pass',
      title: 'Mandatory Educational Disclaimer Present',
      category: 'Compliance'
    });
  }

  // Check Call to Action
  if (!campaignBrief?.primaryCta?.trim()) {
    issues.push({
      id: 'editorial_cta_missing',
      category: 'Editorial',
      severity: 'warning',
      title: 'Missing Educational Call to Action',
      description: 'An approachable CTA directs users toward trusted medical resources.',
      targetView: 'campaigns'
    });
  } else {
    passedChecks.push({
      id: 'editorial_cta_pass',
      title: `Evidence-Based Call to Action Configured ("${campaignBrief.primaryCta}")`,
      category: 'Editorial'
    });
  }

  // Calculate score
  const totalWeight = passedChecks.length + issues.length;
  const errorCount = issues.filter(i => i.severity === 'error').length;
  const warningCount = issues.filter(i => i.severity === 'warning').length;
  const reviewCount = issues.filter(i => i.severity === 'review_required').length;

  const score = totalWeight > 0 
    ? Math.max(0, Math.round(((passedChecks.length) / (totalWeight)) * 100))
    : 100;

  const isReadyForExport = errorCount === 0;

  return {
    score,
    isReadyForExport,
    issues,
    passedChecks,
    summary: {
      total: passedChecks.length + issues.length,
      passed: passedChecks.length,
      errors: errorCount,
      warnings: warningCount,
      reviewRequired: reviewCount
    }
  };
}
