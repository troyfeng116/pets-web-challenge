import { ClientPet, Pet } from 'models/Pet'
import { SearchString, SearchStringToken } from 'models/SearchString'

/**
 * Determine all occurrences of pattern `t` in search string `s`, using KMP.
 *
 * @param s Search string.
 * @param t Pattern for which to search.
 * @param shouldIgnoreCase Whether to ignore casing in search.
 * @returns List of indices at which pattern `t` occurs in search string `s`.
 */
const searchStringPattern = (s: string, t: string, shouldIgnoreCase: boolean): number[] => {
    if (shouldIgnoreCase) {
        s = s.toLocaleLowerCase()
        t = t.toLocaleLowerCase()
    }

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
 * Perform search for pattern `pattern` in `s`, and return `SearchString` with tokenized results.
 */
const stringToSearchString = (s: string, pattern: string, shouldIgnoreCase = true): SearchString => {
    if (!pattern) {
        return {
            originalString: s,
            pattern: '',
            tokens: [
                {
                    substr: s,
                    isMatch: false,
                },
            ],
        }
    }

    const matchIdxs = searchStringPattern(s, pattern, shouldIgnoreCase)
    if (!matchIdxs) {
        return {
            originalString: s,
            pattern: pattern,
            tokens: [
                {
                    substr: s,
                    isMatch: false,
                },
            ],
        }
    }

    const tokens: SearchStringToken[] = []
    if (matchIdxs[0] != 0) {
        tokens.push({ substr: s.slice(0, matchIdxs[0]), isMatch: false })
    }
    let i = 0
    while (i < matchIdxs.length) {
        const curIdx = matchIdxs[i]
        tokens.push({ substr: s.slice(curIdx, curIdx + pattern.length), isMatch: true })
        i++
        while (i < matchIdxs.length && matchIdxs[i] < curIdx + pattern.length) {
            i++
        }
        tokens.push({ substr: s.slice(curIdx + pattern.length, matchIdxs[i]), isMatch: false })
    }

    return {
        originalString: s,
        pattern: pattern,
        tokens: tokens,
    }
}

/**
 * Filters list of pets by specified search pattern.
 * Search targets include pet title and description.
 */
export const searchPets = (pets: Pet[], pattern: string): ClientPet[] => {
    const petsWithSearchResults = pets.map((pet) => {
        const { title, description } = pet
        return {
            ...pet,
            searchedTitle: stringToSearchString(title, pattern),
            searchedDescription: stringToSearchString(description, pattern),
        }
    })

    if (!pattern) {
        return petsWithSearchResults
    }

    return [...petsWithSearchResults].filter(({ searchedTitle, searchedDescription }) => {
        return searchedTitle.tokens.length > 1 || searchedDescription.tokens.length > 1
    })
}
