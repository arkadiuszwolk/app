import { tz } from '@date-fns/tz';
import { format, getDay, getTime, parseISO } from 'date-fns';

// ********** Dane testowe z Supabase *********************************************
const supabaseAppointments = [
    { startDate: '2026-06-01', startTime: '08:40:00', duration: 45 },
    { startDate: '2026-06-01', startTime: '09:00:00', duration: 30 },
    { startDate: '2026-06-02', startTime: '12:30:00', duration: 60 },
    { startDate: '2026-06-15', startTime: '15:00:00', duration: 45 },
];

const supabaseDaysOff = [
    { date: '2026-06-04' }, // Boże Ciało
    { date: '2026-06-22' }, // Urlop właściciela
];

const supabaseDayOfWeekConfig = [
    { day_of_week: 1, start_time: '08:00:00', end_time: '16:00:00', capacity: 2, is_active: true }, // Poniedziałek
    { day_of_week: 2, start_time: '08:00:00', end_time: '16:00:00', capacity: 2, is_active: true }, // Wtorek
    { day_of_week: 3, start_time: '08:00:00', end_time: '16:00:00', capacity: 2, is_active: true }, // Środa
    { day_of_week: 4, start_time: '08:00:00', end_time: '17:00:00', capacity: 2, is_active: true }, // Czwartek
    { day_of_week: 5, start_time: '09:00:00', end_time: '15:00:00', capacity: 1, is_active: true }, // Piątek
    { day_of_week: 6, start_time: '09:00:00', end_time: '15:00:00', capacity: 3, is_active: true }, // Sobota
    { day_of_week: 0, start_time: null, end_time: null, capacity: null, is_active: false }, // Niedziela
];
// ********************************************************************************

// Mapowanie dni wolnych na zbiór dat
const daysOffSet = new Set(supabaseDaysOff.map((d) => d.date));

// Mapowanie konfiguracji tygodnia na słownik
const weekConfigMap = supabaseDayOfWeekConfig.reduce(
    (acc, config) => {
        acc[config.day_of_week] = config;
        return acc;
    },
    {} as Record<number, (typeof supabaseDayOfWeekConfig)[number]>,
);

// Rozbijanie umówionych wizyt na sloty
const appointmentsMap: Record<number, number> = {};
const SLOT_DURATION_MS = 10 * 60 * 1000; // 10 minut w milisekundach

supabaseAppointments.forEach((appointment) => {
    const isoString = `${appointment.startDate}T${appointment.startTime}Z`;
    const startTimestamp = getTime(parseISO(isoString));
    const numberOfSlots = Math.ceil(appointment.duration / 10);

    for (let i = 0; i < numberOfSlots; i++) {
        const slotTimestamp = startTimestamp + i * SLOT_DURATION_MS;
        if (!appointmentsMap[slotTimestamp]) appointmentsMap[slotTimestamp] = 0;
        appointmentsMap[slotTimestamp]++;
    }
});

function getDayOfWeek(date: string): number {
    return getDay(parseISO(date));
}

function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

function createSlotTimestamp(date: string, minutesFromMidnight: number): number {
    const hours = Math.floor(minutesFromMidnight / 60);
    const minutes = minutesFromMidnight % 60;

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');

    const localDateTimeString = `${date}T${paddedHours}:${paddedMinutes}:00`;
    return getTime(parseISO(localDateTimeString, { in: tz('Europe/Warsaw') }));
}

type TimeSlot = {
    timestamp: number;
    localTime: string;
    displayTime: string;
    currentBookings: number;
    maxCapacity: number;
};

type FinalAvailableSlots = Record<string, { time: string; display: string }[]>;

export function getAvailableSlots(
    year: number,
    month: number,
    serviceDurationMinutes: number,
): FinalAvailableSlots {
    const finalResult: FinalAvailableSlots = {};
    const slotsRequired = Math.ceil(serviceDurationMinutes / 10);

    // Iteracja po wszystkich dniach miesiąca
    for (let day = 1; day <= 30; day++) {
        const paddedDay = String(day).padStart(2, '0');
        const paddedMonth = String(month).padStart(2, '0');
        const dateString = `${year}-${paddedMonth}-${paddedDay}`;

        if (daysOffSet.has(dateString)) {
            finalResult[dateString] = [];
            continue;
        }

        const dayOfWeek = getDayOfWeek(dateString);
        const config = weekConfigMap[dayOfWeek];

        if (
            !config ||
            !config.is_active ||
            !config.start_time ||
            !config.end_time ||
            config.capacity === null
        ) {
            finalResult[dateString] = [];
            continue;
        }

        // Siatka slotów dla dnia
        const startMinutes = timeToMinutes(config.start_time);
        const endMinutes = timeToMinutes(config.end_time);
        const daySlots: TimeSlot[] = [];

        for (let currentMin = startMinutes; currentMin < endMinutes; currentMin += 10) {
            const slotTimestamp = createSlotTimestamp(dateString, currentMin);
            const currentBookings = appointmentsMap[slotTimestamp] || 0;

            const hours = Math.floor(currentMin / 60);
            const minutes = currentMin % 60;
            const localTimeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

            daySlots.push({
                timestamp: slotTimestamp,
                localTime: localTimeStr,
                // date-fns v4 automatycznie dobierze odpowiedni offset na podstawie strefy w createSlotTimestamp
                displayTime: format(slotTimestamp, "HH:mm '(UTC'xxx')'", {
                    in: tz('Europe/Warsaw'),
                }),
                currentBookings: currentBookings,
                maxCapacity: config.capacity,
            });
        }

        const validDaySlots: { time: string; display: string }[] = [];

        for (let i = 0; i <= daySlots.length - slotsRequired; i++) {
            let isWindowAvailable = true;

            // Gąsienica sprawdza 'slotsRequired' kolejnych klocków
            for (let j = 0; j < slotsRequired; j++) {
                const checkedSlot = daySlots[i + j];

                // Jeśli choć jeden slot w oknie jest przepełniony, całe okno odpada
                if (checkedSlot.currentBookings >= checkedSlot.maxCapacity) {
                    isWindowAvailable = false;
                    break;
                }
            }

            if (isWindowAvailable) {
                validDaySlots.push({
                    time: daySlots[i].localTime,
                    display: daySlots[i].displayTime,
                });
            }
        }

        finalResult[dateString] = validDaySlots;
    }
    console.log(finalResult);

    return finalResult;
}
