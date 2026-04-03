import React, { useState, useEffect } from 'react';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AppBar = () => {
  const { role, setRole } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const roles = ['Admin', 'Viewer'];

  return (
    <header className="
    flex items-center justify-between 
    px-4 md:px-8 
    h-16 /* Explicit height to match the sidebar button */
    bg-white dark:bg-slate-900 
    border-b border-gray-200 dark:border-slate-800 
    sticky top-0 z-30 
    transition-colors duration-300
  ">

      {/* Left Section: Title */}
      <div className="flex items-center h-full">
        <h1 className="
        text-lg md:text-2xl font-bold text-slate-900 dark:text-white truncate
        /* pl-14 gives room for the button (16px left + ~40px button width) */
        pl-14 lg:pl-0 
        flex items-center h-full
      ">
          Dashboard
        </h1>
      </div>

      {/* 2. Right Section: Controls */}
      <div className="flex items-center space-x-2 md:space-x-4 h-full">
        <span className="hidden md:inline text-sm font-medium text-gray-600 dark:text-slate-400">
          Role:
        </span>

        {/* Role Dropdown */}
        <div className="relative inline-block text-left">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-24 md:w-32 px-2 md:px-3 py-1.5 text-xs md:text-sm bg-white dark:bg-slate-800 text-gray-700 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg shadow-sm"
          >
            <span className="truncate">{role}</span>
            <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-32 md:w-40 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => { setRole(r); setIsOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs md:text-sm hover:bg-gray-50 dark:hover:bg-slate-700/50 ${role === r ? 'font-bold text-blue-600' : 'text-slate-700 dark:text-slate-200'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-1.5 md:p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 transition-all"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default AppBar;