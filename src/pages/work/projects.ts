export interface Project {
    _id: string
    title: string
    description: string
    technologies: string[]
    github?: string
    live?: string
    /** Caminho em /public, ex.: "/projects/cover.jpg" */
    image?: string
    /** Preview em loop (mudo), ex.: "/projects/preview.mp4" */
    video?: string
    /** Posição fixa: 0 destaque, 1 topo-esq, 2 baixo-esq, 3 alto à direita, 4 largo no fim */
    order?: number
}
