import type { ReactNode } from "react"
import { motion } from "motion/react"

interface RevealProps {
    children: ReactNode
    delay?: number
    className?: string
    tilt?: number
}

/** Rise-from-below reveal with a subtle 3D "cube face" flip (rotateX) instead of a flat fade. */
const Reveal = ({ children, delay = 0, className, tilt = 18 }: RevealProps) => (
    <motion.div
        initial={{ opacity: 0, y: 48, rotateX: -tilt }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "bottom center", transformPerspective: 900 }}
        className={className}
    >
        {children}
    </motion.div>
)

export default Reveal
