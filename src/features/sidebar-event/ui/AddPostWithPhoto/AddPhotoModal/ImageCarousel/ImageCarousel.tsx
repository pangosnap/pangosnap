'use client'

import type { EmblaCarouselType } from 'embla-carousel'

import { useCallback, useEffect, useState } from 'react'

import { clsx } from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'

import s from './ImageCarousel.module.scss'

type Props = {
  slides: string[]
  selectedIndex: number
  onSelectAction: (index: number) => void
  className?: string
}

export const ImageCarousel = ({ slides, selectedIndex, onSelectAction, className }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    containScroll: 'trimSnaps',
  })
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelectEmbla = useCallback(
    (api: EmblaCarouselType) => onSelectAction(api.selectedScrollSnap()),
    [onSelectAction]
  )

  useEffect(() => {
    if (!emblaApi) {
      return
    }
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelectEmbla)
    emblaApi.on('reInit', onSelectEmbla)

    return () => {
      emblaApi.off('select', onSelectEmbla)
      emblaApi.off('reInit', onSelectEmbla)
    }
  }, [emblaApi, onSelectEmbla])

  useEffect(() => {
    if (!emblaApi) {
      return
    }
    emblaApi.scrollTo(selectedIndex, true)
  }, [emblaApi, selectedIndex])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className={clsx(s.Root, className)}>
      <div className={s.Viewport} ref={emblaRef}>
        <div className={s.Container}>
          {slides.map((src, idx) => (
            <div key={idx} className={s.Slide}>
              <img className={s.Image} src={src} alt={`Photo ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>
      {scrollSnaps.length > 1 && (
        <div className={s.Controls}>
          <button type={'button'} className={s.NavButton} onClick={scrollPrev} aria-label={'Prev'}>
            ‹
          </button>
          <div className={s.Dots}>
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                type={'button'}
                className={clsx(s.Dot, i === selectedIndex && s.active)}
                onClick={() => onSelectAction(i)}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
          <button type={'button'} className={s.NavButton} onClick={scrollNext} aria-label={'Next'}>
            ›
          </button>
        </div>
      )}
    </div>
  )
}
