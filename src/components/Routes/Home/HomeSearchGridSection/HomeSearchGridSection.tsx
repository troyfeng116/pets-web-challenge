import { css } from 'styled-components'

import React from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import ClientPetGrid from 'components/ClientPetGrid'
import { Container } from 'components/Styled'
import { PrimaryButton } from 'components/Styled/Button'
import {
    FlexContainer,
    ResponsiveFlexContainer,
    STD_ALIGN_CENTER,
    STD_ALIGN_NORMAL,
    STD_JUSTIFY_BETWEEN,
} from 'components/Styled/Flex'
import { StyledInput } from 'components/Styled/Input'
import { TABLET } from 'components/Styled/Responsive'
import { Section } from 'components/Styled/Section'
import { useFavoritesContext } from 'components/Wrappers/FavoritesProvider/FavoritesProvider'
import { OrderBy } from 'models/OrderBy'
import { ClientPet, Pet } from 'models/Pet'

interface HomeSearchGridSectionProps {
    isLoading: boolean
    clientPets: ClientPet[]
    orderedBy: OrderBy | undefined
    searchedText: string
    localSearchText: string

    handleInputChange: React.ChangeEventHandler<HTMLInputElement>
    selectAllClientPets: () => void
    onSortByNameClick: () => void
    onClearFiltersAndSortingClick: () => void
    onSelectPetByUrl: (petUrl: string) => void
    isPetUrlSelected: (petUrl: string) => boolean
    onClickForModal: (petInfo: Pet) => void
}

export const HomeSearchGridSection: React.FC<HomeSearchGridSectionProps> = (props) => {
    const {
        isLoading,
        clientPets,
        orderedBy,
        searchedText,
        localSearchText,
        handleInputChange,
        selectAllClientPets,
        onSortByNameClick,
        onClearFiltersAndSortingClick,
        onSelectPetByUrl,
        isPetUrlSelected,
        onClickForModal,
    } = props

    const { isFavorite, toggleFavorites } = useFavoritesContext()

    return (
        <Section>
            <ResponsiveFlexContainer
                $cutoff={TABLET}
                $cutoffRules={STD_ALIGN_NORMAL}
                $justifyContent={STD_JUSTIFY_BETWEEN}
                $marginBottom={36}
            >
                <FlexContainer
                    $cutoff={TABLET}
                    $cutoffRules={css`
                        margin-bottom: 12px;
                    `}
                >
                    <StyledInput
                        $width={240}
                        placeholder="search"
                        onChange={handleInputChange}
                        value={localSearchText}
                    />
                    <PrimaryButton $marginLeft={6} onClick={selectAllClientPets}>
                        Select all ({clientPets.length})
                    </PrimaryButton>
                </FlexContainer>

                <FlexContainer>
                    <PrimaryButton $marginRight={6} onClick={onSortByNameClick}>
                        <FlexContainer $alignItems={STD_ALIGN_CENTER}>
                            <Container $marginRight={orderedBy !== undefined ? 3 : 0}>Sort by name</Container>
                            {orderedBy !== undefined && (orderedBy === OrderBy.DESC ? <FaArrowDown /> : <FaArrowUp />)}
                        </FlexContainer>
                    </PrimaryButton>
                    <PrimaryButton
                        onClick={onClearFiltersAndSortingClick}
                        disabled={orderedBy === undefined && searchedText === ''}
                    >
                        Clear filters/sort
                    </PrimaryButton>
                </FlexContainer>
            </ResponsiveFlexContainer>

            <FlexContainer $isFlexCol={true}>
                {isLoading || clientPets === undefined ? (
                    <div>Loading...</div>
                ) : (
                    <ClientPetGrid
                        clientPets={clientPets}
                        onSelectPetByUrl={onSelectPetByUrl}
                        isPetUrlSelected={isPetUrlSelected}
                        isPetUrlFavorite={isFavorite}
                        togglePetUrlFavorite={(petUrl: string) => toggleFavorites([petUrl])}
                        onClickForModal={onClickForModal}
                    />
                )}
            </FlexContainer>
        </Section>
    )
}
