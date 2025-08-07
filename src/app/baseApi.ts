import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// 1) Общий API-сервис
export const baseApi = createApi({
  reducerPath: 'api', // ключ в Redux-сторе
  baseQuery: fetchBaseQuery({
    // простая обёртка над fetch
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    // для регистрации токены нам не нужны, можно убрать prepareHeaders
    // credentials: 'include',           // не обязательно
  }),
  endpoints: () => ({}),
})
