import { NavLink } from "react-router-dom"
import githubIcon from "@iconify-icons/simple-icons/github"
import linkedinIcon from "@iconify-icons/simple-icons/linkedin"
import letterBoldDuotone from "@iconify-icons/solar/letter-bold-duotone"
import { Icon } from "@/components/ui/Icon"
import { NAV_ITEMS } from "@/components/layout/navItems"

const SOCIAL_LINKS = [
    { label: "GitHub", href: "https://github.com/", icon: githubIcon },
    { label: "LinkedIn", href: "https://linkedin.com/", icon: linkedinIcon },
    { label: "E-mail", href: "mailto:eeuardooctavio@gmail.com", icon: letterBoldDuotone },
]

const Footer = () => {
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
                <h2
                    className="text-7xl sm:text-8xl md:text-9xl font-extrabold leading-tight normal-case"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    <span className="text-base-bg">Obrigado</span>{" "}
                    <span className="text-base-bg/50">pela visita!</span>
                </h2>

                <nav className="flex items-center gap-6 pt-2">
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

                <p className="pt-2 text-sm text-bg-soft">© {new Date().getFullYear()} Eduardo Octávio</p>
            </div>

            <div
                aria-hidden
                className="pointer-events-none select-none whitespace-nowrap text-right font-extrabold leading-none text-bg-soft/15"
                style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16vw",
                    transform: "translateY(18%)",
                    paddingRight: 0,
                    marginRight: "-0.05em",
                }}
            >
                Eduardo
            </div>
        </footer>
    )
}

export default Footer
