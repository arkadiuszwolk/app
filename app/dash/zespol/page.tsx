/*
Dodać sliding-tabs: widok biznesowy | widok klienta.
*/

'use client';

import React, { useState } from 'react';
import { EmployeeCard } from './components/EmployeeCard';
import { Card } from './components/Card';

// --- TYPY ---
type StaffFilter = 'all' | 'active' | 'leave';

// --- DANE MAKIETOWE (MOCKI) ---
const MOCK_TEAM_STATS = {
    totalStaff: 5,
    activeToday: 4,
    averageRating: '4.9/5',
};

const MOCK_EMPLOYEES = [
    {
        id: 'EMP-01', // Poprawiłem ID na unikalne dla testu
        firstName: 'Jan',
        lastName: 'Kowalski',
        role: 'Właściciel / Stylista',
        email: 'jan.kowalski@minical.pl',
        phone: '+48 504 777 888',
        status: 'active',
        todayHours: '08:00 - 16:00',
        specialties: ['Wszystkie kategorie'],
        avatarColor: 'from-indigo-500 to-purple-600',
    },
    {
        id: 'EMP-01',
        firstName: 'Agnieszka',
        lastName: 'Nowak',
        role: 'Starsza Stylistka',
        email: 'a.nowak@minical.pl',
        phone: '+48 501 111 222',
        status: 'active',
        todayHours: '09:00 - 17:00',
        specialties: ['Fryzjerstwo damskie', 'Koloryzacja Premium'],
        avatarColor: 'from-pink-500 to-rose-500',
    },
    {
        id: 'EMP-01',
        firstName: 'Tomasz',
        lastName: 'Wiśniewski',
        role: 'Barber / Stylista męski',
        email: 't.wisniewski@minical.pl',
        phone: '+48 502 333 444',
        status: 'active',
        todayHours: '08:00 - 16:00',
        specialties: ['Barber', 'Strzyżenie męskie', 'Golenie brzytwą'],
        avatarColor: 'from-slate-700 to-slate-900',
    },
    {
        id: 'EMP-04',
        firstName: 'Karolina',
        lastName: 'Kowalska',
        role: 'Kosmetolog',
        email: 'k.kowalska@minical.pl',
        phone: '+48 503 555 666',
        status: 'leave',
        todayHours: 'Urlop wypoczynkowy',
        specialties: ['Pielęgnacja twarzy', 'Stylizacja brwi i rzęs'],
        avatarColor: 'from-teal-400 to-emerald-500',
    },
];

export default function TeamManagementPage() {
    const [currentFilter, setCurrentFilter] = useState<StaffFilter>('all');

    const filteredTeam = MOCK_EMPLOYEES.filter((emp) => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'active') return emp.status === 'active';
        if (currentFilter === 'leave') return emp.status === 'leave';
        return true;
    });

    // ZAKODOWANE FALE SVG (Miedziane dla jasnych kart, złote dla ciemnej)
    // Kolor miedziany/bursztynowy dopasowany do Twojego obrazka #b45309 (Amber-700) oraz #f59e0b dla ciemnej
    const lightCardWaves = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23fef3c7' stroke-width='1.5' stroke-opacity='1'%3E%3Cpath d='M0 160 Q40 130 80 160 T160 160 T240 160' /%3E%3Cpath d='M0 140 Q40 110 80 140 T160 140 T240 140' /%3E%3Cpath d='M0 120 Q40 90 80 120 T160 120 T240 120' /%3E%3Cpath d='M0 100 Q40 70 80 100 T160 100 T240 100' /%3E%3Cpath d='M0 80 Q40 50 80 80 T160 80 T240 80' /%3E%3Cpath d='M0 60 Q40 30 80 60 T160 60 T240 60' /%3E%3C/g%3E%3C/svg%3E")`;
    const darkCardWaves = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23fef3c7' stroke-width='1.5' stroke-opacity='1'%3E%3Cpath d='M0 160 Q40 130 80 160 T160 160 T240 160' /%3E%3Cpath d='M0 140 Q40 110 80 140 T160 140 T240 140' /%3E%3Cpath d='M0 120 Q40 90 80 120 T160 120 T240 120' /%3E%3Cpath d='M0 100 Q40 70 80 100 T160 100 T240 100' /%3E%3Cpath d='M0 80 Q40 50 80 80 T160 80 T240 80' /%3E%3Cpath d='M0 60 Q40 30 80 60 T160 60 T240 60' /%3E%3C/g%3E%3C/svg%3E")`;

    return (
        <div className='space-y-8'>
            {/* ================= 1. NAGŁÓWEK I DIALOG REKRUTACJI ================= */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-bold tracking-tight text-slate-950 font-sans'>
                        Twój Zespół i Pracownicy
                    </h1>
                    <p className='text-sm font-medium text-slate-400 mt-1'>
                        Zarządzaj grafikami, uprawnieniami, rolami oraz specjalizacjami członków
                        zespołu.
                    </p>
                </div>
                <button
                    type='button'
                    className='inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-3 rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer self-start sm:self-center'>
                    <i className='fa-solid fa-user-plus'></i>
                    <span>Dodaj pracownika</span>
                </button>
            </div>

            {/* ================= 2. METRYKI I KPI ZESPOŁU ================= */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {/* KARTA 1: ZESPÓŁ, OBSADA I UPSELL */}
                <div
                    className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]'
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f1f5f9' stroke-width='1.5'%3E%3Cpath d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M22 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E")`,
                        backgroundSize: '150px 150px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '-30px 20px',
                    }}>
                    <div className='relative z-10'>
                        <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                            Twój Zespół i Plan
                        </p>
                        <div className='flex items-baseline space-x-2 mt-1.5'>
                            <span className='text-2xl font-bold text-slate-900 tracking-tight'>
                                {MOCK_TEAM_STATS.activeToday} z {MOCK_TEAM_STATS.totalStaff}
                            </span>
                            <span className='text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md'>
                                możliwych członków zespołu
                            </span>
                        </div>
                    </div>

                    <div className='relative z-10 mt-3 pt-2 border-t border-slate-50 flex items-center justify-between gap-3'>
                        <p className='text-[10px] text-slate-400 leading-normal max-w-[65%]'>
                            Plan pozwala na max. 5 osób.
                            <br />
                            Przejdź na{' '}
                            <strong className='text-slate-600 font-semibold'>
                                PRO (do 15 stanowisk)
                            </strong>
                            .
                        </p>
                        <button className='text-[10px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap shadow-sm'>
                            Zmień plan
                        </button>
                    </div>
                </div>

                {/* KARTA 2: EFEKTYWNOŚĆ / OBŁOŻENIE */}
                <div
                    className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]'
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f1f5f9' stroke-width='1.5'%3E%3Cpath d='M22 12h-4l-3 9L9 3l-3 9H2'/%3E%3C/svg%3E")`,
                        backgroundSize: '150px 150px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '-20px 10px',
                    }}>
                    <div className='relative z-10'>
                        <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                            Obłożenie Salonu
                        </p>
                        <div className='flex items-baseline space-x-2 mt-1.5'>
                            <span className='text-2xl font-bold text-emerald-600 tracking-tight'>
                                78%
                            </span>
                            <span className='text-[10px] font-medium text-slate-400'>
                                na dzisiejsze zmiany
                            </span>
                        </div>
                    </div>

                    <div className='relative z-10 mt-3 pt-2 border-t border-slate-50'>
                        <p className='text-[10px] text-slate-400 leading-normal'>
                            ⚡ Najbardziej pracowite godziny dzisiaj:{' '}
                            <span className='font-semibold text-slate-600'>12:00 - 16:00</span>.
                            Agnieszka Nowak ma dziś komplet!
                        </p>
                    </div>
                </div>

                {/* KARTA 3: REPUTACJA I MARKETING */}
                <div
                    className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between min-h-35'
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f1f5f9' stroke-width='1.5'%3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/%3E%3C/svg%3E")`,
                        backgroundSize: '150px 150px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '-30px 10px',
                    }}>
                    <div className='relative z-10'>
                        <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                            Reputacja i Opinie
                        </p>
                        <div className='flex items-baseline space-x-2 mt-1.5'>
                            <span className='text-2xl font-bold text-amber-500 tracking-tight flex items-center gap-1'>
                                {MOCK_TEAM_STATS.averageRating} <span className='text-lg'>★</span>
                            </span>
                            <span className='text-[10px] font-medium text-slate-400'>
                                z Google / Widgetu
                            </span>
                        </div>
                    </div>

                    <div className='relative z-10 mt-3 pt-2 border-t border-slate-50 flex items-center justify-between gap-2'>
                        <p className='text-[10px] text-slate-400 leading-normal max-w-[70%] line-clamp-2'>
                            Ostatnia opinia:{' '}
                            <span className='italic text-slate-500'>
                                "Najlepszy barber w mieście..."
                            </span>
                        </p>
                        <button
                            className='text-[10px] font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 p-1.5 rounded-lg transition-colors shadow-sm'
                            title='Pobierz grafikę na Instagram'>
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
                                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                                <polyline points='7 10 12 15 17 10' />
                                <line x1='12' y1='15' x2='12' y2='3' />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= 3. FILTER TABS ================= */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-2'>
                <div className='bg-slate-100 p-1 rounded-xl inline-flex items-center space-x-0.5 self-start'>
                    {(['all', 'active', 'leave'] as StaffFilter[]).map((filter) => (
                        <button
                            key={filter}
                            type='button'
                            onClick={() => setCurrentFilter(filter)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer capitalize ${
                                currentFilter === filter
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900'
                            }`}>
                            {filter === 'all'
                                ? 'Wszyscy'
                                : filter === 'active'
                                  ? 'Dzisiaj w pracy'
                                  : 'Na urlopie'}
                        </button>
                    ))}
                </div>
            </div>

            {/* ================= 4. SIATKA PROFILI ================= */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                {filteredTeam.map((employee) => {
                    const initials =
                        `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`.toUpperCase();
                    // Sprawdzamy właściciela po imieniu Jan (lub unikalnej roli), ponieważ ID w mockach były identyczne
                    const isOwner = employee.id === 'EMP-01';
                    const isLeave = employee.status === 'leave';

                    return (
                        <div
                            key={employee.id + employee.firstName}
                            className={`border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group overflow-hidden ${
                                isOwner
                                    ? 'bg-slate-950 text-white border-slate-900 shadow-xl shadow-slate-950/10'
                                    : isLeave
                                      ? 'bg-white/70 border-slate-100 opacity-65 grayscale-30 hover:opacity-100 hover:grayscale-0'
                                      : 'bg-white border-slate-100 hover:border-slate-200/60'
                            }`}>
                            {/* ==============================================================
                              TERAZ DZIAŁAJĄCE LINIE TŁA (INLINE DATA-URI SVG)
                              ============================================================== */}
                            <div
                                className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 ${
                                    isOwner
                                        ? 'opacity-[0.12] group-hover:opacity-[0.50]' // Ciemna karta potrzebuje odrobinę większej widoczności
                                        : 'opacity-[0.06] group-hover:opacity-[0.50]'
                                }`}
                                style={{
                                    backgroundImage: isOwner ? darkCardWaves : lightCardWaves,
                                    backgroundSize: '180px 180px',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right -35px bottom -45px', // Przesunięcie subtelnie w prawy dolny róg karty
                                }}
                            />

                            {/* Treść karty podbita przez z-10, aby linie były dokładnie pod spodem */}
                            <div className='z-10 flex flex-col justify-between h-full w-full relative'>
                                <div className='flex items-center justify-between mb-4'>
                                    <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                            isOwner
                                                ? 'bg-slate-900 text-slate-400 border-slate-800'
                                                : 'bg-slate-50 text-slate-400 border-slate-100'
                                        }`}>
                                        {employee.id}
                                    </span>

                                    <span
                                        className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase border tracking-wider ${
                                            isOwner
                                                ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                                : employee.status === 'active'
                                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                  : 'bg-amber-50 text-amber-700 border-amber-100'
                                        }`}>
                                        {isOwner
                                            ? 'Właściciel'
                                            : employee.status === 'active'
                                              ? 'W pracy'
                                              : 'Urlop'}
                                    </span>
                                </div>

                                <div className='flex items-center space-x-4'>
                                    <div
                                        className={`w-14 h-14 bg-linear-to-tr ${employee.avatarColor} rounded-2xl flex items-center justify-center text-white text-base font-black shadow-md shrink-0 group-hover:scale-105 transition-transform`}>
                                        {initials}
                                    </div>
                                    <div className='min-w-0 flex-1'>
                                        <h3
                                            className={`text-sm font-bold truncate ${isOwner ? 'text-white' : 'text-slate-900'}`}>
                                            {employee.firstName} {employee.lastName}
                                        </h3>
                                        <p
                                            className={`text-xs font-semibold mt-0.5 truncate ${isOwner ? 'text-indigo-400' : 'text-indigo-600'}`}>
                                            {employee.role}
                                        </p>
                                        <p className='text-[11px] font-medium mt-1 truncate text-slate-400'>
                                            <i className='fa-regular fa-clock mr-1'></i>Dziś:{' '}
                                            <strong
                                                className={
                                                    isOwner ? 'text-slate-200' : 'text-slate-700'
                                                }>
                                                {employee.todayHours}
                                            </strong>
                                        </p>
                                    </div>
                                </div>

                                <div className='mt-5 space-y-1.5'>
                                    <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>
                                        Specjalizacja
                                    </p>
                                    <div className='flex flex-wrap gap-1'>
                                        {employee.specialties.map((spec, i) => (
                                            <span
                                                key={i}
                                                className={`text-[11px] font-medium px-2 py-0.5 rounded-lg border ${
                                                    isOwner
                                                        ? 'bg-slate-900 text-slate-300 border-slate-800'
                                                        : 'bg-slate-50 text-slate-600 border-slate-100'
                                                }`}>
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div
                                    className={`mt-6 pt-4 flex items-center justify-between border-t ${
                                        isOwner ? 'border-slate-900' : 'border-slate-100'
                                    }`}>
                                    <div className='flex items-center space-x-2 text-xs font-medium'>
                                        <a
                                            href={`tel:${employee.phone}`}
                                            className={`p-1.5 rounded-lg border transition-colors ${
                                                isOwner
                                                    ? 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                                                    : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100 hover:text-slate-800'
                                            }`}
                                            title='Zadzwoń'>
                                            <i className='fa-solid fa-phone'></i>
                                        </a>
                                        <a
                                            href={`mailto:${employee.email}`}
                                            className={`p-1.5 rounded-lg border transition-colors ${
                                                isOwner
                                                    ? 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
                                                    : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100 hover:text-slate-800'
                                            }`}
                                            title='Napisz maila'>
                                            <i className='fa-solid fa-envelope'></i>
                                        </a>
                                    </div>

                                    <div className='flex items-center space-x-1.5'>
                                        <button
                                            type='button'
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm border ${
                                                isOwner
                                                    ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
                                                    : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
                                            }`}>
                                            Grafik
                                        </button>
                                        <button
                                            type='button'
                                            title='Ustawienia profilu i uprawnień'
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors cursor-pointer ${
                                                isOwner
                                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                                    : 'bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white'
                                            }`}>
                                            <i className='fa-solid fa-sliders'></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {/* Pracownik 1: Właściciel z pełnymi danymi i bio */}
                <EmployeeCard
                    firstName='Tomasz'
                    lastName='Nowak'
                    role='Właściciel / Top Barber'
                    phone='+48 501 234 567'
                    email='tomasz.nowak@salon.pl'
                    bio='Specjalista od klasycznych strzyżeń męskich i tradycyjnego golenia brzytwą. 8 lat doświadczenia.'
                    todayAppointmentsCount={6}
                    todayEarnings={780}
                    isWorkingToday={true}
                />
                {/* Pracownik 2: Pracownik z bio */}
                <EmployeeCard
                    firstName='Marta'
                    lastName='Kowalska'
                    role='Stylistka Fryzur'
                    phone='+48 602 987 654'
                    email='marta.kowalska@salon.pl'
                    bio='Mistrzyni nowoczesnych koloryzacji i awangardowych strzyżeń damskich.'
                    todayAppointmentsCount={4}
                    todayEarnings={520}
                    isWorkingToday={true}
                />
                {/* Pracownik 3: Nowy pracownik, który jeszcze nie ma ustawionego opisu Bio */}
                <EmployeeCard
                    firstName='Jarek'
                    lastName='Wiśniewski'
                    role='Młodszy Barber'
                    phone='+48 703 111 222'
                    email='jarek.wisniewski@salon.pl'
                    // bio pomijamy – komponent obsłuży to bez błędu i nie pokaże dymka
                    todayAppointmentsCount={2}
                    todayEarnings={180}
                    isWorkingToday={false} // Jarek ma dziś wolne – kropka statusu będzie szara/zniknie
                />
                {/* */}
                <div className='border rounded-2xl p-6 shadow-2xl transition-all flex flex-col justify-between relative group overflow-hidden bg-slate-950 border-slate-900 shadow-slate-950/20 text-white'>
                    {/* Dynamiczne linie tła (Inline SVG - Białe na ciemnym tle) */}
                    <div
                        className='absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-[0.08] group-hover:opacity-[0.40]'
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 100 C 30 70, 70 30, 100 0 M0 80 C 40 60, 60 40, 100 -20 M-20 100 C 40 40, 40 40, 100 20' fill='none' stroke='%23ffffff' stroke-width='0.4'/%3E%3C/svg%3E")`,
                            backgroundSize: '200px 200px',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right -40px bottom -50px',
                        }}
                    />

                    {/* Treść karty */}
                    <div className='z-10 flex flex-col justify-between h-full w-full relative'>
                        {/* GÓRNY PASEK: ID oraz Status */}
                        <div className='flex items-center justify-between mb-4'>
                            <span className='text-[11px] font-bold px-2.5 py-1 rounded-md border bg-slate-900 text-slate-400 border-slate-800'>
                                #1
                            </span>

                            <span className='px-2.5 py-1 rounded-md font-bold text-[11px] uppercase border tracking-wider bg-emerald-500/10 text-emerald-400 border-emerald-500/20 flex items-center gap-1.5'>
                                <span className='relative flex h-2 w-2'>
                                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                                    <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500'></span>
                                </span>
                                W pracy
                            </span>
                        </div>

                        {/* ŚRODKOWA SEKCJA: Avatar i Dane podstawowe */}
                        <div className='flex items-center space-x-5'>
                            <div className='w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-lg shrink-0 group-hover:scale-105 transition-transform border border-white/5'>
                                MN
                            </div>
                            <div className='min-w-0 flex-1'>
                                <h3 className='text-base font-extrabold truncate text-white tracking-tight'>
                                    Michał Nowak
                                </h3>
                                <p className='text-sm font-semibold mt-0.5 truncate text-indigo-300'>
                                    Stylista
                                </p>
                                <div className='mt-2.5 space-y-1 text-xs text-slate-300'>
                                    <p className='flex items-center gap-2.5 truncate'>
                                        <i className='fa-solid fa-phone text-indigo-400 w-4 text-center'></i>
                                        <span>+48 502 674 684</span>
                                    </p>
                                    <p className='flex items-center gap-2.5 truncate hover:text-indigo-300 transition-colors'>
                                        <i className='fa-solid fa-envelope text-indigo-400 w-4 text-center'></i>
                                        <span>m.nowak@gmail.com</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* SEKCJA MIKRO-STATYSTYK (POWIĘKSZONE DANE) */}
                        <div className='mt-6 flex items-center justify-between gap-4'>
                            {/* Statystyka 1: Wizyty */}
                            <div className='flex-1 rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col items-center gap-3'>
                                <span className='text-[10px] text-slate-400 uppercase tracking-widest font-bold leading-tight text-center'>
                                    Wykonane
                                    <br />
                                    wizyty
                                </span>
                                <div className='w-full h-16 rounded-xl flex items-center justify-center border border-indigo-950 shadow-inner'>
                                    <span className='text-5xl font-black text-amber-500 tracking-tighter'>
                                        5
                                    </span>
                                </div>
                            </div>
                            {/* Statystyka 2: Przychód */}
                            <div className='flex-1 rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col items-center gap-3'>
                                <span className='text-[10px] text-slate-400 uppercase tracking-widest font-bold leading-tight text-center'>
                                    Wygenerowany
                                    <br />
                                    przychód
                                </span>
                                <div className='w-full h-16 rounded-xl flex items-center justify-center border border-indigo-950 shadow-inner'>
                                    <span className='text-4xl font-black text-amber-500 tracking-tighter'>
                                        450 <span className='text-xl font-bold'>PLN</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* DOLNY PASEK: Przyciski akcji (Historia, Edytuj, Usuń) */}
                        <div className='mt-6 pt-5 flex items-center justify-between border-t border-slate-900'>
                            <div className='flex items-center space-x-2.5'>
                                {/* Edytuj */}
                                <button
                                    type='button'
                                    title='Edytuj profil pracownika'
                                    className='p-2.5 rounded-xl border border-white/5 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-xs font-semibold'>
                                    <i className='fa-solid fa-pen text-[13px]'></i>
                                    Edytuj
                                </button>
                                {/* Historia */}
                                <button
                                    type='button'
                                    title='Zobacz historię wizyt tego pracownika'
                                    className='p-2.5 rounded-xl border border-white/5 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-xs font-semibold'>
                                    <i className='fa-solid fa-clock-rotate-left text-[13px]'></i>
                                    Historia
                                </button>
                                {/* Usuń */}
                                <button
                                    type='button'
                                    title='Usuń pracownika (Wymaga potwierdzenia)'
                                    className='p-2.5 rounded-xl border border-white/5 bg-slate-900 text-slate-300 hover:bg-red-950 hover:text-red-300 transition-colors cursor-pointer flex items-center gap-2 text-xs font-semibold'>
                                    <i className='fa-solid fa-trash-can text-[13px]'></i>
                                    Usuń
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* */}
                {/* Domyślna pusta karta z plusem do otwierania Drawera */}
                <div className='w-full max-w-[340px] h-[240px] rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#0B132B] flex flex-col items-center justify-center text-slate-400 hover:text-[#0B132B] transition-all duration-300 cursor-pointer bg-white group shadow-sm hover:shadow-md'>
                    <div className='w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#0B132B]/5 transition-colors duration-300'>
                        <span className='text-2xl font-light leading-none text-slate-500 group-hover:text-[#0B132B]'>
                            +
                        </span>
                    </div>
                    <span className='text-xs font-semibold tracking-wide mt-3 uppercase text-slate-400 group-hover:text-[#0B132B]'>
                        Dodaj pracownika
                    </span>
                </div>
                <Card
                    employee={{
                        fullName: 'Anna Kowalska',
                        position: 'Stylistka',
                        phone: '+48 512 345 678',
                        email: 'anna.kowalska@salonbella.pl',

                        visits: 184,
                        income: 28750,
                    }}
                />
            </div>

            {/* PUSTY STAN */}
            {filteredTeam.length === 0 && (
                <div className='text-center py-20 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center'>
                    <i className='fa-solid fa-user-group text-4xl text-slate-200 mb-4'></i>
                    <p className='text-sm font-bold text-slate-800'>
                        Brak osób spełniających kryteria
                    </p>
                    <p className='text-xs text-slate-400 font-medium mt-1'>
                        Zmień filtr, aby zobaczyć pozostałych pracowników.
                    </p>
                </div>
            )}
        </div>
    );
}
