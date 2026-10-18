/**
 * MetaboQuest Content Lab — Animated Reel Video Engine & Canvas Recorder
 * Renders real moving 9:16 (1080x1920) kinetic typography and cellular animations.
 * Exports real playable WebM/MP4 videos using Canvas captureStream & MediaRecorder.
 */

import { triggerFileDownload } from './canvasExport';

/**
 * Text wrapper for Canvas
 */
function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  if (!text) return y;
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
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
 * Render a single frame of the 1080x1920 Reel at exact timestamp `timeSec`
 */
export function drawReelFrame(ctx, timeSec, reelData, showCaptions = true) {
  const width = 1080;
  const height = 1920;
  const totalDuration = reelData?.totalDuration || 25;
  const clampedTime = Math.max(0, Math.min(timeSec, totalDuration));

  // Determine current scene
  let currentScene = reelData?.scenes?.[0];
  for (const scene of reelData?.scenes || []) {
    if (clampedTime >= scene.startTime && clampedTime < scene.endTime) {
      currentScene = scene;
      break;
    }
    if (clampedTime >= (reelData.scenes[reelData.scenes.length - 1]?.startTime || 20)) {
      currentScene = reelData.scenes[reelData.scenes.length - 1];
    }
  }

  const sceneProgress = currentScene 
    ? Math.min(1, Math.max(0, (clampedTime - currentScene.startTime) / (currentScene.duration || 1)))
    : 0;

  // 1. Dark Midnight Indigo Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#070B14');
  bgGrad.addColorStop(0.35, '#0E172A');
  bgGrad.addColorStop(0.7, '#0B1120');
  bgGrad.addColorStop(1, '#05080F');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Animated Ambient Glowing Orbs
  const osc1 = Math.sin(clampedTime * 1.5);
  const osc2 = Math.cos(clampedTime * 1.2);
  const glow1 = ctx.createRadialGradient(
    540 + osc1 * 120, 
    700 + osc2 * 80, 
    50, 
    540 + osc1 * 120, 
    700 + osc2 * 80, 
    600
  );
  glow1.addColorStop(0, 'rgba(0, 242, 254, 0.16)');
  glow1.addColorStop(0.5, 'rgba(16, 185, 129, 0.08)');
  glow1.addColorStop(1, 'transparent');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, width, height);

  // 3. Animated subtle floating cellular particles
  ctx.save();
  for (let i = 0; i < 16; i++) {
    const pX = (width * 0.1) + ((i * 137) % (width * 0.8));
    const pBaseY = (height * 0.2) + ((i * 223) % (height * 0.5));
    const pY = pBaseY + Math.sin(clampedTime * 2 + i) * 25;
    const pRadius = 3 + (i % 4) * 2;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(0, 242, 254, 0.35)' : 'rgba(16, 185, 129, 0.35)';
    ctx.beginPath();
    ctx.arc(pX, pY, pRadius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // 4. Safe Margin Header (Top Progress Bar & Brand)
  ctx.save();
  // Progress Bar Line at top (120px down, safe from phone notch/status bar)
  const barY = 130;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fillRect(100, barY, 880, 6);

  const fillWidth = (clampedTime / totalDuration) * 880;
  const barGrad = ctx.createLinearGradient(100, 0, 980, 0);
  barGrad.addColorStop(0, '#00F2FE');
  barGrad.addColorStop(1, '#10B981');
  ctx.fillStyle = barGrad;
  ctx.fillRect(100, barY, fillWidth, 6);

  // Top Wordmark
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(120, 190, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#00F2FE';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(132, 190, 8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.font = '700 22px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText('METABOQUEST', 152, 198);

  ctx.font = '600 16px "Space Grotesk", sans-serif';
  ctx.fillStyle = 'rgba(248, 250, 252, 0.5)';
  ctx.fillText(`SCENE ${currentScene?.sceneNumber || 1} / 5`, 860, 198);
  ctx.restore();

  // 5. Scene-Specific Visual Composition
  const sceneNum = currentScene?.sceneNumber || 1;

  if (sceneNum === 1) {
    // SCENE 1: Hook & Pulse
    ctx.save();
    // Expanding pulse rings
    const pulseRadius = 140 + (sceneProgress * 60) + (Math.sin(clampedTime * 4) * 15);
    ctx.strokeStyle = `rgba(0, 242, 254, ${0.4 - sceneProgress * 0.25})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(540, 720, pulseRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = `rgba(16, 185, 129, ${0.5 - sceneProgress * 0.3})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(540, 720, pulseRadius * 0.7, 0, Math.PI * 2);
    ctx.stroke();

    // Central Icon
    ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.beginPath();
    ctx.arc(540, 720, 65, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '800 42px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#10B981';
    ctx.textAlign = 'center';
    ctx.fillText('?', 540, 735);
    ctx.restore();
  } else if (sceneNum === 2) {
    // SCENE 2: The Connected Cellular Network
    ctx.save();
    const netY = 700;
    const nodes = [
      { x: 340, y: netY - 80, label: 'CELLS', color: '#10B981' },
      { x: 740, y: netY - 80, label: 'LIVER', color: '#00F2FE' },
      { x: 540, y: netY + 80, label: 'HEART', color: '#A78BFA' },
      { x: 540, y: netY - 140, label: 'BRAIN', color: '#C6FF65' }
    ];

    // Animate connecting lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    nodes.forEach((n, idx) => {
      const next = nodes[(idx + 1) % nodes.length];
      ctx.beginPath();
      ctx.moveTo(n.x, n.y);
      ctx.lineTo(next.x, next.y);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // Nodes
    nodes.forEach(n => {
      ctx.fillStyle = `${n.color}30`;
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 44, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.font = '700 16px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText(n.label, n.x, n.y + 6);
    });
    ctx.restore();
  } else if (sceneNum === 3) {
    // SCENE 3: Biomarker Cards
    ctx.save();
    const cards = [
      { title: 'BLOOD GLUCOSE', desc: 'Cellular fuel regulated by insulin', color: '#10B981', y: 550 },
      { title: 'BLOOD PRESSURE', desc: 'Cardiovascular wall tension', color: '#00F2FE', y: 690 },
      { title: 'BLOOD LIPIDS', desc: 'Triglycerides & HDL cholesterol', color: '#A78BFA', y: 830 }
    ];

    cards.forEach((c, i) => {
      const cardAlpha = Math.min(1, Math.max(0, (sceneProgress * 3) - i * 0.4));
      ctx.save();
      ctx.globalAlpha = cardAlpha;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.strokeStyle = c.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(140, c.y, 800, 110, 20);
      ctx.fill();
      ctx.stroke();

      // Color accent strip
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.roundRect(140, c.y, 16, 110, [20, 0, 0, 20]);
      ctx.fill();

      ctx.font = '700 24px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(c.title, 185, c.y + 45);

      ctx.font = '400 20px "Inter", sans-serif';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText(c.desc, 185, c.y + 85);
      ctx.restore();
    });
    ctx.restore();
  } else if (sceneNum === 4) {
    // SCENE 4: Converging Holistic Rings
    ctx.save();
    const rot = clampedTime * 0.8;
    const centerRingY = 700;

    ctx.save();
    ctx.translate(540, centerRingY);
    ctx.rotate(rot);
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)';
    ctx.lineWidth = 3;
    ctx.setLineDash([15, 10]);
    ctx.beginPath();
    ctx.arc(0, 0, 180, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(540, centerRingY);
    ctx.rotate(-rot * 1.2);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
    ctx.lineWidth = 3;
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.arc(0, 0, 120, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.font = '700 22px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText('COMPLETE MOSAIC', 540, centerRingY + 7);
    ctx.restore();
  } else if (sceneNum === 5) {
    // SCENE 5: Brand Outro & Evidence Badges
    ctx.save();
    const brandCenterY = 680;

    // Glowing logo mark
    ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.beginPath();
    ctx.arc(540, brandCenterY - 40, 75, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(540, brandCenterY - 40, 50, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = '800 52px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText('METABOQUEST', 540, brandCenterY + 80);

    ctx.font = '500 24px "Inter", sans-serif';
    ctx.fillStyle = '#10B981';
    ctx.fillText('Good health education. Beautifully communicated.', 540, brandCenterY + 130);

    // Verified badge
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(240, brandCenterY + 180, 600, 60, 30);
    ctx.fill();
    ctx.stroke();

    ctx.font = '600 16px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('EVIDENCE-BASE: NIDDK • CDC • WHO • MEDLINEPLUS', 540, brandCenterY + 217);
    ctx.restore();
  }

  // 6. Kinetic On-Screen Text (Kinetic typography in upper-center / lower-third)
  ctx.save();
  const textY = sceneNum === 3 ? 1040 : 1080;
  
  // Tag pill
  ctx.fillStyle = 'rgba(0, 242, 254, 0.15)';
  ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(140, textY - 60, 240, 36, 18);
  ctx.fill();
  ctx.stroke();

  ctx.font = '700 14px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#00F2FE';
  ctx.fillText('METABOLIC SCIENCE', 160, textY - 37);

  // Big Headline with kinetic reveal
  const headline = currentScene?.onScreenText || 'Metabolic health is more than a number.';
  ctx.font = '800 54px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  const headEndY = wrapCanvasText(ctx, headline, 140, textY + 20, 800, 66);

  // Subtext
  if (currentScene?.subText) {
    ctx.font = '500 28px "Inter", sans-serif';
    ctx.fillStyle = '#10B981';
    wrapCanvasText(ctx, currentScene.subText, 140, headEndY + 15, 800, 38);
  }
  ctx.restore();

  // 7. On-Screen Subtitles / Captions (in platform-safe bottom area: Y = 1620)
  if (showCaptions && currentScene?.captionText) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.beginPath();
    ctx.roundRect(120, 1600, 840, 110, 20);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = '600 24px "Inter", sans-serif';
    ctx.fillStyle = '#F8FAFC';
    ctx.textAlign = 'center';
    wrapCanvasText(ctx, currentScene.captionText, 540, 1648, 780, 34);
    ctx.restore();
  }

  // 8. Bottom Safe Zone Disclaimer (above mobile TikTok/Reels caption zone)
  ctx.save();
  ctx.font = '400 15px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.textAlign = 'center';
  ctx.fillText('Educational only • Not medical advice • Consult healthcare provider', 540, 1780);
  ctx.restore();
}

/**
 * Check if the browser supports MediaRecorder with WebM or MP4
 */
export function checkVideoRecordingSupport() {
  if (typeof window === 'undefined') return { supported: false, mimeType: null };
  if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) {
    return { supported: false, mimeType: null, reason: 'MediaRecorder or Canvas.captureStream not supported in this browser' };
  }

  const preferredTypes = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
    'video/mp4;codecs=avc1',
    'video/mp4'
  ];

  for (const type of preferredTypes) {
    if (MediaRecorder.isTypeSupported(type)) {
      return { supported: true, mimeType: type };
    }
  }

  return { supported: true, mimeType: '' }; // Browser default
}

/**
 * Record and Export the 1080x1920 Reel Video
 * Uses offscreen canvas + captureStream + MediaRecorder
 */
export async function recordAndExportReelVideo({
  reelData,
  onProgress,
  speedMultiplier = 2.0 // Render slightly accelerated for smooth UX export
}) {
  const support = checkVideoRecordingSupport();
  if (!support.supported) {
    throw new Error(support.reason || 'Video recording is not supported in this browser.');
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');

  const fps = 30;
  const stream = canvas.captureStream(fps);
  const totalDuration = reelData?.totalDuration || 25;
  const options = support.mimeType ? { mimeType: support.mimeType } : {};
  const mediaRecorder = new MediaRecorder(stream, options);

  const chunks = [];
  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      chunks.push(e.data);
    }
  };

  return new Promise((resolve, reject) => {
    mediaRecorder.onstop = () => {
      const mime = mediaRecorder.mimeType || 'video/webm';
      const ext = mime.includes('mp4') ? 'mp4' : 'webm';
      const blob = new Blob(chunks, { type: mime });
      const filename = `metaboquest-reel.${ext}`;
      triggerFileDownload(blob, filename);
      resolve({ filename, blob, mimeType: mime });
    };

    mediaRecorder.onerror = (err) => {
      reject(err);
    };

    mediaRecorder.start(100);

    let currentTime = 0;
    const intervalMs = 1000 / (fps * speedMultiplier);
    const timeStep = 1 / fps;

    const timer = setInterval(() => {
      currentTime += timeStep;
      drawReelFrame(ctx, currentTime, reelData, true);

      if (onProgress) {
        const percent = Math.min(100, Math.round((currentTime / totalDuration) * 100));
        onProgress({
          currentTime,
          totalDuration,
          percent
        });
      }

      if (currentTime >= totalDuration) {
        clearInterval(timer);
        setTimeout(() => {
          mediaRecorder.stop();
        }, 300);
      }
    }, intervalMs);
  });
}

/**
 * Export Reel Subtitles as SRT file
 */
export function exportReelSRT(reelData) {
  const content = reelData?.transcriptSrt || '';
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  triggerFileDownload(blob, 'metaboquest-reel-transcript.srt');
}

/**
 * Export Reel Transcript as TXT file
 */
export function exportReelTXT(reelData) {
  const content = reelData?.transcriptTxt || '';
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  triggerFileDownload(blob, 'metaboquest-reel-transcript.txt');
}
