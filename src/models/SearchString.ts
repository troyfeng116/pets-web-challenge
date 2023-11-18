export interface SearchStringToken {
    substr: string
    isMatch: boolean
}

export interface SearchString {
    originalString: string
    pattern: string
    tokens: SearchStringToken[]
}
