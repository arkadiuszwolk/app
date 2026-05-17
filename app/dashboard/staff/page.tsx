'use client';

export default function StaffDashboard() {
    // Dane docelowo wyciągnięte z sesji Supabase Auth
    const employeeName = 'Anna Nowak';

    return (
        <div className='min-h-dvh bg-gray-50 p-6 flex flex-col items-center justify-center'>
            <div className='w-full max-w-sm bg-white p-6 rounded-2xl shadow-sm text-center space-y-4'>
                <div className='w-16 h-16 bg-blue-100 text-blue-600 font-bold text-xl rounded-full flex items-center justify-center mx-auto'>
                    {employeeName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                </div>
                <div>
                    <h1 className='text-xl font-bold text-gray-900'>Cześć, {employeeName}! 👋</h1>
                    <p className='text-sm text-gray-500 mt-1'>Witamy w Twoim panelu pracownika.</p>
                </div>
                <div className='bg-blue-50 border border-blue-100 p-3 rounded-xl text-xs text-blue-700'>
                    Twój szef zarządza Twoim kalendarzem. Wkrótce zobaczysz tutaj listę swoich
                    nadchodzących wizyt.
                </div>
                <button className='w-full py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors'>
                    Wyloguj się
                </button>
            </div>
        </div>
    );
}
