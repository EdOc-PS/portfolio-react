import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import type { Project } from "@/types/project"
import { revealFromCenter } from "@/lib/motion"
import { GithubIcon } from "@dev.icons/react/mono"

/** Links do Mongo às vezes vêm sem protocolo (ex.: "app.vercel.app") */
const toUrl = (url?: string) => {
    const u = url?.trim()
    if (!u) return undefined
    return /^https?:\/\//.test(u) ? u : `https://${u}`
}

const GlobeIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
    </svg>
)

interface ProjectCardProps {
    project: Project
    /** Posição na lista — define o atraso da animação de entrada */
    index: number
    active: boolean
    onActiveChange: (active: boolean) => void
    /** false = fica fechado (loader na tela); true = abre com a animação */
    revealed: boolean
    /** Avisa a galeria que a capa (imagem ou 1º quadro do vídeo) já carregou — ou falhou */
    onReady: () => void
}

const ProjectCard = ({ project, index, active, onActiveChange, revealed, onReady }: ProjectCardProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const readyRef = useRef(false)
    const markReady = () => {
        if (readyRef.current) return
        readyRef.current = true
        onReady()
    }
    // Strings vazias do Mongo (ex.: image: '') contam como "sem mídia"
    const image = project.image?.trim() || undefined
    const video = project.video?.trim() || undefined
    // Sem mídia o card é só o fundo branco → texto escuro pra continuar legível
    const darkText = !image && !video
    const github = toUrl(project.github)
    const live = toUrl(project.live)

    // Card sem mídia já nasce pronto; imagem que veio do cache pode não disparar onLoad
    // (idem vídeo: se o 1º quadro já estava disponível ao montar, o loadeddata pode ter passado)
    useEffect(() => {
        if (!image && !video) markReady()
        else if (image && imgRef.current?.complete) markReady()
        else if (!image && (videoRef.current?.readyState ?? 0) >= 2) markReady()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            {...revealFromCenter(index, revealed)}
            data-id={project._id}
            // Mobile: ocupa o slot do MobileCarousel. md+: divide a linha e cresce no hover.
            className={`relative h-full min-h-0 w-full min-w-0 overflow-hidden md:w-auto md:basis-0 rounded-[var(--radius-card)] border border-line bg-white
                transition-[flex-grow,box-shadow,opacity,border-color] duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                ${active ? "shadow-2xl shadow-white/10 md:grow-[2.5]" : "opacity-90 md:grow"}`}
            onMouseEnter={() => onActiveChange(true)}
            onMouseLeave={() => onActiveChange(false)}
            onClick={() => onActiveChange(true)}
        >
            {image && (
                <img
                    ref={imgRef}
                    src={image}
                    alt={project.title}
                    onLoad={markReady}
                    onError={markReady}
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
                    // Sem imagem, o vídeo é a capa: o card só fica pronto quando o 1º quadro chega
                    onLoadedData={image ? undefined : markReady}
                    onCanPlay={image ? undefined : markReady}
                    onError={image ? undefined : markReady}
                    loop
                    muted
                    playsInline
                    preload="auto"
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
                        className={`flex items-center gap-4 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${active ? "opacity-100 delay-150" : "opacity-0"}`}
                    >
                        <div className="min-w-0 flex-1">
                            <h3 className={`truncate whitespace-nowrap text-sm uppercase tracking-[0.3em] ${darkText ? "text-black" : "text-white"}`}>{project.title}</h3>
                            {/* Subtítulo do Mongo; sem ele, cai nas 3 primeiras tecnologias */}
                            {(project.subtitle || project.technologies?.length > 0) && (
                                <p className={`mt-1 truncate whitespace-nowrap text-xs uppercase tracking-[0.25em] ${darkText ? "text-black/60" : "text-white/70"}`}>
                                    {project.subtitle || project.technologies.slice(0, 3).join(" · ")}
                                </p>
                            )}
                        </div>

                        {/* Links do Mongo (repositório e site), abrindo em nova aba */}
                        {(github || live) && (
                            <div className={`flex shrink-0 gap-2 ${darkText ? "text-black" : "text-white"}`}>
                                {github && (
                                    <a href={github} target="_blank" rel="noopener noreferrer" title="Repositório" aria-label="Repositório no GitHub"
                                        className="flex h-9 w-9 items-center justify-center rounded-full border border-current/25 transition-colors hover:bg-white/15">
                                        <GithubIcon size={18} />
                                    </a>
                                )}
                                {live && (
                                    <a href={live} target="_blank" rel="noopener noreferrer" title="Ver online" aria-label="Abrir o site do projeto"
                                        className="flex h-9 w-9 items-center justify-center rounded-full border border-current/25 transition-colors hover:bg-white/15">
                                        <GlobeIcon />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard
