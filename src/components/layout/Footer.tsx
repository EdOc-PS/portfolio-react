import { useLayoutEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import githubIcon from "@iconify-icons/simple-icons/github"
import linkedinIcon from "@iconify-icons/simple-icons/linkedin"
import instagramIcon from "@iconify-icons/simple-icons/instagram"
import { Icon } from "@/components/ui/Icon"
import Reveal from "@/components/ui/Reveal"
import { NAV_ITEMS } from "@/components/layout/navItems"

const SOCIAL_LINKS = [
    { label: "GitHub", href: "https://github.com/EdOc-PS", icon: githubIcon },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/eduardo-octavio/", icon: linkedinIcon },
    { label: "Instagram", href: "https://www.instagram.com/edoc.ps", icon: instagramIcon },
]

const Footer = () => {
    const nameRef = useRef<HTMLDivElement>(null)
    const [nameFontSize, setNameFontSize] = useState<string | undefined>()

    // Mobile: ajusta o tamanho para "Eduardo" ocupar exatamente 100% da largura.
    useLayoutEffect(() => {
        const fit = () => {
            const el = nameRef.current
            if (!el) return
            if (window.matchMedia("(min-width: 768px)").matches) {
                setNameFontSize(undefined)
                return
            }
            el.style.fontSize = "100px"
            const textWidth = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? el.scrollWidth
            const width = el.parentElement?.clientWidth ?? window.innerWidth
            // Aplica direto no DOM também: se o valor calculado for igual ao do state, o React não re-renderiza
            // e o tamanho de medição (100px) ficaria aplicado.
            const size = `${(100 * width) / textWidth}px`
            el.style.fontSize = size
            setNameFontSize(size)
        }
        fit()
        document.fonts?.ready?.then(fit)
        window.addEventListener("resize", fit)
        return () => window.removeEventListener("resize", fit)
    }, [])

    return (
        <footer className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-base-ink pt-16">
            <div
                aria-hidden
                className="absolute right-6 top-6 h-0.5 rounded-full md:right-10 md:top-10"
                style={{
                    width: "70px",
                    background: "linear-gradient(90deg, #009C3B 0%, #009C3B 33%, #FFDF00 33%, #FFDF00 66%, #002776 66%, #002776 100%)",
                }}
            />

            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
                <Reveal delay={0.24}>
                    <h2
                        className="text-6xl sm:text-8xl md:text-9xl font-extrabold leading-tight normal-case"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        <span className="text-base-bg">Obrigado</span>{" "}
                        <span className="text-base-bg/50">pela visita!</span>
                    </h2>
                </Reveal>

                <Reveal delay={0.16}>
                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className="flex items-center gap-2 text-base font-bold text-bg-soft transition-colors duration-300 hover:text-base-bg"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                <Icon icon={item.icon} size={18} />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </Reveal>

                <Reveal delay={0.08}>
                    <div className="flex items-center gap-3 pt-2">
                        {SOCIAL_LINKS.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target={social.href.startsWith("http") ? "_blank" : undefined}
                                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                aria-label={social.label}
                                className="glass-dark flex w-12 h-12 items-center justify-center rounded-2xl text-bg-soft transition-colors duration-300 hover:text-base-bg"
                            >
                                <Icon icon={social.icon} size={20} />
                            </a>
                        ))}
                    </div>
                </Reveal>

                <Reveal delay={0}>
                    <p className="pt-2 text-sm text-bg-soft">© {new Date().getFullYear()} Eduardo Octávio</p>
                </Reveal>
            </div>

            <div
                ref={nameRef}
                aria-hidden
                className="pointer-events-none select-none whitespace-nowrap text-center font-extrabold leading-none text-bg-soft/15 md:-mr-[0.05em] md:text-right md:text-[16vw]"
                style={{
                    fontFamily: "var(--font-display)",
                    transform: "translateY(18%)",
                    fontSize: nameFontSize,
                }}
            >
                <span>Eduardo</span>
            </div>
        </footer>
    )
}

export default Footer
