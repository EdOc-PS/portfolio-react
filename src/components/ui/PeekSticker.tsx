import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

interface PeekStickerProps {
    src: string
    show: boolean
    size?: number
}

const PeekSticker = ({ src, show, size = 96 }: PeekStickerProps) => {
    const [broken, setBroken] = useState(false)
    if (broken) return null

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
