'use client'

import type { PostsResponse } from '@/entities/profile/type/types'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { profileApi, useGetPostsQuery } from '@/entities/profile/api/profileApi'
import { Post } from '@/entities/profile/ui/Posts/Post'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll'
import { UniversalModal } from '@/shared/ui/UniversalModal/UniversalModal'

import s from './Posts.module.scss'

type PostsPropsType = {
  userId: number
  isAuthorized: boolean
  initialItems: PostsResponse
}

export const Posts = ({ userId, isAuthorized, initialItems: initialPostsData }: PostsPropsType) => {
  const { items: initialSSRPosts, totalCount, pageSize, totalUsers } = initialPostsData
  const [showAuthAlert, setShowAuthAlert] = useState(false)
  const [lastLoadedPostId, setLastLoadedPostId] = useState<number | undefined>()
  const isHydratedRef = useRef<boolean>(false)
  const userIdRef = useRef<number>(userId)
  const dispatch = useAppDispatch()

  const dataFromCache = useAppSelector(
    state => profileApi.endpoints.getPosts.select({ userId })(state).data
  )
  const cachedPosts = dataFromCache?.items
  const hasCachedData = cachedPosts && cachedPosts.length > 0

  const { isLoading, isFetching, error } = useGetPostsQuery(
    {
      userId,
      endCursorPostId: lastLoadedPostId,
    },
    {
      // Пропускаем запрос если нет lastLoadedPostId (первая загрузка) или первый рендер после смены userId
      skip: !lastLoadedPostId || userIdRef.current !== userId,
    }
  )

  const handleCloseModal = useCallback(() => setShowAuthAlert(false), [])

  useEffect(() => {
    setLastLoadedPostId(undefined)
    userIdRef.current = userId

    return () => {
      isHydratedRef.current = false
    }
  }, [userId])

  //  Гидратация данных
  useEffect(() => {
    const shouldHydrate = !isHydratedRef.current && initialSSRPosts?.length > 0 && !hasCachedData

    if (shouldHydrate) {
      dispatch(
        profileApi.util.upsertQueryData(
          'getPosts',
          { userId },
          {
            totalCount,
            pageSize,
            totalUsers,
            items: initialSSRPosts,
          }
        )
      )

      isHydratedRef.current = true
    }
  }, [userId, initialSSRPosts, totalCount, pageSize, totalUsers, dispatch, hasCachedData])

  const dataForRender = useMemo(
    () => (hasCachedData ? cachedPosts : initialSSRPosts),
    [hasCachedData, cachedPosts, initialSSRPosts]
  )

  const hasMore = useMemo(() => {
    const currentTotalCount = dataFromCache?.totalCount ?? totalCount

    return (dataForRender?.length ?? 0) < currentTotalCount
  }, [dataFromCache?.totalCount, dataForRender?.length, totalCount])

  const loadNextPage = useCallback(() => {
    if (!isAuthorized) {
      setShowAuthAlert(true)

      return
    }

    if (!isFetching && hasMore && dataForRender?.length > 0) {
      const lastPost = dataForRender.at(-1)

      setLastLoadedPostId(lastPost?.id)
    }
  }, [isAuthorized, isFetching, hasMore, dataForRender])

  const { sentinelRef } = useInfiniteScroll({
    hasMore,
    isFetching,
    onLoadMore: loadNextPage,
  })

  const postsContent = useMemo(
    () => (
      <div className={s.posts__grid}>
        {dataForRender?.map(post => (
          <Post key={post.id} images={post.images} likesCount={post.likesCount} postId={post.id} />
        ))}
      </div>
    ),
    [dataForRender]
  )

  if (error) {
    return (
      <div className={s.posts}>
        <div className={s.posts__error}>
          <p>Error loading posts</p>
        </div>
      </div>
    )
  }

  if (dataForRender?.length === 0 && !isLoading) {
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
      {postsContent}

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
