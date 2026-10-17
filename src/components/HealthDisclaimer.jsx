import React from 'react';
import { AlertCircle, FileText } from 'lucide-react';

export function HealthDisclaimer() {
  return (
    <section className="py-10 border-t border-white/5 bg-brand-surface/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-brand-surface/60 flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-brand-lime flex-shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs text-brand-muted leading-relaxed">
            <h4 className="font-bold uppercase tracking-wider text-brand-text">
              Educational Health Disclaimer
            </h4>
            <p>
              MetaboQuest is an interactive educational experience designed to foster scientific curiosity about human metabolism, circadian rhythms, dietary fiber, and exercise physiology. It does not provide medical advice, diagnosis, treatment plans, or clinical risk assessments.
            </p>
            <p>
              Quiz scores evaluate general biological concept familiarity, not your individual health status. Always consult a qualified, licensed physician or registered dietitian regarding specific medical questions, laboratory evaluations, or changes to medication regimens.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
