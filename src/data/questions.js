/**
 * MetaboQuest Question Bank
 * 
 * Evidence-informed metabolic health questions grounded in peer-reviewed clinical
 * publications and guidelines from CDC, NIDDK, MedlinePlus, WHO, AHA, and ADA.
 * 
 * Each question includes:
 * - Clear question prompt
 * - Balanced answer options
 * - Designated correct answer
 * - A friendly, supportive explanation
 * - A guiding hint ("Not sure? Give me a hint")
 * - Source title and direct authoritative URL
 * - Topic label and difficulty
 */

export const TOPICS = {
  WHAT_IS_METABOLISM: 'What Metabolic Health Means',
  GLUCOSE_ENERGY: 'Blood Glucose & Energy',
  BLOOD_PRESSURE: 'Blood Pressure & Cardiovascular Health',
  LIPIDS: 'Blood Lipids & Cardiovascular Health',
  SLEEP_MOVEMENT: 'Sleep, Physical Activity, & Wellbeing',
  SINGLE_MEASUREMENT: 'Why a Single Measurement Cannot Describe Overall Health',
  CLINICAL_CONTEXT: 'How Clinicians Use Context & Measurements',
  EDUCATION_VS_CLINICAL: 'General Education vs Medical Assessment'
};

export const QUESTIONS_BANK = [
  {
    id: 'q1_metabolic_definition',
    topic: TOPICS.WHAT_IS_METABOLISM,
    difficulty: 'Easy',
    question: 'Which of the following best describes what "metabolic health" actually means biologically?',
    options: [
      { id: 'a', text: 'Having a body weight under a certain arbitrary number on the scale' },
      { id: 'b', text: 'The flexible, efficient biochemical handling and distribution of energy across organs' },
      { id: 'c', text: 'Eliminating all carbohydrates from your diet forever' },
      { id: 'd', text: 'Achieving a completely zero-fat body composition' }
    ],
    correctAnswerId: 'b',
    hint: 'Think about how cells across your muscles, brain, heart, and liver convert and route fuel throughout the day rather than just external appearance.',
    explanation: 'Metabolic health refers to how efficiently and flexibly your body processes, stores, and mobilizes macronutrients into usable cellular energy (ATP) without chronic cellular stress, systemic inflammation, or vascular dysfunction.',
    sourceTitle: 'MedlinePlus (NIH): Metabolic Syndrome & Energy Handling',
    sourceUrl: 'https://medlineplus.gov/metabolicsyndrome.html'
  },
  {
    id: 'q2_muscle_glucose_sink',
    topic: TOPICS.GLUCOSE_ENERGY,
    difficulty: 'Easy',
    question: 'Why are skeletal muscles frequently referred to in physiology as the body\'s "primary glucose sink"?',
    options: [
      { id: 'a', text: 'Muscles absorb roughly 70–80% of circulating post-meal glucose from the bloodstream' },
      { id: 'b', text: 'Muscle tissue converts sugar directly into bone mineral' },
      { id: 'c', text: 'Muscles are the only organ in the human body capable of burning energy' },
      { id: 'd', text: 'Muscles store fat and completely prevent it from entering circulation' }
    ],
    correctAnswerId: 'a',
    hint: 'Consider the massive volume of muscle tissue throughout your body and where dietary carbohydrates go after being broken down into blood sugar.',
    explanation: 'Skeletal muscle accounts for roughly 70% to 80% of whole-body insulin-stimulated glucose disposal after meals. In addition, physical muscle contraction directly activates GLUT4 glucose transporters even without insulin.',
    sourceTitle: 'NIDDK: Physical Activity, Insulin Sensitivity, & Blood Glucose',
    sourceUrl: 'https://www.niddk.nih.gov/health-information/diabetes/overview/diet-eating-physical-activity'
  },
  {
    id: 'q3_sleep_insulin_sensitivity',
    topic: TOPICS.SLEEP_MOVEMENT,
    difficulty: 'Medium',
    question: 'What acute metabolic shift typically occurs after just one night of partial sleep restriction (e.g., 4 hours)?',
    options: [
      { id: 'a', text: 'Cellular insulin sensitivity temporarily improves by 40%' },
      { id: 'b', text: 'Metabolic rate permanently doubles to compensate' },
      { id: 'c', text: 'Temporary, reversible insulin resistance increases and daytime stress hormones rise' },
      { id: 'd', text: 'The liver completely stops producing any glucose' }
    ],
    correctAnswerId: 'c',
    hint: 'Think about how you feel after staying up late: your body\'s stress response stays heightened, which makes cells temporarily less responsive to insulin signals.',
    explanation: 'Clinical sleep restriction studies consistently show that even a single night of 4 hours of sleep reduces peripheral insulin sensitivity by 20% to 30%, accompanied by elevated evening cortisol levels and sympathetic nervous system activity.',
    sourceTitle: 'CDC: Sleep and Chronic Disease Overview',
    sourceUrl: 'https://www.cdc.gov/sleep/about/index.html'
  },
  {
    id: 'q4_walking_post_meal',
    topic: TOPICS.SLEEP_MOVEMENT,
    difficulty: 'Easy',
    question: 'What is the metabolic benefit of a gentle 10–15 minute walk shortly after eating a meal?',
    options: [
      { id: 'a', text: 'It burns thousands of calories immediately on the spot' },
      { id: 'b', text: 'Contracting muscle fibers take up circulating glucose with minimal insulin demand' },
      { id: 'c', text: 'It completely stops all digestive processes in the stomach' },
      { id: 'd', text: 'It replaces the need for balanced nutrition entirely' }
    ],
    correctAnswerId: 'b',
    hint: 'When leg muscles contract, they don\'t have to wait for insulin signals to absorb sugar—they open an alternate cellular doorway.',
    explanation: 'Gentle ambulation engages major lower-body muscle groups. Muscle contraction mechanically stimulates GLUT4 transporter translocation to cell membranes, smoothing out post-meal glucose excursions by up to 20–30%.',
    sourceTitle: 'World Health Organization (WHO): Physical Activity Factsheet',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity'
  },
  {
    id: 'q5_fiber_glycemic_response',
    topic: TOPICS.GLUCOSE_ENERGY,
    difficulty: 'Medium',
    question: 'How does soluble dietary fiber help moderate post-meal blood glucose rises?',
    options: [
      { id: 'a', text: 'It forms a viscous gel in the digestive tract that slows gastric emptying and carbohydrate absorption' },
      { id: 'b', text: 'It permanently blocks all calorie absorption in the stomach' },
      { id: 'c', text: 'It instantly converts blood glucose directly into glycogen in the mouth' },
      { id: 'd', text: 'It prevents the pancreas from making any hormones' }
    ],
    correctAnswerId: 'a',
    hint: 'Think about what happens when oats or chia seeds mix with water—they absorb fluid and create a thicker texture that travels more gradually through the stomach.',
    explanation: 'Soluble fiber dissolves in water to form a gel-like substance in the digestive tract. This delays gastric emptying and slows carbohydrate breakdown, leading to a steady, gradual release of glucose into the bloodstream.',
    sourceTitle: 'MedlinePlus: Dietary Fiber and Metabolic Health',
    sourceUrl: 'https://medlineplus.gov/dietaryfiber.html'
  },
  {
    id: 'q6_triglycerides_hdl_ratio',
    topic: TOPICS.LIPIDS,
    difficulty: 'Hard',
    question: 'In routine fasting blood lipid panels, what does an elevated Triglyceride-to-HDL ratio often indicate to clinicians?',
    options: [
      { id: 'a', text: 'A surrogate marker of insulin resistance and higher presence of small, dense LDL particles' },
      { id: 'b', text: 'An exceptionally high intake of leafy green vegetables' },
      { id: 'c', text: 'Extreme cellular dehydration and high bone mineral density' },
      { id: 'd', text: 'An immediate acute bacterial infection' }
    ],
    correctAnswerId: 'a',
    hint: 'High triglycerides coupled with low HDL ("good" cholesterol) reflects how the liver packages and clears fat particles when insulin signaling is blunted.',
    explanation: 'When blood triglycerides are high and HDL cholesterol is low, it frequently reflects hepatic insulin resistance and increased atherogenic small, dense LDL particles. A fasting Triglyceride/HDL ratio (in mg/dL) > 3.0 is a recognized surrogate marker of metabolic dysregulation.',
    sourceTitle: 'MedlinePlus Medical Encyclopedia: Triglycerides',
    sourceUrl: 'https://medlineplus.gov/triglycerides.html'
  },
  {
    id: 'q7_blood_pressure_insulin',
    topic: TOPICS.BLOOD_PRESSURE,
    difficulty: 'Medium',
    question: 'How is chronically elevated insulin (hyperinsulinemia) physiologically linked with blood pressure regulation?',
    options: [
      { id: 'a', text: 'There is zero link; blood pressure is completely unrelated to hormones' },
      { id: 'b', text: 'Insulin enhances renal sodium reabsorption and sympathetic tone while blunting nitric oxide vasodilation' },
      { id: 'c', text: 'Insulin permanently thins blood vessels until they collapse' },
      { id: 'd', text: 'Insulin converts red blood cells into lymphatic fluid' }
    ],
    correctAnswerId: 'b',
    hint: 'Insulin interacts with the kidneys (salt management) and the inner lining of blood vessels (vasodilation). When insulin resistance occurs, vessel relaxation becomes harder.',
    explanation: 'Insulin signals the kidneys to reabsorb sodium and water. In the setting of vascular insulin resistance, insulin\'s ability to stimulate nitric oxide vasodilation is reduced while sympathetic stimulation continues, contributing to elevated blood pressure.',
    sourceTitle: 'CDC: High Blood Pressure (Hypertension) Overview',
    sourceUrl: 'https://www.cdc.gov/high-blood-pressure/about/index.html'
  },
  {
    id: 'q8_bmi_single_measurement',
    topic: TOPICS.SINGLE_MEASUREMENT,
    difficulty: 'Easy',
    question: 'Why can Body Mass Index (BMI) alone NOT tell you whether a specific individual is metabolically healthy?',
    options: [
      { id: 'a', text: 'BMI only compares weight to height; it does not distinguish muscle from visceral fat or measure blood markers' },
      { id: 'b', text: 'BMI is only calculated for children and cannot be used in adults' },
      { id: 'c', text: 'BMI is a measurement of lung capacity rather than body composition' },
      { id: 'd', text: 'BMI is calculated based entirely on eye color and genetics' }
    ],
    correctAnswerId: 'a',
    hint: 'A muscular athlete and an inactive individual could have the exact same height and weight, but totally different biomarker profiles.',
    explanation: 'BMI is a simple population screening ratio. It cannot differentiate between lean muscle mass and visceral abdominal adipose tissue, nor does it measure blood glucose, lipids, liver enzymes, or blood pressure.',
    sourceTitle: 'CDC: Adult Body Mass Index (BMI) Considerations',
    sourceUrl: 'https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html'
  },
  {
    id: 'q9_a1c_vs_fingerstick',
    topic: TOPICS.CLINICAL_CONTEXT,
    difficulty: 'Medium',
    question: 'Why do healthcare providers check Glycated Hemoglobin (HbA1c) in addition to momentary fasting blood glucose?',
    options: [
      { id: 'a', text: 'A1C reflects average blood sugar over 2–3 months, whereas fasting glucose is just a single snapshot in time' },
      { id: 'b', text: 'A1C measures the exact number of heartbeats over a year' },
      { id: 'c', text: 'Fasting glucose is always 100% inaccurate on Tuesdays' },
      { id: 'd', text: 'A1C tests whether someone needs eyeglasses' }
    ],
    correctAnswerId: 'a',
    hint: 'Glucose in your blood attaches to hemoglobin in red blood cells. Since red blood cells live for about 3 months, they carry a running record of glucose exposure.',
    explanation: 'As red blood cells circulate, glucose molecules bind to hemoglobin. An HbA1c test measures the percentage of hemoglobin proteins glycated with sugar, reflecting glycemic control across the ~90-to-120-day lifespan of red blood cells.',
    sourceTitle: 'NIDDK: The A1C Test & Diabetes Diagnosis',
    sourceUrl: 'https://www.niddk.nih.gov/health-information/diagnostic-tests/a1c-test'
  },
  {
    id: 'q10_education_vs_clinical_assessment',
    topic: TOPICS.EDUCATION_VS_CLINICAL,
    difficulty: 'Easy',
    question: 'What is the essential difference between an interactive educational quiz and a clinical medical assessment?',
    options: [
      { id: 'a', text: 'Educational tools teach general concepts, whereas clinical care requires individual health history, physical exams, and lab evaluation by a licensed clinician' },
      { id: 'b', text: 'An educational quiz score is legally binding proof of a disease' },
      { id: 'c', text: 'Doctors always use five-question online quizzes to prescribe prescription therapies' },
      { id: 'd', text: 'There is no difference; quiz scores can replace annual medical checkups' }
    ],
    correctAnswerId: 'a',
    hint: 'No online tool knows your family medical history, personal physical exam findings, or validated laboratory results.',
    explanation: 'Educational experiences like MetaboQuest build literacy around human biology. Clinical diagnoses and medical decisions require personalized evaluation, validated laboratory tests, and direct consultation with a qualified medical professional.',
    sourceTitle: 'MedlinePlus: Understanding Diagnostic Tests & Lab Work',
    sourceUrl: 'https://medlineplus.gov/lab-tests/'
  },
  {
    id: 'q11_normal_glucose_fluctuations',
    topic: TOPICS.GLUCOSE_ENERGY,
    difficulty: 'Medium',
    question: 'In healthy non-diabetic adults, what is considered a normal physiologic glucose response after eating a meal?',
    options: [
      { id: 'a', text: 'Blood glucose must stay as a completely flat straight line at all times' },
      { id: 'b', text: 'Transient glucose rises that return toward fasting baseline within 2–3 hours are normal and expected' },
      { id: 'c', text: 'Any rise above 100 mg/dL indicates irreversible metabolic failure' },
      { id: 'd', text: 'Healthy bodies convert all nutrients into energy in under 10 seconds' }
    ],
    correctAnswerId: 'b',
    hint: 'Eating foods that contain carbohydrates naturally releases glucose into your bloodstream; your pancreas and tissues respond to bring it back to baseline within hours.',
    explanation: 'Mild, temporary rises in blood glucose after meals are normal physiological reactions. In healthy regulation, the pancreas secretes insulin and tissues clear glucose back to resting levels (typically 70–99 mg/dL) within 2 to 3 hours.',
    sourceTitle: 'MedlinePlus: Blood Glucose Monitoring and Normal Values',
    sourceUrl: 'https://medlineplus.gov/bloodglucose.html'
  },
  {
    id: 'q12_visceral_vs_subcutaneous_fat',
    topic: TOPICS.SINGLE_MEASUREMENT,
    difficulty: 'Medium',
    question: 'What makes visceral adipose tissue (internal fat surrounding organs) metabolically distinct from subcutaneous fat (under the skin)?',
    options: [
      { id: 'a', text: 'Visceral fat is biologically active, releasing free fatty acids and inflammatory cytokines directly into the liver\'s portal circulation' },
      { id: 'b', text: 'Visceral fat has no blood flow and cannot interact with hormones' },
      { id: 'c', text: 'Visceral fat is completely harmless inert cushioning' },
      { id: 'd', text: 'Subcutaneous fat causes 100% of all cardiovascular complications' }
    ],
    correctAnswerId: 'a',
    hint: 'Visceral fat drains directly into the portal vein heading straight to the liver, impacting liver insulin sensitivity much more directly than fat under the skin.',
    explanation: 'Visceral fat is endocrine-active and hyper-lipolytic. It releases pro-inflammatory adipokines and free fatty acids directly into the portal vein leading to the liver, contributing to hepatic insulin resistance and dyslipidemia.',
    sourceTitle: 'NIDDK: Insulin Resistance & Prediabetes Overview',
    sourceUrl: 'https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-type-2-diabetes/prediabetes-insulin-resistance'
  },
  {
    id: 'q13_circadian_evening_metabolism',
    topic: TOPICS.SLEEP_MOVEMENT,
    difficulty: 'Medium',
    question: 'Why does human glucose tolerance naturally diminish late in the evening compared to morning hours?',
    options: [
      { id: 'a', text: 'The nocturnal rise in melatonin interacts with receptors on pancreatic beta-cells, lowering insulin secretion' },
      { id: 'b', text: 'Stomach acid ceases completely when the sun goes down' },
      { id: 'c', text: 'Blood circulation comes to an almost complete stop at night' },
      { id: 'd', text: 'The pancreas only operates between 9:00 AM and 5:00 PM' }
    ],
    correctAnswerId: 'a',
    hint: 'Your body\'s internal biological clock anticipates rest and fasting during darkness, coordinating hormone rhythms accordingly.',
    explanation: 'Central circadian clocks regulate daily endocrine rhythms. The evening surge in melatonin binds to MT1/MT2 receptors on pancreatic beta-cells, dampening insulin secretion. Late-night heavy meals therefore tend to cause higher and prolonged glucose curves.',
    sourceTitle: 'CDC: Sleep and Health Overview',
    sourceUrl: 'https://www.cdc.gov/sleep/about/index.html'
  },
  {
    id: 'q14_lifestyle_synergy',
    topic: TOPICS.WHAT_IS_METABOLISM,
    difficulty: 'Easy',
    question: 'Why does improving metabolic health typically involve a combination of sleep, movement, and nutrition rather than a single "magic bullet"?',
    options: [
      { id: 'a', text: 'Metabolism is an interconnected multi-organ system where sleep resets hormones, movement clears glucose, and nutrition fuels cellular repair' },
      { id: 'b', text: 'Because single habits cancel each other out completely' },
      { id: 'c', text: 'Because human cells only accept one type of nutrient per decade' },
      { id: 'd', text: 'It does not; single supplements solve all metabolic challenges' }
    ],
    correctAnswerId: 'a',
    hint: 'Consider how sleep affects your appetite hormones, how muscle movement disposes of glucose, and how whole foods nurture the gut microbiome.',
    explanation: 'Metabolic health is the emergent outcome of multiple interacting biological systems. Sleep maintains hormonal balance, physical movement mobilizes non-insulin glucose uptake, and balanced nutrition provides substrates for cellular metabolism without excessive stress.',
    sourceTitle: 'WHO: Healthy Diet and Chronic Disease Prevention',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet'
  },
  {
    id: 'q15_clinical_context_evaluation',
    topic: TOPICS.CLINICAL_CONTEXT,
    difficulty: 'Hard',
    question: 'When a physician evaluates metabolic health, why do they examine a combination of fasting glucose, blood pressure, lipids, and waist circumference together?',
    options: [
      { id: 'a', text: 'These five criteria evaluate metabolic syndrome, identifying systemic risk patterns rather than relying on one isolated number' },
      { id: 'b', text: 'Because each test only takes 1 millisecond and has no clinical meaning' },
      { id: 'c', text: 'To calculate an arbitrary mathematical score for insurance purposes' },
      { id: 'd', text: 'Because doctors are legally prohibited from looking at only one lab test' }
    ],
    correctAnswerId: 'a',
    hint: 'Metabolic syndrome is defined by clustering factors: blood pressure, triglycerides, HDL, fasting blood sugar, and waist measurement.',
    explanation: 'Clinical guidelines define metabolic syndrome by a cluster of five cardiometabolic risk factors. Evaluating these markers collectively gives clinicians a much more comprehensive view of vascular and metabolic resilience than any single metric.',
    sourceTitle: 'MedlinePlus: Metabolic Syndrome Clinical Criteria',
    sourceUrl: 'https://medlineplus.gov/metabolicsyndrome.html'
  },
  {
    id: 'q16_aerobic_and_resistance_training',
    topic: TOPICS.SLEEP_MOVEMENT,
    difficulty: 'Medium',
    question: 'What is the unique metabolic synergy of combining both resistance training and aerobic exercise?',
    options: [
      { id: 'a', text: 'Resistance training expands total glucose storage reservoir (muscle mass), while aerobic training enhances mitochondrial oxidative capacity' },
      { id: 'b', text: 'One burns only muscle while the other burns only fat' },
      { id: 'c', text: 'They must never be combined in the same week or metabolism will crash' },
      { id: 'd', text: 'Resistance training eliminates the need for oxygen intake' }
    ],
    correctAnswerId: 'a',
    hint: 'One builds the capacity of the storage reservoir, while the other increases the density and efficiency of cellular powerplants (mitochondria).',
    explanation: 'Resistance exercise builds and preserves lean muscle tissue (expanding whole-body glucose disposal capacity), whereas aerobic conditioning increases capillary perfusion and mitochondrial density within muscle fibers. Combined, they provide optimal glycemic and cardiovascular benefits.',
    sourceTitle: 'WHO: Physical Activity Recommendations for Adults',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity'
  }
];

// Single sample question for the interactive preview on the landing page
export const PREVIEW_QUESTION = {
  id: 'preview_soleus_pushup',
  topic: TOPICS.SLEEP_MOVEMENT,
  difficulty: 'Quick Discovery',
  question: 'Did you know? Light muscular contractions (like a 10-minute walk or seated calf raises) can smooth post-meal blood sugar. Why is muscle contraction so effective?',
  options: [
    { id: 'a', text: 'Contracting muscle fibers take up circulating blood glucose directly without depending on high insulin levels' },
    { id: 'b', text: 'It burns more calories in 60 seconds than an Olympic sprint' },
    { id: 'c', text: 'It completely shuts down the human circulatory system' },
    { id: 'd', text: 'It freezes all digestive enzymes in the stomach' }
  ],
  correctAnswerId: 'a',
  hint: 'Muscle contractions use a special transporter called GLUT4 that moves to the cell surface mechanically without needing an insulin key.',
  explanation: 'Physical muscle contraction triggers GLUT4 glucose transporter translocation directly to muscle cell membranes through non-insulin pathways (via AMPK and calcium signaling), helping clear glucose quickly after eating.',
  sourceTitle: 'NIDDK: Physical Activity, Insulin Sensitivity, & Blood Glucose',
  sourceUrl: 'https://www.niddk.nih.gov/health-information/diabetes/overview/diet-eating-physical-activity'
};
