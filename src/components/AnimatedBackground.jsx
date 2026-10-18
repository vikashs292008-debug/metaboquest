import React, { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handler = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  if (prefersReducedMotion) {
    // Calm static background version for reduced-motion users
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-violet/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-brand-lime/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Drifting luminous gradient orbs */}
      <div 
        className="absolute top-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-brand-violet/12 blur-[150px] animate-float"
        style={{ animationDuration: '18s' }}
      />
      <div 
        className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-lime/10 blur-[140px] animate-float"
        style={{ animationDuration: '24s', animationDelay: '-6s' }}
      />
      <div 
        className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] rounded-full bg-teal-500/8 blur-[160px] animate-float"
        style={{ animationDuration: '22s', animationDelay: '-12s' }}
      />

      {/* Subtle Ambient Particle Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Micro star points */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15%" cy="25%" r="1" fill="#C6FF65" />
        <circle cx="35%" cy="65%" r="1" fill="#A78BFA" />
        <circle cx="75%" cy="15%" r="1.5" fill="#C6FF65" />
        <circle cx="85%" cy="75%" r="1" fill="#38BDF8" />
        <circle cx="50%" cy="45%" r="1" fill="#A78BFA" />
        <circle cx="65%" cy="85%" r="1.5" fill="#C6FF65" />
        <circle cx="25%" cy="90%" r="1" fill="#34D399" />
      </svg>
    </div>
  );
}
