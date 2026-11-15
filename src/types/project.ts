export interface Project {
    _id: string
    title: string
    subtitle?: string
    dark?: boolean
    description: string
    technologies: string[]
    github?: string
    live?: string
    image?: string
    video?: string
    order?: number
}
