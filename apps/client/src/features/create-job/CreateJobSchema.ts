import { z } from 'zod';

export const createJobSchema = z.object({
  urls: z
    .string()
    .trim()
    .min(1, 'Добавьте хотя бы один URL')
    .refine(
      (value) => {
        const urls = value
          .split('\n')
          .map((url) => url.trim())
          .filter(Boolean);

        return urls.every((url) => {
          try {
            new URL(url);
            return true;
          } catch {
            return false;
          }
        });
      },
      'Каждая строка должна содержать корректный URL',
    ),
});

export type CreateJobInput = z.infer<typeof createJobSchema>