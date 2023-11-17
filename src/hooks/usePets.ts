import { useEffect, useReducer, useState } from 'react'
import { API__fetchPets } from 'lib/api/fetchPets'
import { Pet } from 'models/Pet'

import { PETS_ERROR, PETS_LOADING, PETS_SUCCESS } from './actions'
import { reducer } from './reducer'

export interface PetsHookState {
    isLoading: boolean
    error?: string
    lastUpdated?: Date
    pets?: Pet[]
}

interface PetsHook {
    petsState: PetsHookState

    triggerUpdate: () => void
}

const initialPetsHookState: PetsHookState = {
    isLoading: true,
    error: undefined,
    lastUpdated: undefined,
    pets: undefined,
}

export const usePets = (): PetsHook => {
    const [state, dispatch] = useReducer(reducer, initialPetsHookState)
    const [shouldTriggerUpdate, setShouldTriggerUpdate] = useState<boolean>(true)

    const triggerUpdate = () => {
        setShouldTriggerUpdate((prevShouldTriggerUpdate) => !prevShouldTriggerUpdate)
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
