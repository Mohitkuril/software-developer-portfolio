import {
  VscAccount,
  VscComment,
  VscDebugAlt,
  VscExtensions,
  VscFiles,
  VscSearch,
  VscSourceControl,
} from 'react-icons/vsc'

type Props = {
  explorerOpen: boolean
  onToggleExplorer: () => void
  onOpenPalette: () => void
  copilotOpen: boolean
  onToggleCopilot: () => void
  showCopilotToggle: boolean
}

export function ActivityBar({
  explorerOpen,
  onToggleExplorer,
  onOpenPalette,
  copilotOpen,
  onToggleCopilot,
  showCopilotToggle,
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
      <button type="button" className="activity__btn activity__btn--quiet" title="Source Control" disabled>
        <VscSourceControl size={22} />
      </button>
      <button type="button" className="activity__btn activity__btn--quiet" title="Run and Debug" disabled>
        <VscDebugAlt size={22} />
      </button>
      <button type="button" className="activity__btn activity__btn--quiet" title="Extensions" disabled>
        <VscExtensions size={22} />
      </button>
      <div className="activity__spacer" />
      {showCopilotToggle && (
        <button
          type="button"
          className={`activity__btn${copilotOpen ? ' is-active' : ''}`}
          onClick={onToggleCopilot}
          title="Chat"
          aria-pressed={copilotOpen}
        >
          <VscComment size={22} />
        </button>
      )}
      <button type="button" className="activity__btn activity__btn--quiet" title="Accounts" disabled>
        <VscAccount size={22} />
      </button>
    </nav>
  )
}
