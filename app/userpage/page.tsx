'use client';

import { GlobeIcon } from '@/components/icons/globe-icon';
import { MiniCalendar } from '@/components/MiniCalendar';
import { Steps } from '@/components/steps';
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
            <Steps />
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
                    Wybierz datę
                </h2>
                <MiniCalendar selectDate={selectDate} />
                {/* <div className='space-y-4'>
                <HourBox hour='7:30' />
                <HourBox hour='8:00' />
                <HourBox hour='8:30' />
                <HourBox hour='9:00' />
                <HourBox hour='9:30' />
                <HourBox hour='10:00' />
                <HourBox hour='10:30' />
                <HourBox hour='11:00' />
                <HourBox hour='11:30' />
            </div> */}
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
