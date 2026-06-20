import { error } from 'console';
import { z } from 'zod';

const phoneRegex = /^[1-9]\d{8}$/;

export const customerSchema = z.object({
    fullName: z.string().min(5, 'Imię i nazwisko musi mieć minimum 5 znaków.'),
    phone: z.string().regex(phoneRegex, 'Niepoprawny numer telefonu.'),
    email: z.string().email('Niepoprawny format adresu e-mail.').trim().toLowerCase(),
    sex: z.enum(['male', 'female', 'other'], 'Wybierz płeć z listy.'),
    note: z.string().optional().or(z.literal('')),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
