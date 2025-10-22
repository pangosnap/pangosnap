import { baseApi } from '@/app/baseApi'
import {
  type AvatarResponse,
  type PostsParams,
  type PostsResponse,
  type ProfileResponse,
  type PublicUserProfileResponse,
  type UpdateProfileInput,
} from '@/entities/profile/type/types'
import { USER_POSTS_PAGE_SIZE } from '@/shared/lib/constants/user.constants'

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // запрос для настроек профиля
    getProfile: builder.query<ProfileResponse, void>({
      query: () => '/users/profile',
      keepUnusedDataFor: 600,
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
        const {
          userId,
          endCursorPostId,
          pageSize = USER_POSTS_PAGE_SIZE,
          sortBy,
          sortDirection = 'desc',
        } = params

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
      keepUnusedDataFor: 300,
      providesTags: ['Posts'],
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return `${endpointName}-${queryArgs.userId}`
      },
      merge: (currentCache: PostsResponse, newData: PostsResponse) => {
        const existingIds = new Set(currentCache.items.map(item => item.id))
        const uniqueNewItems = newData.items.filter(item => !existingIds.has(item.id))

        currentCache.items.push(...uniqueNewItems)
      },

      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.endCursorPostId !== previousArg?.endCursorPostId,
    }),
    // публичный профиль с инфо которая видна всем
    getPublicUserProfile: builder.query<PublicUserProfileResponse, { profileId: number }>({
      query: ({ profileId }) => `public-user/profile/${profileId}`,
      providesTags: ['ProfilePublicInfo'],
    }),
    follow: builder.mutation<void, { selectedUserId: number }>({
      query: data => ({
        url: `users/following`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ProfilePublicInfo'],
    }),
    unfollow: builder.mutation<void, { userId: number }>({
      query: data => ({
        url: `users/follower/${data.userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProfilePublicInfo'],
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
  useFollowMutation,
  useUnfollowMutation,
} = profileApi
