import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import arrowRightUpBoldDuotone from "@iconify-icons/solar/arrow-right-up-bold-duotone"
import githubIcon from "@iconify-icons/simple-icons/github"
import { Icon } from "@/components/ui/Icon"
import type { Project } from "@/pages/work/projects"

interface ProjectCardProps {
    project?: Project
    className?: string
    tag?: string
}

const FALLBACK_GRADIENTS = [
    "linear-gradient(135deg, #ff7a59, #ffb35c)",
    "linear-gradient(135deg, #7b8fd4, #a3b3ff)",
    "linear-gradient(135deg, #3ecf8e, #9be15d)",
    "linear-gradient(135deg, #ff6fae, #ffb3d1)",
]

const gradientFor = (title: string) =>
    FALLBACK_GRADIENTS[[...title].reduce((acc, c) => acc + c.charCodeAt(0), 0) % FALLBACK_GRADIENTS.length]

// Garante URL absoluta: sem protocolo o navegador trata como caminho relativo ao site.
const toAbsoluteUrl = (url?: string) => {
    const value = url?.trim()
    if (!value) return undefined
    return /^https?:\/\//i.test(value) ? value : `https://${value}`
}

const ProjectCard = ({ project, className = "", tag }: ProjectCardProps) => {

    const ref = useRef<HTMLDivElement>(null)
    const githubHref = toAbsoluteUrl(project?.github)
    const detailHref = toAbsoluteUrl(project?.live) || githubHref

    const mouseX = useMotionValue(0.5)
    const mouseY = useMotionValue(0.5)

    const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 250, damping: 20 })
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 250, damping: 20 })
    const scale = useSpring(1, { stiffness: 250, damping: 20 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        mouseX.set((e.clientX - rect.left) / rect.width)
        mouseY.set((e.clientY - rect.top) / rect.height)
    }

    const handleMouseEnter = () => scale.set(1.04)

    const handleMouseLeave = () => {
        scale.set(1)
        mouseX.set(0.5)
        mouseY.set(0.5)
    }

    if (!project) {
        return <div className={`h-full w-full animate-pulse rounded-[2.5rem] bg-base-ink/10 ${className}`} />
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => detailHref && window.open(detailHref, "_blank", "noopener,noreferrer")}
            style={{ rotateX, rotateY, scale, transformPerspective: 800 }}
            className={`group relative block h-full w-full overflow-hidden rounded-[2.5rem] ${detailHref ? "cursor-pointer" : ""} ${className}`}
        >
            {!project.image && !project.video && (
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: gradientFor(project.title) }}
                >
                    <span className="select-none text-8xl font-extrabold text-white/70" style={{ fontFamily: "var(--font-display)" }}>
                        {project.title.charAt(0)}
                    </span>
                </div>
            )}

            {project.image && (
            <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
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
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            )}

            {tag && (
                <div className="glass-dark absolute right-4 top-4 rounded-full px-4 py-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-base-bg" style={{ fontFamily: "var(--font-display)" }}>
                        {tag}
                    </span>
                </div>
            )}

            <div className="glass-dark absolute left-4 top-4 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full px-4 py-2">
                <span className="truncate text-sm font-bold text-base-bg" style={{ fontFamily: "var(--font-display)" }}>
                    {project.title}
                </span>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
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
                {detailHref ? (
                    <a
                        href={detailHref}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Abrir ${project.title}`}
                        className="glass-dark flex h-11 w-11 items-center justify-center rounded-full text-base-bg transition-transform duration-300 hover:scale-105"
                    >
                        <Icon icon={arrowRightUpBoldDuotone} size={20} />
                    </a>
                ) : (
                    <div className="glass-dark flex h-11 w-11 items-center justify-center rounded-full text-base-bg">
                        <Icon icon={arrowRightUpBoldDuotone} size={20} />
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default ProjectCard
