interface SunburstProps {
    /** Cor dos raios */
    color?: string;
    /** Quantidade de raios */
    rays?: number;
    /** className extra (posicionamento/tamanho) */
    className?: string;
    /** opacidade dos raios */
    opacity?: number;
}

/** pseudo-aleatório determinístico (estável entre renders) */
const pseudo = (n: number) => {
    const x = Math.sin(n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
};

/** Raios irradiando ao redor (efeito de brilho), estilo doodle */
const Sunburst = ({ color = "#a3b3ff", rays = 22, className = "", opacity = 0.45 }: SunburstProps) => {
    const cx = 100;
    const cy = 100;
    const rxInner = 74;
    const ryInner = 46;

    const lines = Array.from({ length: rays }).map((_, i) => {
        const angle = (i / rays) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // comprimento e espessura variados por raio
        const length = 14 + pseudo(i + 1) * 22;      // 14–36
        const width = 2.5 + pseudo(i + 7) * 3.5;     // 2.5–6
        const gap = 4 + pseudo(i + 13) * 6;          // distância do texto

        const rxStart = rxInner + gap;
        const ryStart = ryInner + gap;

        return {
            x1: cx + cos * rxStart,
            y1: cy + sin * ryStart,
            x2: cx + cos * (rxStart + length),
            y2: cy + sin * (ryStart + length * 0.62),
            width,
        };
    });

    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            opacity={opacity}
            className={`pointer-events-none ${className}`}
        >
            {lines.map((l, i) => (
                <line
                    key={i}
                    x1={l.x1}
                    y1={l.y1}
                    x2={l.x2}
                    y2={l.y2}
                    stroke={color}
                    strokeWidth={l.width}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
            ))}
        </svg>
    );
};

export default Sunburst;
