'use client';

import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    getDate,
    getDay,
    getMonth,
    getYear,
    startOfMonth,
} from 'date-fns';
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion';
import { useState } from 'react';

const MONTHS = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
];

const WEEK = ['pn', 'wt', 'śr', 'cz', 'pt', 'so', 'nd'];

const transition: Transition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3,
};

const variants: Variants = {
    initial: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    animate: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        transition: transition,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        transition: transition,
    }),
};

function createMonth(date: Date) {
    const firstDay = startOfMonth(date);
    const lastDay = endOfMonth(date);

    const days = eachDayOfInterval({
        start: firstDay,
        end: lastDay,
    });

    const offset = (getDay(firstDay) + 6) % 7;

    const month = [
        ...Array.from({ length: offset }).map(() => null),
        ...days,
        ...Array.from({ length: 42 - (offset + days.length) }).map(() => null),
    ];

    return month;
}

function Month({ date }: { date: Date }) {
    date = startOfMonth(date);
    const month = createMonth(date);

    return (
        <div className='w-full'>
            {/* Skróty dni tygodnia */}
            <div className='grid grid-cols-7 w-full'>
                {WEEK.map((d) => (
                    <div key={d} className='flex justify-center aspect-square'>
                        {d}
                    </div>
                ))}
            </div>
            {/* Siatka dni miesiąca */}
            <div className='grid grid-cols-7 w-full gap-x-1 gap-y-2'>
                {month.map((d, i) => {
                    if (d != null) {
                        return (
                            <motion.button
                                key={d.toISOString()}
                                className='flex justify-center items-center aspect-square text-gray-500'>
                                {getDate(d)}
                            </motion.button>
                        );
                    } else {
                        return (
                            <div
                                key={`empty-${i}`}
                                className='flex justify-center items-center aspect-square'
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
}

export function MiniCalendar() {
    const [currentMonthFirstDay, setCurrentMonthFirstDay] = useState(startOfMonth(new Date()));
    const [direction, setDirection] = useState(1);

    function prevMonth() {
        setDirection(-1);
        setCurrentMonthFirstDay((prev) => startOfMonth(addMonths(prev, -1)));
    }

    function nextMonth() {
        setDirection(1);
        setCurrentMonthFirstDay((prev) => startOfMonth(addMonths(prev, 1)));
    }

    return (
        <div className='w-full'>
            <header className='w-full flex justify-between items-center mb-8'>
                <button onClick={prevMonth}>{'<'}</button>
                <h3>
                    {MONTHS[getMonth(currentMonthFirstDay)]} {getYear(currentMonthFirstDay)}
                </h3>
                <button onClick={nextMonth}>{'>'}</button>
            </header>
            <AnimatePresence initial={false} mode='popLayout' custom={direction}>
                <motion.div
                    key={`${MONTHS[getMonth(currentMonthFirstDay)]}-${getYear(currentMonthFirstDay)}`}
                    custom={direction}
                    variants={variants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    drag='x'
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7} // Wyższe elastic = lepsze wrażenie "poddawania się" palcu
                    onDragEnd={(_, info) => {
                        const swipeThreshold = 50;
                        if (info.offset.x < -swipeThreshold) {
                            nextMonth();
                        } else if (info.offset.x > swipeThreshold) {
                            prevMonth();
                        }
                    }}
                    // touch-pan-y pozwala na scrollowanie strony góra/dół, gdy palec jest na kalendarzu
                    style={{ touchAction: 'pan-y' }}
                    className='w-full cursor-grab active:cursor-grabbing'>
                    <Month date={currentMonthFirstDay} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
