import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import type { Project } from "@/types/project"
import { revealFromCenter } from "@/lib/motion"
import { GithubIcon } from "@dev.icons/react/mono"
import GlobeIcon from "@/components/ui/GlobeIcon"

const THUMB_TIME = 6

const toUrl = (url?: string) => {
    const u = url?.trim()
    if (!u) return undefined
    return /^https?:\/\//.test(u) ? u : `https://${u}`
}

interface ProjectCardProps {
    project: Project
    index: number
    active: boolean
    onActiveChange: (active: boolean) => void
    revealed: boolean
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
    const image = project.image?.trim() || undefined
    const video = project.video?.trim() || undefined
    const darkText = !image && !video
    const darkGlass = project.dark === true
    const github = toUrl(project.github)
    const live = toUrl(project.live)

    const checkCachedMedia = () => {
        if (!image && !video) markReady()
        else if (image && imgRef.current?.complete) markReady()
        else if (!image && (videoRef.current?.readyState ?? 0) >= 2) markReady()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(checkCachedMedia, [])

    const syncVideo = () => {
        const video = videoRef.current
        if (!video) return
        if (active) {
            video.currentTime = 0
            video.play().catch(() => {})
        } else {
            video.pause()
            if (!image) video.currentTime = THUMB_TIME
        }
    }
    useEffect(syncVideo, [active])

    return (
        <motion.div
            {...revealFromCenter(index, revealed)}
            data-id={project._id}
            className={`relative h-full min-h-0 w-full min-w-0 overflow-hidden md:w-auto md:basis-0 rounded-[var(--radius-card)] border border-line ${darkText ? "bg-white" : "bg-black"}
                transition-[flex-grow,box-shadow,opacity,border-color] duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                ${active ? "shadow-2xl shadow-white/10 md:grow-[2.5]" : "opacity-90 md:grow"}`}
            onMouseEnter={() => onActiveChange(true)}
            onMouseLeave={() => onActiveChange(false)}
            onClick={() => onActiveChange(true)}
        >
            {/* Capa */}
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

            {/* Vídeo */}
            {video && (
                <video
                    ref={videoRef}
                    src={image ? video : `${video}#t=${THUMB_TIME}`}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700
                        ${active ? "opacity-100" : image ? "opacity-0" : "opacity-100 grayscale brightness-75"}`}
                    onLoadedData={image ? undefined : markReady}
                    onCanPlay={image ? undefined : markReady}
                    onError={image ? undefined : markReady}
                    loop
                    muted
                    playsInline
                    preload="auto"
                />
            )}

            {/* Box de info */}
            <div className={`absolute inset-x-0 bottom-0 p-4 md:p-6 ${active ? "" : "pointer-events-none"}`}>
                <div
                    className={`rounded-[var(--radius-glass)] border-t p-5 md:p-6
                        transition-[backdrop-filter,background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${active
                            ? `translate-y-0 backdrop-blur-md delay-100 ${darkGlass ? "border-white/20 bg-black/25 backdrop-saturate-150" : "border-white/20 bg-white/10"}`
                            : "translate-y-3 border-transparent bg-white/0 backdrop-blur-none"}`}
                >
                    <div
                        className={`flex items-center gap-4 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${active ? "opacity-100 delay-150" : "opacity-0"}`}
                    >
                        <div className="min-w-0 flex-1">
                            <h3 className={`truncate whitespace-nowrap text-sm uppercase tracking-[0.3em] ${darkText ? "text-black" : "text-white"}`}>{project.title}</h3>
                            {(project.subtitle || project.technologies?.length > 0) && (
                                <p className={`mt-1 truncate whitespace-nowrap text-xs uppercase tracking-[0.25em] ${darkText ? "text-black/60" : "text-white/70"}`}>
                                    {project.subtitle || project.technologies.slice(0, 3).join(" · ")}
                                </p>
                            )}
                        </div>

                        {/* Links do projeto */}
                        {(github || live) && (
                            <div className={`flex shrink-0 gap-2 ${darkText ? "text-black" : "text-white"}`}>
                                {github && (
                                    <a href={github} target="_blank" rel="noopener noreferrer" title="Repositório" aria-label="Repositório no GitHub"
                                        className={`flex h-9 w-9 items-center justify-center rounded-full border border-current/25 transition-colors ${darkText ? "hover:bg-black/10" : "hover:bg-white/15"}`}>
                                        <GithubIcon size={18} />
                                    </a>
                                )}
                                {live && (
                                    <a href={live} target="_blank" rel="noopener noreferrer" title="Ver online" aria-label="Abrir o site do projeto"
                                        className={`flex h-9 w-9 items-center justify-center rounded-full border border-current/25 transition-colors ${darkText ? "hover:bg-black/10" : "hover:bg-white/15"}`}>
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
