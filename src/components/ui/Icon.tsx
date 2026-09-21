import React from "react";
import { Icon as IconifyIcon } from "@iconify/react/dist/offline";
import type { IconifyIcon as IconifyIconData } from "@iconify/react/dist/offline";

interface IconProps {
    icon: IconifyIconData;
    color?: string;
    size?: number;
}

export const Icon: React.FC<IconProps> = ({ icon, color = "currentColor", size = 24 }) => {
    return (
        <IconifyIcon
            icon={icon}
            color={color}
            width={size}
            height={size}
            style={{ flexShrink: 0 }}
        />
    );
};
