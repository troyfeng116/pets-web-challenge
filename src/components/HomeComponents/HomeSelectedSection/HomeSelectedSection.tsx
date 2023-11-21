import { css } from 'styled-components'

import React from 'react'
import { IoMdDownload } from 'react-icons/io'
import SelectedPetsView from 'components/SelectedPetsView'
import { Container } from 'components/Styled'
import { PrimaryButton } from 'components/Styled/Button'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer, ResponsiveFlexContainer, STD_ALIGN_NORMAL, STD_JUSTIFY_BETWEEN } from 'components/Styled/Flex'
import { MOBILE } from 'components/Styled/Responsive'
import { Section } from 'components/Styled/Section'
import { STD_FONT_LARGE, StyledText } from 'components/Styled/Text'
import { useFavoritesContext } from 'components/Wrappers/FavoritesProvider/FavoritesProvider'
import { Pet } from 'models/Pet'

interface HomeSelectedSectionProps {
    selectedPets: Pet[]
    selectedPetUrls: string[]

    onToggleFavoritesForSelected: () => void
    clearAllSelected: () => void
    onDownloadAllSelectedClick: () => void
    onSelectPetByUrl: (petUrl: string) => void
    onClickForModal: (petInfo: Pet) => void
}

export const HomeSelectedSection: React.FC<HomeSelectedSectionProps> = (props) => {
    const {
        selectedPets,
        selectedPetUrls,
        onToggleFavoritesForSelected,
        clearAllSelected,
        onDownloadAllSelectedClick,
        onSelectPetByUrl,
        onClickForModal,
    } = props

    const { isFavorite, areAllFavorites, toggleFavorites } = useFavoritesContext()

    return (
        <Section>
            <ResponsiveFlexContainer
                $cutoff={MOBILE}
                $cutoffRules={STD_ALIGN_NORMAL}
                $justifyContent={STD_JUSTIFY_BETWEEN}
                $marginBottom={12}
            >
                <StyledText
                    $font={STD_FONT_LARGE}
                    $cutoff={MOBILE}
                    $cutoffRules={css`
                        margin-bottom: 12px;
                    `}
                >
                    My selected pets
                </StyledText>
                <FlexContainer>
                    <PrimaryButton
                        $marginRight={6}
                        onClick={onToggleFavoritesForSelected}
                        disabled={selectedPets.length === 0}
                    >
                        {areAllFavorites(selectedPetUrls) ? 'Unfavorite' : 'Favorite'} all
                    </PrimaryButton>
                    <PrimaryButton $marginRight={6} onClick={clearAllSelected} disabled={selectedPets.length === 0}>
                        Clear selection
                    </PrimaryButton>
                    <PrimaryButton onClick={onDownloadAllSelectedClick} disabled={selectedPets.length === 0}>
                        <FlexContainer>
                            <IoMdDownload />
                            <Container $marginLeft={3}>Download selected ({selectedPets.length})</Container>
                        </FlexContainer>
                    </PrimaryButton>
                </FlexContainer>
            </ResponsiveFlexContainer>

            {selectedPets.length === 0 ? (
                <StyledText $color={StdColors.GRAY}>Select pets from below to download</StyledText>
            ) : (
                <SelectedPetsView
                    selectedPets={selectedPets}
                    onSelectPetByUrl={onSelectPetByUrl}
                    onClickForModal={onClickForModal}
                    isPetUrlFavorite={isFavorite}
                    togglePetUrlFavorite={(petUrl: string) => toggleFavorites([petUrl])}
                />
            )}
        </Section>
    )
}
