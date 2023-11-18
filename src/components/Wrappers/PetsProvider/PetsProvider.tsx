import React, { useContext } from 'react'
import { PetsFetchHook, usePetsFetch } from 'hooks/usePets'

type PetsContextState = PetsFetchHook

const initialContextState: PetsContextState = {
    petsFetchState: {
        isLoading: true,
        error: undefined,
        lastUpdated: undefined,
        pets: undefined,
    },
    triggerUpdate: () => null,
}

const PetsContext: React.Context<PetsContextState> = React.createContext(initialContextState)

/**
 * Child nodes of `PetsProvider` may invoke to retrieve the current `Pets` context.
 */
export const usePetsContext = () => useContext(PetsContext)

interface PetsProviderProps {
    children: React.ReactNode
}

/**
 * Provides pets fetched from server to all child components.
 * `usePetsFetch` should not be called from child components.
 */
export const PetsProvider: React.FC<PetsProviderProps> = (props) => {
    const { children } = props

    const { petsFetchState, triggerUpdate } = usePetsFetch()

    return (
        <PetsContext.Provider
            value={{
                petsFetchState: {
                    ...petsFetchState,
                },
                triggerUpdate: triggerUpdate,
            }}
        >
            {children}
        </PetsContext.Provider>
    )
}
