import { useRef } from "react"
import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react"
import arrowRightUpBoldDuotone from "@iconify-icons/solar/arrow-right-up-bold-duotone"
import githubIcon from "@iconify-icons/simple-icons/github"
import { Icon } from "@/components/ui/Icon"
import type { Project } from "@/pages/work/projects"

interface FeaturedProjectProps {
    project?: Project
    tag?: string
}

// Largura/altura do card no estado inicial (antes de expandir).
const CARD_W = "min(100vw - 3rem, 80rem)"
const CARD_H = `(${CARD_W}) * 9 / 18`

const toAbsoluteUrl = (url?: string) => {
    const value = url?.trim()
    if (!value) return undefined
    return /^https?:\/\//i.test(value) ? value : `https://${value}`
}

/**
 * Card que começa no tamanho normal e, ao rolar, expande até ocupar a tela toda.
 * Depois de expandido segue rolando em tela cheia; rolando para cima, volta ao tamanho inicial.
 */
const FeaturedProject = ({ project, tag }: FeaturedProjectProps) => {
    const containerRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })

    // 1 = tamanho de card, 0 = tela cheia. Expande na primeira metade do trecho fixo.
    const t = useTransform(scrollYProgress, [0, 0.5], [1, 0], { clamp: true })
    const insetX = useMotionTemplate`calc((100vw - ${CARD_W}) / 2 * ${t})`
    const insetY = useMotionTemplate`calc((100vh - ${CARD_H}) / 2 * ${t})`
    const radius = useMotionTemplate`calc(2.5rem * ${t})`

    const githubHref = toAbsoluteUrl(project?.github)
    const detailHref = toAbsoluteUrl(project?.live) || githubHref

    return (
        <section ref={containerRef} className="relative h-[250vh] md:-mx-32">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <motion.div
                    onClick={() => detailHref && window.open(detailHref, "_blank", "noopener,noreferrer")}
                    style={{ top: insetY, bottom: insetY, left: insetX, right: insetX, borderRadius: radius }}
                    className={`group absolute overflow-hidden ${project ? "" : "animate-pulse bg-base-ink/10"} ${detailHref ? "cursor-pointer" : ""}`}
                >
                    {project && (
                        <>
                            {!project.image && !project.video && (
                                <div
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{ background: "linear-gradient(135deg, #ff6fae, #ffb3d1)" }}
                                >
                                    <span className="select-none text-8xl font-extrabold text-white/70" style={{ fontFamily: "var(--font-display)" }}>
                                        {project.title.charAt(0)}
                                    </span>
                                </div>
                            )}

                            {project.image && !project.video && (
                                <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
                            )}

                            {project.video && (
                                <video
                                    src={project.video}
                                    poster={project.image}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            )}

                            {tag && (
                                <div className="glass-dark absolute right-4 top-4 rounded-full px-4 py-2">
                                    <span className="text-xs font-bold uppercase tracking-wide text-base-bg" style={{ fontFamily: "var(--font-display)" }}>
                                        {tag}
                                    </span>
                                </div>
                            )}

                            <div className="absolute bottom-4 right-4 flex items-center gap-2">
                                {githubHref && (
                                    <a
                                        href={githubHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label="Repositório no GitHub"
                                        className="glass-dark flex h-11 w-11 items-center justify-center rounded-full text-base-bg transition-transform duration-300 hover:scale-105"
                                    >
                                        <Icon icon={githubIcon} size={18} />
                                    </a>
                                )}
                                {detailHref && (
                                    <a
                                        href={detailHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label={`Abrir ${project.title}`}
                                        className="glass-dark flex h-11 w-11 items-center justify-center rounded-full text-base-bg transition-transform duration-300 hover:scale-105"
                                    >
                                        <Icon icon={arrowRightUpBoldDuotone} size={20} />
                                    </a>
                                )}
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </section>
    )
}

export default FeaturedProject
