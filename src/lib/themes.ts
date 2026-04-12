export type ThemeId = 'mohit-dark' | 'rose-pine' | 'tokyo-night' | 'catppuccin' | 'nord' | 'gruvbox'

export type ThemeMeta = {
  id: ThemeId
  label: string
  /** Small swatch for the picker list */
  dot: string
}

export const THEME_STORAGE_KEY = 'ide-portfolio-theme'

export const THEMES: ThemeMeta[] = [
  { id: 'mohit-dark', label: 'Mohit Dark', dot: '#7c3aed' },
  { id: 'rose-pine', label: 'Rosé Pine', dot: '#ebbcba' },
  { id: 'tokyo-night', label: 'Tokyo Night', dot: '#7aa2f7' },
  { id: 'catppuccin', label: 'Catppuccin', dot: '#cba6f7' },
  { id: 'nord', label: 'Nord', dot: '#88c0d0' },
  { id: 'gruvbox', label: 'Gruvbox', dot: '#fabd2f' },
]

export const DEFAULT_THEME_ID: ThemeId = 'mohit-dark'

export function readStoredThemeId(): ThemeId {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    if (raw && THEMES.some((t) => t.id === raw)) return raw as ThemeId
  } catch {
    /* ignore */
  }
  return DEFAULT_THEME_ID
}

export function persistThemeId(id: ThemeId) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id)
  } catch {
    /* ignore */
  }
}

export function themeLabel(id: ThemeId): string {
  return THEMES.find((t) => t.id === id)?.label ?? id
}
