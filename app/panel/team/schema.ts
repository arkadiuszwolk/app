import { z } from 'zod';

const phoneRegex = /^[+]?[0-9\s-]{9,15}$/;
const phoneError = 'Niepoprawny numer telefonu.';

export const profileSchema = z.object({
    id: z.uuid().optional(),
    user_id: z.uuid().optional(),
    company_id: z.uuid().optional(),
    role: z.enum(['manager', 'administrator', 'employee']),
    full_name: z.string().min(3, 'Pole musi zawierać minimum 3 znaki.'),
    phone: z.string().regex(phoneRegex, phoneError).nullable().optional().or(z.literal('')),
    email: z.email('Niepoprawny adres email.').nullable().optional().or(z.literal('')),
    avatar_url: z.string().nullable().optional().or(z.literal('')),
    is_active: z.boolean().default(true),
    created_at: z.string().optional(),
});

export type ProfileType = z.infer<typeof profileSchema>;
