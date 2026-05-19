/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  AppLanguage, 
  UserRole, 
  AppScreen, 
  COPIES, 
  MOCK_WORKERS, 
  WorkerProfile, 
  Booking, 
  ChatThread, 
  MOCK_CHATS,
  MOCK_NOTIFICATIONS
} from './types';

// Importing custom visual modules
import DeviceFrame from './components/DeviceFrame';
import SplashAndOnboarding from './components/SplashAndOnboarding';
import ClientExperience from './components/ClientExperience';
import WorkerExperience from './components/WorkerExperience';
import ChatAndMessages from './components/ChatAndMessages';
import VisualDesignKit from './components/VisualDesignKit';

// Lucide Icons
import { 
  Compass, 
  Globe, 
  Sliders, 
  User, 
  MessageSquare, 
  Calendar, 
  Layout, 
  Sparkles, 
  Check, 
  ShieldAlert, 
  Activity, 
  Moon, 
  Sun,
  Award,
  BookOpen
} from 'lucide-react';

export default function App() {
  // App Config states
  const [lang, setLang] = useState<AppLanguage>('fr');
  const [userRole, setUserRole] = useState<UserRole>('client');
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [themeState, setThemeState] = useState<'light' | 'dark'>('light');

  // Dynamic Content states
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(MOCK_WORKERS[0]);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'b_init',
      workerId: 'w1',
      workerNameFr: 'Fatima Zohra',
      workerNameAr: 'فاطمة الزهراء',
      category: 'catering',
      date: '2026-05-23',
      timeSlotFr: 'Après-midi (13h-17h)',
      timeSlotAr: 'مساءً (1-5)',
      status: 'confirmed',
      priceEstimate: 15400,
      description: 'Dîner pour 15 personnes, couscous et salades algériennes.',
      clientAddress: '14, Rue Larbi Ben M\'hidi, Alger Centre',
      conciergeEnabled: true
    }
  ]);
  
  // Real-time Chat Threads simulation
  const [activeChatThread, setActiveChatThread] = useState<ChatThread | null>(null);

  // Worker pending requests stream (W1)
  const [pendingRequests, setPendingRequests] = useState<any[]>([
    {
      id: 'req_1',
      date: '2026-05-24',
      timeSlotAr: 'صباحًا',
      timeSlotFr: 'Matin',
      description: 'Besoin d\'un service traiteur traditionnel pour fiançailles à El Biar.',
      priceEstimate: 32000
    }
  ]);

  // Handle addition of booking (C4)
  const handleAddNewBooking = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    
    // Simulate a corresponding request visible on the worker's dashboard side
    const simulatedWorkRequest = {
      id: newBooking.id,
      date: newBooking.date,
      timeSlotAr: newBooking.timeSlotAr,
      timeSlotFr: newBooking.timeSlotFr,
      description: newBooking.description,
      priceEstimate: newBooking.priceEstimate
    };
    setPendingRequests(prev => [simulatedWorkRequest, ...prev]);
  };

  // Accepting worker requests (W1)
  const handleAcceptRequest = (id: string) => {
    setPendingRequests(prev => prev.filter(r => r.id !== id));
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'confirmed' } : b));
  };

  // Declining worker requests (W1)
  const handleDeclineRequest = (id: string) => {
    setPendingRequests(prev => prev.filter(r => r.id !== id));
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'declined' } : b));
  };

  // Quick Chat launch from profile details
  const handleSimulateMessage = (worker: WorkerProfile) => {
    const matchedThread = MOCK_CHATS.find(c => c.workerId === worker.id);
    if (matchedThread) {
      setActiveChatThread(matchedThread);
    } else {
      // Create custom thread dynamic representation
      const newThread: ChatThread = {
        id: 'c_' + worker.id,
        workerId: worker.id,
        workerNameFr: worker.nameFr,
        workerNameAr: worker.nameAr,
        avatar: worker.avatar,
        lastMessageAr: 'مرحباً! كيف يمكنني مساعدتكم؟',
        lastMessageFr: 'Bonjour ! Comment puis-je vous aider ?',
        unread: false,
        messages: [
          {
            id: 'm1',
            sender: 'worker',
            text: `Bonjour Yasmine ! Je suis ${worker.nameFr}, j'ai bien reçu votre intérêt.`,
            timestamp: '12:00'
          }
        ]
      };
      MOCK_CHATS.push(newThread);
      setActiveChatThread(newThread);
    }
    setCurrentScreen('messages');
  };

  const isRtl = lang === 'ar';
  const currentCopies = COPIES[lang];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans relative antialiased antialiased selection:bg-brand-terracotta selection:text-white">
      
      {/* LEFT SIDE PANEL: CONTROL DASHBOARD & PRODUCT SUMMARY */}
      <div className="w-full md:w-[480px] bg-slate-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800 shrink-0 overflow-y-auto max-h-screen no-scrollbar select-none">
        <div>
          {/* Brand Wordmark and Algiers Target Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-brand-terracotta rounded-xl flex items-center justify-center text-white text-xl font-bold font-arabic border border-slate-700">
                ك
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                  <span>KIN</span>
                  <span className="text-brand-terracotta text-sm">كين</span>
                </h1>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  Algeria Marketplace Prototype
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 bg-emerald-500/10 text-brand-green text-[10px] font-bold rounded-full border border-emerald-500/20">
              ● Active Live Server
            </span>
          </div>

          <p className="text-xs text-slate-450 leading-relaxed bg-slate-900/40 p-3.5 rounded-xl border border-slate-850">
            <strong>KIN (كين)</strong> connects North African homes with vetted personal care specialists. Use the <strong>Interactive Screen Jump Panel</strong> below to immediately check any of the 16 spec layouts, components, or bilingual capabilities.
          </p>

          {/* Interactive controls */}
          <div className="mt-5 space-y-4">
            <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-brand-terracotta" />
              <span>Global Config Panel</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Language selection */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-850">
                <label className="text-[10px] font-bold text-zinc-400 block mb-1.5 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-brand-amber" />
                  <span>Language / اللغة</span>
                </label>
                <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setLang('fr')}
                    className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all ${
                      lang === 'fr' ? 'bg-brand-terracotta text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => setLang('ar')}
                    className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all font-arabic ${
                      lang === 'ar' ? 'bg-brand-terracotta text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    العربية
                  </button>
                </div>
              </div>

              {/* Theme selection toggle */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-850">
                <label className="text-[10px] font-bold text-zinc-400 block mb-1.5 flex items-center gap-1">
                  <Moon className="w-3 h-3 text-brand-amber" />
                  <span>Device Theme (V1/V2)</span>
                </label>
                <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setThemeState('light')}
                    className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all flex items-center justify-center gap-1 ${
                      themeState === 'light' ? 'bg-brand-navy text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Sun className="w-3 h-3" />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => setThemeState('dark')}
                    className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all flex items-center justify-center gap-1 ${
                      themeState === 'dark' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Moon className="w-3 h-3" />
                    <span>Dark</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick role toggle */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-850">
              <label className="text-[10px] font-bold text-zinc-405 block mb-1.5 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-brand-terracotta" />
                <span>Simulated Role View</span>
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                <button
                  onClick={() => {
                    setUserRole('client');
                    setCurrentScreen('client_home');
                  }}
                  className={`py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                    userRole === 'client' ? 'bg-brand-terracotta text-white shadow-xs' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  🏡 Client View
                </button>
                <button
                  onClick={() => {
                    setUserRole('worker');
                    setCurrentScreen('worker_dashboard');
                  }}
                  className={`py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                    userRole === 'worker' ? 'bg-brand-navy text-white shadow-xs' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  💼 Worker Dashboard
                </button>
              </div>
            </div>

            {/* SCREEN JUMPER PORTAL: DIRECT ACCESS TO ALL SPECIFICATION SCREENS */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-850">
              <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
                <span>Jump Directly To A Screen Spec</span>
              </h3>

              <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
                
                {/* Onboarding block */}
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 mb-1">Onboarding states</div>
                {[
                  { id: 'splash', label: '1. Splash Welcome Screen - Logo' },
                  { id: 'language_select', label: '2. Language Selection Screen' },
                  { id: 'onboarding', label: '3. Promo Onboarding Sliders' },
                  { id: 'role_select', label: '4. Role Switch Selection (Dual Card)' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentScreen(s.id as any)}
                    className={`text-left text-xs p-2 rounded-lg transition-all ${
                      currentScreen === s.id
                        ? 'bg-brand-terracotta/15 text-brand-terracotta border-l-2 border-brand-terracotta font-bold'
                        : 'bg-slate-955 hover:bg-slate-850 text-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}

                {/* Client block */}
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2.5 mb-1">Client Journey (🏡)</div>
                {[
                  { id: 'client_home', label: '5. Discovery Feed with Search grid (C1)' },
                  { id: 'category_screen', label: '6. Category Workers List (Ccatering) (C2)' },
                  { id: 'worker_profile_view', label: '7. Worker Profile Details, Ratings (C3)' },
                  { id: 'booking_screen', label: '8. Dynamic Price Booking Form (C4)' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setUserRole('client');
                      setCurrentScreen(s.id as any);
                    }}
                    className={`text-left text-xs p-2 rounded-lg transition-all ${
                      currentScreen === s.id
                        ? 'bg-brand-terracotta/15 text-brand-terracotta border-l-2 border-brand-terracotta font-bold'
                        : 'bg-slate-955 hover:bg-slate-850 text-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}

                {/* Worker block */}
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2.5 mb-1">Worker Journey (💼)</div>
                {[
                  { id: 'worker_dashboard', label: '9. Worker Billing Dashboard and Status (W1)' },
                  { id: 'worker_profile_edit', label: '10. Bio Editor, ID/Certificate Uploads (W2)' },
                  { id: 'worker_interview', label: '11. Algiers Hub Scheduler, Checklist (W3)' },
                  { id: 'worker_reviews', label: '12. Ratings aggregators & Replies (W4)' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setUserRole('worker');
                      setCurrentScreen(s.id as any);
                    }}
                    className={`text-left text-xs p-2 rounded-lg transition-all ${
                      currentScreen === s.id
                        ? 'bg-brand-navy/30 text-white border-l-2 border-indigo-400 font-bold'
                        : 'bg-slate-955 hover:bg-slate-850 text-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}

                {/* System utilities block */}
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2.5 mb-1">Visual Spec Kits</div>
                {[
                  { id: 'messages', label: '13. Live Simulated Chat threads (with replies)' },
                  { id: 'design_kit', label: '14. Component Sheet, Swatches, Stars component' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentScreen(s.id as any)}
                    className={`text-left text-xs p-2 rounded-lg transition-all ${
                      currentScreen === s.id
                        ? 'bg-brand-terracotta/15 text-brand-terracotta border-l-2 border-brand-terracotta font-bold'
                        : 'bg-slate-955 hover:bg-slate-850 text-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}

              </div>
            </div>
          </div>
        </div>

        {/* Live Active booking monitor panel */}
        <div className="mt-6 pt-4 border-t border-slate-850 text-slate-400 select-none text-xs">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
            <span>🛡️ Global Bookings Track</span>
            <span>{bookings.length} Placed</span>
          </div>

          <div className="space-y-2 max-h-[110px] overflow-y-auto no-scrollbar">
            {bookings.map((b) => (
              <div key={b.id} className="p-2 bg-slate-900 rounded-lg border border-slate-850 flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-extrabold text-white">{b.workerNameFr}</span>
                  <span className="text-[9px] block text-zinc-500 font-medium">Intervention date: {b.date}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                  b.status === 'confirmed' ? 'bg-emerald-500/10 text-brand-green' : 'bg-amber-500/10 text-brand-amber'
                }`}>
                  {b.status === 'confirmed' ? '✓ Accepted' : '● Pending approval'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CENTER INTERACTIVE DISPLAY: THE MOBILE iPHONE FRAME WITH KIN APP */}
      <div className="flex-1 flex justify-center items-center p-4 bg-slate-800 relative min-h-[820px]">
        {/* Absolute Background Graphics with Mediterranean tile texture */}
        <div className="absolute inset-0 bg-radial-at-t from-slate-700 via-slate-800 to-slate-900 opacity-60 pointer-events-none" />
        
        {/* Core Mobile device view */}
        <div className="relative z-10 scale-95 md:scale-100 transition-transform">
          <DeviceFrame
            activeScreen={currentScreen}
            lang={lang}
            themeState={themeState}
            onBack={() => {
              if (currentScreen === 'category_screen') setCurrentScreen('client_home');
              else if (currentScreen === 'worker_profile_view') setCurrentScreen('category_screen');
              else if (currentScreen === 'booking_screen') setCurrentScreen('worker_profile_view');
              else if (userRole === 'client') setCurrentScreen('client_home');
              else setCurrentScreen('worker_dashboard');
            }}
            onNavigate={(screen) => setCurrentScreen(screen)}
          >
            
            {/* SCREEN DISPATCH ROUTER */}
            {/* 1. Onboarding Module */}
            {(currentScreen === 'splash' || currentScreen === 'language_select' || currentScreen === 'onboarding' || currentScreen === 'role_select') && (
              <SplashAndOnboarding
                screen={currentScreen}
                lang={lang}
                setLang={setLang}
                onNextScreen={(next) => setCurrentScreen(next as any)}
                onSelectRole={(role) => {
                  setUserRole(role);
                  if (role === 'client') {
                    setCurrentScreen('client_home');
                  } else {
                    setCurrentScreen('worker_dashboard');
                  }
                }}
              />
            )}

            {/* 2. Client Experience journeys */}
            {(currentScreen === 'client_home' || currentScreen === 'category_screen' || currentScreen === 'worker_profile_view' || currentScreen === 'booking_screen') && (
              <ClientExperience
                screen={currentScreen}
                lang={lang}
                selectedWorker={selectedWorker}
                setSelectedWorker={setSelectedWorker}
                onNavigate={(screenVal) => setCurrentScreen(screenVal as any)}
                onAddNewBooking={handleAddNewBooking}
                themeState={themeState}
                onSimulateMessage={handleSimulateMessage}
              />
            )}

            {/* 3. Worker Dashboard screens */}
            {(currentScreen === 'worker_dashboard' || currentScreen === 'worker_profile_edit' || currentScreen === 'worker_interview' || currentScreen === 'worker_reviews') && (
              <WorkerExperience
                screen={currentScreen}
                lang={lang}
                onNavigate={(screenVal) => setCurrentScreen(screenVal as any)}
                pendingRequests={pendingRequests}
                onAcceptRequest={handleAcceptRequest}
                onDeclineRequest={handleDeclineRequest}
                themeState={themeState}
              />
            )}

            {/* 4. Communication Messaging room */}
            {currentScreen === 'messages' && (
              <ChatAndMessages
                lang={lang}
                themeState={themeState}
                currentChatThread={activeChatThread}
                setCurrentChatThread={setActiveChatThread}
                onBackToHome={() => {
                  if (userRole === 'client') setCurrentScreen('client_home');
                  else setCurrentScreen('worker_dashboard');
                }}
              />
            )}

            {/* 5. Complete specification Visual UI Design system sheet */}
            {currentScreen === 'design_kit' && (
              <VisualDesignKit lang={lang} />
            )}

            {/* Simulated Local Floating App Tab bar */}
            {currentScreen !== 'splash' && currentScreen !== 'language_select' && currentScreen !== 'onboarding' && currentScreen !== 'role_select' && (
              <div className={`absolute bottom-0 left-0 right-0 h-16 border-t ${
                themeState === 'dark' ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-zinc-200'
              } flex items-center justify-around text-center select-none z-30`}>
                
                {/* Home navigation tab */}
                <button
                  onClick={() => {
                    setActiveChatThread(null);
                    if (userRole === 'client') setCurrentScreen('client_home');
                    else setCurrentScreen('worker_dashboard');
                  }}
                  className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
                    ((currentScreen === 'client_home' || currentScreen === 'worker_dashboard') && !activeChatThread)
                      ? 'text-brand-terracotta'
                      : 'text-zinc-400 hover:text-zinc-650'
                  }`}
                >
                  <Compass className="w-5 h-5" />
                  <span className="text-[9px] mt-0.5 font-bold font-arabic">{currentCopies.home}</span>
                </button>

                {/* Sub reviews matrix/Bookings */}
                <button
                  onClick={() => {
                    if (userRole === 'client') {
                      setCurrentScreen('category_screen');
                    } else {
                      setCurrentScreen('worker_reviews');
                    }
                  }}
                  className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
                    (currentScreen === 'category_screen' || currentScreen === 'worker_reviews')
                      ? 'text-brand-terracotta'
                      : 'text-zinc-400 hover:text-zinc-650'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span className="text-[9px] mt-0.5 font-bold font-arabic">
                    {userRole === 'client' ? (isRtl ? 'بوفيه طهي' : 'Catering') : currentCopies.bookingsTab}
                  </span>
                </button>

                {/* Simulated messages rooms tab */}
                <button
                  onClick={() => {
                    setActiveChatThread(null);
                    setCurrentScreen('messages');
                  }}
                  className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
                    currentScreen === 'messages' && !activeChatThread
                      ? 'text-brand-terracotta'
                      : 'text-zinc-400 hover:text-zinc-650'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-[9px] mt-0.5 font-bold font-arabic">{currentCopies.messagesTab}</span>
                </button>

                {/* Spec sheets Design kit toggle */}
                <button
                  onClick={() => {
                    setCurrentScreen('design_kit');
                  }}
                  className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
                    currentScreen === 'design_kit'
                      ? 'text-brand-terracotta'
                      : 'text-zinc-400 hover:text-zinc-650'
                  }`}
                >
                  <Layout className="w-5 h-5" />
                  <span className="text-[9px] mt-0.5 font-bold font-arabic">{currentCopies.designKitTab}</span>
                </button>

              </div>
            )}

          </DeviceFrame>
        </div>
      </div>

    </div>
  );
}
