import { sortAndSearchPets } from 'lib/utils/pets/searchAndSortPets'
import { searchPets } from 'lib/utils/pets/searchPets'

import {
    CLIENT_PETS_MANAGER_RESET,
    CLIENT_PETS_MANAGER_SEARCH,
    CLIENT_PETS_MANAGER_SERVER_UPDATE,
    CLIENT_PETS_MANAGER_SORT_BY_NAME,
    ClientPetsManagerAction,
} from './actions'
import { ClientPetsManagerState } from '.'

export const reducer = (state: ClientPetsManagerState, action: ClientPetsManagerAction): ClientPetsManagerState => {
    switch (action.type) {
        case CLIENT_PETS_MANAGER_RESET:
            return { orderedBy: undefined, searchedText: '', clientPets: searchPets(action.serverPets, '') }
        case CLIENT_PETS_MANAGER_SORT_BY_NAME:
            return {
                ...state,
                orderedBy: action.orderBy,
                clientPets: sortAndSearchPets(action.serverPets, state.searchedText, action.orderBy),
            }
        case CLIENT_PETS_MANAGER_SEARCH:
            return {
                ...state,
                searchedText: action.searchText,
                clientPets: sortAndSearchPets(action.serverPets, action.searchText, state.orderedBy),
            }
        // TODO: preserve ordering/search after server update/refresh?
        case CLIENT_PETS_MANAGER_SERVER_UPDATE:
            return { orderedBy: undefined, searchedText: '', clientPets: searchPets(action.updatedServerPets, '') }
    }
}
