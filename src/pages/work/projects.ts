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
    /** Posição na grade: 0 topo-esq, 1 baixo-esq, 2 alto à direita, 3 largo no fim */
    order?: number
}
