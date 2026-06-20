'use client';

import { Tabela } from '@/components/Tabela';
import React, { useState } from 'react';

// --- TYPY ---
type ClientStatus = 'all' | 'premium' | 'regular' | 'inactive';

// --- DANE MAKIETOWE (MOCKI KLIENTÓW) ---
const MOCK_STATS = {
    totalClients: 142,
    activeThisMonth: 89,
    avgLifetimeValue: '420,00 zł',
};

const MOCK_CLIENTS = [
    {
        id: 'K-01',
        name: 'Anna Kowalska',
        status: 'premium',
        totalVisits: 24,
        totalSpent: '3 850,00 zł',
        lastVisit: '12.05.2026',
        preferredService: 'Balayage Premium',
        phone: '+48 500 123 456',
        email: 'a.kowalska@example.com',
        avatarUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'K-02',
        name: 'Mariusz Nowak',
        status: 'regular',
        totalVisits: 12,
        totalSpent: '1 680,00 zł',
        lastVisit: '18.05.2026',
        preferredService: 'Combo Barberskie',
        phone: '+48 601 456 789',
        email: 'm.nowak@example.com',
        avatarUrl:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'K-03',
        name: 'Karolina Zalewska',
        status: 'premium',
        totalVisits: 18,
        totalSpent: '2 940,00 zł',
        lastVisit: '30.04.2026',
        preferredService: 'Koloryzacja jednolita',
        phone: '+48 732 987 654',
        email: 'k.zalewska@example.com',
        avatarUrl:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
        id: 'K-04',
        name: 'Piotr Wiśniewski',
        status: 'inactive',
        totalVisits: 2,
        totalSpent: '230,00 zł',
        lastVisit: '14.01.2026',
        preferredService: 'Strzyżenie męskie',
        phone: '+48 512 345 678',
        email: 'p.wisniewski@example.com',
        avatarUrl:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
];

function BlueprintPattern() {
    // Zakodowany wektorowo idealny pasek 1px w odstępach co 12px
    const svgPattern = `"data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-3,3 l6,-6 M0,12 l12,-12 M9,15 l6,-6' stroke='%23e2e8f0' stroke-width='1'/%3E%3C/svg%3E"`;

    return (
        <div
            className='w-full h-40 border-r border-slate-400/20'
            style={{
                backgroundImage: `url(${svgPattern})`,
                opacity: 2,
            }}
        />
    );
}

export default function ClientsTablePage() {
    const [activeStatus, setActiveStatus] = useState<ClientStatus>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredClients = MOCK_CLIENTS.filter((client) => {
        const matchesStatus = activeStatus === 'all' ? true : client.status === activeStatus;
        const matchesSearch =
            client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.phone.includes(searchQuery);
        return matchesStatus && matchesSearch;
    });

    return (
        <div className='space-y-6'>
            {/* ================= 1. NAGŁÓWEK Z AKCJĄ ================= */}
            {/* <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                    <h1 className='text-xl font-black tracking-tight text-slate-950 font-sans'>
                        Baza Klientów
                    </h1>
                    <p className='text-xs font-medium text-slate-500 mt-0.5'>
                        Filtruj, przeszukuj i zarządzaj kartotekami klientów oraz ich historią
                        finansową.
                    </p>
                </div>
                <button
                    type='button'
                    className='inline-flex items-center justify-center space-x-2 bg-[#0b1329] border border-slate-900 text-amber-400 hover:text-white hover:bg-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer self-start sm:self-center'>
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
                        <path d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
                        <circle cx='8.5' cy='7' r='4'></circle>
                        <line x1='20' y1='11' x2='20' y2='17'></line>
                        <line x1='17' y1='14' x2='23' y2='14'></line>
                    </svg>
                    <span>Dodaj nowego klienta</span>
                </button>
            </div> */}

            {/* ================= 2. ANALITYKA BAZY (KOMPAKTOWE KPI) ================= */}
            {/* <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                
                <div className='bg-[#0b1329] p-4 border border-slate-800/60 rounded-xl shadow-md flex items-center justify-between'>
                    <div>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>
                            Baza Klientów
                        </p>
                        <h3 className='text-xl font-black text-white mt-0.5'>
                            {MOCK_STATS.totalClients}
                        </h3>
                    </div>
                    <span className='text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20'>
                        +{MOCK_STATS.activeThisMonth} aktywnych m/m
                    </span>
                </div>

                
                <div className='bg-[#0b1329] p-4 border border-slate-800/60 rounded-xl shadow-md flex items-center justify-between'>
                    <div>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>
                            Średni Przychód / Klient
                        </p>
                        <h3 className='text-xl font-black text-amber-400 mt-0.5'>
                            {MOCK_STATS.avgLifetimeValue}
                        </h3>
                    </div>
                    <span className='text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20'>
                        Wzrost +8%
                    </span>
                </div>

                
                <div className='bg-[#0b1329] p-4 border border-slate-800/60 rounded-xl shadow-md flex items-center justify-between'>
                    <div>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-wider'>
                            Segment Premium (VIP)
                        </p>
                        <h3 className='text-xl font-black text-white mt-0.5'>
                            {MOCK_CLIENTS.filter((c) => c.status === 'premium').length}{' '}
                            <span className='text-xs font-normal text-slate-400'>osób</span>
                        </h3>
                    </div>
                    <span className='text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-lg border border-purple-500/20'>
                        Generują 65% obrotu
                    </span>
                </div>
            </div> */}

            {/* ================= 3. FILTRY I WYSZUKIWARKA ================= */}
            {/* <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm'>
                <div className='flex flex-wrap items-center gap-2.5'>
                   
                    <div className='bg-slate-950 p-1 rounded-lg inline-flex items-center border border-slate-900'>
                        {(['all', 'premium', 'regular', 'inactive'] as ClientStatus[]).map(
                            (status) => (
                                <button
                                    key={status}
                                    type='button'
                                    onClick={() => setActiveStatus(status)}
                                    className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer capitalize ${
                                        activeStatus === status
                                            ? 'bg-[#0b1329] text-amber-400 border border-slate-800/80 shadow-sm'
                                            : 'text-slate-400 hover:text-white'
                                    }`}>
                                    {status === 'all'
                                        ? 'Wszyscy'
                                        : status === 'premium'
                                          ? '💎 VIP'
                                          : status === 'regular'
                                            ? 'Stali'
                                            : 'Nieaktywni'}
                                </button>
                            ),
                        )}
                    </div>

                  
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Szukaj po nazwisku lub telefonie...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-800 px-3 py-1.5 pl-8 rounded-lg outline-none focus:border-slate-900 w-60 transition-all'
                        />
                        <svg
                            className='absolute left-2.5 top-2.5 text-slate-400'
                            xmlns='http://www.w3.org/2000/svg'
                            width='11'
                            height='11'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2.5'>
                            <circle cx='11' cy='11' r='8'></circle>
                            <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
                        </svg>
                    </div>
                </div>

                <span className='text-[11px] text-slate-500 font-bold px-1'>
                    Znaleziono:{' '}
                    <strong className='text-slate-900 font-black'>{filteredClients.length}</strong>
                </span>
            </div> */}

            {/* ================= 4. PREMIUM CIEMNA TABELA KLIENCKA ================= */}
            {/* <div className='bg-[#0b1329] border border-slate-800/80 rounded-xl shadow-xl overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='border-b border-slate-800/60 bg-slate-950/40'>
                                <th className='p-3.5 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[80px] text-center'>
                                    ID
                                </th>
                                <th className='p-3.5 text-[10px] font-black text-slate-400 uppercase tracking-wider'>
                                    Klient
                                </th>
                                <th className='p-3.5 text-[10px] font-black text-slate-400 uppercase tracking-wider'>
                                    Status
                                </th>
                                <th className='p-3.5 text-[10px] font-black text-slate-400 uppercase tracking-wider'>
                                    Kontakt
                                </th>
                                <th className='p-3.5 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center'>
                                    Wizyty
                                </th>
                                <th className='p-3.5 text-[10px] font-black text-slate-400 uppercase tracking-wider'>
                                    Ulubiona usługa
                                </th>
                                <th className='p-3.5 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right'>
                                    Suma (LTV)
                                </th>
                                <th className='p-3.5 text-[10px] font-black text-slate-400 uppercase tracking-wider text-right'>
                                    Ostatnia wizyta
                                </th>
                                <th className='p-3.5 text-[10px] font-black text-slate-400 uppercase tracking-wider text-center w-[100px]'>
                                    Akcje
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-800/40 text-slate-300'>
                            {filteredClients.map((client) => (
                                <tr
                                    key={client.id}
                                    className='hover:bg-slate-900/40 transition-colors group'>
                                 
                                    <td className='p-3 text-center'>
                                        <span className='text-[10px] font-bold font-mono text-slate-500 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800/50'>
                                            {client.id}
                                        </span>
                                    </td>

                               
                                    <td className='p-3'>
                                        <div className='flex items-center space-x-3'>
                                            <img
                                                src={client.avatarUrl}
                                                alt={client.name}
                                                className='w-8 h-8 rounded-full object-cover border border-slate-700/60 shrink-0'
                                            />
                                            <div>
                                                <p className='text-xs font-bold text-white group-hover:text-amber-400 transition-colors'>
                                                    {client.name}
                                                </p>
                                                <p className='text-[10px] text-slate-500 font-medium truncate max-w-[140px]'>
                                                    {client.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='p-3'>
                                        <span
                                            className={`inline-flex items-center text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${
                                                client.status === 'premium'
                                                    ? 'bg-amber-400/10 text-amber-400 border-amber-500/20'
                                                    : client.status === 'regular'
                                                      ? 'bg-indigo-400/10 text-indigo-400 border-indigo-500/20'
                                                      : 'bg-slate-800 text-slate-400 border-slate-700'
                                            }`}>
                                            {client.status === 'premium'
                                                ? '💎 VIP'
                                                : client.status === 'regular'
                                                  ? 'Staly'
                                                  : 'Nieaktywny'}
                                        </span>
                                    </td>

                                    <td className='p-3 text-xs font-semibold text-slate-400 font-mono'>
                                        {client.phone}
                                    </td>

                                   
                                    <td className='p-3 text-center text-xs font-bold text-white'>
                                        {client.totalVisits}
                                    </td>

                                   
                                    <td className='p-3 text-xs font-medium text-slate-300'>
                                        <span className='text-amber-400/90 font-semibold'>
                                            {client.preferredService}
                                        </span>
                                    </td>

                                 
                                    <td className='p-3 text-right text-xs font-black text-amber-400 font-mono'>
                                        {client.totalSpent}
                                    </td>

                               
                                    <td className='p-3 text-right text-xs font-semibold text-slate-400 font-mono'>
                                        {client.lastVisit}
                                    </td>

                           
                                    <td className='p-3 text-center'>
                                        <div className='flex items-center justify-center space-x-1'>
                                            <button
                                                type='button'
                                                title='Karta klienta (Dokumentacja)'
                                                className='w-7 h-7 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 flex items-center justify-center text-xs transition-all cursor-pointer shadow-sm'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='11'
                                                    height='11'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    strokeWidth='2.5'>
                                                    <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path>
                                                    <polyline points='14 2 14 8 20 8'></polyline>
                                                    <line x1='16' y1='13' x2='8' y2='13'></line>
                                                    <line x1='16' y1='17' x2='8' y2='17'></line>
                                                </svg>
                                            </button>
                                            <button
                                                type='button'
                                                title='Edycja danych'
                                                className='w-7 h-7 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 flex items-center justify-center text-xs transition-all cursor-pointer'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='11'
                                                    height='11'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    strokeWidth='2.5'>
                                                    <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
                                                    <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z'></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
                {filteredClients.length === 0 && (
                    <div className='text-center py-12 flex flex-col items-center justify-center border-t border-slate-800/40'>
                        <svg
                            className='mb-2 text-slate-600'
                            xmlns='http://www.w3.org/2000/svg'
                            width='28'
                            height='28'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='1.5'>
                            <circle cx='12' cy='12' r='10'></circle>
                            <line x1='15' y1='9' x2='9' y2='15'></line>
                            <line x1='9' y1='9' x2='15' y2='15'></line>
                        </svg>
                        <p className='text-xs font-bold text-white'>
                            Nie odnaleziono pasujących profili klientów
                        </p>
                        <p className='text-[11px] text-slate-500 font-medium mt-0.5'>
                            Zmień filtry lub kryteria wyszukiwania.
                        </p>
                    </div>
                )}

                
                <div className='p-3 bg-slate-950/40 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-medium'>
                    <span>
                        Pokazujesz 1-{filteredClients.length} z {filteredClients.length} pozycji
                    </span>
                    <div className='flex items-center space-x-1'>
                        <button
                            type='button'
                            disabled
                            className='px-2.5 py-1 bg-slate-900 border border-slate-800 rounded opacity-40 cursor-not-allowed text-[10px] font-bold'>
                            Poprzednia
                        </button>
                        <button
                            type='button'
                            disabled
                            className='px-2.5 py-1 bg-slate-900 border border-slate-800 rounded opacity-40 cursor-not-allowed text-[10px] font-bold'>
                            Następna
                        </button>
                    </div>
                </div>
            </div> */}

            <Tabela />
            <BlueprintPattern />
        </div>
    );
}
