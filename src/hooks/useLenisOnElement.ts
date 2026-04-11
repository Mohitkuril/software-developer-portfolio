import Lenis from 'lenis'
import { useEffect, type RefObject } from 'react'

/**
 * Smooth scrolling for a non-root overflow container (the editor pane).
 */
export function useLenisOnElement(wrapperRef: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
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

    let raf = 0
    const tick = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [enabled, wrapperRef])
}
