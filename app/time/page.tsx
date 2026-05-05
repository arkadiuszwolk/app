'use client';

import { GlobeIcon } from '@/components/icons/globe-icon';
import { MiniCalendar } from '@/components/MiniCalendar';
import { Steps } from '@/components/steps';
import Link from 'next/link';
import { useState } from 'react';

function HourBox({ hour }: { hour: string }) {
    return (
        <div className='w-40 h-12 flex justify-center items-center rounded-full bg-teal-50 text-sm text-teal-500 hover:cursor-pointer'>
            {hour}
        </div>
    );
}

export default function Page() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    function selectDate(date: Date) {
        setSelectedDate(date);
    }

    console.log(selectedDate);

    return (
        <div>
            <Steps two='13 maja 2026 r.' />
            <div className='flex flex-col justify-center items-center pt-10 px-6 md:px-30'>
                {/* <div className='w-90'>
                <h1 className='mb-4 text-center'>Arkadiusz Wołk</h1>
                <p className='text-center'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni voluptatibus
                    ipsum voluptatum necessitatibus perferendis delectus in quam deserunt fuga
                    facere.
                </p>
            </div> */}
                <h2 className='text-center mb-10 w-full font-semibold text-blue-500 text-xl'>
                    Wybierz godzinę
                </h2>
                <ul>
                    {['8:45', '9:00', '10:30', '10:45', '12:00', '12:30', '14:15'].map((hour) => (
                        <li key={hour}>
                            <Link href='/form'>
                                <button className='bg-blue-50 rounded-xl text-blue-500 w-50 h-12 mb-4'>
                                    {hour}
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className='flex items-center space-x-2 mt-6'>
                    {/* <div className='rounded-full w-8 h-8 bg-gray-500'></div> */}
                    <GlobeIcon />
                    <div className='flex flex-col text-gray-600'>
                        <span className='text-xs'>Strefa czasowa</span>
                        <span className='text-sm'>Europe/Warsaw</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
