import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, DoughnutController
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

const CATEGORY_COLORS = {
  Housing:       '#3b82f6',
  Food:          '#a855f7',
  Transport:     '#f59e0b',
  Entertainment: '#ec4899',
  Other:         '#6b7280',
};

export default function SpendingBreakdownChart() {
  const { transactions } = useApp();
  const chartRef      = useRef(null);
  const chartInstance = useRef(null);
  const [hovered, setHovered] = useState(null);

  const expenses      = transactions.filter(t => t.type === 'Expense');
  const income        = transactions.filter(t => t.type === 'Income');
  const totalIncome   = income.reduce((s, t) => s + t.amount, 0);
  const totalExpense  = expenses.reduce((s, t) => s + Math.abs(t.amount), 0);

  const categoryMap = {};
  expenses.forEach(t => {
    const cat = t.category || 'Other';
    categoryMap[cat] = (categoryMap[cat] || 0) + Math.abs(t.amount);
  });

  const categories = Object.keys(categoryMap);
  const amounts    = categories.map(c => categoryMap[c]);
  const colors     = categories.map(c => CATEGORY_COLORS[c] || '#6b7280');
  const pcts       = amounts.map(a =>
    totalExpense > 0 ? Math.round((a / totalExpense) * 100) : 0
  );

  const centerLabel = hovered !== null
    ? { value: `$${amounts[hovered].toLocaleString()}`, label: categories[hovered] }
    : { value: `$${totalExpense.toLocaleString()}`,      label: 'total spent' };

  useEffect(() => {
    if (!chartRef.current || categories.length === 0) return;
    
    // Destroy existing chart before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const isDark = document.documentElement.classList.contains('dark');
    const ctx    = chartRef.current.getContext('2d');

    chartInstance.current = new ChartJS(ctx, {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [{
          data: amounts,
          backgroundColor: colors,
          hoverBackgroundColor: colors.map(c => c + 'cc'),
          borderColor:  isDark ? '#0f172a' : '#ffffff',
          borderWidth:  2,
          borderRadius: 6,
          spacing:      4,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend:  { display: false },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (ctx) =>
                ` ${ctx.label}: $${ctx.raw} (${pcts[ctx.dataIndex]}%)`,
            },
          },
        },
        onHover: (event, elements) => {
          setHovered(elements.length > 0 ? elements[0].index : null);
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [transactions, categories.length]);

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-900 rounded-sm border border-gray-100 dark:border-slate-800 p-5 shadow-sm">

      <p className="text-xl font-bold text-slate-900 dark:text-white">
        Expenses breakdown
      </p>

      {/* Main Chart Area */}
      <div className="relative flex-1 min-h-[220px] w-full flex items-center justify-center md:py-4">
        {categories.length > 0 ? (
          <>
            <canvas ref={chartRef} className="max-w-full max-h-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {centerLabel.value}
              </span>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-tighter text-gray-400 dark:text-slate-500">
                {centerLabel.label}
              </span>
            </div>
          </>
        ) : (
          <div className="text-gray-400 dark:text-slate-500 text-sm italic">
            No expense data found
          </div>
        )}
      </div>

      {/* Legend Container */}
      {categories.length > 0 && (
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {categories.map((cat, i) => (
              <div key={cat} className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: colors[i] }}
                  />
                  <span className="text-gray-600 dark:text-slate-400 truncate">{cat}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-bold text-gray-800 dark:text-slate-200">
                    ${amounts[i].toLocaleString()}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400">
                    {pcts[i]}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}