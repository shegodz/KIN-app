/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { WorkerProfile, COPIES, MOCK_WORKERS } from '../types';
import { Search, ShieldCheck, MapPin, Star, Calendar, MessageSquare, Phone, Bell, Check, Sparkles, SlidersHorizontal, ArrowLeft, ArrowRight, CornerDownLeft, AlertCircle } from 'lucide-react';

interface ClientExperienceProps {
  screen: 'client_home' | 'category_screen' | 'worker_profile_view' | 'booking_screen';
  lang: 'ar' | 'fr';
  selectedWorker: WorkerProfile | null;
  setSelectedWorker: (worker: WorkerProfile | null) => void;
  onNavigate: (screen: 'client_home' | 'category_screen' | 'worker_profile_view' | 'booking_screen' | 'messages') => void;
  onAddNewBooking: (booking: any) => void;
  themeState: 'light' | 'dark';
  onSimulateMessage: (worker: WorkerProfile) => void;
}

export default function ClientExperience({
  screen,
  lang,
  selectedWorker,
  setSelectedWorker,
  onNavigate,
  onAddNewBooking,
  themeState,
  onSimulateMessage
}: ClientExperienceProps) {
  const isDark = themeState === 'dark';
  const isRtl = lang === 'ar';
  const copies = COPIES[lang];

  // Specific selected category filter
  const [selectedCategory, setSelectedCategory] = useState<'catering' | 'cleaning' | 'childcare' | 'senior_care'>('catering');
  // Filters for worker list
  const [subCategoryFilter, setSubCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Booking Form States
  const [bookingDate, setBookingDate] = useState('2026-05-23');
  const [bookingTime, setBookingTime] = useState('midday');
  const [bookingDetails, setBookingDetails] = useState('');
  const [bookingAddress, setBookingAddress] = useState('14, Rue Larbi Ben M\'hidi, Alger Centre');
  const [conciergeEnabled, setConciergeEnabled] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Active call popup simulation
  const [simulatedCall, setSimulatedCall] = useState<string | null>(null);

  const categories = [
    { id: 'catering', nameFr: 'Traiteur & Buffet', nameAr: 'طباخون وبوفيه', icon: '🍽️', color: 'from-amber-500/10 to-amber-600/10 hover:border-amber-500 text-amber-700' },
    { id: 'cleaning', nameFr: 'Ménage Pro', nameAr: 'تنظيف منزلي', icon: '🧹', color: 'from-teal-500/10 to-teal-600/10 hover:border-teal-500 text-teal-700' },
    { id: 'childcare', nameFr: 'Nounou / Enfants', nameAr: 'مربية أطفال', icon: '🧸', color: 'from-rose-500/10 to-rose-600/10 hover:border-rose-500 text-rose-700' },
    { id: 'senior_care', nameFr: 'Seniors & Care', nameAr: 'رعاية المسنين', icon: '👴', color: 'from-purple-500/10 to-purple-600/10 hover:border-purple-500 text-purple-700' },
  ];

  const handleCategorySelect = (catId: any) => {
    setSelectedCategory(catId);
    onNavigate('category_screen');
  };

  // Helper to get translated names and items
  const getTranslatedCategory = (key: string) => {
    switch (key) {
      case 'catering': return copies.catering;
      case 'cleaning': return copies.cleaning;
      case 'childcare': return copies.childcare;
      case 'senior_care': return copies.seniorCare;
      default: return '';
    }
  };

  // Filter workers based on search and category
  const filteredWorkers = MOCK_WORKERS.filter(worker => {
    if (worker.category !== selectedCategory) return false;
    
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = worker.nameFr.toLowerCase().includes(q) || worker.nameAr.includes(q);
      const matchTags = worker.tagsFr.some(t => t.toLowerCase().includes(q)) || worker.tagsAr.some(t => t.includes(q));
      if (!matchName && !matchTags) return false;
    }

    return true;
  });

  // Calculate booking pricing
  const calculatePriceEstimate = () => {
    if (!selectedWorker) return 0;
    let base = selectedWorker.priceMin;
    if (selectedCategory === 'catering') {
      return base * 20; // Assume minimum starting block for 20 guests
    } else if (selectedCategory === 'cleaning') {
      return base; // Full standard day
    } else if (selectedCategory === 'childcare') {
      return base * 5; // Assumed block of 5 hours
    } else {
      return base; // Assumed standard care package
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorker) return;

    const newBooking = {
      id: 'b_' + Math.floor(Math.random() * 100000),
      workerId: selectedWorker.id,
      workerNameFr: selectedWorker.nameFr,
      workerNameAr: selectedWorker.nameAr,
      category: selectedWorker.category,
      date: bookingDate,
      timeSlotFr: bookingTime === 'morning' ? 'Matin (8h-12h)' : bookingTime === 'midday' ? 'Après-midi (13h-17h)' : 'Garde de nuit',
      timeSlotAr: bookingTime === 'morning' ? 'صباحًا (8-12)' : bookingTime === 'midday' ? 'مساءً (1-5)' : 'مرافقة ليلية',
      status: 'pending',
      priceEstimate: calculatePriceEstimate(),
      description: bookingDetails || 'Demande de service standard',
      clientAddress: bookingAddress,
      conciergeEnabled: conciergeEnabled
    };

    onAddNewBooking(newBooking);
    setBookingSuccess(true);
  };

  // SCREEN C1: CLIENT HOME SCREEN
  if (screen === 'client_home') {
    return (
      <div className={`flex flex-col flex-1 pb-16 ${isDark ? 'bg-zinc-950 text-white' : 'bg-brand-cream'}`}>
        
        {/* Navigation Indicator / Header */}
        <div className="p-4 flex justify-between items-center select-none">
          <div className="flex flex-col">
            <h4 className="text-xs text-zinc-400 font-bold">{copies.location}</h4>
            <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-brand-navy'} font-arabic mt-0.5`}>
              {copies.greeting}
            </h1>
          </div>
          <div className="relative">
            <button className={`w-10 h-10 rounded-full flex items-center justify-center border ${isDark ? 'bg-zinc-900 border-zinc-850 text-white' : 'bg-white border-zinc-200 text-brand-navy'} relative shadow-xs`}>
              <Bell className="w-5 h-5" />
              <div className="absolute top-1 right-2 w-2.5 h-2.5 bg-brand-terracotta rounded-full border border-white" />
            </button>
          </div>
        </div>

        {/* Search Header */}
        <div className="px-4 py-2">
          <div className={`relative flex items-center rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'} px-3 shadow-xs`}>
            <Search className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder={copies.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3.5 px-2 bg-transparent text-sm focus:outline-hidden"
              style={{ direction: isRtl ? 'rtl' : 'ltr' }}
            />
          </div>
        </div>

        {/* Service Core Grid (2x2) */}
        <div className="px-4 py-4">
          <h2 className={`text-base font-bold ${isDark ? 'text-zinc-200' : 'text-brand-navy'} mb-3 font-arabic flex items-center gap-2`}>
            <span>⚡</span>
            <span>{copies.allCategories}</span>
          </h2>

          <div className="grid grid-cols-2 gap-3.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`flex flex-col justify-between items-start p-4 h-[135px] rounded-2xl border bg-white ${isDark ? 'bg-zinc-900 border-zinc-800' : 'border-zinc-150'} hover:border-brand-terracotta transition-all text-start relative overflow-hidden group shadow-xs`}
              >
                <div className="text-3xl p-2 bg-zinc-50 border border-zinc-100 rounded-xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 font-arabic">
                    {lang === 'ar' ? cat.nameFr : cat.nameAr}
                  </h4>
                  <p className="text-sm font-extrabold text-brand-navy font-arabic mt-0.5 group-hover:text-brand-terracotta transition-colors">
                    {lang === 'ar' ? cat.nameAr : cat.nameFr}
                  </p>
                </div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-brand-terracotta/5 rounded-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Local Promotional Banner (Post-Eid or Ramadan Spécial) */}
        <div className="px-4 py-2">
          <div className="relative rounded-2xl bg-gradient-to-br from-brand-navy to-indigo-950 p-4 text-white overflow-hidden shadow-md">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-amber/10 rounded-full blur-xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-terracotta/10 rounded-full blur-xl animate-pulse" />
            
            <span className="px-2.5 py-0.5 bg-brand-amber text-brand-navy rounded-full text-[9px] font-bold tracking-wider uppercase inline-block mb-1.5 font-sans">
              📍 Alger / Dz Special
            </span>
            <h3 className="text-base font-extrabold leading-tight font-arabic">
              {isRtl ? '🌙 مائدة رمضان مع كين ترايتور' : '🌙 Tables de Ramadan Traiteur'}
            </h3>
            <p className="text-xs text-white/75 mt-1 leading-snug">
              {isRtl ? 'احجز طباخة تقليدية تضمن لك ألذ الأطباق الرمضانية لتستمتع مع الأهل.' : 'Réservez des cuisinières reconnues pour vos Iftars et réceptions de fêtes.'}
            </p>
          </div>
        </div>

        {/* Quick Rebook Section */}
        <div className="px-4 py-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className={`text-sm font-bold ${isDark ? 'text-zinc-200' : 'text-brand-navy'} font-arabic`}>
              {copies.rebookTitle}
            </h3>
            <span className="text-xs text-brand-terracotta font-semibold hover:underline cursor-pointer">
              {isRtl ? 'الكل' : 'Voir tout'}
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
            {MOCK_WORKERS.slice(0, 2).map((worker) => (
              <div
                key={worker.id}
                onClick={() => { setSelectedWorker(worker); onNavigate('worker_profile_view'); }}
                className={`min-w-[200px] max-w-[210px] p-3 rounded-xl border bg-white ${isDark ? 'bg-zinc-900 border-zinc-800' : 'border-zinc-150'} hover:border-brand-terracotta transition-all cursor-pointer flex items-center gap-3 shrink-0 shadow-xs`}
              >
                <div className="w-10 h-10 rounded-full bg-brand- क्रीम flex items-center justify-center text-xl shrink-0 border border-zinc-100">
                  {worker.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-brand-navy truncate">
                    {isRtl ? worker.nameAr : worker.nameFr}
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-semibold truncate mt-0.5">
                    {getTranslatedCategory(worker.category)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-brand-amber fill-brand-amber" />
                    <span className="text-[10px] font-bold text-brand-navy">{worker.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // SCREEN C2: CATEGORY SCREEN (WORKER LISTING)
  if (screen === 'category_screen') {
    return (
      <div className={`flex flex-col flex-1 pb-16 ${isDark ? 'bg-zinc-950 text-white' : 'bg-brand-cream'}`}>
        
        {/* Header bar */}
        <div className="p-4 flex items-center justify-between border-b border-zinc-200 bg-white select-none">
          <button
            onClick={() => onNavigate('client_home')}
            className="w-8 h-8 rounded-full border border-zinc-205 flex items-center justify-center text-brand-navy hover:bg-zinc-50"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </button>
          
          <h2 className="text-base font-extrabold text-brand-navy font-arabic">
            {getTranslatedCategory(selectedCategory)}
          </h2>

          <div className="w-8 h-8" /> {/* Balance spacer */}
        </div>

        {/* Horizonal pill tags */}
        <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar bg-white/50 border-b border-zinc-200/50">
          <button
            onClick={() => setSubCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
              subCategoryFilter === 'all' ? 'bg-brand-terracotta text-white' : 'bg-white border border-zinc-200 text-zinc-600'
            }`}
          >
            {isRtl ? 'الكل 🎊' : 'Tous 🎊'}
          </button>
          <button
            onClick={() => setSubCategoryFilter('vip')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
              subCategoryFilter === 'vip' ? 'bg-brand-terracotta text-white' : 'bg-white border border-zinc-200 text-zinc-600'
            }`}
          >
            {isRtl ? 'للأعراس والمناسبات 💍' : 'Mariages & Fêtes 💍'}
          </button>
          <button
            onClick={() => setSubCategoryFilter('quick')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
              subCategoryFilter === 'quick' ? 'bg-brand-terracotta text-white' : 'bg-white border border-zinc-200 text-zinc-600'
            }`}
          >
            {isRtl ? 'متاح هذا الأسبوع ⚡' : 'Disponible ⚡'}
          </button>
        </div>

        {/* Filters status header */}
        <div className="px-4 py-2.5 flex justify-between items-center bg-white/20 select-none">
          <span className="text-[11px] font-bold text-zinc-500 font-arabic">
            {filteredWorkers.length} {isRtl ? 'محترفين متوفرين في الجزائر' : 'professionnels disponibles'}
          </span>
          <button className="flex items-center gap-1 text-[11px] text-brand-terracotta font-bold hover:underline">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isRtl ? 'تصفية وتقييم' : 'Filtres'}</span>
          </button>
        </div>

        {/* Worker Profiles Vertical Feed */}
        <div className="p-4 flex flex-col gap-4.5">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              onClick={() => { setSelectedWorker(worker); onNavigate('worker_profile_view'); }}
              className="bg-white rounded-2xl p-4 border border-zinc-150 relative cursor-pointer hover:border-brand-terracotta hover:shadow-md transition-all flex flex-col gap-3 group shadow-xs"
            >
              {/* Top layer details */}
              <div className="flex gap-3">
                {/* Photo frame */}
                <div className="w-14 h-14 rounded-2xl bg-brand-cream border border-zinc-100 flex items-center justify-center text-3xl shadow-xs shrink-0 relative">
                  {worker.avatar}
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-brand-green border-2 border-white rounded-full" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-extrabold text-brand-navy truncate">
                      {isRtl ? worker.nameAr : worker.nameFr}
                    </h3>
                    {worker.isVerified && (
                      <span className="text-brand-terracotta" title={copies.verifiedBadge}>
                        <ShieldCheck className="w-4.5 h-4.5 fill-brand-terracotta/10 shrink-0" />
                      </span>
                    )}
                  </div>
                  
                  {/* Rating values */}
                  <div className="flex items-center gap-2 mt-0.5 select-none">
                    <div className="flex items-center text-brand-amber">
                      <Star className="w-3.5 h-3.5 fill-brand-amber" />
                      <span className="text-xs font-bold ml-1 text-brand-navy">{worker.rating}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-bold">•</span>
                    <span className="text-[10px] text-zinc-500 font-bold">
                      {worker.completedMissions} {copies.missions}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags layer */}
              <div className="flex flex-wrap gap-1.5">
                {(isRtl ? worker.tagsAr : worker.tagsFr).slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-[10px] bg-brand-cream border border-zinc-100 font-bold text-brand-navy px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price list and button footer */}
              <div className="flex justify-between items-center pt-2.5 border-t border-zinc-100 select-none">
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold">
                    {isRtl ? 'يبدأ من' : 'À partir de'}
                  </span>
                  <p className="text-sm font-extrabold text-brand-terracotta">
                    {worker.priceMin} DA <span className="text-[10px] text-zinc-500 font-medium">/ {isRtl ? worker.priceUnitAr : worker.priceUnitFr}</span>
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedWorker(worker);
                    onNavigate('worker_profile_view');
                  }}
                  className="px-4 py-2 bg-brand-navy text-white text-xs font-bold rounded-xl group-hover:bg-brand-terracotta transition-colors shadow-xs"
                >
                  {isRtl ? 'عرض الملف' : 'Voir Profil'}
                </button>
              </div>
            </div>
          ))}

          {filteredWorkers.length === 0 && (
            <div className="text-center py-10 px-4">
              <span className="text-4xl">🔍</span>
              <h3 className="text-sm font-bold text-brand-navy mt-4">Aucun prestataire disponible</h3>
              <p className="text-xs text-zinc-500 mt-2">Essayez de modifier votre filtre ou d'élargir votre recherche.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // SCREEN C3: WORKER PROFILE SCREEN
  if (screen === 'worker_profile_view') {
    if (!selectedWorker) return <div className="p-4 text-center">No worker selected</div>;

    return (
      <div className={`flex flex-col flex-1 pb-20 select-none ${isDark ? 'bg-zinc-950 text-white' : 'bg-brand-cream'}`}>
        
        {/* Navigation Overlaid Header */}
        <div className="p-4 flex items-center justify-between border-b border-zinc-200 bg-white">
          <button
            onClick={() => onNavigate('category_screen')}
            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-brand-navy hover:bg-zinc-50"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </button>
          
          <span className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest">
            {isRtl ? 'ملف مهني موثق' : 'Profil vérifié KIN'}
          </span>

          <div className="w-8 h-8" />
        </div>

        {/* Profile Card Hero background */}
        <div className="p-4 bg-white border-b border-zinc-150">
          <div className="flex flex-col items-center text-center">
            {/* Avatar block */}
            <div className="w-20 h-20 rounded-full bg-brand-cream border-2 border-brand-terracotta flex items-center justify-center text-5xl shadow-md relative">
              {selectedWorker.avatar}
              <div className="absolute -bottom-1 right-1 bg-brand-terracotta text-white rounded-full p-1 border border-white">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
            </div>

            {/* Title & Verified pill */}
            <h1 className="text-xl font-extrabold text-brand-navy font-arabic mt-3">
              {isRtl ? selectedWorker.nameAr : selectedWorker.nameFr}
            </h1>

            {/* Category tag */}
            <span className="inline-block px-3 py-1 bg-brand-navy/5 text-brand-navy rounded-full text-xs font-bold mt-1 shadow-xs">
              {getTranslatedCategory(selectedWorker.category)}
            </span>

            {/* Quick reviews Aggregate rating */}
            <div className="flex items-center gap-1.5 mt-2 text-sm font-bold">
              <Star className="w-4.5 h-4.5 fill-brand-amber text-brand-amber" />
              <span className="text-brand-navy">{selectedWorker.rating}</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-500">{selectedWorker.reviewCount} {isRtl ? 'آراء العملاء' : 'Consultations'}</span>
            </div>
          </div>
        </div>

        {/* Quick horizontal stats row */}
        <div className="grid grid-cols-3 gap-2 px-4 py-3 border-b border-zinc-150 bg-white/40">
          <div className="p-2.5 rounded-xl bg-white border border-zinc-100 text-center flex flex-col items-center shadow-xs">
            <span className="text-base text-brand-terracotta">🧾</span>
            <span className="text-xs font-extrabold text-brand-navy mt-1">{selectedWorker.completedMissions}</span>
            <span className="text-[9px] text-zinc-400 font-bold leading-tight">{isRtl ? 'مهمة ناجحة' : 'Missions'}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-zinc-100 text-center flex flex-col items-center shadow-xs">
            <span className="text-base text-brand-terracotta">📅</span>
            <span className="text-xs font-extrabold text-brand-navy mt-1">{selectedWorker.experienceYears} {isRtl ? 'سنوات' : 'ans'}</span>
            <span className="text-[9px] text-zinc-400 font-bold leading-tight">{isRtl ? 'خبرة عمل' : 'Expérience'}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-zinc-100 text-center flex flex-col items-center shadow-xs">
            <span className="text-base text-brand-terracotta">⚡</span>
            <span className="text-xs font-extrabold text-brand-navy mt-1" style={{ fontSize: '10px' }}>
              {isRtl ? selectedWorker.responseTimeAr : selectedWorker.responseTimeFr}
            </span>
            <span className="text-[9px] text-zinc-400 font-bold leading-tight">{isRtl ? 'يجيب خلال' : 'Réponse'}</span>
          </div>
        </div>

        {/* Inner Content panels */}
        <div className="p-4 flex flex-col gap-4">
          
          {/* About Me bio box */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-150 shadow-xs">
            <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider mb-2">
              {copies.aboutMe}
            </h3>
            <p className="text-xs text-brand-navy/85 leading-relaxed font-arabic font-medium">
              {isRtl ? selectedWorker.bioAr : selectedWorker.bioFr}
            </p>
          </div>

          {/* Sub services tags */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-150 shadow-xs">
            <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider mb-2">
              {copies.servicesOffered}
            </h3>
            <div className="flex flex-col gap-2.5">
              {(isRtl ? selectedWorker.tagsAr : selectedWorker.tagsFr).map((tag, i) => (
                <div key={i} className="flex justify-between items-center text-xs pb-2.5 border-b border-zinc-100 last:pb-0 last:border-0">
                  <span className="font-extrabold text-brand-navy font-arabic">{tag}</span>
                  <span className="font-bold text-brand-terracotta">
                    {selectedCategory === 'catering' ? `+${selectedWorker.priceMin} DA / ${isRtl ? selectedWorker.priceUnitAr : selectedWorker.priceUnitFr}` : `${selectedWorker.priceMin} DA`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Calendar */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-150 shadow-xs">
            <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider mb-2">
              {copies.availability}
            </h3>
            <div className="flex justify-between gap-1 select-none">
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, idx) => {
                const isAvail = selectedWorker.availableDays.includes(idx);
                return (
                  <div
                    key={idx}
                    className={`w-9 h-9 rounded-full flex flex-col items-center justify-center border font-bold text-xs relative ${
                      isAvail ? 'bg-orange-50 border-brand-terracotta text-brand-terracotta' : 'bg-zinc-50 border-zinc-100 text-zinc-350'
                    }`}
                  >
                    <span>{day}</span>
                    {isAvail && <div className="absolute bottom-1 w-1 h-1 bg-brand-terracotta rounded-full" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gallery Work realization Photos */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-150 shadow-xs">
            <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider mb-2">
              {isRtl ? 'معرض الأعمال السابقة في الجزائر 📸' : 'Galerie réalisations Algérie 📸'}
            </h3>
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
              {selectedWorker.photos.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Savoir-faire ${i + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-lg object-cover shrink-0 border border-zinc-100"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Simulated Call popup alerts */}
        {simulatedCall && (
          <div className="absolute bottom-20 left-4 right-4 bg-brand-navy text-white rounded-xl p-4 shadow-xl z-50 border border-brand-amber/30 animate-scale-up">
            <div className="flex items-start gap-3">
              <span className="text-2xl animate-bounce">📞</span>
              <div className="flex-1">
                <h4 className="text-xs font-extrabold text-brand-amber text-left">{isRtl ? 'اتصال مباشر مؤمن' : 'Appel sécurisé KIN'}</h4>
                <p className="text-xs mt-1 text-left">
                  {isRtl ? `طلب اتصال مجاني للرقم: +213 (0) ` : 'Simulation d\'appel en cours vers le numéro d\'un agent :'}
                  <span className="font-mono text-brand-amber font-bold ml-1">0550 XX XX XX</span>
                </p>
                <div className="flex gap-3 mt-3">
                  <a href="tel:+213550000000" className="px-3 py-1.5 bg-brand-green border border-emerald-500 rounded-lg text-[10px] font-bold text-white hover:bg-emerald-600 transition-colors">
                    {isRtl ? 'اتصل الآن' : 'Composer'}
                  </a>
                  <button onClick={() => setSimulatedCall(null)} className="px-3 py-1.5 bg-white/10 rounded-lg text-[10px] font-bold text-white hover:bg-white/20">
                    {isRtl ? 'إغلاق' : 'Fermer'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sticky Bottom Action Navigation bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-zinc-200 px-4 flex items-center justify-between gap-2.5 z-40">
          <button
            onClick={() => setSimulatedCall(selectedWorker.nameFr)}
            className="w-12 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors shrink-0"
            title={copies.call}
          >
            <Phone className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onSimulateMessage(selectedWorker)}
            className="w-12 h-11 rounded-xl bg-orange-50 border border-brand-terracotta/20 text-brand-terracotta flex items-center justify-center hover:bg-orange-100 transition-colors shrink-0"
            title={copies.chat}
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onNavigate('booking_screen')}
            className="flex-1 h-11 bg-brand-terracotta text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-terracotta/95 shadow-md active:scale-98 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>{copies.bookNow}</span>
          </button>
        </div>

      </div>
    );
  }

  // SCREEN C4: BOOKING / CONTACT SCREEN
  if (screen === 'booking_screen') {
    if (!selectedWorker) return <div className="p-4 text-center">No worker selected</div>;

    return (
      <div className={`flex flex-col flex-1 pb-16 select-none ${isDark ? 'bg-zinc-950 text-white' : 'bg-brand-cream'}`}>
        
        {/* Navigation header */}
        <div className="p-4 flex items-center justify-between border-b border-zinc-200 bg-white">
          <button
            onClick={() => onNavigate('worker_profile_view')}
            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-brand-navy hover:bg-zinc-50"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </button>
          
          <h2 className="text-sm font-extrabold text-brand-navy font-arabic">
            {copies.bookingTitle}
          </h2>

          <div className="w-8 h-8" />
        </div>

        {bookingSuccess ? (
          // SENSATIONAL ANIMATED SUCCESS SCREEN
          <div className="p-6 text-center my-auto flex flex-col items-center animate-scale-up">
            <div className="w-16 h-16 bg-brand-green text-white rounded-full flex items-center justify-center text-3xl shadow-lg border-2 border-white mb-4 animate-pulse">
              ✓
            </div>
            <h1 className="text-xl font-extrabold text-brand-navy font-arabic">
              {copies.bookingSuccess}
            </h1>
            <p className="text-xs text-zinc-500 mt-3 leading-relaxed max-w-xs font-arabic">
              {copies.bookingSuccessDesc}
            </p>
            <div className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 mt-6 text-start flex flex-col gap-2 shadow-xs">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400 font-bold">{isRtl ? 'المحترف' : 'Prestataire'}:</span>
                <span className="text-brand-navy font-extrabold">{isRtl ? selectedWorker.nameAr : selectedWorker.nameFr}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400 font-bold">{isRtl ? 'التاريخ' : 'Date d\'intervention'}:</span>
                <span className="text-brand-navy font-extrabold">{bookingDate}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400 font-bold">{isRtl ? 'التقدير الأولي' : 'Prix Estimatif'}:</span>
                <span className="text-brand-terracotta font-extrabold">{calculatePriceEstimate()} DA</span>
              </div>
            </div>

            <button
              onClick={() => {
                setBookingSuccess(false);
                setBookingDetails('');
                onNavigate('client_home');
              }}
              className="mt-8 px-6 py-3 bg-brand-navy text-white rounded-xl font-bold text-xs shadow-md hover:bg-brand-navy/90 transition-all"
            >
              {isRtl ? 'العودة للرئيسية' : 'Retour à l\'accueil'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmBooking} className="p-4 flex flex-col gap-4.5">
            
            {/* Worker Summary mini block */}
            <div className="bg-white p-3.5 rounded-xl border border-zinc-150 flex items-center gap-3 shadow-xs">
              <div className="w-11 h-11 rounded-full bg-brand-cream border border-zinc-100 flex items-center justify-center text-3xl shrink-0">
                {selectedWorker.avatar}
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-450">{isRtl ? 'حجزك مع الشريك' : 'Votre réservation avec'}</h4>
                <p className="text-sm font-extrabold text-brand-navy mt-0.5">
                  {isRtl ? selectedWorker.nameAr : selectedWorker.nameFr}
                </p>
              </div>
            </div>

            {/* Date & Time Input Row */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-150 shadow-xs flex flex-col gap-3">
              <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider">
                {copies.selectDate}
              </h3>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-zinc-500">{isRtl ? 'اختر اليوم' : 'Date'}</label>
                <div className="relative">
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-brand-cream border border-zinc-150 rounded-xl px-3 py-2 text-xs font-bold text-brand-navy focus:outline-none"
                  />
                </div>
              </div>

              {/* Time slots chips */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-zinc-500">{isRtl ? 'الفترة المفضلة' : 'Moment de la journée'}</label>
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  {[
                    { id: 'morning', labelFr: 'Matin', labelAr: 'صباحاً' },
                    { id: 'midday', labelFr: 'Après-midi', labelAr: 'ظهراً' },
                    { id: 'night', labelFr: 'Soirée', labelAr: 'مساءً' },
                  ].map((slot) => (
                    <button
                      type="button"
                      key={slot.id}
                      onClick={() => setBookingTime(slot.id)}
                      className={`py-2 rounded-xl border text-[10px] font-bold transition-all ${
                        bookingTime === slot.id
                          ? 'bg-brand-terracotta border-brand-terracotta text-white shadow-xs'
                          : 'bg-white border-zinc-150 text-brand-navy hover:bg-zinc-50'
                      }`}
                    >
                      {isRtl ? slot.labelAr : slot.labelFr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Large text area details instruction */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-150 shadow-xs flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider">
                  {copies.describeNeed}
                </h3>
                <span className="text-[9px] text-zinc-400 font-mono">{bookingDetails.length}/180</span>
              </div>
              <textarea
                rows={3}
                maxLength={180}
                placeholder={copies.describePlaceholder}
                value={bookingDetails}
                onChange={(e) => setBookingDetails(e.target.value)}
                className="w-full p-3 bg-brand-cream border border-zinc-150 rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-terracotta"
                style={{ direction: isRtl ? 'rtl' : 'ltr' }}
              />
            </div>

            {/* Address input confirmation */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-150 shadow-xs flex flex-col gap-2">
              <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider">
                {copies.clientAddressLabel}
              </h3>
              <div className="flex items-center gap-2 bg-brand-cream border border-zinc-150 rounded-xl px-2">
                <MapPin className="w-4 h-4 text-brand-terracotta shrink-0" />
                <input
                  type="text"
                  value={bookingAddress}
                  onChange={(e) => setBookingAddress(e.target.value)}
                  className="w-full py-2.5 bg-transparent text-xs text-brand-navy font-bold focus:outline-none"
                  style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                />
              </div>
            </div>

            {/* KIN premium Concierge protection Toggle */}
            <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-brand-amber/30 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-brand-amber text-brand-navy flex items-center justify-center text-xs font-bold font-mono mt-0.5">
                i
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-extrabold text-brand-navy font-arabic leading-none">
                    {copies.conciergeLabel}
                  </h4>
                  <input
                    type="checkbox"
                    checked={conciergeEnabled}
                    onChange={(e) => setConciergeEnabled(e.target.checked)}
                    className="w-4 h-4 text-brand-terracotta rounded-sm focus:ring-brand-terracotta accent-brand-terracotta"
                  />
                </div>
                <p className="text-[9px] text-zinc-500 mt-1.5 leading-relaxed font-arabic">
                  {copies.conciergeDesc}
                </p>
              </div>
            </div>

            {/* Pricing details and final sum CTA */}
            <div className="bg-brand-navy text-white p-4 rounded-2xl flex justify-between items-center mb-4 shadow-md">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/60 font-medium">
                  {copies.priceEstimateLabel}
                </span>
                <p className="text-lg font-extrabold text-brand-amber font-mono">
                  {calculatePriceEstimate()} DA
                </p>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-terracotta text-white text-xs font-extrabold rounded-xl hover:bg-brand-terracotta/90 transition-transform active:scale-95 shadow-md flex items-center gap-1.5 font-arabic"
              >
                <span>{copies.sendRequest}</span>
              </button>
            </div>

          </form>
        )}
      </div>
    );
  }

  return null;
}
