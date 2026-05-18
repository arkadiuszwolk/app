'use server';

import { createClient } from '@/utils/supabase/server';
import { parseISO, isBefore, isAfter, addMinutes, format } from 'date-fns';

export async function getAvailableSlots(companyId: string, serviceId: string, dateStr: string) {
    const supabase = await createClient();

    // 1. Zamiana polskiego formatu daty "DD.MM.YYYY" na "YYYY-MM-DD"
    const parts = dateStr.split('.');
    if (parts.length !== 3) throw new Error('Nieprawidłowy format daty');
    const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD

    // Wyliczamy dzień tygodnia (0 = Niedziela, 1 = Poniedziałek...) dla Postgresa
    const dayOfWeek = new Date(isoDate).getDay();

    // 2. Pobieramy dane o firmie, wybranej usłudze oraz godzinach pracy
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
    const { data: hours } = await supabase
        .from('company_hours')
        .select('open_time, close_time, is_active')
        .eq('company_id', companyId)
        .eq('day_of_week', dayOfWeek)
        .single();

    if (!company || !service) throw new Error('Nie znaleziono firmy lub usługi');
    if (!hours || !hours.is_active) return []; // Salon jest zamknięty w ten dzień

    // 3. Pobieramy wszystkie rezerwacje z tego dnia dla tej firmy
    const startOfDayStr = `${isoDate}T00:00:00.000Z`;
    const endOfDayStr = `${isoDate}T23:59:59.999Z`;

    const { data: appointments } = await supabase
        .from('appointments')
        .select('start_time, end_time')
        .eq('company_id', companyId)
        .neq('status', 'cancelled') // ignorujemy anulowane
        .gte('start_time', startOfDayStr)
        .lte('start_time', endOfDayStr);

    // 4. Generujemy sloty czasowe (np. co 30 minut)
    const slots: string[] = [];
    const [openH, openM] = hours.open_time.split(':').map(Number);
    const [closeH, closeM] = hours.close_time.split(':').map(Number);

    let currentSlot = new Date(
        Date.UTC(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]), openH, openM),
    );
    const closeTime = new Date(
        Date.UTC(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]), closeH, closeM),
    );

    // Iterujemy od godziny otwarcia do zamknięcia salonu
    while (currentSlot < closeTime) {
        const slotStart = currentSlot;
        const slotEnd = addMinutes(slotStart, service.duration);

        // Jeśli usługa nie zmieści się przed zamknięciem salonu - przerywamy
        if (slotEnd > closeTime) break;

        // Liczymy, ile wizyt nakłada się na ten konkretny przedział czasowy
        const overlappingAppointments =
            appointments?.filter((app) => {
                const appStart = new Date(app.start_time);
                const appEnd = new Date(app.end_time);

                // Warunek nakładania się przedziałów (StartA < EndB && EndA > StartB)
                return slotStart < appEnd && slotEnd > appStart;
            }) || [];

        // Jeśli liczba nakładających się rezerwacji jest mniejsza niż pojemność salonu (capacity) - slot jest WOLNY!
        if (overlappingAppointments.length < company.capacity) {
            // Zapisujemy ładny format godziny, np. "14:15"
            slots.push(format(slotStart, 'HH:mm'));
        }

        // Przesuwamy pętlę o interwał (np. o kolejne 30 minut)
        currentSlot = addMinutes(currentSlot, 30);
    }

    return slots;
}
