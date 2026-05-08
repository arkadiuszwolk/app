import { MiniCalendar } from '@/components/MiniCalendar';

export function DatePickerView() {
    return (
        <div className='flex flex-col'>
            <MiniCalendar selectDate={() => {}} />
        </div>
    );
}
