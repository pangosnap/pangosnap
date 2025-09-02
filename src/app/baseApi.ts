import { baseQueryWithZodValidation } from '@/shared/lib/utils/baseQueryWithZodValidation'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Profile', 'Authorization'],

  baseQuery: baseQueryWithZodValidation(async (args, api, extraOptions) => {
    const rawBaseQuery = fetchBaseQuery({
      baseUrl: BASE_URL,
      credentials: 'include',
      prepareHeaders: headers => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('access-token')

          if (token) {
            headers.set('Authorization', `Bearer ${token}`)
          }
        }

        return headers
      },
    })

    const result = await rawBaseQuery(args, api, extraOptions)

    // handleError(api, result) // можно вернуть, когда будете готовы
    return result
  }),

  endpoints: () => ({}),
})
