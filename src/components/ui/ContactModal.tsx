import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"
import FormField from "@/components/ui/FormField"
import CloseIcon from "@/components/ui/CloseIcon"

type SubmitStatus = "idle" | "sending" | "success" | "error" | "invalid-email"

const LIMITS = { name: 80, email: 254, message: 2000 }
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const EMPTY_FORM = { name: "", email: "", message: "" }

interface ContactModalProps {
    open: boolean
    onClose: () => void
}

const ContactModal = ({ open, onClose }: ContactModalProps) => {
    const [form, setForm] = useState(EMPTY_FORM)
    const [status, setStatus] = useState<SubmitStatus>("idle")

    const lockWhileOpen = () => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", onKey)
        return () => {
            window.removeEventListener("keydown", onKey)
            document.body.style.overflow = prevOverflow
        }
    }
    useEffect(lockWhileOpen, [open, onClose])

    const resetStatus = () => {
        if (open) setStatus("idle")
    }
    useEffect(resetStatus, [open])

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }))

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!EMAIL_REGEX.test(form.email.trim())) {
            setStatus("invalid-email")
            return
        }

        setStatus("sending")
        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, email: form.email.trim() }),
            })
            if (!res.ok) throw new Error("Falha ao enviar")
            setStatus("success")
            setForm(EMPTY_FORM)
        } catch {
            setStatus("error")
        }
    }

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="contact-title"
                >
                    {/* Formulário */}
                    <motion.form
                        onSubmit={handleSubmit}
                        noValidate
                        className="relative flex w-full max-w-lg flex-col gap-5 rounded-[var(--radius-card)] border border-line bg-black p-6 text-white shadow-2xl sm:p-8"
                        initial={{ opacity: 0, y: 24, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 id="contact-title" className="text-2xl">
                                    Envie uma mensagem
                                </h2>
                                <p className="mt-1 text-sm text-white/60">Me conta sobre seu projeto ou ideia — respondo rápido.</p>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Fechar"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        <FormField label="Nome" required maxLength={LIMITS.name} type="text" value={form.name} onChange={handleChange("name")} placeholder="Seu nome" />
                        <FormField label="E-mail" required maxLength={LIMITS.email} type="email" value={form.email} onChange={handleChange("email")} placeholder="voce@email.com" />
                        <FormField
                            label="Mensagem"
                            multiline
                            required
                            maxLength={LIMITS.message}
                            rows={4}
                            value={form.message}
                            onChange={handleChange("message")}
                            placeholder="O que você procura..."
                        />

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="mt-1 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60 font-display"
                        >
                            {status === "sending" ? "Enviando..." : "Enviar mensagem"}
                        </button>

                        {status === "success" && <p className="text-center text-sm font-semibold text-accent-lime">Mensagem enviada! Retorno em breve.</p>}
                        {status === "invalid-email" && <p className="text-center text-sm font-semibold text-accent-pink">Informe um e-mail válido (ex.: voce@email.com).</p>}
                        {status === "error" && <p className="text-center text-sm font-semibold text-accent-pink">Não deu pra enviar agora — tenta de novo em instantes.</p>}
                    </motion.form>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    )
}

export default ContactModal
