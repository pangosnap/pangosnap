import { baseApi } from '@/app/baseApi'
import { MeResponse, meSchema } from '@/features/auth/api/lib/schemas/meSchema'
import { RegistrationInputs } from '@/features/auth/api/lib/schemas/registrationSchema'
import { BaseQueryArg } from '@reduxjs/toolkit/query'

export type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

export type UserMetadata = {
  following: number
  followers: number
  publications: number
}

export type PublicProfile = {
  id: number
  userName: string
  aboutMe?: string
  avatars: Avatar[]
  userMetadata: UserMetadata
  hasPaymentSubscription: boolean
}

export const authRegApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    profile: builder.query<PublicProfile, { profileId: number }>({
      query: ({ profileId }) => `/public-user/profile/${profileId}`,
    }),
  }),
})

export const { useProfileQuery } = authRegApi
