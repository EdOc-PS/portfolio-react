export interface Project {
    slug: string
    name: string
    year: string
    category: string
    image: string
}

export const PROJECTS: Project[] = [
    {
        slug: "nimbus",
        name: "Nimbus",
        year: "2025",
        category: "SaaS",
        image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80",
    },
    {
        slug: "orbit",
        name: "Orbit",
        year: "2024",
        category: "Fintech",
        image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80",
    },
    {
        slug: "lumen",
        name: "Lumen",
        year: "2024",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    },
    {
        slug: "drift",
        name: "Drift",
        year: "2023",
        category: "Web 3.0",
        image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1200&q=80",
    },
    {
        slug: "atlas",
        name: "Atlas",
        year: "2023",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
    },
]
