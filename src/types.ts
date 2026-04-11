export type FileTab =
  | 'home'
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'contact'
  | 'readme'

export type FileIcon = 'tsx' | 'html' | 'js' | 'json' | 'ts' | 'css' | 'md' | 'pdf'

export type FileEntry = {
  id: FileTab
  fileName: string
  /** Path after workspace name in breadcrumbs */
  pathTail: string
  icon: FileIcon
}
