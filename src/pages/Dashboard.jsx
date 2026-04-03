import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import KPICard from '../components/KPICard';
import Table from '../components/Table';
import PerformanceChart from '../components/PerformanceChart';
import mockCampaignsJSON from "../mock/tableData.json";
import { kpiData } from '../mock/kpiData';
import { LayoutDashboard } from 'lucide-react';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [recentCampaigns, setRecentCampaigns] = useState([]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const processedData = [...mockCampaignsJSON]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 3);
    setRecentCampaigns(processedData);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-500 ease-in-out w-full 
        ${isOpen ? 'lg:ml-80' : 'lg:ml-0'}`}>

        <Navbar
          pageTitle="Dashboard Overview"
          Icon={LayoutDashboard}
          isDark={isDark}
          setIsDark={setIsDark}
        />

        <div className="flex-1 p-6 md:p-12 space-y-16 max-w-[1700px] mx-auto w-full">

          {/* KPI Cards */}
          <section>
            <div className="mb-8 ">
              <h2 className="text-3xl font-bold tracking-tight">KPI Cards</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Key metrics tracking campaign progress and performance</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpiData.map((kpi) => (
                <KPICard key={kpi.title} {...kpi} />
              ))}
            </div>
          </section>

          <div className="border-b border-slate-200 dark:border-slate-800"></div>

          {/* Performance Chart */}
          <section className="dark:bg-slate-900">
            <div className="mb-8 ">
              <h2 className="text-3xl font-bold tracking-tight">Performance Analytics</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Weekly throughput and conversion trends</p>
            </div>
            <PerformanceChart />
          </section>

          {/* Recent Activity Tabl */}
          <section className="w-full">
            <Table data={recentCampaigns} />
          </section>

        </div>
      </div>
    </div>
  );
}