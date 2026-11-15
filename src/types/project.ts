export interface Project {
    _id: string
    title: string
    /** Linha embaixo do título no card, ex.: "Landing page · React" */
    subtitle?: string
    /** true = vidro escuro no box do card (mídia clara). false ou ausente = vidro claro padrão */
    dark?: boolean
    description: string
    technologies: string[]
    github?: string
    live?: string
    /** Caminho em /public, ex.: "/projects/cover.jpg" */
    image?: string
    /** Preview em loop (mudo), ex.: "/projects/preview.mp4" */
    video?: string
    /** Posição do card: 0 = primeiro (esquerda), crescente. Só os 5 menores aparecem */
    order?: number
}
