import React from 'react'
import { IoMdClose } from 'react-icons/io'
import PetImage from 'components/PetImage'
import { SecondaryButton } from 'components/Styled/Button'
import { Card } from 'components/Styled/Card'
import { StdColors } from 'components/Styled/Colors'
import { StyledStar } from 'components/Styled/FavoriteStar'
import { FlexContainer, STD_JUSTIFY_BETWEEN } from 'components/Styled/Flex'
import { BoundedWidthText } from 'components/Styled/Text'
import { Pet } from 'models/Pet'

interface SelectedPetCardProps {
    selectedPet: Pet
    isFavorite: boolean
    onSelectPetByUrl: (petUrl: string) => void
    onClickForModal: (petInfo: Pet) => void
    onFavoritePetByUrl: (petUrl: string) => void
}

export const SelectedPetCard: React.FC<SelectedPetCardProps> = (props) => {
    const { selectedPet, isFavorite, onSelectPetByUrl, onClickForModal, onFavoritePetByUrl } = props
    const { title, url } = selectedPet

    return (
        <Card $isFlexCol={true} $padding="6px 12px 12px 12px" $margin="6px 3px" $backgroundColor={StdColors.WHITE}>
            <FlexContainer $width="100%" $justifyContent={STD_JUSTIFY_BETWEEN} $marginBottom={6}>
                <StyledStar $isFavorite={isFavorite} onClick={() => onFavoritePetByUrl(url)} size={18} />
                <SecondaryButton $padding="0px" onClick={() => onSelectPetByUrl(url)}>
                    <FlexContainer>
                        <IoMdClose />
                    </FlexContainer>
                </SecondaryButton>
            </FlexContainer>
            <PetImage src={url} alt={title} height={66} width={100} onClick={() => onClickForModal(selectedPet)} />
            <BoundedWidthText $marginTop={6} $textWidth={100} $shouldCenter={true}>
                {title}
            </BoundedWidthText>
        </Card>
    )
}
