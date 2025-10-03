'use client'
import type { Post } from '@/entities/post/schemas/postSchema'

import React from 'react'

import { PostCard } from '@/views/home/ui/components/PostsGrid/PostCard/PostCard'

import styles from './PostsGrid.module.scss'

type PostsGridProps = {
  posts: Post[]
}

export function PostsGrid({ posts }: PostsGridProps) {
  return (
    <section className={styles.postsSection}>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  )
}
