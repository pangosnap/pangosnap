'use client'
import type { TPost } from '@/entities/post/schemas/postSchema'

import React from 'react'

import { PostCard } from '@/views/home/ui/components/PostsGrid/PostCard/PostCard'

import styles from './PostsGrid.module.scss'

type PostsGridProps = {
  posts: TPost[]
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
