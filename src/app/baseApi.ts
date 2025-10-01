import { baseQueryWithZodValidation } from '@/shared/lib/utils/baseQueryWithZodValidation'
import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Обычный baseQuery: кладём accessToken из localStorage, куки для refresh пойдут по credentials: 'include'
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

// Обёртка: при 401 пробуем обновить токен и повторяем исходный запрос
const baseQueryWithRefresh: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error && (result.error as any).status === 401) {
    // 1) обновляем токен (refresh в HttpOnly-куке)
    const refresh = await rawBaseQuery(
      { url: 'auth/update-tokens', method: 'POST' },
      api,
      extraOptions
    )

    const newToken = (refresh.data as any)?.accessToken

    if (newToken && typeof window !== 'undefined') {
      localStorage.setItem('access-token', newToken)

      // 2) повторяем исходный запрос уже с новым accessToken
      result = await rawBaseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Profile', 'Authorization', 'Post'],
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
})

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
//
// export const baseApi = createApi({
//   reducerPath: 'api',
//   tagTypes: ['Profile', 'Authorization', 'Post'],
//
//   baseQuery: baseQueryWithZodValidation(async (args, api, extraOptions) => {
//     const rawBaseQuery = fetchBaseQuery({
//       baseUrl: BASE_URL,
//       credentials: 'include',
//       prepareHeaders: headers => {
//         if (typeof window !== 'undefined') {
//           const token = localStorage.getItem('access-token')
//
//           if (token) {
//             headers.set('Authorization', `Bearer ${token}`)
//           }
//         }
//
//         return headers
//       },
//     })
//
//     const result = await rawBaseQuery(args, api, extraOptions)
//
//     // handleError(api, result) // можно вернуть, когда будете готовы
//     return result
//   }),
//
//   endpoints: () => ({}),
// })
