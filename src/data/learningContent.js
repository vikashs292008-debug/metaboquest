/**
 * MetaboQuest Learning Hub Content
 * 
 * Evidence-based educational cards categorized across core metabolic themes:
 * - The basics
 * - Glucose and energy
 * - Heart and blood markers
 * - Sleep and movement
 * - Understanding measurements
 * 
 * Sources verified against NIDDK, CDC, WHO, and MedlinePlus.
 */

export const LEARNING_CATEGORIES = [
  'All',
  'The basics',
  'Glucose and energy',
  'Heart and blood markers',
  'Sleep and movement',
  'Understanding measurements'
];

export const LEARNING_TOPICS = [
  {
    id: 'understand-metabolism',
    category: 'The basics',
    title: 'What Metabolic Health Actually Means',
    readTime: '3 min read',
    plainLanguageExplanation: 'Metabolism is the body\'s cellular energy network—how cells convert food into usable energy, build tissue, and clear waste.',
    whyItMatters: 'Metabolism is not just about weight or how fast you burn calories. It dictates day-to-day energy, immune function, and organ longevity.',
    content: `Many people view metabolism merely as the speed at which their body burns calories. In clinical biochemistry, metabolism encompasses the entire set of life-sustaining chemical reactions that convert food into cellular energy (ATP), build cellular structures, and eliminate metabolic waste.

Metabolic health describes how smoothly and adaptably your cells handle energy transitions—such as shifting from processing a carbohydrate-rich lunch to mobilizing stored energy between meals or during an evening jog. Crucially, metabolic health cannot be judged by body weight alone: an individual can have a normal body mass index (BMI) while experiencing significant underlying insulin resistance or lipid dysfunction.

Evaluating metabolic resilience involves multiple interconnected markers: fasting glucose, glycated hemoglobin (HbA1c), fasting insulin, triglycerides, HDL cholesterol, resting blood pressure, and waist-to-height ratio.`,
    takeaway: 'Focus on multi-system metabolic markers and daily energy vitality rather than treating scale weight as the sole indicator of health.',
    sourceAttribution: 'National Library of Medicine / MedlinePlus: Metabolic Syndrome',
    learnMoreUrl: 'https://medlineplus.gov/metabolicsyndrome.html'
  },
  {
    id: 'glucose-cellular-energy',
    category: 'Glucose and energy',
    title: 'Blood Glucose and Cellular Energy Regulation',
    readTime: '4 min read',
    plainLanguageExplanation: 'Glucose is the primary fuel circulating in your bloodstream; insulin acts as a biochemical key helping cells absorb it.',
    whyItMatters: 'When cells become resistant to insulin, the pancreas must produce higher amounts to clear the same glucose, straining metabolic balance.',
    content: `After carbohydrates are digested, they enter the bloodstream as glucose. The pancreas releases insulin, a peptide hormone that binds to surface receptors on cells (particularly in muscle and adipose tissue), signaling GLUT4 transporter vesicles to move to the cell surface to absorb glucose.

In healthy physiology, temporary post-meal glucose rises are completely normal and return toward baseline within 2 to 3 hours. Insulin resistance develops when cells in muscle, fat, and liver become less responsive to insulin signals, requiring higher circulating insulin levels (compensatory hyperinsulinemia) to achieve the same glucose uptake.

Dietary fiber—particularly soluble viscous fibers found in oats, legumes, and flax—creates a gel-like matrix that slows carbohydrate breakdown and gastric emptying, promoting a gentle and sustained energy curve.`,
    takeaway: 'Pair carbohydrates with fiber, protein, and healthy fats to moderate glucose spikes and provide steady, lasting energy.',
    sourceAttribution: 'NIDDK: Insulin Resistance & Prediabetes Overview',
    learnMoreUrl: 'https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-type-2-diabetes/prediabetes-insulin-resistance'
  },
  {
    id: 'heart-blood-lipids',
    category: 'Heart and blood markers',
    title: 'Lipids, Triglycerides & Cardiovascular Function',
    readTime: '4 min read',
    plainLanguageExplanation: 'Triglycerides are blood fats used for stored energy, while HDL particles transport excess cholesterol back to the liver.',
    whyItMatters: 'A high Triglyceride-to-HDL ratio often provides an earlier signal of insulin resistance and vascular strain than total cholesterol alone.',
    content: `Routine health checkups often review total cholesterol, but modern lipidology and cardiometabolic medicine examine lipoprotein particle quality and ratios:

1. **Triglyceride-to-HDL Ratio**:
Elevated blood triglycerides combined with low HDL cholesterol strongly correlate with hepatic insulin resistance and the presence of small, dense LDL particles. Small, dense LDL particles are especially susceptible to oxidation and penetration of the endothelial arterial wall.

2. **Hyperinsulinemia & Blood Pressure**:
Insulin acts on renal tubules in the kidneys to enhance sodium and water reabsorption. In the presence of vascular insulin resistance, insulin's ability to stimulate nitric oxide-mediated vasodilation is impaired while its activation of the sympathetic nervous system persists, contributing to elevated blood pressure.`,
    takeaway: 'When reviewing routine labs with your physician, discuss the relationship between triglycerides, HDL, and blood pressure together.',
    sourceAttribution: 'MedlinePlus Medical Encyclopedia: Triglycerides & Heart Health',
    learnMoreUrl: 'https://medlineplus.gov/triglycerides.html'
  },
  {
    id: 'sleep-circadian-movement',
    category: 'Sleep and movement',
    title: 'Sleep Architecture, Circadian Rhythms & Movement',
    readTime: '4 min read',
    plainLanguageExplanation: 'Restorative sleep recalibrates your hormonal balance, while muscle movement clears glucose independently of insulin.',
    whyItMatters: 'Even one night of poor sleep can temporarily reduce insulin sensitivity, while a 10-minute walk after eating dramatically blunts glucose spikes.',
    content: `During restorative slow-wave sleep, sympathetic nervous system activity quietens, nighttime cortisol levels decrease, and growth hormone pulses to repair tissues. When sleep is cut short, daytime cortisol remains elevated and free fatty acids in the blood rise, making cells temporarily less responsive to insulin.

Furthermore, our bodies follow internal circadian clocks. As evening progresses, the pineal gland secretes melatonin, which interacts with receptors on pancreatic beta-cells to downregulate insulin secretion. Consuming large high-glycemic meals right before bed conflicts with this nocturnal slowdown.

Conversely, engaging skeletal muscles—such as a 10-to-15-minute post-meal walk—stimulates GLUT4 glucose transporters to move to the cell surface mechanically without needing an insulin key, clearing circulating glucose quickly and naturally.`,
    takeaway: 'Protect a regular 7–9 hour sleep schedule and add a gentle 10-minute walk after your largest meal of the day.',
    sourceAttribution: 'CDC: Sleep and Chronic Disease Prevention',
    learnMoreUrl: 'https://www.cdc.gov/sleep/about/index.html'
  },
  {
    id: 'understanding-measurements',
    category: 'Understanding measurements',
    title: 'Context in Health Metrics: Beyond a Single Number',
    readTime: '4 min read',
    plainLanguageExplanation: 'No single metric—whether Body Mass Index (BMI), a single glucose reading, or weight—can describe your total health.',
    whyItMatters: 'Clinicians rely on multiple markers, lifestyle patterns, and personal medical history to evaluate true cardiometabolic resilience.',
    content: `Body Mass Index (BMI) is a simple population screening tool calculated solely from height and weight. It does not measure body composition, differentiate between lean muscle mass and visceral fat, or evaluate blood pressure, lipids, or liver health.

Similarly, a single fingerstick glucose reading only captures a fleeting moment in time, easily swayed by acute stress, dehydration, or recent caffeine. That is why clinicians examine Glycated Hemoglobin (HbA1c), which measures the percentage of hemoglobin proteins bound to sugar over the ~90-to-120-day lifespan of red blood cells.

Clinical guidelines define metabolic syndrome not by a single test, but by a cluster of five cardiometabolic risk factors: elevated waist circumference, high triglycerides, low HDL, elevated blood pressure, and elevated fasting glucose.`,
    takeaway: 'Treat health data as a puzzle where each metric contributes context, rather than letting any single number define your health.',
    sourceAttribution: 'NIDDK: The A1C Test & Diabetes Diagnostic Context',
    learnMoreUrl: 'https://www.niddk.nih.gov/health-information/diagnostic-tests/a1c-test'
  },
  {
    id: 'doctor-conversation-guide',
    category: 'Understanding measurements',
    title: 'How to Partner With Your Doctor on Metabolic Health',
    readTime: '3 min read',
    plainLanguageExplanation: 'Online educational experiences build literacy, while individualized medical assessments require a licensed physician.',
    whyItMatters: 'Preparing structured, informed questions helps you make the most of your medical appointments and partner effectively in your care.',
    content: `Navigating healthcare visits can feel overwhelming. Having focused, evidence-informed questions helps you partner productively with your physician:

**Constructive Questions for Your Next Checkup**:
- *"Could we review my fasting lipid panel together, looking specifically at my triglyceride-to-HDL ratio?"*
- *"Would it be helpful to evaluate an HbA1c alongside my fasting glucose to understand my 3-month glycemic baseline?"*
- *"What lifestyle levers (such as resistance exercise, dietary fiber variety, or sleep hygiene) align best with my current numbers?"*

Remember: Educational platforms like MetaboQuest foster scientific curiosity. Only your licensed physician can interpret your physical exams, lab results, and individual medical needs.`,
    takeaway: 'Use your metabolic knowledge to ask informed, proactive questions during your routine physician visits.',
    sourceAttribution: 'National Library of Medicine / MedlinePlus: Understanding Lab Tests',
    learnMoreUrl: 'https://medlineplus.gov/lab-tests/'
  }
];
