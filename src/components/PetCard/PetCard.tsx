import styled from 'styled-components'

import React from 'react'
import HighlightedSearchString from 'components/HighlightedSearchString'
import { CARD_BORDER_ACTIVE, CARD_BORDER_BASE } from 'components/Styled/Border'
import { Button } from 'components/Styled/Button'
import { Card } from 'components/Styled/Card'
import { StdColors } from 'components/Styled/Colors'
import { ContainedImg } from 'components/Styled/Image'
import { STD_FONT_LARGE, STD_FONT_SMALL, STD_TEXT_ALIGN_CENTER } from 'components/Styled/Text'
import { useDownloadsContext } from 'components/Wrappers/DownloadsProvider/DownloadsProvider'
import { toClientDateString } from 'lib/utils/dateUtils'
import { ClientPet } from 'models/Pet'

const StyledTitle = styled(HighlightedSearchString)`
    ${STD_FONT_LARGE}
    ${STD_TEXT_ALIGN_CENTER}
    margin-bottom: 6px;
`

const StyledCreated = styled.p`
    ${STD_FONT_SMALL}
    ${STD_TEXT_ALIGN_CENTER}
    color: ${StdColors.GRAY};
    margin-bottom: 12px;
`

const StyledDescription = styled(HighlightedSearchString)`
    ${STD_TEXT_ALIGN_CENTER}
    margin: 12px 0px;
`

interface PetCardProps {
    petInfo: ClientPet
    isSelected: boolean
    className?: string

    onSelectPetByUrl: (petUrl: string) => void
}

export const PetCard: React.FC<PetCardProps> = (props) => {
    const { petInfo, isSelected, className = '', onSelectPetByUrl } = props
    const { url, created, searchedTitle, searchedDescription } = petInfo

    const { downloadPetInfo } = useDownloadsContext()

    return (
        <Card
            className={className}
            $padding="12px 24px"
            $border={isSelected ? CARD_BORDER_ACTIVE : CARD_BORDER_BASE}
            $isFlexCol={true}
        >
            <input type="checkbox" checked={isSelected} onChange={() => onSelectPetByUrl(url)} />
            <StyledTitle searchString={searchedTitle} />
            <StyledCreated>Created {toClientDateString(created)}</StyledCreated>
            <ContainedImg height={190} width={285} src={url} alt="title" />
            <StyledDescription searchString={searchedDescription} />
            <Button onClick={() => downloadPetInfo(petInfo)}>Download image</Button>
        </Card>
    )
}
