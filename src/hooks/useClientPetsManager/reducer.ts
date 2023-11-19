import { sortAndSearchPets } from 'lib/utils/pets/searchAndSortPets'
import { searchPets } from 'lib/utils/pets/searchPets'

import {
    CLIENT_PETS_MANAGER_CLEAR_ALL_SELECTED,
    CLIENT_PETS_MANAGER_ON_SELECT_PET_URL,
    CLIENT_PETS_MANAGER_RESET_ORDER_AND_FILTERS,
    CLIENT_PETS_MANAGER_SEARCH,
    CLIENT_PETS_MANAGER_SELECT_ALL_CLIENT,
    CLIENT_PETS_MANAGER_SERVER_UPDATE,
    CLIENT_PETS_MANAGER_SORT_BY_NAME,
    ClientPetsManagerAction,
} from './actions'
import { ClientPetsManagerState } from '.'

export const reducer = (state: ClientPetsManagerState, action: ClientPetsManagerAction): ClientPetsManagerState => {
    const updatedSelectedPetUrls = new Set(state.selectedPetUrls)

    switch (action.type) {
        case CLIENT_PETS_MANAGER_RESET_ORDER_AND_FILTERS:
            return {
                ...state,
                orderedBy: undefined,
                searchedText: '',
                clientPets: searchPets(state.serverPets, ''),
            }
        case CLIENT_PETS_MANAGER_SORT_BY_NAME:
            return {
                ...state,
                orderedBy: action.orderBy,
                clientPets: sortAndSearchPets(state.serverPets, state.searchedText, action.orderBy),
            }
        case CLIENT_PETS_MANAGER_SEARCH:
            return {
                ...state,
                searchedText: action.searchText,
                clientPets: sortAndSearchPets(state.serverPets, action.searchText, state.orderedBy),
            }
        // TODO: preserve ordering/search after server update/refresh?
        case CLIENT_PETS_MANAGER_SERVER_UPDATE:
            return {
                serverPets: action.updatedServerPets,
                selectedPetUrls: new Set(),
                orderedBy: undefined,
                searchedText: '',
                clientPets: searchPets(action.updatedServerPets, ''),
            }
        case CLIENT_PETS_MANAGER_ON_SELECT_PET_URL:
            if (state.selectedPetUrls.has(action.selectedUrl)) {
                updatedSelectedPetUrls.delete(action.selectedUrl)
            } else {
                updatedSelectedPetUrls.add(action.selectedUrl)
            }
            return {
                ...state,
                selectedPetUrls: updatedSelectedPetUrls,
            }
        case CLIENT_PETS_MANAGER_SELECT_ALL_CLIENT:
            state.clientPets.forEach(({ url }) => updatedSelectedPetUrls.add(url))
            return {
                ...state,
                selectedPetUrls: updatedSelectedPetUrls,
            }
        case CLIENT_PETS_MANAGER_CLEAR_ALL_SELECTED:
            return {
                ...state,
                selectedPetUrls: new Set(),
            }
    }
}
