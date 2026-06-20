import { createClient } from '@/utils/supabase/server';

// Tablica obiektów reprezentójących rekordy z tabeli company_hours
export async function getCompanyHours(companyId: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('company_hours')
        .select('*')
        .eq('company_id', companyId)
        .order('day_of_week', { ascending: true });
    return data || [];
}

// Tablica obiektów reprezentujących rekordy z tabeli company_day_offs
export async function getCompanyDayOffs(companyId: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('company_day_offs')
        .select('*')
        .eq('company_id', companyId)
        .order('date', { ascending: false });
    return data || [];
}
