import React from 'react';
import { StatCardGrid } from '../components/StatCardGrid';
import { ChartGrid } from '../components/ChartGrid';
import Insights from '../components/Insights';
import RecentTransactions from '../components/RecentTransactions';

export default function Dashboard() {
  return <div className='max-w-[1600px] mx-auto flex flex-col gap-6'>
      <section className="flex-shrink-0">
        <StatCardGrid />
      </section>
      
      <section className="flex-shrink-0">
        <ChartGrid />
      </section>
      
      <section className="flex-shrink-0">
        <Insights />
      </section>
      
      <section className="flex-shrink-0">
        <RecentTransactions />
      </section>
  </div>
}
