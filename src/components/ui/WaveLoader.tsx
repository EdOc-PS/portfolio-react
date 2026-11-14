import { motion } from "motion/react"

/**
 * Loader feito à mão: 5 barras em "onda" que nasce no meio e corre pras pontas.
 * Cada barra pulsa (baixa → alta → baixa); o atraso cresce com a distância do centro,
 * então o meio sobe primeiro, depois as do lado, depois as extremidades.
 */
const BARS = 5
const CENTER = (BARS - 1) / 2
const STEP = 0.12 // atraso entre "anéis" da onda (s)
const DURATION = 0.9 // um pulso completo (s)

const WaveLoader = () => (
    <div className="flex items-center gap-1.5" role="status" aria-label="Carregando projetos">
        {Array.from({ length: BARS }, (_, i) => (
            <motion.span
                key={i}
                className="block h-10 w-2.5 origin-center rounded-[3px] bg-white/85 md:h-12 md:w-3"
                initial={{ scaleY: 0.3 }}
                animate={{ scaleY: [0.3, 1, 0.3] }}
                transition={{
                    duration: DURATION,
                    ease: "easeInOut",
                    repeat: Infinity, // loop contínuo: cada barra repete na hora, defasada pelo delay → a onda nunca para
                    delay: Math.abs(i - CENTER) * STEP,
                }}
            />
        ))}
    </div>
)

export default WaveLoader
