import styled from 'styled-components'

import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import PetCard from 'components/PetCard'
import { Button } from 'components/Styled/Button'
import { StdColors } from 'components/Styled/Colors'
import { FlexContainer, STD_JUSTIFY_BETWEEN } from 'components/Styled/Flex'
import { StyledText } from 'components/Styled/Text'
import { useDownloadsContext } from 'components/Wrappers/DownloadsProvider/DownloadsProvider'
import { useClientPetsManager } from 'hooks/useClientPetsManager'
import { OrderBy } from 'models/OrderBy'

// TODO: move to separate component
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
`

const GridItem = styled(PetCard)`
    max-width: 350px;
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
        selectedPets.forEach((pet) => {
            downloadPetInfo(pet)
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
            <FlexContainer $isFlexCol={true} style={{ width: '100%' }}>
                <FlexContainer>
                    {/* TODO: separate updated/TimeSince component */}
                    {lastUpdated && <div>Last updated: {lastUpdated.toLocaleDateString()}</div>}
                    <Button onClick={onRefreshClick}>Refresh</Button>
                </FlexContainer>

                <FlexContainer $justifyContent={STD_JUSTIFY_BETWEEN} style={{ width: '100%' }}>
                    <FlexContainer>
                        <input placeholder="search" onChange={handleInputChange} value={localSearchText} />
                        <p>
                            {clientPets.length} result{clientPets.length !== 1 && 's'}
                        </p>
                    </FlexContainer>
                    <FlexContainer>
                        <StyledText
                            $color={orderedBy === undefined ? StdColors.GRAY : StdColors.DARK_BLUE}
                            $clickable={true}
                            onClick={onSortByNameClick}
                        >
                            Sort by name
                            {orderedBy !== undefined && (orderedBy === OrderBy.DESC ? <FaArrowDown /> : <FaArrowUp />)}
                        </StyledText>
                        <Button onClick={onClearFiltersAndSortingClick}>Clear all filters/sorting</Button>
                    </FlexContainer>
                </FlexContainer>

                <Button onClick={selectAllClientPets}>Select all ({clientPets.length})</Button>
                <Button onClick={clearAllSelected} disabled={selectedPets.length === 0}>
                    Clear selection
                </Button>
                <Button onClick={onDownloadAllSelectedClick} disabled={selectedPets.length === 0}>
                    Download selected ({selectedPets.length})
                </Button>
            </FlexContainer>
            <Grid>
                {clientPets.map((petInfo, idx) => {
                    const { url } = petInfo
                    return (
                        <GridItem
                            key={idx}
                            petInfo={petInfo}
                            isSelected={isPetUrlSelected(url)}
                            onSelect={onSelectPetByUrl}
                        />
                    )
                })}
            </Grid>
        </div>
    )
}
