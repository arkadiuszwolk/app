'use client';

import { useState } from 'react';
import { customerSchema, CustomerType } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { upsertCustomerAction } from './actions';

type SFType = {
    companyId: string;
    customer: CustomerType | null;
    onSuccess: () => void;
};

export function CustomerForm({ companyId, customer, onSuccess }: SFType) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CustomerType>({
        resolver: zodResolver(customerSchema),
        defaultValues: customer ?? {
            company_id: companyId,
            full_name: '',
            phone: '',
            email: '',
            gender: 'none',
        },
    });

    async function onSubmit(data: CustomerType) {
        console.log('simea');
        const result = await upsertCustomerAction(data);
        if (result.success) onSuccess();
    }

    return (
        <div className='p-4'>
            {/* 3. Dynamiczny tytuł w zależności od trybu */}
            <h3 className='text-lg font-bold mb-4'>
                {customer !== null ? 'Edytuj klienta' : 'Dodaj nowego klienta'}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                {/* Ukryte pola na ID (wymagane przy edycji) oraz company_id */}
                {customer && <input type='hidden' {...register('id')} />}
                <input type='hidden' {...register('company_id')} />

                {/* Pole: Imię i nazwisko */}
                <div>
                    <label className='block text-sm font-medium mb-1'>Imię i nazwisko</label>
                    <input
                        type='text'
                        {...register('full_name')}
                        className='border p-2 rounded w-full'
                    />
                    {errors.full_name && (
                        <p className='text-red-500 text-xs mt-1'>{errors.full_name.message}</p>
                    )}
                </div>

                {/* Pole: Telefon */}
                <div>
                    <label className='block text-sm font-medium mb-1'>Telefon</label>
                    <input
                        type='text'
                        {...register('phone')}
                        className='border p-2 rounded w-full'
                    />
                    {errors.phone && (
                        <p className='text-red-500 text-xs mt-1'>{errors.phone.message}</p>
                    )}
                </div>

                {/* Pole: Email */}
                <div>
                    <label className='block text-sm font-medium mb-1'>Email</label>
                    <input
                        type='text'
                        {...register('email')}
                        className='border p-2 rounded w-full'
                    />
                    {errors.email && (
                        <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <label className='block text-sm font-medium mb-1'>Płeć</label>
                    <select
                        {...register('gender')}
                        className='border px-4 py-2 w-full rounded-md bg-white focus:outline-blue-500'>
                        <option value='none'>Inna</option>
                        <option value='female'>Kobieta</option>
                        <option value='male'>Mężczyzna</option>
                    </select>
                    {errors.gender && (
                        <p className='text-red-500 text-sm mt-1'>{errors.gender.message}</p>
                    )}
                </div>

                {/* Przycisk zapisu */}
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className='bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400'>
                    {isSubmitting ? 'Zapisywanie...' : customer ? 'Zapisz zmiany' : 'Dodaj klienta'}
                </button>
            </form>
        </div>
    );
}
