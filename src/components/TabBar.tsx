import { getFileEntry } from '../files'
import type { FileTab } from '../types'
import { FileTypeIcon } from './FileTypeIcon'

type Props = {
  openTabs: FileTab[]
  active: FileTab
  onSelect: (id: FileTab) => void
  onClose: (id: FileTab) => void
}

export function TabBar({ openTabs, active, onSelect, onClose }: Props) {
  return (
    <div className="tabbar" role="tablist" aria-label="Open editors">
      {openTabs.map((id) => {
        const f = getFileEntry(id)
        const isActive = id === active
        return (
          <div
            key={id}
            role="presentation"
            className={`tabbar__tab${isActive ? ' is-active' : ''}`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              className="tabbar__main"
              onClick={() => onSelect(id)}
            >
              <span className="tabbar__file-icon">
                <FileTypeIcon icon={f.icon} size={14} />
              </span>
              <span className="tabbar__label">{f.fileName}</span>
            </button>
            <button
              type="button"
              className="tabbar__close-btn"
              aria-label={`Close ${f.fileName}`}
              onClick={() => onClose(id)}
            >
              ✕
            </button>
          </div>
        )
      })}
    </div>
  )
}
