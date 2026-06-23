'use client';

import { useState } from 'react';
import { CustomerType } from './schema';
import { Drawer } from '@/components/Drawer';
import { CustomerForm } from './customer-form';

type PCMProps = {
    companyId: string;
    companyCustomers: CustomerType[];
};

export function PageClientManager({ companyId, companyCustomers }: PCMProps) {
    const [drawer, setDrawer] = useState<'customer' | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(null);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className='p-2'>Imię i nazwisko</th>
                        <th className='p-2'>Telefon</th>
                        <th className='p-2'>Email</th>
                        <th className='p-2'>Płeć</th>
                        <th className='p-2'>Pierwsza wizyta</th>
                        <th className='p-2'>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {companyCustomers.map((customer) => (
                        <tr key={customer.id}>
                            <td className='p-2'>{customer.full_name}</td>
                            <td className='p-2'>{customer.phone}</td>
                            <td className='p-2'>{customer.email}</td>
                            <td className='p-2'>{customer.gender}</td>
                            <td className='p-2'>{customer.created_at?.slice(0, 10)}</td>
                            <td className='p-2'>
                                <button
                                    onClick={() => {
                                        setSelectedCustomer(customer);
                                        setDrawer('customer');
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
                    setSelectedCustomer(null);
                    setDrawer('customer');
                }}
                className='hover:cursor-pointer hover:text-gray-600'>
                Dodaj klienta
            </button>
            <Drawer isOpen={drawer !== null} onClose={() => setDrawer(null)}>
                <CustomerForm
                    companyId={companyId}
                    customer={selectedCustomer}
                    onSuccess={() => {
                        setSelectedCustomer(null);
                        setDrawer(null);
                    }}
                />
            </Drawer>
        </div>
    );
}
