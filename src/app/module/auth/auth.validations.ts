import { z } from 'zod';

const authValidationZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
  }),
});

export const AuthValidation = {
  authValidationZodSchema,
};
