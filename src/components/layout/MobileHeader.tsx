import { useState } from "react"
import { NavLink } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import menuDotsBoldDuotone from "@iconify-icons/solar/menu-dots-bold-duotone"
import closeBoldDuotone from "@iconify-icons/solar/close-bold-duotone"
import { Icon } from "@/components/ui/Icon"
import { NAV_ITEMS } from "@/components/layout/navItems"

const MobileHeader = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="md:hidden fixed top-0 left-0 w-full z-50">
            <div className="glass flex items-center justify-between px-5 py-4">
                <NavLink
                    to="/"
                    className="text-xl font-extrabold text-base-ink tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                    onClick={() => setIsOpen(false)}
                >
                    EDOC
                </NavLink>

                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex items-center gap-2 text-base-ink"
                    aria-expanded={isOpen}
                    aria-label="Abrir menu"
                >
                    <span className="text-base font-bold" style={{ fontFamily: "var(--font-display)" }}>
                        MENU
                    </span>
                    <span className="relative flex items-center justify-center w-7 h-7">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={isOpen ? "close" : "dots"}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Icon icon={isOpen ? closeBoldDuotone : menuDotsBoldDuotone} size={26} />
                            </motion.span>
                        </AnimatePresence>
                    </span>
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        className="glass mx-4 mt-2 flex flex-col gap-2 rounded-3xl p-3"
                    >
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-lg font-bold transition-colors duration-300 ${isActive ? "text-brand-purple" : "text-base-ink"
                                    }`
                                }
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                <Icon icon={item.icon} size={22} />
                                {item.label}
                            </NavLink>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}

export default MobileHeader
