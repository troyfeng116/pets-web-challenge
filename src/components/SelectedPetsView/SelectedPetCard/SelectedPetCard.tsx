import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { STD_BORDER_R6 } from 'components/Styled/Border'
import { SecondaryButton } from 'components/Styled/Button'
import { Card } from 'components/Styled/Card'
import { StdColors } from 'components/Styled/Colors'
import { STD_CURSOR_ZOOM } from 'components/Styled/Cursor'
import { FlexContainer, STD_JUSTIFY_END } from 'components/Styled/Flex'
import { ContainedImg } from 'components/Styled/Image'
import { BoundedWidthText } from 'components/Styled/Text'
import { Pet } from 'models/Pet'

interface SelectedPetCardProps {
    selectedPet: Pet
    onSelectPetByUrl: (petUrl: string) => void
    onClickForModal: (petInfo: Pet) => void
}

export const SelectedPetCard: React.FC<SelectedPetCardProps> = (props) => {
    const { selectedPet, onSelectPetByUrl, onClickForModal } = props
    const { title, url } = selectedPet

    return (
        <Card $isFlexCol={true} $padding="6px 12px 12px 12px" $margin="6px 3px" $backgroundColor={StdColors.WHITE}>
            <FlexContainer $width="100%" $justifyContent={STD_JUSTIFY_END} $marginBottom={6}>
                <SecondaryButton $padding="0px" onClick={() => onSelectPetByUrl(url)}>
                    <FlexContainer>
                        <IoMdClose />
                    </FlexContainer>
                </SecondaryButton>
            </FlexContainer>
            <ContainedImg
                $backgroundColor={StdColors.LIGHT_GRAY}
                $borderRadius={STD_BORDER_R6}
                $cursor={STD_CURSOR_ZOOM}
                src={url}
                height={66}
                width={100}
                onClick={() => onClickForModal(selectedPet)}
            />
            <BoundedWidthText $marginTop={6} $textWidth={100} $shouldCenter={true}>
                {title}
            </BoundedWidthText>
        </Card>
    )
}
