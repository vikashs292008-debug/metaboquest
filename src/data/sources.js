/**
 * MetaboQuest Central Source Register
 * 
 * Verifiable evidence index conforming to medical education standards.
 * All factual health claims in the application are traceable to public health
 * and biomedical research agencies (CDC, NIDDK, MedlinePlus, WHO, AHA, ADA).
 */

export const MEDICAL_SOURCES = [
  {
    id: 'src_medline_metabolic',
    claim: 'Metabolic health describes how the body biochemical processes, uses, and stores energy across organs, involving glucose, lipids, and blood pressure rather than body weight alone.',
    sourceTitle: 'National Library of Medicine / MedlinePlus: Metabolic Syndrome',
    url: 'https://medlineplus.gov/metabolicsyndrome.html',
    organization: 'National Library of Medicine (NIH)',
    topicsSupported: ['What Metabolic Health Means', 'Understanding Measurements']
  },
  {
    id: 'src_niddk_glucose_muscles',
    claim: 'Skeletal muscles absorb the majority of dietary glucose post-meal, and muscle contraction mobilizes GLUT4 transporters to take up glucose independently of insulin.',
    sourceTitle: 'NIDDK: Diabetes Diet, Eating, & Physical Activity',
    url: 'https://www.niddk.nih.gov/health-information/diabetes/overview/diet-eating-physical-activity',
    organization: 'National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)',
    topicsSupported: ['Blood Glucose & Energy', 'Sleep, Physical Activity, & Wellbeing']
  },
  {
    id: 'src_cdc_sleep_metabolic',
    claim: 'Insufficient or fragmented sleep acutely impairs glucose metabolism, elevates daytime cortisol, and temporarily reduces peripheral insulin sensitivity.',
    sourceTitle: 'CDC: Sleep and Sleep Disorders — About Sleep',
    url: 'https://www.cdc.gov/sleep/about/index.html',
    organization: 'Centers for Disease Control and Prevention (CDC)',
    topicsSupported: ['Sleep, Physical Activity, & Wellbeing']
  },
  {
    id: 'src_medline_dietary_fiber',
    claim: 'Soluble dietary fiber creates a viscous gel matrix in the digestive tract that slows gastric emptying and carbohydrate absorption, blunting postprandial glucose spikes.',
    sourceTitle: 'MedlinePlus: Dietary Fiber in Nutrition',
    url: 'https://medlineplus.gov/dietaryfiber.html',
    organization: 'National Library of Medicine (NIH)',
    topicsSupported: ['Blood Glucose & Energy', 'What Metabolic Health Means']
  },
  {
    id: 'src_medline_triglycerides_hdl',
    claim: 'An elevated Triglyceride-to-HDL ratio is a recognized surrogate marker of insulin resistance and the presence of small, dense LDL lipoprotein particles.',
    sourceTitle: 'MedlinePlus Medical Encyclopedia: Triglycerides & HDL',
    url: 'https://medlineplus.gov/triglycerides.html',
    organization: 'National Library of Medicine (NIH)',
    topicsSupported: ['Blood Lipids & Cardiovascular Health', 'Understanding Measurements']
  },
  {
    id: 'src_cdc_blood_pressure',
    claim: 'Vascular resistance and hyperinsulinemia are interlinked: chronic insulin elevation promotes sodium retention in the kidneys and diminishes endothelial nitric oxide vasodilation.',
    sourceTitle: 'CDC: About High Blood Pressure (Hypertension)',
    url: 'https://www.cdc.gov/high-blood-pressure/about/index.html',
    organization: 'Centers for Disease Control and Prevention (CDC)',
    topicsSupported: ['Blood Pressure & Cardiovascular Health']
  },
  {
    id: 'src_who_physical_activity',
    claim: 'Regular physical activity combining aerobic exercise and muscle-strengthening activities optimizes cardiovascular health, mitochondrial density, and cellular insulin sensitivity.',
    sourceTitle: 'World Health Organization (WHO): Physical Activity Factsheet',
    url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity',
    organization: 'World Health Organization (WHO)',
    topicsSupported: ['Sleep, Physical Activity, & Wellbeing']
  },
  {
    id: 'src_niddk_a1c_testing',
    claim: 'A1C tests reflect average blood glucose over roughly 90–120 days by measuring glycated hemoglobin, providing clinical context beyond momentary single-point capillary readings.',
    sourceTitle: 'NIDDK: The A1C Test & Diabetes',
    url: 'https://www.niddk.nih.gov/health-information/diagnostic-tests/a1c-test',
    organization: 'National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)',
    topicsSupported: ['How Clinicians Use Context', 'Understanding Measurements']
  },
  {
    id: 'src_cdc_bmi_context',
    claim: 'Body Mass Index (BMI) is a screening tool based on height and weight that does not directly measure body fat distribution, visceral adipose tissue, or metabolic biomarker health.',
    sourceTitle: 'CDC: Adult Body Mass Index (BMI) Considerations',
    url: 'https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html',
    organization: 'Centers for Disease Control and Prevention (CDC)',
    topicsSupported: ['Why a Single Measurement Cannot Describe Overall Health', 'How Clinicians Use Context']
  },
  {
    id: 'src_niddk_prediabetes',
    claim: 'Insulin resistance develops when cells in muscle, fat, and liver do not respond well to insulin; the pancreas initially compensates by producing more insulin to keep glucose normal.',
    sourceTitle: 'NIDDK: Insulin Resistance & Prediabetes',
    url: 'https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-type-2-diabetes/prediabetes-insulin-resistance',
    organization: 'National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)',
    topicsSupported: ['Blood Glucose & Energy', 'What Metabolic Health Means']
  },
  {
    id: 'src_who_healthy_diet',
    claim: 'Dietary patterns rich in whole vegetables, legumes, nuts, seeds, and unrefined grains support gut microbial diversity and cardiometabolic resilience.',
    sourceTitle: 'World Health Organization (WHO): Healthy Diet Guidelines',
    url: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
    organization: 'World Health Organization (WHO)',
    topicsSupported: ['What Metabolic Health Means', 'Blood Lipids & Cardiovascular Health']
  },
  {
    id: 'src_medline_clinical_evaluation',
    claim: 'General online educational quizzes are designed for conceptual literacy and cannot substitute for personalized clinical history, physical exams, and physician diagnostics.',
    sourceTitle: 'MedlinePlus: Understanding Laboratory Tests',
    url: 'https://medlineplus.gov/lab-tests/',
    organization: 'National Library of Medicine (NIH)',
    topicsSupported: ['Education vs Medical Assessment', 'How Clinicians Use Context']
  }
];
