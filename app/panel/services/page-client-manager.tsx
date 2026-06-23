'use client';

import { useState } from 'react';
import { ServiceType } from './schema';
import { Drawer } from '@/components/Drawer';
import { ServiceForm } from './service-form';
import { AddServiceForm } from './add-service-form';
import { deleteServiceAction } from './actions';
import Image from 'next/image';

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
                        <th></th>
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
                            <td>
                                {service.image_url && (
                                    <Image
                                        src={service.image_url}
                                        alt={service.name || 'Zdjęcie usługi'}
                                        width={80}
                                        height={80}
                                        className='rounded-md object-cover' // Opcjonalnie: ładne zaokrąglenie i dopasowanie proporcji
                                    />
                                )}
                            </td>
                            <td className='p-2'>{service.name}</td>
                            <td className='p-2'>{service?.description || ''}</td>
                            <td className='p-2'>{service.duration}</td>
                            <td className='p-2'>{service?.price || 'Brak'}</td>
                            <td className='p-2'>{service.is_active ? 'tak' : 'nie'}</td>
                            <td className='p-2'>
                                <div className='flex space-x-4'>
                                    <button
                                        onClick={() => {
                                            setSelectedService(service);
                                            setDrawer('service');
                                        }}
                                        className='hover:cursor-pointer hover:text-gray-600'>
                                        Edytuj
                                    </button>
                                    <button
                                        onClick={() => deleteServiceAction(service.id, companyId)}
                                        className='hover:cursor-pointer hover:text-gray-600'>
                                        Usuń
                                    </button>
                                </div>
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
                {/* <ServiceForm
                    companyId={companyId}
                    service={selectedService}
                    onSuccess={() => {
                        setSelectedService(null);
                        setDrawer(null);
                    }}
                /> */}
                <AddServiceForm
                    companyId={companyId}
                    service={selectedService}
                    onSuccess={() => setDrawer(null)}
                />
            </Drawer>
        </div>
    );
}
