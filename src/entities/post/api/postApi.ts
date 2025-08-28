import { PostSchema, type Post } from '../schemas/postSchema'
import { baseApi } from '@/app/baseApi'

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPost: build.query<Post, number>({
      query: postId => `/posts/id/${postId}`,
      transformResponse: (res: unknown) => PostSchema.parse(res),
    }),
    updatePost: build.mutation<void, { postId: number; description: string }>({
      query: ({ postId, description }) => ({
        url: `/posts/id/${postId}`,
        method: 'PUT',
        body: { description },
      }),
    }),
  }),
})

export const { useGetPostQuery, useUpdatePostMutation } = postApi
