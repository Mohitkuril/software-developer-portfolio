import { useCallback, useEffect, useRef, useState } from 'react'
import { FILE_ENTRIES } from '../files'
import { siteConfig } from '../siteConfig'
import type { FileTab } from '../types'

const WELCOME = "Welcome! Type 'help' to see available commands."

const HELP_TEXT = `Available commands:
ls — list files in current directory
pwd — print working directory
cd <dir> — change directory (cd .. to go up)
cat <file> — view / open a file in the editor
open <file> — same as cat
whoami — who am I?
echo <text> — print text
date — show current date & time
git log — show recent commits
python --version — show Python version
clear — clear the terminal`

type Props = {
  onOpenFile: (id: FileTab) => void
  /** Increment from parent to reset terminal buffer */
  resetNonce?: number
}

type HistoryLine = { id: string; kind: 'out' | 'err' | 'cmd'; text: string }

function resolveFileArg(arg: string): FileTab | null {
  const a = arg.trim().toLowerCase()
  if (!a) return null
  const hit = FILE_ENTRIES.find((f) => f.fileName.toLowerCase() === a)
  return hit?.id ?? null
}

function promptPrefix(handle: string) {
  return `${handle}@portfolio:~$`
}

export function PortfolioTerminal({ onOpenFile, resetNonce = 0 }: Props) {
  const handle = siteConfig.handle
  const lineIdRef = useRef(0)
  const [history, setHistory] = useState<HistoryLine[]>([{ id: 'w', kind: 'out', text: WELCOME }])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToEnd = useCallback(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [])

  useEffect(() => {
    scrollToEnd()
  }, [history, scrollToEnd])

  useEffect(() => {
    if (resetNonce < 1) return
    lineIdRef.current = 0
    setHistory([{ id: 'w', kind: 'out', text: WELCOME }])
    setInput('')
  }, [resetNonce])

  const runLine = useCallback(
    (raw: string) => {
      const nid = () => {
        lineIdRef.current += 1
        return `t-${lineIdRef.current}`
      }
      const line = raw.trim()
      const prompt = promptPrefix(handle)

      if (!line) {
        setHistory((h) => [...h, { id: nid(), kind: 'cmd', text: `${prompt} ` }])
        return
      }

      setHistory((h) => [...h, { id: nid(), kind: 'cmd', text: `${prompt} ${line}` }])

      const [cmd0, ...restParts] = line.split(/\s+/)
      const cmd = cmd0.toLowerCase()
      const rest = restParts.join(' ').trim()

      const pushOut = (text: string) => setHistory((h) => [...h, { id: nid(), kind: 'out', text }])
      const pushErr = (text: string) => setHistory((h) => [...h, { id: nid(), kind: 'err', text }])

      if (cmd === 'help') {
        pushOut(HELP_TEXT)
        return
      }
      if (cmd === 'clear') {
        setHistory([{ id: nid(), kind: 'out', text: WELCOME }])
        return
      }
      if (cmd === 'ls') {
        pushOut(FILE_ENTRIES.map((f) => f.fileName).join('\n'))
        return
      }
      if (cmd === 'pwd') {
        pushOut(`/home/${handle}/portfolio`)
        return
      }
      if (cmd === 'cd') {
        if (!rest || rest === '~' || rest === '.') pushOut('~')
        else if (rest === '..') pushOut('~')
        else pushOut(`cd: ${rest}: No such file or directory (try ~)`)
        return
      }
      if (cmd === 'cat' || cmd === 'open') {
        const target = resolveFileArg(rest)
        if (!rest) {
          pushErr(`${cmd}: missing file operand`)
          return
        }
        if (!target) {
          pushErr(`${cmd}: ${rest}: No such file`)
          return
        }
        onOpenFile(target)
        pushOut(`Opened ${rest} in editor.`)
        return
      }
      if (cmd === 'whoami') {
        pushOut(siteConfig.displayName)
        return
      }
      if (cmd === 'echo') {
        pushOut(rest || '')
        return
      }
      if (cmd === 'date') {
        pushOut(new Date().toString())
        return
      }
      if (cmd === 'git' && rest.toLowerCase() === 'log') {
        pushOut(
          `commit 9f3a1c2\nAuthor: ${siteConfig.displayName} <${handle}@portfolio>\nDate:   2 weeks ago\n\n    polish IDE portfolio shell\n\ncommit 4d8e0b1\nAuthor: ${siteConfig.displayName} <${handle}@portfolio>\nDate:   1 month ago\n\n    add projects & skills views\n\ncommit 1a0c7ff\nAuthor: ${siteConfig.displayName} <${handle}@portfolio>\nDate:   3 months ago\n\n    initial workspace layout`,
        )
        return
      }
      if (cmd === 'python' && rest === '--version') {
        pushOut('Python 3.12.2')
        return
      }
      if (cmd === 'python') {
        pushErr(`python: use "python --version" in this sandbox`)
        return
      }

      pushErr(`Command not found: ${cmd0}. Type 'help'.`)
    },
    [handle, onOpenFile],
  )

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const v = input
      setInput('')
      runLine(v)
    }
  }

  return (
    <div className="bottom-panel__terminal bottom-panel__terminal--interactive" ref={scrollRef}>
      <div className="bottom-panel__terminal-scroll">
        {history.map((row) => (
          <pre
            key={row.id}
            className={
              row.kind === 'err'
                ? 'bottom-panel__pre bottom-panel__pre--err'
                : row.kind === 'cmd'
                  ? 'bottom-panel__pre bottom-panel__pre--cmd'
                  : 'bottom-panel__pre bottom-panel__pre--out'
            }
          >
            {row.text}
          </pre>
        ))}
        <div className="bottom-panel__prompt-block" aria-hidden="true">
          <span className="bottom-panel__prompt-stack">
            <span className="bottom-panel__prompt-user">{handle}</span>
            <span className="bottom-panel__prompt-muted">@portfolio</span>
            <span className="bottom-panel__prompt-muted">:</span>
            <span className="bottom-panel__prompt-muted">~</span>
          </span>
        </div>
        <div className="bottom-panel__input-row">
          <span className="bottom-panel__prompt-dollar">$</span>
          <input
            type="text"
            className="bottom-panel__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  )
}
