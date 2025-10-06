import { baseApi } from '@/app/baseApi'
import {
  AvatarResponse,
  PostsParams,
  PostsResponse,
  ProfileResponse,
  PublicUserProfileResponse,
  UpdateProfileInput,
} from '@/entities/profile/type/types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => '/users/profile',
      keepUnusedDataFor: 60 * 10,
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<void, UpdateProfileInput>({
      query: body => ({
        method: 'PUT',
        url: '/users/profile',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
    getPosts: builder.query<PostsResponse, PostsParams>({
      query: params => {
        const { userId, endCursorPostId, pageSize, sortBy, sortDirection } = params

        let url = `/posts/user/${userId}`

        if (endCursorPostId) {
          url += `/${endCursorPostId}`
        }

        const queryParams: Record<string, string | number> = {}

        if (pageSize) {
          queryParams.pageSize = pageSize
        }

        if (sortBy) {
          queryParams.sortBy = sortBy
        }

        if (sortDirection) {
          queryParams.sortDirection = sortDirection
        }

        return {
          url,
          method: 'GET',
          params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
        }
      },
      providesTags: ['Profile'],
    }),
    getPublicUserProfile: builder.query<PublicUserProfileResponse, { profileId: number }>({
      query: ({ profileId }) => `public-user/profile/${profileId}`,
      providesTags: ['Profile'],
    }),
    addProfilePhoto: builder.mutation<AvatarResponse, FormData>({
      query: form => ({
        method: 'POST',
        url: 'users/profile/avatar',
        body: form,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteAvatar: builder.mutation<void, void>({
      query: () => ({
        url: 'users/profile/avatar',
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})
export const {
  useGetProfileQuery,
  useGetPostsQuery,
  useGetPublicUserProfileQuery,
  useUpdateProfileMutation,
  useAddProfilePhotoMutation,
  useDeleteAvatarMutation,
} = profileApi
