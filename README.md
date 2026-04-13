# Mohit Kuril — IDE portfolio

Single-page portfolio that **looks and behaves like VS Code**: file explorer, editor tabs, breadcrumbs, status bar, command palette, optional bottom panel (terminal), and a Copilot-style side panel.

**Live site:** [https://mohitkuril.xyz/](https://mohitkuril.xyz/)

---

## How the app is wired

| Piece | Role |
|--------|------|
| `App.tsx` | Renders `IdeApp` only. |
| `IdeApp.tsx` | **Main shell**: tab state, explorer, theme, command palette, Copilot, bottom panel, Lenis scroll on the editor pane, mobile vs desktop layout. |
| `files.ts` | **Explorer / tab labels** — each “file” (`home.tsx`, `README.md`, …) maps to a `FileTab` id. Add or rename entries here when you add views. |
| `EditorViews.tsx` | **One component per “file”** — switches on the active tab and renders `HomeView`, `ReadmeView`, `ProjectsView`, etc. |
| `siteConfig.ts` | **All copy and structured data** (projects, skills, readme text, links, Copilot strings). Prefer editing this instead of hunting through JSX. |
| `types.ts` | Shared types (`FileTab`, file entry shapes, etc.). |

Flow: user picks a file in **Explorer** or **TabBar** → `openTab(id)` → `active` tab updates → **EditorViews** renders the matching page. Content comes from **siteConfig**.

---

## `src/components/` (by responsibility)

**Chrome & navigation**

- `MenuBar.tsx` — top menu strip (File, Edit, …), palette trigger, theme zoom, fullscreen.
- `ActivityBar.tsx` — left rail icons (explorer, search, SCM popover, Copilot).
- `Explorer.tsx` — file tree; uses `FILE_ENTRIES` from `files.ts`.
- `TabBar.tsx` — open editor tabs; close / select.
- `Breadcrumbs.tsx` — path trail for the active tab.
- `CommandPalette.tsx` — quick open / command-style navigation.

**Editor area**

- `EditorViews.tsx` — **all “page” views** in one module (home, about, projects, skills, experience, contact, readme). Styling mostly via `ref-ui.css` classes (e.g. `.page--readme`).

**Side & bottom panels**

- `CopilotPanel.tsx` — right-side assistant copy (driven by `siteConfig.copilot`).
- `SourceControlPopover.tsx` — SCM-style popover (e.g. resume download).
- `BottomPanel.tsx` — terminal / problems / output tabs wrapper.
- `PortfolioTerminal.tsx` — fake terminal UI inside the bottom panel.

**System UI**

- `StatusBar.tsx` — bottom status line (branch, tab hint, theme on mobile).
- `ThemePicker.tsx` — color theme selection; works with `lib/themes.ts` + `themes.css`.
- `MobileTopChrome.tsx` — compact top bar on small screens.

**Visuals & icons**

- `ThreeBackdrop.tsx` — optional Three.js background (disabled on mobile / reduced motion).
- `Icons.tsx` / `FileTypeIcon.tsx` / `CopilotMascot.tsx` — small presentational pieces.

---

## `src/hooks/` & `src/lib/`

| Path | Role |
|------|------|
| `hooks/useLenisOnElement.ts` | Smooth scrolling on the editor scroll container; scrolls to top when the active tab id changes. |
| `hooks/useMediaQuery.ts` | Breakpoints (e.g. mobile layout under 900px width). |
| `hooks/usePortfolioMotion.ts` | Ties motion / AOS-style behavior to the active tab. |
| `lib/themes.ts` | Theme ids, labels, `localStorage` persistence. |
| `lib/motion.ts` | Small helpers for animation attributes. |

---

## Styles

| File | Role |
|------|------|
| `index.css` | Global resets, `#root` height, scrollbar hiding; imports `portfolio.css`. |
| `portfolio.css` | IDE **layout**: flex shell, explorer width, editor stack, breadcrumbs. |
| `ref-ui.css` | **Component look**: menu bar, pages, readme, forms, status bar, Copilot, etc. |
| `themes.css` | Variables per `data-app-theme` on `<html>`. |

`main.tsx` loads `index.css`, `ref-ui.css`, and `themes.css`.

---

## `public/` & SEO

Static assets and crawlers: `favicon.svg`, `og-card.svg`, `robots.txt`, `sitemap.xml` (sitemap uses **https://mohitkuril.xyz/**). Resume PDF and any extra assets live here too.

### Custom 404 (wrong paths after `/`)

- Anything in `public/` is copied to the **root of the built site**, not under `/public/`. So `public/404.html` becomes **`https://your-domain/404.html`** and hosts (e.g. Vercel) use it for unknown routes like `/random-page`.
- Do not expect the live URL to be `/public/404.html` — `public` is a **build-time folder name** only.

---

## Scripts

```bash
npm install
npm run dev       # Vite dev server
npm run build     # Typecheck + production build → dist/
npm run preview   # Serve dist/ locally
npm run lint
```

---

## Deploy

Output is **static** in `dist/`. After `npm run build`, upload that folder (or point CI at it). Canonical URL in metadata: **https://mohitkuril.xyz/** (`index.html`, `sitemap.xml`).
