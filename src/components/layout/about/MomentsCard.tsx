import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ABOUT } from "@/data/about"
import { revealFromCenter } from "@/lib/motion"
import { fetchPhrase, fetchRandomPhrase, getCachedPhrase, type Phrase } from "@/service/phrase"

const PHRASE_INTERVAL_MS = 15_000
const BG_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"

const MomentsCard = ({ index }: { index: number }) => {
    const [phrase, setPhrase] = useState<Phrase | null | undefined>(getCachedPhrase)
    const hero = { ...ABOUT.hero, ...(phrase ?? {}) }
    const ready = phrase !== undefined

    const loadPhrase = () => {
        if (phrase === undefined) fetchPhrase().then(setPhrase)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(loadPhrase, [])

    const rotatePhrase = () => {
        if (!phrase) return
        const id = setInterval(async () => {
            let next = await fetchRandomPhrase()
            if (next && next.text === phrase.text) next = await fetchRandomPhrase()
            if (next && next.text !== phrase.text) setPhrase(next)
        }, PHRASE_INTERVAL_MS)
        return () => clearInterval(id)
    }
    useEffect(rotatePhrase, [phrase])

    return (
        <motion.div
            {...revealFromCenter(index)}
            className="card relative flex min-h-[300px] flex-col justify-end overflow-hidden !bg-none !bg-black p-7 sm:col-span-2 md:min-h-0"
        >
            <img src={BG_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-lighten" />

            <div className="relative">
                <div className="mb-1 text-xl font-medium text-accent-lime">{hero.kicker}</div>

                {/* Ano + frase */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={ready ? `${hero.year}-${hero.text}` : "carregando"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 8 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <div
                            className="-ml-1 text-7xl font-bold leading-[0.85] tracking-tighter xl:text-[112px]"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {hero.year}
                        </div>
                        <div className="glass mt-5 p-5">
                            <p className="text-sm font-medium opacity-90 lg:text-base">{hero.text}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default MomentsCard
