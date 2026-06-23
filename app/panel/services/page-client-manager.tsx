'use client';

import { useState } from 'react';
import { ServiceType } from './schema';
import { Drawer } from '@/components/Drawer';
import { ServiceForm } from './service-form';

type PCMProps = {
    companyId: string;
    companyServices: ServiceType[];
};

export function PageClientManager({ companyId, companyServices }: PCMProps) {
    const [drawer, setDrawer] = useState<'service' | null>(null);
    const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className='p-2'>Nazwa</th>
                        <th className='p-2'>Opis</th>
                        <th className='p-2'>Czas</th>
                        <th className='p-2'>Cena</th>
                        <th className='p-2'>Czy aktywna?</th>
                        <th className='p-2'>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {companyServices.map((service) => (
                        <tr key={service.id}>
                            <td className='p-2'>{service.name}</td>
                            <td className='p-2'>{service?.description || ''}</td>
                            <td className='p-2'>{service.duration}</td>
                            <td className='p-2'>{service?.price || 'Brak'}</td>
                            <td className='p-2'>{service.is_active ? 'tak' : 'nie'}</td>
                            <td className='p-2'>
                                <button
                                    onClick={() => {
                                        setSelectedService(service);
                                        setDrawer('service');
                                    }}
                                    className='hover:cursor-pointer hover:text-gray-600'>
                                    Edytuj
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={() => {
                    setSelectedService(null);
                    setDrawer('service');
                }}
                className='hover:cursor-pointer hover:text-gray-600'>
                Dodaj usługę
            </button>
            <Drawer isOpen={drawer !== null} onClose={() => setDrawer(null)}>
                <ServiceForm
                    companyId={companyId}
                    service={selectedService}
                    onSuccess={() => {
                        setSelectedService(null);
                        setDrawer(null);
                    }}
                />
            </Drawer>
        </div>
    );
}
