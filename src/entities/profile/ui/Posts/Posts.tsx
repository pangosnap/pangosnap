'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { USER_POSTS_PAGE_SIZE } from '@/constants/user.constants'
import { useGetPostsQuery } from '@/entities/profile/api/profileApi'
import { Post } from '@/entities/profile/ui/Posts/Post'
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll'
import { UniversalModal } from '@/shared/ui/UniversalModal/UniversalModal'

import s from './Posts.module.scss'

type PostsPropsType = {
  userId: number
  isAuthorized: boolean
}

const Posts = ({ userId, isAuthorized }: PostsPropsType) => {
  const [allPosts, setAllPosts] = useState<any[]>([])
  const [showAuthAlert, setShowAuthAlert] = useState(false)
  const [lastLoadedPostId, setLastLoadedPostId] = useState<number | undefined>(undefined)

  const {
    data: currentData,
    isLoading,
    isFetching,
    error,
  } = useGetPostsQuery({
    userId,
    pageSize: USER_POSTS_PAGE_SIZE,
    sortDirection: 'desc',
    endCursorPostId: lastLoadedPostId,
  })
  const hasMore = useMemo(
    () => allPosts.length < (currentData?.totalCount ?? 0),
    [allPosts.length, currentData]
  )

  const handleCloseModal = () => setShowAuthAlert(false)

  useEffect(() => {
    setAllPosts([])
    setLastLoadedPostId(undefined)

    return () => {
      setAllPosts([])
    }
  }, [userId])

  const loadNextPage = useCallback(() => {
    if (!isAuthorized) {
      setShowAuthAlert(true)

      return
    }

    if (!isFetching && hasMore && allPosts.length > 0) {
      const lastPost = allPosts[allPosts.length - 1]

      if (lastPost) {
        setLastLoadedPostId(lastPost.id)
      }
    }
  }, [isAuthorized, isFetching, hasMore, allPosts])

  const { sentinelRef } = useInfiniteScroll({
    hasMore,
    isFetching,
    onLoadMore: loadNextPage,
  })

  useEffect(() => {
    if (currentData?.items) {
      setAllPosts(prev => {
        return [...prev, ...currentData.items]
      })
    }
  }, [currentData])

  if (error) {
    return (
      <div className={s.posts}>
        <div className={s.posts__error}>
          <p>Error loading posts</p>
        </div>
      </div>
    )
  }

  if (allPosts.length === 0 && !isLoading) {
    return (
      <div className={s.posts}>
        <div className={s.posts__empty}>
          <p>No posts yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className={s.posts}>
      <div className={s.posts__grid}>
        {allPosts.map(post => (
          <Post key={post.id} images={post.images} likesCount={post.likesCount} />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className={s.observerTarget}>
          {isFetching && (
            <div className={s.loading}>
              <p>Loading more posts...</p>
            </div>
          )}
        </div>
      )}
      {showAuthAlert && (
        <UniversalModal open={showAuthAlert} onClose={handleCloseModal} size={'sm'}>
          To see more, please log in
        </UniversalModal>
      )}
    </div>
  )
}

export default Posts
