import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownLeft,
  Calendar,
  Layers
} from 'lucide-react';
import { Transaction, UserAccount } from '../../types';

interface InsightsPageProps {
  user: UserAccount;
  transactions: Transaction[];
  onAskAIAboutSpending?: (query: string) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({
  user,
  transactions,
  onAskAIAboutSpending
}) => {
  // Category calculations
  const categories: Record<string, number> = {
    'Bills': 0,
    'Transfers': 0,
    'Shopping': 0,
    'Food': 0,
    'Recharge': 0,
    'Travel': 0
  };

  transactions.forEach((t) => {
    if (t.type !== 'RECEIVED' && t.status === 'SUCCESS') {
      if (categories[t.category] !== undefined) {
        categories[t.category] += t.amount;
      } else {
        categories[t.category] = t.amount;
      }
    }
  });

  const totalSpent = Object.values(categories).reduce((a, b) => a + b, 0);

  // Sorted categories
  const sortedCategories = Object.entries(categories)
    .sort(([, a], [, b]) => b - a);

  const highestCategory = sortedCategories[0]?.[0] || 'Bills';

  const weeklyBreakdown = [
    { week: 'Week 1 (1-7 Sep)', amount: 2450 },
    { week: 'Week 2 (8-14 Sep)', amount: 1649 },
    { week: 'Week 3 (15-21 Sep)', amount: 6880 },
    { week: 'Week 4 (Current)', amount: 2000 }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#002970] tracking-tight">
            Financial Insights & Analytics
          </h1>
          <p className="text-xs text-slate-500">
            Automated spending classification derived from synthetic transaction logs
          </p>
        </div>
      </div>

      {/* AI Smart Insight Banner */}
      <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50/50 p-4 sm:p-5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#002970] text-white">
            <Sparkles className="h-5 w-5 text-[#00BAF2]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#002970] block">
              AI Financial Insight
            </span>
            <p className="text-sm font-bold text-slate-800">
              “Your highest spending category this month is {highestCategory}.”
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Bills account for ₹{categories['Bills']?.toLocaleString('en-IN') || '1,899'} this billing cycle.
            </p>
          </div>
        </div>

        {onAskAIAboutSpending && (
          <button
            onClick={() => onAskAIAboutSpending('How much did I spend this month and what is my biggest category?')}
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-white border border-blue-200 hover:border-blue-400 px-3.5 py-2 text-xs font-semibold text-[#002970] transition shadow-2xs"
          >
            <span>Ask AI Analysis</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500">Current Balance</span>
          <div className="text-xl sm:text-2xl font-black text-[#002970] mt-1">
            ₹{user.balance.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
            Active Bank Reserve
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500">Spent This Month</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            ₹{user.totalSpentMonth.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-500 font-semibold block mt-1">
            11 Outgoing debits
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500">Received This Month</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
            +₹{user.totalReceivedMonth.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
            From Rahul, Priya & Amit
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500">Total Transactions</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {transactions.length}
          </div>
          <span className="text-[10px] text-slate-500 font-semibold block mt-1">
            1 Failed / Reversal Active
          </span>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Category Breakdown Progress Bars */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <PieChart className="h-4 w-4 text-[#002970]" />
              Spending by Category
            </h3>
            <span className="text-xs font-mono font-bold text-slate-500">
              ₹{totalSpent.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="space-y-3">
            {sortedCategories.map(([cat, amt]) => {
              const pct = totalSpent > 0 ? Math.round((amt / totalSpent) * 100) : 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{cat}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-[11px]">{pct}%</span>
                      <span className="font-bold text-slate-900">₹{amt.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        cat === 'Bills'
                          ? 'bg-blue-600'
                          : cat === 'Transfers'
                          ? 'bg-purple-600'
                          : cat === 'Shopping'
                          ? 'bg-amber-500'
                          : cat === 'Food'
                          ? 'bg-rose-500'
                          : 'bg-[#00BAF2]'
                      }`}
                      style={{ width: `${Math.max(pct, 3)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Spending Rhythm */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#002970]" />
              Weekly Spending Flow
            </h3>
            <span className="text-xs text-slate-400 font-medium">September 2026</span>
          </div>

          <div className="space-y-3 pt-2">
            {weeklyBreakdown.map((wb, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="font-semibold text-slate-800">{wb.week}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#002970]">
                    ₹{wb.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-blue-50/60 p-3 text-[11px] text-slate-600 border border-blue-100">
            <strong>Spending Note:</strong> Highest outflow occurred during Week 3 due to monthly rent share settlement (₹9,500).
          </div>
        </div>
      </div>
    </div>
  );
};
