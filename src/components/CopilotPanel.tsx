import { useCallback, useEffect, useRef, useState } from 'react'
import { IoPaperPlane } from 'react-icons/io5'
import { VscChromeClose, VscEdit, VscSparkle } from 'react-icons/vsc'
import { siteConfig } from '../siteConfig'
import type { FileTab } from '../types'
import { CopilotMascot } from './CopilotMascot'

type Msg = { id: string; role: 'user' | 'assistant'; text: string; at: number }

function formatMsgTime(ts: number) {
  return new Date(ts).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

function replyFor(text: string, tab: FileTab): string {
  const t = text.toLowerCase()
  if (t.includes('stack') || t.includes('tech')) {
    return 'Mohit leans on React.js, Next.js, TypeScript, Tailwind, Redux, and Mantine — open skills.json for bars and familiar-with tags.'
  }
  if (t.includes('contact') || t.includes('reach')) {
    return 'Best path is the Contact tab (contact.css) — email and socials are listed there. You can also use the form; it posts via Web3Forms.'
  }
  if (t.includes('project') || t.includes('built')) {
    return 'Check projects.js for shipped work: each card links to live demos and GitHub where available.'
  }
  if (t.includes('work') || t.includes('experience') || t.includes('job')) {
    return 'The timeline lives in experience.ts — roles, impact, and stack tags are all there.'
  }
  if (t.includes('about') || t.includes('who')) {
    return 'Start with about.html for narrative, education, and current focus areas.'
  }
  if (tab === 'readme') {
    return 'README.md is a condensed overview: about blurb, stack pills, and connect links.'
  }
  return `You're viewing ${tab} right now. Try opening another file from the explorer or press Ctrl+P. I can also answer questions about projects, stack, or contact details.`
}

type Props = {
  activeTab: FileTab
  onClose: () => void
}

export function CopilotPanel({ activeTab, onClose }: Props) {
  const { copilot } = siteConfig
  const [messages, setMessages] = useState<Msg[]>([])
  const [draft, setDraft] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  const pushExchange = useCallback(
    (userText: string) => {
      const now = Date.now()
      const uid = `u-${now}`
      setMessages((m) => [...m, { id: uid, role: 'user', text: userText, at: now }])
      window.setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: replyFor(userText, activeTab),
            at: Date.now(),
          },
        ])
      }, 420)
    },
    [activeTab],
  )

  const startNewChat = useCallback(() => {
    setMessages([])
    setDraft('')
    listRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const t = draft.trim()
    if (!t) return
    setDraft('')
    pushExchange(t)
  }

  const workspacePill = `portfolio • ${siteConfig.handle}`

  return (
    <aside className="copilot2" aria-label={copilot.panelTitle}>
      <header className="copilot2__header">
        <div className="copilot2__header-left">
          <CopilotMascot size={22} className="copilot2__header-mascot" />
          <span className="copilot2__header-title">{copilot.panelTitle}</span>
        </div>
        <div className="copilot2__header-actions">
          <button
            type="button"
            className="copilot2__icon-btn"
            aria-label="Start new chat"
            title="New chat"
            onClick={startNewChat}
          >
            <VscEdit size={16} />
          </button>
          <button type="button" className="copilot2__icon-btn" onClick={onClose} aria-label="Close panel" title="Close">
            <VscChromeClose size={16} />
          </button>
        </div>
      </header>

      <div className="copilot2__workspace-row">
        <span className="copilot2__workspace-label">WORKSPACE</span>
        <span className="copilot2__workspace-pill">
          <span className="copilot2__workspace-dot" aria-hidden />
          {workspacePill}
        </span>
      </div>

      <div className="copilot2__intro">
        <div className="copilot2__hero">
          <CopilotMascot size={56} className="copilot2__hero-mascot" />
          <h2 className="copilot2__hero-title">{copilot.greeting}</h2>
          <p className="copilot2__hero-intro">{copilot.intro}</p>
        </div>
      </div>

      <div className="copilot2__scroll" ref={listRef}>
        {messages.map((m) => (
          <div key={m.id} className={`copilot2__msg copilot2__msg--${m.role}`}>
            <div className="copilot2__msg-body">
              <p className="copilot2__msg-text">{m.text}</p>
              <time className="copilot2__msg-time" dateTime={new Date(m.at).toISOString()}>
                {formatMsgTime(m.at)}
              </time>
            </div>
          </div>
        ))}
      </div>

      <div className="copilot2__suggestions" role="group" aria-label="Suggested prompts">
        {copilot.prompts.map((p) => (
          <button key={p} type="button" className="copilot2__suggest" onClick={() => pushExchange(p)}>
            <VscSparkle className="copilot2__suggest-spark" size={14} aria-hidden />
            <span className="copilot2__suggest-text">{p}</span>
          </button>
        ))}
      </div>

      <form className="copilot2__composer" onSubmit={onSubmit}>
        <div className="copilot2__composer-inner">
          <textarea
            className="copilot2__textarea"
            placeholder={copilot.inputPlaceholder}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            aria-label="Message"
          />
          <div className="copilot2__composer-foot">
            <span className="copilot2__msgs-left">{copilot.msgsLeftLabel}</span>
            <button type="submit" className="copilot2__send-fab" aria-label="Send">
              <IoPaperPlane size={18} />
            </button>
          </div>
        </div>
        <p className="copilot2__disclaimer">{copilot.footerDisclaimer}</p>
      </form>
    </aside>
  )
}
