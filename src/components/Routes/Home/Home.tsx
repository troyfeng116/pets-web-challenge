import React, { useEffect, useState } from 'react'
import { IoMdRefresh } from 'react-icons/io'
import HomeSearchGridSection from 'components/HomeComponents/HomeSearchGridSection'
import HomeSelectedSection from 'components/HomeComponents/HomeSelectedSection'
import LastUpdated from 'components/LastUpdated'
import Modal from 'components/Modal'
import PetModalCard from 'components/Modal/PetModalCard'
import { Container } from 'components/Styled'
import { SecondaryButton } from 'components/Styled/Button'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer, STD_ALIGN_CENTER, STD_ALIGN_NORMAL, STD_JUSTIFY_END } from 'components/Styled/Flex'
import { useDownloadsContext } from 'components/Wrappers/DownloadsProvider/DownloadsProvider'
import { useFavoritesContext } from 'components/Wrappers/FavoritesProvider/FavoritesProvider'
import { useClientPetsManager } from 'hooks/useClientPetsManager'
import { OrderBy } from 'models/OrderBy'
import { Pet } from 'models/Pet'

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
    const { toggleFavorites } = useFavoritesContext()

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

    const selectedPetUrls = selectedPets.map(({ url }) => url)

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

    const onToggleFavoritesForSelected = () => {
        toggleFavorites(selectedPetUrls)
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
                    {lastUpdated && (
                        <Container $color={StdColors.GRAY} $marginRight={6}>
                            <LastUpdated lastUpdate={lastUpdated} />
                        </Container>
                    )}
                    <SecondaryButton onClick={onRefreshClick} disabled={isLoading}>
                        <FlexContainer $alignItems={STD_ALIGN_CENTER}>
                            <IoMdRefresh />
                        </FlexContainer>
                    </SecondaryButton>
                </FlexContainer>

                <Container $marginBottom={60}>
                    <HomeSelectedSection
                        selectedPets={selectedPets}
                        selectedPetUrls={selectedPetUrls}
                        onToggleFavoritesForSelected={onToggleFavoritesForSelected}
                        clearAllSelected={clearAllSelected}
                        onDownloadAllSelectedClick={onDownloadAllSelectedClick}
                        onSelectPetByUrl={onSelectPetByUrl}
                        onClickForModal={onClickForModal}
                    />
                </Container>

                <HomeSearchGridSection
                    isLoading={isLoading}
                    clientPets={clientPets}
                    orderedBy={orderedBy}
                    searchedText={searchedText}
                    localSearchText={localSearchText}
                    handleInputChange={handleInputChange}
                    selectAllClientPets={selectAllClientPets}
                    onSortByNameClick={onSortByNameClick}
                    onClearFiltersAndSortingClick={onClearFiltersAndSortingClick}
                    onSelectPetByUrl={onSelectPetByUrl}
                    isPetUrlSelected={isPetUrlSelected}
                    onClickForModal={onClickForModal}
                />
            </FlexContainer>

            {modalPetInfo !== undefined && (
                <Modal onClose={onModalClose}>
                    <PetModalCard petInfo={modalPetInfo} />
                </Modal>
            )}
        </FlexContainer>
    )
}
