import { useLayoutEffect, useRef, useState } from "react"
import arrowDownBoldDuotone from "@iconify-icons/solar/arrow-down-bold-duotone"
import diplomaBoldDuotone from "@iconify-icons/solar/diploma-bold-duotone"
import diplomaVerifiedBoldDuotone from "@iconify-icons/solar/diploma-verified-bold-duotone"
import serverBoldDuotone from "@iconify-icons/solar/server-bold-duotone"
import presentationGraphBoldDuotone from "@iconify-icons/solar/presentation-graph-bold-duotone"
import databaseBoldDuotone from "@iconify-icons/solar/database-bold-duotone"
import codeBoldDuotone from "@iconify-icons/solar/code-bold-duotone"
import type { IconifyIcon } from "@iconify/react/dist/offline"
import { Icon } from "@/components/ui/Icon"
import Reveal from "@/components/ui/Reveal"
import manSticker from "@/assets/stickers/man.png"

type TimelineItem = {
    key: string
    label: string
    sub: string
    years: string
    icon: IconifyIcon
    leftPct?: number
    startAfter?: string
    endWith?: string
    full?: boolean
    iconColor: string
}

const TIMELINE: TimelineItem[] = [
    { key: "tecnico", label: "Técnico de TI", sub: "IFMG", years: "20–22", leftPct: 0, iconColor: "var(--color-accent-pink)", icon: diplomaBoldDuotone },
    { key: "graduacao", label: "Graduação em Sistemas de Informação", sub: "IFMG", years: "23–26", startAfter: "tecnico", full: true, iconColor: "var(--color-accent-blue)", icon: diplomaVerifiedBoldDuotone },
    { key: "assessor", label: "Assessor de Marketing e TI", sub: "Office Jr. Consultoria", years: "24", leftPct: 24, iconColor: "var(--color-accent-orange)", icon: presentationGraphBoldDuotone },
    { key: "estagio", label: "Estágio em TI", sub: "Hospital FOB", years: "24", endWith: "assessor", iconColor: "var(--color-accent-green)", icon: serverBoldDuotone },
    { key: "analista", label: "Analista de Integrações", sub: "CLI", years: "24–25", startAfter: "estagio", iconColor: "var(--color-accent-blue)", icon: databaseBoldDuotone },
    { key: "dev", label: "Dev. Fullstack", sub: "ZTOtech", years: "25–atual", startAfter: "analista", full: true, iconColor: "var(--color-accent-orange)", icon: codeBoldDuotone },
]

type TimelineStyle = { marginLeft: number; width?: number }

const SKILLS = [
    {
        number: "01",
        title: "Linguagens",
        color: "var(--color-accent-pink)",
        description: "Trabalho com React, TypeScript, React Native, Java, Next.js e Node.js, tanto no front-end quanto no back-end.",
    },
    {
        number: "02",
        title: "Carreira",
        color: "var(--color-accent-blue)",
        description: "Do técnico em TI ao estágio no Hospital FOB, passando por integrações na CLI, até atuar hoje como Dev. Fullstack na ZTOtech.",
    },
    {
        number: "03",
        title: "Ferramentas",
        color: "var(--color-accent-orange)",
        description: "Já usei Git, Vercel e Godot, além de ferramentas e agentes de IA no dia a dia, sempre com revisão crítica do código gerado.",
    },
    {
        number: "04",
        title: "Aprendizado contínuo",
        color: "var(--color-accent-green)",
        description: "Busco qualidade, segurança e crescimento técnico contínuo em cada projeto que passo.",
    },
]

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})
    const [styles, setStyles] = useState<Record<string, TimelineStyle>>({})

    useLayoutEffect(() => {
        const recompute = () => {
            const containerWidth = containerRef.current?.clientWidth ?? 0
            const widths: Record<string, number> = {}
            TIMELINE.forEach((item) => {
                widths[item.key] = itemRefs.current[item.key]?.offsetWidth ?? 0
            })

            const next: Record<string, TimelineStyle> = {}
            TIMELINE.forEach((item) => {
                let marginLeft = 0
                if (item.leftPct !== undefined) {
                    marginLeft = (item.leftPct / 100) * containerWidth
                } else if (item.startAfter) {
                    const target = next[item.startAfter]
                    marginLeft = target.marginLeft + widths[item.startAfter]
                } else if (item.endWith) {
                    const target = next[item.endWith]
                    marginLeft = target.marginLeft + widths[item.endWith] - widths[item.key]
                }

                next[item.key] = {
                    marginLeft,
                    width: item.full ? containerWidth - marginLeft : undefined,
                }
            })

            setStyles(next)
        }

        recompute()
        window.addEventListener("resize", recompute)

        const observer = new ResizeObserver(() => recompute())
        Object.values(itemRefs.current).forEach((el) => {
            if (el) observer.observe(el)
        })
        if (containerRef.current) observer.observe(containerRef.current)

        document.fonts?.ready?.then(() => recompute())

        return () => {
            window.removeEventListener("resize", recompute)
            observer.disconnect()
        }
    }, [])

    const timelineDelay = (index: number) => index * 0.06
    const HERO_ITEMS = 5
    const heroDelay = (index: number) => (HERO_ITEMS - 1 - index) * 0.1

    return (
        <div className="min-h-screen w-full px-6 py-24 sm:px-10">
            <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-28 pb-32">
                <Reveal delay={heroDelay(0)}>
                    <h1
                        className="text-center text-8xl sm:text-9xl md:text-[10rem] font-extrabold leading-[0.95] text-base-ink"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Sou o Eduardo.
                    </h1>
                </Reveal>

                <div className="flex flex-col items-center gap-28 sm:flex-row sm:items-start">
                    <Reveal delay={heroDelay(1)}>
                        <div className="relative">
                            <div className="glass flex h-[385px] w-[385px] shrink-0 items-center justify-center overflow-hidden rounded-t-full">
                                {/* placeholder — troque por uma foto real */}
                            </div>
                            <img
                                src={manSticker}
                                alt=""
                                aria-hidden="true"
                                className="pointer-events-none absolute -bottom-6 -right-20 hidden h-40 w-40 object-contain sm:block"
                            />
                        </div>
                    </Reveal>

                    <div className="flex flex-1 flex-col gap-16">
                        <Reveal delay={heroDelay(2)}>
                            <h2
                                className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-base-ink"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Sou desenvolvedor, apaixonado por transformar ideias em produtos digitais reais.
                            </h2>
                        </Reveal>

                        <Reveal delay={heroDelay(3)}>
                            <p className="text-2xl text-ink-soft">
                                Atuo tanto no front-end quanto no back-end, com experiência prática em Node.js, TypeScript
                                e React Native. Construo e mantenho APIs REST, integrações entre sistemas e aplico boas
                                práticas de Clean Code e organização em camadas.
                            </p>
                        </Reveal>

                        <Reveal delay={heroDelay(4)}>
                            <p className="text-2xl text-ink-soft">
                                Hoje, uso ferramentas e agentes de IA no meu fluxo de trabalho diário, sempre com revisão
                                crítica do código gerado — buscando qualidade, segurança e crescimento técnico contínuo.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>

            <Reveal delay={0.1}>
                <section className="mx-auto flex w-full max-w-[85rem] flex-col items-center gap-6 px-6 sm:px-10 pt-16 pb-20 text-center">
                    <h2
                        className="text-6xl sm:text-7xl md:text-8xl font-extrabold leading-[0.95]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        <span className="text-base-ink">Minha</span>
                        <br />
                        <span className="text-ink-soft">trajetória</span>
                    </h2>

                    <Icon icon={arrowDownBoldDuotone} size={40} />
                </section>
            </Reveal>

            <div ref={containerRef} className="mx-auto flex w-full max-w-[85rem] flex-col gap-6 px-6 pb-24 sm:px-10">
                {[...TIMELINE].reverse().map((item, index) => {
                    const style = styles[item.key]
                    return (
                        <Reveal key={item.key} delay={timelineDelay(index)}>
                            <div
                                ref={(el) => {
                                    itemRefs.current[item.key] = el
                                }}
                                className={`glass flex h-[95px] items-center gap-3 whitespace-nowrap rounded-full pl-4 pr-5 sm:gap-4 sm:pl-5 sm:pr-6 ${item.full ? "" : "w-fit"}`}
                                style={{
                                    marginLeft: style ? `${style.marginLeft}px` : `${item.leftPct ?? 0}%`,
                                    width: style?.width !== undefined ? `${style.width}px` : undefined,
                                }}
                            >
                                <div
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-base-bg sm:h-12 sm:w-12"
                                    style={{ color: item.iconColor }}
                                >
                                    <Icon icon={item.icon} size={19} />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-base-ink sm:text-base" style={{ fontFamily: "var(--font-display)" }}>
                                        {item.label}
                                    </p>
                                    <p className="text-xs text-ink-soft sm:text-sm">
                                        {item.sub} · {item.years}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    )
                })}
            </div>

            <Reveal delay={0.1} className="mx-auto w-full max-w-[85rem] px-6 pb-24 sm:px-10">
                <div className="glass grid grid-cols-1 gap-x-16 gap-y-20 rounded-[3rem] p-12 sm:grid-cols-2 sm:p-24">
                    {SKILLS.map((skill) => (
                        <div key={skill.number} className="flex flex-col gap-4">
                            <p className="text-4xl font-extrabold text-ink-soft/50" style={{ fontFamily: "var(--font-display)" }}>
                                {skill.number}
                            </p>
                            <p className="text-3xl font-extrabold text-base-ink sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
                                {skill.title}
                            </p>
                            <p className="text-xl text-ink-soft">{skill.description}</p>
                        </div>
                    ))}
                </div>
            </Reveal>
        </div>
    )
}

export default About
