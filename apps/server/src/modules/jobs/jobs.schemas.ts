import { z } from 'zod';

export const createJobSchema = z.object({
    urls: z
        .array(z.url('Введите корректный URL'))
        .min(1, 'Добавьте хотя бы один URL')
});

export type CreateJobInput = z.infer<typeof createJobSchema>