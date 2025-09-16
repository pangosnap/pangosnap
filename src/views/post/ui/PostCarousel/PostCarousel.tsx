'use client'

import type { PostImage } from '@/entities/post/schemas/postSchema'

import { useEffect, useState } from 'react'

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

import s from './postCarousel.module.scss'
type Props = { images: PostImage[] }

export function PostCarousel({ images }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    const onSelect = () => {
      const next = emblaApi.selectedScrollSnap()

      setSelected(prev => (prev === next ? prev : next))
    }

    onSelect()
    emblaApi.on('select', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  if (!images?.length) {
    return null
  }

  return (
    <section className={s.root} aria-roledescription={'carousel'} aria-label={'Post media'}>
      <div className={s.viewport} ref={emblaRef}>
        <div className={s.container}>
          {images.map((img, i) => (
            <div className={s.slide} key={img.uploadId}>
              <Image
                src={img.url}
                alt={''}
                width={img.width}
                height={img.height}
                className={s.image}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            type={'button'}
            className={s.prev}
            aria-label={'Previous slide'}
            onClick={() => emblaApi?.scrollPrev()}
          >
            <span className={s.arrow}>‹</span>
          </button>
          <button
            type={'button'}
            className={s.next}
            aria-label={'Next slide'}
            onClick={() => emblaApi?.scrollNext()}
          >
            <span className={s.arrow}>›</span>
          </button>

          <div className={s.dots} role={'tablist'} aria-label={'Slides'}>
            {images.map((_, i) => (
              <button
                key={i}
                type={'button'}
                role={'tab'}
                aria-selected={selected === i}
                aria-label={`Go to slide ${i + 1}`}
                className={selected === i ? s.dotActive : s.dot}
                onClick={() => emblaApi?.scrollTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
