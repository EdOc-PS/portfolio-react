import arrowDownBoldDuotone from "@iconify-icons/solar/arrow-down-bold-duotone"
import { Icon } from "@/components/ui/Icon"
import ProjectCard from "@/components/ui/ProjectCard"
import { PROJECTS } from "@/pages/work/projects"

const Work = () => {
    return (
        <div className="min-h-screen w-full bg-base-bg">
            <section className="flex min-h-screen w-full flex-col items-center justify-center gap-10 px-6 py-24 text-center">
                <h1
                    className="text-6xl sm:text-7xl md:text-8xl font-extrabold leading-[0.95]"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    <span className="text-base-ink">Projetos em</span>
                    <br />
                    <span className="text-ink-soft">destaque</span>
                </h1>

                <Icon icon={arrowDownBoldDuotone} size={28} />

                <p className="max-w-xl text-lg text-ink-soft">
                    Uma seleção de trabalhos que mostram como ideias viram produtos: do primeiro rascunho ao detalhe de implementação.
                </p>
            </section>

            <section className="mx-auto flex w-full max-w-[85rem] flex-col gap-8 px-6 sm:px-10 pb-24">
                <ProjectCard project={PROJECTS[0]} className="aspect-4/3 sm:aspect-21/9" />

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:auto-rows-[28rem]">
                    <ProjectCard project={PROJECTS[1]} className="aspect-4/3 sm:aspect-auto" />
                    <ProjectCard project={PROJECTS[3]} className="aspect-4/3 sm:aspect-auto sm:row-span-2" />
                    <ProjectCard project={PROJECTS[2]} className="aspect-4/3 sm:aspect-auto" />
                </div>

                <ProjectCard project={PROJECTS[4]} className="aspect-4/3 sm:aspect-21/9" />
            </section>
        </div>
    )
}

export default Work
