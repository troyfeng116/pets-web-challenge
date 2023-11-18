import styled from 'styled-components'

import React, { useEffect, useState } from 'react'
import PetCard from 'components/PetCard'
import { usePetsContext } from 'components/Wrappers/PetsProvider'
import { OrderBy } from 'models/OrderBy'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 12px;
`

export const Home: React.FC = () => {
    const { petsState, sortByName, search } = usePetsContext()
    const { isLoading, error, lastUpdated, pets } = petsState

    const [searchText, setSearchText] = useState<string>('')

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchText(e.target.value)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            search(searchText)
        }, 390)
        return () => clearTimeout(timeout)
    }, [searchText, search])

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
            <Grid>
                {pets.map((petInfo, idx) => {
                    return <PetCard key={idx} petInfo={petInfo} />
                })}
            </Grid>
        </div>
    )
}
