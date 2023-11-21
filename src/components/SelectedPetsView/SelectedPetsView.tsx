import React from 'react'
import { FlexContainer, STD_FLEX_WRAP } from 'components/Styled/Flex'
import { Pet } from 'models/Pet'

import SelectedPetCard from './SelectedPetCard'

interface SelectedPetsViewProps {
    selectedPets: Pet[]

    onSelectPetByUrl: (petUrl: string) => void
    onClickForModal: (petInfo: Pet) => void
    isPetUrlFavorite: (petUrl: string) => boolean
    togglePetUrlFavorite: (petUrl: string) => void
}

export const SelectedPetsView: React.FC<SelectedPetsViewProps> = (props) => {
    const { selectedPets, onSelectPetByUrl, onClickForModal, isPetUrlFavorite, togglePetUrlFavorite } = props

    return (
        <FlexContainer $maxWidth="100%" $flexWrap={STD_FLEX_WRAP}>
            {selectedPets.map((selectedPet, idx) => {
                const { url } = selectedPet
                return (
                    <SelectedPetCard
                        key={idx}
                        selectedPet={selectedPet}
                        isFavorite={isPetUrlFavorite(url)}
                        onSelectPetByUrl={onSelectPetByUrl}
                        onClickForModal={onClickForModal}
                        onFavoritePetByUrl={togglePetUrlFavorite}
                    />
                )
            })}
        </FlexContainer>
    )
}
