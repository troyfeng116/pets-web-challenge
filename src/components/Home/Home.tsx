import styled from 'styled-components'

import React from 'react'
import PetCard from 'components/PetCard'
import { usePets } from 'hooks/usePets'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 12px;
`

export const Home: React.FC = () => {
    const { petsState } = usePets()
    const { isLoading, error, lastUpdated, pets } = petsState

    if (isLoading) {
        return <div>loading...</div>
    }

    if (pets === undefined) {
        return <div>{error}</div>
    }

    return (
        <div>
            {lastUpdated && <div>Last updated: {lastUpdated.toLocaleDateString()}</div>}
            <Grid>
                {pets.map((petInfo, idx) => {
                    return <PetCard key={idx} petInfo={petInfo} />
                })}
            </Grid>
        </div>
    )
}
