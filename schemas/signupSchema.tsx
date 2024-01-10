import * as z from 'zod';

export const signupFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email is invalid' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters',
    })
    .max(20, {
      message: 'Password must be less than 20 characters',
    }),
  gender: z.string().min(1, {
    message: 'Gender is required',
  }),
  username: z
    .string()
    .min(6, {
      message: 'Username must be at least 8 characters',
    })
    .max(20, {
      message: 'Username must be less than 20 characters',
    }),
});

export type signupFormSchemaType = z.infer<typeof signupFormSchema>;
