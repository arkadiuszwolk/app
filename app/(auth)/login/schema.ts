import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email('Niepoprawny adres email.'),
    password: z.string().min(1, 'Hasło jest wymagane.'),
});

export type LoginType = z.infer<typeof loginSchema>;
