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
