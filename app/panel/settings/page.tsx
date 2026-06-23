import { getCompanyDayOffs, getCompanyHours } from './queries';
import { PageClientManager } from './page-client-manager';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) redirect('/login');

    const { data, error } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('user_id', userData.user.id)
        .single();

    if (error || !data?.company_id)
        return (
            <div className='p-8 text-red-600'>
                Nie znaleziono firmy przypisanej do Twojego konta.
            </div>
        );

    const companyId = data.company_id;
    const companyHours = await getCompanyHours(companyId);
    const companyDayOffs = await getCompanyDayOffs(companyId);

    return (
        <PageClientManager
            companyId={companyId}
            companyHours={companyHours}
            companyDayOffs={companyDayOffs}
        />
    );
}
