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
                    <div className="relative w-fit mx-auto mb-10 sm:mb-14">
                        <svg
                            viewBox="0 0 494 161"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                            className="absolute left-1/2 top-[90%] -translate-x-1/2 -translate-y-1/2 w-[145%] h-[200%] text-indigo-300 opacity-40 pointer-events-none"
                        >
                            <path d="M337.907 154.31C336.285 155.625 335.439 156.882 334.377 157.096C326.901 158.596 319.367 161.111 311.877 160.996C283.981 160.568 255.985 160.496 228.261 157.925C197.209 155.053 166.328 150.01 135.491 145.153C110.164 141.167 85.2243 135.281 61.2174 126.023C42.319 118.737 25.4008 108.208 10.922 94.1219C3.28799 86.693 -1.76307 77.9641 0.575922 66.4207C2.57052 56.5774 9.98928 51.5201 17.3937 46.6484C34.5702 35.3051 53.9709 29.1762 73.7447 24.2189C84.5786 21.5045 95.4557 18.8758 106.433 16.8186C122.863 13.747 139.322 10.6897 155.882 8.57536C177.593 5.80381 199.39 3.67515 221.201 1.83221C234.001 0.760735 246.93 0.0892763 259.745 0.603584C268.627 0.960743 277.366 -0.396454 286.162 0.117854C293.882 0.560731 301.574 1.60363 309.294 2.04651C311.188 2.1608 313.183 0.460724 315.105 0.51787C327.374 0.860742 339.672 1.16075 351.898 2.18937C354.596 2.41795 357.121 3.11798 359.876 2.38938C360.737 2.16079 361.914 3.01798 362.918 3.43228C363.88 3.8323 364.812 4.28945 365.76 4.71804C365.889 4.06087 366.018 3.41799 366.147 2.76082C368.113 3.3037 370.064 3.8323 372.49 4.50376C374.255 4.2466 376.981 3.03227 379.133 3.68944C387.083 6.11811 395.291 4.23231 403.327 5.8181C411.564 7.44674 420.059 7.70389 428.381 8.93252C445.802 11.5041 462.978 15.3757 478.576 23.6617C484.015 26.5476 488.966 31.6764 492.266 36.948C496.958 44.4341 491.577 57.0775 482.723 63.3063C469.737 72.4495 454.828 77.0355 439.89 81.4214C404.131 91.9075 367.252 96.622 330.546 102.337C294.011 108.023 257.262 111.066 220.326 111.294C199.835 111.423 179.329 110.551 158.838 109.808C155.093 109.68 151.319 108.237 147.717 106.951C143.728 105.537 142.68 102.537 144.144 98.5364C145.722 94.2076 148.908 95.5934 151.505 96.6934C161.923 101.108 172.843 102.251 183.993 102.037C214.328 101.451 244.677 101.208 274.984 100.008C289.161 99.4507 303.324 97.3506 317.387 95.3077C343.589 91.5075 369.907 88.0788 395.865 82.9214C422.283 77.6641 448.787 71.9924 472.822 58.8918C475.276 57.5632 477.629 55.9631 479.753 54.1488C488.521 46.7199 487.774 41.1053 479.452 33.905C470.856 26.4618 459.922 23.4903 449.102 21.5045C430.534 18.0901 411.851 14.6328 393.067 13.147C362.631 10.7326 332.067 9.16109 301.545 8.60393C273.463 8.08962 245.294 8.48964 217.255 10.0897C174.78 12.5041 132.636 18.1186 91.2369 28.2476C70.4156 33.3479 49.709 38.9338 30.7962 49.3343C24.8698 52.5915 19.2304 56.6917 14.2511 61.2776C7.42069 67.5779 7.54984 74.8925 13.1749 82.2785C20.5219 91.9361 30.3083 98.665 40.2239 105.308C61.0596 119.266 84.8656 125.209 108.887 130.509C121.457 133.281 134.027 136.124 146.713 138.281C161.191 140.738 175.771 142.553 190.335 144.467C200.595 145.824 210.87 147.139 221.173 148.01C237.216 149.367 253.273 150.667 269.344 151.367C288.214 152.196 307.113 152.296 325.997 152.853C329.599 152.953 333.186 153.696 337.907 154.282V154.31Z" fill="currentColor" />
                        </svg>
                        <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold text-center font-garamond">
                            Projetos
                        </h1>
                    </div>
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

                {/* Estatísticas */}
                <Reveal delay={200} className="w-full">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl mx-auto">
                        {[
                            { value: "+10", label: "Participações em projetos" },
                            { value: "5", label: "Projetos concluídos" },
                            { value: "+20", label: "Tecnologias" },
                            { value: "+2", label: "Anos de experiência" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="flex flex-col items-center text-center gap-1 px-4 py-6 rounded-2xl bg-[#FFFFFF0A] border border-[#FFFFFF1F]"
                            >
                                <span className="font-garamond text-4xl sm:text-5xl font-bold text-indigo-300">
                                    {stat.value}
                                </span>
                                <span className="text-xs sm:text-sm text-gray-edoc-500/70">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
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