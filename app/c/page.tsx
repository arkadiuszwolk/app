'use client';

import { AnimatePresence, motion, Transition, Variants } from 'framer-motion';
import { useState } from 'react';
import { MiniCalendar } from './views/DatePickerView';

export default function Page() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);

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

    return (
        <div className='w-full h-dvh overflow-hidden bg-gray-50 flex flex-col'>
            <div className='w-full h-16 flex justify-center items-center border-b'>Breadcrumbs</div>
            <main className='relative overflow-hidden flex-1'>
                <AnimatePresence initial={false} mode='popLayout' custom={direction}>
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        className='w-full h-full overflow-hidden absolute inset-0 p-4'>
                        <div className='flex flex-col justify-center items-center'>
                            <h2 className='mb-12 mt-8'>Strona {step}</h2>
                            <MiniCalendar />
                            <div className='flex space-x-4'>
                                <button
                                    onClick={() => {
                                        setDirection(-1);
                                        setStep((prev) => prev - 1);
                                    }}
                                    className='px-4 py-2 rounded-full bg-gray-300 hover:cursor-pointer'>
                                    {'<'}
                                </button>
                                <button
                                    onClick={() => {
                                        setDirection(1);
                                        setStep((prev) => prev + 1);
                                    }}
                                    className='px-4 py-2 rounded-full bg-gray-300 hover:cursor-pointer'>
                                    {'>'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
            <div className='w-full h-16 flex justify-center items-center border-t'>TimeZone</div>
        </div>
    );
}
