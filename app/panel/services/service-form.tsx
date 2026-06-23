'use client';

import { useState } from 'react';
import { serviceSchema, ServiceType } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveServiceAction } from './actions';

type SFType = {
    companyId: string;
    service: ServiceType | null;
    onSuccess: () => void;
};

export function ServiceForm({ companyId, service, onSuccess }: SFType) {
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ServiceType>({
        resolver: zodResolver(serviceSchema),
        defaultValues: service ?? {
            company_id: companyId,
            name: '',
            description: '',
            duration: 30,
            price: null,
            is_active: true,
        },
    });

    async function onSubmit(data: AddServiceType) {
        const result = await saveServiceAction(data);
        if (result.success) onSuccess();
    }

    return (
        <div className='p-4'>
            {/* 3. Dynamiczny tytuł w zależności od trybu */}
            <h3 className='text-lg font-bold mb-4'>
                {service !== null ? 'Edytuj usługę' : 'Dodaj nową usługę'}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                {/* Ukryte pola na ID (wymagane przy edycji) oraz company_id */}
                {service && <input type='hidden' {...register('id')} />}
                <input type='hidden' {...register('company_id')} />

                {/* Pole: Nazwa */}
                <div>
                    <label className='block text-sm font-medium mb-1'>Nazwa usługi</label>
                    <input
                        type='text'
                        {...register('name')}
                        className='border p-2 rounded w-full'
                    />
                    {errors.name && (
                        <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>
                    )}
                </div>

                {/* Pole: Opis */}
                <div>
                    <label className='block text-sm font-medium mb-1'>Opis (opcjonalnie)</label>
                    <textarea {...register('description')} className='border p-2 rounded w-full' />
                </div>

                {/* Pole: Czas trwania */}
                <div>
                    <label className='block text-sm font-medium mb-1'>Czas trwania (minuty)</label>
                    <input
                        type='number'
                        {...register('duration', { valueAsNumber: true })}
                        className='border p-2 rounded w-full'
                    />
                    {errors.duration && (
                        <p className='text-red-500 text-xs mt-1'>{errors.duration.message}</p>
                    )}
                </div>

                {/* Przycisk zapisu */}
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className='bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400'>
                    {isSubmitting ? 'Zapisywanie...' : service ? 'Zapisz zmiany' : 'Dodaj usługę'}
                </button>
            </form>
        </div>
    );
}
