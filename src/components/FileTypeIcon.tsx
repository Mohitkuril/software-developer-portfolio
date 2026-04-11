import type { IconType } from 'react-icons'
import { BsFileEarmarkPdf } from 'react-icons/bs'
import { SiCss, SiHtml5, SiJavascript, SiJson, SiMarkdown, SiReact, SiTypescript } from 'react-icons/si'
import type { FileIcon } from '../types'

const ICONS: Record<FileIcon, IconType> = {
  tsx: SiReact,
  html: SiHtml5,
  js: SiJavascript,
  json: SiJson,
  ts: SiTypescript,
  css: SiCss,
  md: SiMarkdown,
  pdf: BsFileEarmarkPdf,
}

/** Brand-style colours similar to Material / VS Code file themes */
const COLORS: Record<FileIcon, string> = {
  tsx: '#61dafb',
  html: '#e34f26',
  js: '#f7df1e',
  json: '#cbcb41',
  ts: '#3178c6',
  css: '#264de4',
  md: '#519aba',
  pdf: '#e55345',
}

type Props = {
  icon: FileIcon
  size?: number
  className?: string
}

export function FileTypeIcon({ icon, size = 16, className }: Props) {
  const Cmp = ICONS[icon]
  return (
    <span className={`file-type-icon ${className ?? ''}`.trim()} aria-hidden>
      <Cmp size={size} color={COLORS[icon]} />
    </span>
  )
}
