'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input/input';

interface FormViewProps {
    onComplete: (data: any) => void;
}

export function FormView({ onComplete }: FormViewProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: '',
            phone: '',
            terms: false,
        },
    });

    return (
        <div className='w-full flex flex-col items-center'>
            <h2 className='font-semibold text-xl text-blue-600 mt-10 mb-8 text-center'>
                Dane kontaktowe
            </h2>

            <form 
                onSubmit={handleSubmit(onComplete)} 
                className='w-full max-w-[320px] space-y-5'
            >
                {/* IMIĘ I NAZWISKO */}
                <div className='flex flex-col'>
                    <label className='text-xs font-semibold text-gray-400 mb-2 ml-1 uppercase tracking-wider'>
                        Imię i nazwisko
                    </label>
                    <input
                        {...register('fullName', { required: 'To pole jest wymagane' })}
                        placeholder='Jan Kowalski'
                        className={`w-full p-4 bg-gray-50 border ${
                            errors.fullName ? 'border-red-400' : 'border-transparent'
                        } rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-gray-700 shadow-sm`}
                    />
                    {errors.fullName && (
                        <span className='text-red-500 text-[10px] mt-1 ml-2 font-medium'>
                            {errors.fullName.message}
                        </span>
                    )}
                </div>

                {/* TELEFON */}
                <div className='flex flex-col'>
                    <label className='text-xs font-semibold text-gray-400 mb-2 ml-1 uppercase tracking-wider'>
                        Numer telefonu
                    </label>
                    <div className='flex gap-2'>
                        <div className='flex items-center justify-center px-3 bg-gray-100 rounded-2xl text-gray-500 text-sm font-bold border border-transparent shadow-sm'>
                            +48
                        </div>
                        <Controller
                            name='phone'
                            control={control}
                            rules={{ 
                                required: 'Numer jest wymagany',
                                minLength: { value: 9, message: 'Numer jest za krótki' } 
                            }}
                            render={({ field: { onChange, value } }) => (
                                <PhoneInput
                                    country='PL'
                                    value={value}
                                    onChange={onChange}
                                    placeholder='600 000 000'
                                    className={`flex-1 p-4 bg-gray-50 border ${
                                        errors.phone ? 'border-red-400' : 'border-transparent'
                                    } rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-gray-700 shadow-sm`}
                                />
                            )}
                        />
                    </div>
                    {errors.phone && (
                        <span className='text-red-500 text-[10px] mt-1 ml-2 font-medium'>
                            {errors.phone.message}
                        </span>
                    )}
                </div>

                {/* CHECKBOX REGULAMIN */}
                <div className='pt-2'>
                    <label className='flex items-start gap-3 cursor-pointer group'>
                        <input
                            type='checkbox'
                            {...register('terms', { required: true })}
                            className='mt-1 w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all'
                        />
                        <span className='text-[11px] text-gray-400 leading-relaxed group-hover:text-gray-600 transition-colors'>
                            Akceptuję <span className='underline'>regulamin</span> rezerwacji oraz wyrażam zgodę na otrzymywanie powiadomień.
                        </span>
                    </label>
                    {errors.terms && (
                        <p className='text-red-500 text-[10px] mt-1 font-medium'>Musisz zaakceptować regulamin</p>
                    )}
                </div>

                {/* PRZYCISK REZERWUJĘ */}
                <button
                    type='submit'
                    className='w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-[0.96] transition-all mt-4'
                >
                    Rezerwuję
                </button>
            </form>
        </div>
    );
}