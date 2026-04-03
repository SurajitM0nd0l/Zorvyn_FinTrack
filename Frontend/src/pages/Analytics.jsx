import React from 'react';
import BalanceTrendChart from '../components/BalanceTrendChart';

export default function Analytics() {
  return (
    // min-h-screen or a fixed height ensures the child's "h-full" has a reference
    <div className="p-4 md:p-8 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="h-[500px] w-full"> 
        <BalanceTrendChart/>
      </div>
    </div>
  );
}