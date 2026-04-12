import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { ThemeId, ThemeMeta } from '../lib/themes'
import { VscCheck } from 'react-icons/vsc'

type Props = {
  open: boolean
  themes: ThemeMeta[]
  current: ThemeId
  onPick: (id: ThemeId) => void
  onClose: () => void
}

export function ThemePicker({ open, themes, current, onPick, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('.theme-picker')) return
      if (t.closest('.statusbar__theme-btn')) return
      if (t.closest('.statusbar__mobile-theme-btn')) return
      if (t.closest('.statusbar__copilot-link')) return
      if (t.closest('.statusbar__mobile-pill')) return
      if (t.closest('.menubar__dropdown')) return
      if (t.closest('.menubar__menu-trigger')) return
      onClose()
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className="theme-picker" role="dialog" aria-label="Color theme">
      <div className="theme-picker__title">COLOR THEME</div>
      <ul className="theme-picker__list" role="listbox">
        {themes.map((th) => (
          <li key={th.id} role="none">
            <button
              type="button"
              role="option"
              aria-selected={current === th.id}
              className={`theme-picker__row${current === th.id ? ' is-active' : ''}`}
              onClick={() => {
                onPick(th.id)
                onClose()
              }}
            >
              <span className="theme-picker__dot" style={{ background: th.dot }} aria-hidden />
              <span className="theme-picker__label">{th.label}</span>
              {current === th.id ? <VscCheck className="theme-picker__check" aria-hidden /> : null}
            </button>
          </li>
        ))}
      </ul>
    </div>,
    document.body,
  )
}
