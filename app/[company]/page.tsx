'use client';

import { AnimatePresence, motion, Transition, Variants } from 'framer-motion';
import { useState } from 'react';
import { DatePickerView } from './views/DatePickerView';
import TimePickerView from './views/TimePickerView';
import { FormView } from './views/FormView';
import { HomeView } from './views/HomeView';

export default function CompanyPage() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);

    const nextStep = () => {
        setDirection(1);
        setStep(step + 1);
    };

    const prevStep = () => {
        setDirection(-1);
        setStep(step - 1);
    };

    const transition: Transition = {
        type: 'tween' as const,
        ease: 'easeInOut',
        duration: 0.3,
    };

    const variants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
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

    const views = {
        datePicker: <DatePickerView />,
        timePicker: <TimePickerView />,
        form: <FormView />,
        home: <HomeView />,
    };

    return (
        <div className='w-screen h-screen relative overflow-hidden'>
            <AnimatePresence initial={false} mode='popLayout' custom={direction}>
                <motion.div
                    key={step} // Zmiana klucza wyzwala animację
                    custom={direction} // Przekazuje informację o kierunku do wariantów
                    variants={variants} // Definiuje klatki kluczowe
                    initial='enter'
                    animate='center'
                    exit='exit'
                    className='w-full h-full flex flex-col justify-center items-center p-8'>
                    <p>Strona {step}</p>
                    {step === 1 && views.home}
                    {step === 2 && views.datePicker}
                    {step === 3 && views.timePicker}
                    {step === 4 && views.form}
                    <div className='flex space-x-4'>
                        <button
                            onClick={() => {
                                setDirection(-1);
                                setStep((prev) => prev - 1);
                            }}
                            className='w-24 px-4 py-2 rounded-xl bg-amber-900 text-white'>
                            LEWO
                        </button>
                        <button
                            onClick={() => {
                                setDirection(1);
                                setStep((prev) => prev + 1);
                            }}
                            className='w-24 px-4 py-2 rounded-xl bg-amber-900 text-white'>
                            PRAWO
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
