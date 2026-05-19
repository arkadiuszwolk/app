'use client';

import React, { useState } from 'react';

// --- TYPY ---
type CustomerFilter = 'all' | 'vip' | 'new' | 'inactive';

// --- DANE MAKIETOWE (MOCKI) ---
const MOCK_CRM_STATS = {
    totalCustomers: '1 248',
    activeRetention: '68%', // procent powracających klientów
    averageLtv: '480,00 zł', // średni wydatek klienta w salonie
};

const MOCK_CUSTOMERS = [
    {
        id: 'C-402',
        name: 'Magdalena Szulc',
        phone: '+48 501 999 888',
        email: 'm.szulc@example.com',
        totalVisits: 14,
        totalSpent: '2 450 zł',
        lastVisit: '12.05.2026',
        tag: 'vip',
    },
    {
        id: 'C-403',
        name: 'Piotr Nowak',
        phone: '+48 602 111 222',
        email: 'piotr.nowak@example.com',
        totalVisits: 1,
        totalSpent: '120 zł',
        lastVisit: '19.05.2026',
        tag: 'new',
    },
    {
        id: 'C-404',
        name: 'Karolina Woźniak',
        phone: '+48 733 444 555',
        email: 'k.wozniak@example.com',
        totalVisits: 8,
        totalSpent: '1 150 zł',
        lastVisit: '30.04.2026',
        tag: 'regular',
    },
    {
        id: 'C-405',
        name: 'Marek Podgórski',
        phone: '+48 505 222 333',
        email: 'marek.p@example.com',
        totalVisits: 5,
        totalSpent: '680 zł',
        lastVisit: '15.03.2026',
        tag: 'regular',
    },
    {
        id: 'C-406',
        name: 'Anna Lis',
        phone: '+48 601 777 888',
        email: 'anna.lis@example.com',
        totalVisits: 12,
        totalSpent: '1 980 zł',
        lastVisit: '02.02.2026',
        tag: 'inactive',
    },
];

export default function CustomersCRMPage() {
    // STAN: Wyszukiwarka i aktywne filtry
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<CustomerFilter>('all');

    // Logika filtrowania i wyszukiwania
    const filteredCustomers = MOCK_CUSTOMERS.filter((customer) => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;
        if (activeFilter === 'all') return true;
        if (activeFilter === 'vip') return customer.tag === 'vip';
        if (activeFilter === 'new') return customer.tag === 'new';
        if (activeFilter === 'inactive') return customer.tag === 'inactive';
        return true;
    });

    return (
        <div className='space-y-8'>
            {/* ================= 1. NAGŁÓWEK I EKSPORT DANYCH ================= */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-bold tracking-tight text-slate-950 font-sans'>
                        Baza Klientów (CRM)
                    </h1>
                    <p className='text-sm font-medium text-slate-400 mt-1'>
                        Przeglądaj historię zakupową, zarządzaj profilami i segmentuj grupy
                        odbiorców.
                    </p>
                </div>
                <div className='flex items-center space-x-2 self-start sm:self-center'>
                    <button
                        type='button'
                        className='inline-flex items-center justify-center space-x-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm cursor-pointer'>
                        <i className='fa-solid fa-download text-slate-400'></i>
                        <span>Eksportuj CSV</span>
                    </button>
                    <button
                        type='button'
                        className='inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer'>
                        <i className='fa-solid fa-plus'></i>
                        <span>Nowy profil</span>
                    </button>
                </div>
            </div>

            {/* ================= 2. ANALITYKA BAZY KLIENCKIEJ (KPI) ================= */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {/* Łącznie zarejestrowanych */}
                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm'>
                    <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                        Wszyscy Klienci
                    </p>
                    <div className='flex items-baseline space-x-2 mt-2'>
                        <span className='text-2xl font-bold text-slate-900 tracking-tight'>
                            {MOCK_CRM_STATS.totalCustomers}
                        </span>
                        <span className='text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md'>
                            <i className='fa-solid fa-trend-up mr-0.5'></i> +12 w tym tyg.
                        </span>
                    </div>
                </div>

                {/* Retencja (Powracalność) */}
                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm border-l-indigo-100 border-l-2'>
                    <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                        Wskaźnik powracalności
                    </p>
                    <div className='flex items-baseline space-x-2 mt-2'>
                        <span className='text-2xl font-bold text-indigo-600 tracking-tight'>
                            {MOCK_CRM_STATS.activeRetention}
                        </span>
                        <span className='text-[10px] font-semibold text-slate-400'>
                            lojalnych klientów
                        </span>
                    </div>
                </div>

                {/* Średnie LTV */}
                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm'>
                    <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                        Średnie LTV (Wartość klienta)
                    </p>
                    <div className='flex items-baseline space-x-2 mt-2'>
                        <span className='text-2xl font-bold text-slate-900 tracking-tight'>
                            {MOCK_CRM_STATS.averageLtv}
                        </span>
                        <span className='text-[10px] font-medium text-slate-400'>
                            na jeden profil
                        </span>
                    </div>
                </div>
            </div>

            {/* ================= 3. MODUŁ FILTROWANIA I WYSZUKIWARKA ================= */}
            <div className='bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden min-h-125'>
                {/* Pasek narzędziowy: Filtry + Search */}
                <div className='p-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-slate-50/30'>
                    {/* CRM Segmented Control (Tabs) */}
                    <div className='bg-slate-100 p-1 rounded-xl inline-flex items-center space-x-0.5 self-start'>
                        {(['all', 'vip', 'new', 'inactive'] as CustomerFilter[]).map((filter) => (
                            <button
                                key={filter}
                                type='button'
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer capitalize ${
                                    activeFilter === filter
                                        ? 'bg-white text-indigo-600 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-900'
                                }`}>
                                {filter === 'all'
                                    ? 'Wszyscy'
                                    : filter === 'vip'
                                      ? 'Klienci VIP'
                                      : filter === 'new'
                                        ? 'Nowi'
                                        : 'Uśpieni'}
                            </button>
                        ))}
                    </div>

                    {/* Zaawansowana wyszukiwarka live */}
                    <div className='relative max-w-xs w-full'>
                        <i className='fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs'></i>
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Szukaj po nazwisku, tel lub e-mail...'
                            className='w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/40 transition-all font-medium placeholder-slate-400'
                        />
                    </div>
                </div>

                {/* ================= 4. TABELA KLIENCKA (CRM MAIN DATA) ================= */}
                <div className='p-6'>
                    <div className='overflow-x-auto -mx-6'>
                        <table className='w-full min-w-225 border-collapse text-left text-xs'>
                            <thead>
                                <tr className='text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 bg-slate-50/10'>
                                    <th className='pb-4 px-6'>Klient</th>
                                    <th className='pb-4 px-6'>Kontakt</th>
                                    <th className='pb-4 px-6 text-center'>Wizyty</th>
                                    <th className='pb-4 px-6'>Łączny obrót</th>
                                    <th className='pb-4 px-6'>Ostatnia wizyta</th>
                                    <th className='pb-4 px-6 text-right'>Zarządzaj</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-slate-50'>
                                {filteredCustomers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className='hover:bg-slate-50/40 transition-colors group'>
                                        {/* Kolumna: Nazwisko + Badge */}
                                        <td className='py-4 px-6'>
                                            <div className='flex items-center space-x-3'>
                                                <div className='w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 font-bold border border-slate-200 text-[11px]'>
                                                    {customer.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </div>
                                                <div>
                                                    <span className='font-bold text-slate-800 text-sm block'>
                                                        {customer.name}
                                                    </span>
                                                    <span
                                                        className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider mt-0.5 border ${
                                                            customer.tag === 'vip'
                                                                ? 'bg-amber-50 text-amber-700 border-amber-100'
                                                                : customer.tag === 'new'
                                                                  ? 'bg-sky-50 text-sky-700 border-sky-100'
                                                                  : customer.tag === 'inactive'
                                                                    ? 'bg-rose-50 text-rose-700 border-rose-100'
                                                                    : 'bg-slate-100 text-slate-600 border-slate-200/60'
                                                        }`}>
                                                        {customer.tag === 'vip'
                                                            ? '👑 VIP'
                                                            : customer.tag === 'new'
                                                              ? 'Nowy'
                                                              : customer.tag === 'inactive'
                                                                ? 'Uśpiony'
                                                                : 'Stały'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Kolumna: Dane kontaktowe */}
                                        <td className='py-4 px-6 font-medium text-slate-600'>
                                            <div className='space-y-0.5'>
                                                <p className='text-slate-800 font-semibold'>
                                                    {customer.phone}
                                                </p>
                                                <p className='text-slate-400 text-[11px]'>
                                                    {customer.email}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Kolumna: Liczba wizyt */}
                                        <td className='py-4 px-6 text-center'>
                                            <span className='font-bold text-slate-800 bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-lg'>
                                                {customer.totalVisits}
                                            </span>
                                        </td>

                                        {/* Kolumna: Łączna kwota */}
                                        <td className='py-4 px-6 font-black text-slate-900 text-sm'>
                                            {customer.totalSpent}
                                        </td>

                                        {/* Kolumna: Ostatnia wizyta */}
                                        <td className='py-4 px-6 font-medium text-slate-500'>
                                            {customer.lastVisit}
                                        </td>

                                        {/* Kolumna: Szybka akcja */}
                                        <td className='py-4 px-6 text-right'>
                                            <div className='flex items-center justify-end space-x-1.5 opacity-80 group-hover:opacity-100 transition-opacity'>
                                                <button
                                                    type='button'
                                                    title='Historia wizyt i karta zdrowia'
                                                    className='p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100 rounded-xl transition-colors cursor-pointer text-xs'>
                                                    <i className='fa-solid fa-clock-history'></i>
                                                </button>
                                                <button
                                                    type='button'
                                                    title='Edytuj dane profilowe'
                                                    className='p-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl transition-all cursor-pointer text-xs'>
                                                    <i className='fa-solid fa-user-gear'></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* KONTROLNY PUSTY STAN WYSZUKIWANIA */}
                    {filteredCustomers.length === 0 && (
                        <div className='text-center py-16 flex flex-col items-center justify-center text-slate-400'>
                            <i className='fa-solid fa-user-slash text-4xl mb-3 opacity-20'></i>
                            <p className='font-bold text-slate-700 text-sm'>
                                Brak wyników wyszukiwania
                            </p>
                            <p className='text-xs text-slate-400 max-w-xs mt-1'>
                                Nie znaleźliśmy klienta pasującego do frazy "{searchQuery}". Sprawdź
                                pisownię lub zmień filtr.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
