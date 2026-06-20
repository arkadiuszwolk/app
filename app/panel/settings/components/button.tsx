// app/panel/settings/components/edit-button.tsx
'use client';

import { getCompanyHourForDay } from '../actions'; // Twoja akcja serwerowa

interface EditButtonProps {
    companyId: string;
    dayOfWeek: number;
}

export function EditButton({ companyId, dayOfWeek }: EditButtonProps) {
    return (
        <button
            onClick={async () => {
                // Logika wykonuje się na kliencie, ale bezpiecznie strzela do bazy przez Server Action
                const dayInfo = await getCompanyHourForDay(companyId, dayOfWeek);
                console.log(companyId);
                console.log(dayOfWeek);
                console.log('Dane pobrane w buttonie:', dayInfo);

                // TODO: Tutaj w kolejnym kroku wepniemy otwieranie drawera i reset(dayInfo)
            }}
            className='p-2 rounded-md bg-gray-300 hover:bg-gray-400 transition-colors text-xs font-medium'>
            Edytuj
        </button>
    );
}
