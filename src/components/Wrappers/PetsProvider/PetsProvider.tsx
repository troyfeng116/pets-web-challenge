import React, { useCallback, useContext, useEffect, useState } from 'react'
import { usePets, UsePetsHook } from 'hooks/usePets'
import { searchPets } from 'lib/utils/pets/searchPets'
import { sortPetsByName } from 'lib/utils/pets/sortPets'
import { OrderBy } from 'models/OrderBy'
import { ClientPet, Pet } from 'models/Pet'

export interface PetsContextState extends UsePetsHook {
    clientPets: ClientPet[]

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
    clientPets: [],

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

    // TODO: reducer
    // full list of pets from server, with local ordering
    const [localOrderedPets, setLocalOrderedPets] = useState<Pet[]>([])
    // filtered list of pets, still respecting order of `localOrderedPets`
    const [localFilteredPets, setLocalFilteredPets] = useState<ClientPet[]>([])

    useEffect(() => {
        // TODO: on server update/refresh, should we override local order
        if (serverPets !== undefined) {
            setLocalOrderedPets([...serverPets])
            setLocalFilteredPets(searchPets([...serverPets], ''))
        }
    }, [serverPets])

    const resetToServerState = useCallback(() => {
        if (serverPets !== undefined) {
            setLocalOrderedPets([...serverPets])
            setLocalFilteredPets(searchPets([...serverPets], ''))
        }
    }, [serverPets])

    const sortByName = useCallback(
        (orderBy: OrderBy) => {
            if (!isLoading) {
                setLocalOrderedPets(sortPetsByName(localOrderedPets, orderBy))
            }
        },
        [isLoading, localOrderedPets],
    )

    const search = useCallback(
        (pattern: string) => {
            if (!isLoading) {
                setLocalFilteredPets(searchPets(localOrderedPets || [], pattern))
            }
        },
        [isLoading, localOrderedPets],
    )

    return (
        <PetsContext.Provider
            value={{
                petsState: {
                    ...petsState,
                },
                clientPets: localFilteredPets,
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
