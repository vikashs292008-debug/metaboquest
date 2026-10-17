import React, { useState } from 'react';
import { BookOpen, ExternalLink, Clock, Sparkles, Filter, ChevronRight, X, Check } from 'lucide-react';
import { LEARNING_TOPICS } from '../data/learningContent';

export function LearningLibrary({ onReadArticle }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = ['All', 'Fundamentals', 'Sleep & Rhythm', 'Movement', 'Nutrition', 'Biomarkers', 'Clinical Dialogue'];

  const filteredTopics = activeCategory === 'All' 
    ? LEARNING_TOPICS 
    : LEARNING_TOPICS.filter(item => item.category === activeCategory);

  const handleOpenArticle = (article) => {
    setSelectedArticle(article);
    if (onReadArticle) {
      onReadArticle(article.id);
    }
  };

  return (
    <section id="learning-library" className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-xs font-semibold text-brand-violet mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>METABOLIC SCIENCE LIBRARY</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text">
              The Science Behind Metabolism
            </h2>
            <p className="text-sm text-brand-muted mt-2 max-w-xl">
              Distilling complex endocrinology and clinical trials into clear, evidence-informed knowledge cards with verified medical citations.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-lime text-brand-bg shadow-sm'
                    : 'bg-brand-surface border border-white/10 text-brand-muted hover:text-brand-text hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((item) => (
            <article 
              key={item.id}
              className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-brand-muted mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-medium text-brand-lime">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{item.readTime}</span>
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-brand-text mb-2 group-hover:text-brand-lime transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-brand-muted leading-relaxed line-clamp-3 mb-4">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-brand-muted italic truncate max-w-[180px]">
                  {item.sources[0]?.name.split('—')[0] || 'Peer-Reviewed Source'}
                </span>
                
                <button
                  onClick={() => handleOpenArticle(item)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-lime hover:underline focus:outline-none"
                  aria-label={`Read ${item.title}`}
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-bg/85 backdrop-blur-md overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reader-title"
        >
          <div className="w-full max-w-2xl my-8 p-6 sm:p-8 rounded-3xl bg-brand-surface border border-white/15 shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-lime/10 border border-brand-lime/30 text-[11px] font-bold text-brand-lime uppercase">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-brand-muted font-mono">{selectedArticle.readTime}</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 rounded-lg text-brand-muted hover:text-brand-text hover:bg-white/5"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 id="reader-title" className="font-display font-bold text-2xl text-brand-text mb-4">
              {selectedArticle.title}
            </h2>

            {/* Practical Takeaway Highlight Callout */}
            <div className="p-4 rounded-xl bg-brand-lime/10 border border-brand-lime/30 mb-6 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-brand-lime flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-lime mb-0.5">
                  Core Practical Takeaway
                </p>
                <p className="text-xs sm:text-sm text-brand-text font-medium">
                  {selectedArticle.takeaway}
                </p>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-invert max-w-none text-sm text-brand-text/90 leading-relaxed space-y-4 whitespace-pre-line mb-6 font-normal">
              {selectedArticle.content}
            </div>

            {/* Credible Medical Sources */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                Credible Medical Sources & Clinical Evidence
              </p>
              <ul className="space-y-1.5">
                {selectedArticle.sources.map((src, i) => (
                  <li key={i} className="text-xs text-brand-muted flex items-center justify-between gap-2 p-2 rounded-lg bg-brand-card/60">
                    <span className="truncate">{src.name}</span>
                    <a 
                      href={src.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-violet hover:text-white flex items-center gap-1 flex-shrink-0"
                    >
                      <span className="text-[11px]">Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-brand-lime text-brand-bg font-display font-bold text-xs sm:text-sm hover:bg-[#d4ff80] transition-colors"
              >
                Done Reading
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
