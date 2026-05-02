import { BellIcon } from '@/components/icons/bell-icon';
import { SettingsIcon } from '@/components/icons/settings-icon';
import Image from 'next/image';

export default function IconsPage() {
    return (
        <div>
            <div className='w-full py-6 flex justify-between items-center bg-stone-50 px-20'>
                <div className='flex items-center'>
                    <Image src='/images/logo.svg' width={130} height={35} alt='logo' />
                </div>
                <ul className='flex font-light text-sm space-x-4'>
                    <li>Rezerwacje</li>
                    <li>Ogłoszenia</li>
                    <li>Zgłaszanie</li>
                </ul>
                <div className='flex space-x-2 justify-end items-center'>
                    <BellIcon size={28} color='#fff' />
                    <SettingsIcon size={28} color='#fff' />
                    <div className='flex space-x-2'>
                        <div className='rounded-full w-8 aspect-square bg-stone-500 flex-none' />
                        <div className='flex flex-col'>
                            <span className='text-sm'>Jan Kowalski</span>
                            <span className='text-xs font-light'>Administrator</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex p-20 space-x-10'>
                <div className='flex-1'>
                    <div>
                        <span className='px-2 py-1 bg-orange-50 text-orange-500 rounded-md text-sm'>
                            5 marca 2026
                        </span>
                        <h1 className='font-bold text-2xl mt-4'>
                            Hello, Arek! <span className='text-3xl select-none'>👋</span>
                        </h1>
                        <p>Good morning</p>
                        <div className='space-x-2 mt-10 flex items-center'>
                            <span>Dzisiejsze spotkania</span>
                            <span className='px-2 py-1 bg-blue-50 text-blue-500 rounded-md text-xs'>
                                3/7
                            </span>
                            <span>43%</span>
                            <div className='flex-1 h-2 rounded-full bg-stone-200 overflow-hidden'>
                                <div className='w-[43%] h-full bg-linear-90 from-blue-500 to-cyan-500 rounded-full' />
                            </div>
                        </div>
                        <div className='space-x-2 mt-4 flex items-center'>
                            <span>Dzisiejsze spotkania</span>
                            <span className='px-2 py-1 bg-blue-50 text-blue-500 rounded-md text-xs'>
                                3/7
                            </span>
                            <span>43%</span>
                            <div className='flex-1 h-2 rounded-full bg-stone-200 overflow-hidden'>
                                <div className='w-[34%] h-full bg-linear-90 from-blue-500 to-cyan-500 rounded-full' />
                            </div>
                        </div>
                        <div className='p-20 flex flex-col space-y-2 items-start'>
                            <input
                                type='text'
                                placeholder='Imię'
                                className='px-6 py-2 rounded-md border border-gray-400'
                            />
                            <input
                                type='text'
                                placeholder='Nazwisko'
                                className='px-6 py-2 rounded-md border border-gray-400'
                            />
                            <input
                                type='number'
                                placeholder='Telefon'
                                className='px-6 py-2 rounded-md border border-gray-400'
                            />
                            <textarea
                                placeholder='Masz jakieś uwagi?'
                                className='px-6 py-2 rounded-md border border-gray-400'
                            />
                            <div className='flex items-center space-x-2'>
                                <input id='regulamin' type='checkbox' />
                                <label htmlFor='regulamin'>Akceptuję regulamin</label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <input id='regulamin' type='checkbox' />
                                <label htmlFor='regulamin'>Chcę otrzymać przypomnienie SMS</label>
                            </div>
                            <button
                                type='submit'
                                className='px-6 py-2 rounded-md border bg-gray-400'>
                                Umów wizytę
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-100'>
                    <div className='w-full h-80 bg-stone-100 rounded-xl'></div>
                </div>
            </div>
        </div>
    );
}
