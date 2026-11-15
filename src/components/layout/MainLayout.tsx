import { useEffect, useState } from "react"
import { fetchPhrase } from "@/service/phrase"
import { useLocation, useOutlet } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import Header from "@/components/layout/Header"
import CustomCursor from "@/components/layout/CustomCursor"
import CornerGrid from "@/components/layout/CornerGrid"

export interface LayoutContext {
    setCursorActive: (active: boolean) => void
}

const MainLayout = () => {
    const location = useLocation()
    const [cursorActive, setCursorActive] = useState(false)
    const outlet = useOutlet({ setCursorActive } satisfies LayoutContext)

    const prefetchPhrase = () => {
        fetchPhrase()
    }
    useEffect(prefetchPhrase, [])

    return (
        <main className="flex min-h-full flex-col bg-base-bg text-base-ink md:h-full">
            <CustomCursor active={cursorActive} />
            {/* Fundo animado */}
            <CornerGrid />
            <div className="relative z-10">
                {/* Header */}
                <Header />
            </div>
            {/* Página atual */}
            <section className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 items-center px-4 pb-8 md:min-h-0 md:px-12 md:pb-12">
                <div className="w-full md:h-[min(680px,74vh)]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            className="h-full w-full"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        >
                            {outlet}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </main>
    )
}

export default MainLayout
