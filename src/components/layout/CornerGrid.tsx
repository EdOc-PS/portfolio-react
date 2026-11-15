import { useEffect, useRef } from "react"

/**
 * Fundo animado: grade de quadradinhos brancos arredondados que piscam devagar.
 * A opacidade é máxima nos cantos e vai sumindo em direção ao meio (degradê),
 * então o conteúdo central fica limpo.
 *
 * Interação: perto do mouse os quadrados são empurrados pra longe (como um "campo de força"),
 * acendem e crescem um pouco; quando o mouse sai, voltam suavemente pro lugar.
 *
 * Feito em <canvas> (um só elemento, leve).
 */
const CELL = 15 // distância entre quadrados (px)
const SIZE = 10 // lado do quadrado (px)
const RADIUS = 2.5 // arredondamento (px)
const MAX_ALPHA = 0.55 // opacidade máxima (bem no canto)
/** Raio do degradê a partir de cada canto, em fração do MENOR lado da tela.
 *  0.5 = os cantos de cima e de baixo não se encontram: o meio das laterais fica vazio. */
const REACH = 0.5
const MIN_WEIGHT = 0.04 // células mais fracas que isso nem são desenhadas
const FPS = 60
/** Quais cantos têm quadrados: só a diagonal superior-esquerda → inferior-direita */
const CORNERS = { topLeft: true, topRight: false, bottomLeft: false, bottomRight: true }

// Interação com o mouse
const MOUSE_RADIUS = 140 // alcance do efeito (px)
const PUSH = 22 // quanto os quadrados mais próximos são empurrados (px)
const GLOW = 0.6 // brilho extra perto do mouse
const GROW = 0.45 // crescimento extra perto do mouse (45%)
const EASE = 0.14 // suavidade do movimento (0–1; menor = mais "mole")

interface Cell {
    x: number // centro
    y: number
    weight: number // 0–1, força do degradê (1 = canto)
    phase: number // fase aleatória do pisca
    speed: number // velocidade do pisca
    ox: number // deslocamento atual (animado)
    oy: number
    hover: number // 0–1, proximidade do mouse (animada)
}

const CornerGrid = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        let cells: Cell[] = []
        let raf = 0
        let last = 0
        const mouse = { x: -9999, y: -9999 }

        // Monta a grade (só as células que aparecem; o meio, com peso 0, nem entra)
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
                        weight: t * t, // curva: forte no canto, cai rápido
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
                // Proximidade do mouse: 1 em cima dele, 0 fora do alcance (curva suave)
                const dx = c.x - mouse.x
                const dy = c.y - mouse.y
                const dist = Math.hypot(dx, dy)
                const near = dist < MOUSE_RADIUS ? (1 - dist / MOUSE_RADIUS) ** 2 : 0

                // Alvo do deslocamento: empurrado pra longe do mouse
                const tx = near && dist > 0 ? (dx / dist) * PUSH * near : 0
                const ty = near && dist > 0 ? (dy / dist) * PUSH * near : 0
                c.ox += (tx - c.ox) * EASE
                c.oy += (ty - c.oy) * EASE
                c.hover += (near - c.hover) * EASE

                // pisca entre ~15% e 100% do peso da célula; perto do mouse acende
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
        // O canvas não recebe cliques (pointer-events-none), então o mouse é lido na janela
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
    }, [])

    return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}

export default CornerGrid
