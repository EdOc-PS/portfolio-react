import { Icon } from "@/components/ui/Icon"
import Reveal from "@/components/ui/Reveal"

const socials = [
    { icon: "Github01Icon", href: "https://github.com/EdOc-PS", label: "GitHub" },
    { icon: "InstagramIcon", href: "https://www.instagram.com/", label: "Instagram" },
    { icon: "Linkedin01Icon", href: "https://www.linkedin.com/in/eduardo-octavio/", label: "LinkedIn" },
    { icon: "Mail02Icon", href: "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=euardooctavio@gmail.com", label: "E-mail" },
] as const

const navLinks = [
    { label: "Home", id: "home" },
    { label: "Carreira", id: "profile" },
    { label: "Tecnologias", id: "technology" },
    { label: "Projetos", id: "projects" },
]

const Footer = () => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (!element) return
        const headerOffset = 80
        const offsetPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset
        window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }

    return (
        <footer className="relative w-full bg-gray-edoc-500 overflow-hidden">
            {/* Rabiscos decorativos no lado esquerdo (cor das letras) */}
            <svg
                aria-hidden="true"
                viewBox="0 0 200 200"
                fill="none"
                className="scribble-float pointer-events-none absolute top-12 left-4 sm:left-10 w-28 sm:w-40 opacity-15"
                style={{ ["--rot" as string]: "-18deg", animationDuration: "11s" }}
            >
                <path
                    d="M20.891 16.8915C33.4615 11.3216 48.3988 11.8896 63.7568 13.4359C79.1149 14.9665 94.8937 17.4595 109.252 15.382M16.2099 38.377C30.5686 32.7334 48.3457 31.9339 66.6492 32.0075C84.9526 32.0759 103.677 33.0121 119.982 30.6295M20.4153 56.8801C40.5596 52.683 60.0202 52.2569 79.6911 51.0209C99.362 49.7797 119.191 47.7232 139.808 40.0705M18.892 77.8822C71.0673 64.0021 113.144 61.9666 166.582 69.9875"
                    stroke="#1f1f1f"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <svg
                aria-hidden="true"
                viewBox="0 0 200 200"
                fill="none"
                className="scribble-float pointer-events-none absolute bottom-20 left-8 sm:left-20 w-24 sm:w-32 opacity-15"
                style={{ ["--rot" as string]: "25deg", animationDuration: "14s", animationDelay: "2s" }}
            >
                <path
                    d="M93.6898 48.6974C89.391 49.2255 85.908 50.5117 83.1866 52.3733C80.4651 54.2316 78.5222 56.6721 77.3172 59.3936C74.9038 64.8567 75.3743 71.3219 77.676 76.9712C78.8336 79.7976 80.455 82.431 82.4656 84.6548C84.4762 86.8753 86.8794 88.6896 89.611 89.81C92.3325 90.9304 95.4025 91.3298 98.5539 90.7002C101.705 90.074 104.89 88.4391 107.933 85.7041C111.45 82.546 113.837 78.7347 115.201 74.7677C116.561 70.8006 116.917 66.6812 116.419 62.8259C115.918 58.9705 114.574 55.3656 112.452 52.4208C110.34 49.4861 107.395 47.1945 103.814 46.2366C100.93 45.4446 97.6636 45.6104 94.4412 46.8967C91.2121 48.1761 88.0134 50.5185 84.9738 53.9981C82.6145 56.7161 80.5227 59.4849 78.1736 62.0845"
                    stroke="#1f1f1f"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 pt-24 pb-64 sm:pt-32 sm:pb-80 lg:py-40">

                {/* Topo: título + descrição */}
                <Reveal className="flex flex-col gap-4 max-w-2xl mb-12 sm:mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-neutral-edoc-500">
                        Obrigado pela visita!
                    </h1>
                    <p className="text-neutral-edoc-500/70 text-base sm:text-lg lg:text-xl">
                        Um portfolio pensado para mostrar o que importa: projetos, impacto e detalhes de implementação.
                    </p>
                </Reveal>

                {/* Links */}
                <div className="flex flex-wrap gap-x-16 gap-y-8 mb-12 sm:mb-16">
                    <div className="flex flex-col gap-3">
                        <p className="text-neutral-edoc-500 font-semibold text-base">Redes</p>
                        <ul className="flex items-center gap-3">
                            {socials.map((s) => (
                                <li key={s.label}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="inline-flex items-center justify-center p-2 rounded-lg transition-transform duration-200 hover:scale-110 hover:bg-neutral-edoc-500/10"
                                    >
                                        <Icon name={s.icon} size={22} color="#1f1f1f" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-neutral-edoc-500 font-semibold text-base">Navegação</p>
                        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-neutral-edoc-500/70 text-base">
                            {navLinks.map((l) => (
                                <li key={l.id}>
                                    <button
                                        type="button"
                                        onClick={() => scrollToSection(l.id)}
                                        className="cursor-pointer hover:text-neutral-edoc-500 transition-colors"
                                    >
                                        {l.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Rodapé */}
                <p className="text-sm sm:text-base text-neutral-edoc-500/60">
                    Feito por Eduardo Octavio
                </p>
            </div>

            {/* Mobile/tablet: absoluta centralizada no bottom, cortada igual ao desktop */}
            <Reveal delay={200} distance={0} className="lg:hidden absolute bottom-10 left-1/2 -translate-x-1/2 translate-y-1/3 w-90 sm:w-110 pointer-events-none select-none">
                <img src="/doodledo-thanks.png" alt="" aria-hidden="true" className="w-full" />
            </Reveal>

            {/* Desktop: absoluta no canto inferior direito */}
            <Reveal delay={200} distance={0} className="hidden lg:block absolute bottom-0 right-0 w-152 translate-x-16 translate-y-20 pointer-events-none select-none">
                <img src="/doodledo-thanks.png" alt="" aria-hidden="true" className="w-full" />
            </Reveal>
        </footer>
    )
}

export default Footer
