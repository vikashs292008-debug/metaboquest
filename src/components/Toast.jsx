import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';

export function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-brand-lime flex-shrink-0" />,
    achievement: <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 animate-bounce" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-brand-violet flex-shrink-0" />
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed bottom-6 right-6 z-50 max-w-sm w-full pointer-events-none px-4"
        role="status"
        aria-live="polite"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl bg-brand-surface/95 border border-white/10 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            {icons[toast.type] || icons.info}
            <div className="text-sm">
              {toast.title && <p className="font-semibold text-brand-text">{toast.title}</p>}
              <p className="text-brand-muted">{toast.message}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close notification"
            className="p-1 rounded-lg text-brand-muted hover:text-brand-text hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
