import React from "react";
import * as Icons from "hugeicons-react";

interface IconProps {
    name: keyof typeof Icons;
    color?: string;
    size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, color = "#000", size = 24 }) => {
    const HugeIcon = Icons[name];
    return <HugeIcon color={color} size={size} style={{ flexShrink: 0 }}/>;
};
