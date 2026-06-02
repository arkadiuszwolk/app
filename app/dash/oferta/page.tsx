'use client';

import { SlidingTabs } from '@/components/sliding-tabs';
import React, { useState } from 'react';

// --- TYPY ---
type ServiceCategory = 'all' | 'hair' | 'barber' | 'beauty';

// --- DANE MAKIETOWE (MOCKI) ---
const MOCK_STATS = {
    totalServices: 14,
    maxServicesInPlan: 25,
    averagePrice: '165,00 zł',
    topService: 'Balayage Premium',
};

const MOCK_SERVICES = [
    {
        id: 'S-01',
        name: 'Strzyżenie damskie + modelowanie',
        category: 'hair',
        duration: '60 min',
        price: '140 zł',
        isBestseller: true,
        isOnline: true,
        imageUrl:
            'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80',
        description:
            'Mycie z masażem głowy, dobór fryzury, strzyżenie oraz stylizacja na szczotkę.',
    },
    {
        id: 'S-02',
        name: 'Koloryzacja jednolita',
        category: 'hair',
        duration: '120 min',
        price: '260 zł',
        isBestseller: false,
        isOnline: true,
        imageUrl:
            'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80',
        description: "Klasyczna koloryzacja całych włosów produktami marki L'Oréal Professionnel.",
    },
    {
        id: 'S-03',
        name: 'Balayage Premium + Olaplex',
        category: 'hair',
        duration: '180 min',
        price: '450 zł',
        isBestseller: true,
        isOnline: true,
        imageUrl:
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
        description: 'Zaawansowana technika rozjaśniania z pełną ochroną struktury włosa.',
    },
    {
        id: 'S-04',
        name: 'Combo Barberskie (Włosy + Broda)',
        category: 'barber',
        duration: '75 min',
        price: '150 zł',
        isBestseller: true,
        isOnline: true,
        imageUrl:
            'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
        description:
            'Klasyczne strzyżenie męskie połączone z pełną pielęgnacją i konturowaniem brody brzytwą.',
    },
    {
        id: 'S-05',
        name: 'Strzyżenie męskie klasyczne',
        category: 'barber',
        duration: '45 min',
        price: '90 zł',
        isBestseller: false,
        isOnline: false,
        imageUrl:
            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
        description: 'Szybkie i precyzyjne strzyżenie maszynką oraz nożyczkami.',
    },
    {
        id: 'S-06',
        name: 'Manicure Hybrydowy',
        category: 'beauty',
        duration: '60 min',
        price: '120 zł',
        isBestseller: false,
        isOnline: true,
        imageUrl:
            'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80',
        description:
            'Opracowanie skórek i kształtu płytki, nałożenie bazy proteinowej oraz koloru.',
    },
    {
        id: 'S-02',
        name: 'Koloryzacja jednolita',
        category: 'hair',
        duration: '120 min',
        price: '260 zł',
        isBestseller: false,
        isOnline: true,
        imageUrl:
            'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80',
        description: "Klasyczna koloryzacja całych włosów produktami marki L'Oréal Professionnel.",
    },
    {
        id: 'S-03',
        name: 'Balayage Premium + Olaplex',
        category: 'hair',
        duration: '180 min',
        price: '450 zł',
        isBestseller: true,
        isOnline: true,
        imageUrl:
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
        description: 'Zaawansowana technika rozjaśniania z pełną ochroną struktury włosa.',
    },
];

// SVG fali dla ciemnych kart usług (miedziany/złoty akcent)
const darkCardWaves = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='200' height='200'%3E%3Cg fill='none' stroke='%23f59e0b' stroke-width='1.2' stroke-opacity='0.15'%3E%3Cpath d='M200,80 C160,90 140,130 130,200'/%3E%3Cpath d='M200,95 C165,105 148,140 140,200'/%3E%3Cpath d='M200,110 C170,120 156,150 150,200'/%3E%3Cpath d='M200,125 C175,135 164,160 160,200'/%3E%3Cpath d='M200,140 C180,150 172,170 170,200'/%3E%3Cpath d='M200,155 C185,165 180,180 180,200'/%3E%3Cpath d='M200,170 C190,178 188,190 190,200'/%3E%3C/g%3E%3C/svg%3E")`;

export default function ServicesPage() {
    const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

    const filteredServices = MOCK_SERVICES.filter((service) =>
        activeCategory === 'all' ? true : service.category === activeCategory,
    );

    return (
        <div className='space-y-8'>
            {/* ================= 1. NAGŁÓWEK I PRZYCISK DODAWANIA ================= */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                    <h1 className='text-2xl text-indigo-950 font-sans tracking-tight'>Oferta</h1>
                </div>
                <button
                    type='button'
                    className='inline-flex items-center justify-center space-x-2 text-white bg-indigo-500 text-xs font-bold px-4 py-3 rounded-full transition-all shadow-md cursor-pointer self-start sm:self-center'>
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
                    <span>Dodaj nową usługę</span>
                </button>
            </div>

            {/* ================= 2. ANALITYKA OFERTY (DOPASOWANE CIEMNE KPI) ================= */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {/* KPI 1: Aktywne pozycje */}
                <div
                    className='bg-[#0b1329] p-5 border border-slate-800/60 rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[140px]'
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e293b' stroke-width='1.5'%3E%3Cpath d='M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z'/%3E%3Cline x1='7' y1='7' x2='7.01' y2='7'/%3E%3C/svg%3E")`,
                        backgroundSize: '140px 140px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '-25px 15px',
                    }}>
                    <div className='relative z-10'>
                        <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                            Aktywne usługi
                        </p>
                        <div className='flex items-baseline space-x-2 mt-1.5'>
                            <span className='text-2xl font-black text-white tracking-tight'>
                                {MOCK_STATS.totalServices}{' '}
                                <span className='text-sm text-slate-500 font-normal'>
                                    z {MOCK_STATS.maxServicesInPlan}
                                </span>
                            </span>
                            <span className='text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20'>
                                W katalogu
                            </span>
                        </div>
                    </div>
                    <div className='relative z-10 mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between gap-3'>
                        <p className='text-[10px] text-slate-400 leading-normal max-w-[65%] font-medium'>
                            Twój plan pozwala na 25 pozycji. Aktywuj PRO dla nielimitowanej oferty.
                        </p>
                        <button className='text-[10px] font-black text-slate-950 bg-amber-400 hover:bg-amber-500 px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer'>
                            Zmień plan
                        </button>
                    </div>
                </div>

                {/* KPI 2: Średnia wartość zabiegu */}
                <div
                    className='bg-[#0b1329] p-5 border border-slate-800/60 rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[140px]'
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e293b' stroke-width='1.5'%3E%3Crect x='2' y='4' width='20' height='16' rx='2' ry='2'/%3E%3Cline x1='12' y1='10' x2='12' y2='14'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3C/svg%3E")`,
                        backgroundSize: '140px 140px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '-20px 20px',
                    }}>
                    <div className='relative z-10'>
                        <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                            Średnia wartość (Koszyk)
                        </p>
                        <div className='flex items-baseline space-x-2 mt-1.5'>
                            <span className='text-2xl font-black text-amber-400 tracking-tight'>
                                {MOCK_STATS.averagePrice}
                            </span>
                            <span className='text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/20'>
                                +4.2% m/m
                            </span>
                        </div>
                    </div>
                    <div className='relative z-10 mt-3 pt-2 border-t border-slate-800/60'>
                        <p className='text-[10px] text-slate-400 font-medium leading-normal'>
                            💡 Klienci najczęściej łączą usługi komplementarne. Rozważ stworzenie
                            pakietu.
                        </p>
                    </div>
                </div>

                {/* KPI 3: Bestseller */}
                <div
                    className='bg-[#0b1329] p-5 border border-slate-800/60 rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[140px]'
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='1.2'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E")`,
                        backgroundSize: '145px 145px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '-25px 10px',
                    }}>
                    <div className='relative z-10'>
                        <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                            Hit miesiąca
                        </p>
                        <div className='flex items-baseline space-x-2 mt-1.5'>
                            <span className='text-base font-bold text-white truncate tracking-tight max-w-[190px] block'>
                                {MOCK_STATS.topService}
                            </span>
                            <span className='text-[10px] font-bold text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded-md border border-amber-500/30 shrink-0'>
                                TOP 1
                            </span>
                        </div>
                    </div>
                    <div className='relative z-10 mt-3 pt-2 border-t border-slate-800/60'>
                        <p className='text-[10px] text-slate-400 font-medium leading-normal'>
                            🔥 Wygenerował 35% całego przychodu ze strony rezerwacyjnej.
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= 3. FILTROWANIE KATEGORII (CIEMNY SEGMENTED CONTROL) ================= */}
            {/* <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4'>
                <div className='bg-slate-950 p-1 rounded-xl inline-flex items-center space-x-0.5 self-start border border-slate-900 shadow-inner'>
                    {(['all', 'hair', 'barber', 'beauty'] as ServiceCategory[]).map((cat) => (
                        <button
                            key={cat}
                            type='button'
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer capitalize ${
                                activeCategory === cat
                                    ? 'bg-[#0b1329] text-amber-400 shadow-md border border-slate-800 font-extrabold'
                                    : 'text-slate-400 hover:text-white'
                            }`}>
                            {cat === 'all'
                                ? 'Wszystkie'
                                : cat === 'hair'
                                  ? 'Fryzjerstwo'
                                  : cat === 'barber'
                                    ? 'Barber'
                                    : 'Kosmetyka'}
                        </button>
                    ))}
                </div>
                <span className='text-xs text-slate-500 font-bold self-start sm:self-center bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl'>
                    Pokazujesz:{' '}
                    <strong className='text-slate-900 font-black'>{filteredServices.length}</strong>{' '}
                    z {MOCK_SERVICES.length} usług
                </span>
            </div> */}
            <div className='w-full flex justify-center space-x-8'>
                <SlidingTabs
                    tabs={[
                        { label: 'Wszystkie', action: () => {} },
                        { label: 'Promocje', action: () => {} },
                        { label: 'Hity', action: () => {} },
                    ]}
                />
                <SlidingTabs
                    tabs={[
                        { label: 'Ten tydzień', action: () => {} },
                        { label: 'Ten miesiąc', action: () => {} },
                        { label: 'Ten kwartał', action: () => {} },
                    ]}
                />
            </div>
            {/* ================= 4. CIEMNE KARTY USŁUG ZE ZDJĘCIAMI (STYL PREMIUM) ================= */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                {filteredServices.map((service) => (
                    <div
                        key={service.id}
                        className='bg-slate-950 hover:border-slate-700 transition-all flex flex-col justify-between group relative overflow-hidden min-h-[380px]'
                        style={{
                            backgroundImage: darkCardWaves,
                            backgroundSize: '160px 160px',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0px bottom 0px',
                        }}>
                        {/* Góra: Zdjęcie i paski statusu */}
                        <div className='relative p-4 w-full h-44 overflow-hidden bg-slate-950 shrink-0'>
                            <img
                                src={service.imageUrl}
                                alt={service.name}
                                className='w-full h-full rounded-md object-cover opacity-85 group-hover:scale-105 transition-transform duration-500'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-[#0b1329] via-transparent to-transparent opacity-90' />

                            {/* Pływające tagi na zdjęciu */}
                            <div className='absolute top-3 left-3 right-3 flex items-center justify-between z-10'>
                                <span className='text-[10px] font-bold text-slate-300 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded border border-slate-700/50'>
                                    {service.id}
                                </span>

                                {service.isBestseller && (
                                    <span className='text-[9px] font-black tracking-wider uppercase bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-md'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='10'
                                            height='10'
                                            viewBox='0 0 24 24'
                                            fill='currentColor'>
                                            <path d='M12 2c1.7 0 3 1.3 3 3 0 .8-.3 1.5-.8 2l.3.3c2 1 3.5 3 3.5 5.4 0 3.3-2.7 6-6 6s-6-2.7-6-6c0-2.4 1.5-4.4 3.5-5.4l.3-.3c-.5-.5-.8-1.2-.8-2 0-1.7 1.3-3 3-3zm0 9.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z' />
                                        </svg>
                                        <span>Hit sprzedaży</span>
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Środek: Tytuł i opis */}
                        <div className='p-8 flex-1 flex flex-col justify-between relative z-10'>
                            <div>
                                <h3 className='text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 tracking-wide'>
                                    {service.name}
                                </h3>
                                <p className='text-xs text-slate-400 font-medium mt-2 line-clamp-2 h-8 leading-relaxed'>
                                    {service.description}
                                </p>
                            </div>

                            {/* Dane logistyczne */}
                            <div className='mt-5 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-300'>
                                <div className='flex items-center space-x-2 bg-slate-900/50 p-2 rounded-xl border border-slate-800/40 backdrop-blur-sm'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='14'
                                        height='14'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='#94a3b8'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'>
                                        <circle cx='12' cy='12' r='10'></circle>
                                        <polyline points='12 6 12 12 16 14'></polyline>
                                    </svg>
                                    <div>
                                        <p className='text-[8px] text-slate-500 font-bold uppercase leading-none'>
                                            Czas zabiegu
                                        </p>
                                        <p className='mt-0.5 text-slate-200 text-[11px]'>
                                            {service.duration}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center space-x-2 bg-slate-900/50 p-2 rounded-xl border border-slate-800/40 backdrop-blur-sm'>
                                    <div
                                        className={`w-2 h-2 rounded-full ${service.isOnline ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-slate-600'}`}></div>
                                    <div>
                                        <p className='text-[8px] text-slate-500 font-bold uppercase leading-none'>
                                            Rezerwacja
                                        </p>
                                        <p className='mt-0.5 text-slate-200 text-[11px]'>
                                            {service.isOnline ? 'Widget Online' : 'Telefon'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Dół karty: Cena i szybkie zarządzanie */}
                            <div className='flex items-center justify-between pt-4 mt-4 border-t border-slate-800/60'>
                                <div>
                                    <span className='text-[8px] font-bold text-slate-500 uppercase block tracking-wider'>
                                        Cena usługi
                                    </span>
                                    <span className='text-lg font-black text-amber-400 tracking-tight'>
                                        {service.price}
                                    </span>
                                </div>

                                <div className='flex items-center space-x-1.5'>
                                    <button
                                        type='button'
                                        title='Edytuj zabieg'
                                        className='w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 flex items-center justify-center text-xs transition-all cursor-pointer shadow-sm'>
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
                                            <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
                                            <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z'></path>
                                        </svg>
                                    </button>
                                    <button
                                        type='button'
                                        title='Usuń z cennika'
                                        className='w-8 h-8 rounded-xl bg-slate-900/40 hover:bg-rose-950/40 text-slate-500 hover:text-rose-400 border border-slate-900 hover:border-rose-900/60 flex items-center justify-center text-xs transition-all cursor-pointer'>
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
                                            <polyline points='3 6 5 6 21 6'></polyline>
                                            <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                                            <line x1='10' y1='11' x2='10' y2='17'></line>
                                            <line x1='14' y1='11' x2='14' y2='17'></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* PUDEŁKO-SZABLON (NOWY CIEMNY DESIGN SPÓJNY Z RESZTĄ) */}
                <div className='border-2 border-dashed border-slate-800 bg-[#0b1329]/30 rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:border-amber-500/50 hover:bg-[#0b1329]/60 transition-all cursor-pointer min-h-[380px]'>
                    <div className='w-10 h-10 rounded-xl bg-slate-950 text-slate-500 group-hover:text-amber-400 border border-slate-800 flex items-center justify-center transition-all mb-3 shadow-md'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'>
                            <line x1='12' y1='5' x2='12' y2='19'></line>
                            <line x1='5' y1='12' x2='19' y2='12'></line>
                        </svg>
                    </div>
                    <h3 className='text-xs font-bold text-slate-300 group-hover:text-amber-400 transition-colors'>
                        Utwórz nową pozycję
                    </h3>
                    <p className='text-[11px] text-slate-500 font-medium max-w-[180px] mt-1.5 leading-relaxed'>
                        Wprowadź nazwę, opis, czas trwania oraz cenę w kilka sekund.
                    </p>
                </div>
            </div>

            {/* PUSTY STAN (FALLBACK W KLASIE PREMIUM) */}
            {filteredServices.length === 0 && (
                <div className='text-center py-20 bg-[#0b1329] border border-slate-800 rounded-2xl shadow-xl flex flex-col items-center justify-center'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='36'
                        height='36'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='#475569'
                        strokeWidth='1.5'
                        className='mb-4 text-amber-400'>
                        <path d='M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z'></path>
                        <line x1='7' y1='7' x2='7.01' y2='7'></line>
                    </svg>
                    <p className='text-sm font-bold text-white'>Brak usług w tej kategorii</p>
                    <p className='text-xs text-slate-400 font-medium mt-1'>
                        Dodaj nową pozycję lub zmień kryteria filtrowania na górnym panelu.
                    </p>
                </div>
            )}
        </div>
    );
}
