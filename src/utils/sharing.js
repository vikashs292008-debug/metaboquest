/**
 * Sharing & Challenge URL Utilities
 * Robust, sanitized, defensive URL parameter validation and sharing helpers.
 */

import { toPng } from 'html-to-image';
import { MAX_SCORE, ARCHETYPES } from './scoring.js';

// Default Steer Club destination URL (transparent, configurable)
export const STEER_CLUB_URL = 'https://steer.club';

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
    .slice(0, 50); // Hard length limit
}

/**
 * Parses and defensively validates challenge parameters from window.location.search.
 * @returns {{isChallenge: boolean, targetScore: number, archetype: string, friendName: string} | null}
 */
export function parseChallengeParams() {
  if (typeof window === 'undefined') return null;

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const challenge = searchParams.get('challenge');
    
    if (!challenge || challenge !== '1') {
      return null;
    }

    const rawScore = parseInt(searchParams.get('score'), 10);
    // Score must be an integer between 0 and MAX_SCORE (600)
    const targetScore = !isNaN(rawScore) && rawScore >= 0 && rawScore <= MAX_SCORE 
      ? rawScore 
      : 400; // Reasonable fallback

    const rawArchetype = sanitizeString(searchParams.get('archetype') || '');
    // Validate against known archetypes or default to 'Metabolic Explorer'
    const matchingArchetype = ARCHETYPES.find(a => a.title.toLowerCase() === rawArchetype.toLowerCase());
    const archetype = matchingArchetype ? matchingArchetype.title : 'Metabolic Explorer';

    const rawName = sanitizeString(searchParams.get('from') || 'A friend');
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
 * Generates a challenge URL for sharing with friends.
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
  params.set('archetype', sanitizeString(archetypeTitle || 'Metabolic Explorer'));
  if (fromName && fromName.trim()) {
    params.set('from', sanitizeString(fromName.trim()));
  }

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Triggers native share API or fallback copy-to-clipboard.
 * @param {Object} shareData
 * @returns {Promise<{success: boolean, method: 'native' | 'clipboard' | 'failed', message: string}>}
 */
export async function shareQuestResult({ score, archetypeTitle, shareUrl }) {
  const title = 'MetaboQuest — The 90-Second Metabolic Health Challenge';
  const text = `I just scored ${score} pts as a ${archetypeTitle} on MetaboQuest! Think you know metabolism? Can you beat my score?`;

  if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare({ title, text, url: shareUrl })) {
    try {
      await navigator.share({ title, text, url: shareUrl });
      return { success: true, method: 'native', message: 'Shared successfully!' };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { success: false, method: 'native', message: 'Share cancelled.' };
      }
      // If native share threw unexpected error, fall through to clipboard
    }
  }

  // Fallback to clipboard
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      return { success: true, method: 'clipboard', message: 'Challenge link copied to clipboard!' };
    } else {
      // Legacy document.execCommand fallback
      const textArea = document.createElement('textarea');
      textArea.value = `${text}\n${shareUrl}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return { success: true, method: 'clipboard', message: 'Challenge link copied to clipboard!' };
    }
  } catch (copyErr) {
    console.error('Clipboard copy failed:', copyErr);
    return { success: false, method: 'failed', message: 'Could not copy link automatically. Please copy the URL manually.' };
  }
}

/**
 * Converts a DOM node into a high-res PNG image and triggers download.
 * @param {HTMLElement} element
 * @param {string} filename
 * @returns {Promise<boolean>}
 */
export async function downloadResultImage(element, filename = 'metaboquest-result.png') {
  if (!element) return false;

  try {
    const dataUrl = await toPng(element, {
      quality: 0.98,
      pixelRatio: 2,
      backgroundColor: '#0B0F17',
      cacheBust: true,
      filter: (node) => {
        // Exclude interactive buttons inside the card during render
        return !node.classList?.contains('no-export');
      }
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (err) {
    console.error('Error generating result card image:', err);
    return false;
  }
}
