import React, { useCallback, useContext, useEffect, useState } from 'react'
import { usePets, UsePetsHook } from 'hooks/usePets'
import { searchPets } from 'lib/utils/pets/searchPets'
import { sortPetsByName } from 'lib/utils/pets/sortPetsByName'
import { OrderBy } from 'models/OrderBy'
import { Pet } from 'models/Pet'

export interface PetsContextState extends UsePetsHook {
    resetToServerState: () => void
    sortByName: (orderBy: OrderBy) => void
    search: (pattern: string) => void
}

const initialContextState: PetsContextState = {
    petsState: {
        isLoading: true,
        error: undefined,
        lastUpdated: undefined,
        pets: undefined,
    },
    triggerUpdate: () => null,
    resetToServerState: () => null,
    sortByName: () => null,
    search: () => null,
}

const PetsContext: React.Context<PetsContextState> = React.createContext(initialContextState)

/**
 * Child nodes of `PetsProvider` may invoke to retrieve the current `Pets` context.
 */
export const usePetsContext = () => useContext(PetsContext)

interface PetsProviderProps {
    children: React.ReactNode
}

export const PetsProvider: React.FC<PetsProviderProps> = (props) => {
    const { children } = props

    const { petsState, triggerUpdate } = usePets()
    const { isLoading, pets: serverPets } = petsState

    const [localPets, setLocalPets] = useState<Pet[]>([])

    useEffect(() => {
        if (serverPets !== undefined) {
            setLocalPets([...serverPets])
        }
    }, [serverPets])

    const resetToServerState = useCallback(() => {
        if (serverPets !== undefined) {
            setLocalPets(serverPets)
        }
    }, [serverPets])

    const sortByName = useCallback(
        (orderBy: OrderBy) => {
            if (!isLoading) {
                setLocalPets(sortPetsByName(localPets, orderBy))
            }
        },
        [isLoading, localPets],
    )

    const search = useCallback(
        (pattern: string) => {
            if (!isLoading) {
                setLocalPets(searchPets(serverPets || [], pattern))
            }
        },
        [isLoading, serverPets],
    )

    return (
        <PetsContext.Provider
            value={{
                petsState: {
                    ...petsState,
                    pets: localPets,
                },
                triggerUpdate: triggerUpdate,
                resetToServerState: resetToServerState,
                sortByName: sortByName,
                search: search,
            }}
        >
            {children}
        </PetsContext.Provider>
    )
}
