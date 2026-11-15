import MomentsCard from "@/components/layout/about/MomentsCard"
import ProfileCard from "@/components/layout/about/ProfileCard"
import GithubCard from "@/components/layout/about/GithubCard"
import StackCard from "@/components/layout/about/StackCard"
import SpecialtyCard from "@/components/layout/about/SpecialtyCard"
import CodingTimeCard from "@/components/layout/about/CodingTimeCard"
import SocialsCard from "@/components/layout/about/SocialsCard"

const About = () => (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:h-full md:grid-cols-4 md:grid-rows-[1.45fr_1fr]">
        {/* Linha de cima */}
        <MomentsCard index={0} />
        <ProfileCard index={1} />
        <GithubCard index={2} />

        {/* Linha de baixo */}
        <StackCard index={3} />
        <SpecialtyCard index={4} />
        <CodingTimeCard index={5} />
        <SocialsCard index={6} />
    </div>
)

export default About
