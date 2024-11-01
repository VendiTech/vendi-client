import { z } from 'zod';

export const useSignInSchema = () => {
  return z.object({
    username: z.string().email({ message: 'Email is invalid.' }),
    password: z.string(),
  });
};
