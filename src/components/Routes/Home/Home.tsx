import styled from 'styled-components'

import React, { useEffect, useState } from 'react'
import PetCard from 'components/PetCard'
import { usePetsContext } from 'components/Wrappers/PetsProvider'
import { downloadPetImage } from 'lib/api/downloadPetImage'
import { OrderBy } from 'models/OrderBy'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 12px;
`

export const Home: React.FC = () => {
    const { petsState, triggerUpdate, sortByName, search } = usePetsContext()
    const { isLoading, error, lastUpdated, pets } = petsState

    const [searchText, setSearchText] = useState<string>('')
    const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set())

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchText(e.target.value)
    }

    // throttled search
    useEffect(() => {
        const timeout = setTimeout(() => {
            search(searchText)
        }, 390)
        return () => clearTimeout(timeout)
    }, [searchText, search])

    const onRefreshClick = () => {
        triggerUpdate()
        setSearchText('')
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
        if (pets !== undefined) {
            pets.forEach((pet) => {
                const { url } = pet
                if (selectedUrls.has(url)) {
                    downloadPetImage(pet)
                }
            })
        }
    }

    if (isLoading) {
        return <div>loading...</div>
    }

    if (pets === undefined) {
        return <div>{error}</div>
    }

    return (
        <div>
            <button onClick={() => sortByName(OrderBy.ASC)}>Sort asc</button>
            <button onClick={() => sortByName(OrderBy.DESC)}>Sort desc</button>
            <input placeholder="search" onChange={handleInputChange} value={searchText} />
            {lastUpdated && <div>Last updated: {lastUpdated.toLocaleDateString()}</div>}
            <button onClick={onRefreshClick}>Refresh</button>
            <button onClick={onDownloadAllClick}>Download all ({selectedUrls.size})</button>
            <Grid>
                {pets.map((petInfo, idx) => {
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
