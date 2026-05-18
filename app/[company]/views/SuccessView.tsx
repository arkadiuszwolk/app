'use client';

import { useBookingStore } from '@/store/useBookingStore';

export function SuccessView() {
    // Pobieramy pełny stan ze stora
    const { fullName, date, time, service, reset } = useBookingStore();

    const handleReset = () => {
        reset(); // Czyścimy Zustand ze starych danych rezerwacji
        window.location.href = window.location.pathname; // Przekierowujemy na czysty URL bez parametrów kroków (?step=1)
    };

    return (
        <div className='w-full max-w-md mx-auto flex flex-col items-center justify-center py-12 px-6 animate-in fade-in zoom-in duration-500'>
            {/* Ikona sukcesu */}
            <div className='mb-8 relative'>
                <div className='absolute inset-0 bg-blue-100 rounded-full scale-150 blur-xl opacity-50' />
                <div className='relative w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-sm'>
                    <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2.5'
                            d='M5 13l4 4L19 7'
                        />
                    </svg>
                </div>
            </div>

            {/* Nagłówek */}
            <h1 className='text-2xl font-semibold text-gray-900 text-center tracking-tight'>
                Rezerwacja potwierdzona
            </h1>
            <p className='mt-2 text-sm text-gray-400 text-center max-w-70 leading-relaxed'>
                Dziękujemy {fullName}! Twój termin został pomyślnie zapisany w systemie.
            </p>

            {/* Karta szczegółów wizyty */}
            <div className='mt-10 w-full border border-gray-100 rounded-2xl p-5 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4'>
                <div className='flex flex-col space-y-3.5'>
                    {/* Dynamiczna usługa */}
                    <div className='flex items-center justify-between py-1'>
                        <span className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                            Usługa
                        </span>
                        <span className='text-sm font-semibold text-gray-900 text-right max-w-50 truncate'>
                            {service?.name || 'Wizyta'}
                        </span>
                    </div>

                    <div className='h-px bg-gray-50 w-full' />

                    {/* Dynamiczny koszt i czas */}
                    <div className='flex items-center justify-between py-1'>
                        <span className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                            Cena i czas
                        </span>
                        <span className='text-sm font-semibold text-gray-900'>
                            {service?.price} PLN{' '}
                            <span className='text-gray-300 font-normal mx-1'>•</span>{' '}
                            {service?.duration} min
                        </span>
                    </div>

                    <div className='h-px bg-gray-50 w-full' />

                    {/* Data */}
                    <div className='flex items-center justify-between py-1'>
                        <span className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                            Data
                        </span>
                        <span className='text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg'>
                            {date}
                        </span>
                    </div>

                    <div className='h-px bg-gray-50 w-full' />

                    {/* Godzina */}
                    <div className='flex items-center justify-between py-1'>
                        <span className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                            Godzina
                        </span>
                        <span className='text-sm font-semibold text-blue-600 bg-blue-50/50 px-3 py-1 rounded-lg'>
                            {time}
                        </span>
                    </div>
                </div>
            </div>

            {/* Akcje dodatkowe */}
            <div className='mt-12 flex flex-col items-center gap-4 w-full'>
                <button
                    onClick={() => alert('Funkcja dodawania ICS/Google Calendar już wkrótce!')}
                    className='w-full py-4 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all active:scale-[0.98] cursor-pointer'>
                    Dodaj do kalendarza
                </button>
                <button
                    onClick={handleReset}
                    className='text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-pointer'>
                    Zarezerwuj inny termin / Wróć
                </button>
            </div>
        </div>
    );
}
