import type { RegistrationInputs } from '@/features/auth/api/lib/schemas/registrationSchema'

import { baseApi } from '@/app/baseApi'
import { type MeResponse, meSchema } from '@/features/auth/api/lib/schemas/meSchema'

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

    login: builder.mutation<{ accessToken: string }, { email: string; password: string }>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),

    googleLogin: builder.mutation<
      { accessToken: string; email: string },
      { code: string; redirectUrl?: string }
    >({
      query: body => ({
        url: '/auth/google/login',
        method: 'POST',
        body,
      }),
    }),

    confirmRegistration: builder.mutation<void, { confirmationCode: string }>({
      query: body => ({
        url: '/auth/registration-confirmation',
        method: 'POST',
        body,
      }),
    }),
    emailResending: builder.mutation<void, { email: string; baseUrl: string }>({
      query: body => ({
        url: '/auth/registration-email-resending',
        method: 'POST',
        body,
      }),
    }),
    me: builder.query<MeResponse, void>({
      query: () => '/auth/me',
      extraOptions: { dataSchema: meSchema },
      providesTags: ['Authorization'],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
    }),
    recoveryPassword: builder.mutation<void, { email: string; baseUrl: string; recaptcha: string }>(
      {
        query: body => ({
          url: '/auth/password-recovery',
          method: 'POST',
          body,
        }),
      }
    ),
    createNewPassword: builder.mutation<void, { newPassword: string; recoveryCode: string }>({
      query: body => ({
        url: '/auth/new-password',
        method: 'POST',
        body,
      }),
    }),
    resendRecoveryPassword: builder.mutation<void, { email: string; baseUrl: string }>({
      query: body => ({
        url: '/auth/password-recovery-resending',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Authorization'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(authRegApi.util.resetApiState())
        } catch (error) {
          console.error('Error during logout:', error)
        }
      },
    }),
    checkRecoveryCode: builder.mutation<void, { recoveryCode: string }>({
      query: body => ({
        url: '/auth/check-recovery-code',
        method: 'POST',
        body,
      }),
    }),
  }),
})
export const {
  useRegisterMutation,
  useLoginMutation,
  useConfirmRegistrationMutation,
  useEmailResendingMutation,
  useGoogleLoginMutation,
  useMeQuery,
  useLazyMeQuery,
  useRecoveryPasswordMutation,
  useResendRecoveryPasswordMutation,
  useCreateNewPasswordMutation,
  useLogoutMutation,
  useCheckRecoveryCodeMutation,
} = authRegApi
