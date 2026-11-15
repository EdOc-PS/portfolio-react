import { motion } from "motion/react"
import { ABOUT } from "@/data/about"
import { revealFromCenter } from "@/lib/motion"

const StackCard = ({ index }: { index: number }) => (
    <motion.div {...revealFromCenter(index)} className="card flex flex-col p-6">
        <h3 className="mb-auto text-lg">Stack principal</h3>
        <div className="mt-4 grid grid-cols-5 gap-2 md:grid-cols-4 lg:grid-cols-5">
            {ABOUT.stack.map(({ name, icon: Icon }) => (
                <div
                    key={name}
                    title={name}
                    className="flex aspect-square w-full max-w-11 items-center justify-center rounded-full border border-line bg-white/5 text-white"
                >
                    <Icon size={22} className="h-3/5 w-3/5" />
                </div>
            ))}
        </div>
    </motion.div>
)

export default StackCard
