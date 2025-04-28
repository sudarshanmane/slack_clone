import { z } from 'zod';

export const userSignUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3, 'Username must be least 3 charecters!'),
  password: z.string()
});
