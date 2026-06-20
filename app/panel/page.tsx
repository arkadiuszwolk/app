import { createClient } from '@/utils/supabase/server';
import { AddClientTrigger } from './AddClientTrigger'; // <-- Import nowego komponentu

interface ClientRow {
    id: string;
    created_at: string;
    full_name: string;
    phone: string;
    email: string;
    sex: 'male' | 'female' | 'other';
    note: string | null;
}

export default async function ClientsPage() {
    const supabase = await createClient();

    const { data: clients, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return <div className='p-6 text-red-500'>Błąd bazy danych: {error.message}</div>;
    }

    return (
        <div className='max-w-6xl mx-auto py-10 px-4'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold text-gray-900'>Lista Klientów (Supabase)</h1>

                {/* Wstrzykujemy przycisk z szufladą */}
                <AddClientTrigger />
            </div>

            {clients && clients.length === 0 ? (
                <p className='text-gray-500'>Brak klientów w bazie danych.</p>
            ) : (
                <div className='overflow-x-auto border rounded-lg shadow-sm'>
                    <table className='min-w-full divide-y divide-gray-200 text-sm font-sans'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 text-left font-semibold text-gray-700'>
                                    Lp.
                                </th>
                                <th className='px-6 py-3 text-left font-semibold text-gray-700'>
                                    Imię i nazwisko
                                </th>
                                <th className='px-6 py-3 text-left font-semibold text-gray-700'>
                                    Telefon
                                </th>
                                <th className='px-6 py-3 text-left font-semibold text-gray-700'>
                                    E-mail
                                </th>
                                <th className='px-6 py-3 text-left font-semibold text-gray-700'>
                                    Płeć
                                </th>
                                <th className='px-6 py-3 text-left font-semibold text-gray-700'>
                                    Notatka
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {clients?.map((client, index) => (
                                <tr key={client.id} className='hover:bg-gray-50 transition-colors'>
                                    <td className='px-6 py-4 text-gray-400'>#{index + 1}</td>
                                    <td className='px-6 py-4 font-medium text-gray-900'>
                                        {client.full_name}
                                    </td>
                                    <td className='px-6 py-4 text-gray-600'>{client.phone}</td>
                                    <td className='px-6 py-4 text-gray-600'>{client.email}</td>
                                    <td className='px-6 py-4 text-gray-600'>
                                        {client.sex === 'male'
                                            ? 'Mężczyzna'
                                            : client.sex === 'female'
                                              ? 'Kobieta'
                                              : 'Inna'}
                                    </td>
                                    <td className='px-6 py-4 text-gray-500 max-w-xs truncate italic'>
                                        {client.note || <span className='text-gray-300'>Brak</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
