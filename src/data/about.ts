import type { ComponentType } from "react"
import { _React, TypescriptIcon, Javascript, MongodbIcon, NodejsIcon, GoogleGmail, ClaudeIcon, Java, Nestjs } from "@dev.icons/react"
import { Express, NextjsIcon, GithubIcon } from "@dev.icons/react/mono"
import { LinkedinIcon } from "@/components/ui/LinkedinIcon"

type Icon = ComponentType<{ size?: number; className?: string }>

const CODING_SINCE = 2020
const codingYears = new Date().getFullYear() - CODING_SINCE

export const ABOUT = {
    hero: {
        kicker: "Momentos marcantes",
        year: new Date().getFullYear(),
        text: "Transformo ideias em sistemas que funcionam — do banco de dados à última animação da interface.",
    },
    persona: {
        prefix: "Eu sou",
        title: ["Desenvolvedor", "de Sistemas"],
        sticker: "/stickers/dev.png",
        text: "Consistência é minha moeda. Gosto de código limpo, componentes reutilizáveis e detalhes bem feitos.",
    },
    github: {
        label: "GitHub",
        title: "Contribuições",
        subtitle: "Últimas semanas de commits.",
        levels: [
            0, 1, 0, 2, 1, 0, 0, 1, 2, 3, 3, 2, 1, 0, 0, 1, 3, 2, 1, 0, 0, 0, 1, 1, 2, 1, 1, 0, 1, 2, 2, 3, 2, 1, 2,
        ],
    },
    stack: [
        { name: "React / React Native", icon: _React },
        { name: "Next.js", icon: NextjsIcon },
        { name: "TypeScript", icon: TypescriptIcon },
        { name: "JavaScript", icon: Javascript },
        { name: "Node.js", icon: NodejsIcon },
        { name: "Express", icon: Express },
        { name: "NestJS", icon: Nestjs },
        { name: "Java", icon: Java },
        { name: "MongoDB", icon: MongodbIcon },
        { name: "Claude / Claude Code", icon: ClaudeIcon },
    ] satisfies { name: string; icon: Icon }[],
    category: {
        label: "Especialidade",
        title: "Full Stack",
        paletteLabel: "Paleta favorita",
        palette: ["#000000", "#7928ca", "#ccf381"],
    },
    stats: {
        label: "Programando há",
        value: `${codingYears} anos`,
        badge: `Desde ${CODING_SINCE}`,
    },
    socials: [
        { name: "GitHub", href: "https://github.com/EdOc-PS", icon: GithubIcon },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/eduardo-octavio/", icon: LinkedinIcon },
        { name: "Email", icon: GoogleGmail, opensContact: true },
    ] satisfies { name: string; href?: string; icon: Icon; opensContact?: boolean }[],
}
