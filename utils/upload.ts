import { createClient } from './supabase/client';

export async function uploadServiceImage(file: File, companyId: string): Promise<string | null> {
    try {
        const supabase = await createClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${companyId}/${crypto.randomUUID()}.${fileExt}`;
        const { data, error } = await supabase.storage
            .from('service-images')
            .upload(fileName, file);
        if (error) {
            console.error('Błąd podczas uploadu do Supabase: ', error.message);
            return null;
        }

        const { data: urlData } = supabase.storage.from('service-images').getPublicUrl(fileName);
        return urlData.publicUrl;
    } catch (err) {
        console.error('Nieoczekiwany błąd uploadu: ', err);
        return null;
    }
}
