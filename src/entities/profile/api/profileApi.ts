import { baseApi } from '@/app/baseApi'
import {
  PostsParams,
  PostsResponse,
  ProfileResponse,
  PublicUserProfileResponse,
} from '@/entities/profile/model/types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => '/users/profile',
      providesTags: ['Profile'],
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
    }),
    getPublicUserProfile: builder.query<PublicUserProfileResponse, { profileId: number }>({
      query: ({ profileId }) => `public-user/profile/${profileId}`,
    }),
  }),
})
export const { useGetProfileQuery, useGetPostsQuery, useGetPublicUserProfileQuery } = profileApi
