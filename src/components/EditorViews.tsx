import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { SiMantine, SiNextdotjs, SiReact, SiRedux, SiTailwindcss, SiTypescript } from 'react-icons/si'
import { VscCloudDownload, VscCode, VscLinkExternal } from 'react-icons/vsc'
import { aos } from '../lib/motion'
import { triggerResumeDownload } from '../resumeDownload'
import { siteConfig } from '../siteConfig'
import type { FileTab } from '../types'

type Props = {
  tab: FileTab
  onOpenTab: (id: FileTab) => void
}

function ContactChannelIcon({ id }: { id: string }) {
  switch (id) {
    case 'email':
      return <FaEnvelope />
    case 'linkedin':
      return <FaLinkedin />
    case 'github':
      return <FaGithub />
    default:
      return null
  }
}

const socialIcon = (id: string) => {
  switch (id) {
    case 'github':
      return <FaGithub />
    case 'linkedin':
      return <FaLinkedin />
    case 'email':
      return <FaEnvelope />
    case 'twitter':
      return <FaXTwitter />
    default:
      return null
  }
}

function HomeView({ onOpenTab }: { onOpenTab: (id: FileTab) => void }) {
  const c = siteConfig
  return (
    <article className="editor-view page page--home">
      <p className="page-code-comment" {...aos('fade-down', { duration: 520 })}>
        {c.homeComment}
      </p>
      <h1 className="hero-title" {...aos('zoom-in', { duration: 780 })}>
        <span className="hero-title__first">{c.nameFirst}</span>{' '}
        <span className="hero-title__last">{c.nameLast}</span>
      </h1>
      <div className="badge-row" {...aos('fade-up', { delay: 90 })}>
        {c.roleBadges.map((b) =>
          'href' in b && typeof b.href === 'string' && b.href ? (
            <a key={b.label} className={`badge badge--${b.tone}`} href={b.href} target="_blank" rel="noreferrer">
              {b.label}
            </a>
          ) : (
            <span key={b.label} className={`badge badge--${b.tone}`}>
              {b.label}
            </span>
          ),
        )}
      </div>
      <p className="hero-role-line" {...aos('fade-up', { delay: 140 })}>
        {c.roleLine}
      </p>
      <p className="hero-tagline" {...aos('fade-up', { delay: 180 })}>
        {c.heroTagline}
      </p>
      <p className="hero-intro" {...aos('fade-up', { delay: 220 })}>
        {c.introSegments.map((seg, i) =>
          'highlight' in seg && seg.highlight ? (
            <span key={i} className="hero-intro__hl">
              {seg.text}
            </span>
          ) : (
            <span key={i}>{seg.text}</span>
          ),
        )}
      </p>
      <div className="cta-row" {...aos('fade-up', { delay: 280 })}>
        <button type="button" className="cta cta--primary" onClick={() => onOpenTab('projects')}>
          📁 Projects
        </button>
        <button type="button" className="cta cta--ghost" onClick={() => onOpenTab('about')}>
          👤 About Me
        </button>
        <button type="button" className="cta cta--ghost" onClick={() => onOpenTab('contact')}>
          ✉ Contact
        </button>
      </div>
      <div className="stat-row-bleed" {...aos('fade-up', { delay: 340 })}>
        <div className="stat-row">
          {c.homeStats.map((s) => (
            <div key={s.label} className={`stat-cell${'wide' in s && s.wide ? ' stat-cell--wide' : ''}`}>
              <div className="stat-cell__value">{s.value}</div>
              <div className="stat-cell__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="social-row" aria-label="Social links" {...aos('fade-up', { delay: 400 })}>
        {c.socialLinks.map((s) => (
          <a key={s.id} className="social-icon-btn" href={s.href} target="_blank" rel="noreferrer" title={s.label}>
            {socialIcon(s.id)}
          </a>
        ))}
      </div>
    </article>
  )
}

function AboutView() {
  const a = siteConfig.about
  return (
    <article className="editor-view page page--about">
      <p className="page-code-comment page-code-comment--muted" {...aos('fade-right', { duration: 500 })}>
        {a.htmlComment}
      </p>
      <h1 className="page-display-h1" {...aos('fade-up', { duration: 720 })}>
        About Me
      </h1>
      <p className="page-code-comment" {...aos('fade-up', { delay: 60 })}>
        {a.subtitleComment}
      </p>
      <div className="about-glass" {...aos('fade-up', { delay: 120 })}>
        <p className="about-glass__p">
          {a.introParts.map((part, i) =>
            'highlight' in part && part.highlight ? (
              <span key={i} className="about-glass__hl">
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
      </div>
      <h2 className="section-kicker" {...aos('fade-left', { delay: 40 })}>
        {a.focusTitle}
      </h2>
      <ul className="focus-grid">
        {a.focusItems.map((item, i) => (
          <li key={item.text} className="focus-item" {...aos('fade-up', { delay: 80 + i * 70 })}>
            <span className="focus-item__emoji" aria-hidden>
              {item.emoji}
            </span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
      <h2 className="section-kicker" {...aos('fade-left', { delay: 40 })}>
        {a.educationTitle}
      </h2>
      <ul className="education-list">
        {a.education.map((ed, i) => (
          <li key={ed.school} className="education-item" {...aos('fade-up', { delay: i * 100 })}>
            <div className="education-item__top">
              <strong className="education-item__school">{ed.school}</strong>
              <span className="education-item__years">{ed.years}</span>
            </div>
            <div className="education-item__detail">{ed.detail}</div>
          </li>
        ))}
      </ul>
    </article>
  )
}

function ProjectsView() {
  const c = siteConfig
  return (
    <article className="editor-view page page--projects">
      <p className="page-code-comment" {...aos('fade-right', { duration: 500 })}>
        {c.projectsHeader}
      </p>
      <h1 className="page-display-h1" {...aos('fade-up', { duration: 700 })}>
        Projects
      </h1>
      <p className="page-code-line" {...aos('fade-up', { delay: 80 })}>
        {c.projectsConst}
      </p>
      <ul className="project-grid-ref">
        {c.projects.map((p, i) => (
          <li
            key={p.name}
            className="project-card-ref"
            style={{ '--project-accent': p.accent } as React.CSSProperties}
            {...aos('zoom-in', { delay: i * 75, duration: 640 })}
          >
            <div className="project-card-ref__top">
              <span className="project-card-ref__emoji" aria-hidden>
                {p.emoji}
              </span>
              <span className="project-card-ref__cat">{p.category}</span>
              <span className="project-card-ref__links">
                {p.liveUrl ? (
                  <a
                    className="project-card-ref__link project-card-ref__link--live"
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live <VscLinkExternal />
                  </a>
                ) : null}
                {p.githubUrl ? (
                  <a className="project-card-ref__link" href={p.githubUrl} target="_blank" rel="noreferrer">
                    GitHub <VscLinkExternal />
                  </a>
                ) : null}
              </span>
            </div>
            <h2 className="project-card-ref__title">{p.name}</h2>
            <p className="project-card-ref__desc">{p.description}</p>
            <ul className="project-card-ref__highlights">
              {p.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="project-card-ref__tags">
              {p.tech.map((t) => (
                <span key={t} className="tech-pill">
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}

function AnimatedSkillBar({ pct, color }: { pct: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.width = '0%'
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        el.style.width = `${pct}%`
      })
    })
    return () => cancelAnimationFrame(id)
  }, [pct])

  return (
    <div className="skill-row__bar-wrap skill-row__bar-wrap--neon">
      <div
        ref={ref}
        className="skill-row__bar skill-row__bar--animated"
        style={{
          width: '0%',
          background: color,
          transition: 'width 2.15s cubic-bezier(0.19, 1, 0.22, 1)',
          boxShadow: `0 0 14px ${color}99, 0 0 5px ${color}`,
        }}
      />
    </div>
  )
}

function SkillsView() {
  const c = siteConfig

  return (
    <article className="editor-view page page--skills">
      <p className="page-code-comment skills-page__comment" {...aos('fade-down', { duration: 520 })}>
        // skills.json — frontend stack & tools I use
      </p>
      <h1 className="skills-page__title" {...aos('zoom-in', { duration: 720 })}>
        skills
      </h1>
      <p className="page-code-line page-code-line--json skills-page__subtitle" {...aos('fade-up', { delay: 60 })}>
        {c.skillsSubtitle}
      </p>
      <div className="skills-grid">
        {c.skillCategories.map((cat, i) => (
          <section key={cat.title} className="skill-block" {...aos('fade-up', { delay: i * 70 })}>
            <h2 className="skill-block__title skill-block__title--radium">{cat.title}</h2>
            <ul className="skill-block__list">
              {cat.items.map((item) => (
                  <li key={`${cat.title}-${item.name}`} className="skill-row skill-row--radium">
                    <span className="skill-row__name">{item.name}</span>
                    <AnimatedSkillBar pct={item.pct} color={item.color} />
                    <span className="skill-row__pct" style={{ color: item.color }}>
                      {item.pct}%
                    </span>
                  </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <h3 className="section-kicker section-kicker--small" {...aos('fade-left', { delay: 40 })}>
        ALSO FAMILIAR WITH
      </h3>
      <div className="familiar-tags" {...aos('fade-up', { delay: 100 })}>
        {c.alsoFamiliar.map((t) => (
          <span key={t} className="familiar-tag">
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}

function ExperienceView() {
  const c = siteConfig
  return (
    <article className="editor-view page page--experience">
      <p className="page-code-comment" {...aos('fade-right', { duration: 500 })}>
        {c.experienceComment}
      </p>
      <h1 className="page-display-h1" {...aos('fade-up', { duration: 720 })}>
        Experience
      </h1>
      <p className="page-code-line" {...aos('fade-up', { delay: 70 })}>
        {c.experienceInterface}
      </p>
      <ul className="timeline">
        {c.experience.map((job, i) => (
          <li key={job.title + job.company} className="timeline__item" {...aos('fade-left', { delay: i * 120 })}>
            <div className="timeline__rail" aria-hidden />
            <div className="timeline__content">
              <div className="timeline__period">{job.period}</div>
              <h2 className="timeline__title">{job.title}</h2>
              <div className="timeline__company">{`@ ${job.company}`}</div>
              <p className="timeline__desc">{job.description}</p>
              <div className="timeline__tags">
                {job.tags.map((t) => (
                  <span key={t} className="timeline-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}

function ContactView() {
  const c = siteConfig.contact
  const [status, setStatus] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    if (!c.web3FormsAccessKey) {
      setStatus('Add your Web3Forms access key in siteConfig.contact.web3FormsAccessKey.')
      return
    }

    setIsSubmitting(true)
    setStatus('Sending...')

    try {
      const formEl = e.currentTarget
      const formData = new FormData(formEl)
      formData.append('access_key', c.web3FormsAccessKey)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = (await response.json()) as { success?: boolean; message?: string }
      if (data.success) {
        setStatus('Success! Message sent.')
        formEl.reset()
      } else {
        setStatus(data.message || 'Error: Could not send message.')
      }
    } catch {
      setStatus('Error: Network issue. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <article className="editor-view page page--contact">
      <p className="page-code-comment" {...aos('fade-down', { duration: 520 })}>
        {c.headerComment}
      </p>
      <h1 className="page-display-h1" {...aos('zoom-in', { duration: 700 })}>
        Contact
      </h1>
      <p className="page-code-comment" {...aos('fade-up', { delay: 80 })}>
        {c.subComment}
      </p>
      <div className="contact-grid">
        <section className="contact-col" {...aos('fade-right', { delay: 60 })}>
          <h2 className="section-kicker">{c.findTitle}</h2>
          <ul className="contact-channels">
            {c.channels.map((ch) => (
              <li key={ch.id}>
                <a className={`contact-card contact-card--${ch.accent}`} href={ch.href} target="_blank" rel="noreferrer">
                  <span className={`contact-card__icon-wrap contact-card__icon-wrap--${ch.accent}`}>
                    <ContactChannelIcon id={ch.id} />
                  </span>
                  <span className="contact-card__body">
                    <span className="contact-card__title">{ch.title}</span>
                    <span className="contact-card__line">{ch.line}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="contact-col" {...aos('fade-left', { delay: 100 })}>
          <h2 className="section-kicker">{c.sendTitle}</h2>
          <form className="contact-form" onSubmit={onSubmit}>
            <label className="contact-form__label">
              <span className="contact-form__hint">
                // YOUR_NAME <span className="contact-form__req">*</span>
              </span>
              <input className="contact-form__input" name="name" required placeholder="string" />
            </label>
            <label className="contact-form__label">
              <span className="contact-form__hint">
                // EMAIL <span className="contact-form__req">*</span>
              </span>
              <input className="contact-form__input" type="email" name="email" required placeholder="string" />
            </label>
            <label className="contact-form__label">
              <span className="contact-form__hint">
                // MESSAGE <span className="contact-form__req">*</span>
              </span>
              <textarea className="contact-form__input contact-form__textarea" name="message" required rows={5} placeholder='"""your message"""' />
            </label>
            <button type="submit" className="contact-form__submit" disabled={isSubmitting}>
              {isSubmitting ? '→ sending_message()' : '→ send_message()'}
            </button>
            <p className="contact-form__note">{c.formNote}</p>
          </form>
          {status && <p className="contact-form__status">{status}</p>}
        </section>
      </div>
    </article>
  )
}

function readmeEmphasis(text: string) {
  const parts = text.split(/\*\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i}>{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

function ReadmeTechIcon({ label }: { label: string }) {
  const ic = { size: 15, className: 'readme-badge__ic', 'aria-hidden': true as const }
  switch (label) {
    case 'React':
      return <SiReact {...ic} />
    case 'TypeScript':
      return <SiTypescript {...ic} />
    case 'Next.js':
      return <SiNextdotjs {...ic} />
    case 'Tailwind':
      return <SiTailwindcss {...ic} />
    case 'Redux':
      return <SiRedux {...ic} />
    case 'Mantine':
      return <SiMantine {...ic} />
    default:
      return <VscCode {...ic} />
  }
}

function ReadmeView() {
  const r = siteConfig.readme
  return (
    <article className="editor-view page page--readme">
      <header className="readme-hero">
        <h1 className="readme-hero-name" {...aos('fade-up', { duration: 760 })}>
          {r.headline}
        </h1>
        <div className="readme-hero-divider readme-hero-divider--under-name" aria-hidden />
        <p className="readme-sub" {...aos('fade-up', { delay: 70 })}>
          {r.subline}
        </p>
        <div className="readme-hero-actions" {...aos('fade-up', { delay: 120 })}>
          <div className="readme-badges">
            {r.badgeStack.map((b) => (
              <span key={b.label} className={`readme-badge readme-badge--${b.accent}`}>
                <ReadmeTechIcon label={b.label} />
                <span className="readme-badge__label">{b.label}</span>
              </span>
            ))}
          </div>
          {r.showResumeButton ? (
            <button type="button" className="readme-resume-btn" onClick={() => triggerResumeDownload()}>
              <VscCloudDownload size={15} className="readme-resume-btn__icon" aria-hidden />
              <span>Resume</span>
            </button>
          ) : null}
        </div>
      </header>

      <h2 className="readme-h2" {...aos('fade-left', { delay: 40 })}>
        {r.aboutTitle}
      </h2>
      <div className="readme-about" {...aos('fade-up', { delay: 100 })}>
        {r.aboutParagraphs.map((para) => (
          <p key={para.slice(0, 48)} className="readme-p readme-p--about">
            {readmeEmphasis(para)}
          </p>
        ))}
        <ul className="readme-highlights">
          {r.highlights.map((h) => (
            <li key={h.text} className="readme-highlight">
              <span className="readme-highlight__icon" aria-hidden>
                {h.icon}
              </span>
              <span className="readme-highlight__text">{readmeEmphasis(h.text)}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="readme-h2" {...aos('fade-left', { delay: 40 })}>
        {r.stackTitle}
      </h2>
      <div className="readme-stack readme-stack--panel" {...aos('fade-up', { delay: 90 })}>
        {r.stackGroups.map((g) => (
          <div key={g.title} className="readme-stack-group">
            <div className="readme-stack-title">{g.title}</div>
            <div className="readme-stack-pills">
              {g.items.map((item) => (
                <span key={item} className="readme-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h2 className="readme-h2" {...aos('fade-left', { delay: 40 })}>
        {r.connectTitle}
      </h2>
      <ul className="readme-connect" {...aos('fade-up', { delay: 80 })}>
        {r.connectLines.map((line) => (
          <li key={line.label}>
            <a
              href={line.href}
              className="readme-connect-link"
              {...(line.href.startsWith('mailto:')
                ? { rel: 'noopener noreferrer' }
                : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <span className="readme-connect-label">{line.label}:</span>
              <span className="readme-connect-link__value">
                <span className="readme-connect-val">{line.value}</span>
                {!line.href.startsWith('mailto:') ? (
                  <VscLinkExternal className="readme-connect-link__ext" size={13} aria-hidden />
                ) : null}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="readme-footer" {...aos('fade-up', { delay: 120 })}>
        {r.footer}
      </p>
    </article>
  )
}

export function EditorViews({ tab, onOpenTab }: Props) {
  switch (tab) {
    case 'home':
      return <HomeView onOpenTab={onOpenTab} />
    case 'about':
      return <AboutView />
    case 'projects':
      return <ProjectsView />
    case 'skills':
      return <SkillsView />
    case 'experience':
      return <ExperienceView />
    case 'contact':
      return <ContactView />
    case 'readme':
      return <ReadmeView />
    default:
      return <HomeView onOpenTab={onOpenTab} />
  }
}
