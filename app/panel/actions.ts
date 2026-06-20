'use server';

import { createClient } from '@supabase/supabase-js';
import { CustomerFormValues } from './client.schemas';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

const CURRENT_COMPANY_ID = '824a51e4-8976-4c3f-bd28-f160d7209cf5';

// 1. Pobieranie klientów (Twoja obecna funkcja)
export async function fetchClientsAction() {
    const { data, error } = await supabase
        .from('company_clients_summary')
        .select('*')
        .eq('company_id', CURRENT_COMPANY_ID);

    if (error) {
        console.error(error);
        return [];
    }
    return data || [];
}

// 2. NOWOŚĆ: Dodawanie nowego klienta do bazy danych
export async function addClientAction(formData: CustomerFormValues) {
    // Sprawdzamy, czy numer zaczyna się od '+'. Jeśli nie, doklejamy '+48'
    const formattedPhone = formData.phone.startsWith('+') ? formData.phone : `+48${formData.phone}`;

    const { data, error } = await supabase
        .from('clients')
        .insert([
            {
                full_name: formData.fullName,
                phone: formattedPhone, // <-- Wysyłamy sformatowany numer
                email: formData.email,
                sex: formData.sex,
                note: formData.note || null,
            },
        ])
        .select();

    if (error) {
        console.error('Błąd zapisu w Supabase:', error.message);
        throw new Error(error.message);
    }

    return data;
}
