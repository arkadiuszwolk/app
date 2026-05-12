export function Breadcrumbs() {
    return (
        <div className='w-full h-36 border-b border-b-gray-300 bg-gray-50'>
            <div className='m-10 flex flex-col justify-start mb-10 border-l-3 border-gray-500'>
                <div className='h-6 flex space-x-2 items-center'>
                    <div className='w-4 h-4 rounded-full border-3 border-gray-500 bg-white -ml-2.25 -mt-2' />
                    <span className='text-sm text-gray-600'>Strzyżenie (30 min ・ 120 PLN)</span>
                </div>
                <div className='h-6 flex space-x-2 items-center'>
                    <div className='w-4 h-4 rounded-full border-3 border-gray-500 bg-white -ml-2.25' />
                    <span className='text-sm text-gray-600'>Poniedziałek, 13 maja</span>
                </div>
                <div className='h-6 flex space-x-2 items-center'>
                    <div className='w-4 h-4 rounded-full border-3 border-gray-500 bg-white -ml-2.25 -mb-2' />
                    <span className='text-sm text-gray-600'>Godzina 12:45</span>
                </div>
            </div>
        </div>
    );
}
