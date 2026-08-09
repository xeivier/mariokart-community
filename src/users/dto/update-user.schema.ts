import { z } from 'zod';

export const updateUserSchema = z
  .strictObject({
    email: z.email().optional(),
    name: z.string().min(1).max(100).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateUserInput = z.infer<typeof updateUserSchema>;