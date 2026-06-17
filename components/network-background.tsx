'use client'

import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  /** depth layer 0..1, lower = further back */
  depth: number
  /** baseline pulse phase */
  phase: number
}

const NODE_DENSITY = 0.00009 // nodes per px^2
const MAX_NODES = 120
const MIN_NODES = 28

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes: Node[] = []
    let raf = 0
    let running = true

    // Pointer state in CSS pixels. Smoothed for cinematic feel.
    const pointer = { x: -9999, y: -9999, active: false }
    const smooth = { x: -9999, y: -9999 }

    // Accent color sampled from theme, resolved to concrete RGB so alpha works
    // regardless of whether the theme uses oklch/lab/etc.
    const accent = resolveAccentRgb(canvas)

    function resolveAccentRgb(el: HTMLElement) {
      const raw = getComputedStyle(el).getPropertyValue('--accent').trim()
      const fallback = { r: 80, g: 200, b: 220 }
      if (!raw) return fallback
      try {
        // Rasterize the color on a 1x1 canvas — this always yields real RGB,
        // regardless of the source format (oklch, lab, hsl, hex, …).
        const probe = document.createElement('canvas')
        probe.width = 1
        probe.height = 1
        const pctx = probe.getContext('2d')
        if (!pctx) return fallback
        pctx.fillStyle = raw
        pctx.fillRect(0, 0, 1, 1)
        const [r, g, b] = pctx.getImageData(0, 0, 1, 1).data
        // If the color failed to parse, the pixel stays transparent/black.
        if (r === 0 && g === 0 && b === 0) return fallback
        return { r, g, b }
      } catch {
        return fallback
      }
    }

    const rgb = (a: number) =>
      `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${Math.max(0, Math.min(1, a))})`

    function buildNodes() {
      const target = Math.max(
        MIN_NODES,
        Math.min(MAX_NODES, Math.round(width * height * NODE_DENSITY)),
      )
      nodes = Array.from({ length: target }, () => {
        const depth = Math.random()
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (0.12 + depth * 0.18),
          vy: (Math.random() - 0.5) * (0.12 + depth * 0.18),
          radius: 0.8 + depth * 1.8,
          depth,
          phase: Math.random() * Math.PI * 2,
        }
      })
    }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildNodes()
    }

    // Connection distance scales with viewport so density stays balanced.
    function linkDistance() {
      return Math.min(170, Math.max(110, width / 9))
    }

    let t = 0

    function frame() {
      if (!running) return
      t += 1

      // Smooth pointer toward target for graceful trailing.
      smooth.x += (pointer.x - smooth.x) * 0.08
      smooth.y += (pointer.y - smooth.y) * 0.08

      ctx.clearRect(0, 0, width, height)

      const maxDist = linkDistance()
      const maxDistSq = maxDist * maxDist

      // Update positions
      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx
          n.y += n.vy

          // Gentle pointer parallax pull — deeper nodes drift less.
          if (pointer.active) {
            const dx = smooth.x - n.x
            const dy = smooth.y - n.y
            const distSq = dx * dx + dy * dy
            const influence = 150 * 150
            if (distSq < influence) {
              const f = (1 - distSq / influence) * 0.015 * (0.4 + n.depth)
              n.x += dx * f
              n.y += dy * f
            }
          }
        }

        // Wrap softly around edges
        if (n.x < -20) n.x = width + 20
        else if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        else if (n.y > height + 20) n.y = -20
      }

      // Draw connections (back to front for layered depth)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq > maxDistSq) continue

          const dist = Math.sqrt(distSq)
          const proximity = 1 - dist / maxDist
          const depth = (a.depth + b.depth) / 2

          // Lines near the pointer glow brighter — the "alive" signal.
          let boost = 0
          if (pointer.active) {
            const mx = (a.x + b.x) / 2 - smooth.x
            const my = (a.y + b.y) / 2 - smooth.y
            const mdSq = mx * mx + my * my
            const reach = 200 * 200
            if (mdSq < reach) boost = (1 - mdSq / reach) * 0.5
          }

          const alpha = (0.07 + proximity * 0.18 + boost) * (0.5 + depth * 0.5)
          ctx.strokeStyle = rgb(alpha)
          ctx.lineWidth = 0.7 + depth * 0.6
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      // Draw nodes with subtle pulse
      for (const n of nodes) {
        const pulse = reduceMotion ? 0 : Math.sin(t * 0.02 + n.phase) * 0.25 + 0.75
        const baseAlpha = 0.35 + n.depth * 0.5
        const alpha = baseAlpha * (reduceMotion ? 1 : pulse)

        // Pointer brightens nearby nodes
        let glow = 0
        if (pointer.active) {
          const dx = n.x - smooth.x
          const dy = n.y - smooth.y
          const dSq = dx * dx + dy * dy
          const reach = 170 * 170
          if (dSq < reach) glow = (1 - dSq / reach) * 0.6
        }

        ctx.fillStyle = rgb(Math.min(1, alpha + glow))
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fill()

        if (glow > 0.15) {
          ctx.fillStyle = rgb(glow * 0.12)
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.radius + 6 * glow, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(frame)
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      if (!pointer.active) {
        // Initialize smooth position so it doesn't streak in from off-screen.
        smooth.x = pointer.x
        smooth.y = pointer.y
      }
      pointer.active = true
    }

    function onPointerLeave() {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    // Pause when the hero scrolls out of view to preserve performance.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true
          raf = requestAnimationFrame(frame)
        } else if (!entry.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)

    resize()
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    canvas.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('pointerleave', onPointerLeave)

    raf = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 size-full"
    />
  )
}
