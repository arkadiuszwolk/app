'use client';

import { Drawer } from '@/components/Drawer';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { fetchClientsAction } from './actions';

export default function Page() {
    const [open, setOpen] = useState(false);
    // Stan na klientów z bazy danych (na start pusta tablica)
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // 3. Pobieramy dane zaraz po załadowaniu komponentu
    useEffect(() => {
        async function loadData() {
            const data = await fetchClientsAction();
            setClients(data);
            setLoading(false);
        }
        loadData();
    }, []);

    const columns = [
        'ID',
        'Imię i nazwisko',
        'Numer telefonu',
        'Odbyte wizyty',
        'Łączny obrót',
        'Ostatnia wizyta',
        'Akcje',
    ];

    function ActionButton() {
        return (
            <button
                onClick={() => setOpen((prev) => !prev)}
                className='w-3 aspect-square rounded-md bg-gray-200 flex-none shrink-0 hover:cursor-pointer hover:bg-gray-300 transition-colors'>
                x
            </button>
        );
    }

    return (
        <div className='flex flex-col justify-center items-center py-10'>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className='m-10 px-4 py-2 rounded-md bg-gray-200 hover:cursor-pointer hover:bg-gray-300'>
                Drawer
            </button>

            {loading ? (
                <div className='text-sm text-gray-400 font-sans'>Ładowanie klientów z bazy...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            {columns.map((label, i) => (
                                <th
                                    key={i}
                                    className='px-4 text-left font-semibold text-gray-700 text-sm py-2'>
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((c, i) => (
                            /* Najlepiej użyć unikalnego identyfikatora z bazy jako klucza w React */
                            <tr
                                key={c.client_id}
                                className='border-b border-gray-50 hover:bg-gray-50/50 transition-colors'>
                                {/* Zamienione na generowanie ładnego formatu wizualnego C-00X tak jak miałeś pierwotnie */}
                                <td className='px-4 py-3 text-left font-mono text-xs text-gray-500'>
                                    C-{String(i + 1).padStart(3, '0')}
                                </td>

                                <td className='px-4 py-3 text-left font-medium text-gray-900'>
                                    {c.fullName}
                                </td>
                                <td className='px-4 py-3 text-left text-gray-600'>
                                    {c.phoneNumber}
                                </td>
                                <td className='px-4 py-3 text-left font-medium text-gray-600'>
                                    {c.totalVisits}
                                </td>
                                <td className='px-4 py-3 text-left font-semibold text-gray-900'>
                                    {c.totalRevenue}
                                </td>

                                <td className='px-4 py-3 text-left'>
                                    {/* POPRAWKA: Sprawdzamy czy c.lastVisit istnieje, zapobiega to crashowaniu aplikacji */}
                                    {c.lastVisit ? (
                                        <div className='flex flex-col leading-tight'>
                                            <span>
                                                {c.lastVisit.date}, {c.lastVisit.time}
                                            </span>
                                            <span className='text-xs text-gray-400'>
                                                {c.lastVisit.service}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className='text-xs text-gray-400 italic'>
                                            Brak wizyt
                                        </span>
                                    )}
                                </td>

                                <td className='px-4 py-3 text-left'>
                                    <div className='flex space-x-2'>
                                        <ActionButton />
                                        <ActionButton />
                                        <ActionButton />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Drawer isOpen={open} onClose={() => setOpen(false)}>
                <h2 className='mb-8 font-semibold text-lg text-gray-900'>Edytuj klienta</h2>
                <div className='w-full flex flex-col space-y-2'>
                    <input
                        type='text'
                        className='px-4 py-2 border border-gray-200 rounded-md focus:outline-2 outline-gray-100'
                        placeholder='Jan Kowalski'
                    />
                    <input
                        type='text'
                        className='px-4 py-2 border border-gray-200 rounded-md focus:outline-2 outline-gray-100'
                        placeholder='818 917 608'
                    />
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className='bg-blue-500 text-white rounded-md px-4 py-2 hover:cursor-pointer hover:bg-blue-600 transition-colors'>
                        Zatwierdź
                    </button>
                </div>
            </Drawer>
        </div>
    );
}
