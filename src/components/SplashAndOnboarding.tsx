/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { COPIES } from '../types';
import { ShieldCheck, Sparkles, Check, ChevronRight, Compass } from 'lucide-react';

interface SplashAndOnboardingProps {
  screen: 'splash' | 'language_select' | 'onboarding' | 'role_select';
  lang: 'ar' | 'fr';
  setLang: (l: 'ar' | 'fr') => void;
  onNextScreen: (nextScreen: string) => void;
  onSelectRole: (role: 'client' | 'worker') => void;
}

export default function SplashAndOnboarding({
  screen,
  lang,
  setLang,
  onNextScreen,
  onSelectRole
}: SplashAndOnboardingProps) {
  const isRtl = lang === 'ar';
  const copies = COPIES[lang];
  const [activeSlide, setActiveSlide] = useState(0);

  // Splash Screen rendering
  if (screen === 'splash') {
    return (
      <div className="flex flex-col items-center justify-between h-full py-16 px-6 bg-brand-cream animate-fade-in text-center select-none">
        <div />
        {/* Animated Brand Identity */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-brand-terracotta rounded-3xl shadow-lg flex items-center justify-center text-white text-4.5xl font-extrabold font-arabic border-2 border-brand-amber">
            ك
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-brand-navy font-arabic">
            KIN <span className="text-brand-terracotta text-3xl">كين</span>
          </h1>
          <div className="h-[2px] w-12 bg-brand-terracotta rounded-full" />
          <p className="text-sm font-medium text-brand-navy/80 tracking-wide">
            {COPIES.ar.tagline} <span className="text-zinc-300">|</span> {COPIES.fr.tagline}
          </p>
        </div>

        {/* Localized loading and region information */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-brand-navy/5 rounded-full text-[11px] text-brand-navy/75 font-semibold">
            <span>🇩🇿</span>
            <span>بكل فخر في الجزائر / Fait pour l'Algérie</span>
          </div>
          <button
            onClick={() => onNextScreen('language_select')}
            className="w-56 py-3 bg-brand-terracotta text-white rounded-full font-bold shadow-md hover:bg-brand-terracotta/90 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span>ابدأ / Commencer</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Language Selection Screen
  if (screen === 'language_select') {
    return (
      <div className="flex flex-col justify-between h-full p-6 bg-brand-cream">
        <div className="mt-8 text-center">
          <span className="text-3xl text-brand-terracotta font-bold">ك</span>
          <h2 className="text-2xl font-bold text-brand-navy mt-4 font-arabic">
            {copies.selectLanguage}
          </h2>
          <p className="text-xs text-brand-navy/60 mt-2">
            يمكنك دائماً تغيير لغة التطبيق لاحقاً من الإعدادات
          </p>
        </div>

        {/* Big stacked custom language choice options */}
        <div className="flex flex-col gap-4 my-auto">
          {/* Arabic Option */}
          <button
            onClick={() => setLang('ar')}
            className={`w-full p-5 rounded-2xl border-2 text-right transition-all flex items-center justify-between ${
              lang === 'ar'
                ? 'border-brand-terracotta bg-white shadow-md'
                : 'border-brand-navy/15 bg-white/60 hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {lang === 'ar' && (
                <div className="w-6 h-6 rounded-full bg-brand-terracotta text-white flex items-center justify-center p-0.5">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>
            <div>
              <p className="font-arabic font-bold text-lg text-brand-navy">العربية (الديرجة)</p>
              <p className="text-xs text-brand-navy/55 font-semibold font-arabic">طباخين، منظفين ومربيات موثقين في الجزائر</p>
            </div>
          </button>

          {/* French Option */}
          <button
            onClick={() => setLang('fr')}
            className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
              lang === 'fr'
                ? 'border-brand-terracotta bg-white shadow-md'
                : 'border-brand-navy/15 bg-white/60 hover:bg-white'
            }`}
            style={{ direction: 'ltr' }}
          >
            <div>
              <p className="font-sans font-bold text-lg text-brand-navy">Français (DZ)</p>
              <p className="text-xs text-brand-navy/55">Traiteurs, ménage, et nounous qualifiés.</p>
            </div>
            <div className="flex items-center gap-3">
              {lang === 'fr' && (
                <div className="w-6 h-6 rounded-full bg-brand-terracotta text-white flex items-center justify-center p-0.5">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>
          </button>
        </div>

        <button
          onClick={() => onNextScreen('onboarding')}
          className="w-full py-4 bg-brand-navy text-white rounded-xl font-bold hover:bg-brand-navy/90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg mb-2"
        >
          <span className="font-arabic">{copies.continue}</span>
          <ChevronRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
        </button>
      </div>
    );
  }

  // Swipeable Onboarding Slider
  if (screen === 'onboarding') {
    const slides = [
      {
        title: copies.ob1Title,
        desc: copies.ob1Desc,
        themeColor: 'from-amber-100 to-orange-100',
        content: (
          <div className="relative w-full h-44 flex items-center justify-center">
            {/* Custom Interactive SVG Art for Services */}
            <div className="grid grid-cols-2 gap-4 w-52">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-center border border-brand-navy/5">
                <span className="text-3xl">👩‍🍳</span>
                <p className="text-[10px] font-bold text-brand-navy mt-1">Traiteur</p>
              </div>
              <div className="p-3 bg-white rounded-2xl shadow-sm text-center border border-brand-navy/5">
                <span className="text-3xl">🧹</span>
                <p className="text-[10px] font-bold text-brand-navy mt-1">Ménage</p>
              </div>
              <div className="p-3 bg-white rounded-2xl shadow-sm text-center border border-brand-navy/5">
                <span className="text-3xl">🧸</span>
                <p className="text-[10px] font-bold text-brand-navy mt-1">Nounou</p>
              </div>
              <div className="p-3 bg-white rounded-2xl shadow-sm text-center border border-brand-navy/5">
                <span className="text-3xl">👴</span>
                <p className="text-[10px] font-bold text-brand-navy mt-1">Seniors</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: copies.ob2Title,
        desc: copies.ob2Desc,
        themeColor: 'from-blue-100 to-indigo-100',
        content: (
          <div className="relative w-full h-44 flex flex-col items-center justify-center">
            {/* Visual badge Representation */}
            <div className="relative p-6 bg-white rounded-3xl shadow-md border-2 border-brand-terracotta flex flex-col items-center text-center max-w-[200px]">
              <div className="absolute -top-5 w-10 h-10 bg-brand-navy text-brand-amber rounded-full flex items-center justify-center shadow-lg border border-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-brand-navy mt-2">Karim Brahimi</p>
              <p className="text-[10px] text-zinc-500 font-medium">Alger Centre</p>
              <div className="flex gap-1 my-1">
                {'★'.repeat(5).split('').map((s, i) => (
                  <span key={i} className="text-brand-amber text-xs">★</span>
                ))}
              </div>
              <span className="inline-block mt-1 px-2.5 py-0.5 bg-zinc-100 rounded-full text-[9px] font-bold text-brand-terracotta">
                ✓ Verified Agent
              </span>
            </div>
          </div>
        )
      },
      {
        title: copies.ob3Title,
        desc: copies.ob3Desc,
        themeColor: 'from-orange-100 to-rose-100',
        content: (
          <div className="relative w-full h-44 flex items-center justify-center">
            {/* Simple simulated actions inside app */}
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-brand-navy/5 max-w-[210px] w-full flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-brand-terracotta rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <div className="flex-1 h-3 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="w-1/3 bg-brand-terracotta h-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-brand-terracotta rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <div className="flex-1 h-3 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="w-2/3 bg-brand-terracotta h-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-brand-green text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                <span className="text-[10px] font-bold text-brand-green">Booking Placed!</span>
              </div>
            </div>
          </div>
        )
      }
    ];

    const handleNext = () => {
      if (activeSlide < slides.length - 1) {
        setActiveSlide(activeSlide + 1);
      } else {
        onNextScreen('role_select');
      }
    };

    return (
      <div className="flex flex-col justify-between h-full p-6 bg-brand-cream">
        {/* Top Header Buttons */}
        <div className="flex justify-between items-center text-xs mt-2">
          <span className="font-bold text-brand-navy/50">
            {activeSlide + 1} / {slides.length}
          </span>
          <button
            onClick={() => onNextScreen('role_select')}
            className="hover:text-brand-terracotta font-bold text-brand-navy/70 transition-colors"
          >
            {copies.skip}
          </button>
        </div>

        {/* Dynamic Slide Background with Graphics */}
        <div className="my-auto py-4">
          <div className="flex justify-center mb-6">
            {slides[activeSlide].content}
          </div>

          <div className="text-center px-2">
            <h3 className="text-xl font-bold text-brand-navy tracking-tight">
              {slides[activeSlide].title}
            </h3>
            <p className="text-xs text-brand-navy/60 mt-3 leading-relaxed max-w-xs mx-auto">
              {slides[activeSlide].desc}
            </p>
          </div>
        </div>

        {/* Footer Area with Dots and CTA */}
        <div className="flex flex-col gap-4 mt-auto">
          {/* Pagination Indicators */}
          <div className="flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === i ? 'w-6 bg-brand-terracotta' : 'w-2 bg-zinc-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3 bg-brand-terracotta text-white rounded-xl font-bold hover:bg-brand-terracotta/90 flex items-center justify-center gap-2 shadow-md"
          >
            <span>{activeSlide === slides.length - 1 ? copies.getStarted : copies.next}</span>
            <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    );
  }

  // Dual Role Selector Screen (Client or Worker)
  if (screen === 'role_select') {
    return (
      <div className="flex flex-col justify-between h-full p-6 bg-brand-cream">
        {/* Title */}
        <div className="mt-4 text-center">
          <span className="text-3xl text-brand-terracotta font-extrabold">ك</span>
          <h2 className="text-xl font-bold text-brand-navy mt-3 font-arabic">
            {copies.chooseRoleTitle}
          </h2>
          <p className="text-xs text-brand-navy/60 mt-1">
            {copies.chooseRoleSub}
          </p>
        </div>

        {/* Option cards */}
        <div className="flex flex-col gap-4 my-auto">
          {/* Choice: Client */}
          <button
            onClick={() => onSelectRole('client')}
            className="w-full text-start p-5 rounded-2xl bg-white border border-brand-navy/10 hover:border-brand-terracotta hover:shadow-lg transition-all flex items-start gap-4 ring-offset-2 hover:ring-2 hover:ring-brand-terracotta/20"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl shrink-0 mt-0.5">
              🏡
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-brand-navy font-arabic">
                {copies.roleClientTitle}
              </h4>
              <p className="text-xs text-brand-navy/60 mt-1 leading-snug">
                {copies.roleClientDesc}
              </p>
            </div>
          </button>

          {/* Separator */}
          <div className="flex items-center justify-center gap-3 py-1">
            <div className="h-[1px] bg-zinc-250 flex-1"></div>
            <span className="text-[10px] font-bold text-zinc-400 font-arabic">أو / OU</span>
            <div className="h-[1px] bg-zinc-250 flex-1"></div>
          </div>

          {/* Choice: Worker */}
          <button
            onClick={() => onSelectRole('worker')}
            className="w-full text-start p-5 rounded-2xl bg-white border border-brand-navy/10 hover:border-brand-navy hover:shadow-lg transition-all flex items-start gap-4 ring-offset-2 hover:ring-2 hover:ring-brand-navy/20"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl shrink-0 mt-0.5">
              💼
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-brand-navy font-arabic">
                {copies.roleWorkerTitle}
              </h4>
              <p className="text-xs text-brand-navy/60 mt-1 leading-snug">
                {copies.roleWorkerDesc}
              </p>
            </div>
          </button>
        </div>

        {/* Back Link */}
        <button
          onClick={() => onNextScreen('language_select')}
          className="text-xs font-bold text-zinc-500 hover:text-brand-navy mb-2 text-center"
        >
          {copies.back}
        </button>
      </div>
    );
  }

  return null;
}
