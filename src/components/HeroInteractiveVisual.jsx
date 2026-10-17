import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Moon, Activity, Flame, ShieldCheck, HeartPulse } from 'lucide-react';

const NODES = [
  {
    id: 'muscle',
    name: 'Skeletal Muscle',
    role: 'Primary Glucose Sink (70-80%)',
    icon: Activity,
    color: '#C6FF65',
    x: '20%',
    y: '22%'
  },
  {
    id: 'circadian',
    name: 'Circadian Clock',
    role: 'Diurnal Insulin Sensitivity',
    icon: Moon,
    color: '#A78BFA',
    x: '80%',
    y: '20%'
  },
  {
    id: 'mitochondria',
    name: 'Mitochondria',
    role: 'Cellular Fuel Flexibility',
    icon: Flame,
    color: '#F59E0B',
    x: '85%',
    y: '75%'
  },
  {
    id: 'gut',
    name: 'Gut Microbiome',
    role: 'Short-Chain Fatty Acids & GLP-1',
    icon: ShieldCheck,
    color: '#34D399',
    x: '15%',
    y: '78%'
  },
  {
    id: 'vascular',
    name: 'Vascular System',
    role: 'Nitric Oxide Vasodilation',
    icon: HeartPulse,
    color: '#EC4899',
    x: '50%',
    y: '92%'
  }
];

export function HeroInteractiveVisual({ onStartQuest }) {
  const [activeNode, setActiveNode] = useState(NODES[0]);

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center p-4 select-none">
      
      {/* Ambient background glow layers */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/15 via-brand-violet/15 to-transparent rounded-full filter blur-3xl opacity-70 animate-pulse-slow pointer-events-none" />
      <div className="absolute w-72 h-72 rounded-full border border-white/5 animate-spin" style={{ animationDuration: '60s' }} />
      <div className="absolute w-96 h-96 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: '90s', animationDirection: 'reverse' }} />

      {/* SVG Connecting constellation lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current text-white/15" viewBox="0 0 400 400">
        <line x1="80" y1="88" x2="200" y2="200" strokeWidth="1.5" strokeDasharray="4 4" className="text-brand-lime/40" />
        <line x1="320" y1="80" x2="200" y2="200" strokeWidth="1.5" strokeDasharray="4 4" className="text-brand-violet/40" />
        <line x1="340" y1="300" x2="200" y2="200" strokeWidth="1.5" strokeDasharray="4 4" className="text-amber-400/40" />
        <line x1="60" y1="312" x2="200" y2="200" strokeWidth="1.5" strokeDasharray="4 4" className="text-emerald-400/40" />
        <line x1="200" y1="368" x2="200" y2="200" strokeWidth="1.5" strokeDasharray="4 4" className="text-pink-400/40" />
        {/* Outer orbital connector */}
        <polygon points="80,88 320,80 340,300 200,368 60,312" fill="none" strokeWidth="1" stroke="rgba(255,255,255,0.06)" />
      </svg>

      {/* Interactive Orbital Factor Nodes */}
      {NODES.map((node) => {
        const IconComponent = node.icon;
        const isSelected = activeNode.id === node.id;
        return (
          <motion.button
            key={node.id}
            onClick={() => setActiveNode(node)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 group flex items-center justify-center p-3 rounded-2xl transition-all duration-300 z-20 ${
              isSelected 
                ? 'bg-brand-surface shadow-lg border-2' 
                : 'bg-brand-surface/80 border border-white/15 hover:border-white/30'
            }`}
            style={{
              left: node.x,
              top: node.y,
              borderColor: isSelected ? node.color : 'rgba(255, 255, 255, 0.15)',
              boxShadow: isSelected ? `0 0 20px ${node.color}40` : 'none'
            }}
            aria-label={`Inspect ${node.name}`}
          >
            <IconComponent 
              className="w-5 h-5 transition-colors" 
              style={{ color: node.color }} 
            />
            {/* Tooltip on hover */}
            <span className="absolute bottom-full mb-2 hidden group-hover:block whitespace-nowrap px-2.5 py-1 rounded-md bg-brand-surface border border-white/15 text-[11px] font-semibold text-brand-text shadow-xl z-30">
              {node.name}
            </span>
          </motion.button>
        );
      })}

      {/* Central Pulsing Metabolic Core Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-64 p-5 rounded-3xl glass-panel-elevated border border-brand-lime/30 shadow-2xl flex flex-col items-center text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-lime/20 to-brand-violet/20 border border-brand-lime/50 flex items-center justify-center mb-3 shadow-glow-lime">
          <Zap className="w-7 h-7 text-brand-lime animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-[11px] font-bold text-brand-lime uppercase tracking-wider mb-1">
          <span>Active Focus</span>
        </div>

        <h3 className="font-display font-bold text-base text-brand-text">
          {activeNode.name}
        </h3>
        
        <p className="text-xs text-brand-muted mt-1 leading-relaxed min-h-[36px]">
          {activeNode.role}
        </p>

        <div className="w-full mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-brand-muted">Target Time</span>
          <span className="font-semibold text-brand-lime font-mono">~90 Seconds</span>
        </div>

        <button
          onClick={onStartQuest}
          className="w-full mt-3 py-2 px-3 rounded-xl bg-gradient-to-r from-brand-lime to-[#a3e635] text-brand-bg font-display font-bold text-xs uppercase tracking-wide hover:opacity-95 active:scale-95 transition-all shadow-md"
        >
          Test your knowledge
        </button>
      </motion.div>
    </div>
  );
}
