import { baseApi } from '@/app/baseApi'
import { CreatePostResponse, ImagesResponse } from '@/entities/post/type/types'

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
      invalidatesTags: ['Post'],
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
    }),
  }),
})

export const { usePostsImageMutation, useCreatePostsMutation } = postApi
