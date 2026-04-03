import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Sparkles, Share2, Hash, Zap, Activity, ShieldCheck, Cpu } from 'lucide-react';
import Copywriter from '../components/ai/Copywritter';
import SocialSuite from '../components/ai/SocialSuite';
import HashtagGuru from '../components/ai/HashtagGuru';

export default function AILab() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const [systemMetrics, setSystemMetrics] = useState({
    latency: 0.42,
    sync: 98.4,
    load: "OPTIMAL",
    uptime: "99.98%"
  });

  const [connectivity, setConnectivity] = useState([40, 70, 45, 90, 65, 80, 30, 95]);

  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        latency: parseFloat((Math.random() * (0.55 - 0.35) + 0.35).toFixed(2)),
        // Jitter the sync percentage slightly for realism
        sync: parseFloat((98 + Math.random() * 1.8).toFixed(1))
      }));
    }, 2500);

    const graphInterval = setInterval(() => {
      setConnectivity(prev => [...prev.slice(1), Math.floor(Math.random() * 50) + 40]);
    }, 1500);

    return () => {
      clearInterval(metricsInterval);
      clearInterval(graphInterval);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-[#02040a] text-slate-900 dark:text-slate-200 selection:bg-cyan-500/30 font-mono transition-colors duration-300">
      <div className="fixed inset-0 z-0 opacity-[0.03] dark:opacity-20 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex-1 flex flex-col relative z-10 transition-all duration-500 ${isOpen ? 'lg:ml-80' : 'lg:ml-0'}`}>
        
        <Navbar pageTitle="Creative Engine" Icon={Sparkles} isDark={isDark} setIsDark={setIsDark} />

        <main className="flex-1 p-4 lg:p-8 w-full max-w-[1800px] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Latency Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm dark:shadow-inner">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Activity size={18} className="animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Latency (Flash)</p>
                <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">{systemMetrics.load} / {systemMetrics.latency}ms</p>
              </div>
            </div>

            {/* Neural Sync Card (The Replacement) */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm dark:shadow-inner">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Cpu size={18} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Neural Sync</p>
                <p className="text-sm font-bold text-amber-600 dark:text-amber-400 tabular-nums">{systemMetrics.sync}% STABLE</p>
              </div>
            </div>

            {/* Security Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm dark:shadow-inner">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">Node Security</p>
                <p className="text-sm font-bold text-purple-600 dark:text-purple-400 tracking-tighter">ENCRYPTED_{systemMetrics.uptime}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-9">
              <section className="relative h-full bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl dark:shadow-2xl overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/20 border border-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500/20 border border-amber-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500/20 border border-green-500/50"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 ml-4 tracking-[0.3em]">GEMINI_FLASH_2.5_CORE</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-cyan-100 dark:bg-cyan-500/10 rounded-md border border-cyan-200 dark:border-cyan-500/20">
                    <Zap size={12} className="text-cyan-600 dark:text-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Live_Neural_Link</span>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                      Intelligence <span className="text-cyan-600 dark:text-cyan-500">Fabric</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-500 text-xs mt-1 tracking-widest font-bold uppercase">Ready_for_input // Streaming_enabled</p>
                  </div>
                  <div className="min-h-[500px] bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800/50 p-4 shadow-inner">
                    <Copywriter />
                  </div>
                </div>
              </section>
            </div>

            <div className="col-span-12 xl:col-span-3 space-y-6">
              <ModuleSlot title="SOCIAL_SYNC" icon={<Share2 size={18} />} accent="cyan" component={<SocialSuite />} />
              <ModuleSlot title="TREND_RADAR" icon={<Hash size={18} />} accent="fuchsia" component={<HashtagGuru />} />

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
                <div className="flex justify-between items-center mb-4">
                   <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">Global Connectivity</p>
                   <span className="text-[9px] text-slate-400 dark:text-indigo-400/50">LIVE</span>
                </div>
                 <div className="h-24 flex items-end gap-1 px-2">
                    {connectivity.map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-indigo-100 dark:bg-indigo-500/30 rounded-t-sm border-t border-indigo-300 dark:border-indigo-500/40 transition-all duration-700 ease-in-out" 
                        style={{ height: `${h}%` }}
                      ></div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ModuleSlot({ title, icon, accent, component }) {
  const themes = {
    cyan: "border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/5",
    fuchsia: "border-fuchsia-200 dark:border-fuchsia-500/30 text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-500/5",
  };

  return (
    <div className="relative group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-600">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg border ${themes[accent]}`}>
          {icon}
        </div>
        <h3 className="text-xs font-bold tracking-[0.2em] text-slate-600 dark:text-slate-300 uppercase">{title}</h3>
      </div>
      <div className="relative z-10">{component}</div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-100 dark:border-slate-800 group-hover:border-slate-300 dark:group-hover:border-slate-500 transition-colors"></div>
    </div>
  );
}