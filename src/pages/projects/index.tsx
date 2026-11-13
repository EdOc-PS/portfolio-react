import { useOutletContext } from "react-router-dom"
import ProjectGallery from "@/components/layout/ProjectGallery"
import type { LayoutContext } from "@/components/layout/MainLayout"

const Projects = () => {
    const { setCursorActive } = useOutletContext<LayoutContext>()
    return <ProjectGallery onCursorActive={setCursorActive} />
}

export default Projects
