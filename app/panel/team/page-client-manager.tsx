'use client';

import { Drawer } from '@/components/Drawer';
import { useState } from 'react';

type PCMProps = {
    companyId: string;
};

export function PageClientManager({ companyId }: PCMProps) {
    const [drawer, setDrawer] = useState<'addEmployee' | null>(null);
    return (
        <div>
            Witaj!
            <button
                onClick={() => {
                    setDrawer('addEmployee');
                }}
                className='hover:cursor-pointer hover:text-gray-600'>
                Dodaj klienta
            </button>
            <Drawer isOpen={drawer !== null} onClose={() => setDrawer(null)}>
                <h2>Witamy!</h2>
            </Drawer>
        </div>
    );
}
