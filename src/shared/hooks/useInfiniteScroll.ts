import { useCallback, useEffect, useRef } from 'react'

interface UseInfiniteScrollProps {
  hasMore: boolean
  isFetching: boolean
  onLoadMore: () => void
}

export const useInfiniteScroll = ({ hasMore, isFetching, onLoadMore }: UseInfiniteScrollProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const loadNextPage = useCallback(() => {
    if (!isFetching && hasMore) {
      onLoadMore()
    }
  }, [isFetching, hasMore, onLoadMore])

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) {
      return
    }

    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadNextPage()
        }
      },
      { threshold: 0.1 }
    )

    observerRef.current.observe(sentinelRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, loadNextPage])

  return { sentinelRef }
}
