import { NavLink, useLocation } from "react-router-dom"
import { motion } from "motion/react"

const TABS = [
    { to: "/", label: "Projetos" },
    { to: "/sobre", label: "Sobre" },
]

/** EDOC centralizado e, logo abaixo, as abas Projetos / Sobre. */
const Header = () => {
    const { pathname } = useLocation()

    return (
        <header className="flex shrink-0 flex-col items-center gap-3 pb-6 pt-6">
            <NavLink
                to="/"
                className="text-3xl font-extrabold tracking-tight text-base-ink"
                style={{ fontFamily: "var(--font-display)" }}
            >
                EDOC
            </NavLink>

            <nav className="flex gap-1 rounded-full border border-line bg-surface-deep p-1">
                {TABS.map((tab) => {
                    const isActive = pathname === tab.to
                    return (
                        <NavLink
                            key={tab.to}
                            to={tab.to}
                            className={`relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-300 ${isActive ? "text-black" : "text-white/70 hover:text-white"}`}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="tab-pill"
                                    className="absolute inset-0 rounded-full bg-white"
                                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                />
                            )}
                            <span className="relative">{tab.label}</span>
                        </NavLink>
                    )
                })}
            </nav>
        </header>
    )
}

export default Header
