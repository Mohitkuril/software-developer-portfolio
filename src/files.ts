import type { FileEntry, FileTab } from './types'

export const FILE_ENTRIES: FileEntry[] = [
  { id: 'home', fileName: 'home.tsx', pathTail: 'src › home.tsx', icon: 'tsx' },
  { id: 'about', fileName: 'about.html', pathTail: 'src › about.html', icon: 'html' },
  { id: 'projects', fileName: 'projects.js', pathTail: 'src › projects.js', icon: 'js' },
  { id: 'skills', fileName: 'skills.json', pathTail: 'data › skills.json', icon: 'json' },
  { id: 'experience', fileName: 'experience.ts', pathTail: 'src › experience.ts', icon: 'ts' },
  { id: 'contact', fileName: 'contact.css', pathTail: 'styles › contact.css', icon: 'css' },
  { id: 'readme', fileName: 'README.md', pathTail: 'README.md', icon: 'md' },
]

export function getFileEntry(id: FileTab): FileEntry {
  return FILE_ENTRIES.find((f) => f.id === id) ?? FILE_ENTRIES[0]
}
