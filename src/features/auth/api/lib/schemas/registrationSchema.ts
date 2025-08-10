import { z } from 'zod'

export const emailSchema = z.string().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
  message: 'Invalid email',
})

const passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters' })
  .max(20, { message: 'Password must be at most 20 characters' })
  .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]+$/, {
    message:
      'Password must contain at least one digit, one lowercase letter, one uppercase letter, and can include allowed special characters',
  })

export const registrationSchema = z
  .object({
    userName: z
      .string()
      .min(6, { message: 'Username must be at least 6 characters' })
      .max(30, { message: 'Username must be at most 30 characters' })
      .regex(/^[0-9A-Za-z_-]+$/, {
        message: 'Only letters, numbers, underscores and hyphens are allowed',
      }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    terms: z.boolean(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      })
    }
  })
export const emailFormSchema = z.object({
  email: emailSchema,
})
export type RegistrationInputs = z.infer<typeof registrationSchema>
export type EmailInputs = z.infer<typeof emailFormSchema>
