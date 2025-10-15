'use client'

import type { PostImage } from '@/entities/post/schemas/postSchema'

import { useEffect, useState } from 'react'

import useEmblaCarousel from 'embla-carousel-react'

import s from './Carousel.module.scss'

type Props = {
  images: PostImage[]
  className?: string
}

export function Carousel({ images, className }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!emblaApi) {
      return
    }
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())

    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  if (!images?.length) {
    return null
  }

  return (
    <section
      className={`${s.root} ${className ?? ''}`}
      aria-roledescription={'carousel'}
      aria-label={'Post media'}
    >
      <div className={s.viewport} ref={emblaRef}>
        <div className={s.container}>
          {images.map(img => (
            <div className={s.slide} key={img.uploadId}>
              <img src={img.url} alt={''} className={s.image} loading={'lazy'} />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <div className={s.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              type={'button'}
              className={`${s.dot} ${i === selected ? s.dotActive : ''}`}
              onClick={e => {
                e.preventDefault()
                emblaApi?.scrollTo(i)
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
