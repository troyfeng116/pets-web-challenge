import styled from 'styled-components'

import React from 'react'
import PetCard from 'components/PetCard'
import { ClientPet } from 'models/Pet'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 48px;

    @media only screen and (max-width: 1200px) {
        & {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media only screen and (max-width: 768px) {
        & {
            grid-template-columns: 1fr;
        }
    }
`

const GridItem = styled(PetCard)`
    max-width: 360px;
    width: 360px;

    @media only screen and (max-width: 1200px) {
        & {
            width: 320px;
        }
    }
`

interface ClientPetGridProps {
    clientPets: ClientPet[]
    isPetUrlSelected: (petUrl: string) => boolean
    onSelectPetByUrl: (petUrl: string) => void
}

export const ClientPetGrid: React.FC<ClientPetGridProps> = (props) => {
    const { clientPets, isPetUrlSelected, onSelectPetByUrl } = props

    return (
        <Grid>
            {clientPets.map((petInfo, idx) => {
                const { url } = petInfo
                return (
                    <GridItem
                        key={idx}
                        petInfo={petInfo}
                        isSelected={isPetUrlSelected(url)}
                        onSelectPetByUrl={onSelectPetByUrl}
                    />
                )
            })}
        </Grid>
    )
}
