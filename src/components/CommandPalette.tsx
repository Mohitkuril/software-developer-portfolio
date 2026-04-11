import { useEffect, useMemo, useRef, useState } from 'react'
import { FILE_ENTRIES } from '../files'
import { siteConfig } from '../siteConfig'
import type { FileTab } from '../types'
import { FileTypeIcon } from './FileTypeIcon'

function fullPath(pathTail: string) {
  return `${siteConfig.handle} › ${pathTail}`
}

type Props = {
  open: boolean
  onClose: () => void
  onPick: (id: FileTab) => void
}

export function CommandPalette({ open, onClose, onPick }: Props) {
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return FILE_ENTRIES
    return FILE_ENTRIES.filter(
      (f) =>
        f.fileName.toLowerCase().includes(s) ||
        fullPath(f.pathTail).toLowerCase().includes(s) ||
        f.id.includes(s),
    )
  }, [q])

  useEffect(() => {
    if (open) {
      setQ('')
      queueMicrotask(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="palette-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="palette"
        role="dialog"
        aria-label="Quick open"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="palette__field">
          <span className="palette__prompt" aria-hidden>
            ⌖
          </span>
          <input
            ref={inputRef}
            className="palette__input"
            placeholder="Search files by name…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-autocomplete="list"
            aria-controls="palette-list"
          />
          <kbd className="palette__hint">Esc</kbd>
        </div>
        <ul id="palette-list" className="palette__list" role="listbox">
          {filtered.map((f) => (
            <li key={f.id} role="none">
              <button
                type="button"
                role="option"
                className="palette__item"
                onClick={() => {
                  onPick(f.id)
                  onClose()
                }}
              >
                <span className="palette__file-icon" aria-hidden>
                  <FileTypeIcon icon={f.icon} size={15} />
                </span>
                <span className="palette__name">{f.fileName}</span>
                <span className="palette__path">{fullPath(f.pathTail)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
