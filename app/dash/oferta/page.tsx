'use client';

import React, { useState } from 'react';

// --- TYPY ---
type ServiceCategory = 'all' | 'hair' | 'barber' | 'beauty';

// --- DANE MAKIETOWE (MOCKI) ---
const MOCK_STATS = {
    totalServices: 14,
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
        staffCount: 3,
        isBestseller: true,
        description:
            'Mycie z masażem głowy, dobór fryzury, strzyżenie oraz stylizacja na szczotkę.',
    },
    {
        id: 'S-02',
        name: 'Koloryzacja jednolita',
        category: 'hair',
        duration: '120 min',
        price: '260 zł',
        staffCount: 2,
        isBestseller: false,
        description: "Klasyczna koloryzacja całych włosów produktami marki L'Oréal Professionnel.",
    },
    {
        id: 'S-03',
        name: 'Balayage Premium + Rekonstrukcja Olaplex',
        category: 'hair',
        duration: '180 min',
        price: '450 zł',
        staffCount: 1,
        isBestseller: true,
        description: 'Zaawansowana technika rozjaśniania z pełną ochroną struktury włosa.',
    },
    {
        id: 'S-04',
        name: 'Combo Barberskie (Włosy + Broda)',
        category: 'barber',
        duration: '75 min',
        price: '150 zł',
        staffCount: 2,
        isBestseller: true,
        description:
            'Klasyczne strzyżenie męskie połączone z pełną pielęgnacją i konturowaniem brody brzytwą.',
    },
    {
        id: 'S-05',
        name: 'Strzyżenie męskie klasyczne',
        category: 'barber',
        duration: '45 min',
        price: '90 zł',
        staffCount: 2,
        isBestseller: false,
        description: 'Szybkie i precyzyjne strzyżenie maszynką oraz nożyczkami.',
    },
    {
        id: 'S-06',
        name: 'Manicure Hybrydowy',
        category: 'beauty',
        duration: '60 min',
        price: '120 zł',
        staffCount: 2,
        isBestseller: false,
        description:
            'Opracowanie skórek i kształtu płytki, nałożenie bazy proteinowej oraz koloru.',
    },
    {
        id: 'S-07',
        name: 'Laminacja brwi z geometrią i Henną',
        category: 'beauty',
        duration: '60 min',
        price: '140 zł',
        staffCount: 1,
        isBestseller: false,
        description: 'Trwałe ułożenie włosków, wyznaczenie idealnego kształtu oraz koloryzacja.',
    },
];

export default function ServicesPage() {
    // STAN: Aktywna kategoria filtrowania
    const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

    // Filtrowanie usług na podstawie wybranej kategorii
    const filteredServices = MOCK_SERVICES.filter((service) =>
        activeCategory === 'all' ? true : service.category === activeCategory,
    );

    return (
        <div className='space-y-8'>
            {/* ================= 1. NAGŁÓWEK I PRZYCISK DODAWANIA ================= */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-bold tracking-tight text-slate-950 font-sans'>
                        Oferta i Cennik usług
                    </h1>
                    <p className='text-sm font-medium text-slate-400 mt-1'>
                        Zarządzaj swoim katalogiem zabiegów, cenami, czasem trwania i obsadą.
                    </p>
                </div>
                <button
                    type='button'
                    className='inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-3 rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer self-start sm:self-center'>
                    <i className='fa-solid fa-plus'></i>
                    <span>Dodaj nową usługę</span>
                </button>
            </div>

            {/* ================= 2. ANALITYKA OFERTY (KPI) ================= */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {/* Łącznie usług */}
                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm'>
                    <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                        Aktywne pozycje
                    </p>
                    <div className='flex items-baseline space-x-2 mt-2'>
                        <span className='text-2xl font-bold text-slate-900 tracking-tight'>
                            {MOCK_STATS.totalServices}
                        </span>
                        <span className='text-[10px] font-semibold text-slate-400'>
                            widocznych na stronie
                        </span>
                    </div>
                </div>

                {/* Średnia cena */}
                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm'>
                    <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                        Średnia wartość zabiegu
                    </p>
                    <div className='flex items-baseline space-x-2 mt-2'>
                        <span className='text-2xl font-bold text-slate-900 tracking-tight'>
                            {MOCK_STATS.averagePrice}
                        </span>
                        <span className='text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md'>
                            Koszyk
                        </span>
                    </div>
                </div>

                {/* Najpopularniejsza */}
                <div className='bg-white p-5 border border-slate-100 rounded-2xl shadow-sm border-l-emerald-100 border-l-2'>
                    <p className='text-[11px] font-bold text-slate-400 uppercase tracking-wider'>
                        Najchętniej wybierana (Bestseller)
                    </p>
                    <div className='flex items-baseline space-x-2 mt-2'>
                        <span className='text-lg font-bold text-slate-900 truncate tracking-tight max-w-50 block'>
                            {MOCK_STATS.topService}
                        </span>
                        <span className='text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md shrink-0'>
                            TOP 1
                        </span>
                    </div>
                </div>
            </div>

            {/* ================= 3. SEGMENTED CATEGORY TABS ================= */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-2'>
                <div className='bg-slate-100 p-1 rounded-xl inline-flex items-center space-x-0.5 self-start'>
                    {(['all', 'hair', 'barber', 'beauty'] as ServiceCategory[]).map((cat) => (
                        <button
                            key={cat}
                            type='button'
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer capitalize ${
                                activeCategory === cat
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900'
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

                <span className='text-xs text-slate-400 font-medium'>
                    Pokazujesz:{' '}
                    <strong className='text-slate-700'>{filteredServices.length}</strong> z{' '}
                    {MOCK_SERVICES.length} usług
                </span>
            </div>

            {/* ================= 4. SIATKA Z USŁUGAMI (GRID OF CARDS) ================= */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredServices.map((service) => (
                    <div
                        key={service.id}
                        className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-200/60 transition-all flex flex-col justify-between group relative overflow-hidden'>
                        {/* Subtelny pasek boczny dla Bestsellerów */}
                        {service.isBestseller && (
                            <div className='absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-indigo-500 to-purple-500' />
                        )}

                        <div>
                            {/* Góra karty: ID, Kategoria i Badges */}
                            <div className='flex items-center justify-between mb-3'>
                                <span className='text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100'>
                                    {service.id}
                                </span>

                                {service.isBestseller && (
                                    <span className='text-[9px] font-black tracking-wider uppercase bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-sm'>
                                        <i className='fa-solid fa-fire text-[8px]'></i>
                                        <span>Popularne</span>
                                    </span>
                                )}
                            </div>

                            {/* Tytuł i opis */}
                            <h3 className='text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1'>
                                {service.name}
                            </h3>
                            <p className='text-xs text-slate-400 font-medium mt-1.5 line-clamp-2 h-8 leading-relaxed'>
                                {service.description}
                            </p>
                        </div>

                        {/* Parametry techniczne i operacyjne */}
                        <div className='mt-5 pt-4 border-t border-slate-50 space-y-3'>
                            <div className='grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600'>
                                <div className='flex items-center space-x-2 bg-slate-50/70 p-2 rounded-xl border border-slate-100/50'>
                                    <i className='fa-regular fa-clock text-slate-400 text-sm'></i>
                                    <div>
                                        <p className='text-[9px] text-slate-400 font-bold uppercase leading-none'>
                                            Czas
                                        </p>
                                        <p className='mt-0.5 text-slate-800'>{service.duration}</p>
                                    </div>
                                </div>
                                <div className='flex items-center space-x-2 bg-slate-50/70 p-2 rounded-xl border border-slate-100/50'>
                                    <i className='fa-regular fa-user-group text-slate-400 text-sm'></i>
                                    <div>
                                        <p className='text-[9px] text-slate-400 font-bold uppercase leading-none'>
                                            Obsada
                                        </p>
                                        <p className='mt-0.5 text-slate-800'>
                                            {service.staffCount}{' '}
                                            {service.staffCount === 1 ? 'osoba' : 'osoby'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Dół karty: Cena i szybka edycja */}
                            <div className='flex items-center justify-between pt-1.5'>
                                <div>
                                    <span className='text-[9px] font-bold text-slate-400 uppercase block tracking-wider'>
                                        Cena usługi
                                    </span>
                                    <span className='text-base font-black text-slate-900 tracking-tight'>
                                        {service.price}
                                    </span>
                                </div>

                                <div className='flex items-center space-x-1.5'>
                                    <button
                                        type='button'
                                        title='Edytuj zabieg'
                                        className='w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-100 flex items-center justify-center text-xs transition-colors cursor-pointer'>
                                        <i className='fa-solid fa-pen-to-square'></i>
                                    </button>
                                    <button
                                        type='button'
                                        title='Usuń z cennika'
                                        className='w-8 h-8 rounded-xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-100 flex items-center justify-center text-xs transition-colors cursor-pointer'>
                                        <i className='fa-solid fa-trash-can'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* PUDEŁKO-SZABLON: Dodaj nową usługę wewnątrz siatki (Placeholder) */}
                <div className='border-2 border-dashed border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:border-indigo-300 hover:bg-indigo-50/10 transition-all cursor-pointer min-h-62.5'>
                    <div className='w-10 h-10 rounded-full bg-slate-50 group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600 border border-slate-100 flex items-center justify-center transition-all mb-3 shadow-sm'>
                        <i className='fa-solid fa-plus text-sm'></i>
                    </div>
                    <h3 className='text-xs font-bold text-slate-700 group-hover:text-indigo-600 transition-colors'>
                        Utwórz nową pozycję
                    </h3>
                    <p className='text-[11px] text-slate-400 font-medium max-w-45 mt-1'>
                        Wprowadź nazwę, czas trwania i cenę w kilka sekund.
                    </p>
                </div>
            </div>

            {/* PUSTY STAN (FALLBACK) */}
            {filteredServices.length === 0 && (
                <div className='text-center py-20 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col items-center justify-center'>
                    <i className='fa-solid fa-tags text-4xl text-slate-200 mb-4'></i>
                    <p className='text-sm font-bold text-slate-800'>Brak usług w tej kategorii</p>
                    <p className='text-xs text-slate-400 font-medium mt-1'>
                        Dodaj nową pozycję lub zmień kryteria filtrowania.
                    </p>
                </div>
            )}
        </div>
    );
}
