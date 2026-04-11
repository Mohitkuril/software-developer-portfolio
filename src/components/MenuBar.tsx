import { siteConfig } from '../siteConfig'

const MENUS = [
  'File',
  'Edit',
  'Selection',
  'View',
  'Go',
  'Run',
  'Terminal',
  'Help',
  'Copilot',
] as const

type Props = {
  onOpenPalette: () => void
}

export function MenuBar({ onOpenPalette }: Props) {
  return (
    <header className="menubar" role="banner">
      <div className="menubar__traffic" aria-hidden="true">
        <span className="menubar__dot menubar__dot--close" />
        <span className="menubar__dot menubar__dot--min" />
        <span className="menubar__dot menubar__dot--max" />
      </div>
      <nav className="menubar__menus" aria-label="Application menu">
        {MENUS.map((label) => (
          <button key={label} type="button" className="menubar__menu-item">
            {label}
          </button>
        ))}
      </nav>
      <button type="button" className="menubar__search" onClick={onOpenPalette} aria-label="Quick open files">
        <span className="menubar__search-icon" aria-hidden>
          🔍
        </span>
        <span className="menubar__search-text">
          {siteConfig.handle} : portfolio
        </span>
        <span className="menubar__search-keys">
          <kbd>Ctrl</kbd>
          <kbd>P</kbd>
        </span>
      </button>
      <div className="menubar__tail" aria-hidden="true" />
    </header>
  )
}
