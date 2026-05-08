import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlobeIcon } from '@/components/icons/globe-icon';
import { PlaceIcon } from '@/components/icons/place-icon';

export function HomeView() {
    return (
        <div className='flex flex-col items-center py-20 space-y-4'>
            <div className='w-30 aspect-square rounded-full bg-gray-300' />
            <span className='font-bold text-md'>Studio Minimal</span>
            <p className='text-sm text-center'>
                Naturalna stylizacja Twoich włosów. <br />
                Chwila relaksu w sercu Warszawy.
            </p>
            <span className='px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs flex items-center'>
                <span className='mr-2'>
                    <PlaceIcon color='#666666' size={16} />
                </span>
                ul. Mokotowska 12, Warszawa
            </span>
            <h2 className='mt-4 mb-8 text-blue-500 font-bold'>Zarezerwuj swój czas</h2>
            <div className='space-y-4 w-full flex flex-col items-center'>
                {[1, 2, 3].map((i) => (
                    <Link
                        href='/userpage'
                        key={i}
                        className='flex space-x-4 items-center  bg-gray-50 rounded-3xl p-2 w-[80%]'>
                        <div className='w-20 aspect-square rounded-2xl bg-gray-300' />
                        <div className='flex flex-col'>
                            <h4>Strzyżenie & stylizacja</h4>
                            <span className='text-xs'>30 min · 120 PLN </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
