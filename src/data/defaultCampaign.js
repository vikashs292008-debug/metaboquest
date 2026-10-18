/**
 * MetaboQuest Content Lab — Default Campaign Data & Templates
 * Primary Campaign: "Metabolic health is more than a number."
 * Target audience: Young adults and general audiences seeking approachable, evidence-based metabolic education.
 */

export const DEFAULT_CAMPAIGN_BRIEF = {
  id: 'cmp_metabolic_01',
  title: 'Metabolic Health Is More Than a Number',
  tagline: 'Good health education. Beautifully communicated.',
  objective: 'Help people understand that metabolic health involves multiple interconnected aspects of health, rather than relying on one number or measurement alone.',
  targetAudience: 'Young adults and general audiences who want approachable, understandable, evidence-based metabolic health education without stigma or fear.',
  tone: 'Friendly, curious, inclusive, calm, and science-informed.',
  mainMessage: 'Metabolic health involves multiple aspects of health; one measurement alone cannot describe the whole picture.',
  primaryCta: 'Learn more from trusted health resources.',
  platforms: ['Instagram Carousel', 'Social Feed Graphic', 'Short-Form Reel / TikTok (9:16)', 'Web & Newsletters'],
  visualDirection: 'Modern editorial wellness design with interconnected shapes, abstract cellular motifs, crisp typography, and accessible color contrast.',
  colorTheme: {
    name: 'Midnight Mint',
    bg: '#0B0F17',
    surface: '#111827',
    card: '#162032',
    accentTeal: '#00F2FE',
    accentMint: '#10B981',
    accentLime: '#C6FF65',
    accentViolet: '#A78BFA',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8'
  },
  approvedClaimIds: ['CLM-001', 'CLM-002', 'CLM-003', 'CLM-004', 'CLM-005', 'CLM-006'],
  prohibitedTerms: [
    'cure', 'miracle', 'melt fat', 'drop 10 pounds', 'reverse overnight', 
    'detox tea', 'burn fat while you sleep', 'guaranteed weight loss', 'skinny pill', 'magic food'
  ],
  medicalDisclaimer: 'Educational content only. This studio does not diagnose conditions, prescribe medications, or replace individualized consultation with a qualified healthcare provider.'
};

export const DEFAULT_CAROUSEL_SLIDES = [
  {
    id: 'slide-1',
    slideNumber: 1,
    tag: 'HOOK & PERSPECTIVE',
    headline: 'Metabolic health is more than a number.',
    subhead: 'There is more to the picture than one measurement.',
    bodyText: 'We are often told our health comes down to a single number on a scale or a single lab reading. But biology is far richer and more dynamic than any isolated metric.',
    claimIds: ['CLM-001'],
    sourceIds: ['SRC-001', 'SRC-004'],
    layoutStyle: 'cover-hero',
    accentColor: '#10B981', // Mint
    visualElements: ['hero-network', 'cellular-pulse']
  },
  {
    id: 'slide-2',
    slideNumber: 2,
    tag: 'INTERCONNECTED BIOLOGY',
    headline: 'Your body works as a connected system.',
    subhead: 'Metabolism is a continuous biological conversation.',
    bodyText: 'Metabolism refers to all the cellular processes that convert food into steady energy. Your liver, pancreas, brain, and muscles communicate 24/7 to keep vitality flowing.',
    claimIds: ['CLM-002'],
    sourceIds: ['SRC-001', 'SRC-004'],
    layoutStyle: 'system-nodes',
    accentColor: '#00F2FE', // Teal
    visualElements: ['organ-flow-diagram']
  },
  {
    id: 'slide-3',
    slideNumber: 3,
    tag: 'CELLULAR FUEL',
    headline: 'How does your body use energy?',
    subhead: 'Glucose is essential fuel, not an enemy.',
    bodyText: 'Blood glucose is the primary circulating sugar your cells rely upon. Insulin acts as a molecular key, guiding glucose into cells to power your everyday thoughts and movements.',
    claimIds: ['CLM-003'],
    sourceIds: ['SRC-001'],
    layoutStyle: 'energy-glucose',
    accentColor: '#C6FF65', // Lime
    visualElements: ['cellular-membrane', 'energy-flow']
  },
  {
    id: 'slide-4',
    slideNumber: 4,
    tag: 'CLINICAL CONTEXT',
    headline: 'One number cannot tell the whole story.',
    subhead: 'Why health professionals look at the complete mosaic.',
    bodyText: 'Blood sugar, blood pressure, triglycerides, HDL cholesterol, and restorative sleep all influence one another. Evaluating health requires understanding how these factors work together.',
    claimIds: ['CLM-001', 'CLM-004'],
    sourceIds: ['SRC-004', 'SRC-006'],
    layoutStyle: 'mosaic-factors',
    accentColor: '#A78BFA', // Violet
    visualElements: ['quad-card-metrics']
  },
  {
    id: 'slide-5',
    slideNumber: 5,
    tag: 'EVERYDAY CONTEXT',
    headline: 'Small habits are part of the conversation.',
    subhead: 'Consistency matters far more than extreme regimens.',
    bodyText: 'Regular brisk walks, nourishing fiber-rich foods, and consistent sleep support cellular insulin sensitivity over time. Health is built on sustainable rhythms, not punishing diets.',
    claimIds: ['CLM-005'],
    sourceIds: ['SRC-002', 'SRC-003', 'SRC-005'],
    layoutStyle: 'habits-balance',
    accentColor: '#34D399', // Mint light
    visualElements: ['habit-pillars']
  },
  {
    id: 'slide-6',
    slideNumber: 6,
    tag: 'TAKEAWAY & SOURCES',
    headline: 'Stay curious about your health.',
    subhead: 'Learn from reliable sources. Ask questions. Look at the bigger picture.',
    bodyText: 'Explore verified resources from NIH, CDC, and WHO. Discuss your personal questions with a qualified healthcare provider who knows your unique story.',
    claimIds: ['CLM-006'],
    sourceIds: ['SRC-001', 'SRC-002', 'SRC-004'],
    layoutStyle: 'takeaway-credits',
    accentColor: '#10B981',
    visualElements: ['source-badges', 'disclaimer-box']
  }
];

export const DEFAULT_STATIC_POST = {
  headline: 'Metabolic health is bigger than one number.',
  subhead: 'Understanding the bigger picture starts with reliable information.',
  bodyText: 'Cellular energy, vascular resilience, blood glucose, and daily sleep interact in a continuous biological dialogue. Evaluating health requires looking at the full connected system.',
  pills: ['Cellular Fuel', 'Blood Lipids', 'Vascular Tone', 'Sleep Quality', 'Daily Rhythms'],
  ctaText: 'Learn more from trusted health resources.',
  sourceCredit: 'Evidence-based review: NIDDK • CDC • WHO • MedlinePlus',
  disclaimer: 'Educational content only. Does not provide medical diagnosis or replace personalized clinical advice.',
  layoutVariant: 'network-editorial', // 'network-editorial' | 'bold-minimal' | 'card-cluster'
  accentScheme: 'midnight-teal',
  caption: `It's easy to reduce health to a single reading on a scale or device. But metabolism is an interconnected symphony of glucose regulation, blood pressure, lipid balance, and daily rest.\n\nUnderstanding the bigger picture starts with reliable, verified information.\n\n🌿 Explore verified science at MedlinePlus, CDC, and NIH.\n💬 Share this to spark a curious, judgment-free conversation.\n\n#MetabolicHealth #HealthLiteracy #EvidenceBased #ScienceCommunication #MetaboQuest #BodyTrust`,
  altText: 'Editorial graphic on dark midnight indigo background with glowing electric mint interconnected nodes, reading: Metabolic health is bigger than one number.'
};

export const DEFAULT_REEL_DATA = {
  title: 'Metabolic Health: The Bigger Picture',
  aspectRatio: '9:16',
  width: 1080,
  height: 1920,
  totalDuration: 25, // seconds
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
      subText: 'Explore the bigger picture.',
      visualTheme: 'outro-brand',
      claimIds: ['CLM-006'],
      sourceIds: ['SRC-001', 'SRC-004', 'SRC-006'],
      captionText: 'Stay curious. Learn from trusted sources. Explore the bigger picture with MetaboQuest.'
    }
  ],
  caption: `Is metabolic health just about one number? Science says no.\n\nMetabolism is a continuous biological network connecting cellular glucose disposal, cardiovascular dynamics, lipid profiles, and restorative sleep.\n\nCurious about the evidence? Check out verified guides from NIDDK, CDC, and WHO.\n\n#MetabolicHealth #HealthEducation #Reels #EvidenceBased #MetaboQuest`,
  transcriptTxt: `00:00 - 00:04 | Think metabolic health is just about weight? There is a much bigger picture.\n00:04 - 00:09 | There is more to the picture. Your body works as an interconnected cellular network.\n00:09 - 00:15 | Glucose, blood pressure, blood lipids, and rest all interact continuously.\n00:15 - 00:21 | Context matters. One measurement cannot explain everything. Look at the whole pattern.\n00:21 - 00:26 | Stay curious. Learn from trusted sources. Explore the bigger picture with MetaboQuest.`,
  transcriptSrt: `1\n00:00:00,000 --> 00:00:04,000\nThink metabolic health is just about weight? There is a much bigger picture.\n\n2\n00:00:04,000 --> 00:00:09,000\nThere is more to the picture. Your body works as an interconnected cellular network.\n\n3\n00:00:09,000 --> 00:00:15,000\nGlucose, blood pressure, blood lipids, and rest all interact continuously.\n\n4\n00:00:15,000 --> 00:00:21,000\nContext matters. One measurement cannot explain everything. Look at the whole pattern.\n\n5\n00:00:21,000 --> 00:00:26,000\nStay curious. Learn from trusted sources. Explore the bigger picture with MetaboQuest.\n`
};
