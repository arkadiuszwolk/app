'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: any) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
    });

    if (error) {
        throw new Error(error.message);
    }

    // Po zalogowaniu sprawdzamy w tabeli employees rolę (owner czy staff)
    // Na razie dla uproszczenia kierujemy do /dashboard/owner
    redirect('/dashboard/owner');
}

export async function registerCompany(formData: any) {
    const supabase = await createClient();

    // 1. Rejestracja w Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
    });

    if (authError) throw new Error(authError.message);
    const userId = authData.user?.id;

    if (!userId) throw new Error('Nie udało się utworzyć użytkownika.');

    // 2. Dodanie firmy do tabeli companies
    const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert({
            slug: formData.companySlug,
            company_name: formData.companyName,
            capacity: 1, // wartość domyślna
        })
        .select()
        .single();

    if (companyError) throw new Error(companyError.message);
    const companyId = companyData.id;

    // 3. Powiązanie użytkownika jako właściciela w tabeli employees
    const { error: employeeError } = await supabase.from('employees').insert({
        company_id: companyId,
        user_id: userId,
        full_name: formData.fullName,
        role: 'owner',
    });

    if (employeeError) throw new Error(employeeError.message);

    redirect('/dashboard/owner');
}

export async function logout() {
    const supabase = await createClient();

    // Wylogowanie w Supabase czyści sesję w bazie i usuwa ciasteczka
    await supabase.auth.signOut();

    // Przekierowujemy użytkownika z powrotem na stronę główną lub logowania
    redirect('/login');
}
