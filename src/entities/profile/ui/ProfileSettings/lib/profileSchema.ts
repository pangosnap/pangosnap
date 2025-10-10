import { z } from 'zod'

export const usernameRegex = /^[a-zA-Z0-9_-]*$/
const ageVerification = (ymd: string) => {
  const [y, m, d] = ymd.split('-').map(Number)
  const today = new Date()

  today.setHours(0, 0, 0, 0)

  const eighteenth = new Date(y + 13, (m ?? 1) - 1, d ?? 1)

  eighteenth.setHours(0, 0, 0, 0)

  return eighteenth <= today
}

export const profileSchema = z.object({
  userName: z
    .string()
    .min(6, 'Min length is 6')
    .max(30, 'Max length is 30')
    .regex(usernameRegex, 'Allowed: letters, numbers, "_" and "-"'),
  firstName: z.string().min(1, 'Required').max(50, 'Max length is 50'),
  lastName: z.string().min(1, 'Required').max(50, 'Max length is 50'),

  city: z.string().nullish(),
  country: z.string().nullish(),
  region: z.string().nullish(),

  dateOfBirth: z
    .string()
    .optional()
    .refine(v => !v || new Date(v) <= new Date(), {
      message: 'Date cannot be in the future',
    })
    .refine(v => !v || ageVerification(v), {
      message: 'You must be at least 13 years old',
    }),

  aboutMe: z.string().min(0).max(200).nullable().optional(),
})

export type ProfilePayload = z.infer<typeof profileSchema>
