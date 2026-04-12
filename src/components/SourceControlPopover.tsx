import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { VscArrowUp, VscLinkExternal, VscSourceControl } from 'react-icons/vsc'
import { siteConfig } from '../siteConfig'

type Props = {
  anchorRef: React.RefObject<HTMLElement | null>
  onClose: () => void
}

export function SourceControlPopover({ anchorRef, onClose }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 272 })

  useLayoutEffect(() => {
    const update = () => {
      const el = anchorRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const width = 272
      const gap = 8
      let left = r.right + gap
      if (left + width > window.innerWidth - 10) {
        left = Math.max(10, r.left - width - gap)
      }
      let top = r.top - 6
      const estHeight = 300
      if (top + estHeight > window.innerHeight - 10) {
        top = Math.max(10, window.innerHeight - estHeight - 10)
      }
      if (top < 10) top = 10
      setPos({ top, left, width })
    }
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [anchorRef])

  useEffect(() => {
    let removeListener: (() => void) | undefined
    const id = window.requestAnimationFrame(() => {
      const onDown = (e: MouseEvent) => {
        const t = e.target as Node
        if (anchorRef.current?.contains(t)) return
        if (rootRef.current?.contains(t)) return
        onClose()
      }
      document.addEventListener('mousedown', onDown)
      removeListener = () => document.removeEventListener('mousedown', onDown)
    })
    return () => {
      window.cancelAnimationFrame(id)
      removeListener?.()
    }
  }, [anchorRef, onClose])

  const gh = siteConfig.socialLinks.find((s) => s.id === 'github')
  const p = siteConfig.scmPanel

  const node = (
    <div
      ref={rootRef}
      className="scm-popover"
      role="dialog"
      aria-label="Source control"
      style={{ top: pos.top, left: pos.left, width: pos.width }}
    >
      <div className="scm-popover__header">Source control</div>
      <div className="scm-popover__branch-row">
        <span className="scm-popover__branch-icon" aria-hidden>
          <VscSourceControl size={16} />
        </span>
        <span className="scm-popover__branch-name">{siteConfig.branch}</span>
        <span className="scm-popover__ahead">
          <VscArrowUp size={13} aria-hidden />
          {p.commitsAhead} commit{p.commitsAhead === 1 ? '' : 's'} ahead
        </span>
      </div>
      <div className="scm-popover__sep" role="separator" />
      <div className="scm-popover__stats">
        <div className="scm-popover__stat">
          <span className="scm-popover__stat-num scm-popover__stat-num--modified">{p.modified}</span>
          <span className="scm-popover__stat-label">Modified</span>
        </div>
        <div className="scm-popover__stat">
          <span className="scm-popover__stat-num scm-popover__stat-num--added">{p.added}</span>
          <span className="scm-popover__stat-label">Added</span>
        </div>
        <div className="scm-popover__stat">
          <span className="scm-popover__stat-num scm-popover__stat-num--deleted">{p.deleted}</span>
          <span className="scm-popover__stat-label">Deleted</span>
        </div>
      </div>
      {gh ? (
        <>
          <div className="scm-popover__sep" role="separator" />
          <a className="scm-popover__github" href={gh.href} target="_blank" rel="noopener noreferrer" onClick={onClose}>
            <span>{p.viewGithubLabel}</span>
            <VscLinkExternal size={13} className="scm-popover__github-ext" aria-hidden />
          </a>
        </>
      ) : null}
    </div>
  )

  return typeof document !== 'undefined' ? createPortal(node, document.body) : null
}
