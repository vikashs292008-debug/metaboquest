import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  X, 
  FileText,
  Building,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { exportResearchRegisterCSV, exportResearchRegisterJSON } from '../../utils/manifestGenerator';

export function ResearchLibrary({
  researchSources = [],
  claimLedger = [],
  onAddSource,
  onUpdateSource,
  onDeleteSource
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'verified' | 'needs_verification'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSource, setEditingSource] = useState(null);

  // Form State for Add / Edit
  const [formState, setFormState] = useState({
    id: '',
    title: '',
    organization: '',
    exactUrl: '',
    publicationDate: '',
    dateAccessed: new Date().toISOString().split('T')[0],
    relevantFinding: '',
    supportedClaimIds: ['CLM-001'],
    verificationStatus: 'verified',
    verificationNotes: '',
    verifiedBy: 'Medical Content Reviewer'
  });

  const handleOpenAdd = () => {
    setEditingSource(null);
    setFormState({
      id: `SRC-${String(researchSources.length + 1).padStart(3, '0')}`,
      title: '',
      organization: '',
      exactUrl: 'https://',
      publicationDate: '',
      dateAccessed: new Date().toISOString().split('T')[0],
      relevantFinding: '',
      supportedClaimIds: ['CLM-001'],
      verificationStatus: 'needs_verification',
      verificationNotes: '',
      verifiedBy: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (source) => {
    setEditingSource(source);
    setFormState({ ...source });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.exactUrl.trim()) {
      alert('Please fill out the Source Title and Exact URL.');
      return;
    }

    if (editingSource) {
      onUpdateSource(formState);
    } else {
      onAddSource(formState);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete source "${title}"? This cannot be undone.`)) {
      onDeleteSource(id);
    }
  };

  // Filter sources
  const filteredSources = researchSources.filter(s => {
    const matchesSearch = 
      s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.relevantFinding?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' || 
      (filterStatus === 'verified' && s.verificationStatus === 'verified') ||
      (filterStatus === 'needs_verification' && s.verificationStatus !== 'verified');

    return matchesSearch && matchesStatus;
  });

  const verifiedCount = researchSources.filter(s => s.verificationStatus === 'verified').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              Evidence Documentation
            </span>
            <span className="text-xs text-slate-400">
              {verifiedCount} of {researchSources.length} Verified Against Primary Sources
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-1">
            Research Library & Source Register
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Document primary public health and clinical agency evidence. Never invent studies or author names. Every factual claim in this studio links to an exact source record below.
          </p>
        </div>

        {/* Action Buttons: Add Source & Export CSV/JSON */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => exportResearchRegisterCSV(researchSources)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>CSV</span>
          </button>

          <button
            onClick={() => exportResearchRegisterJSON(researchSources)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            title="Download JSON"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>JSON</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Source Record</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0E1526] border border-white/10">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, organization, or finding..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: `All (${researchSources.length})` },
            { id: 'verified', label: `Verified (${verifiedCount})` },
            { id: 'needs_verification', label: `Needs Review (${researchSources.length - verifiedCount})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSources.map((source) => {
          const isVerified = source.verificationStatus === 'verified';

          return (
            <div 
              key={source.id}
              className="rounded-2xl border border-white/10 bg-[#0E1526] p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all space-y-4"
            >
              <div className="space-y-3">
                
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                      {source.id}
                    </span>
                    <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isVerified
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    }`}>
                      {isVerified ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Human Verified</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3" />
                          <span>Needs Verification</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(source)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                      title="Edit Source"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(source.id, source.title)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/20"
                      title="Delete Source"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title & Organization */}
                <div>
                  <h3 className="font-display font-bold text-white text-base leading-snug">
                    {source.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-medium mt-1">
                    <Building className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{source.organization}</span>
                  </div>
                </div>

                {/* Exact URL */}
                <div className="flex items-center gap-1.5 text-xs">
                  <a
                    href={source.exactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-cyan-300 truncate max-w-[340px] flex items-center gap-1 font-mono text-[11px] hover:underline"
                  >
                    <span>{source.exactUrl}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>

                {/* Dates & Supported Claims */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>Published: {source.publicationDate || 'N/A'}</span>
                  </span>
                  <span>•</span>
                  <span>Accessed: {source.dateAccessed}</span>
                </div>

                {/* Relevant Finding Box */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Verified Key Finding
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {source.relevantFinding}
                  </p>
                </div>

                {/* Linked Claim IDs */}
                {source.supportedClaimIds && source.supportedClaimIds.length > 0 && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-slate-400 text-[11px]">Supports:</span>
                    <div className="flex flex-wrap gap-1">
                      {source.supportedClaimIds.map(cid => (
                        <span key={cid} className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 border border-emerald-500/20">
                          {cid}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Verification Notes Footer */}
              {source.verificationNotes && (
                <div className="pt-3 border-t border-white/5 text-[11px] text-slate-400 italic">
                  "{source.verificationNotes}"
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add / Edit Source Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#0D1526] border border-white/15 p-6 shadow-2xl z-10 space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-display font-bold text-white text-lg">
                {editingSource ? `Edit Source ${editingSource.id}` : 'Add Authoritative Source Record'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Source Title *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Prediabetes – Your Chance to Prevent Type 2 Diabetes"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Organization / Publisher *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.organization}
                    onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                    placeholder="e.g. Centers for Disease Control and Prevention (CDC)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Exact URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formState.exactUrl}
                    onChange={(e) => setFormState({ ...formState, exactUrl: e.target.value })}
                    placeholder="https://www.cdc.gov/diabetes/basics/prediabetes.html"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Publication / Review Date
                  </label>
                  <input
                    type="text"
                    value={formState.publicationDate}
                    onChange={(e) => setFormState({ ...formState, publicationDate: e.target.value })}
                    placeholder="e.g. May 2024"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date Accessed
                  </label>
                  <input
                    type="date"
                    value={formState.dateAccessed}
                    onChange={(e) => setFormState({ ...formState, dateAccessed: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Verification Status
                  </label>
                  <select
                    value={formState.verificationStatus}
                    onChange={(e) => setFormState({ ...formState, verificationStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="verified">Human Verified</option>
                    <option value="needs_verification">Needs Verification</option>
                    <option value="suggested">Suggested Source</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Relevant Finding or Summary *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formState.relevantFinding}
                  onChange={(e) => setFormState({ ...formState, relevantFinding: e.target.value })}
                  placeholder="Detail the specific findings, facts, and conclusions supported by this page..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Verification Notes & Human Sign-Off
                </label>
                <input
                  type="text"
                  value={formState.verificationNotes}
                  onChange={(e) => setFormState({ ...formState, verificationNotes: e.target.value })}
                  placeholder="e.g. Human verified against published NIH overview. Confirms glucose regulation."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
                >
                  Save Source Record
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
