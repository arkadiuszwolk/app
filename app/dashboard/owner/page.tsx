import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { logout } from '../../auth/actions';
import { addService, updateCompany, cancelAppointment, updateCompanyHours } from './actions';

export default async function OwnerDashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) redirect('/login');

    // Pobieramy pracownika, firmę oraz dane lokalizacji
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
        .single();

    if (dbError || !employeeData || employeeData.role !== 'owner') {
        redirect('/login');
    }

    const company = employeeData.companies as any;

    // 1. Pobieramy usługi, żeby właściciel widział, co już dodał
    const { data: services } = await supabase
        .from('services')
        .select('id, name, duration, price')
        .eq('company_id', company.id)
        .order('created_at', { ascending: false });

    // 2. Pobieramy wizyty (appointments) wraz z dołączoną relacją do tabeli services
    const { data: appointmentsRaw } = await supabase
        .from('appointments')
        .select(
            `
            id,
            full_name,
            phone,
            start_time,
            status,
            services (
                name,
                price
            )
        `,
        )
        .eq('company_id', company.id)
        .order('start_time', { ascending: true });

    // Formatujemy i przygotowujemy dane o rezerwacjach do podziału
    const appointments = (appointmentsRaw || []).map((app: any) => {
        const startDate = new Date(app.start_time);

        // Wyświetlamy czas sformatowany pod polską strefę czasową (Europe/Warsaw)
        const dateString = startDate.toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        const timeString = startDate.toLocaleTimeString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Warsaw',
        });

        return {
            id: app.id,
            customerName: app.full_name,
            phone: app.phone,
            status: app.status,
            date: dateString,
            time: timeString,
            rawDate: startDate,
            serviceName: app.services?.name || 'Usługa usunięta',
            servicePrice: Number(app.services?.price || 0),
        };
    });

    // Filtrujemy wizyty na nadchodzące (aktywne, z datą dzisiejszą lub przyszłą) oraz historię/anulowane
    const now = new Date();
    const upcomingAppointments = appointments.filter(
        (app) => app.status === 'confirmed' && app.rawDate >= now,
    );
    const pastOrCancelledAppointments = appointments.filter(
        (app) => app.status === 'cancelled' || app.rawDate < now,
    );

    // 3. Pobieramy godziny otwarcia firmy
    const { data: hoursRaw } = await supabase
        .from('company_hours')
        .select('day_of_week, open_time, close_time, is_active')
        .eq('company_id', company.id);

    // Mapujemy dni tygodnia na przyjazny obiekt, żeby łatwo uzupełnić defaultValue w formularzu
    const daysLookup = (hoursRaw || []).reduce((acc: any, curr: any) => {
        acc[curr.day_of_week] = curr;
        return acc;
    }, {});

    // Pomocnicza mapa nazw dni po polsku (zaczynamy od Poniedziałku dla intuicyjnego UI, ale pamiętamy o indeksach bazy)
    const polandDays = [
        { id: 1, name: 'Poniedziałek' },
        { id: 2, name: 'Wtorek' },
        { id: 3, name: 'Środa' },
        { id: 4, name: 'Czwartek' },
        { id: 5, name: 'Piątek' },
        { id: 6, name: 'Sobota' },
        { id: 0, name: 'Niedziela' },
    ];

    return (
        <div className='min-h-screen bg-gray-50 text-gray-900 font-sans pb-12'>
            {/* NAVBAR */}
            <nav className='bg-white border-b border-gray-100 sticky top-0 z-10'>
                <div className='max-w-6xl mx-auto px-4 h-16 flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                        <div className='w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs'>
                            m
                        </div>
                        <span className='font-bold text-base tracking-tight'>
                            Panel Właściciela
                        </span>
                    </div>
                    <form action={logout}>
                        <button
                            type='submit'
                            className='text-xs font-semibold text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-100 hover:bg-red-50 px-3 py-2 rounded-xl transition-all cursor-pointer'>
                            Wyloguj się
                        </button>
                    </form>
                </div>
            </nav>

            {/* GŁÓWNA TREŚĆ */}
            <main className='max-w-6xl mx-auto px-4 py-8 space-y-8'>
                <header className='space-y-1'>
                    <h1 className='text-2xl font-black tracking-tight'>
                        Cześć, {employeeData.full_name}! 👋
                    </h1>
                    <p className='text-sm text-gray-500'>
                        Zarządzasz:{' '}
                        <span className='font-semibold text-gray-800'>{company?.company_name}</span>{' '}
                        (minical.pl/{company?.slug})
                    </p>
                </header>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* LEWA I ŚRODKOWA KOLUMNA: WIZYTY */}
                    <div className='lg:col-span-2 space-y-8'>
                        {/* SEKCJA: NADCHODZĄCE WIZYTY */}
                        <section className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4'>
                            <h2 className='text-xs font-bold text-gray-400 uppercase tracking-wider'>
                                Nadchodzące rezerwacje ({upcomingAppointments.length})
                            </h2>
                            <div className='divide-y divide-gray-50 max-h-100 overflow-y-auto pr-1'>
                                {upcomingAppointments.map((app) => (
                                    <div
                                        key={app.id}
                                        className='py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                                        <div className='space-y-1'>
                                            <div className='flex items-center space-x-2'>
                                                <span className='font-semibold text-sm text-gray-900'>
                                                    {app.customerName}
                                                </span>
                                                <span className='text-xs text-gray-400'>
                                                    • {app.phone}
                                                </span>
                                            </div>
                                            <p className='text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-block'>
                                                {app.serviceName} — {app.servicePrice} zł
                                            </p>
                                        </div>
                                        <div className='flex items-center justify-between sm:justify-end space-x-4'>
                                            <div className='text-right'>
                                                <p className='text-sm font-bold text-gray-900'>
                                                    {app.time}
                                                </p>
                                                <p className='text-xs text-gray-400'>{app.date}</p>
                                            </div>

                                            {/* Przycisk anulowania podpięty pod Server Action */}
                                            <form
                                                action={async () => {
                                                    'use server';
                                                    await cancelAppointment(app.id);
                                                }}>
                                                <button
                                                    type='submit'
                                                    className='text-xs font-medium text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer'>
                                                    Anuluj
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                ))}
                                {upcomingAppointments.length === 0 && (
                                    <p className='text-xs text-gray-400 text-center py-8'>
                                        Brak nadchodzących wizyt w najbliższym czasie.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* SEKCJA: HISTORIA I ANULOWANE */}
                        <section className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4'>
                            <h2 className='text-xs font-bold text-gray-400 uppercase tracking-wider'>
                                Ostatnie zdarzenia i historia ({pastOrCancelledAppointments.length})
                            </h2>
                            <div className='divide-y divide-gray-50 max-h-62.5 overflow-y-auto pr-1 text-xs'>
                                {pastOrCancelledAppointments.map((app) => (
                                    <div
                                        key={app.id}
                                        className='py-3 first:pt-0 last:pb-0 flex items-center justify-between text-gray-500'>
                                        <div>
                                            <p className='font-medium text-gray-700'>
                                                {app.customerName}{' '}
                                                <span className='text-gray-400 font-normal'>
                                                    ({app.serviceName})
                                                </span>
                                            </p>
                                            <p className='text-[10px] text-gray-400'>
                                                {app.date} o {app.time}
                                            </p>
                                        </div>
                                        <div>
                                            {app.status === 'cancelled' ? (
                                                <span className='text-red-500 bg-red-50 px-2 py-0.5 rounded font-medium'>
                                                    Anulowana
                                                </span>
                                            ) : (
                                                <span className='text-gray-400 bg-gray-100 px-2 py-0.5 rounded font-medium'>
                                                    Zakończona
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {pastOrCancelledAppointments.length === 0 && (
                                    <p className='text-xs text-gray-400 text-center py-6'>
                                        Historia operacji jest pusta.
                                    </p>
                                )}
                            </div>
                        </section>
                        {/* FORMULARZ: GODZINY OTWARCIA */}
                        <section className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4'>
                            <h2 className='text-sm font-bold text-gray-400 uppercase tracking-wider'>
                                Godziny otwarcia
                            </h2>
                            <form action={updateCompanyHours} className='space-y-4'>
                                <div className='space-y-3 divide-y divide-gray-50'>
                                    {polandDays.map((day) => {
                                        // Sprawdzamy czy dzień istnieje w bazie, jeśli nie - dajemy domyślne wartości
                                        const currentDaySettings = daysLookup[day.id] || {
                                            is_active: true,
                                            open_time: '09:00',
                                            close_time: '17:00',
                                        };

                                        // Obcinamy sekundy z formatu TIME (np. 09:00:00 -> 09:00) dla ładnego wyglądu inputa typu time
                                        const defaultOpen = currentDaySettings.open_time.slice(
                                            0,
                                            5,
                                        );
                                        const defaultClose = currentDaySettings.close_time.slice(
                                            0,
                                            5,
                                        );

                                        return (
                                            <div
                                                key={day.id}
                                                className='flex items-center justify-between pt-3 first:pt-0 gap-2'>
                                                <div className='w-24'>
                                                    <span className='text-xs font-semibold text-gray-700'>
                                                        {day.name}
                                                    </span>
                                                </div>

                                                <div className='flex items-center space-x-2 flex-1 justify-end'>
                                                    {/* Prosty select do aktywacji/dezaktywacji dnia */}
                                                    <select
                                                        name={`day_${day.id}_active`}
                                                        defaultValue={
                                                            currentDaySettings.is_active
                                                                ? 'true'
                                                                : 'false'
                                                        }
                                                        className='text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-50 outline-none focus:border-indigo-500'>
                                                        <option value='true'>Otwarty</option>
                                                        <option value='false'>Zamknięty</option>
                                                    </select>

                                                    <input
                                                        name={`day_${day.id}_open`}
                                                        type='time'
                                                        defaultValue={defaultOpen}
                                                        className='border border-gray-200 rounded-lg px-2 py-1 text-xs outline-none focus:border-indigo-500'
                                                    />
                                                    <span className='text-xs text-gray-400'>-</span>
                                                    <input
                                                        name={`day_${day.id}_close`}
                                                        type='time'
                                                        defaultValue={defaultClose}
                                                        className='border border-gray-200 rounded-lg px-2 py-1 text-xs outline-none focus:border-indigo-500'
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <button
                                    type='submit'
                                    className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-all active:scale-[0.98] cursor-pointer'>
                                    Zapisz godziny pracy 🕒
                                </button>
                            </form>
                        </section>
                    </div>

                    {/* PRAWA KOLUMNA: PANEL ZARZĄDZANIA FIRMĄ I USŁUGAMI */}
                    <div className='space-y-6'>
                        {/* FORMULARZ: DODAWANIE USŁUGI */}
                        <section className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4'>
                            <h2 className='text-sm font-bold text-gray-400 uppercase tracking-wider'>
                                Dodaj nową usługę
                            </h2>
                            <form action={addService} className='space-y-3.5'>
                                <div className='flex flex-col space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>
                                        Nazwa usługi
                                    </label>
                                    <input
                                        required
                                        name='name'
                                        type='text'
                                        placeholder='np. Strzyżenie męskie premium'
                                        className='border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500'
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-3'>
                                    <div className='flex flex-col space-y-1'>
                                        <label className='text-xs font-medium text-gray-500'>
                                            Czas (min)
                                        </label>
                                        <input
                                            required
                                            name='duration'
                                            type='number'
                                            placeholder='45'
                                            className='border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                    <div className='flex flex-col space-y-1'>
                                        <label className='text-xs font-medium text-gray-500'>
                                            Cena (PLN)
                                        </label>
                                        <input
                                            required
                                            name='price'
                                            type='number'
                                            placeholder='120'
                                            className='border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500'
                                        />
                                    </div>
                                </div>
                                <button
                                    type='submit'
                                    className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-all active:scale-[0.98] cursor-pointer'>
                                    Dodaj usługę +
                                </button>
                            </form>
                        </section>

                        {/* FORMULARZ: EDYCJA DANYCH FIRMY */}
                        <section className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4'>
                            <h2 className='text-sm font-bold text-gray-400 uppercase tracking-wider'>
                                Ustawienia lokalu
                            </h2>
                            <form action={updateCompany} className='space-y-3.5'>
                                <div className='flex flex-col space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>
                                        Nazwa salonu / firmy
                                    </label>
                                    <input
                                        required
                                        name='company_name'
                                        type='text'
                                        defaultValue={company?.company_name}
                                        className='border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500'
                                    />
                                </div>
                                <div className='flex flex-col space-y-1'>
                                    <label className='text-xs font-medium text-gray-500'>
                                        Maks. pojemność (stanowiska)
                                    </label>
                                    <input
                                        required
                                        name='capacity'
                                        type='number'
                                        defaultValue={company?.capacity}
                                        className='border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500'
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm py-2.5 px-5 rounded-xl transition-all active:scale-[0.98] cursor-pointer'>
                                    Zapisz zmiany
                                </button>
                            </form>
                        </section>

                        {/* PODGLĄD AKTYWNYCH USŁUG */}
                        <section className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3'>
                            <h2 className='text-xs font-bold text-gray-400 uppercase tracking-wider'>
                                Lista usług ({services?.length || 0})
                            </h2>
                            <div className='space-y-2 max-h-50 overflow-y-auto pr-1'>
                                {services?.map((svc) => (
                                    <div
                                        key={svc.id}
                                        className='p-2.5 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between text-xs'>
                                        <div>
                                            <p className='font-semibold text-gray-900'>
                                                {svc.name}
                                            </p>
                                            <p className='text-[10px] text-gray-400'>
                                                ⏱️ {svc.duration} min
                                            </p>
                                        </div>
                                        <span className='font-bold text-gray-900'>
                                            {Number(svc.price).toFixed(0)} zł
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
