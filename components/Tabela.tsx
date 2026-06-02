'use client';

import { useState } from 'react';

interface Customer {
    id: string;
    name: string;
    phone: string;
    visits: number;
    revenue: number;
    lastVisit: {
        date: string;
        time: string;
        service: string;
    };
    status: 'active' | 'blocked';
}

const mockCustomers: Customer[] = [
    {
        id: 'C-001',
        name: 'Aleksandra Wiśniewska',
        phone: '+48 601 234 567',
        visits: 14,
        revenue: 1240,
        lastVisit: { date: '28 maj 2026', time: '11:30', service: 'Koloryzacja + Strzyżenie' },
        status: 'active',
    },
    {
        id: 'C-002',
        name: 'Marcin Kowalski',
        phone: '+48 512 876 432',
        visits: 7,
        revenue: 490,
        lastVisit: { date: '26 maj 2026', time: '09:00', service: 'Strzyżenie męskie' },
        status: 'active',
    },
    {
        id: 'C-003',
        name: 'Natalia Dąbrowska',
        phone: '+48 698 345 210',
        visits: 22,
        revenue: 3180,
        lastVisit: { date: '30 maj 2026', time: '15:15', service: 'Balayage + Pielęgnacja' },
        status: 'active',
    },
    {
        id: 'C-004',
        name: 'Tomasz Lewandowski',
        phone: '+48 731 098 654',
        visits: 3,
        revenue: 165,
        lastVisit: { date: '15 maj 2026', time: '13:00', service: 'Strzyżenie + Broda' },
        status: 'blocked',
    },
    {
        id: 'C-005',
        name: 'Karolina Zielińska',
        phone: '+48 505 432 198',
        visits: 9,
        revenue: 870,
        lastVisit: { date: '29 maj 2026', time: '16:45', service: 'Ombre + Strzyżenie' },
        status: 'active',
    },
    {
        id: 'C-006',
        name: 'Piotr Nowak',
        phone: '+48 604 567 890',
        visits: 18,
        revenue: 1620,
        lastVisit: { date: '31 maj 2026', time: '10:00', service: 'Koloryzacja globalna' },
        status: 'active',
    },
];

export function Tabela() {
    const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setDeletingId(id);
        setTimeout(() => {
            setCustomers((prev) => prev.filter((c) => c.id !== id));
            setDeletingId(null);
        }, 300);
    };

    const handleToggleBlock = (id: string) => {
        setCustomers((prev) =>
            prev.map((c) =>
                c.id === id ? { ...c, status: c.status === 'blocked' ? 'active' : 'blocked' } : c,
            ),
        );
    };

    return (
        <div className='min-h-screen flex items-start justify-center px-6 py-12 font-sans'>
            {/* Font imports via style tag */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .mono { font-family: 'DM Mono', monospace; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-12px); }
        }
        .row-enter { animation: fadeInUp 0.25s ease forwards; }
        .row-exit { animation: fadeOut 0.25s ease forwards; }

        .action-icon {
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s ease, transform 0.2s ease, color 0.15s ease;
        }
        tr:hover .action-icon {
          opacity: 1;
          transform: translateY(0);
        }
        .action-icon:nth-child(1) { transition-delay: 0ms; }
        .action-icon:nth-child(2) { transition-delay: 40ms; }
        .action-icon:nth-child(3) { transition-delay: 80ms; }

        .table-row {
          transition: background-color 0.15s ease;
        }
        .table-row:hover {
          background-color: rgba(255,255,255,0.025);
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
        }
      `}</style>

            <div className='w-full max-w-6xl'>
                {/* Header */}
                <div className='mb-8 flex items-end justify-between'>
                    <div>
                        <p className='text-[11px] uppercase tracking-[0.2em] text-gray-600 mb-1 mono'>
                            Studio &mdash; Panel klienta
                        </p>
                        <h1 className='text-2xl font-semibold text-GRAY-900 tracking-tight'>
                            Baza klientów
                        </h1>
                    </div>
                    <div className='flex items-center gap-3'>
                        <span className='text-[13px] text-gray-600 mono'>
                            {customers.length} rekordów
                        </span>
                        <button className='h-8 px-4 rounded-lg bg-white/5 border border-white/10 text-[13px] text-[#aaa] hover:bg-white/10 hover:text-white transition-all duration-150'>
                            <i className='fa-solid fa-plus mr-2 text-[11px]' />
                            Dodaj klienta
                        </button>
                    </div>
                </div>

                {/* Table container */}
                <div className='rounded-2xl border border-white/[0.07] overflow-hidden bg-white'>
                    {/* Search / filters bar */}
                    <div className='px-6 py-4 border-b border-white/[0.06] flex items-center justify-between gap-4'>
                        <div className='relative flex-1 max-w-xs'>
                            <i className='fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-gray-600' />
                            <input
                                type='text'
                                placeholder='Szukaj klienta...'
                                className='w-full pl-9 pr-4 py-2 rounded-lg text-gray-800 border border-white/[0.07] text-[13px] text-[#ccc] placeholder-[#444] focus:outline-none focus:border-white/20 transition-all'
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <button className='h-8 px-3 rounded-lg bg-gray-800 text-gray-200 border border-white/[0.07] text-[12px]  hover:text-[#aaa] transition-all mono'>
                                Filtruj
                            </button>
                            <button className='h-8 px-3 rounded-lg bg-gray-800 text-gray-200 border border-white/[0.07] text-[12px]  hover:text-[#aaa] transition-all mono'>
                                Eksport
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b border-gray-200'>
                                    {[
                                        'ID',
                                        'Klient',
                                        'Telefon',
                                        'Wizyty',
                                        'Obrót',
                                        'Ostatnia wizyta',
                                        '',
                                    ].map((col, i) => (
                                        <th
                                            key={i}
                                            className={`px-6 py-3.5 text-left text-[10px] uppercase tracking-[0.15em] text-[#3a3a3e] font-medium mono ${
                                                i === 6 ? 'w-28 text-right pr-6' : ''
                                            }`}>
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer, idx) => (
                                    <tr
                                        key={customer.id}
                                        className={`table-row border-b border-gray-200 last:border-0 ${
                                            deletingId === customer.id ? 'row-exit' : 'row-enter'
                                        }`}
                                        style={{ animationDelay: `${idx * 40}ms` }}
                                        onMouseEnter={() => setHoveredRow(customer.id)}
                                        onMouseLeave={() => setHoveredRow(null)}>
                                        {/* ID */}
                                        <td className='px-6 py-4'>
                                            <span className='mono text-[12px] text-[#3d3d45] font-medium px-2 py-1 rounded-md bg-gray-100 border border-gray-200'>
                                                {customer.id}
                                            </span>
                                        </td>

                                        {/* Name + status */}
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center gap-3'>
                                                <div className='w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center flex-shrink-0'>
                                                    <span className='text-[11px] font-semibold text-gray-400'>
                                                        {customer.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span
                                                        className={`block text-[13px] font-medium ${
                                                            customer.status === 'blocked'
                                                                ? 'text-gray-600 line-through'
                                                                : 'text-gray-800'
                                                        }`}>
                                                        {customer.name}
                                                    </span>
                                                    {customer.status === 'blocked' && (
                                                        <span className='text-[10px] text-[#7f1d1d] tracking-wide uppercase mono mt-0.5 block'>
                                                            zablokowany
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Phone */}
                                        <td className='px-6 py-4'>
                                            <span className='mono text-[12px] text-gray-600'>
                                                {customer.phone}
                                            </span>
                                        </td>

                                        {/* Visits */}
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center justify-center gap-2'>
                                                <span className='mono text-[12px] text-[#666] text-center'>
                                                    {customer.visits}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Revenue */}
                                        <td className='px-6 py-4'>
                                            <span className='mono text-[14px] font-medium text-pink-600'>
                                                {customer.revenue.toLocaleString('pl-PL')}{' '}
                                                <span className='text-[10px] text-gray-600'>
                                                    PLN
                                                </span>
                                            </span>
                                        </td>

                                        {/* Last visit */}
                                        <td className='px-6 py-4'>
                                            <span className='block text-[12px] text-[#666] mono'>
                                                {customer.lastVisit.date}
                                                <span className='text-[#3d3d45] mx-1.5'>
                                                    &middot;
                                                </span>
                                                {customer.lastVisit.time}
                                            </span>
                                            <span className='block text-[11px] text-[#414148] mt-0.5 tracking-wide'>
                                                {customer.lastVisit.service}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center justify-end gap-1'>
                                                {/* History */}
                                                <button
                                                    className='action-icon w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:text-[#8b8b99] hover:bg-white/[0.06] transition-all'
                                                    title='Historia wizyt'>
                                                    <i className='fa-solid fa-clock-rotate-left text-[11px]' />
                                                </button>

                                                {/* Block / Unblock */}
                                                <button
                                                    className={`action-icon w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                                                        customer.status === 'blocked'
                                                            ? 'text-[#7f1d1d] hover:text-[#ef4444] hover:bg-red-500/10'
                                                            : 'text-gray-600 hover:text-[#f59e0b] hover:bg-amber-500/10'
                                                    }`}
                                                    title={
                                                        customer.status === 'blocked'
                                                            ? 'Odblokuj'
                                                            : 'Zablokuj'
                                                    }
                                                    onClick={() => handleToggleBlock(customer.id)}>
                                                    <i
                                                        className={`text-[11px] ${
                                                            customer.status === 'blocked'
                                                                ? 'fa-solid fa-lock-open'
                                                                : 'fa-solid fa-ban'
                                                        }`}
                                                    />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    className='action-icon w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:text-[#ef4444] hover:bg-red-500/10 transition-all'
                                                    title='Usuń klienta'
                                                    onClick={() => handleDelete(customer.id)}>
                                                    <i className='fa-solid fa-trash text-[10px]' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className='px-6 py-3.5 border-t border-white/[0.05] flex items-center justify-between'>
                        <span className='text-[11px] text-[#333] mono'>
                            Wyświetlono {customers.length} z {mockCustomers.length} klientów
                        </span>
                        <div className='flex items-center gap-1'>
                            <button className='w-7 h-7 rounded-lg flex items-center justify-center text-[#333] hover:text-[#666] hover:text-gray-800 transition-all'>
                                <i className='fa-solid fa-chevron-left text-[10px]' />
                            </button>
                            <span className='mono text-[11px] text-[#333] px-2'>1 / 1</span>
                            <button className='w-7 h-7 rounded-lg flex items-center justify-center text-[#333] hover:text-[#666] hover:text-gray-800 transition-all'>
                                <i className='fa-solid fa-chevron-right text-[10px]' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
