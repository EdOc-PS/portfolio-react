import React from 'react'
import * as Icons from "hugeicons-react";

import { Icon } from '../Icon';

interface Props {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "liquidGlass"   
    icon?: keyof typeof Icons;
    isFullWidth?: boolean;
    disableHoverScale?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, icon, variant = "primary", isFullWidth = false, disableHoverScale = false, onClick }: Props) {
    const variantStyles = {
        primary: "bg-gray-edoc-500 text-neutral-edoc-500",
        secondary: "bg-white-500 text-gray-edoc-500",
        liquidGlass: "bg-[#FFFFFF1F] text-gray-edoc-500 border border-[#FFFFFF59] backdrop-blur-xl shadow-[inset_0_1px_0_#FFFFFF73,0_10px_28px_#00000039] hover:bg-[#FFFFFF2E] hover:border-[#FFFFFF80]"
    } as const;

    const iconColor = {
        primary: "text-neutral-edoc-500",
        secondary: "text-gray-edoc-500",
        liquidGlass: "text-gray-edoc-500"
    } as const;

    return (
        <button
            onClick={onClick}
            className={`${variantStyles[variant]} ${isFullWidth ? 'w-full justify-center' : ''} ${disableHoverScale ? '' : 'hover:scale-110'}
                        rounded-xl py-3.5 px-5 cursor-pointer flex items-center gap-3 font-medium transition-all duration-300 `}>
            <>
                {children}

                {icon && (
                    <Icon name={icon} size={18} color={iconColor[variant]} />
                )}

            </>
        </button>
    )
}