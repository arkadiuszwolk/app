'use client';

import React, { useState } from 'react';

// --- TYPY ---
type DashboardView = 'list' | 'week' | 'month';

// --- DANE MAKIETOWE (MOCKI) ---
const MOCK_FINANCES = {
    earnedThisMonth: '8 450,00 zł',
    estimatedUpcoming: '3 120,00 zł',
    canceledLoss: '420,00 zł',
};

const MOCK_APPOINTMENTS_LIST = [
    {
        id: 'A1-92',
        customer: 'Kamil Zdun',
        service: 'Strzyżenie męskie + broda',
        employee: 'Jan (Ty)',
        date: '20.05.2026',
        time: '10:00',
        price: '120 zł',
        status: 'confirmed',
    },
    {
        id: 'A1-93',
        customer: 'Helena Mazur',
        service: 'Balayage + Olaplex',
        employee: 'Agnieszka',
        date: '20.05.2026',
        time: '11:30',
        price: '350 zł',
        status: 'confirmed',
    },
    {
        id: 'A1-94',
        customer: 'Robert Kaczmarek',
        service: 'Combo barberskie',
        employee: 'Jan (Ty)',
        date: '21.05.2026',
        time: '14:00',
        price: '130 zł',
        status: 'confirmed',
    },
    {
        id: 'A1-95',
        customer: 'Patrycja Tusk',
        service: 'Modelowanie i keratyna',
        employee: 'Agnieszka',
        date: '22.05.2026',
        time: '09:00',
        price: '280 zł',
        status: 'confirmed',
    },
    {
        id: 'A1-96',
        customer: 'Waldemar Pawlak',
        service: 'Strzyżenie klasyczne',
        employee: 'Jan (Ty)',
        date: '22.05.2026',
        time: '16:15',
        price: '80 zł',
        status: 'pending',
    },
];

const SELECTED_DRAWER_DATA = {
    id: 'A1-93',
    customer: 'Helena Mazur',
    phone: '+48 602 888 111',
    email: 'h.mazur@example.com',
    service: 'Balayage + Rekonstrukcja Włosów Olaplex',
    duration: '120 min',
    price: '350,00 zł',
    date: 'Środa, 20 maja 2026',
    time: '11:30 - 13:30',
    employee: 'Agnieszka',
    status: 'confirmed',
    createdBy: 'Klient (Instagram Link)',
    createdAt: '18.05.2026, 14:22',
    note: 'Ostatnio robiłyśmy chłodny blond, zależy mi na powtórzeniu tego samego odcienia. Proszę też o podcięcie końcówek o max 2 cm.',
};

export default function AppointmentsPage() {
    // STAN: Zarządzanie widokiem i szufladą
    const [currentView, setCurrentView] = useState<DashboardView>('list');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div className='space-y-8'>
            {/* ================= 1. NAGŁÓWEK I FILTRY ================= */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-bold tracking-tight text-slate-950 font-sans'>
                        Zarządzanie wizytami
                    </h1>
                    <p className='text-sm font-medium text-slate-400 mt-1'>
                        Przeglądaj harmonogram i zarządzaj rezerwacjami Twojego zespołu.
                    </p>
                </div>
                <button
                    type='button'
                    className='inline-flex items-center justify-center space-x-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm cursor-pointer self-start sm:self-center'>
                    <i className='fa-solid fa-filter text-slate-400'></i>
                    <span>Zaawansowane filtry</span>
                </button>
            </div>

            {/* ================= 2. KPI: FINANSE I STATYSTYKI ================= */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow'>
                    <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                        Obrót (Bieżący miesiąc)
                    </p>
                    <div className='flex items-baseline space-x-2 mt-2'>
                        <span className='text-2xl font-bold text-slate-900 tracking-tight'>
                            {MOCK_FINANCES.earnedThisMonth}
                        </span>
                        <span className='text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md'>
                            Gotowe
                        </span>
                    </div>
                </div>

                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow'>
                    <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                        Szacowany przychód
                    </p>
                    <div className='flex items-baseline space-x-2 mt-2'>
                        <span className='text-2xl font-bold text-slate-900 tracking-tight'>
                            {MOCK_FINANCES.estimatedUpcoming}
                        </span>
                        <span className='text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md'>
                            W kolejce
                        </span>
                    </div>
                </div>

                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-rose-100 border-l-2'>
                    <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                        Anulowane (Strata)
                    </p>
                    <div className='flex items-baseline space-x-2 mt-2'>
                        <span className='text-2xl font-bold text-rose-600 tracking-tight'>
                            {MOCK_FINANCES.canceledLoss}
                        </span>
                        <span className='text-[10px] font-medium text-slate-400'>Ten miesiąc</span>
                    </div>
                </div>
            </div>

            {/* ================= 3. GŁÓWNY PANEL ZARZĄDZANIA ================= */}
            <div className='bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden min-h-125'>
                {/* Control Bar: Tabs i Search */}
                <div className='p-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-slate-50/30'>
                    {/* SaaS Segmented Control (Tabs) */}
                    <div className='bg-slate-100 p-1 rounded-xl inline-flex items-center space-x-0.5 self-start'>
                        {(['list', 'week', 'month'] as DashboardView[]).map((view) => (
                            <button
                                key={view}
                                type='button'
                                onClick={() => setCurrentView(view)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer capitalize ${
                                    currentView === view
                                        ? 'bg-white text-indigo-600 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-900'
                                }`}>
                                {view === 'list'
                                    ? 'Lista'
                                    : view === 'week'
                                      ? 'Tydzień'
                                      : 'Miesiąc'}
                            </button>
                        ))}
                    </div>

                    {/* Search bar */}
                    <div className='relative max-w-xs w-full'>
                        <i className='fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[11px]'></i>
                        <input
                            type='text'
                            placeholder='Szukaj wizyty...'
                            className='w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all font-medium'
                        />
                    </div>
                </div>

                {/* Content Area */}
                <div className='p-6'>
                    {currentView === 'list' ? (
                        <div className='overflow-x-auto'>
                            <table className='w-full border-collapse text-left text-xs'>
                                <thead>
                                    <tr className='text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100'>
                                        <th className='pb-4 px-2'>Klient</th>
                                        <th className='pb-4 px-2'>Termin</th>
                                        <th className='pb-4 px-2'>Pracownik</th>
                                        <th className='pb-4 px-2'>Wartość</th>
                                        <th className='pb-4 px-2'>Status</th>
                                        <th className='pb-4 px-2 text-right'>Akcja</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-slate-50'>
                                    {MOCK_APPOINTMENTS_LIST.map((app) => (
                                        <tr
                                            key={app.id}
                                            className='hover:bg-slate-50/50 transition-colors group'>
                                            <td className='py-4 px-2'>
                                                <div className='font-bold text-slate-800 text-sm'>
                                                    {app.customer}
                                                </div>
                                                <div className='text-slate-400 font-medium'>
                                                    {app.service}
                                                </div>
                                            </td>
                                            <td className='py-4 px-2'>
                                                <div className='font-bold text-slate-700'>
                                                    {app.time}
                                                </div>
                                                <div className='text-slate-400'>{app.date}</div>
                                            </td>
                                            <td className='py-4 px-2'>
                                                <span className='font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/50'>
                                                    {app.employee}
                                                </span>
                                            </td>
                                            <td className='py-4 px-2 font-black text-slate-800'>
                                                {app.price}
                                            </td>
                                            <td className='py-4 px-2'>
                                                <span
                                                    className={`px-2 py-1 rounded-lg font-bold text-[10px] uppercase border ${
                                                        app.status === 'confirmed'
                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                            : 'bg-amber-50 text-amber-700 border-amber-100'
                                                    }`}>
                                                    {app.status === 'confirmed'
                                                        ? 'Zatwierdzona'
                                                        : 'Oczekuje'}
                                                </span>
                                            </td>
                                            <td className='py-4 px-2 text-right'>
                                                <button
                                                    onClick={() => setIsDrawerOpen(true)}
                                                    className='bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all cursor-pointer'>
                                                    Szczegóły
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center py-20 text-slate-400'>
                            <i className='fa-solid fa-calendar-clock text-4xl mb-4 opacity-20'></i>
                            <p className='font-medium'>
                                Widok kalendarza{' '}
                                {currentView === 'week' ? 'tygodniowego' : 'miesięcznego'} jest w
                                przygotowaniu.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ================= 4. SLIDE-OVER DRAWER (SZCZEGÓŁY) ================= */}
            {/* Backdrop: tło przyciemniające */}
            {isDrawerOpen && (
                <div
                    className='fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-60 transition-opacity'
                    onClick={() => setIsDrawerOpen(false)}
                />
            )}

            <aside
                className={`fixed inset-y-0 right-0 w-full sm:w-120 bg-white z-70 shadow-2xl border-l border-slate-100 flex flex-col transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header szuflady */}
                <div className='h-16 flex items-center justify-between px-6 border-b border-slate-50 bg-slate-50/30'>
                    <div className='flex items-center space-x-3'>
                        <span className='text-[10px] font-black bg-slate-900 text-white px-2 py-0.5 rounded'>
                            ID: {SELECTED_DRAWER_DATA.id}
                        </span>
                        <h2 className='text-sm font-bold text-slate-800'>Szczegóły wizyty</h2>
                    </div>
                    <button
                        onClick={() => setIsDrawerOpen(false)}
                        className='p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer'>
                        <i className='fa-solid fa-xmark text-lg'></i>
                    </button>
                </div>

                {/* Content szuflady */}
                <div className='flex-1 overflow-y-auto p-6 space-y-8'>
                    {/* Profil klienta */}
                    <div className='flex items-center space-x-4'>
                        <div className='w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-100'>
                            {SELECTED_DRAWER_DATA.customer.charAt(0)}
                        </div>
                        <div>
                            <h3 className='text-lg font-black text-slate-900 leading-tight'>
                                {SELECTED_DRAWER_DATA.customer}
                            </h3>
                            <div className='flex items-center space-x-3 mt-1'>
                                <a
                                    href={`tel:${SELECTED_DRAWER_DATA.phone}`}
                                    className='text-xs font-bold text-indigo-600 hover:underline'>
                                    {SELECTED_DRAWER_DATA.phone}
                                </a>
                                <span className='w-1 h-1 bg-slate-300 rounded-full'></span>
                                <span className='text-xs text-slate-400 font-medium'>
                                    {SELECTED_DRAWER_DATA.email}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Szczegóły usługi w formie gridu */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='p-4 bg-slate-50 rounded-2xl border border-slate-100'>
                            <p className='text-[10px] font-bold text-slate-400 uppercase'>Usługa</p>
                            <p className='text-xs font-bold text-slate-800 mt-1'>
                                {SELECTED_DRAWER_DATA.service}
                            </p>
                        </div>
                        <div className='p-4 bg-slate-50 rounded-2xl border border-slate-100'>
                            <p className='text-[10px] font-bold text-slate-400 uppercase'>
                                Pracownik
                            </p>
                            <p className='text-xs font-bold text-slate-800 mt-1'>
                                {SELECTED_DRAWER_DATA.employee}
                            </p>
                        </div>
                        <div className='p-4 bg-slate-50 rounded-2xl border border-slate-100'>
                            <p className='text-[10px] font-bold text-slate-400 uppercase'>Termin</p>
                            <p className='text-xs font-bold text-slate-800 mt-1'>
                                {SELECTED_DRAWER_DATA.date}
                            </p>
                        </div>
                        <div className='p-4 bg-indigo-50 rounded-2xl border border-indigo-100'>
                            <p className='text-[10px] font-bold text-indigo-400 uppercase'>
                                Godzina
                            </p>
                            <p className='text-sm font-black text-indigo-700 mt-1'>
                                {SELECTED_DRAWER_DATA.time}
                            </p>
                        </div>
                    </div>

                    {/* Wiadomość od klienta */}
                    <div className='space-y-2'>
                        <p className='text-[10px] font-bold text-slate-400 uppercase flex items-center space-x-2'>
                            <i className='fa-solid fa-comment-dots text-amber-500'></i>
                            <span>Wiadomość do rezerwacji</span>
                        </p>
                        <div className='p-4 bg-amber-50/50 border border-amber-100 rounded-2xl text-xs font-medium text-amber-900 leading-relaxed italic'>
                            "{SELECTED_DRAWER_DATA.note}"
                        </div>
                    </div>

                    {/* Logi systemowe */}
                    <div className='p-4 border border-slate-100 rounded-2xl space-y-2'>
                        <div className='flex justify-between text-[11px] font-medium'>
                            <span className='text-slate-400'>Źródło rezerwacji</span>
                            <span className='text-slate-700'>{SELECTED_DRAWER_DATA.createdBy}</span>
                        </div>
                        <div className='flex justify-between text-[11px] font-medium'>
                            <span className='text-slate-400'>Data utworzenia</span>
                            <span className='text-slate-700'>{SELECTED_DRAWER_DATA.createdAt}</span>
                        </div>
                    </div>
                </div>

                {/* Footer szuflady: Akcje */}
                <div className='p-6 border-t border-slate-100 bg-slate-50/50 grid grid-cols-2 gap-4'>
                    <button className='py-3 px-4 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all cursor-pointer'>
                        Anuluj wizytę
                    </button>
                    <button className='py-3 px-4 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all cursor-pointer'>
                        Oznacz jako wykonaną
                    </button>
                </div>
            </aside>
        </div>
    );
}
