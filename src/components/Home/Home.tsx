import React from 'react'
import PetCard from 'components/PetCard'
import { usePets } from 'hooks/usePets'

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
            {pets.map((petInfo, idx) => {
                return <PetCard key={idx} petInfo={petInfo} />
            })}
        </div>
    )
}
