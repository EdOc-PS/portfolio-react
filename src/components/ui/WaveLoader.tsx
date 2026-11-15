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
    <div className="flex h-10 items-center gap-1.5 md:h-12" role="status" aria-label="Carregando projetos">
        {Array.from({ length: BARS }, (_, i) => (
            <motion.span
                key={i}
                // Anima a ALTURA (não scaleY): com scale, o arredondamento dos cantos era achatado
                // junto e a barra ficava "reta"/deformada quando estava baixa
                className="block w-[0.5625rem] rounded-[3px] bg-white/85 md:w-[0.675rem]"
                initial={{ height: "30%" }}
                animate={{ height: ["30%", "100%", "30%"] }}
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
