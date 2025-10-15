import { type FC, useEffect, useState } from 'react'

import { type PostImage } from '@/entities/profile/type/types'
import { useCarryQuery } from '@/shared/hooks/useCarryQuery'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'

import s from './Post.module.scss'

type PostType = {
  images: PostImage[]
  likesCount: number
  postId: number
}

export const Post: FC<PostType> = ({ images, likesCount, postId }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
    },
    []
  )
  const href = useCarryQuery()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <Link href={href(`/post/${postId}`)} scroll={false}>
      <article className={s.post}>
        <div className={s.post__carousel}>
          <div className={s.embla} ref={emblaRef}>
            <div className={s.embla__container}>
              {images.map((image, index) => (
                <div className={s.embla__slide} key={image.uploadId}>
                  <img
                    src={image.url}
                    alt={`Post image ${index + 1}`}
                    className={s.embla__slide__img}
                    loading={'lazy'}
                  />
                </div>
              ))}
            </div>
          </div>

          {images.length > 1 && (
            <>
              <div
                className={s.embla__dots}
                onClick={e => {
                  e.preventDefault()
                }}
              >
                {images.map((_, index) => (
                  <button
                    type={'button'}
                    key={index}
                    className={`${s.embla__dot} ${
                      index === selectedIndex ? s.embla__dot__selected : ''
                    }`}
                    onClick={e => {
                      e.preventDefault()
                      emblaApi?.scrollTo(index)
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className={s.postOverlay}>
          <div className={s.stats}>
            <span className={s.stat}>❤️ {likesCount || 0}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
