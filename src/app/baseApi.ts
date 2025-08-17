import { baseQueryWithZodValidation } from '@/shared/lib/utils/baseQueryWithZodValidation'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithZodValidation(async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      credentials: 'include',
      prepareHeaders: headers => {
        // headers.set('API-KEY', import.meta.env.VITE_API_KEY)
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('access-token')

          headers.set('Authorization', `Bearer ${token}`)
        }
      },
    })(args, api, extraOptions)

    // handleError(api, result)

    return result
  }),

  endpoints: () => ({}),
})
