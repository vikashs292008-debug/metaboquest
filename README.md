# MetaboQuest 🧬⚡

> **"Your metabolism. Your mission. Your next challenge."**  
> *Engineered for the Steer Club Hackathon | Premium, Viral, Production-Ready React Experience*

---

## 1. Problem Statement
Metabolic health affects cardiovascular longevity, cognitive focus, daytime energy, and physical resilience. Yet most metabolic health content online suffers from three major flaws:
- **Dense & clinical**: Dry medical jargon or long blog posts that overwhelm newcomers.
- **Misleading & oversimplified**: Social media myths that equate metabolic health solely to scale weight or promote extreme diets.
- **Passive & unshareable**: Traditional quizzes that grade users without explaining *why* biological mechanisms work or giving users a reason to share.

---

## 2. Product Concept
**MetaboQuest** turns metabolic health education into an engaging, high-yield, 90-second gamified quest. Visitors test their biological intuition across five core domains, receive instant evidence-backed feedback, earn a personalized **Knowledge Archetype**, and can immediately challenge friends to beat their score with high-res downloadable scorecards and referral challenge links.

### The 5 Core Outcomes
1. **ATTENTION**: Captures curiosity in under 5 seconds through an interactive hero biological constellation.
2. **ENGAGEMENT**: Fast, responsive 5-question micro-rounds with accessible keyboard navigation and dual timer/relaxed modes.
3. **EDUCATION**: Medically responsible explanations citing the CDC, NIH, American Diabetes Association, American Heart Association, *The Lancet*, and *Cell*.
4. **VIRALITY**: Seamless social sharing via Web Share API, clipboard fallback, high-resolution PNG scorecard downloads, and sanitized URL friend challenge links.
5. **CONVERSION**: Respectful, transparent partner pathways toward verified Steer Club resources and clinical consultations without fear-based marketing.

---

## 3. Key Features

- **🎮 Core 5-Question Quiz Engine**:
  - Deterministic scoring: 100 points per correct answer + 100-point completion bonus (Max score: 600 points).
  - Double-click locked options preventing double scoring or race conditions.
  - Scientific mechanism breakdown with authentic medical citations on every answer.
  - Dual timer mode: 90-second goal timer or pressure-free Relaxed Mode.
  - Replay system with fresh question order and zero state leakage.

- **🔬 Interactive Constellation Visual**:
  - Live interactive biological network in the hero section displaying relationships between skeletal muscle (GLUT4), the circadian clock, mitochondria, the gut microbiome, and vascular endothelium.

- **🧪 Interactive Sample Preview**:
  - Live single-question interactive sample right on the landing page so visitors can experience question mechanics before starting the quest.

- **📅 Deterministic Daily Quest**:
  - Date-aware daily challenge tied to the local device calendar.
  - On-device streak tracking and completion badges.

- **🏆 Knowledge Archetypes & Badges**:
  - Tiers based on quiz knowledge: *Metabolic Scholar* (600 pts), *Metabolic Explorer* (500 pts), *Science Seeker* (400 pts), *Knowledge Builder* (300 pts), *Wellness Curious* (100–200 pts).
  - 6 unlockable achievements saved locally: First Quest, Perfect Five, Curious Mind, Challenge Accepted, Daily Explorer, and Deep Thinker.

- **⚔️ Friend Challenge Mode (Viral Loop)**:
  - Sanitized query parameter invitations: `?challenge=1&score=500&archetype=Metabolic%20Explorer&from=Alex`.
  - Recipient plays against their friend's ghost target score.
  - Head-to-head score comparison at completion (Victory, Tie, or Rematch).

- **📸 Social PNG Card Generator**:
  - One-click client-side image generation rendering a crisp, 2x retina PNG scorecard ready for Instagram, X, or messaging apps.

- **🔬 Interactive Metabolic Flexibility Laboratory & Simulator**:
  - Real-time lifestyle simulator with dynamic SVG postprandial glucose & insulin curves (0 to 240 mins).
  - Toggles for meal composition (refined vs high fiber), physical movement (sedentary vs 15-min walk vs soleus pumps), sleep quality (8h vs 4h sleep debt), and circadian meal timing (noon vs 10:30 PM).
  - Live biometric readouts: estimated peak glucose, time-in-target, pancreatic insulin burden, and GLUT4 muscle uptake percentage.

- **🃏 3D Myth vs. Fact Science Cards**:
  - Interactive flip cards debunking popular metabolic myths with authentic endocrinology facts and peer-reviewed clinical citations.

- **📊 60-Second Metabolic Habit Resilience Index**:
  - Interactive lifestyle habit audit evaluating sleep, post-meal ambulation, dietary fiber density, and circadian eating cutoff with an animated progress gauge.

- **🎵 Procedural Web Audio Engine**:
  - Zero-latency native Web Audio synthesizer providing subtle, satisfying tactile feedback on options, successes, and completions with an on/off toggle.

- **🎯 Multi-Mode Quest Selector**:
  - *Classic 90-Sec Quest* (5 questions)
  - *Metabolic Gauntlet* (10 questions for advanced learners, 1100 max points)
  - *Topic Sprints* (Sleep & Circadian, Movement & Muscle, Fiber & Gut, Biomarkers & Lipids)

- **📈 Device Quest History & 28-Day Consistency Heatmap**:
  - GitHub-style consistency grid, historical score logs, and aggregate metrics persisted locally.

- **📚 Metabolic Science Library**:
  - 6 deep-dive educational knowledge cards with category filters, practical takeaways, and direct links to peer-reviewed clinical research.

- **🤝 Contextual Steer Club Pathway**:
  - Clearly distinguishes educational quiz concepts from clinical medical therapy. Configurable via `STEER_CLUB_URL`.

---

## 4. Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with custom dark mode palette (`#0B0F17` midnight, `#C6FF65` luminous lime, `#A78BFA` violet)
- **Motion & Micro-interactions**: Framer Motion
- **Icons**: Lucide React
- **Client-Side Image Export**: `html-to-image`
- **Celebration Effects**: `canvas-confetti`
- **Storage**: LocalStorage with defensive wrappers and zero cookie tracking

---

## 5. Getting Started & Installation

### Prerequisites
- Node.js (v18.0.0 or higher, tested on v24.12.0)
- npm (v9.0.0 or higher)

### Setup Commands
```bash
# Clone the repository
git clone <repository-url>
cd metaboquest

# Install dependencies
npm install

# Start local development server (runs on http://localhost:3000)
npm run dev

# Run automated test suite
node test-suite.mjs

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 6. Deployment Instructions

MetaboQuest is a zero-backend, pure client-side static application. It deploys out-of-the-box to any modern static hosting service:

### Vercel
1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.

### Netlify
1. Drag and drop the `dist` folder onto Netlify, or link your Git repository.
2. Build Command: `npm run build`
3. Publish Directory: `dist`

### Cloudflare Pages / GitHub Pages
- Standard single-page application configuration with root `index.html`.

---

## 7. Educational Content Sources & Medical Evidence

All 15 quiz questions and 6 library articles were authored based on published clinical research and authoritative institutional guidelines:
- **National Institutes of Health (NIH)**: National Heart, Lung, and Blood Institute (NHLBI) guidelines on metabolic syndrome.
- **American Diabetes Association (ADA)**: Standards of Care in Diabetes, 2024.
- **American Heart Association (AHA)**: *Circulation* consensus on Triglyceride/HDL ratios and cardiovascular risk.
- **The Lancet Diabetes & Endocrinology**: Skeletal muscle glucose disposal and physical inactivity studies.
- **Cell**: Wastyk et al. (Stanford University School of Medicine) randomized trial on fermented foods, microbiome diversity, and inflammatory cytokines.
- **Annals of Internal Medicine**: Metabolic and endocrine consequences of acute sleep restriction.
- **iScience**: Hamilton et al. (University of Houston) on soleus muscle oxidative metabolism and glucose clearance.

---

## 8. Health & Clinical Disclaimer

MetaboQuest is solely an educational tool designed to promote general scientific literacy.
- It does **not** provide medical diagnoses, treatment plans, clinical advice, or disease risk estimations.
- Quiz performance reflects familiarity with biological concepts, not biological health status.
- Medication decisions (including GLP-1 receptor agonists) must always be evaluated individually by a licensed healthcare physician.

---

## 9. 2-Minute Hackathon Demo Script

1. **0:00 - 0:25 | The Hook (Landing & Constellation)**:
   - Introduce MetaboQuest's tagline: *"Your metabolism. Your mission. Your next challenge."*
   - Interact with the glowing biological constellation in the hero section, highlighting how muscle, sleep, and nutrition connect.
   - Try the 15-second sample question in the interactive preview to demonstrate instant feedback.

2. **0:25 - 1:00 | The Core Quest (5-Question Experience)**:
   - Click **Start your quest**. Notice zero registration friction.
   - Answer questions: observe keyboard accessibility, smooth progress animation, and timer toggle (switch to Relaxed Mode).
   - Point out the scientific mechanism explanation and source citation on every question.
   - Show how double-clicking is locked to protect score integrity.

3. **1:00 - 1:30 | Personalized Results & Viral Sharing**:
   - Reach Question 5: witness confetti celebration, score reveal (e.g. 500/600), and the *Metabolic Explorer* archetype.
   - Review the tailored insight specifically targeting any missed concepts.
   - Click **Download Card PNG** to showcase the high-res social card export.
   - Click **Challenge a Friend** and copy the custom URL.

4. **1:30 - 2:00 | Friend Challenge & Steer Club Conversion**:
   - Open a new tab with `?challenge=1&score=500&archetype=Metabolic%20Explorer&from=Jordan`.
   - Show the head-to-head ghost challenge banner: *"Jordan scored 500 pts. Can you beat their score?"*
   - Scroll to the bottom to highlight the transparent, evidence-based Steer Club conversion pathway.

---

## 10. Verification Tests Performed

- ✅ **TEST 1 — New Visitor Flow**: Landing → Start Quest → 5 Questions → Results screen.
- ✅ **TEST 2 — Maximum Score Calculation**: 5/5 correct answers verified to award exactly 600 pts (500 pts + 100 pt completion bonus).
- ✅ **TEST 3 — Incorrect Answer Scoring**: Incorrect answers award 0 points, explain the correct mechanism, and cite clinical literature.
- ✅ **TEST 4 — Double-Click Prevention**: Rapid multi-click triggers are locked upon first selection; points are never awarded twice.
- ✅ **TEST 5 — Replay Isolation**: Restarting the quiz resets answers, timer, and state cleanly with fresh question randomization.
- ✅ **TEST 6 — Referral Challenge URL**: Validated incoming challenge links (`?challenge=1&score=...`), ghost score target displays, and final comparison triggers.
- ✅ **TEST 7 — Malformed URL Handling**: XSS script injection, negative integers, and out-of-range scores defensively sanitized and safely clamped.
- ✅ **TEST 8 — Share API Fallback**: Web Share API tested with graceful clipboard fallback.
- ✅ **TEST 9 — PNG Card Generation**: `html-to-image` renders 2x retina cards with high contrast and legible typography.
- ✅ **TEST 10 — Local Persistence**: LocalStorage tracks device streak, daily quest status, and 6 achievements.
- ✅ **TEST 11 — Responsive Layout**: Verified at mobile (360px, 390px), tablet (768px), and desktop (1280px+).
- ✅ **TEST 12 — Keyboard Navigation & WCAG**: Focus visible rings, radio group roles, and `aria-live` announcement regions verified.
- ✅ **TEST 13 — Console & Build**: Zero build errors, zero runtime exceptions, production bundle compiled cleanly.
- ✅ **TEST 14 — Destination URLs**: Configurable `STEER_CLUB_URL` correctly links to partner resources without invented claims.
- ✅ **TEST 15 — Production Build**: `npm run build` succeeds in 3.8s.

---

## 11. Known Limitations & Configuration Placeholders
- **Live Deployment URL**: Placeholder ready for hackathon organizer's deployment target.
- **Repository URL**: Placeholder for team GitHub repository.
- **Steer Club URL**: Configured via `STEER_CLUB_URL` constant in `src/utils/sharing.js` (currently pointing to `https://steer.club`).

---

## 12. Credits & License
- MIT License
- Designed & built for the Steer Club Hackathon 2026.
