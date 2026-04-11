import { useEffect, useRef } from 'react'

type Props = {
  /** Skip WebGL when reduced motion or low-power mobile */
  enabled: boolean
}

/**
 * Subtle floating particles behind the editor — modest GPU use.
 */
export function ThreeBackdrop({ enabled }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return
    const host = hostRef.current
    if (!host) return

    let cancelled = false
    let dispose: (() => void) | undefined

    void import('three').then((THREE) => {
      if (cancelled || !hostRef.current) return

      const width = host.clientWidth || 1
      const height = host.clientHeight || 1

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 50)
      camera.position.z = 4.2

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height)
      renderer.setClearColor(0x000000, 0)
      host.appendChild(renderer.domElement)
      renderer.domElement.style.cssText =
        'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:block;'

      const count = 900
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 14
        positions[i + 1] = (Math.random() - 0.5) * 10
        positions[i + 2] = (Math.random() - 0.5) * 8
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const mat = new THREE.PointsMaterial({
        color: 0x58a6ff,
        size: 0.028,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
        sizeAttenuation: true,
      })
      const points = new THREE.Points(geo, mat)
      scene.add(points)

      const geo2 = geo.clone()
      const mat2 = new THREE.PointsMaterial({
        color: 0xc084fc,
        size: 0.02,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
      })
      const purple = new THREE.Points(geo2, mat2)
      purple.rotation.y = 1.1
      scene.add(purple)

      const ro = new ResizeObserver(() => {
        if (!hostRef.current) return
        const w = host.clientWidth || 1
        const h = host.clientHeight || 1
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      })
      ro.observe(host)

      let raf = 0
      dispose = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        geo.dispose()
        geo2.dispose()
        mat.dispose()
        mat2.dispose()
        renderer.dispose()
        if (renderer.domElement.parentElement === host) {
          host.removeChild(renderer.domElement)
        }
      }

      const tick = () => {
        if (cancelled) return
        points.rotation.y += 0.00035
        points.rotation.x += 0.00012
        purple.rotation.y -= 0.00022
        renderer.render(scene, camera)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)

      if (cancelled) dispose()
    })

    return () => {
      cancelled = true
      dispose?.()
    }
  }, [enabled])

  if (!enabled) return null

  return <div ref={hostRef} className="three-backdrop" aria-hidden="true" />
}
