import { useState } from 'react'
import type { FormEvent } from 'react'
import { FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { VscLinkExternal } from 'react-icons/vsc'
import { aos } from '../lib/motion'
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
          'href' in b && b.href ? (
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
      <div className="stat-row" {...aos('fade-up', { delay: 340 })}>
        {c.homeStats.map((s) => (
          <div key={s.label} className={`stat-cell${'wide' in s && s.wide ? ' stat-cell--wide' : ''}`}>
            <div className="stat-cell__value">{s.value}</div>
            <div className="stat-cell__label">{s.label}</div>
          </div>
        ))}
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
          <li key={p.name} className="project-card-ref" {...aos('zoom-in', { delay: i * 75, duration: 640 })}>
            <div className="project-card-ref__top">
              <span className="project-card-ref__emoji" aria-hidden>
                {p.emoji}
              </span>
              <span className="project-card-ref__cat">{p.category}</span>
              <span className="project-card-ref__links">
                {p.liveUrl ? (
                  <a className="project-card-ref__link" href={p.liveUrl} target="_blank" rel="noreferrer">
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

function SkillsView() {
  const c = siteConfig
  return (
    <article className="editor-view page page--skills">
      <h1 className="page-display-h1" {...aos('fade-up', { duration: 700 })}>
        Skills
      </h1>
      <p className="page-code-line page-code-line--json" {...aos('fade-up', { delay: 60 })}>
        {c.skillsSubtitle}
      </p>
      <div className="skills-grid">
        {c.skillCategories.map((cat, i) => (
          <section key={cat.title} className="skill-block" {...aos('fade-up', { delay: i * 90 })}>
            <h2 className="skill-block__title">{cat.title}</h2>
            <ul className="skill-block__list">
              {cat.items.map((item) => (
                <li key={item.name} className="skill-row">
                  <span className="skill-row__name">{item.name}</span>
                  <div className="skill-row__bar-wrap">
                    <div
                      className="skill-row__bar"
                      style={{ width: `${item.pct}%`, background: item.color }}
                    />
                  </div>
                  <span className="skill-row__pct">{item.pct}%</span>
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
              <div className="timeline__company">@ {job.company}</div>
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!c.formspreeAction) {
      e.preventDefault()
      setStatus('Add your Formspree URL in siteConfig.contact.formspreeAction to enable the form.')
      return
    }
    setStatus(null)
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
          <form className="contact-form" action={c.formspreeAction || undefined} method="post" onSubmit={onSubmit}>
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
            <button type="submit" className="contact-form__submit">
              → send_message()
            </button>
            <p className="contact-form__note">{c.formNote}</p>
          </form>
          {status && <p className="contact-form__status">{status}</p>}
        </section>
      </div>
    </article>
  )
}

function ReadmeView() {
  const r = siteConfig.readme
  return (
    <article className="editor-view page page--readme">
      <h1 className="readme-hero-name" {...aos('fade-up', { duration: 760 })}>
        {r.headline}
      </h1>
      <p className="readme-sub" {...aos('fade-up', { delay: 70 })}>
        {r.subline}
      </p>
      <div className="readme-badges" {...aos('fade-up', { delay: 120 })}>
        {r.badgeStack.map((b) => (
          <span key={b} className="readme-badge">
            {b}
          </span>
        ))}
      </div>
      <h2 className="readme-h2" {...aos('fade-left', { delay: 40 })}>
        {r.aboutTitle}
      </h2>
      <div className="readme-two-col" {...aos('fade-up', { delay: 100 })}>
        {r.aboutColumns.map((col) => (
          <p key={col.slice(0, 20)} className="readme-p">
            {col}
          </p>
        ))}
      </div>
      <ul className="readme-highlights" {...aos('fade-up', { delay: 80 })}>
        {r.highlights.map((h) => (
          <li key={h.text} className="readme-highlight">
            <span aria-hidden>{h.icon}</span> {h.text}
          </li>
        ))}
      </ul>
      <h2 className="readme-h2" {...aos('fade-left', { delay: 40 })}>
        {r.stackTitle}
      </h2>
      <div className="readme-stack" {...aos('fade-up', { delay: 90 })}>
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
            <a href={line.href} className="readme-connect-link" target="_blank" rel="noreferrer">
              <span className="readme-connect-label">{line.label}</span>
              <span className="readme-connect-val">{line.value}</span>
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
