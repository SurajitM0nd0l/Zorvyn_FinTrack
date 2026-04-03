// StatCardGrid
import { Banknote, Wallet, ShoppingCart } from 'lucide-react';
import StatCard from './StatCard';
import { useApp } from '../context/AppContext';

export function StatCardGrid() {
  const { transactions } = useApp();
  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <StatCard 
        title="Total Balance" 
        value={`$${balance.toLocaleString()}`} 
        Icon={Wallet} 
        trendUp={balance >= 0}
        bgColorClass="bg-blue-50"
        iconColorClass="text-blue-600"
      />
      
      <StatCard 
        title="Monthly Income" 
        value={`$${income.toLocaleString()}`} 
        Icon={Banknote} 
        trendUp={true}
        bgColorClass="bg-emerald-50"
        iconColorClass="text-emerald-600"
      />

      <StatCard 
        title="Monthly Expenses" 
        value={`$${expenses.toLocaleString()}`} 
        Icon={ShoppingCart} 
        trendUp={false}
        bgColorClass="bg-rose-50"
        iconColorClass="text-rose-600"
      />
    </div>
  );
}