import { Routes, Route } from "react-router-dom"
import Work from "@/pages/work"
import About from "@/pages/about"
import Contact from "@/pages/contact"

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Work />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    )
}

export default MainRoutes
