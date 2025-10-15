import type { RootState } from '@/app/store'
import type { MeResponse } from '@/features/auth/api/lib/schemas/meSchema'

import { PostSchema, type TPost } from '../schemas/postSchema'
import { baseApi } from '@/app/baseApi'
import { profileApi } from '@/entities/profile/api/profileApi'

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPost: build.query<TPost, number>({
      query: postId => `/posts/id/${postId}`,
      transformResponse: (res: unknown) => PostSchema.parse(res),
      providesTags: (_res, _err, postId) => [{ type: 'Post', id: postId }],
    }),
    updatePost: build.mutation<void, { postId: number; description: string }>({
      query: ({ postId, description }) => ({
        url: `/posts/${postId}`,
        method: 'PUT',
        body: { description },
      }),
      invalidatesTags: (_res, _err, { postId }) => [{ type: 'Post', id: postId }],
    }),
    deletePost: build.mutation<void, number>({
      query: postId => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProfilePublicInfo'],

      async onQueryStarted(postId, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled
          const state = getState() as RootState
          const authData = state.api.queries?.['me']?.data as MeResponse
          const userId = authData?.userId

          if (!postId || !userId) {
            return
          }

          dispatch(
            profileApi.util.updateQueryData('getPosts', { userId }, draft => {
              if (draft && Array.isArray(draft.items)) {
                const index = draft.items.findIndex(post => post.id === postId)

                if (index !== -1) {
                  draft.items.splice(index, 1)
                }
              }
            })
          )
        } catch (e) {
          console.error('❌ Не удалось удалить пост из кэша', e)
        }
      },
    }),
  }),
})

export const { useGetPostQuery, useUpdatePostMutation, useDeletePostMutation } = postApi
