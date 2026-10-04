import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/dom'

const GAP = 30 // distance between dots, in CSS pixels
const POINTER_RADIUS = 190
const PULSE_COUNT = 7

/** A short streak of light that travels along one row or column of the grid. */
type Pulse = { horizontal: boolean; line: number; head: number; speed: number; length: number }

/**
 * Hero background: a dot matrix with a slow diagonal shimmer, "signal" pulses
 * running along the grid like traces on a circuit board, and a glow that
 * follows the pointer. Colours come from the theme tokens, so it re-tints
 * itself when the theme changes.
 */
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const still = prefersReducedMotion()
    const pointer = { x: -9999, y: -9999 }
    let width = 0
    let height = 0
    let columns = 0
    let rows = 0
    let offsetX = 0
    let offsetY = 0
    let dotColor = '#ffffff'
    let accentColor = '#b9f53c'
    let pulses: Pulse[] = []
    let frame = 0
    let lastTime = 0
    let onScreen = true

    const readColors = () => {
      const styles = getComputedStyle(canvas)
      dotColor = styles.getPropertyValue('--fg').trim() || dotColor
      accentColor = styles.getPropertyValue('--accent').trim() || accentColor
    }

    const spawnPulse = (startAnywhere: boolean): Pulse => {
      const horizontal = Math.random() < 0.6
      const span = horizontal ? width : height
      return {
        horizontal,
        line: Math.floor(Math.random() * (horizontal ? rows : columns)),
        head: startAnywhere ? Math.random() * span : -Math.random() * 300,
        speed: 70 + Math.random() * 110,
        length: 70 + Math.random() * 110,
      }
    }

    const resize = () => {
      const box = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = box.width
      height = box.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      columns = Math.floor(width / GAP) + 1
      rows = Math.floor(height / GAP) + 1
      offsetX = (width - (columns - 1) * GAP) / 2
      offsetY = (height - (rows - 1) * GAP) / 2
      pulses = still ? [] : Array.from({ length: PULSE_COUNT }, () => spawnPulse(true))
      if (still) draw(0, 0)
    }

    const draw = (time: number, delta: number) => {
      context.clearRect(0, 0, width, height)
      const radiusSquared = POINTER_RADIUS * POINTER_RADIUS
      const lit: [number, number, number][] = []

      // Base dots with a slow diagonal shimmer.
      context.fillStyle = dotColor
      for (let row = 0; row < rows; row++) {
        const y = offsetY + row * GAP
        for (let column = 0; column < columns; column++) {
          const x = offsetX + column * GAP
          const distanceSquared = (x - pointer.x) ** 2 + (y - pointer.y) ** 2
          if (distanceSquared < radiusSquared) {
            const closeness = (1 - Math.sqrt(distanceSquared) / POINTER_RADIUS) ** 2
            if (closeness > 0.03) {
              lit.push([x, y, closeness])
              continue
            }
          }
          const wave = 0.5 + 0.5 * Math.sin(x * 0.011 + y * 0.017 - time * 0.0011)
          context.globalAlpha = 0.07 + 0.11 * wave * wave
          context.fillRect(x - 0.75, y - 0.75, 1.5, 1.5)
        }
      }

      // Dots near the pointer light up in the accent colour.
      context.fillStyle = accentColor
      for (const [x, y, closeness] of lit) {
        const size = 1.5 + closeness * 2.4
        context.globalAlpha = Math.min(0.2 + closeness * 0.8, 1)
        context.fillRect(x - size / 2, y - size / 2, size, size)
      }

      // Signal pulses.
      const fadeOut = /^#[0-9a-f]{6}$/i.test(accentColor) ? `${accentColor}00` : 'transparent'
      context.lineWidth = 1
      for (const pulse of pulses) {
        pulse.head += pulse.speed * delta
        const span = pulse.horizontal ? width : height
        if (pulse.head - pulse.length > span) Object.assign(pulse, spawnPulse(false))

        const fixed = (pulse.horizontal ? offsetY : offsetX) + pulse.line * GAP
        const tail = pulse.head - pulse.length
        const [x1, y1, x2, y2] = pulse.horizontal ? [tail, fixed, pulse.head, fixed] : [fixed, tail, fixed, pulse.head]
        const gradient = context.createLinearGradient(x1, y1, x2, y2)
        gradient.addColorStop(0, fadeOut)
        gradient.addColorStop(1, accentColor)
        context.globalAlpha = 0.55
        context.strokeStyle = gradient
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
        context.globalAlpha = 0.9
        context.fillRect(x2 - 1.5, y2 - 1.5, 3, 3)
      }
      context.globalAlpha = 1
    }

    const tick = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time
      draw(time, delta)
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (still || frame || !onScreen || document.hidden) return
      lastTime = performance.now()
      frame = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const onPointerMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect()
      pointer.x = event.clientX - box.left
      pointer.y = event.clientY - box.top
    }
    const onPointerGone = () => {
      pointer.x = -9999
      pointer.y = -9999
    }
    const onVisibilityChange = () => (document.hidden ? stop() : start())

    // Only animate while the hero is actually on screen.
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) start()
      else stop()
    })
    const sizeObserver = new ResizeObserver(resize)
    const themeObserver = new MutationObserver(() => {
      readColors()
      if (still) draw(0, 0)
    })

    readColors()
    resize()
    visibility.observe(canvas)
    sizeObserver.observe(canvas)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    document.addEventListener('visibilitychange', onVisibilityChange)
    if (!still) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onPointerGone)
    }
    start()

    return () => {
      stop()
      visibility.disconnect()
      sizeObserver.disconnect()
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerGone)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />
}
