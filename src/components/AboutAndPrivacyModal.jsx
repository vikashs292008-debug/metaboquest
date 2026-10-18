import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, RotateCcw, X, CheckCircle2, AlertTriangle, Info, BookOpen } from 'lucide-react';
import { resetAllLocalData } from '../utils/persistence';

export function AboutAndPrivacyModal({ isOpen, onClose, onResetComplete, showToast }) {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleConfirmReset = () => {
    const success = resetAllLocalData();
    setShowConfirmReset(false);
    if (success) {
      if (showToast) {
        showToast({
          type: 'success',
          title: 'Local Progress Reset',
          message: 'All local badges, quiz history, and preferences have been cleared.'
        });
      }
      if (onResetComplete) {
        onResetComplete();
      }
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-bg/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-privacy-title"
    >
      <div className="w-full max-w-2xl my-8 p-6 sm:p-8 rounded-3xl bg-brand-surface border border-white/15 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center">
              <Shield className="w-4 h-4 text-brand-violet" />
            </div>
            <div>
              <h2 id="about-privacy-title" className="font-display font-bold text-lg text-brand-text">
                About MetaboQuest & Privacy
              </h2>
              <p className="text-[11px] text-brand-muted">
                Transparent data practices and educational mission
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-white/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-brand-text/90 leading-relaxed max-h-[65vh] overflow-y-auto pr-1">
          
          {/* Mission & Product Vision */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-sm text-brand-lime uppercase tracking-wider">
              Product Vision & Mission
            </h3>
            <p>
              <strong>MetaboQuest</strong> was created with a simple purpose: <span className="text-white italic">“Understand your body. One small discovery at a time.”</span>
            </p>
            <p className="text-brand-muted">
              We turn metabolic endocrinology and cardiovascular science into a short, playful, and interactive 90-second journey that anyone can start without registration or logins.
            </p>
          </div>

          {/* Positioning & Clinical Boundaries */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-brand-violet font-bold text-xs uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>Educational Content, Not Medical Advice</span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              MetaboQuest is purely an educational literacy tool. It is not a diagnostic tool, clinical risk assessment, treatment recommendation, or weight-loss program. Quiz scores evaluate knowledge of general scientific principles only and never diagnose disease or substitute for an individualized clinical consultation with a licensed healthcare provider.
            </p>
          </div>

          {/* LocalStorage Data Practices */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-lime" />
              <span>What Is Stored on This Device</span>
            </h3>
            <p className="text-brand-muted">
              MetaboQuest does not require accounts, logins, or remote database tracking. Your experience is completely client-side. The following non-sensitive preferences are saved in your browser’s <code className="text-brand-lime">LocalStorage</code>:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <li className="p-2.5 rounded-xl bg-brand-card border border-white/5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Unlocked learning badges</span>
              </li>
              <li className="p-2.5 rounded-xl bg-brand-card border border-white/5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Completed quiz scores & history</span>
              </li>
              <li className="p-2.5 rounded-xl bg-brand-card border border-white/5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Daily quest completion date</span>
              </li>
              <li className="p-2.5 rounded-xl bg-brand-card border border-white/5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Sound & timer preferences</span>
              </li>
              <li className="p-2.5 rounded-xl bg-brand-card border border-white/5 flex items-center gap-2 sm:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Optional display nickname (if entered for share card)</span>
              </li>
            </ul>
          </div>

          {/* What We NEVER Store */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400">
              Zero Sensitive Health Data Tracked
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              We never collect, transmit, or store personal health histories, laboratory values, biometric parameters, prescriptions, or contact lists. We do not use third-party analytics trackers, behavioral profiling pixels, or advertising beacons.
            </p>
          </div>

          {/* Reset Progress Section */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">
                Reset Device Storage
              </h4>
              <p className="text-xs text-brand-muted">
                Clear all saved badges, quest history, and local settings from this browser.
              </p>
            </div>

            <button
              onClick={() => setShowConfirmReset(true)}
              className="px-4 py-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold hover:bg-rose-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset My Progress</span>
            </button>
          </div>

        </div>

        {/* Confirmation Modal Overlay */}
        <AnimatePresence>
          {showConfirmReset && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-bg/95 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4 z-20"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="font-display font-bold text-lg text-white">
                Reset All Local Progress?
              </h3>

              <p className="text-xs text-brand-muted max-w-sm leading-relaxed">
                This will delete your unlocked badges, quest history records, and streak on this device. This action cannot be undone.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-brand-text transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReset}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-colors"
                >
                  Yes, Reset Everything
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
