import { useEffect, useReducer, useState } from 'react'
import { API__fetchPets } from 'lib/api/fetchPets'
import { Pet } from 'models/Pet'

import { PETS_FETCH_ERROR, PETS_FETCH_LOADING, PETS_FETCH_SUCCESS } from './actions'
import { reducer } from './reducer'

export interface PetsFetchState {
    isLoading: boolean
    error?: string
    lastUpdated?: Date
    pets?: Pet[]
}

const initialPetsHookState: PetsFetchState = {
    isLoading: false,
    error: undefined,
    lastUpdated: undefined,
    pets: undefined,
}

export interface PetsFetchHook {
    petsFetchState: PetsFetchState

    triggerUpdate: () => void
}

/**
 * Custom hook to manage pet info fetching.
 *
 * @returns
 * - `petsState`: fetch status and payload.
 * - `triggerUpdate`: invocation triggers fresh update.
 */
export const usePetsFetch = (): PetsFetchHook => {
    const [petsFetchState, dispatch] = useReducer(reducer, initialPetsHookState)
    const [shouldTriggerUpdate, setShouldTriggerUpdate] = useState<boolean>(true)
    const { isLoading } = petsFetchState

    // TODO: throttle updates? SWR?
    const triggerUpdate = () => {
        if (!isLoading) {
            setShouldTriggerUpdate((prevShouldTriggerUpdate) => !prevShouldTriggerUpdate)
        }
    }

    useEffect(() => {
        const fetchPets = async () => {
            dispatch({ type: PETS_FETCH_LOADING })
            const { success, error, pets } = await API__fetchPets()
            if (!success || pets === undefined) {
                dispatch({ type: PETS_FETCH_ERROR, error: error })
            } else {
                dispatch({ type: PETS_FETCH_SUCCESS, pets: pets })
            }
        }

        fetchPets()
    }, [shouldTriggerUpdate])

    return {
        petsFetchState: petsFetchState,
        triggerUpdate: triggerUpdate,
    }
}
