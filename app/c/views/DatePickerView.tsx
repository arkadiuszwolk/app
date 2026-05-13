import { MiniCalendar } from '../components/Minicalendar';

export function DatePickerView() {
    return (
        <div className='w-full'>
            <h2 className='font-semibold text-xl text-blue-600 mt-10 mb-10 text-center'>
                Wybierz datę
            </h2>
            <MiniCalendar />
        </div>
    );
}
