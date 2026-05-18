'use client';

import { useBookingStore } from '@/store/useBookingStore';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { createAppointment } from '../../dashboard/owner/actions'; // Sprawdź poprawność ścieżki do actions.ts

interface BookingFormData {
    fullName: string;
    phone: string;
    terms: boolean;
    website: string; // Honeypot na boty
}

export function FormView({ nextStep }: { nextStep: () => void }) {
    const { setCustomer, companyId, service, date, time } = useBookingStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BookingFormData>();

    const onSubmit = async (data: BookingFormData) => {
        if (data.website) return; // Cichy powrót dla bota

        // Walidacja bezpieczeństwa – upewniamy się, że mamy komplet danych z poprzednich kroków
        if (!companyId || !service || !date || !time) {
            setSubmitError('Brak kompletnych danych rezerwacji. Spróbuj odświeżyć stronę.');
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Wywołujemy akcję serwerową zapisu do Supabase
            const result = await createAppointment({
                companyId,
                serviceId: service.id,
                customerName: data.fullName,
                customerPhone: data.phone,
                dateStr: date,
                timeStr: time,
            });

            if (result?.success) {
                // Zapisujemy dane klienta w storze (żeby SuccessView mógł je ładnie wyświetlić)
                setCustomer(data.fullName, data.phone);
                // Przechodzimy do SuccessView
                nextStep();
            } else {
                // Obsługa błędu współbieżności (np. ktoś zajął termin przed chwilą)
                setSubmitError(result?.error || 'Wystąpił nieoczekiwany błąd podczas zapisu.');
            }
        } catch (error: any) {
            console.error('Błąd zapisu rezerwacji:', error);
            setSubmitError(error?.message || 'Błąd połączenia z serwerem. Spróbuj ponownie.');
        } finally {
            setIsSubmitting(false);
        }
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
                    <label className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                        Imię i Nazwisko
                    </label>
                    <input
                        type='text'
                        disabled={isSubmitting}
                        {...register('fullName', { required: 'To pole jest wymagane' })}
                        placeholder='np. Jan Kowalski'
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors disabled:bg-gray-50 disabled:text-gray-400'
                    />
                    {errors.fullName && (
                        <p className='text-xs text-red-500 mt-1'>{errors.fullName.message}</p>
                    )}
                </div>

                {/* Pole: Telefon */}
                <div className='space-y-1.5'>
                    <label className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
                        Numer telefonu
                    </label>
                    <input
                        type='tel'
                        disabled={isSubmitting}
                        {...register('phone', {
                            required: 'To pole jest wymagane',
                            pattern: {
                                value: /^[0-9+ ]{9,15}$/,
                                message: 'Nieprawidłowy format numeru telefonu',
                            },
                        })}
                        placeholder='np. 500 600 700'
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors disabled:bg-gray-50 disabled:text-gray-400'
                    />
                    {errors.phone && (
                        <p className='text-xs text-red-500 mt-1'>{errors.phone.message}</p>
                    )}
                </div>
            </div>

            {/* Regulamin i zgody */}
            <div className='pt-2'>
                <label className='flex items-start gap-3 group cursor-pointer select-none'>
                    <div className='relative flex items-center mt-0.5'>
                        <input
                            type='checkbox'
                            disabled={isSubmitting}
                            {...register('terms', { required: true })}
                            className='peer h-4 w-4 shrink-0 appearance-none rounded-md border border-gray-200 transition-all checked:bg-gray-900 checked:border-gray-900 outline-none disabled:opacity-50'
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

            {/* Wyświetlanie błędu z serwera */}
            {submitError && (
                <div className='p-3 bg-red-50 border border-red-100 rounded-xl text-center'>
                    <p className='text-xs font-medium text-red-600'>{submitError}</p>
                </div>
            )}

            {/* Przycisk Submit z Loaderem */}
            <button
                type='submit'
                disabled={isSubmitting}
                className='w-full py-4 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all active:scale-[0.98] disabled:bg-gray-400 disabled:scale-100 flex items-center justify-center gap-2 cursor-pointer'>
                {isSubmitting ? (
                    <>
                        <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                        Zapisuję rezerwację...
                    </>
                ) : (
                    'Potwierdź rezerwację'
                )}
            </button>
        </form>
    );
}
