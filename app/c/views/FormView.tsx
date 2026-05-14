'use client';

import { useBookingStore } from '@/store/useBookingStore';
import { useForm } from 'react-hook-form';

interface BookingFormData {
    fullName: string;
    phone: string;
    terms: boolean;
    website: string; // Honeypot
}

export function FormView({ nextStep }: { nextStep: () => void }) {
    const setCustomer = useBookingStore((state) => state.setCustomer);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BookingFormData>();

    const onSubmit = (data: BookingFormData) => {
        if (data.website) return; // Cichy powrót dla bota
        setCustomer(data.fullName, data.phone);
        nextStep();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full max-w-sm mx-auto space-y-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
            {/* Honeypot */}
            <input type='text' {...register('website')} className='hidden' tabIndex={-1} />

            <div className='space-y-4'>
                {/* Pole: Imię i Nazwisko */}
                <div className='space-y-1.5'>
                    <label className='text-xs font-medium text-gray-400 uppercase tracking-wider ml-1'>
                        Imię i nazwisko
                    </label>
                    <input
                        {...register('fullName', { required: 'To pole jest wymagane' })}
                        placeholder='np. Jan Kowalski'
                        className={`w-full px-4 py-3 bg-white border ${errors.fullName ? 'border-red-300' : 'border-gray-100'} rounded-xl outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-50 transition-all placeholder:text-gray-300 text-gray-900 shadow-sm`}
                    />
                    {errors.fullName && (
                        <span className='text-xs text-red-500 ml-1'>{errors.fullName.message}</span>
                    )}
                </div>

                {/* Pole: Telefon z flagą */}
                <div className='space-y-1.5'>
                    <label className='text-xs font-medium text-gray-400 uppercase tracking-wider ml-1'>
                        Numer telefonu
                    </label>
                    <div className='relative group'>
                        <div className='absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none border-r border-gray-100 pr-3'>
                            <span className='text-base'>🇵🇱</span>
                            <span className='text-sm font-medium text-gray-500'>+48</span>
                        </div>
                        <input
                            type='tel'
                            placeholder='000 000 000'
                            {...register('phone', {
                                required: 'To pole jest wymagane',
                                pattern: { value: /^[0-9]{9}$/, message: 'Wpisz dokładnie 9 cyfr' },
                            })}
                            className={`w-full pl-24 pr-4 py-3 bg-white border ${errors.phone ? 'border-red-300' : 'border-gray-100'} rounded-xl outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-50 transition-all placeholder:text-gray-300 text-gray-900 shadow-sm`}
                            onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                const input = e.currentTarget;
                                input.value = input.value.replace(/[^0-9]/g, '').slice(0, 9);
                            }}
                        />
                    </div>
                    {errors.phone && (
                        <span className='text-xs text-red-500 ml-1'>{errors.phone.message}</span>
                    )}
                </div>
            </div>

            {/* Checkbox: Regulamin */}
            <div className='pt-2'>
                <label className='flex items-start gap-3 cursor-pointer group'>
                    <div className='relative flex items-center pt-0.5'>
                        <input
                            type='checkbox'
                            {...register('terms', { required: true })}
                            className='peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-200 transition-all checked:bg-gray-900 checked:border-gray-900 outline-none'
                        />
                        <svg
                            className='absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='3.5'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                        </svg>
                    </div>
                    <span className='text-sm text-gray-500 leading-tight group-hover:text-gray-700 transition-colors'>
                        Akceptuję regulamin oraz przetwarzanie danych osobowych
                    </span>
                </label>
                {errors.terms && (
                    <p className='text-xs text-red-500 mt-2 ml-8'>Zgoda jest wymagana</p>
                )}
            </div>

            {/* Przycisk Submit */}
            <button
                type='submit'
                className='w-full py-4 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-gray-200/50 mt-4'>
                Potwierdzam rezerwację
            </button>
        </form>
    );
}
