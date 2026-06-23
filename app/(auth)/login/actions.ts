'use server';

import { createClient } from '@/utils/supabase/server';
import { loginSchema, LoginType } from './schema';

type ActionResponse = { success: true; error?: never } | { success: false; error: string };

export async function loginAction(formData: LoginType): Promise<ActionResponse> {
    try {
        const parsedData = loginSchema.safeParse(formData);
        if (!parsedData.success) return { success: false, error: 'Niepoprawne dane logowania.' };

        const supabase = await createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email: parsedData.data.email,
            password: parsedData.data.password,
        });

        if (error) return { success: false, error: 'Błąd logowania: ' + error.message };

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error?.message || 'Wystąpił nieoczekiwayn błąd serwera.' };
    }
}
