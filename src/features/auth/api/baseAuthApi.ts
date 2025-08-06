'use client'
import { RootState } from '@/app/store'
import { setAccessToken } from '@/features/auth/slice/authSlice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include', // чтобы кука с refresh-токеном отправлялась автоматически
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryWithReauth: typeof rawBaseQuery = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error && (result.error as any).status === 401) {
    // Попытка получить новый accessToken по HTTP-only cookie
    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      // сохраняем новый токен в память
      api.dispatch(setAccessToken((refreshResult.data as any).accessToken))

      // и повторяем исходный запрос
      result = await rawBaseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: builder => ({
    // Регистрация пользователя
    register: builder.mutation<
      void,
      {
        userName: string
        email: string
        password: string
        baseUrl: string
      }
    >({
      query: data => ({
        url: '/auth/registration',
        method: 'POST',
        body: data,
      }),
    }),

    // Запрос текущего пользователя
    me: builder.query<{ id: string; userName: string; email: string }, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
  }),
})

export const { useRegisterMutation, useMeQuery } = api
