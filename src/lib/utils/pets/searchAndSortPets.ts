import { OrderBy } from 'models/OrderBy'
import { ClientPet, Pet } from 'models/Pet'

import { searchPets } from './searchPets'
import { sortPetsByName } from './sortPets'

/**
 * Apply sort and search operations serially to `pets`.
 */
export const sortAndSearchPets = (pets: Pet[], searchText: string, orderBy?: OrderBy): ClientPet[] => {
    if (orderBy !== undefined) {
        pets = sortPetsByName(pets, orderBy)
    }

    return searchPets(pets, searchText)
}
