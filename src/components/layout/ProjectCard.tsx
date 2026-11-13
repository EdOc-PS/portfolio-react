import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import type { Project } from "@/types/project"
import { revealFromCenter } from "@/lib/motion"

interface ProjectCardProps {
    project: Project
    /** Posição na lista — define o atraso da animação de entrada */
    index: number
    active: boolean
    onActiveChange: (active: boolean) => void
}

const ProjectCard = ({ project, index, active, onActiveChange }: ProjectCardProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    // Strings vazias do Mongo (ex.: image: '') contam como "sem mídia"
    const image = project.image?.trim() || undefined
    const video = project.video?.trim() || undefined
    // Sem mídia o card é só o fundo branco → texto escuro pra continuar legível
    const darkText = !image && !video

    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        if (active) {
            video.currentTime = 0
            video.play().catch(() => {})
        } else {
            video.pause()
        }
    }, [active])

    return (
        <motion.div
            {...revealFromCenter(index)}
            className={`relative min-h-0 min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-line bg-white
                transition-[flex-grow,box-shadow,opacity,border-color] duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                ${active ? "grow-[2.5] shadow-2xl shadow-white/10" : "grow opacity-90"}`}
            style={{ flexBasis: 0 }}
            onMouseEnter={() => onActiveChange(true)}
            onMouseLeave={() => onActiveChange(false)}
            onClick={() => onActiveChange(true)}
        >
            {image && (
                <img
                    src={image}
                    alt={project.title}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700
                        ${active ? (video ? "opacity-0" : "opacity-100") : "opacity-100 grayscale brightness-75"}`}
                />
            )}

            {video && (
                <video
                    ref={videoRef}
                    // "#t=0.1" faz o navegador carregar o 1º quadro → serve de capa quando não há imagem
                    src={image ? video : `${video}#t=0.1`}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700
                        ${active ? "opacity-100" : image ? "opacity-0" : "opacity-100 grayscale brightness-75"}`}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                />
            )}

            {/* Box de info:
                - ocupa a largura toda do card (sem sobra à direita) e o texto nunca quebra linha:
                  quando o card encolhe, o box encolhe junto e o texto só é cortado com "…";
                - em vez de animar `opacity` (que faz o backdrop-filter "piscar" e sumir de uma vez),
                  o vidro se desfaz animando o próprio blur, o fundo e a borda até zero; o texto
                  some com opacidade normal. Tudo com a mesma curva, então sai suave. */}
            <div className={`absolute inset-x-0 bottom-0 p-4 md:p-6 ${active ? "" : "pointer-events-none"}`}>
                <div
                    className={`rounded-[var(--radius-glass)] border-t p-5 md:p-6
                        transition-[backdrop-filter,background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${active
                            ? "translate-y-0 border-white/20 bg-white/10 backdrop-blur-md delay-100"
                            : "translate-y-3 border-transparent bg-white/0 backdrop-blur-none"}`}
                >
                    <div
                        className={`transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${active ? "opacity-100 delay-150" : "opacity-0"}`}
                    >
                        <h3 className={`truncate whitespace-nowrap text-sm uppercase tracking-[0.3em] ${darkText ? "text-black" : "text-white"}`}>{project.title}</h3>
                        {/* Subtítulo do Mongo; sem ele, cai nas 3 primeiras tecnologias */}
                        {(project.subtitle || project.technologies?.length > 0) && (
                            <p className={`mt-1 truncate whitespace-nowrap text-xs uppercase tracking-[0.25em] ${darkText ? "text-black/60" : "text-white/70"}`}>
                                {project.subtitle || project.technologies.slice(0, 3).join(" · ")}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard
