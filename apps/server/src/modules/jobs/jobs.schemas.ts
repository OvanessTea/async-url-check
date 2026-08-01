import { z } from 'zod';

export const createJobSchema = z.object({
    urls: z
        .array(z.string())
        .min(1, 'At least one URL is required')
});

export type CreateJobInput = z.infer<typeof createJobSchema>