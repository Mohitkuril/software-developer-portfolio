import type { RefObject } from 'react'
import { VscCloudDownload, VscFiles, VscSearch, VscSourceControl, VscSparkle } from 'react-icons/vsc'

type Props = {
  explorerOpen: boolean
  onToggleExplorer: () => void
  onOpenPalette: () => void
  copilotOpen: boolean
  onToggleCopilot: () => void
  showCopilotToggle: boolean
  scmPopoverOpen: boolean
  onToggleScmPopover: () => void
  scmAnchorRef: RefObject<HTMLButtonElement | null>
  onDownloadResume: () => void
}

export function ActivityBar({
  explorerOpen,
  onToggleExplorer,
  onOpenPalette,
  copilotOpen,
  onToggleCopilot,
  showCopilotToggle,
  scmPopoverOpen,
  onToggleScmPopover,
  scmAnchorRef,
  onDownloadResume,
}: Props) {
  return (
    <nav className="activity" aria-label="Primary">
      <button
        type="button"
        className={`activity__btn${explorerOpen ? ' is-active' : ''}`}
        onClick={onToggleExplorer}
        title="Explorer (Ctrl+Shift+E)"
        aria-pressed={explorerOpen}
      >
        <VscFiles size={22} />
      </button>
      <button type="button" className="activity__btn" onClick={onOpenPalette} title="Search (Ctrl+P)">
        <VscSearch size={22} />
      </button>
      <button
        ref={scmAnchorRef}
        type="button"
        className={`activity__btn${scmPopoverOpen ? ' is-active' : ''}`}
        onClick={onToggleScmPopover}
        title="Source Control"
        aria-expanded={scmPopoverOpen}
        aria-haspopup="dialog"
      >
        <VscSourceControl size={22} />
      </button>
      <button type="button" className="activity__btn" onClick={onDownloadResume} title="Download resume (PDF)">
        <VscCloudDownload size={22} />
      </button>
      {showCopilotToggle ? (
        <button
          type="button"
          className={`activity__btn${copilotOpen ? ' is-active' : ''}`}
          onClick={onToggleCopilot}
          title="Copilot (Chat)"
          aria-pressed={copilotOpen}
        >
          <VscSparkle size={22} />
        </button>
      ) : null}
      <div className="activity__spacer" aria-hidden="true" />
    </nav>
  )
}
