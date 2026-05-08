import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TimePickerView() {
    return (
        <div className='flex flex-col'>
            <ul>
                {['8:45', '9:00', '10:30', '10:45', '12:00', '12:30', '14:15'].map((hour) => (
                    <li key={hour}>
                        <Link href='/form'>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className='bg-blue-50 rounded-xl text-blue-500 w-50 h-12 mb-4'>
                                {hour}
                            </motion.button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
