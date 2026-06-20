import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyHoursSchema, CompanyHoursType } from './schema';
import { getCompanyHoursForDayAction, saveCompanyHoursForDayAction } from './actions';

type CHFProps = {
    companyId: string;
    dayOfWeek: number;
    onSuccess: () => void;
};

export function CompanyHoursForm({ companyId, dayOfWeek, onSuccess }: CHFProps) {
    const [isLoading, setIsLoading] = useState(true);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CompanyHoursType>({ resolver: zodResolver(companyHoursSchema) });

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            try {
                const data = await getCompanyHoursForDayAction(companyId, dayOfWeek);

                if (data) {
                    reset(data);
                } else {
                    reset({
                        company_id: companyId,
                        day_of_week: dayOfWeek,
                        is_open: false,
                        open_time: '08:00',
                        close_time: '16:00',
                        capacity: 1,
                    });
                }
            } catch (error) {
                console.error('Błąd ładowania danych: ', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, [companyId, dayOfWeek, reset]);

    async function onSubmit(data: CompanyHoursType) {
        const result = await saveCompanyHoursForDayAction(data);
        if (result.success) onSuccess();
    }

    if (isLoading) return <div className='p-4'>Ładowanie danych...</div>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4'>
            <input type='hidden' {...register('company_id')} />
            <input type='hidden' {...register('day_of_week')} />

            <div>
                <label className='flex items-center gap-2'>
                    <input type='checkbox' {...register('is_open')} />
                    <span>Otwarte</span>
                </label>
            </div>

            <div>
                <label className='block text-sm font-medium'>Godzina otwarcia</label>
                <input
                    type='text'
                    placeholder='08:00'
                    {...register('open_time')}
                    className='border p-2 rounded w-full'
                />
                {errors.open_time && (
                    <p className='text-red-500 text-xs mt-1'>{errors.open_time.message}</p>
                )}
            </div>

            <div>
                <label className='block text-sm font-medium'>Godzina zamknięcia</label>
                <input
                    type='text'
                    placeholder='16:00'
                    {...register('close_time')}
                    className='border p-2 rounded w-full'
                />
                {errors.close_time && (
                    <p className='text-red-500 text-xs mt-1'>{errors.close_time.message}</p>
                )}
            </div>

            <div>
                <label className='block text-sm font-medium'>Liczba miejsc (stanowisk)</label>
                <input
                    type='number'
                    {...register('capacity', { valueAsNumber: true })}
                    className='border p-2 rounded w-full'
                />
                {errors.capacity && (
                    <p className='text-red-500 text-xs mt-1'>{errors.capacity.message}</p>
                )}
            </div>

            <button type='submit' className='bg-blue-600 text-white p-2 rounded hover:bg-blue-700'>
                Zapisz zmiany
            </button>
        </form>
    );
}
