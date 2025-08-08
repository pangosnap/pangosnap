'use client'
import { baseApi } from '@/app/baseApi'
import { RegistrationInputs } from '@/features/auth/api/lib/schemas/registrationSchema'

export const authRegApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<
      void,
      { userName: string; email: string; password: string; baseUrl: string },
      RegistrationInputs
    >({
      query: data => ({
        url: '/auth/registration',
        method: 'POST',
        body: data,
      }),
    }),
    confirmRegistration: builder.mutation<void, { confirmationCode: string }>({
      query: body => ({
        url: '/auth/registration-confirmation',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useRegisterMutation, useConfirmRegistrationMutation } = authRegApi

// const rawBaseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
//   credentials: 'include', // чтобы кука с refresh-токеном отправлялась автоматически, при запросе к нашему url
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.accessToken // смотрим access токен в redux
//
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`) // добавляем токен
//     }
//
//     return headers
//   },
// })
//
// const baseQueryWithReauth: typeof rawBaseQuery = async (args, api, extraOptions) => {
//   let result = await rawBaseQuery(args, api, extraOptions) // выполняем запрос
//
//   if (result.error?.status === 401) {
//     // Попытка получить новый accessToken по HTTP-only cookie, если его нет смотрит здесь и refreshToken
//     const refreshResult = await rawBaseQuery(
//       { url: '/auth/update-tokens', method: 'POST' },
//       api,
//       extraOptions
//     )
//
//     if (refreshResult.data) {
//       // сохраняем новый токен в память
//       const refreshData = refreshResult.data as { accessToken: string }
//
//       api.dispatch(setAccessToken(refreshData.accessToken))
//
//       // и повторяем исходный запрос
//       result = await rawBaseQuery(args, api, extraOptions)
//     }
//   }
//
//   return result
// }
//

// export const api = createApi({
//   reducerPath: 'api', //ключ в сторе
//   baseQuery: baseQueryWithReauth, //отправление HTTP
//   tagTypes: ['User'], //инвалидация тегов
//   endpoints: builder => ({
//     //запросы и мутация
//     // Регистрация пользователя
//     register: builder.mutation<
//       void,
//       {
//         userName: string
//         email: string
//         password: string
//         baseUrl: string
//       }
//     >({
//       query: data => ({
//         url: '/auth/registration',
//         method: 'POST',
//         body: data,
//       }),
//     }),
//
//     // Запрос текущего пользователя
//     me: builder.query<
//       { userId: number; userName: string; email: string; isBlocked: boolean },
//       void
//     >({
//       query: () => '/auth/me',
//       providesTags: ['User'],
//     }),
//   }),
// })
