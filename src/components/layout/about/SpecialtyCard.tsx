import { motion } from "motion/react"
import { ABOUT } from "@/data/about"
import { revealFromCenter } from "@/lib/motion"

const SpecialtyCard = ({ index }: { index: number }) => {
    const { category } = ABOUT

    return (
        <motion.div
            {...revealFromCenter(index)}
            className="card relative flex min-h-[200px] flex-col justify-between overflow-hidden !bg-none !bg-[#7928ca] p-6 text-black md:min-h-0"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#d8b4fe_0%,#a855f7_35%,transparent_75%),linear-gradient(135deg,#5b21b6,#9333ea)] opacity-90" />

            <div className="relative">
                <div className="mb-1 text-xs font-bold uppercase">{category.label}</div>
                <div className="text-2xl font-bold lg:text-3xl font-display">
                    {category.title}
                </div>
            </div>

            {/* Paleta */}
            <div className="relative">
                <div className="mb-2 text-xs font-semibold">{category.paletteLabel}</div>
                <div className="flex gap-2">
                    {category.palette.map((c) => (
                        <div key={c} className="h-9 w-9 rounded-full border-2 border-black" style={{ background: c }} />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default SpecialtyCard
