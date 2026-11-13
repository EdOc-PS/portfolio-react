import type { ComponentType } from "react"
import { _React, TypescriptIcon, Javascript, MongodbIcon, NodejsIcon, GoogleGmail, ClaudeIcon } from "@dev.icons/react"
// Logos originalmente pretos (somem no fundo escuro) → versão mono, herda o branco
import { Express, NextjsIcon, GithubIcon } from "@dev.icons/react/mono"
import { LinkedinIcon } from "@/components/ui/LinkedinIcon"

type Icon = ComponentType<{ size?: number; className?: string }>

/** Conteúdo da aba "Sobre". Edite aqui — os componentes só leem estes dados. */
export const ABOUT = {
    hero: {
        kicker: "Meu ano em código",
        /** Fallback: usado enquanto /api/phrases/random não responde (ex.: npm run dev) */
        year: new Date().getFullYear(),
        text: "Transformo ideias em sistemas que funcionam — do banco de dados à última animação da interface.",
    },
    persona: {
        prefix: "Eu sou",
        title: ["Desenvolvedor", "de Sistemas"],
        /** Easter egg do hover no título — coloque a imagem em public/stickers/ */
        sticker: "/stickers/dev.png",
        text: "Consistência é minha moeda. Gosto de código limpo, componentes reutilizáveis e detalhes bem feitos.",
    },
    github: {
        label: "GitHub",
        title: "Contribuições",
        subtitle: "Últimas semanas de commits.",
        /** 0 a 4 — exemplo; substituído pelos dados de /api/github quando a rota responde */
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
        value: "4 anos",
        badge: "Desde 2022",
    },
    socials: [
        { name: "GitHub", href: "https://github.com/EdOc-PS", icon: GithubIcon },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/eduardo-octavio/", icon: LinkedinIcon },
        { name: "Email", href: "mailto:eeuardooctavio@gmail.com", icon: GoogleGmail },
    ] satisfies { name: string; href: string; icon: Icon }[],
}
