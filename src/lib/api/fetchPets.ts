import { Pet } from 'models/Pet'

import { APIResponse__Base } from '.'

const PETS_URL = 'https://eulerity-hackathon.appspot.com/pets'

interface APIResponse__FetchPets extends APIResponse__Base {
    pets?: Pet[]
}

export const API__fetchPets = async (): Promise<APIResponse__FetchPets> => {
    const res = await fetch(PETS_URL)
    if (res.status !== 200) {
        return {
            success: false,
            error: res.statusText,
        }
    }

    const resJson = await res.json()
    console.log(resJson)
    return {
        success: true,
        pets: resJson as Pet[],
    }
}
