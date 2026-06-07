import { Icon } from "../Icon";

interface ProjectsCardProps {
    title?: string;
    id: string;
    viewModal: (value: boolean) => void;
    getDetails: (id: string) => void;
}

const ProjectCard = ({ title, id, viewModal, getDetails }: ProjectsCardProps) => {
    const handleActiveModal = () => {
        viewModal(true);
        getDetails(id);
    };

    return (
        <div
            onClick={handleActiveModal}
            className="group relative flex flex-col justify-between w-full h-56 p-6 rounded-2xl cursor-pointer overflow-hidden
                       bg-[#FFFFFF0A] border border-[#FFFFFF1F]
                       shadow-[inset_0_1px_0_#FFFFFF1A,0_10px_24px_#00000038]
                       transition-all duration-300 ease-out
                       hover:bg-[#FFFFFF1A] hover:border-[#FFFFFF40] hover:-translate-y-1.5 hover:shadow-[inset_0_1px_0_#FFFFFF40,0_18px_40px_#00000050]"
        >
            {/* Brilho radial no hover */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-indigo-400/0 blur-2xl transition-all duration-500 group-hover:bg-indigo-400/20" />

            {/* Topo: ícone */}
            <div className="relative flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFFFFF14] border border-[#FFFFFF24] transition-colors duration-300 group-hover:bg-indigo-400/20 group-hover:border-indigo-300/40">
                    <Icon name="SourceCodeIcon" size={22} color="#d1cfc0" />
                </div>
                <span className="text-xs font-medium text-gray-edoc-500/40 uppercase tracking-wider">
                    Projeto
                </span>
            </div>

            {/* Base: título + CTA */}
            <div className="relative flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-edoc-500 leading-tight">
                    {title}
                </h1>
                <div className="flex items-center gap-2 text-sm font-medium text-indigo-300 transition-all duration-300 group-hover:gap-3">
                    <span>Ver detalhes</span>
                    <Icon name="ArrowRight01Icon" size={18} color="#a5b4fc" />
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
