import { useBookingStore } from '@/store/useBookingStore';

export function SuccessView() {
    const { fullName, date, time } = useBookingStore((state) => state);

    return (
        <div className='w-full max-w-md mx-auto flex flex-col items-center justify-center py-12 px-6 animate-in fade-in zoom-in duration-500'>
            {/* Ikona sukcesu - subtelna, nie "cukierkowa" */}
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
            <p className='mt-2 text-gray-500 text-center text-sm leading-relaxed'>
                Dziękujemy, <span className='text-gray-900 font-medium'>{fullName}</span>. Wizyta
                została pomyślnie dodana do grafiku.
            </p>

            {/* Karta podsumowania - "Clean SaaS Look" */}
            <div className='w-full mt-10 bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.03)]'>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center justify-between py-1'>
                        <span className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                            Data wizyty
                        </span>
                        <span className='text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg'>
                            {date}
                        </span>
                    </div>

                    <div className='h-px bg-gray-50 w-full' />

                    <div className='flex items-center justify-between py-1'>
                        <span className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                            Godzina
                        </span>
                        <span className='text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg'>
                            {time}
                        </span>
                    </div>
                </div>
            </div>

            {/* Akcja dodatkowa */}
            <div className='mt-12 flex flex-col items-center gap-4 w-full'>
                <button
                    onClick={() => window.location.reload()}
                    className='w-full py-3.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all active:scale-[0.98]'>
                    Dodaj do kalendarza
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className='text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors'>
                    Zarezerwuj inny termin
                </button>
            </div>
        </div>
    );
}
