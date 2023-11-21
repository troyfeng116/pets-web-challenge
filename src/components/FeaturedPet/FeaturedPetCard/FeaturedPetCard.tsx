import { css } from 'styled-components'

import React from 'react'
import PetImage from 'components/PetImage'
import { FlexContainer } from 'components/Styled/Flex'
import { TABLET } from 'components/Styled/Responsive'
import { STD_FONT_H1, StyledText } from 'components/Styled/Text'
import { Pet } from 'models/Pet'

interface FeaturedPetCardProps {
    featuredPetInfo: Pet
}

export const FeaturedPetCard: React.FC<FeaturedPetCardProps> = (props) => {
    const { featuredPetInfo } = props
    const { title, description, url } = featuredPetInfo

    return (
        <FlexContainer $isFlexCol={true}>
            <StyledText $font={STD_FONT_H1} $shouldCenter={true} $marginBottom={18}>
                {title}
            </StyledText>
            <PetImage
                $marginBottom={18}
                height={360}
                width={540}
                $cutoff={TABLET}
                $cutoffRules={css`
                    width: 330px;
                    height: 220px;
                `}
                src={url}
                alt="title"
            />
            <StyledText $shouldCenter={true}>{description}</StyledText>
        </FlexContainer>
    )
}
