import React from 'react'
import { FlexContainer, STD_FLEX_WRAP } from 'components/Styled/Flex'
import { Pet } from 'models/Pet'

import SelectedPetCard from './SelectedPetCard'

interface SelectedPetsViewProps {
    selectedPets: Pet[]

    onSelectPetByUrl: (petUrl: string) => void
}

export const SelectedPetsView: React.FC<SelectedPetsViewProps> = (props) => {
    const { selectedPets, onSelectPetByUrl } = props

    return (
        <FlexContainer $maxWidth="100%" $flexWrap={STD_FLEX_WRAP}>
            {selectedPets.map((selectedPet, idx) => (
                <SelectedPetCard key={idx} selectedPet={selectedPet} onSelectPetByUrl={onSelectPetByUrl} />
            ))}
        </FlexContainer>
    )
}
