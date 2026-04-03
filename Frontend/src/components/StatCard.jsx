import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  trendUp = true, 
  Icon, 
  iconColorClass = "text-emerald-600", 
  bgColorClass = "bg-emerald-50" 
}) => {
  return (
    <div className="
      flex flex-row items-center justify-between /* Default: side-by-side */
      p-4 sm:p-5 
      bg-white dark:bg-slate-900 
      border border-gray-100 dark:border-slate-800 
      rounded-xl shadow-sm w-full 
      transition-all hover:shadow-md dark:hover:shadow-slate-950/50
    ">
      {/* Text Content */}
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-gray-400 dark:text-slate-500 font-bold text-[10px] sm:text-xs tracking-widest uppercase">
          {title}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight truncate">
            {value}
          </h2>
          {/* Trend Indicator */}
          <div className={`p-1 rounded-full ${trendUp ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-rose-50 dark:bg-rose-500/10'}`}>
            {trendUp ? (
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
            ) : (
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-rose-500" />
            )}
          </div>
        </div>
      </div>

      {/* Icon Box: Hidden on very small screens to save space, or just shrunk */}
      <div className={`
        flex items-center justify-center 
        w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 
        rounded-xl flex-shrink-0
        ${bgColorClass} dark:bg-opacity-10
      `}>
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${iconColorClass}`} />
      </div>
    </div>
  );
};

export default StatCard;