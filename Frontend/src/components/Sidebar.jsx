import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, ArrowLeftRight, PieChart, TrendingUp,
  Wallet, Settings, HelpCircle, LogOut, ChevronLeft,
  ChevronRight, Landmark, Menu, X
} from 'lucide-react';

const NAV_ITEMS = [
  {
    section: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
      { icon: ArrowLeftRight, label: 'Transactions', href: '/transactions' },
      { icon: PieChart, label: 'Budgets', href: '/budgets' },
      { icon: TrendingUp, label: 'Analytics', href: '/analytics' },
      { icon: Wallet, label: 'Accounts', href: '/accounts' },
    ],
  },
  {
    section: 'Support',
    items: [
      { icon: Settings, label: 'Settings', href: '/settings' },
      { icon: HelpCircle, label: 'Help', href: '/help' },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar when clicking a link
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* --- MOBILE HAMBURGER BUTTON --- */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="
    lg:hidden fixed left-4 z-40 
    h-16 /* Match the AppBar height */
    flex items-center justify-center
    /* Remove background/border so it looks like part of the AppBar */
    bg-transparent 
  "
      >
        <div className="p-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg shadow-sm">
          <Menu size={20} className="text-gray-600 dark:text-slate-400" />
        </div>
      </button>

      {/* --- MOBILE OVERLAY --- */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[50] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* --- MAIN SIDEBAR --- */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[60] lg:relative
          flex flex-col h-screen bg-white dark:bg-slate-900
          border-r border-gray-100 dark:border-slate-800
          transition-all duration-300 ease-in-out
          /* Mobile logic: transform off-screen unless open */
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          /* Desktop logic: width based on collapsed state */
          ${collapsed ? 'lg:w-[78px]' : 'lg:w-[240px]'}
          w-[280px] /* Default mobile width */
        `}
      >
        {/* Logo & Toggle Section */}
        <div className={`
          flex items-center h-16 px-4 border-b border-gray-100 dark:border-slate-800 flex-shrink-0 
          ${collapsed ? 'lg:flex-col lg:justify-center lg:gap-4 lg:h-auto lg:py-4' : 'justify-between'}
        `}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
              <Landmark size={18} className="text-white" />
            </div>
            {(!collapsed || isMobileOpen) && (
              <span className="font-bold text-gray-900 dark:text-white text-base tracking-tight whitespace-nowrap">
                FinTrack
              </span>
            )}
          </div>

          {/* Toggle Button (Hidden on Mobile) / Close Button (Visible on Mobile) */}
          <button
            onClick={() => isMobileOpen ? setIsMobileOpen(false) : setCollapsed(p => !p)}
            className="w-7 h-7 rounded-md bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all"
          >
            {isMobileOpen ? (
              <X size={14} />
            ) : (
              collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 custom-scrollbar">
          {NAV_ITEMS.map(({ section, items }) => (
            <div key={section} className="mb-6">
              {(!collapsed || isMobileOpen) && (
                <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-slate-500 font-bold px-3 mb-3">
                  {section}
                </p>
              )}
              <div className="space-y-1">
                {items.map(({ icon: Icon, label, href }) => (
                  <NavLink
                    key={label}
                    to={href}
                    title={collapsed ? label : undefined}
                    className={({ isActive }) => `
                      group flex items-center gap-3 px-3 py-2 rounded-lg
                      text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-slate-100'
                      }
                      ${collapsed && !isMobileOpen ? 'lg:justify-center' : ''}
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={20}
                          className={`flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''
                            }`}
                        />
                        {(!collapsed || isMobileOpen) && <span className="flex-1">{label}</span>}
                        {(!collapsed || isMobileOpen) && isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Footer */}
        <div className="flex-shrink-0 border-t border-gray-100 dark:border-slate-800 p-4 space-y-3">
          <button
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg
              text-sm font-medium text-gray-500 dark:text-slate-400
              hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600
              transition-colors ${collapsed && !isMobileOpen ? 'lg:justify-center' : ''}
            `}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {(!collapsed || isMobileOpen) && <span>Log out</span>}
          </button>

          <div className={`
            flex items-center gap-3 p-2 rounded-xl bg-gray-50 dark:bg-slate-800/50
            ${collapsed && !isMobileOpen ? 'lg:justify-center' : ''}
          `}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-xs font-bold text-white">AU</span>
            </div>
            {(!collapsed || isMobileOpen) && (
              <div className="overflow-hidden leading-tight">
                <p className="text-xs font-semibold text-gray-900 dark:text-slate-200 truncate">Admin User</p>
                <p className="text-[10px] text-gray-500 dark:text-slate-500 truncate">admin@fintrack.io</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}