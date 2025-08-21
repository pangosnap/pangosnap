import { emailSchema } from '@/features/auth/api/lib/schemas/registrationSchema'
import * as z from 'zod'

export const meSchema = z.object({
  userId: z.number(),
  userName: z.string(),
  email: emailSchema,
  isBlocked: z.boolean(),
})

export type MeResponse = z.infer<typeof meSchema>
