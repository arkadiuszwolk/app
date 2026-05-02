'use client';

import { InputHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

export function Input({ label, placeholder, className, value: valueProp, ...props }: Props) {
    const [value, setValue] = useState(valueProp ?? '');
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className='relative'>
            <input
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isFocused ? placeholder : ''}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={cn(
                    'peer w-64 rounded-xl border border-gray-300 px-4 py-2.5 text-gray-700 text-sm outline-none transition-all',
                    'focus:border-black',
                    className,
                )}
                {...props}
            />

            <label>{label}</label>
        </div>
    );
}
