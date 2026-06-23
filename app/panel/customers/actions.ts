'use server';

import { createClient } from '@/utils/supabase/server';
import { customerSchema, CustomerType } from './schema';
import { revalidatePath } from 'next/cache';

// Zmiana danych i dodawanie nowego klienta
export async function upsertCustomerAction(formData: CustomerType) {
    const parsedData = customerSchema.safeParse(formData);
    if (!parsedData.success) return { success: false, error: 'Niepoprawne dane formularza.' };

    const supabase = await createClient();
    const { error } = await supabase.from('customers').upsert(parsedData.data);
    if (error) console.log('bląd');
    if (error) return { success: false, error: 'Wystąpił błąd podczas zapisywania zmian.' };

    revalidatePath('/panel/customers');
    return { success: true };
}
