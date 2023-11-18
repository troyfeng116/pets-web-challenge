import { SearchString } from './SearchString'

export interface Pet {
    title: string
    description: string
    url: string
    created: string
}

export interface ClientPet extends Pet {
    searchedTitle: SearchString
    searchedDescription: SearchString
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromJson = (petJson: any): Pet | null => {
    try {
        return {
            title: petJson['title'],
            description: petJson['description'],
            url: petJson['url'],
            created: petJson['created'],
        }
    } catch (e) {
        console.error(e)
        return null
    }
}
