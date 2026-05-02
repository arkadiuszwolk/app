import { BellIcon } from '@/components/icons/bell-icon';
import { SettingsIcon } from '@/components/icons/settings-icon';
import { MyPieChart } from '@/components/pie-chart';
import { WeekTracker } from '@/components/week-tracker';

export default function IconsPage() {
    const data = [
        { id: 1, icon: '🥪', name: 'Zjeść śniadanie', age: 25, city: 'Warszawa' },
        { id: 2, icon: '🚲', name: 'Pojeździć na rowerze', age: 30, city: 'Kraków' },
        { id: 3, icon: '📙', name: 'Przeczytać 10 stron książki', age: 28, city: 'Gdańsk' },
        { id: 4, icon: '➗', name: 'Zrobić 15 zadań z matematyki', age: 28, city: 'Gdańsk' },
        { id: 5, icon: '🏋️‍♂️', name: 'Trening', age: 28, city: 'Gdańsk' },
        { id: 6, icon: '🎷', name: 'Nauka gry na instrumencie', age: 28, city: 'Gdańsk' },
    ];

    const days = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];

    return (
        <div>
            <div className='w-full h-14 flex justify-between items-center bg-stone-900 px-20'>
                <div className='flex items-center'>
                    <span className='text-white text-xl font-medium mr-10'>Sloty</span>
                    <ul className='flex text-white font-light text-sm space-x-4'>
                        <li>Dzisiaj</li>
                        <li>Rutyna</li>
                        <li>Projekty</li>
                    </ul>
                </div>
                <div className='flex space-x-2 justify-end items-center'>
                    <BellIcon size={28} color='#fff' />
                    <SettingsIcon size={28} color='#fff' />
                    <div className='flex space-x-2'>
                        <div className='rounded-full w-6 aspect-square bg-stone-500 flex-none' />
                        <div className='flex flex-col'>
                            <span className='text-stone-50 text-sm'>Jan Kowalski</span>
                            <span className='text-stone-400 text-xs font-light'>Administrator</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full py-4 px-20 bg-stone-800 text-white'>
                <h1 className='text-xl font-semibold'>Małe codzienne działania,</h1>
                <p className='mb-4'> które budują Twoją konsekwencję. 💪</p>
            </div>
            <div className='p-20 w-full flex justify-between'>
                {/* <div>
                    <button className='mb-10 rounded-full text-sm bg-orange-400 text-white px-10 py-2 font-normal'>
                        Nowe zadanie
                    </button>
                    <table>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.id}>
                                    <td className='h-12 text-2xl'>{row.icon}</td>
                                    <td className='h-12'>{row.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex-1 flex flex-col items-center'>
                    <div className='flex space-x-2 mb-2'>
                        {days.map((d, i) => (
                            <div
                                key={i}
                                className={`w-12 h-14 bg-gray-100 rounded-xl flex flex-col justify-center items-center border-4 ${d === 'Nd' ? 'border-gray-300' : 'border-gray-100'}`}>
                                <span className='text-3xl -mt-8'>🔥</span>
                                <span>{d}</span>
                            </div>
                        ))}
                    </div>
                    <div className='flex space-x-2 mb-2'>
                        {Array.from({ length: 7 })
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className='w-12 aspect-square flex justify-center items-center'>
                                    <div className='rounded-md border-2 border-gray-300 w-6 aspect-square'></div>
                                </div>
                            ))}
                    </div>
                    <div className='flex space-x-2 mb-2'>
                        {Array.from({ length: 7 })
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className='w-12 aspect-square flex justify-center items-center'>
                                    <div className='rounded-md border-2 border-gray-300 w-6 aspect-square'></div>
                                </div>
                            ))}
                    </div>
                    <div className='flex space-x-2 mb-2'>
                        {Array.from({ length: 7 })
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className='w-12 aspect-square flex justify-center items-center'>
                                    <div className='rounded-md border-2 border-gray-300 w-6 aspect-square'></div>
                                </div>
                            ))}
                    </div>
                    <div className='flex space-x-2 mb-2'>
                        {Array.from({ length: 7 })
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className='w-12 aspect-square flex justify-center items-center'>
                                    <div className='rounded-md border-2 border-gray-300 w-6 aspect-square'></div>
                                </div>
                            ))}
                    </div>
                    <div className='flex space-x-2 mb-2'>
                        {Array.from({ length: 7 })
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className='w-12 aspect-square flex justify-center items-center'>
                                    <div className='rounded-md border-2 border-gray-300 w-6 aspect-square'></div>
                                </div>
                            ))}
                    </div>
                    <div className='flex justify-center'>
                 
                    </div>
                </div> */}
                <WeekTracker />
            </div>
        </div>
    );
}
