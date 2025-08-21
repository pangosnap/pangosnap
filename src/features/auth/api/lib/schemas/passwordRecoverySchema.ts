import { z } from 'zod'

export const passwordRecoverySchema = z.object({
  email: z.string().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
    message: 'Invalid email',
  }),
})

export type PasswordRecoveryInputs = z.infer<typeof passwordRecoverySchema>

export const createNewPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be at most 20 characters'),
    passwordConfirmation: z.string(),
  })
  .refine(data => data.newPassword === data.passwordConfirmation, {
    message: 'The passwords must match',
    path: ['passwordConfirmation'],
  })

export type CreateNewPasswordInputs = z.infer<typeof createNewPasswordSchema>
