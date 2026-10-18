# MetaboQuest Content Lab 🌿🔬✨

> **“Good health education. Beautifully communicated.”**  
> *An AI-assisted evidence-based content production studio for creating verifiable metabolic health education campaigns.*

[![React 18](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Vite 5](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-teal.svg)](https://tailwindcss.com/)
[![JSZip](https://img.shields.io/badge/JSZip-3.10-orange.svg)](https://stuk.github.io/jszip/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## 1. Executive Summary & Product Vision

**MetaboQuest Content Lab** is a creative workspace engineered to solve one of the hardest challenges in modern health communication: **making rigorous, evidence-based metabolic science approachable, visually stunning, and verifiable across social media platforms.**

* **Product Name**: MetaboQuest Content Lab
* **Tagline**: *“Good health education. Beautifully communicated.”*
* **Primary Campaign**: *“Metabolic health is more than a number.”*
* **Target Audience**: Young adults and general audiences seeking approachable, evidence-based metabolic health education.
* **Core Objective**: Teach that metabolic health involves multiple interconnected biological systems (cellular glucose disposal, vascular dynamics, serum lipids, circadian sleep rhythms), rather than relying on a single number or body measurement alone.
* **Medical Boundaries**: Strictly non-diagnostic. Does not diagnose conditions, promise weight loss, recommend prescription drugs, shame body types, or make unsupported claims.

---

## 2. Core Finished Deliverables

MetaboQuest Content Lab generates three coordinated social deliverables sharing a unified evidence base, typography system, and Midnight Mint aesthetic:

### 📱 Deliverable 1: Six-Slide Educational Carousel
* **Output Format**: 1080 × 1350 px (Portrait 4:5 ratio, Instagram standard)
* **Slide 1 (Hook)**: *"Metabolic health is more than a number."* — Challenges single-metric reductionism.
* **Slide 2 (The Big Picture)**: *"Your body works as a connected system."* — Organ crosstalk between liver, pancreas, heart, and muscles.
* **Slide 3 (Glucose and Energy)**: *"How does your body use energy?"* — Blood glucose as essential cellular fuel and natural daily rhythms.
* **Slide 4 (Beyond One Measurement)**: *"One number cannot tell the whole story."* — Multi-biomarker mosaic (glucose, blood pressure, lipids, sleep).
* **Slide 5 (Everyday Context)**: *"Small habits are part of the conversation."* — Movement, balanced whole foods, and restorative sleep over extreme diets.
* **Slide 6 (Takeaway & Sources)**: *"Stay curious about your health."* — Full citations (NIDDK, CDC, WHO, MedlinePlus) and clinical disclaimers.
* **Studio Features**: Slide navigation, live text editing, accent palette switcher (Mint Emerald, Electric Cyan, Deep Amethyst, Lime, Solar Amber), slide reordering, individual PNG downloads, contact sheet view, and **single-click ZIP archive export containing all 6 slides** (`metaboquest-carousel-all-slides.zip`).

### 🖼️ Deliverable 2: Static Social Post Graphic
* **Output Format**: 1080 × 1350 px (4:5 high-resolution PNG)
* **Headline**: *"Metabolic health is bigger than one number."*
* **Supporting Copy**: *"Understanding the bigger picture starts with reliable information."*
* **Visual Artwork**: Dynamic 5-node interconnected cellular pathway motif (Glucose, Lipids, Vessels, Sleep, Daily Habits) rendered on HTML5 Canvas.
* **Studio Features**: Instagram safe-margin guides toggle, text overflow warnings, editorial typography controls, social caption and accessible alt-text with one-click copy, and high-res PNG download.

### 🎬 Deliverable 3: Short-Form Animated Reel
* **Output Format**: Vertical 9:16 (1080 × 1920 px canvas, ~25 seconds)
* **Scene 1 (0–4s)**: *"Think metabolic health is just about weight?"* — Kinetic typography with pulsing radial glow.
* **Scene 2 (4–9s)**: *"There is more to the picture."* — Interconnected cellular network nodes emerge sequentially.
* **Scene 3 (9–15s)**: *"Glucose, blood pressure, blood lipids, and rest all interact."* — Staggered animated cards for each biomarker.
* **Scene 4 (15–21s)**: *"Context matters. One measurement cannot explain everything."* — Converging holistic network ring.
* **Scene 5 (21–26s)**: *"Stay curious. Learn from trusted sources."* — MetaboQuest wordmark, evidence badges, and disclaimer.
* **Studio Features**: Real moving canvas animation preview (runs autonomously via `requestAnimationFrame`), play/pause/restart, scrubbable timecode slider, scene duration editor, subtitle track toggle within platform safe zones, SRT subtitle file download, TXT transcript download, and **real WebM/MP4 video recording using `canvas.captureStream()` and `MediaRecorder`**.

---

## 3. Documented Research & Primary Sources

All factual assertions in this application are grounded in published clinical documents from authoritative public health bodies:

1. **National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK, NIH)**  
   *URL*: `https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes`  
   *Finding*: Metabolism converts nutrition into cellular glucose; insulin facilitates cellular entry; metabolism is an organ-wide biological network.
2. **Centers for Disease Control and Prevention (CDC)**  
   *URL*: `https://www.cdc.gov/diabetes/basics/prediabetes.html`  
   *Finding*: Metabolic risk is cumulative and multifaceted; physical activity and whole-food nutrition reduce risk across all body types.
3. **World Health Organization (WHO)**  
   *URL*: `https://www.who.int/news-room/fact-sheets/detail/healthy-diet`  
   *Finding*: Whole grains, dietary fiber, legumes, and unsaturated fats support cardiometabolic regulation; single superfoods do not replace balanced habits.
4. **MedlinePlus — National Library of Medicine (NIH)**  
   *URL*: `https://medlineplus.gov/metabolicsyndrome.html`  
   *Finding*: Metabolic syndrome is defined by a cluster of co-occurring factors (glucose, triglycerides, HDL, blood pressure, waist circumference) rather than any isolated reading.
5. **U.S. Department of Health and Human Services (HHS / CDC)**  
   *URL*: `https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines`  
   *Finding*: Muscle contraction stimulates non-insulin dependent glucose uptake, improving postprandial insulin action for 24–48 hours.
6. **American Diabetes Association (ADA)**  
   *URL*: `https://diabetesjournals.org/care/issue/47/Supplement_1`  
   *Finding*: Biomarker interpretation requires clinical context; individual assessments require licensed healthcare providers.

*Research Library Features*: Add source, edit source, delete source with confirmation, search/filter, open URL in new tab, and export as CSV (`metaboquest-research-register.csv`) or JSON.

---

## 4. Claim Ledger & Verification System

A core differentiator of MetaboQuest Content Lab is its **Claim Ledger**:
* Every single factual assertion used across the carousel, static post, and reel is assigned a unique Ledger ID (`CLM-001` through `CLM-006`).
* A source URL existing is **not** proof that it supports a claim.
* Mandatory review statuses: `draft`, `needs_source`, `ready_for_review`, `human_verified`, `rejected`.
* Includes a demonstrated rejected claim (`CLM-007`: *"Drinking lemon detox water guaranteed to melt belly fat in 48 hours"*) to showcase how the Quality Gate flags unverified claims and prohibited phrases.
* Exportable as CSV (`metaboquest-claim-ledger.csv`) and JSON.

---

## 5. The Seven-Stage Repeatable Pipeline

MetaboQuest Content Lab features a working, repeatable pipeline engine:
* **Stage A — Research**: Collect and verify source records from NIDDK, CDC, WHO, and MedlinePlus.
* **Stage B — Claim Extraction**: Identify factual assertions and assign unique claim IDs.
* **Stage C — Claim Audit**: Verify evidence links, flag unsupported claims, and enforce human review.
* **Stage D — Content Generation**: Deterministic template synthesizer generates coordinated drafts for Carousel, Static Post, and Reel Script.
* **Stage E — Visual Design**: Applies Midnight Mint theme tokens, responsive layouts, 1080×1350 / 1080×1920 aspect ratios, and safe zones.
* **Stage F — Quality Review**: Multi-point heuristic and editorial compliance audit.
* **Stage G — Deliverable Export**: Generates actual PNGs, ZIP archive, WebM video, transcripts, and manifests.
* *Pipeline Features*: Individual stage reruns, full pipeline runner, execution logs with timestamps, error recovery, and LocalStorage draft persistence.

---

## 6. Automated Quality Gate

The built-in Quality Gate inspects content against technical, editorial, and medical standards:
* **Technical Checks**: Slide count (≥4), empty headlines/body, text overflow warnings (>85 chars headline, >280 chars body), aspect ratio validity, reel scene count (≥3), zero-duration detection, optimal video length (20–30s).
* **Evidence Checks**: Unverified claims flagged, missing source detection, rejected claims blocked from assets.
* **Prohibited Language Scanner**: Scans text against terms like *"cure"*, *"miracle"*, *"melt fat"*, *"guaranteed"*, *"detox"*, *"reverse in 24 hours"*, and prescription drug promotion.
* **Transparency Labeling**: Clearly distinguishes automated syntax checks from human verification ("Human review required" badges).

---

## 7. Hackathon Presentation Mode

Click the **"Presentation Demo"** button in the top navigation bar to launch the guided 9-step judges walkthrough:
* **Step 1: Executive Pitch**:
  * *The Problem*: Engaging social health content is often overrun with rapid detox myths and shame.
  * *The Solution*: Turnkey studio connecting verified research with multi-format motion graphics.
  * *The Differentiator*: Traceable claim ledger and human verification gates alongside animated exports.
  * *The Impact*: Safe, beautiful, evidence-grounded education for young adults.
* **Steps 2–9**: Interactive walkthrough navigating through the Brief Builder, Research Library, Claim Ledger, Pipeline Engine, Carousel Studio, Static Post Studio, Reel Studio, and Export Hub.

---

## 8. Export Center & Canonical Deliverables

Directly download files from the browser export hub or inspect the pre-generated files in `deliverables/`:

| Filename | Format | Description |
|:---|:---|:---|
| `metaboquest-carousel-slide-01.png` ... `06.png` | PNG | 6 individual 1080 × 1350 carousel slides |
| `metaboquest-carousel-all-slides.zip` | ZIP | Complete 6-slide carousel package + citations |
| `metaboquest-static-post.png` | PNG | High-resolution 1080 × 1350 static social post |
| `metaboquest-reel.webm` | WebM | Recorded 1080 × 1920 (9:16) 25-second animated reel |
| `metaboquest-reel-transcript.srt` | SRT | Subtitle track with exact timecodes |
| `metaboquest-reel-transcript.txt` | TXT | Full scene transcript |
| `metaboquest-research-register.csv` | CSV | Authoritative source register |
| `metaboquest-research-register.json` | JSON | Machine-readable source dataset |
| `metaboquest-claim-ledger.csv` | CSV | Full claim ledger with audit status |
| `metaboquest-claim-ledger.json` | JSON | Machine-readable claim dataset |
| `metaboquest-campaign-summary.md` | Markdown | Comprehensive campaign report |
| `metaboquest-asset-manifest.json` | JSON | Complete asset manifest |

---

## 9. Technology Stack & Architecture

* **Frontend**: React 18, Vite 5, JavaScript (ESM)
* **Styling**: Tailwind CSS 3.4 (custom design tokens for deep midnight indigo, graphite surfaces, electric teal, and mint)
* **Animations**: Framer Motion 11 + `requestAnimationFrame` Canvas renderer
* **Icons**: Lucide React
* **ZIP Packaging**: JSZip (browser-native archive generation)
* **Video Recording**: HTML5 Canvas + `canvas.captureStream(30)` + `MediaRecorder`
* **Image Rendering**: Offscreen HTML5 Canvas (1080×1350 px and 1080×1920 px)
* **Storage**: Browser LocalStorage with graceful corrupted-data handling
* **Accessibility**: Respects `prefers-reduced-motion` and includes in-app reduced motion setting

---

## 10. Run & Build Instructions

### Prerequisites
* Node.js 18+ (tested on Node v20/v24)
* npm 9+

### Quick Start
```bash
# Clone or navigate to the project directory
cd metaboquest

# Install dependencies
npm install

# Run automated verification test suite
node test-content-lab.mjs

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Automated Test Suites
* **`node test-content-lab.mjs`**: Validates research source integrity, claim ledger safeguards, deterministic pipeline synthesizer, prohibited language filters, and quality audit rules (39 passing assertions).
* **`node test-suite.mjs`**: Validates scoring engine, question banks, and input sanitization (14 passing assertions).

---

## 11. AI Tool & Asset Disclosure

In accordance with hackathon disclosure standards:
* **AI Tooling**: Assisted by Gemini 3.8 Flash (High) for code scaffolding, heuristic rule definitions, and React component structuring.
* **Evidence Base**: Authored by human medical content review against official public health portals (NIDDK, CDC, WHO, MedlinePlus). No scientific studies, authors, or statistics were fabricated.
* **Deterministic Synthesis**: The content pipeline uses a transparent, deterministic rule-based template engine rather than unpredictable live LLM generation for production stability.
* **Fonts**: Inter and Space Grotesk via Google Fonts.
* **Icons**: Lucide React.
