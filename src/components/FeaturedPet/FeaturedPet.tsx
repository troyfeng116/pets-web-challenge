import React from 'react'
import { Card } from 'components/Styled/Card'
import { StdColors } from 'components/Styled/Colors'
import { usePetsContext } from 'components/Wrappers/PetsProvider'
import { randByDate } from 'lib/utils/randByDate'

import FeaturedPetCard from './FeaturedPetCard'

export const FeaturedPet: React.FC = () => {
    const { petsFetchState } = usePetsContext()
    const { isLoading, pets } = petsFetchState

    if (isLoading || pets === undefined) {
        return <div>Loading...</div>
    }

    const petsIdx = randByDate() % pets.length

    return (
        <Card $backgroundColor={StdColors.WHITE} $padding="18px 24px">
            <FeaturedPetCard featuredPetInfo={pets[petsIdx]} />
        </Card>
    )
}
