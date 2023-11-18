import { Pet } from 'models/Pet'

/**
 * Determine all occurrences of pattern `t` in search string `s`, using KMP.
 *
 * @param s Search string.
 * @param t Pattern for which to search.
 * @returns List of indices at which pattern `t` occurs in search string `s`.
 */
const searchStringPattern = (s: string, t: string): number[] => {
    s = s.toLocaleLowerCase()
    t = t.toLocaleLowerCase()
    const n = s.length,
        m = t.length
    const patternTable = new Array<number>(m).fill(0)
    for (let i = 1; i < t.length; i++) {
        let j = patternTable[i - 1]
        while (j > 0 && t.charAt(j) != t.charAt(i)) {
            j = patternTable[j - 1]
        }
        if (t.charAt(j) == t.charAt(i)) {
            j++
        }
        patternTable[i] = j
    }

    const searchTable = new Array<number>(n).fill(0)
    for (let i = 0; i < n; i++) {
        let j = i === 0 ? 0 : searchTable[i - 1]
        while (j >= m || (j > 0 && t.charAt(j) != s.charAt(i))) {
            j = patternTable[j - 1]
        }
        if (t.charAt(j) == s.charAt(i)) {
            j++
        }
        searchTable[i] = j
    }

    const occurrences = []
    for (let i = 0; i < n; i++) {
        if (searchTable[i] == m) {
            occurrences.push(i - m + 1)
        }
    }
    return occurrences
}

/**
 * Filters list of pets by specified search pattern.
 * Search targets include pet title and description.
 */
export const searchPets = (pets: Pet[], pattern: string) => {
    if (!pattern) {
        return pets
    }

    return [...pets].filter(
        ({ title, description }) =>
            searchStringPattern(title, pattern).length > 0 || searchStringPattern(description, pattern).length > 0,
    )
}
