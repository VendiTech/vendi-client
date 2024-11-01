import { z } from 'zod';

export const useResetPasswordSchema = () => {
  return z
    .object({
      newPassword: z.string(),
      reEnterNewPassword: z.string(),
    })
    .superRefine(({ newPassword, reEnterNewPassword }, ctx) => {
      if (newPassword !== reEnterNewPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Passwords do not match.',
          path: ['newPassword'],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Passwords do not match.',
          path: ['reEnterNewPassword'],
        });
      }
    });
};
