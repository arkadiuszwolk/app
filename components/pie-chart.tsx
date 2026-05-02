'use client';

import { useEffect, useState } from 'react';
import { Pie, PieChart, Tooltip } from 'recharts';

export function MyPieChart() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // po pierwszym renderze
    }, []);

    const data = [
        { name: 'React', value: 400, fill: '#e5e7eb' },
        { name: 'Vue', value: 300, fill: '#22c55e' },
        { name: 'Angular', value: 200, fill: '#f59e0b' },
        { name: 'Svelte', value: 100, fill: '#ef4444' },
    ];

    return (
        <div className='w-60 flex flex-col items-center px-4 py-6'>
            <h4 className='text-center font-bold mb-2'>Twój tydzień w skrócie</h4>
            <p className='text-center text-xs mb-6'>
                Zobacz, jak poszło Ci z nawykami
                <br />w tym tygodniu.
            </p>
            <div className='relative w-full aspect-square'>
                <PieChart width='100%' height='100%' className='outline-none select-none'>
                    <Pie
                        data={data}
                        dataKey='value'
                        nameKey='name'
                        cx='50%'
                        cy='50%'
                        outerRadius='100%'
                        innerRadius='70%'
                        stroke='none'
                        animationDuration={mounted ? 0 : 500}
                        startAngle={90}
                        endAngle={450}
                        className='outline-none'
                    />
                    <Tooltip
                        isAnimationActive={true}
                        animationDuration={300}
                        animationEasing='ease-in-out'
                    />
                </PieChart>
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <div className='text-2xl font-semibold'>1240</div>
                    <div className='text-sm text-gray-500'>Total users</div>
                </div>
            </div>
        </div>
    );
}
