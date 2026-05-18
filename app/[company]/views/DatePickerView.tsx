import { useBookingStore } from '@/store/useBookingStore';
import { MiniCalendar } from '../components/Minicalendar';

export function DatePickerView({ nextStep }: { nextStep: () => void }) {
    const setDate = useBookingStore((state) => state.setDate);

    const handleDateSelect = (date: Date) => {
        const formatted = date.toLocaleDateString('pl-PL');
        setDate(formatted); // Zapisujemy datę
        nextStep(); // Idziemy do wyboru godziny
    };

    return (
        <div className='w-full'>
            <h2 className='font-semibold text-xl text-blue-600 mt-10 mb-10 text-center'>
                Wybierz datę
            </h2>
            <MiniCalendar nextStep={handleDateSelect} />
        </div>
    );
}
