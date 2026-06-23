import { z } from 'zod';

const phoneRegex = /^[+]?[0-9\s-]{9,15}$/;
const phoneError = 'Niepoprawny numer telefonu.';

export const customerSchema = z.object({
    id: z.uuid().optional(),
    company_id: z.uuid(),
    full_name: z.string().min(3, 'Pole musi zawierać minimum 3 znaki.'),
    phone: z.string().regex(phoneRegex, phoneError),
    email: z.email('Niepoprawny adres email.').nullable().optional().or(z.literal('')),
    gender: z.enum(['male', 'female', 'none']),
    created_at: z.string().optional(),
});

export type CustomerType = z.infer<typeof customerSchema>;
