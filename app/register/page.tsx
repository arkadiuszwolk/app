'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { registerCompany } from '../auth/actions'; // Import naszej akcji serwerowej

interface RegisterFormData {
    fullName: string;
    email: string;
    password: string;
    companyName: string;
    companySlug: string;
}

export default function RegisterPage() {
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        setServerError(null);
        setIsLoading(false);
        setIsLoading(true);

        try {
            // Wywołujemy akcję serwerową, która wykona 3 kroki w bazie danych
            await registerCompany(data);
            // Po sukcesie akcja serwerowa automatycznie przekieruje do /dashboard/owner
        } catch (err: any) {
            setServerError(err.message || 'Wystąpił błąd podczas rejestracji firmy.');
            setIsLoading(false);
        }
    };

    // Funkcja czyszcząca slug w locie, wywoływana przy zmianie nazwy firmy
    const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setValue('companyName', name);

        // Generujemy ładny slug: małe litery, bez spacji, bez polskich znaków
        const generatedSlug = name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Usuwa polskie ogonki
            .replace(/[^a-z0-9-]/g, '-') // Zamienia znaki specjalne i spacje na myślniki
            .replace(/-+/g, '-') // Zapobiega podwójnym myślnikom
            .replace(/^-|-$/g, ''); // Usuwa myślnik z początku i końca

        setValue('companySlug', generatedSlug);
    };

    return (
        <div className='min-h-dvh flex items-center justify-center bg-gray-50 p-4'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full max-w-sm bg-white p-6 rounded-2xl shadow-sm space-y-4'>
                <h2 className='text-xl font-bold text-gray-900 text-center'>Załóż konto firmy</h2>

                {/* Alert z błędem z serwera (np. gdy slug firmy jest już zajęty) */}
                {serverError && (
                    <div className='p-3 bg-red-50 border border-red-100 rounded-xl text-center'>
                        <p className='text-xs text-red-600 font-medium'>{serverError}</p>
                    </div>
                )}

                <div className='space-y-3'>
                    <div>
                        <label className='text-xs font-medium text-gray-500'>
                            Imię i Nazwisko właściciela
                        </label>
                        <input
                            type='text'
                            {...register('fullName', { required: 'To pole jest wymagane' })}
                            className='w-full border p-2.5 rounded-xl text-sm outline-indigo-600'
                            placeholder='Jan Kowalski'
                            disabled={isLoading}
                        />
                        {errors.fullName && (
                            <p className='text-xs text-red-500 mt-1'>{errors.fullName.message}</p>
                        )}
                    </div>

                    <div>
                        <label className='text-xs font-medium text-gray-500'>Adres E-mail</label>
                        <input
                            type='email'
                            {...register('email', {
                                required: 'To pole jest wymagane',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Niepoprawny format e-mail',
                                },
                            })}
                            className='w-full border p-2.5 rounded-xl text-sm outline-indigo-600'
                            placeholder='jan@firma.pl'
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
                            {...register('password', {
                                required: 'To pole jest wymagane',
                                minLength: { value: 6, message: 'Hasło musi mieć min. 6 znaków' },
                            })}
                            className='w-full border p-2.5 rounded-xl text-sm outline-indigo-600'
                            placeholder='••••••••'
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <p className='text-xs text-red-500 mt-1'>{errors.password.message}</p>
                        )}
                    </div>

                    <div className='border-t pt-2 my-2'>
                        <label className='text-xs font-medium text-gray-500'>
                            Nazwa Twojej firmy
                        </label>
                        <input
                            type='text'
                            {...register('companyName', { required: 'To pole jest wymagane' })}
                            onChange={handleCompanyNameChange}
                            className='w-full border p-2.5 rounded-xl text-sm outline-indigo-600'
                            placeholder='Salon Fryzjerski Bella'
                            disabled={isLoading}
                        />
                        {errors.companyName && (
                            <p className='text-xs text-red-500 mt-1'>
                                {errors.companyName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className='text-xs font-medium text-gray-500'>
                            Unikalny link (slug)
                        </label>
                        <div className='flex items-center border rounded-xl overflow-hidden text-sm bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:border-transparent'>
                            <span className='pl-2.5 text-gray-400 select-none'>minical.pl/</span>
                            <input
                                type='text'
                                {...register('companySlug', { required: 'Slug jest wymagany' })}
                                className='w-full p-2.5 bg-white outline-none'
                                placeholder='fryzjer-bella'
                                disabled={isLoading}
                            />
                        </div>
                        {errors.companySlug && (
                            <p className='text-xs text-red-500 mt-1'>
                                {errors.companySlug.message}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type='submit'
                    disabled={isLoading}
                    className={`w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.99]'
                    }`}>
                    {isLoading ? (
                        <div className='flex items-center space-x-2'>
                            <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                            <span>Tworzenie konta firmy...</span>
                        </div>
                    ) : (
                        'Zarejestruj firmę'
                    )}
                </button>
            </form>
        </div>
    );
}
