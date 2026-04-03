import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ArrowUpDown, Search, Target } from 'lucide-react';

export default function Table({ data }) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
  
        if (sortConfig.key === 'CTR') {
          aValue = parseFloat(aValue.toString().replace('%', '')) || 0;
          bValue = parseFloat(bValue.toString().replace('%', '')) || 0;
        }
  
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter(item =>
      item.campaign.toLowerCase().includes(search.toLowerCase())
    );
  }, [sortedData, search]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <ArrowUpDown size={14} className="text-slate-300 dark:text-slate-600 ml-1" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp size={16} className="text-blue-600 ml-1" /> 
      : <ChevronDown size={16} className="text-blue-600 ml-1" />;
  };

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Recent Deployments</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Last 3 Active Campaigns</p>
        </div>
        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search campaign..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-none ring-1 ring-slate-200 dark:ring-slate-800 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm font-semibold"
          />
        </div>
      </div>

      <div className="space-y-4">
        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-8 py-3 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl">
          {["campaign", "clicks", "impressions", "CTR"].map((col) => (
            <div 
              key={col} 
              className="flex items-center cursor-pointer select-none group"
              onClick={() => handleSort(col)}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 group-hover:text-blue-600 transition-colors">
                {col}
              </span>
              {renderSortIcon(col)}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {filteredData.map((item) => (
            <div 
              key={item.id} 
              className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center px-8 py-5 bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Target size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">
                    {item.campaign}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                    ID-00{item.id}
                  </span>
                </div>
              </div>

              <div className="text-lg font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                {item.clicks.toLocaleString()}
              </div>

              <div className="text-sm font-semibold text-slate-400 dark:text-slate-500 tabular-nums">
                {item.impressions.toLocaleString()}
              </div>

              <div className="flex items-center">
                <div className="flex flex-col items-center bg-blue-50/50 dark:bg-blue-900/20 px-4 py-2 rounded-xl border border-blue-100/50 dark:border-blue-500/10 min-w-[80px]">
                   <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {item.CTR}
                  </span>
                  <span className="text-[9px] font-bold text-blue-400 uppercase tracking-tighter">
                    Conversion
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}