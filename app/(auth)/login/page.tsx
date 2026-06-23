'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { loginSchema, LoginType } from './schema';
import { loginAction } from './actions';

export default function LoginPage() {
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(formData: LoginType) {
        setServerError(null);
        const result = await loginAction(formData);

        if (result?.success) {
            // Po udanym logowaniu Next.js automatycznie rozpozna sesję.
            // Przekierowujemy usera do dashboardu
            window.location.href = '/panel/settings';
        } else {
            setServerError(result?.error || 'Nie udało się zalogować.');
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 text-[#1a1a1a]'>
            <div className='max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-sm border'>
                <div className='text-center space-y-2'>
                    <h2 className='text-3xl font-extrabold text-gray-900'>Zaloguj się</h2>
                    <p className='text-sm text-gray-500'>Zarządzaj swoim salonem piękności</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    {serverError && (
                        <div className='p-3 bg-red-50 text-red-600 rounded-md text-sm font-medium border border-red-100'>
                            {serverError}
                        </div>
                    )}

                    {/* E-mail */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-gray-700'>Adres e-mail</label>
                        <input
                            type='email'
                            placeholder='twoj-mail@salon.pl'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            {...register('email')}
                        />
                        {errors.email && (
                            <span className='text-xs text-red-500'>{errors.email.message}</span>
                        )}
                    </div>

                    {/* Hasło */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium text-gray-700'>Hasło</label>
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

                    {/* Przycisk logowania */}
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full py-2.5 mt-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50'>
                        {isSubmitting ? 'Logowanie...' : 'Zaloguj się'}
                    </button>
                </form>
            </div>
        </div>
    );
}
