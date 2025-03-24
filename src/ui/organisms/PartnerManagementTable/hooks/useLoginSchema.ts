import { z } from 'zod';

const zArray =  z.array(z.any())

export const useCreateLoginSchema = () => {
  return z.object({
    firstname: z.string().min(1).max(50),
    lastname: z.string().min(1).max(50),
    email: z.string().email({ message: 'Email is invalid.' }),
    permissions: zArray.min(1, { message: 'Permission must be selected' }),
    machines: zArray.min(0, { message: 'Machine must be selected' }),
    products: zArray.min(0, { message: 'Product must be selected' }),
  });
};

export const useUpdateLoginSchema = () => {
  return useCreateLoginSchema().extend({
    permissions: zArray,
    machines: zArray,
  }).partial();
};

export type CreateLoginSchema = z.infer<
  ReturnType<typeof useCreateLoginSchema>
>;
export type UpdateLoginSchema = z.infer<
  ReturnType<typeof useUpdateLoginSchema>
>;
