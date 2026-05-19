'use client';

import React, { useState } from 'react';

// --- TYPY ---
type SettingsTab = 'general' | 'hours' | 'notifications' | 'billing';

export default function SettingsPage() {
    // STAN: Aktywna podzakładka ustawień
    const [activeTab, setActiveTab] = useState<SettingsTab>('general');

    // STAN: Przykładowe opcje powiadomień zmieniane live
    const [smsReminder, setSmsReminder] = useState(true);
    const [emailMarketing, setEmailMarketing] = useState(false);

    return (
        <div className='space-y-8'>
            {/* ================= 1. NAGŁÓWEK ================= */}
            <div>
                <h1 className='text-2xl font-bold tracking-tight text-slate-950 font-sans'>
                    Ustawienia systemu
                </h1>
                <p className='text-sm font-medium text-slate-400 mt-1'>
                    Konfiguruj globalne parametry swojego salonu, powiadomienia, grafik i
                    rozliczenia.
                </p>
            </div>

            {/* ================= 2. GŁÓWNY PANEL USTAWIEŃ (GRID) ================= */}
            <div className='bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-137.5'>
                {/* LEWA STRONA: NAWIGACJA PO USTAWIENIACH (3/12) */}
                <aside className='lg:col-span-3 bg-slate-50/50 border-r border-slate-100 p-4 space-y-1'>
                    {[
                        { id: 'general', label: 'Dane salonu', icon: 'fa-regular fa-shop' },
                        {
                            id: 'hours',
                            label: 'Godziny otwarcia',
                            icon: 'fa-regular fa-calendar-clock',
                        },
                        {
                            id: 'notifications',
                            label: 'Automatyzacja SMS',
                            icon: 'fa-regular fa-bell',
                        },
                        {
                            id: 'billing',
                            label: 'Subskrypcja i Faktury',
                            icon: 'fa-regular fa-credit-card',
                        },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type='button'
                            onClick={() => setActiveTab(tab.id as SettingsTab)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                                activeTab === tab.id
                                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                            }`}>
                            <i
                                className={`${tab.icon} text-sm ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}`}></i>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </aside>

                {/* PRAWA STRONA: TREŚĆ FORMULARZA (9/12) */}
                <main className='lg:col-span-9 p-6 sm:p-8 flex flex-col justify-between'>
                    {/* DYNAMICZNY KONTENT W ZALEŻNOŚCI O STANU ACTIVE_TAB */}
                    <div className='space-y-6'>
                        {/* KAT 1: DANE SALONU */}
                        {activeTab === 'general' && (
                            <div className='space-y-6 animate-fadeIn'>
                                <h2 className='text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-50 pb-2'>
                                    Profil działalności
                                </h2>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div className='space-y-1.5'>
                                        <label className='text-xs font-bold text-slate-700'>
                                            Oficjalna nazwa firmy
                                        </label>
                                        <input
                                            type='text'
                                            defaultValue='Cut & Glow Studio s.c.'
                                            className='w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all bg-slate-50/30'
                                        />
                                    </div>
                                    <div className='space-y-1.5'>
                                        <label className='text-xs font-bold text-slate-700'>
                                            Numer NIP
                                        </label>
                                        <input
                                            type='text'
                                            defaultValue='5250001122'
                                            className='w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all bg-slate-50/30'
                                        />
                                    </div>
                                    <div className='space-y-1.5 sm:col-span-2'>
                                        <label className='text-xs font-bold text-slate-700'>
                                            Adres salonu
                                        </label>
                                        <input
                                            type='text'
                                            defaultValue='ul. Piękna 12, 00-477 Warszawa'
                                            className='w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all bg-slate-50/30'
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* KAT 2: GODZINY OTWARCIA */}
                        {activeTab === 'hours' && (
                            <div className='space-y-6 animate-fadeIn'>
                                <h2 className='text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-50 pb-2'>
                                    Stałe godziny pracy salonu
                                </h2>
                                <div className='space-y-3'>
                                    {[
                                        {
                                            day: 'Poniedziałek - Piątek',
                                            hours: '08:00 - 20:00',
                                            open: true,
                                        },
                                        { day: 'Sobota', hours: '09:00 - 15:00', open: true },
                                        { day: 'Niedziela', hours: 'Zamknięte', open: false },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className='flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700'>
                                            <span className='w-36'>{item.day}</span>
                                            <span
                                                className={`px-3 py-1 rounded-lg ${item.open ? 'bg-indigo-50 text-indigo-700' : 'bg-rose-50 text-rose-700'}`}>
                                                {item.hours}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* KAT 3: POWIADOMIENIA */}
                        {activeTab === 'notifications' && (
                            <div className='space-y-6 animate-fadeIn'>
                                <h2 className='text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-50 pb-2'>
                                    Automatyczna komunikacja
                                </h2>

                                <div className='space-y-4'>
                                    {/* Opcja: Przypomnienia SMS */}
                                    <div className='flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100'>
                                        <div className='space-y-0.5 pr-4'>
                                            <p className='text-xs font-bold text-slate-800'>
                                                Przypomnienia SMS dla klientów
                                            </p>
                                            <p className='text-[11px] text-slate-400 font-medium'>
                                                Wysyłaj automatyczne przypomnienie o wizycie na 24h
                                                przed jej terminem.
                                            </p>
                                        </div>
                                        <label className='relative inline-flex items-center cursor-pointer shrink-0'>
                                            <input
                                                type='checkbox'
                                                checked={smsReminder}
                                                onChange={() => setSmsReminder(!smsReminder)}
                                                className='sr-only peer'
                                            />
                                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>

                                    {/* Opcja: Marketing Mail */}
                                    <div className='flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100'>
                                        <div className='space-y-0.5 pr-4'>
                                            <p className='text-xs font-bold text-slate-800'>
                                                Opinie po wizycie (E-mail)
                                            </p>
                                            <p className='text-[11px] text-slate-400 font-medium'>
                                                Prośba o wystawienie oceny w Google wysyłana godzinę
                                                po zakończeniu usługi.
                                            </p>
                                        </div>
                                        <label className='relative inline-flex items-center cursor-pointer shrink-0'>
                                            <input
                                                type='checkbox'
                                                checked={emailMarketing}
                                                onChange={() => setEmailMarketing(!emailMarketing)}
                                                className='sr-only peer'
                                            />
                                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* KAT 4: SUBSKRYPCJA */}
                        {activeTab === 'billing' && (
                            <div className='space-y-6 animate-fadeIn'>
                                <h2 className='text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-50 pb-2'>
                                    Twój plan abonamentowy
                                </h2>
                                <div className='p-5 bg-indigo-950 text-white rounded-2xl relative overflow-hidden shadow-lg shadow-indigo-100'>
                                    <div className='absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-800/20 rounded-full blur-2xl' />
                                    <span className='text-[9px] font-black uppercase tracking-wider bg-indigo-500 px-2 py-0.5 rounded'>
                                        Plan Aktywny
                                    </span>
                                    <h3 className='text-lg font-bold mt-2'>MiniCal Pro v3</h3>
                                    <p className='text-xs text-indigo-200 font-medium mt-1'>
                                        Kolejne rozliczenie automatyczne:{' '}
                                        <strong>01.06.2026 r. (149,00 zł / mc)</strong>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* DOLNY PASEK: PRZYCISK ZAPISU (Zawsze widoczny na dole prawej kolumny) */}
                    <div className='mt-8 pt-4 border-t border-slate-100 flex justify-end'>
                        <button
                            type='button'
                            className='bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer'>
                            Zapisz zmiany
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
