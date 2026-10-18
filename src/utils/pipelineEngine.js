/**
 * MetaboQuest Content Lab — Content Generation & Audit Pipeline Engine
 * A repeatable, deterministic 7-stage pipeline that converts evidence into
 * coordinated social deliverables with mandatory medical review gates.
 */

export const PIPELINE_STAGES = [
  {
    id: 'stage_a',
    code: 'A',
    name: 'Research & Sources',
    subtitle: 'Collect & verify authoritative health sources',
    description: 'Audits source records from NIDDK, CDC, WHO, and MedlinePlus. Verifies government/clinical URLs and extracts key findings.',
    requiresHumanReview: true
  },
  {
    id: 'stage_b',
    code: 'B',
    name: 'Claim Extraction',
    subtitle: 'Extract discrete factual assertions',
    description: 'Parses research findings into individual testable claim records and maps them to specific campaign targets.',
    requiresHumanReview: false
  },
  {
    id: 'stage_c',
    code: 'C',
    name: 'Claim Audit & Gate',
    subtitle: 'Verify evidence links & check prohibited terms',
    description: 'Scans for unsourced claims, sensational guarantees, body shaming, and enforces human medical editor sign-off.',
    requiresHumanReview: true
  },
  {
    id: 'stage_d',
    code: 'D',
    name: 'Content Generation',
    subtitle: 'Synthesize coordinated multi-asset drafts',
    description: 'Deterministic template engine generates coordinated drafts for 6-Slide Carousel, Static Feed Graphic, and 5-Scene Reel Script.',
    requiresHumanReview: false
  },
  {
    id: 'stage_e',
    code: 'E',
    name: 'Visual Design & Layout',
    subtitle: 'Render graphics, palettes, and motion timelines',
    description: 'Applies responsive layout hierarchies, 1080x1350/1080x1920 safe margins, kinetic animations, and brand styling.',
    requiresHumanReview: false
  },
  {
    id: 'stage_f',
    code: 'F',
    name: 'Quality Review',
    subtitle: 'Automated heuristics & editorial compliance',
    description: 'Evaluates readability, text overflow, dimension integrity, citation visibility, and medical disclaimers.',
    requiresHumanReview: true
  },
  {
    id: 'stage_g',
    code: 'G',
    name: 'Deliverable Export',
    subtitle: 'Render PNGs, ZIP, Reel video, and manifests',
    description: 'Produces high-resolution 1080x1350 PNG slides, ZIP archive, 9:16 video stream, SRT subtitles, and research registers.',
    requiresHumanReview: false
  }
];

export function getInitialPipelineState() {
  return {
    lastRunAt: new Date().toISOString(),
    currentActiveStage: 'stage_d',
    stageStatuses: {
      stage_a: 'completed',
      stage_b: 'completed',
      stage_c: 'completed',
      stage_d: 'completed',
      stage_e: 'completed',
      stage_f: 'needs_review',
      stage_g: 'pending'
    },
    runLogs: [
      {
        id: 'log_01',
        timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        stageId: 'stage_a',
        stageName: 'Stage A: Research',
        type: 'success',
        message: '6 authoritative sources verified against NIDDK, CDC, WHO, and MedlinePlus repositories.'
      },
      {
        id: 'log_02',
        timestamp: new Date(Date.now() - 3000000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        stageId: 'stage_b',
        stageName: 'Stage B: Claim Extraction',
        type: 'success',
        message: '6 evidence-backed factual assertions extracted and assigned unique ledger IDs (CLM-001 through CLM-006).'
      },
      {
        id: 'log_03',
        timestamp: new Date(Date.now() - 2400000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        stageId: 'stage_c',
        stageName: 'Stage C: Claim Audit',
        type: 'success',
        message: 'Claim audit completed. 6 active claims signed off by human medical reviewer. 1 unsupported claim flagged and rejected.'
      },
      {
        id: 'log_04',
        timestamp: new Date(Date.now() - 1800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        stageId: 'stage_d',
        stageName: 'Stage D: Content Generation',
        type: 'info',
        message: 'Deterministic template engine synthesized 6 Carousel Slides, 1 Static Post, and 5 Reel Scenes.'
      },
      {
        id: 'log_05',
        timestamp: new Date(Date.now() - 1200000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        stageId: 'stage_e',
        stageName: 'Stage E: Visual Design',
        type: 'success',
        message: 'Applied Midnight Mint dark theme with 1080x1350 Instagram ratio and 9:16 vertical video timeline.'
      }
    ]
  };
}

/**
 * Deterministic Content Synthesizer
 * Generates coordinated drafts for Carousel, Static Post, and Reel based on the campaign brief
 */
export function generateCoordinatedContentDrafts(campaignBrief, claims = [], sources = []) {
  const verifiedClaims = claims.filter(c => c.reviewStatus === 'human_verified');
  const leadClaim = verifiedClaims.find(c => c.id === 'CLM-001') || {
    claimText: 'Metabolic health is more than a single measurement.'
  };

  // Coordinated Carousel
  const generatedSlides = [
    {
      id: 'slide-1',
      slideNumber: 1,
      tag: 'HOOK',
      headline: campaignBrief.title || 'Metabolic health is more than a number.',
      subhead: 'There is more to the picture than one measurement.',
      bodyText: 'We often summarize health into one isolated number. But human biology is an active, interconnected conversation spanning cellular energy, cardiovascular tone, and daily rest.',
      claimIds: ['CLM-001'],
      sourceIds: ['SRC-001', 'SRC-004'],
      layoutStyle: 'cover-hero',
      accentColor: '#10B981',
      visualElements: ['hero-network', 'cellular-pulse']
    },
    {
      id: 'slide-2',
      slideNumber: 2,
      tag: 'SYSTEM BIOLOGY',
      headline: 'Your body works as a connected system.',
      subhead: 'Metabolism is a continuous biological network.',
      bodyText: 'Metabolism is the cellular process of converting food into cellular energy. Your heart, liver, muscles, and brain communicate continuously to maintain biological equilibrium.',
      claimIds: ['CLM-002'],
      sourceIds: ['SRC-001', 'SRC-004'],
      layoutStyle: 'system-nodes',
      accentColor: '#00F2FE',
      visualElements: ['organ-flow-diagram']
    },
    {
      id: 'slide-3',
      slideNumber: 3,
      tag: 'CELLULAR FUEL',
      headline: 'How does your body use energy?',
      subhead: 'Glucose is essential fuel, not an adversary.',
      bodyText: 'Circulating blood glucose delivers essential fuel to your cells, with insulin acting as the key to facilitate entry. Blood sugar naturally shifts throughout the day to meet your physical demands.',
      claimIds: ['CLM-003'],
      sourceIds: ['SRC-001'],
      layoutStyle: 'energy-glucose',
      accentColor: '#C6FF65',
      visualElements: ['cellular-membrane', 'energy-flow']
    },
    {
      id: 'slide-4',
      slideNumber: 4,
      tag: 'CLINICAL CONTEXT',
      headline: 'One number cannot tell the whole story.',
      subhead: 'Why health professionals assess the broader mosaic.',
      bodyText: 'Blood glucose, blood pressure, serum lipids (HDL, triglycerides), and sleep all communicate. Interpreting metabolic status requires understanding their relationships together.',
      claimIds: ['CLM-001', 'CLM-004'],
      sourceIds: ['SRC-004', 'SRC-006'],
      layoutStyle: 'mosaic-factors',
      accentColor: '#A78BFA',
      visualElements: ['quad-card-metrics']
    },
    {
      id: 'slide-5',
      slideNumber: 5,
      tag: 'EVERYDAY HABITS',
      headline: 'Small habits are part of the conversation.',
      subhead: 'Consistency matters far more than extreme regimens.',
      bodyText: 'Daily movement, fiber-rich whole foods, stress management, and restorative sleep nurture cellular insulin sensitivity. Health is built through sustainable daily rhythms, not punishing restrictions.',
      claimIds: ['CLM-005'],
      sourceIds: ['SRC-002', 'SRC-003', 'SRC-005'],
      layoutStyle: 'habits-balance',
      accentColor: '#34D399',
      visualElements: ['habit-pillars']
    },
    {
      id: 'slide-6',
      slideNumber: 6,
      tag: 'TAKEAWAY',
      headline: 'Stay curious about your health.',
      subhead: 'Learn from reliable sources. Ask questions. Look at the bigger picture.',
      bodyText: 'Metabolic health is personal and dynamic. Explore verified resources from NIH, CDC, and WHO, and collaborate with your healthcare team on individualized health decisions.',
      claimIds: ['CLM-006'],
      sourceIds: ['SRC-001', 'SRC-002', 'SRC-004'],
      layoutStyle: 'takeaway-credits',
      accentColor: '#10B981',
      visualElements: ['source-badges', 'disclaimer-box']
    }
  ];

  // Coordinated Static Post
  const generatedStaticPost = {
    headline: 'Metabolic health is bigger than one number.',
    subhead: 'Understanding the bigger picture starts with reliable information.',
    bodyText: 'Cellular energy, vascular resilience, blood glucose, and daily sleep interact in a continuous biological dialogue. Evaluating health requires looking at the full connected system.',
    pills: ['Cellular Fuel', 'Lipid Regulation', 'Vascular Tone', 'Restorative Sleep', 'Daily Rhythms'],
    ctaText: campaignBrief.primaryCta || 'Learn more from trusted health resources.',
    sourceCredit: 'Evidence-based review: NIDDK • CDC • WHO • MedlinePlus',
    disclaimer: campaignBrief.medicalDisclaimer || 'Educational content only. Does not replace personalized clinical advice.',
    layoutVariant: 'network-editorial',
    accentScheme: 'midnight-teal',
    caption: `It's easy to reduce health to a single reading on a scale or monitor. But metabolism is an interconnected symphony of glucose regulation, blood pressure, lipid balance, and daily rest.\n\n${campaignBrief.mainMessage}\n\n🔍 Sources: NIDDK, CDC, WHO, MedlinePlus\n🌿 ${campaignBrief.primaryCta}\n\n#MetabolicHealth #HealthLiteracy #EvidenceBased #ScienceCommunication #MetaboQuest`,
    altText: `Editorial graphic for ${campaignBrief.title} featuring interconnected cellular nodes on a dark midnight indigo background.`
  };

  // Coordinated Reel Script
  const generatedReel = {
    title: `${campaignBrief.title} — Reel Script`,
    aspectRatio: '9:16',
    width: 1080,
    height: 1920,
    totalDuration: 25,
    scenes: [
      {
        id: 'scene-1',
        sceneNumber: 1,
        startTime: 0,
        endTime: 4,
        duration: 4,
        onScreenText: 'Think metabolic health is just about weight?',
        subText: 'There is a much bigger picture.',
        visualTheme: 'hook-pulse',
        claimIds: ['CLM-001'],
        sourceIds: ['SRC-001'],
        captionText: 'Think metabolic health is just about weight? There is a much bigger picture.'
      },
      {
        id: 'scene-2',
        sceneNumber: 2,
        startTime: 4,
        endTime: 9,
        duration: 5,
        onScreenText: 'There is more to the picture.',
        subText: 'Your body works as an interconnected cellular network.',
        visualTheme: 'cellular-network',
        claimIds: ['CLM-001', 'CLM-002'],
        sourceIds: ['SRC-001', 'SRC-004'],
        captionText: 'There is more to the picture. Your body works as an interconnected cellular network.'
      },
      {
        id: 'scene-3',
        sceneNumber: 3,
        startTime: 9,
        endTime: 15,
        duration: 6,
        onScreenText: 'Glucose, blood pressure, blood lipids, and rest all interact.',
        subText: 'Multiple biomarkers communicate continuously.',
        visualTheme: 'biomarker-cards',
        claimIds: ['CLM-003', 'CLM-004'],
        sourceIds: ['SRC-001', 'SRC-004'],
        captionText: 'Glucose, blood pressure, blood lipids, and rest all interact continuously.'
      },
      {
        id: 'scene-4',
        sceneNumber: 4,
        startTime: 15,
        endTime: 21,
        duration: 6,
        onScreenText: 'Context matters. One measurement cannot explain everything.',
        subText: 'Sustainable everyday habits build long-term resilience.',
        visualTheme: 'converging-system',
        claimIds: ['CLM-004', 'CLM-005'],
        sourceIds: ['SRC-002', 'SRC-005'],
        captionText: 'Context matters. One measurement cannot explain everything. Look at the whole pattern.'
      },
      {
        id: 'scene-5',
        sceneNumber: 5,
        startTime: 21,
        endTime: 26,
        duration: 5,
        onScreenText: 'Stay curious. Learn from trusted sources.',
        subText: 'Explore the bigger picture with MetaboQuest.',
        visualTheme: 'outro-brand',
        claimIds: ['CLM-006'],
        sourceIds: ['SRC-001', 'SRC-004', 'SRC-006'],
        captionText: 'Stay curious. Learn from trusted sources. Explore the bigger picture with MetaboQuest.'
      }
    ],
    caption: `Is metabolic health just about one number? Science says no.\n\n${campaignBrief.mainMessage}\n\n🔍 Learn more from verified health sources like NIDDK, CDC, and WHO.\n\n#MetabolicHealth #HealthEducation #Reels #EvidenceBased #MetaboQuest`,
    transcriptTxt: `00:00 - 00:04 | Think metabolic health is just about weight? There is a much bigger picture.\n00:04 - 00:09 | There is more to the picture. Your body works as an interconnected cellular network.\n00:09 - 00:15 | Glucose, blood pressure, blood lipids, and rest all interact continuously.\n00:15 - 00:21 | Context matters. One measurement cannot explain everything. Look at the whole pattern.\n00:21 - 00:26 | Stay curious. Learn from trusted sources. Explore the bigger picture with MetaboQuest.`,
    transcriptSrt: `1\n00:00:00,000 --> 00:00:04,000\nThink metabolic health is just about weight? There is a much bigger picture.\n\n2\n00:00:04,000 --> 00:00:09,000\nThere is more to the picture. Your body works as an interconnected cellular network.\n\n3\n00:00:09,000 --> 00:00:15,000\nGlucose, blood pressure, blood lipids, and rest all interact continuously.\n\n4\n00:00:15,000 --> 00:00:21,000\nContext matters. One measurement cannot explain everything. Look at the whole pattern.\n\n5\n00:00:21,000 --> 00:00:26,000\nStay curious. Learn from trusted sources. Explore the bigger picture with MetaboQuest.\n`
  };

  return {
    carouselSlides: generatedSlides,
    staticPost: generatedStaticPost,
    reelData: generatedReel
  };
}
