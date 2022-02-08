import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import  Blog  from '../../../server/models/Blog'
import Comment from '../../../server/models/Comment'

export const blogAPI = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.PUBLIC_URL}/api/` }),
  endpoints: (builder) => ({
    getBlogs: builder.query<Blog[], void>({
      query: () => 'blogs'
    }),
    getBlogsById: builder.query<Blog, void>({
      query: (id) => `blogs/${id}`
    }),
    getComments: builder.query<Comment[], void>({
      query: () => 'blogs/comments'
    })
  })
});

export const { useGetBlogsQuery, useGetBlogsByIdQuery, useGetCommentsQuery } = blogAPI
