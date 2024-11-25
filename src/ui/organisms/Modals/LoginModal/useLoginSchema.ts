import { z } from 'zod';

export const useLoginSchema = () => {
  return z
    .object({
      firstname: z.string().min(1).max(50).optional(),
      lastname: z.string().min(1).max(50).optional(),
      email: z.string().email({ message: 'Email is invalid.' }).optional(),
    })
};

export type UpdateLoginSchema = z.infer<ReturnType<typeof useLoginSchema>>;
