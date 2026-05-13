import { MiniCalendar } from '../components/Minicalendar';

export function TimePickerView({ nextStep }: { nextStep: () => void }) {
    return (
        <div className='w-full h-full flex flex-col'>
            <h2 className='font-semibold text-xl text-blue-600 mt-10 mb-10 text-center'>
                Wybierz godzinę
            </h2>
            {/*lista godzin*/}
            <ul className='w-full flex-1  space-y-4 overflow-y-scroll'>
                {['8:45', '9:00', '10:30', '10:45', '12:00', '12:30', '14:15', '15:00'].map((h) => (
                    <li className='w-full flex justify-center'>
                        <button
                            onClick={nextStep}
                            className='w-60 px-6 py-4 bg-blue-100 text-blue-500 rounded-xl'>
                            {h}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
