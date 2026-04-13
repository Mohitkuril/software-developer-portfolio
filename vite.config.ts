import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Serve `public/404.html` for unknown paths (no file extension) so wrong URLs
 * show the themed page in dev and `vite preview`, not the SPA index fallback.
 */
function static404Plugin(): Plugin {
  const extRe = /\.[a-z0-9]{2,10}$/i

  return {
    name: 'static-404',
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.method !== 'GET' && req.method !== 'HEAD') return next()
          const pathname = (req.url ?? '/').split('?')[0] || '/'
          if (pathname.startsWith('/@') || pathname.startsWith('/node_modules/')) return next()
          if (pathname === '/' || pathname === '/index.html' || pathname === '/404.html') return next()
          const lastSeg = pathname.split('/').pop() ?? ''
          if (extRe.test(lastSeg)) return next()

          const rel = pathname.replace(/^\//, '')
          const candidate = path.join(server.config.root, 'public', rel)
          if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return next()

          const p404 = path.join(server.config.root, 'public', '404.html')
          if (!fs.existsSync(p404)) return next()
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          fs.createReadStream(p404).pipe(res)
        })
      }
    },
    configurePreviewServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.method !== 'GET' && req.method !== 'HEAD') return next()
          const pathname = (req.url ?? '/').split('?')[0] || '/'
          if (pathname.startsWith('/assets/')) return next()
          if (pathname === '/' || pathname === '/index.html' || pathname === '/404.html') return next()
          const lastSeg = pathname.split('/').pop() ?? ''
          if (extRe.test(lastSeg)) return next()

          const outDir = path.resolve(server.config.root, server.config.build.outDir)
          const rel = pathname.replace(/^\//, '')
          const candidate = path.join(outDir, rel)
          if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return next()

          const p404 = path.join(outDir, '404.html')
          if (!fs.existsSync(p404)) return next()
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          fs.createReadStream(p404).pipe(res)
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  /** Without this, preview treats the app as SPA and serves index.html for unknown paths. */
  appType: 'mpa',
  plugins: [react(), static404Plugin()],
})
