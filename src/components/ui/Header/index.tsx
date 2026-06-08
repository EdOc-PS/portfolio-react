import { useState } from 'react'

import Button from '../../ui/Button'

import { Icon } from '../../ui/Icon'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="w-full top-0 z-50 fixed">
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
                        <li><p className='font-semibold text-sm cursor-pointer'>Perfil</p></li>
                        <li><p className='font-semibold text-sm cursor-pointer'>Carreira</p></li>
                        <li><p className='font-semibold text-sm cursor-pointer'>Projetos</p></li>
                    </ul>

                    {/* Botão Desktop */}
                    <div className="hidden md:block">
                        <Button icon='ArrowDownRight01Icon' >Curriculo</Button>
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
                    <div className="md:hidden pb-4 border-t border-gray-200">
                        <ul className='flex flex-col gap-3 pt-4'>
                            <li><p className='font-semibold text-sm hover:text-blue-600 transition-colors cursor-pointer'>Perfil</p></li>
                            <li><p className='font-semibold text-sm hover:text-blue-600 transition-colors cursor-pointer'>Carreira</p></li>
                            <li><p className='font-semibold text-sm hover:text-blue-600 transition-colors cursor-pointer'>Projetos</p></li>
                        </ul>
                        <div className="mt-4">
                            <Button>Curriculo</Button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header