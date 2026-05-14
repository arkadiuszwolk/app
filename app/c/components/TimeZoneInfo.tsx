import { GlobeIcon } from '@/components/icons/globe-icon';

export function TimeZoneInfo() {
    return (
        <div className='w-full h-20 flex items-center space-x-2 py-6 justify-center'>
            <GlobeIcon />
            <div className='flex flex-col text-gray-600'>
                <span className='text-xs'>Strefa czasowa</span>
                <span className='text-sm'>Europe/Warsaw</span>
            </div>
        </div>
    );
}
