// app/panel/klienci/actions.ts
'use server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export async function fetchClientsAction() {
    const currentCompanyId = '824a51e4-8976-4c3f-bd28-f160d7209cf5';

    const { data, error } = await supabase
        .from('company_clients_summary')
        .select('*')
        .eq('company_id', currentCompanyId);

    if (error) {
        console.error(error);
        return [];
    }
    return data || [];
}
