/**
 * Sharing & Challenge URL Utilities
 * 
 * Safe, sanitized, defensive URL parameter validation, Web Share API with clipboard fallback,
 * and reliable high-resolution canvas/PNG export.
 */

import { toPng } from 'html-to-image';
import { MAX_SCORE, ARCHETYPES } from './scoring.js';

// Read official Steer Club URL from environment if provided by organizers
export const STEER_CLUB_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_STEER_CLUB_URL) || '';

/**
 * Sanitizes input string to prevent XSS and malformed text.
 * @param {string} str
 * @returns {string}
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>'"&]/g, '') // Strip HTML characters
    .trim()
    .slice(0, 40); // Safe length limit
}

/**
 * Parses and defensively validates challenge parameters from window.location.search.
 * Validates score within [0, 500] and matches against known friendly badges.
 * Never exposes or reads sensitive medical information.
 * 
 * @returns {{isChallenge: boolean, targetScore: number, archetype: string, friendName: string} | null}
 */
export function parseChallengeParams() {
  if (typeof window === 'undefined') return null;

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const challenge = searchParams.get('challenge');
    
    // Accept ?challenge=1 or ?ref=friend
    if (!challenge && !searchParams.get('ref')) {
      return null;
    }

    const rawScore = parseInt(searchParams.get('score'), 10);
    const targetScore = !isNaN(rawScore) && rawScore >= 0 && rawScore <= MAX_SCORE 
      ? rawScore 
      : 300;

    const rawArchetype = sanitizeString(searchParams.get('archetype') || searchParams.get('badge') || '');
    const matchingArchetype = ARCHETYPES.find(
      a => a.title.toLowerCase() === rawArchetype.toLowerCase() || a.id === rawArchetype.toLowerCase()
    );
    const archetype = matchingArchetype ? matchingArchetype.title : 'Knowledge Builder';

    const rawName = sanitizeString(searchParams.get('from') || searchParams.get('name') || 'A friend');
    const friendName = rawName.length > 0 ? rawName : 'A friend';

    return {
      isChallenge: true,
      targetScore,
      archetype,
      friendName
    };
  } catch (err) {
    console.error('Failed to parse challenge query parameters defensively:', err);
    return null;
  }
}

/**
 * Generates a safe, non-sensitive challenge URL for sharing.
 * 
 * @param {number} score
 * @param {string} archetypeTitle
 * @param {string} fromName
 * @returns {string}
 */
export function generateChallengeUrl(score, archetypeTitle, fromName = '') {
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}`
    : 'https://metaboquest.app/';

  const params = new URLSearchParams();
  params.set('challenge', '1');
  params.set('score', Math.min(Math.max(0, Number(score) || 0), MAX_SCORE).toString());
  params.set('badge', sanitizeString(archetypeTitle || 'Knowledge Builder'));
  if (fromName && fromName.trim()) {
    params.set('from', sanitizeString(fromName.trim()));
  }

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Triggers native Web Share API or falls back to clipboard.
 * 
 * @param {Object} shareData
 * @returns {Promise<{success: boolean, method: 'native' | 'clipboard' | 'failed', message: string}>}
 */
export async function shareQuestResult({ score, archetypeTitle, shareUrl, displayName = '' }) {
  const author = displayName ? `${displayName}` : 'I';
  const title = 'MetaboQuest — The 90-Second Metabolic Health Challenge';
  const text = `${author} just scored ${score}/500 pts as a ${archetypeTitle} on MetaboQuest! Think you know metabolism? Take the 90-second challenge!`;

  if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare({ title, text, url: shareUrl })) {
    try {
      await navigator.share({ title, text, url: shareUrl });
      return { success: true, method: 'native', message: 'Shared successfully!' };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { success: false, method: 'native', message: 'Share dismissed.' };
      }
    }
  }

  // Fallback: Copy to clipboard
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      return { success: true, method: 'clipboard', message: 'Challenge link copied to clipboard!' };
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = `${text}\n${shareUrl}`;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return { success: true, method: 'clipboard', message: 'Challenge link copied to clipboard!' };
    }
  } catch (copyErr) {
    console.error('Clipboard copy failed:', copyErr);
    return { success: false, method: 'failed', message: 'Please copy the URL directly from your browser bar.' };
  }
}

/**
 * Client-side Canvas fallback renderer to guarantee genuine PNG export
 * even if DOM rasterization libraries encounter font or CSS issues.
 */
function renderCanvasFallback(data, filename) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 800, 1000);
  bgGrad.addColorStop(0, '#0B0F19');
  bgGrad.addColorStop(0.5, '#111827');
  bgGrad.addColorStop(1, '#0B0F19');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 800, 1000);

  // Outer border
  ctx.strokeStyle = 'rgba(198, 255, 101, 0.3)';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 760, 960);

  // Top accent bar
  const accentGrad = ctx.createLinearGradient(40, 40, 760, 40);
  accentGrad.addColorStop(0, '#C6FF65');
  accentGrad.addColorStop(0.5, '#A78BFA');
  accentGrad.addColorStop(1, '#34D399');
  ctx.fillStyle = accentGrad;
  ctx.fillRect(40, 36, 720, 8);

  // Header Logo & Branding
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('MetaboQuest', 60, 100);

  ctx.fillStyle = '#C6FF65';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('• 90-SECOND METABOLIC KNOWLEDGE QUEST', 60, 130);

  // Player Name if provided
  if (data.playerName) {
    ctx.fillStyle = '#94A3B8';
    ctx.font = '18px sans-serif';
    ctx.fillText(`Explorer: ${data.playerName}`, 60, 175);
  }

  // Circular Score Badge
  const centerX = 400;
  const centerY = 340;
  const radius = 110;

  // Track circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Score arc
  const pct = Math.min(1, Math.max(0, (data.score || 0) / (data.maxScore || 500)));
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + pct * 2 * Math.PI);
  ctx.strokeStyle = '#C6FF65';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Score Text inside ring
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 54px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${data.score || 0}`, centerX, centerY + 10);

  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText(`/ ${data.maxScore || 500} PTS`, centerX, centerY + 45);

  // Badge / Archetype Title
  ctx.fillStyle = '#C6FF65';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText(data.archetypeTitle || 'Knowledge Builder', centerX, 520);

  // Tagline
  ctx.fillStyle = '#CBD5E1';
  ctx.font = 'italic 18px sans-serif';
  ctx.fillText(`"${data.archetypeTagline || 'Understand your body. One small discovery at a time.'}"`, centerX, 560);

  // Stats Box
  ctx.fillStyle = '#182131';
  ctx.fillRect(80, 610, 640, 110);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 610, 640, 110);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#94A3B8';
  ctx.font = '14px sans-serif';
  ctx.fillText('QUESTIONS CORRECT', 120, 645);
  ctx.fillText('TOPIC STRENGTH', 360, 645);
  ctx.fillText('DISCOVERY FOCUS', 540, 645);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText(`${data.correctCount || 0} / ${data.totalQuestions || 5}`, 120, 685);
  ctx.fillText(data.strengthTopic ? data.strengthTopic.slice(0, 14) : 'Biology', 360, 685);
  ctx.fillText('Completed', 540, 685);

  // Key Takeaway
  ctx.fillStyle = 'rgba(198, 255, 101, 0.1)';
  ctx.fillRect(80, 750, 640, 120);
  ctx.strokeStyle = 'rgba(198, 255, 101, 0.3)';
  ctx.strokeRect(80, 750, 640, 120);

  ctx.fillStyle = '#C6FF65';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('KEY EDUCATIONAL TAKEAWAY:', 105, 785);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '15px sans-serif';
  const words = (data.takeaway || 'Metabolic health is the biological energy handling across organs, not scale weight alone.').split(' ');
  let line = '';
  let lineY = 815;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    if (ctx.measureText(testLine).width > 590 && n > 0) {
      ctx.fillText(line, 105, lineY);
      line = words[n] + ' ';
      lineY += 24;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 105, lineY);

  // Footer Disclaimers & URL
  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748B';
  ctx.font = '13px sans-serif';
  ctx.fillText('Educational content only • Not medical advice or diagnostic assessment', centerX, 915);
  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Play free at: metaboquest.app', centerX, 945);

  // Trigger download
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
  return true;
}

/**
 * Converts a DOM node into a genuine high-res PNG image, with client-side canvas fallback.
 * 
 * @param {HTMLElement} element
 * @param {string} filename
 * @param {Object} fallbackData
 * @returns {Promise<boolean>}
 */
export async function downloadResultImage(element, filename = 'metaboquest-scorecard.png', fallbackData = {}) {
  try {
    if (element) {
      const dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#0B0F19',
        cacheBust: true,
        filter: (node) => !node.classList?.contains('no-export')
      });

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
      return true;
    }
  } catch (err) {
    console.warn('DOM html-to-image render failed, switching to resilient Canvas fallback:', err);
  }

  // Fallback to pure HTML5 canvas renderer
  try {
    return renderCanvasFallback(fallbackData, filename);
  } catch (canvasErr) {
    console.error('All image export strategies failed:', canvasErr);
    return false;
  }
}
