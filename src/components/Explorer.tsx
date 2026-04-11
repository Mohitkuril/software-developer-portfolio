import { VscCheck, VscSparkle } from 'react-icons/vsc'
import { FILE_ENTRIES } from '../files'
import type { FileTab } from '../types'
import { siteConfig } from '../siteConfig'
import { FileTypeIcon } from './FileTypeIcon'

type Props = {
  active: FileTab
  onOpen: (id: FileTab) => void
  onAfterNavigate?: () => void
  showClose?: boolean
  onCloseSidebar?: () => void
}

export function Explorer({
  active,
  onOpen,
  onAfterNavigate,
  showClose,
  onCloseSidebar,
}: Props) {
  const { copilot } = siteConfig

  return (
    <aside className="explorer" aria-label="File explorer">
      <div className="explorer__head">
        <span className="explorer__head-title">{siteConfig.repoLabel}</span>
        {showClose && onCloseSidebar && (
          <button type="button" className="explorer__close" onClick={onCloseSidebar} aria-label="Close sidebar">
            ✕
          </button>
        )}
      </div>
      <ul className="explorer__list">
        {FILE_ENTRIES.map((f) => (
          <li key={f.id}>
            <button
              type="button"
              className={`explorer__file${active === f.id ? ' is-active' : ''}`}
              onClick={() => {
                onOpen(f.id)
                onAfterNavigate?.()
              }}
            >
              <FileTypeIcon icon={f.icon} size={16} />
              <span className="explorer__name">{f.fileName}</span>
            </button>
          </li>
        ))}
        <li>
          <a
            className="explorer__file explorer__file--link"
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => onAfterNavigate?.()}
          >
            <FileTypeIcon icon="pdf" size={16} />
            <span className="explorer__name">{siteConfig.resumeFileLabel}</span>
          </a>
        </li>
      </ul>

      <div className="explorer-copilot-card" role="note">
        <span className="explorer-copilot-card__badge">AI</span>
        <span className="explorer-copilot-card__spark" aria-hidden>
          <VscSparkle size={16} />
        </span>
        <div className="explorer-copilot-card__text">
          <span className="explorer-copilot-card__line1">{copilot.explorerLine1}</span>
          <span className="explorer-copilot-card__line2">{copilot.explorerLine2}</span>
        </div>
        <span className="explorer-copilot-card__open">
          open <VscCheck size={12} strokeWidth={2} />
        </span>
      </div>

      <div className="explorer__foot">
        <span className="explorer__branch">{siteConfig.branch}</span>
        <span className="explorer__sync" aria-hidden title="Synchronize">
          ⟳
        </span>
      </div>
    </aside>
  )
}
