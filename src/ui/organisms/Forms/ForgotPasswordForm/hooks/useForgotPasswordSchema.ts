import { z } from 'zod';

export const useForgotPasswordSchema = () => {
  return z.object({
    email: z.string().email({ message: 'Email is invalid.' }),
  });
};
