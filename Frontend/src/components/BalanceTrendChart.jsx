import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function BalanceTrendChart() {
  const { transactions } = useApp();
  
  // Responsive logic to handle Y-Axis and Interval
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chartData = React.useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    let runningBalance = 0;
    return sorted.map(t => {
      runningBalance += t.amount;
      const dateObj = new Date(t.date);
      return {
        date: `${dateObj.getDate()}/${dateObj.getMonth() + 1}`,
        balance: runningBalance,
        desc: t.desc,
        fullDate: dateObj.toLocaleDateString('en-US', {
          day: 'numeric', month: 'short'
        })
      };
    });
  }, [transactions]);

  const balances = chartData.map(d => d.balance);
  const minBalance = Math.min(...balances);
  const maxBalance = Math.max(...balances);
  const latestBalance = balances[balances.length - 1] ?? 0;
  const firstBalance = balances[0] ?? 0;
  const change = latestBalance - firstBalance;
  const isPositive = change >= 0;

  const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD', maximumFractionDigits: 0,
    }).format(n);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg px-3 py-2 text-sm shadow-md">
        <p className="text-gray-400 dark:text-slate-400 text-xs mb-1">{payload[0].payload.fullDate}</p>
        <p className="font-medium text-gray-900 dark:text-white">{fmt(payload[0].value)}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-900 rounded-sm border border-gray-100 dark:border-slate-800 p-4 sm:p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs sm:text-sm text-gray-400 dark:text-slate-500 font-medium">Balance trend</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
            {fmt(latestBalance)}
          </p>
        </div>
        <span className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full ${isPositive
          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
          : 'bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400'
          }`}>
          {isPositive ? '+' : ''}{fmt(change)}
        </span>
      </div>

      {/* Metric row - FIXED FOR MOBILE */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
        {[
          { label: 'Trade count', value: transactions.length },
          { label: 'Peak balance', value: fmt(maxBalance) },
          { label: 'Low balance', value: fmt(minBalance) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-3 flex sm:flex-col justify-between items-center sm:items-start border border-transparent dark:border-slate-800">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 dark:text-slate-500 font-bold">{label}</p>
            <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">{value}</p>
          </div>
        ))}
      </div>

      {/* Chart container */}
      <div className="flex-1 min-h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 15, left: isMobile ? -30 : 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(100,116,139,0.12)" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              // ✅ Smarter interval: hide some dates on mobile to prevent clashing
              interval={isMobile ? "preserveStartEnd" : 0} 
              minTickGap={25}
              height={30}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickFormatter={v => isMobile ? `${(v / 1000).toFixed(0)}k` : `$${(v / 1000).toFixed(1)}k`}
              width={isMobile ? 35 : 55}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#balanceGrad)"
              dot={false} // Clean up mobile UI
              activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}