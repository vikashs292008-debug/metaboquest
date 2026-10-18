import React from 'react';
import { 
  Settings, 
  X, 
  Trash2, 
  Download, 
  Shield, 
  Eye, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { triggerFileDownload } from '../../utils/canvasExport';

export function SettingsModal({
  isOpen,
  onClose,
  settings = {},
  onUpdateSettings,
  onResetProject,
  fullProjectState
}) {
  if (!isOpen) return null;

  const handleExportBackup = () => {
    const jsonStr = JSON.stringify(fullProjectState, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    triggerFileDownload(blob, `metaboquest-project-backup-${Date.now()}.json`);
  };

  const handleToggleReducedMotion = (e) => {
    onUpdateSettings({ reducedMotion: e.target.checked });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0D1526] border border-white/15 p-6 shadow-2xl z-10 space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-300" />
            <h3 className="font-display font-bold text-white text-lg">
              Studio Settings & Storage
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Privacy & Storage Section */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
              <Shield className="w-3.5 h-3.5" />
              <span>Client-Side Privacy Guarantee</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              MetaboQuest Content Lab operates strictly on-device using your browser's LocalStorage. No tracking pixels, external servers, or personal health information are collected or transmitted.
            </p>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
            <div>
              <span className="font-bold text-white block">Reduced Motion Mode</span>
              <span className="text-[11px] text-slate-400">
                Disables floating particle animations and transitions for accessibility
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.reducedMotion || false}
                onChange={handleToggleReducedMotion}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Backup & Reset Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleExportBackup}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export Complete Project State (JSON Backup)</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset all project data, carousel edits, and pipeline state to defaults?')) {
                  onResetProject();
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-950/30 hover:bg-red-950/50 text-red-300 border border-red-500/30 font-semibold transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Reset Studio to Default Campaign Data</span>
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
