import { z } from 'zod'

export const usernameRegex = /^[a-zA-Z0-9_-]*$/

export const profileSchema = z.object({
  userName: z
    .string()
    .min(6, 'Min length is 6')
    .max(30, 'Max length is 30')
    .regex(usernameRegex, 'Allowed: letters, numbers, "_" and "-"'),
  firstName: z.string().min(1, 'Required').max(50, 'Max length is 50'),
  lastName: z.string().min(1, 'Required').max(50, 'Max length is 50'),

  city: z.string().optional(),
  country: z.string().optional(),
  region: z.string().optional(),

  dateOfBirth: z.string().optional(),

  aboutMe: z.string().min(0).max(200).nullable().optional(),
})

export type ProfilePayload = z.infer<typeof profileSchema>
