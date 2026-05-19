/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, ShieldCheck, Check, Info, Bell, Phone, CheckCheck } from 'lucide-react';

interface VisualDesignKitProps {
  lang: 'ar' | 'fr';
}

export default function VisualDesignKit({ lang }: VisualDesignKitProps) {
  const isRtl = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'colors' | 'typo' | 'buttons' | 'chips'>('colors');
  const [testRating, setTestRating] = useState(4);

  return (
    <div className="flex flex-col flex-1 pb-16 bg-brand-cream text-brand-navy select-none">
      {/* Header banner */}
      <div className="p-4 bg-white border-b border-zinc-200 text-center flex flex-col items-center">
        <span className="w-9 h-9 bg-brand-terracotta text-white rounded-xl flex items-center justify-center text-lg font-bold">🎨</span>
        <h2 className="text-base font-extrabold text-brand-navy mt-1.5 font-arabic">
          {isRtl ? 'دليل تصميم كين (Component Sheet)' : 'KIn Design System & UI Kit'}
        </h2>
        <p className="text-[10px] text-zinc-400 mt-1">Design Specifications & Interactive Elements</p>
      </div>

      {/* Internal Tab controller */}
      <div className="flex border-b border-zinc-200 bg-white/55 text-center text-[10px] font-bold">
        {[
          { id: 'colors', labelFr: 'Colors', labelAr: 'الألوان' },
          { id: 'typo', labelFr: 'Typo Scale', labelAr: 'الخطوط' },
          { id: 'buttons', labelFr: 'Buttons', labelAr: 'الأزرار' },
          { id: 'chips', labelFr: 'Badges', labelAr: 'الشارات' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-brand-terracotta text-brand-terracotta bg-white font-bold'
                : 'border-transparent text-zinc-500 hover:text-brand-navy'
            }`}
          >
            {isRtl ? tab.labelAr : tab.labelFr}
          </button>
        ))}
      </div>

      <div className="p-4 flex flex-col gap-4">

        {/* TAB 1: COLORS */}
        {activeTab === 'colors' && (
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest mb-1">
              Brand Swatches
            </h3>
            
            {/* Color Terracotta */}
            <div className="bg-white p-3 rounded-xl border border-zinc-150 flex gap-3.5 items-center">
              <div className="w-12 h-12 rounded-xl bg-[#E8593C] border border-white shrink-0 shadow-xs" />
              <div>
                <p className="text-xs font-extrabold text-brand-navy font-mono">#E8593C (Terracotta)</p>
                <p className="text-[9px] text-zinc-400 mt-0.5">Primary. Warm North African earth. CTAs and key highlights.</p>
              </div>
            </div>

            {/* Color Navy */}
            <div className="bg-white p-3 rounded-xl border border-zinc-150 flex gap-3.5 items-center">
              <div className="w-12 h-12 rounded-xl bg-[#1C2B4A] border border-white shrink-0 shadow-xs" />
              <div>
                <p className="text-xs font-extrabold text-brand-navy font-mono">#1C2B4A (Deep Navy)</p>
                <p className="text-[9px] text-zinc-400 mt-0.5">Secondary. Imparts extreme trust, background anchors.</p>
              </div>
            </div>

            {/* Color Amber */}
            <div className="bg-white p-3 rounded-xl border border-zinc-150 flex gap-3.5 items-center">
              <div className="w-12 h-12 rounded-xl bg-[#F9CB42] border border-white shrink-0 shadow-xs" />
              <div>
                <p className="text-xs font-extrabold text-brand-navy font-mono">#F9CB42 (Amber Yellow)</p>
                <p className="text-[9px] text-zinc-400 mt-0.5">Accent. Rating stars, highlight tags, moments of joy.</p>
              </div>
            </div>

            {/* Color Cream */}
            <div className="bg-white p-3 rounded-xl border border-zinc-150 flex gap-3.5 items-center">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-zinc-250 shrink-0 shadow-xs" />
              <div>
                <p className="text-xs font-extrabold text-brand-navy font-mono">#FAF8F5 (Warm Cream)</p>
                <p className="text-[9px] text-zinc-400 mt-0.5">Background layer. Soft off-whites, feels like sunlight hit.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TYPOGRAPHY SCALE */}
        {activeTab === 'typo' && (
          <div className="bg-white p-4 rounded-xl border border-zinc-150 flex flex-col gap-4">
            <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest mb-1">
              Font Scale Pairing
            </h3>

            <div className="pb-3 border-b border-zinc-100">
              <span className="text-[9px] text-zinc-400 font-bold block mb-1">H1 / Main Title - 24px Bold</span>
              <h1 className="text-2xl font-extrabold text-brand-navy font-arabic">
                منزلك، ثقتك الأصيلة
              </h1>
              <h2 className="text-xl font-bold text-brand-navy mt-1">
                La confiance de KIN
              </h2>
            </div>

            <div className="pb-3 border-b border-zinc-100">
              <span className="text-[9px] text-zinc-400 font-bold block mb-1">H2 / Sub Title - 18px Semi-Bold</span>
              <h3 className="text-lg font-bold text-brand-navy font-arabic">
                طباخين متميزين وموثقين
              </h3>
              <h4 className="text-base font-semibold text-brand-navy">
                Traiteurs certifiés par KIN
              </h4>
            </div>

            <div>
              <span className="text-[9px] text-zinc-400 font-bold block mb-1">Body / Regular - 13px</span>
              <p className="text-xs text-zinc-650 leading-relaxed font-arabic">
                المقابلة الودية الشخصية تجعلك تظهر أولاً في نتائج البحث وتمنحك ثقة كاملة مع العائلات الجزائرية الكريمة.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: BUTTONS STATES */}
        {activeTab === 'buttons' && (
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest mb-1">
              Interactable Buttons
            </h3>

            {/* Primary Terracotta button */}
            <div className="bg-white p-4 rounded-xl border border-zinc-150 flex flex-col gap-2">
              <span className="text-[9px] text-zinc-400 font-bold">CTA Solid Terracotta (State: Normal)</span>
              <button className="w-full py-3 bg-brand-terracotta text-white font-bold text-xs rounded-xl shadow-xs">
                {isRtl ? 'حفظ الحجز الآن' : 'Réserver la session'}
              </button>
            </div>

            {/* Primary Navy button */}
            <div className="bg-white p-4 rounded-xl border border-zinc-150 flex flex-col gap-2">
              <span className="text-[9px] text-zinc-400 font-bold">CTA Navy Alternate (State: Normal)</span>
              <button className="w-full py-3 bg-brand-navy text-white font-bold text-xs rounded-xl shadow-xs">
                {isRtl ? 'الصفحة الشخصية' : 'Valider Profil'}
              </button>
            </div>

            {/* Outlined button */}
            <div className="bg-white p-4 rounded-xl border border-zinc-150 flex flex-col gap-2">
              <span className="text-[9px] text-zinc-400 font-bold">Border Outline Button</span>
              <button className="w-full py-2.5 border border-brand-terracotta text-brand-terracotta hover:bg-orange-50/20 font-bold text-xs rounded-xl">
                {isRtl ? 'عرض المزيد من التفاصيل' : 'En savoir plus'}
              </button>
            </div>

            {/* Green Success button */}
            <div className="bg-white p-4 rounded-xl border border-zinc-150 flex flex-col gap-2">
              <span className="text-[9px] text-zinc-400 font-bold">Success Green Badge CTA</span>
              <button className="w-full py-2.5 bg-brand-green text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1">
                <CheckCheck className="w-4 h-4" />
                <span>{isRtl ? 'تأكيد وقبول الطلب' : 'Accepter l\'Intervention'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: CHIPS, BADGES, AND STAR CONTROLLER */}
        {activeTab === 'chips' && (
          <div className="flex flex-col gap-4">
            {/* Interactive Stars Component */}
            <div className="bg-white p-4 rounded-xl border border-zinc-150 flex flex-col gap-2">
              <span className="text-[9px] text-zinc-400 font-bold">Interactive Rating Component (Tap to Rate)</span>
              <div className="flex gap-2 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setTestRating(star)}
                    className="p-1 hover:scale-12 w-8 h-8 flex items-center justify-center rounded-full bg-orange-50"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= testRating ? 'fill-brand-amber text-brand-amber' : 'text-zinc-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-brand-navy px-2">{testRating}.0 Stars</span>
              </div>
            </div>

            {/* Badges layout */}
            <div className="bg-white p-4 rounded-xl border border-zinc-150 flex flex-col gap-3">
              <span className="text-[9px] text-zinc-400 font-bold">Status Badges & trust tags</span>

              {/* Blue trust shield badge */}
              <div className="flex gap-2 items-center">
                <span className="text-xs text-zinc-500 font-bold">Verified Shield:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-navy/5 text-brand-navy rounded-full text-xs font-bold font-sans">
                  <ShieldCheck className="w-4 h-4 text-brand-terracotta" />
                  <span>Verified Agent ✓</span>
                </span>
              </div>

              {/* Green connection dot status */}
              <div className="flex gap-2 items-center mt-1">
                <span className="text-xs text-zinc-500 font-bold">Active status:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-300 rounded-full text-[10px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                  <span>Disponible</span>
                </span>
              </div>

              {/* Category chip custom */}
              <div className="flex gap-2 items-center mt-1">
                <span className="text-xs text-zinc-500 font-bold">Category Badge:</span>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-[10px] font-extrabold uppercase font-sans">
                  Catering Traiteur
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
