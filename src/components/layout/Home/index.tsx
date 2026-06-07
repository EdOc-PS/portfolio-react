import Button from '@/components/ui/Button'
import curriculoPdf from '@/assets/curriculo_eduardo_octávio.pdf'

import { Icon } from '@/components/ui/Icon'
import Reveal from '@/components/ui/Reveal'
import { Link } from 'react-router'


const Home = () => {
    const handleOpenCurriculo = () => {
        window.open(curriculoPdf, '_blank', 'noopener,noreferrer')
    }

    return (
        <section id="home" className="mt-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center flex-col gap-8 sm:gap-10">
                <Reveal className="mt-12 sm:mt-20 lg:mt-30">
                    <h1 className="font-garamond text-7xl sm:text-6xl md:text-7xl lg:text-9xl font-light text-center leading-tight">
                        Hello
                        <span className="text-indigo-300 italic"> There, </span>
                        <br />
                        Bem Vindo!
                    </h1>

                    <p className="text-sm sm:text-base text-center font-medium mt-4 px-4" >
                        Olá, sou o Eduardo, desenvolvedor Web/Mobile
                        <br className="hidden sm:block" />
                        Apaixonado pela tecnologia e inovações.
                    </p>
                </Reveal>

                <Reveal delay={150} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">
                    <Button icon='ArrowDownRight01Icon' onClick={handleOpenCurriculo}>Curriculo</Button>
                    <Button variant="liquidGlass">
                        <Link target="_blank" to="https://github.com/EdOc-PS?tab=repositories">Ver Repositorios 🦎</Link>
                    </Button>
                </Reveal>

                <Reveal delay={300}>
                    <ul className="flex gap-4 items-center">
                        <li><div className="icon-wrapper">
                            <Link target="_blank" to="https://github.com/EdOc-PS">
                                <Icon name="GithubIcon" size={20} color="text-gray-500" />
                            </Link>
                        </div></li>

                        <li><div className="icon-wrapper">
                            <Link target="_blank" to="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=euardooctavio@gmail.com">
                                <Icon name="Mail02Icon" size={20} color="text-gray-500" />
                            </Link>
                        </div></li>

                        <li><div className="icon-wrapper">
                            <Link target="_blank" to="https://www.linkedin.com/in/eduardo-octavio/">
                                <Icon name="Linkedin01Icon" size={20} color="text-gray-500" />
                            </Link>
                        </div></li>
                    </ul>
                </Reveal>


                <Reveal delay={450} className="w-full">
                    <video
                        className="rounded-2xl w-full h-64 sm:h-96 md:h-128 lg:h-198 object-cover object-center"
                        src="/tree-clouds.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </Reveal>

                <Reveal delay={150} className="w-full">
                    <figure className="max-w-3xl mx-auto text-center">
                        <blockquote className="italic text-base sm:text-lg leading-relaxed text-gray-edoc-500">
                            “A imaginação é mais importante que o conhecimento, porque o conhecimento é limitado, ao passo que a imaginação abrange o mundo inteiro.”
                        </blockquote>
                        <figcaption className="mt-4 text-sm sm:text-base text-indigo-300 font-medium">
                            — Albert Einstein
                        </figcaption>
                    </figure>
                </Reveal>

            </div>

        </section >
    )
}

export default Home