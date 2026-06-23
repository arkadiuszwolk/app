// components/Drawer.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, children }: DrawerProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className='fixed inset-0 bg-black/40 z-40'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        className='fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 p-6 overflow-y-scroll'
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                        <button
                            onClick={onClose}
                            className='mb-4 text-gray-500 hover:text-gray-800'>
                            ✕ Zamknij
                        </button>
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
