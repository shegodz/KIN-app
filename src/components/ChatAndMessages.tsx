/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { MOCK_CHATS, ChatThread, WorkerProfile, COPIES } from '../types';
import { Send, ArrowLeft, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface ChatAndMessagesProps {
  lang: 'ar' | 'fr';
  themeState: 'light' | 'dark';
  currentChatThread: ChatThread | null;
  setCurrentChatThread: (thread: ChatThread | null) => void;
  onBackToHome: () => void;
}

export default function ChatAndMessages({
  lang,
  themeState,
  currentChatThread,
  setCurrentChatThread,
  onBackToHome
}: ChatAndMessagesProps) {
  const isDark = themeState === 'dark';
  const isRtl = lang === 'ar';
  const copies = COPIES[lang];
  
  const [threads, setThreads] = useState<ChatThread[]>(MOCK_CHATS);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to latest bubbles
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChatThread, isTyping]);

  const handleSelectItem = (thread: ChatThread) => {
    // Clear unread mark
    setThreads(prev => prev.map(t => t.id === thread.id ? { ...t, unread: false } : t));
    setCurrentChatThread(thread);
  };

  const handleSendClientMessage = (textToSend: string) => {
    if (!textToSend.trim() || !currentChatThread) return;

    const newMsg = {
      id: 'm_' + Date.now(),
      sender: 'client' as const,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Append to current chat state
    const updatedThread = {
      ...currentChatThread,
      messages: [...currentChatThread.messages, newMsg],
      lastMessageFr: textToSend,
      lastMessageAr: textToSend
    };

    setCurrentChatThread(updatedThread);
    setThreads(prev => prev.map(t => t.id === currentChatThread.id ? updatedThread : t));
    setInputText('');

    // Trigger funny localized intelligent reply simulation!
    setIsTyping(true);
    setTimeout(() => {
      let workerReplyText = '';
      if (currentChatThread.workerId === 'w1') {
        // Fatima response
        workerReplyText = isRtl 
          ? 'بإذن الله يا ياسمين! الكسكس بالخضار واللحم البقري الطازج هو تخصصي. سأحضر معي أيضاً التوابل الخاصة بـ "رأس الحانوت" من المنزل.' 
          : 'Absolument Yasmine ! Le couscous traditionnel aux raisins secs et s\'men est ma spécialité. Je ramène mes propres épices de Constantine de chez moi.';
      } else {
        // Amine response
        workerReplyText = isRtl 
          ? 'من فضلك لا تقلق، سأقوم بجلب كامل سوائل ومنظفات الحماية المعتمدة مجاناً. هدفي أن تلمع النوافذ بالكامل.' 
          : 'Ne vous inquiétez pas, j\'apporte tout le matériel d\'aspiration haut de gamme sans frais supplémentaires. À samedi !';
      }

      const replyMsg = {
        id: 'mr_' + Date.now(),
        sender: 'worker' as const,
        text: workerReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const finalThread = {
        ...updatedThread,
        messages: [...updatedThread.messages, replyMsg],
        lastMessageAr: workerReplyText,
        lastMessageFr: workerReplyText
      };

      setCurrentChatThread(finalThread);
      setThreads(prev => prev.map(t => t.id === currentChatThread.id ? finalThread : t));
      setIsTyping(false);
    }, 1500);
  };

  // Localized quick triggers
  const quickPills = isRtl ? [
    'هل السعر يشمل كل مستلزمات العمل؟ 💰',
    'أريد تحضير الكسكس التقليدي والأطباق العاصمية 🥘',
    'في أي ساعة تود الحضور يوم السبت؟ ⏱️'
  ] : [
    'Le tarif comprend tout le matériel pro ? 💰',
    'Je voudrais du couscous traditionnel algérien 🥘',
    'À quelle heure préférez-vous arriver samedi ? ⏱️'
  ];

  // MAIN GRID THREAD LIST VIEW
  if (!currentChatThread) {
    return (
      <div className={`flex flex-col flex-1 pb-16 ${isDark ? 'bg-zinc-950 text-white' : 'bg-brand-cream'}`}>
        
        {/* Header section */}
        <div className="p-4 bg-white border-b border-zinc-200 text-center select-none flex items-center justify-between">
          <div className="w-8" />
          <h2 className="text-base font-extrabold text-brand-navy font-arabic">
            {copies.messagesTab}
          </h2>
          <div className="w-8 shrink-0 text-xl text-brand-terracotta">💬</div>
        </div>

        {/* List of chat interactions */}
        <div className="p-4 flex flex-col gap-3">
          {threads.map((thread) => (
            <div
              key={thread.id}
              onClick={() => handleSelectItem(thread)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3 bg-white hover:border-brand-terracotta hover:shadow-sm ${
                thread.unread ? 'border-brand-terracotta/40 bg-orange-50/15' : 'border-zinc-150'
              }`}
            >
              {/* Profile avatar circle */}
              <div className="w-11 h-11 rounded-full bg-brand-cream border border-zinc-100 flex items-center justify-center text-2xl relative shrink-0 shadow-xs">
                {thread.avatar}
                {thread.unread && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-brand-terracotta rounded-full border-2 border-white animate-pulse" />
                )}
              </div>

              {/* Message contents */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline select-none">
                  <h3 className="text-xs font-extrabold text-brand-navy font-arabic">
                    {isRtl ? thread.workerNameAr : thread.workerNameFr}
                  </h3>
                  <span className="text-[9px] text-zinc-400 font-bold font-mono">15:35</span>
                </div>
                <p className="text-xs text-zinc-500 font-arabic truncate mt-1 select-none">
                  {isRtl ? thread.lastMessageAr : thread.lastMessageFr}
                </p>
              </div>
            </div>
          ))}

          {threads.length === 0 && (
            <div className="p-8 text-center text-zinc-400">
              <p className="text-sm font-semibold">{copies.noMessages}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // INDIVIDUAL ACTIVE CHAT ROOM SCREEN
  return (
    <div className={`flex flex-col flex-1 pb-16 h-full relative ${isDark ? 'bg-zinc-950 text-white' : 'bg-brand-cream'}`}>
      
      {/* Room Head header with avatar details */}
      <div className="p-4 bg-white border-b border-zinc-200 flex items-center gap-3 select-none">
        <button
          onClick={() => setCurrentChatThread(null)}
          className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-brand-navy hover:bg-zinc-50 shrink-0"
        >
          {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        </button>

        <div className="w-10 h-10 rounded-full bg-brand-cream border border-zinc-100 flex items-center justify-center text-2xl shrink-0">
          {currentChatThread.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h3 className="text-xs font-extrabold text-brand-navy truncate font-arabic">
              {isRtl ? currentChatThread.workerNameAr : currentChatThread.workerNameFr}
            </h3>
            <ShieldCheck className="w-4 h-4 text-brand-terracotta shrink-0" />
          </div>
          <span className="text-[9px] text-brand-green font-bold flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
            <span>Disponible</span>
          </span>
        </div>
      </div>

      {/* Message List scrollable frame */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-3">
        {currentChatThread.messages.map((m) => {
          const isMe = m.sender === 'client';
          return (
            <div
              key={m.id}
              className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed font-arabic ${
                isMe
                  ? 'self-end bg-brand-terracotta text-white rounded-br-none'
                  : 'self-start bg-white text-brand-navy border border-zinc-150 rounded-bl-none'
              }`}
            >
              <p className="font-medium">{m.text}</p>
              <span className={`text-[8px] block text-right mt-1 ${isMe ? 'text-white/60' : 'text-zinc-400'} font-mono`}>
                {m.timestamp}
              </span>
            </div>
          );
        })}

        {/* Simulated Typing Indicator */}
        {isTyping && (
          <div className="self-start bg-white text-zinc-400 p-2.5 rounded-xl border border-zinc-150 text-xs flex items-center gap-1.5 font-semibold font-arabic">
            <span className="w-1.5 h-1.5 bg-brand-terracotta rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-brand-terracotta rounded-full animate-bounce delay-100"></span>
            <span className="w-1.5 h-1.5 bg-brand-terracotta rounded-full animate-bounce delay-200"></span>
            <span>{isRtl ? 'جاري كتابة الرد المهني...' : ' فاطمة تكتب الرد...'}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Triggers helper bar */}
      <div className="p-2 border-t border-zinc-100 bg-white/60 flex gap-2 overflow-x-auto no-scrollbar select-none z-10 shrink-0">
        {quickPills.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendClientMessage(p)}
            className="px-3.5 py-1.5 rounded-full border border-brand-terracotta/20 bg-white text-brand-navy hover:bg-orange-50/40 text-[10px] font-bold shrink-0 transition-all flex items-center gap-1 font-arabic"
          >
            <span>💬</span>
            <span>{p}</span>
          </button>
        ))}
      </div>

      {/* Standard typed text input bar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-zinc-200 px-3 flex items-center gap-2 z-30">
        <input
          type="text"
          placeholder={isRtl ? 'اكتب رسالة للاستفسار...' : 'Écrivez votre message ici...'}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSendClientMessage(inputText); }}
          className="flex-1 bg-brand-cream border border-zinc-150 rounded-xl px-3 py-2.5 text-xs focus:outline-hidden font-arabic font-medium"
          style={{ direction: isRtl ? 'rtl' : 'ltr' }}
        />
        <button
          onClick={() => handleSendClientMessage(inputText)}
          className="w-10 h-10 bg-brand-terracotta text-white rounded-xl flex items-center justify-center hover:bg-brand-terracotta/90 transition-transform active:scale-95 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
