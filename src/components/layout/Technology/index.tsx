import Badge from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import Sunburst from "@/components/ui/Sunburst";

const devTechs = [
    "HTML5",
    "CSS",
    "SASS",
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "Angular",
    "React Native",
    "React.js",
    "Next.js",
    "Vue",
    "Tailwind CSS",
    "C#",
];

const toolTechs = [
    "Git",
    "Github",
    "Docker",
    "Figma",
    "Postman",
    "Vercel",
    "PostgreSQL",
    "MySQL",
    "Unity",
];

interface TechGroupCardProps {
    title: string;
    subtitle: string;
    items: string[];
    icon: React.ComponentProps<typeof Icon>["name"];
}

const TechGroupCard = ({ title, subtitle, items, icon }: TechGroupCardProps) => {
    return (
        <div
            className="flex flex-col gap-6 p-6 sm:p-8 rounded-2xl w-full transition-transform duration-300 hover:scale-[1.02] cursor-default"
            style={{
                background: "#FFFFFF0A",
                border: "1px solid #FFFFFF1F",
                boxShadow: "inset 0 1px 0 #FFFFFF1A, 0 10px 24px #00000038",
            }}
        >
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-edoc-500">
                    {title}
                </h2>
                <Icon name={icon} size={26} color="#d1cfc0" />

            </div>

            <p className="text-sm sm:text-base text-gray-edoc-500/70 -mt-4">
                {subtitle}
            </p>

            <div className="h-px w-full bg-white-500" />

            <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                    <Badge key={item} variant="liquidGlass">
                        {item}
                    </Badge>
                ))}
            </div>
        </div>
    );
};

const Technology = () => {
    return (
        <section id="technology" className="py-24 sm:py-32 lg:py-40 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-col gap-8 sm:gap-10">
                <Reveal className="w-full">
                    <div className="relative w-fit mx-auto mb-8 sm:mb-10">
                        <Sunburst opacity={0.35} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[320%]" />
                        <h1 className="relative font-garamond text-4xl sm:text-5xl lg:text-6xl font-bold text-center">
                            Tecnologias
                        </h1>
                    </div>
                    <p className="w-full max-w-lg mx-auto text-sm sm:text-base text-center">
                        Aqui estão algumas das tecnologias e ferramentas que domino, cada uma representando um passo na minha jornada de aprendizado e desenvolvimento como profissional de tecnologia.
                    </p>
                </Reveal>

                <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-0 items-stretch">
                    <Reveal delay={150} className="flex-1 flex">
                        <TechGroupCard
                            title="Desenvolvimento"
                            subtitle="Linguagens e frameworks que uso para construir interfaces e aplicações"
                            items={devTechs}
                            icon="SourceCodeIcon"
                        />
                    </Reveal>

                    <div className="hidden lg:flex items-center px-6">
                        <span className="w-0.5 h-62 bg-gray-edoc-500/50 rounded-full" />
                    </div>

                    <Reveal delay={300} className="flex-1 flex">
                        <TechGroupCard
                            title="Ferramentas"
                            subtitle="Plataformas e utilitários do meu fluxo de desenvolvimento"
                            items={toolTechs}
                            icon="ToolsIcon"
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Technology;
