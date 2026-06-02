'use client';

import { useLayoutEffect, useRef, useState } from 'react';

type Tab = { label: string; action: () => void };
type NonEmptyArray<T> = [T, ...T[]];
type SlidingTabsProps = {
    tabs: NonEmptyArray<Tab>;
    defaultIndex?: number;
};

export function SlidingTabs({ tabs, defaultIndex = 0 }: SlidingTabsProps) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const [width, setWidth] = useState(0);
    const [left, setLeft] = useState(0);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const mounted = useRef(false);

    useLayoutEffect(() => {
        updateStyle(defaultIndex);
    }, []);

    useLayoutEffect(() => {
        mounted.current = true;
    }, [width, left]);

    function updateStyle(index: number) {
        const activeButton = buttonRefs.current[index];
        if (!activeButton) return;
        setWidth(activeButton.offsetWidth);
        setLeft(activeButton.offsetLeft);
    }

    function handleClick(index: number) {
        updateStyle(index);
        setActiveIndex(index);
        tabs[index].action();
    }

    return (
        <div className='relative w-fit flex border-4 border-gray-200 bg-gray-200 rounded-full space-x-1'>
            <div
                className={`absolute top-0 bottom-0 bg-white rounded-full transition-all duration-200 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ width, left }}
            />
            {tabs.map(({ label, action }, i) => (
                <button
                    key={i}
                    ref={(el: HTMLButtonElement) => {
                        buttonRefs.current[i] = el;
                    }}
                    onClick={() => handleClick(i)}
                    className='px-4 py-2 rounded-full text-sm z-10 hover:cursor-pointer focused:outline-2 outline-gray-100'>
                    {label}
                </button>
            ))}
        </div>
    );
}
