import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyDayOffsSchema, CompanyDayOffsType } from './schema';
import { getCompanyDayOffAction, saveCompanyDayOffAction } from './actions';

type CDOProps = {
    companyId: string;
    dayOffDate: string;
    onSuccess: () => void;
};

export function CompanyDayOffsForm({ companyId, dayOffDate, onSuccess }: CDOProps) {
    const [isLoading, setIsLoading] = useState(true);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CompanyDayOffsType>({ resolver: zodResolver(companyDayOffsSchema) });

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            try {
                const data = await getCompanyDayOffAction(companyId, dayOffDate);

                if (data) {
                    reset(data);
                } else {
                    reset({
                        company_id: companyId,
                        date: dayOffDate,
                        description: '',
                    });
                }
            } catch (error) {
                console.error('Błąd ładowania danych: ', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, [companyId, dayOffDate, reset]);

    async function onSubmit(data: CompanyDayOffsType) {
        console.log(data);
        const result = await saveCompanyDayOffAction(data);
        if (result.success) onSuccess();
    }

    if (isLoading) return <div className='p-4'>Ładowanie danych...</div>;

    const onError = (errors: any) => {
        console.log('Błędy walidacji formularza:', errors);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col gap-4 p-4'>
            {/* Pola ukryte i systemowe */}
            <input type='hidden' {...register('company_id')} />

            {/* Pole daty - tylko do odczytu z ładnym ostylowaniem */}
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Wybrana data</label>
                <input
                    type='text'
                    {...register('date')}
                    className='border p-2 rounded w-full bg-gray-100 text-gray-500'
                />
            </div>

            {/* Opis dnia wolnego */}
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Opis (np. Boże Narodzenie)
                </label>
                <textarea
                    placeholder='Wpisz powód dnia wolnego...'
                    {...register('description')}
                    className='border p-2 rounded w-full h-24'
                />
                {errors.description && (
                    <p className='text-red-500 text-xs mt-1'>{errors.description.message}</p>
                )}
            </div>

            {Object.keys(errors).length > 0 && (
                <div className='bg-red-50 border border-red-200 p-2 rounded text-xs text-red-700'>
                    <pre>{JSON.stringify(errors, null, 2)}</pre>
                </div>
            )}

            <button
                type='submit'
                className='bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors'>
                Zapisz zmiany
            </button>
        </form>
    );
}
