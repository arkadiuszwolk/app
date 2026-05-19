import React from 'react';

// 1. DANE MAKIETOWE (MOCKI) DLA EKRANU "DZISIAJ"
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
        status: 'completed', // completed | current | upcoming
        note: null,
    },
    {
        id: 2,
        time: '10:15 - 11:15',
        customer: 'Marek Podgórski',
        service: 'Combo barberskie (Włosy + Broda)',
        employee: 'Jan (Ty)',
        status: 'completed',
        note: 'Prosi o mocne wycieniowanie boków.',
    },
    {
        id: 3,
        time: '11:30 - 13:00',
        customer: 'Karolina Woźniak',
        service: 'Koloryzacja Sombre Premium',
        employee: 'Agnieszka',
        status: 'current', // TRWA TERAZ
        note: null,
    },
    {
        id: 4,
        time: '13:30 - 14:00',
        customer: 'Piotr Nowak',
        service: 'Strzyżenie męskie klasyczne',
        employee: 'Jan (Ty)',
        status: 'upcoming',
        note: 'Pierwsza wizyta',
    },
    {
        id: 5,
        time: '15:00 - 16:30',
        customer: 'Magdalena Szulc',
        service: 'Pielęgnacja keratynowa',
        employee: 'Agnieszka',
        status: 'upcoming',
        note: null,
    },
];

const MOCK_FEED = [
    {
        id: 1,
        type: 'create',
        time: '12 min temu',
        text: 'Katarzyna Zając zarezerwowała termin na jutro (12:00)',
        source: 'Instagram',
    },
    {
        id: 2,
        type: 'cancel',
        time: '45 min temu',
        text: 'Michał król odwołał wizytę zaplanowaną na dziś (17:00)',
        source: 'Strona www',
    },
    {
        id: 3,
        type: 'create',
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

export default function TodayDashboardPage() {
    // Generowanie dzisiejszej daty po polsku
    const todayDate = new Date().toLocaleDateString('pl-PL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className='space-y-8'>
            {/* ================= 1. NAGŁÓWEK POWITALNY ================= */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
                <div>
                    <h1 className='text-2xl md:text-3xl font-bold tracking-tight text-slate-950 font-sans'>
                        Dzień dobry, Jan
                    </h1>
                    <p className='text-sm font-medium text-slate-400 mt-1 capitalize'>
                        {todayDate} — Twój salon działa dziś na pełnych obrotach.
                    </p>
                </div>
            </div>

            {/* ================= 2. PANEL STATYSTYK KPI ================= */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {/* Utarg */}
                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-between'>
                    <div className='flex items-center justify-between'>
                        <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
                            Szacowany utarg
                        </span>
                        <div className='w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 text-xs'>
                            <i className='fa-solid fa-wallet'></i>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <span className='text-2xl font-bold text-slate-900 tracking-tight'>
                            {MOCK_SUMMARY.revenue}
                        </span>
                        <p className='text-[11px] font-semibold text-emerald-600 mt-1 flex items-center space-x-1'>
                            <i className='fa-solid fa-arrow-up'></i>
                            <span>Zrealizowano już 3 wizyty</span>
                        </p>
                    </div>
                </div>

                {/* Zapełnienie */}
                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-between'>
                    <div className='flex items-center justify-between'>
                        <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
                            Obłożenie kalendarza
                        </span>
                        <div className='w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 text-xs'>
                            <i className='fa-solid fa-chart-pie'></i>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <span className='text-2xl font-bold text-slate-900 tracking-tight'>
                            {MOCK_SUMMARY.occupancy}
                        </span>
                        <div className='w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden'>
                            <div
                                className='bg-indigo-600 h-1.5 rounded-full'
                                style={{ width: MOCK_SUMMARY.occupancy }}></div>
                        </div>
                    </div>
                </div>

                {/* Liczba Wizyt */}
                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-between'>
                    <div className='flex items-center justify-between'>
                        <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
                            Wizyty na dziś
                        </span>
                        <div className='w-7 h-7 bg-sky-50 rounded-lg flex items-center justify-center text-sky-600 text-xs'>
                            <i className='fa-solid fa-calendar-day'></i>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <span className='text-2xl font-bold text-slate-900 tracking-tight'>
                            {MOCK_SUMMARY.completedBookings}{' '}
                            <span className='text-slate-300 font-light text-xl'>/</span>{' '}
                            {MOCK_SUMMARY.totalBookings}
                        </span>
                        <p className='text-[11px] font-medium text-slate-400 mt-1'>
                            Zostało {MOCK_SUMMARY.totalBookings - MOCK_SUMMARY.completedBookings}{' '}
                            rezerwacji na resztę dnia
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= 3. GŁÓWNY GRID STRONY (2/3 vs 1/3) ================= */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
                {/* LEWA STRONA: OŚ CZASU LIVE (2 COLUMNS) */}
                <div className='lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6'>
                    <div className='flex items-center justify-between border-b border-slate-50 pb-4'>
                        <h2 className='text-sm font-bold text-slate-800 flex items-center space-x-2'>
                            <span className='w-2 h-2 bg-indigo-600 rounded-full animate-pulse'></span>
                            <span>Harmonogram wizyt na żywo</span>
                        </h2>
                        <span className='text-xs text-slate-400 font-medium'>
                            Sortowanie chronologiczne
                        </span>
                    </div>

                    {/* Kontener Osi Czasu */}
                    <div className='relative border-l-2 border-slate-100 pl-6 ml-3 space-y-6'>
                        {MOCK_TIMELINE.map((item) => (
                            <div key={item.id} className='relative group'>
                                {/* Punkt na osi czasu */}
                                <div
                                    className={`absolute -left-7.75 top-1.5 w-4 h-4 rounded-full border-2 bg-white transition-all ${
                                        item.status === 'completed'
                                            ? 'border-slate-300 bg-slate-100'
                                            : item.status === 'current'
                                              ? 'border-indigo-600 scale-110 shadow-sm'
                                              : 'border-slate-200'
                                    }`}
                                />

                                {/* Karta wizyty */}
                                <div
                                    className={`p-4 rounded-xl border transition-all duration-200 ${
                                        item.status === 'completed'
                                            ? 'bg-slate-50/50 border-slate-100/80 opacity-60'
                                            : item.status === 'current'
                                              ? 'bg-white border-indigo-600/30 shadow-md shadow-indigo-100/30 ring-1 ring-indigo-600/5'
                                              : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
                                    }`}>
                                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                                        <div>
                                            <span
                                                className={`text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md ${
                                                    item.status === 'completed'
                                                        ? 'bg-slate-200 text-slate-600'
                                                        : item.status === 'current'
                                                          ? 'bg-indigo-600 text-white animate-pulse'
                                                          : 'bg-slate-100 text-slate-700'
                                                }`}>
                                                {item.time}
                                            </span>
                                            <h3 className='text-sm font-bold text-slate-800 mt-2 flex items-center space-x-2'>
                                                <span>{item.customer}</span>
                                                {item.note && (
                                                    <span
                                                        className='text-amber-500 text-xs'
                                                        title='Klient zostawił notatkę'>
                                                        <i className='fa-solid fa-comment-dots'></i>
                                                    </span>
                                                )}
                                            </h3>
                                            <p className='text-xs text-slate-500 font-medium mt-0.5'>
                                                {item.service}
                                            </p>
                                        </div>

                                        <div className='sm:text-right border-t sm:border-t-0 border-slate-50 pt-2 sm:pt-0 mt-2 sm:mt-0 flex sm:flex-col justify-between items-center sm:items-end'>
                                            <span className='text-[10px] text-slate-400 font-medium'>
                                                Pracownik
                                            </span>
                                            <span className='text-xs font-semibold text-slate-700'>
                                                {item.employee}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Rozwijana notatka od klienta */}
                                    {item.note && item.status !== 'completed' && (
                                        <div className='mt-3 p-2.5 bg-amber-50/60 border border-amber-100/50 rounded-lg text-xs font-medium text-amber-800 flex items-start space-x-2'>
                                            <i className='fa-solid fa-quote-left text-[10px] mt-0.5 opacity-60'></i>
                                            <span>{item.note}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PRAWA STRONA: SZYBKIE AKCJE, FEED I ZESPÓŁ (1 COLUMN) */}
                <div className='space-y-6'>
                    {/* SZYBKIE AKCJE */}
                    <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3'>
                        <h2 className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-2'>
                            Szybkie zarządzanie
                        </h2>

                        <button
                            type='button'
                            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-sm shadow-indigo-100 transition-colors flex items-center justify-center space-x-2 cursor-pointer'>
                            <i className='fa-solid fa-plus text-xs'></i>
                            <span>Nowa wizyta (Telefon)</span>
                        </button>

                        <button
                            type='button'
                            className='w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer'>
                            <i className='fa-solid fa-ban text-xs text-slate-400'></i>
                            <span>Zablokuj czas / Przerwa</span>
                        </button>
                    </div>

                    {/* POWIADOMIENIA NA ŻYWO (FEED) */}
                    <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4'>
                        <h2 className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
                            Ostatnia aktywność
                        </h2>
                        <div className='space-y-3.5'>
                            {MOCK_FEED.map((feed) => (
                                <div
                                    key={feed.id}
                                    className='flex items-start space-x-3 text-xs border-b border-slate-50 pb-3 last:border-0 last:pb-0'>
                                    <div
                                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] ${
                                            feed.type === 'cancel'
                                                ? 'bg-rose-50 text-rose-600'
                                                : 'bg-emerald-50 text-emerald-600'
                                        }`}>
                                        <i
                                            className={`fa-solid ${feed.type === 'cancel' ? 'fa-calendar-xmark' : 'fa-calendar-plus'}`}></i>
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <p className='font-medium text-slate-700 leading-normal'>
                                            {feed.text}
                                        </p>
                                        <div className='flex items-center space-x-2 text-[10px] text-slate-400 font-medium mt-1'>
                                            <span>{feed.time}</span>
                                            <span>•</span>
                                            <span className='text-indigo-500 font-semibold'>
                                                {feed.source}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* STATUS ZESPOŁU NA DZIŚ */}
                    <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4'>
                        <h2 className='text-xs font-bold text-slate-400 uppercase tracking-wider'>
                            Obsada salonu na dziś
                        </h2>
                        <div className='space-y-3'>
                            {MOCK_TEAM_TODAY.map((member, idx) => (
                                <div
                                    key={idx}
                                    className='flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/50 transition-colors'>
                                    <div className='flex items-center space-x-3'>
                                        <div className='w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-xs font-bold border border-slate-200'>
                                            {member.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className='text-xs font-bold text-slate-800'>
                                                {member.name}
                                            </p>
                                            <p className='text-[10px] text-slate-400 font-medium mt-0.5'>
                                                {member.hours}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`text-[10px] font-bold capitalize px-2 py-0.5 rounded-md ${
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
