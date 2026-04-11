import AOS from 'aos'
import { useEffect, type RefObject } from 'react'

/**
 * Initializes AOS once and refreshes when the editor tab changes or optional scroll container scrolls.
 */
export function usePortfolioMotion(activeTab: string, scrollRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      offset: 28,
      once: false,
    })
  }, [])

  useEffect(() => {
    const t = window.setTimeout(() => {
      AOS.refreshHard()
    }, 0)
    return () => window.clearTimeout(t)
  }, [activeTab])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let id: number | undefined
    const onScroll = () => {
      if (id != null) cancelAnimationFrame(id)
      id = requestAnimationFrame(() => AOS.refresh())
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      if (id != null) cancelAnimationFrame(id)
    }
  }, [scrollRef])
}
