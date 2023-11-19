import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { STD_BORDER_R6 } from 'components/Styled/Border'
import { TernaryButton } from 'components/Styled/Button'
import { Card } from 'components/Styled/Card'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer, STD_JUSTIFY_END } from 'components/Styled/Flex'
import { ContainedImg } from 'components/Styled/Image'
import { BoundedWidthText } from 'components/Styled/Text'
import { Pet } from 'models/Pet'

interface SelectedPetCardProps {
    selectedPet: Pet
    onSelectPetByUrl: (petUrl: string) => void
}

export const SelectedPetCard: React.FC<SelectedPetCardProps> = (props) => {
    const { selectedPet, onSelectPetByUrl } = props
    const { title, url } = selectedPet

    return (
        <Card $isFlexCol={true} $padding="6px 12px 12px 12px" $margin="6px 3px">
            <FlexContainer $width="100%" $justifyContent={STD_JUSTIFY_END} $marginBottom={6}>
                <TernaryButton $padding="0px" onClick={() => onSelectPetByUrl(url)}>
                    <FlexContainer>
                        <IoMdClose />
                    </FlexContainer>
                </TernaryButton>
            </FlexContainer>
            <ContainedImg
                $backgroundColor={StdColors.LIGHT_GRAY}
                $borderRadius={STD_BORDER_R6}
                src={url}
                height={90}
                width={100}
            />
            <BoundedWidthText $marginTop={6} $textWidth={100} $shouldCenter={true}>
                {title}
            </BoundedWidthText>
        </Card>
    )
}
