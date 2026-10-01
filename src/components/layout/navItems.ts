import caseRoundBoldDuotone from "@iconify-icons/solar/case-round-bold-duotone"
import userCircleBoldDuotone from "@iconify-icons/solar/user-circle-bold-duotone"
import letterBoldDuotone from "@iconify-icons/solar/letter-bold-duotone"
import type { Icon } from "@/components/ui/Icon"

export interface NavItem {
    to: string
    label: string
    icon: React.ComponentProps<typeof Icon>["icon"]
}

export const NAV_ITEMS: NavItem[] = [
    { to: "/work", label: "Trabalho", icon: caseRoundBoldDuotone },
    { to: "/about", label: "Sobre", icon: userCircleBoldDuotone },
    { to: "/contact", label: "Contato", icon: letterBoldDuotone },
]
