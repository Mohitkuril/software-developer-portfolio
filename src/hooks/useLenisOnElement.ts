import Lenis from 'lenis'
import { useEffect, useRef, type RefObject } from 'react'

/**
 * Smooth scrolling for a non-root overflow container (the editor pane).
 * When `scrollResetKey` changes (e.g. active editor tab), scrolls the pane to the top.
 */
export function useLenisOnElement(
  wrapperRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  scrollResetKey: string,
) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!enabled) {
      lenisRef.current = null
      return
    }
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const content = wrapper.querySelector<HTMLElement>('.ide__editor-content')
    if (!content) return

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.35,
    })
    lenisRef.current = lenis

    let raf = 0
    const tick = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [enabled, wrapperRef])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else wrapper.scrollTop = 0
  }, [scrollResetKey, enabled, wrapperRef])
}
