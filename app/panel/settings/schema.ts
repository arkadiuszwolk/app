import { z } from 'zod';

const hourRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
const hourError = 'Błędny format godziny';

export const companyHoursSchema = z.object({
    company_id: z.uuid(),
    day_of_week: z.number().int().min(1).max(7),
    is_open: z.boolean(),
    open_time: z.string().regex(hourRegex, hourError).nullable(),
    close_time: z.string().regex(hourRegex, hourError).nullable(),
    capacity: z.number().int().min(1),
});

export const companyDayOffsSchema = z.object({
    company_id: z.uuid(),
    date: z.string(),
    description: z.string(),
});

export type CompanyHoursType = z.infer<typeof companyHoursSchema>;
export type CompanyDayOffsType = z.infer<typeof companyDayOffsSchema>;
