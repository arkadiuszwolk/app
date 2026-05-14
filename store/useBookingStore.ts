import { create } from 'zustand';

interface BookingState {
    date: string | null;
    time: string | null;
    fullName: string;
    phone: string;

    setDate: (date: string) => void;
    setTime: (time: string) => void;
    setCustomer: (name: string, phone: string) => void;
    reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    date: null,
    time: null,
    fullName: '',
    phone: '',

    setDate: (newDate) => set({ date: newDate }),
    setTime: (newTime) => set({ time: newTime }),
    setCustomer: (name, phone) => set({ fullName: name, phone: phone }),
    reset: () => set({ date: null, time: null, fullName: '', phone: '' }),
}));
