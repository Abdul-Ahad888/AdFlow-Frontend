import React, { useState } from 'react';

export default function ChartTabs({ tabs, onTabChange }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (id) => {
    setActiveTab(id);
    onTabChange(id);
  };

  return (
    <div className="flex gap-4 mb-4 border-b border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`px-4 py-2 text-sm font-medium transition-all rounded-t-lg ${
            activeTab === tab.id
              ? 'bg-white dark:bg-gray-800 border-t border-l border-r border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}