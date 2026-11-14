import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import type { Project } from "@/types/project"
import { GetRequest } from "@/service/getRequest"
import { MOCK_PROJECTS } from "@/data/mockProjects"
import WaveLoader from "@/components/ui/WaveLoader"
import ProjectCard from "./ProjectCard"
import MobileCarousel from "./MobileCarousel"

const MAX_PROJECTS = 5
const MOBILE_QUERY = "(max-width: 767px)"
/** Tempo mínimo do loader na tela, pra onda não "piscar" quando tudo vem do cache */
const MIN_LOADER_MS = 900
/** Se alguma mídia travar, abre os cards mesmo assim depois disso */
const MAX_LOADER_MS = 8000

/** Acompanha o breakpoint (rotação de tela / resize) */
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)
    useEffect(() => {
        const mq = window.matchMedia(MOBILE_QUERY)
        const onChange = () => setIsMobile(mq.matches)
        mq.addEventListener("change", onChange)
        return () => mq.removeEventListener("change", onChange)
    }, [])
    return isMobile
}

interface ProjectGalleryProps {
    /** Avisa o cursor global quando algum card está em foco */
    onCursorActive: (active: boolean) => void
}

/**
 * md+: cards lado a lado, o do hover expande.
 * Mobile: MobileCarousel (arrastar com o dedo); o card do centro é o "ativo".
 *
 * Carregamento: enquanto a requisição roda ou as capas (imagem / 1º quadro do vídeo)
 * não chegam, aparece o WaveLoader. Os cards já ficam montados (fechados), baixando
 * as mídias por trás; quando tudo está pronto, o loader sai e eles se abrem um por um.
 */
const ProjectGallery = ({ onCursorActive }: ProjectGalleryProps) => {
    const isMobile = useIsMobile()
    const [projects, setProjects] = useState<Project[] | null>(null)
    const [readyCount, setReadyCount] = useState(0)
    const [minTimePassed, setMinTimePassed] = useState(false)
    const [timedOut, setTimedOut] = useState(false)
    const [hoveredId, setHoveredId] = useState<string | null>(null) // desktop
    const [slide, setSlide] = useState(0) // mobile

    useEffect(() => {
        GetRequest("/api/projects").then((data) => {
            const fromDb: Project[] | undefined = data?.projects
            // Mostra exatamente o que tem no Mongo (4 → 4 cards), no máximo 5
            setProjects((fromDb?.length ? fromDb : MOCK_PROJECTS).slice(0, MAX_PROJECTS))
        })
        const min = setTimeout(() => setMinTimePassed(true), MIN_LOADER_MS)
        const max = setTimeout(() => setTimedOut(true), MAX_LOADER_MS)
        return () => {
            clearTimeout(min)
            clearTimeout(max)
        }
    }, [])

    const loaded = projects !== null && (readyCount >= projects.length || timedOut)
    const revealed = loaded && minTimePassed
    const handleReady = useCallback(() => setReadyCount((n) => n + 1), [])

    // Card ativo: no mobile é o slide atual; no desktop, o do hover
    const activeId = !revealed ? null : isMobile ? (projects?.[slide]?._id ?? null) : hoveredId

    useEffect(() => {
        onCursorActive(!isMobile && activeId !== null)
        return () => onCursorActive(false)
    }, [activeId, isMobile, onCursorActive])

    const cards = (projects ?? []).map((project, i) => (
        <ProjectCard
            key={project._id}
            project={project}
            index={i}
            revealed={revealed}
            onReady={handleReady}
            active={activeId === project._id}
            onActiveChange={(on) => {
                if (!revealed || isMobile) return // no mobile quem manda é o carrossel
                setHoveredId(on ? project._id : null)
            }}
        />
    ))

    return (
        <div className="relative h-[72vh] md:h-full">
            <AnimatePresence>
                {!revealed && (
                    <motion.div
                        className="absolute inset-0 z-10 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <WaveLoader />
                    </motion.div>
                )}
            </AnimatePresence>

            {isMobile ? (
                <MobileCarousel items={cards} index={slide} onIndexChange={setSlide} />
            ) : (
                <div className="flex h-full gap-4">{cards}</div>
            )}
        </div>
    )
}

export default ProjectGallery
