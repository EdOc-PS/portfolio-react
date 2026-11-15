import { useEffect, useRef } from "react"

// Grade
const CELL = 15
const SIZE = 10
const RADIUS = 2.5
const MAX_ALPHA = 0.55
const REACH = 0.5
const MIN_WEIGHT = 0.04
const FPS = 60
const CORNERS = { topLeft: true, topRight: false, bottomLeft: false, bottomRight: true }

// Interação com o mouse
const MOUSE_RADIUS = 140
const PUSH = 22
const GLOW = 0.6
const GROW = 0.45
const EASE = 0.14

interface Cell {
    x: number
    y: number
    weight: number
    phase: number
    speed: number
    ox: number
    oy: number
    hover: number
}

const CornerGrid = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const setupCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        let cells: Cell[] = []
        let raf = 0
        let last = 0
        const mouse = { x: -9999, y: -9999 }

        const build = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const w = window.innerWidth
            const h = window.innerHeight
            canvas.width = w * dpr
            canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            const reach = Math.min(w, h) * REACH
            const corners = [
                CORNERS.topLeft && [0, 0],
                CORNERS.topRight && [w, 0],
                CORNERS.bottomLeft && [0, h],
                CORNERS.bottomRight && [w, h],
            ].filter((c): c is number[] => Array.isArray(c))
            cells = []
            for (let y = CELL / 2; y < h; y += CELL) {
                for (let x = CELL / 2; x < w; x += CELL) {
                    const d = Math.min(...corners.map(([cx, cy]) => Math.hypot(x - cx, y - cy)))
                    const t = 1 - d / reach
                    if (t <= 0 || t * t < MIN_WEIGHT) continue
                    cells.push({
                        x,
                        y,
                        weight: t * t,
                        phase: Math.random() * Math.PI * 2,
                        speed: 0.6 + Math.random() * 1.6,
                        ox: 0,
                        oy: 0,
                        hover: 0,
                    })
                }
            }
        }

        const draw = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = "#ffffff"
            const s = time / 1000
            for (const c of cells) {
                const dx = c.x - mouse.x
                const dy = c.y - mouse.y
                const dist = Math.hypot(dx, dy)
                const near = dist < MOUSE_RADIUS ? (1 - dist / MOUSE_RADIUS) ** 2 : 0

                const tx = near && dist > 0 ? (dx / dist) * PUSH * near : 0
                const ty = near && dist > 0 ? (dy / dist) * PUSH * near : 0
                c.ox += (tx - c.ox) * EASE
                c.oy += (ty - c.oy) * EASE
                c.hover += (near - c.hover) * EASE

                const twinkle = reduceMotion ? 0.6 : 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(s * c.speed + c.phase)) ** 3
                ctx.globalAlpha = Math.min(1, MAX_ALPHA * c.weight * twinkle + GLOW * c.hover * c.weight)

                const size = SIZE * (1 + GROW * c.hover)
                ctx.beginPath()
                ctx.roundRect(c.x + c.ox - size / 2, c.y + c.oy - size / 2, size, size, RADIUS)
                ctx.fill()
            }
            ctx.globalAlpha = 1
        }

        const loop = (time: number) => {
            raf = requestAnimationFrame(loop)
            if (time - last < 1000 / FPS - 1) return
            last = time
            draw(time)
        }

        build()
        if (reduceMotion) draw(0)
        else raf = requestAnimationFrame(loop)

        const onResize = () => {
            build()
            if (reduceMotion) draw(0)
        }
        const onMove = (e: PointerEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }
        const onLeave = () => {
            mouse.x = -9999
            mouse.y = -9999
        }
        window.addEventListener("resize", onResize)
        window.addEventListener("pointermove", onMove, { passive: true })
        document.addEventListener("pointerleave", onLeave)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener("resize", onResize)
            window.removeEventListener("pointermove", onMove)
            document.removeEventListener("pointerleave", onLeave)
        }
    }
    useEffect(setupCanvas, [])

    return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}

export default CornerGrid
