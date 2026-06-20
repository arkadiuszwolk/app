'use client'; // To musi być komponent kliencki, bo ma interakcję i stan

import { useState } from 'react';
import { Drawer } from '@/components/Drawer';
import { CustomerForm } from './CustomerForm'; // Import Twojego formularza z Zodem
import { useRouter } from 'next/navigation';

export function AddClientTrigger() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSuccess = () => {
        setIsOpen(false);
        // Magiczna linijka Next.js – odświeża dane na serwerze (Server Component)
        // i pobiera świeżą listę bez przeładowania całej strony!
        router.refresh();
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className='bg-blue-600 text-white px-4 py-2 rounded-md mb-6 hover:bg-blue-700 transition-colors font-medium text-sm'>
                + Dodaj nowego klienta
            </button>

            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2 className='text-lg font-bold text-gray-900 mb-6'>Nowy klient</h2>
                <CustomerForm onSuccess={handleSuccess} />
            </Drawer>
        </>
    );
}
