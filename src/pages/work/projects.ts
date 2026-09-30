export interface Project {
    slug: string
    title: string
    description: string
    technologies: string[]
    github?: string
    live?: string
    image: string
}

export const PROJECTS: Project[] = [
    {
        slug: "nimbus",
        title: "Nimbus",
        description: "Plataforma SaaS para gestão de equipes remotas, com dashboards em tempo real e automações de fluxo de trabalho.",
        technologies: ["React", "Node.js", "PostgreSQL"],
        github: "",
        live: "",
        image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80",
    },
    {
        slug: "orbit",
        title: "Orbit",
        description: "Aplicação fintech para controle financeiro pessoal, com categorização automática de gastos e metas de economia.",
        technologies: ["React Native", "TypeScript", "Firebase"],
        github: "",
        live: "",
        image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80",
    },
    {
        slug: "lumen",
        title: "Lumen",
        description: "Identidade visual e site institucional para um estúdio de branding, com foco em tipografia e motion design.",
        technologies: ["Figma", "React", "Framer Motion"],
        github: "",
        live: "",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    },
    {
        slug: "drift",
        title: "Drift",
        description: "Marketplace descentralizado Web3 para negociação de ativos digitais, com carteira integrada e contratos inteligentes.",
        technologies: ["Solidity", "Next.js", "Ethers.js"],
        github: "",
        live: "",
        image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=80",
    },
    {
        slug: "atlas",
        title: "Atlas",
        description: "Aplicativo mobile de planejamento de viagens, com roteiros colaborativos e integração com mapas offline.",
        technologies: ["React Native", "Expo", "SQLite"],
        github: "",
        live: "",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
    },
]
