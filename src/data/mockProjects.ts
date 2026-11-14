import type { Project } from "@/types/project"

/**
 * Projetos de teste — usados só quando /api/projects não responde (ex.: `npm run dev` sem Vercel).
 * Sem imagem: o card mostra o fundo branco padrão.
 */
export const MOCK_PROJECTS: Project[] = [
    { _id: "m1", title: "Projeto 1", subtitle: "Subtítulo do projeto", description: "", technologies: [], github: "https://github.com/EdOc-PS", live: "example.com", order: 0 },
    { _id: "m2", title: "Projeto 2", subtitle: "Subtítulo do projeto", description: "", technologies: [], order: 1 },
    { _id: "m3", title: "Projeto 3", subtitle: "Subtítulo do projeto", description: "", technologies: [], order: 2 },
    { _id: "m4", title: "Projeto 4", subtitle: "Subtítulo do projeto", description: "", technologies: [], order: 3 },
    { _id: "m5", title: "Projeto 5", subtitle: "Subtítulo do projeto", description: "", technologies: [], order: 4 },
]
