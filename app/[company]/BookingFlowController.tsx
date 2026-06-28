'use client';

import { AnimatePresence, motion, Transition, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { DatePickerView } from './views/DatePickerView';
import { TimePickerView } from './views/TimePickerView';
import { TimeZoneInfo } from './components/TimeZoneInfo';
import { ProgressSummary } from './components/ProgressSummary';
import { FormView } from './views/FormView';
import { SuccessView } from './views/SuccessView';
import ProfileView from './views/ProfileView';
import { useBookingStore } from '@/store/useBookingStore';

interface Service {
    id: string;
    name: string;
    duration: number;
    price: number;
}

interface BookingFlowControllerProps {
    company: { id: string; name: string; slug: string };
    services: Service[];
    availableSlots: Record<string, { time: string; display: string }[]>;
}

export function BookingFlowController({
    company,
    services,
    availableSlots,
}: BookingFlowControllerProps) {
    // Inicjalizujemy krok początkowy bezpośrednio z funkcji sprawdzającej URL
    const [step, setStep] = useState(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            return Number(params.get('step')) || 1;
        }
        return 1;
    });
    const [direction, setDirection] = useState(1);

    // Pobieramy akcje ze stora Zustand
    const setCompanyId = useBookingStore((state) => state.setCompanyId);
    const setService = useBookingStore((state) => state.setService);
    const reset = useBookingStore((state) => state.reset);

    // KLUCZOWY DODATEK: Zapisujemy ID firmy w Zustandzie od razu po wejściu na stronę
    useEffect(() => {
        reset(); // Czyścimy pamięć podręczną ze starych wyborów
        if (company?.id) {
            setCompanyId(company.id);
        }
    }, [company?.id, setCompanyId, reset]);

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

    const handleServiceSelect = (service: Service) => {
        if (setService) {
            setService({
                id: service.id,
                name: service.name,
                price: service.price,
                duration: service.duration,
            });
        }
        nextStep(); // Przechodzimy do kroku 2 (DatePickerView)
    };

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
                            {step === 1 && (
                                <ProfileView
                                    company={company}
                                    services={services}
                                    onSelectService={handleServiceSelect}
                                />
                            )}
                            {step === 2 && <DatePickerView nextStep={nextStep} />}
                            {step === 3 && (
                                <TimePickerView
                                    nextStep={nextStep}
                                    availableSlot={availableSlots}
                                />
                            )}
                            {step === 4 && <FormView nextStep={nextStep} />}
                            {step === 5 && <SuccessView />}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>
            <TimeZoneInfo />
        </div>
    );
}
