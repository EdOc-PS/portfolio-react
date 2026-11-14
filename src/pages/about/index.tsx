import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ABOUT } from "@/data/about"
import { revealFromCenter } from "@/lib/motion"
import { GetRequest } from "@/service/getRequest"
import PeekSticker from "@/components/ui/PeekSticker"
import ContactModal from "@/components/ui/ContactModal"

const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`text-xs font-semibold uppercase tracking-wider text-muted ${className}`}>{children}</div>
)

const display = { fontFamily: "var(--font-display)" }
/** Níveis 0–4 do GitHub (NONE → FOURTH_QUARTILE) */
const LEVEL_BG = ["bg-line", "bg-accent-purple/25", "bg-accent-purple/50", "bg-accent-purple/75", "bg-accent-purple"]

/**
 * Bento da aba Sobre.
 * Linha de cima (mais alta): destaque · perfil · GitHub
 * Linha de baixo (4 cards): stack · especialidade · tempo programando · redes
 */
const About = () => {
    const { persona, stack, category, stats, socials } = ABOUT
    const [github, setGithub] = useState(ABOUT.github)
    const [hero, setHero] = useState(ABOUT.hero)
    const [peek, setPeek] = useState(false)
    const [contactOpen, setContactOpen] = useState(false)

    // Ano + frase sorteados no back (coleção "phrases" do Mongo); se falhar, fica o fallback de about.ts
    useEffect(() => {
        GetRequest("/api/phrases/random").then((data) => {
            if (data?.phrase) setHero((h) => ({ ...h, ...data.phrase }))
        })
        // Contribuições reais do GitHub; se falhar, ficam os quadradinhos de exemplo
        GetRequest("/api/github").then((data) => {
            if (data?.levels?.length)
                setGithub((g) => ({ ...g, levels: data.levels, subtitle: `${data.total} contribuições nas últimas 5 semanas.` }))
        })
    }, [])

    return (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:h-full md:grid-cols-4 md:grid-rows-[1.45fr_1fr]">
            {/* ── Linha de cima ── */}

            {/* Destaque */}
            <motion.div {...revealFromCenter(0)} className="card relative flex min-h-[300px] flex-col justify-end overflow-hidden !bg-none !bg-black p-7 sm:col-span-2 md:min-h-0">
                {/* Mesma imagem fluida do template (Unsplash), com o mesmo tratamento */}
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-lighten"
                />
                <div className="relative">
                    <div className="mb-1 text-xl font-medium text-accent-lime">{hero.kicker}</div>
                    <div className="-ml-1 text-7xl font-bold leading-[0.85] tracking-tighter xl:text-[112px]" style={display}>
                        {hero.year}
                    </div>
                    <div className="glass mt-5 p-5">
                        <p className="text-sm font-medium opacity-90 lg:text-base">{hero.text}</p>
                    </div>
                </div>
            </motion.div>

            {/* Perfil (card branco, mesma estrutura do template) */}
            <motion.div {...revealFromCenter(1)} onMouseEnter={() => setPeek(true)}
                onMouseLeave={() => setPeek(false)}
                className="card relative flex min-h-[340px] flex-col !bg-none !bg-white p-6 2xl:p-7 text-black md:min-h-0">
                {/* Easter egg: hover no card branco faz o sticker espiar pelo canto superior direito */}
                <PeekSticker src={persona.sticker} show={peek} />

                <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-black md:hidden lg:flex 2xl:mb-4 2xl:h-20 2xl:w-20">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 2xl:h-10 2xl:w-10">
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                        </svg>
                    </div>
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wide opacity-60">{persona.prefix}</div>
                    <div className="text-2xl font-bold leading-tight md:text-base lg:text-2xl 2xl:text-[28px]" style={display}>
                        {persona.title[0]}
                        <br />
                        {persona.title[1]}
                    </div>
                </div>

                <p className="border-t border-black/10 pt-4 text-xs font-medium leading-relaxed lg:text-sm">{persona.text}</p>
            </motion.div>

            {/* GitHub */}
            <motion.div {...revealFromCenter(2)} className="card flex min-h-[300px] flex-col p-7 md:min-h-0">
                <Label className="mb-1">{github.label}</Label>
                <div className="text-2xl font-bold md:text-base lg:text-2xl 2xl:text-[28px]">{github.title}</div>
                <div className="mb-4 text-sm text-muted">{github.subtitle}</div>
                <div className="mt-auto grid grid-cols-7 gap-1.5">
                    {github.levels.map((lvl, i) => (
                        <div key={i} className={`aspect-square rounded ${LEVEL_BG[lvl]}`} />
                    ))}
                </div>
            </motion.div>

            {/* ── Linha de baixo ── */}

            {/* Stack (só ícones, sem porcentagem) */}
            <motion.div {...revealFromCenter(3)} className="card flex flex-col p-6">
                <h3 className="mb-auto text-lg">Stack principal</h3>
                <div className="mt-4 grid grid-cols-5 gap-2 md:grid-cols-4 lg:grid-cols-5">
                    {stack.map(({ name, icon: Icon }) => (
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

            {/* Especialidade — mesmo tratamento do card laranja da referência, em roxo */}
            <motion.div {...revealFromCenter(4)} className="card relative flex min-h-[200px] flex-col justify-between overflow-hidden !bg-none !bg-[#7928ca] p-6 text-black md:min-h-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#d8b4fe_0%,#a855f7_35%,transparent_75%),linear-gradient(135deg,#5b21b6,#9333ea)] opacity-90" />
                <div className="relative">
                    <div className="mb-1 text-xs font-bold uppercase">{category.label}</div>
                    <div className="text-2xl font-bold lg:text-3xl" style={display}>
                        {category.title}
                    </div>
                </div>
                <div className="relative">
                    <div className="mb-2 text-xs font-semibold">{category.paletteLabel}</div>
                    <div className="flex gap-2">
                        {category.palette.map((c) => (
                            <div key={c} className="h-9 w-9 rounded-full border-2 border-black" style={{ background: c }} />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Projetos entregues */}
            <motion.div {...revealFromCenter(5)} className="card flex min-h-[200px] flex-col justify-between p-6 md:min-h-0">
                <Label>{stats.label}</Label>
                <div>
                    <div
                        className="mb-3 whitespace-nowrap bg-gradient-to-br from-accent-purple to-accent-pink bg-clip-text text-4xl font-bold leading-none text-transparent 2xl:text-5xl"
                        style={display}
                    >
                        {stats.value}
                    </div>
                    <span className="inline-flex rounded-full bg-accent-lime/10 px-3 py-1 text-xs font-semibold text-accent-lime">{stats.badge}</span>
                </div>
            </motion.div>

            {/* Redes sociais */}
            <motion.div {...revealFromCenter(6)} className="card flex flex-col p-6">
                <h3 className="mb-auto text-lg">Redes</h3>
                <div className="mt-4 flex flex-col gap-2">
                    {socials.map((social) => {
                        const { name, icon: Icon } = social
                        const className =
                            "flex items-center gap-3 rounded-full border border-line px-3 py-2 text-left text-sm font-semibold transition-colors hover:border-line-hover hover:bg-white/5"
                        return "opensContact" in social ? (
                            <button key={name} type="button" onClick={() => setContactOpen(true)} className={className}>
                                <Icon size={20} />
                                {name}
                            </button>
                        ) : (
                            <a key={name} href={social.href} target="_blank" rel="noopener noreferrer" className={className}>
                                <Icon size={20} />
                                {name}
                            </a>
                        )
                    })}
                </div>
            </motion.div>

            <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
        </div>
    )
}

export default About
