'use client'

import type { Post } from '@/entities/post/schemas/postSchema'

import { PostsGrid } from './components/PostsGrid/PostsGrid'
import { RegisteredUsers } from './components/RegisteredUsers/RegisteredUsers'

import styles from './MainPage.module.scss'

type MainViewProps = {
  posts: Post[]
  registeredUsers: number
}

export function MainView({ posts, registeredUsers }: MainViewProps) {
  return (
    <div className={styles.main}>
      <RegisteredUsers totalCount={registeredUsers} />
      <PostsGrid posts={posts} />
    </div>
  )
}
