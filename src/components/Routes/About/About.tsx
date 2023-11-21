import styled from 'styled-components'

import React from 'react'
import { NavLink } from 'react-router-dom'
import FeaturedPetCard from 'components/FeaturedPet'
import { Container } from 'components/Styled'
import { FlexContainer } from 'components/Styled/Flex'
import { Section } from 'components/Styled/Section'
import { STD_FONT_LARGE, StyledText } from 'components/Styled/Text'

const StyledLi = styled.li`
    width: fit-content;

    &:not(:last-child) {
        margin-bottom: 6px;
    }
`

export const About: React.FC = () => {
    return (
        <FlexContainer $isFlexCol={true}>
            <Section $marginTop={18} $marginBottom={36}>
                <FlexContainer $isFlexCol={true} $width="fit-content">
                    <StyledText $font={STD_FONT_LARGE} $shouldCenter={true} $marginBottom={24}>
                        Explore fun pet images and bios, and download your favorite images!
                    </StyledText>

                    <Container>
                        <StyledText $marginBottom={6}>Features:</StyledText>
                        <Container as="ul" $width="fit-content" $paddingLeft={30}>
                            <StyledLi>Dynamic image selection, with batch downloads</StyledLi>
                            <StyledLi>Interactive search with search text highlighting</StyledLi>
                            <StyledLi>
                                View recent downloads <NavLink to="/downloads">here</NavLink> (limited by max browser
                                cookie size)
                            </StyledLi>
                            <StyledLi>
                                Pick out favorites and view <NavLink to="/favorites">here</NavLink> (limited by max
                                browser cookie size)
                            </StyledLi>
                        </Container>
                    </Container>
                </FlexContainer>
            </Section>

            <Section $padding="18px 30px">
                <FlexContainer $isFlexCol={true}>
                    <StyledText $font={STD_FONT_LARGE} $shouldCenter={true} $marginBottom={12}>
                        Today&rsquo;s featured pet...
                    </StyledText>
                    <Container $marginBottom={24}>
                        <NavLink to="/">See all pets</NavLink>
                    </Container>

                    <FeaturedPetCard />
                </FlexContainer>
            </Section>
        </FlexContainer>
    )
}
