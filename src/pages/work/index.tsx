import { NavLink } from "react-router-dom"
import { motion } from "motion/react"
import arrowDownBoldDuotone from "@iconify-icons/solar/arrow-down-bold-duotone"
import arrowRightUpBoldDuotone from "@iconify-icons/solar/arrow-right-up-bold-duotone"
import { Icon } from "@/components/ui/Icon"
import ProjectCard from "@/components/ui/ProjectCard"
import FeaturedProject from "@/components/ui/FeaturedProject"
import Reveal from "@/components/ui/Reveal"
import { useEffect, useState } from "react"
import type { Project } from "@/pages/work/projects"
import { GetRequest } from "@/service/getRequest"
import lightbulbSticker from "@/assets/stickers/product.png"

const Work = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        GetRequest("/api/projects")
            .then((res) => setProjects(res?.success ? res.projects : []))
            .finally(() => setLoading(false))
    }, [])

    // Durante o loading mostra skeletons nos 5 slots; depois só os projetos existentes.
    const slot = (i: number): Project | undefined | null => (loading ? undefined : (projects[i] ?? null))
    const featured = slot(0)
    const s1 = slot(1), s2 = slot(2), s3 = slot(3), s4 = slot(4)

    return (
        <div className="min-h-screen w-full">
            {/* Hero */}
            <section className="relative flex min-h-screen w-full flex-col items-center justify-between gap-6 px-6 pt-10 pb-10 text-center">
                <Reveal delay={0.46}>
                    <h1
                        className="text-7xl sm:text-8xl md:text-9xl font-extrabold leading-[0.95] text-base-ink"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        <span className="inline-flex items-center gap-3">
                            Boas ideias
                            <motion.img
                                src={lightbulbSticker}
                                alt=""
                                aria-hidden
                                className="pointer-events-none inline-block w-20 select-none sm:w-24 md:w-28"
                                animate={{ y: [0, -10, 0], rotate: [-6, 2, -6] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </span>
                        <br />
                        <span className="text-ink-soft">começam por aqui</span>
                    </h1>
                </Reveal>

                <Reveal delay={0.36} className="flex flex-col items-center gap-4">
                    <p className="max-w-2xl text-3xl text-ink-soft" style={{ fontFamily: "var(--font-body)" }}>
                        <span className="mb-2 block text-lg font-bold text-base-ink">Albert Einstein</span>
                        “A imaginação é mais importante que o conhecimento, porque o conhecimento é limitado, ao passo que a imaginação abrange o mundo inteiro.”
                    </p>

                    <div className="relative inline-flex items-center justify-center">
                        <NavLink
                            to="/contact"
                            className="glass relative flex items-center gap-3 rounded-full px-6 py-3 text-base font-bold text-base-ink transition-transform duration-300 hover:scale-105"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Entre em contato
                            <Icon icon={arrowRightUpBoldDuotone} size={18} />
                        </NavLink>
                    </div>
                </Reveal>
            </section>

            {/* Projeto em destaque */}
            {featured !== null && <FeaturedProject project={featured ?? undefined} tag="Projeto em destaque" />}

            {/* Texto + estatísticas */}
            <Reveal delay={0.24}>
                <section className="mx-auto flex w-full max-w-[85rem] flex-col items-center gap-6 px-6 sm:px-10 pt-32 pb-32 text-center">
                    <h2
                        className="text-6xl sm:text-7xl md:text-8xl font-extrabold leading-[0.95]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        <span className="text-base-ink">Meus</span>
                        <br />
                        <span className="text-ink-soft">projetos</span>
                    </h2>

                    <Icon icon={arrowDownBoldDuotone} size={40} />

                    <p className="max-w-2xl text-2xl text-ink-soft">
                        Uma seleção de trabalhos que mostram como ideias viram produtos: do primeiro rascunho ao detalhe de implementação.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-8">
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-base-ink" style={{ fontFamily: "var(--font-display)" }}>+10</p>
                            <p className="text-sm text-ink-soft">Participações em projetos</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-base-ink" style={{ fontFamily: "var(--font-display)" }}>5</p>
                            <p className="text-sm text-ink-soft">Projetos concluídos</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-base-ink" style={{ fontFamily: "var(--font-display)" }}>+20</p>
                            <p className="text-sm text-ink-soft">Tecnologias</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-base-ink" style={{ fontFamily: "var(--font-display)" }}>+2</p>
                            <p className="text-sm text-ink-soft">Anos de experiência</p>
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* Grid de projetos prontos */}
            <section className="mx-auto flex w-full max-w-[85rem] flex-col gap-8 px-6 sm:px-10 pb-24">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:auto-rows-[28rem]">
                    {s1 !== null && (
<Reveal delay={0.18}>
                        <ProjectCard project={s1 ?? undefined} className="aspect-4/3 sm:aspect-auto" />
                    </Reveal>
)}
                    {s3 !== null && (
<Reveal delay={0.12} className="sm:row-span-2">
                        <ProjectCard project={s3 ?? undefined} noZoom className="aspect-4/3 sm:aspect-auto h-full" />
                    </Reveal>
)}
                    {s2 !== null && (
<Reveal delay={0.06}>
                        <ProjectCard project={s2 ?? undefined} className="aspect-4/3 sm:aspect-auto" />
                    </Reveal>
)}
                </div>

                {s4 !== null && (
<Reveal delay={0}>
                    <ProjectCard project={s4 ?? undefined} className="aspect-4/3 sm:aspect-21/9" />
                </Reveal>
)}
            </section>
        </div>
    )
}

export default Work
