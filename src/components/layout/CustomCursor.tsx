import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

const SPRING = { type: "spring", stiffness: 500, damping: 28 } as const

/**
 * Bolinha branca que substitui o cursor no site todo.
 * Pequena por padrão, cresce sobre um card em foco, encolhe ao pressionar
 * e solta um anel pulsando a cada clique.
 */
const CustomCursor = ({ active }: { active: boolean }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [pressed, setPressed] = useState(false)
    const [pulses, setPulses] = useState<number[]>([])

    useEffect(() => {
        let raf = 0
        const move = (e: MouseEvent) => {
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => {
                if (ref.current) ref.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`
            })
        }
        const down = () => {
            setPressed(true)
            setPulses((p) => [...p, performance.now()])
        }
        const up = () => setPressed(false)

        window.addEventListener("mousemove", move, { passive: true })
        window.addEventListener("mousedown", down)
        window.addEventListener("mouseup", up)
        return () => {
            window.removeEventListener("mousemove", move)
            window.removeEventListener("mousedown", down)
            window.removeEventListener("mouseup", up)
            cancelAnimationFrame(raf)
        }
    }, [])

    const scale = (active ? 1 : 0.5) * (pressed ? 0.7 : 1)

    return (
        <div
            ref={ref}
            className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-6 w-6 will-change-transform md:block"
            style={{ transform: "translate3d(-100px, -100px, 0)" }}
        >
            <AnimatePresence>
                {pulses.map((id) => (
                    /* O anel já nasce no tamanho final (72px) e começa encolhido: escalar pra BAIXO
                       mantém a nitidez; escalar uma bolinha de 24px pra cima deixava o pulso pixelado. */
                    <motion.span
                        key={id}
                        className="absolute left-1/2 top-1/2 -ml-9 -mt-9 h-18 w-18 rounded-full border-[1.5px] border-white"
                        initial={{ scale: active ? 1 / 3 : 1 / 6, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        onAnimationComplete={() => setPulses((p) => p.filter((x) => x !== id))}
                    />
                ))}
            </AnimatePresence>
            <motion.div
                className="h-full w-full rounded-full bg-white/80 shadow-lg shadow-white/20"
                animate={{ scale }}
                transition={SPRING}
            />
        </div>
    )
}

export default CustomCursor
