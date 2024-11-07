import { z } from 'zod';

export const useAccountSchema = () => {
  return z
    .object({
      firstname: z.string().min(1).max(50).optional(),
      lastname: z.string().min(1).max(50).optional(),
      email: z.string().email({ message: 'Email is invalid.' }).optional(),
      phone_number: z.string().optional(),
      job_title: z.string().optional(),
      role: z.enum(['admin', 'user']).optional(),
    })
    .superRefine(({ job_title, phone_number }, ctx) => {
      if (
        phone_number &&
        (phone_number.length < 7 || phone_number.length > 64)
      ) {
        ctx.addIssue({
          path: ['phone_number'],
          code: z.ZodIssueCode.custom,
          message:
            'Phone number must be between 7 and 64 characters if provided.',
        });
      }

      if (job_title && job_title.length > 100) {
        ctx.addIssue({
          path: ['job_title'],
          code: z.ZodIssueCode.custom,
          message:
            'Job title must be between 1 and 100 characters if provided.',
        });
      }
    });
};

export type UpdateAccountSchema = z.infer<ReturnType<typeof useAccountSchema>>;
