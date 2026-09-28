import { useCallback, useEffect, useRef, useState } from 'react'
import { IoPaperPlane } from 'react-icons/io5'
import { VscChromeClose, VscEdit, VscSparkle } from 'react-icons/vsc'
import { extractPdfText } from '../lib/extractPdfText'
import { COPILOT_LIMIT_MESSAGE, groqChat, type GroqChatMessage } from '../lib/groqChat'
import { siteConfig } from '../siteConfig'
import type { FileTab } from '../types'
import { CopilotMascot } from './CopilotMascot'

type Msg = { id: string; role: 'user' | 'assistant'; text: string; at: number }

type BootState = 'loading' | 'ready' | 'error'

function formatMsgTime(ts: number) {
  return new Date(ts).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

type Props = {
  activeTab: FileTab
  onClose: () => void
  /** Mobile full-screen sheet: shorter composer so the message thread gets more vertical space */
  compactComposer?: boolean
}

function renderTextWithBreaks(str: string): React.ReactNode {
  const parts = str.split('\n')
  return parts.map((p, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {p}
    </span>
  ))
}

function parseInlineMarkdown(text: string): React.ReactNode {
  const clean = text.replace(/<br\s*\/?>/gi, '\n')
  const parts = clean.split(/(\*\*.*?\*\*|`.*?`)/g)
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="copilot2__hl">
          {renderTextWithBreaks(part.slice(2, -2))}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={idx} className="copilot2__inline-code">
          {renderTextWithBreaks(part.slice(1, -1))}
        </code>
      )
    }
    return <span key={idx}>{renderTextWithBreaks(part)}</span>
  })
}

function renderFormattedText(text: string) {
  // Strip raw <br> tags and replace with line breaks so <br> never prints as literal text
  const cleanText = text.replace(/<br\s*\/?>/gi, '\n')
  const lines = cleanText.split('\n')
  const elements: React.ReactNode[] = []
  let listItems: React.ReactNode[] = []
  let listKey = 0

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${listKey++}`} className="copilot2__msg-list">
          {listItems}
        </ul>,
      )
      listItems = []
    }
  }

  lines.forEach((line, i) => {
    const trimmed = line.trim()
    if (!trimmed) {
      flushList()
      return
    }

    if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
      flushList()
      const headerText = trimmed.replace(/^#+\s*/, '')
      elements.push(
        <h4 key={`h-${i}`} className="copilot2__msg-h4">
          {parseInlineMarkdown(headerText)}
        </h4>,
      )
      return
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
      const itemContent = trimmed.replace(/^(-\s*|\*\s*|\d+\.\s*)/, '')
      listItems.push(
        <li key={`li-${i}`} className="copilot2__msg-li">
          <span className="copilot2__msg-bullet" aria-hidden>
            •
          </span>
          <span>{parseInlineMarkdown(itemContent)}</span>
        </li>,
      )
      return
    }

    flushList()
    elements.push(
      <p key={`p-${i}`} className="copilot2__msg-p">
        {parseInlineMarkdown(trimmed)}
      </p>,
    )
  })

  flushList()
  return elements
}

export function CopilotPanel({ activeTab, onClose, compactComposer }: Props) {
  const { copilot } = siteConfig
  const [messages, setMessages] = useState<Msg[]>([])
  const [apiThread, setApiThread] = useState<GroqChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [boot, setBoot] = useState<BootState>('loading')
  const [bootLineIndex, setBootLineIndex] = useState(0)
  const [bootError, setBootError] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [retryNonce, setRetryNonce] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  const loadResume = useCallback(
    async (signal: AbortSignal) => {
      setBoot('loading')
      setBootError(null)
      setMessages([])
      setApiThread([])
      setDraft('')

      try {
        const res = await fetch(new URL(siteConfig.resumeUrl, window.location.origin).toString(), { signal })
        if (signal.aborted) return
        if (!res.ok) {
          throw new Error('resume')
        }
        const buf = await res.arrayBuffer()
        if (signal.aborted) return
        const raw = await extractPdfText(buf)
        if (signal.aborted) return
        const clipped = raw.slice(0, 15_000)
        const systemContent = `You are Mohit's portfolio Copilot. The text below was extracted from Mohit's résumé PDF.
Answer questions accurately using this résumé and general portfolio context.

Formatting Guidelines for your responses:
- Format your response clearly using Markdown (headers like ### for key sections, **bold** for important skills/terms, and bullet points for lists).
- Group information logically into short sections (e.g., Current Role, Work Experience, Technical Skills).
- Do NOT output raw HTML tags like <br> or <br/>. Use standard markdown line breaks and bullet lists instead.
- Keep paragraphs concise and easy to read. Avoid massive walls of plain text.
- If something is not in the résumé, state clearly that you do not see it in Mohit's résumé.

--- BEGIN RÉSUMÉ TEXT ---
${clipped}
--- END RÉSUMÉ TEXT ---

The visitor is currently focused on the "${activeTab}" tab in a VS Code–style portfolio UI.`

        const systemMsg: GroqChatMessage = { role: 'system', content: systemContent }
        if (signal.aborted) return
        setApiThread([systemMsg])
        setBoot('ready')
        setMessages([])
      } catch (e) {
        if (signal.aborted) return
        console.error('Copilot resume load:', e)
        setBootError(COPILOT_LIMIT_MESSAGE)
        setBoot('error')
      }
    },
    [activeTab],
  )

  useEffect(() => {
    const ac = new AbortController()
    void loadResume(ac.signal)
    return () => ac.abort()
  }, [loadResume, retryNonce])

  useEffect(() => {
    if (boot === 'loading') setBootLineIndex(0)
  }, [boot])

  useEffect(() => {
    if (boot !== 'loading') return
    const id = window.setInterval(() => {
      setBootLineIndex((i) => (i + 1) % copilot.signInStatusLines.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [boot, copilot.signInStatusLines.length])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isSending])

  const sendUser = useCallback(
    async (userText: string) => {
      if (boot !== 'ready' || isSending) return
      const trimmed = userText.trim()
      if (!trimmed) return

      const now = Date.now()
      const uid = `u-${now}`
      setMessages((m) => [...m, { id: uid, role: 'user', text: trimmed, at: now }])

      const userMsg: GroqChatMessage = { role: 'user', content: trimmed }
      const threadForRequest = [...apiThread, userMsg]

      setIsSending(true)
      try {
        const reply = await groqChat(threadForRequest)
        setApiThread([...threadForRequest, { role: 'assistant', content: reply }])
        setMessages((m) => [
          ...m,
          { id: `a-${Date.now()}`, role: 'assistant', text: reply, at: Date.now() },
        ])
      } catch (e) {
        console.error('Copilot send:', e)
        const fallback = COPILOT_LIMIT_MESSAGE
        setApiThread([...threadForRequest, { role: 'assistant', content: fallback }])
        setMessages((m) => [
          ...m,
          { id: `a-${Date.now()}`, role: 'assistant', text: fallback, at: Date.now() },
        ])
      } finally {
        setIsSending(false)
      }
    },
    [apiThread, boot, isSending],
  )

  const startNewChat = useCallback(() => {
    setDraft('')
    setApiThread((prev) => {
      const sys = prev.find((m) => m.role === 'system')
      return sys ? [sys] : []
    })
    setMessages([])
    listRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [boot])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const t = draft.trim()
    if (!t) return
    setDraft('')
    void sendUser(t)
  }

  const workspacePill = `portfolio • ${siteConfig.handle}`
  const signLine = copilot.signInStatusLines[bootLineIndex] ?? copilot.signInStatusLines[0]

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
            disabled={boot === 'loading'}
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

      {boot === 'loading' ? (
        <div className="copilot2__boot" role="status" aria-live="polite">
          <div className="copilot2__boot-card">
            <CopilotMascot size={52} className="copilot2__boot-mascot" />
            <div className="copilot2__boot-spinner" aria-hidden />
            <p className="copilot2__boot-line">{signLine}</p>
            <p className="copilot2__boot-sub">Hang tight — résumé context is loading.</p>
          </div>
        </div>
      ) : null}

      {boot === 'error' ? (
        <div className="copilot2__error-banner" role="alert">
          <p className="copilot2__error-text">{bootError ?? COPILOT_LIMIT_MESSAGE}</p>
          <button type="button" className="copilot2__error-retry" onClick={() => setRetryNonce((n) => n + 1)}>
            Retry
          </button>
        </div>
      ) : null}

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
              <div className="copilot2__msg-text">{renderFormattedText(m.text)}</div>
              <time className="copilot2__msg-time" dateTime={new Date(m.at).toISOString()}>
                {formatMsgTime(m.at)}
              </time>
            </div>
          </div>
        ))}
        {isSending ? (
          <div className="copilot2__msg copilot2__msg--assistant copilot2__msg--pending" aria-busy>
            <div className="copilot2__msg-body">
              <div className="copilot2__typing" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <span className="copilot2__typing-label">Copilot is thinking…</span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="copilot2__suggestions" role="group" aria-label="Suggested prompts">
        {copilot.prompts.map((p) => (
          <button
            key={p}
            type="button"
            className="copilot2__suggest"
            disabled={boot !== 'ready' || isSending}
            onClick={() => void sendUser(p)}
          >
            <VscSparkle className="copilot2__suggest-spark" size={14} aria-hidden />
            <span className="copilot2__suggest-text">{p}</span>
          </button>
        ))}
      </div>

      <form className="copilot2__composer" onSubmit={onSubmit}>
        <div className="copilot2__composer-inner">
          <textarea
            className="copilot2__textarea"
            placeholder={
              boot === 'ready'
                ? copilot.inputPlaceholder
                : boot === 'loading'
                  ? 'Waiting for résumé…'
                  : COPILOT_LIMIT_MESSAGE
            }
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={compactComposer ? 2 : 3}
            aria-label="Message"
            disabled={boot !== 'ready' || isSending}
          />
          <div className="copilot2__composer-foot">
            <span className="copilot2__msgs-left">{copilot.msgsLeftLabel}</span>
            <button
              type="submit"
              className="copilot2__send-fab"
              aria-label="Send"
              disabled={boot !== 'ready' || isSending}
            >
              <IoPaperPlane size={18} />
            </button>
          </div>
        </div>
        <p className="copilot2__disclaimer">{copilot.footerDisclaimer}</p>
      </form>
    </aside>
  )
}
