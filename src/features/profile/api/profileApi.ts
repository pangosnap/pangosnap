import { baseApi } from '@/app/baseApi'
import { ProfileResponse } from '@/entities/profile/model/types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => '/users/profile',
      providesTags: ['Profile'],
    }),
  }),
})
export const { useGetProfileQuery } = profileApi
