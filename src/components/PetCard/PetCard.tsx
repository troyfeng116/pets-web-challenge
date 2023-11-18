import styled from 'styled-components'

import React from 'react'
import HighlightedSearchString from 'components/HighlightedSearchString'
import { FlexColCenterContainer } from 'components/Styled/Flex'
import { ContainedImg } from 'components/Styled/Image'
import { downloadPetImage } from 'lib/api/downloadPetImage'
import { ClientPet } from 'models/Pet'

interface PetCardProps {
    petInfo: ClientPet
    isSelected: boolean

    onSelect: (petUrl: string) => void
}

const Card = styled(FlexColCenterContainer)`
    border: 1px solid #000000;
    border-radius: 6px;
    padding: 12px;
`

export const PetCard: React.FC<PetCardProps> = (props) => {
    const { petInfo, isSelected, onSelect } = props
    const { url, created, searchedTitle, searchedDescription } = petInfo

    return (
        <Card>
            <input type="checkbox" checked={isSelected} onChange={() => onSelect(url)} />
            <ContainedImg height={190} src={url} alt="title" />
            <HighlightedSearchString searchString={searchedTitle} />
            <HighlightedSearchString searchString={searchedDescription} />
            <p>{created}</p>
            <button onClick={() => downloadPetImage(petInfo)}>Download image</button>
        </Card>
    )
}
