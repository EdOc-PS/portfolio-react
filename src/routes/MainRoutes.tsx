import { Navigate, Route, Routes } from "react-router-dom"
import MainLayout from "@/components/layout/MainLayout"
import Projects from "@/pages/projects"
import About from "@/pages/about"

const MainRoutes = () => (
    <Routes>
        <Route element={<MainLayout />}>
            <Route index element={<Projects />} />
            <Route path="sobre" element={<About />} />
            {/* Qualquer rota desconhecida volta pra Projetos (a principal) */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    </Routes>
)

export default MainRoutes
