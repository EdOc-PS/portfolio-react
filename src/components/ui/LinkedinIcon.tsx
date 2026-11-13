/** O devicons não tem LinkedIn — SVG oficial do logo, mesma API ({ size }) dos ícones do devicons. */
export const LinkedinIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#0A66C2" />
        <path
            fill="#fff"
            d="M7.1 9.5H4.6V19h2.5V9.5zM5.85 8.3a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9zM19.4 13.8c0-2.6-.56-4.5-3.58-4.5-1.45 0-2.42.8-2.82 1.55h-.04V9.5h-2.4V19h2.5v-4.7c0-1.24.24-2.44 1.77-2.44 1.51 0 1.53 1.42 1.53 2.52V19h2.5l.04-5.2z"
        />
    </svg>
)
