import styled from 'styled-components'

import React, { useEffect, useState } from 'react'
import PetCard from 'components/PetCard'
import { useDownloadsContext } from 'components/Wrappers/DownloadsProvider/DownloadsProvider'
import { useClientPetsManager } from 'hooks/useClientPetsManager'
import { OrderBy } from 'models/OrderBy'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 12px;
`

export const Home: React.FC = () => {
    const { petsFetchState, triggerUpdate, searchedText, clientPets, resetToServerState, sortByName, searchPattern } =
        useClientPetsManager()
    const { isLoading, error, lastUpdated } = petsFetchState

    const { downloadPetInfo } = useDownloadsContext()

    const [localSearchText, setLocalSearchText] = useState<string>('')
    const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set())

    // in case search text overridden by manager, set local search text value
    useEffect(() => {
        setLocalSearchText(searchedText)
    }, [searchedText])

    // throttled search
    useEffect(() => {
        const timeout = setTimeout(() => {
            searchPattern(localSearchText)
        }, 390)
        return () => clearTimeout(timeout)
    }, [localSearchText, searchPattern])

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setLocalSearchText(e.target.value)
    }

    const onRefreshClick = () => {
        triggerUpdate()
    }

    const onUrlSelect = (petUrl: string) => {
        setSelectedUrls((prevSelectedUrls) => {
            const updatedSelectedUrls = new Set(prevSelectedUrls)
            if (prevSelectedUrls.has(petUrl)) {
                updatedSelectedUrls.delete(petUrl)
            } else {
                updatedSelectedUrls.add(petUrl)
            }
            return updatedSelectedUrls
        })
    }

    const onDownloadAllClick = () => {
        if (clientPets !== undefined) {
            clientPets.forEach((pet) => {
                const { url } = pet
                if (selectedUrls.has(url)) {
                    downloadPetInfo(pet)
                }
            })
        }
    }

    const onClearFiltersAndSortingClick = () => {
        resetToServerState()
    }

    if (isLoading) {
        return <div>loading...</div>
    }

    if (clientPets === undefined) {
        return <div>{error}</div>
    }

    return (
        <div>
            <button onClick={() => sortByName(OrderBy.ASC)}>Sort by name asc</button>
            <button onClick={() => sortByName(OrderBy.DESC)}>Sort by name desc</button>
            <button onClick={onClearFiltersAndSortingClick}>Clear all filters/sorting</button>
            <input placeholder="search" onChange={handleInputChange} value={localSearchText} />
            <p>
                {clientPets.length} result{clientPets.length !== 1 && 's'}
            </p>
            {lastUpdated && <div>Last updated: {lastUpdated.toLocaleDateString()}</div>}
            <button onClick={onRefreshClick}>Refresh</button>
            <button onClick={onDownloadAllClick}>Download all ({selectedUrls.size})</button>
            <Grid>
                {clientPets.map((petInfo, idx) => {
                    const { url } = petInfo
                    return (
                        <PetCard
                            key={idx}
                            petInfo={petInfo}
                            isSelected={selectedUrls.has(url)}
                            onSelect={onUrlSelect}
                        />
                    )
                })}
            </Grid>
        </div>
    )
}
