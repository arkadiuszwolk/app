'use server';

import { createClient } from '@/utils/supabase/server';
import {
    addServiceSchema,
    updateServiceSchema,
    AddServiceType,
    UpdateServiceType,
    deleteServiceSchema,
} from './schema';
import { revalidatePath } from 'next/cache';

type ActionResponse<Data = undefined> =
    | { success: true; data?: Data; error?: never }
    | { success: false; data?: never; error: string };

export async function addServiceAction(
    companyId: string,
    formData: AddServiceType,
): Promise<ActionResponse> {
    const parsedData = addServiceSchema.safeParse(formData);
    if (!parsedData.success) return { success: false, error: 'Niepoprawne dane formularza.' };
    const finalData = { ...parsedData.data, company_id: companyId };

    const supabase = await createClient();
    const { error } = await supabase.from('services').insert(finalData);
    if (error) return { success: false, error: 'Wystąpił błąd podczas zapisywania zmian.' };

    revalidatePath('/panel/services');
    return { success: true };
}

export async function updateServiceAction(
    companyId: string,
    serviceId: string,
    formData: AddServiceType,
): Promise<ActionResponse> {
    const parsedData = addServiceSchema.safeParse(formData);
    if (!parsedData.success) return { success: false, error: 'Niepoprawne dane formularza.' };
    const finalData = { ...parsedData.data, company_id: companyId };

    const supabase = await createClient();
    const { error } = await supabase
        .from('services')
        .update(finalData)
        .eq('id', serviceId)
        .eq('company_id', companyId);
    if (error) return { success: false, error: 'Wystąpił błąd podczas zapisywania zmian.' };

    revalidatePath('/panel/services');
    return { success: true };
}

export async function deleteServiceAction(serviceId: string, companyId: string) {
    const parsedData = deleteServiceSchema.safeParse({ serviceId, companyId });
    if (!parsedData) return { success: false, error: 'Nieprawidłowe identyfikatory danych.' };

    try {
        const supabase = await createClient();
        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', serviceId)
            .eq('company_id', companyId);
        if (error) return { success: false, error: 'Nie udało się usunąć usługi z bazy.' };

        revalidatePath('/panel/services');
        return { success: true };
    } catch (err) {
        console.error('Nieoczekiwany błąd serwera: ', err);
        return { success: false, error: 'Wystąpił nieoczekiwany błąd serwera.' };
    }
}
