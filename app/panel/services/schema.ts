import { z } from 'zod';

export const serviceSchema = z.object({
    id: z.uuid(),
    company_id: z.uuid(),
    name: z.string().trim().min(1, 'Nazwa nie może być pusta.'),
    description: z.string().nullable().optional(),
    duration: z.number().int().positive('Czas trwania musi być dodatni.'),
    price: z.number().nonnegative('Cena musi być nieujemna.').nullable().optional(),
    image_url: z.string().nullable().optional(),
    is_active: z.boolean(),
    created_at: z.string().optional(),
});

export const addServiceSchema = serviceSchema.pick({
    name: true,
    description: true,
    duration: true,
    price: true,
    image_url: true,
    is_active: true,
});

export const updateServiceSchema = serviceSchema.pick({
    id: true,
    name: true,
    description: true,
    duration: true,
    price: true,
    image_url: true,
    is_active: true,
});

export const deleteServiceSchema = z.object({
    serviceId: z.uuid(),
    companyId: z.uuid(),
});

export type ServiceType = z.infer<typeof serviceSchema>;
export type AddServiceType = z.infer<typeof addServiceSchema>;
export type UpdateServiceType = z.infer<typeof updateServiceSchema>;
