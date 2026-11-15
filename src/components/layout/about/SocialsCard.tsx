import { useState } from "react"
import { motion } from "motion/react"
import { ABOUT } from "@/data/about"
import { revealFromCenter } from "@/lib/motion"
import ContactModal from "@/components/ui/ContactModal"
import SocialLink from "@/components/ui/SocialLink"

const SocialsCard = ({ index }: { index: number }) => {
    const [contactOpen, setContactOpen] = useState(false)

    return (
        <motion.div {...revealFromCenter(index)} className="card flex flex-col p-6">
            <h3 className="mb-auto text-lg">Redes</h3>

            <div className="mt-4 flex flex-col gap-2">
                {ABOUT.socials.map((social) =>
                    "opensContact" in social ? (
                        <SocialLink key={social.name} name={social.name} icon={social.icon} onClick={() => setContactOpen(true)} />
                    ) : (
                        <SocialLink key={social.name} name={social.name} icon={social.icon} href={social.href} />
                    ),
                )}
            </div>

            {/* Modal de contato */}
            <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
        </motion.div>
    )
}

export default SocialsCard
