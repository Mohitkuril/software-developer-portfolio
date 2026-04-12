import { VscArrowUp, VscFolder, VscGear, VscSourceControl, VscSparkle } from 'react-icons/vsc'
import { FILE_ENTRIES } from '../files'
import type { FileTab } from '../types'
import { siteConfig } from '../siteConfig'
import { FileTypeIcon } from './FileTypeIcon'

type ExplorerLayout = 'desktop' | 'mobile'

type Props = {
  active: FileTab
  onOpen: (id: FileTab) => void
  onAfterNavigate?: () => void
  showClose?: boolean
  onCloseSidebar?: () => void
  onCopilotDockClick?: () => void
  layout?: ExplorerLayout
}

function FileList({
  active,
  onOpen,
  onAfterNavigate,
  nested,
}: {
  active: FileTab
  onOpen: (id: FileTab) => void
  onAfterNavigate?: () => void
  nested?: boolean
}) {
  return (
    <ul className={`explorer__list${nested ? ' explorer__list--nested' : ''}`}>
      {FILE_ENTRIES.map((f) => (
        <li key={f.id}>
          <button
            type="button"
            className={`explorer__file${active === f.id ? ' is-active' : ''}${nested ? ' explorer__file--nested' : ''}`}
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
          className={`explorer__file explorer__file--link${nested ? ' explorer__file--nested' : ''}`}
          href={siteConfig.resumeUrl}
          download={siteConfig.resumeDownloadFileName}
          rel="noopener noreferrer"
          onClick={() => onAfterNavigate?.()}
        >
          <FileTypeIcon icon="pdf" size={16} />
          <span className="explorer__name">{siteConfig.resumeFileLabel}</span>
        </a>
      </li>
    </ul>
  )
}

export function Explorer({
  active,
  onOpen,
  onAfterNavigate,
  showClose,
  onCloseSidebar,
  onCopilotDockClick,
  layout = 'desktop',
}: Props) {
  const { copilot } = siteConfig
  const isMobile = layout === 'mobile'

  if (isMobile) {
    return (
      <aside className="explorer explorer--mobile" aria-label="File explorer">
        <div className="explorer__head explorer__head--mobile">
          <span className="explorer__head-title explorer__head-title--mobile">EXPLORER</span>
          <div className="explorer__head-actions">
            <button type="button" className="explorer__icon-btn" disabled aria-label="Settings (coming soon)">
              <VscGear size={17} />
            </button>
            {showClose && onCloseSidebar ? (
              <button type="button" className="explorer__icon-btn" onClick={onCloseSidebar} aria-label="Close sidebar">
                ✕
              </button>
            ) : null}
          </div>
        </div>

        <div className="explorer__scroll">
          <div className="explorer__folder-row">
            <VscFolder className="explorer__folder-icon" size={18} aria-hidden />
            <span className="explorer__folder-label">{siteConfig.explorerMobileWorkspaceRoot}</span>
          </div>
          <FileList active={active} onOpen={onOpen} onAfterNavigate={onAfterNavigate} nested />
        </div>

        <button
          type="button"
          className="explorer-copilot-bar"
          onClick={() => onCopilotDockClick?.()}
          aria-label="Open Copilot chat"
        >
          <VscSparkle className="explorer-copilot-bar__spark" size={17} aria-hidden />
          <span className="explorer-copilot-bar__text">{siteConfig.explorerCopilotAskLabel}</span>
          <span className="explorer-copilot-bar__ai">AI</span>
        </button>

        <div className="explorer__foot explorer__foot--mobile">
          <span className="explorer__foot-sync">
            <VscSourceControl size={14} aria-hidden />
            {siteConfig.branch}
          </span>
          <span className="explorer__foot-git">
            <span className="explorer__git-up">
              <VscArrowUp size={13} aria-hidden />1
            </span>
            <span className="explorer__git-changes">+3</span>
          </span>
        </div>
      </aside>
    )
  }

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
      <div className="explorer__scroll explorer__scroll--desktop">
        <FileList active={active} onOpen={onOpen} onAfterNavigate={onAfterNavigate} />
      </div>

      <button
        type="button"
        className="explorer-copilot-card"
        onClick={() => onCopilotDockClick?.()}
        aria-label="Open or focus Copilot chat"
      >
        <VscSparkle className="explorer-copilot-card__spark" size={17} aria-hidden />
        <span className="explorer-copilot-card__label">
          {copilot.explorerLine1} {copilot.explorerLine2}
        </span>
        <span className="explorer-copilot-card__ai">AI</span>
      </button>

      <div className="explorer__foot">
        <span className="explorer__foot-branch">
          <VscSourceControl size={14} aria-hidden />
          {siteConfig.branch}
        </span>
        <span className="explorer__foot-git">
          <span className="explorer__git-up">
            <VscArrowUp size={13} aria-hidden />1
          </span>
          <span className="explorer__git-changes">+3</span>
        </span>
      </div>
    </aside>
  )
}
