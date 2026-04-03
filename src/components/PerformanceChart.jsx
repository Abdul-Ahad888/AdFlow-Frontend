import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart, } from "recharts";
import ChartTabs from "./ChartTabs";
import { useState } from "react";
import performanceData from "../mock/performanceData.json";

export default function PerformanceChart() {
  const tabs = [{ id: '7d', label: '7 Days' }, { id: '30d', label: '30 Days' }, { id: '90d', label: '90 Days' }];
  const [selectedTab, setSelectedTab] = useState("7d");
  const filteredData = performanceData[selectedTab] || [];
  
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-gray-500 dark:text-gray-400">Last {selectedTab}ays</span>
      </div>

      <ChartTabs tabs={tabs} activeTab={selectedTab} onTabChange={setSelectedTab} />

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickMargin={10} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#fff"
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Area type="monotone" dataKey="clicks" stroke="#2563eb" fill="url(#colorClicks)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}