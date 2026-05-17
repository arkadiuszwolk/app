'use client';

import Link from 'next/link';

export default function LandingPage() {
    return (
        <div className='min-h-screen bg-white text-gray-900 antialiased font-sans'>
            {/* 1. NAWIGACJA (NAVBAR) */}
            <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100'>
                <div className='max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between'>
                    {/* Logo */}
                    <div className='flex items-center space-x-2'>
                        <div className='w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-indigo-200'>
                            m
                        </div>
                        <span className='font-bold text-xl tracking-tight text-gray-900'>
                            miniCal
                        </span>
                    </div>

                    {/* Przyciski logowania/rejestracji */}
                    <div className='flex items-center space-x-3'>
                        <Link
                            href='/login'
                            className='text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors px-3 py-2 rounded-xl'>
                            Zaloguj się
                        </Link>
                        <Link
                            href='/register'
                            className='text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-all px-4 py-2.5 rounded-xl shadow-sm active:scale-[0.98]'>
                            Załóż konto
                        </Link>
                    </div>
                </div>
            </nav>

            {/* 2. SEKCJA GŁÓWNA (HERO) */}
            <header className='max-w-4xl mx-auto px-4 pt-16 pb-20 text-center space-y-6'>
                <div className='inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-indigo-700 text-xs font-medium'>
                    <span>🚀 System rezerwacji dla małych firm</span>
                </div>

                <h1 className='text-4xl sm:text-6xl font-black text-gray-900 tracking-tight leading-none max-w-2xl mx-auto'>
                    Uprość rezerwacje w swojej firmie.
                </h1>

                <p className='text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed'>
                    Stworzone dla nietechnicznych właścicieli. Jeden kalendarz dla całego zespołu,
                    błyskawiczna konfiguracja i święty spokój.
                </p>

                <div className='pt-4 flex flex-col sm:flex-row items-center justify-center gap-3'>
                    <Link
                        href='/register'
                        className='w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-px text-center'>
                        Zacznij darmowy okres próbny
                    </Link>
                    <a
                        href='#features'
                        className='w-full sm:w-auto px-8 py-4 bg-gray-50 text-gray-600 rounded-2xl font-medium hover:bg-gray-100 transition-all text-center'>
                        Zobacz funkcje
                    </a>
                </div>
            </header>

            {/* 3. FUNKCJE (FEATURES) */}
            <section id='features' className='bg-gray-50 py-20 border-y border-gray-100'>
                <div className='max-w-5xl mx-auto px-4 sm:px-6'>
                    <div className='text-center max-w-lg mx-auto mb-12 space-y-2'>
                        <h2 className='text-2xl sm:text-3xl font-bold tracking-tight text-gray-900'>
                            Wszystko, czego potrzebujesz. Nic więcej.
                        </h2>
                        <p className='text-sm text-gray-500'>
                            Wyrzuć papierowy kalendarz i arkusze Excela. Postaw na prostotę.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {/* Karta 1 */}
                        <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3'>
                            <div className='w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold'>
                                ⚡
                            </div>
                            <h3 className='font-semibold text-gray-900 text-lg'>
                                Konfiguracja w 3 minuty
                            </h3>
                            <p className='text-sm text-gray-500 leading-relaxed'>
                                Podajesz nazwę, dodajesz usługi, ustawiasz ogólne godziny pracy i
                                Twój link do rezerwacji jest natychmiast gotowy.
                            </p>
                        </div>

                        {/* Karta 2 */}
                        <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3'>
                            <div className='w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold'>
                                👥
                            </div>
                            <h3 className='font-semibold text-gray-900 text-lg'>
                                Wspólne zarządzanie
                            </h3>
                            <p className='text-sm text-gray-500 leading-relaxed'>
                                Jeden wspólny kalendarz i zdefiniowana wydajność (capacity) dla
                                całego lokalu. Zespół działa jako jedna zgrana całość.
                            </p>
                        </div>

                        {/* Karta 3 */}
                        <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3'>
                            <div className='w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold'>
                                📱
                            </div>
                            <h3 className='font-semibold text-gray-900 text-lg'>
                                Zoptymalizowane pod Mobile
                            </h3>
                            <p className='text-sm text-gray-500 leading-relaxed'>
                                Twój klient przechodzi przez piękny, minimalistyczny proces
                                rezerwacji na telefonie. Bez zbędnego rejestrowania kont.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. CENNIK (PRICING) */}
            <section className='py-20 max-w-5xl mx-auto px-4 sm:px-6'>
                <div className='text-center max-w-lg mx-auto mb-12 space-y-2'>
                    <h2 className='text-2xl sm:text-3xl font-bold tracking-tight text-gray-900'>
                        Prosty cennik dla prostego biznesu
                    </h2>
                    <p className='text-sm text-gray-500'>
                        Żadnych ukrytych opłat. Testujesz za darmo przez 14 dni.
                    </p>
                </div>

                {/* Karta cennika */}
                <div className='max-w-md mx-auto bg-white border-2 border-indigo-600 rounded-3xl p-8 shadow-xl shadow-indigo-50/50 relative overflow-hidden'>
                    <div className='absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider'>
                        Najpopularniejszy
                    </div>

                    <div className='space-y-4'>
                        <div>
                            <h3 className='text-xl font-bold text-gray-900'>Plan Micro-SaaS</h3>
                            <p className='text-sm text-gray-400'>
                                Idealny dla małych salonów i gabinetów
                            </p>
                        </div>

                        <div className='flex items-baseline space-x-1'>
                            <span className='text-5xl font-black tracking-tight text-gray-900'>
                                49 PLN
                            </span>
                            <span className='text-gray-400 text-sm'>/ miesiąc</span>
                        </div>

                        <div className='h-px bg-gray-100 w-full my-2' />

                        <ul className='space-y-3 text-sm text-gray-600'>
                            <li className='flex items-center space-x-2'>
                                <span className='text-indigo-600 font-bold'>✓</span>
                                <span>Nielimitowane rezerwacje klientów</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                                <span className='text-indigo-600 font-bold'>✓</span>
                                <span>Do 5 kont pracowników</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                                <span className='text-indigo-600 font-bold'>✓</span>
                                <span>Własny unikalny link (slug)</span>
                            </li>
                            <li className='flex items-center space-x-2'>
                                <span className='text-indigo-600 font-bold'>✓</span>
                                <span>System buforów przed i po usłudze</span>
                            </li>
                        </ul>

                        <Link
                            href='/register'
                            className='block w-full py-3.5 bg-indigo-600 text-white text-center rounded-2xl font-semibold shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-colors pt-4'>
                            Wypróbuj bezpłatnie
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. STOPKA (FOOTER) */}
            <footer className='border-t border-gray-100 py-8 bg-gray-50 text-center text-xs text-gray-400'>
                <p>&copy; {new Date().getFullYear()} miniCal. Wszelkie prawa zastrzeżone.</p>
                <p className='mt-1'>Stworzone z myślą o prostocie biznesu.</p>
            </footer>
        </div>
    );
}
