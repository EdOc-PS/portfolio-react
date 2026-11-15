import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ABOUT } from "@/data/about"
import { revealFromCenter } from "@/lib/motion"
import { GetRequest } from "@/service/getRequest"
import Label from "@/components/ui/Label"

// Níveis 0–4 do GitHub
const LEVEL_BG = ["bg-line", "bg-accent-purple/25", "bg-accent-purple/50", "bg-accent-purple/75", "bg-accent-purple"]

const GithubCard = ({ index }: { index: number }) => {
    const [github, setGithub] = useState(ABOUT.github)

    const loadContributions = () => {
        GetRequest("/api/github").then((data) => {
            if (data?.levels?.length)
                setGithub((g) => ({ ...g, levels: data.levels, subtitle: `${data.total} contribuições nas últimas 5 semanas.` }))
        })
    }
    useEffect(loadContributions, [])

    return (
        <motion.div {...revealFromCenter(index)} className="card flex min-h-[300px] flex-col p-7 md:min-h-0">
            <Label className="mb-1">{github.label}</Label>
            <div className="text-2xl font-bold md:text-base lg:text-2xl 2xl:text-[28px]">{github.title}</div>
            <div className="mb-4 text-sm text-muted">{github.subtitle}</div>

            {/* Grade de contribuições */}
            <div className="mt-auto grid grid-cols-7 gap-1.5">
                {github.levels.map((lvl, i) => (
                    <div key={i} className={`aspect-square rounded ${LEVEL_BG[lvl]}`} />
                ))}
            </div>
        </motion.div>
    )
}

export default GithubCard
