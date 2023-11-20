import React from 'react'
import { STD_BORDER_R12 } from 'components/Styled/Border'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer } from 'components/Styled/Flex'
import { ContainedImg } from 'components/Styled/Image'
import { STD_FONT_LARGE, STD_FONT_SMALL, StyledText } from 'components/Styled/Text'
import { toClientDateString } from 'lib/utils/dateUtils'
import { Pet } from 'models/Pet'

interface PetModalCardProps {
    petInfo: Pet
}

export const PetModalCard: React.FC<PetModalCardProps> = (props) => {
    const { petInfo } = props
    const { title, description, url, created } = petInfo

    return (
        <FlexContainer $isFlexCol={true}>
            <StyledText as="div" $font={STD_FONT_LARGE} $shouldCenter={true} $marginBottom={6}>
                {title}
            </StyledText>
            <StyledText $font={STD_FONT_SMALL} $shouldCenter={true} $color={StdColors.GRAY} $marginBottom={6}>
                Created {toClientDateString(created)}
            </StyledText>
            <ContainedImg
                $backgroundColor={StdColors.LIGHT_GRAY}
                $borderRadius={STD_BORDER_R12}
                $marginBottom={12}
                height={400}
                width={600}
                src={url}
                alt="title"
            />
            <StyledText as="div" $shouldCenter={true}>
                {description}
            </StyledText>
        </FlexContainer>
    )
}
