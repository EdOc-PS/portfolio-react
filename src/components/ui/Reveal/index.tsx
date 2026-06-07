import { useEffect, useRef, useState } from "react";

interface RevealProps {
    children: React.ReactNode;
    /** Atraso em ms antes da animação começar */
    delay?: number;
    /** Classe extra para o wrapper */
    className?: string;
    /** Distância do deslize em px (padrão 40) */
    distance?: number;
    /** Anima apenas uma vez (padrão true) */
    once?: boolean;
    /** Estilos extras mesclados ao wrapper */
    style?: React.CSSProperties;
}

const Reveal = ({
    children,
    delay = 0,
    className = "",
    distance = 40,
    once = true,
    style,
}: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    if (once) observer.unobserve(entry.target);
                } else if (!once) {
                    setVisible(false);
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [once]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
                transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
                transitionDelay: `${delay}ms`,
                willChange: "opacity, transform",
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default Reveal;
