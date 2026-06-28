import { format, getDay, getDaysInMonth, eachMinuteOfInterval } from 'date-fns';
import { TZDate } from '@date-fns/tz';

// --- INTERFEJSY ---

interface Slot {
    utcTimestamp: string; // Pełny ISO String w UTC (np. "2026-06-01T06:00:00.000Z")
    bookedCount: number; // Liczba zarezerwowanych wizyt w tym czasie
    capacity: number; // Maksymalna dozwolona liczba wizyt
    belongsToCurrentDay: boolean; // Czy slot należy do analizowanego dnia (czy do jutrzejszego bufora)
}

interface AppointmentsByDay {
    [startDate: string]: { startTime: string; duration: number }[];
}

interface WorkingHoursMap {
    [dayOfWeek: number]: {
        startTime: string | null;
        endTime: string | null;
        capacity: number | null;
        isActive: boolean;
    };
}

// --- FUNKCJE POMOCNICZE ---

/**
 * Konwertuje lokalną datę i godzinę ze wskazanej strefy na obiekt Date w UTC
 */
function toUTC(date: string, time: string, timeZone: string): Date {
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);

    const local = new TZDate(year, month - 1, day, hours, minutes, timeZone);
    return new Date(local.getTime());
}

/**
 * Algorytm Gąsienicy (Sliding Window) szukający sekwencji wolnych slotów pod rząd
 */
function findAvailableStartSlots(slots: Slot[], requiredCount: number): Slot[] {
    const results: Slot[] = [];
    let currentStreak = 0;

    for (let i = 0; i < slots.length; i++) {
        const isAvailable = slots[i].bookedCount < slots[i].capacity;

        if (isAvailable) {
            currentStreak++;
            if (currentStreak === requiredCount) {
                // Znaleziono pełną sekwencję – dodajemy slot początkowy (ogon gąsienicy)
                results.push(slots[i - requiredCount + 1]);
                currentStreak--; // Przesuwamy okno o jeden krok
            }
        } else {
            currentStreak = 0; // Natrafiono na zablokowany slot – reset
        }
    }
    return results;
}

/**
 * Generuje 10-minutowe sloty z przypisaniem poprawnego capacity na przełomie dwóch dób
 */
function generateSlots(
    startDate: Date,
    endDate: Date,
    currentDateString: string,
    currentCapacity: number,
    nextCapacity: number,
    timeZone: string,
): Slot[] {
    const times = eachMinuteOfInterval({ start: startDate, end: endDate }, { step: 10 });
    return times.map((time) => {
        // Sprawdzamy datę w strefie lokalnej salonu, aby poprawnie przydzielić capacity
        const localTime = new TZDate(time, timeZone);
        const slotLocalDateString = format(localTime, 'yyyy-MM-dd');
        const belongsToCurrentDay = slotLocalDateString === currentDateString;

        return {
            utcTimestamp: time.toISOString(),
            bookedCount: 0,
            capacity: belongsToCurrentDay ? currentCapacity : nextCapacity,
            belongsToCurrentDay: belongsToCurrentDay,
        };
    });
}

// --- GŁÓWNA FUNKCJA ---

export async function findAvailableSlots() {
    // ********** Dane testowe z Supabase *********************************************
    const supabaseAppointments = [
        { startDate: '2026-06-01', startTime: '08:40', duration: 45 },
        { startDate: '2026-06-01', startTime: '09:00', duration: 30 },
        { startDate: '2026-06-02', startTime: '12:30', duration: 60 },
        { startDate: '2026-06-15', startTime: '15:00', duration: 45 },
    ];

    const supabaseDaysOff = [
        { date: '2026-06-04' }, // Boże Ciało
        { date: '2026-06-22' }, // Urlop właściciela
    ];

    const supabaseDayOfWeekConfig = [
        { day_of_week: 1, start_time: '08:00', end_time: '16:00', capacity: 2, is_active: true }, // Poniedziałek
        { day_of_week: 2, start_time: '08:00', end_time: '16:00', capacity: 2, is_active: true }, // Wtorek
        { day_of_week: 3, start_time: '08:00', end_time: '16:00', capacity: 2, is_active: true }, // Środa
        { day_of_week: 4, start_time: '08:00', end_time: '17:00', capacity: 2, is_active: true }, // Czwartek
        { day_of_week: 5, start_time: '09:00', end_time: '15:00', capacity: 1, is_active: true }, // Piątek
        { day_of_week: 6, start_time: '09:00', end_time: '15:00', capacity: 3, is_active: true }, // Sobota
        { day_of_week: 0, start_time: null, end_time: null, capacity: null, is_active: false }, // Niedziela
    ];
    // ********************************************************************************

    const daysOff = supabaseDaysOff.map((d) => d.date);

    // Grupowanie istniejących wizyt po dniach O(1)
    const appointmentsByDay = supabaseAppointments.reduce<AppointmentsByDay>((acc, app) => {
        if (!acc[app.startDate]) acc[app.startDate] = [];
        acc[app.startDate].push({ startTime: app.startTime, duration: app.duration });
        return acc;
    }, {});

    // Słownik godzin pracy po numerze dnia tygodnia O(1)
    const workingHoursMap = supabaseDayOfWeekConfig.reduce<WorkingHoursMap>((acc, curr) => {
        acc[curr.day_of_week] = {
            startTime: curr.start_time,
            endTime: curr.end_time,
            capacity: curr.capacity,
            isActive: curr.is_active,
        };
        return acc;
    }, {});

    // Parametry wejściowe wyszukiwania
    const duration = 35; // Czas trwania nowej usługi w minutach
    const month = 6; // Czerwiec
    const year = 2026;
    const timeZone = 'Europe/Warsaw';

    const monthSlotsCache: { [startDate: string]: string[] } = {};
    const totalDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    // Iteracja dzień po dniu przez cały miesiąc
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const currentDate = new Date(year, month - 1, day);
        const currentDateString = format(currentDate, 'yyyy-MM-dd');

        const nextDate = new Date(year, month - 1, day + 1);
        const nextDateString = format(nextDate, 'yyyy-MM-dd');

        // TEST 1: Czy dzisiaj jest dzień wolny (np. jednorazowe święto)?
        if (daysOff.includes(currentDateString)) {
            monthSlotsCache[currentDateString] = [];
            continue;
        }

        // TEST 2: Czy dzisiaj salon jest w ogóle zamknięty w tym dniu tygodnia?
        if (!workingHoursMap[getDay(currentDate)].isActive) {
            monthSlotsCache[currentDateString] = [];
            continue;
        }

        const currentDayConfig = workingHoursMap[getDay(currentDate)];
        const nextDayConfig = workingHoursMap[getDay(nextDate)];

        // Początek okna: otwarcie salonu dzisiaj
        const workStart = toUTC(currentDateString, currentDayConfig.startTime!, timeZone);

        // Bezpieczne ustalanie końca okna: jeśli jutro pracujemy, bierzemy godzinę zamknięcia jutra.
        // Jeśli jutro wolne, zamykamy okno na dzisiejszej godzinie zamknięcia.
        const isNextDayActive = nextDayConfig?.isActive && !daysOff.includes(nextDateString);
        const workEnd = isNextDayActive
            ? toUTC(nextDateString, nextDayConfig.endTime!, timeZone)
            : toUTC(currentDateString, currentDayConfig.endTime!, timeZone);

        // Generowanie dwudniowej "taśmy" slotów
        const slots = generateSlots(
            workStart,
            workEnd,
            currentDateString,
            currentDayConfig.capacity!,
            isNextDayActive ? nextDayConfig.capacity! : 0,
            timeZone,
        );

        // --- NAKŁADANIE ISTNIEJĄCYCH REZERWACJI ---

        // 1. Zliczanie dzisiejszych wizyt
        const currentAppointments = appointmentsByDay[currentDateString] || [];
        currentAppointments.forEach((app) => {
            const appStart = toUTC(currentDateString, app.startTime, timeZone);
            const appEnd = new Date(appStart.getTime() + app.duration * 60 * 1000);

            slots.forEach((slot) => {
                const slotTime = new Date(slot.utcTimestamp);
                if (slotTime >= appStart && slotTime < appEnd) {
                    slot.bookedCount++;
                }
            });
        });

        // 2. Zliczanie jutrzejszych wizyt (tylko jeśli okno obejmuje jutro)
        if (isNextDayActive) {
            const nextAppointments = appointmentsByDay[nextDateString] || [];
            nextAppointments.forEach((app) => {
                const appStart = toUTC(nextDateString, app.startTime, timeZone);
                const appEnd = new Date(appStart.getTime() + app.duration * 60 * 1000);

                slots.forEach((slot) => {
                    const slotTime = new Date(slot.utcTimestamp);
                    if (slotTime >= appStart && slotTime < appEnd) {
                        slot.bookedCount++;
                    }
                });
            });
        }

        // --- SZUKANIE WOLNYCH MIEJSC GĄSIENICĄ ---

        const numberOfNeededSlots = Math.ceil(duration / 10);
        const validStarts = findAvailableStartSlots(slots, numberOfNeededSlots);

        // Przepuszczamy tylko te godziny, które fizycznie zaczynają się dzisiaj
        const filteredStarts = validStarts.filter((slot) => slot.belongsToCurrentDay);

        // Zapis sformatowanych godzin (HH:mm) do cache dla danego dnia
        monthSlotsCache[currentDateString] = filteredStarts.map((slot) => {
            return format(new TZDate(slot.utcTimestamp, timeZone), 'HH:mm');
        });
    }

    return monthSlotsCache;
}
