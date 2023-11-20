import styled from 'styled-components'

import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { IoMdRefresh } from 'react-icons/io'
import ClientPetGrid from 'components/ClientPetGrid'
import LastUpdated from 'components/LastUpdated'
import SelectedPetsView from 'components/SelectedPetsView'
import { Container } from 'components/Styled'
import { Button, SecondaryButton, TernaryButton } from 'components/Styled/Button'
import { StdColors } from 'components/Styled/Colors'
import {
    FlexContainer,
    STD_ALIGN_CENTER,
    STD_ALIGN_NORMAL,
    STD_JUSTIFY_BETWEEN,
    STD_JUSTIFY_END,
} from 'components/Styled/Flex'
import { StyledInput } from 'components/Styled/Input'
import { StyledText } from 'components/Styled/Text'
import { useDownloadsContext } from 'components/Wrappers/DownloadsProvider/DownloadsProvider'
import { useClientPetsManager } from 'hooks/useClientPetsManager'
import { OrderBy } from 'models/OrderBy'

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
    const { isLoading, error, lastUpdated } = petsFetchState

    const { downloadPetInfo } = useDownloadsContext()

    const [localSearchText, setLocalSearchText] = useState<string>('')

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

    if (isLoading) {
        return <div>loading...</div>
    }

    if (clientPets === undefined) {
        return <div>{error}</div>
    }

    return (
        <div>
            <FlexContainer $isFlexCol={true} $alignItems={STD_ALIGN_NORMAL}>
                <FlexContainer $alignItems={STD_ALIGN_CENTER} $justifyContent={STD_JUSTIFY_END} $marginBottom={12}>
                    {lastUpdated && <StyledLastUpdated lastUpdate={lastUpdated} />}
                    <TernaryButton onClick={onRefreshClick}>
                        <FlexContainer $alignItems={STD_ALIGN_CENTER}>
                            <IoMdRefresh />
                        </FlexContainer>
                    </TernaryButton>
                </FlexContainer>

                <FlexContainer $justifyContent={STD_JUSTIFY_BETWEEN}>
                    <FlexContainer>
                        <StyledInput placeholder="search" onChange={handleInputChange} value={localSearchText} />
                        <StyledText $color={StdColors.GRAY} $marginLeft={6}>
                            {clientPets.length} result{clientPets.length !== 1 && 's'}
                        </StyledText>
                    </FlexContainer>

                    <FlexContainer>
                        <SecondaryButton $marginRight={6} onClick={onSortByNameClick}>
                            <FlexContainer $alignItems={STD_ALIGN_CENTER}>
                                <Container $marginRight={orderedBy !== undefined ? 3 : 0}>Sort by name</Container>
                                {orderedBy !== undefined &&
                                    (orderedBy === OrderBy.DESC ? <FaArrowDown /> : <FaArrowUp />)}
                            </FlexContainer>
                        </SecondaryButton>
                        <SecondaryButton
                            onClick={onClearFiltersAndSortingClick}
                            disabled={orderedBy === undefined && searchedText === ''}
                        >
                            Clear filters/sort
                        </SecondaryButton>
                    </FlexContainer>
                </FlexContainer>
            </FlexContainer>

            <div>
                <Button onClick={selectAllClientPets}>Select all ({clientPets.length})</Button>
                <Button onClick={clearAllSelected} disabled={selectedPets.length === 0}>
                    Clear selection
                </Button>
                <Button onClick={onDownloadAllSelectedClick} disabled={selectedPets.length === 0}>
                    Download selected ({selectedPets.length})
                </Button>

                <SelectedPetsView selectedPets={selectedPets} onSelectPetByUrl={onSelectPetByUrl} />
            </div>
            <ClientPetGrid
                clientPets={clientPets}
                onSelectPetByUrl={onSelectPetByUrl}
                isPetUrlSelected={isPetUrlSelected}
            />
        </div>
    )
}
