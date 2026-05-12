import { GlobeIcon } from '@/components/icons/globe-icon';

export function TimeZone() {
    return (
        <div className='bg-gray-50 w-full h-20 flex items-center space-x-2 py-4 justify-center border-t border-t-gray-300'>
            {/* <div className='rounded-full w-8 h-8 bg-gray-500'></div> */}
            <GlobeIcon />
            <div className='flex flex-col text-gray-600'>
                <span className='text-xs'>Strefa czasowa</span>
                <span className='text-sm'>Europe/Warsaw</span>
            </div>
        </div>
    );
}
