import type { TPost } from '@/entities/post/schemas/postSchema'

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { useCarryQuery } from '@/shared/hooks/useCarryQuery'
import { useClampTextWithSuffix } from '@/shared/hooks/useClampTextWithSuffix'
import { Path } from '@/shared/routes/constants'
import { Avatar } from '@/shared/ui/Avatar'
import { Carousel } from '@/shared/ui/Carousel'
import { useTimeAgo } from '@/views/home/utils/useTimeAgo'
import Link from 'next/link'

import styles from './PostCard.module.scss'

export const POST_MAX_LINES_COLLAPSED = 3
export const POST_MAX_LINES_EXPANDED = 8

export function PostCard({ post }: { post: TPost }) {
  const [expanded, setExpanded] = useState(false)
  const toggle = () => setExpanded(prev => !prev)
  const showToggle = post.description.length > 77
  const timeAgo = useTimeAgo(post.createdAt) as string

  const textRef = useRef<HTMLParagraphElement | null>(null)
  const imageWrapRef = useRef<HTMLDivElement | null>(null)
  const [imageBaseHeight, setImageBaseHeight] = useState<number>(0)
  const [imageHeight, setImageHeight] = useState<number | undefined>(undefined)

  const href = useCarryQuery()

  const suffixLabel = useMemo(() => (expanded ? 'hide' : 'show more'), [expanded])
  const { displayText } = useClampTextWithSuffix({
    text: post.description,
    lines: expanded ? POST_MAX_LINES_EXPANDED : POST_MAX_LINES_COLLAPSED,
    containerRef: textRef as React.RefObject<HTMLElement>,
    suffix: showToggle ? suffixLabel : '',
  })

  useEffect(() => {
    const el = imageWrapRef.current

    if (!el) {
      return
    }
    const updateBase = () => {
      setImageBaseHeight(el.clientHeight)
      if (!expanded) {
        setImageHeight(undefined)
      }
    }

    updateBase()
    const ro = new ResizeObserver(updateBase)

    ro.observe(el)

    return () => ro.disconnect()
  }, [expanded])

  useLayoutEffect(() => {
    if (!expanded) {
      return
    }

    const paragraph = textRef.current
    const base = imageBaseHeight

    if (!paragraph || !base) {
      return
    }
    const styles = window.getComputedStyle(paragraph)
    const lineHeight = parseFloat(styles.lineHeight)
    const collapsedMax = Math.ceil(lineHeight * POST_MAX_LINES_COLLAPSED)
    const extra = Math.max(0, paragraph.scrollHeight - collapsedMax)
    const maxShrink = base * 0.5
    const shrink = Math.min(extra, maxShrink)

    setImageHeight(Math.max(0, base - shrink))
  }, [expanded, displayText])
  // imageBaseHeight в зависимости не добавлять

  return (
    <article className={styles.postCard}>
      <Link href={href(`/post/${post.id}`)} scroll={false}>
        <div
          className={styles.postImageWrap}
          ref={imageWrapRef}
          style={expanded && imageHeight !== undefined ? { height: `${imageHeight}px` } : undefined}
        >
          {expanded ? (
            <img src={post.images[0].url} alt={post.userName} className={styles.postImage} />
          ) : (
            <Carousel images={post.images} />
          )}
        </div>
      </Link>
      <div className={styles.postBody}>
        <Link className={styles.postHeader} href={Path.profile(post.ownerId)}>
          <div className={styles.avatarStub} aria-hidden>
            <Avatar size={'small'} alt={post.userName} src={post.avatarOwner} />
          </div>
          <div className={styles.authorBlock}>
            <div className={styles.authorName}>{post.userName}</div>
          </div>
        </Link>
        <div className={styles.timeAgo}>{timeAgo}</div>
        <div className={styles.descriptionContainer}>
          <p
            ref={textRef}
            className={styles.postText}
            style={{
              maxHeight: `${
                18 * (expanded ? POST_MAX_LINES_EXPANDED : POST_MAX_LINES_COLLAPSED)
              }px`,
            }}
          >
            <>
              {displayText}
              {showToggle && (
                <>
                  <button type={'button'} className={styles.toggleLink} onClick={toggle}>
                    {suffixLabel}
                  </button>
                </>
              )}
            </>
          </p>
        </div>
      </div>
    </article>
  )
}
