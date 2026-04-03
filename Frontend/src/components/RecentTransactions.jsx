import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  ArrowUpDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const CATEGORIES = ['Income', 'Housing', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];
const PAGE_SIZE = 5;

const emptyForm = { date: '', desc: '', category: 'Food', type: 'Expense', amount: '' };

// ─── Add / Edit Modal ────────────────────────────────────────────────────────
const TransactionModal = ({ onClose, onSave, initial }) => {
  const [form, setForm] = useState(initial || emptyForm);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSave = () => {
    if (!form.date || !form.desc || !form.amount) return;
    onSave({
      ...form,
      amount: form.type === 'Expense' ? -Math.abs(Number(form.amount)) : Math.abs(Number(form.amount)),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md mx-4 p-6 border border-gray-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {initial ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Date */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description</label>
            <input
              type="text"
              value={form.desc}
              onChange={(e) => set('desc', e.target.value)}
              placeholder="e.g. Grocery Store"
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600"
            />
          </div>

          {/* Type + Category side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</label>
              <select
                value={form.type}
                onChange={(e) => set('type', e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</label>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount ($)</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => set('amount', e.target.value)}
              placeholder="0.00"
              min="0"
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white transition-colors"
          >
            {initial ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Category Filter Dropdown ────────────────────────────────────────────────
const CategoryDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const options = ['All', ...CATEGORIES];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
      >
        {value === 'All' ? 'Category' : value}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          {/* Transparent overlay to close dropdown when clicking outside */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)}></div>
          
          <div 
            className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden"
          >
            {/* Scrollable Container: 
               max-h-60 ensures it doesn't grow forever 
               overflow-y-auto enables the scrollbar 
            */}
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { 
                    onChange(opt); 
                    setOpen(false); 
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-slate-700/50 ${
                    value === opt 
                      ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20' 
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Type Filter Dropdown ────────────────────────────────────────────────────
const TypeDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const options = ['All', 'Income', 'Expense'];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
      >
        {/* Shows 'Type' if 'All' is selected, otherwise shows the value */}
        {value === 'All' ? 'Type' : value}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)}></div>
          
          <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
            {/* Scrollable area with max-height */}
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { 
                    onChange(opt); 
                    setOpen(false); 
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-slate-700/50 ${
                    value === opt 
                      ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20' 
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const RecentTransactions = () => {
  const { transactions, role, filters, setFilters, addTransaction, editTransaction, deleteTransaction } = useApp();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date-desc');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // null = adding new

  // ── Filter + Sort ──────────────────────────────────────────────────────────
  const processed = useMemo(() => {
    let result = [...transactions];

    if (filters.search)
      result = result.filter((t) =>
        t.desc.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.category.toLowerCase().includes(filters.search.toLowerCase())
      );

    if (filters.category !== 'All')
      result = result.filter((t) => t.category === filters.category);

    if (filters.type !== 'All')
      result = result.filter((t) => t.type === filters.type);

    result.sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc')  return new Date(a.date) - new Date(b.date);
      if (sortBy === 'amount-desc') return Math.abs(b.amount) - Math.abs(a.amount);
      if (sortBy === 'amount-asc')  return Math.abs(a.amount) - Math.abs(b.amount);
      return 0;
    });

    return result;
  }, [transactions, filters, sortBy]);

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(processed.length / PAGE_SIZE));
  const safePage   = Math.min(currentPage, totalPages);
  const paginated  = processed.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const goTo = (page) => setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  // Reset to page 1 when filters change
  const updateFilter = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setCurrentPage(1);
  };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSave = (formData) => {
    if (editTarget) {
      editTransaction(editTarget.id, formData);
    } else {
      addTransaction(formData);
    }
    setEditTarget(null);
  };

  const openEdit = (t) => {
    setEditTarget({
      ...t,
      amount: Math.abs(t.amount), // show positive in form
    });
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditTarget(null);
    setModalOpen(true);
  };

  // ── Helpers ────────────────────────────────────────────────────────────────
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const cycleSortBy = () => {
    const order = ['date-desc', 'date-asc', 'amount-desc', 'amount-asc'];
    setSortBy((s) => order[(order.indexOf(s) + 1) % order.length]);
  };

  const sortLabel = {
    'date-desc': 'Date ↓',
    'date-asc':  'Date ↑',
    'amount-desc': 'Amount ↓',
    'amount-asc':  'Amount ↑',
  }[sortBy];

  return (
    <>
      {/* ── Modal ─────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <TransactionModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initial={editTarget}
        />
      )}

      <div className="w-full bg-white dark:bg-slate-900 rounded-md border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">

        {/* ── Header Controls ──────────────────────────────────────────────── */}
        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h3>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-700 w-full md:w-64"
              />
            </div>

            {/* Category filter */}
            <CategoryDropdown
              value={filters.category}
              onChange={(v) => updateFilter('category', v)}
            />

            {/* Type filter */}
            <TypeDropdown
              value={filters.type}
              onChange={(v) => updateFilter('type', v)}
            />

            {/* Sort toggle */}
            <button
              onClick={cycleSortBy}
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowUpDown className="w-4 h-4" /> {sortLabel}
            </button>

            {/* Add — Admin only */}
            {role === 'Admin' && (
              <button
                onClick={openAdd}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-white transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Transaction
              </button>
            )}
          </div>
        </div>

        {/* ── Table ────────────────────────────────────────────────────────── */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-y border-gray-100 dark:border-slate-800">
                <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th>
                {role === 'Admin' && (
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={role === 'Admin' ? 6 : 5} className="px-6 py-16 text-center text-slate-400 dark:text-slate-500 text-sm">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                paginated.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{formatDate(t.date)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{t.desc}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{t.category}</td>

                    {/* Type badge — green for Income, red for Expense */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        t.type === 'Income'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
                      }`}>
                        {t.type}
                      </span>
                    </td>

                    {/* Amount — green for positive, red for negative */}
                    <td className={`px-6 py-4 text-sm font-bold ${
                      t.amount >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'
                    }`}>
                      {t.amount >= 0 ? `+$${t.amount.toLocaleString()}` : `-$${Math.abs(t.amount).toLocaleString()}`}
                    </td>

                    {/* Actions — Admin only */}
                    {role === 'Admin' && (
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openEdit(t)}
                            className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTransaction(t.id)}
                            className="p-1 text-slate-400 dark:text-slate-500 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ───────────────────────────────────────────────────── */}
        <div className="p-4 flex justify-center items-center gap-2 bg-white dark:bg-slate-900">
          <button onClick={() => goTo(1)} disabled={safePage === 1} className="p-2 border border-gray-200 dark:border-slate-700 rounded-md text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button onClick={() => goTo(safePage - 1)} disabled={safePage === 1} className="p-2 border border-gray-200 dark:border-slate-700 rounded-md text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page number pills */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goTo(page)}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                page === safePage
                  ? 'bg-slate-100 dark:bg-slate-800 border border-slate-900 dark:border-slate-200 text-slate-900 dark:text-slate-100'
                  : 'border border-gray-200 dark:border-slate-700 text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              {page}
            </button>
          ))}

          <button onClick={() => goTo(safePage + 1)} disabled={safePage === totalPages} className="p-2 border border-gray-200 dark:border-slate-700 rounded-md text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={() => goTo(totalPages)} disabled={safePage === totalPages} className="p-2 border border-gray-200 dark:border-slate-700 rounded-md text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </>
  );
};

export default RecentTransactions;