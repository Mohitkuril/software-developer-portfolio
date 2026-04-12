import { siteConfig } from './siteConfig'

/** Same-origin PDF from /public — triggers download instead of navigation. */
export function triggerResumeDownload() {
  const a = document.createElement('a')
  a.href = siteConfig.resumeUrl
  a.download = siteConfig.resumeDownloadFileName
  a.rel = 'noopener noreferrer'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
