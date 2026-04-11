import { VscSourceControl, VscWarning } from 'react-icons/vsc'
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

type Props = { active: FileTab }

export function StatusBar({ active }: Props) {
  return (
    <footer className="statusbar" role="contentinfo">
      <div className="statusbar__left">
        <button type="button" className="statusbar__copilot-pill">
          <span className="statusbar__spark" aria-hidden>
            ✦
          </span>
          {siteConfig.copilot.shortName}
        </button>
        <span className="statusbar__item statusbar__item--dark">
          <VscSourceControl className="statusbar__icon" />
          {siteConfig.branch}
        </span>
        <span className="statusbar__item statusbar__item--dark">
          <VscWarning className="statusbar__icon" />
          0 ⊗ 0
        </span>
      </div>
      <div className="statusbar__center">{siteConfig.portfolioShortTitle}</div>
      <div className="statusbar__right">
        <span className="statusbar__item">{TAB_LANG[active]}</span>
        <span className="statusbar__item">UTF-8</span>
        <span className="statusbar__item">Prettier</span>
        <span className="statusbar__item statusbar__item--accent">{siteConfig.themeStatusName}</span>
      </div>
    </footer>
  )
}
