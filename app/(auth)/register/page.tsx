'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { registerSchema, RegisterType } from './schema';
import { registerCompanyAction } from './actions';

export default function RegisterPage() {
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            full_name: '',
            company_name: '',
            email: '',
            password: '',
        },
    });

    async function onSubmit(formData: RegisterType) {
        setServerError(null);
        const result = await registerCompanyAction(formData);

        if (result?.success) {
            window.location.href = '/panel/settings';
        } else {
            setServerError(result?.error || 'Wystąpił błąd podczas rejestracji.');
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 text-[#1a1a1a]'>
            <div className='max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-sm border'>
                <div className='text-center space-y-2'>
                    <h2 className='text-3xl font-extrabold text-gray-900'>Załóż konto firmy</h2>
                    <p className='text-sm text-gray-500'>
                        Zarejestruj siebie oraz swój salon piękności
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    {/* Błąd z serwera */}
                    {serverError && (
                        <div className='p-3 bg-red-50 text-red-600 rounded-md text-sm font-medium border border-red-100'>
                            {serverError}
                        </div>
                    )}

                    {/* Imię i Nazwisko właściciela */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-gray-700'>
                            Twoje imię i nazwisko
                        </label>
                        <input
                            type='text'
                            placeholder='np. Jan Kowalski'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            {...register('full_name')}
                        />
                        {errors.full_name && (
                            <span className='text-xs text-red-500'>{errors.full_name.message}</span>
                        )}
                    </div>

                    {/* Nazwa salonu / firmy */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-gray-700'>
                            Nazwa Twojego salonu
                        </label>
                        <input
                            type='text'
                            placeholder='np. Salon Piękna Bella'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            {...register('company_name')}
                        />
                        {errors.company_name && (
                            <span className='text-xs text-red-500'>
                                {errors.company_name.message}
                            </span>
                        )}
                    </div>

                    {/* E-mail (Login) */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-gray-700'>
                            Adres e-mail (Login)
                        </label>
                        <input
                            type='email'
                            placeholder='wlasciciel@salon.pl'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            {...register('email')}
                        />
                        {errors.email && (
                            <span className='text-xs text-red-500'>{errors.email.message}</span>
                        )}
                    </div>

                    {/* Hasło */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-gray-700'>Hasło dostępowe</label>
                        <input
                            type='password'
                            placeholder='••••••••'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            {...register('password')}
                        />
                        {errors.password && (
                            <span className='text-xs text-red-500'>{errors.password.message}</span>
                        )}
                    </div>

                    {/* Przycisk rejestracji */}
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full py-2.5 mt-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50'>
                        {isSubmitting ? 'Zakładanie konta...' : 'Zarejestruj firmę'}
                    </button>
                </form>
            </div>
        </div>
    );
}
