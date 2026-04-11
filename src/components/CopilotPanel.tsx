import { useCallback, useEffect, useRef, useState } from 'react'
import { IoPaperPlane } from 'react-icons/io5'
import { VscChromeClose, VscEdit, VscSparkle } from 'react-icons/vsc'
import { siteConfig } from '../siteConfig'
import type { FileTab } from '../types'
import { CopilotMascot } from './CopilotMascot'

type Msg = { id: string; role: 'user' | 'assistant'; text: string }

function replyFor(text: string, tab: FileTab): string {
  const t = text.toLowerCase()
  if (t.includes('stack') || t.includes('tech')) {
    return 'I lean on React, TypeScript, and modern CSS architecture — open skills.json for the full breakdown with proficiency bars.'
  }
  if (t.includes('contact') || t.includes('reach')) {
    return 'Best path is the Contact tab (contact.css) — email and socials are listed there. You can also use the form; it posts to Formspree when configured.'
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
  onClose?: () => void
}

export function CopilotPanel({ activeTab, onClose }: Props) {
  const { copilot } = siteConfig
  const [messages, setMessages] = useState<Msg[]>([])
  const [draft, setDraft] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  const pushExchange = useCallback(
    (userText: string) => {
      const uid = `u-${Date.now()}`
      const aid = `a-${Date.now()}`
      setMessages((m) => [...m, { id: uid, role: 'user', text: userText }])
      window.setTimeout(() => {
        setMessages((m) => [
          ...m,
          { id: aid, role: 'assistant', text: replyFor(userText, activeTab) },
        ])
      }, 420)
    },
    [activeTab],
  )

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
          <button type="button" className="copilot2__icon-btn" aria-label="Edit" title="Edit">
            <VscEdit size={16} />
          </button>
          {onClose ? (
            <button type="button" className="copilot2__icon-btn" onClick={onClose} aria-label="Close panel">
              <VscChromeClose size={16} />
            </button>
          ) : (
            <button type="button" className="copilot2__icon-btn" aria-label="Close" title="Close" disabled>
              <VscChromeClose size={16} />
            </button>
          )}
        </div>
      </header>

      <div className="copilot2__workspace-row">
        <span className="copilot2__workspace-label">WORKSPACE</span>
        <span className="copilot2__workspace-pill">
          <span className="copilot2__workspace-dot" aria-hidden />
          {workspacePill}
        </span>
      </div>

      <div className="copilot2__scroll" ref={listRef}>
        <div className="copilot2__hero">
          <CopilotMascot size={56} className="copilot2__hero-mascot" />
          <h2 className="copilot2__hero-title">{copilot.greeting}</h2>
          <p className="copilot2__hero-intro">{copilot.intro}</p>
        </div>

        {messages.map((m) => (
          <div key={m.id} className={`copilot2__msg copilot2__msg--${m.role}`}>
            {m.text}
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
