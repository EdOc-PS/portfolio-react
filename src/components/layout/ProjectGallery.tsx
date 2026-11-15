import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import type { Project } from "@/types/project"
import { GetRequest } from "@/service/getRequest"
import { MOCK_PROJECTS } from "@/data/mockProjects"
import WaveLoader from "@/components/ui/WaveLoader"
import ProjectCard from "./ProjectCard"
import MobileCarousel from "./MobileCarousel"
import useIsMobile from "@/hooks/useIsMobile"

const MAX_PROJECTS = 5
const MIN_LOADER_MS = 900
const MAX_LOADER_MS = 8000

interface ProjectGalleryProps {
    onCursorActive: (active: boolean) => void
}

const ProjectGallery = ({ onCursorActive }: ProjectGalleryProps) => {
    const isMobile = useIsMobile()
    const [projects, setProjects] = useState<Project[] | null>(null)
    const [readyCount, setReadyCount] = useState(0)
    const [minTimePassed, setMinTimePassed] = useState(false)
    const [timedOut, setTimedOut] = useState(false)
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [slide, setSlide] = useState(0)

    const loadProjects = () => {
        GetRequest("/api/projects").then((data) => {
            const fromDb: Project[] | undefined = data?.projects
            setProjects((fromDb?.length ? fromDb : MOCK_PROJECTS).slice(0, MAX_PROJECTS))
        })
        const min = setTimeout(() => setMinTimePassed(true), MIN_LOADER_MS)
        const max = setTimeout(() => setTimedOut(true), MAX_LOADER_MS)
        return () => {
            clearTimeout(min)
            clearTimeout(max)
        }
    }
    useEffect(loadProjects, [])

    const loaded = projects !== null && (readyCount >= projects.length || timedOut)
    const revealed = loaded && minTimePassed
    const handleReady = useCallback(() => setReadyCount((n) => n + 1), [])

    const activeId = !revealed ? null : isMobile ? (projects?.[slide]?._id ?? null) : hoveredId

    const syncCursor = () => {
        onCursorActive(!isMobile && activeId !== null)
        return () => onCursorActive(false)
    }
    useEffect(syncCursor, [activeId, isMobile, onCursorActive])

    const cards = (projects ?? []).map((project, i) => (
        <ProjectCard
            key={project._id}
            project={project}
            index={i}
            revealed={revealed}
            onReady={handleReady}
            active={activeId === project._id}
            onActiveChange={(on) => {
                if (!revealed || isMobile) return
                setHoveredId(on ? project._id : null)
            }}
        />
    ))

    return (
        <div className="relative h-[72vh] md:h-full">
            {/* Loader */}
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

            {/* Cards dos projetos: carrossel no mobile, fileira no desktop */}
            {isMobile ? (
                <MobileCarousel items={cards} index={slide} onIndexChange={setSlide} />
            ) : (
                <div className="flex h-full gap-4">{cards}</div>
            )}
        </div>
    )
}

export default ProjectGallery
