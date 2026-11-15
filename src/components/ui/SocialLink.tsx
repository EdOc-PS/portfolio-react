import type { ComponentType } from "react"

interface SocialLinkProps {
    name: string
    icon: ComponentType<{ size?: number }>
    href?: string
    onClick?: () => void
}

const CLASS =
    "flex items-center gap-3 rounded-full border border-line px-3 py-2 text-left text-sm font-semibold transition-colors hover:border-line-hover hover:bg-white/5"

const SocialLink = ({ name, icon: Icon, href, onClick }: SocialLinkProps) => {
    const content = (
        <>
            <Icon size={20} />
            {name}
        </>
    )

    return href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={CLASS}>
            {content}
        </a>
    ) : (
        <button type="button" onClick={onClick} className={CLASS}>
            {content}
        </button>
    )
}

export default SocialLink
