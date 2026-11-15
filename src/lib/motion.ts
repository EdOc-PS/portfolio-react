import type { Transition } from "motion/react"

export const revealFromCenter = (index: number, revealed = true, radius = 32) => {
    const closed = { clipPath: `inset(50% 0% 50% 0% round ${radius}px)`, opacity: 0 }
    const open = { clipPath: `inset(0% 0% 0% 0% round ${radius}px)`, opacity: 1 }

    return {
        initial: closed,
        animate: revealed ? open : closed,
        transition: {
            duration: 0.7,
            ease: [0.65, 0, 0.35, 1],
            delay: revealed ? 0.1 + index * 0.09 : 0,
        } satisfies Transition,
    }
}
