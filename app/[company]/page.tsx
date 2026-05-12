'use client';

import { AnimatePresence, motion, Transition, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { DatePickerView } from './views/DatePickerView';
import TimePickerView from './views/TimePickerView';
import { FormView } from './views/FormView';
import { HomeView } from './views/HomeView';
import { useRouter, useSearchParams } from 'next/navigation';
import { TimeZone } from './components/TimeZone';
import { Breadcrumbs } from './components/Breadcrumbs';

export default function CompanyPage() {
    const [pStep, setPStep] = useState(1);

    const router = useRouter();
    const searchParams = useSearchParams();

    const step = Number(searchParams.get('step')) || 1;
    // 1. Używamy Refa zamiast useState dla poprzedniego kroku
    const prevStepRef = useRef(step);

    // 2. Obliczamy kierunek na podstawie Refa (Ref jeszcze trzyma "starą" wartość)
    const direction = step >= prevStepRef.current ? 1 : -1;

    // 3. Aktualizujemy Refa PO wyrenderowaniu (w useEffect)
    useEffect(() => {
        prevStepRef.current = step;
    }, [step]);

    console.log(`Poprzedni: ${pStep} | Następny: ${step} | Kierunek: ${direction}`);

    const nextStep = () => {
        // setDirection(1);
        router.push(`?step=${step + 1}`, { scroll: false });
    };

    const prevStep = () => {
        // setDirection(-1);
        router.push(`?step=${step - 1}`, { scroll: false });
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
        <div className='w-screen h-screen relative overflow-hidden flex flex-col'>
            <Breadcrumbs />
            <AnimatePresence initial={false} mode='popLayout' custom={direction}>
                <motion.div
                    key={step} // Zmiana klucza wyzwala animację
                    custom={direction} // Przekazuje informację o kierunku do wariantów
                    variants={variants} // Definiuje klatki kluczowe
                    initial='enter'
                    animate='center'
                    exit='exit'
                    className='w-full h-dvh flex flex-col justify-center items-center p-8 overflow-y-scroll'>
                    <p>Strona {step}</p>
                    {step === 1 && views.home}
                    {step === 2 && views.datePicker}
                    {step === 3 && views.timePicker}
                    {step === 4 && views.form}
                    <div className='flex space-x-4'>
                        <button
                            onClick={prevStep}
                            className='w-24 px-4 py-2 rounded-xl bg-amber-900 text-white'>
                            LEWO
                        </button>
                        <button
                            onClick={nextStep}
                            className='w-24 px-4 py-2 rounded-xl bg-amber-900 text-white'>
                            PRAWO
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
            <TimeZone />
        </div>
    );
}
