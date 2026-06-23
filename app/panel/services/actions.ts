'use server';

import { createClient } from '@/utils/supabase/server';
import { serviceSchema, ServiceType } from './schema';
import { revalidatePath } from 'next/cache';

export async function saveServiceAction(formData: ServiceType) {
    const parsedData = serviceSchema.safeParse(formData);
    if (!parsedData.success) return { success: false, error: 'Niepoprawne dane formularza.' };

    const supabase = await createClient();
    const { error } = await supabase.from('services').upsert(parsedData.data);
    if (error) return { success: false, error: 'Wystąpił błąd podczas zapisywania zmian.' };

    revalidatePath('/panel/services');
    return { success: true };
}
