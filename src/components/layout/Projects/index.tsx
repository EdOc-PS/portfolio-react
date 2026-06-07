import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal"
import ProjectCard from "@/components/ui/ProjectCard"
import Badge from "@/components/ui/Badge"
import ModalSkeleton from "@/components/ui/Loading/ModalSkeleton";
import { useEffect, useState } from "react";
import { GetRequest } from "@/service/getRequest";
import { Link } from "react-router-dom";
import ProjectSkeleton from "@/components/ui/Loading/ProjectSkeleton";
import Reveal from "@/components/ui/Reveal";
import ScribbleBackground from "@/components/ui/ScribbleBackground";


interface Project {
    title: string;
    _id: string;
    description: string;
    technologies: string[];
    github: string;
    live: string;
}

const Projects = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [projects, setProjects] = useState<Project[]>([]);
    const [details, setDetails] = useState<Project | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const getProjects = async () => {
        setLoading(true);
        try {
            const response = await GetRequest("http://localhost:5000/projects");

            if (!response.success) {
                console.error("Ocorreu um erro ao obter os projetos.");
                return;
            }
            setProjects(response.projects);
        } catch (error) {
            console.error("Ocorreu um erro ao obter os projetos:", error);
        } finally {
            setLoading(false);
        }
    }

    const getDetails = async (id: string) => {
        setLoading(true);
        try {
            const response = await GetRequest(`http://localhost:5000/projects/${id}`);

            if (!response.success) {
                console.error("Ocorreu um erro ao obter os detalhes do projeto.");
                return;
            }
            console.log(response.projects);
            setDetails(response.projects);

        } catch (error) {
            console.error("Ocorreu um erro ao obter os detalhes do projeto:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProjects();
    }, [])

    return (
        <section id="projects" className="py-24 sm:py-32 lg:py-40 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-col gap-10">
                <Reveal className="w-full">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-2 font-garamond">
                        Projetos
                    </h1>
                    <p className="w-full max-w-lg mx-auto text-sm sm:text-base text-center px-2">
                        Confira a seguir alguns dos projetos que desenvolvi, refletindo minhas habilidades e a aplicação de tecnologias para resolver desafios reais.
                    </p>
                </Reveal>



                <Reveal delay={150}>
                    <img
                        src="/doodledo-tech.png"
                        alt="Ilustração de desenvolvimento"
                        className="w-40 sm:w-52 lg:w-64 select-none pointer-events-none"
                    />
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {loading ? (
                        <>
                            <ProjectSkeleton />
                            <ProjectSkeleton />
                            <ProjectSkeleton />
                            <ProjectSkeleton />
                        </>
                    ) : (
                        projects.map((project, index) => (
                            <Reveal key={project._id} delay={index * 100} className="flex">
                                <ProjectCard id={project._id} title={project.title} viewModal={setIsModalOpen} getDetails={getDetails} />
                            </Reveal>
                        ))
                    )}
                </div>

                {/* CTA de contato */}
                <Reveal
                    className="relative w-full max-w-4xl overflow-hidden rounded-4xl px-8 sm:px-12 py-10 sm:py-12 flex flex-col sm:flex-row items-start gap-8 mt-16 sm:mt-24"
                    style={{ background: "linear-gradient(to right, #7b8fd4, #a3b3ff)" }}
                >
                    {/* Rabiscos decorativos dentro do card */}
                    <ScribbleBackground variant="card" color="#3a3a55" />

                        {/* Texto */}
                    <div className="relative z-10 flex-1 flex flex-col gap-4 items-start">
                        <h2 className="text-neutral-edoc-500 text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug font-garamond">
                            Gostou do que viu?
                        </h2>
                        <p className="text-neutral-edoc-500/80 text-base sm:text-lg max-w-md">
                            Se algum projeto chamou sua atenção ou quer conversar sobre uma oportunidade, é só me chamar — responderei o mais breve possível.
                        </p>
                        <Button icon="Mail02Icon">
                            <Link to="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=eeuardooctavio@gmail.com" target="_blank">
                                Entrar em contato
                            </Link>
                        </Button>
                    </div>

                    {/* Ilustração */}
                    <img
                        src="/doodledo-conversation.png"
                        alt="Ilustração de conversa"
                        className="relative z-10 w-44 sm:w-56 lg:w-64 shrink-0 select-none"
                    />
                </Reveal>
            </div>

            {/* Modal */}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {loading ? (
                    <ModalSkeleton />
                ) : (
                    <div className="flex flex-col justify-between h-full">
                        <img src="https://i.redd.it/d95vefqn7nn71.png" alt="" className="w-full h-64 object-cover rounded-xl mb-4" />
                        <div className="mb-4">
                            <h1 className="text-md font-bold mb-3">{details?.title}</h1>
                            <p className="font-light h-full">
                                {details?.description}
                            </p>
                        </div>
                        <div className="mb-4">
                            <h1 className="text-md font-medium mb-3">Tecnologias</h1>
                            <div className="flex flex-wrap gap-2">
                                {details?.technologies.map((tech, index) => (
                                    <Badge key={index} variant="liquidGlass">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            {details?.live && (
                                <Button
                                    isFullWidth
                                    disableHoverScale
                                    icon="InternetIcon"
                                    onClick={() => window.open(details?.live || "#", "_blank", "noopener,noreferrer")}
                                >
                                    Site
                                </Button>
                            )}
                            <Button
                                isFullWidth
                                disableHoverScale
                                variant="liquidGlass"
                                onClick={() => window.open(details?.github || "#", "_blank", "noopener,noreferrer")}
                            >
                                Repositório  🦎
                            </Button>
                        </div>
                    </div>
                )}

            </Modal>


        </section >
    )
}

export default Projects