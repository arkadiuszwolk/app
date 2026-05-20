'use client';

import React from 'react';

// --- TYPY ---
type TimelineStatus = 'completed' | 'current' | 'upcoming';
type FeedType = 'create' | 'cancel';

// --- DANE MAKIETOWE (MOCKI) ---
const MOCK_SUMMARY = {
    revenue: '1 420,00 zł',
    occupancy: '82%',
    totalBookings: 8,
    completedBookings: 3,
};

const MOCK_TIMELINE = [
    {
        id: 1,
        time: '09:00 - 10:00',
        customer: 'Anna Lis',
        service: 'Strzyżenie damskie + Modelowanie',
        employee: 'Agnieszka',
        status: 'completed' as TimelineStatus,
        note: null,
    },
    {
        id: 2,
        time: '10:15 - 11:15',
        customer: 'Marek Podgórski',
        service: 'Combo barberskie (Włosy + Broda)',
        employee: 'Jan (Ty)',
        status: 'completed' as TimelineStatus,
        note: 'Prosi o mocne wycieniowanie boków.',
    },
    {
        id: 3,
        time: '11:30 - 13:00',
        customer: 'Karolina Woźniak',
        service: 'Koloryzacja Sombre Premium',
        employee: 'Agnieszka',
        status: 'current' as TimelineStatus, // TRWA TERAZ
        note: null,
    },
    {
        id: 4,
        time: '13:30 - 14:00',
        customer: 'Piotr Nowak',
        service: 'Strzyżenie męskie klasyczne',
        employee: 'Jan (Ty)',
        status: 'upcoming' as TimelineStatus,
        note: 'Pierwsza wizyta',
    },
    {
        id: 5,
        time: '15:00 - 16:30',
        customer: 'Magdalena Szulc',
        service: 'Pielęgnacja keratynowa',
        employee: 'Agnieszka',
        status: 'upcoming' as TimelineStatus,
        note: null,
    },
];

const MOCK_FEED = [
    {
        id: 1,
        type: 'create' as FeedType,
        time: '12 min temu',
        text: 'Katarzyna Zając zarezerwowała termin na jutro (12:00)',
        source: 'Instagram',
    },
    {
        id: 2,
        type: 'cancel' as FeedType,
        time: '45 min temu',
        text: 'Michał Król odwołał wizytę zaplanowaną na dziś (17:00)',
        source: 'Strona www',
    },
    {
        id: 3,
        type: 'create' as FeedType,
        time: '2 godz. temu',
        text: 'Zofia Bielska zapisała się na regulację brwi (czwartek)',
        source: 'Facebook',
    },
];

const MOCK_TEAM_TODAY = [
    { name: 'Jan (Ty)', hours: '08:00 - 16:00', status: 'w pracy' },
    { name: 'Agnieszka', hours: '09:00 - 17:00', status: 'w pracy' },
    { name: 'Tomasz', hours: 'Wolne', status: 'urlop' },
];

// SVG fali dla ciemnych paneli (miedziano-złoty luksusowy akcent)
const darkPanelWaves = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='200' height='200'%3E%3Cg fill='none' stroke='%23f59e0b' stroke-width='1.2' stroke-opacity='0.08'%3E%3Cpath d='M200,80 C160,90 140,130 130,200'/%3E%3Cpath d='M200,95 C165,105 148,140 140,200'/%3E%3Cpath d='M200,110 C170,120 156,150 150,200'/%3E%3Cpath d='M200,125 C175,135 164,160 160,200'/%3E%3Cpath d='M200,140 C180,150 172,170 170,200'/%3E%3C/g%3E%3C/svg%3E")`;

export default function TodayDashboardPage() {
    // Generowanie dzisiejszej daty po polsku
    const todayDate = new Date().toLocaleDateString('pl-PL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className='space-y-8 pb-12 animate-fade-in'>
            {/* ================= 1. NAGŁÓWEK POWITALNY ================= */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-4'>
                <div>
                    <h1 className='text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 font-sans'>
                        Dzień dobry, Jan
                    </h1>
                    <p className='text-sm font-medium text-slate-400 mt-1 capitalize'>
                        {todayDate} — Twój salon działa dziś na pełnych obrotach.
                    </p>
                </div>
                <div className='flex items-center space-x-2 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-100 self-start lg:self-center'>
                    <span className='w-2 h-2 bg-emerald-500 rounded-full animate-ping' />
                    <span>System zsynchronizowany live</span>
                </div>
            </div>

            {/* ================= 2. PANEL STATYSTYK KPI (Z WIELKIMI IKONAMI W TLE) ================= */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {/* Utarg */}
                <div
                    className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px] relative overflow-hidden'
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f1f5f9' stroke-width='1.5'%3E%3Crect x='2' y='4' width='20' height='16' rx='2' ry='2'/%3E%3Cline x1='12' y1='10' x2='12' y2='14'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/svg%3E")`,
                        backgroundSize: '130px 130px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '-20px 20px',
                    }}>
                    <div className='relative z-10'>
                        <span className='text-[11px] font-bold text-slate-400 uppercase tracking-wider block'>
                            Szacowany utarg (Dziś)
                        </span>
                        <div className='flex items-baseline space-x-2 mt-2'>
                            <span className='text-2xl font-black text-slate-900 tracking-tight'>
                                {MOCK_SUMMARY.revenue}
                            </span>
                            <span className='text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md'>
                                Gotówka + Karta
                            </span>
                        </div>
                    </div>
                    <div className='relative z-10 text-[11px] font-semibold text-emerald-600 pt-2 border-t border-slate-50 flex items-center space-x-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='12'
                            height='12'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='3'
                            strokeLinecap='round'
                            strokeLinejoin='round'>
                            <polyline points='22 7 13.5 15.5 8.5 10.5 2 17'></polyline>
                            <polyline points='16 7 22 7 22 13'></polyline>
                        </svg>
                        <span>Zrealizowano już {MOCK_SUMMARY.completedBookings} wizyty</span>
                    </div>
                </div>

                {/* Zapełnienie */}
                <div
                    className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px] relative overflow-hidden'
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f1f5f9' stroke-width='1.5'%3E%3Cpath d='M21.21 15.89A10 10 0 1 1 8 2.83'/%3E%3Cpath d='M22 12A10 10 0 0 0 12 2v10z'/%3E%3C/svg%3E")`,
                        backgroundSize: '130px 130px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '-20px 20px',
                    }}>
                    <div className='relative z-10'>
                        <span className='text-[11px] font-bold text-slate-400 uppercase tracking-wider block'>
                            Obłożenie foteli
                        </span>
                        <div className='flex items-baseline space-x-2 mt-2'>
                            <span className='text-2xl font-black text-slate-900 tracking-tight'>
                                {MOCK_SUMMARY.occupancy}
                            </span>
                            <span className='text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md'>
                                Optymalne
                            </span>
                        </div>
                    </div>
                    <div className='relative z-10 w-full pt-2'>
                        <div className='w-full bg-slate-100 h-1.5 rounded-full overflow-hidden shadow-inner'>
                            <div
                                className='bg-indigo-600 h-1.5 rounded-full transition-all duration-500 shadow-sm shadow-indigo-400'
                                style={{ width: MOCK_SUMMARY.occupancy }}></div>
                        </div>
                    </div>
                </div>

                {/* Liczba Wizyt */}
                <div
                    className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-between min-h-[140px] relative overflow-hidden'
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f1f5f9' stroke-width='1.5'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'/%3E%3Cline x1='16' y1='2' x2='16' y2='6'/%3E%3Cline x1='8' y1='2' x2='8' y2='6'/%3E%3Cline x1='3' y1='10' x2='21' y2='10'/%3E%3C/svg%3E")`,
                        backgroundSize: '130px 130px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '-20px 20px',
                    }}>
                    <div className='relative z-10'>
                        <span className='text-[11px] font-bold text-slate-400 uppercase tracking-wider block'>
                            Status rezerwacji
                        </span>
                        <div className='flex items-baseline space-x-1.5 mt-2'>
                            <span className='text-2xl font-black text-slate-900 tracking-tight'>
                                {MOCK_SUMMARY.completedBookings}
                            </span>
                            <span className='text-slate-300 font-light text-xl'>/</span>
                            <span className='text-lg font-bold text-slate-500'>
                                {MOCK_SUMMARY.totalBookings}
                            </span>
                        </div>
                    </div>
                    <div className='relative z-10 text-[11px] font-medium text-slate-400 pt-2 border-t border-slate-50'>
                        Pozostało{' '}
                        <strong className='text-slate-700 font-bold'>
                            {MOCK_SUMMARY.totalBookings - MOCK_SUMMARY.completedBookings}
                        </strong>{' '}
                        wizyt do obsłużenia.
                    </div>
                </div>
            </div>

            {/* ================= 3. GŁÓWNY GRID STRONY (CIEMNY STYL LUXURY) ================= */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
                {/* LEWA STRONA: OŚ CZASU LIVE (CIEMNY KONTENER PREMIUM) */}
                <div
                    className='lg:col-span-2 bg-[#0b1329] border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden min-h-[500px]'
                    style={{
                        backgroundImage: darkPanelWaves,
                        backgroundSize: '180px 180px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0px top 0px',
                    }}>
                    {/* Poświata pod tłem */}
                    <div className='absolute -top-12 -left-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none' />

                    <div className='flex items-center justify-between border-b border-slate-800/80 pb-4 relative z-10'>
                        <div className='flex items-center space-x-2.5'>
                            <span className='relative flex h-2.5 w-2.5'>
                                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75'></span>
                                <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500'></span>
                            </span>
                            <h2 className='text-sm font-bold text-white tracking-wide uppercase'>
                                Monitor wydarzeń na żywo
                            </h2>
                        </div>
                        <span className='text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-900/80 border border-slate-800 px-2 py-1 rounded-lg'>
                            Chronologicznie
                        </span>
                    </div>

                    {/* Kontener Osi Czasu */}
                    <div className='relative border-l-2 border-slate-800 pl-6 ml-3 mt-6 space-y-6 z-10'>
                        {MOCK_TIMELINE.map((item) => (
                            <div key={item.id} className='relative group'>
                                {/* Punkt kontrolny na osi czasu */}
                                <div
                                    className={`absolute -left-[31px] top-2.5 w-3.5 h-3.5 rounded-full border-2 bg-[#0b1329] transition-all duration-300 ${
                                        item.status === 'completed'
                                            ? 'border-slate-700 bg-slate-800'
                                            : item.status === 'current'
                                              ? 'border-amber-400 scale-125 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                                              : 'border-slate-600'
                                    }`}
                                />

                                {/* Karta pojedynczej wizyty */}
                                <div
                                    className={`p-4 rounded-xl border transition-all duration-300 ${
                                        item.status === 'completed'
                                            ? 'bg-slate-900/30 border-slate-800/40 opacity-40 hover:opacity-60'
                                            : item.status === 'current'
                                              ? 'bg-gradient-to-r from-slate-900 to-indigo-950/40 border-amber-500/40 shadow-xl shadow-indigo-950/50 ring-1 ring-amber-500/20'
                                              : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
                                    }`}>
                                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                                        <div>
                                            <span
                                                className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded ${
                                                    item.status === 'completed'
                                                        ? 'bg-slate-800 text-slate-400'
                                                        : item.status === 'current'
                                                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                                          : 'bg-slate-800 text-slate-300 border border-slate-700/50'
                                                }`}>
                                                {item.status === 'current' ? '⚡ TERAZ — ' : ''}
                                                {item.time}
                                            </span>

                                            <h3 className='text-sm font-bold text-white mt-2.5 flex items-center space-x-2 tracking-wide'>
                                                <span>{item.customer}</span>
                                                {item.note && (
                                                    <span
                                                        className='text-amber-400 text-xs'
                                                        title='Notatka klienta'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            width='12'
                                                            height='12'
                                                            viewBox='0 0 24 24'
                                                            fill='none'
                                                            stroke='currentColor'
                                                            strokeWidth='2.5'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'>
                                                            <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'></path>
                                                        </svg>
                                                    </span>
                                                )}
                                            </h3>
                                            <p className='text-xs text-slate-400 font-medium mt-0.5 group-hover:text-slate-300 transition-colors'>
                                                {item.service}
                                            </p>
                                        </div>

                                        {/* Sekcja pracownika */}
                                        <div className='sm:text-right border-t sm:border-t-0 border-slate-800/60 pt-2 sm:pt-0 mt-1 sm:mt-0 flex sm:flex-col justify-between items-center sm:items-end'>
                                            <span className='text-[9px] text-slate-500 font-bold uppercase tracking-wider'>
                                                Fotel / Stylista
                                            </span>
                                            <span
                                                className={`text-xs font-bold px-2 py-1 rounded-lg mt-0.5 ${item.status === 'current' ? 'text-amber-400 bg-amber-500/5' : 'text-slate-300 bg-slate-950/40'}`}>
                                                {item.employee}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Rozwijana notatka */}
                                    {item.note && item.status !== 'completed' && (
                                        <div className='mt-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg text-xs font-medium text-amber-300 flex items-start space-x-2 backdrop-blur-sm shadow-inner'>
                                            <span className='text-amber-400 font-serif text-sm leading-none opacity-70'>
                                                “
                                            </span>
                                            <span className='italic leading-relaxed'>
                                                {item.note}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PRAWA STRONA: SZYBKIE AKCJE, FEED I OBSADA (SŁUŻY JAKO KONTRAST) */}
                <div className='space-y-6'>
                    {/* PANEL: SZYBKIE ZARZĄDZANIE */}
                    <div className='bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3 relative overflow-hidden'>
                        <h2 className='text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block'>
                            Konstruktor zdarzeń
                        </h2>

                        <button
                            type='button'
                            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3.5 px-4 rounded-xl shadow-md shadow-indigo-100 transition-all flex items-center justify-center space-x-2 cursor-pointer transform active:scale-[0.98]'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='14'
                                height='14'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'>
                                <line x1='12' y1='5' x2='12' y2='19'></line>
                                <line x1='5' y1='12' x2='19' y2='12'></line>
                            </svg>
                            <span>Zapis telefoniczny / Walk-in</span>
                        </button>

                        <button
                            type='button'
                            className='w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60 text-xs font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='13'
                                height='13'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2.5'
                                strokeLinecap='round'
                                strokeLinejoin='round'>
                                <circle cx='12' cy='12' r='10'></circle>
                                <line x1='4.93' y1='4.93' x2='19.07' y2='19.07'></line>
                            </svg>
                            <span>Zablokuj kalendarz (Przerwa)</span>
                        </button>
                    </div>

                    {/* PANEL: OSTATNIA AKTYWNOŚĆ (LIVESTREAM) */}
                    <div className='bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4'>
                        <div className='flex items-center justify-between border-b border-slate-50 pb-2'>
                            <h2 className='text-[10px] font-black text-slate-400 uppercase tracking-wider'>
                                Globalny strumień powiadomień
                            </h2>
                            <span className='w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping' />
                        </div>

                        <div className='space-y-3.5'>
                            {MOCK_FEED.map((feed) => (
                                <div
                                    key={feed.id}
                                    className='flex items-start space-x-3 text-xs border-b border-slate-50/60 pb-3 last:border-0 last:pb-0 group'>
                                    <div
                                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs border transition-transform group-hover:scale-105 ${
                                            feed.type === 'cancel'
                                                ? 'bg-rose-50 text-rose-600 border-rose-100'
                                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        }`}>
                                        {feed.type === 'cancel' ? (
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='12'
                                                height='12'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                stroke='currentColor'
                                                strokeWidth='2.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'>
                                                <rect
                                                    x='3'
                                                    y='4'
                                                    width='18'
                                                    height='18'
                                                    rx='2'
                                                    ry='2'></rect>
                                                <line x1='16' y1='2' x2='16' y2='6'></line>
                                                <line x1='8' y1='2' x2='8' y2='6'></line>
                                                <line x1='3' y1='10' x2='21' y2='10'></line>
                                                <line x1='10' y1='14' x2='14' y2='18'></line>
                                                <line x1='14' y1='14' x2='10' y2='18'></line>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='12'
                                                height='12'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                stroke='currentColor'
                                                strokeWidth='2.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'>
                                                <rect
                                                    x='3'
                                                    y='4'
                                                    width='18'
                                                    height='18'
                                                    rx='2'
                                                    ry='2'></rect>
                                                <line x1='12' y1='14' x2='12' y2='18'></line>
                                                <line x1='10' y1='16' x2='14' y2='16'></line>
                                            </svg>
                                        )}
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <p className='font-semibold text-slate-800 leading-normal text-[11px] sm:text-xs'>
                                            {feed.text}
                                        </p>
                                        <div className='flex items-center space-x-2 text-[10px] text-slate-400 font-bold mt-1.5'>
                                            <span className='bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100'>
                                                {feed.time}
                                            </span>
                                            <span>•</span>
                                            <span className='text-indigo-600 uppercase tracking-wide font-black text-[9px]'>
                                                {feed.source}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PANEL: OBSADA SALONU (ZESPÓŁ) */}
                    <div className='bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4'>
                        <h2 className='text-[10px] font-black text-slate-400 uppercase tracking-wider block'>
                            Dostępność kadry (Dziś)
                        </h2>
                        <div className='space-y-2.5'>
                            {MOCK_TEAM_TODAY.map((member, idx) => (
                                <div
                                    key={idx}
                                    className='flex items-center justify-between p-2 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-100 hover:bg-white transition-all'>
                                    <div className='flex items-center space-x-3'>
                                        <div className='w-8 h-8 bg-slate-900 text-amber-400 rounded-xl flex items-center justify-center text-xs font-black border border-slate-800 shadow-sm'>
                                            {member.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className='text-xs font-bold text-slate-900'>
                                                {member.name}
                                            </p>
                                            <p className='text-[10px] text-slate-400 font-semibold mt-0.5'>
                                                {member.hours}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded ${
                                            member.status === 'w pracy'
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                : 'bg-rose-50 text-rose-700 border border-rose-100'
                                        }`}>
                                        {member.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
