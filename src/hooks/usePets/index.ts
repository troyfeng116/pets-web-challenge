import { useEffect, useReducer, useState } from 'react'
import { API__fetchPets } from 'lib/api/fetchPets'
import { Pet } from 'models/Pet'

import { PETS_ERROR, PETS_LOADING, PETS_SUCCESS } from './actions'
import { reducer } from './reducer'

export interface UsePetsState {
    isLoading: boolean
    error?: string
    lastUpdated?: Date
    pets?: Pet[]
}

const initialPetsHookState: UsePetsState = {
    isLoading: true,
    error: undefined,
    lastUpdated: undefined,
    pets: undefined,
}

interface UsePetsHook {
    petsState: UsePetsState

    triggerUpdate: () => void
}

/**
 * Custom hook to manage pet info fetching.
 *
 * @returns
 * - `petsState`: fetch status and payload.
 * - `triggerUpdate`: invocation triggers fresh update.
 */
export const usePets = (): UsePetsHook => {
    const [state, dispatch] = useReducer(reducer, initialPetsHookState)
    const [shouldTriggerUpdate, setShouldTriggerUpdate] = useState<boolean>(true)
    const { isLoading } = state

    // TODO: throttle updates? SWR?
    const triggerUpdate = () => {
        if (!isLoading) {
            setShouldTriggerUpdate((prevShouldTriggerUpdate) => !prevShouldTriggerUpdate)
        }
    }

    useEffect(() => {
        const fetchPets = async () => {
            dispatch({ type: PETS_LOADING })
            const { success, error, pets } = await API__fetchPets()
            if (!success || pets === undefined) {
                dispatch({ type: PETS_ERROR, error: error })
            } else {
                dispatch({ type: PETS_SUCCESS, pets: pets })
            }
        }

        fetchPets()
    }, [shouldTriggerUpdate])

    return {
        petsState: state,
        triggerUpdate: triggerUpdate,
    }
}
