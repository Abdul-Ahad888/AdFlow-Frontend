import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function KPICard({ title, value, change }) {
  const isPositive = change.startsWith('+');

  return (
    <div className="group relative bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 ease-out transform hover:scale-[1.02]">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">{title}</h3>
          <div className={`p-2 rounded-lg transition-colors ${isPositive ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
            {isPositive ? (
              <ArrowUpRight className="text-green-600 dark:text-green-400" size={16} strokeWidth={2.5} />
            ) : (
              <ArrowDownRight className="text-red-600 dark:text-red-400" size={16} strokeWidth={2.5} />
            )}
          </div>
        </div>

        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</p>

        <span className={`inline-block text-sm font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}