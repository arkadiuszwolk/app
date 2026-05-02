const days = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];

const data = [
    { id: 1, icon: '🥪', name: 'Zjeść śniadanie', age: 25, city: 'Warszawa' },
    { id: 2, icon: '🚲', name: 'Pojeździć na rowerze', age: 30, city: 'Kraków' },
    { id: 3, icon: '📙', name: 'Przeczytać 10 stron książki', age: 28, city: 'Gdańsk' },
    { id: 4, icon: '➗', name: 'Zrobić 15 zadań z matematyki', age: 28, city: 'Gdańsk' },
    { id: 5, icon: '🏋️‍♂️', name: 'Trening', age: 28, city: 'Gdańsk' },
    { id: 6, icon: '🎷', name: 'Nauka gry na instrumencie', age: 28, city: 'Gdańsk' },
];

export function WeekTracker() {
    return (
        <div className='grid grid-cols-[300px_repeat(7,56px)_120px]'>
            <div></div>
            {days.map((d, i) => (
                <div
                    key={i}
                    className={`w-12 h-14 bg-gray-100 rounded-xl flex flex-col justify-center items-center border-4 ${d === 'Nd' ? 'border-gray-300' : 'border-gray-100'}`}>
                    <span className='text-3xl -mt-8'>🔥</span>
                    <span>{d}</span>
                </div>
            ))}
            <div></div>
            {data.map((row, i) => (
                <Row icon={row.icon} name={row.name} />
            ))}
        </div>
    );
}

function Row({ icon, name }: { icon: string; name: string }) {
    return (
        <>
            <div className='py-2 space-x-2'>
                <span className='text-2xl'>{icon}</span>
                <span>{name}</span>
            </div>
            {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className='flex justify-center items-center py-2'>
                    <input type='checkbox' name='0' id='0' className='w-5 aspect-square' />
                </div>
            ))}
            <div className='py-2'>
                <progress className='w-20 h-4 rounded-md bg-gray-200'></progress>
            </div>
        </>
    );
}
