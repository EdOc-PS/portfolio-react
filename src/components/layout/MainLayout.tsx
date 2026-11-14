import { useEffect, useState } from "react"
import { fetchPhrase } from "@/service/phrase"
import { useLocation, useOutlet } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import Header from "@/components/layout/Header"
import CustomCursor from "@/components/layout/CustomCursor"

export interface LayoutContext {
    /** Páginas avisam o cursor global quando algo está em foco */
    setCursorActive: (active: boolean) => void
}

/** Header fixo em cima; abaixo dele o Outlet alterna entre as páginas com transição. */
const MainLayout = () => {
    const location = useLocation()
    const [cursorActive, setCursorActive] = useState(false)
    // useOutlet "congela" a página que está saindo, pra animação de saída funcionar
    const outlet = useOutlet({ setCursorActive } satisfies LayoutContext)

    // Já busca a frase do card "Momentos que marcaram" ao abrir o site, em segundo plano
    useEffect(() => {
        fetchPhrase()
    }, [])

    return (
        // Mobile (< md): altura livre, a página rola. md+: trava na altura da tela, sem scroll.
        <main className="flex min-h-full flex-col bg-base-bg text-base-ink md:h-full">
            <CustomCursor active={cursorActive} />
            <Header />
            <section className="mx-auto flex w-full max-w-[1400px] flex-1 items-center px-4 pb-8 md:min-h-0 md:px-12 md:pb-12">
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
