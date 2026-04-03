import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import NotificationCenter from "../components/Notification";
import { Zap } from 'lucide-react';
import mockCampaignsJSON from "../mock/tableData.json";
import Navbar from './Navbar';

export default function Campaigns() {
  const [isOpen, setIsOpen] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [health, setHealth] = useState("");
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const filteredCampaigns = useMemo(() => {
    let data = [...mockCampaignsJSON];
    if (filterStatus !== 'ALL') {
      data = data.filter(c => c.status.toUpperCase() === filterStatus);
    }
    return data;
  }, [filterStatus]);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch('https://ad-flow-backend.vercel.app/api/health');
        const data = await res.json();
        setHealth(data?.status || "");
      } catch (error) {
        console.error("Failed to fetch health status:", error);
      }
    };
    fetchHealth();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-500 ease-in-out w-full 
        ${isOpen ? 'lg:ml-80' : 'lg:ml-0'}`}>

        {/* Navbar */}
        <Navbar pageTitle="Campaigns"
          Icon={Zap}
          isDark={isDark}
          setIsDark={setIsDark}/>

        {/* Content Wrapper */}
        <div className="flex-1 p-6 md:p-12 max-w-[1700px] mx-auto w-full">

          <div className="mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-medium text-slate-900 dark:text-white leading-tight">
                <span className="text-blue-600 font-serif italic mr-2">Deployment</span> Center.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-5 text-lg font-normal leading-relaxed">
                Centralized management for every deployment. Monitor efficiency, 
                track CTR fluctuations, and scale high-performing assets.
              </p>
            </div>

            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-[2rem] border border-slate-200 dark:border-slate-700/50 shadow-inner">
              {['ALL', 'ACTIVE', 'PAUSED'].map((status) => (
                <button 
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-8 py-3 rounded-[1.8rem] text-[10px] font-black tracking-[0.2em] transition-all duration-300 ${
                    filterStatus === status 
                    ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-[3rem] blur-2xl opacity-100"></div>

            <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800/50 shadow-2xl overflow-hidden">
               <div className="p-8">
                  <Table data={filteredCampaigns} />
               </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 px-6">
            <div className="flex items-center gap-8">
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Deployments</span>
                  <span className="text-lg font-semibold">{filteredCampaigns.length} Units</span>
               </div>
               <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-800"></div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Health</span>
                  <span className="text-lg font-semibold text-green-500">
                    {health}
                  </span>
               </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-full">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">
                 System Operational
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}