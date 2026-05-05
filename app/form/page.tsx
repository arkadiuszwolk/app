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
            <Steps two='13 maja 2026 r.' three='13:45' />
            <div className='flex flex-col justify-center items-center pt-2 px-6 md:px-30'>
                {/* <div className='w-90'>
                <h1 className='mb-4 text-center'>Arkadiusz Wołk</h1>
                <p className='text-center'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni voluptatibus
                    ipsum voluptatum necessitatibus perferendis delectus in quam deserunt fuga
                    facere.
                </p>
            </div> */}
                <h2 className='text-center mb-10 w-full font-semibold text-blue-500 text-xl'>
                    Wypełnij formularz
                </h2>
                <form className='space-y-4 flex flex-col items-center'>
                    <input
                        type='text'
                        placeholder='Imię'
                        className='w-80 px-4 py-2 bg-gray-100 rounded-xl'
                    />
                    <input
                        type='text'
                        placeholder='Nazwisko'
                        className='w-80 px-4 py-2 bg-gray-100 rounded-xl'
                    />
                    <div className='w-80 bg-gray-100 rounded-xl flex items-stretch'>
                        <span className='bg-gray-200 px-4 rounded-l-xl flex justify-center items-center'>
                            +48
                        </span>
                        <input
                            type='text'
                            placeholder='000 000 000'
                            className='w-full py-2 px-4 rounded-xl'
                        />
                    </div>
                    <textarea
                        placeholder='Twoje uwagi do wizyty'
                        className='w-80 min-h-30 rounded-xl bg-gray-100 p-4'
                    />
                    <div className='space-x-2 mt-8'>
                        <input
                            type='checkbox'
                            name='regulamin'
                            id='regulamin'
                            className='scale-110'
                        />
                        <label htmlFor='regulamin' className=' text-gray-500'>
                            Akceptuję regulamin
                        </label>
                    </div>
                    <button className='rounded-2xl bg-blue-400 text-white px-4 py-3'>
                        Potwierdzam rezerwację
                    </button>
                </form>
                <div className='flex items-center space-x-2 mt-15'>
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
