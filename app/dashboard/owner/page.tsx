import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { logout } from '../../auth/actions';

export default async function OwnerDashboardPage() {
    const supabase = await createClient();

    // 1. Sprawdź, czy użytkownik jest w ogóle zalogowany w Supabase Auth
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        // Jeśli nie jest zalogowany, wyrzuć go na stronę logowania
        redirect('/login');
    }

    // 2. Pobierz dane pracownika oraz połączonej firmy (JOIN w Supabase)
    // Wyciągamy full_name, role oraz całą powiązaną firmę za jednym zamachem
    const { data: employeeData, error: dbError } = await supabase
        .from('employees')
        .select(
            `
      full_name,
      role,
      companies (
        id,
        company_name,
        slug,
        capacity
      )
    `,
        )
        .eq('user_id', user.id)
        .single(); // Chcemy dokładnie jeden rekord

    // Zabezpieczenie: Jeśli użytkownik jest w Auth, ale nie ma go w tabeli employees,
    // lub jeśli nie jest właścicielem (owner) – blokujemy dostęp
    if (dbError || !employeeData || employeeData.role !== 'owner') {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4 text-center'>
                <div className='bg-white p-6 rounded-2xl shadow-sm max-w-sm'>
                    <p className='text-sm text-red-500 font-medium'>
                        Brak uprawnień do panelu właściciela lub błąd bazy danych.
                    </p>
                    <form action={logout} className='mt-4'>
                        <button
                            type='submit'
                            className='text-xs bg-gray-900 text-white px-4 py-2 rounded-xl'>
                            Wróć
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Dla wygody przypisujemy obiekt firmy do zmiennej (TypeScript automatycznie wie, jak wygląda ten obiekt)
    const company = employeeData.companies as any;

    return (
        <div className='min-h-screen bg-gray-50 text-gray-900 font-sans'>
            {/* GÓRNY PASEK (NAVBAR PANELU) */}
            <nav className='bg-white border-b border-gray-100 sticky top-0 z-10'>
                <div className='max-w-5xl mx-auto px-4 h-16 flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                        <div className='w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs'>
                            m
                        </div>
                        <span className='font-bold text-base tracking-tight'>
                            Panel Właściciela
                        </span>
                    </div>

                    {/* Formularz wylogowania wywołujący Server Action bezpośrednio z przycisku HTML */}
                    <form action={logout}>
                        <button
                            type='submit'
                            className='text-xs font-semibold text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-100 hover:bg-red-50 px-3 py-2 rounded-xl transition-all active:scale-[0.98]'>
                            Wyloguj się
                        </button>
                    </form>
                </div>
            </nav>

            {/* GŁÓWNA TREŚĆ PANELU */}
            <main className='max-w-5xl mx-auto px-4 py-8 space-y-6'>
                {/* NAGŁÓWEK POWITALNY */}
                <header className='space-y-1'>
                    <h1 className='text-2xl font-black tracking-tight text-gray-900'>
                        Cześć, {employeeData.full_name}! 👋
                    </h1>
                    <p className='text-sm text-gray-500'>
                        Zarządzasz firmą:{' '}
                        <span className='font-semibold text-gray-800'>{company?.company_name}</span>
                    </p>
                </header>

                {/* WIDOK DANYCH Z BAZY DANYCH */}
                <section className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {/* Karta 1: Nazwa i Link */}
                    <div className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1'>
                        <span className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                            Link rezerwacyjny
                        </span>
                        <h3 className='font-bold text-gray-900 text-lg truncate'>
                            {company?.company_name}
                        </h3>
                        <p className='text-xs text-indigo-600 font-medium pt-1 truncate'>
                            minical.pl/{company?.slug}
                        </p>
                    </div>

                    {/* Karta 2: Wydajność (Capacity) */}
                    <div className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1'>
                        <span className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                            Maks. pojemność lokalu
                        </span>
                        <div className='flex items-baseline space-x-1.5 pt-1'>
                            <span className='text-3xl font-black text-gray-900'>
                                {company?.capacity}
                            </span>
                            <span className='text-xs text-gray-400 font-medium'>
                                klientów naraz
                            </span>
                        </div>
                        <p className='text-[11px] text-gray-400 pt-1'>
                            Globalny limit dla uproszczonego modelu firmy.
                        </p>
                    </div>

                    {/* Karta 3: Status Konta */}
                    <div className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1'>
                        <span className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                            Twoja rola
                        </span>
                        <h3 className='font-bold text-gray-900 text-lg pt-1 flex items-center space-x-1.5'>
                            <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
                            <span>Właściciel (Owner)</span>
                        </h3>
                        <p className='text-xs text-gray-400 pt-1'>
                            Masz pełny dostęp do zarządzania i konfiguracji.
                        </p>
                    </div>
                </section>

                {/* MIEJSCE NA NASTĘPNE ETAPY (WIZYTY, USŁUGI) */}
                <section className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center py-12 space-y-2'>
                    <div className='w-12 h-12 bg-gray-50 border rounded-xl flex items-center justify-center mx-auto text-xl shadow-sm'>
                        🗓️
                    </div>
                    <h3 className='font-bold text-gray-900 text-base'>Dzisiejsze wizyty</h3>
                    <p className='text-sm text-gray-400 max-w-xs mx-auto'>
                        Gdy klienci zaczną rezerwować terminy przez Twój link, tutaj pojawi się
                        lista nadchodzących wizyt.
                    </p>
                </section>
            </main>
        </div>
    );
}
