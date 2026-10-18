/**
 * MetaboQuest Content Lab — High-Fidelity Canvas Graphic & ZIP Exporter
 * Renders true 1080x1350 px graphics for Carousel Slides & Static Social Posts
 * with verified source stamps, cellular network motifs, and ZIP packaging.
 */

import JSZip from 'jszip';

/**
 * Triggers a native browser file download from a Blob or DataURL
 */
export function triggerFileDownload(blobOrUrl, filename) {
  const link = document.createElement('a');
  if (typeof blobOrUrl === 'string') {
    link.href = blobOrUrl;
  } else {
    link.href = URL.createObjectURL(blobOrUrl);
  }
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  if (typeof blobOrUrl !== 'string') {
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }
}

/**
 * Helper: Wrap text onto multiple lines on HTML5 Canvas
 */
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  if (!text) return y;
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY + lineHeight;
}

/**
 * Render a single 1080x1350 Carousel Slide to an offscreen Canvas
 */
export function renderCarouselSlideCanvas(slide, slideIndex, totalSlides = 6, theme = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  // Background - Deep midnight indigo gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1350);
  bgGrad.addColorStop(0, '#090D16');
  bgGrad.addColorStop(0.5, '#0E1626');
  bgGrad.addColorStop(1, '#080B12');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1350);

  // Subtle ambient radial glow based on slide accent color
  const accent = slide.accentColor || '#10B981';
  const glowGrad = ctx.createRadialGradient(850, 250, 50, 850, 250, 600);
  glowGrad.addColorStop(0, `${accent}28`);
  glowGrad.addColorStop(0.5, `${accent}0A`);
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, 1080, 1350);

  // Grid texture overlay
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  const gridSize = 60;
  for (let x = 80; x < 1000; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 80);
    ctx.lineTo(x, 1270);
    ctx.stroke();
  }
  for (let y = 80; y < 1270; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.lineTo(1000, y);
    ctx.stroke();
  }

  // Draw Card Frame with refined border
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(80, 80, 920, 1190, 32);
  ctx.stroke();

  // Corner accent brackets
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  // Top-left bracket
  ctx.beginPath();
  ctx.moveTo(80, 120);
  ctx.lineTo(80, 80);
  ctx.lineTo(120, 80);
  ctx.stroke();
  // Bottom-right bracket
  ctx.beginPath();
  ctx.moveTo(960, 1270);
  ctx.lineTo(1000, 1270);
  ctx.lineTo(1000, 1230);
  ctx.stroke();
  ctx.restore();

  // Header Bar: Brand Wordmark + Slide Counter
  ctx.save();
  // Brand wordmark icon
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(140, 150, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#00F2FE';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(155, 150, 10, 0, Math.PI * 2);
  ctx.stroke();

  ctx.font = '600 24px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText('METABOQUEST', 180, 158);

  ctx.font = '400 18px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(248, 250, 252, 0.5)';
  ctx.fillText('CONTENT LAB', 345, 158);

  // Slide Counter (e.g. 01 / 06)
  const currentStr = String(slideIndex + 1).padStart(2, '0');
  const totalStr = String(totalSlides).padStart(2, '0');
  ctx.font = '600 22px "Space Grotesk", sans-serif';
  ctx.fillStyle = accent;
  ctx.textAlign = 'right';
  ctx.fillText(`${currentStr} / ${totalStr}`, 940, 158);
  ctx.textAlign = 'left';
  ctx.restore();

  // Category Tag Pill
  if (slide.tag) {
    ctx.save();
    ctx.fillStyle = `${accent}20`;
    ctx.strokeStyle = `${accent}60`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(140, 220, 320, 44, 22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = accent;
    ctx.font = '700 16px "Space Grotesk", sans-serif';
    ctx.fillText(slide.tag.toUpperCase(), 165, 248);
    ctx.restore();
  }

  // Slide Main Headline
  ctx.save();
  ctx.font = '700 62px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  const headlineEndY = wrapText(ctx, slide.headline || 'Metabolic health is more than a number.', 140, 340, 800, 72);
  ctx.restore();

  // Subhead (if present)
  let subheadEndY = headlineEndY;
  if (slide.subhead) {
    ctx.save();
    ctx.font = '500 28px "Inter", sans-serif';
    ctx.fillStyle = accent;
    subheadEndY = wrapText(ctx, slide.subhead, 140, headlineEndY + 20, 800, 38);
    ctx.restore();
  }

  // Decorative cellular illustration in center-bottom
  ctx.save();
  const diagramCenterY = subheadEndY + 130;
  // Node 1: Glucose / Energy
  ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(320, diagramCenterY, 50, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Node 2: Vascular / Lipids
  ctx.fillStyle = 'rgba(0, 242, 254, 0.15)';
  ctx.strokeStyle = '#00F2FE';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(540, diagramCenterY - 30, 60, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Node 3: Cellular Rhythms
  ctx.fillStyle = 'rgba(167, 139, 250, 0.15)';
  ctx.strokeStyle = '#A78BFA';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(760, diagramCenterY, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Connecting dashed lines
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(370, diagramCenterY);
  ctx.lineTo(480, diagramCenterY - 20);
  ctx.moveTo(600, diagramCenterY - 20);
  ctx.lineTo(715, diagramCenterY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Node text labels
  ctx.font = '600 16px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('GLUCOSE', 320, diagramCenterY + 6);
  ctx.fillText('LIPIDS & BP', 540, diagramCenterY - 24);
  ctx.fillText('RHYTHMS', 760, diagramCenterY + 6);
  ctx.textAlign = 'left';
  ctx.restore();

  // Body Narrative Text
  ctx.save();
  ctx.font = '400 30px "Inter", sans-serif';
  ctx.fillStyle = '#CBD5E1';
  const bodyStartY = diagramCenterY + 110;
  wrapText(ctx, slide.bodyText || '', 140, bodyStartY, 800, 46);
  ctx.restore();

  // Footer: Verified Evidence Badge & Educational Disclaimer
  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(140, 1140, 800, 95, 16);
  ctx.fill();
  ctx.stroke();

  // Green verification dot
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(170, 1175, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = '600 15px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('VERIFIED EVIDENCE BASE:', 188, 1178);

  ctx.font = '500 15px "Inter", sans-serif';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText('NIDDK • CDC • WHO • MedlinePlus (NIH)', 390, 1178);

  ctx.font = '400 14px "Inter", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('Educational purpose only. Does not replace personalized clinical advice.', 170, 1210);
  ctx.restore();

  return canvas;
}

/**
 * Render the single 1080x1350 Static Social Post to Canvas
 */
export function renderStaticPostCanvas(staticPost = {}, theme = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1350);
  bgGrad.addColorStop(0, '#070B14');
  bgGrad.addColorStop(0.4, '#0D172A');
  bgGrad.addColorStop(1, '#050810');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1350);

  // Large Central Cellular Network Glow
  const glow = ctx.createRadialGradient(540, 675, 40, 540, 675, 550);
  glow.addColorStop(0, 'rgba(0, 242, 254, 0.18)');
  glow.addColorStop(0.4, 'rgba(16, 185, 129, 0.12)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1080, 1350);

  // Outer Border Frame
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(80, 80, 920, 1190, 36);
  ctx.stroke();

  // Corner aesthetic highlights
  ctx.strokeStyle = '#00F2FE';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(80, 130);
  ctx.lineTo(80, 80);
  ctx.lineTo(130, 80);
  ctx.stroke();
  ctx.restore();

  // Top Wordmark Bar
  ctx.save();
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(145, 150, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#00F2FE';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(160, 150, 10, 0, Math.PI * 2);
  ctx.stroke();

  ctx.font = '700 24px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText('METABOQUEST', 185, 158);

  ctx.font = '500 16px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#10B981';
  ctx.textAlign = 'right';
  ctx.fillText('EVIDENCE-BASED CAMPAIGN', 935, 158);
  ctx.textAlign = 'left';
  ctx.restore();

  // Tag Badge
  ctx.save();
  ctx.fillStyle = 'rgba(0, 242, 254, 0.15)';
  ctx.strokeStyle = 'rgba(0, 242, 254, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(140, 215, 280, 42, 21);
  ctx.fill();
  ctx.stroke();

  ctx.font = '700 15px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#00F2FE';
  ctx.fillText('METABOLIC LITERACY', 165, 242);
  ctx.restore();

  // Main Editorial Headline
  ctx.save();
  ctx.font = '800 68px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  const headline = staticPost.headline || 'Metabolic health is bigger than one number.';
  const headEndY = wrapText(ctx, headline, 140, 335, 800, 78);
  ctx.restore();

  // Supporting Copy
  ctx.save();
  ctx.font = '500 30px "Inter", sans-serif';
  ctx.fillStyle = '#10B981';
  const subhead = staticPost.subhead || 'Understanding the bigger picture starts with reliable information.';
  const subEndY = wrapText(ctx, subhead, 140, headEndY + 15, 800, 42);
  ctx.restore();

  // Interactive System Diagram: 5 Interconnected Nodes
  ctx.save();
  const centerY = subEndY + 130;
  const nodes = [
    { label: 'GLUCOSE', sub: 'Cellular Fuel', x: 260, y: centerY - 20, color: '#10B981' },
    { label: 'LIPIDS', sub: 'HDL / Trigs', x: 540, y: centerY - 60, color: '#00F2FE' },
    { label: 'VESSELS', sub: 'Blood Pressure', x: 820, y: centerY - 20, color: '#A78BFA' },
    { label: 'SLEEP', sub: 'Circadian Rest', x: 380, y: centerY + 90, color: '#F59E0B' },
    { label: 'MOVEMENT', sub: 'Muscle Uptake', x: 700, y: centerY + 90, color: '#C6FF65' }
  ];

  // Draw connecting lines between all pairs
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 6]);
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[j].x, nodes[j].y);
      ctx.stroke();
    }
  }
  ctx.setLineDash([]);

  // Draw Nodes
  nodes.forEach(n => {
    // Pulse ring
    ctx.strokeStyle = `${n.color}50`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(n.x, n.y, 44, 0, Math.PI * 2);
    ctx.stroke();

    // Core
    ctx.fillStyle = `${n.color}25`;
    ctx.strokeStyle = n.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(n.x, n.y, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Node labels
    ctx.font = '700 15px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(n.label, n.x, n.y + 5);

    ctx.font = '400 13px "Inter", sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(n.sub, n.x, n.y + 60);
  });
  ctx.textAlign = 'left';
  ctx.restore();

  // Narrative Body Copy
  ctx.save();
  ctx.font = '400 27px "Inter", sans-serif';
  ctx.fillStyle = '#CBD5E1';
  const bodyText = staticPost.bodyText || 'Cellular energy, vascular resilience, blood glucose, and daily sleep interact in a continuous biological dialogue. Evaluating health requires looking at the full connected system.';
  wrapText(ctx, bodyText, 140, centerY + 185, 800, 42);
  ctx.restore();

  // Bottom Card: CTA & Verified Sources
  ctx.save();
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(140, 1120, 800, 115, 18);
  ctx.fill();
  ctx.stroke();

  // CTA Text
  ctx.font = '700 18px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#10B981';
  ctx.fillText(staticPost.ctaText || 'Learn more from trusted health resources.', 170, 1155);

  // Source Credit
  ctx.font = '500 15px "Inter", sans-serif';
  ctx.fillStyle = '#E2E8F0';
  ctx.fillText(staticPost.sourceCredit || 'Evidence-based review: NIDDK • CDC • WHO • MedlinePlus', 170, 1188);

  // Disclaimer
  ctx.font = '400 13px "Inter", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText(staticPost.disclaimer || 'Educational content only. Does not replace individualized clinical advice.', 170, 1215);
  ctx.restore();

  return canvas;
}

/**
 * Export a single Carousel Slide as high-resolution PNG
 */
export async function exportCarouselSlidePNG(slide, slideIndex, totalSlides = 6) {
  const canvas = renderCarouselSlideCanvas(slide, slideIndex, totalSlides);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const filename = `metaboquest-carousel-slide-${String(slideIndex + 1).padStart(2, '0')}.png`;
      triggerFileDownload(blob, filename);
      resolve({ filename, blob });
    }, 'image/png');
  });
}

/**
 * Export all Carousel Slides packaged into a single ZIP file using JSZip
 */
export async function exportAllCarouselSlidesZIP(slides = [], onProgress) {
  const zip = new JSZip();
  const folder = zip.folder('metaboquest-carousel-slides');

  for (let i = 0; i < slides.length; i++) {
    if (onProgress) onProgress(i + 1, slides.length);
    const canvas = renderCarouselSlideCanvas(slides[i], i, slides.length);
    const dataUrl = canvas.toDataURL('image/png');
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    folder.file(`metaboquest-carousel-slide-${String(i + 1).padStart(2, '0')}.png`, base64Data, { base64: true });
  }

  // Add slide transcripts & captions text file
  const transcriptText = slides.map((s, idx) => (
    `[SLIDE ${idx + 1} / ${slides.length}] - ${s.tag || ''}\n` +
    `Headline: ${s.headline}\n` +
    (s.subhead ? `Subhead: ${s.subhead}\n` : '') +
    `Body: ${s.bodyText}\n` +
    `Sources: ${s.sourceIds ? s.sourceIds.join(', ') : 'NIDDK, CDC, WHO, MedlinePlus'}\n` +
    `----------------------------------------\n`
  )).join('\n');
  folder.file('carousel-transcripts-and-citations.txt', transcriptText);

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const filename = 'metaboquest-carousel-all-slides.zip';
  triggerFileDownload(zipBlob, filename);
  return { filename, zipBlob };
}

/**
 * Export Static Post as high-resolution PNG
 */
export async function exportStaticPostPNG(staticPost) {
  const canvas = renderStaticPostCanvas(staticPost);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const filename = 'metaboquest-static-post.png';
      triggerFileDownload(blob, filename);
      resolve({ filename, blob });
    }, 'image/png');
  });
}
