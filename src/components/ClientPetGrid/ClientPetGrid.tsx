import styled from 'styled-components'

import React from 'react'
import PetCard from 'components/ClientPetGrid/PetCard'
import { DESKTOP, TABLET } from 'components/Styled/Responsive'
import { ClientPet, Pet } from 'models/Pet'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 36px;

    @media only screen and (max-width: ${DESKTOP}) {
        & {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media only screen and (max-width: ${TABLET}) {
        & {
            grid-template-columns: 1fr;
        }
    }
`

const GridItem = styled(PetCard)`
    max-width: 330px;
    width: 330px;
`

interface ClientPetGridProps {
    clientPets: ClientPet[]
    isPetUrlSelected: (petUrl: string) => boolean
    onSelectPetByUrl: (petUrl: string) => void
    onClickForModal: (petInfo: Pet) => void
    isPetUrlFavorite: (petUrl: string) => boolean
    togglePetUrlFavorite: (petUrl: string) => void
}

export const ClientPetGrid: React.FC<ClientPetGridProps> = (props) => {
    const { clientPets, isPetUrlSelected, onSelectPetByUrl, onClickForModal, isPetUrlFavorite, togglePetUrlFavorite } =
        props

    return (
        <Grid>
            {clientPets.map((petInfo, idx) => {
                const { url } = petInfo
                return (
                    <GridItem
                        key={idx}
                        petInfo={petInfo}
                        isSelected={isPetUrlSelected(url)}
                        isFavorite={isPetUrlFavorite(url)}
                        onSelectPetByUrl={onSelectPetByUrl}
                        onClickForModal={onClickForModal}
                        onFavoritePetByUrl={togglePetUrlFavorite}
                    />
                )
            })}
        </Grid>
    )
}
