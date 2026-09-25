import manSticker from "@/assets/stickers/man.png"

const About = () => {
    return (
        <div className="min-h-screen w-full bg-base-bg px-6 py-24 sm:px-10">
            <div className="mx-auto flex w-full max-w-[85rem] flex-col gap-16">
                <h1
                    className="text-7xl sm:text-8xl md:text-9xl font-extrabold leading-[0.95] text-brand-purple"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    Sou o Eduardo.
                </h1>

                <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
                    <div className="glass flex h-80 w-64 shrink-0 items-center justify-center overflow-hidden rounded-t-full sm:h-96 sm:w-72">
                        {/* placeholder — troque por uma foto real */}
                        <img src={manSticker} alt="Eduardo Octávio" className="h-40 w-40 object-contain sm:h-48 sm:w-48" />
                    </div>

                    <div className="flex flex-1 flex-col gap-6">
                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-base-ink"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Sou desenvolvedor front-end, trabalhando remotamente do Brasil.
                        </h2>

                        <p className="text-lg text-ink-soft">
                            Ao longo do tempo venho construindo experiência em diferentes áreas do desenvolvimento web:
                            interfaces, integração com APIs e um cuidado especial com os detalhes de cada implementação.
                        </p>

                        <p className="text-lg text-ink-soft">
                            Hoje, meu foco é criar produtos digitais que unem design cuidadoso e código bem estruturado —
                            sempre buscando equilíbrio entre estética e funcionalidade.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
