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
}
