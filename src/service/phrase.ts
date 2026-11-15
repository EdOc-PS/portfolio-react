import { GetRequest } from "./getRequest"

export interface Phrase {
    year: number
    text: string
}

let promise: Promise<Phrase | null> | null = null
let resolved: Phrase | null | undefined

export const fetchPhrase = () => {
    promise ??= GetRequest("/api/phrases/random").then((data) => {
        const phrase: Phrase | null = data?.phrase ?? null
        resolved = phrase
        return phrase
    })
    return promise
}

export const fetchRandomPhrase = async (): Promise<Phrase | null> => {
    const data = await GetRequest("/api/phrases/random")
    return data?.phrase ?? null
}

export const getCachedPhrase = () => resolved
