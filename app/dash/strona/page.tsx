'use client';

import React, { useState } from 'react';

// --- DANE MAKIETOWE (MOCKI STATYSTYK WIDGETU) ---
const MOCK_WIDGET_STATS = {
    pageViews: '4 820',
    conversionRate: '24.5%', // 24.5% ludzi odwiedzających stronę robi rezerwację
    onlineRevenue: '12 400 zł',
};

export default function BookingPageConfig() {
    // STAN: Parametry strony zmieniane live przez właściciela
    const [salonName, setSalonName] = useState('Cut & Glow Studio');
    const [subdomain, setSubdomain] = useState('cutandglow');
    const [primaryColor, setPrimaryColor] = useState('bg-indigo-600'); // domyślny kolor przycisków w widgecie
    const [isFacebookPixelActive, setIsFacebookPixelActive] = useState(true);

    return (
        <div className='space-y-8'>
            {/* ================= 1. NAGŁÓWEK I STATUS LINKU ================= */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-bold tracking-tight text-slate-950 font-sans'>
                        Twoja Strona Rezerwacyjna
                    </h1>
                    <p className='text-sm font-medium text-slate-400 mt-1'>
                        Konfiguruj wygląd wizytówki online, widgetu i systemu samodzielnych
                        rezerwacji dla klientów.
                    </p>
                </div>
                {/* Gotowy link do skopiowania do Social Media */}
                <div className='bg-slate-50 border border-slate-200 p-2 rounded-xl flex items-center space-x-3 max-w-sm w-full lg:w-auto'>
                    <div className='text-xs font-semibold text-slate-500 truncate pl-2'>
                        minical.pl/b/<span className='text-indigo-600 font-bold'>{subdomain}</span>
                    </div>
                    <button
                        type='button'
                        onClick={() =>
                            navigator.clipboard.writeText(`https://minical.pl/b/${subdomain}`)
                        }
                        className='bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer shrink-0'>
                        <i className='fa-regular fa-copy mr-1'></i> Kopiuj link
                    </button>
                </div>
            </div>

            {/* ================= 2. KPI: ANALITYKA KONWERSJI ================= */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm'>
                    <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                        Odwiedziny strony (30 dni)
                    </p>
                    <div className='flex items-baseline space-x-2 mt-2'>
                        <span className='text-2xl font-bold text-slate-900 tracking-tight'>
                            {MOCK_WIDGET_STATS.pageViews}
                        </span>
                        <span className='text-[10px] font-medium text-slate-400'>
                            unikalnych użytkowników
                        </span>
                    </div>
                </div>

                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm border-l-indigo-100 border-l-2'>
                    <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                        Skuteczność (Konwersja)
                    </p>
                    <div className='flex items-baseline space-x-2 mt-2'>
                        <span className='text-2xl font-bold text-indigo-600 tracking-tight'>
                            {MOCK_WIDGET_STATS.conversionRate}
                        </span>
                        <span className='text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md'>
                            Wysoka
                        </span>
                    </div>
                </div>

                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm'>
                    <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                        Utarg z rezerwacji online
                    </p>
                    <div className='flex items-baseline space-x-2 mt-2'>
                        <span className='text-2xl font-bold text-slate-900 tracking-tight'>
                            {MOCK_WIDGET_STATS.onlineRevenue}
                        </span>
                        <span className='text-[10px] font-medium text-slate-400'>
                            w tym miesiącu
                        </span>
                    </div>
                </div>
            </div>

            {/* ================= 3. UKŁAD DWUKOLUMNOWY (USTAWIENIA VS PODGLĄD) ================= */}
            <div className='grid grid-cols-1 xl:grid-cols-12 gap-8'>
                {/* LEWA KOLUMNA: FORMULARZ USTAWIEŃ (7/12 szerokości) */}
                <div className='xl:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6'>
                    <h2 className='text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-50 pb-3'>
                        <i className='fa-solid fa-sliders-up text-indigo-500 mr-2'></i>Ustawienia
                        wyglądu i marki
                    </h2>

                    {/* Pole: Nazwa Salonu */}
                    <div className='space-y-1.5'>
                        <label className='text-xs font-bold text-slate-700'>
                            Nazwa wyświetlana na stronie rezerwacji
                        </label>
                        <input
                            type='text'
                            value={salonName}
                            onChange={(e) => setSalonName(e.target.value)}
                            className='w-full border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all bg-slate-50/50'
                        />
                    </div>

                    {/* Pole: Subdomena URL */}
                    <div className='space-y-1.5'>
                        <label className='text-xs font-bold text-slate-700'>
                            Adres Twojej strony (URL)
                        </label>
                        <div className='flex rounded-xl overflow-hidden border border-slate-200 focus-within:border-indigo-500 transition-all bg-slate-50/50'>
                            <span className='bg-slate-100 px-3 py-3 text-xs font-medium text-slate-400 select-none border-r border-slate-200/60'>
                                minical.pl/b/
                            </span>
                            <input
                                type='text'
                                value={subdomain}
                                onChange={(e) =>
                                    setSubdomain(e.target.value.toLowerCase().replace(/\s+/g, ''))
                                }
                                className='w-full p-3 text-xs font-bold text-indigo-600 focus:outline-none bg-transparent'
                            />
                        </div>
                    </div>

                    {/* Wybór akcentu kolorystycznego (Brand Color) */}
                    <div className='space-y-2'>
                        <label className='text-xs font-bold text-slate-700 block'>
                            Kolor przewodni widgetu
                        </label>
                        <div className='flex items-center space-x-3'>
                            {[
                                { class: 'bg-indigo-600', label: 'Indygo' },
                                { class: 'bg-slate-900', label: 'Czerń głęboka' },
                                { class: 'bg-rose-500', label: 'Róż luksusowy' },
                                { class: 'bg-emerald-600', label: 'Szmaragd' },
                            ].map((color) => (
                                <button
                                    key={color.class}
                                    type='button'
                                    onClick={() => setPrimaryColor(color.class)}
                                    className={`w-8 h-8 rounded-xl transition-all cursor-pointer flex items-center justify-center text-white text-xs ${color.class} ${
                                        primaryColor === color.class
                                            ? 'ring-4 ring-offset-2 ring-slate-400 scale-105'
                                            : 'opacity-80 hover:opacity-100'
                                    }`}>
                                    {primaryColor === color.class && (
                                        <i className='fa-solid fa-check'></i>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sekcja Integracji Marketingowych */}
                    <div className='pt-4 border-t border-slate-100 space-y-4'>
                        <h3 className='text-xs font-bold text-slate-900 uppercase tracking-wider'>
                            Integracje i Śledzenie ruchu
                        </h3>

                        <div className='flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100'>
                            <div className='flex items-center space-x-3'>
                                <div className='w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm'>
                                    <i className='fa-brands fa-facebook-f'></i>
                                </div>
                                <div>
                                    <p className='text-xs font-bold text-slate-800'>
                                        Meta Pixel (Facebook)
                                    </p>
                                    <p className='text-[11px] text-slate-400 font-medium'>
                                        Śledź konwersje z reklam na Instagramie i Facebooku.
                                    </p>
                                </div>
                            </div>
                            {/* Prosty przełącznik checkbox/toggle stylizowany w Tailwind */}
                            <label className='relative inline-flex items-center cursor-pointer'>
                                <input
                                    type='checkbox'
                                    checked={isFacebookPixelActive}
                                    onChange={() =>
                                        setIsFacebookPixelActive(!isFacebookPixelActive)
                                    }
                                    className='sr-only peer'
                                />
                                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* PRAWA KOLUMNA: LIVE SMARTPHONE PREVIEW (5/12 szerokości) */}
                <div className='xl:col-span-5 flex flex-col items-center justify-center bg-slate-50/50 border border-slate-100 rounded-2xl p-6 relative overflow-hidden min-h-137.5'>
                    {/* Badge informujący o podglądzie na żywo */}
                    <span className='absolute top-4 left-4 text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md uppercase tracking-wider animate-pulse'>
                        <span className='w-1.5 h-1.5 rounded-full bg-indigo-600 inline-block mr-1.5 align-middle'></span>
                        Podgląd na żywo (Mobile)
                    </span>

                    {/* MAKIETA SMARTFONA (IPHONE FRAME STYLE) */}
                    <div className='w-70 h-125 bg-white rounded-[40px] shadow-2xl border-8 border-slate-900 flex flex-col overflow-hidden relative mt-4'>
                        {/* Notch telefonu */}
                        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-900 rounded-b-xl z-20' />

                        {/* Ekran aplikacji klienckiej */}
                        <div className='flex-1 flex flex-col text-slate-800 bg-white'>
                            {/* Baner / Zdjęcie salonu w podglądzie */}
                            <div className='h-28 bg-linear-to-br from-slate-100 to-slate-200 relative flex items-end p-3'>
                                <div className='absolute inset-0 bg-linear-to-t from-black/40 to-transparent z-0' />
                                <div className='z-10'>
                                    <h4 className='text-xs font-black text-white leading-tight drop-shadow-sm'>
                                        {salonName}
                                    </h4>
                                    <p className='text-[9px] text-slate-200 font-medium mt-0.5'>
                                        Warszawa, ul. Piękna 12
                                    </p>
                                </div>
                            </div>

                            {/* Treść widgetu klienta */}
                            <div className='p-4 flex-1 space-y-4 overflow-y-auto'>
                                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>
                                    1. Wybierz usługę
                                </p>

                                {/* Lista usług w podglądzie na telefonie */}
                                <div className='space-y-1.5'>
                                    <div className='p-2 border border-indigo-100 bg-indigo-50/30 rounded-xl flex items-center justify-between text-[11px] font-semibold'>
                                        <div>
                                            <p className='text-slate-800 font-bold'>
                                                Strzyżenie męskie + broda
                                            </p>
                                            <p className='text-slate-400 font-medium text-[9px]'>
                                                45 min • Jan (Ty)
                                            </p>
                                        </div>
                                        <span className='text-slate-900 font-black'>120 zł</span>
                                    </div>

                                    <div className='p-2 border border-slate-100 rounded-xl flex items-center justify-between text-[11px] font-semibold opacity-60'>
                                        <div>
                                            <p className='text-slate-800 font-bold'>
                                                Koloryzacja jednolita
                                            </p>
                                            <p className='text-slate-400 font-medium text-[9px]'>
                                                120 min • Agnieszka
                                            </p>
                                        </div>
                                        <span className='text-slate-900 font-black'>260 zł</span>
                                    </div>
                                </div>

                                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>
                                    2. Dostępne terminy
                                </p>
                                {/* Kafelki godzinowe w telefonie */}
                                <div className='grid grid-cols-3 gap-1 text-[10px] font-bold text-center'>
                                    <span className='p-1.5 bg-slate-100 text-slate-700 rounded-md'>
                                        09:00
                                    </span>
                                    <span className={`p-1.5 text-white rounded-md ${primaryColor}`}>
                                        10:30
                                    </span>
                                    <span className='p-1.5 bg-slate-100 text-slate-700 rounded-md'>
                                        13:00
                                    </span>
                                </div>
                            </div>

                            {/* Dolny przycisk podsumowania w telefonie (Rezerwuj) */}
                            <div className='p-3 border-t border-slate-100 bg-slate-50'>
                                <div
                                    className={`w-full text-center text-white font-bold text-[11px] py-2 rounded-lg shadow-sm ${primaryColor}`}>
                                    Zatwierdź rezerwację
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
