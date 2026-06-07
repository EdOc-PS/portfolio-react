import { useState } from 'react'

import Button from '../../ui/Button'
import curriculoPdf from '../../../assets/curriculo_eduardo_octavio.pdf'

import { Icon } from '../../ui/Icon'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleOpenCurriculo = () => {
        window.open(curriculoPdf, '_blank', 'noopener,noreferrer')
    }

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80; // Altura do header
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMenuOpen(false);
        }
    };

    return (
        <header className="w-full top-0 z-50 fixed" style={{
            background: "#1f1f1f1F",
            borderBottom: "1px solid #FFFFFF59",
            backdropFilter: "blur(16px)",
            boxShadow: "inset 0 1px 0 #00000038, 0 10px 24px #00000038"
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    {/* Logo */}
                    <div className="shrink-0">
                        <h1 className="text-lg sm:text-xl font-bold text-gray-edoc-500">
                            Eduardo Octávio
                        </h1>
                    </div>

                    {/* Menu Desktop */}
                    <ul className='hidden md:flex gap-6 lg:gap-8 items-center'>
                        <li><p className='font-semibold text-sm cursor-pointer hover:text-gray-300 transition-colors' onClick={() => scrollToSection('home')}>Home</p></li>
                        <li><p className='font-semibold text-sm cursor-pointer hover:text-gray-300 transition-colors' onClick={() => scrollToSection('profile')}>Carreira</p></li>
                        <li><p className='font-semibold text-sm cursor-pointer hover:text-gray-300 transition-colors' onClick={() => scrollToSection('projects')}>Projetos</p></li>
                    </ul>

                    {/* Botão Desktop */}
                    <div className="hidden md:block">
                        <Button icon='ArrowDownRight01Icon' onClick={handleOpenCurriculo}>Curriculo</Button>
                    </div>

                    {/* Botão Hamburger Mobile */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex flex-col gap-1.5"
                        aria-label="Toggle menu"
                    >
                        <Icon name="Menu09Icon" size={24} color='text-gray-edoc-500' />
                    </button>
                </div>

                {/* Menu Mobile */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-gray-edoc-200">
                        <ul className='flex flex-col gap-3 pt-4'>
                            <li><p className='font-semibold text-sm hover:text-blue-600 transition-colors cursor-pointer' onClick={() => scrollToSection('home')}>Home</p></li>
                            <li><p className='font-semibold text-sm hover:text-blue-600 transition-colors cursor-pointer' onClick={() => scrollToSection('profile')}>Carreira</p></li>
                            <li><p className='font-semibold text-sm hover:text-blue-600 transition-colors cursor-pointer' onClick={() => scrollToSection('projects')}>Projetos</p></li>
                        </ul>
                        <div className="mt-4">
                            <Button onClick={handleOpenCurriculo}>Curriculo</Button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header