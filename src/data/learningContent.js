/**
 * MetaboQuest Learning Library
 * Credible, evidence-informed educational summaries with real medical citations.
 */

export const LEARNING_TOPICS = [
  {
    id: 'understand-metabolism',
    category: 'Fundamentals',
    title: 'What Metabolic Health Actually Means',
    readTime: '3 min read',
    summary: 'Metabolism is far more than burning calories or the number on a bathroom scale—it is your body\'s cellular energy network.',
    content: `Many people view metabolism merely as the speed at which their body burns calories. In clinical biochemistry, metabolism encompasses the entire set of life-sustaining chemical reactions that convert food into cellular energy (ATP), build cellular structures, and eliminate metabolic waste.

Metabolic health describes how smoothly and adaptably your cells handle energy transitions—such as shifting from processing a carbohydrate-rich lunch to mobilizing stored energy between meals or during an evening jog. Crucially, metabolic health cannot be judged by body weight alone: an individual can have a normal body mass index (BMI) while experiencing significant underlying insulin resistance or lipid dysfunction (sometimes termed metabolically obese normal-weight, or MONW).

Evaluating metabolic resilience involves multiple interconnected markers: fasting glucose, glycated hemoglobin (HbA1c), fasting insulin, triglycerides, HDL cholesterol, resting blood pressure, and waist-to-height ratio.`,
    takeaway: 'Focus on multi-system metabolic markers and daily energy vitality rather than treating scale weight as the sole indicator of health.',
    sources: [
      { name: 'National Institutes of Health (NIH) — Metabolic Syndrome Definitions', link: 'https://www.nhlbi.nih.gov/health/metabolic-syndrome' },
      { name: 'Journal of the American College of Cardiology — Metabolic Flexibility and Health', link: 'https://www.jacc.org' }
    ]
  },
  {
    id: 'sleep-metabolism',
    category: 'Sleep & Rhythm',
    title: 'Sleep Architecture & Circadian Glucose Control',
    readTime: '4 min read',
    summary: 'How sleep deprivation, irregular sleep schedules, and nighttime eating interfere with your body\'s insulin signaling.',
    content: `During restorative slow-wave (deep) sleep, sympathetic nervous system activity quietens, cortisol levels nadir, and growth hormone pulses. This nocturnal reset restores insulin receptor sensitivity across peripheral tissues.

When sleep is restricted—whether chronically or through acute all-nighters—several disruptions occur simultaneously:
1. Daytime cortisol and sympathetic tone remain elevated.
2. Free fatty acid levels in blood rise overnight, impeding insulin receptor signaling cascades in muscle cells.
3. Central and peripheral circadian clocks uncouple. In the late evening, the pineal gland releases melatonin, which binds to beta-cell receptors and naturally downregulates pancreatic insulin output.

Consequently, eating large, high-glycemic meals late at night conflicts with your evolutionary biology, resulting in substantially higher and prolonged postprandial glucose excursions compared to the exact same meal consumed in the morning.`,
    takeaway: 'Prioritize consistent sleep timing (7–9 hours) and avoid large meals within 2–3 hours of your intended sleep window.',
    sources: [
      { name: 'Annals of Internal Medicine — Metabolic Consequences of Sleep Deprivation', link: 'https://www.acpjournals.org/journal/aim' },
      { name: 'Cell Metabolism — Circadian Regulation of Glucose and Insulin Homeostasis', link: 'https://www.cell.com/cell-metabolism' }
    ]
  },
  {
    id: 'movement-glucose',
    category: 'Movement',
    title: 'Skeletal Muscle as a Metabolic Powerhouse',
    readTime: '3 min read',
    summary: 'Why muscle is your body\'s largest glucose reservoir and how light post-meal movement acts as a natural glucose buffer.',
    content: `Skeletal muscle accounts for approximately 40% of adult body mass and is responsible for disposing of 70% to 80% of dietary glucose from the bloodstream after meals. 

Under sedentary conditions, getting glucose into muscle cells requires insulin to bind to surface receptors, triggering a cascade that moves GLUT4 transporter proteins to the cell membrane. However, when skeletal muscle fibers contract during physical movement, an entirely distinct, non-insulin-dependent pathway is activated:
- Cellular AMP-activated protein kinase (AMPK) increases.
- Intracellular calcium ions flux.
- GLUT4 vesicles translocate directly to the cell surface without requiring elevated insulin.

This means even modest physical exertion—such as a 10-to-15-minute gentle walk, bodyweight squats, or calf raises after eating—clears circulating glucose quickly, mitigating acute glycemic spikes and sparing pancreatic workload.`,
    takeaway: 'A short 10-minute walk after meals leverages mechanical muscle contraction to smooth out glucose spikes without taxing your pancreas.',
    sources: [
      { name: 'Sports Medicine — Acute Postprandial Exercise and Glycemic Regulation', link: 'https://link.springer.com/journal/40279' },
      { name: 'Lancet Diabetes & Endocrinology — Physical Inactivity and Insulin Resistance', link: 'https://www.thelancet.com/journals/landia' }
    ]
  },
  {
    id: 'nutrition-fiber-microbiome',
    category: 'Nutrition',
    title: 'Dietary Fiber, Short-Chain Fatty Acids & Satiety',
    readTime: '4 min read',
    summary: 'The difference between soluble and insoluble fiber, microbiome fermentation, and gut hormone secretion.',
    content: `Dietary fiber is not an inert filler. In humans, dietary fiber passes largely undigested through the upper gastrointestinal tract until it reaches the cecum and colon, where trillions of symbiotic gut microbes ferment it.

This microbial fermentation generates bioactive short-chain fatty acids (SCFAs), predominantly acetate, propionate, and butyrate:
- Butyrate serves as the primary metabolic fuel for colonic epithelial cells, strengthening gut barrier integrity.
- Propionate travels to the liver, where it helps regulate gluconeogenesis and cholesterol synthesis.
- Acetate and other SCFAs bind to free fatty acid receptors (FFAR2 and FFAR3) on enteroendocrine L-cells in the gut wall, triggering secretion of the incretin hormone glucagon-like peptide-1 (GLP-1) and peptide YY (PYY).

Soluble, viscous fibers (beta-glucan in oats, psyllium, pectin in apples, legumes) also form a hydrating matrix that slows gastric emptying and carbohydrate digestion, blunting sharp glucose absorption.`,
    takeaway: 'Aim for a diverse variety of whole plant foods (legumes, vegetables, seeds, whole grains) to feed gut microbes that stimulate natural GLP-1 and satiety signaling.',
    sources: [
      { name: 'American Journal of Clinical Nutrition — Dietary Fiber and Cardiometabolic Health', link: 'https://academic.oup.com/ajcn' },
      { name: 'Cell — Gut-Microbiota-Targeted Diets and Immune Health (Stanford Study)', link: 'https://www.cell.com/cell' }
    ]
  },
  {
    id: 'biomarkers-lipids-bp',
    category: 'Biomarkers',
    title: 'Decoding Your Biomarkers: Beyond Total Cholesterol',
    readTime: '5 min read',
    summary: 'Why Triglyceride/HDL ratios, fasting insulin, and blood pressure tell a richer metabolic story than isolated total numbers.',
    content: `Routine health checkups often focus on total cholesterol, but modern lipidology and cardiometabolic medicine look much closer at lipoprotein particle quality and ratios:

1. **Triglyceride-to-HDL Ratio**:
Elevated blood triglycerides combined with low HDL cholesterol strongly correlate with insulin resistance and the presence of small, dense LDL particles (Pattern B). Small, dense LDL particles are especially prone to oxidation and penetration of arterial endothelium. A Triglycerides/HDL ratio greater than 3.0 (in mg/dL units) is a well-established surrogate clinical indicator.

2. **Hyperinsulinemia & Blood Pressure**:
Insulin resistance in peripheral tissues often leads to compensatory hyperinsulinemia (the pancreas producing more insulin to achieve the same glucose disposal). Insulin naturally promotes sodium reabsorption in the kidneys and stimulates the sympathetic nervous system. When the endothelial lining becomes resistant to insulin\'s nitric oxide vasodilatory signaling, blood vessels fail to relax normally, fostering elevated blood pressure.

3. **Glycated Hemoglobin (HbA1c)**:
While fasting glucose captures a single snapshot in time, HbA1c measures the percentage of hemoglobin proteins coated in sugar, reflecting average blood glucose levels across the lifespan of red blood cells (~90–120 days).`,
    takeaway: 'When reviewing routine lab work with your physician, ask to discuss patterns across triglycerides, HDL, fasting glucose, and blood pressure as a cohesive whole.',
    sources: [
      { name: 'Circulation (American Heart Association) — Triglyceride/HDL Index', link: 'https://www.ahajournals.org/journal/circ' },
      { name: 'American Diabetes Association (ADA) — Standards of Care in Diabetes', link: 'https://diabetesjournals.org/care' }
    ]
  },
  {
    id: 'doctor-conversation-guide',
    category: 'Clinical Dialogue',
    title: 'Questions to Discuss With Your Healthcare Professional',
    readTime: '3 min read',
    summary: 'A structured, empowering framework for having proactive, evidence-based metabolic discussions with your doctor.',
    content: `Navigating health conversations can feel overwhelming during brief clinical visits. Having focused, well-structured questions can help you partner effectively with your physician or qualified healthcare provider:

**Key Questions to Consider**:
- *"Could we review my fasting lipid panel together, specifically looking at my triglycerides and HDL ratio rather than just total cholesterol?"*
- *"Would it be helpful to evaluate my fasting glucose alongside fasting insulin or an HbA1c to get a clearer baseline of my insulin sensitivity?"*
- *"Are there lifestyle interventions—such as targeted resistance training, dietary fiber adjustments, or sleep optimization—that align best with my current metabolic profile?"*
- *"If medication or therapies (such as GLP-1 receptor agonists or lipid therapies) are discussed, what are the criteria, expected benefits, and ongoing monitoring plan?"*

Remember: Educational tools like MetaboQuest provide general scientific principles. Only your licensed physician can interpret your personal health history, diagnostic labs, and individual medical needs.`,
    takeaway: 'Empower yourself as an informed collaborator in your healthcare by preparing targeted, constructive questions for your next appointment.',
    sources: [
      { name: 'Harvard Health Publishing — How to Talk to Your Doctor About Heart and Metabolic Health', link: 'https://www.health.harvard.edu' },
      { name: 'Endocrine Society — Patient Guides to Metabolic Health', link: 'https://www.endocrine.org' }
    ]
  }
];
