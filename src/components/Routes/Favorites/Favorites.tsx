import React from 'react'
import { NavLink } from 'react-router-dom'
import FavoritesGrid from 'components/FavoritesGrid'
import { FlexContainer } from 'components/Styled/Flex'
import { Section } from 'components/Styled/Section'
import { STD_FONT_LARGE, StyledText } from 'components/Styled/Text'
import { useFavoritesContext } from 'components/Wrappers/FavoritesProvider/FavoritesProvider'

export const Favorites: React.FC = () => {
    const { favoriteSet } = useFavoritesContext()

    return (
        <FlexContainer $isFlexCol={true} $marginTop={24}>
            <Section>
                <FlexContainer $isFlexCol={true}>
                    <StyledText as="h2" $shouldCenter={true} $marginBottom={18} $font={STD_FONT_LARGE}>
                        My favorite pet images ({favoriteSet.size})
                    </StyledText>

                    {favoriteSet.size === 0 ? (
                        <StyledText>
                            Select your favorite pet images <NavLink to="/">here</NavLink>
                        </StyledText>
                    ) : (
                        <FavoritesGrid />
                    )}
                </FlexContainer>
            </Section>
        </FlexContainer>
    )
}
