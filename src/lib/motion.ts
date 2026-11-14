import type { Transition } from "motion/react"

/**
 * Entrada "abrindo do centro": o card nasce como uma linha no meio e se expande
 * pra cima e pra baixo ao mesmo tempo. Usa clip-path (recorte) em vez de scaleY,
 * então a imagem não fica achatada durante a animação.
 *
 * `revealed = false` segura o card fechado (ex.: enquanto o loader está na tela);
 * quando vira `true`, a abertura começa, um card por vez.
 */
export const revealFromCenter = (index: number, revealed = true, radius = 32) => {
    const closed = { clipPath: `inset(50% 0% 50% 0% round ${radius}px)`, opacity: 0 }
    const open = { clipPath: `inset(0% 0% 0% 0% round ${radius}px)`, opacity: 1 }

    return {
        initial: closed,
        animate: revealed ? open : closed,
        transition: {
            duration: 0.7,
            ease: [0.65, 0, 0.35, 1],
            delay: revealed ? 0.1 + index * 0.09 : 0, // um por um
        } satisfies Transition,
    }
}
