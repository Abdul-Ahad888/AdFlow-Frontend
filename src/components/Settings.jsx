import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useState } from 'react';
import Navbar from './Navbar';
import { Cog } from 'lucide-react';

export default function Settings() {

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

    return (
        <div className="flex min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className={`flex-1 flex flex-col transition-all duration-500 ease-in-out w-full 
      ${isOpen ? 'lg:ml-80' : 'lg:ml-0'}`}>

                <Navbar
                    pageTitle="Settings"
                    Icon={Cog}
                    isDark={isDark}
                    setIsDark={setIsDark}
                />

            </div>
        </div>
    )
}
