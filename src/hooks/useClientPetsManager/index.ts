import { useCallback, useEffect, useReducer } from 'react'
import { usePetsContext } from 'components/Wrappers/PetsProvider'
import { PetsFetchHook } from 'hooks/usePets'
import { OrderBy } from 'models/OrderBy'
import { ClientPet } from 'models/Pet'

import {
    CLIENT_PETS_MANAGER_RESET,
    CLIENT_PETS_MANAGER_SEARCH,
    CLIENT_PETS_MANAGER_SERVER_UPDATE,
    CLIENT_PETS_MANAGER_SORT_BY_NAME,
} from './actions'
import { reducer } from './reducer'

export interface ClientPetsManagerState {
    orderedBy?: OrderBy
    searchedText: string
    clientPets: ClientPet[]
}

const initialState: ClientPetsManagerState = {
    orderedBy: undefined,
    searchedText: '',
    clientPets: [],
}

interface ClientPetsManagerHook extends PetsFetchHook, ClientPetsManagerState {
    resetToServerState: () => void
    sortByName: (orderBy: OrderBy) => void
    searchPattern: (pattern: string) => void
}

/**
 * Manage client-side pets state, including ordering and filtering.
 * Must be invoked in child node of `PetsProvider`.
 */
export const useClientPetsManager = (): ClientPetsManagerHook => {
    const { petsFetchState, triggerUpdate } = usePetsContext()
    const { pets: serverPets } = petsFetchState

    const [petsManagerState, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (serverPets !== undefined) {
            dispatch({ type: CLIENT_PETS_MANAGER_SERVER_UPDATE, updatedServerPets: serverPets })
        }
    }, [serverPets])

    const resetToServerState = useCallback(() => {
        if (serverPets !== undefined) {
            dispatch({ type: CLIENT_PETS_MANAGER_RESET, serverPets: serverPets })
        }
    }, [serverPets])

    const sortByName = useCallback(
        (orderBy: OrderBy) => {
            if (serverPets !== undefined) {
                dispatch({ type: CLIENT_PETS_MANAGER_SORT_BY_NAME, serverPets: serverPets, orderBy: orderBy })
            }
        },
        [serverPets],
    )

    const searchPattern = useCallback(
        (pattern: string) => {
            if (serverPets !== undefined) {
                dispatch({ type: CLIENT_PETS_MANAGER_SEARCH, serverPets: serverPets, searchText: pattern })
            }
        },
        [serverPets],
    )

    return {
        petsFetchState: { ...petsFetchState },
        ...petsManagerState,

        triggerUpdate: triggerUpdate,
        resetToServerState: resetToServerState,
        sortByName: sortByName,
        searchPattern: searchPattern,
    }
}
