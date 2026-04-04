import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
import ChartTabs from "./ChartTabs";
import { useState, useRef } from "react";
import performanceData from "../mock/performanceData.json";

export default function PerformanceChart() {
  const tabs = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' }
  ];
  const [selectedTab, setSelectedTab] = useState("7d");
  const filteredData = performanceData[selectedTab] || [];
  const chartContainerRef = useRef(null);

  return (
    <div
      className="
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-xl
        px-3 py-4
        sm:px-5 sm:py-6
        md:px-7 md:py-8
        xl:px-12 xl:py-10
        w-full
      "
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 md:mb-6">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Last {selectedTab}ays
        </span>
      </div>

      <div className="mb-4 md:mb-6">
        <ChartTabs
          tabs={tabs}
          activeTab={selectedTab}
          onTabChange={setSelectedTab}
        />
      </div>

      <div
        className="w-full h-56 sm:h-64 md:h-72 xl:h-80 2xl:h-96"
        tabIndex={-1}
        ref={chartContainerRef}
        onMouseDown={e => {
          e.preventDefault();
        }}
        style={{ outline: "none" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              fontSize={11}
              tickMargin={8}
              style={{ fontSize: '0.9rem' }}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={11}
              tickMargin={6}
              style={{ fontSize: '0.9rem' }}
            />
            <Tooltip
              wrapperStyle={{ zIndex: 10 }}
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#fff",
                fontSize: '0.97rem',
                padding: '0.5rem 1rem'
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="#2563eb"
              fill="url(#colorClicks)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}