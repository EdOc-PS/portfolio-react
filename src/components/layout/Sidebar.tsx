import { useState } from "react"
import { NavLink } from "react-router-dom"
import { motion } from "motion/react"
import { Icon } from "@/components/ui/Icon"
import { NAV_ITEMS } from "@/components/layout/navItems"

const BUBBLE_SPRING = { type: "spring", stiffness: 320, damping: 22 } as const

interface SidebarProps {
    overFooter?: boolean
}

const Sidebar = ({ overFooter = false }: SidebarProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const offsetFor = (index: number) => {
        if (hoveredIndex === null) return 0
        if (index < hoveredIndex) return -12
        if (index > hoveredIndex) return 12
        return 0
    }

    return (
        <aside className="hidden md:flex fixed left-0 top-0 h-screen w-32 flex-col items-center z-50">
            <NavLink
                to="/"
                className={`mt-8 text-2xl font-extrabold tracking-tight transition-all duration-300 hover:scale-105 ${overFooter ? "text-base-bg" : "text-base-ink"
                    }`}
                style={{ fontFamily: "var(--font-display)" }}
            >
                EDOC
            </NavLink>

            <motion.nav
                animate={{ opacity: overFooter ? 0 : 1 }}
                transition={{ duration: 0.25 }}
                style={{ pointerEvents: overFooter ? "none" : "auto" }}
                className="flex flex-col gap-3 flex-1 items-center justify-center"
            >
                {NAV_ITEMS.map((item, index) => (
                    <motion.div
                        key={item.to}
                        className="group relative flex items-center"
                        animate={{ y: offsetFor(index) }}
                        transition={BUBBLE_SPRING}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <motion.div whileHover={{ scale: 1.12 }} transition={BUBBLE_SPRING}>
                            <NavLink
                                to={item.to}
                                className="visited:text-inherit glass flex items-center justify-center w-20 h-20 rounded-3xl transition-colors duration-300 text-ink-soft hover:text-base-ink"
                            >
                                <Icon icon={item.icon} size={36} />
                            </NavLink>
                        </motion.div>

                        <span
                            className="pointer-events-none absolute left-28 whitespace-nowrap rounded-full glass px-5 py-2.5 text-lg font-bold text-base-ink opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {item.label}
                        </span>
                    </motion.div>
                ))}
            </motion.nav>
        </aside>
    )
}

export default Sidebar
