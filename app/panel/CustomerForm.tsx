'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, CustomerFormValues } from './client.schemas';
import { addClientAction } from './actions'; // <-- Importujesz naszą akcję

// 1. Definiujemy typ dla propsów komponentu
interface CustomerFormProps {
    onSuccess: () => void;
}

// 2. Przekazujemy props do funkcji
export function CustomerForm({ onSuccess }: CustomerFormProps) {
    const {
        register,
        handleSubmit,
        reset, // <-- Wyciągamy reset, żeby wyczyścić inputy po sukcesie
        formState: { errors },
    } = useForm<CustomerFormValues>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            note: '',
        },
    });

    // 3. Obsługujemy wysyłkę asynchronicznie do Supabase
    const onSubmit = async (data: CustomerFormValues) => {
        try {
            await addClientAction(data); // Wysyłamy dane na serwer
            reset(); // Czyścimy formularz w przeglądarce
            onSuccess(); // Wywołujemy callback (zamyka szufladę i odświeża tabelę)
        } catch (error) {
            console.error('Błąd podczas dodawania klienta:', error);
            alert('Coś poszło nie tak przy zapisie do bazy danych.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
                <label className='block text-sm font-medium mb-1'>Imię i nazwisko</label>
                <input
                    type='text'
                    {...register('fullName')}
                    className='px-4 py-2 border border-gray-200 w-full rounded-md focus:outline-blue-500'
                    placeholder='np. Jan Kowalski'
                />
                {errors.fullName && (
                    <p className='text-red-500 text-sm mt-1'>{errors.fullName.message}</p>
                )}
            </div>

            <div>
                <label className='block text-sm font-medium mb-1'>Telefon</label>
                <input
                    type='text'
                    {...register('phone')}
                    className='px-4 py-2 border border-gray-200 w-full rounded-md focus:outline-blue-500'
                    placeholder='np. 500600700'
                />
                {errors.phone && (
                    <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>
                )}
            </div>

            <div>
                <label className='block text-sm font-medium mb-1'>Email</label>
                <input
                    type='text'
                    {...register('email')}
                    className='px-4 py-2 border border-gray-200 w-full rounded-md focus:outline-blue-500'
                    placeholder='np. jan@kowalski.pl'
                />
                {errors.email && (
                    <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                )}
            </div>

            <div>
                <label className='block text-sm font-medium mb-1'>Płeć</label>
                <select
                    {...register('sex')}
                    className='border px-4 py-2 w-full rounded-md bg-white focus:outline-blue-500'>
                    <option value=''>-- Wybierz płeć --</option>
                    <option value='female'>Kobieta</option>
                    <option value='male'>Mężczyzna</option>
                    <option value='other'>Inna</option>
                </select>
                {errors.sex && <p className='text-red-500 text-sm mt-1'>{errors.sex.message}</p>}
            </div>

            <div>
                <label className='block text-sm font-medium mb-1'>Notatka</label>
                <textarea
                    {...register('note')}
                    className='px-4 py-2 border border-gray-200 w-full rounded-md focus:outline-blue-500 h-24 resize-none'
                    placeholder='Miejsce na notatkę...'
                />
                {errors.note && <p className='text-red-500 text-sm mt-1'>{errors.note.message}</p>}
            </div>

            <button
                type='submit'
                className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full font-medium transition-colors'>
                Dodaj klienta
            </button>
        </form>
    );
}
