import { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    ref?: React.Ref<HTMLTextAreaElement>;
}

export function TextArea({ label, error, className = '', ref, ...props }: TextAreaProps) {
    return (
        <div className='flex flex-col gap-1 w-full text-gray-950'>
            <label className='text-sm font-medium'>{label}</label>
            <textarea
                ref={ref}
                className={`border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all ${
                    error ? 'border-red-500 bg-red-50' : 'border-gray-300'
                } ${className}`}
                {...props}
            />
            {error && <span className='text-red-500 text-xs min-h-4'>{error}</span>}
        </div>
    );
}
