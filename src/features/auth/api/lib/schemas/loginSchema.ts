import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(1, { error: 'Password is required' })
    .min(6, { error: 'Password must be at least 6 characters long' }),
})

export type LoginInputs = z.infer<typeof loginSchema>
