import { useEffect, useState, type RefObject } from 'react'
import {
  VscChevronDown,
  VscHeart,
  VscRemote,
  VscSourceControl,
  VscWarning,
} from 'react-icons/vsc'
import { siteConfig } from '../siteConfig'
import type { FileTab } from '../types'

const TAB_LANG: Record<FileTab, string> = {
  home: 'TypeScript React',
  about: 'HTML',
  projects: 'JavaScript',
  skills: 'JSON',
  experience: 'TypeScript',
  contact: 'CSS',
  readme: 'Markdown',
}

function formatClock() {
  return new Date().toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

type Props = {
  active: FileTab
  layout?: 'desktop' | 'mobile'
  currentThemeLabel: string
  themeButtonRef: RefObject<HTMLButtonElement | null>
  onTogglePanel?: () => void
  onCopilotClick?: () => void
  onThemeClick?: () => void
}

export function StatusBar({
  active,
  layout = 'desktop',
  currentThemeLabel,
  themeButtonRef,
  onTogglePanel,
  onCopilotClick,
  onThemeClick,
}: Props) {
  const [clock, setClock] = useState(formatClock)

  useEffect(() => {
    setClock(formatClock())
    const id = window.setInterval(() => setClock(formatClock()), 15_000)
    return () => window.clearInterval(id)
  }, [])

  if (layout === 'mobile') {
    return (
      <footer className="statusbar statusbar--mobile-radium" role="contentinfo">
        <div className="statusbar__mobile-left statusbar__mobile-left--wide">
          <button
            type="button"
            className="statusbar__mobile-icon-btn"
            onClick={onTogglePanel}
            title="Toggle panel"
          >
            <span className="statusbar__mobile-warn" aria-hidden>
              <VscWarning size={14} />
            </span>
            <span className="statusbar__mobile-zero">0</span>
          </button>
          <button
            type="button"
            className="statusbar__mobile-icon-btn statusbar__mobile-branch"
            onClick={onTogglePanel}
            title="Toggle panel"
          >
            <VscSourceControl size={14} aria-hidden />
            <span>{siteConfig.branch}</span>
          </button>
          <span className="statusbar__mobile-project">
            <VscRemote size={14} aria-hidden />
            <span className="statusbar__mobile-project-text">{siteConfig.portfolioShortTitle}</span>
          </span>
        </div>
        <div className="statusbar__mobile-scroll">
          <button type="button" className="statusbar__mobile-pill" onClick={onCopilotClick}>
            Copilot
          </button>
          <span className="statusbar__mobile-pill statusbar__mobile-pill--quiet">{TAB_LANG[active]}</span>
          <span className="statusbar__mobile-pill statusbar__mobile-pill--quiet">UTF-8</span>
          <span className="statusbar__mobile-pill statusbar__mobile-pill--quiet">Prettier</span>
          <VscHeart className="statusbar__mobile-heart" size={13} aria-hidden />
          <button
            ref={themeButtonRef}
            type="button"
            className="statusbar__mobile-theme-btn"
            onClick={onThemeClick}
            aria-haspopup="dialog"
          >
            {currentThemeLabel}
          </button>
          <VscChevronDown className="statusbar__mobile-chevron" size={12} aria-hidden />
          <time className="statusbar__mobile-time" dateTime={new Date().toISOString()}>
            {clock}
          </time>
        </div>
      </footer>
    )
  }

  return (
    <footer className="statusbar statusbar--mobile-radium" role="contentinfo">
      <div className="statusbar__left statusbar__left--cluster">
        <button
          type="button"
          className="statusbar__warn-btn"
          onClick={onTogglePanel}
          title="Toggle panel"
        >
          <VscWarning className="statusbar__icon" size={14} aria-hidden />
          <span>0</span>
        </button>
        <button type="button" className="statusbar__branch-btn" onClick={onTogglePanel} title="Toggle panel">
          <VscSourceControl className="statusbar__icon" aria-hidden />
          {siteConfig.branch}
        </button>
        <span className="statusbar__project">
          <VscRemote className="statusbar__icon" size={14} aria-hidden />
          <span className="statusbar__project-text">{siteConfig.portfolioShortTitle}</span>
        </span>
      </div>
      <div className="statusbar__right statusbar__right--cluster">
        <button type="button" className="statusbar__copilot-link" onClick={onCopilotClick}>
          Copilot
        </button>
        <span className="statusbar__item">{TAB_LANG[active]}</span>
        <span className="statusbar__item">UTF-8</span>
        <span className="statusbar__item">Prettier</span>
        <VscHeart className="statusbar__heart" size={14} aria-hidden />
        <button
          ref={themeButtonRef}
          type="button"
          className="statusbar__theme-btn"
          onClick={onThemeClick}
          aria-haspopup="dialog"
        >
          {currentThemeLabel}
        </button>
        <VscChevronDown className="statusbar__chevron" size={12} aria-hidden />
        <time className="statusbar__clock" dateTime={new Date().toISOString()}>
          {clock}
        </time>
      </div>
    </footer>
  )
}
