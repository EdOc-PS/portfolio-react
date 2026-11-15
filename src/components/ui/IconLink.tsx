interface IconLinkProps {
    href: string
    label: string
    dark?: boolean
    children: React.ReactNode
}

const IconLink = ({ href, label, dark = false, children }: IconLinkProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={label}
        aria-label={label}
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-current/25 transition-colors ${dark ? "hover:bg-black/10" : "hover:bg-white/15"}`}
    >
        {children}
    </a>
)

export default IconLink
