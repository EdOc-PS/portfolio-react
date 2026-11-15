import { useState } from "react"
import { motion } from "motion/react"
import { ABOUT } from "@/data/about"
import { revealFromCenter } from "@/lib/motion"
import PeekSticker from "@/components/ui/PeekSticker"
import CodeIcon from "@/components/ui/CodeIcon"

const ProfileCard = ({ index }: { index: number }) => {
    const { persona } = ABOUT
    const [peek, setPeek] = useState(false)

    return (
        <motion.div
            {...revealFromCenter(index)}
            onMouseEnter={() => setPeek(true)}
            onMouseLeave={() => setPeek(false)}
            className="card relative flex min-h-[340px] flex-col !bg-none !bg-white p-6 text-black md:min-h-0 2xl:p-7"
        >
            {/* Easter egg */}
            <PeekSticker src={persona.sticker} show={peek} />

            <div className="flex flex-1 flex-col items-center justify-center text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-black md:hidden lg:flex 2xl:mb-4 2xl:h-20 2xl:w-20">
                    <CodeIcon className="h-7 w-7 text-white 2xl:h-10 2xl:w-10" />
                </div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide opacity-60">{persona.prefix}</div>
                <div className="text-2xl font-bold leading-tight md:text-base lg:text-2xl 2xl:text-[28px] font-display">
                    {persona.title[0]}
                    <br />
                    {persona.title[1]}
                </div>
            </div>

            <p className="border-t border-black/10 pt-4 text-xs font-medium leading-relaxed lg:text-sm">{persona.text}</p>
        </motion.div>
    )
}

export default ProfileCard
