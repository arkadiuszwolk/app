'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { login } from '../auth/actions'; // Import akcji serwerowej, którą stworzyłeś w kroku 4

interface LoginFormData {
    email: string;
    password: string;
}

export default function LoginPage() {
    // Stan na błędy zwracane bezpośrednio z Supabase (np. "Invalid login credentials")
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        setServerError(null);
        setIsLoading(true);

        try {
            // Wywołujemy naszą bezpieczną akcję serwerową przekazując dane z formularza
            await login(data);
            // Jeśli logowanie się powiedzie, akcja serwerowa sama przekieruje użytkownika (redirect)
        } catch (err: any) {
            // Przechwytujemy błąd z Supabase i zapisujemy go w stanie
            setServerError(err.message || 'Wystąpił nieoczekiwany błąd logowania.');
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-dvh flex items-center justify-center bg-gray-50 p-4'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full max-w-sm bg-white p-6 rounded-2xl shadow-sm space-y-4'>
                <h2 className='text-xl font-bold text-gray-900 text-center'>
                    Zaloguj się do panelu
                </h2>

                {/* Sekcja wyświetlania błędów z serwera (Supabase) */}
                {serverError && (
                    <div className='p-3 bg-red-50 border border-red-100 rounded-xl text-center'>
                        <p className='text-xs text-red-600 font-medium'>{serverError}</p>
                    </div>
                )}

                <div className='space-y-3'>
                    <div>
                        <label className='text-xs font-medium text-gray-500'>E-mail</label>
                        <input
                            type='email'
                            {...register('email', {
                                required: 'Wpisz swój e-mail',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Niepoprawny format adresu e-mail',
                                },
                            })}
                            className='w-full border p-2.5 rounded-xl text-sm outline-indigo-600'
                            placeholder='twoj@email.com'
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <p className='text-xs text-red-500 mt-1'>{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label className='text-xs font-medium text-gray-500'>Hasło</label>
                        <input
                            type='password'
                            {...register('password', { required: 'Wpisz hasło' })}
                            className='w-full border p-2.5 rounded-xl text-sm outline-indigo-600'
                            placeholder='••••••••'
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <p className='text-xs text-red-500 mt-1'>{errors.password.message}</p>
                        )}
                    </div>
                </div>

                <button
                    type='submit'
                    disabled={isLoading}
                    className={`w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all flex items-center justify-center ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.99]'
                    }`}>
                    {isLoading ? (
                        <div className='flex items-center space-x-2'>
                            {/* Prosty spinner Tailwindowy wskazujący ładowanie */}
                            <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                            <span>Logowanie...</span>
                        </div>
                    ) : (
                        'Zaloguj się'
                    )}
                </button>
            </form>
        </div>
    );
}
