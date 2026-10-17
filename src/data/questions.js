/**
 * MetaboQuest Question Bank
 * Medically responsible, evidence-informed metabolic health questions.
 * Sources: CDC, NIH, American Diabetes Association (ADA), American Heart Association (AHA), 
 * Lancet Diabetes & Endocrinology, Nature Metabolism.
 */

export const TOPICS = {
  SLEEP: 'Sleep & Circadian Biology',
  MOVEMENT: 'Physical Activity & Muscle',
  NUTRITION: 'Nutrition & Dietary Fiber',
  GLUCOSE: 'Blood Glucose Regulation',
  BIOMARKERS: 'Lipids & Vascular Health',
  GENERAL: 'Metabolic System Science'
};

export const QUESTIONS_BANK = [
  {
    id: 'q1_fiber_glucose',
    topic: TOPICS.NUTRITION,
    difficulty: 'Medium',
    question: 'How does soluble dietary fiber help moderate post-meal blood glucose spikes?',
    options: [
      { id: 'a', text: 'It completely blocks all carbohydrate absorption in the stomach' },
      { id: 'b', text: 'It forms a viscous gel in the gut that slows gastric emptying and nutrient absorption' },
      { id: 'c', text: 'It instantly converts blood glucose directly into glycogen in the mouth' },
      { id: 'd', text: 'It suppresses natural insulin secretion entirely' }
    ],
    correctAnswerId: 'b',
    explanation: 'Soluble fiber (found in oats, legumes, and flax) dissolves in water to create a viscous gel in the digestive tract. This slows gastric emptying and carbohydrate breakdown, resulting in a gradual, steadier release of glucose into the bloodstream rather than a sharp spike.',
    source: 'American Diabetes Association (ADA) Nutrition Consensus Report / NIH National Library of Medicine'
  },
  {
    id: 'q2_muscle_glucose',
    topic: TOPICS.MOVEMENT,
    difficulty: 'Easy',
    question: 'Why are skeletal muscles often called the body\'s "primary glucose sink"?',
    options: [
      { id: 'a', text: 'Muscles clear up to 70–80% of circulating post-meal glucose from the bloodstream' },
      { id: 'b', text: 'Muscles store fat and prevent it from ever entering the liver' },
      { id: 'c', text: 'Muscle tissue produces glucagon to eliminate excess sugar' },
      { id: 'd', text: 'Muscles are the only tissue in the human body that can use energy' }
    ],
    correctAnswerId: 'a',
    explanation: 'Skeletal muscle accounts for roughly 70% to 80% of whole-body insulin-stimulated glucose disposal after meals. Furthermore, muscle contraction during physical activity triggers non-insulin-dependent glucose uptake (via GLUT4 translocation), making regular movement powerful for metabolic balance.',
    source: 'American Physiological Society / Lancet Diabetes & Endocrinology'
  },
  {
    id: 'q3_sleep_insulin',
    topic: TOPICS.SLEEP,
    difficulty: 'Medium',
    question: 'What acute metabolic effect typically occurs after just one night of partial sleep deprivation (4 hours)?',
    options: [
      { id: 'a', text: 'Insulin sensitivity temporarily improves by 40%' },
      { id: 'b', text: 'Metabolic rate permanently doubles to compensate' },
      { id: 'c', text: 'Temporary, reversible insulin resistance increases and daytime cortisol rises' },
      { id: 'd', text: 'The liver ceases all endogenous glucose production' }
    ],
    correctAnswerId: 'c',
    explanation: 'Clinical sleep restriction studies consistently show that even a single night of 4 hours of sleep reduces peripheral insulin sensitivity by 20% to 30%, accompanied by elevated evening cortisol levels and increased sympathetic nervous system activity.',
    source: 'Annals of Internal Medicine / Endocrine Society Clinical Research'
  },
  {
    id: 'q4_walking_postprandial',
    topic: TOPICS.MOVEMENT,
    difficulty: 'Easy',
    question: 'What is the metabolic benefit of taking a light 10–15 minute walk shortly after eating a meal?',
    options: [
      { id: 'a', text: 'It burns 1,000 calories immediately' },
      { id: 'b', text: 'Contracting muscle fibers take up circulating glucose with minimal insulin demand' },
      { id: 'c', text: 'It halts all digestive enzyme production' },
      { id: 'd', text: 'It replaces the need for balanced nutrition entirely' }
    ],
    correctAnswerId: 'b',
    explanation: 'Post-meal (postprandial) ambulation engages major muscle groups like the soleus and quadriceps. Muscle contraction mobilizes GLUT4 glucose transporters directly to cell membranes independently of insulin, attenuating glucose peaks by up to 20-30%.',
    source: 'Sports Medicine Systematic Review / American Diabetes Association'
  },
  {
    id: 'q5_metabolic_definition',
    topic: TOPICS.GENERAL,
    difficulty: 'Easy',
    question: 'Which of the following best describes what "metabolic health" actually means?',
    options: [
      { id: 'a', text: 'Having a body weight under a certain arbitrary number on the scale' },
      { id: 'b', text: 'Never feeling hungry and eliminating all carbohydrates forever' },
      { id: 'c', text: 'The efficient, adaptable biochemical handling and distribution of energy across organs' },
      { id: 'd', text: 'Achieving a completely zero-fat body composition' }
    ],
    correctAnswerId: 'c',
    explanation: 'Metabolic health refers to how efficiently and flexibly your body processes, stores, and mobilizes macronutrients into usable energy without chronic cellular stress, systemic inflammation, or vascular dysfunction. It involves blood sugar, lipids, blood pressure, and liver health—not just body weight.',
    source: 'National Institutes of Health (NIH) / Journal of the American College of Cardiology'
  },
  {
    id: 'q6_triglycerides_hdl',
    topic: TOPICS.BIOMARKERS,
    difficulty: 'Hard',
    question: 'In a standard fasting lipid panel, what does an elevated Triglyceride-to-HDL ratio often indicate?',
    options: [
      { id: 'a', text: 'An exceptionally high intake of dietary leafy green vegetables' },
      { id: 'b', text: 'Surrogate marker of insulin resistance and small, dense LDL particle predominance' },
      { id: 'c', text: 'Low cellular hydration and high bone mineral density' },
      { id: 'd', text: 'Immediate acute bacterial infection' }
    ],
    correctAnswerId: 'b',
    explanation: 'When blood triglycerides are high and HDL cholesterol is low, it frequently reflects hepatic insulin resistance and increased atherogenic small, dense LDL particles. A fasting Triglyceride/HDL ratio (in mg/dL) > 3.0 is a recognized surrogate marker of metabolic dysregulation.',
    source: 'Circulation (American Heart Association) / Mayo Clinic Proceedings'
  },
  {
    id: 'q7_visceral_vs_subcutaneous',
    topic: TOPICS.GENERAL,
    difficulty: 'Medium',
    question: 'What distinguishes visceral adipose tissue (internal organ fat) from subcutaneous fat (under the skin)?',
    options: [
      { id: 'a', text: 'Visceral fat has no blood flow and does not interact with hormones' },
      { id: 'b', text: 'Visceral fat is biologically inert cushioning that cannot release fatty acids' },
      { id: 'c', text: 'Visceral fat is endocrine-active, draining inflammatory cytokines directly to the liver via portal circulation' },
      { id: 'd', text: 'Subcutaneous fat causes 100% of cardiovascular disease' }
    ],
    correctAnswerId: 'c',
    explanation: 'Visceral fat surrounds abdominal organs and drains directly into the portal vein. It is hyper-lipolytic and releases pro-inflammatory adipokines (like TNF-alpha and IL-6) and free fatty acids straight to the liver, contributing to hepatic insulin resistance.',
    source: 'The Lancet Diabetes & Endocrinology / Nature Reviews Endocrinology'
  },
  {
    id: 'q8_circadian_meal_timing',
    topic: TOPICS.SLEEP,
    difficulty: 'Medium',
    question: 'Why does human glucose tolerance naturally decline late at night compared to morning hours?',
    options: [
      { id: 'a', text: 'The pancreas shuts down all insulin receptors when darkness falls' },
      { id: 'b', text: 'Circadian melatonin secretion inhibits pancreatic insulin secretion, while central clocks lower peripheral sensitivity' },
      { id: 'c', text: 'Stomach acid ceases production at 8:00 PM' },
      { id: 'd', text: 'Blood circulation slows down to a near stop during sleep' }
    ],
    correctAnswerId: 'b',
    explanation: 'Central circadian clocks regulate daily endocrine rhythms. Evening rise in melatonin interacts with MT1/MT2 receptors on pancreatic beta-cells, dampening insulin secretion. Consuming large high-glycemic meals right before bed often produces higher, prolonged glucose elevations.',
    source: 'Cell Metabolism / Harvard Medical School Circadian Biology Laboratory'
  },
  {
    id: 'q9_continuous_glucose_myths',
    topic: TOPICS.GLUCOSE,
    difficulty: 'Medium',
    question: 'In healthy non-diabetic adults, what is normal regarding post-meal glucose fluctuations?',
    options: [
      { id: 'a', text: 'Blood glucose must stay perfectly flat like a straight line at all times' },
      { id: 'b', text: 'Any rise above 100 mg/dL indicates irreversible metabolic failure' },
      { id: 'c', text: 'Transient glucose excursions up to 130–140 mg/dL that return near baseline within 2–3 hours are normal physiologic responses' },
      { id: 'd', text: 'Healthy bodies convert all meal nutrients into glucose within 60 seconds' }
    ],
    correctAnswerId: 'c',
    explanation: 'In healthy individuals, transient rises in blood glucose after meals are completely physiological and expected. Normal regulation clears glucose back to resting baseline (typically 70–99 mg/dL) within 2 to 3 hours through balanced insulin release and tissue uptake.',
    source: 'American Diabetes Association (ADA) Clinical Guidelines'
  },
  {
    id: 'q10_protein_satiety',
    topic: TOPICS.NUTRITION,
    difficulty: 'Easy',
    question: 'Through which physiologic mechanisms does adequate dietary protein support metabolic satiety?',
    options: [
      { id: 'a', text: 'It completely disables all ghrelin receptors forever' },
      { id: 'b', text: 'It stimulates satiety hormones (PYY, GLP-1) and has a higher thermic effect of food (TEF)' },
      { id: 'c', text: 'It turns directly into stored body fat faster than any other nutrient' },
      { id: 'd', text: 'It neutralizes stomach acid to prevent digestion' }
    ],
    correctAnswerId: 'b',
    explanation: 'Dietary protein stimulates the release of satiety gut hormones peptide YY (PYY) and GLP-1 from intestinal L-cells while suppressing ghrelin (hunger hormone). Furthermore, protein has the highest thermic effect of food (~20-30% of energy expended in metabolizing it).',
    source: 'American Journal of Clinical Nutrition / Nature Metabolism'
  },
  {
    id: 'q11_insulin_resistance_mechanics',
    topic: TOPICS.GLUCOSE,
    difficulty: 'Hard',
    question: 'What cellular hallmark is strongly linked with early skeletal muscle insulin resistance?',
    options: [
      { id: 'a', text: 'Accumulation of intramyocellular lipid intermediates (diacylglycerols and ceramides) interfering with insulin signaling cascades' },
      { id: 'b', text: 'Complete death of 90% of muscle fibers' },
      { id: 'c', text: 'Excessive consumption of plain drinking water' },
      { id: 'd', text: 'Lack of vitamin C in red blood cells' }
    ],
    correctAnswerId: 'a',
    explanation: 'When energy intake chronically exceeds storage capacity, ectopic fat metabolites (diacylglycerols and ceramides) accumulate inside muscle and liver cells. These activate protein kinase C (PKC), which impairs IRS-1 phosphorylation and blocks GLUT4 translocation to the cell surface.',
    source: 'New England Journal of Medicine / Cell Metabolism'
  },
  {
    id: 'q12_blood_pressure_metabolic',
    topic: TOPICS.BIOMARKERS,
    difficulty: 'Medium',
    question: 'How is chronically elevated insulin (hyperinsulinemia) physiologically linked with blood pressure regulation?',
    options: [
      { id: 'a', text: 'It has zero relationship; blood pressure is strictly genetic' },
      { id: 'b', text: 'Insulin stimulates renal sodium retention and sympathetic nervous system tone while blunting nitric oxide vasodilation' },
      { id: 'c', text: 'Insulin permanently thins blood vessels until they collapse' },
      { id: 'd', text: 'Insulin converts all blood into lymphatic fluid' }
    ],
    correctAnswerId: 'b',
    explanation: 'Insulin acts on renal tubules to enhance sodium and water reabsorption. In the presence of vascular insulin resistance, insulin\'s ability to stimulate nitric oxide-mediated vasodilation is impaired while its activation of the sympathetic nervous system persists, contributing to elevated blood pressure.',
    source: 'Hypertension (AHA Journal) / Journal of Clinical Investigation'
  },
  {
    id: 'q13_fermented_foods_microbiome',
    topic: TOPICS.NUTRITION,
    difficulty: 'Medium',
    question: 'What did a landmark Stanford School of Medicine randomized trial discover about diets high in fermented foods?',
    options: [
      { id: 'a', text: 'They caused severe loss of all gut bacteria' },
      { id: 'b', text: 'They increased gut microbiome diversity and decreased 19 inflammatory blood markers' },
      { id: 'c', text: 'They only affected tongue tastebuds without systemic impact' },
      { id: 'd', text: 'They replaced the need for sleep' }
    ],
    correctAnswerId: 'b',
    explanation: 'A 2021 Stanford clinical trial (published in Cell) demonstrated that a 10-week diet rich in fermented foods (kefir, yogurt, kimchi, kombucha) steadily expanded microbiota diversity and significantly decreased 19 circulating inflammatory proteins, including IL-6.',
    source: 'Wastyk et al., Cell (2021) / Stanford Medicine Research'
  },
  {
    id: 'q14_chronic_stress_cortisol',
    topic: TOPICS.GENERAL,
    difficulty: 'Easy',
    question: 'Why can prolonged psychological stress impair metabolic health even when diet remains unchanged?',
    options: [
      { id: 'a', text: 'Sustained cortisol promotes hepatic gluconeogenesis (sugar production) and visceral fat storage' },
      { id: 'b', text: 'Stress burns all cellular ATP and turns muscle into water' },
      { id: 'c', text: 'Stress eliminates red blood cell oxygenation' },
      { id: 'd', text: 'Stress has no biochemical influence on human metabolism' }
    ],
    correctAnswerId: 'a',
    explanation: 'Cortisol is an essential glucocorticoid survival hormone. In chronic stress, persistent cortisol elevates liver glucose output, suppresses peripheral glucose uptake, and upregulates lipoprotein lipase in visceral fat depots, driving central adiposity.',
    source: 'Psychoneuroendocrinology / Endocrine Reviews'
  },
  {
    id: 'q15_aerobic_vs_resistance',
    topic: TOPICS.MOVEMENT,
    difficulty: 'Medium',
    question: 'What makes combining both resistance training and aerobic exercise optimal for metabolic resilience?',
    options: [
      { id: 'a', text: 'One burns fat while the other completely burns muscle away' },
      { id: 'b', text: 'Resistance training expands total glucose storage reservoir (muscle mass), while aerobic training enhances mitochondrial oxidative capacity and capillary density' },
      { id: 'c', text: 'Doing both confuses the metabolic system into resetting itself to infancy' },
      { id: 'd', text: 'They must never be combined on the same calendar month' }
    ],
    correctAnswerId: 'b',
    explanation: 'Resistance training builds lean muscle tissue (expanding the total capacity for glucose disposal), whereas aerobic conditioning increases capillary perfusion and mitochondrial density/efficiency within muscle fibers. Combined, they yield superior glycemic control compared to either alone.',
    source: 'JAMA / American College of Sports Medicine (ACSM)'
  }
];

// Single sample question for the interactive preview on the landing page
export const PREVIEW_QUESTION = {
  id: 'preview_soleus_pushup',
  topic: TOPICS.MOVEMENT,
  difficulty: 'Quick Discovery',
  question: 'Did you know? Sitting calf raises (activating the soleus muscle) can elevate local oxidative metabolism for hours while seated. Why is the soleus unique?',
  options: [
    { id: 'a', text: 'It relies predominantly on blood glucose and circulating lipids rather than depleting intramuscular glycogen' },
    { id: 'b', text: 'It burns more calories per minute than an Olympic sprint' },
    { id: 'c', text: 'It does not require any oxygen to produce energy' },
    { id: 'd', text: 'It operates without any connection to the circulatory system' }
  ],
  correctAnswerId: 'a',
  explanation: 'Groundbreaking research published in iScience (2022) revealed that the soleus muscle possesses a high proportion of slow-twitch oxidative fibers that can sustain continuous energy expenditure utilizing circulating blood glucose and triglycerides for hours with minimal fatigue.',
  source: 'Hamilton et al., iScience / University of Houston Metabolic Research'
};
