import { getFileEntry } from '../files'
import { siteConfig } from '../siteConfig'
import type { FileTab } from '../types'

type Props = { active: FileTab }

export function Breadcrumbs({ active }: Props) {
  const f = getFileEntry(active)
  const segments = [siteConfig.handle, ...f.pathTail.split(' › ')]
  return (
    <div className="breadcrumbs" aria-label="Breadcrumb">
      {segments.map((part, i) => (
        <span key={`${part}-${i}`} className="breadcrumbs__chunk">
          {i > 0 && <span className="breadcrumbs__sep">›</span>}
          <span className={i === segments.length - 1 ? 'breadcrumbs__current' : undefined}>{part}</span>
        </span>
      ))}
    </div>
  )
}
