import type { Transition } from "motion/react"

/**
 * Entrada "abrindo do centro": o card nasce como uma linha no meio e se expande
 * pra cima e pra baixo ao mesmo tempo. Usa clip-path (recorte) em vez de scaleY,
 * então a imagem não fica achatada durante a animação.
 */
export const revealFromCenter = (index: number, radius = 32) => ({
    initial: { clipPath: `inset(50% 0% 50% 0% round ${radius}px)`, opacity: 0 },
    animate: { clipPath: `inset(0% 0% 0% 0% round ${radius}px)`, opacity: 1 },
    transition: {
        duration: 0.7,
        ease: [0.65, 0, 0.35, 1],
        delay: 0.1 + index * 0.09, // um por um
    } satisfies Transition,
})
