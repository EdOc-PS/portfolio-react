import Roadmap from "@/components/ui/Roadmap"
import RoadmapCard from "@/components/ui/RoadmapCard"
import { Icon } from "@/components/ui/Icon"
import Reveal from "@/components/ui/Reveal"
import { useState } from "react"

const Profile = () => {
    const [roadSelected, setRoadSelected] = useState<number>(0);
    const [visibleStart, setVisibleStart] = useState(0);

    const roadMocks = [
        {
            title: "Tecnico de Informática",
            description: "Tecnico em informatica concluido em 2023 no IFMG"
        },
        {
            title: "Sistemas de Informação",
            description: "Graduação em sistemas de informação em andamento no IFMG"
        },
        {
            title: "Tecnico de Informatica",
            description: "Atuei como estágiário em TI, com experiência em suporte técnico, manutenção de hardware e software, além de colaborar com a equipe para resolver problemas técnicos."
        }, {
            title: "Assessor de Marketing",
            description: "Atuei voluntariamnent na em empresa Júnior do IFMG, desenvolvi habilidades como trabalho em equipe, criação de conteúdo e suporte em TI."
        },
        {
            title: "Analista de Integração de Dados",
            description: "Atuei desenvolvendo e mantendo integrações de dados entre sistemas, garantindo a consistência e a qualidade, colaborando com equipes multidisciplinares para otimizar processos de integração."
        },
        {
            title: "Desenvolvedor Frontend",
            description: "Desenvolvimento de interfaces web modernas e responsivas."
        }]

    const visibleCount = 4;
    const maxStart = Math.max(0, roadMocks.length - visibleCount);

    const visibleRoads = roadMocks.slice(visibleStart, visibleStart + visibleCount);

    const handleShowNext = () => {
        setVisibleStart((prev) => Math.min(prev + 1, maxStart));
    };

    const handleShowPrev = () => {
        setVisibleStart((prev) => Math.max(prev - 1, 0));
    };

    const liquidGlassStyles = {
        background: "#FFFFFF1F",
        border: "1px solid #FFFFFF59",
        backdropFilter: "blur(16px)",
        boxShadow: "inset 0 1px 0 #FFFFFF73, 0 10px 24px #00000038"
    };



    return (
        <section id="profile" className="py-24 sm:py-32 lg:py-40 w-full ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-col">
                <Reveal className="relative w-full">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-garamond sm:text-5xl lg:text-6xl font-bold text-start mb-2">
                            Trajetória
                        </h1>
                        <p className="w-full max-w-lg text-sm sm:text-base">
                            Ao longo da minha trajetória, busquei constantemente aprimorar meus conhecimentos e habilidades, com ênfase em áreas essenciais para o desenvolvimento profissional na área de tecnologia.
                        </p>
                    </div>
                    <img
                        src="/doodledo-evo.png"
                        alt="Ilustração de evolução"
                        className="hidden sm:block absolute top-0 right-0 w-52 lg:w-72 select-none pointer-events-none"
                    />
                </Reveal>

                <Reveal delay={150} className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10 py-4">
                    <div className="relative w-full lg:w-96 lg:shrink-0">
                        <div className="flex h-full flex-col justify-start gap-2 pr-12 transition-all duration-300 ease-out">
                            {visibleRoads.map((road, index) => {
                                const absoluteIndex = visibleStart + index;

                                return (
                                    <RoadmapCard
                                        key={absoluteIndex}
                                        setRoadSelected={setRoadSelected}
                                        roadSelected={roadSelected}
                                        index={absoluteIndex}
                                        title={road.title}
                                        description={road.description}
                                    />
                                );
                            })}
                        </div>

                        <div className="absolute top-0 right-0 flex flex-col gap-2">
                            {visibleStart > 0 && (
                                <button
                                    type="button"
                                    className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ease-out"
                                    style={liquidGlassStyles}
                                    onClick={handleShowPrev}
                                    aria-label="Mostrar card anterior"
                                >
                                    <Icon name="ArrowUp01Icon" size={20} color={"#d1cfc0"} />
                                </button>
                            )}

                            {visibleStart < maxStart && (
                                <button
                                    type="button"
                                    className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ease-out"
                                    style={liquidGlassStyles}
                                    onClick={handleShowNext}
                                    aria-label="Mostrar proximo card"
                                >
                                    <Icon name="ArrowDown01Icon" size={20} color={"#d1cfc0"} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="w-full h-[14rem] sm:h-[20rem] md:h-[26rem] lg:h-[36rem]">
                        <Roadmap roadSelected={roadSelected} />
                    </div>
                </Reveal>
            </div>

        </section >
    )
}

export default Profile