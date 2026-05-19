/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { COPIES, MOCK_TIPS, WorkerProfile } from '../types';
import { ShieldCheck, ToggleLeft, ToggleRight, DollarSign, Star, CheckCheck, X, FileText, Calendar, Building, Check, ArrowLeft, ArrowRight, UserCheck, AlertTriangle, Upload, HelpCircle } from 'lucide-react';

interface WorkerExperienceProps {
  screen: 'worker_dashboard' | 'worker_profile_edit' | 'worker_interview' | 'worker_reviews';
  lang: 'ar' | 'fr';
  onNavigate: (screen: 'worker_dashboard' | 'worker_profile_edit' | 'worker_interview' | 'worker_reviews') => void;
  pendingRequests: any[];
  onAcceptRequest: (id: string) => void;
  onDeclineRequest: (id: string) => void;
  themeState: 'light' | 'dark';
}

export default function WorkerExperience({
  screen,
  lang,
  onNavigate,
  pendingRequests,
  onAcceptRequest,
  onDeclineRequest,
  themeState
}: WorkerExperienceProps) {
  const isDark = themeState === 'dark';
  const isRtl = lang === 'ar';
  const copies = COPIES[lang];

  // Active worker settings state
  const [isAvailable, setIsAvailable] = useState(true);
  const [profilePic, setProfilePic] = useState('👩‍🍳');
  const [workerName, setWorkerName] = useState('Karim Brahimi');
  const [workerBio, setWorkerBio] = useState('Je suis cuisinier professionnel à Alger depuis 10 ans. J\'adore gâter les familles algériennes.');
  const [workerPhone, setWorkerPhone] = useState('0550 12 34 56');

  // National id and certificates simulation upload
  const [idUploaded, setIdUploaded] = useState(false);
  const [healthCertUploaded, setHealthCertUploaded] = useState(false);

  // Scheduling states
  const [selectedHub, setSelectedHub] = useState('hub-hydra');
  const [interviewDate, setInterviewDate] = useState('25-05-2026');
  const [interviewTime, setInterviewTime] = useState('morning-10');
  const [schedulerCompleted, setSchedulerCompleted] = useState(false);

  // Review Replies simulator
  const [selectedReviewToReply, setSelectedReviewToReply] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sentReplies, setSentReplies] = useState<Record<string, string>>({});

  const interviewHubs = [
    { id: 'hub-hydra', nameFr: 'KIN Hub - Hydra Parc', nameAr: 'مقر كين - حيدرة', descFr: '12 Rue des Glycines, Hydra', descAr: 'شارع الغليسين، حيدرة' },
    { id: 'hub-centre', nameFr: 'KIN Point - Alger Centre', nameAr: 'مكتب كين - الجزائر الوسطى', descFr: '45 Blvd Didouche Mourad, Alger', descAr: 'شارع ديدوش مراد، وسط الجزائر' },
    { id: 'hub-eb', nameFr: 'KIN Hub - Bab Ezzouar', nameAr: 'مقر كين - باب الزوار', descFr: 'Cité Boushaki, Bab Ezzouar', descAr: 'حي بوسحاقي، باب الزوار' },
  ];

  const handleSendReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    setSentReplies(prev => ({ ...prev, [reviewId]: replyText }));
    setReplyText('');
    setSelectedReviewToReply(null);
  };

  // SCREEN W1: WORKER DASHBOARD
  if (screen === 'worker_dashboard') {
    return (
      <div className={`flex flex-col flex-1 pb-16 select-none ${isDark ? 'bg-zinc-950 text-white' : 'bg-brand-cream'}`}>
        
        {/* Core Top Bar */}
        <div className="p-4 flex justify-between items-center border-b border-zinc-200 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-brand-cream border border-zinc-200 flex items-center justify-center text-2xl relative">
              {profilePic}
            </div>
            <div>
              <h1 className="text-zinc-400 text-[10px] font-bold leading-none">{isRtl ? 'حسـاب الشريك' : 'Compte Prestataire'}</h1>
              <h2 className="text-sm font-extrabold text-brand-navy font-arabic mt-1">
                {isRtl ? 'كريم إبراهيمي' : 'Karim Brahimi'}
              </h2>
            </div>
          </div>

          {/* Quick interactive availability toggle */}
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold transition-all ${
              isAvailable
                ? 'bg-emerald-50 border-emerald-400 text-emerald-600'
                : 'bg-zinc-50 border-zinc-200 text-zinc-400'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-brand-green animate-pulse' : 'bg-zinc-300'}`} />
            <span>{isAvailable ? copies.workerStatusAvailable : copies.workerStatusBusy}</span>
          </button>
        </div>

        {/* Dynamic Profile Completion Banner with Progress Bar */}
        <div className="mx-4 mt-4 p-4 rounded-2xl bg-white border border-zinc-150 shadow-xs">
          <div className="flex justify-between items-center text-xs">
            <span className="font-extrabold text-brand-navy font-arabic">
              {copies.incompleteProfile} <span className="text-brand-terracotta text-sm">65%</span>
            </span>
            <button
              onClick={() => onNavigate('worker_profile_edit')}
              className="text-brand-terracotta hover:underline font-extrabold"
            >
              {copies.completeNow}
            </button>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-zinc-100 h-2 rounded-full mt-2.5 overflow-hidden">
            <div className="bg-brand-terracotta h-full rounded-full transition-all duration-500" style={{ width: '65%' }}></div>
          </div>
          <p className="text-[10px] text-zinc-400 font-bold mt-2 font-arabic leading-snug">
            {isRtl ? '💡 الحسابات المكتملة تنال معدل ثقة كبيراً وتجني أرباحاً أعلى بـ 3 أضعاف.' : '💡 Les profils complets obtiennent 3 fois plus d\'interventions.'}
          </p>
        </div>

        {/* Mini stats cards grid */}
        <div className="grid grid-cols-2 gap-3 px-4 py-3 select-none">
          <div className="bg-white p-3.5 rounded-2xl border border-zinc-150 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-zinc-400 font-bold uppercase">{isRtl ? 'الأرباح المقدرة' : 'Revenus'}</span>
              <p className="text-base font-extrabold text-brand-navy font-mono mt-0.5">48,000 DA</p>
            </div>
            <span className="text-2xl">💰</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-zinc-150 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-zinc-400 font-bold uppercase">{isRtl ? 'الشهر الجاري' : 'Missions'}</span>
              <p className="text-base font-extrabold text-brand-navy mt-0.5">12 {isRtl ? 'طلبات' : 'jobs'}</p>
            </div>
            <span className="text-2xl">⚡</span>
          </div>
        </div>

        {/* Pending Requests Feed list */}
        <div className="px-4 py-2">
          <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 select-none font-arabic">
            <span>📌</span>
            <span>{copies.pendingRequests} ({pendingRequests.length})</span>
          </h3>

          <div className="flex flex-col gap-3">
            {pendingRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-2xl p-4 border border-zinc-150 shadow-xs flex flex-col gap-3 animate-slide-in">
                {/* User info */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-brand-cream text-zinc-650 flex items-center justify-center text-sm font-extrabold border border-zinc-100">
                      👤
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-500 leading-none">{isRtl ? 'طلب من عميل' : 'Demande client'}</h4>
                      <h3 className="text-sm font-extrabold text-brand-navy mt-1 font-arabic">Yasmine Benali (Algiers)</h3>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-orange-50 text-brand-terracotta border border-orange-100 rounded-md text-[9px] font-bold">
                    Traiteur
                  </span>
                </div>

                {/* Date and specific instructions */}
                <div className="bg-brand-cream p-3 rounded-xl border border-zinc-100 text-xs text-brand-navy font-sans tracking-wide leading-relaxed font-arabic">
                  <div className="flex items-center gap-1.5 text-zinc-500 font-bold mb-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-terracotta" />
                    <span>{req.date} ({isRtl ? req.timeSlotAr : req.timeSlotFr})</span>
                  </div>
                  <p className="font-medium text-brand-navy/95">{req.description}</p>
                  <p className="text-[10px] text-zinc-400 font-bold mt-1 uppercase">Est: {req.priceEstimate} DA</p>
                </div>

                {/* Confirm Decline Actions */}
                <div className="flex gap-2 text-center select-none pt-1">
                  <button
                    onClick={() => onAcceptRequest(req.id)}
                    className="flex-1 py-2 bg-brand-green text-white text-xs font-extrabold rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <CheckCheck className="w-4 h-4" />
                    <span>{copies.accept}</span>
                  </button>
                  <button
                    onClick={() => onDeclineRequest(req.id)}
                    className="flex-1 py-2 bg-rose-50 border border-rose-100 text-rose-500 text-xs font-bold rounded-xl hover:bg-rose-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    <span>{copies.decline}</span>
                  </button>
                </div>
              </div>
            ))}

            {pendingRequests.length === 0 && (
              <div className="p-6 text-center bg-white/50 border border-dashed border-zinc-300 rounded-2xl flex flex-col items-center">
                <span className="text-3xl">☕</span>
                <p className="text-xs font-bold text-zinc-500 mt-3 font-arabic">
                  {isRtl ? 'لا توجد طلبات معلقة حالياً. تمتع بوقت راحة!' : 'Toutes les demandes ont été traitées !'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* KIN verification trigger action */}
        <div className="m-4 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3 select-none">
          <div className="w-6 h-6 rounded-full bg-brand-navy text-brand-amber flex items-center justify-center text-xs font-bold mt-0.5">
            ✓
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-extrabold text-brand-navy font-arabic">
              {isRtl ? 'أحصل على شارة التوثيق كين الزرقاء' : 'Décrochez votre badge vérifié KIN ✓'}
            </h4>
            <p className="text-[10px] text-zinc-500 leading-relaxed font-arabic mt-1">
              {isRtl ? 'جدول مقابلتك وجهاً لوجه مع وكلائنا في حيدرة لتنشيط الشارة.' : 'Sélectionnez une date d\'entretien physique à Algiers pour doubler vos demandes.'}
            </p>
            <button
              onClick={() => onNavigate('worker_interview')}
              className="mt-3 px-3 py-1.5 bg-brand-navy text-white text-[10px] font-extrabold rounded-lg hover:bg-brand-navy/95"
            >
              {copies.interviewTitle}
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="px-4 py-2 mb-4">
          <h3 className="text-xs font-extrabold text-zinc-300 uppercase tracking-wider mb-2.5">
            {copies.tipsTitle}
          </h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
            {MOCK_TIPS.map((tip) => (
              <div
                key={tip.id}
                className="min-w-[210px] max-w-[220px] bg-white p-3.5 rounded-xl border border-zinc-150 shrink-0 shadow-xs"
              >
                <h4 className="text-xs font-extrabold text-brand-navy font-arabic">{isRtl ? tip.titleAr : tip.titleFr}</h4>
                <p className="text-[10px] text-zinc-500 mt-1.5 leading-relaxed font-arabic">{isRtl ? tip.bodyAr : tip.bodyFr}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // SCREEN W2: WORKER PROFILE EDIT
  if (screen === 'worker_profile_edit') {
    return (
      <div className={`flex flex-col flex-1 pb-16 ${isDark ? 'bg-zinc-950 text-white' : 'bg-brand-cream'}`}>
        
        {/* Navigation bar */}
        <div className="p-4 flex items-center justify-between border-b border-zinc-200 bg-white">
          <button
            onClick={() => onNavigate('worker_dashboard')}
            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-brand-navy hover:bg-zinc-50"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </button>
          
          <h2 className="text-sm font-extrabold text-brand-navy font-arabic">
            {copies.profileEditTitle}
          </h2>

          <div className="w-8 h-8" />
        </div>

        <div className="p-4 flex flex-col gap-4">
          {/* Picture update simulation */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-150 shadow-xs flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-brand-cream border border-zinc-200 flex items-center justify-center text-4xl relative">
              {profilePic}
              <button className="absolute -bottom-1 -right-1 bg-brand-terracotta text-white rounded-full p-1 border border-white">
                <Upload className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-zinc-400 font-bold mt-2">{isRtl ? 'تحديث صورتك المهنية' : 'Modifier votre photo pro'}</p>
          </div>

          {/* Form edit fields */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-150 shadow-xs flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-500">{isRtl ? 'الاسم واللقب' : 'Nom complet'}</label>
              <input
                type="text"
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                className="p-2.5 bg-brand-cream border border-zinc-150 rounded-xl text-xs font-bold text-brand-navy focus:outline-hidden"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-500">{isRtl ? 'رقم الهاتف (مؤكد هاتفياً)' : 'Numéro de téléphone'}</label>
              <input
                type="text"
                value={workerPhone}
                disabled
                className="p-2.5 bg-zinc-50 text-zinc-450 border border-zinc-150 rounded-xl text-xs font-bold cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-500">{isRtl ? 'موقع نشاطك في الجزائر' : 'Zone d\'intervention principale'}</label>
              <select className="p-2.5 bg-brand-cream border border-zinc-150 rounded-xl text-xs font-bold text-brand-navy focus:outline-hidden" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
                <option>Alger Centre / الجزائر الوسطى</option>
                <option>Hydra / حيدرة</option>
                <option>Bab Ezzouar / باب الزوار</option>
                <option>Bir Mourad Raïs / بير مراد رايس</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-500">{isRtl ? 'شرح مهاراتك (نبذة عنك)' : 'Bio / Description'}</label>
              <textarea
                rows={3}
                value={workerBio}
                onChange={(e) => setWorkerBio(e.target.value)}
                className="p-2.5 bg-brand-cream border border-zinc-150 rounded-xl text-xs font-medium text-brand-navy focus:outline-hidden"
                style={{ direction: isRtl ? 'rtl' : 'ltr' }}
              />
            </div>
          </div>

          {/* Document verification file upload simulation */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-150 shadow-xs flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider">
              {copies.documentsList}
            </h3>

            {/* Document: ID card */}
            <div className="flex justify-between items-center p-3 rounded-xl border border-zinc-150 bg-brand-cream/40">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-zinc-500" />
                <div>
                  <h4 className="text-[11px] font-bold text-brand-navy">{copies.idCard}</h4>
                  <p className="text-[9px] text-zinc-400 font-bold">{idUploaded ? '✓ Telecharge' : '☐ Document obligatoire'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIdUploaded(!idUploaded)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${
                  idUploaded ? 'bg-brand-green text-white' : 'bg-brand-navy text-white hover:bg-zinc-805'
                }`}
              >
                {idUploaded ? '✓' : 'Upload'}
              </button>
            </div>

            {/* Document: Health Certificate */}
            <div className="flex justify-between items-center p-3 rounded-xl border border-zinc-150 bg-brand-cream/40">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-zinc-300" />
                <div>
                  <h4 className="text-[11px] font-bold text-brand-navy">{copies.healthCert}</h4>
                  <p className="text-[9px] text-zinc-400 font-bold">{healthCertUploaded ? '✓ Telecharge' : '☐ Carnet médical requis pour traiteur'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHealthCertUploaded(!healthCertUploaded)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold ${
                  healthCertUploaded ? 'bg-brand-green text-white' : 'bg-brand-navy text-white hover:bg-zinc-805'
                }`}
              >
                {healthCertUploaded ? '✓' : 'Upload'}
              </button>
            </div>
          </div>

          {/* Save values CTA */}
          <button
            onClick={() => onNavigate('worker_dashboard')}
            className="w-full py-3.5 bg-brand-terracotta text-white rounded-xl font-bold text-xs shadow-md hover:bg-brand-terracotta/90 transition-transform active:scale-98"
          >
            {isRtl ? 'حفظ التعديلات' : 'Enregistrer les modifications'}
          </button>
        </div>
      </div>
    );
  }

  // SCREEN W3: WORKER INTERVIEW SCHEDULING
  if (screen === 'worker_interview') {
    return (
      <div className={`flex flex-col flex-1 pb-16 ${isDark ? 'bg-zinc-950 text-white' : 'bg-brand-cream'}`}>
        
        {/* Navigation header */}
        <div className="p-4 flex items-center justify-between border-b border-zinc-200 bg-white">
          <button
            onClick={() => onNavigate('worker_dashboard')}
            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-brand-navy hover:bg-zinc-50"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </button>
          
          <h2 className="text-sm font-extrabold text-brand-navy font-arabic">
            {copies.interviewTitle}
          </h2>

          <div className="w-8 h-8" />
        </div>

        {schedulerCompleted ? (
          // Success layout
          <div className="p-6 text-center my-auto flex flex-col items-center animate-scale-up">
            <div className="w-16 h-16 bg-brand-navy text-brand-amber rounded-full flex items-center justify-center text-3xl shadow-xl mb-4 border-2 border-white">
              ✓
            </div>
            
            <h1 className="text-xl font-extrabold text-brand-navy font-arabic">
              {copies.interviewSuccess}
            </h1>
            
            <p className="text-xs text-zinc-400 font-bold mt-2 font-arabic">
              {isRtl ? 'موعدك مؤكد بانتظار تشريفك لمقر كين.' : 'Votre rendez-vous d\'entretien de confiance KIN est réservé !'}
            </p>

            <div className="bg-white border border-zinc-150 p-4 rounded-2xl w-full text-start flex flex-col gap-2 mt-6 shadow-xs select-none">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400 font-bold">{isRtl ? 'الموقع' : 'Lieu'}:</span>
                <span className="text-brand-navy font-extrabold text-right">
                  {isRtl ? interviewHubs.find(h => h.id === selectedHub)?.nameAr : interviewHubs.find(h => h.id === selectedHub)?.nameFr}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400 font-bold">{isRtl ? 'التاريخ والوقت' : 'Date d\'entretien'}:</span>
                <span className="text-brand-navy font-extrabold">{interviewDate} (10:00)</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSchedulerCompleted(false);
                onNavigate('worker_dashboard');
              }}
              className="mt-8 w-full py-3 bg-brand-navy text-white rounded-xl font-bold text-xs"
            >
              {isRtl ? 'الذهاب للوحة التحكم' : 'Retour au tableau de bord'}
            </button>
          </div>
        ) : (
          <div className="p-4 flex flex-col gap-4">
            
            {/* Friendly explanation card */}
            <div className="p-4 bg-white border border-zinc-150 rounded-2xl shadow-xs">
              <p className="text-xs text-brand-navy font-arabic leading-relaxed font-medium">
                {copies.interviewDesc}
              </p>
            </div>

            {/* Illustrated steps list inside scheduler */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-150 shadow-xs flex flex-col gap-3">
              <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider mb-1">
                {copies.whatToExpect}
              </h3>
              
              <div className="flex gap-3 items-start text-xs font-medium">
                <div className="w-6 h-6 rounded-full bg-brand-terracotta text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono mt-0.5">1</div>
                <p className="text-zinc-650 font-arabic leading-relaxed">{copies.expectStep1}</p>
              </div>
              <div className="flex gap-3 items-start text-xs font-medium">
                <div className="w-6 h-6 rounded-full bg-brand-terracotta text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono mt-0.5">2</div>
                <p className="text-zinc-650 font-arabic leading-relaxed">{copies.expectStep2}</p>
              </div>
              <div className="flex gap-3 items-start text-xs font-medium">
                <div className="w-6 h-6 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono mt-0.5">✓</div>
                <p className="text-zinc-650 font-arabic leading-relaxed">{copies.expectStep3}</p>
              </div>
            </div>

            {/* Hub choice */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-150 shadow-xs flex flex-col gap-2.5">
              <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider">
                {copies.selectInterviewLocation}
              </h3>

              <div className="flex flex-col gap-2">
                {interviewHubs.map((hub) => (
                  <button
                    type="button"
                    key={hub.id}
                    onClick={() => setSelectedHub(hub.id)}
                    className={`p-3 rounded-xl border text-start transition-all ${
                      selectedHub === hub.id
                        ? 'border-brand-terracotta bg-orange-50/40 text-brand-navy shadow-xs'
                        : 'border-zinc-150 bg-white hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-extrabold text-brand-navy font-arabic">
                        {isRtl ? hub.nameAr : hub.nameFr}
                      </h4>
                      {selectedHub === hub.id && <div className="w-2.5 h-2.5 bg-brand-terracotta rounded-full shrink-0" />}
                    </div>
                    <p className="text-[10px] text-zinc-450 mt-1 font-arabic" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
                      📍 {isRtl ? hub.descAr : hub.descFr}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Documents Checklist verification reminder */}
            <div className="p-4 bg-amber-55/10 border border-brand-amber/30 rounded-2xl flex flex-col gap-2">
              <h4 className="text-xs font-bold text-brand-navy font-arabic flex items-center gap-1.5 leading-none">
                <AlertTriangle className="w-4 h-4 text-brand-amber" />
                <span>{copies.documentsList}</span>
              </h4>
              <ul className="flex flex-col gap-1 text-[10px] text-zinc-550 list-none pt-1">
                <li className="flex items-center gap-1.5 font-arabic">☐ {copies.idCard}</li>
                <li className="flex items-center gap-1.5 font-arabic">☐ {copies.diploma}</li>
                <li className="flex items-center gap-1.5 font-arabic">☐ {copies.healthCert} ({isRtl ? 'إلزامي لطهاة الأطعمة' : 'Requis Traiteur'})</li>
              </ul>
            </div>

            {/* Submit Selection Hub times slot button */}
            <button
              onClick={() => setSchedulerCompleted(true)}
              className="w-full py-3.5 bg-brand-terracotta text-white rounded-xl font-bold text-xs shadow-md hover:bg-brand-terracotta/90 transition-transform active:scale-98 mt-2"
            >
              {copies.confirmInterviewTime}
            </button>
          </div>
        )}
      </div>
    );
  }

  // SCREEN W4: WORKER CLIENTS AND REVIEWS FEED
  if (screen === 'worker_reviews') {
    return (
      <div className={`flex flex-col flex-1 pb-16 ${isDark ? 'bg-zinc-950 text-white' : 'bg-brand-cream'}`}>
        
        {/* Header bar */}
        <div className="p-4 flex items-center justify-between border-b border-zinc-200 bg-white">
          <button
            onClick={() => onNavigate('worker_dashboard')}
            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-brand-navy"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          </button>
          
          <h2 className="text-sm font-extrabold text-brand-navy font-arabic">
            {copies.reviewsTitle}
          </h2>

          <div className="w-8 h-8" />
        </div>

        {/* Aggregate section reviews */}
        <div className="p-5 bg-white border-b border-zinc-150 text-center flex flex-col items-center">
          <h1 className="text-4xl font-extrabold font-mono text-brand-navy">4.8</h1>
          <div className="flex gap-1 text-brand-amber my-1">
            {'★'.repeat(5).split('').map((s, i) => (
              <Star key={i} className="w-4.5 h-4.5 fill-brand-amber text-brand-amber" />
            ))}
          </div>
          <p className="text-[11px] text-zinc-400 font-bold mt-1">Évaluation globale (42 Avis certifiés)</p>
        </div>

        {/* Reviews dynamic list with response panel */}
        <div className="p-4 flex flex-col gap-4">
          {[
            { id: 'rev-1', client: 'Amira Benali', date: '21-05-2026', stars: 5, textFr: 'Fatima Zohra nous a préparé un couscous traditionnel succulents ! Un délice absolu.', textAr: 'حضرت لنا طعاماً تقليدياً لذيذاً جداً، نظيفة وسريعة.' },
            { id: 'rev-2', client: 'Lamine K.', date: '18-05-2026', stars: 4, textFr: 'Bon service, à l\'heure pour la réception.', textAr: 'خدمة ممتازة وفي الموعد لتنسيق الحفلة الخاصة بعائلتنا.' }
          ].map((rev) => (
            <div key={rev.id} className="bg-white p-4 rounded-2xl border border-zinc-150 flex flex-col gap-2 shadow-xs">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-extrabold text-brand-navy font-arabic">{rev.client}</h4>
                  <span className="text-[9px] text-zinc-400 font-bold font-mono">{rev.date}</span>
                </div>
                <div className="flex text-brand-amber">
                  {'★'.repeat(rev.stars).split('').map((s, i) => (
                    <span key={i} className="text-xs">★</span>
                  ))}
                </div>
              </div>
              
              <p className="text-xs text-brand-navy/80 leading-relaxed font-arabic font-medium">
                {isRtl ? rev.textAr : rev.textFr}
              </p>

              {/* Responder output if it exists */}
              {sentReplies[rev.id] ? (
                <div className="mt-2.5 p-2.5 bg-zinc-50 border-l-2 border-brand-terracotta rounded-r-lg text-[11px] text-brand-navy font-arabic">
                  <span className="font-bold text-brand-terracotta">{isRtl ? 'ردكم' : 'Votre réponse'}:</span> {sentReplies[rev.id]}
                </div>
              ) : (
                <div className="mt-1">
                  {selectedReviewToReply === rev.id ? (
                    <div className="flex flex-col gap-2 mt-2">
                      <input
                        type="text"
                        placeholder={isRtl ? 'اكتب ردك اللطيف للعميل...' : 'Répondre poliment au client...'}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="p-2 border border-zinc-200 rounded-lg text-xs"
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setSelectedReviewToReply(null)}
                          className="px-2.5 py-1 text-[10px] text-zinc-500 hover:text-brand-navy"
                        >
                          {isRtl ? 'إلغاء' : 'Annuler'}
                        </button>
                        <button
                          onClick={() => handleSendReply(rev.id)}
                          className="px-3 py-1 bg-brand-terracotta text-white rounded-lg text-[10px] font-bold"
                        >
                          {isRtl ? 'إرسال الرد' : 'Envoyer'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedReviewToReply(rev.id)}
                      className="text-[10px] text-brand-terracotta font-extrabold hover:underline pt-1"
                    >
                      {isRtl ? '💬 أضف رد مهني' : '💬 Répondre au client'}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
