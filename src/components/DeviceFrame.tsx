/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, ArrowLeft, Settings, Bell, MessageSquare, Home, User, Layers } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  activeScreen: string;
  onBack?: () => void;
  lang: 'ar' | 'fr';
  themeState: 'light' | 'dark';
  onNavigate?: (screen: any) => void;
}

export default function DeviceFrame({
  children,
  activeScreen,
  onBack,
  lang,
  themeState,
  onNavigate
}: DeviceFrameProps) {
  const [time, setTime] = useState('12:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours() + 1).padStart(2, '0'); // Algiers is UTC+1
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const isDark = themeState === 'dark';
  const isRtl = lang === 'ar';

  return (
    <div className="relative mx-auto my-4 transition-all duration-300 ease-in-out">
      {/* Outer Shell Glass frame */}
      <div className={`relative w-[375px] h-[780px] rounded-[52px] border-[10px] ${isDark ? 'border-zinc-800 bg-neutral-950 shadow-brand-terracotta/20' : 'border-zinc-900 bg-neutral-900'} shadow-2xl overflow-hidden flex flex-col`}>
        {/* Apple Dynamic Island / Speaker Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-[26px] bg-black rounded-b-2xl z-50 flex items-center justify-center gap-1.5 px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800"></div>
          <div className="w-12 h-1 bg-zinc-950 rounded-full"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800"></div>
        </div>

        {/* Device Status Bar */}
        <div className={`h-11 px-5 pt-4 pb-1 flex justify-between items-center text-xs font-semibold select-none z-40 relative ${isDark ? 'bg-zinc-950 text-white' : 'bg-brand-cream text-brand-navy'}`}>
          <div className="text-[11px] tracking-tight">{time}</div>
          <div className="flex items-center gap-1.5 pt-0.5">
            <Signal className="w-3.5 h-3.5 opacity-85" />
            <span className="text-[9px] font-bold">5G</span>
            <Wifi className="w-3.5 h-3.5 opacity-85" />
            <Battery className="w-[18px] h-3.5" />
          </div>
        </div>

        {/* Main Content Area inside Device Flow */}
        <div className={`flex-1 overflow-y-auto no-scrollbar relative flex flex-col ${isDark ? 'bg-zinc-950 text-neutral-100' : 'bg-brand-cream text-brand-navy'}`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
          {children}
        </div>

        {/* Virtual Home Bar Indicator */}
        <div className={`h-5 flex items-center justify-center select-none z-40 relative ${isDark ? 'bg-zinc-950' : 'bg-brand-cream'}`}>
          <div className="w-32 h-1 bg-zinc-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
