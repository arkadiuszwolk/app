'use client';

import React, { useState } from 'react';

// --- TYPY ---
type ViewMode = 'list' | 'week' | 'month';
type AppointmentStatus = 'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled';

// --- DANE MAKIETOWE ---
const MOCK_STATS = {
    todayTotal: 8,
    estimatedRevenue: '2 450,00 zł',
    utilizationRate: '92%',
};

const MOCK_APPOINTMENTS = [
    {
        id: 'W-302',
        clientName: 'Anna Kowalska',
        serviceName: 'Balayage Premium + Modelowanie',
        employee: 'Marek Cyrulik',
        date: '20.05.2026',
        time: '09:00 - 11:30',
        status: 'completed',
        price: '450 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-303',
        clientName: 'Mariusz Nowak',
        serviceName: 'Combo Barberskie Premium',
        employee: 'Kamil Tnący',
        date: '20.05.2026',
        time: '12:00 - 13:00',
        status: 'confirmed',
        price: '160 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-304',
        clientName: 'Karolina Zalewska',
        serviceName: 'Koloryzacja Jednolita + Keratyna',
        employee: 'Marek Cyrulik',
        date: '21.05.2026',
        time: '14:30 - 17:00',
        status: 'pending',
        price: '580 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-305',
        clientName: 'Piotr Wiśniewski',
        serviceName: 'Strzyżenie Męskie Klasyczne',
        employee: 'Kamil Tnący',
        date: '22.05.2026',
        time: '10:00 - 10:45',
        status: 'cancelled',
        price: '90 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-306',
        clientName: 'Zofia Borowska',
        serviceName: 'Przedłużanie Włosów Metodą Nano',
        employee: 'Marek Cyrulik',
        date: '18.05.2026',
        time: '09:00 - 13:00',
        status: 'completed',
        price: '1 200 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-307',
        clientName: 'Tomasz Lewandowski',
        serviceName: 'Golenie Głowy Brzytwą + Broda',
        employee: 'Kamil Tnący',
        date: '18.05.2026',
        time: '14:00 - 15:15',
        status: 'completed',
        price: '180 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-308',
        clientName: 'Katarzyna Zielińska',
        serviceName: 'Strzyżenie Damskie + Regeneracja Olaplex',
        employee: 'Marek Cyrulik',
        date: '19.05.2026',
        time: '10:30 - 12:00',
        status: 'completed',
        price: '280 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-309',
        clientName: 'Janusz Wójcik',
        serviceName: 'Strzyżenie Męskie + Maskowanie Siwizny',
        employee: 'Kamil Tnący',
        date: '19.05.2026',
        time: '15:30 - 16:30',
        status: 'completed',
        price: '150 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-310',
        clientName: 'Magdalena Woźniak',
        serviceName: 'Refleksy na Włosach + Tonowanie',
        employee: 'Marek Cyrulik',
        date: '20.05.2026',
        time: '13:30 - 16:00',
        status: 'confirmed',
        price: '390 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-311',
        clientName: 'Michał Kamiński',
        serviceName: 'Combo Barberskie Klasyczne',
        employee: 'Kamil Tnący',
        date: '20.05.2026',
        time: '16:35 - 17:35',
        status: 'confirmed',
        price: '140 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-312',
        clientName: 'Agnieszka Kaczmarek',
        serviceName: 'Trwała Ondulacja Nowoczesna',
        employee: 'Marek Cyrulik',
        date: '21.05.2026',
        time: '09:00 - 11:30',
        status: 'confirmed',
        price: '320 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-313',
        clientName: 'Paweł Zając',
        serviceName: 'Strzyżenie Męskie Premium',
        employee: 'Kamil Tnący',
        date: '21.05.2026',
        time: '12:00 - 12:50',
        status: 'confirmed',
        price: '110 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-314',
        clientName: 'Barbara Pawlak',
        serviceName: 'Fryzura Wieczorowa / Upięcie',
        employee: 'Marek Cyrulik',
        date: '22.05.2026',
        time: '11:00 - 12:30',
        status: 'confirmed',
        price: '250 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-315',
        clientName: 'Adam Król',
        serviceName: 'Ritual Barber + Gorący Ręcznik',
        employee: 'Kamil Tnący',
        date: '22.05.2026',
        time: '13:00 - 14:15',
        status: 'pending',
        price: '200 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-316',
        clientName: 'Monika Włodarczyk',
        serviceName: 'Szybkie Odświeżenie Koloru + Sauna',
        employee: 'Marek Cyrulik',
        date: '22.05.2026',
        time: '15:00 - 16:30',
        status: 'pending',
        price: '210 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-317',
        clientName: 'Łukasz Wieczorek',
        serviceName: 'Strzyżenie Męskie Ekspresowe',
        employee: 'Kamil Tnący',
        date: '23.05.2026',
        time: '09:00 - 09:30',
        status: 'confirmed',
        price: '80 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-318',
        clientName: 'Natalia Dudek',
        serviceName: 'Rytuał Pielęgnacyjny Kérastase',
        employee: 'Marek Cyrulik',
        date: '23.05.2026',
        time: '10:00 - 11:15',
        status: 'confirmed',
        price: '190 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-319',
        clientName: 'Robert Sikora',
        serviceName: 'Repigmentacja Włosów + Strzyżenie',
        employee: 'Kamil Tnący',
        date: '23.05.2026',
        time: '11:30 - 12:45',
        status: 'confirmed',
        price: '170 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-320',
        clientName: 'Aleksandra Walczak',
        serviceName: 'Balayage Premium',
        employee: 'Marek Cyrulik',
        date: '25.05.2026',
        time: '09:00 - 11:30',
        status: 'pending',
        price: '400 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-321',
        clientName: 'Krzysztof Baran',
        serviceName: 'Combo Barberskie Premium',
        employee: 'Kamil Tnący',
        date: '25.05.2026',
        time: '12:00 - 13:00',
        status: 'pending',
        price: '160 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1504257401789-b360a30f36d3?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-322',
        clientName: 'Paulina Górska',
        serviceName: 'Keratynowe Prostowanie Włosów',
        employee: 'Marek Cyrulik',
        date: '26.05.2026',
        time: '13:00 - 16:30',
        status: 'confirmed',
        price: '550 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-323',
        clientName: 'Grzegorz Witkowski',
        serviceName: 'Trymowanie Brody z Olejowaniem',
        employee: 'Kamil Tnący',
        date: '26.05.2026',
        time: '17:00 - 17:45',
        status: 'confirmed',
        price: '95 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-324',
        clientName: 'Marta Krajewska',
        serviceName: 'Strzyżenie Grzywki + Modelowanie Flash',
        employee: 'Marek Cyrulik',
        date: '27.05.2026',
        time: '09:30 - 10:15',
        status: 'confirmed',
        price: '100 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-325',
        clientName: 'Marcin Sikorski',
        serviceName: 'Strzyżenie Męskie Klasyczne',
        employee: 'Kamil Tnący',
        date: '27.05.2026',
        time: '11:00 - 11:45',
        status: 'confirmed',
        price: '90 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-326',
        clientName: 'Ewa Ostrowska',
        serviceName: 'Koloryzacja AirTouch High-End',
        employee: 'Marek Cyrulik',
        date: '28.05.2026',
        time: '10:00 - 14:00',
        status: 'confirmed',
        price: '650 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-327',
        clientName: 'Daniel Jasiński',
        serviceName: 'Komplet Barberski + Nitkowanie',
        employee: 'Kamil Tnący',
        date: '28.05.2026',
        time: '15:00 - 16:15',
        status: 'confirmed',
        price: '180 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-328',
        clientName: 'Justyna Chmielewska',
        serviceName: 'Przedłużanie Włosów (Podciąganie)',
        employee: 'Marek Cyrulik',
        date: '29.05.2026',
        time: '09:00 - 11:30',
        status: 'confirmed',
        price: '350 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-329',
        clientName: 'Artur Mazur',
        serviceName: 'Strzyżenie Męskie Premium',
        employee: 'Kamil Tnący',
        date: '29.05.2026',
        time: '13:00 - 13:50',
        status: 'confirmed',
        price: '110 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-330',
        clientName: 'Dominika Kubiak',
        serviceName: 'Deoloryzacja + Kolor Docelowy',
        employee: 'Marek Cyrulik',
        date: '30.05.2026',
        time: '10:00 - 14:30',
        status: 'pending',
        price: '600 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'W-331',
        clientName: 'Sylwester Bąk',
        serviceName: 'Combo Golenie na Gładko + Twarz',
        employee: 'Kamil Tnący',
        date: '30.05.2026',
        time: '15:00 - 16:15',
        status: 'pending',
        price: '160 zł',
        clientAvatar:
            'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&q=80',
    },
];

export default function AppointmentsPage() {
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [statusFilter, setStatusFilter] = useState<AppointmentStatus>('all');

    // Filtrowanie listy
    const filteredAppointments = MOCK_APPOINTMENTS.filter((app) => {
        if (statusFilter === 'all') return true;
        return app.status === statusFilter;
    });

    return (
        <div className='space-y-6'>
            {/* ================= 1. NAGŁÓWEK Z SZYBKIMI PRZEŁĄCZNIKAMI WIDOKU ================= */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
                <div>
                    <h1 className='text-xl font-black tracking-tight text-slate-950 font-sans'>
                        Terminarz & Wizyty
                    </h1>
                    <p className='text-xs font-medium text-slate-500 mt-0.5'>
                        Zarządzaj rezerwacjami, sprawdzaj obłożenie stanowisk i edytuj godziny pracy
                        zespołu.
                    </p>
                </div>

                {/* TRZY WIDOKI: Segmented Control premium w ciemnym stylu */}
                <div className='flex items-center space-x-3 self-start lg:self-center'>
                    <div className='bg-slate-950 p-1 rounded-xl inline-flex items-center border border-slate-900 shadow-inner'>
                        <button
                            type='button'
                            onClick={() => setViewMode('list')}
                            className={`px-3.5 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 ${
                                viewMode === 'list'
                                    ? 'bg-[#0b1329] text-amber-400 border border-slate-800 shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                            }`}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='12'
                                height='12'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2.5'>
                                <line x1='8' y1='6' x2='21' y2='6'></line>
                                <line x1='8' y1='12' x2='21' y2='12'></line>
                                <line x1='8' y1='18' x2='21' y2='18'></line>
                                <line x1='3' y1='6' x2='3.01' y2='6'></line>
                                <line x1='3' y1='12' x2='3.01' y2='12'></line>
                                <line x1='3' y1='18' x2='3.01' y2='18'></line>
                            </svg>
                            <span>Lista</span>
                        </button>
                        <button
                            type='button'
                            onClick={() => setViewMode('week')}
                            className={`px-3.5 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 ${
                                viewMode === 'week'
                                    ? 'bg-[#0b1329] text-amber-400 border border-slate-800 shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                            }`}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='12'
                                height='12'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2.5'>
                                <rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
                                <line x1='16' y1='2' x2='16' y2='6'></line>
                                <line x1='8' y1='2' x2='8' y2='6'></line>
                                <line x1='3' y1='10' x2='21' y2='10'></line>
                            </svg>
                            <span>Tydzień</span>
                        </button>
                        <button
                            type='button'
                            onClick={() => setViewMode('month')}
                            className={`px-3.5 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 ${
                                viewMode === 'month'
                                    ? 'bg-[#0b1329] text-amber-400 border border-slate-800 shadow-sm'
                                    : 'text-slate-400 hover:text-white'
                            }`}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='12'
                                height='12'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2.5'>
                                <rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
                                <line x1='16' y1='2' x2='16' y2='6'></line>
                                <line x1='8' y1='2' x2='8' y2='6'></line>
                                <line x1='3' y1='10' x2='21' y2='10'></line>
                                <path d='M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01'></path>
                            </svg>
                            <span>Miesiąc</span>
                        </button>
                    </div>

                    <button
                        type='button'
                        className='bg-[#0b1329] text-amber-400 border border-slate-900 hover:text-white hover:bg-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center space-x-1.5'>
                        <span className='text-base leading-none translate-y-[-1px]'>+</span>
                        <span>Nowa rezerwacja</span>
                    </button>
                </div>
            </div>

            {/* ================= 2. MINI STATYSTYKI KPI DLA TERMINARZA ================= */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='bg-[#0b1329] p-4 border border-slate-800/60 rounded-xl flex items-center justify-between shadow-md'>
                    <div>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>
                            Wizyty zaplanowane na dziś
                        </p>
                        <h3 className='text-xl font-black text-white mt-0.5'>
                            {MOCK_STATS.todayTotal}{' '}
                            <span className='text-xs font-normal text-slate-400'>rezerwacji</span>
                        </h3>
                    </div>
                    <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                </div>
                <div className='bg-[#0b1329] p-4 border border-slate-800/60 rounded-xl flex items-center justify-between shadow-md'>
                    <div>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>
                            Szacowany przychód dzisiejszy
                        </p>
                        <h3 className='text-xl font-black text-amber-400 mt-0.5'>
                            {MOCK_STATS.estimatedRevenue}
                        </h3>
                    </div>
                </div>
                <div className='bg-[#0b1329] p-4 border border-slate-800/60 rounded-xl flex items-center justify-between shadow-md'>
                    <div>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>
                            Zapełnienie grafiku salonu
                        </p>
                        <h3 className='text-xl font-black text-white mt-0.5'>
                            {MOCK_STATS.utilizationRate}
                        </h3>
                    </div>
                    <span className='text-[9px] font-black bg-amber-400/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded'>
                        Wysokie
                    </span>
                </div>
            </div>

            {/* ================= 3. RENDEROWANIE ODPOWIEDNIEGO WIDOKU ================= */}

            {/* ---------------- A. WIDOK: LISTA WIZYT (TABELA) ---------------- */}
            {viewMode === 'list' && (
                <div className='space-y-4'>
                    {/* Filtry statusów dla listy */}
                    <div className='flex items-center gap-2 overflow-x-auto pb-1'>
                        {(
                            [
                                'all',
                                'confirmed',
                                'pending',
                                'completed',
                                'cancelled',
                            ] as AppointmentStatus[]
                        ).map((st) => (
                            <button
                                key={st}
                                onClick={() => setStatusFilter(st)}
                                className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                                    statusFilter === st
                                        ? 'bg-slate-950 text-amber-400 border-slate-800 shadow-sm'
                                        : 'bg-white text-slate-500 border-slate-200 hover:text-slate-900'
                                }`}>
                                {st === 'all'
                                    ? 'Wszystkie wizyty'
                                    : st === 'confirmed'
                                      ? 'Zatwierdzone'
                                      : st === 'pending'
                                        ? 'Oczekujące'
                                        : st === 'completed'
                                          ? 'Zakończone'
                                          : 'Odwołane'}
                            </button>
                        ))}
                    </div>

                    {/* Tabela */}
                    <div className='bg-[#0b1329] border border-slate-800/80 rounded-xl shadow-xl overflow-hidden'>
                        <div className='overflow-x-auto'>
                            <table className='w-full text-left border-collapse'>
                                <thead>
                                    <tr className='border-b border-slate-800/60 bg-slate-950/40'>
                                        <th className='p-3 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[90px] text-center'>
                                            Kod
                                        </th>
                                        <th className='p-3 text-[10px] font-black text-slate-400 uppercase tracking-wider'>
                                            Klient
                                        </th>
                                        <th className='p-3 text-[10px] font-black text-slate-400 uppercase tracking-wider'>
                                            Zabieg / Usługa
                                        </th>
                                        <th className='p-3 text-[10px] font-black text-slate-400 uppercase tracking-wider'>
                                            Stylista
                                        </th>
                                        <th className='p-3 text-[10px] font-black text-slate-400 uppercase tracking-wider'>
                                            Termin
                                        </th>
                                        <th className='p-3 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center'>
                                            Status
                                        </th>
                                        <th className='p-3 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right'>
                                            Wartość
                                        </th>
                                        <th className='p-3 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center w-[90px]'>
                                            Opcje
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-800/40 text-slate-300'>
                                    {filteredAppointments.map((app) => (
                                        <tr
                                            key={app.id}
                                            className='hover:bg-slate-900/40 transition-colors group'>
                                            <td className='p-3 text-center'>
                                                <span className='text-[10px] font-bold font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800/60'>
                                                    {app.id}
                                                </span>
                                            </td>
                                            <td className='p-3'>
                                                <div className='flex items-center space-x-2.5'>
                                                    <img
                                                        src={app.clientAvatar}
                                                        alt={app.clientName}
                                                        className='w-7 h-7 rounded-full object-cover border border-slate-700/60 shrink-0'
                                                    />
                                                    <span className='text-xs font-bold text-white group-hover:text-amber-400 transition-colors'>
                                                        {app.clientName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className='p-3 text-xs font-medium text-slate-200'>
                                                {app.serviceName}
                                            </td>
                                            <td className='p-3 text-xs text-slate-400 font-semibold'>
                                                {app.employee}
                                            </td>
                                            <td className='p-3'>
                                                <p className='text-xs font-bold text-white font-mono'>
                                                    {app.time}
                                                </p>
                                                <p className='text-[10px] text-slate-500 font-medium font-mono'>
                                                    {app.date}
                                                </p>
                                            </td>
                                            <td className='p-3 text-center'>
                                                <span
                                                    className={`inline-flex items-center text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                                                        app.status === 'completed'
                                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                            : app.status === 'confirmed'
                                                              ? 'bg-indigo-400/10 text-indigo-400 border-indigo-500/20'
                                                              : app.status === 'pending'
                                                                ? 'bg-amber-400/10 text-amber-400 border-amber-500/20'
                                                                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                    }`}>
                                                    {app.status === 'completed'
                                                        ? 'Zrealizowana'
                                                        : app.status === 'confirmed'
                                                          ? 'Potwierdzona'
                                                          : app.status === 'pending'
                                                            ? 'Oczekuje'
                                                            : 'Odwołana'}
                                                </span>
                                            </td>
                                            <td className='p-3 text-right text-xs font-black text-amber-400 font-mono'>
                                                {app.price}
                                            </td>
                                            <td className='p-3 text-center'>
                                                <button
                                                    type='button'
                                                    className='w-6 h-6 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white inline-flex items-center justify-center text-xs cursor-pointer'
                                                    title='Zarządzaj rezerwacją'>
                                                    ⚙️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* ---------------- B. WIDOK: TYDZIEŃ (GRID GODZINOWY) ---------------- */}
            {viewMode === 'week' && (
                <div className='bg-[#0b1329] border border-slate-800/80 rounded-xl shadow-xl overflow-hidden p-4'>
                    <div className='flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4'>
                        <span className='text-xs font-bold text-amber-400 font-mono uppercase tracking-wider'>
                            📅 Maj 2026 (Tydzień 21)
                        </span>
                        <div className='flex space-x-1'>
                            <button className='px-2 py-1 bg-slate-950 border border-slate-800 text-slate-400 rounded text-[10px] font-bold hover:text-white'>
                                &lt; Poprzedni
                            </button>
                            <button className='px-2 py-1 bg-slate-950 border border-slate-800 text-slate-400 rounded text-[10px] font-bold hover:text-white'>
                                Następny &gt;
                            </button>
                        </div>
                    </div>

                    <div className='grid grid-cols-6 gap-2 min-w-[700px] overflow-x-auto'>
                        {/* Godzina lewa kolumna */}
                        <div className='space-y-8 text-right pr-2 text-[9px] font-black text-slate-500 uppercase pt-8 font-mono'>
                            <div>09:00</div>
                            <div>11:00</div>
                            <div>13:00</div>
                            <div>15:00</div>
                            <div>17:00</div>
                        </div>

                        {/* Dni robocze */}
                        {[
                            { day: 'Pon', num: '18', active: false },
                            { day: 'Wt', num: '19', active: false },
                            { day: 'Śr', num: '20', active: true }, // Dzisiaj
                            { day: 'Czw', num: '21', active: false },
                            { day: 'Pt', num: '22', active: false },
                        ].map((d) => (
                            <div
                                key={d.day}
                                className={`bg-slate-950/40 border rounded-xl p-2 min-h-[300px] space-y-3 ${d.active ? 'border-amber-500/40 bg-slate-900/20' : 'border-slate-800/50'}`}>
                                <div className='text-center border-b border-slate-800/50 pb-2'>
                                    <p className='text-[10px] font-bold text-slate-400 uppercase'>
                                        {d.day}
                                    </p>
                                    <p
                                        className={`text-xs font-black mt-0.5 ${d.active ? 'text-amber-400' : 'text-white'}`}>
                                        {d.num}.05
                                    </p>
                                </div>

                                {/* Przykładowe kafelki wizyt wpięte w dany dzień */}
                                {d.num === '20' && (
                                    <>
                                        <div className='bg-indigo-500/10 border border-indigo-500/30 p-2 rounded-lg text-left cursor-pointer hover:border-indigo-400 transition-all'>
                                            <p className='text-[9px] font-black text-indigo-400 font-mono'>
                                                09:00 - A. Kowalska
                                            </p>
                                            <p className='text-[8px] font-bold text-slate-300 truncate mt-0.5'>
                                                Balayage Premium
                                            </p>
                                        </div>
                                        <div className='bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-lg text-left cursor-pointer hover:border-emerald-400 transition-all'>
                                            <p className='text-[9px] font-black text-emerald-400 font-mono'>
                                                12:00 - M. Nowak
                                            </p>
                                            <p className='text-[8px] font-bold text-slate-300 truncate mt-0.5'>
                                                Combo Barberskie
                                            </p>
                                        </div>
                                    </>
                                )}

                                {d.num === '21' && (
                                    <div className='bg-amber-500/10 border border-amber-500/20 p-2 rounded-lg text-left cursor-pointer'>
                                        <p className='text-[9px] font-black text-amber-400 font-mono'>
                                            14:30 - K. Zalewska
                                        </p>
                                        <p className='text-[8px] font-bold text-slate-400 truncate mt-0.5'>
                                            Koloryzacja + Keratyna
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ---------------- C. WIDOK: MIESIĄC (SIATKA MINI KALENDARZA) ---------------- */}
            {viewMode === 'month' && (
                <div className='bg-[#0b1329] border border-slate-800/80 rounded-xl shadow-xl p-4'>
                    <div className='flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4'>
                        <span className='text-xs font-black text-white uppercase tracking-wider font-sans'>
                            📆 Maj 2026
                        </span>
                        <span className='text-[10px] font-bold text-slate-400 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg'>
                            Widok miesięczny pełny
                        </span>
                    </div>

                    {/* Dni Tygodnia Header */}
                    <div className='grid grid-cols-7 gap-2 text-center text-[9px] font-black text-slate-500 uppercase tracking-wider mb-2'>
                        <div>Pon</div>
                        <div>Wt</div>
                        <div>Śr</div>
                        <div>Czw</div>
                        <div>Pt</div>
                        <div>Sob</div>
                        <div>Nd</div>
                    </div>

                    {/* Siatka dni miesiąca (Przykładowy wycinek maja) */}
                    <div className='grid grid-cols-7 gap-2 text-left'>
                        {Array.from({ length: 31 }).map((_, i) => {
                            const dayNumber = i + 1;
                            const hasAppointments =
                                dayNumber === 20 || dayNumber === 21 || dayNumber === 22;

                            return (
                                <div
                                    key={i}
                                    className={`min-h-[65px] bg-slate-950/40 border p-1.5 rounded-lg flex flex-col justify-between transition-all group ${
                                        dayNumber === 20
                                            ? 'border-amber-500 bg-slate-900/40'
                                            : 'border-slate-800/60 hover:border-slate-700'
                                    }`}>
                                    <span
                                        className={`text-[10px] font-bold font-mono ${dayNumber === 20 ? 'text-amber-400 font-black' : 'text-slate-400'}`}>
                                        {dayNumber}
                                    </span>

                                    {/* Kropki/wskaźniki wizyt na dole kafelka dnia */}
                                    {hasAppointments ? (
                                        <div className='flex flex-col space-y-0.5'>
                                            <div className='text-[8px] font-black bg-slate-900 text-amber-400 px-1 py-0.2 rounded border border-slate-800/80 truncate text-center scale-90 origin-bottom'>
                                                {dayNumber === 20 ? '2 wizyty' : '1 wizyta'}
                                            </div>
                                        </div>
                                    ) : (
                                        <span className='text-[8px] text-slate-700 font-medium group-hover:text-slate-500 transition-colors'>
                                            Pusto
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
