'use client';

import { useBookingStore } from '@/store/useBookingStore';
import { useEffect, useState } from 'react';
import { getAvailableSlots } from '../../dashboard/owner/actions'; // Sprawdź czy ścieżka do Twojego pliku actions się zgadza

export function TimePickerView({ nextStep }: { nextStep: () => void }) {
    const { setTime, date, service, companyId } = useBookingStore();
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadSlots() {
            // Jeśli nie mamy kompletu danych w sklepie, nie pytamy bazy
            if (!companyId || !service || !date) return;

            setIsLoading(true);
            try {
                // Wywołujemy naszą bezpieczną akcję serwerową
                const slots = await getAvailableSlots(companyId, service.id, date);
                setAvailableSlots(slots);
            } catch (error) {
                console.error('Błąd podczas pobierania wolnych terminów:', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadSlots();
    }, [companyId, service, date]);

    const handleSelect = (h: string) => {
        setTime(h); // Zapisujemy wybraną godzinę w Zustandzie
        nextStep(); // Idziemy do kroku z formularzem
    };

    return (
        <div className='w-full h-full flex flex-col px-4'>
            <h2 className='font-semibold text-xl text-blue-600 mt-10 mb-10 text-center'>
                Wybierz godzinę
            </h2>

            {/* Spinner ładowania */}
            {isLoading ? (
                <div className='flex flex-col items-center justify-center py-12 space-y-3'>
                    <div className='w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin' />
                    <p className='text-xs text-gray-400 font-medium'>Szukam wolnych terminów...</p>
                </div>
            ) : (
                /* Lista generowanych godzin */
                <ul className='w-full flex-1 space-y-4 overflow-y-auto max-h-95 pr-1'>
                    {availableSlots.map((h) => (
                        <li key={h} className='w-full flex justify-center'>
                            <button
                                onClick={() => handleSelect(h)}
                                className='w-60 px-6 py-4 bg-blue-100 text-blue-500 rounded-xl hover:bg-blue-200 transition-colors cursor-pointer font-medium'>
                                {h}
                            </button>
                        </li>
                    ))}

                    {/* Komunikat gdy salon jest zamknięty lub brak miejsc */}
                    {availableSlots.length === 0 && (
                        <div className='text-center py-12 space-y-1'>
                            <p className='text-sm font-semibold text-gray-700'>
                                Brak wolnych miejsc 😔
                            </p>
                            <p className='text-xs text-gray-400'>
                                Wszystkie terminy są zajęte lub salon jest zamknięty. Wybierz inny
                                dzień.
                            </p>
                        </div>
                    )}
                </ul>
            )}
        </div>
    );
}
