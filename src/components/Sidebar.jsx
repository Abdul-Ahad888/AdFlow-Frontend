import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, Zap, Users, Cog, Sparkles,
  FileText, LogOut, ChevronLeft, ChevronRight 
} from 'lucide-react';
export default function Sidebar({ isOpen, setIsOpen }) {

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 990) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Zap, label: 'Campaigns', path: '/campaigns' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: FileText, label: 'Creative Brief', path: '/create-brief' },
    { icon: Sparkles, label: 'Creative Engine', path: '/creative-engine' },
    { icon: Cog, label: 'Settings', path: '/settings' },
  ];


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  
    navigate("/login")
  };

  return (
    <>
      <div 
        className={`bg-gradient-to-b from-blue-900 to-indigo-900 border-r border-blue-800 p-6 flex flex-col h-screen fixed top-0 left-0 text-white overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out z-50 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        w-full lg:w-80`}
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-7 right-5 bg-blue-900 border border-blue-400 text-white rounded-full p-2 shadow-xl hover:bg-blue-800 transition-colors z-50"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        <div className="mb-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
            AdFlow
          </h2>
          <p className="text-xs text-blue-200 mt-1 tracking-wide uppercase font-medium">Ad Agency</p>
        </div>

        <ul className="space-y-3 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  onClick={() => window.innerWidth < 990 && setIsOpen(false)}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium text-sm ${isActive
                      ? 'bg-white/20 border border-white/30 text-white shadow-lg'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="pt-4 border-t border-blue-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-red-800/80 hover:text-red-200 transition-all duration-300 font-medium text-sm" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-20 left-0 mt-5 bg-indigo-400 text-white p-3 rounded-r-lg shadow-2xl hover:bg-indigo-500 transition-all z-40">
          <ChevronRight size={24} />
        </button>
      )}
    </>
  )
}