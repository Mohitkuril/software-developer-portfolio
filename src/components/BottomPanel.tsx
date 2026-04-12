import type { FileTab } from '../types'
import { siteConfig } from '../siteConfig'
import { PortfolioTerminal } from './PortfolioTerminal'

export type BottomPanelTab = 'terminal' | 'problems' | 'output'

type Props = {
  tab: BottomPanelTab
  onTab: (t: BottomPanelTab) => void
  onOpenFile: (id: FileTab) => void
  terminalResetNonce?: number
}

const TABS: { id: BottomPanelTab; label: string }[] = [
  { id: 'terminal', label: 'TERMINAL' },
  { id: 'problems', label: 'PROBLEMS' },
  { id: 'output', label: 'OUTPUT' },
]

export function BottomPanel({ tab, onTab, onOpenFile, terminalResetNonce = 0 }: Props) {
  const title = siteConfig.portfolioShortTitle

  return (
    <div className="bottom-panel" role="region" aria-label="Bottom panel">
      <div className="bottom-panel__tabs" role="tablist" aria-orientation="horizontal">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={`bottom-panel__tab${tab === id ? ' is-active' : ''}`}
            onClick={() => onTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={`bottom-panel__body${tab === 'terminal' ? ' bottom-panel__body--terminal' : ''}`}>
        {tab === 'terminal' && (
          <PortfolioTerminal onOpenFile={onOpenFile} resetNonce={terminalResetNonce} />
        )}
        {tab === 'problems' && (
          <div className="bottom-panel__placeholder">
            <span className="bottom-panel__placeholder-title">{title}</span>
            <span className="bottom-panel__placeholder-msg">No problems have been detected in the workspace.</span>
          </div>
        )}
        {tab === 'output' && (
          <div className="bottom-panel__placeholder">
            <span className="bottom-panel__placeholder-msg">No output from running tasks yet.</span>
          </div>
        )}
      </div>
    </div>
  )
}
