import React, { MouseEvent } from 'react';
import { useState } from 'react';

type Props = {
    children: React.ReactNode;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function Button({ children, onClick }: Props) {
    const [ripples, setRipples] = useState<{ x: number; y: number; size: number; id: number }[]>(
        [],
    );

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, size, id }]);

        if (onClick) onClick(event);

        setTimeout(() => {
            console.log('haha');
            setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
    };
    return (
        <button
            onClick={handleClick}
            className='cursor-pointer w-48 h-12 relative overflow-hidden rounded-full bg-black text-white'>
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    style={{
                        top: ripple.y,
                        left: ripple.x,
                        width: ripple.size,
                        height: ripple.size,
                    }}
                    className='absolute bg-white rounded-full transform animate-ripple pointer-events-none'
                />
            ))}
            <span className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                {children}
            </span>
        </button>
    );
}
