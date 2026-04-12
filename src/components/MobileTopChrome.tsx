import { VscMenu, VscSearch, VscSparkle } from 'react-icons/vsc'
import type { FileTab } from '../types'

const PATH_SEGMENT: Record<FileTab, string> = {
  home: 'home',
  about: 'about',
  projects: 'projects',
  skills: 'skills',
  experience: 'experience',
  contact: 'contact',
  readme: 'readme',
}

type Props = {
  active: FileTab
  /** When Copilot sheet is open, show ~/ copilot */
  copilotOpen: boolean
  onHamburger: () => void
  onSearch: () => void
  onCopilot: () => void
}

export function MobileTopChrome({ active, copilotOpen, onHamburger, onSearch, onCopilot }: Props) {
  const segment = copilotOpen ? 'copilot' : PATH_SEGMENT[active]

  return (
    <header className="mobile-chrome" role="banner">
      <button type="button" className="mobile-chrome__hamburger" onClick={onHamburger} aria-label="Open explorer">
        <VscMenu size={22} />
      </button>
      <span className="mobile-chrome__path" aria-live="polite">
        ~/<span className="mobile-chrome__path-seg">{segment}</span>
      </span>
      <div className="mobile-chrome__actions">
        <button
          type="button"
          className={`mobile-chrome__icon-btn${copilotOpen ? ' is-active' : ''}`}
          onClick={onCopilot}
          aria-label="Copilot chat"
          aria-pressed={copilotOpen}
        >
          <VscSparkle size={17} />
        </button>
        <button type="button" className="mobile-chrome__icon-btn" onClick={onSearch} aria-label="Search files">
          <VscSearch size={17} />
        </button>
      </div>
    </header>
  )
}
