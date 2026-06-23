import { z } from 'zod';

export const serviceSchema = z.object({
    id: z.uuid().optional(),
    company_id: z.uuid(),
    name: z.string().min(1, 'Nazwa nie może być pusta.'),
    description: z.string().nullable().optional(),
    duration: z.number().int().positive('Czas trwania musi być dodatni.'),
    price: z.number().nonnegative('Cena musi być nieujemna.').nullable().optional(),
    image_url: z.string().nullable().optional(),
    is_active: z.boolean(),
    created_at: z.string().optional(),
});

export type ServiceType = z.infer<typeof serviceSchema>;
