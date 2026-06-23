'use server';

import { createClient } from '@/utils/supabase/server';
import { registerSchema, RegisterType } from './schema';
import { redirect } from 'next/navigation';

function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[ąą]/g, 'a')
        .replace(/[ćć]/g, 'c')
        .replace(/[ęę]/g, 'e')
        .replace(/[łł]/g, 'l')
        .replace(/[ńń]/g, 'n')
        .replace(/[óó]/g, 'o')
        .replace(/[śś]/g, 's')
        .replace(/[źźżż]/g, 'z')
        .replace(/[^a-z0-9 -\s]/g, '') // Usuwa znaki specjalne oprócz spacji i myślników
        .replace(/\s+/g, '-') // Zamienia spacje na myślniki
        .replace(/-+/g, '-'); // Usuwa powtarzające się myślniki
}

type ActionResponse = { success: true; error?: never } | { success: false; error: string };

export async function registerCompanyAction(formData: RegisterType): Promise<ActionResponse> {
    try {
        const validated = registerSchema.safeParse(formData);
        if (!validated.success) {
            return { success: false, error: 'Niepoprawne dane formularza.' };
        }

        const supabase = await createClient();

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: validated.data.email,
            password: validated.data.password,
        });

        if (authError || !authData.user) {
            return { success: false, error: authError?.message || 'Nie udało się stworzyć konta.' };
        }

        const userId = authData.user.id;
        const companySlug = generateSlug(validated.data.company_name);

        const { data: companyData, error: companyError } = await supabase
            .from('companies')
            .insert({ name: validated.data.company_name, slug: companySlug })
            .select('id')
            .single();
        if (companyError || !companyData) {
            return {
                success: false,
                error: 'Błąd podczas zakładania firmy: ' + companyError?.message,
            };
        }

        const companyId = companyData.id;

        const { error: profileError } = await supabase.from('profiles').insert({
            user_id: userId,
            company_id: companyId,
            full_name: validated.data.full_name,
            email: validated.data.email,
            role: 'manager',
            is_active: true,
        });

        if (profileError) {
            return {
                success: false,
                error: 'Błąd podczas tworzenia profilu: ' + profileError?.message,
            };
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error?.message || 'Wystąpił nieoczekiwany błąd serwera.' };
    }
}
