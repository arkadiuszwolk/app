'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface LoginFormData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        console.log('Logowanie przez RHF:', data);
        // Po Supabase Auth przekierowanie:
        router.push('/dashboard/owner');
    };

    return (
        <div className='min-h-dvh flex items-center justify-center bg-gray-50 p-4'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full max-w-sm bg-white p-6 rounded-2xl shadow-sm space-y-4'>
                <h2 className='text-xl font-bold text-gray-900 text-center'>
                    Zaloguj się do panelu
                </h2>

                <div className='space-y-3'>
                    <div>
                        <label className='text-xs font-medium text-gray-500'>E-mail</label>
                        <input
                            type='email'
                            {...register('email', { required: 'Wpisz swój e-mail' })}
                            className='w-full border p-2.5 rounded-xl text-sm'
                            placeholder='twoj@email.com'
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
                            className='w-full border p-2.5 rounded-xl text-sm'
                            placeholder='••••••••'
                        />
                        {errors.password && (
                            <p className='text-xs text-red-500 mt-1'>{errors.password.message}</p>
                        )}
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors'>
                    Zaloguj się
                </button>
            </form>
        </div>
    );
}
