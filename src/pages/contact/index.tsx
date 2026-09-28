import { useState } from "react"
import { motion } from "motion/react"
import chatRoundDotsBoldDuotone from "@iconify-icons/solar/chat-round-dots-bold-duotone"
import letterBoldDuotone from "@iconify-icons/solar/letter-bold-duotone"
import userBoldDuotone from "@iconify-icons/solar/user-bold-duotone"
import arrowRightUpBoldDuotone from "@iconify-icons/solar/arrow-right-up-bold-duotone"
import altArrowDownBoldDuotone from "@iconify-icons/solar/alt-arrow-down-bold-duotone"
import { Icon } from "@/components/ui/Icon"
import Reveal from "@/components/ui/Reveal"
import businessDarkSticker from "@/assets/stickers/business-dark.png"
import magicSticker from "@/assets/stickers/magic.png"

const FAQ = [
    {
        question: "Qual o prazo médio de um projeto?",
        answer: "Depende do escopo, mas a maioria dos projetos leva de 2 a 6 semanas, do alinhamento inicial até a entrega final.",
    },
    {
        question: "Você trabalha remotamente com qualquer empresa?",
        answer: "Sim, atuo 100% remoto e já colaborei com times em diferentes fusos horários, sempre com comunicação assíncrona bem definida.",
    },
    {
        question: "Quais tecnologias você utiliza?",
        answer: "Principalmente Node.js, TypeScript e React Native, além de ferramentas de IA para acelerar partes do fluxo de desenvolvimento.",
    },
    {
        question: "Como podemos começar uma conversa?",
        answer: "Basta preencher o formulário ao lado ou me chamar diretamente por e-mail — respondo normalmente em até 1 dia útil.",
    },
]

// Delays decrescem de cima para baixo: o item mais alto na página tem o maior delay,
// como se o "levantar" começasse pelos itens de baixo primeiro.
const REVEAL_STEP = 0.08
const TOTAL_REVEAL_ITEMS = 3 + FAQ.length // hero, form, faq-title + cada pergunta
const revealDelay = (index: number) => (TOTAL_REVEAL_ITEMS - 1 - index) * REVEAL_STEP

const Contact = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const [form, setForm] = useState({ name: "", email: "", message: "" })

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const subject = encodeURIComponent(`Contato via portfólio — ${form.name || "sem nome"}`)
        const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
        window.location.href = `mailto:eeuardooctavio@gmail.com?subject=${subject}&body=${body}`
    }

    return (
        <div className="relative -mx-6 -mt-24 min-h-screen w-[calc(100%+3rem)] overflow-hidden bg-base-ink px-6 py-24 sm:-mx-10 sm:w-[calc(100%+5rem)] sm:px-10 md:-mx-32 md:mt-0 md:w-[calc(100%+16rem)] md:px-32">
            <Reveal delay={revealDelay(0)} className="relative mx-auto flex w-full max-w-[85rem] flex-col items-center gap-6 pt-10 text-center">
                <h1
                    className="flex flex-wrap items-center justify-center gap-4 text-5xl font-extrabold leading-[1.05] text-base-bg sm:text-7xl md:text-8xl"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    <span className="inline-flex items-center gap-4">
                        Olá, como posso
                        <motion.img
                            src={businessDarkSticker}
                            alt=""
                            aria-hidden
                            className="pointer-events-none inline-block w-16 select-none sm:w-24 md:w-28"
                            animate={{ y: [0, -10, 0], rotate: [-6, 2, -6] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </span>
                    <br />
                    <span className="text-bg-soft">te ajudar hoje?</span>
                </h1>

                <p className="max-w-xl text-lg text-bg-soft sm:text-xl">
                    Me conta um pouco sobre o seu projeto ou ideia — respondo o mais rápido possível.
                </p>
            </Reveal>

            <Reveal delay={revealDelay(1)} className="relative mx-auto w-full max-w-[85rem] pt-24">
                <form
                    onSubmit={handleSubmit}
                    className="glass-dark mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-[2.5rem] p-8 sm:p-12"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-base-bg/10 text-base-bg">
                            <Icon icon={letterBoldDuotone} size={22} />
                        </div>
                        <p className="text-xl font-bold text-base-bg" style={{ fontFamily: "var(--font-display)" }}>
                            Envie uma mensagem
                        </p>
                    </div>

                    <label className="flex flex-col gap-2 text-sm font-bold text-bg-soft">
                        Nome
                        <div className="flex items-center gap-3 rounded-2xl bg-base-bg/10 px-5 py-4.5">
                            <Icon icon={userBoldDuotone} size={20} />
                            <input
                                required
                                type="text"
                                value={form.name}
                                onChange={handleChange("name")}
                                placeholder="Seu nome"
                                className="w-full bg-transparent text-lg font-normal text-base-bg placeholder:text-bg-soft/60 focus:outline-none"
                            />
                        </div>
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-bold text-bg-soft">
                        E-mail
                        <div className="flex items-center gap-3 rounded-2xl bg-base-bg/10 px-5 py-4.5">
                            <Icon icon={letterBoldDuotone} size={20} />
                            <input
                                required
                                type="email"
                                value={form.email}
                                onChange={handleChange("email")}
                                placeholder="voce@email.com"
                                className="w-full bg-transparent text-lg font-normal text-base-bg placeholder:text-bg-soft/60 focus:outline-none"
                            />
                        </div>
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-bold text-bg-soft">
                        Mensagem
                        <div className="flex items-start gap-3 rounded-2xl bg-base-bg/10 px-5 py-4.5">
                            <Icon icon={chatRoundDotsBoldDuotone} size={20} />
                            <textarea
                                required
                                rows={4}
                                value={form.message}
                                onChange={handleChange("message")}
                                placeholder="Conte um pouco sobre o projeto..."
                                className="w-full resize-none bg-transparent text-lg font-normal text-base-bg placeholder:text-bg-soft/60 focus:outline-none"
                            />
                        </div>
                    </label>

                    <button
                        type="submit"
                        className="mt-2 flex cursor-pointer items-center justify-center gap-3 rounded-full bg-base-bg px-8 py-5 text-lg font-bold text-base-ink transition-transform duration-300 hover:scale-[1.02]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Enviar mensagem
                        <Icon icon={arrowRightUpBoldDuotone} size={20} />
                    </button>
                </form>
            </Reveal>

            <div className="relative mx-auto grid w-full max-w-[85rem] gap-12 pt-56 pb-32 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                <Reveal delay={revealDelay(2)} className="flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                        <p className="text-4xl font-extrabold text-base-bg sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                            Perguntas frequentes
                        </p>
                        <img
                            src={magicSticker}
                            alt=""
                            aria-hidden
                            className="pointer-events-none hidden w-16 select-none opacity-80 sm:block"
                        />
                    </div>
                    <p className="text-lg text-bg-soft">
                        Respostas rápidas para as dúvidas mais comuns antes de entrar em contato.
                    </p>
                </Reveal>

                <div className="flex flex-col gap-6">
                    {FAQ.map((item, index) => {
                        const isOpen = openIndex === index
                        return (
                            <Reveal key={item.question} delay={revealDelay(3 + index)} className="glass-dark overflow-hidden rounded-3xl">
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-7 py-6 text-left"
                                >
                                    <span className="text-lg font-bold text-base-bg sm:text-xl" style={{ fontFamily: "var(--font-display)" }}>
                                        {item.question}
                                    </span>
                                    <span
                                        className={`shrink-0 text-bg-soft transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                    >
                                        <Icon icon={altArrowDownBoldDuotone} size={24} />
                                    </span>
                                </button>

                                {isOpen && (
                                    <p className="px-7 pb-6 text-base leading-relaxed text-bg-soft">
                                        {item.answer}
                                    </p>
                                )}
                            </Reveal>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Contact
