import React from 'react';

interface EmployeeCardProps {
    firstName: string;
    lastName: string;
    role: string;
    phone: string;
    email: string;
    bio?: string;
    avatarUrl?: string;
    isWorkingToday?: boolean;
    todayAppointmentsCount: number;
    todayEarnings: number;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
    firstName,
    lastName,
    role,
    phone,
    email,
    bio,
    avatarUrl,
    isWorkingToday = true,
    todayAppointmentsCount,
    todayEarnings,
}) => {
    return (
        <div className='group relative w-full rounded-2xl bg-[#0B132B] text-white p-5 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl border border-white/5 cursor-pointer'>
            {/* BACKGROUND LINED PATTERN (Gilosz / Paszport effect) */}
            <div
                className='absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none'
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 100 C 30 70, 70 30, 100 0 M0 80 C 40 60, 60 40, 100 -20 M-20 100 C 40 40, 40 40, 100 20' fill='none' stroke='%2348567b' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: '120px 120px',
                }}
            />

            {/* SUBTLE INNER RADIAL GLOW */}
            <div className='absolute -top-20 -right-20 w-48 h-48 bg-[#21295C] rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none' />

            {/* TOP SECTION: Avatar & Name & Contact */}
            <div className='relative z-10 flex items-center justify-start space-x-4 mb-2'>
                {/* AVATAR WITH GOLDEN BORDER & STATUS DOT */}
                <div className='relative'>
                    <div className='w-14 h-14 rounded-full  border-[#D4AF37]/30 p-0.5 shadow-md group-hover:border-[#D4AF37]/70 transition-colors duration-300'>
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={`${firstName} ${lastName}`}
                                className='w-full h-full rounded-full object-cover'
                            />
                        ) : (
                            <div className='w-full h-full rounded-full bg-pink-600 flex items-center justify-center font-bold text-slate-300 text-sm'>
                                {firstName[0]}
                                {lastName[0]}
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col justify-center max-w-[65%]'>
                    <span className='text-xs text-[#D4AF37]'>{role}</span>

                    {/* NAME WITH BIO TOOLTIP ON HOVER */}
                    <div className='relative group/bio'>
                        <h3 className='text-md font-bold text-white group-hover:text-slate-100 transition-colors line-clamp-2'>
                            {firstName} {lastName}
                        </h3>
                        {bio && (
                            <div className='absolute left-0 bottom-full mb-2 hidden group-hover/bio:block w-56 p-3 rounded-xl bg-[#1C2541] text-xs text-slate-300 shadow-2xl border border-white/10 z-30 pointer-events-none backdrop-blur-md animate-in fade-in slide-in-from-bottom-1 duration-200'>
                                <p className='font-semibold text-white mb-1'>Bio dla klienta:</p>
                                <p className='italic'>"{bio}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* CONTACT INFO (Phone & Email subtle list) */}
            <div className='mt-2 flex flex-col gap-0.5 text-xs text-slate-400'>
                {/* Clickable Phone for Właściciel */}
                <a
                    href={`tel:${phone}`}
                    className='flex items-center gap-1 hover:text-[#D4AF37] transition-colors w-fit'
                    onClick={(e) => e.stopPropagation()} // Zapobiega otwarciu drawera przy kliknięciu w telefon
                >
                    <i className='fa-solid fa-phone'></i>
                    <span>{phone}</span>
                </a>
                <a
                    href={`tel:${phone}`}
                    className='flex items-center gap-1 hover:text-[#D4AF37] transition-colors w-fit'
                    onClick={(e) => e.stopPropagation()} // Zapobiega otwarciu drawera przy kliknięciu w telefon
                >
                    <i className='fa-solid fa-envelope'></i>
                    <span>{email}</span>
                </a>
            </div>
            {/* BOTTOM SECTION: Glassmorphism Stats Counter */}
            <div className='relative z-10 w-full rounded-xl bg-white/4 backdrop-blur-md border border-white/6 p-3 flex justify-between items-center group-hover:bg-white/[0.07] group-hover:border-white/10 transition-all duration-300 mt-8'>
                <div className='flex flex-col'>
                    <span className='text-[9px] text-slate-400 uppercase tracking-widest font-medium'>
                        Dzisiejsze wizyty
                    </span>
                    <span className='text-sm font-bold text-white mt-0.5'>
                        {todayAppointmentsCount}{' '}
                        <span className='text-xs font-normal text-slate-400'>wizyt</span>
                    </span>
                </div>

                <div className='h-8 w-px bg-white/10' />

                <div className='flex flex-col text-right'>
                    <span className='text-[9px] text-slate-400 uppercase tracking-widest font-medium'>
                        Dzisiejszy obrót
                    </span>
                    <span className='text-sm font-black text-[#D4AF37] mt-0.5 tracking-tight'>
                        {todayEarnings}{' '}
                        <span className='text-xs font-normal text-[#D4AF37]/80'>PLN</span>
                    </span>
                </div>
            </div>

            <div className='w-full mt-6 pt-5 flex items-center justify-end border-t border-slate-900'>
                <div className='flex items-center space-x-2.5'>
                    {/* Historia */}
                    <button
                        type='button'
                        title='Zobacz historię wizyt tego pracownika'
                        className='h-8 px-2 flex justify-center items-center rounded-md border border-white/5 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer gap-1 text-xs font-semibold'>
                        <i className='mx-1 fa-solid fa-clock-rotate-left text-[13px]'></i>
                        Historia
                    </button>
                    {/* Edytuj */}
                    <button
                        type='button'
                        title='Edytuj profil pracownika'
                        className='w-8 flex justify-center items-center aspect-square rounded-md border border-white/5 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer gap-1 text-xs font-semibold'>
                        <i className='fa-solid fa-pen text-[13px]'></i>
                    </button>
                    {/* Usuń */}
                    <button
                        type='button'
                        title='Usuń pracownika (Wymaga potwierdzenia)'
                        className='w-8 flex justify-center items-center aspect-square rounded-md border border-white/5 bg-slate-900 text-slate-300 hover:bg-red-950 hover:text-red-300 transition-colors cursor-pointer gap-1 text-xs font-semibold'>
                        <i className='fa-solid fa-trash-can text-[13px]'></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
