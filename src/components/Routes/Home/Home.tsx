import styled from 'styled-components'

import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { IoMdDownload } from 'react-icons/io'
import { IoMdRefresh } from 'react-icons/io'
import ClientPetGrid from 'components/ClientPetGrid'
import LastUpdated from 'components/LastUpdated'
import Modal from 'components/Modal'
import PetModalCard from 'components/Modal/PetModalCard'
import SelectedPetsView from 'components/SelectedPetsView'
import { Container } from 'components/Styled'
import { PrimaryButton, SecondaryButton } from 'components/Styled/Button'
import { StdColors } from 'components/Styled/Colors'
import {
    FlexContainer,
    ResponsiveFlexContainer,
    STD_ALIGN_CENTER,
    STD_ALIGN_NORMAL,
    STD_JUSTIFY_BETWEEN,
    STD_JUSTIFY_END,
} from 'components/Styled/Flex'
import { StyledInput } from 'components/Styled/Input'
import { MOBILE } from 'components/Styled/Responsive'
import { Section } from 'components/Styled/Section'
import { STD_FONT_LARGE, StyledText } from 'components/Styled/Text'
import { useDownloadsContext } from 'components/Wrappers/DownloadsProvider/DownloadsProvider'
import { useClientPetsManager } from 'hooks/useClientPetsManager'
import { OrderBy } from 'models/OrderBy'
import { Pet } from 'models/Pet'

const StyledLastUpdated = styled(LastUpdated)`
    color: ${StdColors.GRAY};
    margin-right: 6px;
`

export const Home: React.FC = () => {
    const {
        petsFetchState,
        triggerUpdate,
        orderedBy,
        searchedText,
        clientPets,
        selectedPets,

        resetOrderingAndFilters,
        sortByName,
        searchPattern,

        isPetUrlSelected,
        onSelectPetByUrl,
        selectAllClientPets,
        clearAllSelected,
    } = useClientPetsManager()
    const { isLoading, lastUpdated } = petsFetchState

    const { downloadPetInfo } = useDownloadsContext()

    const [localSearchText, setLocalSearchText] = useState<string>('')
    const [modalPetInfo, setModalPetInfo] = useState<Pet>()

    // in case search text overridden by manager, set local search text value
    useEffect(() => {
        setLocalSearchText(searchedText)
    }, [searchedText])

    // throttled search
    useEffect(() => {
        const timeout = setTimeout(() => {
            searchPattern(localSearchText)
        }, 390)
        return () => clearTimeout(timeout)
    }, [localSearchText, searchPattern])

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setLocalSearchText(e.target.value)
    }

    const onSortByNameClick = () => {
        if (orderedBy === undefined || orderedBy === OrderBy.DESC) {
            sortByName(OrderBy.ASC)
        } else {
            sortByName(OrderBy.DESC)
        }
    }

    const onRefreshClick = () => {
        triggerUpdate()
    }

    const onDownloadAllSelectedClick = () => {
        const selectedPetsCopy = [...selectedPets]
        selectedPetsCopy.forEach((pet) => {
            downloadPetInfo(pet, (downloadSuccess, downloadError) => {
                if (downloadSuccess) {
                    onSelectPetByUrl(pet.url)
                } else {
                    console.error(downloadError)
                }
            })
        })
    }

    const onClearFiltersAndSortingClick = () => {
        resetOrderingAndFilters()
    }

    const onClickForModal = (pet: Pet) => {
        setModalPetInfo(pet)
    }

    const onModalClose = () => {
        setModalPetInfo(undefined)
    }

    return (
        <FlexContainer $isFlexCol={true}>
            <FlexContainer $isFlexCol={true} $alignItems={STD_ALIGN_NORMAL} $width="100%" $maxWidth={1100}>
                <FlexContainer $alignItems={STD_ALIGN_CENTER} $justifyContent={STD_JUSTIFY_END} $marginBottom={12}>
                    {lastUpdated && <StyledLastUpdated lastUpdate={lastUpdated} />}
                    <SecondaryButton onClick={onRefreshClick}>
                        <FlexContainer $alignItems={STD_ALIGN_CENTER}>
                            <IoMdRefresh />
                        </FlexContainer>
                    </SecondaryButton>
                </FlexContainer>

                <Section $marginBottom={60}>
                    <ResponsiveFlexContainer $cutoff={MOBILE} $justifyContent={STD_JUSTIFY_BETWEEN} $marginBottom={12}>
                        <StyledText $font={STD_FONT_LARGE}>My selected pets</StyledText>
                        <FlexContainer>
                            <PrimaryButton
                                $marginRight={6}
                                onClick={clearAllSelected}
                                disabled={selectedPets.length === 0}
                            >
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
                        />
                    )}
                </Section>

                <Section>
                    <ResponsiveFlexContainer $cutoff={MOBILE} $justifyContent={STD_JUSTIFY_BETWEEN} $marginBottom={36}>
                        <FlexContainer>
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
                                    {orderedBy !== undefined &&
                                        (orderedBy === OrderBy.DESC ? <FaArrowDown /> : <FaArrowUp />)}
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
                                onClickForModal={onClickForModal}
                            />
                        )}
                    </FlexContainer>
                </Section>
            </FlexContainer>

            {modalPetInfo !== undefined && (
                <Modal onClose={onModalClose}>
                    <PetModalCard petInfo={modalPetInfo} />
                </Modal>
            )}
        </FlexContainer>
    )
}
