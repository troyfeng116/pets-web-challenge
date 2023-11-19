import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { usePetsContext } from 'components/Wrappers/PetsProvider'
import { PetsFetchHook } from 'hooks/usePets'
import { OrderBy } from 'models/OrderBy'
import { ClientPet, Pet } from 'models/Pet'

import {
    CLIENT_PETS_MANAGER_CLEAR_ALL_SELECTED,
    CLIENT_PETS_MANAGER_ON_SELECT_PET_URL,
    CLIENT_PETS_MANAGER_RESET_ORDER_AND_FILTERS,
    CLIENT_PETS_MANAGER_SEARCH,
    CLIENT_PETS_MANAGER_SELECT_ALL_CLIENT,
    CLIENT_PETS_MANAGER_SERVER_UPDATE,
    CLIENT_PETS_MANAGER_SORT_BY_NAME,
} from './actions'
import { reducer } from './reducer'

export interface ClientPetsManagerState {
    orderedBy?: OrderBy
    searchedText: string
    clientPets: ClientPet[]

    serverPets: Pet[]
    selectedPetUrls: Set<string>
}

const initialState: ClientPetsManagerState = {
    orderedBy: undefined,
    searchedText: '',
    clientPets: [],
    serverPets: [],
    selectedPetUrls: new Set(),
}

interface ClientPetsManagerHook extends PetsFetchHook {
    orderedBy?: OrderBy
    searchedText: string
    clientPets: ClientPet[]
    selectedPets: Pet[]

    resetOrderingAndFilters: () => void
    sortByName: (orderBy: OrderBy) => void
    searchPattern: (pattern: string) => void

    isPetUrlSelected: (petUrl: string) => boolean
    onSelectPetByUrl: (petUrl: string) => void
    selectAllClientPets: () => void
    clearAllSelected: () => void
}

/**
 * Manage client-side pets state, including ordering and filtering.
 * Must be invoked in child node of `PetsProvider`.
 */
export const useClientPetsManager = (): ClientPetsManagerHook => {
    const { petsFetchState, triggerUpdate } = usePetsContext()
    const { pets: fetchedServerPets } = petsFetchState

    const [petsManagerState, dispatch] = useReducer(reducer, initialState)
    const { selectedPetUrls } = petsManagerState

    useEffect(() => {
        if (fetchedServerPets !== undefined) {
            dispatch({ type: CLIENT_PETS_MANAGER_SERVER_UPDATE, updatedServerPets: fetchedServerPets })
        }
    }, [fetchedServerPets])

    const resetOrderingAndFilters = useCallback(() => {
        dispatch({ type: CLIENT_PETS_MANAGER_RESET_ORDER_AND_FILTERS })
    }, [])

    const sortByName = useCallback((orderBy: OrderBy) => {
        dispatch({ type: CLIENT_PETS_MANAGER_SORT_BY_NAME, orderBy: orderBy })
    }, [])

    const searchPattern = useCallback((pattern: string) => {
        dispatch({ type: CLIENT_PETS_MANAGER_SEARCH, searchText: pattern })
    }, [])

    const isPetUrlSelected = useCallback(
        (petUrl: string) => {
            return selectedPetUrls.has(petUrl)
        },
        [selectedPetUrls],
    )

    const onSelectPetByUrl = useCallback((petUrl: string) => {
        dispatch({ type: CLIENT_PETS_MANAGER_ON_SELECT_PET_URL, selectedUrl: petUrl })
    }, [])

    const selectAllClientPets = useCallback(() => {
        dispatch({ type: CLIENT_PETS_MANAGER_SELECT_ALL_CLIENT })
    }, [])

    const clearAllSelected = useCallback(() => {
        dispatch({ type: CLIENT_PETS_MANAGER_CLEAR_ALL_SELECTED })
    }, [])

    const selectedPets = useMemo(() => {
        return (fetchedServerPets || []).filter(({ url }) => selectedPetUrls.has(url))
    }, [fetchedServerPets, selectedPetUrls])

    return {
        petsFetchState: { ...petsFetchState },
        ...petsManagerState,
        selectedPets: selectedPets,

        triggerUpdate: triggerUpdate,
        resetOrderingAndFilters: resetOrderingAndFilters,
        sortByName: sortByName,
        searchPattern: searchPattern,

        isPetUrlSelected: isPetUrlSelected,
        onSelectPetByUrl: onSelectPetByUrl,
        selectAllClientPets: selectAllClientPets,
        clearAllSelected: clearAllSelected,
    }
}
