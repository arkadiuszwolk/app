'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// 1. Akcja dodawania nowej usługi
export async function addService(formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('Niezalogowany użytkownik');

    const { data: employee } = await supabase
        .from('employees')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

    if (!employee?.company_id) throw new Error('Nie znaleziono firmy dla tego użytkownika');

    const name = formData.get('name') as string;
    const duration = parseInt(formData.get('duration') as string, 10);
    const price = parseFloat(formData.get('price') as string);

    const { error } = await supabase.from('services').insert({
        company_id: employee.company_id,
        name,
        duration,
        price,
        is_active: true,
    });

    if (error) throw new Error(error.message);

    revalidatePath('/[company]', 'layout');
    revalidatePath('/dashboard/owner');
}

// 2. Akcja aktualizacji danych firmy
export async function updateCompany(formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('Niezalogowany użytkownik');

    const { data: employee } = await supabase
        .from('employees')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

    if (!employee?.company_id) throw new Error('Nie znaleziono firmy');

    const companyName = formData.get('company_name') as string;
    const capacity = parseInt(formData.get('capacity') as string, 10);

    const { error } = await supabase
        .from('companies')
        .update({ company_name: companyName, capacity: capacity })
        .eq('id', employee.company_id);

    if (error) throw new Error(error.message);

    revalidatePath('/[company]', 'layout');
    revalidatePath('/dashboard/owner');
}

// ==========================================
// NOWE AKCJE: ALGORYTM DOSTĘPNOŚCI I REZERWACJI
// ==========================================

/**
 * 3. Pobiera wolne sloty godzinowe dla danej firmy i usługi w wybranym dniu.
 * @param companyId UUID firmy
 * @param serviceId UUID usługi (potrzebne do wyciągnięcia duration)
 * @param dateStr Data w formacie przekazywanym przez MiniCalendar, np. "18.05.2026"
 */
export async function getAvailableSlots(companyId: string, serviceId: string, dateStr: string) {
    const supabase = await createClient();

    // Parsujemy polski format "DD.MM.YYYY" do ISO "YYYY-MM-DD" pod zapytania bazy
    const parts = dateStr.split('.');
    if (parts.length !== 3) throw new Error('Nieprawidłowy format daty');
    const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // Formuje "YYYY-MM-DD"

    // Wyliczamy dzień tygodnia (JavaScript: 0 = Niedziela, 1 = Poniedziałek...)
    const parsedDate = new Date(isoDate);
    const dayOfWeek = parsedDate.getDay();

    // Pobieramy pojemność firmy (capacity) oraz czas trwania usługi (duration)
    const { data: company } = await supabase
        .from('companies')
        .select('capacity')
        .eq('id', companyId)
        .single();
    const { data: service } = await supabase
        .from('services')
        .select('duration')
        .eq('id', serviceId)
        .single();

    if (!company || !service) throw new Error('Nie znaleziono firmy lub specyfikacji usługi');

    // Pobieramy godziny pracy na ten konkretny dzień tygodnia
    const { data: hours } = await supabase
        .from('company_hours')
        .select('open_time, close_time, is_active')
        .eq('company_id', companyId)
        .eq('day_of_week', dayOfWeek)
        .single();

    // Jeśli brak zdefiniowanych godzin lub salon jest nieaktywny (zamknięty) w ten dzień – zwracamy brak miejsc
    if (!hours || !hours.is_active) return [];

    // Pobieramy już zarezerwowane wizyty na ten dzień, które NIE są anulowane
    // Konstruujemy zakres od początku do końca dnia w strefie czasowej, w której działa aplikacja
    const startOfDayStr = `${isoDate}T00:00:00.000Z`;
    const endOfDayStr = `${isoDate}T23:59:59.999Z`;

    const { data: appointments } = await supabase
        .from('appointments')
        .select('start_time, end_time')
        .eq('company_id', companyId)
        .neq('status', 'cancelled')
        .gte('start_time', startOfDayStr)
        .lte('start_time', endOfDayStr);

    const availableSlots: string[] = [];

    // Rozbijamy godziny otwarcia i zamknięcia na liczby, np. "09:00:00" -> 9, 0
    const [openH, openM] = hours.open_time.split(':').map(Number);
    const [closeH, closeM] = hours.close_time.split(':').map(Number);

    // Generujemy obiekty Date dla początku i końca pracy salonu w tym dniu (używamy UTC dla spójności obliczeń)
    let currentSlot = new Date(
        Date.UTC(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]), openH, openM),
    );
    const closeTime = new Date(
        Date.UTC(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]), closeH, closeM),
    );

    // Pętla skacząca co interwał (np. co 30 minut) generująca sloty
    const SLOT_INTERVAL = 30;

    while (currentSlot < closeTime) {
        const slotStart = new Date(currentSlot.getTime());
        // Wyliczamy kiedy potencjalna usługa klienta by się skończyła
        const slotEnd = new Date(slotStart.getTime() + service.duration * 60000);

        // Jeżeli usługa przekroczy godzinę zamknięcia salonu – nie pozwalamy na ten slot
        if (slotEnd > closeTime) break;

        // Sprawdzamy, ile wizyt w bazie nakłada się na ten generowany przedział czasowy
        const overlappingCount =
            appointments?.filter((app) => {
                const appStart = new Date(app.start_time);
                const appEnd = new Date(app.end_time);

                // Warunek nachodzenia na siebie dwóch odcinków czasu: (StartA < EndB) oraz (EndA > StartB)
                return slotStart < appEnd && slotEnd > appStart;
            }).length || 0;

        // Jeżeli nałożonych wizyt jest mniej niż maksymalny limit jednoczesnych miejsc w lokalu (capacity) – slot jest wolny!
        if (overlappingCount < company.capacity) {
            // Formatujemy do postaci "HH:MM"
            const hoursStr = String(slotStart.getUTCHours()).padStart(2, '0');
            const minutesStr = String(slotStart.getUTCMinutes()).padStart(2, '0');
            availableSlots.push(`${hoursStr}:${minutesStr}`);
        }

        // Przesuwamy wskaźnik o zdefiniowany krok (30 min) na kolejny slot
        currentSlot.setUTCMinutes(currentSlot.getUTCMinutes() + SLOT_INTERVAL);
    }

    return availableSlots;
}

/**
 * 4. Akcja faktycznego umawiania wizyty (wywoływana na końcu przez klienta)
 */
export async function createAppointment(payload: {
    companyId: string;
    serviceId: string;
    customerName: string;
    customerPhone: string;
    dateStr: string; // "18.05.2026"
    timeStr: string; // "14:15"
}) {
    const supabase = await createClient();

    // Parsowanie daty i godziny
    const parts = payload.dateStr.split('.');
    const [hours, minutes] = payload.timeStr.split(':').map(Number);

    // Tworzymy dokładny moment rozpoczęcia wizyty
    const startTime = new Date(
        Date.UTC(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]), hours, minutes),
    );

    // Pobieramy czas trwania usługi, aby poprawnie wyliczyć pole end_time
    const { data: service } = await supabase
        .from('services')
        .select('duration')
        .eq('id', payload.serviceId)
        .single();

    if (!service) throw new Error('Wybrana usługa już nie istnieje.');

    // Wyliczamy end_time dodając minuty trwania usługi
    const endTime = new Date(startTime.getTime() + service.duration * 60000);

    // Ostateczna weryfikacja bezpieczeństwa (Concurrency check):
    // Zliczamy na wypadek rezerwacji w tej samej milisekundzie przez dwie osoby, czy limit nie pękł
    const { data: company } = await supabase
        .from('companies')
        .select('capacity')
        .eq('id', payload.companyId)
        .single();
    const { data: existingApps } = await supabase
        .from('appointments')
        .select('id')
        .eq('company_id', payload.companyId)
        .neq('status', 'cancelled')
        .gte('start_time', startTime.toISOString())
        .lt('start_time', endTime.toISOString());

    if (company && existingApps && existingApps.length >= company.capacity) {
        return {
            success: false,
            error: 'Przepraszamy, ten termin został zajęty ułamek sekundy temu. Wybierz inną godzinę.',
        };
    }

    // Wrzucamy wpis do tabeli appointments
    const { error } = await supabase.from('appointments').insert({
        company_id: payload.companyId,
        service_id: payload.serviceId,
        full_name: payload.customerName,
        phone: payload.customerPhone,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: 'confirmed', // Zmieniamy z pending na confirmed, jako że to natychmiastowy zapis
    });

    if (error) throw new Error(error.message);

    // Czyścimy cache Next.js dla widoku klienta oraz widoku panelu ownera
    revalidatePath('/[company]', 'layout');
    revalidatePath('/dashboard/owner');

    return { success: true };
}

/**
 * 5. Akcja anulowania wizyty przez właściciela salonu
 */
export async function cancelAppointment(appointmentId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('Niezalogowany użytkownik');

    // Bezpieczeństwo: sprawdzamy, czy anulujący to właściciel powiązany z tą samą firmą
    const { data: employee } = await supabase
        .from('employees')
        .select('company_id, role')
        .eq('user_id', user.id)
        .single();

    if (!employee || employee.role !== 'owner') {
        throw new Error('Brak uprawnień do wykonania tej akcji');
    }

    const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', appointmentId)
        .eq('company_id', employee.company_id); // Dodatkowe zabezpieczenie firmy

    if (error) throw new Error(error.message);

    revalidatePath('/dashboard/owner');
}

export async function updateCompanyHours(formData: FormData) {
    const supabase = await createClient();

    // 1. Pobierz zalogowanego użytkownika i upewnij się, że to owner
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('Brak autoryzacji');

    const { data: employee } = await supabase
        .from('employees')
        .select('company_id, role')
        .eq('user_id', user.id)
        .single();

    if (!employee || employee.role !== 'owner' || !employee.company_id) {
        throw new Error('Niedozwolona operacja');
    }

    const companyId = employee.company_id;

    // 2. Przygotuj tablicę danych dla wszystkich 7 dni (0 = Niedziela, 1 = Poniedziałek...)
    const hoursData = [];

    for (let day = 0; day <= 6; day++) {
        const isActive = formData.get(`day_${day}_active`) === 'true';
        const openTime = formData.get(`day_${day}_open`) as string;
        const closeTime = formData.get(`day_${day}_close`) as string;

        hoursData.push({
            company_id: companyId,
            day_of_week: day,
            open_time: isActive && openTime ? openTime : '09:00:00',
            close_time: isActive && closeTime ? closeTime : '17:00:00',
            is_active: isActive,
        });
    }

    // 3. Wykonaj UPSERT w bazie (dzięki UNIQUE constraint na [company_id, day_of_week])
    const { error } = await supabase
        .from('company_hours')
        .upsert(hoursData, { onConflict: 'company_id,day_of_week' });

    if (error) {
        console.error('Błąd zapisu godzin:', error);
        throw new Error('Nie udało się zapisać godzin otwarcia');
    }

    // 4. Odśwież widok panelu właściciela
    revalidatePath('/dashboard/owner');
}
