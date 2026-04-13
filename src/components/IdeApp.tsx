import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  DEFAULT_THEME_ID,
  type ThemeId,
  persistThemeId,
  readStoredThemeId,
  THEMES,
  themeLabel,
} from '../lib/themes'
import type { FileTab } from '../types'
import { useLenisOnElement } from '../hooks/useLenisOnElement'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { usePortfolioMotion } from '../hooks/usePortfolioMotion'
import { ActivityBar } from './ActivityBar'
import { SourceControlPopover } from './SourceControlPopover'
import { BottomPanel, type BottomPanelTab } from './BottomPanel'
import { Breadcrumbs } from './Breadcrumbs'
import { CommandPalette } from './CommandPalette'
import { CopilotPanel } from './CopilotPanel'
import { EditorViews } from './EditorViews'
import { Explorer } from './Explorer'
import { MenuBar } from './MenuBar'
import { MobileTopChrome } from './MobileTopChrome'
import { StatusBar } from './StatusBar'
import { TabBar } from './TabBar'
import { ThemePicker } from './ThemePicker'
import { ThreeBackdrop } from './ThreeBackdrop'
import { triggerResumeDownload } from '../resumeDownload'

const initialTabs: FileTab[] = ['home']

export function IdeApp() {
  const isMobile = useMediaQuery('(max-width: 900px)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const scrollRef = useRef<HTMLDivElement>(null)
  const themeBtnRef = useRef<HTMLButtonElement>(null)
  const scmAnchorRef = useRef<HTMLButtonElement>(null)

  const [active, setActive] = useState<FileTab>('home')
  const [openTabs, setOpenTabs] = useState<FileTab[]>(initialTabs)
  const [explorerOpen, setExplorerOpen] = useState(
    () => typeof window !== 'undefined' && !window.matchMedia('(max-width: 900px)').matches,
  )
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [scmPopoverOpen, setScmPopoverOpen] = useState(false)
  const [copilotOpen, setCopilotOpen] = useState(false)
  const [copilotDesktopOpen, setCopilotDesktopOpen] = useState(false)
  const [bottomPanelOpen, setBottomPanelOpen] = useState(false)
  const [bottomPanelTab, setBottomPanelTab] = useState<BottomPanelTab>('terminal')
  const [themeId, setThemeId] = useState<ThemeId>(() =>
    typeof window !== 'undefined' ? readStoredThemeId() : DEFAULT_THEME_ID,
  )
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const [terminalResetNonce, setTerminalResetNonce] = useState(0)
  const [uiZoom, setUiZoom] = useState(1)

  const enableThree = !prefersReducedMotion && !isMobile
  const enableLenis = !prefersReducedMotion

  usePortfolioMotion(active, scrollRef)
  useLenisOnElement(scrollRef, enableLenis, active)

  useEffect(() => {
    // Keep desktop behavior unchanged, but never auto-open explorer on mobile.
    setExplorerOpen(!isMobile)
  }, [isMobile])

  useEffect(() => {
    document.documentElement.dataset.appTheme = themeId
    persistThemeId(themeId)
  }, [themeId])

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

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'o') {
        e.preventDefault()
        setPaletteOpen(true)
        return
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b' && !typing) {
        e.preventDefault()
        setExplorerOpen((v) => !v)
        return
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c' && !typing) {
        e.preventDefault()
        if (window.matchMedia('(max-width: 900px)').matches) setCopilotOpen((v) => !v)
        else setCopilotDesktopOpen((v) => !v)
        return
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.code === 'Backquote') && !typing) {
        if (!window.matchMedia('(max-width: 900px)').matches) {
          e.preventDefault()
          setBottomPanelOpen((v) => !v)
          setBottomPanelTab('terminal')
        }
        return
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=') && !typing) {
        if (!window.matchMedia('(max-width: 900px)').matches) {
          e.preventDefault()
          setUiZoom((z) => Math.min(1.45, Math.round((z + 0.1) * 10) / 10))
        }
        return
      }

      if ((e.ctrlKey || e.metaKey) && e.key === '-' && !typing) {
        if (!window.matchMedia('(max-width: 900px)').matches) {
          e.preventDefault()
          setUiZoom((z) => Math.max(0.75, Math.round((z - 0.1) * 10) / 10))
        }
        return
      }

      if (e.key === 'F11' && !typing) {
        e.preventDefault()
        try {
          if (!document.fullscreenElement) void document.documentElement.requestFullscreen()
          else void document.exitFullscreen()
        } catch {
          /* ignore */
        }
        return
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault()
        setExplorerOpen((v) => !v)
        return
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j' && !typing) {
        if (!window.matchMedia('(max-width: 900px)').matches) {
          e.preventDefault()
          setBottomPanelOpen((v) => !v)
        }
        return
      }

      if (e.key === 'Escape' && !typing) {
        setPaletteOpen(false)
        setCopilotOpen(false)
        setCopilotDesktopOpen(false)
        setThemeMenuOpen(false)
        setBottomPanelOpen(false)
        setScmPopoverOpen(false)
        if (window.matchMedia('(max-width: 900px)').matches) setExplorerOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const copilotVisible = isMobile ? copilotOpen : copilotDesktopOpen

  const toggleCopilot = useCallback(() => {
    if (isMobile) setCopilotOpen((v) => !v)
    else setCopilotDesktopOpen((v) => !v)
  }, [isMobile])

  const closeCopilot = useCallback(() => {
    if (isMobile) setCopilotOpen(false)
    else setCopilotDesktopOpen(false)
  }, [isMobile])

  const bumpTerminalReset = useCallback(() => {
    setTerminalResetNonce((n) => n + 1)
  }, [])

  const toggleFullscreen = useCallback(() => {
    try {
      if (!document.fullscreenElement) void document.documentElement.requestFullscreen()
      else void document.exitFullscreen()
    } catch {
      /* ignore */
    }
  }, [])

  const zoomIn = useCallback(() => {
    setUiZoom((z) => Math.min(1.45, Math.round((z + 0.1) * 10) / 10))
  }, [])

  const zoomOut = useCallback(() => {
    setUiZoom((z) => Math.max(0.75, Math.round((z - 0.1) * 10) / 10))
  }, [])

  const zoomReset = useCallback(() => {
    setUiZoom(1)
  }, [])

  const explorer = (
    <Explorer
      active={active}
      onOpen={openTab}
      onAfterNavigate={collapseExplorerIfMobile}
      showClose={isMobile}
      onCloseSidebar={() => setExplorerOpen(false)}
      onCopilotDockClick={toggleCopilot}
      layout={isMobile ? 'mobile' : 'desktop'}
    />
  )

  return (
    <div
      className={`ide${isMobile ? ' ide--mobile' : ''}`}
      style={
        {
          '--chrome-top': isMobile ? 'var(--mobile-chrome-h)' : 'var(--menubar-h)',
          ...(isMobile ? {} : { zoom: uiZoom }),
        } as React.CSSProperties
      }
    >
      {isMobile ? (
        <MobileTopChrome
          active={active}
          copilotOpen={copilotOpen}
          onHamburger={() => setExplorerOpen((v) => !v)}
          onSearch={() => setPaletteOpen(true)}
          onCopilot={toggleCopilot}
        />
      ) : (
        <MenuBar
          onOpenPalette={() => setPaletteOpen(true)}
          onToggleExplorer={() => setExplorerOpen((v) => !v)}
          onToggleBottomPanel={() => {
            setBottomPanelOpen((v) => !v)
            setBottomPanelTab('terminal')
          }}
          onNewTerminal={() => {
            setBottomPanelOpen(true)
            setBottomPanelTab('terminal')
            bumpTerminalReset()
          }}
          onClearTerminal={bumpTerminalReset}
          onToggleCopilot={() => {
            if (isMobile) setCopilotOpen((v) => !v)
            else setCopilotDesktopOpen((v) => !v)
          }}
          onOpenTab={openTab}
          onOpenThemePicker={() => setThemeMenuOpen(true)}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onZoomReset={zoomReset}
          onToggleFullscreen={toggleFullscreen}
        />
      )}
      <div className="ide__body">
        {!isMobile && (
          <ActivityBar
            explorerOpen={explorerOpen}
            onToggleExplorer={() => {
              setScmPopoverOpen(false)
              setExplorerOpen((v) => !v)
            }}
            onOpenPalette={() => {
              setPaletteOpen(true)
              setScmPopoverOpen(false)
            }}
            copilotOpen={copilotVisible}
            onToggleCopilot={() => {
              setScmPopoverOpen(false)
              toggleCopilot()
            }}
            showCopilotToggle
            scmPopoverOpen={scmPopoverOpen}
            onToggleScmPopover={() => setScmPopoverOpen((v) => !v)}
            scmAnchorRef={scmAnchorRef}
            onDownloadResume={() => {
              setScmPopoverOpen(false)
              triggerResumeDownload()
            }}
          />
        )}
        {!isMobile && explorerOpen && <div className="ide__explorer-desktop">{explorer}</div>}
        <main className="ide__main">
          {!isMobile && (
            <>
              <TabBar openTabs={openTabs} active={active} onSelect={setActive} onClose={closeTab} />
              <Breadcrumbs active={active} />
            </>
          )}
          <div className="ide__editor-stack">
            <div ref={scrollRef} className="ide__editor-scroll ide__editor-scroll--fx">
              <ThreeBackdrop enabled={enableThree} />
              <div className="ide__editor-content">
                <EditorViews key={active} tab={active} onOpenTab={openTab} />
              </div>
            </div>
            {!isMobile && bottomPanelOpen ? (
              <BottomPanel
                tab={bottomPanelTab}
                onTab={setBottomPanelTab}
                onOpenFile={openTab}
                terminalResetNonce={terminalResetNonce}
              />
            ) : null}
          </div>
        </main>
        {!isMobile && copilotDesktopOpen && (
          <div className="ide__copilot-desktop">
            <CopilotPanel activeTab={active} onClose={closeCopilot} />
          </div>
        )}
      </div>
      {typeof document !== 'undefined' &&
        isMobile &&
        explorerOpen &&
        createPortal(
          <div
            className="ide__explorer-mobile-backdrop ide__overlay-root"
            role="presentation"
            onMouseDown={() => setExplorerOpen(false)}
          >
            <div className="ide__explorer-mobile" onMouseDown={(e) => e.stopPropagation()}>
              {explorer}
            </div>
          </div>,
          document.body,
        )}
      {typeof document !== 'undefined' &&
        isMobile &&
        copilotOpen &&
        createPortal(
          <div
            className="ide__copilot-mobile-backdrop ide__overlay-root"
            role="presentation"
            onMouseDown={() => setCopilotOpen(false)}
          >
            <div
              className="ide__copilot-mobile ide__copilot-mobile--full"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <CopilotPanel activeTab={active} onClose={closeCopilot} />
            </div>
          </div>,
          document.body,
        )}
      <StatusBar
        active={active}
        layout={isMobile ? 'mobile' : 'desktop'}
        currentThemeLabel={themeLabel(themeId)}
        themeButtonRef={themeBtnRef}
        onTogglePanel={() => {
          if (!isMobile) setBottomPanelOpen((v) => !v)
        }}
        onCopilotClick={toggleCopilot}
        onThemeClick={() => setThemeMenuOpen((v) => !v)}
      />
      <ThemePicker
        open={themeMenuOpen}
        themes={THEMES}
        current={themeId}
        onPick={setThemeId}
        onClose={() => setThemeMenuOpen(false)}
      />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onPick={openTab} />
      {!isMobile && scmPopoverOpen ? (
        <SourceControlPopover anchorRef={scmAnchorRef} onClose={() => setScmPopoverOpen(false)} />
      ) : null}
    </div>
  )
}
