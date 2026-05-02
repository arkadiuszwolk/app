import { useState, FC } from 'react';
import { Buttonn } from './buttonn';

interface CheckboxProps {
    label: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    required?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked = false, onChange, required = false }) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    const handleChange = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange?.(newChecked);
    };

    return (
        <label className='inline-flex items-center cursor-pointer select-none space-x-2'>
            {/* Ukryty checkbox dla dostępności */}
            <input
                type='checkbox'
                className='sr-only peer'
                checked={isChecked}
                onChange={handleChange}
            />

            {/* Stylizowany „fake” checkbox */}
            <div
                className='w-5 h-5 border-2 border-gray-300 rounded-lg bg-white
                   flex items-center justify-center
                   peer-checked:bg-blue-600 peer-checked:border-blue-600
                   hover:border-blue-400
                   transition-colors duration-200 ease-in-out
                   focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-1'>
                {/* Checkmark SVG */}
                <svg
                    className={`w-3 h-3 text-white transition-transform duration-150 ease-in-out ${
                        isChecked ? 'scale-100' : 'scale-0'
                    }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={3}
                        d='M5 13l4 4L19 7'
                    />
                </svg>
            </div>

            {/* Label */}
            <span className='ml-2 text-sm'>
                {label}
                {required && <span className='text-red-600'>*</span>}
            </span>
        </label>
    );
};

export default Checkbox;
