import { createClient } from '@/utils/supabase/server';
import { ServiceType } from './schema';

// Pobieranie rekordów z tabeli services
export async function getCompanyServices(companyId: string): Promise<ServiceType[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

    return (data as ServiceType[]) || null;
}
