import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Video, 
  FileText, 
  Clock, 
  Sliders, 
  Sparkles, 
  Check, 
  Copy, 
  Subtitles, 
  Volume2, 
  VolumeX,
  Layers,
  AlertCircle
} from 'lucide-react';
import { 
  drawReelFrame, 
  recordAndExportReelVideo, 
  exportReelSRT, 
  exportReelTXT,
  checkVideoRecordingSupport 
} from '../../utils/videoExport';

export function ReelStudio({
  reelData,
  onUpdateReelData,
  onExportSuccess
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isExportingVideo, setIsExportingVideo] = useState(false);
  const [exportProgress, setExportProgress] = useState(null);
  const [copiedCaption, setCopiedCaption] = useState(false);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimestampRef = useRef(null);

  const totalDuration = reelData?.totalDuration || 25;
  const scenes = reelData?.scenes || [];
  const activeScene = scenes[activeSceneIndex] || scenes[0] || {};

  // Support detection
  const recordingSupport = checkVideoRecordingSupport();

  // Animation frame loop for continuous real-time moving canvas preview
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const renderLoop = (timestamp) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }
      const delta = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      if (isPlaying) {
        setCurrentTime((prev) => {
          let next = prev + delta;
          if (next >= totalDuration) {
            next = 0; // Loop playback
          }
          return next;
        });
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, totalDuration]);

  // Draw canvas whenever currentTime or reelData updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    drawReelFrame(ctx, currentTime, reelData, showCaptions);

    // Keep active scene index in sync with timeline
    const idx = scenes.findIndex(s => currentTime >= s.startTime && currentTime < s.endTime);
    if (idx !== -1 && idx !== activeSceneIndex) {
      setActiveSceneIndex(idx);
    }
  }, [currentTime, reelData, showCaptions, scenes, activeSceneIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    lastTimestampRef.current = null;
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    lastTimestampRef.current = null;
  };

  const handleScrub = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    lastTimestampRef.current = null;
  };

  const handleSelectScene = (idx) => {
    setActiveSceneIndex(idx);
    const targetScene = scenes[idx];
    if (targetScene) {
      setCurrentTime(targetScene.startTime + 0.1);
    }
  };

  const handleSceneTextChange = (field, value) => {
    const updatedScenes = [...scenes];
    updatedScenes[activeSceneIndex] = {
      ...updatedScenes[activeSceneIndex],
      [field]: value
    };
    onUpdateReelData({
      ...reelData,
      scenes: updatedScenes
    });
  };

  const handleSceneDurationChange = (val) => {
    const num = parseFloat(val) || 1;
    const updatedScenes = [...scenes];
    updatedScenes[activeSceneIndex].duration = num;

    // Recalculate start and end times for all scenes
    let runningTime = 0;
    updatedScenes.forEach(s => {
      s.startTime = runningTime;
      s.endTime = runningTime + (s.duration || 4);
      runningTime = s.endTime;
    });

    onUpdateReelData({
      ...reelData,
      totalDuration: runningTime,
      scenes: updatedScenes
    });
  };

  const handleExportVideo = async () => {
    setIsExportingVideo(true);
    setExportProgress({ percent: 0, text: 'Initializing canvas video stream...' });

    try {
      const result = await recordAndExportReelVideo({
        reelData,
        onProgress: ({ percent, currentTime, totalDuration }) => {
          setExportProgress({
            percent,
            text: `Rendering reel frames: ${Math.round(currentTime)}s / ${totalDuration}s (${percent}%)`
          });
        }
      });

      if (onExportSuccess) {
        onExportSuccess({
          filename: result.filename,
          type: 'reel_video',
          dimensions: '1080 × 1920 px (9:16 vertical video)'
        });
      }
    } catch (err) {
      console.error(err);
      alert('Video export notice: ' + err.message);
    } finally {
      setIsExportingVideo(false);
      setExportProgress(null);
    }
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(reelData.caption || '');
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-violet-500/15 text-violet-300 border border-violet-500/30">
              Finished Deliverable 3
            </span>
            <span className="text-xs text-slate-400">
              Vertical 9:16 • 1080 × 1920 px • 5 Kinetic Animated Scenes
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-1">
            Short-Form Animated Reel Studio
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            A real-time moving canvas short-form video editor with kinetic typography, moving cellular particles, subtitle tracks, and native WebM/MP4 video capture.
          </p>
        </div>

        {/* Global Reel Exporters */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => exportReelSRT(reelData)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            title="Download Subtitles (.srt)"
          >
            <Subtitles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SRT Subtitles</span>
          </button>

          <button
            onClick={() => exportReelTXT(reelData)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            title="Download Transcript (.txt)"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Transcript</span>
          </button>

          <button
            onClick={handleExportVideo}
            disabled={isExportingVideo}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-glow-violet"
          >
            <Video className="w-4 h-4" />
            <span>
              {isExportingVideo 
                ? (exportProgress?.text || 'Encoding Video...') 
                : 'Export Reel Video (9:16)'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Grid: Live Moving Video Player (5 cols) + Timeline & Scene Editor (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 9:16 Smartphone Video Container (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          {/* Smartphone Frame Wrapper */}
          <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-[36px] bg-[#05080F] border-4 border-slate-800 p-2 shadow-2xl overflow-hidden ring-1 ring-white/10">
            
            {/* Phone Speaker Notch Bar */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-slate-900/90 z-30 flex items-center justify-center">
              <div className="w-8 h-1 rounded-full bg-slate-700" />
            </div>

            {/* The Actual HTML5 Canvas Element Rendering Continuous Animation */}
            <canvas
              ref={canvasRef}
              width={1080}
              height={1920}
              className="w-full h-full rounded-[28px] object-cover bg-black"
            />

            {/* Play/Pause Center Overlay on hover when paused */}
            {!isPlaying && (
              <div 
                onClick={handlePlayPause}
                className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center cursor-pointer z-20"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white backdrop-blur-md shadow-2xl hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Video Playback & Scrubbing Controller Bar */}
          <div className="w-full max-w-[340px] mt-4 p-3 rounded-2xl bg-[#0E1526] border border-white/10 space-y-2">
            
            {/* Slider */}
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={totalDuration}
                step={0.1}
                value={currentTime}
                onChange={handleScrub}
                className="w-full h-1.5 rounded-lg bg-slate-700 accent-violet-500 cursor-pointer"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayPause}
                  className="p-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={handleRestart}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                  title="Restart from beginning"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`px-2 py-1 rounded-md text-[10px] font-bold border ${
                    showCaptions
                      ? 'bg-violet-500/20 text-violet-300 border-violet-500/40'
                      : 'bg-slate-800 text-slate-400 border-white/10'
                  }`}
                  title="Toggle on-screen captions"
                >
                  CC
                </button>
              </div>

              {/* Timecode */}
              <div className="font-mono text-xs text-slate-300">
                <span className="text-white font-bold">{currentTime.toFixed(1)}s</span> / {totalDuration.toFixed(1)}s
              </div>
            </div>

          </div>

          {/* Export progress indicator */}
          {isExportingVideo && exportProgress && (
            <div className="w-full max-w-[340px] mt-3 p-3 rounded-xl bg-violet-950/40 border border-violet-500/30 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-violet-300">
                <span>{exportProgress.text}</span>
                <span>{exportProgress.percent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-violet-500 transition-all duration-150"
                  style={{ width: `${exportProgress.percent}%` }}
                />
              </div>
            </div>
          )}

        </div>

        {/* Right: Scene Timeline & Content Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Scene Timeline Switcher */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Scene Timeline Navigator
              </span>
              <span className="text-xs text-slate-400">
                5 Coordinated Scenes ({totalDuration}s total)
              </span>
            </div>

            {/* Timeline scene blocks */}
            <div className="grid grid-cols-5 gap-1.5">
              {scenes.map((s, idx) => {
                const isSelected = activeSceneIndex === idx;
                const isCurrentPlaying = currentTime >= s.startTime && currentTime < s.endTime;

                return (
                  <button
                    key={s.id || idx}
                    onClick={() => handleSelectScene(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-violet-600/25 border-violet-400 ring-1 ring-violet-400/30'
                        : isCurrentPlaying
                        ? 'bg-slate-800 border-white/30'
                        : 'bg-slate-900 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                      <span className={isSelected ? 'text-violet-300' : 'text-slate-300'}>
                        SCENE {idx + 1}
                      </span>
                      <span className="text-slate-400 font-mono">
                        {s.duration}s
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {s.startTime}s - {s.endTime}s
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Scene Editor Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Editing Scene {activeSceneIndex + 1} of 5
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Duration:</span>
                <input
                  type="number"
                  min={2}
                  max={15}
                  step={0.5}
                  value={activeScene.duration || 4}
                  onChange={(e) => handleSceneDurationChange(e.target.value)}
                  className="w-16 px-2 py-1 rounded-lg bg-slate-900 border border-white/10 text-xs text-white font-mono text-center focus:outline-none focus:border-violet-500"
                />
                <span className="text-xs text-slate-400">sec</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  On-Screen Headline (Kinetic Typography)
                </label>
                <textarea
                  rows={2}
                  value={activeScene.onScreenText || ''}
                  onChange={(e) => handleSceneTextChange('onScreenText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Supporting Context / Subtext
                </label>
                <input
                  type="text"
                  value={activeScene.subText || ''}
                  onChange={(e) => handleSceneTextChange('subText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subtitle Track Text (Accessible Captions)
                </label>
                <input
                  type="text"
                  value={activeScene.captionText || ''}
                  onChange={(e) => handleSceneTextChange('captionText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </div>

          {/* Social Caption & Copy */}
          <div className="rounded-2xl border border-white/10 bg-[#0E1526] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                TikTok / Reels Video Caption
              </span>
              <button
                onClick={handleCopyCaption}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:underline"
              >
                {copiedCaption ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCaption ? 'Copied' : 'Copy Caption'}</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={reelData.caption || ''}
              onChange={(e) => onUpdateReelData({ ...reelData, caption: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
            />
          </div>

        </div>

      </div>

    </div>
  );
}
