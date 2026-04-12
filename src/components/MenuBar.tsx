import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { VscLinkExternal, VscSearch, VscSparkle } from 'react-icons/vsc'
import { FILE_ENTRIES } from '../files'
import { triggerResumeDownload } from '../resumeDownload'
import { siteConfig } from '../siteConfig'
import type { FileTab } from '../types'

const TOP_MENUS = ['File', 'Edit', 'View', 'Go', 'Run', 'Terminal', 'Help', 'Copilot'] as const
type TopMenu = (typeof TOP_MENUS)[number]

type Props = {
  onOpenPalette: () => void
  onToggleExplorer: () => void
  onToggleBottomPanel: () => void
  onNewTerminal: () => void
  onClearTerminal: () => void
  onToggleCopilot: () => void
  onOpenTab: (id: FileTab) => void
  onOpenThemePicker: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomReset: () => void
  onToggleFullscreen: () => void
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <span className="menubar__kbd">{children}</span>
}

export function MenuBar({
  onOpenPalette,
  onToggleExplorer,
  onToggleBottomPanel,
  onNewTerminal,
  onClearTerminal,
  onToggleCopilot,
  onOpenTab,
  onOpenThemePicker,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onToggleFullscreen,
}: Props) {
  const [open, setOpen] = useState<TopMenu | null>(null)
  const [ddPos, setDdPos] = useState({ top: 0, left: 0 })

  const openAt = useCallback((id: TopMenu, el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    setDdPos({ top: r.bottom, left: r.left })
    setOpen((prev) => (prev === id ? null : id))
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(null)
      }
    }
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('.menubar__dropdown') || t.closest('.menubar__menu-trigger')) return
      setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [open])

  const run = (fn: () => void) => {
    fn()
    setOpen(null)
  }

  const gh = siteConfig.socialLinks.find((s) => s.id === 'github')
  const copilotViewLabel = siteConfig.copilot.shortName

  const dropdown =
    open &&
    createPortal(
      <div
        className="menubar__dropdown"
        role="menu"
        style={{ top: ddPos.top, left: ddPos.left }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {open === 'File' && (
          <>
            <button type="button" className="menubar__dropdown-item" role="menuitem" onClick={() => run(onOpenPalette)}>
              <span>New Text File</span>
            </button>
            <button type="button" className="menubar__dropdown-item" role="menuitem" onClick={() => run(onOpenPalette)}>
              <span>Open File…</span>
              <Kbd>Ctrl+O</Kbd>
            </button>
            <div className="menubar__dropdown-sep" role="separator" />
            <button
              type="button"
              className="menubar__dropdown-item menubar__dropdown-item--disabled"
              disabled
              role="menuitem"
            >
              <span>Save</span>
              <Kbd>Ctrl+S</Kbd>
            </button>
            <div className="menubar__dropdown-sep" role="separator" />
            <button
              type="button"
              className="menubar__dropdown-item"
              role="menuitem"
              onClick={() => run(onOpenThemePicker)}
            >
              <span>Color Theme…</span>
            </button>
          </>
        )}

        {open === 'Edit' && (
          <>
            <button type="button" className="menubar__dropdown-item" role="menuitem" onClick={() => run(onOpenPalette)}>
              <span>Find…</span>
              <Kbd>Ctrl+P</Kbd>
            </button>
            <div className="menubar__dropdown-sep" role="separator" />
            <button
              type="button"
              className="menubar__dropdown-item"
              role="menuitem"
              onClick={() =>
                run(() => {
                  try {
                    document.execCommand('selectAll')
                  } catch {
                    /* ignore */
                  }
                })
              }
            >
              <span>Select All</span>
              <Kbd>Ctrl+A</Kbd>
            </button>
            <button
              type="button"
              className="menubar__dropdown-item"
              role="menuitem"
              onClick={() =>
                run(() => {
                  try {
                    void document.execCommand('copy')
                  } catch {
                    /* ignore */
                  }
                })
              }
            >
              <span>Copy</span>
              <Kbd>Ctrl+C</Kbd>
            </button>
          </>
        )}

        {open === 'View' && (
          <>
            <button type="button" className="menubar__dropdown-item is-active" role="menuitem" onClick={() => run(onOpenPalette)}>
              <span>Command Palette</span>
              <Kbd>Ctrl+P</Kbd>
            </button>
            <button type="button" className="menubar__dropdown-item" role="menuitem" onClick={() => run(onToggleExplorer)}>
              <span>Toggle Sidebar</span>
              <Kbd>Ctrl+B</Kbd>
            </button>
            <button type="button" className="menubar__dropdown-item" role="menuitem" onClick={() => run(onToggleBottomPanel)}>
              <span>Toggle Terminal</span>
              <Kbd>Ctrl+`</Kbd>
            </button>
            <button
              type="button"
              className="menubar__dropdown-item menubar__dropdown-item--copilot"
              role="menuitem"
              onClick={() => run(onToggleCopilot)}
            >
              <span className="menubar__dropdown-copilot-inner">
                <VscSparkle size={14} aria-hidden />
                {copilotViewLabel}
              </span>
              <Kbd>Ctrl+Shift+C</Kbd>
            </button>
            <div className="menubar__dropdown-sep" role="separator" />
            <button type="button" className="menubar__dropdown-item" role="menuitem" onClick={() => run(onToggleFullscreen)}>
              <span>Enter Full Screen</span>
              <Kbd>F11</Kbd>
            </button>
            <button type="button" className="menubar__dropdown-item" role="menuitem" onClick={() => run(onZoomIn)}>
              <span>Zoom In</span>
              <Kbd>Ctrl++</Kbd>
            </button>
            <button type="button" className="menubar__dropdown-item" role="menuitem" onClick={() => run(onZoomOut)}>
              <span>Zoom Out</span>
              <Kbd>Ctrl+-</Kbd>
            </button>
            <button type="button" className="menubar__dropdown-item" role="menuitem" onClick={() => run(onZoomReset)}>
              <span>Reset Zoom</span>
            </button>
          </>
        )}

        {open === 'Go' && (
          <>
            <div className="menubar__dropdown-header">
              <span>Go to File…</span>
              <Kbd>Ctrl+P</Kbd>
            </div>
            <div className="menubar__dropdown-section-label">FILES</div>
            {FILE_ENTRIES.map((f) => (
              <button
                key={f.id}
                type="button"
                className="menubar__dropdown-item menubar__dropdown-item--file"
                role="menuitem"
                onClick={() =>
                  run(() => {
                    onOpenTab(f.id)
                  })
                }
              >
                <span>{f.fileName}</span>
              </button>
            ))}
            <button
              type="button"
              className="menubar__dropdown-item menubar__dropdown-item--file"
              role="menuitem"
              onClick={() =>
                run(() => {
                  triggerResumeDownload()
                })
              }
            >
              <span>{siteConfig.resumeFileLabel}</span>
            </button>
          </>
        )}

        {open === 'Run' && (
          <>
            <button type="button" className="menubar__dropdown-item menubar__dropdown-item--disabled" disabled role="menuitem">
              <span>Start Debugging</span>
              <Kbd>F5</Kbd>
            </button>
            <button type="button" className="menubar__dropdown-item menubar__dropdown-item--disabled" disabled role="menuitem">
              <span>Run Without Debugging</span>
              <Kbd>Ctrl+F5</Kbd>
            </button>
          </>
        )}

        {open === 'Terminal' && (
          <>
            <button type="button" className="menubar__dropdown-item is-active" role="menuitem" onClick={() => run(onNewTerminal)}>
              <span>New Terminal</span>
              <Kbd>Ctrl+`</Kbd>
            </button>
            <div className="menubar__dropdown-sep" role="separator" />
            <button type="button" className="menubar__dropdown-item" role="menuitem" onClick={() => run(onToggleBottomPanel)}>
              <span>Toggle Terminal</span>
              <Kbd>Ctrl+`</Kbd>
            </button>
            <div className="menubar__dropdown-sep" role="separator" />
            <button type="button" className="menubar__dropdown-item" role="menuitem" onClick={() => run(onClearTerminal)}>
              <span>Clear Terminal</span>
            </button>
          </>
        )}

        {open === 'Help' && (
          <>
            <button type="button" className="menubar__dropdown-item is-active" role="menuitem" onClick={() => run(onOpenPalette)}>
              <span>Command Palette</span>
              <Kbd>Ctrl+P</Kbd>
            </button>
            <div className="menubar__dropdown-section-label menubar__dropdown-section-label--pad">KEYBOARD SHORTCUTS</div>
            <div className="menubar__dropdown-shortcuts" role="presentation">
              <div className="menubar__shortcut-row">
                <Kbd>Ctrl+P</Kbd>
                <span>Go to file</span>
              </div>
              <div className="menubar__shortcut-row">
                <Kbd>Ctrl+B</Kbd>
                <span>Toggle sidebar</span>
              </div>
              <div className="menubar__shortcut-row">
                <Kbd>Ctrl+`</Kbd>
                <span>Toggle terminal</span>
              </div>
              <div className="menubar__shortcut-row">
                <Kbd>Ctrl+Shift+C</Kbd>
                <span>Toggle Copilot ✨</span>
              </div>
              <div className="menubar__shortcut-row">
                <Kbd>Esc</Kbd>
                <span>Close overlay</span>
              </div>
            </div>
            <div className="menubar__dropdown-sep" role="separator" />
            {gh ? (
              <a className="menubar__dropdown-item menubar__dropdown-link" role="menuitem" href={gh.href} target="_blank" rel="noreferrer" onClick={() => setOpen(null)}>
                <span>
                  GitHub <VscLinkExternal size={12} className="menubar__dropdown-ext" aria-hidden />
                </span>
              </a>
            ) : null}
            <button type="button" className="menubar__dropdown-item" role="menuitem" onClick={() => run(() => onOpenTab('about'))}>
              <span>About</span>
            </button>
          </>
        )}

        {open === 'Copilot' && (
          <button type="button" className="menubar__dropdown-item menubar__dropdown-item--copilot" role="menuitem" onClick={() => run(onToggleCopilot)}>
            <span className="menubar__dropdown-copilot-inner">
              <VscSparkle size={14} aria-hidden />
              Open {copilotViewLabel}
            </span>
            <Kbd>Ctrl+Shift+C</Kbd>
          </button>
        )}
      </div>,
      document.body,
    )

  const quickOpenRepo = siteConfig.repoLabel.toLowerCase()

  return (
    <header className="menubar" role="banner">
      <div className="menubar__left">
        <div className="menubar__traffic" aria-hidden="true">
          <span className="menubar__dot menubar__dot--close" />
          <span className="menubar__dot menubar__dot--min" />
          <span className="menubar__dot menubar__dot--max" />
        </div>
        <nav className="menubar__menus" aria-label="Application menu">
          {TOP_MENUS.map((label) => (
            <button
              key={label}
              type="button"
              className={`menubar__menu-item menubar__menu-trigger${open === label ? ' is-open' : ''}`}
              aria-haspopup="menu"
              aria-expanded={open === label}
              onClick={(e) => openAt(label, e.currentTarget)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="menubar__center">
        <button type="button" className="menubar__search" onClick={onOpenPalette} aria-label="Quick open files">
          <span className="menubar__search-icon" aria-hidden>
            <VscSearch size={14} />
          </span>
          <span className="menubar__search-text">
            <span className="menubar__search-handle">{siteConfig.handle}</span>
            <span className="menubar__search-sep"> : </span>
            <span className="menubar__search-repo">{quickOpenRepo}</span>
          </span>
          <span className="menubar__search-keys">
            <kbd>Ctrl</kbd>
            <kbd>P</kbd>
          </span>
        </button>
      </div>
      <div className="menubar__right" aria-hidden="true" />
      {dropdown}
    </header>
  )
}
