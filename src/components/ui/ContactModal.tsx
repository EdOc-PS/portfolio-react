import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"

/** Mesmo formulário da v2.0 (página de contato), agora num modal com o vidro do sistema. */

type SubmitStatus = "idle" | "sending" | "success" | "error" | "invalid-email"

// Limites iguais aos validados em api/send.js
const LIMITS = { name: 80, email: 254, message: 2000 }
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const EMPTY_FORM = { name: "", email: "", message: "" }

interface ContactModalProps {
    open: boolean
    onClose: () => void
}

const fieldClass =
    // Inputs com a mesma superfície dos cards (gradiente #1a1a1a → #121212, borda #262626)
    "w-full rounded-2xl border border-line bg-gradient-to-br from-surface to-surface-deep px-5 py-4 text-base text-white placeholder:text-white/40 transition-colors hover:border-line-hover focus:border-line-hover focus:outline-none"

const ContactModal = ({ open, onClose }: ContactModalProps) => {
    const [form, setForm] = useState(EMPTY_FORM)
    const [status, setStatus] = useState<SubmitStatus>("idle")

    // Esc fecha; trava o scroll do fundo (relevante no mobile) enquanto aberto
    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", onKey)
        return () => {
            window.removeEventListener("keydown", onKey)
            document.body.style.overflow = prevOverflow
        }
    }, [open, onClose])

    // Reabrir depois de um envio começa limpo
    useEffect(() => {
        if (open) setStatus("idle")
    }, [open])

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
                    // Fundo atrás do modal: escurece e desfoca a página (o "glass" fica aqui)
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onMouseDown={(e) => e.target === e.currentTarget && onClose()} // clique fora fecha
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="contact-title"
                >
                    <motion.form
                        onSubmit={handleSubmit}
                        noValidate
                        // Painel preto sólido, com o raio e a borda padrão dos cards (32px, #262626)
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
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                                    <path d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>
                        </div>

                        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wider text-white/60">
                            Nome
                            <input required maxLength={LIMITS.name} type="text" value={form.name} onChange={handleChange("name")} placeholder="Seu nome" className={fieldClass} />
                        </label>

                        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wider text-white/60">
                            E-mail
                            <input required maxLength={LIMITS.email} type="email" value={form.email} onChange={handleChange("email")} placeholder="voce@email.com" className={fieldClass} />
                        </label>

                        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wider text-white/60">
                            Mensagem
                            <textarea
                                required
                                maxLength={LIMITS.message}
                                rows={4}
                                value={form.message}
                                onChange={handleChange("message")}
                                placeholder="O que você procura..."
                                className={`${fieldClass} resize-none`}
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="mt-1 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
                            style={{ fontFamily: "var(--font-display)" }}
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
