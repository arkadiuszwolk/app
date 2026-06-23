'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addServiceSchema, AddServiceType, UpdateServiceType } from './schema';
import { TextInput } from './text-input';
import { TextArea } from './text-area';
import { addServiceAction, updateServiceAction } from './actions';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const defaultValues = {
    name: '',
    description: '', // string pasuje do z.string().nullable()
    duration: 30,
    price: 0, // null uciszy z.coerce.number().nullable()
    image_url: '', // string pasuje do z.string().nullable()
    is_active: true,
};

export function AddServiceForm({
    companyId,
    service = null,
    onSuccess,
}: {
    companyId: string;
    service: UpdateServiceType | null;
    onSuccess: () => void;
}) {
    const [isUploading, setIsUploading] = useState(false);

    const { register, handleSubmit, formState, watch, setValue } = useForm<AddServiceType>({
        resolver: zodResolver(addServiceSchema),
        defaultValues: service || defaultValues,
    });

    const currentImageUrl = watch('image_url');

    async function onSubmit(formData: AddServiceType) {
        if (service === null) {
            const { success } = await addServiceAction(companyId, formData);
            if (success) onSuccess();
        } else {
            const { success } = await updateServiceAction(companyId, service.id, formData);
            if (success) onSuccess();
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <h3 className='text-lg font-bold text-gray-950'>
                {service === null ? 'Dodaj nową usługę' : 'Edytuj usługę'}
            </h3>

            {/* 1. Nazwa */}
            <TextInput
                label='Nazwa usługi'
                placeholder='np. Strzyżenie męskie'
                error={formState.errors.name?.message}
                {...register('name')}
            />

            {/* 2. Opis (DODANE) */}
            <TextArea
                label='Opis usługi (opcjonalnie)'
                placeholder='Dodaj krótki opis, który zobaczą klienci...'
                error={formState.errors.description?.message}
                rows={3}
                {...register('description')}
            />

            {/* Czas i Cena obok siebie w gridzie */}
            <div className='grid grid-cols-2 gap-4'>
                {/* 3. Czas */}
                <TextInput
                    type='number'
                    label='Czas trwania (min)'
                    error={formState.errors.duration?.message}
                    {...register('duration', { valueAsNumber: true })}
                />

                {/* 4. Cena (DODANE) */}
                <TextInput
                    type='number'
                    step='0.01' // Pozwala wpisywać grosze, np. 50.50
                    label='Cena (PLN, opcjonalnie)'
                    error={formState.errors.price?.message}
                    {...register('price', { valueAsNumber: true })}
                />
            </div>

            {/* 5. Link do zdjęcia (DODANE) */}
            {/* 5. Uploader Zdjęcia Usługi */}
            <div className='space-y-2 text-gray-950'>
                <label className='block text-sm font-medium text-gray-700'>
                    Zdjęcie usługi (opcjonalnie)
                </label>

                {/* Podgląd zdjęcia - pokaże się TYLKO wtedy, gdy image_url nie jest pusty */}
                {currentImageUrl && (
                    <div className='relative w-32 h-32 mb-3 rounded-lg overflow-hidden border border-gray-200 bg-gray-50'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={currentImageUrl}
                            alt='Podgląd usługi'
                            className='w-full h-full object-cover'
                        />
                        {/* Przycisk usuwania zdjęcia (czyści wartość w formularzu) */}
                        <button
                            type='button'
                            onClick={() => setValue('image_url', '')}
                            className='absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs hover:bg-red-700 transition'
                            title='Usuń zdjęcie'>
                            ✕
                        </button>
                    </div>
                )}

                {/* Input plikowy oraz wskaźnik ładowania */}
                <div className='flex items-center gap-3'>
                    <input
                        type='file'
                        accept='image/jpeg,image/png,image/webp'
                        disabled={isUploading || formState.isSubmitting}
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            // 1. Walidacja rozmiaru po stronie przeglądarki (5MB) dla błyskawicznego UX
                            if (file.size > 5 * 1024 * 1024) {
                                alert('Plik jest za duży! Maksymalny rozmiar to 5MB.');
                                return;
                            }

                            setIsUploading(true);

                            try {
                                // 2. Inicjalizacja Twojego klienta Supabase
                                const supabase = createClient();

                                // 3. Budowanie unikalnej ścieżki (folder z id firmy / unikalna nazwa z rozszerzeniem)
                                const fileExt = file.name.split('.').pop();
                                const fileName = `${companyId}/${crypto.randomUUID()}.${fileExt}`;

                                // 4. Wrzucenie pliku bezpośrednio do Twojego kubełka 'service-images'
                                const { data, error } = await supabase.storage
                                    .from('service-images')
                                    .upload(fileName, file);

                                if (error) {
                                    alert(`Błąd uploadu: ${error.message}`);
                                    return;
                                }

                                // 5. Pobranie publicznego adresu URL nowo wgranego pliku
                                const { data: urlData } = supabase.storage
                                    .from('service-images')
                                    .getPublicUrl(fileName);

                                // 6. Wstrzyknięcie gotowego linku do React Hook Form
                                setValue('image_url', urlData.publicUrl, { shouldValidate: true });
                            } catch (err) {
                                console.error('Błąd:', err);
                                alert('Wystąpił nieoczekiwany błąd podczas przesyłania.');
                            } finally {
                                setIsUploading(false);
                            }
                        }}
                        className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50'
                    />

                    {isUploading && (
                        <span className='text-sm text-blue-600 animate-pulse font-medium'>
                            Wgrywanie pliku...
                        </span>
                    )}
                </div>

                {/* Ukryte pole tekstowe połączone z react-hook-form, które wyśle link w onSubmit */}
                <input type='hidden' {...register('image_url')} />
                {formState.errors.image_url?.message && (
                    <p className='text-sm text-red-600'>{formState.errors.image_url.message}</p>
                )}
            </div>

            {/* 6. Status aktywności (DODANE - prosty checkbox) */}
            <div className='flex items-center gap-2 py-2 text-gray-950'>
                <input
                    type='checkbox'
                    id='is_active'
                    className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                    {...register('is_active')}
                />
                <label
                    htmlFor='is_active'
                    className='text-sm font-medium selection:bg-transparent cursor-pointer'>
                    Usługa jest aktywna i widoczna
                </label>
            </div>

            <button
                type='submit'
                disabled={formState.isSubmitting || isUploading}
                className='w-full p-2.5 bg-blue-600 text-white font-medium rounded disabled:opacity-50 hover:bg-blue-700 transition'>
                {formState.isSubmitting
                    ? 'Zapisywanie...'
                    : isUploading
                      ? 'Czekaj na zdjęcie...'
                      : service === null
                        ? 'Zapisz usługę'
                        : 'Zapisz zmiany'}
            </button>
        </form>
    );
}
