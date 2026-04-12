import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'aos/dist/aos.css'
import 'lenis/dist/lenis.css'
import './index.css'
import './ref-ui.css'
import './themes.css'
import { readStoredThemeId } from './lib/themes'
import App from './App.tsx'

document.documentElement.dataset.appTheme = readStoredThemeId()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
