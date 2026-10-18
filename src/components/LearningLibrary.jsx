import React, { useState } from 'react';
import { BookOpen, ExternalLink, Clock, Sparkles, Filter, ChevronRight, X, Search, HelpCircle, CheckCircle2 } from 'lucide-react';
import { LEARNING_CATEGORIES, LEARNING_TOPICS } from '../data/learningContent';

export function LearningLibrary({ onReadArticle }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Filter topics based on active category and search text
  const filteredTopics = LEARNING_TOPICS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.plainLanguageExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whyItMatters.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenArticle = (article) => {
    setSelectedArticle(article);
    if (onReadArticle) {
      onReadArticle(article.id);
    }
  };

  return (
    <section id="learning-library" className="py-20 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-xs font-semibold text-brand-violet mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>EXPLORE THE SCIENCE · LEARNING HUB</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-text">
              The Science Behind Metabolism
            </h2>
            <p className="text-sm text-brand-muted mt-2 max-w-xl leading-relaxed">
              Clear, plain-language explanations of metabolic endocrinology with verified citations from NIDDK, CDC, WHO, and MedlinePlus.
            </p>
          </div>

          {/* Interactive Search Bar */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts, fiber, glucose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-surface border border-white/10 text-xs text-brand-text placeholder-brand-muted/60 focus:outline-none focus:border-brand-lime transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {LEARNING_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-brand-lime text-brand-bg shadow-sm font-bold'
                  : 'bg-brand-surface border border-white/10 text-brand-muted hover:text-brand-text hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Learning Cards Grid */}
        {filteredTopics.length === 0 ? (
          <div className="p-12 text-center rounded-2xl glass-panel border border-white/10 text-brand-muted text-sm space-y-3">
            <p>No educational cards match "{searchQuery}" in category "{activeCategory}".</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-white/10 text-brand-text text-xs font-semibold hover:bg-white/15"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((item) => (
              <article 
                key={item.id}
                className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all hover:-translate-y-1 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-brand-muted">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-medium text-brand-lime">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{item.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-brand-text group-hover:text-brand-lime transition-colors">
                    {item.title}
                  </h3>

                  {/* Short plain-language explanation */}
                  <p className="text-xs sm:text-sm text-brand-text/90 leading-relaxed font-normal">
                    {item.plainLanguageExplanation}
                  </p>

                  {/* Why the topic matters */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-brand-muted space-y-1">
                    <span className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">
                      Why it matters:
                    </span>
                    <p className="leading-relaxed">
                      {item.whyItMatters}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
                  {/* Source attribution and Direct Authoritative Link */}
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-brand-muted italic truncate max-w-[180px]">
                      {item.sourceAttribution.split(':')[0]}
                    </span>
                    <a
                      href={item.learnMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-lime hover:underline inline-flex items-center gap-1 font-medium flex-shrink-0"
                    >
                      <span>Learn more</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <button
                    onClick={() => handleOpenArticle(item)}
                    className="w-full py-2 px-3 rounded-xl bg-brand-surface border border-white/10 hover:border-brand-lime/40 text-brand-text text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    aria-label={`Read full breakdown of ${item.title}`}
                  >
                    <span>Read Full Breakdown</span>
                    <ChevronRight className="w-3.5 h-3.5 text-brand-lime" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

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
                className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-white/5"
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

            {/* Credible Medical Source */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                Authoritative Public Health Sourcing
              </p>
              <div className="text-xs text-brand-muted flex items-center justify-between gap-2 p-3 rounded-xl bg-brand-card/60 border border-white/5">
                <span>{selectedArticle.sourceAttribution}</span>
                <a 
                  href={selectedArticle.learnMoreUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-lime hover:underline flex items-center gap-1 font-semibold flex-shrink-0"
                >
                  <span className="text-[11px]">Direct Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
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
