'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import {
    companyDayOffsSchema,
    CompanyDayOffsType,
    companyHoursSchema,
    CompanyHoursType,
} from './schema';

// Obiekt reprezentujący wybrany rekord z tabeli company_hours
export async function getCompanyHoursForDayAction(companyId: string, dayOfWeek: number) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('company_hours')
        .select('*')
        .eq('company_id', companyId)
        .eq('day_of_week', dayOfWeek)
        .maybeSingle();

    if (!data) return null;

    return {
        ...data,
        open_time: data.open_time?.slice(0, 5) || null,
        close_time: data.close_time?.slice(0, 5) || null,
    };
}

// Zmiana rekordu w tabeli company_hours
export async function saveCompanyHoursForDayAction(formData: CompanyHoursType) {
    const parsedData = companyHoursSchema.safeParse(formData);
    if (!parsedData.success) return { success: false, error: 'Niepoprawne dane formularza.' };
    const finalData = { ...parsedData.data };

    if (!finalData.is_open) {
        finalData.open_time = null;
        finalData.close_time = null;
    }
    const supabase = await createClient();
    const { error } = await supabase
        .from('company_hours')
        .upsert(finalData, { onConflict: 'company_id,day_of_week' });
    if (error) return { success: false, error: 'Wystąpił błąd podczas zapisywania zmian.' };

    revalidatePath('/panel/settings');
    return { success: true };
}

// Obiekt reprezentujący wybrany rekord z tabeli company_day_offs
export async function getCompanyDayOffAction(companyId: string, dayOffDate: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('company_day_offs')
        .select('*')
        .eq('company_id', companyId)
        .eq('date', dayOffDate)
        .maybeSingle();

    return data;
}

// Zmiana rekordu w tabeli company_day_offs
export async function saveCompanyDayOffAction(formData: CompanyDayOffsType) {
    console.log('akcja');
    const parsedData = companyDayOffsSchema.safeParse(formData);
    if (!parsedData.success) return { success: false, error: 'Niepoprawne dane formularza.' };

    const supabase = await createClient();
    const { error } = await supabase
        .from('company_day_offs')
        .upsert(parsedData.data, { onConflict: 'company_id,date' });
    if (error) return { success: false, error: 'Wystąpił błąd podczas zapisywania zmian.' };

    revalidatePath('/panel/settings');
    return { success: true };
}
