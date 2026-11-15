import { useEffect, useRef } from "react"

/**
 * Fundo animado: grade de quadradinhos brancos arredondados que piscam devagar.
 * A opacidade é máxima nos 4 cantos da tela e vai sumindo em direção ao meio (degradê),
 * então o conteúdo central fica limpo.
 *
 * Feito em <canvas> (um só elemento, leve) e redesenhado a ~30fps.
 */
const CELL = 12 // distância entre quadrados (px) — com SIZE 8, sobra só 4px de espaço
const SIZE = 8 // lado do quadrado (px)
const RADIUS = 2 // arredondamento (px)
const MAX_ALPHA = 0.55 // opacidade máxima (bem no canto)
/** Raio do degradê a partir de cada canto, em fração do MENOR lado da tela.
 *  0.5 = os cantos de cima e de baixo não se encontram: o meio das laterais fica vazio. */
const REACH = 0.5
const MIN_WEIGHT = 0.04 // células mais fracas que isso nem são desenhadas
const FPS = 30
/** Quais cantos têm quadrados: só a diagonal superior-esquerda → inferior-direita */
const CORNERS = { topLeft: true, topRight: false, bottomLeft: false, bottomRight: true }

interface Cell {
    x: number
    y: number
    weight: number // 0–1, força do degradê (1 = canto)
    phase: number // fase aleatória do pisca
    speed: number // velocidade do pisca
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
                        x: x - SIZE / 2,
                        y: y - SIZE / 2,
                        weight: t * t, // curva: forte no canto, cai rápido
                        phase: Math.random() * Math.PI * 2,
                        speed: 0.6 + Math.random() * 1.6,
                    })
                }
            }
        }

        const draw = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = "#ffffff"
            const s = time / 1000
            for (const c of cells) {
                // pisca entre ~15% e 100% do peso da célula
                const twinkle = reduceMotion ? 0.6 : 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(s * c.speed + c.phase)) ** 3
                ctx.globalAlpha = MAX_ALPHA * c.weight * twinkle
                ctx.beginPath()
                ctx.roundRect(c.x, c.y, SIZE, SIZE, RADIUS)
                ctx.fill()
            }
            ctx.globalAlpha = 1
        }

        const loop = (time: number) => {
            raf = requestAnimationFrame(loop)
            if (time - last < 1000 / FPS) return
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
        window.addEventListener("resize", onResize)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener("resize", onResize)
        }
    }, [])

    return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}

export default CornerGrid
