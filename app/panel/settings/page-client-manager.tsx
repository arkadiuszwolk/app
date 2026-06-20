'use client';

import { useState } from 'react';
import { CompanyDayOffsType, CompanyHoursType } from './schema';
import { Drawer } from '@/components/Drawer';
import { CompanyHoursForm } from './company-hours-form';
import { CompanyDayOffsForm } from './company_day_offs_form';

type PCMProps = {
    companyId: string;
    companyHours: CompanyHoursType[];
    companyDayOffs: CompanyDayOffsType[];
};

type DrawerType = 'company_hours' | 'company_day_offs' | null;

export function PageClientManager({ companyId, companyHours, companyDayOffs }: PCMProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawer, setDrawer] = useState<DrawerType>(null);
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<number | null>(null);
    const [selectedDayOffDate, setSelectedDayOffDate] = useState<string | null>(null);

    function openCompanyHoursDrawer(dayOfWeek: number) {
        setSelectedDayOfWeek(dayOfWeek);
        setDrawer('company_hours');
    }

    function openCompanyDayOffsDrawer(dayOffDate: string) {
        setSelectedDayOffDate(dayOffDate);
        setDrawer('company_day_offs');
    }

    function openNewCompanyDayOffDrawer() {
        setSelectedDayOffDate(null);
        setDrawer('company_day_offs');
    }

    function closeDrawer() {
        setDrawer(null);
        setSelectedDayOfWeek(null);
        setSelectedDayOffDate(null);
    }

    return (
        <div>
            {/*Tabela company_hours*/}
            <table>
                <thead>
                    <tr>
                        <th className='p-2'>Dzień tygodnia</th>
                        <th className='p-2'>Od</th>
                        <th className='p-2'>Do</th>
                        <th className='p-2'>Czy otwarte</th>
                        <th className='p-2'>Liczba miejsc</th>
                        <th className='p-2'>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {companyHours.map((row) => (
                        <tr key={row.day_of_week}>
                            <td className='p-2'>{row.day_of_week}</td>
                            <td className='p-2'>{row.open_time?.slice(0, 5) || '--:--'}</td>
                            <td className='p-2'>{row.close_time?.slice(0, 5) || '--:--'}</td>
                            <td className='p-2'>{row.is_open ? 'tak' : 'nie'}</td>
                            <td className='p-2'>{row.capacity}</td>
                            <td className='p-2'>
                                <button
                                    onClick={() => openCompanyHoursDrawer(row.day_of_week)}
                                    className='hover:cursor-pointer hover:text-gray-600'>
                                    Edytuj
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/*Tabela company_day_offs*/}
            <table>
                <thead>
                    <tr>
                        <th className='p-2'>Data</th>
                        <th className='p-2'>Opis</th>
                        <th className='p-2'>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {companyDayOffs.map((row) => (
                        <tr key={row.date}>
                            <td className='p-2'>{row.date}</td>
                            <td className='p-2'>{row.description}</td>
                            <td className='p-2'>
                                <button
                                    onClick={() => openCompanyDayOffsDrawer(row.date)}
                                    className='hover:cursor-pointer hover:text-gray-600'>
                                    Edytuj
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={openNewCompanyDayOffDrawer}
                className='hover:cursor-pointer hover:text-gray-600'>
                Dodaj dzień nieczynny
            </button>
            <Drawer isOpen={drawer !== null} onClose={closeDrawer}>
                <h2>{companyId}</h2>
                {drawer === 'company_hours' && selectedDayOfWeek !== null && (
                    <CompanyHoursForm
                        companyId={companyId}
                        dayOfWeek={selectedDayOfWeek}
                        onSuccess={closeDrawer}
                    />
                )}
                {drawer === 'company_day_offs' && (
                    <CompanyDayOffsForm
                        companyId={companyId}
                        dayOffDate={selectedDayOffDate ?? ''}
                        onSuccess={closeDrawer}
                    />
                )}
            </Drawer>
        </div>
    );
}
