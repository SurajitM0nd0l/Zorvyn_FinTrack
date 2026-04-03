import { createContext, useContext, useState } from 'react';

const initialTransactions = [
  { id: 1, date: '2023-10-15', desc: 'Salary - ABC Corp', category: 'Income', type: 'Income', amount: 4800 },
  { id: 2, date: '2023-10-14', desc: 'Netflix Subscription', category: 'Entertainment', type: 'Expense', amount: -150 },
  { id: 3, date: '2023-10-13', desc: 'Rent Payment', category: 'Housing', type: 'Expense', amount: -1200 },
  { id: 4, date: '2023-10-12', desc: 'Grocery Store', category: 'Food', type: 'Expense', amount: -85 },
  { id: 5, date: '2023-10-11', desc: 'Uber Ride', category: 'Transport', type: 'Expense', amount: -220 },
  { id: 6, date: '2023-10-10', desc: 'Freelance Payment', category: 'Income', type: 'Income', amount: 1500 },
  { id: 7, date: '2023-10-09', desc: 'Brand Payment', category: 'Income', type: 'Income', amount: 230 },
  { id: 8, date: '2023-10-08', desc: 'Swiggy Order', category: 'Food', type: 'Expense', amount: -200 },
  { id: 9, date: '2023-10-07', desc: 'Youtube Payment', category: 'Income', type: 'Income', amount: 4000 },
  { id: 10, date: '2023-10-06', desc: 'Instagram Payment', category: 'Income', type: 'Income', amount: 1300 }
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState('Admin');
  const [filters, setFilters] = useState({ search: '', category: 'All', type: 'All' });

  const addTransaction = (tx) =>
    setTransactions((prev) => [{ ...tx, id: Date.now() }, ...prev]);

  const editTransaction = (id, updated) =>
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));

  const deleteTransaction = (id) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  return (
    <AppContext.Provider value={{
      transactions, role, setRole, filters, setFilters,
      addTransaction, editTransaction, deleteTransaction
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);