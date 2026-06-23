import { z } from 'zod';

export const registerSchema = z.object({
    full_name: z.string().min(3, 'Imię i nazwisko musi mieć minimum 3 znaki.'),
    email: z.email('Niepoprawny adres email.'),
    password: z.string().min(6, 'Hasło musi mieć minimum 6 znaków.'),
    company_name: z.string().min(2, 'Nazwa firmy musi mieć minimum 2 znaki.'),
});

export type RegisterType = z.infer<typeof registerSchema>;
