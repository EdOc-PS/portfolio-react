interface FlowingDividerProps {
    /** Cor dos pontos */
    color?: string;
    /** Altura do divisor em px */
    height?: number;
    /** Espessura dos pontos */
    dotSize?: number;
    /** Espaço entre os pontos */
    gap?: number;
    /** Duração da animação (s) */
    duration?: number;
    /** className extra */
    className?: string;
}

const FlowingDivider = ({
    color = "#d1cfc0",
    height = 160,
    dotSize = 3,
    gap = 16,
    duration = 6,
    className = "",
}: FlowingDividerProps) => {
    // Caminho ondulado com um laço, fluindo horizontalmente
    const path =
        "M-20 100 C 120 20 220 20 320 100 C 400 165 320 235 250 200 C 185 168 250 70 400 95 C 560 122 650 190 800 150 C 960 108 1060 25 1240 100";

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none w-full overflow-hidden ${className}`}
            style={{ height }}
        >
            <svg
                viewBox="0 0 1220 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                preserveAspectRatio="none"
            >
                <path
                    d={path}
                    stroke={color}
                    strokeWidth={dotSize}
                    strokeLinecap="round"
                    strokeDasharray={`0.1 ${gap}`}
                    vectorEffect="non-scaling-stroke"
                    className="flowing-dash"
                    style={{
                        ["--dash-gap" as string]: `${gap + 0.1}`,
                        animationDuration: `${duration}s`,
                    }}
                />
            </svg>
        </div>
    );
};

export default FlowingDivider;
