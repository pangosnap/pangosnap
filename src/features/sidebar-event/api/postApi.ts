import type { CreatePostResponse, ImagesResponse } from '@/entities/post/type/types'

import { baseApi } from '@/app/baseApi'
import { profileApi } from '@/entities/profile/api/profileApi'

export const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    postsImage: builder.mutation<ImagesResponse, { file: File[] }>({
      query: ({ file }) => {
        const formData = new FormData()

        file.forEach(f => formData.append('file', f))

        return {
          url: '/posts/image',
          method: 'POST',
          body: formData,
        }
      },
    }),
    createPosts: builder.mutation<
      CreatePostResponse,
      { description: string; childrenMetadata: { uploadId: string }[] }
    >({
      query: ({ description, childrenMetadata }) => ({
        url: '/posts',
        method: 'POST',
        body: { description, childrenMetadata },
      }),
      invalidatesTags: ['ProfilePublicInfo'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: newPost } = await queryFulfilled
          const userId = newPost.ownerId

          if (!userId) {
            return
          }

          dispatch(
            profileApi.util.updateQueryData('getPosts', { userId }, draft => {
              if (draft && Array.isArray(draft.items)) {
                draft.items.unshift(newPost)
              }
            })
          )
        } catch (e) {
          console.error('❌ Не удалось добавить пост в кэш', e)
        }
      },
    }),
  }),
})

export const { usePostsImageMutation, useCreatePostsMutation } = postApi
