import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Download, 
  X, 
  FileText,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Transaction } from '../../types';

interface TransactionsPageProps {
  transactions: Transaction[];
  onAskAIAboutTxn?: (query: string) => void;
}

export const TransactionsPage: React.FC<TransactionsPageProps> = ({
  transactions,
  onAskAIAboutTxn
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  // Natural language query filter & text filter
  const filtered = transactions.filter((t) => {
    // Type filter
    if (selectedType !== 'ALL') {
      if (selectedType === 'FAILED' && t.status !== 'FAILED') return false;
      if (selectedType !== 'FAILED' && t.type !== selectedType) return false;
    }

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();

    // Natural language filters: e.g. "above 1000", "today", "failed", "received"
    if (q.includes('above') || q.includes('greater than') || q.includes('>')) {
      const match = q.match(/(\d+)/);
      if (match) {
        const minVal = parseInt(match[0], 10);
        return t.amount >= minVal;
      }
    }

    if (q.includes('below') || q.includes('less than') || q.includes('<')) {
      const match = q.match(/(\d+)/);
      if (match) {
        const maxVal = parseInt(match[0], 10);
        return t.amount <= maxVal;
      }
    }

    if (q.includes('today') && t.date.toLowerCase() !== 'today') {
      return false;
    }

    if (q.includes('failed') && t.status !== 'FAILED') {
      return false;
    }

    return (
      t.counterparty.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.amount.toString().includes(q) ||
      (t.note && t.note.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#002970] tracking-tight">
            Transaction History
          </h1>
          <p className="text-xs text-slate-500">
            Real-time ledger with natural language search & simulated reversal tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
            Total {transactions.length} Records
          </span>
        </div>
      </div>

      {/* Natural Language Search Bar */}
      <div className="rounded-2xl bg-white border border-slate-200 p-3 sm:p-4 shadow-xs space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask about your transactions… (e.g. 'Show payments above ₹1,000' or 'Rahul')"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-[#00BAF2] focus:bg-white focus:outline-hidden"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">Filter:</span>
          {[
            { id: 'ALL', label: 'All' },
            { id: 'RECEIVED', label: 'Received (+)' },
            { id: 'PAYMENT', label: 'Payments (-)' },
            { id: 'RECHARGE', label: 'Recharge' },
            { id: 'BILL', label: 'Utility Bills' },
            { id: 'FAILED', label: 'Failed / Reversals' }
          ].map((flt) => (
            <button
              key={flt.id}
              onClick={() => setSelectedType(flt.id)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition shrink-0 ${
                selectedType === flt.id
                  ? 'bg-[#002970] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Sender / Receiver</th>
                <th className="py-3.5 px-4">Method</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">No matching transactions</p>
                    <p className="text-xs text-slate-400 mt-1">Try asking with an amount, name or date.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr 
                    key={t.id}
                    onClick={() => setSelectedTxn(t)}
                    className="hover:bg-slate-50/80 cursor-pointer transition"
                  >
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{t.date}</div>
                      <div className="text-[10px] text-slate-400">{t.time}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{t.counterparty}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{t.id}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700">
                        {t.method}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize text-slate-600 font-medium">
                        {t.type.toLowerCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap font-bold">
                      <span className={t.type === 'RECEIVED' ? 'text-emerald-600' : 'text-slate-900'}>
                        {t.type === 'RECEIVED' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        t.status === 'SUCCESS'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : t.status === 'FAILED'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {t.status === 'SUCCESS' && <CheckCircle2 className="h-3 w-3" />}
                        {t.status === 'FAILED' && <AlertCircle className="h-3 w-3" />}
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTxn(t);
                        }}
                        className="text-[#002970] hover:text-[#00BAF2] font-semibold text-xs"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 text-left">
            <button
              onClick={() => setSelectedTxn(null)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center text-white ${
                selectedTxn.status === 'FAILED' ? 'bg-rose-600' : 'bg-[#002970]'
              }`}>
                {selectedTxn.type === 'RECEIVED' ? (
                  <ArrowDownLeft className="h-6 w-6 text-emerald-300" />
                ) : (
                  <ArrowUpRight className="h-6 w-6 text-cyan-300" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{selectedTxn.counterparty}</h3>
                <span className="text-xs text-slate-500 font-mono">{selectedTxn.id}</span>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-2 text-xs mb-4">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Amount</span>
                <span className="text-base font-extrabold text-[#002970]">
                  ₹{selectedTxn.amount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Status</span>
                <span className={`font-bold ${selectedTxn.status === 'FAILED' ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {selectedTxn.status}
                </span>
              </div>
              {selectedTxn.failureReason && (
                <div className="rounded-lg bg-rose-50 p-2 text-rose-800 border border-rose-200 text-[11px]">
                  <strong>Failure Reason:</strong> {selectedTxn.failureReason}
                </div>
              )}
              {selectedTxn.refundStatus !== 'NONE' && (
                <div className="rounded-lg bg-teal-50 p-2 text-teal-900 border border-teal-200 text-[11px]">
                  <strong>Refund / Reversal:</strong> {selectedTxn.refundStatus} (Automatic turnaround active)
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time</span>
                <span className="text-slate-700">{selectedTxn.date} · {selectedTxn.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode</span>
                <span className="text-slate-700 font-semibold">{selectedTxn.method}</span>
              </div>
              {selectedTxn.bankRef && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Bank Reference (UTR)</span>
                  <span className="font-mono text-slate-700">{selectedTxn.bankRef}</span>
                </div>
              )}
              {selectedTxn.note && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Remarks</span>
                  <span className="text-slate-700">{selectedTxn.note}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert(`Demo receipt generated for ${selectedTxn.id}. Simulated download complete.`);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <Download className="h-4 w-4" />
                <span>Download Receipt (Demo)</span>
              </button>

              {onAskAIAboutTxn && (
                <button
                  onClick={() => {
                    setSelectedTxn(null);
                    onAskAIAboutTxn(`Check status of transaction ${selectedTxn.id} for ₹${selectedTxn.amount}`);
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-[#002970] text-white px-4 py-2.5 text-xs font-semibold hover:bg-[#001f56] transition"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#00BAF2]" />
                  <span>Ask AssistX</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
