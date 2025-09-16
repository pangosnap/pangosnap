import { PostSchema, type Post } from '../schemas/postSchema'
import { baseApi } from '@/app/baseApi'

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPost: build.query<Post, number>({
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
    }),
  }),
})

export const { useGetPostQuery, useUpdatePostMutation, useDeletePostMutation } = postApi
