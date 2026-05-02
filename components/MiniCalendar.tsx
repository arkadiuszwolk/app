'use client';

import { animate, PanInfo, useMotionValue } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    getDate,
    getMonth,
    addMonths,
    getYear,
    isSameDay,
} from 'date-fns';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

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

function isDateInArray(date: Date, dates: Date[]): boolean {
    return dates.some((d) => isSameDay(d, date));
}

function Month({ date, selectDate }: { date: Date; selectDate: (date: Date) => void }) {
    const router = useRouter();
    date = startOfMonth(date);
    const month = createMonth(date);

    // const selectableDates = [
    //     new Date(2026, 1, 10),
    //     new Date(2026, 1, 15),
    //     new Date(2026, 1, 20),
    //     new Date(2026, 1, 19),
    //     new Date(2026, 2, 5),
    //     new Date(2026, 2, 6),
    //     new Date(2026, 2, 13),
    //     new Date(2026, 0, 3),
    //     new Date(2026, 0, 2),
    //     new Date(2026, 0, 1),
    // ];

    const selectableDates = [
        // January (10)
        new Date(2026, 0, 2),
        new Date(2026, 0, 5),
        new Date(2026, 0, 7),
        new Date(2026, 0, 9),
        new Date(2026, 0, 12),
        new Date(2026, 0, 15),
        new Date(2026, 0, 18),
        new Date(2026, 0, 21),
        new Date(2026, 0, 25),
        new Date(2026, 0, 30),

        // February (8)
        new Date(2026, 1, 1),
        new Date(2026, 1, 4),
        new Date(2026, 1, 6),
        new Date(2026, 1, 10),
        new Date(2026, 1, 14),
        new Date(2026, 1, 18),
        new Date(2026, 1, 22),
        new Date(2026, 1, 26),

        // March (12)
        new Date(2026, 2, 3),
        new Date(2026, 2, 5),
        new Date(2026, 2, 8),
        new Date(2026, 2, 11),
        new Date(2026, 2, 14),
        new Date(2026, 2, 17),
        new Date(2026, 2, 19),
        new Date(2026, 2, 22),
        new Date(2026, 2, 24),
        new Date(2026, 2, 27),
        new Date(2026, 2, 29),
        new Date(2026, 2, 31),

        // April (7)
        new Date(2026, 3, 2),
        new Date(2026, 3, 6),
        new Date(2026, 3, 9),
        new Date(2026, 3, 13),
        new Date(2026, 3, 18),
        new Date(2026, 3, 22),
        new Date(2026, 3, 27),

        // May (15)
        new Date(2026, 4, 1),
        new Date(2026, 4, 3),
        new Date(2026, 4, 5),
        new Date(2026, 4, 7),
        new Date(2026, 4, 9),
        new Date(2026, 4, 11),
        new Date(2026, 4, 13),
        new Date(2026, 4, 15),
        new Date(2026, 4, 18),
        new Date(2026, 4, 20),
        new Date(2026, 4, 22),
        new Date(2026, 4, 24),
        new Date(2026, 4, 26),
        new Date(2026, 4, 28),
        new Date(2026, 4, 30),

        // June (9)
        new Date(2026, 5, 2),
        new Date(2026, 5, 6),
        new Date(2026, 5, 8),
        new Date(2026, 5, 12),
        new Date(2026, 5, 15),
        new Date(2026, 5, 18),
        new Date(2026, 5, 21),
        new Date(2026, 5, 25),
        new Date(2026, 5, 29),

        // July (14)
        new Date(2026, 6, 1),
        new Date(2026, 6, 4),
        new Date(2026, 6, 6),
        new Date(2026, 6, 9),
        new Date(2026, 6, 11),
        new Date(2026, 6, 14),
        new Date(2026, 6, 16),
        new Date(2026, 6, 18),
        new Date(2026, 6, 20),
        new Date(2026, 6, 23),
        new Date(2026, 6, 25),
        new Date(2026, 6, 27),
        new Date(2026, 6, 29),
        new Date(2026, 6, 31),

        // August (11)
        new Date(2026, 7, 2),
        new Date(2026, 7, 5),
        new Date(2026, 7, 8),
        new Date(2026, 7, 10),
        new Date(2026, 7, 13),
        new Date(2026, 7, 16),
        new Date(2026, 7, 19),
        new Date(2026, 7, 22),
        new Date(2026, 7, 24),
        new Date(2026, 7, 27),
        new Date(2026, 7, 30),

        // September (8)
        new Date(2026, 8, 3),
        new Date(2026, 8, 7),
        new Date(2026, 8, 11),
        new Date(2026, 8, 15),
        new Date(2026, 8, 18),
        new Date(2026, 8, 21),
        new Date(2026, 8, 24),
        new Date(2026, 8, 28),

        // October (13)
        new Date(2026, 9, 1),
        new Date(2026, 9, 4),
        new Date(2026, 9, 6),
        new Date(2026, 9, 9),
        new Date(2026, 9, 12),
        new Date(2026, 9, 15),
        new Date(2026, 9, 17),
        new Date(2026, 9, 19),
        new Date(2026, 9, 22),
        new Date(2026, 9, 24),
        new Date(2026, 9, 26),
        new Date(2026, 9, 29),
        new Date(2026, 9, 31),

        // November (7)
        new Date(2026, 10, 2),
        new Date(2026, 10, 6),
        new Date(2026, 10, 9),
        new Date(2026, 10, 13),
        new Date(2026, 10, 18),
        new Date(2026, 10, 22),
        new Date(2026, 10, 27),

        // December (16)
        new Date(2026, 11, 1),
        new Date(2026, 11, 3),
        new Date(2026, 11, 5),
        new Date(2026, 11, 7),
        new Date(2026, 11, 9),
        new Date(2026, 11, 11),
        new Date(2026, 11, 13),
        new Date(2026, 11, 15),
        new Date(2026, 11, 17),
        new Date(2026, 11, 19),
        new Date(2026, 11, 21),
        new Date(2026, 11, 23),
        new Date(2026, 11, 25),
        new Date(2026, 11, 27),
        new Date(2026, 11, 29),
        new Date(2026, 11, 31),
    ];

    return (
        <div className='w-full'>
            <div className='grid grid-cols-7 w-full'>
                {['pn', 'wt', 'śr', 'cz', 'pt', 'so', 'nd'].map((d) => (
                    <div key={d} className='flex justify-center aspect-square'>
                        {d}
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-7 w-full gap-x-1 gap-y-2'>
                {month.map((d, i) => {
                    if (d != null && isDateInArray(d, selectableDates)) {
                        return (
                            <button
                                onClick={() => {
                                    selectDate(d);
                                    router.push('/time');
                                }}
                                key={d ? d.toISOString() : `empty-${i}`}
                                className='aspect-square flex justify-center items-center bg-blue-50 text-blue-500 hover:cursor-pointer hover:bg-blue-200 rounded-full'>
                                {d && getDate(d)}
                            </button>
                        );
                    } else {
                        return (
                            <div
                                key={d ? d.toISOString() : `empty-${i}`}
                                className='aspect-square flex justify-center items-center text-gray-500'>
                                {d && getDate(d)}
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}

export function MiniCalendar({ selectDate }: { selectDate: (date: Date) => void }) {
    const [currentMonthFirstDay, setCurrentMonthFirstDay] = useState(startOfMonth(new Date()));
    const [direction, setDirection] = useState<0 | 1 | -1>(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // const controls = useAnimation();
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
        }
    }, []);

    const x = useMotionValue(0);

    useEffect(() => {
        if (width) {
            x.set(-width);
        }
    }, [width]);

    useEffect(() => {
        function handleResize() {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const prevMonthFirstDay = startOfMonth(addMonths(currentMonthFirstDay, -1));
    const nextMonthFirstDay = startOfMonth(addMonths(currentMonthFirstDay, 1));

    // async function prevMonth() {
    //     if (isAnimating) return;
    //     setIsAnimating(true);
    //     setDirection(-1);
    //     await controls.start({ x: '0%' }); // jedziemy w prawo
    //     setCurrentMonthFirstDay(startOfMonth(addMonths(currentMonthFirstDay, -1)));
    //     controls.set({ x: '-100%' }); // reset do środka
    //     setIsAnimating(false);
    // }

    // async function nextMonth() {
    //     if (isAnimating) return;
    //     setIsAnimating(true);
    //     setDirection(1);
    //     await controls.start({ x: '-200%' }); // jedziemy w lewo
    //     setCurrentMonthFirstDay(startOfMonth(addMonths(currentMonthFirstDay, 1)));
    //     controls.set({ x: '-100%' }); // reset do środka
    //     setIsAnimating(false);
    // }

    function prevMonth() {
        if (isAnimating || !width) return;

        setIsAnimating(true);

        animate(x, 0, {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        }).then(() => {
            setCurrentMonthFirstDay((prev) => startOfMonth(addMonths(prev, -1)));
            x.set(-width);
            setIsAnimating(false);
        });
    }

    function nextMonth() {
        if (isAnimating || !width) return;

        setIsAnimating(true);

        animate(x, -2 * width, {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        }).then(() => {
            setCurrentMonthFirstDay((prev) => startOfMonth(addMonths(prev, 1)));
            x.set(-width);
            setIsAnimating(false);
        });
    }

    function handleDragEnd(info: PanInfo) {
        if (isAnimating) return;

        const offset = info.offset.x;
        const velocity = info.velocity.x;

        const threshold = width * 0.2;
        const velocityThreshold = 500;

        setIsAnimating(true);

        if (offset > threshold || velocity > velocityThreshold) {
            animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 }).then(() => {
                setCurrentMonthFirstDay((prev) => startOfMonth(addMonths(prev, -1)));
                x.set(-width);
                setIsAnimating(false);
            });
            return;
        }

        if (offset < -threshold || velocity < -velocityThreshold) {
            animate(x, -2 * width, { type: 'spring', stiffness: 300, damping: 30 }).then(() => {
                setCurrentMonthFirstDay((prev) => startOfMonth(addMonths(prev, 1)));
                x.set(-width);
                setIsAnimating(false);
            });
            return;
        }

        animate(x, -width, { type: 'spring', stiffness: 300, damping: 30 }).then(() => {
            setIsAnimating(false);
        });
    }

    return (
        <div className='w-full sm:w-100 select-none'>
            <div className='w-full flex justify-between items-center mb-8 px-4'>
                <button
                    onClick={prevMonth}
                    // onClick={() => {}}
                    className='px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 hover:cursor-pointer'>
                    {'<'}
                </button>
                <h2 className='w-full text-center'>
                    {MONTHS[getMonth(currentMonthFirstDay)]} {getYear(currentMonthFirstDay)}
                </h2>
                <button
                    onClick={nextMonth}
                    // onCanPlay={() => {}}
                    className='px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 hover:cursor-pointer'>
                    {'>'}
                </button>
            </div>
            {/* WRAPPER DO ANIMOWANIA */}
            <div ref={containerRef} className='w-full flex overflow-hidden'>
                <motion.div
                    className='flex w-[300%]'
                    style={{ x }}
                    drag='x'
                    // dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    dragMomentum={false}
                    onDragStart={() => {
                        if (isAnimating) return false;
                    }}
                    onDragEnd={(e, info) => handleDragEnd(info)}>
                    <div className='w-full shrink-0'>
                        <Month date={prevMonthFirstDay} selectDate={selectDate} />
                    </div>

                    <div className='w-full shrink-0'>
                        <Month date={currentMonthFirstDay} selectDate={selectDate} />
                    </div>

                    <div className='w-full shrink-0'>
                        <Month date={nextMonthFirstDay} selectDate={selectDate} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
