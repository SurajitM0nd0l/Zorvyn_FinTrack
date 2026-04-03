import React, { useState, useEffect } from 'react'; // 1. Added useEffect
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
import Sidebar from './components/Sidebar';
import Preloader from './components/Preloader'; // 2. Import Preloader

import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Analytics from './pages/Analytics';
import Accounts from './pages/Accounts';

function App() {
  // 3. Keep track if this is the first time the app is loading
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 4. Use a timer to stop the preloader after exactly 3.5 seconds
  // (We use 3.5s to give the 3s animation a little time to complete)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 3500); 

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, []);

  // 5. Conditional Rendering: Show ONLY the preloader if it's the initial load
  if (isInitialLoad) {
    return <Preloader />;
  }

  // 6. Otherwise, show your full app as normal
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
        
        {/* Sidebar and AppBar stay visible on every route */}
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <AppBar />
          
          <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {/* The Routes component acts as the "switch" for your pages */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/accounts" element={<Accounts />} />
              
              {/* Optional: Redirect or 404 page */}
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;