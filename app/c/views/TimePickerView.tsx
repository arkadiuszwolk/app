import { MiniCalendar } from '../components/Minicalendar';

export function TimePickerView() {
    return (
        <div className='w-full'>
            <h2 className='font-semibold text-xl text-blue-600 mt-10 mb-10 text-center'>
                Wybierz godzinę
            </h2>
            {/*lista godzin*/}
            <ul className='w-full flex flex-col items-center space-y-4'>
                {['8:45', '9:00', '10:30', '10:45', '12:00', '12:30', '14:15'].map((h) => (
                    <li>
                        <button className='w-60 px-6 py-4 bg-blue-100 text-blue-500 rounded-xl'>
                            {h}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
