import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Download, 
  FileText, 
  ExternalLink,
  Edit3,
  Trash2,
  X,
  AlertCircle
} from 'lucide-react';
import { exportClaimLedgerCSV, exportClaimLedgerJSON } from '../../utils/manifestGenerator';

export function ClaimLedger({
  claimLedger = [],
  researchSources = [],
  onAddClaim,
  onUpdateClaim,
  onDeleteClaim,
  onApproveClaim,
  onRejectClaim
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClaim, setEditingClaim] = useState(null);

  // Modal Form State
  const [formState, setFormState] = useState({
    id: '',
    claimText: '',
    appearsIn: [{ asset: 'carousel', location: 'Slide 1' }],
    supportingSourceIds: ['SRC-001'],
    supportingPassage: '',
    reviewStatus: 'ready_for_review',
    reviewerNotes: '',
    prohibitedLanguageScore: 0
  });

  const handleOpenAdd = () => {
    setEditingClaim(null);
    setFormState({
      id: `CLM-${String(claimLedger.length + 1).padStart(3, '0')}`,
      claimText: '',
      appearsIn: [{ asset: 'carousel', location: 'Slide 1' }],
      supportingSourceIds: [researchSources[0]?.id || 'SRC-001'],
      supportingPassage: '',
      reviewStatus: 'ready_for_review',
      reviewerNotes: '',
      prohibitedLanguageScore: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (claim) => {
    setEditingClaim(claim);
    setFormState({ ...claim });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formState.claimText.trim()) {
      alert('Please enter the exact claim statement.');
      return;
    }

    if (editingClaim) {
      onUpdateClaim(formState);
    } else {
      onAddClaim(formState);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, text) => {
    if (window.confirm(`Delete claim "${id}"?`)) {
      onDeleteClaim(id);
    }
  };

  const filteredClaims = claimLedger.filter(c => {
    const matchesSearch = 
      c.claimText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.reviewerNotes?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || c.reviewStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const verifiedCount = claimLedger.filter(c => c.reviewStatus === 'human_verified').length;
  const inReviewCount = claimLedger.filter(c => c.reviewStatus === 'ready_for_review' || c.reviewStatus === 'draft').length;
  const rejectedCount = claimLedger.filter(c => c.reviewStatus === 'rejected').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Core Differentiator
            </span>
            <span className="text-xs text-slate-400">
              Evidence-Backed Factual Assertion Ledger
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-1">
            Claim Ledger & Verification System
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Every health assertion in the carousel, static post, and reel is recorded here. A source URL alone is never proof that a statement is supported. Human medical verification is mandatory.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => exportClaimLedgerCSV(claimLedger)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>CSV</span>
          </button>

          <button
            onClick={() => exportClaimLedgerJSON(claimLedger)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            title="Download JSON"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>JSON</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-glow-lime"
          >
            <Plus className="w-4 h-4" />
            <span>Record New Claim</span>
          </button>
        </div>
      </div>

      {/* Status Counters Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0E1526] border border-white/10">
          <span className="text-xs text-slate-400 block">Total Ledger Entries</span>
          <span className="text-2xl font-display font-extrabold text-white mt-1 block">
            {claimLedger.length}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1526] border border-emerald-500/30">
          <span className="text-xs text-emerald-400 block font-medium">Human Verified</span>
          <span className="text-2xl font-display font-extrabold text-emerald-400 mt-1 block">
            {verifiedCount}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1526] border border-amber-500/30">
          <span className="text-xs text-amber-400 block font-medium">In Review / Needs Source</span>
          <span className="text-2xl font-display font-extrabold text-amber-400 mt-1 block">
            {inReviewCount}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0E1526] border border-red-500/30">
          <span className="text-xs text-red-400 block font-medium">Blocked / Rejected</span>
          <span className="text-2xl font-display font-extrabold text-red-400 mt-1 block">
            {rejectedCount}
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0E1526] border border-white/10">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search claim statements or reviewer notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Claims' },
            { id: 'human_verified', label: 'Verified' },
            { id: 'ready_for_review', label: 'Ready for Review' },
            { id: 'rejected', label: 'Rejected (Blocked)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Claims List Table/Cards */}
      <div className="space-y-4">
        {filteredClaims.map((claim) => {
          const isVerified = claim.reviewStatus === 'human_verified';
          const isRejected = claim.reviewStatus === 'rejected';
          const isReview = claim.reviewStatus === 'ready_for_review' || claim.reviewStatus === 'draft';

          return (
            <div
              key={claim.id}
              className={`rounded-2xl border p-5 transition-all space-y-3.5 ${
                isRejected
                  ? 'bg-red-950/20 border-red-500/30'
                  : isVerified
                  ? 'bg-[#0E1526] border-white/10 hover:border-emerald-500/40'
                  : 'bg-[#141A28] border-amber-500/30'
              }`}
            >
              {/* Top Row: Claim ID, Status Badge, and Placements */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                    {claim.id}
                  </span>

                  {/* Verification Status Pill */}
                  <span className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    isVerified
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : isRejected
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {isVerified ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Human Verified</span>
                      </>
                    ) : isRejected ? (
                      <>
                        <XCircle className="w-3 h-3" />
                        <span>Rejected (Quality Gate Block)</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" />
                        <span>Human Review Required</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Edit & Delete Actions */}
                <div className="flex items-center gap-2">
                  {!isVerified && !isRejected && (
                    <button
                      onClick={() => onApproveClaim(claim.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[11px] font-semibold border border-emerald-500/30"
                    >
                      Sign Off (Verify)
                    </button>
                  )}
                  {!isRejected && (
                    <button
                      onClick={() => onRejectClaim(claim.id)}
                      className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 text-[11px] font-semibold border border-red-500/30"
                    >
                      Flag & Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleOpenEdit(claim)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(claim.id, claim.claimText)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Exact Claim Text */}
              <div>
                <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                  "{claim.claimText}"
                </p>
              </div>

              {/* Supporting Evidence Passage */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Authoritative Clinical Evidence Basis
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {claim.supportingPassage || 'No clinical excerpt attached.'}
                </p>
              </div>

              {/* Placements & Mapped Sources */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 text-xs">
                
                {/* Placements */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[11px]">Placements:</span>
                  <div className="flex flex-wrap gap-1">
                    {claim.appearsIn?.map((loc, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10">
                        {loc.asset}: {loc.location}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Supporting Sources */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">Sources:</span>
                  {claim.supportingSourceIds && claim.supportingSourceIds.length > 0 ? (
                    claim.supportingSourceIds.map(sid => (
                      <span key={sid} className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/30">
                        {sid}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-red-400 font-bold">
                      ⚠ No supporting source!
                    </span>
                  )}
                </div>

              </div>

              {/* Reviewer Note */}
              {claim.reviewerNotes && (
                <div className="text-[11px] text-slate-400 italic">
                  Note: {claim.reviewerNotes}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Add / Edit Claim Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#0D1526] border border-white/15 p-6 shadow-2xl z-10 space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-display font-bold text-white text-lg">
                {editingClaim ? `Edit Claim ${editingClaim.id}` : 'Record Factual Health Claim'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Exact Factual Claim Statement *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formState.claimText}
                  onChange={(e) => setFormState({ ...formState, claimText: e.target.value })}
                  placeholder="e.g. Metabolic health involves multiple interconnected systems rather than a single number."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Supporting Evidence Passage or Research Note *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formState.supportingPassage}
                  onChange={(e) => setFormState({ ...formState, supportingPassage: e.target.value })}
                  placeholder="Paste exact clinical reasoning or published quote from the primary source..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Supporting Source ID(s)
                  </label>
                  <select
                    multiple
                    value={formState.supportingSourceIds}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setFormState({ ...formState, supportingSourceIds: selected });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500 h-24"
                  >
                    {researchSources.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.id}: {s.title.slice(0, 35)}...
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-slate-400 mt-1 block">Hold Ctrl/Cmd to select multiple sources</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Review Status
                  </label>
                  <select
                    value={formState.reviewStatus}
                    onChange={(e) => setFormState({ ...formState, reviewStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="human_verified">Human Verified</option>
                    <option value="ready_for_review">Ready for Human Review</option>
                    <option value="draft">Draft</option>
                    <option value="needs_source">Needs Source</option>
                    <option value="rejected">Rejected (Blocked from assets)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Medical Reviewer Notes & Audit Trail
                </label>
                <input
                  type="text"
                  value={formState.reviewerNotes}
                  onChange={(e) => setFormState({ ...formState, reviewerNotes: e.target.value })}
                  placeholder="e.g. Verified by Medical Reviewer against MedlinePlus clinical consensus."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
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
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
                >
                  Save Claim Record
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
