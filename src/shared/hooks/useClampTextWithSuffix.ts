import { type RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'

/**
 * Параметры для хука useClampTextWithSuffix
 */
type Params = {
  /** Исходный текст для обрезки */
  text: string
  /** Максимальное количество строк перед обрезкой */
  lines: number
  /** Ref контейнера, в котором отображается текст (для измерения размеров) */
  containerRef: RefObject<HTMLElement>
  /** Суффикс, который добавляется после многоточия при обрезке (например, "Show more") */
  suffix: string
}

/**
 * Результат работы хука useClampTextWithSuffix
 */
type Result = {
  /** Текст для отображения (может быть обрезан с добавлением многоточия) */
  displayText: string
  /** Флаг, указывающий был ли текст обрезан */
  isClamped: boolean
}

/**
 * Хук для интеллектуальной обрезки текста с учётом ограничения по количеству строк
 * и добавлением суффикса. Использует бинарный поиск для оптимального определения
 * точки обрезки и отслеживает изменения размеров контейнера.
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null)
 * const { displayText, isClamped } = useClampTextWithSuffix({
 *   text: "Очень длинный текст который нужно обрезать...",
 *   lines: 3,
 *   containerRef,
 *   suffix: "Read more"
 * })
 *
 * return (
 *   <div ref={containerRef}>
 *     {displayText}
 *     {isClamped && <button>{suffix}</button>}
 *   </div>
 * )
 * ```
 */

export function useClampTextWithSuffix({ text, lines, containerRef, suffix }: Params): Result {
  const [displayText, setDisplayText] = useState<string>(text)
  const [isClamped, setIsClamped] = useState<boolean>(false)

  /** Ref для скрытого элемента-зеркала, используемого для измерения текста */
  const mirrorRef = useRef<HTMLDivElement | null>(null)

  /**
   * Создаёт и возвращает скрытый элемент-зеркало для измерения размеров текста
   * Элемент позиционируется вне экрана и копирует стили целевого контейнера
   */
  const ensureMirror = useCallback(() => {
    if (mirrorRef.current) {
      return mirrorRef.current
    }
    const el = document.createElement('div')

    el.style.position = 'fixed'
    el.style.visibility = 'hidden'
    el.style.pointerEvents = 'none'
    el.style.zIndex = '-1'
    el.style.inset = '0 auto auto 0'
    el.style.whiteSpace = 'normal'
    el.style.wordBreak = 'break-word'
    el.style.overflow = 'visible'
    document.body.appendChild(el)
    mirrorRef.current = el

    return el
  }, [])

  /**
   * Измеряет высоту текста для заданной строки-кандидата
   * @param candidate - Текст для измерения
   * @returns Объект с высотой текста, высотой строки и флагом помещается ли текст в ограничение
   */
  const measure = useCallback(
    (candidate: string) => {
      const container = containerRef.current

      if (!container) {
        return { height: 0, lineHeight: 0, fits: true }
      }
      const mirror = ensureMirror()

      // Копируем все стили из целевого контейнера в зеркало
      const styles = window.getComputedStyle(container)
      const lineHeight = parseFloat(styles.lineHeight)

      mirror.style.font = styles.font
      mirror.style.fontFamily = styles.fontFamily
      mirror.style.fontSize = styles.fontSize
      mirror.style.fontWeight = styles.fontWeight as string
      mirror.style.lineHeight = styles.lineHeight
      mirror.style.letterSpacing = styles.letterSpacing
      mirror.style.width = styles.width
      mirror.style.maxWidth = styles.width
      mirror.style.padding = styles.padding
      mirror.style.border = styles.border
      mirror.style.boxSizing = styles.boxSizing

      mirror.style.width = `${container.clientWidth}px`

      mirror.textContent = candidate

      const height = mirror.scrollHeight
      const maxHeight = Math.ceil(lineHeight * lines)

      return { height, lineHeight, fits: height <= maxHeight + 0.5 }
    },
    [containerRef, ensureMirror, lines]
  )

  /**
   * Основная функция вычисления обрезанного текста
   * Использует бинарный поиск для нахождения оптимальной точки обрезки
   */
  const compute = useCallback(() => {
    const container = containerRef.current

    if (!container) {
      setDisplayText(text)
      setIsClamped(false)

      return
    }

    // Быстрая проверка: помещается ли полный текст с суффиксом
    const full = `${text}${suffix ? '' : ''}`
    const quick = measure(full)

    if (quick.fits) {
      setDisplayText(full)
      setIsClamped(false)

      return
    }

    const ellipsis = '… '
    const tail = `${ellipsis}${suffix}`

    // Бинарный поиск максимальной длины текста, которая помещается
    let lo = 0
    let hi = text.length
    let best = ''

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2)
      const candidate = text.slice(0, mid).trimEnd() + tail
      const m = measure(candidate)

      if (m.fits) {
        best = candidate
        lo = mid + 1
      } else {
        hi = mid - 1
      }
    }

    // Возвращаем текст без суффикса (суффикс рендерится отдельно в JSX)
    const withoutTail = best.endsWith(tail)
      ? best.slice(0, best.length - tail.length) + ellipsis
      : best

    setDisplayText(withoutTail || '')
    setIsClamped(true)
  }, [containerRef, measure, suffix, text])

  // Пересчитываем при изменении зависимостей и при ресайзе контейнера
  useEffect(() => {
    compute()
    const container = containerRef.current

    if (!container) {
      return
    }
    // Отслеживаем изменения размеров контейнера
    const ro = new ResizeObserver(() => compute())

    ro.observe(container)

    return () => {
      ro.disconnect()
    }
  }, [compute, containerRef])

  return useMemo(() => ({ displayText, isClamped }), [displayText, isClamped])
}
