import { motion } from "motion/react"

const BARS = 5
const CENTER = (BARS - 1) / 2
const STEP = 0.12
const DURATION = 0.9

const WaveLoader = () => (
    <div className="flex h-10 items-center gap-1.5 md:h-12" role="status" aria-label="Carregando projetos">
        {Array.from({ length: BARS }, (_, i) => (
            <motion.span
                key={i}
                className="block w-[0.5625rem] rounded-[3px] bg-white/85 md:w-[0.675rem]"
                initial={{ height: "30%" }}
                animate={{ height: ["30%", "100%", "30%"] }}
                transition={{
                    duration: DURATION,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: Math.abs(i - CENTER) * STEP,
                }}
            />
        ))}
    </div>
)

export default WaveLoader
