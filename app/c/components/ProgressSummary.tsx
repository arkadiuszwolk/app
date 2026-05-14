'use client';

import { useBookingStore } from '@/store/useBookingStore';
import { motion, AnimatePresence } from 'framer-motion';

export function ProgressSummary() {
    const { date, time } = useBookingStore();

    return (
        <div className='w-full flex flex-col py-6 items-center border-b border-gray-50 bg-white/80 backdrop-blur-md sticky top-0 z-20'>
            <span className='text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1'>
                Twoja wizyta
            </span>

            <h3 className='text-sm font-medium text-gray-900'>
                Strzyżenie męskie <span className='text-gray-300 mx-2'>•</span> 30 min{' '}
                <span className='text-gray-300 mx-2'>•</span> 120 PLN
            </h3>

            {/* Kontener dla animowanych danych */}
            <div className='flex items-center gap-2 mt-1 text-sm text-gray-500 min-h-5'>
                <AnimatePresence mode='wait'>
                    {/* Animacja Daty */}
                    <motion.span
                        key={date ? date : 'empty-date'}
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                        transition={{ duration: 0.2 }}>
                        {date ? date : 'Wybierz datę'}
                    </motion.span>
                </AnimatePresence>

                {time && (
                    <>
                        <span className='text-gray-300'>•</span>
                        <AnimatePresence mode='wait'>
                            {/* Animacja Godziny */}
                            <motion.span
                                key={time}
                                initial={{ y: 5, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -5, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className='text-blue-600 font-medium'>
                                {time}
                            </motion.span>
                        </AnimatePresence>
                    </>
                )}
            </div>
        </div>
    );
}
