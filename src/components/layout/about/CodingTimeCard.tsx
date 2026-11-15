import { motion } from "motion/react"
import { ABOUT } from "@/data/about"
import { revealFromCenter } from "@/lib/motion"
import Label from "@/components/ui/Label"

const CodingTimeCard = ({ index }: { index: number }) => {
    const { stats } = ABOUT

    return (
        <motion.div {...revealFromCenter(index)} className="card flex min-h-[200px] flex-col justify-between p-6 md:min-h-0">
            <Label>{stats.label}</Label>
            <div>
                <div
                    className="mb-3 whitespace-nowrap bg-gradient-to-br from-accent-purple to-accent-pink bg-clip-text text-4xl font-bold leading-none text-transparent 2xl:text-5xl"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {stats.value}
                </div>
                <span className="inline-flex rounded-full bg-accent-lime/10 px-3 py-1 text-xs font-semibold text-accent-lime">{stats.badge}</span>
            </div>
        </motion.div>
    )
}

export default CodingTimeCard
