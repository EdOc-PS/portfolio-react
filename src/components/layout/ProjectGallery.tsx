import { useEffect, useState } from "react"
import type { Project } from "@/types/project"
import { GetRequest } from "@/service/getRequest"
import { MOCK_PROJECTS } from "@/data/mockProjects"
import ProjectCard from "./ProjectCard"

const MAX_PROJECTS = 5

interface ProjectGalleryProps {
    /** Avisa o cursor global quando algum card está em foco */
    onCursorActive: (active: boolean) => void
}

const ProjectGallery = ({ onCursorActive }: ProjectGalleryProps) => {
    const [projects, setProjects] = useState<Project[]>([])
    const [activeId, setActiveId] = useState<string | null>(null)

    useEffect(() => {
        GetRequest("/api/projects").then((data) => {
            const fromDb: Project[] | undefined = data?.projects
            // Mostra exatamente o que tem no Mongo (4 → 4 cards), no máximo 5
            setProjects((fromDb?.length ? fromDb : MOCK_PROJECTS).slice(0, MAX_PROJECTS))
        })
    }, [])

    useEffect(() => {
        onCursorActive(activeId !== null)
        return () => onCursorActive(false)
    }, [activeId, onCursorActive])

    return (
        <div className="flex h-full w-full flex-col gap-3 md:flex-row md:gap-4">
            {projects.map((project, i) => (
                <ProjectCard
                    key={project._id}
                    project={project}
                    index={i}
                    active={activeId === project._id}
                    onActiveChange={(on) => setActiveId(on ? project._id : null)}
                />
            ))}
        </div>
    )
}

export default ProjectGallery
