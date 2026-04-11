/** AOS data attributes for JSX spread (typed for React). */
export function aos(
  animation: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'flip-left' = 'fade-up',
  opts: { delay?: number; duration?: number; once?: boolean } = {},
): Record<string, string | boolean | undefined> {
  return {
    'data-aos': animation,
    'data-aos-duration': String(opts.duration ?? 680),
    'data-aos-easing': 'ease-out-cubic',
    ...(opts.delay != null ? { 'data-aos-delay': String(opts.delay) } : {}),
    ...(opts.once === true ? { 'data-aos-once': 'true' } : {}),
  }
}
