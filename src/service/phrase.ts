import { GetRequest } from "./getRequest"

export interface Phrase {
    year: number
    text: string
}

/**
 * Frase sorteada do card "Momentos que marcaram" (GET /api/phrases/random).
 * A requisição é feita UMA vez e guardada: o MainLayout dispara ela assim que o site abre,
 * então quando a pessoa chega na aba Sobre a frase normalmente já está pronta.
 */
let promise: Promise<Phrase | null> | null = null
let resolved: Phrase | null | undefined // undefined = ainda carregando

export const fetchPhrase = () => {
    promise ??= GetRequest("/api/phrases/random").then((data) => {
        const phrase: Phrase | null = data?.phrase ?? null
        resolved = phrase
        return phrase
    })
    return promise
}

/** Sorteia uma frase nova (sem cache) — usado na troca automática a cada 15s */
export const fetchRandomPhrase = async (): Promise<Phrase | null> => {
    const data = await GetRequest("/api/phrases/random")
    return data?.phrase ?? null
}

/** Resultado já disponível (sem esperar), ou undefined se ainda está carregando */
export const getCachedPhrase = () => resolved
