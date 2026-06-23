import { createClient } from '@/utils/supabase/server';
import { CustomerType } from './schema';

// Pobieranie klientów firmy
export async function getCompanyCustomers(companyId: string): Promise<CustomerType[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: true });

    if (error) console.error('Błąd pobierania danych.');
    return data || [];
}
