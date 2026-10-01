import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"

interface ScrollIndicatorProps {
    overFooter?: boolean
}

const ScrollIndicator = ({ overFooter = false }: ScrollIndicatorProps) => {
    const { scrollYProgress } = useScroll()
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 30, restDelta: 0.001 })
    const top = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

    const [isVisible, setIsVisible] = useState(false)
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(true)
            if (hideTimeout.current) clearTimeout(hideTimeout.current)
            hideTimeout.current = setTimeout(() => setIsVisible(false), 1000)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (hideTimeout.current) clearTimeout(hideTimeout.current)
        }
    }, [])

    return (
        <motion.div
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="hidden md:block fixed right-8 top-1/2 h-[26vh] -translate-y-1/2 z-40"
        >
            <div
                className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-colors duration-300 ${overFooter ? "bg-base-bg/25" : "bg-ink-soft/30"
                    }`}
            />

            <motion.div
                style={{ top }}
                className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300 ${overFooter ? "bg-base-bg" : "bg-base-ink"
                    }`}
            />
        </motion.div>
    )
}

export default ScrollIndicator
