import { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    ref?: React.Ref<HTMLInputElement>;
}

export function TextInput({ label, error, className = '', ref, ...props }: TextInputProps) {
    return (
        <div className='flex flex-col gap-1 w-full text-gray-950'>
            <label className='text-sm font-medium'>
                {label} {props.required && <span className='text-red-500'>*</span>}
            </label>

            <input
                ref={ref}
                type='text'
                className={`border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    error ? 'border-red-500 bg-red-50' : 'border-gray-300'
                } ${className}`}
                {...props}
            />

            {error && <span className='text-red-500 text-xs min-h-4'>{error}</span>}
        </div>
    );
}
