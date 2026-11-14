import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { animate, motion, useMotionValue, type PanInfo } from "motion/react"

interface MobileCarouselProps {
    /** Um item por card (cada um com a largura do card: CARD_RATIO da tela) */
    items: ReactNode[]
    index: number
    onIndexChange: (index: number) => void
}

/** Largura do card em relação ao carrossel e espaço entre eles */
const CARD_RATIO = 0.78
const GAP = 12
/** Quanto arrastar (px) ou quão rápido (px/s) pra trocar de card */
const SWIPE_DISTANCE = 50
const SWIPE_VELOCITY = 400
const SPRING = { type: "spring", stiffness: 320, damping: 34 } as const

/**
 * Carrossel do mobile feito com o motion/react gratuito (o <Carousel> do motion.dev é Motion+, pago).
 * Arrasta com o dedo (drag="x"), solta e o trilho encaixa com mola no card mais próximo;
 * o card do centro é o "ativo". Bolinhas embaixo mostram/levam pra posição.
 */
const MobileCarousel = ({ items, index, onIndexChange }: MobileCarouselProps) => {
    const viewportRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)
    const x = useMotionValue(0)

    const cardWidth = width * CARD_RATIO
    const step = cardWidth + GAP
    const offset = (width - cardWidth) / 2 // centraliza o card ativo
    const xFor = (i: number) => offset - i * step

    // Mede a largura disponível (e acompanha rotação de tela)
    useLayoutEffect(() => {
        const el = viewportRef.current
        if (!el) return
        const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    // Sempre que o índice ou a largura mudam, o trilho anima até o card certo
    useEffect(() => {
        if (!width) return
        const controls = animate(x, xFor(index), SPRING)
        return () => controls.stop()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, width])

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        const swipedLeft = info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY
        const swipedRight = info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY
        const next = swipedLeft ? index + 1 : swipedRight ? index - 1 : index
        const clamped = Math.max(0, Math.min(items.length - 1, next))
        if (clamped === index) animate(x, xFor(index), SPRING) // volta pro lugar
        else onIndexChange(clamped)
    }

    return (
        <div className="flex h-full flex-col gap-4">
            <div ref={viewportRef} className="-mx-4 min-h-0 flex-1 overflow-hidden">
                <motion.div
                    className="flex h-full touch-pan-y"
                    style={{ x, gap: GAP }}
                    drag="x"
                    dragConstraints={{ left: xFor(items.length - 1), right: xFor(0) }}
                    dragElastic={0.18}
                    dragMomentum={false}
                    onDragEnd={handleDragEnd}
                >
                    {items.map((item, i) => (
                        <div key={i} className="h-full shrink-0" style={{ width: cardWidth || `${CARD_RATIO * 100}%` }}>
                            {item}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Paginação */}
            <div className="flex justify-center gap-2">
                {items.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Ir para o projeto ${i + 1}`}
                        onClick={() => onIndexChange(i)}
                        className="h-2 rounded-full bg-white transition-all duration-300"
                        style={{ width: i === index ? 24 : 8, opacity: i === index ? 1 : 0.3 }}
                    />
                ))}
            </div>
        </div>
    )
}

export default MobileCarousel
