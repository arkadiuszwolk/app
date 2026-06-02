'use client'; // Wymagane w Next.js App Router, aby korzystać z usePathname()

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook do sprawdzania aktywnej ścieżki
import { motion } from 'framer-motion'; // Import biblioteki do płynnych animacji

// 1. STATYCZNE DANE MAKIETOWE (MOCKI)
const MOCK_USER = {
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@example.com',
    role: 'Właściciel',
};

const MOCK_COMPANY = {
    name: 'Strefa Piękna Elegancja',
    slug: 'strefa-piekna',
};

const MOCK_BADGES = {
    today: 5,
    team: '2/5',
};

interface NavigationItem {
    name: string;
    href: string;
    icon: string;
    badgeValue?: string | number;
}

export default function OwnerDashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname(); // Pobranie obecnej ścieżki

    const fullName = `${MOCK_USER.firstName} ${MOCK_USER.lastName}`;
    const avatarInitials =
        `${MOCK_USER.firstName.charAt(0)}${MOCK_USER.lastName.charAt(0)}`.toUpperCase();

    // Jawna definicja tablicy z małymi literami zapobiega konfliktom z globalnymi typami HTML
    const navigation: NavigationItem[] = [
        { name: 'Dzisiaj', href: '/dash/dzisiaj', icon: 'fa-bolt', badgeValue: MOCK_BADGES.today },
        {
            name: 'Wizyty',
            href: '/dash/wizyty',
            icon: 'fa-calendar-check',
            badgeValue: MOCK_BADGES.today,
        },
        { name: 'Klienci', href: '/dash/klienci', icon: 'fa-users' },
        {
            name: 'Zespół',
            href: '/dash/zespol',
            icon: 'fa-user-group',
            badgeValue: MOCK_BADGES.team,
        },
        { name: 'Oferta', href: '/dash/oferta', icon: 'fa-tags' },
        { name: 'Strona klienta', href: '/dash/strona', icon: 'fa-window-maximize' },
        { name: 'Ustawienia', href: '/dash/ustawienia', icon: 'fa-sliders' },
    ];

    return (
        <div className='flex min-h-screen bg-[#f8fafc] text-[#0f172a] antialiased selection:bg-indigo-100 selection:text-indigo-900'>
            {/* ================= SIDEBAR (DESKTOP) ================= */}
            <aside className='hidden md:flex flex-col w-64 bg-white border-r border-slate-100 sticky top-0 h-screen z-40'>
                <div className='h-16 flex items-center px-6 border-b border-slate-50'>
                    <Link href='/dash/dzisiaj' className='flex items-center space-x-2.5 group'>
                        <div className='w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform'>
                            M
                        </div>
                        <span className='font-bold text-base tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent'>
                            MiniCal<span className='text-indigo-600'>.pl</span>
                        </span>
                    </Link>
                </div>

                {/* Lista Zakładek (Nawigacja) */}
                <nav className='flex-1 px-3 py-6 space-y-1 overflow-y-auto'>
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 group ${
                                    isActive
                                        ? 'text-indigo-600 font-semibold'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/80'
                                }`}>
                                {/* PŁYNNY WSKAŹNIK SYSTEMU ANIMACJI LAYOUTU */}
                                {isActive && (
                                    <>
                                        {/* Opcja A: Płynnie jeżdżący pasek po lewej stronie */}
                                        <motion.span
                                            layoutId='activeIndicator'
                                            transition={{
                                                type: 'spring',
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                            className='absolute left-0 top-1/4 h-1/2 w-1 bg-indigo-600 rounded-r-full z-20'
                                        />

                                        {/* Opcja B: Płynnie jeżdżące subtelne tło pod całą zakładką */}
                                        <motion.div
                                            layoutId='activeBackground'
                                            transition={{
                                                type: 'spring',
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                            className='absolute inset-0 bg-gradient-to-r from-indigo-50/70 to-indigo-50/20 rounded-xl -z-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)]'
                                        />
                                    </>
                                )}

                                <div className='flex items-center space-x-3 z-10'>
                                    <i
                                        className={`fa-solid ${item.icon} text-base w-5 text-center transition-colors duration-200 ${
                                            isActive
                                                ? 'text-indigo-600'
                                                : 'text-slate-400 group-hover:text-slate-600'
                                        }`}></i>
                                    <span>{item.name}</span>
                                </div>

                                {/* Dynamiczny Badge */}
                                {item.badgeValue && item.badgeValue !== 0 && (
                                    <span
                                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md transition-colors duration-200 z-10 ${
                                            isActive
                                                ? 'bg-indigo-100 text-indigo-700'
                                                : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                                        }`}>
                                        {item.badgeValue}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className='p-4 border-t border-slate-50 bg-slate-50/40'>
                    <div className='px-2 py-2 rounded-xl border border-slate-100 bg-white shadow-sm'>
                        <p className='text-xs font-bold text-slate-800 truncate px-1'>
                            {MOCK_COMPANY.name}
                        </p>
                        <a
                            href={`/${MOCK_COMPANY.slug}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center space-x-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-700 transition-colors mt-1 px-1 hover:underline'>
                            <span>Zobacz stronę publiczną</span>
                            <i className='fa-solid fa-arrow-up-right-from-square text-[9px]'></i>
                        </a>
                    </div>
                </div>
            </aside>

            {/* ================= GŁÓWNY KONTENER OPERACYJNY ================= */}
            <div className='flex-1 flex flex-col min-w-0 min-h-screen'>
                {/* TOPBAR */}
                <header className='sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-100/80 h-16 flex items-center justify-between px-4 md:px-8 transition-all'>
                    <div className='flex items-center space-x-3'>
                        <button
                            type='button'
                            className='p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-xl md:hidden transition-colors cursor-pointer'
                            aria-label='Otwórz menu'>
                            <svg
                                className='w-5 h-5'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth={2}>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M4 6h16M4 12h16M4 18h16'
                                />
                            </svg>
                        </button>

                        <div className='flex md:hidden items-center space-x-2'>
                            <div className='w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white font-black text-[10px]'>
                                M
                            </div>
                            <span className='font-bold text-sm tracking-tight'>MiniCal</span>
                        </div>
                    </div>

                    <div className='flex items-center space-x-4'>
                        <button
                            type='button'
                            className='relative p-2 text-slate-400 hover:text-indigo-600 transition-all cursor-pointer group'>
                            <i className='fa-regular fa-bell text-base'></i>
                            <span className='absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white' />
                        </button>

                        <div className='group relative flex items-center space-x-3 cursor-pointer py-1.5 px-3 rounded-xl hover:bg-slate-50/80 transition-all duration-200 border border-transparent hover:border-slate-100'>
                            <div className='w-8 h-8 bg-gradient-to-br from-indigo-50 to-indigo-100/60 rounded-xl flex items-center justify-center text-indigo-600 text-xs font-bold border border-indigo-100 shadow-sm'>
                                {avatarInitials}
                            </div>

                            <div className='text-left hidden sm:block'>
                                <p className='text-xs font-bold text-slate-800 leading-tight'>
                                    {fullName}
                                </p>
                                <p className='text-[10px] text-slate-400 font-semibold tracking-wide uppercase mt-0.5'>
                                    {MOCK_USER.role}
                                </p>
                            </div>
                            <i className='fa-solid fa-chevron-down text-[10px] text-slate-400 group-hover:text-slate-600 transition-colors hidden sm:block'></i>

                            {/* DROPDOWN */}
                            <div className='absolute right-0 top-full mt-2 w-52 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-1.5 z-50'>
                                <div className='px-3 py-2 border-b border-slate-50 sm:hidden'>
                                    <p className='text-xs font-bold text-slate-800 truncate'>
                                        {fullName}
                                    </p>
                                    <p className='text-[10px] text-slate-400 font-medium'>
                                        {MOCK_USER.role}
                                    </p>
                                </div>
                                <div className='px-3 py-2 text-[11px] text-slate-400 font-medium truncate border-b border-slate-50'>
                                    {MOCK_USER.email}
                                </div>
                                <button
                                    type='button'
                                    className='w-full text-left text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50/60 px-3 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-2'>
                                    <i className='fa-solid fa-right-from-bracket text-sm w-4 text-center'></i>
                                    <span>Wyloguj się</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* CONTENT */}
                <main className='flex-1 max-w-7xl w-full mx-auto transition-all p-10'>
                    {children}
                </main>
            </div>
        </div>
    );
}
