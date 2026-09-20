import { useEffect, useRef, useState } from "react";

interface CountUpProps {
    /** Valor final, aceita prefixo/sufixo ex: "+10", "20+" */
    value: string;
    /** Duração da animação em ms */
    duration?: number;
    className?: string;
}

/** Anima o número de 0 até o valor quando o elemento entra na tela */
const CountUp = ({ value, duration = 1400, className = "" }: CountUpProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [display, setDisplay] = useState(value.replace(/\d+/, "0"));
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const match = value.match(/\d+/);
        if (!match) {
            setDisplay(value);
            return;
        }
        const target = parseInt(match[0], 10);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || started.current) return;
                started.current = true;

                const start = performance.now();
                const tick = (now: number) => {
                    const progress = Math.min((now - start) / duration, 1);
                    // ease-out cúbico
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(target * eased);
                    setDisplay(value.replace(/\d+/, String(current)));
                    if (progress < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                observer.disconnect();
            },
            { threshold: 0.4 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [value, duration]);

    return (
        <span ref={ref} className={className}>
            {display}
        </span>
    );
};

export default CountUp;
