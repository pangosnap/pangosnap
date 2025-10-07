import { baseApi } from '@/app/baseApi'
import {
  type PostsParams,
  type PostsResponse,
  type ProfileResponse,
  type PublicUserProfileResponse,
} from '@/entities/profile/type/types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => '/users/profile',
      providesTags: ['Profile'],
    }),
    getPosts: builder.query<PostsResponse, PostsParams>({
      query: params => {
        const {
          userId,
          endCursorPostId,
          // pageSize = USER_POSTS_PAGE_SIZE,
          pageSize = 2,
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
      merge: (currentCache: PostsResponse, newData: PostsResponse, otherArgs) => {
        const existingIds = new Set(currentCache.items.map(item => item.id))
        const uniqueNewItems = newData.items.filter(item => !existingIds.has(item.id))

        currentCache.items.push(...uniqueNewItems)
      },

      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.endCursorPostId !== previousArg?.endCursorPostId,
    }),
    getPublicUserProfile: builder.query<PublicUserProfileResponse, { profileId: number }>({
      query: ({ profileId }) => `public-user/profile/${profileId}`,
      providesTags: ['Profile'],
    }),
  }),
})
export const { useGetProfileQuery, useGetPostsQuery, useGetPublicUserProfileQuery } = profileApi
