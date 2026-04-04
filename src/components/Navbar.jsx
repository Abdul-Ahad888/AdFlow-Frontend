import React from 'react';
import { Moon, Sun } from 'lucide-react';
import NotificationCenter from "./Notification";

export default function Navbar({ pageTitle, Icon, isDark, setIsDark }) {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sticky top-0 z-30 transition-colors duration-300">
      <div className="flex justify-between items-center">
        
        {/* Dynamic Page Title Section */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
          {Icon && (
            <div className="hidden md:flex w-12 h-12 bg-blue-600 rounded-2xl items-center justify-center text-white shadow-xl shadow-blue-600/30">
              <Icon size={24} />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-6">
          <button 
            className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all dark:text-slate-400 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700" 
            onClick={() => setIsDark(!isDark)}
            title="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <NotificationCenter />
          
          <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2 hidden md:block"></div>
          
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
            A
          </div>
        </div>
      </div>
    </div>
  );
}