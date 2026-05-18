import { create } from 'zustand';

// Definiujemy strukturę usługi wewnątrz stanu
interface SelectedService {
    id: string;
    name: string;
    duration: number;
    price: number;
}

interface BookingState {
    companyId: string | null; // Dodane: ID firmy, w której rezerwujemy
    service: SelectedService | null;
    date: string | null;
    time: string | null;
    fullName: string;
    phone: string;

    setCompanyId: (id: string) => void; // Dodane: akcja zapisu ID firmy
    setService: (service: SelectedService) => void;
    setDate: (date: string) => void;
    setTime: (time: string) => void;
    setCustomer: (name: string, phone: string) => void;
    reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    companyId: null, // Stan początkowy
    service: null,
    date: null,
    time: null,
    fullName: '',
    phone: '',

    setCompanyId: (id) => set({ companyId: id }), // Ustawianie ID firmy
    setService: (newService) => set({ service: newService }),
    setDate: (newDate) => set({ date: newDate }),
    setTime: (newTime) => set({ time: newTime }),
    setCustomer: (name, phone) => set({ fullName: name, phone: phone }),
    reset: () =>
        set({ companyId: null, service: null, date: null, time: null, fullName: '', phone: '' }),
}));
