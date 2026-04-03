import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';

const Insights = () => {
  const { transactions } = useApp();

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'Expense');
    const incomes  = transactions.filter((t) => t.type === 'Income');

    // ── Highest Spending Category ──────────────────────────────────────────
    const byCategory = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

    const topCategoryEntry = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
    const topCategory = topCategoryEntry
      ? `${topCategoryEntry[0]} ($${topCategoryEntry[1].toLocaleString()})`
      : 'No expenses yet';

    // ── Monthly Comparison ─────────────────────────────────────────────────
    const now          = new Date();
    const thisMonth    = now.getMonth();
    const lastMonth    = (thisMonth + 11) % 12; // handles January → December wrap
    const thisYear     = now.getFullYear();
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    const sumExpenses = (month, year) =>
      expenses
        .filter((t) => {
          const d = new Date(t.date);
          return d.getMonth() === month && d.getFullYear() === year;
        })
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const thisMonthTotal = sumExpenses(thisMonth, thisYear);
    const lastMonthTotal = sumExpenses(lastMonth, lastMonthYear);

    let comparisonValue;
    if (lastMonthTotal === 0 && thisMonthTotal === 0) {
      comparisonValue = <span className="text-slate-500 dark:text-slate-400">No data to compare yet</span>;
    } else if (lastMonthTotal === 0) {
      comparisonValue = <span className="text-slate-900 dark:text-slate-200">No data from last month</span>;
    } else {
      const pct    = Math.abs(((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100).toFixed(1);
      const isLower = thisMonthTotal <= lastMonthTotal;
      comparisonValue = (
        <>
          Spending{' '}
          <span className={`font-bold ${isLower ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
            {pct}% {isLower ? 'lower' : 'higher'}
          </span>{' '}
          than last month
        </>
      );
    }

    // ── Top Savings Opportunity ────────────────────────────────────────────
    // Finds the non-essential category with the highest spend
    const NON_ESSENTIALS = ['Entertainment', 'Food', 'Other'];
    const nonEssentialEntries = Object.entries(byCategory)
      .filter(([cat]) => NON_ESSENTIALS.includes(cat))
      .sort((a, b) => b[1] - a[1]);

    const savingsOpportunity = nonEssentialEntries.length > 0
      ? `Reduce ${nonEssentialEntries[0][0]} ($${nonEssentialEntries[0][1].toLocaleString()} this month)`
      : 'Looking good — no major non-essential spending!';

    // ── Total Saved This Month ─────────────────────────────────────────────
    const totalIncomeThisMonth   = incomes
      .filter((t) => {
        const d = new Date(t.date);
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const savedThisMonth = totalIncomeThisMonth - thisMonthTotal;
    const savedValue =
      totalIncomeThisMonth === 0
        ? <span className="text-slate-500 dark:text-slate-400">No income recorded this month</span>
        : (
          <span className={`font-bold ${savedThisMonth >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
            {savedThisMonth >= 0 ? '+' : '-'}${Math.abs(savedThisMonth).toLocaleString()}
          </span>
        );

    return [
      { label: 'Highest Spending Category', value: topCategory },
      { label: 'Monthly Comparison',        value: comparisonValue },
      { label: 'Top Savings Opportunity',   value: savingsOpportunity },
      { label: 'Net Saved This Month',      value: savedValue },
    ];
  }, [transactions]);

  return (
    <div className="w-full bg-white dark:bg-slate-900 p-4 rounded-md border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Insights</h3>

      {transactions.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500 py-6 text-center">
          No transaction data yet. Add some transactions to see insights.
        </p>
      ) : (
        // 4 cards: 1 col mobile → 2 col tablet → 4 col desktop
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100/50 dark:border-slate-700/50 flex flex-col gap-1 transition-colors"
            >
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {item.label}
              </span>
              <p className="text-slate-900 dark:text-slate-200 font-semibold text-sm sm:text-base">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Insights;