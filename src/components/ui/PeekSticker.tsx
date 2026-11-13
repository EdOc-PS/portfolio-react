import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

interface PeekStickerProps {
    /** Caminho da imagem em /public, ex.: "/stickers/dev.png" */
    src: string
    show: boolean
    size?: number
}

/**
 * Easter egg: um sticker que "espia" descendo pela borda de cima do card.
 * Fica absoluto no canto superior direito do card pai (que precisa ser `relative`);
 * o recorte arredondado do card esconde a parte que ainda está "fora".
 */
const PeekSticker = ({ src, show, size = 96 }: PeekStickerProps) => {
    const [broken, setBroken] = useState(false)
    if (broken) return null // imagem não existe → não mostra nada

    return (
        <AnimatePresence>
            {show && (
                <motion.img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    onError={() => setBroken(true)}
                    className="pointer-events-none absolute right-3 top-0 z-10 select-none"
                    style={{ width: size, transformOrigin: "top center" }}
                    initial={{ y: "-100%", rotate: -14 }}
                    animate={{ y: "-6%", rotate: 6 }}
                    exit={{ y: "-100%", rotate: -14 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                />
            )}
        </AnimatePresence>
    )
}

export default PeekSticker
