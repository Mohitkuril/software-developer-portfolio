import { useCallback, useEffect, useRef, useState } from 'react'
import type { FileTab } from '../types'
import { useLenisOnElement } from '../hooks/useLenisOnElement'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { usePortfolioMotion } from '../hooks/usePortfolioMotion'
import { ActivityBar } from './ActivityBar'
import { Breadcrumbs } from './Breadcrumbs'
import { CommandPalette } from './CommandPalette'
import { CopilotPanel } from './CopilotPanel'
import { EditorViews } from './EditorViews'
import { Explorer } from './Explorer'
import { MenuBar } from './MenuBar'
import { StatusBar } from './StatusBar'
import { TabBar } from './TabBar'
import { ThreeBackdrop } from './ThreeBackdrop'

const initialTabs: FileTab[] = ['home']

export function IdeApp() {
  const isMobile = useMediaQuery('(max-width: 900px)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const scrollRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState<FileTab>('home')
  const [openTabs, setOpenTabs] = useState<FileTab[]>(initialTabs)
  const [explorerOpen, setExplorerOpen] = useState(
    () => typeof window !== 'undefined' && !window.matchMedia('(max-width: 900px)').matches,
  )
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [copilotOpen, setCopilotOpen] = useState(false)

  const enableThree = !prefersReducedMotion && !isMobile
  const enableLenis = !prefersReducedMotion

  usePortfolioMotion(active, scrollRef)
  useLenisOnElement(scrollRef, enableLenis)

  useEffect(() => {
    if (!isMobile) setExplorerOpen(true)
  }, [isMobile])

  const collapseExplorerIfMobile = useCallback(() => {
    if (window.matchMedia('(max-width: 900px)').matches) setExplorerOpen(false)
  }, [])

  const openTab = useCallback((id: FileTab) => {
    setActive(id)
    setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]))
  }, [])

  const closeTab = useCallback(
    (id: FileTab) => {
      setOpenTabs((tabs) => {
        if (tabs.length <= 1) return tabs
        const next = tabs.filter((t) => t !== id)
        if (id === active) {
          const idx = tabs.indexOf(id)
          const fallback = tabs[idx - 1] ?? tabs[idx + 1] ?? 'home'
          setActive(fallback)
        }
        return next
      })
    },
    [active],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const tag = target?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
        return
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault()
        setExplorerOpen((v) => !v)
        return
      }

      if (e.key === 'Escape' && !typing) {
        setPaletteOpen(false)
        setCopilotOpen(false)
        if (window.matchMedia('(max-width: 900px)').matches) setExplorerOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const explorer = (
    <Explorer
      active={active}
      onOpen={openTab}
      onAfterNavigate={collapseExplorerIfMobile}
      showClose={isMobile}
      onCloseSidebar={() => setExplorerOpen(false)}
    />
  )

  return (
    <div className="ide">
      <MenuBar onOpenPalette={() => setPaletteOpen(true)} />
      <div className="ide__body">
        <ActivityBar
          explorerOpen={explorerOpen}
          onToggleExplorer={() => setExplorerOpen((v) => !v)}
          onOpenPalette={() => setPaletteOpen(true)}
          copilotOpen={copilotOpen}
          onToggleCopilot={() => setCopilotOpen((v) => !v)}
          showCopilotToggle={isMobile}
        />
        {!isMobile && explorerOpen && <div className="ide__explorer-desktop">{explorer}</div>}
        {isMobile && explorerOpen && (
          <div
            className="ide__explorer-mobile-backdrop"
            role="presentation"
            onMouseDown={() => setExplorerOpen(false)}
          >
            <div className="ide__explorer-mobile" onMouseDown={(e) => e.stopPropagation()}>
              {explorer}
            </div>
          </div>
        )}
        <main className="ide__main">
          <TabBar openTabs={openTabs} active={active} onSelect={setActive} onClose={closeTab} />
          <Breadcrumbs active={active} />
          <div ref={scrollRef} className="ide__editor-scroll ide__editor-scroll--fx">
            <ThreeBackdrop enabled={enableThree} />
            <div className="ide__editor-content">
              <EditorViews key={active} tab={active} onOpenTab={openTab} />
            </div>
          </div>
        </main>
        {!isMobile && (
          <div className="ide__copilot-desktop">
            <CopilotPanel activeTab={active} />
          </div>
        )}
        {isMobile && copilotOpen && (
          <div
            className="ide__copilot-mobile-backdrop"
            role="presentation"
            onMouseDown={() => setCopilotOpen(false)}
          >
            <div className="ide__copilot-mobile" onMouseDown={(e) => e.stopPropagation()}>
              <CopilotPanel activeTab={active} onClose={() => setCopilotOpen(false)} />
            </div>
          </div>
        )}
      </div>
      <StatusBar active={active} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onPick={openTab} />
    </div>
  )
}
