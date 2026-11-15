import { useState } from "react"
import { motion } from "motion/react"
import { ABOUT } from "@/data/about"
import { revealFromCenter } from "@/lib/motion"
import ContactModal from "@/components/ui/ContactModal"

const LINK_CLASS =
    "flex items-center gap-3 rounded-full border border-line px-3 py-2 text-left text-sm font-semibold transition-colors hover:border-line-hover hover:bg-white/5"

const SocialsCard = ({ index }: { index: number }) => {
    const [contactOpen, setContactOpen] = useState(false)

    return (
        <motion.div {...revealFromCenter(index)} className="card flex flex-col p-6">
            <h3 className="mb-auto text-lg">Redes</h3>

            <div className="mt-4 flex flex-col gap-2">
                {ABOUT.socials.map((social) => {
                    const { name, icon: Icon } = social
                    return "opensContact" in social ? (
                        <button key={name} type="button" onClick={() => setContactOpen(true)} className={LINK_CLASS}>
                            <Icon size={20} />
                            {name}
                        </button>
                    ) : (
                        <a key={name} href={social.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                            <Icon size={20} />
                            {name}
                        </a>
                    )
                })}
            </div>

            {/* Modal de contato */}
            <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
        </motion.div>
    )
}

export default SocialsCard
