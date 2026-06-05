import { useEffect, useRef, useState } from 'react'
import { DEFAULT_LAZY_SECTION_ROOT_MARGIN, LAZY_SECTION_PLACEHOLDER_CLASS } from './consts'
import type { LazySectionProps } from './types'
import styles from './styles.module.css'

export const LazySection = ({
  children,
  placeholderSize,
  rootMargin = DEFAULT_LAZY_SECTION_ROOT_MARGIN,
}: LazySectionProps) => {
  const containerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = containerRef.current

    if (!element || isVisible) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [isVisible, rootMargin])

  const placeholderClassName = LAZY_SECTION_PLACEHOLDER_CLASS[placeholderSize]

  return (
    <section ref={containerRef} className={styles.root}>
      {isVisible ? children : <div className={placeholderClassName} aria-hidden="true" />}
    </section>
  )
}
