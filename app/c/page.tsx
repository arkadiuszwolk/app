'use client';

import { AnimatePresence, motion, Transition, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { DatePickerView } from './views/DatePickerView';
import { TimePickerView } from './views/TimePickerView';
import { TimeZoneInfo } from './components/TimeZoneInfo';
import { ProgressSummary } from './components/ProgressSummary';
import { FormView } from './views/FormView';
import { SuccessView } from './views/SuccessView';

export default function Page() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);

    const getInitialStep = () => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            return Number(params.get('step')) || 1;
        }
        return 1;
    };

    useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            const stepFromUrl = Number(params.get('step')) || 1;

            if (stepFromUrl !== step) {
                setDirection(stepFromUrl > step ? 1 : -1);
                setStep(stepFromUrl);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [step]);

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

    function nextStep() {
        setDirection(1);
        const next = step + 1;
        setStep(next);
        window.history.pushState({ step: next }, '', `?step=${next}`);
    }

    return (
        <div className='w-full h-dvh overflow-hidden bg-white flex flex-col md:w-80 md:mx-auto'>
            <ProgressSummary />
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
                        <div className='w-full h-full flex flex-col justify-baseline items-center'>
                            {step == 1 && <DatePickerView nextStep={nextStep} />}
                            {step == 2 && <TimePickerView nextStep={nextStep} />}
                            {step == 3 && <FormView nextStep={nextStep} />}
                            {step == 4 && <SuccessView />}
                            {/* <div className='flex space-x-4'>
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
                            </div> */}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
            <TimeZoneInfo />
        </div>
    );
}
