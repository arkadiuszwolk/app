export function Steps({ one, two, three }: { one?: string; two?: string; three?: string }) {
    return (
        <div className='flex flex-col justify-start mb-10 border-l-3 border-gray-500 m-10'>
            <div className='h-6 flex space-x-2 items-center'>
                <div className='w-4 h-4 rounded-full border-3 border-gray-500 bg-white -ml-2.25 -mt-2' />
                <span className='text-sm text-gray-600'>Strzyżenie (30 min)</span>
            </div>
            <div className='h-6 flex space-x-2 items-center'>
                <div className='w-4 h-4 rounded-full border-3 border-gray-500 bg-white -ml-2.25' />
                <span className='text-sm text-gray-600'>{two}</span>
            </div>
            <div className='h-6 flex space-x-2 items-center'>
                <div className='w-4 h-4 rounded-full border-3 border-gray-500 bg-white -ml-2.25 -mb-2' />
                <span className='text-sm text-gray-600'>{three}</span>
            </div>
        </div>
    );
}
