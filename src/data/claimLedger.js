/**
 * MetaboQuest Content Lab — Claim Ledger & Evidence Verification System
 * Stores every factual health statement used across campaign deliverables,
 * with exact asset placements, supporting source mappings, and verification status.
 */

export const INITIAL_CLAIM_LEDGER = [
  {
    id: 'CLM-001',
    claimText: 'Metabolic health is more than a single number or isolated measurement.',
    appearsIn: [
      { asset: 'carousel', location: 'Slide 1 (Hook) & Slide 4' },
      { asset: 'static_post', location: 'Main Headline' },
      { asset: 'reel', location: 'Scene 1 & Scene 2' }
    ],
    supportingSourceIds: ['SRC-001', 'SRC-004'],
    supportingPassage: 'Metabolic syndrome and metabolic function are clinically defined by clusters of interconnected biomarkers (glucose, triglycerides, HDL, blood pressure) rather than any single reading alone.',
    reviewStatus: 'human_verified', // 'draft' | 'needs_source' | 'ready_for_review' | 'human_verified' | 'rejected'
    reviewerNotes: 'Verified by Lead Medical Content Editor against MedlinePlus and NIH/NIDDK guidelines. Tone is educational and non-stigmatizing.',
    lastUpdated: '2026-10-18T12:00:00Z',
    prohibitedLanguageScore: 0 // Clean
  },
  {
    id: 'CLM-002',
    claimText: 'The human body functions as an interconnected system where organs constantly communicate to balance energy.',
    appearsIn: [
      { asset: 'carousel', location: 'Slide 2 (The Big Picture)' },
      { asset: 'reel', location: 'Scene 2' }
    ],
    supportingSourceIds: ['SRC-001', 'SRC-004'],
    supportingPassage: 'Cellular metabolism involves coordinated biochemical signaling between the pancreas, liver, skeletal muscle, brain, and adipose tissue to regulate fuel storage and utilization.',
    reviewStatus: 'human_verified',
    reviewerNotes: 'Biochemically sound and appropriately framed for general audience comprehension without oversimplification.',
    lastUpdated: '2026-10-18T12:05:00Z',
    prohibitedLanguageScore: 0
  },
  {
    id: 'CLM-003',
    claimText: 'Blood glucose is the primary circulating fuel used by cells, with insulin acting as the key to help glucose enter cells.',
    appearsIn: [
      { asset: 'carousel', location: 'Slide 3 (Glucose and Energy)' },
      { asset: 'reel', location: 'Scene 3' }
    ],
    supportingSourceIds: ['SRC-001'],
    supportingPassage: 'NIDDK defines glucose as the main sugar found in blood that supplies energy to cells throughout the body, facilitated by insulin secreted by beta cells.',
    reviewStatus: 'human_verified',
    reviewerNotes: 'Directly supported by NIDDK patient education consensus. Avoids fear-mongering around glucose spikes.',
    lastUpdated: '2026-10-18T12:10:00Z',
    prohibitedLanguageScore: 0
  },
  {
    id: 'CLM-004',
    claimText: 'Blood pressure, blood lipids (like triglycerides and HDL), and glucose regulation interact together to reflect cardiometabolic status.',
    appearsIn: [
      { asset: 'carousel', location: 'Slide 4 (Beyond One Measurement)' },
      { asset: 'reel', location: 'Scene 3' },
      { asset: 'static_post', location: 'Supporting Copy' }
    ],
    supportingSourceIds: ['SRC-004', 'SRC-006'],
    supportingPassage: 'MedlinePlus and ADA clinical criteria highlight that cardiovascular and glycemic health are deeply linked, and isolated values must be interpreted in relationship to one another.',
    reviewStatus: 'human_verified',
    reviewerNotes: 'Verified against MedlinePlus metabolic syndrome criteria. Appropriately includes cardiovascular indicators.',
    lastUpdated: '2026-10-18T12:15:00Z',
    prohibitedLanguageScore: 0
  },
  {
    id: 'CLM-005',
    claimText: 'Daily habits including regular movement, balanced nutrition, and restorative sleep support metabolic wellbeing over time without extreme regimens.',
    appearsIn: [
      { asset: 'carousel', location: 'Slide 5 (Everyday Context)' },
      { asset: 'reel', location: 'Scene 4' }
    ],
    supportingSourceIds: ['SRC-002', 'SRC-003', 'SRC-005'],
    supportingPassage: 'CDC and HHS guidelines show that consistent moderate daily activity and whole-food nutritional patterns improve insulin sensitivity and cardiometabolic resilience regardless of drastic weight loss.',
    reviewStatus: 'human_verified',
    reviewerNotes: 'Follows public health consensus emphasizing consistency over extreme diets. Free of body shaming.',
    lastUpdated: '2026-10-18T12:20:00Z',
    prohibitedLanguageScore: 0
  },
  {
    id: 'CLM-006',
    claimText: 'Individual health metrics require personal clinical context; consult a licensed healthcare professional for personalized guidance.',
    appearsIn: [
      { asset: 'carousel', location: 'Slide 6 (Educational Disclaimer)' },
      { asset: 'static_post', location: 'Disclaimer Footer' },
      { asset: 'reel', location: 'Scene 5 End-Card' }
    ],
    supportingSourceIds: ['SRC-001', 'SRC-006'],
    supportingPassage: 'ADA Standards of Care highlight the necessity of individualized clinical evaluation by qualified clinicians. Public education must explicitly disclaim medical diagnosis.',
    reviewStatus: 'human_verified',
    reviewerNotes: 'Mandatory clinical disclaimer mandated by content compliance guidelines.',
    lastUpdated: '2026-10-18T12:25:00Z',
    prohibitedLanguageScore: 0
  },
  {
    id: 'CLM-007',
    claimText: 'Drinking lemon detox water guaranteed to melt visceral belly fat within 48 hours.',
    appearsIn: [
      { asset: 'draft_sandbox', location: 'Flagged Example' }
    ],
    supportingSourceIds: [],
    supportingPassage: 'No peer-reviewed or authoritative evidence exists for spot-reduction or rapid fat melting through detox drinks.',
    reviewStatus: 'rejected',
    reviewerNotes: 'REJECTED: Contains prohibited terms ("guaranteed", "melt", "detox") and makes unsubstantiated miracle medical claims. Demonstrates Quality Gate blocking rules.',
    lastUpdated: '2026-10-18T12:30:00Z',
    prohibitedLanguageScore: 3
  }
];
